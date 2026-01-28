/* ============================================
   MYTHRAS CLASSIC FANTASY - WEAPON DATA
   Melee weapon autofill database
   ============================================ */

// Class Weapons Proficiencies
const CLASS_WEAPONS_DATA = {
  "bard": "Bastard sword, broadsword, club, dagger, dart, falchion, javelin, knife, longsword, rapier, scimitar, shortsword, sling, spear, and staff.",
  "berserker": "All armor, weapons, and shields.",
  "cavalier": "All melee weapons and shields. No ranged weapons, polearms, or two-handed weapons.",
  "cleric": "All shields (except Tower), all basic melee weapons.",
  "druid": "Club, dagger, dart, hammer, sickle, scimitar, wooden shield, sling, spear, staff, staff sling, and whip.",
  "fighter": "All armor, weapons, and shields.",
  "mage": "Daggers, darts, slings, quarterstaffs, and light crossbows only.",
  "monk": "Atlatl, bo stick, caltrop, club, crossbow, dagger, falchion, garrote, hatchet, javelin, jo stick, knife, polearm, quarterstaff, spear, and staff.",
  "paladin": "All armor, weapons, and shields.",
  "ranger": "All weapons and shields.",
  "rogue": "All shields (except Tower), all basic melee weapons, plus hand crossbows, longswords, rapiers, and shortswords.",
  "sorcerer": "Daggers, darts, slings, quarterstaffs, and light crossbows only."
};

