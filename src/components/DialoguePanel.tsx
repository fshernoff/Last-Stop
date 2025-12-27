import { useState, useCallback, useMemo } from 'react'
import type { Scene, DialogueLine, DialogueChoice, SceneEffects } from '../types'
import { CHARACTERS } from '../data/characters'
import { useGameStore } from '../store/gameStore'

interface DialoguePanelProps {
  scene: Scene
  onComplete: (effects: SceneEffects) => void
  onCancel: () => void
}

/**
 * Find the index of a line by its ID
 */
function findLineIndex(lines: DialogueLine[], id: string): number {
  return lines.findIndex((line) => line.id === id)
}

/**
 * Find the next "convergence point" - a line without an ID that comes after branch targets
 * This is used after showing a branch target to find where to continue
 */
function findConvergencePoint(lines: DialogueLine[], fromIndex: number): number {
  // Look for a line without an ID (main flow), or return -1 if we hit end
  for (let i = fromIndex; i < lines.length; i++) {
    if (!lines[i].id) {
      return i
    }
  }
  return -1 // No convergence point found, dialogue ends
}

function mergeEffects(base: SceneEffects, incoming?: SceneEffects): SceneEffects {
  if (!incoming) return base
  return {
    setFlags: [...new Set([...(base.setFlags || []), ...(incoming.setFlags || [])])],
    clearFlags: [...new Set([...(base.clearFlags || []), ...(incoming.clearFlags || [])])],
    setTrust: incoming.setTrust || base.setTrust,
    addRapport: incoming.addRapport || base.addRapport,
    giveItem: incoming.giveItem || base.giveItem,
    unlockLocation: incoming.unlockLocation || base.unlockLocation,
    advanceTime:
      base.advanceTime || incoming.advanceTime
        ? (base.advanceTime || 0) + (incoming.advanceTime || 0)
        : undefined,
  }
}

export function DialoguePanel({ scene, onComplete, onCancel }: DialoguePanelProps) {
  const { trust } = useGameStore()
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const [isInBranch, setIsInBranch] = useState(false)
  const [accumulatedEffects, setAccumulatedEffects] = useState<SceneEffects>({})

  const lines = scene.lines
  const currentLine = lines[currentLineIndex]
  const character = CHARACTERS[scene.character]
  const trustDots = ['○○○', '●○○', '●●○'][trust[scene.character]]

  // Check if current line has choices
  const hasChoices = useMemo(() => {
    return currentLine?.choices && currentLine.choices.length > 0
  }, [currentLine])

  // Advance to the next line
  const advanceToNextLine = useCallback(() => {
    const nextIndex = currentLineIndex + 1

    // Check if we've reached the end
    if (nextIndex >= lines.length) {
      onComplete(mergeEffects(scene.effects, accumulatedEffects))
      return
    }

    const nextLine = lines[nextIndex]

    // If we're in a branch and hit another branch target (line with ID), skip to convergence
    if (isInBranch && nextLine.id) {
      const convergenceIndex = findConvergencePoint(lines, nextIndex)
      if (convergenceIndex === -1) {
        // No convergence point, dialogue ends
        onComplete(mergeEffects(scene.effects, accumulatedEffects))
        return
      }
      setCurrentLineIndex(convergenceIndex)
      setIsInBranch(false)
    } else {
      setCurrentLineIndex(nextIndex)
      if (!nextLine.id) {
        setIsInBranch(false)
      }
    }

    setShowChoices(false)
  }, [currentLineIndex, lines, isInBranch, scene.effects, accumulatedEffects, onComplete])

  // Handle clicking continue
  const handleContinue = useCallback(() => {
    if (hasChoices && !showChoices) {
      // First click shows choices
      setShowChoices(true)
    } else if (!hasChoices) {
      // No choices, advance to next line
      advanceToNextLine()
    }
  }, [hasChoices, showChoices, advanceToNextLine])

  // Handle selecting a choice
  const handleChoice = useCallback(
    (choice: DialogueChoice) => {
      // Find the target line
      const targetIndex = findLineIndex(lines, choice.next)

      if (targetIndex === -1) {
        // Target not found, end dialogue
        console.warn(`Choice target "${choice.next}" not found in scene ${scene.id}`)
        onComplete(mergeEffects(scene.effects, accumulatedEffects))
        return
      }

      if (choice.effects) {
        setAccumulatedEffects((prev) => mergeEffects(prev, choice.effects))
      }

      setCurrentLineIndex(targetIndex)
      setIsInBranch(true)
      setShowChoices(false)
    },
    [lines, scene.id, scene.effects, accumulatedEffects, onComplete]
  )

  // Render speaker label
  const renderSpeaker = () => {
    switch (currentLine.speaker) {
      case 'npc':
        return (
          <span className="text-amber-400 font-semibold uppercase tracking-wide">
            {character.name}
          </span>
        )
      case 'player':
        return (
          <span className="text-blue-400 font-semibold uppercase tracking-wide">
            You
          </span>
        )
      case 'narration':
        return null
    }
  }

  if (!currentLine) {
    // Safety check - shouldn't happen
    onComplete(mergeEffects(scene.effects, accumulatedEffects))
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center shrink-0">
        <div className="text-sm text-slate-400">
          Talking to {character.name}
          <span className="ml-3 text-xs text-slate-500">Trust {trustDots}</span>
        </div>
        <button
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          [X]
        </button>
      </header>

      {/* Dialogue Content */}
      <main className="flex-1 flex flex-col justify-end p-4 overflow-hidden">
        {/* Current Line */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4">
          {currentLine.speaker !== 'narration' && (
            <div className="mb-2">{renderSpeaker()}</div>
          )}
          <p
            className={`leading-relaxed ${
              currentLine.speaker === 'narration'
                ? 'text-slate-400 italic'
                : 'text-slate-100'
            }`}
          >
            {currentLine.text}
          </p>
        </div>

        {/* Choices or Continue */}
        {showChoices && hasChoices ? (
          <div className="space-y-2">
            {currentLine.choices!.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice)}
                className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 hover:border-amber-500 transition-colors text-slate-100"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded font-semibold transition-colors text-white"
          >
            {hasChoices ? 'Choose Response' : 'Continue'}
          </button>
        )}
      </main>
    </div>
  )
}
