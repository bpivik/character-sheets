/**
 * Class Abilities Data for Mythras Classic Fantasy
 * Abilities automatically granted by class and rank
 */

const ClassAbilities = {
  bard: {
    rank1: ["Counter Song", "Fascinate", "Fleet of Foot", "Inspire Courage I", "Use Arcane Scrolls", "Bard Spellcaster"]
  },
  
  berserker: {
    rank1: ["Artful Dodger", "Berserk Rage", "Brute Strength", "Combat Proficiency", "Detect Magic and Illusions", "Resilient"]
  },
  
  cavalier: {
    rank1: ["Armor Proficiency", "Combat Proficiency", "Commanding", "Determination", "Hospitality", "Immunity to Fear", "Mounted Combat"]
  },
  
  cleric: {
    rank1: ["Divine Spellcasting", "Turn Undead"]
  },
  
  druid: {
    rank1: ["Divine Spellcasting", "Identify Plants and Animals", "Identify Pure Water"],
    // Special: Also adds "Druids' Cant" as a language
    specialActions: {
      rank1: { addLanguage: "Druids' Cant" }
    }
  },
  
  fighter: {
    rank1: ["Combat Proficiency", "Weapon Specialization"],
    rank2: ["Weapon Master"],
    rank3: ["High Master"],
    rank4: ["Grand Master"],
    rank5: ["Legendary Master"]
  },
  
  mage: {
    rank1: ["Arcane Spellcaster"]
  },
  
  monk: {
    rank1: ["Flurry of Blows", "Forceful Strike", "Graceful Strike", "Lightning Reflexes", "Quick", "Unarmed Proficiency"],
    // Special: Adds Unarmed weapon with damage scaling by rank
    specialActions: {
      rank1: { addUnarmed: "1d4" },
      rank2: { changeUnarmedDamage: "1d6" },
      rank3: { changeUnarmedDamage: "1d8" },
      rank4: { changeUnarmedDamage: "1d10" },
      rank5: { changeUnarmedDamage: "1d12" }
    }
  },
  
  paladin: {
    rank1: ["Armor Proficiency", "Combat Proficiency", "Commanding", "Detect Evil", "Holy Strike", "Hospitality", "Lay on Hands", "Mounted Combat"],
    rank2: ["Divine Spellcasting"]
  },
  
  ranger: {
    rank1: ["Combat Proficiency"],
    rank2: ["Divine Spellcasting"]
  },
  
  rogue: {
    rank1: ["Climb Walls", "Hide in Shadows", "Sneak Attack", "Subterfuge"],
    // Special: Also adds "Thieves' Cant" as a language
    specialActions: {
      rank1: { addLanguage: "Thieves' Cant" }
    }
  },
  
  sorcerer: {
    rank1: [],
    // Special: Adds "Familiar" to Rank 1 spells
    specialActions: {
      rank1: { addSpell: { rank: "rank1", spell: "Familiar" } }
    }
  },
  
  warlord: {
    rank1: ["Combat Proficiency", "Just a Scratch", "Commanding Presence", "Second Wind", "Tactical Shift"],
    rank2: ["Commander"],
    rank3: ["Battle Captain"],
    rank4: ["War Marshal"],
    rank5: ["Lord Commander"]
  }
};

/**
 * Get all abilities a class grants up to a given rank
 * @param {string} className - The class name
 * @param {number} rank - The character's rank (1-5)
 * @returns {Array} - Array of ability names
 */
ClassAbilities.getAbilitiesForClassAndRank = function(className, rank) {
  const classKey = className.toLowerCase().trim();
  const classData = this[classKey];
  if (!classData) return [];
  
  const abilities = [];
  for (let r = 1; r <= rank; r++) {
    const rankKey = `rank${r}`;
    if (classData[rankKey]) {
      abilities.push(...classData[rankKey]);
    }
  }
  return abilities;
};

/**
 * Get all abilities granted by a specific class (all ranks)
 * Used for removal when class is dropped
 * @param {string} className - The class name
 * @returns {Array} - Array of all ability names for this class
 */
ClassAbilities.getAllAbilitiesForClass = function(className) {
  const classKey = className.toLowerCase().trim();
  const classData = this[classKey];
  if (!classData) return [];
  
  const abilities = [];
  for (let r = 1; r <= 5; r++) {
    const rankKey = `rank${r}`;
    if (classData[rankKey]) {
      abilities.push(...classData[rankKey]);
    }
  }
  return abilities;
};

/**
 * Get special actions for a class at a given rank
 * @param {string} className - The class name
 * @param {number} rank - The character's rank
 * @returns {Object|null} - Special actions object or null
 */
ClassAbilities.getSpecialActions = function(className, rank) {
  const classKey = className.toLowerCase().trim();
  const classData = this[classKey];
  if (!classData || !classData.specialActions) return null;
  
  const rankKey = `rank${rank}`;
  return classData.specialActions[rankKey] || null;
};

/**
 * Check if a class grants abilities
 * @param {string} className - The class name
 * @returns {boolean}
 */
ClassAbilities.isAbilityGrantingClass = function(className) {
  const classKey = className.toLowerCase().trim();
  const classData = this[classKey];
  // Must be an object with rank properties, not a function
  return classData && typeof classData === 'object' && (classData.rank1 || classData.specialActions);
};

/**
 * Get list of all classes that grant abilities
 * @returns {Array} - Array of class names
 */
ClassAbilities.getAllClasses = function() {
  return Object.keys(this).filter(key => typeof this[key] === 'object' && !Array.isArray(this[key]));
};

// Make available globally
window.ClassAbilities = ClassAbilities;
