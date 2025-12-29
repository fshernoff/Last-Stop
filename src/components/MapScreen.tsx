import { useGameStore } from '../store/gameStore'
import { LOCATIONS, canEnterLocation } from '../data/locations'
import { CHARACTERS, getCharacterLocation } from '../data/characters'
import { timeOfDayToMinutes } from '../story/timeOfDay'
import type { LocationId, CharacterId } from '../types'

// Map layout positions (x, y coordinates for visual placement)
const MAP_LAYOUT: Record<LocationId, { x: number; y: number; label: string }> = {
  desert: { x: 2, y: 6, label: 'Desert' },
  back_area: { x: 2, y: 5, label: 'Back Area' },
  room_player: { x: 0, y: 4, label: '7' },
  room_9: { x: 2, y: 4, label: '9' },
  room_11: { x: 4, y: 4, label: '11' },
  courtyard: { x: 2, y: 3, label: 'Courtyard' },
  office: { x: 1, y: 2, label: 'Office' },
  diner: { x: 3, y: 2, label: 'Diner' },
  room_2: { x: 0, y: 1, label: '2' },
  room_4: { x: 2, y: 1, label: '4' },
  room_6: { x: 4, y: 1, label: '6' },
  parking_lot: { x: 2, y: 0, label: 'Parking' },
  back_room: { x: 0, y: 2, label: 'Back Rm' },
}

// NPC short codes for map display
const NPC_CODES: Record<CharacterId, string> = {
  earl: 'E',
  marge: 'M',
  karen: 'K',
  david: 'D',
  diane: 'Di',
  mo: 'Mo',
  drifter: '?',
  vincent: 'V',
}

export function MapScreen() {
  const { player, timeOfDay, flags, moveTo } = useGameStore()
  const currentLocation = player.currentLocation
  const timeMarker = timeOfDayToMinutes(timeOfDay)

  // Get NPC positions
  const getNPCsAtLocation = (locationId: LocationId): CharacterId[] => {
    const npcs: CharacterId[] = []
    for (const [id] of Object.entries(CHARACTERS)) {
      const charId = id as CharacterId
      const loc = getCharacterLocation(charId, timeMarker)
      if (loc === locationId) npcs.push(charId)
    }
    return npcs
  }

  const isCharacterKnown = (charId: CharacterId) => {
    if (flags.includes(`met_${charId}`)) return true
    if (charId === 'vincent' && flags.includes('knows_vincent_exists')) return true
    return false
  }

  // Check if location is adjacent to current location
  const isAdjacent = (locationId: LocationId): boolean => {
    return LOCATIONS[currentLocation].adjacentTo.includes(locationId)
  }

  // Handle location click
  const handleLocationClick = (locationId: LocationId) => {
    if (locationId === currentLocation) return
    if (!isAdjacent(locationId)) return
    if (!canEnterLocation(locationId, flags)) return

    moveTo(locationId)
  }

  // Render a location cell
  const renderLocation = (locationId: LocationId) => {
    const layout = MAP_LAYOUT[locationId]
    const location = LOCATIONS[locationId]
    const isHere = currentLocation === locationId
    const canMove = isAdjacent(locationId)
    const canEnter = canEnterLocation(locationId, flags)
    const isLocked = !canEnter && location.requiresFlag
    const npcsHere = getNPCsAtLocation(locationId)

    // Determine if it's a room (numbered location)
    const isRoom = ['room_player', 'room_2', 'room_4', 'room_6', 'room_9', 'room_11'].includes(locationId)

    return (
      <button
        key={locationId}
        onClick={() => handleLocationClick(locationId)}
        disabled={!canMove || !canEnter || isHere}
        className={`
          relative p-2 rounded border text-xs transition-all
          ${isHere
            ? 'bg-amber-600 border-amber-400 text-white'
            : canMove && canEnter
              ? 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 cursor-pointer'
              : isLocked
                ? 'bg-slate-800 border-slate-700 text-slate-600'
                : 'bg-slate-800 border-slate-700 text-slate-500'
          }
          ${isRoom ? 'min-w-[48px] min-h-[48px]' : 'min-w-[64px] min-h-[48px]'}
        `}
      >
        <div className="font-semibold">{layout.label}</div>
        {isHere && <div className="text-[10px] text-amber-200">YOU</div>}
        {isLocked && <div className="text-[10px]">🔒</div>}
        {npcsHere.length > 0 && !isHere && (
          <div className="text-[10px] text-amber-400 mt-0.5">
            {npcsHere.map((id) => (isCharacterKnown(id) ? NPC_CODES[id] : '?')).join(' ')}
          </div>
        )}
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-amber-400">MAP</h2>

        {/* Visual Map Layout */}
        <div className="flex flex-col items-center gap-2 text-center">
          {/* Row 0: Parking Lot */}
          <div className="flex justify-center gap-2">
            {renderLocation('parking_lot')}
          </div>

          {/* Row 1: Top Rooms */}
          <div className="flex justify-center gap-2">
            {renderLocation('room_2')}
            {renderLocation('room_4')}
            {renderLocation('room_6')}
          </div>

          {/* Row 2: Office/Diner */}
          <div className="flex justify-center gap-2">
            {renderLocation('back_room')}
            {renderLocation('office')}
            {renderLocation('diner')}
          </div>

          {/* Row 3: Courtyard */}
          <div className="flex justify-center gap-2">
            {renderLocation('courtyard')}
          </div>

          {/* Row 4: Bottom Rooms */}
          <div className="flex justify-center gap-2">
            {renderLocation('room_player')}
            {renderLocation('room_9')}
            {renderLocation('room_11')}
          </div>

          {/* Row 5: Back Area */}
          <div className="flex justify-center gap-2">
            {renderLocation('back_area')}
          </div>

          {/* Row 6: Desert */}
          <div className="flex justify-center gap-2">
            {renderLocation('desert')}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-2 text-slate-400 uppercase tracking-wide">
          Legend
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-amber-600 rounded"></span>
            <span>Your location</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">E M K D</span>
            <span>Known NPCs</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Locked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">?</span>
            <span>Unknown</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Tap</span>
            <span>to move</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-500">
          <div className="grid grid-cols-4 gap-1">
            <span><strong>E</strong> Earl</span>
            <span><strong>M</strong> Marge</span>
            <span><strong>K</strong> Karen</span>
            <span><strong>D</strong> David</span>
            <span><strong>Di</strong> Diane</span>
            <span><strong>Mo</strong> Big Mo</span>
            <span><strong>?</strong> Drifter</span>
            <span><strong>V</strong> Vincent</span>
          </div>
        </div>
      </div>
    </div>
  )
}
