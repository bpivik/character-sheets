/* ============================================
   MYTHRAS CLASSIC FANTASY - ENCUMBRANCE DATA
   Equipment ENC autofill database
   ============================================ */

// Equipment Encumbrance Database
// Format: item name (lowercase) -> ENC value
const EQUIPMENT_ENC_DATA = {
  // Tools & Gear
  "abacus": 1,
  "counting frame": 1,
  "animal call": 1,
  "animal whistle": 1,
  "hunting call": 1,
  "astrolabe": 1,
  "star finder": 1,
  "backpack": 1,
  "backpack, reinforced": 1,
  "reinforced backpack": 1,
  "bandolier": 1,
  "ammo belt": 1,
  "cartridge belt": 1,
  "bedroll": 1,
  "bed roll": 1,
  "sleeping roll": 1,
  "belt": 1,
  "waist belt": 1,
  "belt pouch": 1,
  "pouch": 1,
  "coin pouch": 1,
  "pouch, belt": 1,
  "block & tackle": 1,
  "block and tackle": 1,
  "pulley system": 1,
  "hoist pulley": 1,
  "bottle, glass/earthenware": 1,
  "bottle glass": 1,
  "bottle earthenware": 1,
  "glass bottle": 1,
  "glass flask": 1,
  "earthenware bottle": 1,
  "clay bottle": 1,
  "candles, 1 hour (10)": 1,
  "candles, 6 hour (10)": 1,
  "10 candles, 1 hour": 1,
  "10 candles, 6 hour": 1,
  "candles, 1 hour": 1,
  "candles, 6 hour": 1,
  "1 hour candles": 1,
  "6 hour candles": 1,
  "chalk (5 pieces)": 0.5,
  "chalk": 0.5,
  "chalk x5": 0.5,
  "5 pieces of chalk": 0.5,
  "chest, large": 2,
  "large chest": 2,
  "big chest": 2,
  "wooden chest large": 2,
  "chest, small": 1,
  "small chest": 1,
  "mini chest": 1,
  "climbing kit": 1,
  "climbing gear": 1,
  "cooking pot": 1,
  "camp pot": 1,
  "craft tools": 1,
  "artisan tools": 1,
  "crowbar": 1,
  "crow bar": 1,
  "pry bar": 1,
  "doorjamb/wedge": 1,
  "doorjamb": 1,
  "door jamb": 1,
  "wedge": 1,
  "door wedge": 1,
  "wooden wedge": 1,
  "dye, colored": 1,
  "colored dye": 1,
  "cloth dye": 1,
  "falconer's kit": 1,
  "falconers kit": 1,
  "falconry kit": 1,
  "fine wine goblet": 0.5,
  "wine goblet": 0.5,
  "first aid kit": 1,
  "first aid": 1,
  "med kit": 1,
  "fish hooks (20)": 1,
  "20 fish hooks": 1,
  "fish hooks": 1,
  "fishing kit": 1,
  "fishing net": 2,
  "fish net": 2,
  "flint & tinder": 0.5,
  "flint and tinder": 0.5,
  "fire starter": 0.5,
  "game snares and traps": 1,
  "game snares": 1,
  "animal traps": 1,
  "grappling hook": 1,
  "grapple": 1,
  "hammer/mallet/3 chisels": 1,
  "hammer, mallet, 3 chisels": 1,
  "hammer mallet chisels": 1,
  "hammer set": 1,
  "healer's kit": 1,
  "healers kit": 1,
  "holy symbol": 0.5,
  "hourglass": 1,
  "hour glass": 1,
  "key": 1,
  "knife": 0.5,
  "ladder, rope 10 feet": 1,
  "10 foot rope ladder": 1,
  "rope ladder, 10 feet": 1,
  "rope ladder": 1,
  "10ft rope ladder": 1,
  "lantern, basic": 1,
  "lantern, hooded": 1,
  "basic lantern": 1,
  "hooded lantern": 1,
  "lantern": 1,
  "plain lantern": 1,
  "covered lantern": 1,
  "lock picks and thieves' tools": 1,
  "lock picks & thieves' tools": 1,
  "lockpicks": 1,
  "thieves tools": 1,
  "lockbox": 1,
  "lock box": 1,
  "magnifying lens": 1,
  "magnifying glass": 1,
  "milling stone": 2,
  "mill stone": 2,
  "mirror (glass)": 1,
  "mirror (metal)": 1,
  "glass mirror": 1,
  "metal mirror": 1,
  "mirror": 1,
  "mug/beaker/dish/plate": 1,
  "mug": 1,
  "beaker": 1,
  "dish": 1,
  "plate": 1,
  "musical instrument, small": 1,
  "musical instrument, large": 3,
  "small musical instrument": 1,
  "large musical instrument": 3,
  "small instrument": 1,
  "large instrument": 3,
  "drum": 1,
  "lute": 1,
  "flute": 1,
  "cello": 3,
  "bass horn": 3,
  "nails or tacks (50)": 1,
  "nails (50)": 1,
  "tacks (50)": 1,
  "notebook or journal": 1,
  "notebook": 1,
  "journal": 1,
  "oil flask (2)": 1,
  "oil flask": 1,
  "2 oil flasks": 1,
  "2 flasks of oil": 1,
  "sheets of parchment or paper (10)": 1,
  "sheets of parchment (10)": 1,
  "sheets of paper (10)": 1,
  "parchment": 1,
  "paper sheets": 1,
  "pickaxe": 1,
  "pick axe": 1,
  "pole, 10 foot": 2,
  "10 foot pole": 2,
  "10' pole": 2,
  "quills (3) and ink for writing": 1,
  "3 quills and ink for writing": 1,
  "quills and ink": 1,
  "quiver": 1,
  "razor, folding": 1,
  "folding razor": 1,
  "rope, hemp (30 feet)": 1,
  "rope, silk (30 feet)": 1,
  "30 foot hemp rope": 1,
  "30 foot silk rope": 1,
  "30 feet hemp rope": 1,
  "30 feet silk rope": 1,
  "30 feet rope": 1,
  "30 foot rope": 1,
  "rope (30 feet)": 1,
  "hemp rope": 1,
  "silk rope": 1,
  "rope": 1,
  "sack, large": 2,
  "sack, small": 1,
  "large sack": 2,
  "small sack": 1,
  "sack": 1,
  "saw, hand": 1,
  "hand saw": 1,
  "scribing kit": 1,
  "scroll or map tube": 1,
  "scroll": 1,
  "map tube": 1,
  "scroll paper, blank": 1,
  "blank scroll paper": 1,
  "scythe": 2,
  "sextant": 1,
  "ship's compass": 1,
  "compass": 1,
  "slingbag/satchel": 1,
  "slingbag": 1,
  "satchel": 1,
  "spade/hoe/pitchfork": 1,
  "spade": 1,
  "hoe": 1,
  "pitchfork": 1,
  "spellbook": 1,
  "spellbook, blank": 1,
  "spellbook, traveling, blank": 1,
  "spell component pouch": 1,
  "component pouch": 1,
  "spikes, iron (10)": 1,
  "iron spikes (10)": 1,
  "10 iron spikes": 1,
  "iron spikes": 1,
  "torch, 1 hour (2)": 1,
  "torch, 6 hour (2)": 1,
  "2x 1 hour torches": 1,
  "torch, waterproof (1 hour)": 1,
  "waterproof torch (1 hour)": 1,
  "torch": 0.5,
  "torches": 1,
  "trail rations (1 week)": 1,
  "trail rations": 1,
  "rations": 1,
  "waterskin": 1,
  "water skin": 1,
  "wax block": 1,
  "weapon maintenance kit": 1,
  "whetstone": 1,
  "writing set": 1,

  // Shields
  "buckler": 1,
  "buckler shield": 1,
  "heater": 2,
  "heater shield": 2,
  "kite": 2,
  "kite shield": 2,
  "round": 2,
  "round shield": 2,
  "target": 2,
  "target shield": 2,
  "tower": 2,
  "tower shield": 2,
  "wooden shield": 2,
  "viking shield": 2,

  // Melee Weapons
  "club": 1,
  "dagger": 0.5,
  "great club": 2,
  "greatclub": 2,
  "hand axe": 0.5,
  "handaxe": 0.5,
  "hatchet": 0.5,
  "longspear": 2,
  "long spear": 2,
  "mace": 1,
  "mace, heavy": 2,
  "heavy mace": 2,
  "morning star": 1,
  "morningstar": 1,
  "quarterstaff": 2,
  "quarter staff": 2,
  "bo stick": 2,
  "shortspear": 1,
  "short spear": 1,
  "spear": 1,
  "sickle": 1,
  "ball & chain": 1,
  "ball and chain": 1,
  "bastard sword": 1,
  "battleaxe": 1,
  "battle axe": 1,
  "broadsword": 1,
  "chain": 1,
  "falchion": 1,
  "flail": 1,
  "flail, heavy": 2,
  "heavy flail": 2,
  "garrote": 0.5,
  "glaive": 2,
  "rhomphaia": 2,
  "great axe": 2,
  "greataxe": 2,
  "great hammer": 2,
  "greathammer": 2,
  "great sword": 2,
  "greatsword": 2,
  "halberd/poleaxe": 2,
  "halberd": 2,
  "poleaxe": 2,
  "horseman's flail": 1,
  "horseman's mace": 1,
  "horseman's military pick": 1,
  "jo stick": 1,
  "lance": 2,
  "longsword": 1,
  "long sword": 1,
  "main gauche": 0.5,
  "military pick": 1,
  "military pick, heavy": 2,
  "heavy military pick": 2,
  "net": 0.5,
  "pike": 2,
  "sarissa": 2,
  "rapier": 1,
  "sabre": 1,
  "saber": 1,
  "scimitar": 1,
  "shortsword": 1,
  "short sword": 1,
  "trident": 1,
  "war hammer": 1,
  "warhammer": 1,
  "whip": 1,
  "xyston": 2,

  // Ranged Weapons
  "crossbow, heavy": 2,
  "crossbow, light": 1,
  "heavy crossbow": 2,
  "light crossbow": 1,
  "crossbow": 1,
  "hand crossbow": 0.5,
  "dart": 0.16,
  "darts (6)": 1,
  "sling": 0.5,
  "stone/rock": 1,
  "stone": 0.5,
  "rock": 0.5,
  "shortbow": 1,
  "short bow": 1,
  "longbow": 2,
  "long bow": 2,
  "bow": 1,
  "composite shortbow": 1,
  "composite short bow": 1,
  "composite longbow": 2,
  "composite long bow": 2,
  "javelin": 1,
  "javelins": 1,
  "atlatl": 1,
  "staff sling": 2,
  "arrows (12)": 1,
  "12 arrows": 1,
  "bolts (12)": 1,
  "12 bolts": 1,

  // Armor - Soft Leather
  "soft leather coif": 0.5,
  "soft leather cap": 0.5,
  "soft leather hauberk": 2,
  "soft leather shirt": 1,
  "soft leather pants": 1,
  "soft leather trews": 1,
  "soft leather skirt": 1,
  "soft leather sleeves": 0.5,
  "soft leather vambraces": 0.5,
  "soft leather greaves": 0.5,

  // Armor - Hard Leather
  "hard leather coif": 1,
  "hard leather cap": 1,
  "hard leather hauberk": 3,
  "hard leather shirt": 2,
  "hard leather pants": 2,
  "hard leather trews": 2,
  "hard leather skirt": 2,
  "hard leather sleeves": 1,
  "hard leather vambraces": 1,
  "hard leather greaves": 1,

  // Armor - Linen/Quilted
  "linen coif": 0.5,
  "quilted coif": 0.5,
  "linen hauberk": 2,
  "quilted hauberk": 2,
  "gambeson": 2,
  "linen pants": 1,
  "quilted pants": 1,
  "linen trews": 1,
  "quilted trews": 1,
  "linen sleeves": 0.5,
  "quilted sleeves": 0.5,
  "linen greaves": 0.5,
  "quilted greaves": 0.5,

  // Armor - Ringmail
  "ringmail coif": 1,
  "ringmail hauberk": 4,
  "ringmail shirt": 3,
  "ringmail pants": 2,
  "ringmail trews": 2,
  "ringmail skirt": 2,
  "ringmail sleeves": 1,
  "ringmail vambraces": 1,
  "ringmail greaves": 1,

  // Armor - Scalemail
  "scalemail coif": 1,
  "scalemail hauberk": 5,
  "scalemail shirt": 3,
  "scalemail pants": 3,
  "scalemail trews": 3,
  "scalemail skirt": 3,
  "scalemail sleeves": 1,
  "scalemail vambraces": 1,
  "scalemail greaves": 1,

  // Armor - Chainmail
  "chainmail coif": 1,
  "chain coif": 1,
  "chainmail hauberk": 5,
  "chain hauberk": 5,
  "chainmail shirt": 3,
  "chain shirt": 3,
  "chainmail pants": 3,
  "chain pants": 3,
  "chainmail trews": 3,
  "chain trews": 3,
  "chainmail skirt": 3,
  "chain skirt": 3,
  "chainmail sleeves": 1,
  "chain sleeves": 1,
  "chainmail vambraces": 1,
  "chain vambraces": 1,
  "chainmail greaves": 1,
  "chain greaves": 1,

  // Armor - Plate
  "plate helm": 2,
  "plate helmet": 2,
  "great helm": 2,
  "plate cuirass": 4,
  "plate breastplate": 3,
  "breastplate": 3,
  "plate vambraces": 1,
  "plate greaves": 1,
  "plate gauntlets": 1,
  "gauntlets": 1,

  // Clothing
  "boots": 1,
  "cloak": 1,
  "robe": 1,
  "robes": 1,
  "tunic": 1,
  "dress": 1,
  "hat": 0.5,
  "gloves": 0.5,
  "sandals": 0.5,
  "shoes": 0.5,

  // Coins & Currency (per 100)
  "coins (100)": 1,
  "100 coins": 1,
  "gold (100)": 1,
  "silver (100)": 1,
  "copper (100)": 1,
  
  // Miscellaneous
  "tent": 3,
  "tent, small": 2,
  "small tent": 2,
  "tent, large": 4,
  "large tent": 4,
  "blanket": 1,
  "thieves' tools": 1
};

