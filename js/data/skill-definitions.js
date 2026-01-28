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

// Damage Modifier lookup table
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
  { max: 55, mod: '+1d12' },
  { max: 60, mod: '+2d6' },
  { max: 65, mod: '+1d8+1d6' },
  { max: 70, mod: '+2d8' },
  { max: 75, mod: '+1d10+1d8' },
  { max: 80, mod: '+2d10' },
  { max: Infinity, mod: '+2d10+' }
];

// Action Points lookup table
const ACTION_POINTS_TABLE = [
  { max: 12, ap: 1 },
  { max: 24, ap: 2 },
  { max: 36, ap: 3 },
  { max: Infinity, ap: 4 }
];

// Healing Rate lookup table
const HEALING_RATE_TABLE = [
  { max: 6, rate: 1 },
  { max: 12, rate: 2 },
  { max: 18, rate: 3 },
  { max: Infinity, rate: 4 }
];

// Encumbrance thresholds
const ENC_STATUS = [
  { name: 'Unburdened', threshold: 2 },
  { name: 'Burdened', threshold: 3 },
  { name: 'Heavily Burdened', threshold: 4 },
  { name: 'Overloaded', threshold: 5 },
  { name: 'Immobilized', threshold: Infinity }
];

// Fatigue states reference
const FATIGUE_STATES = [
  { state: 'Fresh', skills: '–', movement: '–', initiative: '–', ap: '–', recovery: '–' },
  { state: 'Winded', skills: 'Hard', movement: '–', initiative: '–', ap: '–', recovery: '15 min.' },
  { state: 'Tired', skills: 'Hard', movement: '-5 ft.', initiative: '–', ap: '–', recovery: '3 Hrs.' },
  { state: 'Wearied', skills: 'Formid.', movement: '-5 ft.', initiative: '-2', ap: '–', recovery: '6 Hrs.' },
  { state: 'Exhausted', skills: 'Formid.', movement: '1/2', initiative: '-4', ap: '-1', recovery: '12 Hrs.' },
  { state: 'Debil', skills: 'Herc.', movement: '1/2', initiative: '-6', ap: '-2', recovery: '18 Hrs.' },
  { state: 'Incap.', skills: 'Herc.', movement: 'Immobile', initiative: '-8', ap: '-3', recovery: '24 Hrs.' },
  { state: 'Semi-consc.', skills: 'Hopeless', movement: 'N/A', initiative: 'N/A', ap: 'N/A', recovery: '36 Hrs.' },
  { state: 'Coma', skills: 'N/A', movement: 'N/A', initiative: 'N/A', ap: 'N/A', recovery: '48 Hrs.' }
];

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

// Number of equipment slots
const EQUIPMENT_SLOTS = 12;

// Number of professional skill slots
const PROFESSIONAL_SKILL_SLOTS = 15;

// Number of special ability slots per column
const ABILITY_SLOTS_PER_COLUMN = 25;
