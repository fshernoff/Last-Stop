import type { Scene } from '../../types'

export const vincentScenes: Scene[] = [
  // ============================================================================
  // TIER 0: Door is closed
  // ============================================================================
  {
    id: 'vincent_tier0_door_closed',
    character: 'vincent',
    requirements: {
      trust: 0,
      notFlags: ['vincent_contacted', 'earl_told_about_vincent'],
      flags: ['knows_room6_occupied'],
    },
    priority: 100,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'narration',
        text: 'You knock on the door of Room 6. The "Do Not Disturb" sign sways slightly.',
      },
      {
        speaker: 'narration',
        text: 'Silence.',
      },
      {
        speaker: 'player',
        text: '"I know someone\'s in there."',
        choices: [
          { text: '[Knock again]', next: 'knock' },
          { text: '"Earl sent me."', next: 'earl_sent' },
          { text: '"I need to talk to you."', next: 'need_talk' },
          { text: '[Leave]', next: 'leave' },
        ],
      },
      {
        id: 'knock',
        speaker: 'narration',
        text: "Still nothing. But you sense movement inside. Someone's there.",
      },
      {
        id: 'earl_sent',
        speaker: 'narration',
        text: 'A long pause. Then, muffled through the door:',
      },
      {
        speaker: 'npc',
        text: '"Earl sends lots of people. They all give up."',
      },
      {
        speaker: 'npc',
        text: '"You will too."',
      },
      {
        id: 'need_talk',
        speaker: 'npc',
        text: '"No. You don\'t."',
      },
      {
        id: 'leave',
        speaker: 'narration',
        text: 'You walk away. The door stays closed.',
      },
    ],
    effects: {
      setFlags: ['tried_vincent_door', 'knows_vincent_exists'],
      addRapport: { character: 'vincent', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Earl tells you about Vincent (triggered when talking to Earl)
  // ============================================================================
  {
    id: 'vincent_tier0_earl_intro',
    character: 'earl',
    requirements: {
      trust: 0,
      flags: ['earl_revealed', 'tried_vincent_door'],
      notFlags: ['vincent_contacted'],
    },
    priority: 90,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You\'ve been knocking on Room 6."',
        choices: [
          { text: '"Who\'s in there?"', next: 'continue' },
          { text: '"He told me to go away."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"His name\'s Vincent. He checked in three months ago. Figured out the resets about two weeks in."',
      },
      {
        speaker: 'narration',
        text: 'Earl pauses.',
      },
      {
        speaker: 'npc',
        text: '"He tried to help me for a while. We worked together. Ran experiments. Nothing worked."',
        choices: [
          { text: '"What happened?"', next: 'happened' },
          { text: '"Why doesn\'t he come out?"', next: 'happened' },
        ],
      },
      {
        id: 'happened',
        speaker: 'npc',
        text: '"He gave up. One day he just... stopped. Went into his room and didn\'t come out."',
      },
      {
        speaker: 'npc',
        text: '"I bring him food. He\'s still alive in there. But he\'s not really living."',
        choices: [
          { text: '"I need to talk to him."', next: 'need_talk' },
          { text: '"He might know something you don\'t."', next: 'need_talk' },
        ],
      },
      {
        id: 'need_talk',
        speaker: 'npc',
        text: '"Maybe. He was sharper than me about some things. Saw patterns I missed."',
      },
      {
        speaker: 'narration',
        text: 'He pulls out a key.',
      },
      {
        speaker: 'npc',
        text: '"This opens his door. But I wouldn\'t recommend barging in. Try talking through it first. He might listen."',
      },
    ],
    effects: {
      setFlags: ['earl_told_about_vincent', 'knows_vincent_exists', 'can_enter_room6'],
      addRapport: { character: 'earl', amount: 1 },
      giveItem: 'room6_key',
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Talking through the door
  // ============================================================================
  {
    id: 'vincent_tier1_through_door',
    character: 'vincent',
    requirements: {
      trust: 0,
      flags: ['earl_told_about_vincent'],
      notFlags: ['vincent_opened_door'],
    },
    priority: 85,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'narration',
        text: 'You stand outside Room 6.',
      },
      {
        speaker: 'player',
        text: '"Vincent. Earl told me about you."',
      },
      {
        speaker: 'narration',
        text: 'Silence. Then:',
      },
      {
        speaker: 'npc',
        text: '"Earl talks too much."',
        choices: [
          { text: '"He says you gave up."', next: 'gave_up' },
          { text: '"He says you were close to figuring it out."', next: 'close' },
          { text: '"I\'m stuck too."', next: 'stuck' },
        ],
      },
      {
        id: 'gave_up',
        speaker: 'npc',
        text: '"Gave up implies there was something to give up on. There isn\'t. There\'s no way out."',
        choices: [
          { text: '"How do you know?"', next: 'how_know' },
          { text: '"Maybe you missed something."', next: 'how_know' },
        ],
      },
      {
        id: 'how_know',
        speaker: 'npc',
        text: '"How do I know? Because I tried everything. EVERYTHING. For weeks."',
      },
      {
        speaker: 'narration',
        text: 'His voice cracks.',
      },
      {
        speaker: 'npc',
        text: '"Go away. I can\'t watch another person fail."',
      },
      {
        id: 'close',
        speaker: 'npc',
        text: '"Close. Yes. I was always close. Never there."',
      },
      {
        id: 'stuck',
        speaker: 'npc',
        text: '"Then you understand. The best thing you can do is find a room and wait. It\'s easier than hoping."',
      },
    ],
    effects: {
      addRapport: { character: 'vincent', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Patterns (chapter 4+)
  // ============================================================================
  {
    id: 'vincent_tier1_patterns',
    character: 'vincent',
    requirements: {
      trust: 1,
      flags: ['earl_told_about_vincent'],
      chapter: { min: 4 },
      notFlags: ['vincent_opened_door'],
    },
    priority: 90,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You\'re still out there."',
        choices: [
          { text: '"So are you."', next: 'continue' },
          { text: '"I\'m not quitting."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"I mapped the day. The reset snaps at the edges."',
      },
      {
        speaker: 'npc',
        text: '"Every time someone pushes past mile marker 20, they wake up back here."',
      },
      {
        speaker: 'npc',
        text: '"Whatever\'s out there, it\'s the anchor. Everything bends around it."',
      },
    ],
    effects: {
      setFlags: ['vincent_shared_patterns'],
      addRapport: { character: 'vincent', amount: 1 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Door opens (after many resets)
  // ============================================================================
  {
    id: 'vincent_tier1_door_opens',
    character: 'vincent',
    requirements: {
      trust: 1,
      flags: ['earl_told_about_vincent', 'vincent_shared_patterns'],
      chapter: { min: 4 },
    },
    priority: 95,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "You've been talking through the door for a while now. You've lost count.",
      },
      {
        speaker: 'player',
        text: '"Vincent. I\'m not giving up."',
      },
      {
        speaker: 'npc',
        text: "\"I know. I've been listening. You keep coming back. You keep trying.\"",
      },
      {
        speaker: 'narration',
        text: 'A pause.',
      },
      {
        speaker: 'npc',
        text: '"Why?"',
        choices: [
          { text: '"Because someone has to."', next: 'someone' },
          { text: '"Because I can\'t accept this."', next: 'accept' },
          { text: '"Because Earl needs help."', next: 'earl' },
        ],
      },
      {
        id: 'someone',
        speaker: 'npc',
        text: '"That\'s what I said too. Once."',
      },
      {
        id: 'accept',
        speaker: 'npc',
        text: '"Neither could I. But acceptance came anyway."',
      },
      {
        id: 'earl',
        speaker: 'npc',
        text: '"Earl. Yes. He\'s carrying more than anyone should."',
      },
      {
        speaker: 'narration',
        text: 'You hear movement. A shuffle. A click.',
      },
      {
        speaker: 'narration',
        text: 'The door opens.',
      },
      {
        speaker: 'narration',
        text: "Vincent looks exactly like a man who's been alone in a dark room for three months. Hollow eyes. Unkempt beard. But there's something still alive in there.",
      },
      {
        speaker: 'npc',
        text: '"Come in. Let me show you what I found."',
      },
    ],
    effects: {
      setFlags: ['vincent_opened_door', 'vincent_contacted', 'met_vincent', 'knows_vincent_exists'],
      addRapport: { character: 'vincent', amount: 1 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // ITEM: Show Thomas's journal to Vincent
  // ============================================================================
  {
    id: 'vincent_shown_journal',
    character: 'vincent',
    requirements: {
      flags: ['met_vincent', 'vincent_opened_door'],
      notFlags: ['vincent_seen_journal'],
    },
    priority: 95,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'narration',
        text: 'Vincent is staring at his wall of notes, tracing lines with his finger.',
      },
      {
        speaker: 'npc',
        text: '"Back again."',
        choices: [
          {
            text: '"I found Thomas\'s journal. Have you read it?"',
            next: 'show_journal',
            requiresItems: ['thomas_journal'],
            effects: { setFlags: ['vincent_seen_journal', 'vincent_was_partner', 'knows_vincent_connection', 'knows_thomas_role'] },
          },
          {
            text: '"How are you holding up?"',
            next: 'check_in',
          },
        ],
        convergeTo: 'vincent_journal_end',
      },
      {
        id: 'show_journal',
        speaker: 'narration',
        text: "Vincent's hands shake as he takes the journal. He opens it to a specific page, as if he already knew it was there.",
      },
      {
        speaker: 'npc',
        text: '"I helped write parts of this."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you.',
      },
      {
        speaker: 'npc',
        text: '"Thomas was my research partner. We built the device together."',
        choices: [
          { text: '"You knew Thomas?"', next: 'knew' },
          { text: '"What was the device supposed to do?"', next: 'purpose' },
        ],
        convergeTo: 'vincent_journal_reveal',
      },
      {
        id: 'knew',
        speaker: 'npc',
        text: '"Knew him? I spent three years working beside him. He was the most focused person I ever met."',
      },
      {
        id: 'purpose',
        speaker: 'npc',
        text: '"It wasn\'t supposed to trap anyone. It was supposed to preserve a single moment. Like a photograph, but for time itself."',
      },
      {
        id: 'vincent_journal_reveal',
        speaker: 'npc',
        text: '"Thomas wanted to save a memory of his father. Of one good day they had together, before everything went wrong."',
      },
      {
        speaker: 'narration',
        text: 'He closes the journal gently.',
      },
      {
        speaker: 'npc',
        text: '"Instead, it trapped all of us."',
      },
      {
        id: 'check_in',
        speaker: 'npc',
        text: '"Same as yesterday. And the day before. And the day before that."',
      },
      {
        speaker: 'narration',
        text: 'He almost smiles.',
      },
      {
        id: 'vincent_journal_end',
        speaker: 'narration',
        text: 'Vincent turns back to his wall of notes.',
      },
    ],
    effects: {
      addRapport: { character: 'vincent', amount: 2 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Ambient small talk
  // ============================================================================
  {
    id: 'vincent_tier1_smalltalk',
    character: 'vincent',
    requirements: {
      trust: 1,
      flags: ['vincent_opened_door'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"I stopped counting days. I started counting patterns."',
      },
      {
        speaker: 'narration',
        text: 'He gestures to the walls, a maze of lines and times.',
      },
    ],
    effects: {
      addRapport: { character: 'vincent', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // CROSS-CHARACTER: Tell Vincent about Diane's research
  // ============================================================================
  {
    id: 'vincent_told_diane_findings',
    character: 'vincent',
    requirements: {
      flags: ['met_vincent', 'vincent_opened_door', 'diane_revealed_incident_details'],
      notFlags: ['vincent_knows_diane'],
    },
    priority: 92,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'narration',
        text: 'Vincent is adjusting his timeline on the wall.',
      },
      {
        speaker: 'npc',
        text: '"What\'s new?"',
        choices: [
          {
            text: '"There\'s a woman here investigating the 1984 incident."',
            next: 'tell_diane',
            requiresFlags: ['diane_revealed_incident_details'],
            effects: { setFlags: ['vincent_knows_diane', 'knows_vincent_is_researcher'] },
          },
          {
            text: '"Vincent, what do you know about the 1984 incident?"',
            next: 'vague',
          },
        ],
        convergeTo: 'vincent_diane_end',
      },
      {
        id: 'tell_diane',
        speaker: 'narration',
        text: 'Vincent freezes. The color drains from his face.',
      },
      {
        speaker: 'npc',
        text: '"She can\'t know I\'m here."',
      },
      {
        speaker: 'player',
        text: '"Why not?"',
      },
      {
        speaker: 'npc',
        text: '"If the government finds out one of the researchers survived..."',
      },
      {
        speaker: 'narration',
        text: 'He trails off. And then you understand.',
      },
      {
        speaker: 'player',
        text: '"You\'re one of the three. The researchers who \'disappeared.\'"',
      },
      {
        speaker: 'npc',
        text: '"Disappeared. Declared dead. Erased from the records."',
      },
      {
        speaker: 'narration',
        text: 'He looks at his hands.',
      },
      {
        speaker: 'npc',
        text: '"I didn\'t die. I\'ve been here. Hiding. In the loop. For forty years."',
      },
      {
        id: 'vague',
        speaker: 'npc',
        text: '"The 1984 incident. That\'s what started all of this. But I\'ve told you what I know."',
      },
      {
        speaker: 'narration',
        text: 'He seems guarded. Perhaps there\'s something specific you could share.',
      },
      {
        id: 'vincent_diane_end',
        speaker: 'narration',
        text: 'Vincent turns back to his wall, but his hands are shaking.',
      },
    ],
    effects: {
      addRapport: { character: 'vincent', amount: 2 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Player deduces the mystery (higher priority than full reveal)
  // ============================================================================
  {
    id: 'vincent_player_deduces',
    character: 'vincent',
    requirements: {
      trust: 2,
      flags: ['vincent_opened_door', 'caught_earl_with_device', 'knows_vincent_is_researcher', 'knows_mo_mile_discrepancy'],
    },
    priority: 101,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You have that look. Like you\'ve figured something out."',
      },
      {
        speaker: 'player',
        text: '"I have. Listen."',
      },
      {
        speaker: 'narration',
        text: 'You take a breath. You\'ve been piecing this together from a dozen sources. It\'s time to see if you\'re right.',
      },
      {
        speaker: 'player',
        text: '"Earl\'s grief is powering the device. Every night he talks to Thomas through it. His love is the fuel."',
      },
      {
        speaker: 'player',
        text: '"The loop bends space — Mo\'s mile markers don\'t match because reality is folded around the motel."',
      },
      {
        speaker: 'player',
        text: '"And you\'re one of the anchors. You were at the facility in 1984 when the device first activated."',
      },
      {
        speaker: 'narration',
        text: 'Vincent stares at you. A long silence.',
      },
      {
        speaker: 'npc',
        text: '"I spent three months trying to piece that together. You did it in days."',
      },
      {
        speaker: 'narration',
        text: 'He sits on the edge of the bed.',
      },
      {
        speaker: 'npc',
        text: '"You\'re right. About all of it. Earl has to let go."',
      },
      {
        speaker: 'npc',
        text: '"He\'s the only one who can turn it off. The device won\'t listen to anyone else."',
      },
      {
        speaker: 'npc',
        text: '"But he won\'t do it alone. He needs someone to tell him it\'s okay."',
      },
    ],
    effects: {
      setFlags: [
        'vincent_told_everything',
        'knows_how_to_end_loop',
        'ready_for_ending',
        'knows_vincent_connection',
        'knows_how_to_end',
        'knows_device_purpose',
        'knows_thomas_role',
        'player_deduced',
      ],
      addRapport: { character: 'vincent', amount: 2 },
      advanceChapter: 5,
      advanceTime: 25,
    },
  },

  // ============================================================================
  // TIER 2: Full reveal
  // ============================================================================
  {
    id: 'vincent_tier2_full_reveal',
    character: 'vincent',
    requirements: {
      trust: 2,
      flags: ['vincent_opened_door'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The walls of Room 6 are covered in writing. Schedules. Timelines. Maps. The obsessive work of a man trying to solve an unsolvable puzzle.',
      },
      {
        speaker: 'npc',
        text: '"This is everything I learned. Every pattern. Every anomaly."',
      },
      {
        speaker: 'narration',
        text: 'He points to a timeline.',
      },
      {
        speaker: 'npc',
        text: '"The resets started six months ago. Earl activated the device. But the device was built for something else. Something that happened here forty years ago."',
        choices: [
          { text: '"Thomas."', next: 'thomas' },
          { text: '"The facility."', next: 'thomas' },
        ],
      },
      {
        id: 'thomas',
        speaker: 'npc',
        text: '"Both. Thomas worked at that facility. They were experimenting with temporal fields. Ways to freeze moments in time."',
      },
      {
        speaker: 'npc',
        text: '"Thomas died in a car accident. But the research didn\'t. Someone took the device when the facility shut down."',
        choices: [
          { text: '"Earl found it."', next: 'device_story' },
          { text: '"What happened next?"', next: 'device_story' },
        ],
      },
      {
        id: 'device_story',
        speaker: 'npc',
        text: '"Earl found it. And when he touched it, all that grief, all that wanting... it activated."',
      },
      {
        speaker: 'narration',
        text: 'He sits heavily on the bed.',
      },
      {
        speaker: 'npc',
        text: '"The device responds to emotion. It gave Earl what he wanted - a world that never moves forward. Never changes. Never leaves him behind."',
      },
      {
        speaker: 'player',
        text: '"How do we turn it off?"',
      },
      {
        speaker: 'npc',
        text: '"That\'s the thing. I figured it out. Months ago."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you with tired eyes.',
      },
      {
        speaker: 'npc',
        text: '"Earl has to let go. Really let go. The device won\'t release him until he releases Thomas."',
        choices: [
          { text: '"That\'s it?"', next: 'thats_it' },
          { text: '"He can\'t do that."', next: 'cant_do' },
          { text: '"Then we help him."', next: 'help_him' },
        ],
      },
      {
        id: 'thats_it',
        speaker: 'npc',
        text: "\"That's it. Simple, right? Just let go of your dead son. Just accept that he's gone forever. Just move on after forty years of grief.\"",
      },
      {
        speaker: 'narration',
        text: 'He laughs bitterly.',
      },
      {
        speaker: 'npc',
        text: '"Simple."',
      },
      {
        id: 'cant_do',
        speaker: 'npc',
        text: '"I know. I told him. We tried everything else first. But there is nothing else."',
      },
      {
        id: 'help_him',
        speaker: 'npc',
        text: '"How? How do you help someone grieve?"',
      },
      {
        speaker: 'narration',
        text: 'He looks at you.',
      },
      {
        speaker: 'npc',
        text: "\"You're welcome to try. I couldn't reach him.\"",
      },
    ],
    effects: {
      setFlags: [
        'vincent_told_everything',
        'knows_how_to_end_loop',
        'ready_for_ending',
        'knows_vincent_connection',
        'knows_how_to_end',
        'knows_device_purpose',
        'knows_thomas_role',
      ],
      addRapport: { character: 'vincent', amount: 2 },
      advanceChapter: 5,
      advanceTime: 30,
    },
  },

  // ============================================================================
  // TIER 2: Vincent's guilt — he knew the device was dangerous
  // ============================================================================
  {
    id: 'vincent_tier2_partners_guilt',
    character: 'vincent',
    requirements: {
      trust: 2,
      flags: ['vincent_told_everything'],
      notFlags: ['vincent_confessed_guilt'],
    },
    priority: 97,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"There\'s something I left out. When I told you about the device."',
      },
      {
        speaker: 'narration',
        text: 'He\'s not looking at you. He\'s looking at the wall of notes.',
      },
      {
        speaker: 'npc',
        text: '"I saw the danger. In the math. Before we ever turned it on."',
      },
      {
        speaker: 'npc',
        text: '"I told Thomas it was too volatile. He said it would be fine."',
      },
      {
        speaker: 'npc',
        text: '"I could have stopped him. Refused to help. Reported the project."',
      },
      {
        speaker: 'player',
        text: '"Why didn\'t you?"',
      },
      {
        speaker: 'npc',
        text: '"Because I wanted to see if it worked. The same curiosity that killed Thomas is why I\'m still here."',
      },
      {
        speaker: 'npc',
        text: '"Earl blames himself for turning it on. Thomas blamed himself for building it. But I\'m the one who knew the risks and said nothing."',
      },
      {
        speaker: 'npc',
        text: '"Three guilty men. One device. Forty years."',
      },
    ],
    effects: {
      setFlags: ['vincent_confessed_guilt', 'knows_vincent_guilt'],
      advanceTime: 20,
    },
  },
]
