import type { Scene, CharacterId } from '../../types'
import { margeScenes } from './marge'
import { earlScenes } from './earl'
import { karenScenes } from './karen'
import { davidScenes } from './david'
import { vincentScenes } from './vincent'
import { dianeScenes } from './diane'
import { moScenes } from './mo'
import { drifterScenes } from './drifter'
import { endingScenes } from './endings'
import { chapter1Scenes } from './chapter1'

// Combine all scene arrays
const ALL_SCENES: Scene[] = [
  ...chapter1Scenes,
  ...margeScenes,
  ...earlScenes,
  ...karenScenes,
  ...davidScenes,
  ...vincentScenes,
  ...dianeScenes,
  ...moScenes,
  ...drifterScenes,
  ...endingScenes,
]

// Index scenes by character for faster lookup
const scenesByCharacter: Map<CharacterId, Scene[]> = new Map()

for (const scene of ALL_SCENES) {
  const existing = scenesByCharacter.get(scene.character) || []
  existing.push(scene)
  scenesByCharacter.set(scene.character, existing)
}

/**
 * Get all scenes for a specific character
 */
export function getScenesForCharacter(character: CharacterId): Scene[] {
  return scenesByCharacter.get(character) || []
}

/**
 * Get a scene by its ID
 */
export function getSceneById(sceneId: string): Scene | undefined {
  return ALL_SCENES.find((scene) => scene.id === sceneId)
}

/**
 * Get all scenes in the game
 */
export function getAllScenes(): Scene[] {
  return ALL_SCENES
}

export {
  chapter1Scenes,
  margeScenes,
  earlScenes,
  karenScenes,
  davidScenes,
  vincentScenes,
  dianeScenes,
  moScenes,
  drifterScenes,
  endingScenes,
}