// Weapon data format: [Hands, Damage, Size, Combat Effects, AP, HP, Traits]
const MELEE_WEAPON_DATA = {
  "ball & chain": ["2H", "1d6+1", "M", "Bash, Entangle, Stun Location", 2, 6, "Flexible"],
  "ball and chain": ["2H", "1d6+1", "M", "Bash, Entangle, Stun Location", 2, 6, "Flexible"],
  "1h bastard sword": ["1H", "1d8", "M", "Bleed, Impale", 2, 6, "–"],
  "2h bastard sword": ["2H", "1d10", "M", "Bleed, Impale, Sunder", 2, 6, "–"],
  "bastard sword": ["1H", "1d8", "M", "Bleed, Impale", 2, 6, "–"],
  "1h battle axe": ["1H", "1d6+1", "M", "Bleed", 4, 8, "–"],
  "2h battle axe": ["2H", "1d8", "L", "Bleed, Sunder", 4, 8, "–"],
  "1h battleaxe": ["1H", "1d6+1", "M", "Bleed", 4, 8, "–"],
  "2h battleaxe": ["2H", "1d8", "L", "Bleed, Sunder", 4, 8, "–"],
  "battleaxe": ["1H", "1d6+1", "M", "Bleed", 4, 8, "–"],
  "bo stick": ["2H", "1d8", "M", "Stun Location", 4, 8, "–"],
  "broadsword": ["1H", "1d8", "M", "Bleed, Impale", 6, 10, "–"],
  "buckler": ["1H", "1d3", "M", "Bash, Stun Location", 6, 9, "Ranged Parry; Passive Block 2 Locations"],
  "buckler shield": ["1H", "1d3", "M", "Bash, Stun Location", 6, 9, "Ranged Parry; Passive Block 2 Locations"],
  "chain": ["1H", "1d4", "M", "Entangle", 8, 6, "Flexible"],
  "club": ["1H", "1d6", "M", "Bash, Stun Location", 4, 4, "–"],
  "dagger": ["1H", "1d4+1", "S", "Bleed, Impale", 6, 8, "Thrown"],
  "falchion": ["1H", "1d6+2", "M", "Bleed", 6, 10, "–"],
  "flail": ["1H", "1d6", "M", "Bash", 3, 6, "Flexible"],
  "flail, heavy": ["2H", "1d10", "L", "Bash, Stun Location", 4, 10, "Flexible"],
  "heavy flail": ["2H", "1d10", "L", "Bash, Stun Location", 4, 10, "Flexible"],
  "garrote": ["2H", "1d2", "S", "–", 1, 2, "Stealth"],
  "glaive": ["2H", "1d10+2", "L", "Bleed, Sunder", 4, 10, "–"],
  "great axe": ["2H", "2d6+2", "H", "Bleed, Sunder", 4, 10, "–"],
  "greataxe": ["2H", "2d6+2", "H", "Bleed, Sunder", 4, 10, "–"],
  "great club": ["2H", "2d6", "H", "Bash, Stun Location", 4, 10, "–"],
  "greatclub": ["2H", "2d6", "H", "Bash, Stun Location", 4, 10, "–"],
  "great hammer": ["2H", "1d10+3", "H", "Bash, Stun Location, Sunder", 4, 10, "–"],
  "greathammer": ["2H", "1d10+3", "H", "Bash, Stun Location, Sunder", 4, 10, "–"],
  "great sword": ["2H", "2d8", "H", "Bleed, Impale, Sunder", 6, 12, "–"],
  "greatsword": ["2H", "2d8", "H", "Bleed, Impale, Sunder", 6, 12, "–"],
  "halberd": ["2H", "1d8+2", "L", "Entangle, Impale, Sunder", 4, 10, "Set"],
  "hand axe": ["1H", "1d6", "S", "Bleed", 3, 6, "Thrown"],
  "handaxe": ["1H", "1d6", "S", "Bleed", 3, 6, "Thrown"],
  "poleaxe": ["2H", "1d8+2", "L", "Entangle, Impale, Sunder", 4, 10, "Set"],
  "hatchet": ["1H", "1d6", "S", "Bleed", 4, 6, "Thrown"],
  "heater": ["1H", "1d4", "L", "Bash, Stun Location", 6, 12, "Ranged Parry; Passive Block 3 Locations"],
  "heater shield": ["1H", "1d4", "L", "Bash, Stun Location", 6, 12, "Ranged Parry; Passive Block 3 Locations"],
  "hoplite": ["1H", "1d4", "H", "Bash, Stun Location", 6, 15, "Ranged Parry; Passive Block 4 Locations"],
  "hoplite shield": ["1H", "1d4", "H", "Bash, Stun Location", 6, 15, "Ranged Parry; Passive Block 4 Locations"],
  "horseman's flail": ["1H", "1d6", "M", "Bash", 3, 6, "Flexible"],
  "horseman's mace": ["1H", "1d8", "M", "Bash, Stun Location", 6, 10, "–"],
  "horseman's military pick": ["1H", "1d6+1", "M", "Stun Location, Sunder", 6, 10, "–"],
  "improvised": ["1H", "1d6-1", "S-M", "As appropriate", "–", "–", "Improvised"],
  "jo stick": ["2H", "1d4", "M", "Stun Location", 3, 4, "Oriental"],
  "kite": ["1H", "1d4", "H", "Bash, Stun Location", 4, 15, "Ranged Parry; Passive Block 4 Locations"],
  "kite shield": ["1H", "1d4", "H", "Bash, Stun Location", 4, 15, "Ranged Parry; Passive Block 4 Locations"],
  "knife": ["1H", "1d3", "S", "Bleed, Impale", 5, 4, "–"],
  "lance": ["2H", "1d10+2", "H", "Impale, Sunder", 4, 10, "Mount"],
  "longspear": ["2H", "1d10+1", "L", "Impale", 4, 10, "Set"],
  "long spear": ["2H", "1d10+1", "L", "Impale", 4, 10, "Set"],
  "longsword": ["1H", "1d8", "M", "Bleed, Impale", 6, 12, "–"],
  "long sword": ["1H", "1d8", "M", "Bleed, Impale", 6, 12, "–"],
  "main gauche": ["1H", "1d4", "S", "Bleed, Impale", 6, 10, "Entrapping"],
  "mace": ["1H", "1d8", "M", "Bash, Stun Location", 6, 6, "–"],
  "mace, heavy": ["1H", "1d8+2", "M", "Bash, Stun Location", 6, 10, "–"],
  "heavy mace": ["1H", "1d8+2", "M", "Bash, Stun Location", 6, 10, "–"],
  "military flail": ["2H", "1d10", "L", "Bash, Stun Location", 4, 10, "Flexible"],
  "military pick": ["1H", "1d6+1", "M", "Stun Location, Sunder", 6, 10, "–"],
  "military pick, heavy": ["1H", "1d8+2", "M", "Stun Location, Sunder", 6, 10, "–"],
  "heavy military pick": ["1H", "1d8+2", "M", "Stun Location, Sunder", 6, 10, "–"],
  "morning star": ["1H", "2d4", "M", "Bash, Stun Location", 4, 10, "–"],
  "morningstar": ["1H", "2d4", "M", "Bash, Stun Location", 4, 10, "–"],
  "net": ["1H", "1d4", "L", "Entangle", 2, 20, "Entrapping"],
  "peltast": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 3 Locations"],
  "peltast shield": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 3 Locations"],
  "pike": ["2H", "1d10+2", "L", "Impale", 4, 12, "Set"],
  "polearm": ["2H", "1d8+2", "L", "Entangle, Impale, Sunder", 4, 10, "Set"],
  "quarterstaff": ["2H", "1d8", "M", "Stun Location", 4, 8, "–"],
  "rapier": ["1H", "1d8", "M", "Impale", 5, 8, "–"],
  "rhomphaia": ["2H", "1d10+2", "L", "Bleed, Sunder", 4, 10, "–"],
  "round": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 4 Locations"],
  "round shield": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 4 Locations"],
  "sabre": ["1H", "1d6+1", "M", "Bleed, Impale", 6, 8, "–"],
  "saber": ["1H", "1d6+1", "M", "Bleed, Impale", 6, 8, "–"],
  "sarissa": ["2H", "1d10+2", "L", "Impale", 4, 12, "Set"],
  "scimitar": ["1H", "1d8", "M", "Bleed", 6, 10, "–"],
  "scutum": ["1H", "1d4", "H", "Bash, Stun Location", 4, 18, "Ranged Parry; Passive Block 5 Locations"],
  "scutum shield": ["1H", "1d4", "H", "Bash, Stun Location", 4, 18, "Ranged Parry; Passive Block 5 Locations"],
  "shortspear": ["1H", "1d8+1", "M", "Impale", 4, 5, "Set, Throw"],
  "short spear": ["1H", "1d8+1", "M", "Impale", 4, 5, "Set, Throw"],
  "shortsword": ["1H", "1d6", "M", "Bleed, Impale", 6, 8, "–"],
  "short sword": ["1H", "1d6", "M", "Bleed, Impale", 6, 8, "–"],
  "sickle": ["1H", "1d6", "M", "Bleed, Impale", 3, 8, "–"],
  "stone axe": ["1H", "1d8-1", "M", "Bleed, Stun Location", 3, 6, "Primitive, Stone"],
  "stone hatchet": ["1H", "1d6-1", "S", "Bleed, Impale, Stun Location", 2, 4, "Primitive, Stone"],
  "stone knife": ["1H", "1d3-1", "S", "Bleed, Impale", 4, 3, "Primitive, Stone"],
  "stone shortspear": ["1H", "1d8-1", "M", "Impale", 4, 5, "Primitive, Set, Stone"],
  "stone sickle": ["1H", "1d6-1", "M", "Bleed", 2, 4, "–"],
  "target": ["1H", "1d3+1", "L", "Bash, Impale", 4, 9, "Ranged Parry; Passive Block 3 Locations"],
  "target shield": ["1H", "1d3+1", "L", "Bash, Impale", 4, 9, "Ranged Parry; Passive Block 3 Locations"],
  "tower": ["1H", "1d4", "H", "Bash, Stun Location", 4, 18, "Ranged Parry; Passive Block 5 Locations"],
  "tower shield": ["1H", "1d4", "H", "Bash, Stun Location", 4, 18, "Ranged Parry; Passive Block 5 Locations"],
  "trident": ["1H", "1d8", "M", "Impale", 4, 10, "Barbed, Thrown"],
  "unarmed": ["1H", "1d3", "S", "–", 0, 0, "–"],
  "viking": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 4 Locations"],
  "viking shield": ["1H", "1d4", "L", "Bash, Stun Location", 4, 12, "Ranged Parry; Passive Block 4 Locations"],
  "war hammer": ["1H", "1d8+1", "M", "Stun Location", 3, 8, "–"],
  "warhammer": ["1H", "1d8+1", "M", "Stun Location", 3, 8, "–"],
  "whip": ["1H", "1d3", "M", "Stun Location, Entangle", 2, 8, "Flexible, Entrapping"],
  "xyston": ["2H", "1d10", "L", "Impale", 4, 10, "Set, Double Ended"]
};

