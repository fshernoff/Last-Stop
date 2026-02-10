import type { Scene } from '../../types'

export const endingScenes: Scene[] = [
  // ============================================================================
  // THE ENDING: Player chooses whether Earl lets go or they both stay
  // ============================================================================
  {
    id: 'ending_confrontation',
    character: 'earl',
    requirements: {
      flags: ['ready_for_ending', 'earl_read_journal'],
    },
    priority: 1000,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "You find Earl in the back room. He's holding the journal. The device hums softly behind him.",
      },
      {
        speaker: 'npc',
        text: '"I\'ve been reading this all night. Every reset. Every word."',
      },
      {
        speaker: 'npc',
        text: '"Thomas. My boy. He knew I\'d find this someday. He knew I\'d be tempted."',
      },
      {
        speaker: 'narration',
        text: 'He turns to face the device.',
      },
      {
        speaker: 'npc',
        text: '"He asked me to let go. Forty years ago, in a letter I never read."',
      },
      {
        speaker: 'narration',
        text: 'Earl stands motionless. His hand hovers near the device. The hum fills the silence between you.',
      },
      {
        speaker: 'npc',
        text: '"I\'m tired. I\'m so tired of living the same day. Of watching people come and go and forget."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you. Really looks at you.',
      },
      {
        speaker: 'npc',
        text: '"What do we do?"',
        choices: [
          {
            text: '"It\'s time to let him go, Earl."',
            next: 'ending_a_path',
            effects: { setFlags: ['ending_a'] },
          },
          {
            text: '"Let me carry this. You\'ve done enough."',
            next: 'ending_b_path',
            effects: { setFlags: ['ending_b'] },
            requiresFlags: ['vincent_was_partner', 'caught_earl_with_device'],
          },
          {
            text: '"Give me the device. I\'m ending this myself."',
            next: 'ending_c_path',
            effects: { setFlags: ['ending_c'] },
            requiresFlags: ['earl_confirmed_government'],
            requiresItems: ['facility_keycard'],
          },
          {
            text: '"I\'m not ready to leave this place."',
            next: 'ending_d_path',
            effects: { setFlags: ['ending_d'] },
          },
        ],
      },

      // ── ENDING A: Release ───────────────────────────────────────────────
      {
        id: 'ending_a_path',
        speaker: 'narration',
        text: 'Something shifts in his face. Not surprise. Relief.',
      },
      {
        speaker: 'npc',
        text: '"Thomas is gone. He\'s been gone for forty years."',
      },
      {
        speaker: 'narration',
        text: 'His hand trembles.',
      },
      {
        speaker: 'npc',
        text: '"And it\'s time I let him stay gone."',
      },
      {
        speaker: 'narration',
        text: 'Earl turns off the device.',
      },
      {
        speaker: 'narration',
        text: 'The hum stops.',
      },
      {
        speaker: 'narration',
        text: 'The air changes.',
      },
      {
        speaker: 'narration',
        text: 'For the first time in six months, time moves forward.',
      },
      {
        speaker: 'narration',
        text: 'Morning comes. A new morning. Different light through the windows.',
      },
      {
        speaker: 'narration',
        text: 'The guests wake confused but free. Cars start. People drive away.',
      },
      {
        speaker: 'narration',
        text: 'Marge finds Earl sitting on a chair outside the office, watching the highway.',
      },
      {
        speaker: 'npc',
        text: '"Earl? You okay?"',
      },
      {
        speaker: 'npc',
        text: '"I think I will be."',
      },
      {
        speaker: 'narration',
        text: 'The motel sits in the desert, no longer a trap. Just a place.',
      },
      {
        speaker: 'narration',
        text: 'Just a last stop.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },

      // ── ENDING B: Replace ────────────────────────────────────────────────
      {
        id: 'ending_b_path',
        speaker: 'narration',
        text: 'Earl stares at you.',
      },
      {
        speaker: 'npc',
        text: '"What are you talking about?"',
      },
      {
        speaker: 'player',
        text: '"I understand the device now. Vincent helped me see it. It doesn\'t run on electricity or physics. It runs on grief. On love. On not letting go."',
      },
      {
        speaker: 'npc',
        text: '"You can\'t-"',
      },
      {
        speaker: 'player',
        text: '"I saw you that night. In the office. Talking to Thomas. I know what it costs you."',
      },
      {
        speaker: 'narration',
        text: 'You reach for the device. The hum shifts — uncertain, searching.',
      },
      {
        speaker: 'narration',
        text: 'You think of everyone trapped here. Of Earl, carrying forty years of grief like a stone. Of Thomas, who wanted his father to be free.',
      },
      {
        speaker: 'narration',
        text: 'The hum settles. It recognizes you.',
      },
      {
        speaker: 'npc',
        text: '"What did you do?"',
      },
      {
        speaker: 'player',
        text: '"I gave you what Thomas wanted. Go, Earl. Drive away. For the first time in forty years."',
      },
      {
        speaker: 'narration',
        text: 'Earl stands motionless. Then something breaks in his face — not grief, but release.',
      },
      {
        speaker: 'npc',
        text: '"You don\'t know what you\'re taking on."',
      },
      {
        speaker: 'player',
        text: '"I do. And I\'m choosing it."',
      },
      {
        speaker: 'narration',
        text: 'Earl walks out. You hear his truck start — a sound that hasn\'t been heard in forty years.',
      },
      {
        speaker: 'narration',
        text: 'The day resets. You wake at 6AM. The device hums softly on the workbench.',
      },
      {
        speaker: 'narration',
        text: 'Marge smiles at you from behind the counter.',
      },
      {
        speaker: 'npc',
        text: '"You look like you belong here, hun."',
      },
      {
        speaker: 'narration',
        text: 'You do now.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },

      // ── ENDING C: Destroy ─────────────────────────────────────────────────
      {
        id: 'ending_c_path',
        speaker: 'narration',
        text: 'You pull the facility keycard from your pocket. Earl stares at it.',
      },
      {
        speaker: 'npc',
        text: '"Where did you get that?"',
      },
      {
        speaker: 'player',
        text: '"The facility. The one the government sealed. There\'s a containment chamber inside. It was built to shut the device down."',
      },
      {
        speaker: 'npc',
        text: '"You want to destroy it."',
      },
      {
        speaker: 'player',
        text: '"I want to end this. For real. No more resets. No more grief powering a machine."',
      },
      {
        speaker: 'narration',
        text: 'Earl looks at the device. At the journal. At the photo of Thomas on the wall.',
      },
      {
        speaker: 'npc',
        text: '"If you destroy it... Thomas is gone. Really gone. No more talking to him. No more pretending."',
      },
      {
        speaker: 'player',
        text: '"He\'s been gone for forty years, Earl. You just haven\'t let yourself know it."',
      },
      {
        speaker: 'narration',
        text: 'A long silence. Then Earl picks up the device and hands it to you.',
      },
      {
        speaker: 'npc',
        text: '"Do it. Before I change my mind."',
      },
      {
        speaker: 'narration',
        text: 'You drive to the facility. The keycard works. The containment chamber is exactly where the files said it would be.',
      },
      {
        speaker: 'narration',
        text: 'You place the device inside. Activate the sequence. The hum rises to a scream.',
      },
      {
        speaker: 'narration',
        text: 'Then silence.',
      },
      {
        speaker: 'narration',
        text: 'Forty years of frozen time rush forward. The motel ages in seconds. Paint peels. Windows crack. The desert reclaims what was always hers.',
      },
      {
        speaker: 'narration',
        text: 'Back at the motel, Vincent stands in the parking lot — older now, frail, blinking in unfamiliar sunlight. Earl sits on the office steps, looking every one of his years.',
      },
      {
        speaker: 'narration',
        text: 'But the sky is different. The air moves. Time moves.',
      },
      {
        speaker: 'narration',
        text: 'Not gently. Not kindly. But forward.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },

      // ── ENDING D: Stay ──────────────────────────────────────────────────
      {
        id: 'ending_d_path',
        speaker: 'narration',
        text: 'Earl stares at you for a long time.',
      },
      {
        speaker: 'npc',
        text: '"Neither am I. Even now."',
      },
      {
        speaker: 'narration',
        text: 'You both stand in silence. The device hums between you like a heartbeat.',
      },
      {
        speaker: 'npc',
        text: '"There\'s something about knowing everyone. Every conversation. Every pattern."',
      },
      {
        speaker: 'player',
        text: '"It feels like home. In a way."',
      },
      {
        speaker: 'npc',
        text: '"That\'s what I told myself. For a long time."',
      },
      {
        speaker: 'narration',
        text: 'He lowers his hand from the device. Steps back.',
      },
      {
        speaker: 'npc',
        text: '"Maybe that\'s enough."',
      },
      {
        speaker: 'narration',
        text: 'The day ends. It resets.',
      },
      {
        speaker: 'narration',
        text: 'You wake at 6AM.',
      },
      {
        speaker: 'narration',
        text: 'The same sun. The same desert. The same coffee.',
      },
      {
        speaker: 'narration',
        text: 'Marge smiles at you from behind the counter.',
      },
      {
        speaker: 'npc',
        text: '"You look like you\'ve been here before, hun."',
      },
      {
        speaker: 'narration',
        text: 'You smile back.',
      },
      {
        speaker: 'narration',
        text: 'You have.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },
    ],
    effects: {
      setFlags: ['ending_complete'],
    },
  },
]
