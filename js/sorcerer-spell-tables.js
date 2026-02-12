/**
 * Sorcerer / Mage d100 Spell Roll Tables
 * From the Classic Fantasy Master Spellbook
 * Each entry: [lowRoll, highRoll, spellName]
 */
const SorcererSpellTables = {

  cantrips: [
    [1, 3, "Appraise"], [4, 6, "Avert"], [7, 9, "Befuddle"],
    [10, 12, "Calculate"], [13, 15, "Calm"], [16, 19, "Chill (Heat)"],
    [20, 23, "Cleanse (Dishevel)"], [24, 26, "Coordination"], [27, 29, "Deflect"],
    [30, 33, "Dry"], [34, 36, "Fanaticism (Demoralize)"], [37, 39, "Frostbite"],
    [40, 42, "Glamor (Repugnance)"], [43, 45, "Glue"], [46, 49, "Ignite (Extinguish)"],
    [50, 52, "Incognito"], [53, 56, "Magic Tricks"], [57, 59, "Magnify"],
    [60, 62, "Might"], [63, 65, "Mimic"], [66, 68, "Mobility"],
    [69, 72, "Perfume"], [73, 75, "Pet"], [76, 78, "Polish"],
    [79, 81, "Preserve"], [82, 84, "Protection"],
    [85, 89, "Read Magic"], [90, 93, "Repair"],
    [94, 97, "Tidy"], [98, 100, "Tune"]
  ],

  rank1: [
    [1, 2, "Affect Normal Fires"], [3, 4, "Acid Arrow"], [5, 6, "Alarm"],
    [7, 8, "Armor"], [9, 10, "Audible Illusion"], [11, 12, "Bind"],
    [13, 14, "Blindness"], [15, 16, "Blur"], [17, 18, "Change Appearance"],
    [19, 20, "Charm Being"], [21, 22, "Chill Touch"], [23, 24, "Color Cascade"],
    [25, 26, "Darkness"], [27, 28, "Deafness"], [29, 30, "Detect Illusion"],
    [31, 32, "Detect Magic"], [33, 34, "Detect Undead"], [35, 36, "Disk of Burden"],
    [37, 38, "Enlarge (Reduce)"], [39, 40, "Erase Writing"], [41, 42, "Faerie Lights"],
    [43, 44, "Familiar"], [45, 46, "Feather Fall"], [47, 48, "Flaming Hands"],
    [49, 50, "Friendship"], [51, 52, "Grease"], [53, 54, "Hypnotism"],
    [55, 56, "Identify"], [57, 58, "Illusion, Lesser"], [59, 60, "Invisibility, Lesser"],
    [61, 62, "Jump"], [63, 64, "Know Languages (Confuse Languages)"],
    [65, 66, "Leonard's False Trap"], [67, 68, "Levitate"], [69, 70, "Light"],
    [71, 72, "Magic Aura"], [73, 74, "Magic Missile"], [75, 76, "Message"],
    [77, 78, "Misdirection"], [79, 80, "Predict Weather"],
    [81, 82, "Protection from Cantrips"],
    [83, 84, "Protection from Evil (Protection from Good)"],
    [85, 86, "Reflect Gaze"], [87, 88, "Secure Portal"], [89, 90, "Shield"],
    [91, 92, "Shocking Touch"], [93, 94, "Sleep"], [95, 96, "Spider Climb"],
    [97, 98, "Unseen Servant"], [99, 100, "Ventriloquism"]
  ],

  rank2: [
    [1, 2, "Alter Self"], [3, 4, "Blink"], [5, 6, "Breathe Water (Breathe Air)"],
    [7, 8, "Clairaudience/Clairvoyance"], [9, 11, "Continual Light"],
    [12, 14, "Darkvision"], [15, 17, "Detect Evil"], [18, 19, "Detect Invisibility"],
    [20, 22, "Dimension Door"], [23, 24, "Dispel Magic"],
    [25, 26, "Enfeeblement"], [27, 28, "Feign Death"],
    [29, 30, "Fireball"], [31, 33, "Flame Arrow"], [34, 35, "Fly"],
    [36, 37, "Forget"], [38, 39, "Gust of Wind"], [40, 41, "Haste"],
    [42, 43, "Hold Person"], [44, 45, "Hold Undead"],
    [46, 47, "Illusion, Greater"], [48, 49, "Invisibility, (10' Radius)"],
    [50, 51, "Know Passions (Obscure Passions)"],
    [52, 53, "Leonard's Tiny Magic Hut"], [54, 55, "Lightning Bolt"],
    [56, 57, "Locate Object (Obscure Object)"], [58, 59, "Mage Lock"],
    [60, 61, "Magic Mouth"], [62, 63, "Minute Meteors"],
    [64, 65, "Mirror Images"], [66, 67, "Monster Summoning, Lesser"],
    [68, 70, "Protection from Evil - 10' Radius (Protection from Good 10' Radius)"],
    [71, 72, "Protection from Mundane Missiles"], [73, 74, "Pyrotechnics"],
    [75, 76, "Read Thoughts"], [77, 78, "Scare"], [79, 80, "Slow"],
    [81, 82, "Speak with Dead"], [83, 84, "Spectral Hand"],
    [85, 86, "Stinking Cloud"], [87, 88, "Strength"],
    [89, 90, "Suggestion"], [91, 92, "Tongues (Confuse Tongues)"],
    [93, 94, "Uncontrollable Horrible Laughter"], [95, 96, "Unlock (Lock)"],
    [97, 98, "Vampiric Touch"], [99, 100, "Web"]
  ],

  rank3: [
    [1, 2, "Animate Dead"], [3, 4, "Big Interposing Hand"],
    [5, 7, "Charm Monster"], [8, 9, "Cloud Kill"],
    [10, 12, "Cone of Cold"], [13, 15, "Confusion"],
    [16, 17, "Conjure Elemental"], [18, 19, "Domination"],
    [20, 22, "Enchant Weapon"], [23, 24, "Fear"],
    [25, 26, "Feeblemind"], [27, 28, "Fire Trap"],
    [29, 31, "Fumble"], [32, 33, "Hail/Ice Storm"],
    [34, 35, "Heat/Cold Shield"], [36, 38, "Hold Any"],
    [39, 40, "Illusion, Advanced"], [41, 42, "Illusionary Terrain"],
    [43, 45, "Invisibility, Greater"], [46, 48, "Legend Lore"],
    [49, 50, "Leonard's Secure Cottage"], [51, 53, "Lesser Creation"],
    [54, 56, "Monster Summoning"], [57, 58, "Pass Wall"],
    [59, 60, "Phantasmal Terror"], [61, 62, "Plant Growth"],
    [63, 64, "Polymorph Other"], [65, 67, "Polymorph Self"],
    [68, 70, "Power Word – Stun"], [71, 72, "Remove Curse (Bestow Curse)"],
    [73, 74, "Shadow Door"], [75, 76, "Shadow Magic"],
    [77, 78, "Shadow Monsters"],
    [79, 81, "Sphere of Invulnerability, Lesser"],
    [82, 83, "Summon Shadow"], [84, 85, "Stone Shape"],
    [86, 88, "Telekinesis"], [89, 91, "Teleport"],
    [92, 94, "Wall of Fire"], [95, 96, "Wall of Force"],
    [97, 98, "Wall of Ice"], [99, 100, "Wizard Sight"]
  ],

  rank4: [
    [1, 3, "Anti-Magic Shell"], [4, 7, "Big Grasping Hand"],
    [8, 11, "Chain Lightning"], [12, 14, "Control Undead"],
    [15, 17, "Control Weather"], [18, 20, "Death Spell"],
    [21, 23, "Demi-Shadow Magic"], [24, 26, "Demi-Shadow Monsters"],
    [27, 29, "Disintegrate"], [30, 32, "Duo-Dimension"],
    [33, 36, "Enchant Item"], [37, 39, "Etherealness, Lesser"],
    [40, 43, "Fireball, Delayed"],
    [44, 46, "Flesh to Stone (Stone to Flesh)"],
    [47, 49, "Geas"], [50, 52, "Illusion, Permanent"],
    [53, 55, "Invisible Stalker"], [56, 58, "Major Creation"],
    [59, 61, "Monster Summoning, Greater"],
    [62, 64, "Phase Door"], [65, 67, "Power Word - Blind"],
    [68, 70, "Prismatic Spray"], [71, 73, "Prismatic Wall"],
    [74, 76, "Project Image"], [77, 79, "Reincarnation, Arcane"],
    [80, 82, "Shadow Walk"],
    [83, 86, "Sphere of Invulnerability, Greater"],
    [87, 90, "Teleport, Precise"],
    [91, 93, "True Sight (False Sight)"],
    [94, 97, "Wall of Stone"], [98, 100, "Wish, Limited"]
  ],

  rank5: [
    [1, 5, "Antipathy/Sympathy"], [6, 9, "Astral Spell"],
    [10, 14, "Big Crushing Fist"], [15, 18, "Disjunction"],
    [19, 23, "Energy Drain"], [24, 28, "Etherealness, Greater"],
    [29, 33, "Finger of Death"], [34, 38, "Gate"],
    [39, 43, "Irresistible Dance"], [44, 48, "Mass Charm"],
    [49, 53, "Maze"], [54, 58, "Meteor Shower"],
    [59, 63, "Monster Summoning, Ultimate"], [64, 68, "Permanency"],
    [69, 73, "Polymorph any Object"], [74, 77, "Power Word - Kill"],
    [78, 82, "Prismatic Sphere"], [83, 87, "Symbol"],
    [88, 92, "Time Stop"], [93, 97, "Trap the Soul"],
    [98, 100, "Wish"]
  ],

  /**
   * Look up a spell from a d100 roll for a given rank
   * @param {string} rankKey - 'cantrips', 'rank1', ..., 'rank5'
   * @param {number} roll - 1–100
   * @returns {string|null} spell name or null if not found
   */
  lookup(rankKey, roll) {
    const table = this[rankKey];
    if (!table) return null;
    for (const [lo, hi, name] of table) {
      if (roll >= lo && roll <= hi) return name;
    }
    return null;
  }
};

window.SorcererSpellTables = SorcererSpellTables;
