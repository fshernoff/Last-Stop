import { useState, useEffect, useRef } from 'react'
import { useGameStore } from './store/gameStore'
import { formatTime, isMidnight } from './utils/time'
import {
  shouldProcessIdleTime,
  processObservations,
} from './utils/observations'
import { ActionsTab } from './components/ActionsTab'
import { MapScreen } from './components/MapScreen'
import { ItemsScreen } from './components/ItemsScreen'
import { KnownScreen } from './components/KnownScreen'
import { ObserveScreen } from './components/ObserveScreen'
import { MenuScreen } from './components/MenuScreen'
import { EndingScreen } from './components/EndingScreen'

type TabId = 'actions' | 'map' | 'items' | 'known' | 'observe' | 'menu'

const TAB_LABELS: Record<TabId, string> = {
  actions: 'Actions',
  map: 'Map',
  items: 'Items',
  known: 'Known',
  observe: 'Observe',
  menu: 'Menu',
}

function App() {
  const {
    currentChapter,
    dayCount,
    pendingChapter,
    currentTime,
    lastPlayedAt,
    activeObservations,
    flags,
    endingAcknowledged,
    resetDay,
    advanceTime,
    addObservationEntry,
    setObservations,
    updateLastPlayedAt,
    addInsight,
    acknowledgeEnding,
    resetGame,
  } = useGameStore()

  // UI state
  const [showDayReset, setShowDayReset] = useState(false)
  const [showChapterTransition, setShowChapterTransition] = useState<number | null>(null)
  const [selectedTab, setSelectedTab] = useState<TabId>('actions')

  // Track if we've processed idle time this session
  const hasProcessedIdle = useRef(false)

  // Process idle time and observations on app load
  useEffect(() => {
    if (hasProcessedIdle.current) return

    const { shouldProcess, elapsedMs } = shouldProcessIdleTime(lastPlayedAt)

    if (shouldProcess && activeObservations.length > 0) {
      hasProcessedIdle.current = true

      const { entries, newGameTime, reachedMidnight } = processObservations(
        activeObservations,
        currentTime,
        elapsedMs,
        dayCount
      )

      // Add observation entries to the log
      for (const entry of entries) {
        addObservationEntry(entry)
      }

      // Advance game time
      if (newGameTime > currentTime) {
        advanceTime(newGameTime - currentTime)
      }

      if (entries.length > 0) {
        const discoveryCount = entries.filter((entry) => entry.setsFlag).length
        const insightEarned = Math.min(3, Math.floor(entries.length / 3) + discoveryCount)
        if (insightEarned > 0) {
          addInsight(insightEarned)
        }
      }

      // Clear active observations after processing
      setObservations([])

      // If we have entries, switch to observe tab to show the log
      if (entries.length > 0) {
        setSelectedTab('observe')
      }

      // If reached midnight, the time advance above will trigger the midnight effect
      if (reachedMidnight && entries.length === 0) {
        // No entries but hit midnight — ensure the reset modal shows
        // (advanceTime already clamped to 1080, the effect below will catch it)
      }
    }

    // Update lastPlayedAt on load
    updateLastPlayedAt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  // Update lastPlayedAt when page visibility changes or periodically
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateLastPlayedAt()
      }
    }

    const intervalId = setInterval(() => {
      updateLastPlayedAt()
    }, 30000)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const handleBeforeUnload = () => {
      updateLastPlayedAt()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      clearInterval(intervalId)
    }
  }, [updateLastPlayedAt])

  // Check for midnight and trigger day reset
  useEffect(() => {
    if (isMidnight(currentTime) && !showDayReset) {
      setShowDayReset(true)
    }
  }, [currentTime, showDayReset])

  // Handle day reset — chapter advancement is now deferred into resetDay()
  const handleDayReset = () => {
    const willAdvanceChapter = pendingChapter !== null && pendingChapter > currentChapter
    resetDay()
    setShowDayReset(false)

    if (willAdvanceChapter) {
      setShowChapterTransition(pendingChapter)
    }

    setSelectedTab('actions')
  }

  const endingId = flags.includes('ending_a')
    ? 'ending_a'
    : flags.includes('ending_d')
      ? 'ending_d'
      : null

  // Render the current tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'actions':
        return <ActionsTab />
      case 'map':
        return <MapScreen />
      case 'items':
        return <ItemsScreen />
      case 'known':
        return <KnownScreen />
      case 'observe':
        return <ObserveScreen />
      case 'menu':
        return <MenuScreen />
      default:
        return <ActionsTab />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-mono flex flex-col">
      {endingId && !endingAcknowledged && (
        <EndingScreen
          endingId={endingId}
          onContinue={() => {
            acknowledgeEnding()
            setSelectedTab('menu')
          }}
          onReset={() => {
            resetGame()
            setSelectedTab('actions')
          }}
        />
      )}
      {/* Chapter Transition Modal */}
      {showChapterTransition !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              CHAPTER {showChapterTransition}
            </h2>
            <p className="text-slate-300 mb-6">
              The day rewinds. New threads are waiting.
            </p>
            <button
              onClick={() => setShowChapterTransition(null)}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {/* Day Reset Modal */}
      {showDayReset && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">MIDNIGHT</h2>
            <p className="text-slate-300 mb-2">
              The world stutters. Rewinds. You're back in bed.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              Day {dayCount} ends.{pendingChapter !== null && pendingChapter > currentChapter
                ? ` Something has shifted...`
                : ` Chapter ${currentChapter} continues.`}
            </p>
            <button
              onClick={handleDayReset}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-semibold transition-colors"
            >
              Wake Up
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center shrink-0">
        <h1 className="text-lg font-bold tracking-wide">LAST STOP</h1>
        <div className="flex gap-4 text-sm text-slate-400">
          <span>Ch. {currentChapter} · Day {dayCount}</span>
          <span className="text-slate-600">|</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-2 py-2">
        <div className="flex justify-around">
          {(Object.keys(TAB_LABELS) as TabId[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex flex-col items-center px-3 py-1 transition-colors ${
                selectedTab === tab
                  ? 'text-amber-400'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <span className="text-xs">{TAB_LABELS[tab]}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default App
