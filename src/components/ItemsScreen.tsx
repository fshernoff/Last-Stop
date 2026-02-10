import { useGameStore } from '../store/gameStore'

// Item metadata with descriptions
const ITEM_DATA: Record<string, { name: string; description: string; persistent?: boolean }> = {
  master_key: {
    name: 'Master Key',
    description: 'A brass key that opens every room in the motel. Earl trusted you with this.',
    persistent: true,
  },
  thomas_journal: {
    name: "Thomas's Journal",
    description: 'A worn leather journal filled with scientific notes and personal entries. The handwriting grows increasingly erratic toward the end.',
    persistent: true,
  },
  facility_keycard: {
    name: 'Facility Keycard',
    description: 'A government-issue keycard with a faded logo. Grants access to somewhere underground.',
    persistent: true,
  },
  facility_map: {
    name: 'Facility Map',
    description: 'A rough map marked with a path into the desert. Mile marker 7 is circled in red.',
    persistent: true,
  },
  coffee_cup: {
    name: 'Cup of Coffee',
    description: "Marge's coffee. Strong enough to wake the dead, she says. Still warm.",
  },
  room6_key: {
    name: 'Room 6 Key',
    description: 'The key to Room 6. The brass is cold to the touch.',
  },
  photograph: {
    name: 'Old Photograph',
    description: 'A faded photo showing a young man in front of scientific equipment. Someone has written "Thomas, 1984" on the back.',
  },
  motel_brochure: {
    name: 'Motel Brochure',
    description: '"Last Stop Motel - Your Oasis in the Desert." The photos show a place that looks nothing like the motel today.',
  },
  truck_key: {
    name: "Mo's Truck Key",
    description: 'The key to Big Mo\'s eighteen-wheeler. He must really trust you.',
  },
  newspaper_clipping: {
    name: 'Newspaper Clipping',
    description: 'A yellowed clipping about a "mysterious incident" at a nearby research facility in 1984. Most of the text is redacted.',
  },
  strange_device: {
    name: 'Strange Device',
    description: 'A small metal cylinder that hums softly when you hold it. It feels warm, despite the metal casing.',
  },
}

export function ItemsScreen() {
  const { inventory } = useGameStore()

  const getItemData = (itemId: string) => {
    return ITEM_DATA[itemId] || {
      name: itemId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: 'An item of some kind.',
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-amber-400">INVENTORY</h2>

        {inventory.length === 0 ? (
          <div className="text-slate-500 text-sm italic">
            You haven't collected any items yet.
          </div>
        ) : (
          <div className="space-y-3">
            {inventory.map((itemId) => {
              const item = getItemData(itemId)
              return (
                <div
                  key={itemId}
                  className="bg-slate-700 rounded p-3 border border-slate-600"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-slate-100">
                      {item.name}
                    </h3>
                    {item.persistent && (
                      <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded">
                        Persists
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Info about persistent items */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wide">
          About Items
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Most items are lost when the day resets at midnight. Items marked{' '}
          <span className="text-amber-400">Persists</span> remain in your
          inventory across resets.
        </p>
      </div>
    </div>
  )
}
