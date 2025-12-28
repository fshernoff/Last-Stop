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
      notFlags: ['vincent_contacted'],
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
        text: '"His name\'s Vincent. He checked in three months ago. Figured out the loop about two weeks in."',
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
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Patterns (loop 10+)
  // ============================================================================
  {
    id: 'vincent_tier1_patterns',
    character: 'vincent',
    requirements: {
      trust: 1,
      flags: ['earl_told_about_vincent'],
      loop: { min: 10 },
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
        text: '"I mapped the day. The loop snaps at the edges."',
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
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Door opens (after many loops)
  // ============================================================================
  {
    id: 'vincent_tier1_door_opens',
    character: 'vincent',
    requirements: {
      trust: 1,
      flags: ['earl_told_about_vincent'],
      loop: { min: 20 },
    },
    priority: 95,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "You've been talking through the door for... how many loops now? You've lost count.",
      },
      {
        speaker: 'player',
        text: '"Vincent. I\'m not giving up."',
      },
      {
        speaker: 'npc',
        text: "\"I know. I've been listening. Every loop, you come back. Every loop, you're still trying.\"",
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
      advanceTime: 10,
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
        text: '"The loop started six months ago. Earl activated the device. But the device was built for something else. Something that happened here forty years ago."',
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
      advanceTime: 30,
    },
  },
]
