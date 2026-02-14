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
      
      // Species abilities (user-editable)
      speciesAbilities: [],
      
      // Spell-Like Abilities section collapsed state
      spellLikeCollapsed: false,
      
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
      notesData: {},
      notesLayout: [],
      
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
      
      // If quota exceeded, try saving without images as fallback
      if (error.name === 'QuotaExceededError' || error.code === 22) {
        console.warn('localStorage quota exceeded — attempting save without images');
        try {
          const stripped = JSON.parse(JSON.stringify(characterData));
          if (stripped.images) {
            stripped.images = { fullBody: null, portrait: null };
          }
          stripped.lastModified = new Date().toISOString();
          const strippedJson = JSON.stringify(stripped);
          localStorage.setItem(this.STORAGE_KEY, strippedJson);
          console.log('Character saved without images (quota recovery)');
          return 'quota_warning';
        } catch (e2) {
          console.error('Failed even without images:', e2);
          return false;
        }
      }
      
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
    
    const result = deepMerge(base, data);
    
    // Clean up old/stale runtime flags that should not be persisted
    delete result.artfulDodgerActive;
    delete result.hasArtfulDodger;
    delete result.evadeWithoutArtfulDodger;
    delete result.artfulDodgerDisplayed;
    delete result.agileDisplayed;
    
    // Clean up deprecated rage fatigue tracking booleans (replaced by counter system)
    delete result.firstRageFatigueWaived;
    delete result.currentRageIsFirst;
    
    return result;
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
      const result = this.save(characterData);
      if (result === 'quota_warning' && !this._quotaWarningShown) {
        this._quotaWarningShown = true;
        console.warn('Auto-save: images stripped due to storage quota. Use Export JSON to preserve images.');
      }
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
   * Compress an image file using canvas resizing and JPEG compression.
   * @param {File} file - The image file to compress
   * @param {number} maxWidth - Maximum width in pixels
   * @param {number} maxHeight - Maximum height in pixels
   * @param {number} quality - JPEG quality (0-1), default 0.75
   * @returns {Promise<string>} - Compressed base64 data URL
   */
  compressImage(file, maxWidth, maxHeight, quality = 0.75) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Error reading image'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Error loading image'));
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          
          // Scale down proportionally if exceeds max dimensions
          if (w > maxWidth || h > maxHeight) {
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          
          // Use JPEG for photos (much smaller than PNG)
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.src = e.target.result;
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
