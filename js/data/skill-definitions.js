/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Skill Definitions Data
   ============================================ */

const SKILL_DEFINITIONS = {
  standard: {
    athletics: { name: 'Athletics', formula: 'STR+DEX', attrs: ['STR', 'DEX'], encAffected: true },
    boating: { name: 'Boating', formula: 'STR+CON', attrs: ['STR', 'CON'], encAffected: true },
    brawn: { name: 'Brawn', formula: 'STR+SIZ', attrs: ['STR', 'SIZ'], encAffected: true },
    conceal: { name: 'Conceal', formula: 'DEX+POW', attrs: ['DEX', 'POW'], encAffected: true },
    customs: { name: 'Customs', formula: 'INT x2+40', attrs: ['INT'], multiplier: 2, bonus: 40, encAffected: false },
    dance: { name: 'Dance', formula: 'DEX+CHA', attrs: ['DEX', 'CHA'], encAffected: true },
    deceit: { name: 'Deceit', formula: 'INT+CHA', attrs: ['INT', 'CHA'], encAffected: false },
    drive: { name: 'Drive', formula: 'DEX+POW', attrs: ['DEX', 'POW'], encAffected: true },
    endurance: { name: 'Endurance', formula: 'CON x2', attrs: ['CON'], multiplier: 2, encAffected: false },
    evade: { name: 'Evade', formula: 'DEX x2', attrs: ['DEX'], multiplier: 2, encAffected: true },
    firstAid: { name: 'First Aid', formula: 'INT+DEX', attrs: ['INT', 'DEX'], encAffected: true },
    influence: { name: 'Influence', formula: 'CHA x2', attrs: ['CHA'], multiplier: 2, encAffected: false },
    insight: { name: 'Insight', formula: 'INT+POW', attrs: ['INT', 'POW'], encAffected: false },
    locale: { name: 'Locale', formula: 'INT x2', attrs: ['INT'], multiplier: 2, encAffected: false },
    perception: { name: 'Perception', formula: 'INT+POW', attrs: ['INT', 'POW'], encAffected: false },
    ride: { name: 'Ride', formula: 'DEX+POW', attrs: ['DEX', 'POW'], encAffected: true },
    sing: { name: 'Sing', formula: 'CHA+POW', attrs: ['CHA', 'POW'], encAffected: false },
    stealth: { name: 'Stealth', formula: 'DEX+INT', attrs: ['DEX', 'INT'], encAffected: true },
    swim: { name: 'Swim', formula: 'STR+CON', attrs: ['STR', 'CON'], encAffected: true },
    willpower: { name: 'Willpower', formula: 'POW x2', attrs: ['POW'], multiplier: 2, encAffected: false }
  },
  
  combat: {
    melee: { name: 'Combat Style', formula: 'STR+DEX', attrs: ['STR', 'DEX'] },
    unarmed: { name: 'Unarmed', formula: 'STR+DEX', attrs: ['STR', 'DEX'] }
  },
  
  magic: {
    channel: { name: 'Channel', formula: 'INT+POW', attrs: ['INT', 'POW'], class: 'Divine' },
    piety: { name: 'Piety', formula: 'CHA+POW', attrs: ['CHA', 'POW'], class: 'Divine' },
    arcaneCasting: { name: 'Arcane Casting', formula: 'INT+POW', attrs: ['INT', 'POW'], class: 'Mage' },
    arcaneKnowledge: { name: 'Arcane Knowledge', formula: 'INT x2', attrs: ['INT'], multiplier: 2, class: 'Mage' },
    arcaneSorcery: { name: 'Arcane Sorcery', formula: 'CHA+POW', attrs: ['CHA', 'POW'], class: 'Sorcerer' },
    sorcerousWisdom: { name: 'Sorcerous Wisdom', formula: 'CHA+INT', attrs: ['CHA', 'INT'], class: 'Sorcerer' },
    musicianship: { name: 'Musicianship', formula: 'DEX+CHA', attrs: ['DEX', 'CHA'], class: 'Bard' },
    lyricalMagic: { name: 'Lyrical Magic', formula: 'CHA+POW', attrs: ['CHA', 'POW'], class: 'Bard' }
  },
  
  beliefs: {
    alignment: { name: 'Alignment', formula: 'POW+INT+50', attrs: ['POW', 'INT'], bonus: 50 },
    passion: { name: 'Passion', formula: 'POW+INT+50', attrs: ['POW', 'INT'], bonus: 50 },
    oath: { name: 'Oath', formula: 'POW+CHA+50', attrs: ['POW', 'CHA'], bonus: 50 }
  },
  
  language: {
    native: { name: 'Native Tongue', formula: 'INT+CHA+40', attrs: ['INT', 'CHA'], bonus: 40 },
    additional: { name: 'Language', formula: 'INT+CHA', attrs: ['INT', 'CHA'] }
  },
  
  // Professional Skills - auto-fill formulas when user types skill name
  professional: {
    "acrobatics": { formula: "STR+DEX", attrs: ['STR', 'DEX'] },
    "acting": { formula: "CHA x2", attrs: ['CHA'], multiplier: 2 },
    "animal handling": { formula: "POW+CHA", attrs: ['POW', 'CHA'] },
    "arcane casting": { formula: "INT+POW", attrs: ['INT', 'POW'] },
    "arcane knowledge": { formula: "INT x2", attrs: ['INT'], multiplier: 2 },
    "arcane sorcery": { formula: "CHA+POW", attrs: ['CHA', 'POW'] },
    "art": { formula: "POW+CHA", attrs: ['POW', 'CHA'] },
    "bureaucracy": { formula: "INT x2", attrs: ['INT'], multiplier: 2 },
    "channel": { formula: "INT+POW", attrs: ['INT', 'POW'] },
    "commerce": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "courtesy": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "craft": { formula: "DEX+INT", attrs: ['DEX', 'INT'] },
    "culture": { formula: "INT x2", attrs: ['INT'], multiplier: 2 },
    "disguise": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "engineering": { formula: "INT x2", attrs: ['INT'], multiplier: 2 },
    "fly": { formula: "STR+DEX", attrs: ['STR', 'DEX'] },
    "flying": { formula: "STR+DEX", attrs: ['STR', 'DEX'] },
    "gambling": { formula: "INT+POW", attrs: ['INT', 'POW'] },
    "healing": { formula: "INT+POW", attrs: ['INT', 'POW'] },
    "intimidation": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "language": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "lockpicking": { formula: "DEX x2", attrs: ['DEX'], multiplier: 2 },
    "lore": { formula: "INT x2", attrs: ['INT'], multiplier: 2 },
    "mechanisms": { formula: "DEX+INT", attrs: ['DEX', 'INT'] },
    "meditation": { formula: "INT+CON", attrs: ['INT', 'CON'] },
    "musicianship": { formula: "DEX+CHA", attrs: ['DEX', 'CHA'] },
    "mysticism": { formula: "POW+CON", attrs: ['POW', 'CON'] },
    "navigation": { formula: "INT+POW", attrs: ['INT', 'POW'] },
    "oratory": { formula: "POW+CHA", attrs: ['POW', 'CHA'] },
    "piety": { formula: "CHA+POW", attrs: ['CHA', 'POW'] },
    "psychic manipulation": { formula: "POW x2", attrs: ['POW'], multiplier: 2 },
    "seamanship": { formula: "INT+CON", attrs: ['INT', 'CON'] },
    "seduction": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "sleight": { formula: "DEX+CHA", attrs: ['DEX', 'CHA'] },
    "sorcerous wisdom": { formula: "CHA+INT", attrs: ['CHA', 'INT'] },
    "streetwise": { formula: "POW+CHA", attrs: ['POW', 'CHA'] },
    "survival": { formula: "CON+POW", attrs: ['CON', 'POW'] },
    "teach": { formula: "INT+CHA", attrs: ['INT', 'CHA'] },
    "track": { formula: "INT+CON", attrs: ['INT', 'CON'] },
    "lyrical magic": { formula: "CHA+POW", attrs: ['CHA', 'POW'] },
    "read languages": { formula: "INT x2", attrs: ['INT'], multiplier: 2 }
  }
};

