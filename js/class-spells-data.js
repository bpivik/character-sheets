/**
 * Class Spell Lists for Mythras Classic Fantasy
 * Spells are automatically added when a character has the class and sufficient rank
 */

const ClassSpellLists = {
  cleric: {
    cantrips: [
      "Avert",
      "Befuddle",
      "Calm",
      "Chill (Heat)",
      "Cleanse (Dishevel)",
      "Coordination",
      "Deflect",
      "Dry",
      "Fanaticism (Demoralize)",
      "Glamour (Repugnance)",
      "Ignite (Extinguish)",
      "Ironhand",
      "Might",
      "Polish",
      "Protection",
      "Spiritshield",
      "Voice"
    ],
    rank1: [
      "Bless (Curse)",
      "Ceremony",
      "Combine",
      "Command",
      "Create Water (Destroy Water)",
      "Cure Fatigue (Cause Fatigue)",
      "Cure Minor Wounds (Cause Minor Wounds)",
      "Detect Charm (Hide Charm)",
      "Detect Evil (Detect Good)",
      "Detect Magic",
      "Detect Poison",
      "Detect Undead",
      "Dust Devil",
      "Endure Heat/Cold",
      "Find Traps",
      "Invisibility to Undead",
      "Know Passions (Obscure Passions)",
      "Light (Darkness)",
      "Magical Stone",
      "Protection from Evil (Protection from Good)",
      "Purify Food and Drink (Contaminate Food and Drink)",
      "Remove Fear (Cause Fear)",
      "Sanctuary",
      "Silence",
      "Slow Poison"
    ],
    rank2: [
      "Aid",
      "Animate Dead",
      "Augury",
      "Breathe Water (Breathe Air)",
      "Chant",
      "Continual Light (Continual Darkness)",
      "Create Food and Water",
      "Cure Blindness or Deafness (Cause Blindness or Deafness)",
      "Cure Disease (Cause Disease)",
      "Cure Serious Wounds (Cause Serious Wounds)",
      "Dispel Magic",
      "Feign Death",
      "Fire Trap",
      "Flame Strike",
      "Flame Walk",
      "Heat Metal (Chill Metal)",
      "Hold Person",
      "Locate Object (Obscure Object)",
      "Neutralize Poison (Inflict Poison)",
      "Produce Flame",
      "Protection from Cold",
      "Protection from Fire",
      "Pyrotechnics",
      "Remove Curse (Bestow Curse)",
      "Remove Paralysis",
      "Sigil of Warding",
      "Speak with Animals",
      "Speak with Dead",
      "Spiritual Hammer",
      "Strength",
      "Water Walk"
    ],
    rank3: [
      "Aerial Servant",
      "Atonement",
      "Commune",
      "Cure Major Wounds (Cause Major Wounds)",
      "Detect Lie (Undetectable Lie)",
      "Dispel Evil (Banish Good)",
      "Divination",
      "Exorcism",
      "Free Action",
      "Legend Lore",
      "Lower Water (Raise Water)",
      "Plane Shift",
      "Prayer",
      "Protection from Evil 10' Radius (Protection from Good 10' Radius)",
      "Protection from Lightning",
      "Quest",
      "Raise Dead (Slay Living)",
      "Regenerate (Wither)",
      "Restoration",
      "Sticks to Snakes (Snakes to Sticks)",
      "Tongues (Confuse Tongues)",
      "True Sight (False Sight)"
    ],
    rank4: [
      "Animate Object",
      "Blade Barrier",
      "Conjure Animals",
      "Find the Path (Lose the Path)",
      "Forbiddance",
      "Heal (Harm)",
      "Heroes' Feast",
      "Speak with Monsters",
      "Word of Recall"
    ],
    rank5: [
      "Alter Reality",
      "Astral Spell",
      "Exaction",
      "Gate",
      "Holy Word (Unholy Word)",
      "Resurrection (Destruction)",
      "Succor",
      "Sun Ray",
      "Symbol"
    ]
  },
  
  druid: {
    cantrips: [
      "Avert",
      "Beastcall",
      "Calm Animal",
      "Chill (Heat)",
      "Cleanse (Dishevel)",
      "Coordination",
      "Deflect",
      "Dry",
      "Ignite (Extinguish)",
      "Ironhand",
      "Might",
      "Mobility",
      "Pet",
      "Preserve",
      "Protection"
    ],
    rank1: [
      "Animal Friendship",
      "Barkskin",
      "Bless (Curse)",
      "Ceremony",
      "Combine",
      "Create Water (Destroy Water)",
      "Cure Fatigue (Cause Fatigue)",
      "Cure Minor Wounds (Cause Minor Wounds)",
      "Detect Magic",
      "Detect Poison",
      "Detect Snares and Pits",
      "Dust Devil",
      "Endure Heat/Cold",
      "Entangle",
      "Faerie Fire",
      "Flame Blade",
      "Goodberry (Badberry)",
      "Invisibility to Animals",
      "Know Passions (Obscure Passions)",
      "Locate Animals or Plants",
      "Magical Stone",
      "Messenger",
      "Pass Without Trace",
      "Predict Weather",
      "Purify Food and Drink (Contaminate Food and Drink)",
      "Shillelagh",
      "Slow Poison",
      "Speak with Animals"
    ],
    rank2: [
      "Augury",
      "Breathe Water (Breathe Air)",
      "Call Lightning",
      "Charm Being or Mammal",
      "Commune with Nature",
      "Cure Disease (Cause Disease)",
      "Cure Serious Wounds (Cause Serious Wounds)",
      "Feign Death",
      "Fire Trap",
      "Flame Walk",
      "Heat Metal (Chill Metal)",
      "Hold Animal",
      "Neutralize Poison (Inflict Poison)",
      "Obscurement",
      "Plant Growth",
      "Produce Flame",
      "Protection from Cold",
      "Protection from Fire",
      "Pyrotechnics",
      "Snake Charm",
      "Snare",
      "Stone Shape",
      "Strength",
      "Summon Insects",
      "Tree",
      "Trip",
      "Warp Wood (Straighten Wood)",
      "Water Walk"
    ],
    rank3: [
      "Air Walk",
      "Animal Growth (Shrink Animal)",
      "Animal Summoning I",
      "Anti-Plant Shell",
      "Atonement",
      "Call Woodland Beings",
      "Control Temperature 10' Radius",
      "Control Winds",
      "Cure Major Wounds (Cause Major Wounds)",
      "Dispel Magic",
      "Hallucinatory Forest",
      "Hold Plant",
      "Insect Plague",
      "Plant Door",
      "Produce Fire (Quench Fire)",
      "Protection from Lightning",
      "Regenerate",
      "Repel Insects",
      "Rock to Mud (Mud to Rock)",
      "Speak with Plants",
      "Sticks to Snakes (Snakes to Sticks)",
      "Stone Tell",
      "Wall of Fire"
    ],
    rank4: [
      "Animal Summoning II",
      "Anti-Animal Shell",
      "Conjure Fire Elemental (Dismiss Fire Elemental)",
      "Flame Seeds",
      "Heal (Harm)",
      "Live Oak",
      "Pass Plant",
      "Reincarnation",
      "Restoration",
      "Turn Wood",
      "Wall of Thorns",
      "Water to Dust (Dust to Water)",
      "Weather Summoning"
    ],
    rank5: [
      "Animate Object",
      "Changestaff",
      "Conjure Earth Elemental (Dismiss Earth Elemental)",
      "Control Weather",
      "Creeping Doom",
      "Earthquake",
      "Fire Storm (Greater Quench Fire)",
      "Metal to Wood",
      "Transport via Plants",
      "Wind Walk",
      "Wall of Stone"
    ]
  },
  
  paladin: {
    // Paladin spell progression: Rank 2 = cantrips, Rank 3 = +rank1, Rank 4 = +rank2, Rank 5 = +rank3
    cantrips: [
      "Avert",
      "Calm",
      "Fanaticism",
      "Glamour",
      "Ironhand",
      "Might",
      "Protection",
      "Voice"
    ],
    rank1: [
      "Bless",
      "Ceremony",
      "Cure Fatigue",
      "Cure Minor Wounds",
      "Detect Charm",
      "Detect Poison",
      "Endure Heat/Cold",
      "Find Traps",
      "Know Passions",
      "Sanctuary",
      "Slow Poison"
    ],
    rank2: [
      "Augury",
      "Chant",
      "Cure Blindness or Deafness",
      "Cure Disease",
      "Cure Serious Wounds",
      "Dispel Magic",
      "Locate Object",
      "Remove Curse",
      "Remove Paralysis",
      "Speak with Dead",
      "Spiritual Hammer",
      "Strength"
    ],
    rank3: [
      "Atonement",
      "Commune",
      "Cure Major Wounds",
      "Detect Lie",
      "Divination",
      "Exorcism",
      "Legend Lore",
      "Neutralize Poison",
      "Prayer",
      "Regenerate",
      "Restoration",
      "Tongues",
      "True Sight"
    ]
    // Paladin maxes out at Rank 3 spells
  },
  
  ranger: {
    // Ranger spell progression: Rank 2 = cantrips, Rank 3 = +rank1, Rank 4 = +rank2, Rank 5 = +rank3
    cantrips: [
      "Beastcall",
      "Calm Animal",
      "Chill (Heat)",
      "Ignite (Extinguish)",
      "Might",
      "Mobility",
      "Pet",
      "Preserve"
    ],
    rank1: [
      "Animal Friendship",
      "Create Water",
      "Detect Poison",
      "Detect Snares and Pits",
      "Endure Heat/Cold",
      "Entangle",
      "Flame Blade",
      "Goodberry (Badberry)",
      "Invisibility to Animals",
      "Know Passions",
      "Locate Animals or Plants",
      "Magical Stone",
      "Messenger",
      "Pass Without Trace",
      "Shillelagh",
      "Trip",
      "Warp Wood (Straighten Wood)"
    ],
    rank2: [
      "Breathe Water (Breathe Air)",
      "Charm Mammal",
      "Commune with Nature",
      "Detect Charm (Mammals only)",
      "Find Traps",
      "Hold Animal",
      "Plant Growth",
      "Produce Flame",
      "Protection from Cold",
      "Protection from Fire",
      "Pyrotechnics",
      "Snake Charm",
      "Snare",
      "Speak with Animals",
      "Stone Shape",
      "Summon Insects",
      "Water Walk"
    ],
    rank3: [
      "Animal Growth (Shrink Animal)",
      "Animal Summoning I",
      "Anti-Plant Shell",
      "Hallucinatory Forest",
      "Hold Plant",
      "Insect Plague",
      "Plant Door",
      "Repel Insects",
      "Speak with Dead",
      "Speak with Plants",
      "Tree"
    ]
    // Ranger maxes out at Rank 3 spells
  }
  
  // Anti-Paladin spell lists not yet defined in source
};

