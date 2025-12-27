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
    currentLoop,
    currentTime,
    lastPlayedAt,
    activeObservations,
    flags,
    endingAcknowledged,
    resetLoop,
    advanceTime,
    addObservationEntry,
    setObservations,
    updateLastPlayedAt,
    addInsight,
    acknowledgeEnding,
    resetGame,
  } = useGameStore()

  // UI state
  const [showLoopReset, setShowLoopReset] = useState(false)
  const [selectedTab, setSelectedTab] = useState<TabId>('actions')

  // Track if we've processed idle time this session
  const hasProcessedIdle = useRef(false)

  // Process idle time and observations on app load
  useEffect(() => {
    if (hasProcessedIdle.current) return

    const { shouldProcess, elapsedMs } = shouldProcessIdleTime(lastPlayedAt)

    if (shouldProcess && activeObservations.length > 0) {
      hasProcessedIdle.current = true

      const { entries, newGameTime } = processObservations(
        activeObservations,
        currentTime,
        elapsedMs,
        currentLoop
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

      // If reached midnight, show reset modal (will be handled by the next effect)
    }

    // Update lastPlayedAt on load
    updateLastPlayedAt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  // Update lastPlayedAt when page visibility changes or periodically
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User is leaving - update timestamp
        updateLastPlayedAt()
      }
    }

    // Update timestamp periodically while active (every 30 seconds)
    const intervalId = setInterval(() => {
      updateLastPlayedAt()
    }, 30000)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Also update on beforeunload for browsers that don't fire visibilitychange
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

  // Check for midnight and trigger loop reset
  useEffect(() => {
    if (isMidnight(currentTime) && !showLoopReset) {
      setShowLoopReset(true)
    }
  }, [currentTime, showLoopReset])

  // Handle loop reset
  const handleLoopReset = () => {
    resetLoop()
    setShowLoopReset(false)
    setSelectedTab('actions') // Return to actions tab after reset
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
      {/* Loop Reset Modal */}
      {showLoopReset && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">MIDNIGHT</h2>
            <p className="text-slate-300 mb-2">
              The world stutters. Rewinds. You're back in bed.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              Loop {currentLoop} complete. Beginning Loop {currentLoop + 1}...
            </p>
            <button
              onClick={handleLoopReset}
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
          <span>Loop {currentLoop}</span>
          <span className="text-slate-600">|</span>
          <span>Day 1</span>
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
