/**
 * Last Stop — Automated Playtest Harness
 *
 * Plays through the game using the actual scene selection, investigation,
 * and observation systems. No browser needed — pure state simulation.
 *
 * Reports: reachable/unreachable content, dead ends, thin spots, critical path.
 */

import type {
  GameState,
  LocationId,
  CharacterId,
  TrustTier,
  Scene,
  SceneEffects,
  ObservationEntry,
} from '../src/types/index.js'
import { PERSISTENT_ITEMS } from '../src/types/index.js'
import { LOCATIONS, getAdjacentLocations, canEnterLocation } from '../src/data/locations.js'
import { CHARACTERS, getCharactersAtLocation, getDrifterLocation, getCharacterLocation } from '../src/data/characters.js'
import { getAllScenes, getScenesForCharacter } from '../src/data/scenes/index.js'
import { INVESTIGATIONS, getInvestigationResult } from '../src/data/investigations.js'
import { OBSERVATION_EVENTS, simulateObservation } from '../src/data/observations.js'
import { selectScene } from '../src/utils/scenes.js'
import { formatTime, isMidnight } from '../src/utils/time.js'

// ─── Minimal Game State Engine ───────────────────────────────────────────────

const TRUST_TIER1_THRESHOLD = 2
const TRUST_TIER2_THRESHOLD = 4

const TRUST_BOOST_FLAGS: Record<CharacterId, string[]> = {
  earl: ['earl_revealed', 'seen_device', 'has_thomas_journal'],
  marge: ['marge_worried_about_earl', 'marge_knows_you_know'],
  karen: ['karen_mentioned_light', 'karen_told_location'],
  david: ['david_expressed_concern', 'david_believes_karen'],
  diane: ['diane_cover_blown', 'diane_showed_files'],
  mo: ['mo_felt_deja_vu', 'mo_remembers'],
  drifter: ['drifter_told_father', 'drifter_told_facility_location'],
  vincent: ['vincent_contacted', 'vincent_opened_door'],
}

const ALL_CHARACTERS: CharacterId[] = ['earl', 'marge', 'karen', 'david', 'diane', 'mo', 'drifter', 'vincent']

function createState(): GameState {
  const trust = {} as Record<CharacterId, TrustTier>
  const rapport = {} as Record<CharacterId, number>
  for (const c of ALL_CHARACTERS) { trust[c] = 0; rapport[c] = 0 }
  return {
    currentChapter: 1, dayCount: 1, pendingChapter: null,
    totalPlayTime: 0, lastPlayedAt: null, currentTime: 0,
    player: { name: '', currentLocation: 'room_player' },
    flags: [], trust, rapport,
    scenesSeenEver: [], scenesSeenThisDay: [],
    inventory: [], activeObservations: [], observationLog: [],
    insightPoints: 0, currentHint: null, endingAcknowledged: false,
  }
}

function setFlag(s: GameState, flag: string) {
  if (!s.flags.includes(flag)) s.flags.push(flag)
}

function advanceTime(s: GameState, minutes: number) {
  s.currentTime = Math.min(s.currentTime + minutes, 1080)
  s.totalPlayTime += minutes
}

function moveTo(s: GameState, loc: LocationId) {
  s.player.currentLocation = loc
  advanceTime(s, 15)
}

function incrementRapport(s: GameState, char: CharacterId, amount = 1) {
  s.rapport[char] = (s.rapport[char] || 0) + amount
  const boostFlags = TRUST_BOOST_FLAGS[char] || []
  const hasBoost = boostFlags.some(f => s.flags.includes(f))
  const rapVal = s.rapport[char]
  if (s.trust[char] < 1 && rapVal >= TRUST_TIER1_THRESHOLD) s.trust[char] = 1
  if (s.trust[char] < 2 && rapVal >= TRUST_TIER2_THRESHOLD && hasBoost) s.trust[char] = 2 as TrustTier
}

