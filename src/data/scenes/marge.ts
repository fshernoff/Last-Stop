import type { Scene } from '../../types'

export const margeScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'marge_tier0_intro',
    character: 'marge',
    requirements: {
      trust: 0,
      notFlags: ['met_marge'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Well, look who\'s up! Coffee\'s fresh. You look like you could use about three cups."',
        choices: [
          { text: '"Thanks, I\'d love some."', next: 'thanks' },
          { text: '"How long have you worked here?"', next: 'howlong' },
          { text: '"Something feels off about this place."', next: 'off' },
        ],
        choiceMode: 'topics',
        convergeTo: 'marge_intro_after',
      },
      {
        id: 'thanks',
        speaker: 'npc',
        text: '"Coming right up. I\'m Marge. Earl\'s sister. Been pouring coffee here twenty years and I still can\'t make a decent cup, but nobody complains."',
      },
      {
        id: 'howlong',
        speaker: 'npc',
        text: '"Twenty years, give or take. Came out here after my divorce. Earl needed help, I needed a change. Worked out for both of us."',
      },
      {
        id: 'off',
        speaker: 'npc',
        text: '"Off? Honey, the strangest thing here is Earl\'s taste in music. It\'s just a motel. Desert does funny things to people\'s heads, that\'s all."',
      },
      {
        id: 'marge_intro_after',
        speaker: 'narration',
        text: 'She pours you a cup of coffee. It\'s burnt but strong.',
      },
    ],
    effects: {
      setFlags: ['met_marge'],
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 0: Repeat visits
  // ============================================================================
  {
    id: 'marge_tier0_repeat',
    character: 'marge',
    requirements: {
      trust: 0,
      flags: ['met_marge'],
    },
    priority: 10,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"Back again? Coffee\'s still fresh. Well, fresh-ish."',
      },
      {
        speaker: 'narration',
        text: 'She refills your cup without asking.',
      },
      {
        speaker: 'npc',
        text: '"You let me know if you need anything."',
        choices: [
          { text: '"Thanks."', next: 'end' },
          { text: '[Say nothing]', next: 'end' },
        ],
      },
      {
        id: 'end',
        speaker: 'narration',
        text: 'She nods and returns to her work.',
      },
    ],
    effects: {
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'marge_tier0_smalltalk',
    character: 'marge',
    requirements: {
      trust: 0,
      flags: ['met_marge'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"You want the secret to surviving a motel diner? Never look directly at the grease trap."',
      },
      {
        speaker: 'narration',
        text: 'She grins like she\'s letting you in on a family curse.',
      },
      {
        speaker: 'npc',
        text: '"Coffee?"',
      },
    ],
    effects: {
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: Gossip about guests
  // ============================================================================
  {
    id: 'marge_tier1_gossip',
    character: 'marge',
    requirements: {
      trust: 1,
      flags: ['met_marge'],
    },
    priority: 50,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'npc',
        text: '"You settling in okay? This place grows on you. Or it doesn\'t. One or the other."',
        choices: [
          { text: '"Tell me about the other guests."', next: 'guests' },
          { text: '"I\'m just passing through."', next: 'passing' },
        ],
      },
      {
        id: 'guests',
        speaker: 'npc',
        text: '"Well, let\'s see. That young couple in Room 2 - the Chens - they\'re newlyweds, supposedly, but they fight like they\'ve been married thirty years."',
      },
      {
        speaker: 'npc',
        text: '"The businesswoman in 4, Diane something. She says she\'s in sales but I\'ve never seen anyone work that hard at selling nothing."',
      },
      {
        speaker: 'npc',
        text: '"Big Mo in 9, he\'s a trucker. Sweetest man you\'ll ever meet. Tips too much."',
      },
      {
        speaker: 'npc',
        text: '"And there\'s a nervous fella in 11. Don\'t know his name. He gives me the creeps, if I\'m honest."',
        choices: [
          { text: '"What about Room 6?"', next: 'room6' },
          { text: '"Thanks for the rundown."', next: 'thanks' },
        ],
      },
      {
        id: 'room6',
        speaker: 'npc',
        text: '"Room 6 is Earl\'s business. I don\'t ask."',
      },
      {
        speaker: 'narration',
        text: 'She pauses, wiping the same spot on the counter.',
      },
      {
        speaker: 'npc',
        text: '"Whoever\'s in there, they\'ve been in there a long time."',
      },
      {
        id: 'thanks',
        speaker: 'npc',
        text: '"Happy to help. I like knowing who\'s under my roof. Even if it\'s Earl\'s roof, technically."',
      },
      {
        id: 'passing',
        speaker: 'narration',
        text: 'She winks and moves on to another customer.',
      },
    ],
    effects: {
      setFlags: ['marge_mentioned_room6', 'knows_room6_occupied', 'knows_vincent_exists'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: About Earl
  // ============================================================================
  {
    id: 'marge_tier1_about_earl',
    character: 'marge',
    requirements: {
      trust: 1,
      flags: ['met_marge'],
      notFlags: ['asked_marge_about_earl'],
    },
    priority: 40,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"Tell me about Earl."',
      },
      {
        speaker: 'npc',
        text: '"Earl? He\'s my brother. Older by six years. Been running this motel since... lord, since before I got here."',
      },
      {
        speaker: 'npc',
        text: '"He bought it after his boy died. Thomas. Car accident, out on the highway. Earl never really got over it."',
      },
      {
        speaker: 'narration',
        text: 'Her voice softens.',
      },
      {
        speaker: 'npc',
        text: '"Nobody does, I suppose. Get over something like that. You just learn to carry it."',
        choices: [
          { text: '"When did Thomas die?"', next: 'when' },
          { text: '"I\'m sorry."', next: 'sorry' },
          { text: '[Say nothing]', next: 'nothing' },
        ],
      },
      {
        id: 'when',
        speaker: 'npc',
        text: '"Forty years ago, almost. Earl was different before. Lighter. Now he just... keeps going. One day at a time."',
      },
      {
        id: 'sorry',
        speaker: 'npc',
        text: '"Thank you. It\'s old grief now. But grief doesn\'t really get old, does it? Just familiar."',
      },
      {
        id: 'nothing',
        speaker: 'npc',
        text: '"Anyway. That\'s Earl. He\'s a good man. Just a sad one."',
      },
    ],
    effects: {
      setFlags: ['asked_marge_about_earl', 'knows_thomas_died', 'knows_earl_son', 'knows_earl_guilt'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Worried about Earl (requires loop 5+)
  // ============================================================================
  {
    id: 'marge_tier1_worried',
    character: 'marge',
    requirements: {
      trust: 1,
      flags: ['met_marge'],
      loop: { min: 5 },
    },
    priority: 45,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Can I ask you something? You seem... observant."',
        choices: [
          { text: '"Sure."', next: 'continue' },
          { text: '"What is it?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"Is it just me, or is something wrong with Earl lately? The last few months, he\'s been... different."',
      },
      {
        speaker: 'npc',
        text: '"He doesn\'t sleep. I can tell. And he looks at the guests different now. Like he\'s waiting for something."',
        choices: [
          { text: '"I\'ve noticed he seems tired."', next: 'tired' },
          { text: '"Maybe he\'s just getting older."', next: 'older' },
          { text: '"Something is wrong. I don\'t know what."', next: 'wrong' },
        ],
      },
      {
        id: 'tired',
        speaker: 'npc',
        text: '"Tired doesn\'t cover it. He looks haunted."',
      },
      {
        speaker: 'narration',
        text: 'She shakes her head.',
      },
      {
        speaker: 'npc',
        text: '"Maybe I\'m imagining things. Thanks for listening."',
      },
      {
        id: 'older',
        speaker: 'npc',
        text: '"Could be. Could be. We\'re all getting older."',
      },
      {
        speaker: 'narration',
        text: 'She doesn\'t look convinced.',
      },
      {
        speaker: 'npc',
        text: '"Thanks anyway. Forget I said anything."',
      },
      {
        id: 'wrong',
        speaker: 'npc',
        text: '"So it\'s not just me."',
      },
      {
        speaker: 'narration',
        text: 'She looks at you carefully.',
      },
      {
        speaker: 'npc',
        text: '"If you figure out what it is, you\'ll tell me? He won\'t talk to me anymore. Not really."',
      },
      {
        speaker: 'narration',
        text: 'You nod. She seems relieved just to have said it out loud.',
      },
    ],
    effects: {
      setFlags: ['marge_worried_about_earl', 'knows_marge_worried'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Confession (requires earl_revealed)
  // ============================================================================
  {
    id: 'marge_tier2_confession',
    character: 'marge',
    requirements: {
      trust: 2,
      flags: ['marge_worried_about_earl', 'earl_revealed'],
    },
    priority: 80,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You know something. About Earl. About what\'s happening here."',
      },
      {
        speaker: 'narration',
        text: 'It\'s not a question.',
        choices: [
          { text: '"Yes."', next: 'continue' },
          { text: '"What makes you say that?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"I\'ve watched you two. The way you talk now. Like you\'re sharing a secret."',
      },
      {
        speaker: 'npc',
        text: '"I don\'t need to know what it is. I just need to know - is he going to be okay?"',
        choices: [
          { text: '"I\'m trying to help him."', next: 'help' },
          { text: '"I don\'t know yet."', next: 'dontknow' },
          { text: '"He\'s been through something I can\'t explain."', next: 'cantexplain' },
        ],
      },
      {
        id: 'help',
        speaker: 'npc',
        text: '"Then that\'s enough. That\'s enough."',
      },
      {
        speaker: 'narration',
        text: 'She wipes her eyes quickly.',
      },
      {
        speaker: 'npc',
        text: '"You help him. I\'ll keep the coffee hot. It\'s all I know how to do."',
      },
      {
        id: 'dontknow',
        speaker: 'npc',
        text: '"Well. At least someone\'s trying."',
      },
      {
        speaker: 'narration',
        text: 'She pats your hand.',
      },
      {
        speaker: 'npc',
        text: '"That\'s more than he\'s done for himself in a long time."',
      },
      {
        id: 'cantexplain',
        speaker: 'npc',
        text: '"Then don\'t explain it. Just fix it."',
      },
      {
        speaker: 'narration',
        text: 'She looks at you hard.',
      },
      {
        speaker: 'npc',
        text: '"Can you fix it?"',
        choices: [
          { text: '"I\'m going to try."', next: 'try' },
          { text: '"I don\'t know."', next: 'try' },
        ],
      },
      {
        id: 'try',
        speaker: 'npc',
        text: '"That\'ll have to be good enough."',
      },
    ],
    effects: {
      setFlags: ['marge_knows_you_know', 'knows_marge_knows'],
      setTrust: { character: 'marge', tier: 2 },
      advanceTime: 25,
    },
  },
]
