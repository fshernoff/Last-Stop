import type { GameState } from '../types'

interface HintRule {
  id: string
  text: string
  when: (state: Pick<GameState, 'currentLoop' | 'flags' | 'trust'>) => boolean
}

const HINT_RULES: HintRule[] = [
  {
    id: 'meet_marge',
    text: 'Head to the diner in the morning and introduce yourself to Marge.',
    when: (state) => !state.flags.includes('met_marge'),
  },
  {
    id: 'meet_earl',
    text: 'Visit the office to meet Earl at the front desk.',
    when: (state) => !state.flags.includes('met_earl'),
  },
  {
    id: 'meet_karen',
    text: 'Check the courtyard during the day and speak to Karen.',
    when: (state) => !state.flags.includes('met_karen'),
  },
  {
    id: 'meet_diane',
    text: 'Find Diane at the diner around early morning and introduce yourself.',
    when: (state) => !state.flags.includes('met_diane'),
  },
  {
    id: 'meet_mo',
    text: 'Catch Big Mo in the diner at dawn or in the evening.',
    when: (state) => !state.flags.includes('met_mo'),
  },
  {
    id: 'meet_drifter',
    text: 'Keep an eye on the parking lot or diner for the Drifter.',
    when: (state) => !state.flags.includes('met_drifter'),
  },
  {
    id: 'room6_exists',
    text: 'Ask Marge about Room 6 or observe the courtyard to confirm someone is inside.',
    when: (state) => !state.flags.includes('knows_room6_occupied'),
  },
  {
    id: 'observe_earl',
    text: 'Set an observation on the office late at night (around 10PM).',
    when: (state) => !state.flags.includes('observed_earl_anomaly'),
  },
  {
    id: 'confront_earl',
    text: 'Tell Earl you saw him go into the back room.',
    when: (state) =>
      state.flags.includes('observed_earl_anomaly') &&
      !state.flags.includes('earl_knows_you_know'),
  },
  {
    id: 'earl_reveal_loop',
    text: 'Keep looping. Earl opens up after more time has passed.',
    when: (state) =>
      state.flags.includes('earl_knows_you_know') &&
      state.currentLoop < 10 &&
      !state.flags.includes('earl_revealed'),
  },
  {
    id: 'earl_reveal',
    text: 'Talk to Earl again for the full story.',
    when: (state) =>
      state.flags.includes('earl_knows_you_know') &&
      state.currentLoop >= 10 &&
      !state.flags.includes('earl_revealed'),
  },
  {
    id: 'karen_light',
    text: 'Spend more time with Karen; she has more to share about the desert.',
    when: (state) =>
      state.flags.includes('met_karen') &&
      !state.flags.includes('karen_mentioned_light'),
  },
  {
    id: 'karen_location',
    text: 'Keep talking to Karen to learn where the light came from.',
    when: (state) =>
      state.flags.includes('karen_mentioned_light') &&
      !state.flags.includes('karen_told_location'),
  },
  {
    id: 'diane_observe',
    text: 'Observe the office in the late afternoon to catch Diane speaking with Earl.',
    when: (state) => !state.flags.includes('observed_diane_earl_talk'),
  },
  {
    id: 'diane_confront',
    text: 'Talk to Diane about what you overheard in the office.',
    when: (state) =>
      state.flags.includes('observed_diane_earl_talk') &&
      !state.flags.includes('diane_cover_blown'),
  },
  {
    id: 'drifter_story',
    text: 'Build trust with the Drifter. He is hiding a story about the facility.',
    when: (state) =>
      state.flags.includes('met_drifter') &&
      !state.flags.includes('drifter_told_father'),
  },
  {
    id: 'drifter_location',
    text: 'Push the Drifter for the facility location.',
    when: (state) =>
      state.flags.includes('drifter_told_father') &&
      !state.flags.includes('drifter_told_facility_location'),
  },
  {
    id: 'back_room_search',
    text: "Search the back room for Thomas's journal.",
    when: (state) =>
      state.flags.includes('has_master_key') &&
      !state.flags.includes('has_thomas_journal'),
  },
  {
    id: 'earl_journal',
    text: "Show Thomas's journal to Earl.",
    when: (state) =>
      state.flags.includes('has_thomas_journal') &&
      !state.flags.includes('earl_read_journal'),
  },
  {
    id: 'vincent_open',
    text: "Keep talking to Vincent. He won't open the door immediately.",
    when: (state) =>
      state.flags.includes('earl_told_about_vincent') &&
      !state.flags.includes('vincent_opened_door'),
  },
  {
    id: 'vincent_reveal',
    text: 'Talk to Vincent inside Room 6 for the final piece.',
    when: (state) =>
      state.flags.includes('vincent_opened_door') &&
      !state.flags.includes('ready_for_ending'),
  },
  {
    id: 'ending',
    text: 'Return to Earl to decide how the loop ends.',
    when: (state) => state.flags.includes('ready_for_ending'),
  },
]

export function getNextHint(state: Pick<GameState, 'currentLoop' | 'flags' | 'trust'>): string {
  for (const rule of HINT_RULES) {
    if (rule.when(state)) {
      return rule.text
    }
  }
  return 'No new leads right now. Try observing or talking to someone again.'
}