function applyEffects(s: GameState, effects: SceneEffects, sceneChar?: CharacterId) {
  if (effects.setFlags) effects.setFlags.forEach(f => setFlag(s, f))
  if (effects.clearFlags) effects.clearFlags.forEach(f => { s.flags = s.flags.filter(x => x !== f) })
  if (effects.setTrust) s.trust[effects.setTrust.character] = effects.setTrust.tier
  if (effects.addRapport) incrementRapport(s, effects.addRapport.character, effects.addRapport.amount)
  if (effects.giveItem) { if (!s.inventory.includes(effects.giveItem)) s.inventory.push(effects.giveItem) }
  if (effects.advanceTime) advanceTime(s, effects.advanceTime)
  if (effects.advanceChapter) {
    const ch = Math.max(s.currentChapter, effects.advanceChapter)
    if (s.pendingChapter === null || ch > s.pendingChapter) s.pendingChapter = ch
  }
}

function markSceneSeen(s: GameState, sceneId: string, oncePer: Scene['oncePer']) {
  if (oncePer === 'ever' && !s.scenesSeenEver.includes(sceneId)) s.scenesSeenEver.push(sceneId)
  if ((oncePer === 'loop' || oncePer === 'ever') && !s.scenesSeenThisDay.includes(sceneId)) s.scenesSeenThisDay.push(sceneId)
}

function resetDay(s: GameState) {
  for (const c of ALL_CHARACTERS) {
    if (s.trust[c] === 2) s.trust[c] = 1 as TrustTier
  }
  s.inventory = s.inventory.filter(i => (PERSISTENT_ITEMS as readonly string[]).includes(i))
  if (s.pendingChapter !== null) {
    s.currentChapter = Math.max(s.currentChapter, s.pendingChapter)
    s.pendingChapter = null
  }
  s.dayCount++
  s.currentTime = 0
  s.player.currentLocation = 'room_player'
  s.scenesSeenThisDay = []
  s.activeObservations = []
  s.observationLog = []
  if (!s.flags.includes('day_reset_occurred')) s.flags.push('day_reset_occurred')
}

// ─── Pathfinding helpers ─────────────────────────────────────────────────────

function findPath(from: LocationId, to: LocationId, flags: string[]): LocationId[] | null {
  if (from === to) return [from]
  const visited = new Set<LocationId>([from])
  const queue: LocationId[][] = [[from]]
  while (queue.length > 0) {
    const path = queue.shift()!
    const current = path[path.length - 1]
    for (const adj of getAdjacentLocations(current)) {
      if (visited.has(adj.id)) continue
      if (!canEnterLocation(adj.id, flags)) continue
      const newPath = [...path, adj.id]
      if (adj.id === to) return newPath
      visited.add(adj.id)
      queue.push(newPath)
    }
  }
  return null
}

function navigateTo(s: GameState, target: LocationId, log: string[]): boolean {
  if (s.player.currentLocation === target) return true
  const path = findPath(s.player.currentLocation, target, s.flags)
  if (!path) return false
  for (let i = 1; i < path.length; i++) {
    moveTo(s, path[i])
    if (isMidnight(s.currentTime)) return false
  }
  return true
}

// ─── Playthrough Engine ──────────────────────────────────────────────────────

interface PlayLog {
  day: number
  chapter: number
  time: string
  action: string
  detail: string
}

interface PlayReport {
  log: PlayLog[]
  scenesPlayed: string[]
  scenesNeverPlayed: string[]
  flagsSet: string[]
  flagsReferencedButNeverSet: string[]
  investigationsPlayed: string[]
  investigationsNeverPlayed: string[]
  observationFlagsObtained: string[]
  observationFlagsUnobtainable: string[]
  trustLevelsReached: Record<CharacterId, TrustTier>
  maxTrustEverReached: Record<CharacterId, TrustTier>
  endingsReached: string[]
  daysPlayed: number
  chaptersReached: number
  issues: string[]
  thinSpots: string[]
}

function logAction(s: GameState, log: PlayLog[], action: string, detail: string) {
  log.push({
    day: s.dayCount,
    chapter: s.currentChapter,
    time: formatTime(s.currentTime),
    action,
    detail,
  })
}

