import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PERSISTENT_ITEMS } from '../types'
import type {
  GameState,
  GameActions,
  LocationId,
  CharacterId,
  TrustTier,
  Scene,
  Observation,
  ObservationEntry,
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
  currentLoop: 1,
  totalPlayTime: 0,
  lastPlayedAt: null,
  currentTime: 0, // 6:00 AM
  player: {
    name: '',
    currentLocation: 'room_player',
  },
  flags: [],
  trust: { ...INITIAL_TRUST },
  rapport: { ...INITIAL_RAPPORT },
  scenesSeenEver: [],
  scenesSeenThisLoop: [],
  inventory: [],
  activeObservations: [],
  observationLog: [],
  insightPoints: 0,
  currentHint: null,
  endingAcknowledged: false,
})

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      // Time
      advanceTime: (minutes: number) => {
        set((state) => {
          const newTime = state.currentTime + minutes
          // If past midnight (1080 = 18 hours from 6AM), trigger day reset
          if (newTime >= 1080) {
            // Will be handled by game logic checking this
            return {
              currentTime: 1080,
              totalPlayTime: state.totalPlayTime + minutes,
            }
          }
          return {
            currentTime: newTime,
            totalPlayTime: state.totalPlayTime + minutes,
          }
        })
      },

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
            (oncePer === 'loop' || oncePer === 'ever') &&
            !state.scenesSeenThisLoop.includes(sceneId)
          ) {
            updates.scenesSeenThisLoop = [...state.scenesSeenThisLoop, sceneId]
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
          return state.scenesSeenThisLoop.includes(sceneId)
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

      // Day/Chapter management
      resetDay: () => {
        set((state) => {
          // Decay trust: tier 2 -> tier 1
          const decayedTrust = Object.fromEntries(
            Object.entries(state.trust).map(([char, tier]) => [
              char,
              tier === 2 ? 1 : tier,
            ])
          ) as Record<CharacterId, TrustTier>

          // Keep only persistent items
          const persistentItems = state.inventory.filter((item) =>
            (PERSISTENT_ITEMS as readonly string[]).includes(item)
          )

          const flags = state.flags.includes('day_reset_occurred')
            ? state.flags
            : [...state.flags, 'day_reset_occurred']

          return {
            currentTime: 0,
            player: {
              ...state.player,
              currentLocation: 'room_player',
            },
            trust: decayedTrust,
            scenesSeenThisLoop: [],
            inventory: persistentItems,
            activeObservations: [],
            observationLog: [],
            currentHint: null,
            flags,
          }
        })
      },

      advanceChapter: (chapter?: number) => {
        set((state) => {
          const nextChapter = Math.max(state.currentLoop, chapter ?? state.currentLoop + 1)

          // Decay trust: tier 2 -> tier 1
          const decayedTrust = Object.fromEntries(
            Object.entries(state.trust).map(([char, tier]) => [
              char,
              tier === 2 ? 1 : tier,
            ])
          ) as Record<CharacterId, TrustTier>

          // Keep only persistent items
          const persistentItems = state.inventory.filter((item) =>
            (PERSISTENT_ITEMS as readonly string[]).includes(item)
          )

          const flags = state.flags.includes('day_reset_occurred')
            ? state.flags
            : [...state.flags, 'day_reset_occurred']

          return {
            currentLoop: nextChapter,
            currentTime: 0,
            player: {
              ...state.player,
              currentLocation: 'room_player',
            },
            trust: decayedTrust,
            scenesSeenThisLoop: [],
            inventory: persistentItems,
            activeObservations: [],
            observationLog: [],
            currentHint: null,
            flags,
          }
        })
      },

      // Observations
      setObservations: (observations: Observation[]) => {
        set({ activeObservations: observations })
      },

      addObservationEntry: (entry: ObservationEntry) => {
        set((state) => ({
          observationLog: [...state.observationLog, entry],
        }))
      },

      clearObservationLog: () => {
        set({ observationLog: [] })
      },

      startObservation: (location: LocationId, startTime?: number, endTime?: number) => {
        set((state) => {
          if (state.activeObservations.length >= 3) return state
          // Don't add duplicate observations for the same location
          if (state.activeObservations.some((obs) => obs.location === location)) {
            return state
          }
          const newObservation: Observation = {
            location,
            startTime: startTime ?? state.currentTime,
            endTime: endTime ?? 1080, // Until midnight
          }
          return {
            activeObservations: [...state.activeObservations, newObservation],
          }
        })
      },

      stopObservation: (location: LocationId) => {
        set((state) => ({
          activeObservations: state.activeObservations.filter(
            (obs) => obs.location !== location
          ),
        }))
      },

      updateLastPlayedAt: () => {
        set({ lastPlayedAt: Date.now() })
      },

      setLastPlayedAt: (timestamp: number | null) => {
        set({ lastPlayedAt: timestamp })
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
      version: 2,
      partialize: (state) => {
        // Don't persist action functions, only state
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { advanceTime, moveTo, setFlag, clearFlag, hasFlag, setTrust, getTrust, incrementRapport, markSceneSeen, hasSeenScene, addItem, removeItem, hasItem, resetDay, advanceChapter, setObservations, addObservationEntry, clearObservationLog, startObservation, stopObservation, updateLastPlayedAt, setLastPlayedAt, addInsight, spendInsight, setCurrentHint, resetGame, acknowledgeEnding, setEndingAcknowledged, ...persistedState } = state
        return persistedState
      },
    }
  )
)