// Hit Location definitions
const HIT_LOCATIONS = {
  human: [
    { roll: '1-3', location: 'R Leg', hpMod: 0 },
    { roll: '4-6', location: 'L Leg', hpMod: 0 },
    { roll: '7-9', location: 'Abdomen', hpMod: 1 },
    { roll: '10-12', location: 'Chest', hpMod: 2 },
    { roll: '13-15', location: 'R Arm', hpMod: -1 },
    { roll: '16-18', location: 'L Arm', hpMod: -1 },
    { roll: '19-20', location: 'Head', hpMod: 0 }
  ],
  syrin: [
    { roll: '1-3', location: 'R Leg', hpMod: 0 },
    { roll: '4-6', location: 'L Leg', hpMod: 0 },
    { roll: '7-9', location: 'Abdomen', hpMod: 1 },
    { roll: '10', location: 'Chest', hpMod: 2 },
    { roll: '11-12', location: 'L Wing', hpMod: -1, noArmor: true },
    { roll: '13-14', location: 'R Wing', hpMod: -1, noArmor: true },
    { roll: '15-16', location: 'R Arm', hpMod: -1 },
    { roll: '17-18', location: 'L Arm', hpMod: -1 },
    { roll: '19-20', location: 'Head', hpMod: 0 }
  ]
};