/** Find all flags referenced in scene requirements and effects */
function getAllReferencedFlags(): { required: Set<string>, set: Set<string> } {
  const required = new Set<string>()
  const set = new Set<string>()

  for (const scene of getAllScenes()) {
    scene.requirements.flags?.forEach(f => required.add(f))
    scene.requirements.notFlags?.forEach(f => required.add(f))
    scene.effects.setFlags?.forEach(f => set.add(f))
    if (scene.lines) {
      for (const line of scene.lines) {
        if (line.choices) {
          for (const choice of line.choices) {
            choice.effects?.setFlags?.forEach(f => set.add(f))
            choice.effects?.clearFlags?.forEach(f => required.add(f))
            choice.requiresFlags?.forEach(f => required.add(f))
          }
        }
      }
    }
  }

  for (const inv of INVESTIGATIONS) {
    inv.requiresFlags?.forEach(f => required.add(f))
    inv.notFlags?.forEach(f => required.add(f))
    inv.effects?.setFlags?.forEach(f => set.add(f))
  }

  for (const ev of OBSERVATION_EVENTS) {
    if (ev.setsFlag) set.add(ev.setsFlag)
  }

  // day_reset_occurred is set by engine
  set.add('day_reset_occurred')

  return { required, set }
}

function doInvestigate(s: GameState, log: PlayLog[]): string | null {
  advanceTime(s, 15)
  const seen = [...s.scenesSeenEver, ...s.scenesSeenThisDay]
  const result = getInvestigationResult(s.player.currentLocation, s.flags, seen)
  if (result) {
    logAction(s, log, 'INVESTIGATE', `${s.player.currentLocation}: ${result.id} — "${result.text.substring(0, 60)}..."`)
    if (result.effects) applyEffects(s, result.effects)
    markSceneSeen(s, result.id, result.oncePer)
    return result.id
  }
  return null
}

function doTalk(s: GameState, charId: CharacterId, log: PlayLog[]): Scene | null {
  const scene = selectScene(charId, {
    currentChapter: s.currentChapter,
    flags: s.flags,
    trust: s.trust,
    scenesSeenEver: s.scenesSeenEver,
    scenesSeenThisDay: s.scenesSeenThisDay,
    currentTime: s.currentTime,
    player: s.player,
  })
  if (!scene) return null

  advanceTime(s, scene.effects.advanceTime || 15)
  logAction(s, log, 'TALK', `${charId} → ${scene.id} (trust=${s.trust[charId]}, pri=${scene.priority})`)
  applyEffects(s, scene.effects, scene.character)

  // Simulate choosing conditional dialogue options (pick first available gated choice)
  for (const line of scene.lines) {
    if (!line.choices) continue
    for (const choice of line.choices) {
      const hasFlags = !choice.requiresFlags || choice.requiresFlags.every(f => s.flags.includes(f))
      const hasItems = !choice.requiresItems || choice.requiresItems.every(i => s.inventory.includes(i))
      if ((choice.requiresFlags || choice.requiresItems) && hasFlags && hasItems && choice.effects) {
        applyEffects(s, choice.effects, scene.character)
      }
    }
  }

  markSceneSeen(s, scene.id, scene.oncePer)
  return scene
}

function doObservation(s: GameState, location: LocationId, startTime: number, endTime: number, log: PlayLog[]): string[] {
  const entries = simulateObservation(location, startTime, endTime, s.dayCount)
  const flagsFound: string[] = []
  for (const entry of entries) {
    if (entry.setsFlag && !s.flags.includes(entry.setsFlag)) {
      setFlag(s, entry.setsFlag)
      flagsFound.push(entry.setsFlag)
      logAction(s, log, 'OBSERVE', `${location}@${formatTime(entry.time)}: [FLAG: ${entry.setsFlag}] ${entry.text.substring(0, 50)}...`)
    }
  }
  if (entries.length > 0 && flagsFound.length === 0) {
    logAction(s, log, 'OBSERVE', `${location}: ${entries.length} entries, no new flags`)
  }
  return flagsFound
}

// ─── Comprehensive Playthrough ───────────────────────────────────────────────

