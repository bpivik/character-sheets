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
   * Calculate Action Points from INT + DEX
   */
  calculateActionPoints(INT, DEX) {
    const sum = (parseInt(INT) || 0) + (parseInt(DEX) || 0);
    for (const entry of ACTION_POINTS_TABLE) {
      if (sum <= entry.max) {
        return entry.ap;
      }
    }
    return 1;
  },

  /**
   * Calculate Damage Modifier from STR + SIZ
   */
  calculateDamageModifier(STR, SIZ) {
    const sum = (parseInt(STR) || 0) + (parseInt(SIZ) || 0);
    for (const entry of DAMAGE_MOD_TABLE) {
      if (sum <= entry.max) {
        return entry.mod;
      }
    }
    return '+0';
  },

  /**
   * Calculate Healing Rate from CON
   */
  calculateHealingRate(CON) {
    const con = parseInt(CON) || 0;
    for (const entry of HEALING_RATE_TABLE) {
      if (con <= entry.max) {
        return entry.rate;
      }
    }
    return 1;
  },

  /**
   * Calculate Initiative from (INT + DEX) / 2
   */
  calculateInitiative(INT, DEX) {
    const sum = (parseInt(INT) || 0) + (parseInt(DEX) || 0);
    return Math.round(sum / 2);
  },

  /**
   * Calculate Luck Points from POW / 6
   */
  calculateLuckPoints(POW) {
    const pow = parseInt(POW) || 0;
    return Math.round(pow / 6);
  },

  /**
   * Calculate Magic Points (equals POW)
   */
  calculateMagicPoints(POW) {
    return parseInt(POW) || 0;
  },

  /**
   * Calculate base Hit Points for a location
   * Base HP = (CON + SIZ) / 5, rounded up
   */
  calculateBaseHP(CON, SIZ) {
    const sum = (parseInt(CON) || 0) + (parseInt(SIZ) || 0);
    return Math.ceil(sum / 5);
  },

  /**
   * Calculate HP for a specific hit location
   */
  calculateLocationHP(CON, SIZ, hpMod) {
    const baseHP = this.calculateBaseHP(CON, SIZ);
    return Math.max(1, baseHP + (hpMod || 0));
  },

  /**
   * Calculate all hit location HPs
   */
  calculateAllHitLocations(CON, SIZ, sheetType) {
    const locations = HIT_LOCATIONS[sheetType] || HIT_LOCATIONS.human;
    return locations.map(loc => ({
      ...loc,
      hp: this.calculateLocationHP(CON, SIZ, loc.hpMod)
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
   * Returns the full status object with penalty info
   */
  getEncStatus(totalEnc, STR) {
    const threshold = this.calculateEncThreshold(STR);
    const ratio = threshold > 0 ? totalEnc / threshold : 0;
    
    for (const status of ENC_STATUS) {
      if (ratio <= status.threshold) {
        return status;
      }
    }
    return ENC_STATUS[ENC_STATUS.length - 1]; // Immobilized
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
    
    return {
      vertical: `${Math.floor(heightInches / 24)}' ${Math.round((heightInches / 2) % 12)}"`,
      horizontal: `${Math.floor(heightFeet)}' ${Math.round((heightFeet * 24) % 12)}"`
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
  calculateAllDerived(attrs) {
    const STR = this.getAttr(attrs, 'STR');
    const CON = this.getAttr(attrs, 'CON');
    const SIZ = this.getAttr(attrs, 'SIZ');
    const DEX = this.getAttr(attrs, 'DEX');
    const INT = this.getAttr(attrs, 'INT');
    const POW = this.getAttr(attrs, 'POW');
    const CHA = this.getAttr(attrs, 'CHA');

    return {
      actionPoints: this.calculateActionPoints(INT, DEX),
      damageModifier: this.calculateDamageModifier(STR, SIZ),
      healingRate: this.calculateHealingRate(CON),
      initiative: this.calculateInitiative(INT, DEX),
      luckPoints: this.calculateLuckPoints(POW),
      magicPoints: this.calculateMagicPoints(POW),
      expMod: -1 // Fixed for most races
    };
  },

  /**
   * Recalculate everything based on current attributes
   */
  recalculateAll(attrs, sheetType) {
    return {
      derived: this.calculateAllDerived(attrs),
      skills: this.calculateAllStandardSkills(attrs),
      beliefs: this.calculateBeliefBases(attrs),
      languages: this.calculateLanguageBases(attrs),
      magic: this.calculateMagicSkillBases(attrs),
      combat: this.calculateCombatSkillBase(attrs),
      hitLocations: this.calculateAllHitLocations(attrs.CON, attrs.SIZ, sheetType)
    };
  }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
}
