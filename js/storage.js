/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Storage Manager - Save/Load/Export
   ============================================ */

const StorageManager = {
  STORAGE_KEY: 'mythras_character_sheet',
  VERSION: '1.0',

  /**
   * Create a new empty character data object
   */
  createEmptyCharacter() {
    return {
      version: this.VERSION,
      sheetType: 'human',
      lastModified: new Date().toISOString(),
      
      // Basic Info
      info: {
        characterName: '',
        playerName: '',
        species: '',
        culture: '',
        classPrimary: '',
        classSecondary: '',
        classTertiary: '',
        rankName: '',
        gender: '',
        age: '',
        handedness: '',
        height: '',
        weight: '',
        hair: '',
        eyes: '',
        rankPrimary: '',
        rankSecondary: '',
        rankTertiary: '',
        tenacityCurrent: '',
        tenacityMax: '',
        expRolls: ''
      },
      
      // Attributes (original values)
      attributes: {
        STR: '',
        CON: '',
        SIZ: '',
        DEX: '',
        INT: '',
        POW: '',
        CHA: ''
      },
      
      // Attributes (current values - for temporary changes)
      attributesCurrent: {
        STR: '',
        CON: '',
        SIZ: '',
        DEX: '',
        INT: '',
        POW: '',
        CHA: ''
      },
      
      // Derived Stats (some are editable)
      derived: {
        movementBase: '20',
        movementCurrent: '',
        actionPointsOriginal: '',
        actionPointsCurrent: '',
        damageModOriginal: '',
        damageModCurrent: '',
        expModOriginal: '',
        expModCurrent: '',
        healingRateOriginal: '',
        healingRateCurrent: '',
        initiativeOriginal: '',
        initiativeCurrent: '',
        luckOriginal: '',
        luckCurrent: '',
        magicPointsOriginal: '',
        magicPointsCurrent: '',
        tenacityCurrent: ''
      },
      
      // Whether original values are locked (user-edited)
      originalsLocked: false,
      
      // Current fatigue state
      fatigueState: 'fresh',
      
      // Standard Skills (current values - base is calculated)
      standardSkills: {},
      
      // Professional Skills
      professionalSkills: [],
      
      // Alignments
      alignments: [
        { name: '', current: '' },
        { name: '', current: '' }
      ],
      
      // Passions
      passions: [
        { name: '', current: '' },
        { name: '', current: '' },
        { name: '', current: '' },
        { name: '', current: '' }
      ],
      
      // Oaths
      oaths: [
        { name: '', current: '' },
        { name: '', current: '' },
        { name: '', current: '' },
        { name: '', current: '' }
      ],
      
      // Languages
      languages: [
        { name: '', current: '', isNative: true },
        { name: '', current: '', isNative: false },
        { name: '', current: '', isNative: false },
        { name: '', current: '', isNative: false },
        { name: '', current: '', isNative: false }
      ],
      
      // Equipment
      equipment: [],
      backpack: [],
      encAutomation: true,
      
      // Combat
      combat: {
        skills: [
          { name: '', percent: '', weapons: '' }
        ],
        unarmedPercent: '',
        hitLocations: [],
        meleeWeapons: [],
        rangedWeapons: [],
        specialAbilities: [],
        notes: '',
        flyingSpeed: ''
      },
      
      // Magic
      magic: {
        deity: '',
        channelPercent: '',
        pietyPercent: '',
        arcaneCastingPercent: '',
        arcaneKnowledgePercent: '',
        arcaneSorceryPercent: '',
        sorcerousWisdomPercent: '',
        musicianshipPercent: '',
        lyricalMagicPercent: '',
        spells: {
          cantrips: { max: 0, spells: [] },
          rank1: { max: 0, spells: [] },
          rank2: { max: 0, spells: [] },
          rank3: { max: 0, spells: [] },
          rank4: { max: 0, spells: [] },
          rank5: { max: 0, spells: [] }
        }
      },
      
      // Notes
      notes: '',
      
      // Images (stored as base64)
      images: {
        fullBody: null,
        portrait: null
      },
      
      // Abilities tracking
      acquiredAbilities: [],
      characteristicIncreases: []
    };
  },

  /**
   * Save character data to localStorage
   */
  save(characterData) {
    try {
      characterData.lastModified = new Date().toISOString();
      const json = JSON.stringify(characterData);
      localStorage.setItem(this.STORAGE_KEY, json);
      console.log('Character saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving character:', error);
      return false;
    }
  },

  /**
   * Load character data from localStorage
   */
  load() {
    try {
      const json = localStorage.getItem(this.STORAGE_KEY);
      if (json) {
        const data = JSON.parse(json);
        // Migrate data if needed
        return this.migrateData(data);
      }
      return null;
    } catch (error) {
      console.error('Error loading character:', error);
      return null;
    }
  },

  /**
   * Clear saved character data
   */
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Character data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing character:', error);
      return false;
    }
  },

  /**
   * Export character data as JSON file
   */
  exportJSON(characterData) {
    try {
      const json = JSON.stringify(characterData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${characterData.info.characterName || 'character'}_mythras.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Character exported successfully');
      return true;
    } catch (error) {
      console.error('Error exporting character:', error);
      return false;
    }
  },

  /**
   * Import character data from JSON file
   */
  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const migratedData = this.migrateData(data);
          resolve(migratedData);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  },

  /**
   * Migrate old data formats to current version
   */
  migrateData(data) {
    // Create a base structure and merge with loaded data
    const base = this.createEmptyCharacter();
    
    // Deep merge function
    const deepMerge = (target, source) => {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          target[key] = target[key] || {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    };
    
    return deepMerge(base, data);
  },

  /**
   * Auto-save with debouncing
   */
  autoSaveTimer: null,
  
  scheduleAutoSave(characterData, delay = 2000) {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
    
    this.autoSaveTimer = setTimeout(() => {
      this.save(characterData);
    }, delay);
  },

  /**
   * Convert image file to base64
   */
  imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading image'));
      };
      
      reader.readAsDataURL(file);
    });
  },

  /**
   * Check if localStorage is available
   */
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
