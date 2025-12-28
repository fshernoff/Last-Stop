import type { LocationId, SceneEffects } from '../types'

/**
 * Investigation results by location
 * Each location can have multiple investigation entries with different requirements
 */
export interface InvestigationResult {
  id: string
  location: LocationId
  text: string
  requiresFlags?: string[]
  notFlags?: string[]
  oncePer: 'ever' | 'loop' | 'none'
  effects?: SceneEffects
}

export const INVESTIGATIONS: InvestigationResult[] = [
  // Player's room
  {
    id: 'room_player_look',
    location: 'room_player',
    text: "Your room. Bed, TV, bathroom. The usual motel fare. A Bible in the nightstand drawer. You've seen it all before.",
    oncePer: 'loop',
  },

  // Parking lot
  {
    id: 'parking_lot_look',
    location: 'parking_lot',
    text: 'A few cars bake in the sun. The highway stretches toward the horizon in both directions. No traffic.',
    oncePer: 'loop',
  },
  {
    id: 'parking_lot_brochure',
    location: 'parking_lot',
    text: 'A weathered brochure box hangs under the VACANCY sign. Inside is a faded pamphlet for the motel.',
    notFlags: ['found_motel_brochure'],
    oncePer: 'ever',
    effects: {
      setFlags: ['found_motel_brochure'],
      giveItem: 'motel_brochure',
    },
  },

  // Courtyard
  {
    id: 'courtyard_look',
    location: 'courtyard',
    text: "The pool hasn't been filled in years. Lawn chairs ring the cracked concrete. The neon motel sign buzzes overhead.",
    oncePer: 'loop',
  },

  // Office - basic
  {
    id: 'office_look',
    location: 'office',
    text: "Wood paneling. Old photos line the walls. Tourist brochures for places that probably don't exist anymore. Earl's ledger sits on the desk. A door to the back room is always closed.",
    notFlags: ['earl_revealed'],
    oncePer: 'loop',
    effects: {
      setFlags: ['explored_office', 'found_back_room'],
    },
  },

  // Office - after reveal
  {
    id: 'office_look_revealed',
    location: 'office',
    text: "The office looks different now that you know what's really going on. The old photos seem to watch you. The back room door seems to pulse with faint light, if you stare long enough.",
    requiresFlags: ['earl_revealed'],
    oncePer: 'loop',
    effects: {
      setFlags: ['explored_office', 'found_back_room'],
    },
  },
  {
    id: 'office_ledger',
    location: 'office',
    text: 'Earl\'s ledger is a maze of check-ins and check-outs. The same names repeat, loop after loop.',
    requiresFlags: ['met_earl'],
    notFlags: ['read_ledger'],
    oncePer: 'ever',
    effects: {
      setFlags: ['read_ledger', 'knows_loop_exists'],
    },
  },

  // Diner
  {
    id: 'diner_look',
    location: 'diner',
    text: "Formica counters, vinyl booths, the smell of coffee that's been on the burner too long. A faded sign says the diner has been here since the 1960s. Marge keeps it running like clockwork.",
    oncePer: 'loop',
    effects: {
      setFlags: ['explored_diner'],
    },
  },
  {
    id: 'diner_coffee',
    location: 'diner',
    text: "Marge pours you a fresh cup. It tastes like burnt hope, but it's hot.",
    requiresFlags: ['met_marge'],
    notFlags: ['got_coffee'],
    oncePer: 'loop',
    effects: {
      setFlags: ['got_coffee'],
      giveItem: 'coffee_cup',
    },
  },
  {
    id: 'diner_jukebox',
    location: 'diner',
    text: "The jukebox still works. One dusty quarter buys you a song that sounds like a memory.",
    notFlags: ['checked_jukebox'],
    oncePer: 'ever',
    effects: {
      setFlags: ['checked_jukebox', 'explored_diner'],
    },
  },

  // Back area
  {
    id: 'back_area_look',
    location: 'back_area',
    text: 'Dumpsters, discarded furniture, the back of the motel. The desert stretches endlessly beyond.',
    oncePer: 'loop',
  },
  {
    id: 'back_area_clipping',
    location: 'back_area',
    text: 'Half-buried under trash, you find a yellowed newspaper clipping about a "mysterious incident" at a nearby facility in 1984.',
    notFlags: ['found_newspaper_clipping'],
    oncePer: 'ever',
    effects: {
      setFlags: ['found_newspaper_clipping', 'knows_1984_incident'],
      giveItem: 'newspaper_clipping',
    },
  },

  // Desert
  {
    id: 'desert_look',
    location: 'desert',
    text: 'Sand and scrub brush. The motel is a small oasis in the vast emptiness. Something catches the light in the distance - an old structure, maybe.',
    notFlags: ['knows_facility_location'],
    oncePer: 'loop',
    effects: {
      setFlags: ['explored_desert'],
    },
  },

  // Desert - after knowing about facility
  {
    id: 'desert_look_facility',
    location: 'desert',
    text: "The abandoned research facility is visible in the distance. It's been closed for decades, but the concrete bunker still stands.",
    requiresFlags: ['knows_facility_location'],
    oncePer: 'loop',
    effects: {
      setFlags: ['explored_desert'],
    },
  },

  // Back room - first look
  {
    id: 'back_room_look',
    location: 'back_room',
    text: "Earl's private space. A cot, boxes of old belongings, a workbench cluttered with tools under a dust sheet. Photos on every wall. One face appears in almost all of them - a young man with Earl's eyes.",
    notFlags: ['seen_device', 'investigated_back_room'],
    oncePer: 'ever',
    effects: {
      setFlags: ['investigated_back_room', 'entered_back_room', 'knows_earl_son'],
    },
  },
  {
    id: 'back_room_photo',
    location: 'back_room',
    text: 'A framed photograph sits beneath a stack of books. The name "Thomas" is written on the back in Earl\'s handwriting.',
    requiresFlags: ['investigated_back_room'],
    notFlags: ['found_photograph'],
    oncePer: 'ever',
    effects: {
      setFlags: ['found_photograph', 'knows_earl_son'],
      giveItem: 'photograph',
    },
  },

  // Back room - find journal (requires multiple visits/deeper investigation)
  {
    id: 'back_room_find_journal',
    location: 'back_room',
    text: "Searching through the boxes, you find an old journal. The name inside reads 'Thomas Hoskins'. It's filled with notes about temporal field experiments and theories about 'capturing moments'.",
    requiresFlags: ['investigated_back_room', 'seen_device'],
    notFlags: ['has_thomas_journal'],
    oncePer: 'ever',
    effects: {
      setFlags: ['has_thomas_journal'],
      giveItem: 'thomas_journal',
    },
  },

  // Back room - device
  {
    id: 'back_room_device',
    location: 'back_room',
    text: "The device sits on Earl's workbench. A small metal cylinder, softly humming. Blue light pulses within. This is what's keeping everyone trapped.",
    requiresFlags: ['seen_device'],
    notFlags: ['has_thomas_journal'],
    oncePer: 'loop',
  },

  // Back room - after journal
  {
    id: 'back_room_complete',
    location: 'back_room',
    text: "Earl's room. The device hums. Thomas's journal is in your pocket. You have everything you need to help Earl - if he'll listen.",
    requiresFlags: ['has_thomas_journal'],
    oncePer: 'loop',
  },

  // Guest rooms - locked
  {
    id: 'room_2_look',
    location: 'room_2',
    text: "Karen and David's room. You shouldn't be snooping through their things.",
    oncePer: 'loop',
  },
  {
    id: 'room_4_look',
    location: 'room_4',
    text: "Diane's room. Notebooks are stacked everywhere. She's investigating something.",
    oncePer: 'loop',
  },
  {
    id: 'room_6_look',
    location: 'room_6',
    text: "Vincent's room. The walls are covered in writing - schedules, timelines, theories. The work of a man who tried everything.",
    oncePer: 'loop',
    effects: {
      setFlags: ['knows_vincent_exists'],
    },
  },
  {
    id: 'room_9_look',
    location: 'room_9',
    text: "Mo's room. Trucker magazines, an empty cooler. Nothing unusual.",
    oncePer: 'loop',
  },
  {
    id: 'room_11_look',
    location: 'room_11',
    text: "The Drifter's room. Barely any personal effects. A map of the area is tacked to the wall with several locations circled.",
    oncePer: 'loop',
  },
]

/**
 * Get the best investigation result for a location given the current game state
 */
export function getInvestigationResult(
  location: LocationId,
  flags: string[],
  investigationsSeen: string[]
): InvestigationResult | null {
  const hasFlag = (flag: string) => flags.includes(flag)
  const hasSeen = (id: string) => investigationsSeen.includes(id)

  // Filter to matching investigations
  const matching = INVESTIGATIONS.filter((inv) => {
    if (inv.location !== location) return false

    // Check oncePer
    if (inv.oncePer === 'ever' && hasSeen(inv.id)) return false
    if (inv.oncePer === 'loop' && hasSeen(inv.id)) return false

    // Check required flags
    if (inv.requiresFlags && !inv.requiresFlags.every(hasFlag)) return false

    // Check forbidden flags
    if (inv.notFlags && inv.notFlags.some(hasFlag)) return false

    return true
  })

  // Return first matching (they're in priority order in the array)
  // Later entries with more requirements take precedence
  return matching[matching.length - 1] || null
}
