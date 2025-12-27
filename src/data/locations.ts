import type { Location, LocationId } from '../types'

export const LOCATIONS: Record<LocationId, Location> = {
  room_player: {
    id: 'room_player',
    name: 'Your Room',
    description:
      'Room 7. Two beds, one unused. A TV bolted to the dresser. The AC rattles like it has something to say. Through the window, the desert waits.',
    adjacentTo: ['courtyard'],
  },
  room_2: {
    id: 'room_2',
    name: 'Room 2',
    description: "The Chens' room. The DO NOT DISTURB sign sways slightly in the breeze from the AC vent.",
    adjacentTo: ['courtyard'],
  },
  room_4: {
    id: 'room_4',
    name: 'Room 4',
    description: "Diane's room. The curtains are drawn tight. A faint glow suggests a laptop screen inside.",
    adjacentTo: ['courtyard'],
  },
  room_6: {
    id: 'room_6',
    name: 'Room 6',
    description:
      'The door is closed. The DO NOT DISTURB sign looks permanent. You hear nothing from inside, but something tells you someone is there.',
    adjacentTo: ['courtyard'],
    requiresFlag: 'can_enter_room6',
  },
  room_9: {
    id: 'room_9',
    name: 'Room 9',
    description: "Mo's room. A trucker's cap hangs on the door handle. The curtains are open.",
    adjacentTo: ['courtyard'],
  },
  room_11: {
    id: 'room_11',
    name: 'Room 11',
    description: "The Drifter's room. The blinds are bent, as if someone's been peeking through them often.",
    adjacentTo: ['courtyard'],
  },
  parking_lot: {
    id: 'parking_lot',
    name: 'Parking Lot',
    description:
      'Sun-bleached asphalt stretches toward the highway. A few cars sit baking in the heat. The neon VACANCY sign buzzes overhead, fighting the daylight.',
    adjacentTo: ['courtyard', 'office', 'desert'],
  },
  courtyard: {
    id: 'courtyard',
    name: 'Courtyard',
    description:
      'The heart of the motel. A small pool reflects the cloudless sky. Faded lounge chairs wait for guests who never seem to use them. The ice machine hums its eternal song.',
    adjacentTo: [
      'room_player',
      'room_2',
      'room_4',
      'room_6',
      'room_9',
      'room_11',
      'parking_lot',
      'office',
      'diner',
      'back_area',
    ],
  },
  office: {
    id: 'office',
    name: 'Office',
    description:
      "Wood paneling from another era. A rack of tourist brochures for places that probably don't exist anymore. Earl's domain—a desk, a ledger, a wall of room keys on hooks.",
    adjacentTo: ['parking_lot', 'courtyard', 'diner', 'back_room'],
  },
  diner: {
    id: 'diner',
    name: 'Diner',
    description:
      "Red vinyl booths line the windows. The smell of coffee and bacon grease hangs in the air like a memory. A jukebox waits in the corner, patient as everything else here.",
    adjacentTo: ['office', 'courtyard'],
  },
  back_room: {
    id: 'back_room',
    name: 'Back Room',
    description:
      "Earl's private space. A cot, boxes of old belongings, photos on the walls. And something else—a small metal cylinder on a workbench, humming softly.",
    adjacentTo: ['office'],
    requiresFlag: 'has_master_key',
  },
  back_area: {
    id: 'back_area',
    name: 'Back Area',
    description:
      'Dumpsters and storage. The forgotten edge of the motel where the desert starts to reclaim the land. Nothing here but heat and silence.',
    adjacentTo: ['courtyard', 'desert'],
  },
  desert: {
    id: 'desert',
    name: 'Desert',
    description:
      'Red rock and scrub brush stretch to the horizon. Beautiful in a harsh way. Something about it makes you tired just looking at it. Your legs feel heavy.',
    adjacentTo: ['parking_lot', 'back_area'],
  },
}

export const getLocation = (id: LocationId): Location => LOCATIONS[id]

export const getAdjacentLocations = (id: LocationId): Location[] =>
  LOCATIONS[id].adjacentTo.map((adjId) => LOCATIONS[adjId])

export const canEnterLocation = (
  id: LocationId,
  flags: string[]
): boolean => {
  const location = LOCATIONS[id]
  if (!location.requiresFlag) return true
  return flags.includes(location.requiresFlag)
}
