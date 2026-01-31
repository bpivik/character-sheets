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
 */

const RANKED_CLASS_ABILITIES = {
  bard: [
    // Rank 0
    { 
      name: "Starting Ability Placeholder", 
      rank: 0, 
      prereqs: null,
      summary: "Placeholder for Rank 0 ability"
    },
    
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
    
    // Rank 2 placeholder
    { 
      name: "Rank 2 Ability Placeholder", 
      rank: 2, 
      prereqs: null,
      summary: "Placeholder for Rank 2 ability"
    },
  ],
  
  fighter: [
    // Rank 1
    { 
      name: "Agile", 
      rank: 1, 
      prereqs: "Evade 50% OR Acrobatics 50%",
      summary: "+4 Initiative (Unburdened, Light armor max)"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    
    // Rank 2 - Fighter gets some abilities at higher ranks
    { 
      name: "Artful Dodger", 
      rank: 2, 
      prereqs: "Evade 50%",
      summary: "+10% Evade, dodge melee without falling prone (Unburdened, Light armor max)"
    },
  ],
  
  // Add more classes as data is provided...
};

/**
 * Get abilities for a class at a specific rank
 */
function getRankedAbilitiesForClass(className, rank) {
  const classKey = className.toLowerCase().replace('-', '').trim();
  const abilities = RANKED_CLASS_ABILITIES[classKey];
  if (!abilities) return [];
  return abilities.filter(a => a.rank === rank);
}

/**
 * Get all abilities for a class up to a specific rank
 */
function getAllRankedAbilitiesUpToRank(className, maxRank) {
  const classKey = className.toLowerCase().replace('-', '').trim();
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
  
  // Otherwise it's an ability requirement
  if (acquiredAbilities.has(condition)) {
    return { met: true };
  } else {
    return { met: false, reason: `${condition} ability` };
  }
}

// Make available globally
window.RANKED_CLASS_ABILITIES = RANKED_CLASS_ABILITIES;
window.getRankedAbilitiesForClass = getRankedAbilitiesForClass;
window.getAllRankedAbilitiesUpToRank = getAllRankedAbilitiesUpToRank;
window.checkAbilityPrereqs = checkAbilityPrereqs;