function playThrough(): PlayReport {
  const s = createState()
  const log: PlayLog[] = []
  const scenesPlayed = new Set<string>()
  const investigationsPlayed = new Set<string>()
  const observationFlagsObtained = new Set<string>()
  const maxTrust: Record<CharacterId, TrustTier> = {} as any
  for (const c of ALL_CHARACTERS) maxTrust[c] = 0
  const endingsReached: string[] = []
  const issues: string[] = []
  const thinSpots: string[] = []

  const MAX_DAYS = 50
  const allScenes = getAllScenes()

  function updateMaxTrust() {
    for (const c of ALL_CHARACTERS) {
      if (s.trust[c] > maxTrust[c]) maxTrust[c] = s.trust[c]
    }
  }

  function tryTalkToAll(log: PlayLog[]) {
    // Find all NPCs across all locations and try to talk
    const locationOrder: LocationId[] = [
      'room_player', 'office', 'diner', 'courtyard', 'parking_lot',
      'room_2', 'room_4', 'room_6', 'room_9', 'room_11',
      'back_room', 'back_area', 'desert',
    ]

    for (const loc of locationOrder) {
      if (isMidnight(s.currentTime)) return

      const npcsHere = getCharactersAtLocation(loc, s.currentTime)
      const drifterLoc = getDrifterLocation(s.dayCount, s.currentTime)
      if (drifterLoc === loc && !npcsHere.find(c => c.id === 'drifter')) {
        npcsHere.push(CHARACTERS.drifter)
      }

      if (npcsHere.length === 0) continue

      if (!navigateTo(s, loc, log)) continue
      if (isMidnight(s.currentTime)) return

      for (const npc of npcsHere) {
        if (isMidnight(s.currentTime)) return
        // Re-talk to same NPC while new unique scenes keep unlocking
        // (handles multi-step chains like Vincent's 4-scene sequence)
        let keepTalking = true
        while (keepTalking && !isMidnight(s.currentTime)) {
          const scene = doTalk(s, npc.id, log)
          if (scene) {
            const isNew = !scenesPlayed.has(scene.id)
            scenesPlayed.add(scene.id)
            updateMaxTrust()
            // Only re-talk if we got a genuinely new scene (not repeatable smalltalk)
            keepTalking = isNew && scene.oncePer !== 'none'
          } else {
            keepTalking = false
          }
        }
      }
    }
  }

  function investigateEverywhere(log: PlayLog[]) {
    const locations: LocationId[] = [
      'room_player', 'office', 'diner', 'courtyard', 'parking_lot',
      'back_area', 'desert', 'back_room',
      'room_2', 'room_4', 'room_6', 'room_9', 'room_11',
    ]
    for (const loc of locations) {
      if (isMidnight(s.currentTime)) return
      if (!canEnterLocation(loc, s.flags)) continue
      if (!navigateTo(s, loc, log)) continue
      if (isMidnight(s.currentTime)) return

      // Try investigating multiple times for layered results
      let attempts = 0
      while (attempts < 3 && !isMidnight(s.currentTime)) {
        const invId = doInvestigate(s, log)
        if (invId) {
          investigationsPlayed.add(invId)
        } else {
          break
        }
        attempts++
      }
    }
  }

  function observeKeyLocations(log: PlayLog[]) {
    // Observe locations at key times to discover critical flags
    const obsTargets: Array<{ loc: LocationId, start: number, end: number }> = [
      { loc: 'office', start: 900, end: 1080 },     // Earl's anomaly at 960
      { loc: 'parking_lot', start: 540, end: 720 },  // White sedan at 585
      { loc: 'diner', start: 720, end: 900 },        // Mo asks facility at 780
      { loc: 'courtyard', start: 0, end: 600 },      // Earl knocks room 6 at 60, Karen walks desert at 540
      { loc: 'office', start: 540, end: 660 },       // Diane-Earl talk at 600
      { loc: 'back_area', start: 360, end: 480 },    // Drifter at 420
      { loc: 'desert', start: 540, end: 720 },       // Karen walks
    ]

    for (const obs of obsTargets) {
      const flags = doObservation(s, obs.loc, obs.start, obs.end, log)
      flags.forEach(f => observationFlagsObtained.add(f))
    }
  }

  function tryTimedEvent(loc: LocationId, targetTime: number, chars: CharacterId[], log: PlayLog[], allowBigSkip = false) {
    if (isMidnight(s.currentTime)) return
    const maxSkip = allowBigSkip ? 300 : 60
    // Only advance if we're within maxSkip minutes of the window
    if (s.currentTime < targetTime && targetTime - s.currentTime <= maxSkip) {
      advanceTime(s, targetTime - s.currentTime)
    }
    // Only try if current time is in the window (window is targetTime to +60 min)
    if (s.currentTime < targetTime - 15 || s.currentTime > targetTime + 60) return
    if (isMidnight(s.currentTime)) return

    if (!navigateTo(s, loc, log)) return
    if (isMidnight(s.currentTime)) return

    for (const charId of chars) {
      const scene = doTalk(s, charId, log)
      if (scene) {
        scenesPlayed.add(scene.id)
        updateMaxTrust()
      }
    }
  }

  /** Navigate to a specific character's current location and talk to them */
  function seekCharacter(charId: CharacterId, log: PlayLog[]) {
    if (isMidnight(s.currentTime)) return
    const charLoc = getCharacterLocation(charId, s.currentTime)
    if (charLoc === 'gone' || charLoc === 'erratic') return
    if (!navigateTo(s, charLoc as LocationId, log)) return
    if (isMidnight(s.currentTime)) return

    let keepTalking = true
    while (keepTalking && !isMidnight(s.currentTime)) {
      const scene = doTalk(s, charId, log)
      if (scene) {
        const isNew = !scenesPlayed.has(scene.id)
        scenesPlayed.add(scene.id)
        updateMaxTrust()
        keepTalking = isNew && scene.oncePer !== 'none'
      } else {
        keepTalking = false
      }
    }
  }

  function tryTimedEvents(log: PlayLog[]) {
    // Try timed event windows that overlap current time
    tryTimedEvent('diner', 0, ['mo'], log)                   // Mo dawn (6:00AM)
    tryTimedEvent('parking_lot', 130, ['diane'], log)         // Diane sedan (8:10AM)
    tryTimedEvent('desert', 550, ['karen'], log)              // Karen desert (3:10PM)
    tryTimedEvent('office', 910, ['earl'], log, true)          // Earl night (9:10PM) - allow big skip
  }

  // ─── Main Play Loop ──────────────────────────────────────────────────────

  logAction(s, log, 'START', 'Game begins — Day 1, Chapter 1')

  for (let day = 0; day < MAX_DAYS; day++) {
    logAction(s, log, 'DAY_START', `Day ${s.dayCount}, Chapter ${s.currentChapter}, Time ${formatTime(s.currentTime)}`)

    // Phase 1: Investigate current room first
    const invId = doInvestigate(s, log)
    if (invId) investigationsPlayed.add(invId)

    // Phase 2: Observe key locations (simulated — not real idle, just check events)
    observeKeyLocations(log)

    // Phase 3: Try early timed events (dawn/morning windows)
    if (!isMidnight(s.currentTime)) {
      tryTimedEvents(log)
    }

    // Phase 4: Talk to everyone, then keep talking until no new scenes unlock
    // (handles multi-step chains like Vincent's 4-scene sequence in one day)
    {
      let newScenesPlayed = true
      while (newScenesPlayed && !isMidnight(s.currentTime)) {
        const beforeCount = scenesPlayed.size
        tryTalkToAll(log)
        newScenesPlayed = scenesPlayed.size > beforeCount

        // Seek out specific characters for pending cross-character chains
        // (handles schedule mismatches where tryTalkToAll visits the wrong location at the wrong time)
        // Done AFTER the loop check so seeks don't trigger another full tryTalkToAll pass
        if (!isMidnight(s.currentTime) && s.flags.includes('knows_vincent_is_researcher') && !s.flags.includes('diane_knows_vincent')) {
          seekCharacter('diane', log)
        }
        if (!isMidnight(s.currentTime) && s.flags.includes('diane_revealed_incident_details') && !s.flags.includes('vincent_knows_diane')) {
          seekCharacter('vincent', log)
        }
        // Seek David for phone anomaly scene
        if (!isMidnight(s.currentTime) && s.flags.includes('met_david') && s.flags.includes('knows_loop_exists') && !s.flags.includes('david_noticed_dates')) {
          seekCharacter('david', log)
        }
        // Seek Karen for facility keycard after David reconciliation
        if (!isMidnight(s.currentTime) && s.flags.includes('david_believes_karen') && s.flags.includes('karen_followed_to_desert') && !s.flags.includes('karen_david_visited_facility')) {
          seekCharacter('karen', log)
        }
        // Seek Diane for consequence scenes
        if (!isMidnight(s.currentTime) && s.flags.includes('diane_refused_deal') && !s.flags.includes('diane_gave_files_anyway') && s.trust.diane >= 2) {
          seekCharacter('diane', log)
        }

        // Try Earl night event between passes (it needs the office at 9-10PM)
        if (!isMidnight(s.currentTime) && s.flags.includes('earl_revealed') && s.flags.includes('has_thomas_journal') && !s.flags.includes('caught_earl_with_device')) {
          tryTimedEvent('office', 910, ['earl'], log, true)
        }
      }
    }

    // Phase 5: Investigate everywhere
    if (!isMidnight(s.currentTime)) {
      investigateEverywhere(log)
    }

    // Phase 6: One more talk pass after investigations (may unlock new scenes via flags)
    if (!isMidnight(s.currentTime)) {
      tryTalkToAll(log)
    }

    // Phase 7: Try late timed events again (e.g., Earl night stakeout)
    if (!isMidnight(s.currentTime)) {
      tryTimedEvents(log)
    }

    // Phase 8: Final talk pass (catches cross-character chains unlocked mid-day)
    if (!isMidnight(s.currentTime)) {
      tryTalkToAll(log)
    }

    // Phase 9: If time remains, wait until midnight
    if (!isMidnight(s.currentTime)) {
      const remaining = 1080 - s.currentTime
      advanceTime(s, remaining)
      logAction(s, log, 'WAIT', `Waited ${remaining} minutes until midnight`)
    }

    // Check for endings before reset
    if (s.flags.includes('ending_complete') || s.flags.includes('ending_a') || s.flags.includes('ending_b') || s.flags.includes('ending_c') || s.flags.includes('ending_d')) {
      if (s.flags.includes('ending_a')) endingsReached.push('ending_a')
      if (s.flags.includes('ending_b')) endingsReached.push('ending_b')
      if (s.flags.includes('ending_c')) endingsReached.push('ending_c')
      if (s.flags.includes('ending_d')) endingsReached.push('ending_d')
      if (endingsReached.length === 0) endingsReached.push('ending (choice-based — all paths reachable)')
      logAction(s, log, 'ENDING', `Reached ending: ${endingsReached.join(', ')}`)
      break
    }

    // Reset day
    logAction(s, log, 'MIDNIGHT', `Day ${s.dayCount} ends. Pending chapter: ${s.pendingChapter ?? 'none'}`)
    resetDay(s)
    updateMaxTrust()
  }

  // ─── Analysis ────────────────────────────────────────────────────────────

  // Find unreachable scenes
  const allSceneIds = allScenes.map(sc => sc.id)
  const scenesNeverPlayed = allSceneIds.filter(id => !scenesPlayed.has(id))

  // Find unreachable investigations
  const allInvIds = INVESTIGATIONS.map(i => i.id)
  const investigationsNeverPlayed = allInvIds.filter(id => !investigationsPlayed.has(id))

  // Find flags referenced but never set
  const { required, set: settableFlags } = getAllReferencedFlags()
  const flagsReferencedButNeverSet = [...required].filter(f => !settableFlags.has(f) && !s.flags.includes(f))

  // Find observation flags that were never obtained
  const allObsFlags = OBSERVATION_EVENTS.filter(e => e.setsFlag).map(e => e.setsFlag!)
  const observationFlagsUnobtainable = allObsFlags.filter(f => !observationFlagsObtained.has(f))

  // ─── Issue Detection ─────────────────────────────────────────────────────

  // Characters never reaching tier 1
  for (const c of ALL_CHARACTERS) {
    if (maxTrust[c] === 0) issues.push(`${c}: Never reached trust tier 1`)
    if (maxTrust[c] < 2) {
      const boostFlags = TRUST_BOOST_FLAGS[c]
      const hasAnyBoost = boostFlags.some(f => s.flags.includes(f))
      if (!hasAnyBoost) issues.push(`${c}: No trust boost flags ever obtained — tier 2 impossible`)
    }
  }

  // Scenes that require flags no scene/investigation/observation sets
  for (const scene of allScenes) {
    if (scene.requirements.flags) {
      for (const flag of scene.requirements.flags) {
        if (!settableFlags.has(flag)) {
          issues.push(`Scene ${scene.id} requires flag '${flag}' which nothing in the game sets`)
        }
      }
    }
  }

  // Thin character content
  for (const c of ALL_CHARACTERS) {
    const charScenes = getScenesForCharacter(c)
    const played = charScenes.filter(sc => scenesPlayed.has(sc.id))
    if (played.length <= 2) {
      thinSpots.push(`${c}: Only ${played.length}/${charScenes.length} scenes played — thin experience`)
    }
    const tier2Scenes = charScenes.filter(sc => sc.requirements.trust === 2)
    if (tier2Scenes.length === 0) {
      thinSpots.push(`${c}: No tier 2 scenes at all`)
    } else if (tier2Scenes.length === 1) {
      thinSpots.push(`${c}: Only 1 tier 2 scene — thin endgame relationship`)
    }
  }

  // Check ending requirements
  const endingScenesCheck = allScenes.filter(sc => sc.id.startsWith('ending_'))
  for (const ending of endingScenesCheck) {
    const reqs = ending.requirements.flags || []
    const unmet = reqs.filter(f => !s.flags.includes(f))
    if (unmet.length > 0 && !scenesPlayed.has(ending.id)) {
      issues.push(`Ending ${ending.id}: Missing flags: ${unmet.join(', ')}`)
    }
  }

  // Scenes with no effects at all (no flags, no trust, no items)
  for (const scene of allScenes) {
    const e = scene.effects
    const hasEffect = (e.setFlags?.length || 0) > 0 ||
      (e.clearFlags?.length || 0) > 0 ||
      e.setTrust || e.addRapport || e.giveItem || e.advanceChapter
    if (!hasEffect) {
      thinSpots.push(`Scene ${scene.id}: Has no effects — pure flavor with no progression impact`)
    }
  }

  return {
    log,
    scenesPlayed: [...scenesPlayed],
    scenesNeverPlayed,
    flagsSet: [...s.flags],
    flagsReferencedButNeverSet,
    investigationsPlayed: [...investigationsPlayed],
    investigationsNeverPlayed,
    observationFlagsObtained: [...observationFlagsObtained],
    observationFlagsUnobtainable,
    trustLevelsReached: { ...s.trust },
    maxTrustEverReached: maxTrust,
    endingsReached,
    daysPlayed: s.dayCount,
    chaptersReached: s.currentChapter,
    issues,
    thinSpots,
  }
}

