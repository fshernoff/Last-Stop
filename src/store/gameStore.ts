import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getBeatDefinition } from '../story/chapters'
import type { StoryBeatId } from '../story/schema'
import type {
  GameState,
  GameActions,
  LocationId,
  CharacterId,
  TrustTier,
  Scene,
} from '../types'

const INITIAL_TRUST: Record<CharacterId, TrustTier> = {
  earl: 0,
  marge: 0,
  karen: 0,
  david: 0,
  diane: 0,
  mo: 0,
  drifter: 0,
  vincent: 0,
}

const INITIAL_RAPPORT: Record<CharacterId, number> = {
  earl: 0,
  marge: 0,
  karen: 0,
  david: 0,
  diane: 0,
  mo: 0,
  drifter: 0,
  vincent: 0,
}

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

const createInitialState = (): GameState => ({
  storyBeatId: 'ch1_b1_wake',
  beatHistory: ['ch1_b1_wake'],
  lastBeatTransition: null,
  totalPlayTime: 0,
  timeOfDay: 'morning',
  player: {
    name: '',
    currentLocation: 'room_player',
  },
  flags: [],
  trust: { ...INITIAL_TRUST },
  rapport: { ...INITIAL_RAPPORT },
  scenesSeenEver: [],
  scenesSeenThisChapter: [],
  inventory: [],
  insightPoints: 0,
  currentHint: null,
  endingAcknowledged: false,
})

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      // Location
      moveTo: (location: LocationId) => {
        set((state) => ({
          player: { ...state.player, currentLocation: location },
        }))
      },

      // Flags
      setFlag: (flag: string) => {
        set((state) => {
          if (state.flags.includes(flag)) return state
          return { flags: [...state.flags, flag] }
        })
      },

      clearFlag: (flag: string) => {
        set((state) => ({
          flags: state.flags.filter((f) => f !== flag),
        }))
      },

      hasFlag: (flag: string) => {
        return get().flags.includes(flag)
      },

      // Trust
      setTrust: (character: CharacterId, tier: TrustTier) => {
        set((state) => ({
          trust: { ...state.trust, [character]: tier },
        }))
      },

      getTrust: (character: CharacterId) => {
        return get().trust[character]
      },

      incrementRapport: (character: CharacterId, amount = 1) => {
        set((state) => {
          const nextRapport = {
            ...state.rapport,
            [character]: (state.rapport[character] || 0) + amount,
          }

          const boostFlags = TRUST_BOOST_FLAGS[character] || []
          const hasBoost = boostFlags.some((flag) => state.flags.includes(flag))

          const currentTrust = state.trust[character]
          let nextTrust = currentTrust
          const rapportValue = nextRapport[character]

          if (currentTrust < 1 && rapportValue >= TRUST_TIER1_THRESHOLD) {
            nextTrust = 1
          }
          if (
            currentTrust < 2 &&
            rapportValue >= TRUST_TIER2_THRESHOLD &&
            hasBoost
          ) {
            nextTrust = 2
          }

          return {
            rapport: nextRapport,
            trust:
              nextTrust !== currentTrust
                ? { ...state.trust, [character]: nextTrust }
                : state.trust,
          }
        })
      },

      // Scenes
      markSceneSeen: (sceneId: string, oncePer: Scene['oncePer']) => {
        set((state) => {
          const updates: Partial<GameState> = {}

          if (oncePer === 'ever' && !state.scenesSeenEver.includes(sceneId)) {
            updates.scenesSeenEver = [...state.scenesSeenEver, sceneId]
          }

          if (
            (oncePer === 'loop' || oncePer === 'chapter' || oncePer === 'ever') &&
            !state.scenesSeenThisChapter.includes(sceneId)
          ) {
            updates.scenesSeenThisChapter = [...state.scenesSeenThisChapter, sceneId]
          }

          return updates
        })
      },

      hasSeenScene: (sceneId: string, oncePer: Scene['oncePer']) => {
        const state = get()
        if (oncePer === 'ever') {
          return state.scenesSeenEver.includes(sceneId)
        }
        if (oncePer === 'loop') {
          return state.scenesSeenThisChapter.includes(sceneId)
        }
        if (oncePer === 'chapter') {
          return state.scenesSeenThisChapter.includes(sceneId)
        }
        if (oncePer === 'beat') {
          return state.scenesSeenThisChapter.includes(sceneId)
        }
        return false // 'none' means can always repeat
      },

      // Inventory
      addItem: (item: string) => {
        set((state) => {
          if (state.inventory.includes(item)) return state
          return { inventory: [...state.inventory, item] }
        })
      },

      removeItem: (item: string) => {
        set((state) => ({
          inventory: state.inventory.filter((i) => i !== item),
        }))
      },

      hasItem: (item: string) => {
        return get().inventory.includes(item)
      },

      // Story progression
      advanceBeat: (nextBeatId: string, reason = 'progression') => {
        set((state) => {
          const nextBeat = getBeatDefinition(nextBeatId as StoryBeatId)
          const currentBeat = getBeatDefinition(state.storyBeatId as StoryBeatId)
          const isChapterChange = nextBeat.chapterId !== currentBeat.chapterId

          return {
            storyBeatId: nextBeat.id,
            beatHistory: [...state.beatHistory, nextBeat.id],
            lastBeatTransition: {
              from: state.storyBeatId,
              to: nextBeat.id,
              reason,
              at: Date.now(),
            },
            timeOfDay: nextBeat.timeOfDay ?? state.timeOfDay,
            scenesSeenThisChapter: isChapterChange ? [] : state.scenesSeenThisChapter,
          }
        })
      },

      // Insights
      addInsight: (points: number) => {
        set((state) => ({
          insightPoints: state.insightPoints + points,
        }))
      },

      spendInsight: (points: number) => {
        const state = get()
        if (state.insightPoints < points) return false
        set({ insightPoints: state.insightPoints - points })
        return true
      },

      setCurrentHint: (hint: string | null) => {
        set({ currentHint: hint })
      },

      // Save/Load
      resetGame: () => {
        set(createInitialState())
      },

      acknowledgeEnding: () => {
        set({ endingAcknowledged: true })
      },

      setEndingAcknowledged: (value: boolean) => {
        set({ endingAcknowledged: value })
      },
    }),
    {
      name: 'last-stop-save',
      version: 3,
      migrate: () => createInitialState(),
      partialize: (state) => {
        // Don't persist action functions, only state
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { moveTo, setFlag, clearFlag, hasFlag, setTrust, getTrust, incrementRapport, markSceneSeen, hasSeenScene, addItem, removeItem, hasItem, advanceBeat, addInsight, spendInsight, setCurrentHint, resetGame, acknowledgeEnding, setEndingAcknowledged, ...persistedState } = state
        return persistedState
      },
    }
  )
)
