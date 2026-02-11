/**
 * Arcane Flux Tables for Sorcerer spellcasting
 * Minor Flux: occurs on Failure
 * Major Flux: occurs on Fumble
 */
window.ArcaneFluxData = {

  /**
   * Sorcerous Wisdom mitigation chart
   * Based on the sorcerer's Sorcerous Wisdom skill %
   */
  getSorcerousWisdomMitigation(wisdomPct, fluxType) {
    if (fluxType === 'minor') {
      if (wisdomPct >= 81) return { text: 'May choose any Minor Arcane Flux result from the table.', canChoose: true, canReroll: false, canIgnore: true, mustTakeSecond: false };
      if (wisdomPct >= 61) return { text: 'Can choose to ignore the Minor Arcane Flux entirely.', canChoose: false, canReroll: false, canIgnore: true, mustTakeSecond: false };
      if (wisdomPct >= 41) return { text: 'May reroll, and can choose either result.', canChoose: false, canReroll: true, canIgnore: false, mustTakeSecond: false };
      if (wisdomPct >= 21) return { text: 'May reroll, but must take the second result.', canChoose: false, canReroll: true, canIgnore: false, mustTakeSecond: true };
      return { text: 'No mitigation available.', canChoose: false, canReroll: false, canIgnore: false, mustTakeSecond: false };
    } else {
      // Major
      if (wisdomPct >= 81) return { text: 'Can choose to ignore the Major Arcane Flux entirely.', canChoose: false, canReroll: false, canIgnore: true, mustTakeSecond: false };
      if (wisdomPct >= 61) return { text: 'May reroll, and can choose either result.', canChoose: false, canReroll: true, canIgnore: false, mustTakeSecond: false };
      if (wisdomPct >= 41) return { text: 'May reroll, but must take the second result.', canChoose: false, canReroll: true, canIgnore: false, mustTakeSecond: true };
      return { text: 'No mitigation available.', canChoose: false, canReroll: false, canIgnore: false, mustTakeSecond: false };
    }
  },

  /**
   * Look up a Minor Arcane Flux effect by d100 roll
   */
  getMinorFlux(roll) {
    const entry = this.MINOR_FLUX.find(e => roll >= e.min && roll <= e.max);
    return entry ? entry.effect : 'Unknown flux effect.';
  },

  /**
   * Look up a Major Arcane Flux effect by d100 roll
   */
  getMajorFlux(roll) {
    const entry = this.MAJOR_FLUX.find(e => roll >= e.min && roll <= e.max);
    return entry ? entry.effect : 'Unknown flux effect.';
  },

  MINOR_FLUX: [
    { min: 1, max: 2, effect: "Spell fizzles with no effect, but Magic Points are still consumed." },
    { min: 3, max: 4, effect: "Spell fizzles, but Magic Points are refunded." },
    { min: 5, max: 7, effect: "Caster is stunned for 1 round due to magical backlash." },
    { min: 8, max: 9, effect: "Caster is knocked back 10 feet in a random direction, as per Knockback." },
    { min: 10, max: 12, effect: "The spell affects a random target instead of the intended one." },
    { min: 13, max: 14, effect: "The spell's effect inverts (e.g., Fire becomes Ice, Push becomes Pull). If the effect is not reversible, reroll." },
    { min: 15, max: 17, effect: "The spell manifests with unintended effects (Games Master's choice)." },
    { min: 18, max: 19, effect: "The Sorcerer's hair, skin, or eyes change color for 1d6 hours. Roll 1d6: 1: Green; 2: Blue; 3: Purple; 4: Crimson; 5: Gold; 6: Silver." },
    { min: 20, max: 21, effect: "Nearby mundane objects animate briefly (1d3 minutes) before stopping." },
    { min: 22, max: 24, effect: "The next spell the Sorcerer casts is randomly altered (Games Master assigns a random Weaving effect)." },
    { min: 25, max: 26, effect: "The spell is delayed by 1d3 rounds before it takes effect." },
    { min: 27, max: 29, effect: "A harmless burst of light and sound erupts, startling those nearby." },
    { min: 30, max: 31, effect: "A random minor magical effect occurs (e.g., lights flicker, air distorts, small sparks dance in the air)." },
    { min: 32, max: 34, effect: "The spell works, but at half potency (damage, duration, etc.). The Games Master is the final word." },
    { min: 35, max: 36, effect: "The Sorcerer teleports 10 feet in a random direction." },
    { min: 37, max: 39, effect: "The Sorcerer gains a brief insight into the Weave, granting +10% to their next Sorcery roll." },
    { min: 40, max: 41, effect: "The Sorcerer regains 1d4 Magic Points instead of spending any for this spell." },
    { min: 42, max: 43, effect: "The spell fails, but the Sorcerer's next spell is cast at an Easy Difficulty for Sorcery." },
    { min: 44, max: 46, effect: "Magical resonance causes the Sorcerer to glow faintly for 1d6 minutes, providing dim light in a 10-ft radius." },
    { min: 47, max: 48, effect: "The Sorcerer momentarily hears distant voices speaking in an unknown language." },
    { min: 49, max: 51, effect: "Caster sneezes uncontrollably for 1d4 rounds, making concentration and verbal spellcasting harder (Hard Difficulty)." },
    { min: 52, max: 53, effect: "A random magical scent fills the air for 1d6 minutes. Roll 1d6: 1: Ozone and lavender; 2: Cinnamon and sulfur; 3: Iron and mint; 4: Wet earth and mushrooms; 5: Parchment and candle wax; 6: Blood and roses." },
    { min: 54, max: 56, effect: "The caster's voice echoes oddly for 1 hour, affecting attempts to remain stealthy or cast silently." },
    { min: 57, max: 58, effect: "The nearest living creature within 10 feet develops glowing eyes for 1d6 minutes. No effect, but unsettling." },
    { min: 59, max: 60, effect: "All coins on the caster's person momentarily levitate, then drop noisily." },
    { min: 61, max: 63, effect: "A small spectral animal appears and follows the caster for 1d10 minutes. Roll 1d6: 1: Fox; 2: Raven; 3: Snake; 4: Cat; 5: Moth swarm; 6: Stag." },
    { min: 64, max: 65, effect: "The caster's limbs feel rubbery, reducing Movement by 1 for 1d4 rounds." },
    { min: 66, max: 68, effect: "Ink, chalk, or pigment nearby shimmers and rearranges itself into magical glyphs that fade after a minute." },
    { min: 69, max: 70, effect: "A sudden gust of wind erupts from the caster, extinguishing candles and stirring papers." },
    { min: 71, max: 73, effect: "The next spell cast creates harmless musical tones in accompaniment (bells, chanting, zithers)." },
    { min: 74, max: 75, effect: "Caster glows faintly in a color tied to the last spell's element (e.g., red for fire, blue for ice) for 1 hour. If no element is associated, reroll." },
    { min: 76, max: 78, effect: "Nearby flowers or plants bloom rapidly, then wilt a few seconds later." },
    { min: 79, max: 80, effect: "A random object in the caster's possession swaps places with another on their person." },
    { min: 81, max: 82, effect: "All liquids within 10 feet bubble for 1 round, regardless of temperature or containment. This causes no harm." },
    { min: 83, max: 85, effect: "All locks within 30 feet rattle once, though none are affected mechanically." },
    { min: 86, max: 87, effect: "The spell draws the attention of a minor astral entity, which observes silently for a minute before vanishing." },
    { min: 88, max: 90, effect: "The caster's shadow detaches slightly, lagging behind for 1d6 rounds before snapping back." },
    { min: 91, max: 92, effect: "All written text within 5 feet becomes unreadable for 1d6 rounds, then returns to normal. This includes magical scrolls and spellbooks." },
    { min: 93, max: 95, effect: "A harmless illusion of strange symbols etched in blue swirls in the air where the spell was cast, fading after 1d4 rounds." },
    { min: 96, max: 97, effect: "For the next hour, the caster's reflection behaves independently, mimicking delayed movements or emotions." },
    { min: 98, max: 99, effect: "All coins the sorcerer has on their body transfer to the pocket of the nearest person." },
    { min: 100, max: 100, effect: "⚠ Major Arcane Flux! Roll on the Major Arcane Flux Table." }
  ],

  MAJOR_FLUX: [
    { min: 1, max: 2, effect: "The spell detonates violently, dealing (Spell Rank ×2)d6 damage in a 30-ft radius, affecting all creatures including the caster unless they Evade. Damage affects one Hit Location per person, ignoring non-magical armor." },
    { min: 3, max: 4, effect: "A portal to another plane opens for 1d4 rounds, expelling something random (Games Master's choice)." },
    { min: 5, max: 6, effect: "The spell's essence inverts (Fire becomes Water, Lightning becomes Earth, Healing becomes Decay, etc.). If not reversible, roll again." },
    { min: 7, max: 8, effect: "1d6 creatures (including the target) within 30 feet freeze in time for 1d6 rounds and afterwards begin moving again as if no time passed." },
    { min: 9, max: 10, effect: "Everyone within 60 feet must roll a Hard Willpower. 50/50 chance: float helplessly for 1d4 rounds OR rise 20 feet and slam into the ground (2d6 damage to 2 random locations)." },
    { min: 11, max: 12, effect: "All creatures within 60 feet (including the caster) must roll a Hard Willpower, or be transformed into a random harmless creature (chicken, rabbit, fish) for 1d6 rounds." },
    { min: 13, max: 14, effect: "The area (100-ft radius) is bombarded with random Minor Arcane Fluxes (Games Master rolls 1d3 times on the Minor Arcane Flux Table)." },
    { min: 15, max: 16, effect: "The caster's soul partially detaches, creating an invisible duplicate that mirrors their actions for 1d3 Rounds. They can still function physically but cannot cast further spells until the soul returns." },
    { min: 17, max: 18, effect: "The caster experiences cosmic enlightenment, stunning them for 1d4 rounds, but they gain one random Lore skill at +10%." },
    { min: 19, max: 20, effect: "The next 1d6 Rounds repeat, forcing all creatures to re-perform their last actions. If not in combat, the next 1d4 minutes repeat. Affected persons may not change their actions." },
    { min: 21, max: 22, effect: "The caster flickers between the Material Plane and Ethereal Plane for 1d3 Rounds, immune to physical attacks but unable to affect the world." },
    { min: 23, max: 24, effect: "Everyone within 60 feet turns invisible for 1d4 rounds — including enemies, objects, and furniture!" },
    { min: 25, max: 26, effect: "The caster causes plants, mushrooms, or vines to explode into existence, covering a 50-ft area, making movement difficult for 1 hour." },
    { min: 27, max: 28, effect: "A random creature (Games Master's choice) appears. Hostile or friendly (50/50 chance), stays for 1d2 minutes." },
    { min: 29, max: 30, effect: "The caster de-ages 1d10 years permanently. If reduced below young adulthood, temporarily lose 1d6 INT and POW for 24 hours." },
    { min: 31, max: 32, effect: "The caster floats 20 feet into the air for 1 minute, unable to control their movement. Afterwards, they gently float to the ground." },
    { min: 33, max: 34, effect: "A flux of random elemental energy (fire, ice, acid, lightning) bursts from the caster, dealing 2d6 damage to all in a 30-ft radius. Affects one Hit Location; armor protects." },
    { min: 35, max: 36, effect: "The caster is partially shifted to another plane, taking 1d4 Magic Point loss per round for 1d3 rounds unless they pass a Hard Willpower roll each Round." },
    { min: 37, max: 38, effect: "The caster's next spell automatically repeats 1 Round later at no cost, but targets are random (including allies)." },
    { min: 39, max: 40, effect: "The caster permanently emits a faint magical glow, making them detectable by all spellcasters within 100 feet. Lasts 1d4 days." },
    { min: 41, max: 42, effect: "The caster teleports 1d100 feet in a random direction — possibly into the sky." },
    { min: 43, max: 44, effect: "Everyone in a 30-ft radius has their clothing swapped randomly. Armor is not affected." },
    { min: 45, max: 46, effect: "The caster forgets their native language and instead speaks an unknown one for 24 hours. They may still write in their known languages." },
    { min: 47, max: 48, effect: "Any food or drink within 100 feet instantly rots, turning into useless sludge." },
    { min: 49, max: 50, effect: "Everyone in a 30-ft radius has their hair, fur, or other covering turned into flowers. Permanent until shaved or cut off." },
    { min: 51, max: 52, effect: "A mysterious celestial or abyssal being appears, speaks cryptic wisdom, then vanishes." },
    { min: 53, max: 54, effect: "All creatures within a 50-foot radius gain +1 Action Point for 1 minute." },
    { min: 55, max: 56, effect: "The caster's hair instantly grows 1 foot long per hour, and remains doing so for 1d6 days." },
    { min: 57, max: 58, effect: "1d6 nearby corpses animate as zombies or skeletons for 1d3 Rounds (or 1d2 minutes outside combat)." },
    { min: 59, max: 60, effect: "The caster hears a whisper from their own future self, revealing a minor clue about upcoming events." },
    { min: 61, max: 62, effect: "The area is hit by a magical storm for 1d8 minutes (rain, fog, lightning, or sudden heat)." },
    { min: 63, max: 64, effect: "The caster unintentionally creates 1d4 illusory duplicates of themselves for 1 minute. They stand still and cannot be controlled." },
    { min: 65, max: 66, effect: "For 1d4 minutes, all small objects (smaller than SIZ 1) within 30 feet float harmlessly into the air." },
    { min: 67, max: 68, effect: "The caster is suddenly surrounded by cinematic lighting and background music for 1 hour." },
    { min: 69, max: 70, effect: "A randomly appearing pie smacks the caster in the face, dealing no damage but ruining their dignity." },
    { min: 71, max: 72, effect: "The caster's skin color shifts every minute for 1d6 hours." },
    { min: 73, max: 74, effect: "All metallic objects within 30 feet are attracted to the caster, sticking to them for 10 minutes. Those wearing armor/weapons must succeed a Hard Athletics roll to oppose. Hard Brawn to remove." },
    { min: 75, max: 76, effect: "The caster automatically fails their next roll." },
    { min: 77, max: 78, effect: "All within 100 feet of the caster gain 1d3 Magic Points each." },
    { min: 79, max: 80, effect: "The caster and everyone nearby hear music, whispers, or laughter for 1d6 minutes with no discernible source." },
    { min: 81, max: 82, effect: "The sorcerer swaps places with a random creature within 100 feet. If no creatures nearby, swaps with someone from another plane for 1 minute." },
    { min: 83, max: 84, effect: "The sorcerer temporarily unlocks ultimate magical power! For 1d4 rounds, cast any known spell without MP or Arcane Sorcery rolls. Afterwards, lose all remaining MP and gain 2 Fatigue levels." },
    { min: 85, max: 86, effect: "A spontaneous feast appears — massive banquet table in a 30-ft radius. Restores 1d6 HP to anyone who eats. Vanishes after 10 minutes." },
    { min: 87, max: 88, effect: "The sorcerer accidentally casts a Wish! The GM grants one request, interpreted in the most inconvenient way possible." },
    { min: 89, max: 90, effect: "Every material item in a 30-ft radius turns to gold for 1d6 rounds (weapons, armor, clothing). After, all return to normal except 1d4 small items (worth 1d6 GP each)." },
    { min: 91, max: 92, effect: "The sorcerer becomes \"Best Friends\" with the most powerful creature in 30 feet. Target believes they're lifelong allies for 1d6 hours, then attacks when the effect ends. Duration is secret." },
    { min: 93, max: 94, effect: "A meteor the size of a small pumpkin crashes nearby (no damage). Inside: a mystical egg that hatches in 1d4 days into a familiar, elemental, or interdimensional creature (GM's choice). Not friendly." },
    { min: 95, max: 96, effect: "The sorcerer temporarily gains divine powers! For 1 minute: echoing voice, glowing eyes, celestial/abyssal energy (opposite alignment). +30% Influence bonus on same-alignment targets." },
    { min: 97, max: 98, effect: "Time briefly fractures! Sorcerer and allies repeat the last 2 Rounds of combat with full knowledge. Outside combat, the next 5 minutes rewind." },
    { min: 99, max: 99, effect: "The sorcerer ascends into a perfect being for 1d6 rounds: levitate, no damage, 0 MP spells. Then fall unconscious for 1d4 minutes with no memory. Gain 2 Fatigue levels." },
    { min: 100, max: 100, effect: "Roll TWICE on this table and take BOTH effects!" }
  ]
};
