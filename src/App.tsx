import { useState } from 'react'
import { useGameStore } from './store/gameStore'
import { getChapterNumber } from './story/schema'
import { getBeatDefinition } from './story/chapters'
import { TIME_OF_DAY_LABELS } from './story/timeOfDay'
import { ActionsTab } from './components/ActionsTab'
import { MapScreen } from './components/MapScreen'
import { ItemsScreen } from './components/ItemsScreen'
import { KnownScreen } from './components/KnownScreen'
import { MenuScreen } from './components/MenuScreen'
import { EndingScreen } from './components/EndingScreen'

type TabId = 'actions' | 'map' | 'items' | 'known' | 'menu'

const TAB_LABELS: Record<TabId, string> = {
  actions: 'Actions',
  map: 'Map',
  items: 'Items',
  known: 'Known',
  menu: 'Menu',
}

function App() {
  const {
    storyBeatId,
    timeOfDay,
    lastBeatTransition,
    flags,
    endingAcknowledged,
    acknowledgeEnding,
    resetGame,
  } = useGameStore()

  // UI state
  const [selectedTab, setSelectedTab] = useState<TabId>('actions')

  const beatDefinition = getBeatDefinition(storyBeatId as never)
  const chapterNumber = getChapterNumber(beatDefinition.chapterId)

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

      {/* Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center shrink-0">
        <h1 className="text-lg font-bold tracking-wide">LAST STOP</h1>
        <div className="flex gap-4 text-sm text-slate-400">
          <span>Chapter {chapterNumber}</span>
          <span className="text-slate-600">|</span>
          <span>{TIME_OF_DAY_LABELS[timeOfDay]}</span>
          <span className="text-slate-600">|</span>
          <span>{beatDefinition.title}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        {renderTabContent()}
      </main>

      {/* Debug Overlay */}
      <div className="fixed left-3 bottom-20 bg-black/70 text-xs text-slate-200 rounded px-3 py-2 border border-slate-600">
        <div>Beat: {storyBeatId}</div>
        <div>Time: {TIME_OF_DAY_LABELS[timeOfDay]}</div>
        {lastBeatTransition && (
          <div>
            Last: {lastBeatTransition.from} → {lastBeatTransition.to}
          </div>
        )}
      </div>

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
