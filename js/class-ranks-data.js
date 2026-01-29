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

// Export for use in app.js
window.ClassRankData = {
  CLASS_RANK_TITLES,
  EVOCATIVE_NAMES,
  NO_MULTICLASS,
  FORBIDDEN_COMBINATIONS,
  CLASS_PREREQ_SKILLS,
  RANK_REQUIREMENTS,
  CLASS_SLOT_MODIFIERS,
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
  getPrereqKeysForSkill,
  getNextRankRequirement
};