// Build a lowercase index for fuzzy matching
let encIndexBuilt = false;
let encIndex = {};

/**
 * Build encumbrance index (lowercase keys)
 */
function buildEncIndex() {
  if (encIndexBuilt) return;
  
  for (const key in EQUIPMENT_ENC_DATA) {
    if (EQUIPMENT_ENC_DATA.hasOwnProperty(key)) {
      encIndex[key.toLowerCase()] = EQUIPMENT_ENC_DATA[key];
    }
  }
  encIndexBuilt = true;
}

/**
 * Normalize item name for lookup
 * Removes extra spaces, lowercases, trims, and removes "(see below)"
 */
function normalizeItemName(name) {
  if (!name) return '';
  let normalized = name.toLowerCase().trim();
  // Remove "(see below)" suffix for matching
  normalized = normalized.replace(/\s*\(see below\)\s*/gi, '');
  return normalized.replace(/\s+/g, ' ').trim();
}

/**
 * Find ENC value for an item
 * Returns the ENC value or null if not found
 */
function findItemEnc(itemName) {
  buildEncIndex();
  
  if (!itemName || itemName.trim() === '') return null;
  
  const normalized = normalizeItemName(itemName);
  
  // Direct lookup
  if (encIndex.hasOwnProperty(normalized)) {
    return encIndex[normalized];
  }
  
  // Try without trailing 's' (plural)
  if (normalized.endsWith('s') && normalized.length > 2) {
    const singular = normalized.slice(0, -1);
    if (encIndex.hasOwnProperty(singular)) {
      return encIndex[singular];
    }
  }
  
  // Try adding 's' (singular to plural)
  const plural = normalized + 's';
  if (encIndex.hasOwnProperty(plural)) {
    return encIndex[plural];
  }
  
  return null;
}

