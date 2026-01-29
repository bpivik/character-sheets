/**
 * Species Data for Mythras Classic Fantasy
 * Contains movement rates and special abilities by species
 */

const SpeciesData = {
  abyssar: {
    movement: 20,
    abilities: ["Darkvision", "Devilish Appearance", "Magic Resistance", "Spell-Like Abilities"]
  },
  
  dwarf: {
    movement: 15,
    abilities: ["Darkvision", "Magic Resistance", "Poison Resistance", "Tunnel Sense"]
  },
  
  elf: {
    movement: 20,
    abilities: ["Elven Chain", "Resistance to Sleep and Charm", "Sharp Eyed", "Stealthy"]
  },
  
  gnome: {
    movement: 15,
    abilities: ["Darkvision", "Magic Resistance", "Poison Resistance", "Tunnel Sense"]
  },
  
  "half-elf": {
    movement: 20,
    abilities: ["Elven Chain", "Resistance to Sleep and Charm", "Sharp Eyed", "Stealthy"]
  },
  
  "half-orc": {
    movement: 20,
    abilities: ["Darkvision", "Survival Bonus"]
  },
  
  halfling: {
    movement: 15,
    abilities: ["Magic Resistance", "Poison Resistance", "Stealthy", "Exposure Tolerance"]
  },
  
  human: {
    movement: 20,
    abilities: []
  },
  
  khelmar: {
    movement: 15,
    abilities: ["Amphibious", "Poison Resistance", "Cold-Blooded", "Shell Parry", "Swimmer"]
  },
  
  syrin: {
    movement: 20,
    flyingSpeed: 20,
    abilities: ["Diving Strike", "Flying", "Natural Light", "Magic Resistance", "Radiant Burst"]
  },
  
  vulpan: {
    movement: 20,
    abilities: ["Agile", "Camouflaged", "Darkvision", "Illusion Sensitivity", "Keen Senses", "Spell-Like Ability", "Tail Balance"]
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

// Make available globally
window.SpeciesData = SpeciesData;
