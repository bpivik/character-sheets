/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Class Rank Titles and Multiclass Evocative Names
   ============================================ */

// Rank titles by base class & rank index (0–5)
const CLASS_RANK_TITLES = {
  "anti-paladin": ["Retainer", "Caitiff Knight", "Blackguard", "Anti-Paladin", "Anti-Paladin Superior", "Anti-Paladin Lord"],
  "bard":         ["Student", "Lyrist", "Minstrel", "Bard", "Master Bard", "Grand Master Bard"],
  "berserker":    ["Warrior", "Berserker", "Berserker", "Berserker", "Berserker", "Berserker"],
  "cavalier":     ["Squire", "Knight Errant", "Knight", "Cavalier", "High Cavalier", "Grand Cavalier"],
  "cleric":       ["Lay Member", "Initiate", "Cleric", "Priest/Priestess", "High Priest/High Priestess", "Grand Priest/Grand Priestess"],
  "druid":        ["Lay Member", "Initiate", "Druid", "Arch Druid", "Great Druid", "Grand Druid"],
  "fighter":      ["Warrior Trainee", "Warrior", "Fighter", "Hero/Heroine", "Champion", "Lord/Lady"],
  "mage":         ["Apprentice", "Journeyman", "Mage", "Adept Mage", "Arch Mage", "Grand Arch Mage"],
  "magic-user":   ["Apprentice", "Journeyman", "Mage", "Adept Mage", "Arch Mage", "Grand Arch Mage"],
  "monk":         ["Lay Member", "Initiate", "Brother/Sister", "Master of Dragons", "Master of the Four Winds", "Grand Master"],
  "paladin":      ["Squire", "Gallant", "Brother/Sister", "Paladin", "High Paladin", "Grand Paladin"],
  "ranger":       ["Woodsman", "Gallant", "Scout", "Ranger", "Ranger Knight", "Ranger Lord"],
  "rogue":        ["Scamp", "Scoundrel", "Rogue", "Master Rogue", "Grand Master Rogue", "Legendary Rogue"],
  "thief":        ["Scamp", "Scoundrel", "Rogue", "Master Rogue", "Grand Master Rogue", "Legendary Rogue"],
  "thief/acrobat":["Scamp", "Scoundrel", "Rogue", "Master Rogue", "Grand Master Rogue", "Legendary Rogue"],
  "thief-acrobat":["Scamp", "Scoundrel", "Rogue", "Master Rogue", "Grand Master Rogue", "Legendary Rogue"],
  "sorcerer":     ["Wild Mage", "Novice Arcanist", "Arcane Vessel", "Adept Sorcerer", "Master Sorcerer", "Arcane Scion"]
};

// Multiclass evocative names (alphabetized key)
const EVOCATIVE_NAMES = {
  "fighter|rogue":   ["Nightstalker", "Highwayman", "Shadowblade"],
  "fighter|mage":    ["Spellblade", "Runeblade", "Arcane Sellsword"],
  "cleric|fighter":  ["Templar", "Warpriest", "Godsworn"],
  "druid|fighter":   ["Greenwarden", "Thornblade", "Wildspear"],
  "bard|fighter":    ["Skald", "Warchanter", "Blade Singer", "Wood Skald", "Thorn Singer", "Blade Chanter"],

  "cleric|rogue":    ["Inquisitor", "Shadow Friar", "Penitent Blade"],
  "cleric|mage":     ["Theurge", "Mystic Acolyte", "Lorekeeper"],
  "cleric|ranger":   ["Wild Chaplain", "Oathkeeper", "Trail Warden"],
  "bard|cleric":     ["Cantor", "Liturgy Singer", "Hymnblade", "Spirit Singer", "Green Chanter", "Wild Hymnist"],

  "mage|rogue":      ["Spellthief", "Veilblade", "Shadowmage"],
  "mage|ranger":     ["Spellhunter", "Witchbow", "Rune Tracker"],
  "bard|mage":       ["Spellminstrel", "Songmage", "Runebard", "Green Mage", "Grove Sage", "Wild Enchanter"],

  "ranger|rogue":    ["Outrider", "Shadow Scout", "Forest Stalker"],
  "bard|rogue":      ["Songthief", "Veil Singer", "Songblade", "Grove Sneak", "Thornsinger", "Sylvan Shadow"],
  "bard|ranger":     ["Wayfarer", "Wildsong Ranger", "Arcane Rover", "Trail Skald", "Forest Singer", "Wildsong"],

  "druid|ranger":    ["Grove Warden", "Wildland Scout", "Nature's Guardian"],
  "druid|rogue":     ["Shadow Druid", "Thorn Shadow", "Wild Stalker"],
  
  "cleric|sorcerer": ["Spiritbound", "Hexpriest", "Blood Theurge"],
  "druid|sorcerer":  ["Wild Shaman", "Spellroot", "Thorn Witch"],
  "fighter|sorcerer":["Hexblade", "Eldritch Blade", "Blood Warrior"],
  "ranger|sorcerer": ["Wildblood Stalker", "Runepath Ranger", "Hexhunter"],
  "rogue|sorcerer":  ["Spellthief", "Bloodshadow", "Veilblade"]
};