/**
 * Autofill equipment ENC based on item name
 * @param {string} prefix - 'equip' or 'backpack'
 * @param {number} index - Row index
 * @param {string} itemName - Item name entered by user
 */
function autofillEquipmentEnc(prefix, index, itemName) {
  const encInput = document.getElementById(`${prefix}-${index}-enc`);
  if (!encInput) return false;
  
  // Only fill if ENC field is empty
  if (encInput.value.trim() !== '') return false;
  
  const enc = findItemEnc(itemName);
  if (enc !== null) {
    encInput.value = enc;
    return true;
  }
  
  return false;
}

/**
 * Clear equipment ENC when name is cleared
 * @param {string} prefix - 'equip' or 'backpack'
 * @param {number} index - Row index
 * @param {string} itemName - Current item name
 */
function clearEquipmentEncIfEmpty(prefix, index, itemName) {
  if (!itemName || itemName.trim() === '') {
    const encInput = document.getElementById(`${prefix}-${index}-enc`);
    if (encInput) {
      encInput.value = '';
      return true;
    }
  }
  return false;
}

// Export for use in app.js
window.EncumbranceData = {
  EQUIPMENT_ENC_DATA,
  findItemEnc,
  autofillEquipmentEnc,
  clearEquipmentEncIfEmpty
};
