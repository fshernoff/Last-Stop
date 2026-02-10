import type { LocationId, ObservationEntry, CharacterId } from '../types'
import { CHARACTERS, getCharacterLocation, getDrifterLocation } from './characters'

/**
 * Observable events - special one-time events that can be witnessed at specific times/locations
 * These are from Section 14.2 of the game bible
 */
export const OBSERVATION_EVENTS: Omit<ObservationEntry, 'location'>[] & { location: LocationId }[] = [
  // Parking lot events
  { time: 30, location: 'parking_lot', text: "Mo's truck starts up and pulls onto the highway." },
  { time: 120, location: 'parking_lot', text: "Diane's rental car pulls out, heading toward town." },
  { time: 480, location: 'parking_lot', text: "David's car pulls out. He drives fast, like he's angry." },
  { time: 540, location: 'parking_lot', text: "Diane's rental returns." },
  { time: 585, location: 'parking_lot', text: "An unfamiliar white sedan pulls in. The driver doesn't get out.", setsFlag: 'observed_white_sedan' },
  { time: 630, location: 'parking_lot', text: "The white sedan leaves." },
  { time: 660, location: 'parking_lot', text: "David's car returns." },
  { time: 780, location: 'parking_lot', text: "Mo's truck returns." },
  { time: 1000, location: 'parking_lot', text: "The VACANCY sign flickers, then steadies." },

  // Diner events
  { time: 30, location: 'diner', text: "Mo orders eggs and coffee. He's the only customer." },
  { time: 60, location: 'diner', text: "Diane gets coffee. She watches everyone but talks to no one." },
  { time: 120, location: 'diner', text: "Karen and David sit in a booth. They don't speak to each other." },
  { time: 780, location: 'diner', text: "Mo asks Marge about 'old research places' in the area.", setsFlag: 'observed_mo_asks_facility' },
  { time: 800, location: 'diner', text: "The Drifter enters, orders coffee, sees you watching, leaves immediately." },
  { time: 705, location: 'diner', text: "Marge wipes the counter in slow circles, staring out at the highway." },

  // Room 6 events (observing from courtyard since room_6 is locked)
  { time: 60, location: 'courtyard', text: "Earl knocks twice on Room 6. Leaves a tray. No one answers.", setsFlag: 'knows_room6_occupied' },
  { time: 360, location: 'courtyard', text: "Earl brings another tray to Room 6. Still no answer." },
  { time: 720, location: 'courtyard', text: "Earl brings dinner to Room 6. You hear movement inside, but the door stays closed." },
  { time: 900, location: 'courtyard', text: "Pacing sounds from Room 6. Back and forth. Back and forth." },

  // Courtyard events
  { time: 360, location: 'courtyard', text: "Karen sits by the pool, staring at the desert." },
  { time: 540, location: 'courtyard', text: "Karen gets up and walks toward the desert.", setsFlag: 'observed_karen_walks_desert' },
  { time: 240, location: 'courtyard', text: "Diane crosses the courtyard, murmuring into her phone." },

  // Back area events
  { time: 420, location: 'back_area', text: "The Drifter emerges from behind a dumpster, looks around nervously, and disappears again." },
  { time: 960, location: 'back_area', text: "Earl takes out the trash. He stands there for a long moment, staring at the desert." },

  // Desert events
  { time: 600, location: 'desert', text: "Karen walks past, heading toward something in the distance. She doesn't notice you." },
  { time: 650, location: 'desert', text: "Karen returns, walking faster. She looks shaken." },

  // Office events
  { time: 60, location: 'office', text: "Earl checks in on the computer. His face is lit by the blue screen." },
  { time: 480, location: 'office', text: "Earl makes a phone call. He speaks too quietly to hear, then hangs up looking worried." },
  { time: 600, location: 'office', text: "Diane enters the office. She and Earl talk in low voices. You can't hear what they're saying, but Earl looks nervous.", setsFlag: 'observed_diane_earl_talk' },
  { time: 615, location: 'office', text: "Diane leaves the office. Earl stares after her for a long moment." },
  { time: 960, location: 'office', text: "Earl locks up the front desk and heads to the back room. He's carrying something wrapped in cloth - it glows faintly blue.", setsFlag: 'observed_earl_anomaly' },

  // Time/space anomaly observations
  { time: 720, location: 'diner', text: "The diner clock jumps from 6:00 PM to 5:47 PM, then back to 6:01 PM. Marge doesn't notice. Nobody does.", setsFlag: 'observed_time_skip' },
  { time: 1050, location: 'courtyard', text: "The neon VACANCY sign flickers. For a fraction of a second, the courtyard looks different — the pool full, the chairs new, a car from the 1980s in the lot. Then it's gone.", setsFlag: 'observed_reality_flicker' },
  { time: 450, location: 'desert', text: "The Drifter walks past, heading east with a compass. He stops at what should be the old water tower. There's nothing there. He checks the compass again. It spins freely, pointing nowhere.", setsFlag: 'observed_drifter_lost' },
]

/**
 * Character name display mapping
 */
const CHARACTER_NAMES: Record<CharacterId, string> = {
  earl: 'Earl',
  marge: 'Marge',
  karen: 'Karen',
  david: 'David',
  diane: 'Diane',
  mo: 'Mo',
  drifter: 'The Drifter',
  vincent: 'Vincent',
}

