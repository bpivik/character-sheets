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

// Ranged Weapon Database
// Format: [Hands, Damage, DmgMod, Range, Load, Special Effects, Impale Size, AP, HP, Traits]
const RANGED_WEAPON_DATA = {
  "atlatl": ["1H", "–", "+1 Step", "0/+30/+60", "–", "–", "–", 1, 4, "Primitive"],
  "arbalest": ["2H", "1d12", "N", "270/540/1080", "4", "Impale, Sunder", "S", 4, 10, "–"],
  "blowgun": ["1H", "–", "N", "30/60/90", "1", "Impale", "–", 1, 4, "–"],
  "bolas": ["1H", "1d4", "N", "30/75/150", "–", "Entangle", "–", 2, 2, "–"],
  "composite short bow": ["2H", "1d6", "Y", "50/325/650", "2", "Impale", "S", 4, 5, "–"],
  "composite shortbow": ["2H", "1d6", "Y", "50/325/650", "2", "Impale", "S", 4, 5, "–"],
  "composite long bow": ["2H", "1d8", "Y", "50/400/800", "2", "Impale", "S", 4, 8, "–"],
  "composite longbow": ["2H", "1d8", "Y", "50/400/800", "2", "Impale", "S", 4, 8, "–"],
  "recurve bow": ["2H", "1d8", "Y", "45/375/750", "2", "Impale", "S", 4, 8, "–"],
  "dagger": ["1H", "1d4", "Y", "15/30/60", "–", "Impale", "S", 4, 6, "–"],
  "dart": ["1H", "1d4", "Y", "15/30/60", "–", "Impale", "S", 2, 1, "–"],
  "discus": ["1H", "1d4+1", "Y", "5/20/40", "–", "Stun Location", "–", 2, 3, "–"],
  "hand crossbow": ["1H", "1d4", "N", "30/60/150", "2", "Impale", "S", 4, 3, "Dark Elf"],
  "hatchet": ["1H", "1d6", "Y", "30/60/90", "–", "Bleed", "–", 4, 6, "–"],
  "heavy crossbow": ["2H", "1d10", "N", "60/450/900", "4", "Impale, Sunder", "S", 4, 8, "–"],
  "crossbow, heavy": ["2H", "1d10", "N", "60/450/900", "4", "Impale, Sunder", "S", 4, 8, "–"],
  "handaxe": ["1H", "1d6", "Y", "30/60/90", "–", "Bleed", "–", 4, 6, "Primitive"],
  "hand axe": ["1H", "1d6", "Y", "30/60/90", "–", "Bleed", "–", 4, 6, "Primitive"],
  "heavy crossbow, repeating": ["2H", "1d10", "N", "60/450/900", "–", "Impale, Sunder", "S", 4, 8, "Dwarf, Repeating"],
  "repeating heavy crossbow": ["2H", "1d10", "N", "60/450/900", "–", "Impale, Sunder", "S", 4, 8, "Dwarf, Repeating"],
  "javelin": ["1H", "1d8+1", "Y", "30/60/150", "–", "Impale, Pin Weapon (Shield)", "M", 3, 8, "–"],
  "light crossbow": ["2H", "1d8", "N", "60/300/600", "3", "Impale", "S", 4, 5, "–"],
  "crossbow, light": ["2H", "1d8", "N", "60/300/600", "3", "Impale", "S", 4, 5, "–"],
  "crossbow": ["2H", "1d8", "N", "60/300/600", "3", "Impale", "S", 4, 5, "–"],
  "repeating light crossbow": ["2H", "1d8", "N", "60/300/600", "–", "Impale", "S", 4, 5, "Dwarf, Repeating"],
  "longbow": ["2H", "1d8", "Y", "45/375/750", "2", "Impale", "S", 4, 7, "–"],
  "long bow": ["2H", "1d8", "Y", "45/375/750", "2", "Impale", "S", 4, 7, "–"],
  "bow, long": ["2H", "1d8", "Y", "45/375/750", "2", "Impale", "S", 4, 7, "–"],
  "bow": ["2H", "1d6", "Y", "45/300/600", "2", "Impale", "S", 4, 4, "–"],
  "net": ["1H", "–", "N", "10/15/30", "–", "Entangle", "–", 2, 20, "–"],
  "primitive bow": ["2H", "1d6-1", "Y", "30/150/300", "2", "Impale", "S", 3, 3, "Stone"],
  "short bow": ["2H", "1d6", "Y", "45/300/600", "2", "Impale", "S", 4, 4, "–"],
  "bow, short": ["2H", "1d6", "Y", "45/300/600", "2", "Impale", "S", 4, 4, "–"],
  "shortbow": ["2H", "1d6", "Y", "45/300/600", "2", "Impale", "S", 4, 4, "–"],
  "shortspear": ["1H", "1d8", "Y", "30/45/90", "–", "Impale", "M", 4, 5, "–"],
  "short spear": ["1H", "1d8", "Y", "30/45/90", "–", "Impale", "M", 4, 5, "–"],
  "spear": ["1H", "1d8", "Y", "30/45/90", "–", "Impale", "M", 4, 5, "–"],
  "sling": ["1H", "1d6", "N", "30/450/900", "3", "Stun Location", "–", 1, 2, "–"],
  "staff sling": ["2H", "2d6", "N", "15/75/150", "4", "Stun Location", "–", 3, 6, "–"],
  "stone": ["1H", "1d3", "Y", "15/75/150", "–", "Stun Location", "–", 0, 0, "–"],
  "rock": ["1H", "1d3", "Y", "15/75/150", "–", "Stun Location", "–", 0, 0, "–"],
  "stone hatchet": ["1H", "1d6-1", "Y", "15/30/60", "–", "Bleed, Impale, Stun Location", "S", 2, 4, "–"],
  "stone shortspear": ["1H", "1d8-1", "Y", "30/45/90", "–", "Impale", "M", 4, 5, "–"],
  "stone short spear": ["1H", "1d8-1", "Y", "30/45/90", "–", "Impale", "M", 4, 5, "–"],
  "trident": ["1H", "1d8", "Y", "30/45/90", "–", "Impale", "M", 4, 10, "Barbed"],
  "throwing knife": ["1H", "1d4", "Y", "15/30/60", "–", "Impale", "S", 4, 6, "–"],
  "throwing axe": ["1H", "1d6", "Y", "30/60/90", "–", "Bleed", "–", 4, 6, "–"]
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
 * Reads from damage-mod-current if set, otherwise damage-mod-original
 */
function getDamageMod() {
  // First check current (user override), then original (calculated)
  const dmgCurrent = document.getElementById('damage-mod-current');
  const dmgOriginal = document.getElementById('damage-mod-original');
  
  let t = '';
  if (dmgCurrent && dmgCurrent.value.trim()) {
    t = dmgCurrent.value.trim();
  } else if (dmgOriginal && dmgOriginal.value.trim()) {
    t = dmgOriginal.value.trim();
  }
  
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
 * Get Weapon Precision damage modifier (STR+DEX based)
 * Returns empty string if Weapon Precision is not active or no benefit
 */
function getWPDamageMod() {
  const wpCurrent = document.getElementById('wp-damage-mod-current');
  const wpOriginal = document.getElementById('wp-damage-mod-original');
  const wpRow = document.getElementById('wp-damage-row');
  
  // Check if WP is active (row is visible)
  if (!wpRow || wpRow.style.display === 'none') return '';
  
  let t = '';
  if (wpCurrent && wpCurrent.value.trim()) {
    t = wpCurrent.value.trim();
  } else if (wpOriginal && wpOriginal.value.trim()) {
    t = wpOriginal.value.trim();
  }
  
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
 * List of weapons eligible for Weapon Precision
 * Includes variations and aliases
 */
const WP_ELIGIBLE_WEAPONS = [
  'club', 'clubs',
  'dagger', 'daggers', 'throwing dagger',
  'garrote', 'garrotes', 'garotte',
  'knife', 'knives', 'throwing knife', 'stone knife',
  'shortsword', 'short sword', 'shortswords', 'short swords',
  'main gauche', 'main-gauche', 'maingauche',
  'rapier', 'rapiers',
  'unarmed', 'unarmed strike', 'unarmed attack', 'fist', 'kick',
  'dart', 'darts',
  'sling', 'slings',
  'short bow', 'shortbow', 'short bows', 'shortbows',
  'javelin', 'javelins'
];

/**
 * Check if a weapon is eligible for Weapon Precision
 * @param {string} weaponName - The weapon name to check
 * @returns {boolean} - True if eligible
 */
function isWPEligibleWeapon(weaponName) {
  if (!weaponName) return false;
  const normalizedName = weaponName.trim().toLowerCase();
  return WP_ELIGIBLE_WEAPONS.some(w => normalizedName.includes(w) || w.includes(normalizedName));
}

/**
 * Compose damage with character's damage modifier
 * @param {string} baseDamage - The weapon's base damage (e.g., "1d4+1")
 * @param {string} weaponName - Optional weapon name for Weapon Precision check
 */
function composeDamage(baseDamage, weaponName = null) {
  // Determine which damage modifier to use
  let mod = '';
  
  if (weaponName && isWPEligibleWeapon(weaponName)) {
    // For WP-eligible weapons, use WP damage mod if active and better
    const wpMod = getWPDamageMod();
    const stdMod = getDamageMod();
    
    // Use WP mod if available, otherwise fall back to standard
    mod = wpMod || stdMod;
  } else {
    // Standard weapons always use standard damage mod
    mod = getDamageMod();
  }
  
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
  const nameInput = document.getElementById(`melee-${index}-name`);
  
  if (!weaponName || weaponName.trim() === '') {
    // Clear all fields when name is emptied
    clearMeleeWeaponFields(index);
    // Clear the user-modified flag so next weapon can autofill
    if (nameInput) delete nameInput.dataset.userModified;
    return false;
  }
  
  // If this row has been user-modified, don't autofill
  if (nameInput && nameInput.dataset.userModified === 'true') {
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
  
  const baseDamage = data[1];
  const composedDamage = composeDamage(baseDamage, weaponName);
  const aphpValue = `${data[4]}/${data[5]}`;
  
  // Fill fields (only if empty)
  if (handsInput && !handsInput.value.trim()) handsInput.value = data[0];
  if (damageInput && !damageInput.value.trim()) {
    damageInput.value = composedDamage;
    damageInput.dataset.baseDamage = baseDamage; // Store base damage for recalculation
    damageInput.dataset.weaponName = weaponName; // Store weapon name for WP check
  }
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
    if (input) {
      input.value = '';
      if (field === 'damage') {
        delete input.dataset.baseDamage;
      }
    }
  });
  // Clear the userModified flag on the name input
  const nameInput = document.getElementById(`melee-${index}-name`);
  if (nameInput) delete nameInput.dataset.userModified;
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

// Ranged weapon index for fuzzy matching (built on first lookup)
let rangedIndexBuilt = false;
let rangedIndex = [];

/**
 * Build ranged weapon index for fuzzy matching
 */
function buildRangedWeaponIndex() {
  if (rangedIndexBuilt) return;
  
  rangedIndex = [];
  
  for (const k in RANGED_WEAPON_DATA) {
    if (!RANGED_WEAPON_DATA.hasOwnProperty(k)) continue;
    const sq = squeeze(k);
    rangedIndex.push({ key: k, squeeze: sq });
  }
  
  // Sort by squeeze length (longest first) to avoid partial matches
  rangedIndex.sort((a, b) => b.squeeze.length - a.squeeze.length);
  rangedIndexBuilt = true;
}

/**
 * Find the best ranged weapon key from user input
 */
function findRangedWeaponKey(userText) {
  buildRangedWeaponIndex();
  const z = squeeze(userText);
  
  if (!z) return null;
  
  // Look for exact key squeezes as substrings (longest-first)
  for (let i = 0; i < rangedIndex.length; i++) {
    const it = rangedIndex[i];
    if (z.indexOf(it.squeeze) !== -1) {
      return it.key;
    }
  }
  
  return null;
}

/**
 * Autofill ranged weapon fields based on weapon name
 * @param {number} index - The weapon row index (0-4)
 * @param {string} weaponName - The name entered by user
 */
function autofillRangedWeapon(index, weaponName) {
  const nameInput = document.getElementById(`ranged-${index}-name`);
  
  if (!weaponName || weaponName.trim() === '') {
    // Clear all fields when name is emptied
    clearRangedWeaponFields(index);
    // Clear the user-modified flag so next weapon can autofill
    if (nameInput) delete nameInput.dataset.userModified;
    return false;
  }
  
  // If this row has been user-modified, don't autofill
  if (nameInput && nameInput.dataset.userModified === 'true') {
    return false;
  }
  
  const resolvedKey = findRangedWeaponKey(weaponName);
  if (!resolvedKey || !(resolvedKey in RANGED_WEAPON_DATA)) {
    return false;
  }
  
  const data = RANGED_WEAPON_DATA[resolvedKey];
  // data format: [Hands, Damage, DmgMod, Range, Load, Special Effects, Impale Size, AP, HP, Traits]
  
  const handsInput = document.getElementById(`ranged-${index}-hands`);
  const damageInput = document.getElementById(`ranged-${index}-damage`);
  const dmInput = document.getElementById(`ranged-${index}-dm`);
  const rangeInput = document.getElementById(`ranged-${index}-range`);
  const loadInput = document.getElementById(`ranged-${index}-load`);
  const effectsInput = document.getElementById(`ranged-${index}-effects`);
  const implInput = document.getElementById(`ranged-${index}-impl`);
  const aphpInput = document.getElementById(`ranged-${index}-aphp`);
  const traitsInput = document.getElementById(`ranged-${index}-traits`);
  
  const baseDamage = data[1];
  // For ranged weapons, only add damage mod if D.M. = "Y"
  let finalDamage = baseDamage;
  if (data[2] === 'Y') {
    finalDamage = composeDamage(baseDamage, weaponName);
  }
  
  const aphpValue = `${data[7]}/${data[8]}`;
  
  // Fill fields (only if empty)
  if (handsInput && !handsInput.value.trim()) handsInput.value = data[0];
  if (damageInput && !damageInput.value.trim()) {
    damageInput.value = finalDamage;
    damageInput.dataset.baseDamage = baseDamage; // Store base damage for recalculation
    damageInput.dataset.weaponName = weaponName; // Store weapon name for WP check
  }
  if (dmInput && !dmInput.value.trim()) dmInput.value = data[2];
  if (rangeInput && !rangeInput.value.trim()) rangeInput.value = data[3];
  if (loadInput && !loadInput.value.trim()) loadInput.value = data[4];
  if (effectsInput && !effectsInput.value.trim()) effectsInput.value = data[5];
  if (implInput && !implInput.value.trim()) implInput.value = data[6];
  if (aphpInput && !aphpInput.value.trim()) aphpInput.value = aphpValue;
  if (traitsInput && !traitsInput.value.trim()) traitsInput.value = data[9];
  
  return true;
}

/**
 * Clear all ranged weapon fields for a row
 * @param {number} index - The weapon row index (0-4)
 */
function clearRangedWeaponFields(index) {
  const fields = ['hands', 'damage', 'dm', 'range', 'load', 'effects', 'impl', 'aphp', 'traits'];
  fields.forEach(field => {
    const input = document.getElementById(`ranged-${index}-${field}`);
    if (input) {
      input.value = '';
      if (field === 'damage') {
        delete input.dataset.baseDamage;
      }
    }
  });
  // Clear the userModified flag on the name input
  const nameInput = document.getElementById(`ranged-${index}-name`);
  if (nameInput) delete nameInput.dataset.userModified;
}

/**
 * Update all weapon damage displays based on current damage modifier
 * Called when damage modifier changes on Character page
 * Skips rows that have been user-modified
 * Considers Weapon Precision for eligible weapons
 */
function updateAllWeaponDamage() {
  console.log('updateAllWeaponDamage called');
  const dmgMod = getDamageMod();
  console.log('  Current damage mod:', dmgMod);
  
  // Update melee weapons (always add damage modifier)
  for (let i = 0; i < 20; i++) { // Support up to 20 rows with dynamic addition
    const nameInput = document.getElementById(`melee-${i}-name`);
    const damageInput = document.getElementById(`melee-${i}-damage`);
    
    if (!nameInput) break; // No more rows
    
    // Skip if user has modified this row
    if (nameInput.dataset.userModified === 'true') continue;
    
    if (damageInput && damageInput.dataset.baseDamage) {
      // Use stored weapon name or current name input
      const weaponName = damageInput.dataset.weaponName || nameInput.value;
      const newDamage = composeDamage(damageInput.dataset.baseDamage, weaponName);
      console.log(`  Melee ${i} (${weaponName}): base="${damageInput.dataset.baseDamage}" -> "${newDamage}"`);
      damageInput.value = newDamage;
    }
  }
  
  // Update ranged weapons (only if D.M. = Y)
  for (let i = 0; i < 20; i++) { // Support up to 20 rows with dynamic addition
    const nameInput = document.getElementById(`ranged-${i}-name`);
    const damageInput = document.getElementById(`ranged-${i}-damage`);
    const dmInput = document.getElementById(`ranged-${i}-dm`);
    
    if (!nameInput) break; // No more rows
    
    // Skip if user has modified this row
    if (nameInput.dataset.userModified === 'true') continue;
    
    if (damageInput && damageInput.dataset.baseDamage) {
      const useDamageMod = dmInput && dmInput.value.toUpperCase() === 'Y';
      if (useDamageMod) {
        // Use stored weapon name or current name input
        const weaponName = damageInput.dataset.weaponName || nameInput.value;
        damageInput.value = composeDamage(damageInput.dataset.baseDamage, weaponName);
      } else {
        damageInput.value = damageInput.dataset.baseDamage;
      }
    }
  }
}

// Export for use in app.js
window.WeaponData = {
  MELEE_WEAPON_DATA,
  RANGED_WEAPON_DATA,
  CLASS_WEAPONS_DATA,
  findWeaponKey,
  findRangedWeaponKey,
  autofillMeleeWeapon,
  autofillRangedWeapon,
  clearMeleeWeaponFields,
  clearRangedWeaponFields,
  composeDamage,
  getClassWeapons,
  combineClassWeapons,
  updateAllWeaponDamage,
  isWPEligibleWeapon,
  WP_ELIGIBLE_WEAPONS
};