// Weapon index for fuzzy matching (built on first lookup)
let weaponIndexBuilt = false;
let weaponIndex = [];
let variantBases = {};

/**
 * Squeeze string - lowercase and remove all non-alphanumerics
 * "Long Sword", "long-sword", "longsword" all become "longsword"
 */
function squeeze(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Build weapon index for fuzzy matching
 */
function buildWeaponIndex() {
  if (weaponIndexBuilt) return;
  
  weaponIndex = [];
  variantBases = {};
  
  for (const k in MELEE_WEAPON_DATA) {
    if (!MELEE_WEAPON_DATA.hasOwnProperty(k)) continue;
    const sq = squeeze(k);
    weaponIndex.push({ key: k, squeeze: sq });
    
    // Track 1H/2H variant families
    if (/^(1h|2h)\s+/i.test(k)) {
      const base = k.replace(/^(1h|2h)\s+/i, '');
      const baseSq = squeeze(base);
      if (!variantBases[base]) {
        variantBases[base] = { oneH: null, twoH: null, baseSqueeze: baseSq };
      }
      if (/^1h\s+/i.test(k)) variantBases[base].oneH = k;
      if (/^2h\s+/i.test(k)) variantBases[base].twoH = k;
    }
  }
  
  // Sort by squeeze length (longest first) to avoid partial matches
  weaponIndex.sort((a, b) => b.squeeze.length - a.squeeze.length);
  weaponIndexBuilt = true;
}

/**
 * Choose 1H or 2H variant based on user text
 */
function chooseVariantForBase(baseName, userText) {
  const fam = variantBases[baseName];
  if (!fam) return null;
  
  const t = (userText || '').toLowerCase();
  const twoHandHint = /(^|\W)(2h|twohand(ed)?|two[-\s]?hand(ed)?)(\W|$)/.test(t);
  
  if (twoHandHint && fam.twoH) return fam.twoH;
  if (!twoHandHint && fam.oneH) return fam.oneH;
  
  return fam.oneH || fam.twoH || null;
}

/**
 * Find the best weapon key from user input
 * Handles "+3 Longsword of Doom" → "longsword"
 */
function findWeaponKey(userText) {
  buildWeaponIndex();
  const z = squeeze(userText);
  
  if (!z) return null;
  
  // Pass 1: look for exact key squeezes as substrings (longest-first)
  for (let i = 0; i < weaponIndex.length; i++) {
    const it = weaponIndex[i];
    if (z.indexOf(it.squeeze) !== -1) {
      return it.key;
    }
  }
  
  // Pass 2: check base families (e.g., "bastard sword" without 1H/2H)
  for (const base in variantBases) {
    if (!variantBases.hasOwnProperty(base)) continue;
    const fam = variantBases[base];
    if (z.indexOf(fam.baseSqueeze) !== -1) {
      const chosen = chooseVariantForBase(base, userText);
      if (chosen) return chosen;
    }
  }
  
  return null;
}

/**
 * Get character's damage modifier
 */
function getDamageMod() {
  const dmgModSpan = document.getElementById('damage-mod');
  if (!dmgModSpan) return '';
  
  let t = (dmgModSpan.textContent || '').trim();
  if (!t) return '';
  
  // Collapse spaces
  t = t.replace(/\s+/g, '');
  
  // Treat common "no-op" values as zero
  if (t === '+0' || t === '0' || t === '+0d0' || t === '±0' || t === '--' || t === '–') return '';
  
  // If no explicit sign, assume "+"
  if (!/^[+\-]/.test(t)) t = '+' + t;
  
  return t;
}

/**
 * Compose damage with character's damage modifier
 */
function composeDamage(baseDamage) {
  const mod = getDamageMod();
  if (!mod) return baseDamage;
  if (baseDamage.endsWith(mod)) return baseDamage;
  return baseDamage + mod;
}

/**
 * Autofill melee weapon fields based on weapon name
 * @param {number} index - The weapon row index (0-5)
 * @param {string} weaponName - The name entered by user
 */
function autofillMeleeWeapon(index, weaponName) {
  if (!weaponName || weaponName.trim() === '') {
    // Clear all fields when name is emptied
    clearMeleeWeaponFields(index);
    return false;
  }
  
  const resolvedKey = findWeaponKey(weaponName);
  if (!resolvedKey || !(resolvedKey in MELEE_WEAPON_DATA)) {
    return false;
  }
  
  const data = MELEE_WEAPON_DATA[resolvedKey];
  // data format: [Hands, Damage, Size, Combat Effects, AP, HP, Traits]
  
  const handsInput = document.getElementById(`melee-${index}-hands`);
  const damageInput = document.getElementById(`melee-${index}-damage`);
  const sizeInput = document.getElementById(`melee-${index}-size`);
  const effectsInput = document.getElementById(`melee-${index}-effects`);
  const aphpInput = document.getElementById(`melee-${index}-aphp`);
  const traitsInput = document.getElementById(`melee-${index}-traits`);
  
  const composedDamage = composeDamage(data[1]);
  const aphpValue = `${data[4]}/${data[5]}`;
  
  // Fill fields (only if empty)
  if (handsInput && !handsInput.value.trim()) handsInput.value = data[0];
  if (damageInput && !damageInput.value.trim()) damageInput.value = composedDamage;
  if (sizeInput && !sizeInput.value.trim()) sizeInput.value = data[2];
  if (effectsInput && !effectsInput.value.trim()) effectsInput.value = data[3];
  if (aphpInput && !aphpInput.value.trim()) aphpInput.value = aphpValue;
  if (traitsInput && !traitsInput.value.trim()) traitsInput.value = data[6];
  
  return true;
}

/**
 * Clear all melee weapon fields for a row
 * @param {number} index - The weapon row index (0-5)
 */
function clearMeleeWeaponFields(index) {
  const fields = ['hands', 'damage', 'size', 'effects', 'aphp', 'traits'];
  fields.forEach(field => {
    const input = document.getElementById(`melee-${index}-${field}`);
    if (input) input.value = '';
  });
}

/**
 * Get weapons proficiency for a single class
 * @param {string} className - The class name
 * @returns {string|null} - Weapons description or null if not found
 */
function getClassWeapons(className) {
  if (!className) return null;
  const key = className.trim().toLowerCase();
  return CLASS_WEAPONS_DATA[key] || null;
}

// Basic melee weapons list (for reference when combining)
const BASIC_MELEE_WEAPONS = [
  'club', 'dagger', 'great club', 'greatclub', 'hand axe', 'handaxe', 'hatchet', 
  'longspear', 'mace', 'heavy mace', 'mace, heavy', 'morning star', 'morningstar',
  'quarterstaff', 'bo stick', 'shortspear', 'sickle', 
  'stone axe', 'stone greataxe', 'stone hatchet', 'stone knife', 'stone shortspear', 'stone sickle'
];

// Martial melee weapons list
const MARTIAL_MELEE_WEAPONS = [
  'ball & chain', 'ball and chain', 'bastard sword', 'battleaxe', 'battle axe', 'bill',
  'broadsword', 'chain', 'falchion', 'flail', 'heavy flail', 'flail, heavy',
  'garrote', 'glaive', 'rhomphaia', 'great axe', 'greataxe', 'great hammer', 'greathammer',
  'great sword', 'greatsword', 'halberd', 'poleaxe', 'horseman\'s flail', 'horseman\'s mace',
  'horseman\'s military pick', 'jo stick', 'knife', 'lance', 'longsword', 'long sword',
  'main gauche', 'military pick', 'heavy military pick', 'military pick, heavy',
  'net', 'pike', 'sarissa', 'rapier', 'saber', 'scimitar', 'shortsword', 'short sword',
  'trident', 'war hammer', 'warhammer', 'whip', 'xyston'
];

// Shield types
const SHIELDS = ['buckler', 'heater', 'kite', 'tower', 'wooden shield', 'target'];

// Ranged weapons
const RANGED_WEAPONS = [
  'bow', 'shortbow', 'longbow', 'crossbow', 'light crossbow', 'heavy crossbow', 
  'hand crossbow', 'sling', 'dart', 'javelin', 'atlatl', 'staff sling'
];

/**
 * Parse a weapons string into categories and specific weapons
 */
function parseWeaponsString(weaponsStr) {
  const result = {
    allWeapons: false,
    allMelee: false,
    allBasicMelee: false,
    allShields: false,
    allShieldsExceptTower: false,
    specificWeapons: [],
    specificShields: [],
    ranged: [],
    restrictions: []
  };
  
  if (!weaponsStr) return result;
  
  const lower = weaponsStr.toLowerCase();
  
  // Check for broad categories
  if (lower.includes('all armor, weapons, and shields') || lower.includes('all weapons and shields')) {
    result.allWeapons = true;
    result.allShields = true;
    return result;
  }
  
  if (lower.includes('all melee weapons')) {
    result.allMelee = true;
  }
  
  if (lower.includes('all basic melee weapons')) {
    result.allBasicMelee = true;
  }
  
  if (lower.includes('all shields (except tower)')) {
    result.allShieldsExceptTower = true;
  } else if (lower.includes('all shields')) {
    result.allShields = true;
  }
  
  // Check for restrictions
  if (lower.includes('no ranged weapons')) {
    result.restrictions.push('no ranged');
  }
  if (lower.includes('no polearms')) {
    result.restrictions.push('no polearms');
  }
  if (lower.includes('no two-handed weapons')) {
    result.restrictions.push('no two-handed');
  }
  
  // Parse individual weapons - split by commas and "and"
  const weaponsList = weaponsStr
    .replace(/\.$/, '')
    .replace(/ and /gi, ', ')
    .replace(/ plus /gi, ', ')
    .split(',')
    .map(w => w.trim().toLowerCase())
    .filter(w => w && w.length > 1);
  
  weaponsList.forEach(weapon => {
    // Skip category phrases
    if (weapon.includes('all ') || weapon.includes('only') || weapon.includes('no ')) return;
    
    // Check if it's a shield
    if (SHIELDS.some(s => weapon.includes(s))) {
      if (!result.specificShields.includes(weapon)) {
        result.specificShields.push(weapon);
      }
      return;
    }
    
    // Check if it's ranged
    if (RANGED_WEAPONS.some(r => weapon.includes(r))) {
      if (!result.ranged.includes(weapon)) {
        result.ranged.push(weapon);
      }
      return;
    }
    
    // It's a melee weapon
    if (!result.specificWeapons.includes(weapon)) {
      result.specificWeapons.push(weapon);
    }
  });
  
  return result;
}

/**
 * Combine weapons from multiple classes
 * @param {string[]} classes - Array of class names
 * @returns {string} - Combined weapons description
 */
function combineClassWeapons(classes) {
  if (!classes || classes.length === 0) return '';
  
  // Filter out empty classes and get their weapons
  const validClasses = classes.filter(c => c && c.trim());
  
  if (validClasses.length === 0) return '';
  
  // If only one class, just return its weapons
  if (validClasses.length === 1) {
    return getClassWeapons(validClasses[0]) || '';
  }
  
  // Parse each class's weapons
  const parsedList = validClasses.map(c => ({
    name: c.trim(),
    weapons: getClassWeapons(c),
    parsed: parseWeaponsString(getClassWeapons(c))
  })).filter(c => c.weapons);
  
  if (parsedList.length === 0) return '';
  
  // Combine the parsed results
  const combined = {
    allWeapons: false,
    allMelee: false,
    allBasicMelee: false,
    allShields: false,
    allShieldsExceptTower: false,
    specificWeapons: new Set(),
    ranged: new Set(),
    restrictions: []
  };
  
  parsedList.forEach(p => {
    if (p.parsed.allWeapons) combined.allWeapons = true;
    if (p.parsed.allMelee) combined.allMelee = true;
    if (p.parsed.allBasicMelee) combined.allBasicMelee = true;
    if (p.parsed.allShields) combined.allShields = true;
    if (p.parsed.allShieldsExceptTower) combined.allShieldsExceptTower = true;
    
    p.parsed.specificWeapons.forEach(w => combined.specificWeapons.add(w));
    p.parsed.ranged.forEach(r => combined.ranged.add(r));
  });
  
  // If someone has all weapons, that's the answer
  if (combined.allWeapons) {
    return "All weapons and shields.";
  }
  
  // Build the output
  const parts = [];
  
  // Melee section
  if (combined.allMelee) {
    parts.push("All melee weapons");
  } else if (combined.allBasicMelee) {
    // Filter out basic weapons from specific list, keep martial
    const martialWeapons = [...combined.specificWeapons].filter(w => {
      const isBasic = BASIC_MELEE_WEAPONS.some(b => w.includes(b) || b.includes(w));
      return !isBasic;
    });
    
    if (martialWeapons.length > 0) {
      parts.push("All basic melee weapons, " + martialWeapons.join(', '));
    } else {
      parts.push("All basic melee weapons");
    }
  } else if (combined.specificWeapons.size > 0) {
    parts.push([...combined.specificWeapons].join(', '));
  }
  
  // Shields section
  if (combined.allShields) {
    parts.push("all shields");
  } else if (combined.allShieldsExceptTower) {
    parts.push("all shields (except Tower)");
  }
  
  // Ranged section
  if (combined.ranged.size > 0) {
    parts.push([...combined.ranged].join(', '));
  }
  
  // Capitalize first letter and add period
  let result = parts.join('; ');
  if (result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
    if (!result.endsWith('.')) result += '.';
  }
  
  return result;
}

// Export for use in app.js
window.WeaponData = {
  MELEE_WEAPON_DATA,
  CLASS_WEAPONS_DATA,
  findWeaponKey,
  autofillMeleeWeapon,
  clearMeleeWeaponFields,
  composeDamage,
  getClassWeapons,
  combineClassWeapons
};
