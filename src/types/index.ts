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
  location: LocationId | 'gone' | 'erratic'
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
  chapter?: { min?: number; max?: number }
  location?: LocationId
  timeWindow?: { min: number; max: number }
}

export interface SceneEffects {
  setFlags?: string[]
  clearFlags?: string[]
  setTrust?: { character: CharacterId; tier: TrustTier }
  addRapport?: { character: CharacterId; amount: number }
  giveItem?: string
  unlockLocation?: LocationId
  advanceTime?: number
  advanceChapter?: number // Deferred — sets pending, applies at midnight
}

export interface DialogueChoice {
  text: string
  next: string // ID of line to jump to
  effects?: SceneEffects
  requiresFlags?: string[]
  requiresItems?: string[]
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
  oncePer: 'ever' | 'loop' | 'none'
  lines: DialogueLine[]
  effects: SceneEffects
}

// ============================================================================
// OBSERVATION SYSTEM
// ============================================================================

export interface Observation {
  location: LocationId
  startTime: number
  endTime: number
}

export interface ObservationEntry {
  time: number
  location: LocationId
  text: string
  setsFlag?: string
}

// ============================================================================
// GAME STATE
// ============================================================================

export interface PlayerState {
  name: string
  currentLocation: LocationId
}

export interface GameState {
  // Progression
  currentChapter: number // Story chapter (advances via key scenes)
  dayCount: number // Total days lived (increments every midnight)
  pendingChapter: number | null // Chapter to advance to at next midnight
  totalPlayTime: number
  lastPlayedAt: number | null // Timestamp for idle calculations

  // Time
  currentTime: number // Minutes since 6AM (0-1080)

  // Player
  player: PlayerState

  // Flags (core progression system)
  flags: string[]

  // Trust per character (0-2)
  trust: Record<CharacterId, TrustTier>
  rapport: Record<CharacterId, number>

  // Scenes seen
  scenesSeenEver: string[]
  scenesSeenThisDay: string[] // Cleared at each midnight reset

  // Items
  inventory: string[]

  // Observations
  activeObservations: Observation[]
  observationLog: ObservationEntry[]

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
  // Time
  advanceTime: (minutes: number) => void

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

  // Day/Chapter management
  resetDay: () => void
  setPendingChapter: (chapter: number) => void

  // Observations
  setObservations: (observations: Observation[]) => void
  addObservationEntry: (entry: ObservationEntry) => void
  clearObservationLog: () => void
  startObservation: (location: LocationId, startTime?: number, endTime?: number) => void
  stopObservation: (location: LocationId) => void
  updateLastPlayedAt: () => void
  setLastPlayedAt: (timestamp: number | null) => void

  // Insights
  addInsight: (points: number) => void
  spendInsight: (points: number) => boolean
  setCurrentHint: (hint: string | null) => void

  // Save/Load
  resetGame: () => void
  acknowledgeEnding: () => void
  setEndingAcknowledged: (value: boolean) => void
}

// Items that persist across day resets
export const PERSISTENT_ITEMS = [
  'master_key',
  'thomas_journal',
  'facility_map',
  'facility_keycard',
  'sealed_case_files',
  'newspaper_clipping',
  'photograph',
  'vasquez_badge',
] as const

export type PersistentItem = typeof PERSISTENT_ITEMS[number]
