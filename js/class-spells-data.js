/**
 * Class Spell Lists for Mythras Classic Fantasy
 * Complete spell tables for all spellcasting classes
 * Official data from CF sourcebook
 */

const ClassSpellLists = {
  bard: {
    cantrips: [
      "Appraise", "Avert", "Babble", "Beastcall", "Befuddle",
      "Calm", "Calm Animal", "Coordination", "Deflect",
      "Fanaticism (Demoralize)", "Glamour (Repugnance)", "Ignite (Extinguish)",
      "Incognito", "Magic Tricks", "Pet", "Protection", "Tidy", "Tune", "Voice"
    ],
    rank1: [
      "Animal Friendship", "Change Appearance", "Charm Being",
      "Cure Minor Wounds (Cause Minor Wounds)", "Faerie Lights", "Detect Magic",
      "Erase Writing", "Feather Fall", "Hypnotism", "Identify",
      "Illusion, Lesser", "Know Languages (Confuse Languages)",
      "Light (Darkness)", "Mage Lock", "Magic Aura", "Magic Mouth",
      "Monster Summoning, Lesser", "Read Magic", "Snake Charm",
      "Sleep", "Unlock (Lock)", "Ventriloquism"
    ],
    rank2: [
      "Blink", "Charm Monster", "Clairaudience (Clairvoyance)",
      "Confusion", "Continual Light (Continual Darkness)",
      "Cure Serious Wounds (Cause Serious Wounds)", "Darkness",
      "Detect Invisibility", "Dispel Magic", "Fear",
      "Haste", "Hold Person", "Invisibility (10ft)",
      "Leonard's Tiny Magic Hut", "Locate Object (Obscure Object)",
      "Mirror Images", "Monster Summoning", "Read Thoughts",
      "Remove Curse (Bestow Curse)", "Slow", "Slow Poison",
      "Speak with Animals", "Suggestion", "Summon Insects",
      "Tongues (Confuse Tongues)"
    ],
    rank3: [
      "Cure Major Wounds (Cause Major Wounds)", "Dimension Door", "Fumble",
      "Illusionary Terrain", "Invisibility, Greater",
      "Monster Summoning, Greater", "Neutralize Poison (Inflict Poison)",
      "Speak with Plants"
    ]
  },

  cleric: {
    cantrips: [
      "Avert", "Befuddle", "Calm", "Chill (Heat)",
      "Cleanse (Dishevel)", "Coordination", "Deflect", "Dry",
      "Fanaticism (Demoralize)", "Glamour (Repugnance)",
      "Ignite (Extinguish)", "Ironhand", "Might", "Polish",
      "Protection", "Spiritshield", "Voice"
    ],
    rank1: [
      "Bless (Curse)", "Ceremony", "Combine", "Command",
      "Create Water (Destroy Water)", "Cure Fatigue (Cause Fatigue)",
      "Cure Minor Wounds (Cause Minor Wounds)",
      "Detect Charm (Hide Charm)", "Detect Evil (Detect Good)",
      "Detect Magic", "Detect Poison", "Detect Undead",
      "Dust Devil", "Endure Heat/Cold", "Find Traps",
      "Invisibility to Undead", "Know Passions (Obscure Passions)",
      "Light (Darkness)", "Magical Stone",
      "Protection from Evil (Protection from Good)",
      "Purify Food and Drink (Contaminate Food and Drink)",
      "Remove Fear (Cause Fear)", "Sanctuary", "Silence",
      "Slow Poison"
    ],
    rank2: [
      "Aid", "Animate Dead", "Augury",
      "Breathe Water (Breathe Air)", "Chant",
      "Continual Light (Continual Darkness)",
      "Create Food and Water",
      "Cure Blindness or Deafness (Cause Blindness or Deafness)",
      "Cure Disease (Cause Disease)",
      "Cure Serious Wounds (Cause Serious Wounds)",
      "Dispel Magic", "Feign Death", "Fire Trap", "Flame Strike",
      "Flame Walk", "Heat Metal (Chill Metal)", "Hold Person",
      "Locate Object (Obscure Object)",
      "Neutralize Poison (Inflict Poison)", "Produce Flame",
      "Protection from Cold", "Protection from Fire",
      "Pyrotechnics", "Remove Curse (Bestow Curse)",
      "Remove Paralysis", "Sigil of Warding",
      "Speak with Animals", "Speak with Dead",
      "Spiritual Hammer", "Strength", "Water Walk"
    ],
    rank3: [
      "Aerial Servant", "Atonement", "Commune",
      "Cure Major Wounds (Cause Major Wounds)",
      "Detect Lie (Undetectable Lie)",
      "Dispel Evil (Banish Good)", "Divination", "Exorcism",
      "Free Action", "Legend Lore",
      "Lower Water (Raise Water)", "Plane Shift", "Prayer",
      "Protection from Evil 10-foot Radius (Protection from Good 10-foot Radius)",
      "Protection from Lightning", "Quest",
      "Raise Dead (Slay Living)", "Regenerate (Wither)",
      "Restoration", "Sticks to Snakes (Snakes to Sticks)",
      "Tongues (Confuse Tongues)", "True Sight (False Sight)"
    ],
    rank4: [
      "Animate Object", "Blade Barrier", "Confusion",
      "Conjure Animals", "Find the Path (Lose the Path)",
      "Forbiddance", "Heal (Harm)", "Heroes Feast",
      "Speak with Monsters", "Word of Recall"
    ],
    rank5: [
      "Alter Reality", "Astral Spell", "Exaction", "Gate",
      "Holy Word (Unholy Word)", "Resurrection (Destruction)",
      "Succor", "Sun Ray", "Symbol"
    ]
  },

  druid: {
    cantrips: [
      "Avert", "Beastcall", "Calm Animal", "Chill (Heat)",
      "Cleanse (Dishevel)", "Coordination", "Deflect", "Dry",
      "Ignite (Extinguish)", "Ironhand", "Might", "Mobility",
      "Pet", "Preserve", "Protection"
    ],
    rank1: [
      "Animal Friendship", "Barkskin", "Bless (Curse)",
      "Ceremony", "Combine", "Create Water (Destroy Water)",
      "Cure Fatigue (Cause Fatigue)",
      "Cure Minor Wounds (Cause Minor Wounds)", "Detect Magic",
      "Detect Poison", "Detect Snares and Pits", "Dust Devil",
      "Endure Heat/Cold", "Entangle", "Faerie Fire", "Flame Blade",
      "Goodberry (Badberry)", "Invisibility to Animals",
      "Know Passions (Obscure Passions)",
      "Locate Animals or Plants", "Magical Stone", "Messenger",
      "Pass Without Trace", "Predict Weather",
      "Purify Food and Drink (Contaminate Food and Drink)",
      "Shillelagh", "Slow Poison", "Speak with Animals"
    ],
    rank2: [
      "Augury", "Breathe Water (Breathe Air)", "Call Lightning",
      "Charm Being or Mammal", "Commune with Nature",
      "Cure Disease (Cause Disease)",
      "Cure Serious Wounds (Cause Serious Wounds)",
      "Feign Death", "Fire Trap", "Flame Walk",
      "Heat Metal (Chill Metal)", "Hold Animal",
      "Neutralize Poison (Inflict Poison)", "Obscurement",
      "Plant Growth", "Produce Flame", "Protection from Cold",
      "Protection from Fire", "Pyrotechnics", "Snake Charm",
      "Snare", "Stone Shape", "Strength", "Summon Insects",
      "Tree", "Trip", "Warp Wood (Straighten Wood)", "Water Walk"
    ],
    rank3: [
      "Air Walk", "Animal Growth (Shrink Animal)",
      "Animal Summoning I", "Anti-Plant Shell", "Atonement",
      "Call Woodland Beings", "Control Temperature (10' Radius)",
      "Control Winds",
      "Cure Major Wounds (Cause Major Wounds)", "Dispel Magic",
      "Hallucinatory Forest", "Hold Plant", "Insect Plague",
      "Plant Door", "Produce Fire (Greater Quench Fire)",
      "Protection from Lightning", "Regenerate",
      "Repel Insects", "Rock to Mud (Mud to Rock)",
      "Speak with Plants", "Sticks to Snakes (Snakes to Sticks)",
      "Stone Tell", "Wall of Fire"
    ],
    rank4: [
      "Animal Summoning II", "Anti-Animal Shell",
      "Conjure Fire Elemental (Dismiss Fire Elemental)",
      "Fire Seeds", "Heal (Harm)", "Live Oak", "Pass Plant",
      "Reincarnation", "Restoration", "Turn Wood",
      "Wall of Thorns", "Water to Dust (Dust to Water)",
      "Weather Summoning"
    ],
    rank5: [
      "Animate Object", "Changestaff",
      "Conjure Earth Elemental (Dismiss Earth Elemental)",
      "Control Weather", "Creeping Doom", "Earthquake",
      "Fire Storm (Greater Quench Fire)", "Metal to Wood",
      "Transport via Plants", "Wind Walk", "Wall of Stone"
    ]
  },

  mage: {
    cantrips: [
      "Appraise", "Avert", "Befuddle", "Calculate", "Calm",
      "Chill (Heat)", "Cleanse (Dishevel)", "Coordination", "Deflect",
      "Dry", "Fanaticism (Demoralize)", "Frostbite",
      "Glamour (Repugnance)", "Glue", "Ignite (Extinguish)",
      "Incognito", "Magic Tricks", "Magnify", "Might", "Mimic",
      "Mobility", "Perfume", "Pet", "Polish", "Preserve",
      "Protection", "Read Magic", "Repair", "Tidy", "Tune"
    ],
    rank1: [
      "Affect Normal Fires", "Acid Arrow", "Alarm", "Armor",
      "Audible Illusion", "Bind", "Blindness", "Blur",
      "Change Appearance", "Charm Being", "Chill Touch",
      "Color Cascade", "Darkness", "Deafness", "Detect Illusion",
      "Detect Magic", "Detect Undead", "Disk of Burden",
      "Enlarge (Reduce)", "Erase Writing", "Faerie Lights",
      "Familiar", "Feather Fall", "Flaming Hands", "Friendship",
      "Grease", "Hypnotism", "Identify", "Illusion, Lesser",
      "Invisibility, Lesser", "Jump",
      "Know Languages (Confuse Languages)", "Leonard's False Trap",
      "Levitate", "Light", "Magic Aura", "Magic Missile",
      "Message", "Misdirection", "Predict Weather",
      "Protection from Cantrips",
      "Protection from Evil (Protection from Good)",
      "Reflect Gaze", "Secure Portal", "Shield",
      "Shocking Touch", "Sleep", "Spider Climb",
      "Unseen Servant", "Ventriloquism"
    ],
    rank2: [
      "Alter Self", "Blink", "Breathe Water (Breathe Air)",
      "Clairaudience/Clairvoyance", "Continual Light",
      "Darkvision", "Detect Evil", "Detect Invisibility",
      "Dimension Door", "Dispel Magic", "Enfeeblement",
      "Feign Death", "Fireball", "Flame Arrow", "Fly", "Forget",
      "Gust of Wind", "Haste", "Hold Person", "Hold Undead",
      "Illusion, Greater", "Invisibility, (10' Radius)",
      "Know Passions (Obscure Passions)",
      "Leonard's Tiny Magic Hut", "Lightning Bolt",
      "Locate Object (Obscure Object)", "Mage Lock",
      "Magic Mouth", "Minute Meteors", "Mirror Images",
      "Monster Summoning, Lesser",
      "Protection from Evil - 10' Radius (Protection from Good 10' Radius)",
      "Protection from Mundane Missiles", "Pyrotechnics",
      "Read Thoughts", "Scare", "Slow", "Speak with Dead",
      "Spectral Hand", "Stinking Cloud", "Strength",
      "Suggestion", "Tongues (Confuse Tongues)",
      "Uncontrollable Horrible Laughter", "Unlock (Lock)",
      "Vampiric Touch", "Web"
    ],
    rank3: [
      "Animate Dead", "Big Interposing Hand", "Charm Monster",
      "Cloud Kill", "Cone of Cold", "Confusion",
      "Conjure Elemental", "Domination", "Enchant Weapon",
      "Fear", "Feeblemind", "Fire Trap", "Fumble",
      "Hail/Ice Storm", "Heat/Cold Shield", "Hold Any",
      "Illusion, Advanced", "Illusionary Terrain",
      "Invisibility, Greater", "Legend Lore",
      "Leonard's Secure Cottage", "Lesser Creation",
      "Monster Summoning", "Pass Wall", "Phantasmal Terror",
      "Plant Growth", "Polymorph Other", "Polymorph Self",
      "Power Word \u2013 Stun", "Remove Curse (Bestow Curse)",
      "Shadow Door", "Shadow Magic", "Shadow Monsters",
      "Sphere of Invulnerability, Lesser", "Summon Shadow",
      "Stone Shape", "Telekinesis", "Teleport",
      "Wall of Fire", "Wall of Force", "Wall of Ice",
      "Wizard Sight"
    ],
    rank4: [
      "Anti-Magic Shell", "Big Grasping Hand", "Chain Lightning",
      "Control Undead", "Control Weather", "Death Spell",
      "Demi-Shadow Magic", "Demi-Shadow Monsters", "Disintegrate",
      "Duo-Dimension", "Enchant Item", "Etherealness, Lesser",
      "Fireball, Delayed", "Flesh to Stone (Stone to Flesh)",
      "Geas", "Illusion, Permanent", "Invisible Stalker",
      "Major Creation", "Monster Summoning, Greater",
      "Phase Door", "Power Word - Blind", "Prismatic Spray",
      "Prismatic Wall", "Project Image", "Reincarnation, Arcane",
      "Shadow Walk", "Sphere of Invulnerability, Greater",
      "Teleport, Precise", "True Sight (False Sight)",
      "Wall of Stone", "Wish, Limited"
    ],
    rank5: [
      "Antipathy/Sympathy", "Astral Spell", "Big Crushing Fist",
      "Disjunction", "Energy Drain", "Etherealness, Greater",
      "Finger of Death", "Gate", "Irresistible Dance",
      "Mass Charm", "Maze", "Meteor Shower",
      "Monster Summoning, Ultimate", "Permanency",
      "Polymorph any Object", "Power Word - Kill",
      "Prismatic Sphere", "Symbol", "Time Stop",
      "Trap the Soul", "Wish"
    ]
  },

  paladin: {
    cantrips: [
      "Avert", "Calm", "Fanaticism", "Glamour", "Ironhand",
      "Might", "Protection", "Voice"
    ],
    rank1: [
      "Bless", "Ceremony", "Cure Fatigue", "Cure Minor Wounds",
      "Detect Charm", "Detect Poison", "Endure Heat/Cold",
      "Find Traps", "Know Passions", "Sanctuary", "Slow Poison"
    ],
    rank2: [
      "Augury", "Chant", "Cure Blindness or Deafness",
      "Cure Disease", "Cure Serious Wounds", "Dispel Magic",
      "Locate Object", "Remove Curse", "Remove Paralysis",
      "Speak with Dead", "Spiritual Hammer", "Strength"
    ],
    rank3: [
      "Atonement", "Commune", "Cure Major Wounds", "Detect Lie",
      "Divination", "Exorcism", "Legend Lore", "Neutralize Poison",
      "Prayer", "Regenerate", "Restoration", "Tongues",
      "True Sight"
    ]
  },

  ranger: {
    cantrips: [
      "Beastcall", "Calm Animal", "Chill (Heat)",
      "Ignite (Extinguish)", "Might", "Mobility", "Pet",
      "Preserve"
    ],
    rank1: [
      "Animal Friendship", "Create Water",
      "Detect Poison", "Detect Snares and Pits",
      "Endure Heat/Cold", "Entangle", "Flame Blade",
      "Goodberry (Badberry)", "Invisibility to Animals",
      "Know Passions", "Locate Animals or Plants",
      "Magical Stone", "Messenger", "Pass Without Trace",
      "Shillelagh", "Trip", "Warp Wood (Straighten Wood)"
    ],
    rank2: [
      "Breathe Water (Breathe Air)", "Charm Mammal",
      "Commune with Nature", "Detect Charm",
      "Find Traps", "Hold Animal",
      "Plant Growth", "Produce Flame", "Protection from Cold",
      "Protection from Fire", "Pyrotechnics", "Snake Charm",
      "Snare", "Speak with Animals", "Stone Shape",
      "Summon Insects", "Water Walk"
    ],
    rank3: [
      "Animal Growth (Shrink Animal)", "Animal Summoning I",
      "Anti-Plant Shell", "Hallucinatory Forest", "Hold Plant",
      "Insect Plague", "Plant Door", "Repel Insects",
      "Speak with Dead", "Speak with Plants", "Tree"
    ]
  }
};