// Damage Modifier lookup table (based on STR+SIZ)
const DAMAGE_MOD_TABLE = [
  { max: 5, mod: '-1d8' },
  { max: 10, mod: '-1d6' },
  { max: 15, mod: '-1d4' },
  { max: 20, mod: '-1d2' },
  { max: 25, mod: '+0' },
  { max: 30, mod: '+1d2' },
  { max: 35, mod: '+1d4' },
  { max: 40, mod: '+1d6' },
  { max: 45, mod: '+1d8' },
  { max: 50, mod: '+1d10' },
  { max: 60, mod: '+1d12' },
  { max: 70, mod: '+2d6' },
  { max: 80, mod: '+1d8+1d6' },
  { max: 90, mod: '+2d8' },
  { max: 100, mod: '+1d10+1d8' },
  { max: 110, mod: '+2d10' },
  { max: 120, mod: '+2d10+1d2' },
  { max: 130, mod: '+2d10+1d4' }
  // Each additional 10 points continues the progression
];

// Action Points by combined Rank (base 2 for Rank 0-1, then bonuses per rank)
// Rank 0: 2, Rank 1: 2, Rank 2: 3 (+1), Rank 3: 3 (+1), Rank 4: 4 (+2), Rank 5: 4 (+2)
const ACTION_POINTS_BY_RANK = [2, 2, 3, 3, 4, 4];

// Experience Modifier lookup table (based on CHA)
const EXP_MOD_TABLE = [
  { max: 6, mod: -1 },
  { max: 12, mod: 0 },
  { max: 18, mod: 1 },
  { max: 24, mod: 2 },
  { max: 30, mod: 3 },
  { max: 36, mod: 4 }
  // Each additional 6 points: +1
];

// Healing Rate lookup table (based on CON)
const HEALING_RATE_TABLE = [
  { max: 6, rate: 1 },
  { max: 12, rate: 2 },
  { max: 18, rate: 3 },
  { max: 24, rate: 4 },
  { max: 30, rate: 5 },
  { max: 36, rate: 6 }
  // Each additional 6 points: +1
];

// Luck Points base lookup table (based on POW)
const LUCK_POINTS_TABLE = [
  { max: 6, luck: 1 },
  { max: 12, luck: 2 },
  { max: 18, luck: 3 },
  { max: 24, luck: 4 },
  { max: 30, luck: 5 },
  { max: 36, luck: 6 }
  // Each additional 6 points: +1
];

// Luck Points by Rank (total bonus at each rank level)
// R0=0, R1=0, R2=+1, R3=+2, R4=+3, R5=+4
const LUCK_BY_RANK = [0, 0, 1, 2, 3, 4];

// Hit Points base table by CON+SIZ for each location type
// Columns: 1-5, 6-10, 11-15, 16-20, 21-25, 26-30, 31-35, 36-40 (each +5 adds +1)
const HP_TABLE = {
  head:    [1, 2, 3, 4, 5, 6, 7, 8],
  chest:   [3, 4, 5, 6, 7, 8, 9, 10],
  abdomen: [2, 3, 4, 5, 6, 7, 8, 9],
  arm:     [1, 1, 2, 3, 4, 5, 6, 7],
  leg:     [1, 2, 3, 4, 5, 6, 7, 8],
  wing:    [1, 2, 3, 4, 5, 6, 7, 8]
};

// HP bonus by rank (total bonus at each rank level)
// R0=0, R1=0, R2=+1, R3=+1, R4=+2, R5=+2
const HP_BONUS_BY_RANK = [0, 0, 1, 1, 2, 2];

// Encumbrance thresholds
const ENC_STATUS = [
  { name: 'Extremely Unburdened', threshold: 0.5, penalty: null, penaltyText: '', penaltyPercent: 0, skillGrades: 0 },
  { name: 'Unburdened', threshold: 1, penalty: null, penaltyText: '', penaltyPercent: 0, skillGrades: 0 },
  { name: 'Burdened', threshold: 2, penalty: 'Hard', penaltyText: 'Hard (-20%)', penaltyPercent: 20, skillGrades: 1 },
  { name: 'Overburdened', threshold: Infinity, penalty: 'Formidable', penaltyText: 'Formidable (-40%)', penaltyPercent: 40, skillGrades: 2 }
];

