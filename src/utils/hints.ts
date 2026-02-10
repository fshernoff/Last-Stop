import type { GameState } from '../types'

interface HintRule {
  id: string
  text: string
  when: (state: Pick<GameState, 'currentChapter' | 'flags' | 'trust'>) => boolean
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
    id: 'earl_reveal',
    text: 'Talk to Earl again for the full story.',
    when: (state) =>
      state.flags.includes('earl_knows_you_know') &&
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
    id: 'follow_karen_desert',
    text: 'Karen walks to the desert between 3-5PM. Follow her there.',
    when: (state) =>
      state.flags.includes('karen_mentioned_light') &&
      !state.flags.includes('karen_followed_to_desert') &&
      !state.flags.includes('knows_facility_location'),
  },
  {
    id: 'karen_location',
    text: 'Keep talking to Karen to learn where the light came from.',
    when: (state) =>
      state.flags.includes('karen_mentioned_light') &&
      !state.flags.includes('karen_told_location') &&
      !state.flags.includes('knows_facility_location'),
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
    id: 'mo_dawn',
    text: 'Mo is at the diner at dawn (6:00-6:30AM). Try catching him early.',
    when: (state) =>
      state.flags.includes('met_mo') &&
      state.flags.includes('knows_loop_exists') &&
      !state.flags.includes('mo_dawn_clarity'),
  },
  {
    id: 'intercept_diane',
    text: 'Diane leaves every morning around 8AM. Watch the parking lot.',
    when: (state) =>
      state.flags.includes('diane_cover_blown') &&
      !state.flags.includes('intercepted_diane_sedan'),
  },
  {
    id: 'earl_night',
    text: "Earl goes to the back room late at night. Wait in the office after 9PM.",
    when: (state) =>
      state.flags.includes('earl_revealed') &&
      state.flags.includes('has_thomas_journal') &&
      !state.flags.includes('caught_earl_with_device'),
  },
  {
    id: 'show_items',
    text: 'Try showing the items you have found to different people.',
    when: (state) =>
      (state.flags.includes('found_newspaper_clipping') || state.flags.includes('found_photograph')) &&
      !state.flags.includes('diane_seen_clipping') &&
      !state.flags.includes('marge_seen_photo'),
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
    id: 'study_case_files',
    text: 'You have sealed case files. Study them in your room — there might be names you recognize.',
    when: (state) =>
      state.flags.includes('has_sealed_case_files') &&
      !state.flags.includes('knows_vincent_real_name'),
  },
  {
    id: 'study_journal',
    text: 'Thomas\'s journal might have more secrets. Study it carefully in your room.',
    when: (state) =>
      state.flags.includes('has_thomas_journal') &&
      !state.flags.includes('knows_safe_combination'),
  },
  {
    id: 'earl_safe',
    text: 'You know the combination to Earl\'s safe. Check the office.',
    when: (state) =>
      state.flags.includes('knows_safe_combination') &&
      state.flags.includes('earl_revealed') &&
      !state.flags.includes('opened_earl_safe'),
  },
  {
    id: 'confront_earl_safe',
    text: 'You opened Earl\'s safe and found Thomas\'s warning. Confront Earl.',
    when: (state) =>
      state.flags.includes('opened_earl_safe') &&
      !state.flags.includes('earl_confronted_about_safe'),
  },
  {
    id: 'vincent_real_name',
    text: 'You know Vincent\'s real name — Dr. Harlow. Try using it when you talk to him.',
    when: (state) =>
      state.flags.includes('knows_vincent_real_name') &&
      !state.flags.includes('vincent_opened_door'),
  },
  {
    id: 'mile_marker_dig',
    text: 'Mo\'s mile markers don\'t match. Investigate the desert near the markers.',
    when: (state) =>
      state.flags.includes('knows_mo_mile_discrepancy') &&
      !state.flags.includes('found_vasquez_badge'),
  },
  {
    id: 'show_vasquez_badge',
    text: 'You found Vasquez\'s badge. The Drifter might recognize the name.',
    when: (state) =>
      state.flags.includes('found_vasquez_badge') &&
      state.flags.includes('met_drifter') &&
      !state.flags.includes('drifter_saw_badge'),
  },
  {
    id: 'drifter_lied',
    text: 'The Drifter said the facility was east. But Karen found it past mile marker 7. He lied.',
    when: (state) =>
      state.flags.includes('drifter_gave_wrong_direction') &&
      state.flags.includes('knows_facility_location') &&
      !state.flags.includes('drifter_confronted_about_lie'),
  },
  {
    id: 'david_phone',
    text: 'David keeps checking his phone. He might notice something about the dates.',
    when: (state) =>
      state.flags.includes('met_david') &&
      state.flags.includes('knows_loop_exists') &&
      !state.flags.includes('david_noticed_dates'),
  },
  {
    id: 'karen_david_facility',
    text: 'Karen and David might visit the facility now that David believes her.',
    when: (state) =>
      state.flags.includes('david_believes_karen') &&
      state.flags.includes('karen_followed_to_desert') &&
      !state.flags.includes('karen_david_visited_facility'),
  },
  {
    id: 'deduction_ready',
    text: 'You have gathered evidence from many sources. Try talking to Vincent.',
    when: (state) =>
      state.flags.includes('caught_earl_with_device') &&
      state.flags.includes('knows_vincent_is_researcher') &&
      state.flags.includes('knows_mo_mile_discrepancy') &&
      !state.flags.includes('ready_for_ending'),
  },
  {
    id: 'diane_loyalty_reward',
    text: "Diane respects your loyalty. Talk to her when you've built enough trust.",
    when: (state) =>
      state.flags.includes('diane_refused_deal') &&
      !state.flags.includes('diane_gave_files_anyway'),
  },
  {
    id: 'ending',
    text: 'Return to Earl to decide how the cycle ends.',
    when: (state) => state.flags.includes('ready_for_ending'),
  },
]

export function getNextHint(state: Pick<GameState, 'currentChapter' | 'flags' | 'trust'>): string {
  for (const rule of HINT_RULES) {
    if (rule.when(state)) {
      return rule.text
    }
  }
  return 'No new leads right now. Try observing or talking to someone again.'
}