// Sorcerer uses the same spell table as Mage
ClassSpellLists.sorcerer = ClassSpellLists.mage;

// Anti-Paladin uses same spells as paladin but with reversed versions
ClassSpellLists['anti-paladin'] = {
  cantrips: [
    "Avert", "Calm", "Fanaticism (Demoralize)", "Glamour (Repugnance)", "Ironhand",
    "Might", "Protection", "Voice"
  ],
  rank1: [
    "Bless (Curse)", "Ceremony", "Cure Fatigue (Cause Fatigue)", "Cure Minor Wounds (Cause Minor Wounds)",
    "Detect Charm (Hide Charm)", "Detect Poison", "Endure Heat/Cold",
    "Find Traps", "Know Passions (Obscure Passions)", "Sanctuary", "Slow Poison"
  ],
  rank2: [
    "Augury", "Chant", "Cure Blindness or Deafness (Cause Blindness or Deafness)",
    "Cure Disease (Cause Disease)", "Cure Serious Wounds (Cause Serious Wounds)", "Dispel Magic",
    "Locate Object (Obscure Object)", "Remove Curse (Bestow Curse)", "Remove Paralysis",
    "Speak with Dead", "Spiritual Hammer", "Strength"
  ],
  rank3: [
    "Atonement", "Commune", "Cure Major Wounds (Cause Major Wounds)", "Detect Lie (Undetectable Lie)",
    "Divination", "Exorcism", "Legend Lore", "Neutralize Poison (Inflict Poison)",
    "Prayer", "Regenerate (Wither)", "Restoration", "Tongues (Confuse Tongues)",
    "True Sight (False Sight)"
  ]
};