// ─── Run and Report ──────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════')
console.log('  LAST STOP — AUTOMATED PLAYTEST')
console.log('═══════════════════════════════════════════════════════')
console.log()

const report = playThrough()

// Summary
console.log(`PLAYTHROUGH SUMMARY`)
console.log(`  Days Played:    ${report.daysPlayed}`)
console.log(`  Chapter Reached: ${report.chaptersReached}`)
console.log(`  Endings:         ${report.endingsReached.length > 0 ? report.endingsReached.join(', ') : 'NONE'}`)
console.log(`  Flags Set:       ${report.flagsSet.length}`)
console.log()

// Coverage
const allScenes = getAllScenes()
console.log(`SCENE COVERAGE: ${report.scenesPlayed.length}/${allScenes.length}`)
if (report.scenesNeverPlayed.length > 0) {
  console.log(`  Never played:`)
  for (const id of report.scenesNeverPlayed) {
    const scene = allScenes.find(s => s.id === id)!
    const reqs = []
    if (scene.requirements.trust) reqs.push(`trust>=${scene.requirements.trust}`)
    if (scene.requirements.flags?.length) reqs.push(`flags: ${scene.requirements.flags.join(', ')}`)
    if (scene.requirements.notFlags?.length) reqs.push(`!flags: ${scene.requirements.notFlags.join(', ')}`)
    if (scene.requirements.chapter) {
      if (scene.requirements.chapter.min) reqs.push(`ch>=${scene.requirements.chapter.min}`)
      if (scene.requirements.chapter.max) reqs.push(`ch<=${scene.requirements.chapter.max}`)
    }
    console.log(`    - ${id} [${scene.character}] requires: ${reqs.join(' + ') || 'nothing'}`)
  }
}
console.log()

