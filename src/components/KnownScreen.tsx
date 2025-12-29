import { useGameStore } from '../store/gameStore'
import { CHARACTERS } from '../data/characters'
import { getNextHint } from '../utils/hints'
import type { CharacterId, TrustTier } from '../types'

// Knowledge categories
interface KnowledgeEntry {
  flag: string
  text: string
  category: 'people' | 'places' | 'mystery'
  character?: CharacterId
}

// Flag to narrative text mapping
const KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  // Earl
  { flag: 'met_earl', text: 'Met Earl, the motel owner', category: 'people', character: 'earl' },
  { flag: 'knows_earl_son', text: 'Earl had a son named Thomas', category: 'people', character: 'earl' },
  { flag: 'knows_thomas_died', text: 'Thomas died in a car accident forty years ago', category: 'people', character: 'earl' },
  { flag: 'knows_earl_guilt', text: 'Earl blames himself for what happened', category: 'people', character: 'earl' },
  { flag: 'knows_earl_built_device', text: 'Earl activated the device to bring Thomas back', category: 'people', character: 'earl' },
  { flag: 'has_master_key', text: 'Earl gave you the master key', category: 'people', character: 'earl' },

  // Marge
  { flag: 'met_marge', text: "Met Marge, Earl's sister", category: 'people', character: 'marge' },
  { flag: 'knows_marge_worried', text: 'Marge is worried about Earl', category: 'people', character: 'marge' },
  { flag: 'knows_marge_knows', text: 'Marge knows you and Earl share a secret', category: 'people', character: 'marge' },

  // Karen Chen
  { flag: 'met_karen', text: 'Met Karen Chen, staying with her husband', category: 'people', character: 'karen' },
  { flag: 'knows_karen_unhappy', text: 'Karen and David are having marriage troubles', category: 'people', character: 'karen' },
  { flag: 'knows_karen_desert', text: 'Karen takes walks in the desert alone', category: 'people', character: 'karen' },
  { flag: 'knows_karen_saw_something', text: 'Karen saw something strange in the desert', category: 'people', character: 'karen' },

  // David Chen
  { flag: 'met_david', text: 'Met David Chen, another motel guest', category: 'people', character: 'david' },
  { flag: 'knows_david_secret', text: 'David is hiding work trouble from Karen', category: 'people', character: 'david' },

  // Diane
  { flag: 'met_diane', text: 'Met Diane Mercer, who says she\'s in sales', category: 'people', character: 'diane' },
  { flag: 'knows_diane_investigating', text: 'Diane is investigating the 1984 incident', category: 'people', character: 'diane' },
  { flag: 'knows_diane_files', text: 'Diane has sealed case files', category: 'people', character: 'diane' },

  // Mo
  { flag: 'met_mo', text: 'Met Big Mo, a long-haul trucker', category: 'people', character: 'mo' },
  { flag: 'knows_mo_route', text: 'Mo drives this route twice a month', category: 'people', character: 'mo' },
  { flag: 'knows_mo_deja_vu', text: 'Mo feels like he\'s lived this day before', category: 'people', character: 'mo' },

  // Drifter
  { flag: 'met_drifter', text: 'Encountered the Drifter', category: 'people', character: 'drifter' },
  { flag: 'knows_drifter_truth', text: 'The Drifter knows more than he admits', category: 'people', character: 'drifter' },
  { flag: 'knows_drifter_identity', text: 'The Drifter is not what they seem', category: 'people', character: 'drifter' },

  // Vincent
  { flag: 'knows_vincent_exists', text: 'Someone is staying in Room 6', category: 'people', character: 'vincent' },
  { flag: 'met_vincent', text: 'Met Vincent, the mysterious guest', category: 'people', character: 'vincent' },
  { flag: 'knows_vincent_connection', text: 'Vincent has a connection to Thomas', category: 'people', character: 'vincent' },
  { flag: 'can_enter_room6', text: 'Gained access to Room 6', category: 'places' },

  // Places
  { flag: 'explored_office', text: 'The office has old photos on the walls', category: 'places' },
  { flag: 'explored_diner', text: 'The diner has been here since the 1960s', category: 'places' },
  { flag: 'explored_desert', text: 'The desert hides secrets beneath the sand', category: 'places' },
  { flag: 'found_back_room', text: 'There\'s a locked room behind the office', category: 'places' },
  { flag: 'entered_back_room', text: 'The back room contains strange equipment', category: 'places' },

  // Mystery
  { flag: 'knows_1984_incident', text: 'Something happened here in 1984', category: 'mystery' },
  { flag: 'knows_government_involved', text: 'The government covered something up', category: 'mystery' },
  { flag: 'knows_device_purpose', text: 'The device manipulates time itself', category: 'mystery' },
  { flag: 'knows_thomas_role', text: 'Thomas worked on temporal field research', category: 'mystery' },
  { flag: 'knows_facility_location', text: 'The facility lies beyond mile marker 7', category: 'mystery' },
  { flag: 'knows_missing_persons_pattern', text: 'Missing persons cluster around this motel', category: 'mystery' },
]