/**
 * Paladin/Anti-Paladin spell roll tables with d100 ranges.
 * * = Not reversible (paladin only). Anti-paladin shows reversed versions in parens.
 */
ClassSpellLists.rollTables = {
  paladin: {
    cantrips: [
      { range: [1, 12], spell: "Avert" },
      { range: [13, 25], spell: "Calm" },
      { range: [26, 38], spell: "Fanaticism", note: "*" },
      { range: [39, 50], spell: "Glamour", note: "*" },
      { range: [51, 62], spell: "Ironhand" },
      { range: [63, 75], spell: "Might" },
      { range: [76, 88], spell: "Protection" },
      { range: [89, 100], spell: "Voice" }
    ],
    rank1: [
      { range: [1, 9], spell: "Bless", note: "*" },
      { range: [10, 18], spell: "Ceremony" },
      { range: [19, 27], spell: "Cure Fatigue", note: "*" },
      { range: [28, 37], spell: "Cure Minor Wounds", note: "*" },
      { range: [38, 46], spell: "Detect Charm", note: "*" },
      { range: [47, 55], spell: "Detect Poison" },
      { range: [56, 64], spell: "Endure Heat/Cold" },
      { range: [65, 73], spell: "Find Traps" },
      { range: [74, 82], spell: "Know Passions", note: "*" },
      { range: [83, 91], spell: "Sanctuary" },
      { range: [92, 100], spell: "Slow Poison" }
    ],
    rank2: [
      { range: [1, 8], spell: "Augury" },
      { range: [9, 16], spell: "Chant" },
      { range: [17, 24], spell: "Cure Blindness or Deafness", note: "*" },
      { range: [25, 32], spell: "Cure Disease", note: "*" },
      { range: [33, 41], spell: "Cure Serious Wounds", note: "*" },
      { range: [42, 49], spell: "Dispel Magic" },
      { range: [50, 57], spell: "Locate Object", note: "*" },
      { range: [58, 66], spell: "Remove Curse", note: "*" },
      { range: [67, 75], spell: "Remove Paralysis" },
      { range: [76, 83], spell: "Speak with Dead" },
      { range: [84, 91], spell: "Spiritual Hammer" },
      { range: [92, 100], spell: "Strength" }
    ],
    rank3: [
      { range: [1, 7], spell: "Atonement" },
      { range: [8, 15], spell: "Commune" },
      { range: [16, 23], spell: "Cure Major Wounds", note: "*" },
      { range: [24, 30], spell: "Detect Lie", note: "*" },
      { range: [31, 38], spell: "Divination" },
      { range: [39, 46], spell: "Exorcism" },
      { range: [47, 54], spell: "Legend Lore" },
      { range: [55, 62], spell: "Neutralize Poison", note: "*" },
      { range: [63, 69], spell: "Prayer" },
      { range: [70, 77], spell: "Regenerate", note: "*" },
      { range: [78, 85], spell: "Restoration" },
      { range: [86, 92], spell: "Tongues", note: "*" },
      { range: [93, 100], spell: "True Sight", note: "*" }
    ]
  },
  'anti-paladin': {
    cantrips: [
      { range: [1, 12], spell: "Avert" },
      { range: [13, 25], spell: "Calm" },
      { range: [26, 38], spell: "Fanaticism (Demoralize)" },
      { range: [39, 50], spell: "Glamour (Repugnance)" },
      { range: [51, 62], spell: "Ironhand" },
      { range: [63, 75], spell: "Might" },
      { range: [76, 88], spell: "Protection" },
      { range: [89, 100], spell: "Voice" }
    ],
    rank1: [
      { range: [1, 9], spell: "Bless (Curse)" },
      { range: [10, 18], spell: "Ceremony" },
      { range: [19, 27], spell: "Cure Fatigue (Cause Fatigue)" },
      { range: [28, 37], spell: "Cure Minor Wounds (Cause Minor Wounds)" },
      { range: [38, 46], spell: "Detect Charm (Hide Charm)" },
      { range: [47, 55], spell: "Detect Poison" },
      { range: [56, 64], spell: "Endure Heat/Cold" },
      { range: [65, 73], spell: "Find Traps" },
      { range: [74, 82], spell: "Know Passions (Obscure Passions)" },
      { range: [83, 91], spell: "Sanctuary" },
      { range: [92, 100], spell: "Slow Poison" }
    ],
    rank2: [
      { range: [1, 8], spell: "Augury" },
      { range: [9, 16], spell: "Chant" },
      { range: [17, 24], spell: "Cure Blindness or Deafness (Cause Blindness or Deafness)" },
      { range: [25, 32], spell: "Cure Disease (Cause Disease)" },
      { range: [33, 41], spell: "Cure Serious Wounds (Cause Serious Wounds)" },
      { range: [42, 49], spell: "Dispel Magic" },
      { range: [50, 57], spell: "Locate Object (Obscure Object)" },
      { range: [58, 66], spell: "Remove Curse (Bestow Curse)" },
      { range: [67, 75], spell: "Remove Paralysis" },
      { range: [76, 83], spell: "Speak with Dead" },
      { range: [84, 91], spell: "Spiritual Hammer" },
      { range: [92, 100], spell: "Strength" }
    ],
    rank3: [
      { range: [1, 7], spell: "Atonement" },
      { range: [8, 15], spell: "Commune" },
      { range: [16, 23], spell: "Cure Major Wounds (Cause Major Wounds)" },
      { range: [24, 30], spell: "Detect Lie (Undetectable Lie)" },
      { range: [31, 38], spell: "Divination" },
      { range: [39, 46], spell: "Exorcism" },
      { range: [47, 54], spell: "Legend Lore" },
      { range: [55, 62], spell: "Neutralize Poison (Inflict Poison)" },
      { range: [63, 69], spell: "Prayer" },
      { range: [70, 77], spell: "Regenerate (Wither)" },
      { range: [78, 85], spell: "Restoration" },
      { range: [86, 92], spell: "Tongues (Confuse Tongues)" },
      { range: [93, 100], spell: "True Sight (False Sight)" }
    ]
  }
};