// Investigation coverage
console.log(`INVESTIGATION COVERAGE: ${report.investigationsPlayed.length}/${INVESTIGATIONS.length}`)
if (report.investigationsNeverPlayed.length > 0) {
  console.log(`  Never triggered:`)
  for (const id of report.investigationsNeverPlayed) {
    const inv = INVESTIGATIONS.find(i => i.id === id)!
    console.log(`    - ${id} [${inv.location}] requires: ${inv.requiresFlags?.join(', ') || 'none'} !${inv.notFlags?.join(', ') || 'none'}`)
  }
}
console.log()

// Observation coverage
const allObsFlags = OBSERVATION_EVENTS.filter(e => e.setsFlag).map(e => e.setsFlag!)
console.log(`OBSERVATION FLAGS: ${report.observationFlagsObtained.length}/${allObsFlags.length}`)
if (report.observationFlagsUnobtainable.length > 0) {
  console.log(`  Never obtained:`)
  for (const flag of report.observationFlagsUnobtainable) {
    const ev = OBSERVATION_EVENTS.find(e => e.setsFlag === flag)!
    console.log(`    - ${flag} @ ${ev.location} time=${ev.time} (${formatTime(ev.time)})`)
  }
}
console.log()

// Trust levels
console.log(`TRUST LEVELS (max ever reached):`)
for (const c of ALL_CHARACTERS) {
  const tier = report.maxTrustEverReached[c]
  const bar = tier === 2 ? '●●●' : tier === 1 ? '●●○' : '●○○'
  console.log(`  ${c.padEnd(10)} ${bar} (tier ${tier})`)
}
console.log()

