/**
 * Class Spell Lists for Mythras Classic Fantasy
 * Spells are automatically added when a character has the class and sufficient rank
 */

const ClassSpellLists = {
  cleric: {
    cantrips: [
      "Avert",
      "Befuddle",
      "Calm",
      "Chill (Heat)",
      "Cleanse (Dishevel)",
      "Coordination",
      "Deflect",
      "Dry",
      "Fanaticism (Demoralize)",
      "Glamour (Repugnance)",
      "Ignite (Extinguish)",
      "Ironhand",
      "Might",
      "Polish",
      "Protection",
      "Spiritshield",
      "Voice"
    ],
    rank1: [
      "Bless (Curse)",
      "Ceremony",
      "Combine",
      "Command",
      "Create Water (Destroy Water)",
      "Cure Fatigue (Cause Fatigue)",
      "Cure Minor Wounds (Cause Minor Wounds)",
      "Detect Charm (Hide Charm)",
      "Detect Evil (Detect Good)",
      "Detect Magic",
      "Detect Poison",
      "Detect Undead",
      "Dust Devil",
      "Endure Heat/Cold",
      "Find Traps",
      "Invisibility to Undead",
      "Know Passions (Obscure Passions)",
      "Light (Darkness)",
      "Magical Stone",
      "Protection from Evil (Protection from Good)",
      "Purify Food and Drink (Contaminate Food and Drink)",
      "Remove Fear (Cause Fear)",
      "Sanctuary",
      "Silence",
      "Slow Poison"
    ],
    rank2: [
      "Aid",
      "Animate Dead",
      "Augury",
      "Breathe Water (Breathe Air)",
      "Chant",
      "Continual Light (Continual Darkness)",
      "Create Food and Water",
      "Cure Blindness or Deafness (Cause Blindness or Deafness)",
      "Cure Disease (Cause Disease)",
      "Cure Serious Wounds (Cause Serious Wounds)",
      "Dispel Magic",
      "Feign Death",
      "Fire Trap",
      "Flame Strike",
      "Flame Walk",
      "Heat Metal (Chill Metal)",
      "Hold Person",
      "Locate Object (Obscure Object)",
      "Neutralize Poison (Inflict Poison)",
      "Produce Flame",
      "Protection from Cold",
      "Protection from Fire",
      "Pyrotechnics",
      "Remove Curse (Bestow Curse)",
      "Remove Paralysis",
      "Sigil of Warding",
      "Speak with Animals",
      "Speak with Dead",
      "Spiritual Hammer",
      "Strength",
      "Water Walk"
    ],
    rank3: [
      "Aerial Servant",
      "Atonement",
      "Commune",
      "Cure Major Wounds (Cause Major Wounds)",
      "Detect Lie (Undetectable Lie)",
      "Dispel Evil (Banish Good)",
      "Divination",
      "Exorcism",
      "Free Action",
      "Legend Lore",
      "Lower Water (Raise Water)",
      "Plane Shift",
      "Prayer",
      "Protection from Evil 10' Radius (Protection from Good 10' Radius)",
      "Protection from Lightning",
      "Quest",
      "Raise Dead (Slay Living)",
      "Regenerate (Wither)",
      "Restoration",
      "Sticks to Snakes (Snakes to Sticks)",
      "Tongues (Confuse Tongues)",
      "True Sight (False Sight)"
    ],
    rank4: [
      "Animate Object",
      "Blade Barrier",
      "Conjure Animals",
      "Find the Path (Lose the Path)",
      "Forbiddance",
      "Heal (Harm)",
      "Heroes' Feast",
      "Speak with Monsters",
      "Word of Recall"
    ],
    rank5: [
      "Alter Reality",
      "Astral Spell",
      "Exaction",
      "Gate",
      "Holy Word (Unholy Word)",
      "Resurrection (Destruction)",
      "Succor",
      "Sun Ray",
      "Symbol"
    ]
  }
  // Additional classes can be added here (mage, druid, paladin, etc.)
};

/**
 * Get all spells a class has access to up to a given rank
 * @param {string} className - The class name (e.g., 'cleric')
 * @param {number} maxRank - The maximum rank (0-5)
 * @returns {Object} - Object with rank keys containing spell arrays
 */
ClassSpellLists.getSpellsForClassAndRank = function(className, maxRank) {
  const classKey = className.toLowerCase();
  const classList = this[classKey];
  if (!classList) return null;
  
  const result = {};
  const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
  
  for (let i = 0; i <= maxRank && i < rankKeys.length; i++) {
    const rankKey = rankKeys[i];
    if (classList[rankKey]) {
      result[rankKey] = [...classList[rankKey]];
    }
  }
  
  return result;
};

/**
 * Check if a spell belongs to a specific class
 * @param {string} spellName - The spell name
 * @param {string} className - The class name
 * @returns {boolean}
 */
ClassSpellLists.isClassSpell = function(spellName, className) {
  const classKey = className.toLowerCase();
  const classList = this[classKey];
  if (!classList) return false;
  
  const normalizedSpell = spellName.toLowerCase().trim();
  const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
  
  for (const rankKey of rankKeys) {
    if (classList[rankKey]) {
      for (const spell of classList[rankKey]) {
        if (spell.toLowerCase() === normalizedSpell) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Get all classes that provide a specific spell
 * @param {string} spellName - The spell name
 * @returns {Array} - Array of class names that have this spell
 */
ClassSpellLists.getClassesWithSpell = function(spellName) {
  const classes = [];
  const normalizedSpell = spellName.toLowerCase().trim();
  
  for (const className of Object.keys(this)) {
    if (typeof this[className] === 'object' && !Array.isArray(this[className])) {
      if (this.isClassSpell(spellName, className)) {
        classes.push(className);
      }
    }
  }
  return classes;
};

// Make available globally
window.ClassSpellLists = ClassSpellLists;