/**
 * Define which classes get spells and at what ranks
 */
ClassSpellLists.spellProgression = {
  bard: { startRank: 1, maxSpellRank: 3 },
  cleric: { startRank: 1, maxSpellRank: 5 },
  druid: { startRank: 1, maxSpellRank: 5 },
  mage: { startRank: 1, maxSpellRank: 5 },
  sorcerer: { startRank: 1, maxSpellRank: 5 },
  paladin: { startRank: 2, maxSpellRank: 3 },
  'anti-paladin': { startRank: 2, maxSpellRank: 3 },
  ranger: { startRank: 2, maxSpellRank: 3 }
};

/**
 * Calculate which spell ranks a class has access to at a given character rank
 */
ClassSpellLists.getMaxSpellRank = function(className, charRank) {
  const classKey = className.toLowerCase();
  const progression = this.spellProgression[classKey];
  if (!progression) return -1;
  if (charRank < progression.startRank) return -1;

  if (classKey === 'paladin' || classKey === 'ranger') {
    const spellRank = charRank - 2;
    return Math.min(spellRank, progression.maxSpellRank);
  } else {
    return Math.min(charRank, progression.maxSpellRank);
  }
};

/**
 * Get all spells a class has access to up to a given rank
 */
ClassSpellLists.getSpellsForClassAndRank = function(className, maxRank) {
  const classKey = className.toLowerCase();
  const classList = this[classKey];
  if (!classList) return null;

  const actualMaxSpellRank = this.getMaxSpellRank(className, maxRank);
  if (actualMaxSpellRank < 0) return null;

  const result = {};
  const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];

  for (let i = 0; i <= actualMaxSpellRank && i < rankKeys.length; i++) {
    const rankKey = rankKeys[i];
    if (classList[rankKey]) {
      result[rankKey] = [...classList[rankKey]];
    }
  }
  return result;
};

