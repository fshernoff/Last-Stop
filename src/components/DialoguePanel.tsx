import { useState, useCallback, useMemo, useRef } from 'react'
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

function mergeEffects(base: SceneEffects, incoming?: SceneEffects): SceneEffects {
  if (!incoming) return base
  return {
    setFlags: [...new Set([...(base.setFlags || []), ...(incoming.setFlags || [])])],
    clearFlags: [...new Set([...(base.clearFlags || []), ...(incoming.clearFlags || [])])],
    setTrust: incoming.setTrust || base.setTrust,
    giveItem: incoming.giveItem || base.giveItem,
    unlockLocation: incoming.unlockLocation || base.unlockLocation,
    advanceBeat: incoming.advanceBeat || base.advanceBeat,
  }
}

type BranchMode = 'single' | 'topics'

type BranchContext = {
  mode: BranchMode
  targets: Set<string>
  selected: string
  convergeIndex: number | null
  hubIndex: number
}

type RenderedChoice = DialogueChoice & { isEnd?: boolean }

export function DialoguePanel({ scene, onComplete, onCancel }: DialoguePanelProps) {
  const { trust } = useGameStore()
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [showChoices, setShowChoices] = useState(false)
  const branchContextRef = useRef<BranchContext | null>(null)
  const visitedChoicesRef = useRef<Map<number, Set<number>>>(new Map())
  const accumulatedEffectsRef = useRef<SceneEffects>({})

  const lines = scene.lines
  const currentLine = lines[currentLineIndex]
  const choiceMode = currentLine?.choiceMode ?? 'single'
  const isTopicHub = choiceMode === 'topics'
  const character = CHARACTERS[scene.character]
  const trustDots = ['○○○', '●○○', '●●○'][trust[scene.character]]
  const isLastLine = currentLineIndex >= lines.length - 1

  // Check if current line has choices
  const hasChoices = useMemo(() => {
    return currentLine?.choices && currentLine.choices.length > 0
  }, [currentLine])

  const getVisitedChoices = useCallback((lineIndex: number) => {
    const existing = visitedChoicesRef.current.get(lineIndex)
    if (existing) return existing
    const created = new Set<number>()
    visitedChoicesRef.current.set(lineIndex, created)
    return created
  }, [])

  const renderedChoices = useMemo<RenderedChoice[]>(() => {
    if (!currentLine?.choices) return []
    if (choiceMode !== 'topics') return currentLine.choices
    const endText = currentLine.endChoiceText || '[End conversation]'
    return [
      ...currentLine.choices,
      { text: endText, next: '__end__', isEnd: true },
    ]
  }, [currentLine, choiceMode])

  const getConvergenceIndex = useCallback(
    (targets: Set<string>, fromIndex: number) => {
      let lastTargetIndex = -1
      for (let i = fromIndex + 1; i < lines.length; i++) {
        const lineId = lines[i].id
        if (lineId && targets.has(lineId)) {
          lastTargetIndex = i
        }
      }
      if (lastTargetIndex === -1) return null
      for (let i = lastTargetIndex + 1; i < lines.length; i++) {
        if (!lines[i].id) {
          return i
        }
      }
      return null
    },
    [lines]
  )

  // Advance to the next line
  const advanceToNextLine = useCallback(() => {
    const nextIndex = currentLineIndex + 1
    const branchContext = branchContextRef.current

    // Check if we've reached the end
    if (nextIndex >= lines.length) {
      if (branchContext?.mode === 'topics') {
        setCurrentLineIndex(branchContext.hubIndex)
        branchContextRef.current = null
        setShowChoices(true)
        return
      }
      onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
      return
    }

    const nextLine = lines[nextIndex]

    if (branchContext?.mode === 'single') {
      if (
        nextLine.id &&
        branchContext.targets.has(nextLine.id) &&
        nextLine.id !== branchContext.selected
      ) {
        if (branchContext.convergeIndex === null) {
          onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
          return
        }
        setCurrentLineIndex(branchContext.convergeIndex)
        branchContextRef.current = null
        setShowChoices(false)
        return
      }
    }

    if (branchContext?.mode === 'topics') {
      if (branchContext.convergeIndex === nextIndex) {
        setCurrentLineIndex(branchContext.hubIndex)
        branchContextRef.current = null
        setShowChoices(true)
        return
      }

      if (
        nextLine.id &&
        branchContext.targets.has(nextLine.id) &&
        nextLine.id !== branchContext.selected
      ) {
        setCurrentLineIndex(branchContext.hubIndex)
        branchContextRef.current = null
        setShowChoices(true)
        return
      }
    }

    setCurrentLineIndex(nextIndex)

    if (branchContext?.mode === 'single' && branchContext.convergeIndex === nextIndex) {
      branchContextRef.current = null
    }

    setShowChoices(false)
  }, [currentLineIndex, lines, scene.effects, onComplete])

  // Handle clicking continue
  const handleContinue = useCallback(() => {
    if (hasChoices && !showChoices && !isTopicHub) {
      // First click shows choices
      setShowChoices(true)
    } else if (!hasChoices) {
      // No choices, advance to next line
      advanceToNextLine()
    }
  }, [hasChoices, showChoices, isTopicHub, advanceToNextLine])

  // Handle selecting a choice
  const handleChoice = useCallback(
    (choice: RenderedChoice, choiceIndex: number) => {
      if (choice.isEnd) {
        if (currentLine?.convergeTo) {
          const convergeIndex = findLineIndex(lines, currentLine.convergeTo)
          if (convergeIndex === -1) {
            console.warn(
              `Convergence target "${currentLine.convergeTo}" not found in scene ${scene.id}`
            )
            onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
            return
          }
          branchContextRef.current = null
          setCurrentLineIndex(convergeIndex)
          setShowChoices(false)
          return
        }
        onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
        return
      }

      if (isTopicHub) {
        const visited = getVisitedChoices(currentLineIndex)
        if (visited.has(choiceIndex)) return
        visited.add(choiceIndex)
      }

      // Find the target line
      const targetIndex = findLineIndex(lines, choice.next)

      if (targetIndex === -1) {
        // Target not found, end dialogue
        console.warn(`Choice target "${choice.next}" not found in scene ${scene.id}`)
        onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
        return
      }

      if (choice.effects) {
        accumulatedEffectsRef.current = mergeEffects(accumulatedEffectsRef.current, choice.effects)
      }

      const currentChoices = currentLine?.choices || []
      const targets = new Set(currentChoices.map((currentChoice) => currentChoice.next))
      if (isTopicHub) {
        let convergeIndex: number | null = null
        if (currentLine?.convergeTo) {
          const resolvedIndex = findLineIndex(lines, currentLine.convergeTo)
          if (resolvedIndex === -1) {
            console.warn(
              `Convergence target "${currentLine.convergeTo}" not found in scene ${scene.id}`
            )
          } else {
            convergeIndex = resolvedIndex
          }
        }
        branchContextRef.current = {
          mode: 'topics',
          targets,
          selected: choice.next,
          convergeIndex,
          hubIndex: currentLineIndex,
        }
      } else if (targets.size > 1) {
        let convergeIndex: number | null = null
        if (currentLine?.convergeTo) {
          const resolvedIndex = findLineIndex(lines, currentLine.convergeTo)
          if (resolvedIndex === -1) {
            console.warn(
              `Convergence target "${currentLine.convergeTo}" not found in scene ${scene.id}`
            )
            convergeIndex = getConvergenceIndex(targets, currentLineIndex)
          } else {
            convergeIndex = resolvedIndex
          }
        } else {
          convergeIndex = getConvergenceIndex(targets, currentLineIndex)
        }
        branchContextRef.current = {
          mode: 'single',
          targets,
          selected: choice.next,
          convergeIndex,
          hubIndex: currentLineIndex,
        }
      } else {
        branchContextRef.current = null
      }

      setCurrentLineIndex(targetIndex)
      setShowChoices(false)
    },
    [
      lines,
      scene.id,
      scene.effects,
      onComplete,
      currentLine,
      currentLineIndex,
      getConvergenceIndex,
      getVisitedChoices,
      isTopicHub,
    ]
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
    onComplete(mergeEffects(scene.effects, accumulatedEffectsRef.current))
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
        {hasChoices && (showChoices || isTopicHub) ? (
          <div className="space-y-2">
            {isTopicHub && (
              <div className="text-xs text-slate-400 uppercase tracking-wide px-1">
                Topics
              </div>
            )}
            {renderedChoices.map((choice, index) => {
              const isDisabled =
                isTopicHub && !choice.isEnd && getVisitedChoices(currentLineIndex).has(index)
              const baseClasses =
                'w-full text-left px-4 py-3 bg-slate-700 rounded border border-slate-600 transition-colors text-slate-100'
              const hoverClasses = isDisabled ? '' : 'hover:bg-slate-600 hover:border-amber-500'
              const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : ''

              return (
                <button
                  key={index}
                  onClick={() => handleChoice(choice, index)}
                  disabled={isDisabled}
                  className={`${baseClasses} ${hoverClasses} ${disabledClasses}`}
                >
                  <span className="flex justify-between items-center gap-3">
                    <span>{choice.text}</span>
                    {isDisabled && (
                      <span className="text-xs text-slate-400 uppercase tracking-wide">
                        asked
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded font-semibold transition-colors text-white"
          >
            {hasChoices ? 'Choose Response' : isLastLine ? 'End Conversation' : 'Continue'}
          </button>
        )}
      </main>
    </div>
  )
}