/**
 * Define which classes get spells and at what ranks
 * Maps class name to spell progression rules
 */
ClassSpellLists.spellProgression = {
  cleric: { startRank: 1, maxSpellRank: 5 },    // Gets spells at Rank 1, up to Rank 5 spells
  druid: { startRank: 1, maxSpellRank: 5 },     // Gets spells at Rank 1, up to Rank 5 spells
  paladin: { startRank: 2, maxSpellRank: 3 },   // Gets cantrips at Rank 2, up to Rank 3 spells
  ranger: { startRank: 2, maxSpellRank: 3 }     // Gets cantrips at Rank 2, up to Rank 3 spells
};

/**
 * Calculate which spell ranks a class has access to at a given character rank
 * @param {string} className - The class name
 * @param {number} charRank - The character's rank in that class
 * @returns {number} - The maximum spell rank available (-1 if no spells)
 */
ClassSpellLists.getMaxSpellRank = function(className, charRank) {
  const classKey = className.toLowerCase();
  const progression = this.spellProgression[classKey];
  
  if (!progression) return -1;
  
  // No spells before startRank
  if (charRank < progression.startRank) return -1;
  
  // For Cleric/Druid: char rank = spell rank (Rank 1 = cantrips + rank1, etc.)
  // For Paladin/Ranger: delayed by 1 rank (Rank 2 = cantrips, Rank 3 = rank1, etc.)
  
  if (classKey === 'cleric' || classKey === 'druid') {
    // Direct mapping: charRank 1 = cantrips, charRank 2 = rank1, etc.
    // But actually: charRank 1 = cantrips + rank1, charRank 2 = +rank2, etc.
    return Math.min(charRank, progression.maxSpellRank);
  } else {
    // Paladin/Ranger: charRank 2 = cantrips (spell rank 0)
    // charRank 3 = rank1, charRank 4 = rank2, charRank 5 = rank3
    const spellRank = charRank - 2;
    return Math.min(spellRank, progression.maxSpellRank);
  }
};