// Fatigue penalty data (functional - used by penalty engine)
// skillPenalty: flat % subtracted from ALL skills
// movementType: 'none' | 'flat' | 'halve' | 'zero'
// movementFlat: feet subtracted (only when movementType='flat')
// initiativePenalty: flat subtracted from initiative
// apPenalty: flat subtracted from action points max
// canAct: false means character is incapacitated (all values N/A)
const FATIGUE_PENALTIES = {
  fresh:         { skillPenalty: 0,   skillGrade: '',           movementType: 'none',  movementFlat: 0, initiativePenalty: 0, apPenalty: 0, canAct: true },
  winded:        { skillPenalty: 20,  skillGrade: 'Hard',       movementType: 'none',  movementFlat: 0, initiativePenalty: 0, apPenalty: 0, canAct: true },
  tired:         { skillPenalty: 20,  skillGrade: 'Hard',       movementType: 'flat',  movementFlat: 5, initiativePenalty: 0, apPenalty: 0, canAct: true },
  wearied:       { skillPenalty: 40,  skillGrade: 'Formidable', movementType: 'flat',  movementFlat: 5, initiativePenalty: 2, apPenalty: 0, canAct: true },
  exhausted:     { skillPenalty: 40,  skillGrade: 'Formidable', movementType: 'halve', movementFlat: 0, initiativePenalty: 4, apPenalty: 1, canAct: true },
  debilitated:   { skillPenalty: 80,  skillGrade: 'Herculean',  movementType: 'halve', movementFlat: 0, initiativePenalty: 6, apPenalty: 2, canAct: true },
  incapacitated: { skillPenalty: 80,  skillGrade: 'Herculean',  movementType: 'zero',  movementFlat: 0, initiativePenalty: 8, apPenalty: 3, canAct: true },
  semiconscious: { skillPenalty: 100, skillGrade: 'Hopeless',   movementType: 'zero',  movementFlat: 0, initiativePenalty: 0, apPenalty: 0, canAct: false },
  coma:          { skillPenalty: 100, skillGrade: 'N/A',        movementType: 'zero',  movementFlat: 0, initiativePenalty: 0, apPenalty: 0, canAct: false }
};

// Skill Grade modifiers
const SKILL_GRADES = [
  { grade: 'Automatic', mod: '–' },
  { grade: 'Very Easy', mod: '+40%' },
  { grade: 'Easy', mod: '+20%' },
  { grade: 'Standard', mod: '–' },
  { grade: 'Hard', mod: '-20%' },
  { grade: 'Formidable', mod: '-40%' },
  { grade: 'Herculean', mod: '-80%' },
  { grade: 'Hopeless', mod: '–' }
];

// Number of spell slots per rank
const SPELL_SLOTS_PER_RANK = 50;

// Number of equipment slots (visible in scrollable area)
const EQUIPMENT_SLOTS = 30;

// Number of backpack slots
const BACKPACK_SLOTS = 12;

// Number of professional skill slots
const PROFESSIONAL_SKILL_SLOTS = 22;

// Number of special ability slots per column
const ABILITY_SLOTS_PER_COLUMN = 25;

// Container configurations: id, display name, max capacity (Things), row count, triggers (item names that activate it)
const CONTAINER_CONFIGS = {
  'backpack': {
    name: 'Backpack',
    maxEnc: 10,
    rows: 20,
    triggers: ['backpack']
  },
  'reinforced-backpack': {
    name: 'Reinforced Backpack',
    maxEnc: 15,
    rows: 30,
    triggers: ['reinforced backpack', 'backpack, reinforced']
  },
  'large-sack': {
    name: 'Large Sack',
    maxEnc: 10,
    rows: 20,
    triggers: ['large sack', 'sack, large']
  },
  'small-sack': {
    name: 'Small Sack',
    maxEnc: 3,
    rows: 6,
    triggers: ['small sack', 'sack, small']
  },
  'satchel': {
    name: 'Slingbag/Satchel',
    maxEnc: 6,
    rows: 12,
    triggers: ['slingbag', 'satchel', 'slingbag/satchel']
  },
  'belt-pouch': {
    name: 'Belt Pouch',
    maxEnc: 1,
    rows: 4,
    triggers: ['belt pouch', 'pouch, belt']
  }
};
