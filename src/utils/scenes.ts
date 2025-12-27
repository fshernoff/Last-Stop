import type { Scene, CharacterId, GameState, TrustTier } from '../types'
import { getScenesForCharacter } from '../data/scenes'

interface SceneSelectionContext {
  currentLoop: number
  flags: string[]
  trust: Record<CharacterId, TrustTier>
  scenesSeenEver: string[]
  scenesSeenThisLoop: string[]
}

/**
 * Check if a scene's requirements are met
 */
function meetsRequirements(scene: Scene, ctx: SceneSelectionContext): boolean {
  const { requirements } = scene
  const characterTrust = ctx.trust[scene.character]

  // Trust requirement: character trust must be >= required trust
  if (requirements.trust !== undefined && characterTrust < requirements.trust) {
    return false
  }

  // Required flags: all must be present
  if (requirements.flags) {
    for (const flag of requirements.flags) {
      if (!ctx.flags.includes(flag)) {
        return false
      }
    }
  }

  // Forbidden flags: none must be present
  if (requirements.notFlags) {
    for (const flag of requirements.notFlags) {
      if (ctx.flags.includes(flag)) {
        return false
      }
    }
  }

  // Loop requirements
  if (requirements.loop) {
    if (requirements.loop.min !== undefined && ctx.currentLoop < requirements.loop.min) {
      return false
    }
    if (requirements.loop.max !== undefined && ctx.currentLoop > requirements.loop.max) {
      return false
    }
  }

  return true
}

/**
 * Check if a scene has already been seen based on its oncePer constraint
 */
function hasBeenSeen(scene: Scene, ctx: SceneSelectionContext): boolean {
  switch (scene.oncePer) {
    case 'ever':
      return ctx.scenesSeenEver.includes(scene.id)
    case 'loop':
      return ctx.scenesSeenThisLoop.includes(scene.id)
    case 'none':
      return false // Can always repeat
  }
}

/**
 * Select the best scene for a character based on current game state
 *
 * Selection process:
 * 1. Filter to scenes for the given character
 * 2. Filter out scenes whose requirements aren't met
 * 3. Filter out scenes already seen (based on oncePer)
 * 4. Sort by priority (highest first)
 * 5. Return the highest priority scene, or null if none available
 */
export function selectScene(
  character: CharacterId,
  gameState: Pick<GameState, 'currentLoop' | 'flags' | 'trust' | 'scenesSeenEver' | 'scenesSeenThisLoop'>
): Scene | null {
  const ctx: SceneSelectionContext = {
    currentLoop: gameState.currentLoop,
    flags: gameState.flags,
    trust: gameState.trust,
    scenesSeenEver: gameState.scenesSeenEver,
    scenesSeenThisLoop: gameState.scenesSeenThisLoop,
  }

  // Get all scenes for this character
  const characterScenes = getScenesForCharacter(character)

  // Filter to valid, available scenes
  const availableScenes = characterScenes.filter((scene) => {
    // Must meet requirements
    if (!meetsRequirements(scene, ctx)) {
      return false
    }
    // Must not have been seen (based on oncePer)
    if (hasBeenSeen(scene, ctx)) {
      return false
    }
    return true
  })

  if (availableScenes.length === 0) {
    return null
  }

  // Sort by priority (highest first)
  availableScenes.sort((a, b) => b.priority - a.priority)

  return availableScenes[0]
}

/**
 * Get debug info about why scenes are/aren't available for a character
 * Useful for testing and debugging
 */
export function debugSceneSelection(
  character: CharacterId,
  gameState: Pick<GameState, 'currentLoop' | 'flags' | 'trust' | 'scenesSeenEver' | 'scenesSeenThisLoop'>
): {
  available: Scene[]
  unavailable: Array<{ scene: Scene; reason: string }>
} {
  const ctx: SceneSelectionContext = {
    currentLoop: gameState.currentLoop,
    flags: gameState.flags,
    trust: gameState.trust,
    scenesSeenEver: gameState.scenesSeenEver,
    scenesSeenThisLoop: gameState.scenesSeenThisLoop,
  }

  const characterScenes = getScenesForCharacter(character)
  const available: Scene[] = []
  const unavailable: Array<{ scene: Scene; reason: string }> = []

  for (const scene of characterScenes) {
    // Check requirements
    const { requirements } = scene
    const characterTrust = ctx.trust[scene.character]

    if (requirements.trust !== undefined && characterTrust < requirements.trust) {
      unavailable.push({ scene, reason: `Trust ${characterTrust} < required ${requirements.trust}` })
      continue
    }

    if (requirements.flags) {
      const missing = requirements.flags.filter((f) => !ctx.flags.includes(f))
      if (missing.length > 0) {
        unavailable.push({ scene, reason: `Missing flags: ${missing.join(', ')}` })
        continue
      }
    }

    if (requirements.notFlags) {
      const present = requirements.notFlags.filter((f) => ctx.flags.includes(f))
      if (present.length > 0) {
        unavailable.push({ scene, reason: `Has forbidden flags: ${present.join(', ')}` })
        continue
      }
    }

    if (requirements.loop) {
      if (requirements.loop.min !== undefined && ctx.currentLoop < requirements.loop.min) {
        unavailable.push({ scene, reason: `Loop ${ctx.currentLoop} < min ${requirements.loop.min}` })
        continue
      }
      if (requirements.loop.max !== undefined && ctx.currentLoop > requirements.loop.max) {
        unavailable.push({ scene, reason: `Loop ${ctx.currentLoop} > max ${requirements.loop.max}` })
        continue
      }
    }

    // Check if seen
    if (hasBeenSeen(scene, ctx)) {
      unavailable.push({ scene, reason: `Already seen (oncePer: ${scene.oncePer})` })
      continue
    }

    available.push(scene)
  }

  return { available, unavailable }
}
