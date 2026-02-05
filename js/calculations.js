/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Calculation Functions
   ============================================ */

const Calculator = {
  /**
   * Get attribute value from the character model
   */
  getAttr(attrs, attrName) {
    return parseInt(attrs[attrName]) || 0;
  },

  /**
   * Calculate a skill's base value from its definition
   */
  calculateSkillBase(skillDef, attrs) {
    let total = 0;
    
    if (skillDef.multiplier) {
      // Single attribute multiplied (e.g., "CON x2")
      total = this.getAttr(attrs, skillDef.attrs[0]) * skillDef.multiplier;
    } else {
      // Sum of attributes (e.g., "STR+DEX")
      skillDef.attrs.forEach(attr => {
        total += this.getAttr(attrs, attr);
      });
    }
    
    // Add bonus if defined (e.g., "+40" for Customs)
    if (skillDef.bonus) {
      total += skillDef.bonus;
    }
    
    return total;
  },

  /**
   * Calculate Action Points based on combined Rank
   * Rank 0-1: 2, Rank 2-3: 3, Rank 4-5: 4
   */
  calculateActionPoints(combinedRank) {
    const rank = Math.min(Math.max(0, combinedRank), 5);
    return ACTION_POINTS_BY_RANK[rank] || 2;
  },

  /**
   * Calculate Damage Modifier from STR + SIZ
   */
  calculateDamageModifier(STR, SIZ) {
    const sum = (parseInt(STR) || 0) + (parseInt(SIZ) || 0);
    
    // Handle values beyond the table (each 10 points continues progression)
    if (sum > 130) {
      const extraTens = Math.floor((sum - 130) / 10);
      const diceProgression = ['+2d10+1d6', '+2d10+1d8', '+2d10+1d10', '+2d10+1d12', '+3d10'];
      const idx = Math.min(extraTens, diceProgression.length - 1);
      return diceProgression[idx];
    }
    
    for (const entry of DAMAGE_MOD_TABLE) {
      if (sum <= entry.max) {
        return entry.mod;
      }
    }
    return '+0';
  },

  /**
   * Calculate Experience Modifier from CHA
   * 6 or less: -1, 7-12: 0, 13-18: +1, each 6 points: +1
   */
  calculateExpMod(CHA) {
    const cha = parseInt(CHA) || 0;
    if (cha <= 6) return -1;
    if (cha <= 12) return 0;
    // Each 6 points above 12 adds +1
    return Math.floor((cha - 7) / 6) + 1;
  },

  /**
   * Calculate Healing Rate from CON
   * 6 or less: 1, 7-12: 2, 13-18: 3, each 6 points: +1
   */
  calculateHealingRate(CON) {
    const con = parseInt(CON) || 0;
    if (con <= 0) return 1;
    return Math.ceil(con / 6);
  },

  /**
   * Calculate Initiative from (DEX + INT) / 2 (round up)
   */
  calculateInitiative(DEX, INT) {
    const sum = (parseInt(DEX) || 0) + (parseInt(INT) || 0);
    return Math.ceil(sum / 2);
  },

  /**
   * Calculate base Luck Points from POW
   * 6 or less: 1, 7-12: 2, 13-18: 3, each 6 points: +1
   */
  calculateBaseLuck(POW) {
    const pow = parseInt(POW) || 0;
    if (pow <= 0) return 1;
    return Math.ceil(pow / 6);
  },

  /**
   * Calculate total Luck Points
   * Base (from POW) + Human bonus (+1) + Rank bonus (cumulative)
   * Rank bonuses: R1: +1, R2: +2, R3: +3, R4: +4, R5: +5 (cumulative)
   */
  calculateLuckPoints(POW, isHuman, combinedRank) {
    let luck = this.calculateBaseLuck(POW);
    
    // Human racial bonus
    if (isHuman) {
      luck += 1;
    }
    
    // Rank bonus (cumulative: rank 1 = +1, rank 2 = +1+2=3, rank 3 = +1+2+3=6, etc.)
    const rank = Math.min(Math.max(0, combinedRank), 5);
    luck += LUCK_BY_RANK[rank] || 0;
    
    return luck;
  },

  /**
   * Calculate Magic Points (equals POW)
   */
  calculateMagicPoints(POW) {
    return parseInt(POW) || 0;
  },

  /**
   * Get HP column index from CON+SIZ value
   * 1-5: 0, 6-10: 1, 11-15: 2, ..., 36-40: 7, then +1 per 5
   */
  getHPColumnIndex(conPlusSiz) {
    if (conPlusSiz <= 5) return 0;
    if (conPlusSiz <= 40) {
      return Math.floor((conPlusSiz - 1) / 5);
    }
    // Beyond 40, each +5 adds to index
    return 7 + Math.floor((conPlusSiz - 40) / 5);
  },

  /**
   * Get base HP for a location type from the table
   */
  getBaseLocationHP(locationType, conPlusSiz) {
    const colIndex = this.getHPColumnIndex(conPlusSiz);
    const table = HP_TABLE[locationType];
    if (!table) return 1;
    
    // If beyond table bounds, extrapolate (+1 per column beyond 7)
    if (colIndex >= table.length) {
      return table[table.length - 1] + (colIndex - table.length + 1);
    }
    
    return table[colIndex];
  },

  /**
   * Map location name to location type for HP lookup
   */
  getLocationType(locationName) {
    const name = locationName.toLowerCase();
    if (name.includes('head')) return 'head';
    if (name.includes('chest')) return 'chest';
    if (name.includes('abdomen')) return 'abdomen';
    if (name.includes('arm')) return 'arm';
    if (name.includes('leg')) return 'leg';
    if (name.includes('wing')) return 'wing';
    return 'leg'; // Default fallback
  },

  /**
   * Calculate HP for a specific hit location
   * HP = base from table + rank bonus
   * @param {number} CON - Constitution value
   * @param {number} SIZ - Size value
   * @param {string} locationName - Name of the hit location
   * @param {number} combinedRank - Combined class rank
   * @param {number} STR - Strength value (optional, used for Resilient trait)
   */
  calculateLocationHP(CON, SIZ, locationName, combinedRank, STR = 0) {
    // If STR is provided (Resilient trait), use STR+CON+SIZ, otherwise use CON+SIZ
    const hpBase = STR > 0 
      ? (parseInt(STR) || 0) + (parseInt(CON) || 0) + (parseInt(SIZ) || 0)
      : (parseInt(CON) || 0) + (parseInt(SIZ) || 0);
    const locationType = this.getLocationType(locationName);
    
    // Get base HP from table
    let hp = this.getBaseLocationHP(locationType, hpBase);
    
    // Add rank bonus
    const rank = Math.min(Math.max(0, combinedRank), 5);
    hp += HP_BONUS_BY_RANK[rank] || 0;
    
    return Math.max(1, hp);
  },

  /**
   * Calculate all hit location HPs
   * @param {number} CON - Constitution value
   * @param {number} SIZ - Size value
   * @param {string} sheetType - Type of character sheet (human/syrin)
   * @param {number} combinedRank - Combined class rank
   * @param {number} STR - Strength value (optional, used for Resilient trait)
   */
  calculateAllHitLocations(CON, SIZ, sheetType, combinedRank, STR = 0) {
    const locations = HIT_LOCATIONS[sheetType] || HIT_LOCATIONS.human;
    return locations.map(loc => ({
      ...loc,
      hp: this.calculateLocationHP(CON, SIZ, loc.location, combinedRank, STR)
    }));
  },

  /**
   * Calculate Encumbrance threshold
   * Base = STR
   */
  calculateEncThreshold(STR) {
    return parseInt(STR) || 0;
  },

  /**
   * Get Encumbrance status based on total ENC and STR
   * Returns the full status object with penalty info plus calculated penalties
   */
  getEncStatus(totalEnc, STR) {
    const strVal = parseInt(STR) || 0;
    const ratio = strVal > 0 ? totalEnc / strVal : 0;
    
    // Find base status
    let baseStatus = ENC_STATUS[ENC_STATUS.length - 1];
    for (const status of ENC_STATUS) {
      if (ratio <= status.threshold) {
        baseStatus = status;
        break;
      }
    }
    
    // Calculate specific penalties for Burdened/Overburdened
    let initiativePenalty = 0;
    let movementPenalty = 0;
    const thingsOverStr = Math.max(0, totalEnc - strVal);
    
    if (baseStatus.name === 'Burdened' || baseStatus.name === 'Overburdened') {
      // For each Thing over STR, reduce Initiative by 1
      initiativePenalty = Math.floor(thingsOverStr);
      // For every 6 Things over STR, reduce Movement by 5 feet
      movementPenalty = Math.floor(thingsOverStr / 6) * 5;
    }
    
    return {
      ...baseStatus,
      initiativePenalty,
      movementPenalty,
      thingsOverStr
    };
  },

  /**
   * Calculate movement speeds
   */
  calculateMovement(baseMovement) {
    const base = parseInt(baseMovement) || 0;
    return {
      walk: base,
      run: base * 3,
      sprint: base * 5,
      swim: base,
      climb: base
    };
  },

  /**
   * Parse height string (e.g., "5' 10\"") and return feet as decimal
   */
  parseHeight(heightStr) {
    if (!heightStr) return 0;
    
    // Try to parse "X' Y\"" format
    const match = heightStr.match(/(\d+)'\s*(\d+)?/);
    if (match) {
      const feet = parseInt(match[1]) || 0;
      const inches = parseInt(match[2]) || 0;
      return feet + (inches / 12);
    }
    
    // Try to parse as just a number (assume feet)
    const num = parseFloat(heightStr);
    return isNaN(num) ? 0 : num;
  },

  /**
   * Calculate jump distances based on height
   */
  calculateJumps(heightStr) {
    const heightFeet = this.parseHeight(heightStr);
    const heightInches = heightFeet * 12;
    
    // Vertical jump = half height
    const verticalInches = heightInches / 2;
    const verticalFeet = Math.floor(verticalInches / 12);
    const verticalRemainder = Math.round(verticalInches % 12);
    
    // Horizontal jump = 2x height
    const horizontalInches = heightInches * 2;
    const horizontalFeet = Math.floor(horizontalInches / 12);
    const horizontalRemainder = Math.round(horizontalInches % 12);
    
    return {
      vertical: `${verticalFeet}' ${verticalRemainder}"`,
      horizontal: `${horizontalFeet}' ${horizontalRemainder}"`
    };
  },

  /**
   * Calculate all standard skill bases
   */
  calculateAllStandardSkills(attrs) {
    const results = {};
    for (const [key, skillDef] of Object.entries(SKILL_DEFINITIONS.standard)) {
      results[key] = this.calculateSkillBase(skillDef, attrs);
    }
    return results;
  },

  /**
   * Calculate all belief bases (alignment, passion, oath)
   */
  calculateBeliefBases(attrs) {
    return {
      alignment: this.calculateSkillBase(SKILL_DEFINITIONS.beliefs.alignment, attrs),
      passion: this.calculateSkillBase(SKILL_DEFINITIONS.beliefs.passion, attrs),
      oath: this.calculateSkillBase(SKILL_DEFINITIONS.beliefs.oath, attrs)
    };
  },

  /**
   * Calculate language bases
   */
  calculateLanguageBases(attrs) {
    return {
      native: this.calculateSkillBase(SKILL_DEFINITIONS.language.native, attrs),
      additional: this.calculateSkillBase(SKILL_DEFINITIONS.language.additional, attrs)
    };
  },

  /**
   * Calculate magic skill bases
   */
  calculateMagicSkillBases(attrs) {
    const results = {};
    for (const [key, skillDef] of Object.entries(SKILL_DEFINITIONS.magic)) {
      results[key] = this.calculateSkillBase(skillDef, attrs);
    }
    return results;
  },

  /**
   * Calculate combat skill base
   */
  calculateCombatSkillBase(attrs) {
    return this.calculateSkillBase(SKILL_DEFINITIONS.combat.melee, attrs);
  },

  /**
   * Calculate all derived stats at once
   */
  calculateAllDerived(attrs, combinedRank, isHuman) {
    const STR = this.getAttr(attrs, 'STR');
    const CON = this.getAttr(attrs, 'CON');
    const SIZ = this.getAttr(attrs, 'SIZ');
    const DEX = this.getAttr(attrs, 'DEX');
    const INT = this.getAttr(attrs, 'INT');
    const POW = this.getAttr(attrs, 'POW');
    const CHA = this.getAttr(attrs, 'CHA');

    return {
      actionPoints: this.calculateActionPoints(combinedRank),
      damageModifier: this.calculateDamageModifier(STR, SIZ),
      expMod: this.calculateExpMod(CHA),
      healingRate: this.calculateHealingRate(CON),
      initiative: this.calculateInitiative(DEX, INT),
      luckPoints: this.calculateLuckPoints(POW, isHuman, combinedRank),
      magicPoints: this.calculateMagicPoints(POW)
    };
  },

  /**
   * Recalculate everything based on current attributes
   * @param {object} attrs - Character attributes
   * @param {string} sheetType - Type of character sheet
   * @param {number} combinedRank - Combined class rank
   * @param {boolean} isHuman - Whether character is human
   * @param {boolean} hasResilient - Whether character has Resilient trait (HP uses STR+CON+SIZ)
   */
  recalculateAll(attrs, sheetType, combinedRank, isHuman, hasResilient = false) {
    // For Resilient trait, pass STR to hit location calculation
    const strForHP = hasResilient ? attrs.STR : 0;
    
    return {
      derived: this.calculateAllDerived(attrs, combinedRank || 0, isHuman || false),
      skills: this.calculateAllStandardSkills(attrs),
      beliefs: this.calculateBeliefBases(attrs),
      languages: this.calculateLanguageBases(attrs),
      magic: this.calculateMagicSkillBases(attrs),
      combat: this.calculateCombatSkillBase(attrs),
      hitLocations: this.calculateAllHitLocations(attrs.CON, attrs.SIZ, sheetType, combinedRank || 0, strForHP)
    };
  }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
}
