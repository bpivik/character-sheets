/**
 * Ranked Class Abilities Data for Mythras Classic Fantasy
 * These are purchasable abilities that cost EXP Rolls (cost = rank)
 * 
 * Prereq format:
 * - "SkillName 50%" = requires skill at that percentage
 * - "SkillName 50% OR OtherSkill 50%" = either skill qualifies
 * - "AbilityName" (no %) = requires that ability first
 * - "AbilityName; SkillName 50%" = requires ability AND skill (semicolon = AND)
 * - null = no prerequisites
 * 
 * Special flags:
 * - repeatable: true = can be taken multiple times (e.g., Weapon Specialization)
 * - specialType: 'weapon-spec' = triggers weapon specialization sub-selection
 */

const RANKED_CLASS_ABILITIES = {
  bard: [
    // Rank 1
    { 
      name: "Agile", 
      rank: 1, 
      prereqs: "Evade 50% OR Acrobatics 50%",
      summary: "+4 Initiative (Unburdened, Light armor max)"
    },
    { 
      name: "Artful Dodger", 
      rank: 1, 
      prereqs: "Evade 50%",
      summary: "+10% Evade, dodge melee without falling prone (Unburdened, Light armor max)"
    },
    { 
      name: "Inspire Competence", 
      rank: 1, 
      prereqs: "Musicianship 60%; Willpower 60%",
      summary: "1 MP: allies within 30ft get +10% to skills for 5 rounds"
    },
    { 
      name: "Language (Druids' Cant)", 
      rank: 1, 
      prereqs: null,
      summary: "Secret druidic language for nature communication (Druidic bards only)"
    },
    { 
      name: "Language (Thieves' Cant)", 
      rank: 1, 
      prereqs: null,
      summary: "Secret language for discussing illicit activities (Arcane bards only)"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Swashbuckling", 
      rank: 1, 
      prereqs: "Combat Style 50%",
      summary: "Attack/Evade while jumping or swinging, ignore Athletics cap (Unburdened, Light armor max)"
    },
    { 
      name: "Unarmored Defense", 
      rank: 1, 
      prereqs: "Artful Dodger; Evade 50% OR Acrobatics 50%",
      summary: "Evade rolls one grade easier (unarmored, Unburdened)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Parry/Evade only (one reaction per attack)"
    },
    { 
      name: "Inspire Courage II", 
      rank: 2, 
      prereqs: "Musicianship 100%; Willpower 100%",
      summary: "As Inspire Courage I but +10% bonus and +2 rounds duration"
    },
    { 
      name: "Suggestion", 
      rank: 2, 
      prereqs: "Musicianship 70%; Willpower 70%",
      summary: "1 MP: implant Suggestion spell on Fascinated target; 1 Grade harder if woven into performance"
    },
    
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Inspire Greatness", 
      rank: 3, 
      prereqs: "Musicianship 90%; Willpower 90%",
      summary: "3 MP: 2 allies (+2/Rank beyond 3) get +10% skills/Resistance, first attack damage halved, 5 rounds/Rank"
    },
    { 
      name: "Song of Freedom", 
      rank: 3, 
      prereqs: "Musicianship 100%; Willpower 100%",
      summary: "3 MP: 1 min performance breaks Enchantment/Charm on ally within 30ft (Intensity = skill/10)"
    },
    
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "Use Defensive Reflexes twice per combat (not on same attack, not with Luck Points)"
    },
    { 
      name: "Inspire Heroics", 
      rank: 4, 
      prereqs: "Musicianship 110%; Willpower 110%",
      summary: "3 MP: self or 1 ally (+2 at Rank 5) gets +20% to Resistance, Evade, Parry; 5 rounds/Rank"
    },
    { 
      name: "Mass Suggestion", 
      rank: 4, 
      prereqs: "Musicianship 120%; Willpower 120%",
      summary: "As Suggestion but affects all Fascinated subjects"
    },
    
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes III", 
      rank: 5, 
      prereqs: "Defensive Reflexes II",
      summary: "Use Defensive Reflexes three times per combat (not on same attack, not with Luck Points)"
    },
    { 
      name: "Inspire Courage III", 
      rank: 5, 
      prereqs: "Musicianship 120%; Willpower 120%",
      summary: "As Inspire Courage I but +15% bonus and +3 rounds duration"
    },
  ],
  
  // More classes to be added...
};

/**
 * Abilities that can be taken multiple times (with different specializations)
 */
const REPEATABLE_ABILITIES = {
  'Weapon Specialization': {
    types: ['Melee', 'Ranged', 'Shield'],
    // Ranged grants additional abilities
    grantsAbilities: {
      'Ranged': ['Quick Shot', 'Improved Aim', 'Reduced Reload Time']
    }
  }
};

/**
 * Get abilities for a class at a specific rank
 */
function getRankedAbilitiesForClass(className, rank) {
  const classKey = className.toLowerCase().replace('-', '').replace(' ', '').trim();
  const abilities = RANKED_CLASS_ABILITIES[classKey];
  if (!abilities) return [];
  return abilities.filter(a => a.rank === rank);
}

