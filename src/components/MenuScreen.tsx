import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { getBeatDefinition } from '../story/chapters'
import { getChapterNumber } from '../story/schema'

export function MenuScreen() {
  const { resetGame, storyBeatId, insightPoints } = useGameStore()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const beatDefinition = getBeatDefinition(storyBeatId as never)
  const chapterNumber = getChapterNumber(beatDefinition.chapterId)

  const handleReset = () => {
    resetGame()
    setShowResetConfirm(false)
  }

  return (
    <div className="space-y-4">
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 max-w-sm">
            <h2 className="text-lg font-bold text-red-400 mb-3">Reset Game?</h2>
            <p className="text-slate-300 text-sm mb-4">
              This will erase all progress, including flags, items, and trust levels.
              You'll start fresh from Chapter 1.
            </p>
            <p className="text-slate-500 text-xs mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-semibold transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Stats */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-amber-400">MENU</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Current Chapter</span>
            <span className="text-slate-100">{chapterNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Current Beat</span>
            <span className="text-slate-100">{beatDefinition.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Insight Points</span>
            <span className="text-slate-100">{insightPoints}</span>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded transition-colors text-sm"
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          About
        </h3>
        <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
          <p>
            <strong className="text-amber-400">Last Stop</strong> is a time-shift mystery.
            You're unraveling a story at a roadside motel in the desert.
          </p>
          <p>
            Talk to the other guests. Explore. Watch. Learn their secrets.
            Move forward through chapters and uncover what Earl is hiding.
          </p>
          <p>
            The place is haunted by a repeating day from months ago. You move forward,
            but the echoes are everywhere.
          </p>
          <p className="text-slate-500 text-xs">
            Your progress is automatically saved to your browser.
          </p>
        </div>
      </div>

      {/* How to Play */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          How to Play
        </h3>
        <div className="text-xs text-slate-400 space-y-2">
          <div className="flex gap-2">
            <span className="text-amber-400 font-semibold w-16">Actions</span>
            <span>Talk to people, investigate, and move around</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-400 font-semibold w-16">Map</span>
            <span>See where everyone is and travel quickly</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-400 font-semibold w-16">Items</span>
            <span>View collected items and their descriptions</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-400 font-semibold w-16">Known</span>
            <span>Review what you've discovered about people and places</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          Tips
        </h3>
        <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
          <li>Each beat unlocks the next step of the story.</li>
          <li>Building trust with characters unlocks new conversations.</li>
          <li>Some locations and options change by beat.</li>
          <li>Use the map to move quickly between key locations.</li>
          <li>Spend Insight in the Known tab to reveal hints.</li>
        </ul>
      </div>
    </div>
  )
}
