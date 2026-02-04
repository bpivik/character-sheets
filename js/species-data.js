/**
 * Species Data for Mythras Classic Fantasy
 * Contains movement rates, special abilities, and characteristic ranges by species
 */

const SpeciesData = {
  abyssar: {
    movement: 20,
    abilities: ["Darkvision", "Devilish Appearance", "Magic Resistance (Abyssari)", "Spell-Like Abilities"],
    characteristics: { STR: [3, 18], CON: [6, 16], SIZ: [3, 18], DEX: [3, 18], INT: [8, 18], POW: [3, 18], CHA: [3, 18] }
  },
  
  bruxx: {
    movement: 20,
    abilities: [],
    characteristics: { STR: [12, 15], CON: [6, 21], SIZ: [9, 14], DEX: [6, 21], INT: [6, 21], POW: [3, 18], CHA: [3, 18] }
  },
  
  dwarf: {
    movement: 15,
    abilities: ["Darkvision", "Magic Resistance", "Poison Resistance", "Tunnel Sense"],
    characteristics: { STR: [11, 21], CON: [11, 21], SIZ: [10, 12], DEX: [3, 18], INT: [8, 18], POW: [3, 18], CHA: [3, 18] }
  },
  
  elf: {
    movement: 20,
    abilities: ["Elven Chain", "Resistance to Sleep and Charm", "Sharp Eyed", "Stealthy"],
    characteristics: { STR: [5, 15], CON: [3, 18], SIZ: [7, 12], DEX: [11, 21], INT: [9, 19], POW: [3, 18], CHA: [3, 18] }
  },
  
  gnome: {
    movement: 15,
    abilities: ["Darkvision", "Magic Resistance (Gnome)", "Poison Resistance", "Tunnel Sense"],
    characteristics: { STR: [3, 13], CON: [8, 18], SIZ: [7, 9], DEX: [5, 20], INT: [10, 20], POW: [3, 18], CHA: [3, 18] }
  },
  
  "half-elf": {
    movement: 20,
    abilities: ["Elven Chain", "Resistance to Sleep and Charm", "Sharp Eyed", "Stealthy"],
    characteristics: { STR: [3, 18], CON: [3, 18], SIZ: [7, 17], DEX: [3, 18], INT: [8, 18], POW: [3, 18], CHA: [3, 18] }
  },
  
  "half-orc": {
    movement: 20,
    abilities: ["Darkvision", "Survival Bonus"],
    characteristics: { STR: [9, 19], CON: [8, 18], SIZ: [9, 19], DEX: [3, 18], INT: [7, 17], POW: [3, 18], CHA: [3, 13] }
  },
  
  halfling: {
    movement: 15,
    abilities: ["Magic Resistance", "Poison Resistance", "Stealthy", "Exposure Tolerance"],
    characteristics: { STR: [2, 12], CON: [9, 19], SIZ: [7, 9], DEX: [6, 21], INT: [8, 18], POW: [3, 18], CHA: [7, 17] }
  },
  
  human: {
    movement: 20,
    abilities: ["Gifted", "Lucky"],
    characteristics: { STR: [3, 18], CON: [3, 18], SIZ: [8, 18], DEX: [3, 18], INT: [8, 18], POW: [3, 18], CHA: [3, 18] }
  },
  
  khelmar: {
    movement: 15,
    abilities: ["Amphibious", "Poison Resistance", "Cold-Blooded", "Shell Parry", "Swimmer"],
    characteristics: { STR: [12, 22], CON: [11, 21], SIZ: [7, 12], DEX: [5, 15], INT: [9, 19], POW: [3, 18], CHA: [3, 18] }
  },
  
  syrin: {
    movement: 20,
    flyingSpeed: 20,
    abilities: ["Diving Strike", "Flying", "Natural Light", "Magic Resistance", "Radiant Burst"],
    characteristics: { STR: [5, 15], CON: [3, 18], SIZ: [8, 13], DEX: [11, 21], INT: [10, 20], POW: [5, 14], CHA: [7, 22] }
  },
  
  vulpan: {
    movement: 20,
    abilities: ["Agile", "Camouflaged", "Darkvision", "Illusion Sensitivity", "Keen Senses", "Spell-Like Ability (Speak with Animals - foxes)", "Tail Balance"],
    characteristics: { STR: [8, 18], CON: [8, 18], SIZ: [7, 12], DEX: [6, 21], INT: [8, 18], POW: [3, 18], CHA: [5, 20] }
  }
};