// ============================================
// MULTICLASS RESTRICTIONS
// ============================================

// Classes that cannot multiclass at all
const NO_MULTICLASS = ["anti-paladin", "berserker", "cavalier", "monk", "paladin"];

// Forbidden class combinations (bidirectional - if A can't combine with B, B can't combine with A)
// Format: normalized class name -> array of classes it cannot combine with
const FORBIDDEN_COMBINATIONS = {
  "cleric": ["druid"],
  "druid": ["cleric"],
  "ranger": ["fighter"],
  "fighter": ["ranger"],
  "sorcerer": ["bard", "mage"],
  "bard": ["sorcerer"],
  "mage": ["sorcerer"]
};

/**
 * Normalize class name for matching
 */
function normalizeClassName(name) {
  let n = String(name || "").toLowerCase().trim();
  if (n === "thief") n = "rogue";
  if (n === "magic-user" || n === "magic user") n = "mage";
  return n;
}

/**
 * Get alphabetized combination key for multiclass lookup
 */
function getComboKey(classA, classB) {
  const x = normalizeClassName(classA);
  const y = normalizeClassName(classB);
  if (!x || !y) return "";
  const pair = [x, y].sort();
  return pair[0] + "|" + pair[1];
}

/**
 * Get rank title for a single class
 */
function getRankTitle(className, rankIndex) {
  const baseClass = normalizeClassName(className.split(/[/\-]/)[0]);
  const idx = parseInt(rankIndex, 10);
  
  if (CLASS_RANK_TITLES[baseClass] && !isNaN(idx) && idx >= 0 && idx <= 5) {
    return CLASS_RANK_TITLES[baseClass][idx] || "";
  }
  return "";
}

/**
 * Get evocative name options for multiclass combination
 * Returns array of options or null if not a valid combo
 */
function getEvocativeNames(primaryClass, secondaryClass) {
  const comboKey = getComboKey(primaryClass, secondaryClass);
  if (comboKey && EVOCATIVE_NAMES[comboKey]) {
    return EVOCATIVE_NAMES[comboKey];
  }
  return null;
}

/**
 * Check if a multiclass combination has evocative names
 */
function hasEvocativeNames(primaryClass, secondaryClass) {
  const comboKey = getComboKey(primaryClass, secondaryClass);
  return comboKey && EVOCATIVE_NAMES.hasOwnProperty(comboKey);
}

/**
 * Check if a class can multiclass at all
 * @returns {boolean} true if the class can multiclass
 */
function canClassMulticlass(className) {
  const normalized = normalizeClassName(className);
  return !NO_MULTICLASS.includes(normalized);
}

/**
 * Check if two classes can be combined
 * @returns {object} { allowed: boolean, reason?: string }
 */
function canCombineClasses(classA, classB) {
  const normA = normalizeClassName(classA);
  const normB = normalizeClassName(classB);
  
  if (!normA || !normB) {
    return { allowed: true };
  }
  
  // Check if either class cannot multiclass at all
  if (NO_MULTICLASS.includes(normA)) {
    return { 
      allowed: false, 
      reason: `${classA} cannot multiclass.`
    };
  }
  if (NO_MULTICLASS.includes(normB)) {
    return { 
      allowed: false, 
      reason: `${classB} cannot multiclass.`
    };
  }
  
  // Check forbidden combinations
  if (FORBIDDEN_COMBINATIONS[normA] && FORBIDDEN_COMBINATIONS[normA].includes(normB)) {
    return { 
      allowed: false, 
      reason: `${classA} cannot multiclass with ${classB}.`
    };
  }
  
  return { allowed: true };
}

