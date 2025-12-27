import type { Scene } from '../../types'

export const earlScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'earl_tier0_intro',
    character: 'earl',
    requirements: {
      trust: 0,
      notFlags: ['met_earl'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The man behind the desk looks up from a ledger that might be older than you. He\'s thin, weathered, with eyes that have seen too much highway.',
      },
      {
        speaker: 'npc',
        text: '"Help you?"',
        choices: [
          { text: '"Just looking around."', next: 'looking' },
          { text: '"I\'m staying here. Room 7."', next: 'staying' },
          { text: '"Quiet place."', next: 'quiet' },
        ],
      },
      {
        id: 'looking',
        speaker: 'npc',
        text: '"Not much to look at. Twelve rooms, a diner, and a whole lot of desert."',
      },
      {
        speaker: 'npc',
        text: '"You need anything, I\'m here till ten."',
      },
      {
        id: 'staying',
        speaker: 'npc',
        text: '"I know. I checked you in last night."',
      },
      {
        speaker: 'narration',
        text: 'He pauses, studying you.',
      },
      {
        speaker: 'npc',
        text: '"You look like you\'ve been here longer."',
      },
      {
        speaker: 'npc',
        text: '"You need anything, I\'m here till ten."',
      },
      {
        id: 'quiet',
        speaker: 'npc',
        text: '"That\'s what people come here for. Quiet. Some find it peaceful. Others find it..."',
      },
      {
        speaker: 'narration',
        text: 'He trails off.',
      },
      {
        speaker: 'npc',
        text: '"You need anything, I\'m here till ten."',
      },
    ],
    effects: {
      setFlags: ['met_earl'],
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 0: Repeat visits
  // ============================================================================
  {
    id: 'earl_tier0_repeat',
    character: 'earl',
    requirements: {
      trust: 0,
      flags: ['met_earl'],
    },
    priority: 10,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"Something I can help you with?"',
        choices: [
          { text: '"Just passing through."', next: 'end' },
          { text: '[Say nothing]', next: 'end' },
        ],
      },
      {
        id: 'end',
        speaker: 'npc',
        text: '"Right."',
      },
      {
        speaker: 'narration',
        text: 'He returns to his ledger. The conversation is over.',
      },
    ],
    effects: {
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'earl_tier0_smalltalk',
    character: 'earl',
    requirements: {
      trust: 0,
      flags: ['met_earl'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"People say the desert is empty. It isn\'t. It just doesn\'t speak."',
      },
      {
        speaker: 'narration',
        text: 'He taps his pen against the ledger, then goes quiet.',
      },
    ],
    effects: {
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: Probing (loop 3+)
  // ============================================================================
  {
    id: 'earl_tier1_probing',
    character: 'earl',
    requirements: {
      trust: 1,
      flags: ['met_earl'],
      loop: { min: 3 },
    },
    priority: 50,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"You\'re still here."',
        choices: [
          { text: '"Car trouble."', next: 'car' },
          { text: '"Something about this place."', next: 'something' },
          { text: '"Aren\'t you always here too?"', next: 'always' },
        ],
      },
      {
        id: 'car',
        speaker: 'npc',
        text: '"Mmhm. Mechanic\'s thirty miles east. If you can get there."',
      },
      {
        speaker: 'narration',
        text: 'His eyes flicker with something. Amusement? Sadness?',
      },
      {
        speaker: 'npc',
        text: '"Most folks can\'t."',
      },
      {
        id: 'something',
        speaker: 'npc',
        text: '"Is there?"',
      },
      {
        speaker: 'narration',
        text: 'He sets down his pen.',
      },
      {
        speaker: 'npc',
        text: '"Most people can\'t wait to leave. You\'re different."',
      },
      {
        id: 'always',
        speaker: 'npc',
        text: '"Forty years. Give or take."',
      },
      {
        speaker: 'narration',
        text: 'He looks at the wall of keys.',
      },
      {
        speaker: 'npc',
        text: '"Someone has to keep the lights on."',
      },
    ],
    effects: {
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Anomaly noticed (requires observation flag)
  // ============================================================================
  {
    id: 'earl_tier1_anomaly_noticed',
    character: 'earl',
    requirements: {
      trust: 1,
      flags: ['observed_earl_anomaly'],
    },
    priority: 70,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"I saw you last night. After the office closed. You went to the back room."',
      },
      {
        speaker: 'narration',
        text: 'Earl goes very still.',
      },
      {
        speaker: 'npc',
        text: '"You were watching me."',
        choices: [
          { text: '"I watch everyone."', next: 'watch' },
          { text: '"I couldn\'t sleep."', next: 'sleep' },
          { text: '"Something\'s happening here. I\'m trying to understand."', next: 'understand' },
        ],
      },
      {
        id: 'watch',
        speaker: 'npc',
        text: '"Smart. In a place like this, it pays to watch."',
      },
      {
        speaker: 'narration',
        text: 'He considers you.',
      },
      {
        speaker: 'npc',
        text: '"What else have you seen?"',
      },
      {
        id: 'sleep',
        speaker: 'npc',
        text: '"Neither can I. Not anymore."',
      },
      {
        id: 'understand',
        speaker: 'npc',
        text: '"Are you now."',
      },
      {
        speaker: 'narration',
        text: 'He leans forward.',
      },
      {
        speaker: 'npc',
        text: '"And how many days have you been trying?"',
      },
      {
        speaker: 'narration',
        text: 'The question hangs in the air. He knows. He knows you know something.',
        choices: [
          { text: '"Days?"', next: 'pretend' },
          { text: '"More than I can count."', next: 'reveal' },
          { text: '"You know about the loop."', next: 'reveal' },
        ],
      },
      {
        id: 'pretend',
        speaker: 'npc',
        text: '"Come back when you\'re ready to stop pretending."',
      },
      {
        id: 'reveal',
        speaker: 'npc',
        text: '"Sit down. We need to talk."',
      },
    ],
    effects: {
      setFlags: ['earl_knows_you_know'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: The big reveal (loop 10+, after earl_knows_you_know)
  // ============================================================================
  {
    id: 'earl_reveal',
    character: 'earl',
    requirements: {
      trust: 1,
      flags: ['earl_knows_you_know'],
      loop: { min: 10 },
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"How many loops?"',
        choices: [
          { text: '"Twelve. Maybe more."', next: 'continue' },
          { text: '"I stopped counting."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"Took you about average. Most folks take two, three weeks to start remembering. Some never do."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you with something like respect.',
      },
      {
        speaker: 'npc',
        text: '"But you remembered right away, didn\'t you? First reset, you knew."',
        choices: [
          { text: '"Yes."', next: 'watching' },
          { text: '"How did you know?"', next: 'watching' },
        ],
      },
      {
        id: 'watching',
        speaker: 'npc',
        text: '"I\'ve been watching you since you got here. The way you move. The way you look at people. Like you\'ve met them before."',
      },
      {
        speaker: 'narration',
        text: 'He pulls out a chair.',
      },
      {
        speaker: 'npc',
        text: '"I\'ve been in this loop for six months. Give or take. Hard to keep track after the first thousand."',
        choices: [
          { text: '"A thousand loops?"', next: 'thousand' },
          { text: '"How is this possible?"', next: 'how' },
          { text: '"How do we stop it?"', next: 'stop' },
        ],
      },
      {
        id: 'thousand',
        speaker: 'npc',
        text: '"More. I stopped counting around day hundred. Didn\'t see the point."',
      },
      {
        speaker: 'narration',
        text: 'He sighs.',
      },
      {
        speaker: 'npc',
        text: '"But I\'ll tell you what I know."',
      },
      {
        id: 'how',
        speaker: 'npc',
        text: '"You want the short version or the long one?"',
      },
      {
        speaker: 'narration',
        text: 'He sighs.',
      },
      {
        speaker: 'npc',
        text: '"But I\'ll tell you what I know."',
      },
      {
        id: 'stop',
        speaker: 'npc',
        text: '"If I knew that, do you think we\'d still be here?"',
      },
      {
        speaker: 'narration',
        text: 'He sighs.',
      },
      {
        speaker: 'npc',
        text: '"But I\'ll tell you what I know."',
      },
      {
        speaker: 'narration',
        text: 'Earl tells you about Thomas. About the device. About six months of trying everything.',
      },
      {
        speaker: 'npc',
        text: '"It\'s in the back room. I can show you."',
        choices: [
          { text: '"Show me."', next: 'show' },
          { text: '"Why are you telling me this?"', next: 'why' },
        ],
      },
      {
        id: 'show',
        speaker: 'npc',
        text: '"Come on."',
      },
      {
        id: 'why',
        speaker: 'npc',
        text: '"Because I\'m tired. Because I can\'t do this alone anymore. Because you remembered, and that means something."',
      },
      {
        speaker: 'narration',
        text: 'He stands.',
      },
      {
        speaker: 'npc',
        text: '"Now come on. You need to see it."',
      },
    ],
    effects: {
      setFlags: [
        'earl_revealed',
        'has_master_key',
        'knows_earl_remembers',
        'knows_loop_cause',
        'knows_earl_built_device',
        'knows_earl_guilt',
        'knows_loop_exists',
        'knows_memory_persists',
      ],
      giveItem: 'master_key',
      advanceTime: 30,
    },
  },

  // ============================================================================
  // TIER 1: Post-reveal - seeing the device
  // ============================================================================
  {
    id: 'earl_post_reveal_device',
    character: 'earl',
    requirements: {
      trust: 1,
      flags: ['earl_revealed'],
      notFlags: ['seen_device'],
    },
    priority: 90,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The back room is cramped. A cot in the corner. Boxes stacked against walls. Photos of a young man you don\'t recognize.',
      },
      {
        speaker: 'narration',
        text: 'And on the workbench: a cylinder, the size of a coffee thermos, humming softly.',
      },
      {
        speaker: 'npc',
        text: '"That\'s it. Thomas\'s. From the facility where he worked."',
        choices: [
          { text: '"What does it do?"', next: 'what' },
          { text: '"Can I touch it?"', next: 'touch' },
          { text: '"Have you tried destroying it?"', next: 'destroy' },
        ],
      },
      {
        id: 'what',
        speaker: 'npc',
        text: '"Near as I can figure? It responds to wanting. To grief. I turned it on thinking of Thomas, wishing for... I don\'t know. More time."',
      },
      {
        speaker: 'narration',
        text: 'He laughs bitterly.',
      },
      {
        speaker: 'npc',
        text: '"Well. I got more time."',
      },
      {
        id: 'touch',
        speaker: 'npc',
        text: '"Go ahead. Won\'t hurt you. Won\'t do anything. It only listens to me."',
      },
      {
        id: 'destroy',
        speaker: 'npc',
        text: '"Smashed it. Buried it. Threw it in the desert. Every morning, it\'s back. Right here. Humming."',
      },
      {
        speaker: 'narration',
        text: 'The device continues its soft hum. It sounds almost like breathing.',
      },
    ],
    effects: {
      setFlags: ['seen_device', 'knows_device_purpose', 'knows_loop_cause'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Thomas's journal (requires journal item)
  // ============================================================================
  {
    id: 'earl_tier2_thomas',
    character: 'earl',
    requirements: {
      trust: 2,
      flags: ['seen_device', 'has_thomas_journal'],
    },
    priority: 85,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"I found Thomas\'s journal. In the storage area."',
      },
      {
        speaker: 'narration',
        text: 'Earl\'s face changes. Something cracks behind his eyes.',
      },
      {
        speaker: 'npc',
        text: '"You... where?"',
      },
      {
        speaker: 'player',
        text: '"Behind some boxes. I don\'t think you ever looked there."',
      },
      {
        speaker: 'narration',
        text: 'You hand him the journal. His hands shake as he takes it.',
      },
      {
        speaker: 'npc',
        text: '"I couldn\'t. After he died, I couldn\'t look at his things. Just boxed it all up and..."',
      },
      {
        speaker: 'narration',
        text: 'He trails off, opening the journal.',
      },
      {
        speaker: 'narration',
        text: 'For a long moment, he just reads. You see tears forming, falling, ignored.',
      },
      {
        speaker: 'npc',
        text: '"He knew. About the device. What it could do."',
      },
      {
        speaker: 'narration',
        text: 'Earl looks up.',
      },
      {
        speaker: 'npc',
        text: '"He wrote that he hoped I\'d never find it. That I\'d never be tempted to use it."',
        choices: [
          { text: '"He loved you."', next: 'loved' },
          { text: '"He wanted you to move on."', next: 'moveon' },
          { text: '[Say nothing]', next: 'nothing' },
        ],
      },
      {
        id: 'loved',
        speaker: 'npc',
        text: '"I know. I always knew."',
      },
      {
        id: 'moveon',
        speaker: 'npc',
        text: '"He did. He wrote it right here. \'Move on, Dad. Please.\'"',
      },
      {
        id: 'nothing',
        speaker: 'narration',
        text: 'Earl reads silently. His shoulders shake.',
      },
      {
        speaker: 'npc',
        text: '"Forty years. He\'s been waiting forty years for me to let go."',
      },
      {
        speaker: 'narration',
        text: 'He closes the journal.',
      },
      {
        speaker: 'npc',
        text: '"I don\'t know if I can."',
      },
    ],
    effects: {
      setFlags: ['earl_read_journal', 'knows_thomas_role'],
      advanceTime: 25,
    },
  },
]
