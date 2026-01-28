/* ============================================
   MYTHRAS CLASSIC FANTASY - WEAPON DATA
   Melee weapon autofill database
   ============================================ */

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

// Export for use in app.js
window.WeaponData = {
  MELEE_WEAPON_DATA,
  findWeaponKey,
  autofillMeleeWeapon,
  clearMeleeWeaponFields,
  composeDamage
};