/**
 * Validate a full multiclass setup (primary, secondary, tertiary)
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateMulticlass(primary, secondary, tertiary) {
  const errors = [];
  
  const normPrimary = normalizeClassName(primary);
  
  // If primary can't multiclass, secondary and tertiary must be empty
  if (normPrimary && !canClassMulticlass(normPrimary)) {
    if (secondary) {
      errors.push(`${primary} cannot multiclass.`);
    }
    if (tertiary) {
      errors.push(`${primary} cannot multiclass.`);
    }
    return { valid: errors.length === 0, errors };
  }
  
  // Check primary + secondary
  if (secondary) {
    const check1 = canCombineClasses(primary, secondary);
    if (!check1.allowed) {
      errors.push(check1.reason);
    }
  }
  
  // Check primary + tertiary
  if (tertiary) {
    const check2 = canCombineClasses(primary, tertiary);
    if (!check2.allowed) {
      errors.push(check2.reason);
    }
  }
  
  // Check secondary + tertiary
  if (secondary && tertiary) {
    const check3 = canCombineClasses(secondary, tertiary);
    if (!check3.allowed) {
      errors.push(check3.reason);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================
// CLASS PREREQUISITE SKILLS
// ============================================

// Rank advancement requirements (primary class)
// { skillsNeeded: number, percentRequired: number }
const RANK_REQUIREMENTS = [
  { rank: 1, skills: 5, percent: 40 },   // Rank 0 → 1
  { rank: 2, skills: 5, percent: 70 },   // Rank 1 → 2
  { rank: 3, skills: 4, percent: 90 },   // Rank 2 → 3
  { rank: 4, skills: 3, percent: 110 },  // Rank 3 → 4
  { rank: 5, skills: 2, percent: 130 }   // Rank 4 → 5
];

// Modifiers for secondary/tertiary classes
const CLASS_SLOT_MODIFIERS = {
  primary: 0,
  secondary: 10,
  tertiary: 20
};

/**
 * Get the requirement to advance to the next rank
 * @param {number} currentRank - Current rank (0-5)
 * @param {string} classSlot - 'primary', 'secondary', or 'tertiary'
 * @returns {object|null} { nextRank, skillsNeeded, percentRequired } or null if max rank
 */
function getNextRankRequirement(currentRank, classSlot) {
  const rank = parseInt(currentRank, 10) || 0;
  if (rank >= 5) return null; // Already max rank
  
  const baseReq = RANK_REQUIREMENTS[rank];
  if (!baseReq) return null;
  
  const modifier = CLASS_SLOT_MODIFIERS[classSlot] || 0;
  
  return {
    nextRank: baseReq.rank,
    skillsNeeded: baseReq.skills,
    percentRequired: baseReq.percent + modifier
  };
}

const CLASS_PREREQ_SKILLS = {
  "anti-paladin": [
    "Channel", "Combat Skill", "Courtesy", "Influence", "Insight", "Piety", "Ride", "Willpower"
  ],
  "bard": [
    "Athletics", "Influence", "Lore", "Lyrical Magic", "Musicianship", "Perception", "Seduction", "Sing", "Stealth", "Streetwise", "Survival"
  ],
  "berserker": [
    "Athletics", "Brawn", "Combat Skill", "Endurance", "Evade", "Survival", "Unarmed"
  ],
  "cavalier": [
    "Bureaucracy", "Combat Skill", "Courtesy", "Customs", "Endurance", "Influence", "Ride", "Willpower"
  ],
  "cleric": [
    "Channel", "Combat Skill", "First Aid", "Influence", "Insight", "Piety", "Willpower"
  ],
  "druid": [
    "Animal Handling", "Channel", "First Aid", "Locale", "Perception", "Piety", "Survival", "Willpower"
  ],
  "fighter": [
    "Combat Skill", "Craft", "Endurance", "Evade", "Lore", "Unarmed"
  ],
  "mage": [
    "Arcane Casting", "Arcane Knowledge", "Influence", "Insight", "Lore", "Perception", "Willpower"
  ],
  "monk": [
    "Acrobatics", "Athletics", "Combat Skill", "Evade", "Insight", "Meditation", "Mysticism", "Stealth", "Unarmed", "Willpower"
  ],
  "paladin": [
    "Channel", "Combat Skill", "Courtesy", "Influence", "Insight", "Piety", "Ride", "Willpower"
  ],
  "ranger": [
    "Animal Handling", "Athletics", "Channel", "Combat Skill", "Endurance", "Perception", "Piety", "Stealth", "Survival"
  ],
  "rogue": [
    "Athletics", "Combat Skill", "Deceit", "Evade", "Lockpicking", "Mechanisms", "Sleight", "Stealth", "Streetwise"
  ],
  "sorcerer": [
    "Deceit", "Influence", "Insight", "Lore", "Perception", "Arcane Sorcery", "Sorcerous Wisdom", "Willpower"
  ],
  "warlord": [
    "Combat Skill", "Command", "Endurance", "Insight", "Oratory", "Lore"
  ]
};

