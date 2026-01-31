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
  // Classes will be populated as data is provided
  // Example structure:
  // bard: [
  //   { name: "Ability Name", rank: 1, prereqs: "Skill 50%", summary: "Description" },
  // ],
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
  
  for (const acquired of acquiredAbilities) {
    const baseAcquired = acquired.split('(')[0].trim().toLowerCase();
    if (baseAcquired === baseName) {
      return true;
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
