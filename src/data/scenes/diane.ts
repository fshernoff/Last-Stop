import type { Scene } from '../../types'

export const dianeScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'diane_tier0_intro',
    character: 'diane',
    requirements: {
      trust: 0,
      notFlags: ['met_diane'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The woman at the booth glances up from her laptop. Professional. Guarded. Her eyes assess you in a second.',
      },
      {
        speaker: 'npc',
        text: '"Can I help you?"',
        choices: [
          { text: '"Just introducing myself. I\'m staying here too."', next: 'intro' },
          { text: '"What are you working on?"', next: 'working' },
          { text: '"You don\'t look like a tourist."', next: 'tourist' },
        ],
        choiceMode: 'topics',
        endChoiceText: '[End conversation]',
        convergeTo: 'diane_intro_close',
      },
      {
        id: 'intro',
        speaker: 'npc',
        text: '"Diane. Sales. Just passing through."',
      },
      {
        speaker: 'narration',
        text: 'Her smile is polished and meaningless.',
      },
      {
        id: 'working',
        speaker: 'npc',
        text: '"Reports. Boring stuff."',
      },
      {
        speaker: 'narration',
        text: 'She angles the laptop slightly away from you.',
      },
      {
        id: 'tourist',
        speaker: 'npc',
        text: '"Neither do you."',
      },
      {
        speaker: 'narration',
        text: 'She studies you.',
      },
      {
        id: 'diane_intro_close',
        speaker: 'npc',
        text: "\"Diane. I'm in sales. What's your excuse for being here?\"",
      },
    ],
    effects: {
      setFlags: ['met_diane'],
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'diane_tier0_smalltalk',
    character: 'diane',
    requirements: {
      trust: 0,
      flags: ['met_diane'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"If you see a white sedan hanging around, tell me. I\'m collecting patterns."',
      },
      {
        speaker: 'narration',
        text: 'She doesn\'t look up from her notes.',
      },
    ],
    effects: {
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // ITEM: Show newspaper clipping to Diane
  // ============================================================================
  {
    id: 'diane_shown_clipping',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'found_newspaper_clipping'],
      notFlags: ['diane_seen_clipping'],
    },
    priority: 75,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"You look like you have something to say."',
        choices: [
          {
            text: '"I found something you should see."',
            next: 'show_clipping',
            requiresItems: ['newspaper_clipping'],
            effects: { setFlags: ['diane_seen_clipping', 'diane_revealed_incident_details', 'knows_government_involved'] },
          },
          {
            text: '"Just checking in."',
            next: 'small_talk',
          },
        ],
        convergeTo: 'diane_clipping_end',
      },
      {
        id: 'show_clipping',
        speaker: 'narration',
        text: 'You hand her the newspaper clipping. She unfolds it carefully, her expression sharpening.',
      },
      {
        speaker: 'npc',
        text: '"This is from 1984. \'Research Facility Incident — Three Missing.\' This matches my case files exactly."',
      },
      {
        speaker: 'narration',
        text: 'She reads it again, more slowly.',
      },
      {
        speaker: 'npc',
        text: '"The \'incident\' was a temporal field test that went wrong. Three researchers disappeared. The government sealed everything."',
        choices: [
          { text: '"Temporal field?"', next: 'temporal' },
          { text: '"Who were the researchers?"', next: 'temporal' },
        ],
      },
      {
        id: 'temporal',
        speaker: 'npc',
        text: '"They were experimenting with freezing moments in time. Something went catastrophically wrong. And someone covered it up."',
      },
      {
        id: 'small_talk',
        speaker: 'npc',
        text: '"Checking in. That\'s nice. I\'m fine. Busy. You know how it is."',
      },
      {
        speaker: 'narration',
        text: 'She turns back to her laptop.',
      },
      {
        id: 'diane_clipping_end',
        speaker: 'narration',
        text: 'Diane returns to her work, but her mind is clearly elsewhere.',
      },
    ],
    effects: {
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // ITEM: Show photograph to Diane
  // ============================================================================
  {
    id: 'diane_shown_photograph',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'diane_cover_blown'],
      notFlags: ['diane_seen_photograph'],
    },
    priority: 75,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"Any progress?"',
        choices: [
          {
            text: '"Does this face match anyone in your case files?"',
            next: 'show_photo',
            requiresItems: ['photograph'],
            effects: { setFlags: ['diane_seen_photograph', 'diane_confirmed_thomas', 'knows_thomas_role'] },
          },
          {
            text: '"Find anything new?"',
            next: 'nothing_new',
          },
        ],
        convergeTo: 'diane_photo_end',
      },
      {
        id: 'show_photo',
        speaker: 'narration',
        text: 'Diane takes the photograph, then flips open a folder on her desk. She compares the face to a redacted document.',
      },
      {
        speaker: 'npc',
        text: '"Thomas Hoskins. One of the three researchers who disappeared. He was the youngest."',
      },
      {
        speaker: 'narration',
        text: 'She holds up the redacted file. Thomas\'s name is circled in faded ink.',
      },
      {
        speaker: 'npc',
        text: '"Official cause of death: car accident. But the accident report is sealed, and his employer doesn\'t exist in any records."',
      },
      {
        speaker: 'npc',
        text: '"Wherever you found this photo, keep digging."',
      },
      {
        id: 'nothing_new',
        speaker: 'npc',
        text: '"Dead ends. Every lead circles back to the same empty lot in the desert. I\'m missing something."',
      },
      {
        id: 'diane_photo_end',
        speaker: 'narration',
        text: 'She makes a note in her file.',
      },
    ],
    effects: {
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: White sedan contact
  // ============================================================================
  {
    id: 'diane_tier1_sedan',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'observed_white_sedan'],
    },
    priority: 60,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You were outside when the white sedan pulled in."',
        choices: [
          { text: '"I saw it."', next: 'continue' },
          { text: '"Just a random car."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"It was a delivery. Case files. Sealed stuff."',
      },
      {
        speaker: 'npc',
        text: '"If anyone asks, you didn\'t see it."',
      },
    ],
    effects: {
      setFlags: ['knows_diane_files'],
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Cover blown (requires observing her talk to Earl)
  // ============================================================================
  {
    id: 'diane_tier1_cover_blown',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'observed_diane_earl_talk'],
    },
    priority: 70,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"I saw you talking to Earl earlier. You were asking him about people who\'ve gone missing."',
      },
      {
        speaker: 'narration',
        text: 'Diane goes very still. Her professional mask slips for just a moment.',
      },
      {
        speaker: 'npc',
        text: '"You were watching me."',
        choices: [
          { text: '"I watch everyone."', next: 'cards' },
          { text: '"What are you really doing here?"', next: 'cards' },
        ],
      },
      {
        id: 'cards',
        speaker: 'npc',
        text: '"Fine. Cards on the table."',
      },
      {
        speaker: 'narration',
        text: 'She closes her laptop.',
      },
      {
        speaker: 'npc',
        text: "\"I'm an investigator. Insurance fraud, missing persons, that kind of thing. And this stretch of highway has too many missing persons for coincidence.\"",
        choices: [
          { text: '"How many?"', next: 'how_many' },
          { text: '"What have you found?"', next: 'how_many' },
        ],
      },
      {
        id: 'how_many',
        speaker: 'npc',
        text: '"Fifteen in the last forty years. All vanished within a few miles of this motel. The first was in 1984. No bodies. No evidence. Just gone."',
      },
      {
        speaker: 'narration',
        text: 'She looks at you hard.',
      },
      {
        speaker: 'npc',
        text: '"What do you know?"',
      },
    ],
    effects: {
      setFlags: ['diane_cover_blown', 'knows_diane_investigating', 'knows_1984_incident'],
      addRapport: { character: 'diane', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIMED: Intercept Diane's sedan meeting (8-9AM)
  // ============================================================================
  {
    id: 'diane_timed_sedan_intercept',
    character: 'diane',
    requirements: {
      flags: ['diane_cover_blown'],
      notFlags: ['intercepted_diane_sedan'],
      location: 'parking_lot',
      timeWindow: { min: 120, max: 180 },
    },
    priority: 90,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'A white sedan pulls into the parking lot. Diane walks out of her room carrying a folder. She doesn\'t expect to see you here.',
      },
      {
        speaker: 'npc',
        text: '"What are you doing here?"',
      },
      {
        speaker: 'player',
        text: '"You leave every morning at this time. I wanted to know why."',
      },
      {
        speaker: 'narration',
        text: 'She glances at the sedan, then back at you. Making a calculation.',
      },
      {
        speaker: 'npc',
        text: '"Fine. My contact has sealed government files about the 1984 incident. Real files. The kind that don\'t officially exist."',
        choices: [
          {
            text: '"I\'ll tell you what I know about Earl."',
            next: 'share_earl',
            effects: { setFlags: ['diane_shared_earl_info'], giveItem: 'sealed_case_files' },
          },
          {
            text: '"I can\'t betray Earl\'s trust."',
            next: 'refuse',
            effects: { setFlags: ['diane_refused_deal'] },
          },
          {
            text: '"I found this. Take it — but leave Earl out of it."',
            next: 'offer_clipping',
            requiresItems: ['newspaper_clipping'],
            effects: { setFlags: ['diane_has_clipping'], giveItem: 'sealed_case_files' },
          },
        ],
        convergeTo: 'sedan_after',
      },
      {
        id: 'share_earl',
        speaker: 'narration',
        text: 'You tell her about Earl and the back room. She listens intently, taking notes.',
      },
      {
        speaker: 'npc',
        text: '"That confirms what the files suggest. Here — you\'ve earned these."',
      },
      {
        speaker: 'narration',
        text: 'She hands you a thick envelope of sealed case files.',
      },
      {
        id: 'refuse',
        speaker: 'npc',
        text: '"Loyalty. I respect that. But it won\'t get you answers."',
      },
      {
        speaker: 'narration',
        text: 'She gets in the sedan without another word.',
      },
      {
        id: 'offer_clipping',
        speaker: 'narration',
        text: 'She takes the newspaper clipping, examines it. Her eyes widen.',
      },
      {
        speaker: 'npc',
        text: '"This is from 1984. This matches my case files exactly. Where did you find this?"',
      },
      {
        speaker: 'narration',
        text: 'She hands you the sealed case files in exchange.',
      },
      {
        id: 'sedan_after',
        speaker: 'narration',
        text: 'The white sedan pulls away. Whatever just happened, you\'re deeper in this now.',
      },
    ],
    effects: {
      setFlags: ['intercepted_diane_sedan'],
      addRapport: { character: 'diane', amount: 2 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // CROSS-CHARACTER: Tell Diane about Vincent
  // ============================================================================
  {
    id: 'diane_told_vincent_theory',
    character: 'diane',
    requirements: {
      flags: ['met_diane', 'diane_cover_blown', 'knows_vincent_is_researcher'],
      notFlags: ['diane_knows_vincent'],
    },
    priority: 80,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"You have that look. Like you know something."',
        choices: [
          {
            text: '"One of your missing researchers is staying in Room 6."',
            next: 'tell_vincent',
            requiresFlags: ['knows_vincent_is_researcher'],
            effects: { setFlags: ['diane_knows_vincent', 'knows_loop_duration'] },
          },
          {
            text: '"How\'s the investigation going?"',
            next: 'standard_update',
          },
        ],
        convergeTo: 'diane_vincent_end',
      },
      {
        id: 'tell_vincent',
        speaker: 'narration',
        text: 'Diane stares at you. For the first time, she looks genuinely stunned.',
      },
      {
        speaker: 'npc',
        text: '"That\'s impossible. They were all declared dead in \'85."',
      },
      {
        speaker: 'player',
        text: '"He\'s been here the whole time. Forty years. In the loop."',
      },
      {
        speaker: 'narration',
        text: 'She sits down heavily.',
      },
      {
        speaker: 'npc',
        text: '"Forty years. That means the loop has been active since..."',
      },
      {
        speaker: 'npc',
        text: '"Since the incident. My God."',
      },
      {
        speaker: 'narration',
        text: 'She\'s putting it together. If the loop has been running for forty years, someone has been keeping it going. Someone who had a reason to never let go.',
      },
      {
        speaker: 'npc',
        text: '"Earl. It\'s been Earl this whole time."',
      },
      {
        id: 'standard_update',
        speaker: 'npc',
        text: '"Slow. Every thread leads to a dead end or a sealed file. This place doesn\'t want to be understood."',
      },
      {
        id: 'diane_vincent_end',
        speaker: 'narration',
        text: 'Diane stares at her notes, rewriting everything she thought she knew.',
      },
    ],
    effects: {
      addRapport: { character: 'diane', amount: 2 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Shows her files
  // ============================================================================
  {
    id: 'diane_tier2_files',
    character: 'diane',
    requirements: {
      trust: 2,
      flags: ['diane_cover_blown'],
    },
    priority: 85,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: "\"I'm going to show you something. Don't make me regret it.\"",
      },
      {
        speaker: 'narration',
        text: 'She opens a folder on her laptop. Missing persons reports. Photos. A timeline.',
      },
      {
        speaker: 'npc',
        text: '"Fifteen people. Forty years. All within a ten-mile radius of this motel."',
      },
      {
        speaker: 'narration',
        text: 'She points to a name.',
      },
      {
        speaker: 'npc',
        text: '"This one stands out. Thomas Earl. Died in a car accident in 1984. Except..."',
        choices: [
          { text: '"Except what?"', next: 'except' },
          { text: '"That\'s Earl\'s son."', next: 'except' },
        ],
      },
      {
        id: 'except',
        speaker: 'npc',
        text: "\"Except the accident report is sealed. And his employer was a government research facility that doesn't exist in any records. The file mentions temporal field research.\"",
      },
      {
        speaker: 'narration',
        text: 'She taps a folder thick with redactions.',
      },
      {
        speaker: 'narration',
        text: 'She looks at you.',
      },
      {
        speaker: 'npc',
        text: '"You know something. I can tell."',
        choices: [
          { text: '[Tell her about the repeating day]', next: 'tell_loop' },
          { text: '[Tell her about Earl]', next: 'tell_earl' },
          { text: '[Say nothing]', next: 'nothing' },
        ],
      },
      {
        id: 'tell_loop',
        speaker: 'narration',
        text: "You tell her. Everything. She listens without interrupting.",
      },
      {
        speaker: 'npc',
        text: "\"A repeating day. That's... that's insane.\"",
      },
      {
        speaker: 'narration',
        text: "But she's not dismissing it. She's thinking.",
      },
      {
        speaker: 'npc',
        text: '"It would explain the missing persons. If they got too close to something and got... stuck."',
      },
      {
        id: 'tell_earl',
        speaker: 'npc',
        text: "\"Earl? The clerk? He's connected to this?\"",
      },
      {
        id: 'nothing',
        speaker: 'npc',
        text: '"Fine. Keep your secrets. But if you find anything that helps me close these cases, I want to know."',
      },
    ],
    effects: {
      setFlags: [
        'diane_showed_files',
        'knows_missing_persons_pattern',
        'knows_diane_files',
        'knows_government_involved',
        'knows_thomas_role',
      ],
      addRapport: { character: 'diane', amount: 2 },
      advanceTime: 20,
    },
  },
]