/**
 * Normalize skill name for matching (lowercase, trim)
 */
function normalizeSkillName(name) {
  return String(name || "").toLowerCase().trim();
}

/**
 * Check if a skill is a prerequisite for a given class
 * @param {string} skillName - The skill name to check
 * @param {string} className - The class name to check against
 * @returns {boolean}
 */
function isPrereqForClass(skillName, className) {
  const normClass = normalizeClassName(className);
  const normSkill = normalizeSkillName(skillName);
  
  const prereqs = CLASS_PREREQ_SKILLS[normClass];
  if (!prereqs) return false;
  
  return prereqs.some(p => normalizeSkillName(p) === normSkill);
}

/**
 * Get all prerequisite skills for a class
 * @param {string} className - The class name
 * @returns {Array} Array of skill names
 */
function getPrereqSkillsForClass(className) {
  const normClass = normalizeClassName(className);
  return CLASS_PREREQ_SKILLS[normClass] || [];
}

/**
 * Get which class slots (primary, secondary, tertiary) have this skill as prereq
 * @param {string} skillName - The skill name
 * @param {string} primaryClass - Primary class
 * @param {string} secondaryClass - Secondary class (optional)
 * @param {string} tertiaryClass - Tertiary class (optional)
 * @returns {object} { primary: boolean, secondary: boolean, tertiary: boolean }
 */
function getPrereqKeysForSkill(skillName, primaryClass, secondaryClass, tertiaryClass) {
  return {
    primary: primaryClass ? isPrereqForClass(skillName, primaryClass) : false,
    secondary: secondaryClass ? isPrereqForClass(skillName, secondaryClass) : false,
    tertiary: tertiaryClass ? isPrereqForClass(skillName, tertiaryClass) : false
  };
}

/**
 * Spell memorization data by class
 * Structure: { divisor: INT/X, ranks: { classRank: { spellRank: bonus } } }
 * Empty object for ranks means cannot cast at that class rank
 */
const SPELL_MEMORIZATION = {
  'bard': {
    divisor: 6,
    ranks: {
      0: { cantrips: 0 },
      1: { cantrips: 1, rank1: 0 },
      2: { cantrips: 2, rank1: 1 },
      3: { cantrips: 3, rank1: 2, rank2: 0 },
      4: { cantrips: 4, rank1: 3, rank2: 1 },
      5: { cantrips: 5, rank1: 4, rank2: 2, rank3: 0 }
    }
  },
  'cleric': {
    divisor: 4,
    ranks: {
      0: { cantrips: 0 },
      1: { cantrips: 2, rank1: 0 },
      2: { cantrips: 4, rank1: 2, rank2: 0 },
      3: { cantrips: 6, rank1: 4, rank2: 2, rank3: 0 },
      4: { cantrips: 8, rank1: 6, rank2: 4, rank3: 2, rank4: 0 },
      5: { cantrips: 10, rank1: 8, rank2: 6, rank3: 4, rank4: 2, rank5: 0 }
    }
  },
  'druid': {
    divisor: 4,
    ranks: {
      0: { cantrips: 0 },
      1: { cantrips: 2, rank1: 0 },
      2: { cantrips: 4, rank1: 2, rank2: 0 },
      3: { cantrips: 6, rank1: 4, rank2: 2, rank3: 0 },
      4: { cantrips: 8, rank1: 6, rank2: 4, rank3: 2, rank4: 0 },
      5: { cantrips: 10, rank1: 8, rank2: 6, rank3: 4, rank4: 2, rank5: 0 }
    }
  },
  'mage': {
    divisor: 4,
    ranks: {
      0: { cantrips: 0 },
      1: { cantrips: 1, rank1: 0 },
      2: { cantrips: 2, rank1: 2, rank2: 0 },
      3: { cantrips: 3, rank1: 4, rank2: 2, rank3: 0 },
      4: { cantrips: 4, rank1: 6, rank2: 4, rank3: 2, rank4: 0 },
      5: { cantrips: 5, rank1: 8, rank2: 6, rank3: 4, rank4: 2, rank5: 0 }
    }
  },
  'paladin': {
    divisor: 6,
    ranks: {
      0: {},  // Cannot cast
      1: {},  // Cannot cast
      2: { cantrips: 0 },
      3: { cantrips: 1, rank1: 0 },
      4: { cantrips: 2, rank1: 1, rank2: 0 },
      5: { cantrips: 3, rank1: 2, rank2: 1, rank3: 0 }
    }
  },
  'anti-paladin': {
    divisor: 6,
    ranks: {
      0: {},  // Cannot cast
      1: {},  // Cannot cast
      2: { cantrips: 0 },
      3: { cantrips: 1, rank1: 0 },
      4: { cantrips: 2, rank1: 1, rank2: 0 },
      5: { cantrips: 3, rank1: 2, rank2: 1, rank3: 0 }
    }
  },
  'ranger': {
    divisor: 6,
    ranks: {
      0: {},  // Cannot cast
      1: {},  // Cannot cast
      2: { cantrips: 0 },
      3: { cantrips: 1, rank1: 0 },
      4: { cantrips: 2, rank1: 1, rank2: 0 },
      5: { cantrips: 3, rank1: 2, rank2: 1, rank3: 0 }
    }
  },
  'sorcerer': {
    divisor: 3,
    ranks: {
      0: { cantrips: 0 },
      1: { cantrips: 1, rank1: 0 },
      2: { cantrips: 2, rank1: 1, rank2: 0 },
      3: { cantrips: 3, rank1: 2, rank2: 1, rank3: 0 },
      4: { cantrips: 4, rank1: 3, rank2: 2, rank3: 1, rank4: 0 },
      5: { cantrips: 5, rank1: 4, rank2: 3, rank3: 2, rank4: 1, rank5: 0 }
    }
  }
};

