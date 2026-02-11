/**
 * Spell Damage Data
 * Maps spell names (lowercase) to damage resolution info.
 * Used by the damage modal after a successful cast.
 *
 * formula(intensity): returns { dice, bonus, description }
 *   dice: e.g. "1d6", "2d8"
 *   bonus: flat number added to roll
 *   description: human-readable damage string
 * locations: how hit locations are determined
 *   "single" = 1 random location (roll d20)
 *   "1dX" = roll that many locations
 *   "all" = all locations
 *   number = fixed count
 * locationType: "random" (d20 per loc) or "contiguous" 
 * notes: armor/resistance rules
 */
window.SpellDamageData = {

  /**
   * Roll dice expression and return total
   * Supports: "1d6", "2d8+3", "3d6+2", "1d4", etc.
   */
  rollDice(expr) {
    const match = expr.match(/^(\d+)d(\d+)(?:\+(\d+))?(?:\-(\d+))?$/i);
    if (!match) return { total: 0, rolls: [], expr };
    const count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const addBonus = match[3] ? parseInt(match[3], 10) : 0;
    const subBonus = match[4] ? parseInt(match[4], 10) : 0;
    const bonus = addBonus - subBonus;
    const rolls = [];
    let total = 0;
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * sides) + 1;
      rolls.push(r);
      total += r;
    }
    total += bonus;
    total = Math.max(0, total);
    return { total, rolls, bonus, expr };
  },

  /**
   * Roll a d20 for hit location
   * Returns { roll, location }
   */
  rollHitLocation() {
    const roll = Math.floor(Math.random() * 20) + 1;
    let location;
    if (roll <= 3) location = 'Right Leg';
    else if (roll <= 6) location = 'Left Leg';
    else if (roll <= 9) location = 'Abdomen';
    else if (roll <= 12) location = 'Chest';
    else if (roll <= 15) location = 'Right Arm';
    else if (roll <= 18) location = 'Left Arm';
    else location = 'Head';
    return { roll, location };
  },

  /**
   * Get damage info for a spell at given intensity
   * Returns null if spell doesn't deal direct rollable damage
   */
  getDamage(spellName, intensity) {
    const key = spellName.toLowerCase().trim();
    const entry = this.SPELLS[key];
    if (!entry) return null;
    const info = entry.formula(intensity);
    return {
      ...info,
      locations: entry.locations(intensity),
      locationType: entry.locationType || 'random',
      notes: entry.notes || '',
      type: entry.type || 'magical'
    };
  },

  /**
   * Check if a spell has damage data
   */
  hasDamage(spellName) {
    return !!this.SPELLS[spellName.toLowerCase().trim()];
  },

  SPELLS: {
    // ===== CANTRIPS =====
    // (none deal rollable damage)

    // ===== RANK 1 =====

    "acid arrow": {
      formula: (int) => {
        const rounds = Math.floor((int - 1) / 2) + 1;
        return { dice: "1d4", bonus: 0, description: `1d4 acid damage per Round for 1d2+${rounds} Rounds` };
      },
      locations: () => ({ type: 'single' }),
      type: 'acid',
      notes: 'Armor protects but is destroyed by acid; remaining damage passes through. First Aid nullifies continuing effects.'
    },

    "bless": {
      formula: () => ({ dice: "1d3", bonus: 0, description: "1d3 damage to opposing Outer Planes creatures on contact (added to weapon damage)" }),
      locations: () => ({ type: 'single' }),
      notes: 'Only affects opposing alignment Outer Planes creatures. Added to weapon damage on contact.'
    },

    "call lightning": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        const dice = `${sets}d6`;
        const bonusPerSet = sets;
        return { dice, bonus: bonusPerSet, description: `${sets}d6+${bonusPerSet} lightning damage per bolt` };
      },
      locations: (int) => ({ type: 'roll', dice: '1d3' }),
      locationType: 'random',
      type: 'lightning',
      notes: 'Worn armor offers no protection. Only magical armor (Magic Bonus) applies. Resistance roll halves damage.'
    },

    "chill touch": {
      formula: (int) => {
        const bonus = Math.max(0, int - 1);
        return { dice: "1d4", bonus, description: `1d4${bonus > 0 ? '+' + bonus : ''} cold damage` };
      },
      locations: () => ({ type: 'single' }),
      type: 'cold',
      notes: 'Worn armor offers no protection. Magical AP and natural armor reduce normally. Also causes Fatigue.'
    },

    "flame blade": {
      formula: () => ({ dice: "1d4", bonus: 4, description: "1d4+4 fire damage (per strike)" }),
      locations: () => ({ type: 'single' }),
      type: 'fire',
      notes: 'Uses Combat Skill to wield. Ignores caster\'s Damage Modifier. +2 vs undead/fire-vulnerable, -2 vs fire-resistant. Worn armor half protection.'
    },

    "flaming hands": {
      formula: (int) => {
        if (int >= 9) return { dice: "3d6", bonus: 0, description: "3d6 fire damage to all Hit Locations" };
        if (int >= 7) return { dice: "2d6", bonus: 0, description: "2d6 fire damage" };
        if (int >= 5) return { dice: "1d6", bonus: 0, description: "1d6 fire damage" };
        if (int >= 3) return { dice: "1d4", bonus: 0, description: "1d4 fire damage" };
        return { dice: "1d2", bonus: 0, description: "1d2 fire damage" };
      },
      locations: (int) => {
        if (int >= 9) return { type: 'all' };
        if (int >= 5) return { type: 'roll', dice: '1d4+1' };
        return { type: 'single' };
      },
      locationType: 'contiguous',
      type: 'fire',
      notes: 'AP counts as half; magic armor adds full Magic Bonus. SIZ 21-40: treat as 2 Intensity lower. SIZ 41+: treat as 4 lower.'
    },

    "magic missile": {
      formula: (int) => {
        const missiles = int;
        return { dice: "1d6", bonus: 1, description: `${missiles} missile${missiles > 1 ? 's' : ''}, each dealing 1d6+1 damage` };
      },
      locations: () => ({ type: 'single' }),
      type: 'force',
      notes: 'Unerring — cannot be Evaded. Shield spell deflects. Ignores non-magical armor; Magic Bonus only. Natural armor protects fully. Each missile hits a random Hit Location.',
      multipleProjectiles: true
    },

    "magical stone": {
      formula: () => ({ dice: "1d4", bonus: 1, description: "1d4+1 damage per stone (3 stones)" }),
      locations: () => ({ type: 'single' }),
      notes: 'Creates 3 stones usable with sling. +1 to hit and damage vs undead.'
    },

    "produce flame": {
      formula: () => ({ dice: "1d6", bonus: 0, description: "1d6 fire damage (when hurled)" }),
      locations: (int) => ({ type: 'roll', dice: '1d3+1' }),
      locationType: 'random',
      type: 'fire',
      notes: 'Requires Athletics throw roll. SIZ 21-40: 1d2+1 locations. SIZ 41+: 1 location. Resistance roll halves. AP counts half, magic bonus full.'
    },

    "shocking touch": {
      formula: (int) => {
        const bonus = Math.max(0, int - 1);
        return { dice: "1d6", bonus, description: `1d6${bonus > 0 ? '+' + bonus : ''} electrical damage` };
      },
      locations: () => ({ type: 'single' }),
      type: 'lightning',
      notes: 'Natural and worn armor offer no protection. Only magical armor applies (Magic Bonus only). Parry and Evade may be used.'
    },

    "shillelagh": {
      formula: () => ({ dice: "2d4", bonus: 0, description: "2d4 damage per strike with enchanted cudgel" }),
      locations: () => ({ type: 'single' }),
      notes: 'Transforms oaken cudgel. Reverts if wielded by others. Can harm +1 magic weapon creatures.'
    },

    "spiritual hammer": {
      formula: () => ({ dice: "1d8", bonus: 1, description: "1d8+1 damage per strike" }),
      locations: () => ({ type: 'single' }),
      notes: 'Attacks using cleric\'s Combat Skill. Has 3 Action Points. Considered a magical weapon. Every 3 Intensity = +1 Magic Bonus (for Resistance only).'
    },

    // ===== RANK 2 =====

    "flame arrow": {
      formula: () => ({ dice: "1d6", bonus: 0, description: "1d6 fire damage (added to arrow damage)" }),
      locations: () => ({ type: 'single' }),
      type: 'fire',
      notes: 'Enchants normal arrows. Fire damage is added to normal arrow damage. Non-magical armor provides half protection.'
    },

    "heat metal (chill metal)": {
      formula: (int) => {
        return { dice: "1d4", bonus: 0, description: "1d4 fire/cold damage per Round (escalating)" };
      },
      locations: () => ({ type: 'varies', description: 'Locations touching heated/chilled metal' }),
      type: 'fire',
      notes: 'Damage escalates over rounds. Affects metal items being worn/held. See spell description for full progression.'
    },

    // ===== RANK 3 =====

    "fireball": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d6`, bonus: sets, description: `${sets}d6+${sets} fire damage` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'All Hit Locations take damage. Worn armor provides half AP. Magical armor full Magic Bonus. Resistance roll halves total damage.'
    },

    "fireball, delayed": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d6`, bonus: sets, description: `${sets}d6+${sets} fire damage (delayed)` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'Same as Fireball but can be delayed up to 5 Rounds. All Hit Locations. Worn armor half AP. Resistance roll halves.'
    },

    "flame strike": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d8`, bonus: 0, description: `${sets}d8 fire damage` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'All Hit Locations. Worn armor half protection. Magical AP and natural armor full. Successful Evade negates all damage.'
    },

    "lightning bolt": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d6`, bonus: sets, description: `${sets}d6+${sets} lightning damage` };
      },
      locations: () => ({ type: 'roll', dice: '1d6' }),
      locationType: 'random',
      type: 'lightning',
      notes: 'Worn armor offers no protection. Only magical armor (Magic Bonus). Resistance roll halves. Strikes all in 10\' wide path.'
    },

    // ===== RANK 4 =====

    "cone of cold": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d6`, bonus: sets, description: `${sets}d6+${sets} cold damage` };
      },
      locations: () => ({ type: 'all' }),
      type: 'cold',
      notes: 'All Hit Locations. Worn armor half protection. Natural armor and magical AP full. Successful Evade (prone) negates. Chance of freezing target.'
    },

    "fire storm (greater quench fire)": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d8`, bonus: sets, description: `${sets}d8+${sets} fire damage` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'All Hit Locations. Worn armor half protection. Magical AP and natural armor full. Successful Evade (prone) negates.'
    },

    "minute meteors": {
      formula: () => ({ dice: "1d4", bonus: 0, description: "1d4 fire damage per meteor" }),
      locations: () => ({ type: 'single' }),
      type: 'fire',
      notes: 'Creates small meteors hurled like missiles. Requires Combat Skill roll. Can ignite flammable materials.',
      multipleProjectiles: true
    },

    "wall of fire": {
      formula: (int) => {
        return { dice: `${int}d6`, bonus: int, description: `${int}d6+${int} fire damage for passing through` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'Damage for passing through wall. Half damage within 10\' on active side, none beyond 20\'. All locations affected.'
    },

    // ===== RANK 5 =====

    "blade barrier": {
      formula: () => ({ dice: "8d8", bonus: 0, description: "8d8 slashing damage" }),
      locations: () => ({ type: 'roll', dice: '1d4+2' }),
      locationType: 'random',
      notes: 'Barrier of spinning blades. Damage to anyone passing through. Armor provides normal protection.'
    },

    "chain lightning": {
      formula: (int) => {
        const sets = Math.ceil(int / 2);
        return { dice: `${sets}d6`, bonus: sets, description: `${sets}d6+${sets} lightning (−1 per arc)` };
      },
      locations: () => ({ type: 'single' }),
      type: 'lightning',
      notes: 'Arcs to nearest target, −1 damage per arc. Worn armor no protection. Natural armor and magical AP normal. Evade (prone) negates.'
    },

    "disintegrate": {
      formula: () => ({ dice: "2d6", bonus: 0, description: "2d6 damage per Round (dissolving)" }),
      locations: () => ({ type: 'single' }),
      type: 'force',
      notes: 'Target must resist or begin dissolving (2d6 per Round). Objects up to 10\' cube affected. Resistance roll negates entirely.'
    },

    "meteor shower": {
      formula: (int) => {
        const meteors = Math.min(8, int * 2);
        return { dice: "1d8", bonus: 0, description: `${meteors} meteors, each 1d8 fire damage in 15' radius` };
      },
      locations: () => ({ type: 'all' }),
      type: 'fire',
      notes: 'Cumulative damage from overlapping blasts applied to all locations. Worn armor half. Magical/natural full. Evade (prone) negates.',
      multipleProjectiles: true
    },

    "sun ray": {
      formula: () => ({ dice: "3d6", bonus: 0, description: "3d6 radiant damage (6d6 vs undead)" }),
      locations: () => ({ type: 'roll', dice: '1d3' }),
      locationType: 'random',
      type: 'radiant',
      notes: 'Undead take 6d6 and must Evade or be destroyed. Fungal/ooze creatures take full damage. Others can resist to halve.'
    }
  }
};