/**
 * Get all abilities for a class up to a specific rank
 */
function getAllRankedAbilitiesUpToRank(className, maxRank) {
  const classKey = className.toLowerCase().replace('-', '').replace(' ', '').trim();
  const abilities = RANKED_CLASS_ABILITIES[classKey];
  if (!abilities) return [];
  return abilities.filter(a => a.rank <= maxRank);
}

/**
 * Check if a character meets the prerequisites for an ability
 * @param {string} prereqs - The prerequisite string
 * @param {Set} acquiredAbilities - Set of ability names the character has
 * @param {Function} getSkillValue - Function to get skill value by name
 * @returns {Object} - { met: boolean, missing: string[] }
 */
function checkAbilityPrereqs(prereqs, acquiredAbilities, getSkillValue) {
  if (!prereqs) return { met: true, missing: [] };
  
  const missing = [];
  
  // Split by semicolon for AND conditions
  const andConditions = prereqs.split(';').map(s => s.trim());
  
  for (const condition of andConditions) {
    // Check for OR conditions
    if (condition.includes(' OR ')) {
      const orParts = condition.split(' OR ').map(s => s.trim());
      let anyMet = false;
      const orMissing = [];
      
      for (const part of orParts) {
        const result = checkSingleCondition(part, acquiredAbilities, getSkillValue);
        if (result.met) {
          anyMet = true;
          break;
        } else {
          orMissing.push(result.reason);
        }
      }
      
      if (!anyMet) {
        missing.push(orParts.join(' OR '));
      }
    } else {
      // Single condition
      const result = checkSingleCondition(condition, acquiredAbilities, getSkillValue);
      if (!result.met) {
        missing.push(result.reason);
      }
    }
  }
  
  return { met: missing.length === 0, missing };
}

/**
 * Check a single prerequisite condition
 */
function checkSingleCondition(condition, acquiredAbilities, getSkillValue) {
  // Check if it's a skill requirement (contains %)
  const skillMatch = condition.match(/^(.+?)\s+(\d+)%$/);
  if (skillMatch) {
    const skillName = skillMatch[1].trim();
    const requiredValue = parseInt(skillMatch[2], 10);
    const currentValue = getSkillValue(skillName);
    
    if (currentValue >= requiredValue) {
      return { met: true };
    } else {
      return { met: false, reason: `${skillName} ${requiredValue}% (you have ${currentValue}%)` };
    }
  }
  
  // Otherwise it's an ability requirement - check base name (before parentheses)
  const baseCondition = condition.split('(')[0].trim();
  
  // Check if any acquired ability matches (with or without parenthetical suffix)
  for (const acquired of acquiredAbilities) {
    const baseAcquired = acquired.split('(')[0].trim();
    if (baseAcquired.toLowerCase() === baseCondition.toLowerCase()) {
      return { met: true };
    }
  }
  
  return { met: false, reason: `${condition} ability` };
}

/**
 * Check if character has a specific ability (accounting for parenthetical variants)
 * e.g., "Weapon Specialization" matches "Weapon Specialization (Longsword)"
 */
function hasAbility(abilityName, acquiredAbilities) {
  const baseName = abilityName.split('(')[0].trim().toLowerCase();
  const fullName = abilityName.toLowerCase().trim();
  
  // Normalize apostrophes for comparison
  const normalizeApostrophes = (str) => str.replace(/[']/g, "'");
  const normalizedFullName = normalizeApostrophes(fullName);
  
  for (const acquired of acquiredAbilities) {
    const baseAcquired = acquired.split('(')[0].trim().toLowerCase();
    const normalizedAcquired = normalizeApostrophes(acquired.toLowerCase().trim());
    
    // For "Language" abilities, require exact match (Language (X) != Language (Y))
    if (baseName === 'language') {
      if (normalizedAcquired === normalizedFullName) {
        return true;
      }
    } else {
      // For other abilities, base name matching is fine
      if (baseAcquired === baseName) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if an ability is repeatable (can be taken multiple times)
 */
function isRepeatableAbility(abilityName) {
  const baseName = abilityName.split('(')[0].trim();
  return REPEATABLE_ABILITIES.hasOwnProperty(baseName);
}

/**
 * Get the repeatable ability info
 */
function getRepeatableAbilityInfo(abilityName) {
  const baseName = abilityName.split('(')[0].trim();
  return REPEATABLE_ABILITIES[baseName] || null;
}

// Make available globally
window.RANKED_CLASS_ABILITIES = RANKED_CLASS_ABILITIES;
window.REPEATABLE_ABILITIES = REPEATABLE_ABILITIES;
window.getRankedAbilitiesForClass = getRankedAbilitiesForClass;
window.getAllRankedAbilitiesUpToRank = getAllRankedAbilitiesUpToRank;
window.checkAbilityPrereqs = checkAbilityPrereqs;
window.hasAbility = hasAbility;
window.isRepeatableAbility = isRepeatableAbility;
window.getRepeatableAbilityInfo = getRepeatableAbilityInfo;