/**
 * Get all spells a class has access to up to a given rank
 * @param {string} className - The class name (e.g., 'cleric')
 * @param {number} maxRank - The maximum rank (0-5)
 * @returns {Object} - Object with rank keys containing spell arrays
 */
ClassSpellLists.getSpellsForClassAndRank = function(className, maxRank) {
  const classKey = className.toLowerCase();
  const classList = this[classKey];
  if (!classList) return null;
  
  // Calculate actual max spell rank based on class progression
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
 * @param {string} className - The class name
 * @returns {boolean}
 */
ClassSpellLists.isSpellGrantingClass = function(className) {
  const classKey = className.toLowerCase();
  return this.spellProgression.hasOwnProperty(classKey);
};

/**
 * Check if a spell belongs to a specific class
 * @param {string} spellName - The spell name
 * @param {string} className - The class name
 * @returns {boolean}
 */
ClassSpellLists.isClassSpell = function(spellName, className) {
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

/**
 * Get all classes that provide a specific spell
 * @param {string} spellName - The spell name
 * @returns {Array} - Array of class names that have this spell
 */
ClassSpellLists.getClassesWithSpell = function(spellName) {
  const classes = [];
  const normalizedSpell = spellName.toLowerCase().trim();
  
  for (const className of Object.keys(this)) {
    if (typeof this[className] === 'object' && !Array.isArray(this[className]) && 
        className !== 'spellProgression') {
      if (this.isClassSpell(spellName, className)) {
        classes.push(className);
      }
    }
  }
  return classes;
};

// Make available globally
window.ClassSpellLists = ClassSpellLists;