/**
 * Get species data by name (case-insensitive, handles variations)
 * @param {string} speciesName - The species name
 * @returns {Object|null} - Species data or null
 */
SpeciesData.getSpecies = function(speciesName) {
  if (!speciesName) return null;
  
  const normalized = speciesName.toLowerCase().trim();
  
  // Direct match
  if (this[normalized]) {
    return this[normalized];
  }
  
  // Handle variations
  const variations = {
    'syrini': 'syrin',
    'half elf': 'half-elf',
    'halfelf': 'half-elf',
    'half orc': 'half-orc',
    'halforc': 'half-orc'
  };
  
  if (variations[normalized]) {
    return this[variations[normalized]];
  }
  
  // Partial match (e.g., "Syrin (something)")
  for (const key of Object.keys(this)) {
    if (typeof this[key] === 'object' && normalized.indexOf(key) !== -1) {
      return this[key];
    }
  }
  
  return null;
};

/**
 * Get movement rate for a species
 * @param {string} speciesName - The species name
 * @returns {number} - Movement rate (defaults to 20)
 */
SpeciesData.getMovement = function(speciesName) {
  const species = this.getSpecies(speciesName);
  return species ? species.movement : 20;
};

/**
 * Get flying speed for a species (if applicable)
 * @param {string} speciesName - The species name
 * @returns {number|null} - Flying speed or null
 */
SpeciesData.getFlyingSpeed = function(speciesName) {
  const species = this.getSpecies(speciesName);
  return species && species.flyingSpeed ? species.flyingSpeed : null;
};

/**
 * Get abilities for a species
 * @param {string} speciesName - The species name
 * @returns {Array} - Array of ability names
 */
SpeciesData.getAbilities = function(speciesName) {
  const species = this.getSpecies(speciesName);
  return species ? species.abilities : [];
};

/**
 * Check if an ability matches a species ability (fuzzy match for notes)
 * e.g., "Spell-Like Abilities (Produce Flame)" matches "Spell-Like Abilities"
 * @param {string} abilityWithNotes - The ability name possibly with notes
 * @param {string} baseAbility - The base ability name to match
 * @returns {boolean}
 */
SpeciesData.abilityMatches = function(abilityWithNotes, baseAbility) {
  if (!abilityWithNotes || !baseAbility) return false;
  
  const normalizedInput = abilityWithNotes.toLowerCase().trim();
  const normalizedBase = baseAbility.toLowerCase().trim();
  
  // Exact match
  if (normalizedInput === normalizedBase) return true;
  
  // Input starts with the base ability (e.g., "Spell-Like Abilities (Produce Flame)")
  if (normalizedInput.startsWith(normalizedBase)) return true;
  
  return false;
};

/**
 * Check if an ability is a species ability (with fuzzy matching)
 * @param {string} abilityName - The ability name (possibly with notes)
 * @param {string} speciesName - The species name
 * @returns {boolean}
 */
SpeciesData.isSpeciesAbility = function(abilityName, speciesName) {
  const abilities = this.getAbilities(speciesName);
  return abilities.some(baseAbility => this.abilityMatches(abilityName, baseAbility));
};

/**
 * Get list of all species names
 * @returns {Array}
 */
SpeciesData.getAllSpecies = function() {
  return Object.keys(this).filter(key => typeof this[key] === 'object' && !Array.isArray(this[key]));
};

/**
 * Get the maximum value for a characteristic for a species
 * @param {string} speciesName - The species name
 * @param {string} charName - The characteristic name (STR, CON, SIZ, DEX, INT, POW, CHA)
 * @returns {number|null} - Maximum value or null if not found
 */
SpeciesData.getCharacteristicMax = function(speciesName, charName) {
  const species = this.getSpecies(speciesName);
  if (!species || !species.characteristics) return null;
  
  const charUpper = charName.toUpperCase();
  if (species.characteristics[charUpper]) {
    return species.characteristics[charUpper][1]; // [min, max] - return max
  }
  return null;
};

/**
 * Get all characteristic maximums for a species
 * @param {string} speciesName - The species name
 * @returns {Object|null} - Object with characteristic maximums { STR: 18, CON: 18, ... } or null
 */
SpeciesData.getAllCharacteristicMaxes = function(speciesName) {
  const species = this.getSpecies(speciesName);
  if (!species || !species.characteristics) return null;
  
  const maxes = {};
  for (const char of ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA']) {
    if (species.characteristics[char]) {
      maxes[char] = species.characteristics[char][1];
    }
  }
  return maxes;
};

// Make available globally
window.SpeciesData = SpeciesData;