// Flag analysis
if (report.flagsReferencedButNeverSet.length > 0) {
  console.log(`FLAGS REFERENCED BUT NEVER SETTABLE:`)
  for (const f of report.flagsReferencedButNeverSet) {
    console.log(`  - ${f}`)
  }
  console.log()
}

// Issues
console.log(`ISSUES (${report.issues.length}):`)
if (report.issues.length === 0) {
  console.log('  None found!')
} else {
  for (const issue of report.issues) {
    console.log(`  [!] ${issue}`)
  }
}
console.log()

// Thin spots
console.log(`THIN SPOTS (${report.thinSpots.length}):`)
if (report.thinSpots.length === 0) {
  console.log('  None found!')
} else {
  for (const spot of report.thinSpots) {
    console.log(`  [~] ${spot}`)
  }
}
console.log()

// Day-by-day condensed log
console.log(`DAY-BY-DAY LOG (condensed):`)
console.log('─'.repeat(60))
let currentDay = 0
for (const entry of report.log) {
  if (entry.day !== currentDay) {
    currentDay = entry.day
    console.log()
    console.log(`── Day ${entry.day} (Chapter ${entry.chapter}) ──`)
  }
  if (['TALK', 'INVESTIGATE', 'OBSERVE', 'ENDING', 'MIDNIGHT'].includes(entry.action)) {
    console.log(`  ${entry.time.padEnd(10)} [${entry.action.padEnd(11)}] ${entry.detail}`)
  }
}
console.log()
console.log('═══════════════════════════════════════════════════════')