// Trust tier labels
const TRUST_LABELS: Record<TrustTier, string> = {
  0: 'Stranger',
  1: 'Familiar',
  2: 'Trusted',
}

const TRUST_DOTS: Record<TrustTier, string> = {
  0: '○○○',
  1: '●○○',
  2: '●●○',
}

export function KnownScreen() {
  const {
    flags,
    trust,
    storyBeatId,
    insightPoints,
    spendInsight,
    currentHint,
    setCurrentHint,
  } = useGameStore()

  // Get known entries grouped by category
  const getKnownEntries = (category: KnowledgeEntry['category']) => {
    return KNOWLEDGE_ENTRIES.filter(
      (entry) => entry.category === category && flags.includes(entry.flag)
    )
  }

  // Get characters the player has met
  const getMetCharacters = () => {
    const metFlags = ['met_earl', 'met_marge', 'met_karen', 'met_david', 'met_diane', 'met_mo', 'met_drifter', 'met_vincent']
    const metChars: CharacterId[] = []
    for (const flag of metFlags) {
      if (flags.includes(flag)) {
        const charId = flag.replace('met_', '') as CharacterId
        if (charId in CHARACTERS) {
          metChars.push(charId)
        }
      }
    }
    if (flags.includes('knows_vincent_exists') && !metChars.includes('vincent')) {
      metChars.push('vincent')
    }
    return metChars
  }

  const placeEntries = getKnownEntries('places')
  const mysteryEntries = getKnownEntries('mystery')
  const metCharacters = getMetCharacters()

  const hasAnyKnowledge =
    placeEntries.length > 0 ||
    mysteryEntries.length > 0 ||
    metCharacters.length > 0

  const handleGetHint = () => {
    const success = spendInsight(1)
    if (!success) return
    const hint = getNextHint({ storyBeatId, flags, trust })
    setCurrentHint(hint)
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-amber-400">WHAT YOU KNOW</h2>
          <span className="text-sm text-slate-500">Beat {storyBeatId}</span>
        </div>

        <div className="mb-4 p-3 bg-slate-700/40 rounded border border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase tracking-wide">
              Insight
            </span>
            <span className="text-sm text-amber-400">{insightPoints}</span>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleGetHint}
              disabled={insightPoints < 1}
              className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 text-xs font-semibold rounded transition-colors"
            >
              Spend 1 Insight for a Hint
            </button>
            {currentHint && (
              <button
                onClick={() => setCurrentHint(null)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {currentHint && (
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {currentHint}
            </p>
          )}
        </div>

        {!hasAnyKnowledge ? (
          <div className="text-slate-500 text-sm italic">
            You haven't discovered anything yet. Talk to people and explore to learn more.
          </div>
        ) : (
          <div className="space-y-6">
            {/* People */}
            {metCharacters.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  People
                </h3>
                <div className="space-y-3">
                  {metCharacters.map((charId) => {
                    const char = CHARACTERS[charId]
                    const trustLevel = trust[charId]
                    const charEntries = KNOWLEDGE_ENTRIES.filter(
                      (e) => e.character === charId && flags.includes(e.flag)
                    )

                    return (
                      <div key={charId} className="bg-slate-700/50 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-100">{char.name}</span>
                          <span className="text-xs text-slate-500">
                            {TRUST_DOTS[trustLevel]} {TRUST_LABELS[trustLevel]}
                          </span>
                        </div>
                        {charEntries.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {charEntries.map((entry) => (
                              <li key={entry.flag} className="text-xs text-slate-400 flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>{entry.text}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Places */}
            {placeEntries.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Places
                </h3>
                <ul className="space-y-1">
                  {placeEntries.map((entry) => (
                    <li key={entry.flag} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>{entry.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Mystery */}
            {mysteryEntries.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  The Mystery
                </h3>
                <ul className="space-y-1">
                  {mysteryEntries.map((entry) => (
                    <li key={entry.flag} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>{entry.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