/**
 * Check if a class grants spells
 */
ClassSpellLists.isSpellGrantingClass = function(className) {
  const classKey = className.toLowerCase();
  return this.spellProgression.hasOwnProperty(classKey);
};

/**
 * Check if a spell belongs to a specific class (any rank)
 */
ClassSpellLists.hasSpell = function(className, spellName) {
  const classKey = className.toLowerCase();
  const classList = this[classKey];
  if (!classList) return false;

  const normalizedSpell = spellName.toLowerCase().trim();
  const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];

  for (const rankKey of rankKeys) {
    if (classList[rankKey]) {
      for (const spell of classList[rankKey]) {
        if (spell.toLowerCase() === normalizedSpell) {
          return true;
        }
      }
    }
  }
  return false;
};

// Legacy alias (reversed param order)
ClassSpellLists.isClassSpell = function(spellName, className) {
  return this.hasSpell(className, spellName);
};

/**
 * Get all classes that provide a specific spell
 */
ClassSpellLists.getClassesWithSpell = function(spellName) {
  const classes = [];
  const classNames = ['bard', 'cleric', 'druid', 'mage', 'paladin', 'anti-paladin', 'ranger'];

  for (const className of classNames) {
    if (this.hasSpell(className, spellName)) {
      classes.push(className);
    }
  }
  // Sorcerer shares mage list
  if (this.hasSpell('mage', spellName)) {
    classes.push('sorcerer');
  }
  return classes;
};

// Make available globally
window.ClassSpellLists = ClassSpellLists;
