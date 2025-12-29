// ============================================================================
// CORE IDENTIFIERS
// ============================================================================

export type LocationId =
  | 'room_player'
  | 'room_2'
  | 'room_4'
  | 'room_6'
  | 'room_9'
  | 'room_11'
  | 'parking_lot'
  | 'courtyard'
  | 'office'
  | 'diner'
  | 'back_room'
  | 'back_area'
  | 'desert'

export type CharacterId =
  | 'earl'
  | 'marge'
  | 'karen'
  | 'david'
  | 'diane'
  | 'mo'
  | 'drifter'
  | 'vincent'

export type TrustTier = 0 | 1 | 2

// ============================================================================
// LOCATION DATA
// ============================================================================

export interface Location {
  id: LocationId
  name: string
  description: string
  adjacentTo: LocationId[]
  requiresFlag?: string
}

// ============================================================================
// CHARACTER DATA
// ============================================================================

export interface ScheduleEntry {
  startTime: number // Minutes since 6AM (0-1080)
  endTime: number
  location: LocationId | 'gone'
}

export interface Character {
  id: CharacterId
  name: string
  room: LocationId | null
  schedule: ScheduleEntry[]
}

// ============================================================================
// SCENE/DIALOGUE SYSTEM
// ============================================================================

export interface SceneRequirements {
  trust?: TrustTier
  flags?: string[]
  notFlags?: string[]
  beat?: string | string[]
  chapter?: { min?: number; max?: number }
}

export interface SceneEffects {
  setFlags?: string[]
  clearFlags?: string[]
  setTrust?: { character: CharacterId; tier: TrustTier }
  // Legacy fields kept for transitional content; ignored by beat-gated runtime.
  advanceTime?: number
  advanceChapter?: number
  giveItem?: string
  unlockLocation?: LocationId
  advanceBeat?: string
}

export interface DialogueChoice {
  text: string
  next: string // ID of line to jump to
  effects?: SceneEffects
}

export interface DialogueLine {
  id?: string // For jump targets
  speaker: 'npc' | 'player' | 'narration'
  text: string
  choices?: DialogueChoice[]
  convergeTo?: string // ID to continue after multi-branch choices
  choiceMode?: 'single' | 'topics'
  endChoiceText?: string
}

export interface Scene {
  id: string
  character: CharacterId
  requirements: SceneRequirements
  priority: number // 0-100, higher = chosen first
  oncePer: 'ever' | 'loop' | 'chapter' | 'beat' | 'none'
  lines: DialogueLine[]
  effects: SceneEffects
}

// ============================================================================
// GAME STATE
// ============================================================================

export interface PlayerState {
  name: string
  currentLocation: LocationId
}

export interface GameState {
  // Meta
  storyBeatId: string
  beatHistory: string[]
  lastBeatTransition: { from: string; to: string; reason: string; at: number } | null
  totalPlayTime: number
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'

  // Player
  player: PlayerState

  // Flags (core progression system)
  flags: string[]

  // Trust per character (0-2)
  trust: Record<CharacterId, TrustTier>
  rapport: Record<CharacterId, number>

  // Scenes seen
  scenesSeenEver: string[]
  scenesSeenThisChapter: string[]

  // Items
  inventory: string[]

  // Insights
  insightPoints: number

  // Hint system
  currentHint: string | null

  // Endings
  endingAcknowledged: boolean
}

// ============================================================================
// STORE ACTIONS
// ============================================================================

export interface GameActions {
  // Location
  moveTo: (location: LocationId) => void

  // Flags
  setFlag: (flag: string) => void
  clearFlag: (flag: string) => void
  hasFlag: (flag: string) => boolean

  // Trust
  setTrust: (character: CharacterId, tier: TrustTier) => void
  getTrust: (character: CharacterId) => TrustTier
  incrementRapport: (character: CharacterId, amount?: number) => void

  // Scenes
  markSceneSeen: (sceneId: string, oncePer: Scene['oncePer']) => void
  hasSeenScene: (sceneId: string, oncePer: Scene['oncePer']) => boolean

  // Inventory
  addItem: (item: string) => void
  removeItem: (item: string) => void
  hasItem: (item: string) => boolean

  // Story progression
  advanceBeat: (nextBeatId: string, reason?: string) => void

  // Insights
  addInsight: (points: number) => void
  spendInsight: (points: number) => boolean
  setCurrentHint: (hint: string | null) => void

  // Save/Load
  resetGame: () => void
  acknowledgeEnding: () => void
  setEndingAcknowledged: (value: boolean) => void
}
