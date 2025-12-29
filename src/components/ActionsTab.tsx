import { useCallback, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { LOCATIONS, getAdjacentLocations, canEnterLocation } from '../data/locations'
import { CHARACTERS, getCharactersAtLocation, getDrifterLocation } from '../data/characters'
import { getTimePeriod } from '../utils/time'
import { selectScene } from '../utils/scenes'
import { getInvestigationResult } from '../data/investigations'
import { DialoguePanel } from './DialoguePanel'
import type { LocationId, Character, Scene, CharacterId, SceneEffects } from '../types'

const TIME_COSTS = {
  move: 15,
  investigate: 15,
  wait: 30,
} as const

export function ActionsTab() {
  const {
    currentLoop,
    currentTime,
    player,
    flags,
    trust,
    scenesSeenEver,
    scenesSeenThisLoop,
    advanceTime,
    moveTo,
    setFlag,
    clearFlag,
    setTrust,
    incrementRapport,
    addItem,
    addInsight,
    setEndingAcknowledged,
    markSceneSeen,
    advanceChapter,
  } = useGameStore()

  const [investigationMessage, setInvestigationMessage] = useState<string | null>(null)

  const [activeScene, setActiveScene] = useState<Scene | null>(null)
  const [noSceneMessage, setNoSceneMessage] = useState<string | null>(null)

  const currentLocation = LOCATIONS[player.currentLocation]
  const adjacentLocations = getAdjacentLocations(player.currentLocation)

  // Get NPCs at current location
  const getNPCsHere = useCallback((): Character[] => {
    const npcs = getCharactersAtLocation(player.currentLocation, currentTime)

    // Handle drifter specially
    const drifterLocation = getDrifterLocation(currentLoop, currentTime)
    if (drifterLocation === player.currentLocation) {
      const drifterChar = npcs.find((c) => c.id === 'drifter')
      if (!drifterChar) {
        return [...npcs, CHARACTERS.drifter]
      }
    }

    return npcs.filter((c) => {
      if (c.id === 'drifter') {
        return drifterLocation === player.currentLocation
      }
      return true
    })
  }, [player.currentLocation, currentTime, currentLoop])

  const npcsHere = getNPCsHere()

  // Handle movement
  const handleMove = (locationId: LocationId) => {
    if (!canEnterLocation(locationId, flags)) return
    moveTo(locationId)
    advanceTime(TIME_COSTS.move)
  }

  // Handle wait action
  const handleWait = (minutes: number) => {
    advanceTime(minutes)
  }

  // Handle investigate
  const handleInvestigate = () => {
    advanceTime(TIME_COSTS.investigate)

    // Combine ever and this-loop seen for investigation check
    const investigationsSeen = [...scenesSeenEver, ...scenesSeenThisLoop]
    const result = getInvestigationResult(player.currentLocation, flags, investigationsSeen)

    if (result) {
      // Apply effects
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
      if (result.effects?.advanceChapter) {
        advanceChapter(result.effects.advanceChapter)
      }

      // Mark investigation as seen
      markSceneSeen(result.id, result.oncePer)

      // Show the investigation text
      setInvestigationMessage(result.text)
      setTimeout(() => setInvestigationMessage(null), 5000)
    } else {
      setInvestigationMessage("You don't notice anything new.")
      setTimeout(() => setInvestigationMessage(null), 2000)
    }
  }

  // Handle talking to an NPC
  const handleTalk = useCallback(
    (characterId: CharacterId) => {
      const gameState = {
        currentLoop,
        flags,
        trust,
        scenesSeenEver,
        scenesSeenThisLoop,
      }

      const scene = selectScene(characterId, gameState)

      if (scene) {
        setActiveScene(scene)
        setNoSceneMessage(null)
      } else {
        const character = CHARACTERS[characterId]
        setNoSceneMessage(`${character.name} has nothing new to say right now.`)
        setTimeout(() => setNoSceneMessage(null), 2000)
      }
    },
    [currentLoop, flags, trust, scenesSeenEver, scenesSeenThisLoop]
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

      if (effects.addRapport) {
        incrementRapport(effects.addRapport.character, effects.addRapport.amount)
      }

      if (effects.giveItem) {
        addItem(effects.giveItem)
      }

      if (effects.advanceTime) {
        advanceTime(effects.advanceTime)
      }

      incrementRapport(activeScene.character)
      markSceneSeen(activeScene.id, activeScene.oncePer)
      if (effects.advanceChapter) {
        advanceChapter(effects.advanceChapter)
      }
      setActiveScene(null)
    },
    [activeScene, setFlag, clearFlag, setTrust, incrementRapport, addItem, advanceTime, setEndingAcknowledged, markSceneSeen, advanceChapter]
  )

  const handleDialogueCancel = useCallback(() => {
    setActiveScene(null)
  }, [])

  // Get time-appropriate atmosphere
  const getAtmosphere = () => {
    const period = getTimePeriod(currentTime)
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
            <span className="float-right text-slate-500">{TIME_COSTS.investigate} min</span>
          </button>
          <button
            onClick={() => handleWait(30)}
            className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Wait...
            <span className="float-right text-slate-500">30 min</span>
          </button>
          <button
            onClick={() => handleWait(60)}
            className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Wait longer...
            <span className="float-right text-slate-500">60 min</span>
          </button>
          <button
            onClick={() => {
              advanceTime(60)
              addInsight(1)
            }}
            className="w-full text-left px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Rest and reflect
            <span className="float-right text-slate-500">+1 insight · 60 min</span>
          </button>
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
            const canEnter = canEnterLocation(loc.id, flags)
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
                  {canEnter ? `${TIME_COSTS.move} min` : '🔒'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