/**
 * Generate a description of NPCs arriving at a location
 */
const getArrivalText = (characterId: CharacterId, locationId: LocationId): string => {
  const name = CHARACTER_NAMES[characterId]

  const arrivals: Record<CharacterId, Record<string, string>> = {
    earl: {
      office: `${name} settles in behind the desk.`,
      back_room: `${name} retreats to his private room.`,
      diner: `${name} stops by for a coffee.`,
    },
    marge: {
      diner: `${name} ties on her apron and starts the coffee.`,
    },
    karen: {
      diner: `${name} walks in and takes a booth.`,
      courtyard: `${name} comes out to sit by the pool.`,
      desert: `${name} heads out toward the desert.`,
      room_2: `${name} returns to her room.`,
    },
    david: {
      diner: `${name} walks in, looking distracted.`,
      room_2: `${name} returns to his room.`,
    },
    diane: {
      diner: `${name} takes her usual seat, notebook in hand.`,
      room_4: `${name} returns to her room.`,
    },
    mo: {
      diner: `${name} takes a seat at the counter.`,
      room_9: `${name} heads to his room for the night.`,
    },
    drifter: {
      parking_lot: `The Drifter appears near the parking lot, pacing nervously.`,
      diner: `The Drifter slips into the diner.`,
      courtyard: `The Drifter walks through the courtyard, eyes darting.`,
      back_area: `The Drifter skulks around the back area.`,
      room_11: `The Drifter returns to his room.`,
    },
    vincent: {
      room_6: ``, // Vincent never moves
    },
  }

  return arrivals[characterId]?.[locationId] || `${name} arrives.`
}

/**
 * Generate a description of NPCs departing from a location
 */
const getDepartureText = (characterId: CharacterId, locationId: LocationId): string => {
  const name = CHARACTER_NAMES[characterId]

  const departures: Record<CharacterId, Record<string, string>> = {
    earl: {
      office: `${name} steps away from the desk.`,
    },
    marge: {
      diner: `${name} finishes up and heads home.`,
    },
    karen: {
      diner: `${name} finishes her meal and leaves.`,
      courtyard: `${name} gets up from the pool.`,
    },
    david: {
      diner: `${name} pays his bill and leaves.`,
    },
    diane: {
      diner: `${name} closes her notebook and leaves.`,
    },
    mo: {
      diner: `${name} wipes his mouth and heads out.`,
    },
    drifter: {
      parking_lot: `The Drifter disappears.`,
      diner: `The Drifter slips out.`,
      courtyard: `The Drifter wanders off.`,
    },
    vincent: {},
  }

  return departures[characterId]?.[locationId] || `${name} leaves.`
}

/**
 * Observable locations (not all locations can be observed)
 */
export const OBSERVABLE_LOCATIONS: LocationId[] = [
  'parking_lot',
  'courtyard',
  'office',
  'diner',
  'back_area',
  'desert',
]

/**
 * Simulate observation at a location over a time range.
 * Returns log entries for events that occurred.
 */
export function simulateObservation(
  location: LocationId,
  startTime: number,
  endTime: number,
  loopNumber: number
): ObservationEntry[] {
  const entries: ObservationEntry[] = []

  // Cap at midnight
  const effectiveEndTime = Math.min(endTime, 1080)
  if (startTime >= effectiveEndTime) return entries

  // Track NPC presence to detect arrivals/departures
  const npcsPresent = new Set<CharacterId>()

  // Initialize NPCs present at start time
  for (const charId of Object.keys(CHARACTERS) as CharacterId[]) {
    let charLocation: LocationId | 'gone' | 'erratic'
    if (charId === 'drifter') {
      charLocation = getDrifterLocation(loopNumber, startTime)
    } else {
      charLocation = getCharacterLocation(charId, startTime)
    }
    if (charLocation === location) {
      npcsPresent.add(charId)
    }
  }

  // Check every 15 minutes for NPC movements
  for (let time = startTime; time < effectiveEndTime; time += 15) {
    // Check each NPC
    for (const charId of Object.keys(CHARACTERS) as CharacterId[]) {
      let charLocation: LocationId | 'gone' | 'erratic'
      if (charId === 'drifter') {
        charLocation = getDrifterLocation(loopNumber, time)
      } else {
        charLocation = getCharacterLocation(charId, time)
      }

      const wasPresent = npcsPresent.has(charId)
      const isPresent = charLocation === location

      // Arrival
      if (!wasPresent && isPresent) {
        const text = getArrivalText(charId, location)
        if (text) {
          entries.push({ time, location, text })
        }
        npcsPresent.add(charId)
      }

      // Departure
      if (wasPresent && !isPresent) {
        const text = getDepartureText(charId, location)
        if (text) {
          entries.push({ time, location, text })
        }
        npcsPresent.delete(charId)
      }
    }
  }

  // Add special events that occur in the time window
  for (const event of OBSERVATION_EVENTS) {
    if (
      event.location === location &&
      event.time >= startTime &&
      event.time < effectiveEndTime
    ) {
      entries.push({
        time: event.time,
        location: event.location,
        text: event.text,
        setsFlag: event.setsFlag,
      })
    }
  }

  // Sort by time
  entries.sort((a, b) => a.time - b.time)

  return entries
}