// Classes that have no magic
const NO_MAGIC_CLASSES = ['berserker', 'cavalier', 'fighter', 'monk', 'rogue', 'thief', 'warlord'];

/**
 * Calculate spells that can be memorized for a given class at a given rank
 * @param {string} className - The class name
 * @param {number} classRank - The class rank (0-5)
 * @param {number} intValue - The character's INT value
 * @returns {object} { cantrips: N, rank1: N, rank2: N, ... } or empty object if no magic
 */
function getSpellMemorization(className, classRank, intValue) {
  const normalized = normalizeClassName(className);
  
  // No magic classes
  if (NO_MAGIC_CLASSES.includes(normalized)) {
    return {};
  }
  
  const classData = SPELL_MEMORIZATION[normalized];
  if (!classData) {
    return {};
  }
  
  const rankData = classData.ranks[classRank] || {};
  const divisor = classData.divisor;
  const baseValue = Math.ceil(intValue / divisor);
  
  const result = {};
  const spellRanks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
  
  spellRanks.forEach(spellRank => {
    if (rankData[spellRank] !== undefined) {
      result[spellRank] = baseValue + rankData[spellRank];
    }
  });
  
  return result;
}

/**
 * Calculate combined spell memorization for all classes (takes best from each)
 * @param {Array} classes - Array of { className, classRank } objects
 * @param {number} intValue - The character's INT value
 * @returns {object} { cantrips: N, rank1: N, ... } with best values from all classes
 */
function getCombinedSpellMemorization(classes, intValue) {
  const combined = {};
  const spellRanks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
  
  classes.forEach(({ className, classRank }) => {
    if (!className) return;
    
    const classSpells = getSpellMemorization(className, classRank, intValue);
    
    spellRanks.forEach(spellRank => {
      if (classSpells[spellRank] !== undefined) {
        if (combined[spellRank] === undefined || classSpells[spellRank] > combined[spellRank]) {
          combined[spellRank] = classSpells[spellRank];
        }
      }
    });
  });
  
  return combined;
}

// Export for use in app.js
window.ClassRankData = {
  CLASS_RANK_TITLES,
  EVOCATIVE_NAMES,
  NO_MULTICLASS,
  FORBIDDEN_COMBINATIONS,
  CLASS_PREREQ_SKILLS,
  RANK_REQUIREMENTS,
  CLASS_SLOT_MODIFIERS,
  SPELL_MEMORIZATION,
  NO_MAGIC_CLASSES,
  normalizeClassName,
  normalizeSkillName,
  getComboKey,
  getRankTitle,
  getEvocativeNames,
  hasEvocativeNames,
  canClassMulticlass,
  canCombineClasses,
  validateMulticlass,
  isPrereqForClass,
  getPrereqSkillsForClass,
  getPrereqKeysForSkill,
  getNextRankRequirement,
  getSpellMemorization,
  getCombinedSpellMemorization
};
