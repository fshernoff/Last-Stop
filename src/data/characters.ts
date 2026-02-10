import type { Character, CharacterId, LocationId } from '../types'

export const CHARACTERS: Record<CharacterId, Character> = {
  earl: {
    id: 'earl',
    name: 'Earl',
    room: null,
    schedule: [
      { startTime: 0, endTime: 960, location: 'office' }, // 6AM-10PM
      { startTime: 960, endTime: 1080, location: 'back_room' }, // 10PM-12AM
    ],
  },
  marge: {
    id: 'marge',
    name: 'Marge',
    room: null,
    schedule: [
      { startTime: 0, endTime: 960, location: 'diner' }, // 6AM-10PM
      { startTime: 960, endTime: 1080, location: 'gone' }, // Goes home
    ],
  },
  karen: {
    id: 'karen',
    name: 'Karen Chen',
    room: 'room_2',
    schedule: [
      { startTime: 0, endTime: 60, location: 'room_2' }, // 6-7AM
      { startTime: 60, endTime: 120, location: 'room_2' }, // 7-8AM (argue)
      { startTime: 120, endTime: 180, location: 'diner' }, // 8-9AM
      { startTime: 180, endTime: 540, location: 'courtyard' }, // 9AM-3PM
      { startTime: 540, endTime: 660, location: 'desert' }, // 3-5PM (walks)
      { startTime: 660, endTime: 720, location: 'diner' }, // 5-6PM
      { startTime: 720, endTime: 1080, location: 'room_2' }, // 6PM-12AM
    ],
  },
  david: {
    id: 'david',
    name: 'David Chen',
    room: 'room_2',
    schedule: [
      { startTime: 0, endTime: 60, location: 'room_2' }, // 6-7AM
      { startTime: 60, endTime: 120, location: 'room_2' }, // 7-8AM (argue)
      { startTime: 120, endTime: 180, location: 'diner' }, // 8-9AM
      { startTime: 180, endTime: 480, location: 'room_2' }, // 9AM-2PM
      { startTime: 480, endTime: 660, location: 'gone' }, // 2-5PM (drives)
      { startTime: 660, endTime: 720, location: 'diner' }, // 5-6PM
      { startTime: 720, endTime: 1080, location: 'room_2' }, // 6PM-12AM
    ],
  },
  diane: {
    id: 'diane',
    name: 'Diane Mercer',
    room: 'room_4',
    schedule: [
      { startTime: 0, endTime: 60, location: 'room_4' }, // 6-7AM
      { startTime: 60, endTime: 120, location: 'diner' }, // 7-8AM
      { startTime: 120, endTime: 540, location: 'gone' }, // 8AM-3PM (town)
      { startTime: 540, endTime: 780, location: 'room_4' }, // 3-7PM
      { startTime: 780, endTime: 900, location: 'diner' }, // 7-9PM
      { startTime: 900, endTime: 1080, location: 'room_4' }, // 9PM-12AM
    ],
  },
  mo: {
    id: 'mo',
    name: 'Big Mo',
    room: 'room_9',
    schedule: [
      { startTime: 0, endTime: 30, location: 'diner' }, // 6-6:30AM
      { startTime: 30, endTime: 780, location: 'gone' }, // 6:30AM-7PM (route)
      { startTime: 780, endTime: 960, location: 'diner' }, // 7-10PM
      { startTime: 960, endTime: 1080, location: 'room_9' }, // 10PM-12AM
    ],
  },
  drifter: {
    id: 'drifter',
    name: 'The Drifter',
    room: 'room_11',
    schedule: [
      // Erratic schedule - handled specially
      { startTime: 0, endTime: 1080, location: 'erratic' },
    ],
  },
  vincent: {
    id: 'vincent',
    name: 'Vincent',
    room: 'room_6',
    schedule: [
      // Never leaves room
      { startTime: 0, endTime: 1080, location: 'room_6' },
    ],
  },
}

export const getCharacter = (id: CharacterId): Character => CHARACTERS[id]

/**
 * Get the location of a character at a specific time
 */
export const getCharacterLocation = (
  characterId: CharacterId,
  time: number
): LocationId | 'gone' | 'erratic' => {
  const character = CHARACTERS[characterId]

  for (const entry of character.schedule) {
    if (time >= entry.startTime && time < entry.endTime) {
      return entry.location
    }
  }

  // Fallback: return their room or 'gone'
  return character.room ?? 'gone'
}

/**
 * Get all characters at a specific location at a specific time
 */
export const getCharactersAtLocation = (
  locationId: LocationId,
  time: number
): Character[] => {
  return Object.values(CHARACTERS).filter((character) => {
    const charLocation = getCharacterLocation(character.id, time)
    return charLocation === locationId
  })
}

/**
 * Get drifter's location based on loop number and time
 * Pseudo-random but deterministic per loop
 */
export const getDrifterLocation = (
  loopNumber: number,
  time: number
): LocationId | 'gone' => {
  // Simple deterministic pattern based on loop and time
  const seed = (loopNumber * 17 + Math.floor(time / 60)) % 7

  const drifterLocations: (LocationId | 'gone')[] = [
    'parking_lot',
    'diner',
    'courtyard',
    'gone',
    'back_area',
    'parking_lot',
    'room_11',
  ]

  return drifterLocations[seed]
}
