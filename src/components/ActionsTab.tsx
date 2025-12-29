import { useCallback, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { LOCATIONS, getAdjacentLocations, canEnterLocation } from '../data/locations'
import { CHARACTERS, getCharactersAtLocation } from '../data/characters'
import { getTimePeriod } from '../utils/time'
import { selectScene } from '../utils/scenes'
import { DialoguePanel } from './DialoguePanel'
import { getInvestigationResult } from '../data/investigations'
import { timeOfDayToMinutes } from '../story/timeOfDay'
import { getChapterEntryBeat } from '../story/chapters'
import type { LocationId, Character, Scene, CharacterId, SceneEffects } from '../types'

export function ActionsTab() {
  const {
    storyBeatId,
    timeOfDay,
    player,
    flags,
    trust,
    scenesSeenEver,
    scenesSeenThisChapter,
    moveTo,
    setFlag,
    clearFlag,
    setTrust,
    incrementRapport,
    addItem,
    setEndingAcknowledged,
    markSceneSeen,
    advanceBeat,
  } = useGameStore()

  const [activeScene, setActiveScene] = useState<Scene | null>(null)
  const [noSceneMessage, setNoSceneMessage] = useState<string | null>(null)
  const [investigationMessage, setInvestigationMessage] = useState<string | null>(null)

  const currentLocation = LOCATIONS[player.currentLocation]
  const adjacentLocations = getAdjacentLocations(player.currentLocation)
  const timeMarker = timeOfDayToMinutes(timeOfDay)

  // Get NPCs at current location
  const getNPCsHere = useCallback((): Character[] => {
    return getCharactersAtLocation(player.currentLocation, timeMarker)
  }, [player.currentLocation, timeMarker])

  const npcsHere = (() => {
    const npcs = getNPCsHere()
    if (storyBeatId === 'ch1_b1_wake') {
      return npcs.filter((npc) => npc.id === 'earl')
    }
    if (storyBeatId === 'ch1_b2_meet_staff') {
      return npcs.filter((npc) => npc.id === 'marge')
    }
    return npcs
  })()

  // Handle movement
  const handleMove = (locationId: LocationId) => {
    if (!canEnterLocation(locationId, flags, timeMarker)) return
    moveTo(locationId)
  }

  const handleInvestigate = () => {
    const investigationsSeen = [...scenesSeenEver, ...scenesSeenThisChapter]
    const result = getInvestigationResult(player.currentLocation, flags, investigationsSeen)

    if (result) {
      if (result.effects?.setFlags) {
        for (const flag of result.effects.setFlags) {
          setFlag(flag)
        }
      }
      if (result.effects?.giveItem) {
        addItem(result.effects.giveItem)
      }
      if (result.effects?.setTrust) {
        setTrust(result.effects.setTrust.character, result.effects.setTrust.tier)
      }
      if (result.effects?.advanceBeat) {
        advanceBeat(result.effects.advanceBeat, result.id)
      }
      if (result.effects?.advanceChapter) {
        const nextBeat = getChapterEntryBeat(result.effects.advanceChapter)
        advanceBeat(nextBeat, `${result.id}:advanceChapter`)
      }

      markSceneSeen(result.id, result.oncePer === 'chapter' ? 'chapter' : result.oncePer)
      setInvestigationMessage(result.text)
      setTimeout(() => setInvestigationMessage(null), 4000)
    } else {
      setInvestigationMessage("You don't notice anything new.")
      setTimeout(() => setInvestigationMessage(null), 2000)
    }
  }

  // Handle talking to an NPC
  const handleTalk = useCallback(
    (characterId: CharacterId) => {
      const gameState = {
        storyBeatId,
        flags,
        trust,
        scenesSeenEver,
        scenesSeenThisChapter,
      }

      const scene = selectScene(characterId, gameState)

      if (scene) {
        setActiveScene(scene)
        setNoSceneMessage(null)
      } else {
        const character = CHARACTERS[characterId]
        setNoSceneMessage(`${character.name} has nothing new to say. Check your objective or look around.`)
        setTimeout(() => setNoSceneMessage(null), 2000)
      }
    },
    [storyBeatId, flags, trust, scenesSeenEver, scenesSeenThisChapter]
  )

  // Apply scene effects
  const handleSceneComplete = useCallback(
    (effects: SceneEffects) => {
      if (!activeScene) return

      if (effects.setFlags) {
        for (const flag of effects.setFlags) {
          setFlag(flag)
        }
        if (effects.setFlags.includes('ending_complete')) {
          setEndingAcknowledged(false)
        }
      }

      if (effects.clearFlags) {
        for (const flag of effects.clearFlags) {
          clearFlag(flag)
        }
      }

      if (effects.setTrust) {
        setTrust(effects.setTrust.character, effects.setTrust.tier)
      }

      if (effects.giveItem) {
        addItem(effects.giveItem)
      }

      incrementRapport(activeScene.character)
      markSceneSeen(activeScene.id, activeScene.oncePer)
      if (effects.advanceBeat) {
        advanceBeat(effects.advanceBeat, activeScene.id)
      }
      if (effects.advanceChapter) {
        const nextBeat = getChapterEntryBeat(effects.advanceChapter)
        advanceBeat(nextBeat, `${activeScene.id}:advanceChapter`)
      }
      setActiveScene(null)
    },
    [activeScene, setFlag, clearFlag, setTrust, incrementRapport, addItem, setEndingAcknowledged, markSceneSeen, advanceBeat]
  )

  const handleDialogueCancel = useCallback(() => {
    setActiveScene(null)
  }, [])

  // Get time-appropriate atmosphere
  const getAtmosphere = () => {
    const period = getTimePeriod(timeOfDay)
    switch (period) {
      case 'morning':
        return 'The morning sun casts long shadows across the motel.'
      case 'afternoon':
        return 'Heat shimmers rise from the asphalt in the afternoon blaze.'
      case 'evening':
        return 'The sky burns orange as the sun descends toward the desert horizon.'
      case 'night':
        return 'Stars emerge overhead. The neon signs hum louder in the darkness.'
    }
  }

  const canStakeOutOffice = storyBeatId === 'ch1_b3_stakeout' && player.currentLocation === 'office'
  const showStakeoutAction = storyBeatId === 'ch1_b3_stakeout'

  const getObjective = () => {
    switch (storyBeatId) {
      case 'ch1_b1_wake':
        return 'Go to the office and meet Earl.'
      case 'ch1_b2_meet_staff':
        return 'Stop by the diner and meet Marge.'
      case 'ch1_b3_stakeout':
        return flags.includes('marge_hint_back_room')
          ? 'Marge mentioned Earl locking up late. Stake out the office.'
          : 'Stake out the office.'
      case 'ch1_b4_confront':
        return 'Confront Earl in the office before he locks up.'
      case 'ch2_b1_aftermath':
        return 'Go to the diner and see if anyone remembers yesterday.'
      case 'ch3_b1_reveal':
        return 'Follow Earl’s lead and learn what’s in the back room.'
      case 'ch4_b1_journal':
        return 'Search the back room for Thomas’s journal.'
      case 'ch5_b1_endgame':
        return 'Return to Earl and decide how this ends.'
      default:
        return 'Continue the story.'
    }
  }

  return (
    <>
      {activeScene && (
        <DialoguePanel
          scene={activeScene}
          onComplete={handleSceneComplete}
          onCancel={handleDialogueCancel}
        />
      )}

      {/* Location Panel */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-amber-400">
          {currentLocation.name.toUpperCase()}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-3">
          {currentLocation.description}
        </p>
        <p className="text-slate-500 text-xs italic">
          {getAtmosphere()}
        </p>
      </div>

      {/* Objective */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wide">
          Current Objective
        </h3>
        <p className="text-sm text-slate-200">{getObjective()}</p>
        {(showStakeoutAction && !canStakeOutOffice) ||
        (storyBeatId === 'ch1_b1_wake' && player.currentLocation !== 'office') ? (
          <p className="text-xs text-slate-500 mt-2">
            The office is past the courtyard.
          </p>
        ) : null}
      </div>

      {/* NPCs Present */}
      {npcsHere.length > 0 && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
            People Here
          </h3>
          <div className="space-y-2">
            {npcsHere.map((npc) => (
              <button
                key={npc.id}
                onClick={() => handleTalk(npc.id)}
                className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors flex justify-between items-center"
              >
                <span className="text-slate-100">{npc.name}</span>
                <span className="text-amber-400 text-sm">Talk →</span>
              </button>
            ))}
          </div>
          {noSceneMessage && (
            <p className="mt-3 text-sm text-slate-500 italic">{noSceneMessage}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          Actions
        </h3>
        <div className="space-y-2">
          <button
            onClick={handleInvestigate}
            className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Look around
            <span className="float-right text-slate-500">Inspect</span>
          </button>
          {showStakeoutAction && (
            <button
              onClick={() => {
                setFlag('observed_earl_anomaly')
                advanceBeat('ch1_b4_confront', 'stakeout')
              }}
              disabled={!canStakeOutOffice}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                canStakeOutOffice
                  ? 'bg-slate-700 hover:bg-slate-600'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              Stake out the office
              <span className="float-right text-slate-500">
                {canStakeOutOffice ? 'Begin' : 'Go to Office'}
              </span>
            </button>
          )}
        </div>
        {investigationMessage && (
          <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-600">
            <p className="text-sm text-slate-300 leading-relaxed">{investigationMessage}</p>
          </div>
        )}
      </div>

      {/* Movement */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          Go To
        </h3>
        <div className="space-y-2">
          {adjacentLocations.map((loc) => {
            const canEnter = canEnterLocation(loc.id, flags, timeMarker)
            const occupants = getCharactersAtLocation(loc.id, timeMarker)
            const isGuestRoom = loc.id.startsWith('room_') && loc.id !== 'room_player'
            const isLocked = !!loc.requiresFlag && !flags.includes(loc.requiresFlag)
            const hasRoomPermission = loc.requiresFlag ? flags.includes(loc.requiresFlag) : false
            const isOccupied = !isLocked && isGuestRoom && occupants.length > 0 && !hasRoomPermission
            return (
              <button
                key={loc.id}
                onClick={() => handleMove(loc.id)}
                disabled={!canEnter}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  canEnter
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                {loc.name}
                <span className="float-right text-slate-500">
                  {canEnter ? 'Go' : isLocked ? '🔒' : isOccupied ? 'Occupied' : '🔒'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
