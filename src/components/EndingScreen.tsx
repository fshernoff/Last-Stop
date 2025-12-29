interface EndingScreenProps {
  endingId: 'ending_a' | 'ending_d'
  onContinue: () => void
  onReset: () => void
}

const ENDING_CONTENT: Record<EndingScreenProps['endingId'], { title: string; summary: string }> = {
  ending_a: {
    title: 'Ending A: Release',
    summary:
      'Earl lets go. The cycle breaks. Morning comes for the first time in months.',
  },
  ending_d: {
    title: 'Ending D: Stay',
    summary:
      'You choose the reset. The day rewinds, but now it feels like a choice.',
  },
}

export function EndingScreen({ endingId, onContinue, onReset }: EndingScreenProps) {
  const content = ENDING_CONTENT[endingId]

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-amber-400">{content.title}</h2>
        <p className="text-slate-300 text-sm leading-relaxed">{content.summary}</p>
        <p className="text-slate-500 text-xs">
          You can keep exploring for other endings, or reset to start fresh.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded font-semibold transition-colors"
          >
            Keep Exploring
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 rounded font-semibold transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  )
}
