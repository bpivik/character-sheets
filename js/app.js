/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Main Application Controller
   ============================================ */

// Slot constants
const PROFESSIONAL_SKILL_SLOTS = 22; // Professional skill row slots
const EQUIPMENT_SLOTS = 20; // Equipment row slots

const App = {
  // Current character data
  character: null,
  
  // Current sheet type
  sheetType: 'human',
  
  // Track active ability effects (to prevent stacking and enable removal)
  activeAbilityEffects: {},
  
  // Ability effects configuration - abilities that modify stats/skills
  ABILITY_EFFECTS: {
    'agile': {
      description: '+4 Initiative',
      apply: function(app) {
        const origField = document.getElementById('initiative-original');
        const currField = document.getElementById('initiative-current');
        if (origField) {
          const origVal = parseInt(origField.value, 10) || 0;
          origField.value = origVal + 4;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal + 4;
        }
      },
      remove: function(app) {
        const origField = document.getElementById('initiative-original');
        const currField = document.getElementById('initiative-current');
        if (origField) {
          const origVal = parseInt(origField.value, 10) || 0;
          origField.value = origVal - 4;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal - 4;
        }
      }
    },
    'artful dodger': {
      description: '+10 Evade',
      apply: function(app) {
        const baseField = document.getElementById('evade-base');
        const currField = document.getElementById('evade-current');
        if (baseField) {
          const baseVal = parseInt(baseField.textContent, 10) || 0;
          baseField.textContent = baseVal + 10;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal + 10;
        }
      },
      remove: function(app) {
        const baseField = document.getElementById('evade-base');
        const currField = document.getElementById('evade-current');
        if (baseField) {
          const baseVal = parseInt(baseField.textContent, 10) || 0;
          baseField.textContent = baseVal - 10;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal - 10;
        }
      }
    },
    'weapon precision': {
      description: 'Use STR+DEX for Damage Modifier with finesse weapons',
      // List of weapons that benefit from Weapon Precision
      eligibleWeapons: ['club', 'dagger', 'garrote', 'knife', 'shortsword', 'short sword', 'main gauche', 'main-gauche', 'rapier', 'unarmed', 'dart', 'sling', 'short bow', 'shortbow', 'javelin'],
      apply: function(app) {
        const strVal = parseInt(document.getElementById('str-value')?.value, 10) || 0;
        const sizVal = parseInt(document.getElementById('siz-value')?.value, 10) || 0;
        const dexVal = parseInt(document.getElementById('dex-value')?.value, 10) || 0;
        
        const strSiz = strVal + sizVal;
        const strDex = strVal + dexVal;
        
        // Get damage modifier for each
        const dmgStrSiz = app.getDamageModifierForSum(strSiz);
        const dmgStrDex = app.getDamageModifierForSum(strDex);
        
        // Show the WP Damage Mod row
        const wpRow = document.getElementById('wp-damage-row');
        const wpOrigField = document.getElementById('wp-damage-mod-original');
        const wpCurrField = document.getElementById('wp-damage-mod-current');
        
        if (wpRow && wpOrigField && wpCurrField) {
          // Always show WP row when ability is active, with STR+DEX based modifier
          wpRow.style.display = '';
          wpOrigField.value = dmgStrDex;
          wpCurrField.value = dmgStrDex;
          
          // Store values for comparison/removal
          app.activeAbilityEffects['weapon precision'].strDexDamage = dmgStrDex;
          app.activeAbilityEffects['weapon precision'].strSizDamage = dmgStrSiz;
        }
        
        // Update all weapon damage displays to use WP mod for eligible weapons
        if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
          window.WeaponData.updateAllWeaponDamage();
        }
      },
      remove: function(app) {
        // Hide the WP Damage Mod row
        const wpRow = document.getElementById('wp-damage-row');
        if (wpRow) {
          wpRow.style.display = 'none';
        }
        const wpOrigField = document.getElementById('wp-damage-mod-original');
        const wpCurrField = document.getElementById('wp-damage-mod-current');
        if (wpOrigField) wpOrigField.value = '';
        if (wpCurrField) wpCurrField.value = '';
        
        // Update all weapon damage displays to use standard damage mod
        if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
          window.WeaponData.updateAllWeaponDamage();
        }
      }
    },
    'lucky': {
      description: '+1 Luck Point',
      persistent: true, // Don't reapply on recalculation - only apply once when gained
      apply: function(app) {
        const origField = document.getElementById('luck-original');
        const currField = document.getElementById('luck-current');
        if (origField) {
          const origVal = parseInt(origField.value, 10) || 0;
          origField.value = origVal + 1;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal + 1;
        }
      },
      remove: function(app) {
        const origField = document.getElementById('luck-original');
        const currField = document.getElementById('luck-current');
        if (origField) {
          const origVal = parseInt(origField.value, 10) || 0;
          origField.value = origVal - 1;
        }
        if (currField) {
          const currVal = parseInt(currField.value, 10) || 0;
          currField.value = currVal - 1;
        }
      }
    },
    'gifted': {
      description: '+1 Experience Roll',
      persistent: true, // Don't reapply on recalculation - only apply once when gained
      apply: function(app) {
        const expField = document.getElementById('exp-rolls');
        if (expField) {
          const currVal = parseInt(expField.value, 10) || 0;
          expField.value = currVal + 1;
        }
      },
      remove: function(app) {
        const expField = document.getElementById('exp-rolls');
        if (expField) {
          const currVal = parseInt(expField.value, 10) || 0;
          expField.value = Math.max(0, currVal - 1);
        }
      }
    },
    'resilient': {
      description: 'Hit Points calculated using STR+CON+SIZ instead of CON+SIZ',
      apply: function(app) {
        // Just mark as active - HP recalculation happens in recalculateAll via hasAbility check
        // Don't call recalculateAll here to avoid loops
      },
      remove: function(app) {
        // Just mark as inactive - HP recalculation happens in recalculateAll via hasAbility check
        // Don't call recalculateAll here to avoid loops
      }
    },
    'berserk rage': {
      description: 'Enter a berserker rage for increased combat effectiveness',
      apply: function(app) {
        // Show the Berserk Rage section
        app.showBerserkRageSection();
      },
      remove: function(app) {
        // End rage if active, then hide section
        if (app.isRaging) {
          app.endBerserkRage(false); // Don't apply fatigue if ability is being removed
        }
        app.hideBerserkRageSection();
      }
    }
  },
  
  // Berserk Rage state
  isRaging: false,
  rageUsesRemaining: null, // null until initialized
  preRageValues: null, // Store values before rage to restore later

  /**
   * Initialize the application
   */
  init() {
    console.log('Initializing Mythras Character Sheet...');
    
    // Check storage availability
    if (!StorageManager.isStorageAvailable()) {
      console.warn('LocalStorage not available. Auto-save disabled.');
    }
    
    // Load existing character or create new
    this.character = StorageManager.load() || StorageManager.createEmptyCharacter();
    this.sheetType = this.character.sheetType || 'human';
    
    // Set up the UI
    this.setupNavigation();
    this.setupSheetTypeSelector();
    this.setupAttributeListeners();
    this.setupAutoSave();
    this.setupImageUploads();
    this.setupButtons();
    
    // Generate dynamic content
    this.generateProfessionalSkills();
    this.generateEquipmentRows();
    this.setupContainerModal();
    this.generateHitLocations();
    this.generateWeaponRows();
    this.generateSpecialAbilities();
    this.generateSpellRows();
    
    // Setup money listeners
    this.setupMoneyListeners();
    
    // Setup magic skill sync between pages (sets up listeners)
    this.setupMagicSkillSync();
    
    // Populate form with loaded data
    this.populateForm();
    
    // Populate species abilities section based on current species
    this.initSpeciesAbilities();
    
    // Sync magic skill values after form is populated
    this.syncMagicSkillValues();
    
    // Validate multiclass restrictions (without showing warnings on load)
    this.updateMulticlassFieldStates();
    
    // Update combat skill name and weapons from classes (if not already set)
    this.updateCombatSkillName();
    this.updateWeaponsKnown();
    this.updateRankName();
    this.updatePrereqKeys();
    this.updateMagicVisibility();
    
    // Setup magic skill sync listeners (for two-way sync between magic page and professional skills)
    this.setupMagicSkillSyncListeners();
    
    // Auto-add magic skills to professional skills based on class
    this.autoAddMagicSkillsToProfessional();
    
    // Sync Professional Skills values to Magic page (must happen after populateForm and autoAdd)
    this.syncProfessionalSkillsToMagicPage();
    
    // Clean up orphaned class features (Cants without abilities, etc.)
    this.cleanupOrphanedClassFeatures();
    
    // Restore last viewed page (after magic visibility so we don't restore hidden pages)
    this.restoreCurrentPage();
    
    // Update container button visibility
    this.updateContainerButtons();
    
    // Setup prereq label click handlers
    this.setupPrereqLabelClicks();
    
    // Setup summary page
    this.setupSummaryPage();
    
    // Setup floating dice roller
    this.setupFloatingDiceRoller();
    
    // Setup EXP spending modal
    this.setupExpModal();
    
    // Setup alphabetize button
    this.setupAlphabetizeButton();
    
    // Setup add row buttons
    this.setupAddRowButtons();
    
    // Setup passion formula listeners
    this.setupPassionFormulaListeners();
    
    // Setup fatigue radio buttons and penalty system
    this.setupFatigueListeners();
    
    // Initial calculations
    this.recalculateAll();
    
    // Restore ability effects (Agile, Artful Dodger, etc.) after calculations
    this.restoreAbilityEffects();
    
    // Restore characteristic increase display name if applicable
    this.restoreCharacteristicIncreaseDisplay();
    
    // Restore Berserk Rage state if applicable
    this.restoreBerserkRageState();
    
    // Compact dynamic sections to only show filled rows
    this.compactDynamicSections();
    
    console.log('Initialization complete!');
  },
  
  /**
   * Compact all dynamic sections to only show filled rows
   */
  compactDynamicSections() {
    // Compact Passions
    this.compactSection('passions-container', '.belief-row', '.belief-name');
    
    // Compact Oaths
    this.compactSection('oaths-container', '.belief-row', '.belief-name');
    
    // Compact Professional Skills
    this.compactSection('professional-skills-container', '.professional-skill-row', '.prof-skill-name');
    
    // Compact Languages (but keep native tongue)
    this.compactLanguages();
    
    // Compact Equipment
    this.compactSection('equipment-container', '.equipment-row', '.equipment-name');
    
    // Compact Class Abilities
    this.compactClassAbilities();
    
    // Compact Melee Weapons
    this.compactSection('melee-weapons-body', 'tr', '.weapon-name');
    
    // Compact Ranged Weapons
    this.compactSection('ranged-weapons-body', 'tr', '.weapon-name');
  },
  
  /**
   * Compact a section by removing empty rows
   * @param {string} containerId - ID of the container element
   * @param {string} rowSelector - CSS selector for rows
   * @param {string} dataFieldSelector - CSS selector for the primary data field to check
   */
  compactSection(containerId, rowSelector, dataFieldSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll(rowSelector));
    
    rows.forEach(row => {
      const dataField = row.querySelector(dataFieldSelector);
      if (dataField && !dataField.value.trim()) {
        row.remove();
      }
    });
    
    // Reindex remaining rows
    this.reindexSection(containerId, rowSelector);
  },
  
  /**
   * Compact languages section (keep native tongue, remove empty others)
   */
  compactLanguages() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.language-row'));
    
    rows.forEach(row => {
      // Skip native tongue row
      if (row.classList.contains('native')) return;
      
      const nameField = row.querySelector('.language-name');
      if (nameField && !nameField.value.trim()) {
        row.remove();
      }
    });
    
    this.reindexLanguages();
  },
  
  /**
   * Compact class abilities section - remove all empty rows
   */
  compactClassAbilities() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.class-ability-row'));
    
    // Remove all empty rows
    rows.forEach(row => {
      const input = row.querySelector('.class-ability-input');
      if (input && !input.value.trim()) {
        row.remove();
      }
    });
    
    this.reindexClassAbilityRows();
  },
  
  /**
   * Reindex rows in a section after compaction
   */
  reindexSection(containerId, rowSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const rows = container.querySelectorAll(rowSelector);
    rows.forEach((row, index) => {
      row.dataset.index = index;
      
      // Update IDs for known section types
      if (containerId === 'passions-container') {
        this.updatePassionRowIds(row, index + 1);
      } else if (containerId === 'oaths-container') {
        this.updateOathRowIds(row, index + 1);
      } else if (containerId === 'professional-skills-container') {
        this.updateProfSkillRowIds(row, index);
      } else if (containerId === 'equipment-container') {
        this.updateEquipmentRowIds(row, index);
      } else if (containerId === 'melee-weapons-body' || containerId === 'ranged-weapons-body') {
        // Weapon rows handled separately
      }
    });
  },
  
  updatePassionRowIds(row, num) {
    const name = row.querySelector('.belief-name');
    const formula = row.querySelector('.belief-formula-input');
    const base = row.querySelector('.belief-base');
    const current = row.querySelector('.belief-input');
    
    if (name) name.id = `passion-${num}-name`;
    if (formula) formula.id = `passion-${num}-formula`;
    if (base) base.id = `passion-${num}-base`;
    if (current) current.id = `passion-${num}-current`;
  },
  
  updateOathRowIds(row, num) {
    const name = row.querySelector('.belief-name');
    const base = row.querySelector('.belief-base');
    const current = row.querySelector('.belief-input');
    
    if (name) name.id = `oath-${num}-name`;
    if (base) base.id = `oath-${num}-base`;
    if (current) current.id = `oath-${num}-current`;
  },
  
  updateProfSkillRowIds(row, index) {
    const prereq = row.querySelector('.prereq-keys');
    const name = row.querySelector('.prof-skill-name');
    const base = row.querySelector('.prof-skill-base');
    const baseVal = row.querySelector('.prof-skill-base-val');
    const current = row.querySelector('.prof-skill-current');
    const enc = row.querySelector('.prof-enc-indicator');
    
    if (prereq) prereq.id = `prof-skill-${index}-prereq`;
    if (name) name.id = `prof-skill-${index}-name`;
    if (base) base.id = `prof-skill-${index}-base`;
    if (baseVal) baseVal.id = `prof-skill-${index}-base-val`;
    if (current) current.id = `prof-skill-${index}-current`;
    if (enc) enc.id = `prof-skill-${index}-enc`;
  },
  
  updateEquipmentRowIds(row, index) {
    const name = row.querySelector('.equipment-name');
    const enc = row.querySelector('.equipment-enc');
    
    if (name) name.id = `equip-${index}-name`;
    if (enc) enc.id = `equip-${index}-enc`;
  },
  
  reindexLanguages() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.language-row:not(.native)');
    rows.forEach((row, index) => {
      const num = index + 2; // Start from 2 (native tongue is 1)
      const name = row.querySelector('.language-name');
      const base = row.querySelector('.language-base');
      const current = row.querySelector('.language-input');
      
      if (name) name.id = `language-${num}-name`;
      if (base) base.id = `language-${num}-base`;
      if (current) current.id = `language-${num}-current`;
    });
  },

  /**
   * Track scroll positions per page
   */
  pageScrollPositions: {},
  currentPageId: null,
  
  /**
   * Set up tab navigation
   */
  setupNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const pages = document.querySelectorAll('.sheet-page');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPage = tab.dataset.page;
        
        // Save scroll position of current page before switching
        if (this.currentPageId) {
          this.pageScrollPositions[this.currentPageId] = window.scrollY;
        }
        
        // Update tab states
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update page visibility
        pages.forEach(page => {
          page.classList.remove('active');
          if (page.id === `page-${targetPage}`) {
            page.classList.add('active');
          }
        });
        
        // Update current page tracker
        this.currentPageId = targetPage;
        
        // Restore scroll position for target page (or scroll to top if none saved)
        const savedScroll = this.pageScrollPositions[targetPage];
        if (savedScroll !== undefined) {
          window.scrollTo(0, savedScroll);
        } else {
          window.scrollTo(0, 0);
        }
        
        // Save current page to localStorage
        try {
          localStorage.setItem('mythras-current-page', targetPage);
        } catch (e) {
          // Ignore storage errors
        }
        
        // Update weapon damages when switching to Combat page
        if (targetPage === 'combat' && window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
          window.WeaponData.updateAllWeaponDamage();
        }
        
        // Sync magic skill values when switching to Magic pages
        if (targetPage === 'magic1' || targetPage === 'magic2') {
          this.syncProfessionalSkillsToMagicPage();
        }
        
        // Refresh summary widgets when switching to Summary page
        if (targetPage === 'summary') {
          this.refreshSummaryWidgets();
        }
      });
    });
  },
  
  /**
   * Restore the last viewed page from localStorage
   */
  restoreCurrentPage() {
    try {
      const savedPage = localStorage.getItem('mythras-current-page');
      if (savedPage) {
        const tab = document.querySelector(`.tab-btn[data-page="${savedPage}"]`);
        const page = document.getElementById(`page-${savedPage}`);
        
        // Only restore if tab is visible (not hidden due to magic class restrictions)
        if (tab && page && tab.parentElement.style.display !== 'none') {
          document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.sheet-page').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          page.classList.add('active');
          this.currentPageId = savedPage;
        } else {
          // Default to main page
          this.currentPageId = 'main';
        }
      } else {
        // No saved page - default to main
        this.currentPageId = 'main';
      }
      
      // Always scroll to top on fresh load
      window.scrollTo(0, 0);
    } catch (e) {
      // Ignore storage errors
      this.currentPageId = 'main';
      window.scrollTo(0, 0);
    }
  },

  /**
   * Set up sheet type based on species (auto-detect Syrin)
   */
  setupSheetTypeSelector() {
    const selector = document.getElementById('sheet-type-select');
    if (selector) {
      // Hide the selector - it's now automatic based on species
      selector.style.display = 'none';
    }
    
    // Set initial sheet type based on species
    this.updateSheetTypeFromSpecies();
    
    // Set initial sheet type on app element
    document.getElementById('app').dataset.sheetType = this.sheetType;
  },
  
  /**
   * Update sheet type based on species field
   */
  updateSheetTypeFromSpecies(previousSpecies = null) {
    const speciesInput = document.getElementById('species');
    const species = speciesInput?.value?.trim() || '';
    const speciesLower = species.toLowerCase();
    
    // Determine if Syrin
    const isSyrin = speciesLower.indexOf('syrin') !== -1;
    const newSheetType = isSyrin ? 'syrin' : 'human';
    
    // Update sheet type if changed
    if (this.sheetType !== newSheetType) {
      // Save current hit location data before regenerating
      this.saveHitLocationsToCharacter();
      
      this.sheetType = newSheetType;
      this.character.sheetType = this.sheetType;
      document.getElementById('app').dataset.sheetType = this.sheetType;
      
      // Update the hidden selector value (for consistency)
      const selector = document.getElementById('sheet-type-select');
      if (selector) selector.value = this.sheetType;
      
      // Regenerate hit locations for new type
      this.generateHitLocations();
      
      // Restore hit location data
      this.loadHitLocationsFromCharacter();
    }
    
    // Handle species-specific features
    this.updateSpeciesFeatures(species, previousSpecies);
    
    this.recalculateAll();
  },
  
  /**
   * Update species-specific features (movement, flying, abilities)
   */
  updateSpeciesFeatures(newSpecies, previousSpecies = null) {
    if (!window.SpeciesData) return;
    
    const newSpeciesLower = newSpecies?.toLowerCase().trim() || '';
    const prevSpeciesLower = previousSpecies?.toLowerCase().trim() || '';
    
    // Get species data
    const newData = window.SpeciesData.getSpecies(newSpeciesLower);
    const prevData = previousSpecies ? window.SpeciesData.getSpecies(prevSpeciesLower) : null;
    
    // Update movement rate
    const movementInput = document.getElementById('movement-current');
    if (movementInput && newData) {
      movementInput.value = newData.movement;
    }
    
    // Update flying speed
    const flyingInput = document.getElementById('flying-speed');
    if (flyingInput) {
      if (newData && newData.flyingSpeed) {
        flyingInput.value = newData.flyingSpeed + "'";
      } else {
        flyingInput.value = '';
      }
    }
    
    // Auto-set culture based on species (only when species changes)
    this.autoSetCultureForSpecies(newSpeciesLower);
    
    // Remove previous species ability effects
    if (prevData && prevData.abilities && prevData.abilities.length > 0) {
      prevData.abilities.forEach(ability => {
        this.removeAbilityEffect(ability);
      });
    }
    
    // Clear saved species abilities since species has changed
    this.character.speciesAbilities = [];
    
    // Populate the Species Abilities section (replaces old content)
    // Pass true to apply persistent effects since this is a user-initiated species change
    this.populateSpeciesAbilitiesSection(newData ? newData.abilities : [], true);
    
    this.scheduleAutoSave();
  },
  
  /**
   * Auto-set culture based on species
   * - Human, Half-Elf, Half-Orc: No change (can choose any)
   * - Abyssar, Dwarf, Gnome: Barbarian
   * - Elf, Halfling, Khelmar, Syrin: Civilized
   * - Vulpan: Nomad
   */
  autoSetCultureForSpecies(species) {
    const cultureField = document.getElementById('culture');
    if (!cultureField) return;
    
    // Species with no automatic culture (player's choice)
    const freeChoiceSpecies = ['human', 'half-elf', 'half-orc'];
    if (!species || freeChoiceSpecies.includes(species)) {
      // Don't change culture for these species
      return;
    }
    
    // Species locked to Barbarian
    const barbarianSpecies = ['abyssar', 'dwarf', 'gnome'];
    if (barbarianSpecies.includes(species)) {
      cultureField.value = 'Barbarian';
      return;
    }
    
    // Species locked to Civilized
    const civilizedSpecies = ['elf', 'halfling', 'khelmar', 'syrin'];
    if (civilizedSpecies.includes(species)) {
      cultureField.value = 'Civilized';
      return;
    }
    
    // Vulpan is Nomad
    if (species === 'vulpan') {
      cultureField.value = 'Nomad';
      return;
    }
  },
  
  /**
   * Populate the dedicated Species Abilities section
   * @param {Array} abilities - List of ability names
   * @param {boolean} applyPersistentEffects - If true, apply persistent effects (for species changes after init)
   */
  populateSpeciesAbilitiesSection(abilities, applyPersistentEffects = false) {
    const container = document.getElementById('species-abilities-list');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // If no abilities, just leave empty (user can add with + button)
    if (!abilities || abilities.length === 0) {
      return;
    }
    
    // Create rows for each ability
    abilities.forEach((ability, index) => {
      this.addSpeciesAbilityRow(ability, applyPersistentEffects);
    });
  },
  
  /**
   * Add a species ability row
   */
  addSpeciesAbilityRow(abilityName = '', applyPersistentEffects = false) {
    const container = document.getElementById('species-abilities-list');
    if (!container) return null;
    
    const index = container.children.length;
    
    const row = document.createElement('div');
    row.className = 'species-ability-row';
    row.dataset.index = index;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'species-ability-input';
    input.id = `species-ability-${index}`;
    input.value = abilityName ? this.toTitleCase(abilityName) : '';
    input.dataset.previousValue = input.value;
    input.placeholder = '';
    
    const infoBtn = document.createElement('button');
    infoBtn.type = 'button';
    infoBtn.className = 'species-ability-info-btn';
    infoBtn.textContent = 'i';
    infoBtn.title = 'View ability details';
    infoBtn.style.display = abilityName ? '' : 'none';
    
    // Handle ability changes
    input.addEventListener('blur', () => {
      this.handleSpeciesAbilityChange(input);
      this.cleanupEmptySpeciesAbilityRows();
    });
    
    input.addEventListener('input', () => {
      infoBtn.style.display = input.value.trim() ? '' : 'none';
      this.scheduleAutoSave();
    });
    
    // Info button click handler
    infoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const name = input.value.trim();
      if (name) {
        this.showAbilityDetail(name);
      }
    });
    
    row.appendChild(input);
    row.appendChild(infoBtn);
    container.appendChild(row);
    
    // Apply ability effect if applicable
    if (abilityName) {
      const baseName = abilityName.split('(')[0].trim().toLowerCase();
      const effect = this.ABILITY_EFFECTS[baseName];
      if (effect && effect.persistent && !applyPersistentEffects) {
        // Skip persistent effects during init - saved values already include them
        // Just mark as active
        this.activeAbilityEffects[baseName] = { active: true };
      } else {
        this.applyAbilityEffect(abilityName);
      }
    }
    
    return input;
  },
  
  /**
   * Handle species ability change
   */
  handleSpeciesAbilityChange(input) {
    const value = input.value.trim();
    const previousValue = input.dataset.previousValue || '';
    
    // Remove old ability effect if changed
    if (previousValue && previousValue !== value) {
      this.removeAbilityEffect(previousValue);
    }
    
    if (!value) {
      input.dataset.previousValue = '';
      return;
    }
    
    // Convert to title case
    input.value = this.toTitleCase(value);
    input.dataset.previousValue = input.value;
    
    // Apply new ability effect
    this.applyAbilityEffect(input.value);
    
    // Update tooltip
    this.updateAbilityTooltip(input);
    
    this.scheduleAutoSave();
  },
  
  /**
   * Clean up empty species ability rows
   */
  cleanupEmptySpeciesAbilityRows() {
    const container = document.getElementById('species-abilities-list');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.species-ability-row'));
    
    // Remove all empty rows
    rows.forEach(row => {
      const input = row.querySelector('.species-ability-input');
      if (input && !input.value.trim()) {
        row.remove();
      }
    });
    
    // Reindex remaining rows
    const remainingRows = container.querySelectorAll('.species-ability-row');
    remainingRows.forEach((row, i) => {
      row.dataset.index = i;
      const input = row.querySelector('.species-ability-input');
      if (input) {
        input.id = `species-ability-${i}`;
      }
    });
  },
  
  /**
   * Remove last species ability row
   */
  removeLastSpeciesAbilityRow() {
    const container = document.getElementById('species-abilities-list');
    if (!container || container.children.length === 0) return;
    
    const rows = Array.from(container.querySelectorAll('.species-ability-row'));
    const lastRow = rows[rows.length - 1];
    const input = lastRow?.querySelector('.species-ability-input');
    
    if (input && input.value.trim()) {
      const confirmed = confirm(`Remove "${input.value.trim()}"?\n\nThis will delete this ability.`);
      if (!confirmed) return;
      
      // Remove ability effect
      this.removeAbilityEffect(input.value);
    }
    
    if (lastRow) {
      lastRow.remove();
      this.scheduleAutoSave();
    }
  },
  
  /**
   * Get all species abilities currently displayed
   */
  getSpeciesAbilities() {
    const abilities = [];
    const container = document.getElementById('species-abilities-list');
    if (!container) return abilities;
    
    const inputs = container.querySelectorAll('.species-ability-input');
    inputs.forEach(input => {
      if (input.value.trim()) {
        abilities.push(input.value.trim());
      }
    });
    return abilities;
  },
  
  /**
   * Initialize species abilities section on page load
   */
  initSpeciesAbilities() {
    const speciesInput = document.getElementById('species');
    const species = speciesInput?.value?.trim().toLowerCase() || '';
    
    // If we have saved species abilities, use those
    if (this.character.speciesAbilities && this.character.speciesAbilities.length > 0) {
      this.populateSpeciesAbilitiesSection(this.character.speciesAbilities);
      return;
    }
    
    if (!species || !window.SpeciesData) {
      // No species set and no saved abilities
      this.populateSpeciesAbilitiesSection([]);
      return;
    }
    
    const speciesData = window.SpeciesData.getSpecies(species);
    if (speciesData && speciesData.abilities) {
      this.populateSpeciesAbilitiesSection(speciesData.abilities);
    } else {
      this.populateSpeciesAbilitiesSection([]);
    }
  },
  
  /**
   * Check if an ability matches another with fuzzy matching for notes
   * e.g., "Spell-Like Abilities (Produce Flame)" matches "Spell-Like Abilities"
   */
  abilityMatchesFuzzy(abilityWithNotes, baseAbility) {
    if (!abilityWithNotes || !baseAbility) return false;
    
    const normalizedInput = abilityWithNotes.toLowerCase().trim();
    const normalizedBase = baseAbility.toLowerCase().trim();
    
    // Exact match
    if (normalizedInput === normalizedBase) return true;
    
    // Input starts with the base ability
    if (normalizedInput.startsWith(normalizedBase)) return true;
    
    // Base starts with the input (for reverse matching)
    if (normalizedBase.startsWith(normalizedInput)) return true;
    
    return false;
  },

  /**
   * Set up attribute input listeners
   */
  setupAttributeListeners() {
    // Attribute inputs (single value for Characteristics)
    const attrInputs = document.querySelectorAll('.attribute-input');
    attrInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const attr = e.target.dataset.attr;
        if (attr) {
          this.character.attributes[attr] = e.target.value;
          this.recalculateAll();
          this.scheduleAutoSave();
        }
      });
    });
    
    // Movement input (current only)
    const movementCurrent = document.getElementById('movement-current');
    if (movementCurrent) {
      movementCurrent.addEventListener('input', (e) => {
        // Handle combined ENC + Fatigue penalty
        if (e.target.classList.contains('enc-penalty-init-move') || e.target.classList.contains('fatigue-penalized')) {
          // User is editing while penalized - update original value
          e.target.dataset.originalValue = e.target.value;
          // Re-apply all penalties after a short delay
          setTimeout(() => this.applyAllPenalties(), 10);
        } else if (e.target.dataset.originalValue !== undefined) {
          e.target.dataset.originalValue = e.target.value;
        }
        
        this.character.derived.movementCurrent = e.target.dataset.originalValue || e.target.value;
        this.updateMovementDisplay();
        this.scheduleAutoSave();
      });
    }
    
    // Height input (for jump calculations)
    const heightInput = document.getElementById('height');
    if (heightInput) {
      heightInput.addEventListener('input', (e) => {
        this.character.info.height = e.target.value;
        this.updateJumpDisplay();
        this.scheduleAutoSave();
      });
    }
  },

  /**
   * Set up auto-save for all inputs
   */
  setupAutoSave() {
    // Info fields
    const infoFields = [
      'character-name', 'species', 'culture', 'class-primary', 'class-secondary',
      'class-tertiary', 'rank-name', 'gender', 'age', 'handedness', 'height',
      'weight', 'hair', 'eyes', 'rank-primary', 'rank-secondary', 'rank-tertiary',
      'tenacity-current', 'tenacity-max', 'exp-rolls'
    ];
    
    // Class fields need special handling to update combat skill name
    const classFields = ['class-primary', 'class-secondary', 'class-tertiary'];
    
    // Rank fields need to update rank name and recalculate attributes
    const rankFields = ['rank-primary', 'rank-secondary', 'rank-tertiary'];
    
    // Set up dedicated rank field listeners for immediate recalculation
    rankFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        // Store previous value on focus
        field.addEventListener('focus', () => {
          field.dataset.previousRank = field.value || '0';
        });
        
        const handleRankChange = () => {
          const previousRank = parseInt(field.dataset.previousRank, 10) || 0;
          let newRank = parseInt(field.value, 10) || 0;
          newRank = Math.max(0, Math.min(5, newRank));
          field.value = newRank;
          field.dataset.previousRank = newRank;
          this.character.info[this.camelCase(fieldId)] = newRank;
          
          // Check if rank decreased - need to remove abilities for higher ranks
          if (newRank < previousRank) {
            this.handleRankDecrease(fieldId, previousRank, newRank);
          }
          
          this.recalculateAll();
          this.scheduleAutoSave();
        };
        field.addEventListener('input', handleRankChange);
        field.addEventListener('change', handleRankChange);
      }
    });
    
    // Set up species field listener for immediate recalculation and species features update
    const speciesField = document.getElementById('species');
    if (speciesField) {
      // Store initial value for change detection
      speciesField.dataset.previousValue = speciesField.value || '';
      
      const handleSpeciesChange = () => {
        const previousSpecies = speciesField.dataset.previousValue || '';
        const currentSpecies = speciesField.value || '';
        
        // Only update species features if actually changed
        if (previousSpecies.toLowerCase().trim() !== currentSpecies.toLowerCase().trim()) {
          this.updateSheetTypeFromSpecies(previousSpecies);
          speciesField.dataset.previousValue = currentSpecies;
        }
        
        this.recalculateAll();
        this.updateMagicVisibility();
        this.scheduleAutoSave();
      };
      speciesField.addEventListener('input', handleSpeciesChange);
      speciesField.addEventListener('change', handleSpeciesChange);
    }
    
    infoFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          const key = this.camelCase(fieldId);
          this.character.info[key] = e.target.value;
          
          // Clamp rank values to 0-5 (also handled above, but keep for consistency)
          if (rankFields.includes(fieldId)) {
            let val = parseInt(e.target.value, 10);
            if (!isNaN(val)) {
              val = Math.max(0, Math.min(5, val));
              e.target.value = val;
              this.character.info[key] = val;
            }
          }
          
          this.scheduleAutoSave();
        });
        
        // Add blur listener for class fields to validate and update
        if (classFields.includes(fieldId)) {
          // Store previous value to detect changes
          field.addEventListener('focus', (e) => {
            e.target.dataset.previousValue = e.target.value;
            // Store all previous classes for spell tracking
            e.target.dataset.previousClasses = JSON.stringify([
              { name: document.getElementById('class-primary')?.value?.trim().toLowerCase() || '', rank: parseInt(document.getElementById('rank-primary')?.value, 10) || 0 },
              { name: document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '', rank: parseInt(document.getElementById('rank-secondary')?.value, 10) || 0 },
              { name: document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || '', rank: parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0 }
            ].filter(c => c.name));
          });
          
          field.addEventListener('blur', () => {
            const previousValue = field.dataset.previousValue || '';
            const currentValue = field.value.trim();
            const previousClasses = field.dataset.previousClasses ? JSON.parse(field.dataset.previousClasses) : null;
            
            // Determine corresponding rank field
            const rankFieldId = fieldId.replace('class-', 'rank-');
            const rankField = document.getElementById(rankFieldId);
            
            // If class was cleared, clear the rank too
            if (!currentValue && previousValue) {
              if (rankField) {
                rankField.value = '';
                const rankKey = this.camelCase(rankFieldId);
                this.character.info[rankKey] = '';
              }
            }
            
            // If class was added (new value entered), prompt for rank
            if (currentValue && !previousValue) {
              this.promptForRank(currentValue, rankFieldId);
            }
            
            // Validate multiclass restrictions
            this.validateAndUpdateClasses(fieldId);
            this.updateCombatSkillName(true);
            this.updateWeaponsKnown(true);
            this.updateRankName();
            this.updatePrereqKeys();
            this.updateMagicVisibility();
            this.updateSpellMemorization();
            
            // Handle magic skills - remove obsolete ones first, then add new ones
            this.removeObsoleteMagicSkills();
            this.autoAddMagicSkillsToProfessional();
            
            // Update class spells after a brief delay to ensure rank is set
            setTimeout(() => {
              this.updateClassSpells(previousClasses);
              this.updateClassAbilities(previousClasses);
            }, 50);
            
            this.scheduleAutoSave();
          });
        }
        
        // Species field is handled separately above with input/change listeners
        // Skip adding duplicate listeners here
        if (fieldId === 'species') {
          // Do nothing - handled in the main species listener above
        }
        
        // Add blur listener for rank fields to update rank name and prereq keys
        if (rankFields.includes(fieldId)) {
          field.addEventListener('blur', () => {
            this.updateRankName();
            this.updatePrereqKeys();
            this.updateSpellMemorization();
            this.updateClassSpells();
            this.updateClassAbilities();
            this.scheduleAutoSave();
          });
        }
      }
    });
    
    // Derived stat inputs (editable ones)
    const derivedFields = [
      'action-points-current',
      'damage-mod-current',
      'exp-mod-current',
      'healing-rate-current',
      'initiative-current',
      'luck-current',
      'magic-points-current',
      'tenacity-current'
    ];
    
    derivedFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          const key = this.camelCase(fieldId);
          
          // Handle combined ENC + Fatigue penalty for initiative and action points
          if ((fieldId === 'initiative-current' || fieldId === 'action-points-current') &&
              (e.target.classList.contains('enc-penalty-init-move') || e.target.classList.contains('fatigue-penalized'))) {
            // User is editing while penalized - update original value
            e.target.dataset.originalValue = e.target.value;
            // Re-apply all penalties after a short delay
            setTimeout(() => this.applyAllPenalties(), 10);
          } else if (fieldId === 'initiative-current' || fieldId === 'action-points-current') {
            // Normal edit - also update originalValue if it exists
            if (e.target.dataset.originalValue !== undefined) {
              e.target.dataset.originalValue = e.target.value;
            }
          }
          
          this.character.derived[key] = e.target.dataset.originalValue || e.target.value;
          this.scheduleAutoSave();
          
          // Update weapon damages when damage modifier changes
          if (fieldId === 'damage-mod-current') {
            if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
              window.WeaponData.updateAllWeaponDamage();
            }
          }
        });
      }
    });
    
    // Skill current values
    document.querySelectorAll('.skill-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const skillKeyKebab = e.target.id.replace('-current', '');
        const skillKey = this.camelCase(skillKeyKebab);
        
        // If there's any active penalty and user is editing, update the original value
        if (e.target.classList.contains('enc-penalized-value') || e.target.classList.contains('fatigue-penalized')) {
          // User is editing a penalized field - treat the input as the NEW original
          const newOriginal = e.target.value;
          e.target.dataset.originalValue = newOriginal;
          this.character.standardSkills[skillKey] = newOriginal;
          
          // Re-apply all penalties after a short delay
          setTimeout(() => this.applyAllPenalties(), 10);
        } else {
          // Normal edit - also update originalValue if it exists
          if (e.target.dataset.originalValue !== undefined) {
            e.target.dataset.originalValue = e.target.value;
          }
          this.character.standardSkills[skillKey] = e.target.value;
        }
        
        this.updateCombatQuickRef();
        this.scheduleAutoSave();
      });
    });
    
    // Notes
    const notesFields = ['general-notes'];
    notesFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          this.character.notes = e.target.value;
          this.scheduleAutoSave();
        });
      }
    });
    
    // Combat skill inputs
    const combatSkillFields = ['combat-skill-1-name', 'combat-skill-1-percent', 'combat-skill-1-weapons', 'unarmed-percent'];
    combatSkillFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', () => {
          // For percent fields, handle combined ENC + Fatigue penalty
          if (fieldId === 'combat-skill-1-percent' || fieldId === 'unarmed-percent') {
            // If field has a penalty applied, update the original value
            if (field.classList.contains('enc-penalized-value') || field.classList.contains('fatigue-penalized')) {
              field.dataset.originalValue = field.value;
              // Re-apply all penalties
              setTimeout(() => this.applyAllPenalties(), 10);
            } else {
              // No penalty, original = current
              field.dataset.originalValue = field.value;
            }
          }
          this.updateCombatQuickRef();
          this.scheduleAutoSave();
        });
      }
    });
  },

  /**
   * Schedule an auto-save
   */
  scheduleAutoSave() {
    StorageManager.scheduleAutoSave(this.character);
  },

  /**
   * Set up image upload handlers
   */
  setupImageUploads() {
    // Full body portrait
    const fullBodyUpload = document.getElementById('full-body-upload');
    if (fullBodyUpload) {
      fullBodyUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const base64 = await StorageManager.imageToBase64(file);
            this.character.images.fullBody = base64;
            this.displayImage('full-body', base64);
            this.scheduleAutoSave();
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      });
    }
    
    // Thumbnail portrait
    const portraitUpload = document.getElementById('portrait-upload');
    if (portraitUpload) {
      portraitUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const base64 = await StorageManager.imageToBase64(file);
            this.character.images.portrait = base64;
            this.displayImage('portrait', base64);
            this.scheduleAutoSave();
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      });
    }
    
    // Remove image buttons
    document.querySelectorAll('.btn-remove-image').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = btn.dataset.target;
        this.removeImage(target);
      });
    });
  },

  /**
   * Display an uploaded image
   */
  displayImage(target, base64) {
    const img = document.getElementById(`${target}-image`);
    const label = img.previousElementSibling;
    const removeBtn = img.nextElementSibling;
    
    if (img && base64) {
      img.src = base64;
      img.classList.remove('hidden');
      if (label) label.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
    }
  },

  /**
   * Remove an uploaded image
   */
  removeImage(target) {
    const img = document.getElementById(`${target}-image`);
    const label = img.previousElementSibling;
    const removeBtn = img.nextElementSibling;
    const input = document.getElementById(`${target}-upload`);
    
    if (target === 'full-body') {
      this.character.images.fullBody = null;
    } else {
      this.character.images.portrait = null;
    }
    
    if (img) {
      img.src = '';
      img.classList.add('hidden');
    }
    if (label) label.classList.remove('hidden');
    if (removeBtn) removeBtn.classList.add('hidden');
    if (input) input.value = '';
    
    this.scheduleAutoSave();
  },

  /**
   * Set up button handlers
   */
  setupButtons() {
    // Save button
    const saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.collectFormData();
        if (StorageManager.save(this.character)) {
          alert('Character saved!');
        } else {
          alert('Error saving character.');
        }
      });
    }
    
    // Load button
    const loadBtn = document.getElementById('btn-load');
    if (loadBtn) {
      loadBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            try {
              this.character = await StorageManager.importJSON(file);
              this.sheetType = this.character.sheetType || 'human';
              document.getElementById('sheet-type-select').value = this.sheetType;
              document.getElementById('app').dataset.sheetType = this.sheetType;
              this.generateHitLocations();
              this.populateForm();
              this.recalculateAll();
              alert('Character loaded!');
            } catch (error) {
              alert('Error loading file: ' + error.message);
            }
          }
        };
        input.click();
      });
    }
    
    // Export button
    const exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.collectFormData();
        StorageManager.exportJSON(this.character);
      });
    }
    
    // Print button
    const printBtn = document.getElementById('btn-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
    
    // Sort abilities button
    const sortBtn = document.getElementById('btn-sort-abilities');
    if (sortBtn) {
      sortBtn.addEventListener('click', () => {
        this.sortSpecialAbilities();
      });
    }
    
    // Alphabetize spells buttons (individual for each rank)
    const spellRanks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    spellRanks.forEach(rankKey => {
      const btn = document.getElementById(`btn-alphabetize-${rankKey}`);
      if (btn) {
        btn.addEventListener('click', () => {
          this.alphabetizeSpellsInRank(rankKey);
        });
      }
    });
    
    // Unlock originals button (for Attributes only)
    const unlockOriginalsBtn = document.getElementById('unlock-originals-btn');
    if (unlockOriginalsBtn) {
      unlockOriginalsBtn.addEventListener('click', () => {
        this.toggleOriginalsEditing();
      });
    }
    
    // Short Rest button - recover one fatigue level
    const shortRestBtn = document.getElementById('btn-short-rest');
    if (shortRestBtn) {
      shortRestBtn.addEventListener('click', () => {
        this.shortRest();
      });
    }
    
    // Long Rest button - fully recover to Fresh
    const longRestBtn = document.getElementById('btn-long-rest');
    if (longRestBtn) {
      longRestBtn.addEventListener('click', () => {
        this.longRest();
      });
    }
    
    // Short Rest Modal buttons
    const shortRestModalClose = document.getElementById('short-rest-modal-close');
    if (shortRestModalClose) {
      shortRestModalClose.addEventListener('click', () => {
        this.closeShortRestModal();
      });
    }
    
    const applyShortRestBtn = document.getElementById('btn-apply-short-rest');
    if (applyShortRestBtn) {
      applyShortRestBtn.addEventListener('click', () => {
        this.applyShortRestAction();
      });
    }
    
    const cancelShortRestBtn = document.getElementById('btn-cancel-short-rest');
    if (cancelShortRestBtn) {
      cancelShortRestBtn.addEventListener('click', () => {
        this.closeShortRestModal();
      });
    }
    
    // Close modal on overlay click
    const shortRestOverlay = document.getElementById('short-rest-modal-overlay');
    if (shortRestOverlay) {
      shortRestOverlay.addEventListener('click', (e) => {
        if (e.target === shortRestOverlay) {
          this.closeShortRestModal();
        }
      });
    }
  },
  
  /**
   * Toggle editing of Characteristics only (Attributes are always auto-calculated)
   */
  toggleOriginalsEditing() {
    const charInputs = document.querySelectorAll('.char-readonly, .char-editable');
    const btn = document.getElementById('unlock-originals-btn');
    
    // Check current state based on characteristics
    const isCurrentlyReadonly = charInputs[0]?.classList.contains('char-readonly');
    
    // Toggle Characteristics only (Attributes remain auto-calculated and readonly)
    charInputs.forEach(input => {
      if (isCurrentlyReadonly) {
        input.removeAttribute('readonly');
        input.classList.remove('char-readonly');
        input.classList.add('char-editable');
      } else {
        input.setAttribute('readonly', '');
        input.classList.remove('char-editable');
        input.classList.add('char-readonly');
      }
    });
    
    // Update locked state (still track this for saving purposes)
    this.character.originalsLocked = !isCurrentlyReadonly;
    
    this.scheduleAutoSave();
    
    if (btn) {
      if (isCurrentlyReadonly) {
        btn.textContent = '🔓 Lock Characteristics';
        btn.classList.add('unlocked');
      } else {
        btn.textContent = '🔒 Unlock Characteristics';
        btn.classList.remove('unlocked');
      }
    }
  },

  /**
   * Save the current derived original values to character data
   */
  saveDerivedOriginalValues() {
    const fields = {
      'action-points-original': 'actionPointsOriginal',
      'damage-mod-original': 'damageModOriginal',
      'exp-mod-original': 'expModOriginal',
      'healing-rate-original': 'healingRateOriginal',
      'initiative-original': 'initiativeOriginal',
      'luck-original': 'luckOriginal',
      'magic-points-original': 'magicPointsOriginal'
    };
    
    for (const [fieldId, key] of Object.entries(fields)) {
      const input = document.getElementById(fieldId);
      if (input) {
        this.character.derived[key] = input.value;
      }
    }
  },

  /**
   * Generate professional skill rows
   */
  generateProfessionalSkills() {
    const container = document.getElementById('professional-skills-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const row = document.createElement('div');
      row.className = 'professional-skill-row';
      row.innerHTML = `
        <span class="prereq-keys" id="prof-skill-${i}-prereq" data-skill-name=""></span>
        <input type="text" class="prof-skill-name" id="prof-skill-${i}-name" placeholder="">
        <input type="text" class="prof-skill-base" id="prof-skill-${i}-base" placeholder="" readonly>
        <span class="prof-skill-base-val" id="prof-skill-${i}-base-val"></span>
        <input type="number" class="prof-skill-current" id="prof-skill-${i}-current" placeholder="">
        <span class="enc-indicator prof-enc-indicator" id="prof-skill-${i}-enc" style="display: none;" title="Affected by ENC"></span>
      `;
      container.appendChild(row);
      
      // Add event listeners
      const nameInput = row.querySelector('.prof-skill-name');
      const baseInput = row.querySelector('.prof-skill-base');
      const currentInput = row.querySelector('.prof-skill-current');
      const prereqKeys = row.querySelector('.prereq-keys');
      
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
          prereqKeys.dataset.skillName = nameInput.value;
          this.updatePrereqKeys();
          this.scheduleAutoSave();
        }
      });
      
      nameInput.addEventListener('input', () => {
        this.autoFillProfessionalSkillFormula(nameInput, baseInput);
      });
      
      baseInput.addEventListener('blur', () => {
        this.calculateProfessionalSkillBase(i);
      });
      
      currentInput.addEventListener('input', () => this.scheduleAutoSave());
    }
  },

  /**
   * Sync Musicianship between Professional Skills and Magic page if user is a Bard
   */
  syncMusicianshipIfBard(profSkillIndex) {
    const nameInput = document.getElementById(`prof-skill-${profSkillIndex}-name`);
    const currentInput = document.getElementById(`prof-skill-${profSkillIndex}-current`);
    
    if (!nameInput || !currentInput) return;
    
    const skillName = nameInput.value.trim().toLowerCase();
    if (!skillName.startsWith('musicianship')) return;
    
    // Check if user is a Bard
    const classes = [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c);
    
    if (!classes.includes('bard')) return;
    
    // Sync to magic page
    const magicMusicianship = document.getElementById('musicianship-percent');
    if (magicMusicianship && magicMusicianship.value !== currentInput.value) {
      magicMusicianship.value = currentInput.value;
      magicMusicianship.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
  
  /**
   * Check if a formula contains STR or DEX and show/hide ENC indicator
   */
  updateProfSkillEncIndicator(index) {
    const baseInput = document.getElementById(`prof-skill-${index}-base`);
    const encIndicator = document.getElementById(`prof-skill-${index}-enc`);
    
    if (!baseInput || !encIndicator) return;
    
    const formula = baseInput.value.toUpperCase();
    const hasStrOrDex = formula.includes('STR') || formula.includes('DEX');
    
    encIndicator.style.display = hasStrOrDex ? 'inline-block' : 'none';
  },

  /**
   * Update professional skill data in character object
   */
  updateProfessionalSkillData(index) {
    if (!this.character.professionalSkills) {
      this.character.professionalSkills = [];
    }
    
    const name = document.getElementById(`prof-skill-${index}-name`)?.value || '';
    const base = document.getElementById(`prof-skill-${index}-base`)?.value || '';
    const currentInput = document.getElementById(`prof-skill-${index}-current`);
    // Use originalValue if available (for ENC penalty system), otherwise use displayed value
    const current = currentInput?.dataset.originalValue || currentInput?.value || '';
    
    this.character.professionalSkills[index] = { name, base, current };
  },

  /**
   * Auto-fill professional skill formula based on skill name
   */
  autoFillProfessionalSkillFormula(nameInput, baseInput) {
    // Get the skill name, strip parentheses content, normalize to lowercase
    const skillName = nameInput.value.replace(/\s*\(.*?\)/g, '').trim().toLowerCase();
    
    // Look up the formula in SKILL_DEFINITIONS.professional
    if (SKILL_DEFINITIONS.professional && SKILL_DEFINITIONS.professional[skillName]) {
      const skillData = SKILL_DEFINITIONS.professional[skillName];
      baseInput.value = skillData.formula;
      
      // Trigger base value calculation
      const index = nameInput.id.match(/prof-skill-(\d+)-name/)[1];
      this.calculateProfessionalSkillBase(parseInt(index));
    }
  },

  /**
   * Calculate professional skill base value from formula
   */
  calculateProfessionalSkillBase(index) {
    const baseInput = document.getElementById(`prof-skill-${index}-base`);
    const baseValSpan = document.getElementById(`prof-skill-${index}-base-val`);
    
    if (!baseInput || !baseValSpan) return;
    
    const formula = baseInput.value.trim().toUpperCase();
    if (!formula) {
      baseValSpan.textContent = '';
      return;
    }
    
    // Parse and calculate the formula
    const result = this.calculateFormulaValue(formula);
    baseValSpan.textContent = result !== null ? result : '';
  },

  /**
   * Calculate a formula like "STR+DEX", "INT x2", "POW+INT+50" using current attribute values
   */
  calculateFormulaValue(formula) {
    const attrs = {
      STR: parseInt(document.getElementById('str-value')?.value) || 0,
      CON: parseInt(document.getElementById('con-value')?.value) || 0,
      SIZ: parseInt(document.getElementById('siz-value')?.value) || 0,
      DEX: parseInt(document.getElementById('dex-value')?.value) || 0,
      INT: parseInt(document.getElementById('int-value')?.value) || 0,
      POW: parseInt(document.getElementById('pow-value')?.value) || 0,
      CHA: parseInt(document.getElementById('cha-value')?.value) || 0
    };
    
    // Normalize formula: uppercase, remove extra spaces
    const normalized = formula.toUpperCase().replace(/\s+/g, '').trim();
    
    // Handle "Xx2" format (e.g., "INTx2", "INTX2", "DEXx2") - multiplier pattern
    const multiplierMatch = normalized.match(/^([A-Z]{3})[xX×]2$/);
    if (multiplierMatch) {
      const attr = multiplierMatch[1];
      if (attrs[attr] !== undefined) {
        return attrs[attr] * 2;
      }
    }
    
    // Handle "X+Y+N" format (e.g., "INT+CHA+40", "POW+INT+50")
    const additionBonusMatch = normalized.match(/^([A-Z]{3})\+([A-Z]{3})\+(\d+)$/);
    if (additionBonusMatch) {
      const attr1 = additionBonusMatch[1];
      const attr2 = additionBonusMatch[2];
      const bonus = parseInt(additionBonusMatch[3]);
      if (attrs[attr1] !== undefined && attrs[attr2] !== undefined) {
        return attrs[attr1] + attrs[attr2] + bonus;
      }
    }
    
    // Handle "Xx2+N" format (e.g., "INTx2+40", "POWx2+30") - multiplier with bonus
    const multiplierBonusMatch = normalized.match(/^([A-Z]{3})[xX×]2\+(\d+)$/);
    if (multiplierBonusMatch) {
      const attr = multiplierBonusMatch[1];
      const bonus = parseInt(multiplierBonusMatch[2]);
      if (attrs[attr] !== undefined) {
        return attrs[attr] * 2 + bonus;
      }
    }
    
    // Handle "X+Y" format (e.g., "STR+DEX", "INT+POW")
    const additionMatch = normalized.match(/^([A-Z]{3})\+([A-Z]{3})$/);
    if (additionMatch) {
      const attr1 = additionMatch[1];
      const attr2 = additionMatch[2];
      if (attrs[attr1] !== undefined && attrs[attr2] !== undefined) {
        return attrs[attr1] + attrs[attr2];
      }
    }
    
    return null;
  },

  /**
   * Recalculate all professional skill base values
   */
  recalculateProfessionalSkillBases() {
    const container = document.getElementById('professional-skills-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.professional-skill-row');
    rows.forEach((row, i) => {
      this.calculateProfessionalSkillBase(i);
    });
  },

  /**
   * Generate equipment rows
   */
  generateEquipmentRows() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const row = document.createElement('div');
      row.className = 'equipment-row';
      row.innerHTML = `
        <input type="text" class="equipment-name" id="equip-${i}-name" placeholder="">
        <input type="number" class="equipment-enc" id="equip-${i}-enc" placeholder="" step="0.1">
      `;
      container.appendChild(row);
      
      // Add event listeners
      const nameInput = row.querySelector('.equipment-name');
      const encInput = row.querySelector('.equipment-enc');
      const rowIndex = i;
      
      // Store previous value for container removal detection
      nameInput.dataset.previousValue = '';
      
      // Track value on focus for comparison
      nameInput.addEventListener('focus', () => {
        nameInput.dataset.previousValue = nameInput.value.trim().toLowerCase();
      });
      
      // Check for container removal on blur
      nameInput.addEventListener('blur', async () => {
        const currentValue = nameInput.value.trim().toLowerCase();
        const previousValue = nameInput.dataset.previousValue || '';
        
        // Check if a container was removed (had value, now empty or different)
        if (previousValue && (!currentValue || currentValue !== previousValue)) {
          const removedContainer = this.getContainerIdFromItemName(previousValue);
          if (removedContainer) {
            // Check if this container type still exists elsewhere in equipment
            const stillExists = this.containerStillExistsElsewhere(removedContainer, rowIndex);
            if (!stillExists) {
              const hasItems = this.containerHasItems(removedContainer);
              if (hasItems) {
                const handled = await this.handleContainerRemoval(removedContainer, nameInput, previousValue);
                if (!handled) {
                  // User cancelled - restore the value
                  nameInput.value = previousValue;
                  nameInput.dataset.previousValue = previousValue;
                  return;
                }
              }
            }
          }
        }
        
        // Update previous value
        nameInput.dataset.previousValue = nameInput.value.trim().toLowerCase();
        
        // Convert to title case
        if (nameInput.value.trim()) {
          let itemName = this.toTitleCase(nameInput.value.trim());
          
          // Add "(see below)" for container items if not already present
          const containerId = this.getContainerIdFromItemName(itemName);
          if (containerId && !itemName.toLowerCase().includes('see below')) {
            itemName = itemName + ' (see below)';
          }
          
          nameInput.value = itemName;
        }
        
        // Normal autofill and update logic
        if (window.EncumbranceData) {
          const itemName = nameInput.value;
          if (itemName.trim() === '') {
            window.EncumbranceData.clearEquipmentEncIfEmpty('equip', rowIndex, itemName);
          } else {
            window.EncumbranceData.autofillEquipmentEnc('equip', rowIndex, itemName);
          }
          this.updateTotalEnc();
          this.updateContainerButtons();
          this.scheduleAutoSave();
        }
      });
      
      nameInput.addEventListener('input', () => {
        this.updateContainerButtons();
        this.scheduleAutoSave();
      });
      
      encInput.addEventListener('input', () => {
        this.updateTotalEnc();
        this.scheduleAutoSave();
      });
    }
    
    // ENC automation toggle
    const toggle = document.getElementById('enc-automation-toggle');
    if (toggle) {
      toggle.addEventListener('change', (e) => {
        this.character.encAutomation = !e.target.checked;
        this.updateTotalEnc();
        this.scheduleAutoSave();
      });
    }
  },

  /**
   * Get container ID from an item name
   */
  getContainerIdFromItemName(itemName) {
    const lowerName = itemName.toLowerCase();
    for (const [containerId, config] of Object.entries(CONTAINER_CONFIGS)) {
      if (config.triggers.some(trigger => lowerName.includes(trigger))) {
        // Special case: check for reinforced backpack vs regular backpack
        if (containerId === 'backpack' && lowerName.includes('reinforced')) {
          return 'reinforced-backpack';
        }
        return containerId;
      }
    }
    return null;
  },

  /**
   * Check if container type still exists elsewhere in equipment (excluding a specific row)
   */
  containerStillExistsElsewhere(containerId, excludeRowIndex) {
    const config = CONTAINER_CONFIGS[containerId];
    if (!config) return false;
    
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      if (i === excludeRowIndex) continue;
      const input = document.getElementById(`equip-${i}-name`);
      if (input && input.value.trim()) {
        const itemName = input.value.trim().toLowerCase();
        if (config.triggers.some(trigger => itemName.includes(trigger))) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Check if a container has any items stored
   */
  containerHasItems(containerId) {
    if (!this.character.containers || !this.character.containers[containerId]) {
      return false;
    }
    const items = this.character.containers[containerId];
    return items.some(item => item.name && item.name.trim() !== '');
  },

  /**
   * Get items from a container
   */
  getContainerItems(containerId) {
    if (!this.character.containers || !this.character.containers[containerId]) {
      return [];
    }
    return this.character.containers[containerId].filter(item => item.name && item.name.trim() !== '');
  },

  /**
   * Handle container removal with user prompts
   * Returns true if removal should proceed, false if cancelled
   */
  async handleContainerRemoval(containerId, nameInput, previousValue) {
    const config = CONTAINER_CONFIGS[containerId];
    const containerName = config ? config.name : 'container';
    const items = this.getContainerItems(containerId);
    
    if (items.length === 0) return true;
    
    const itemCount = items.length;
    const itemList = items.map(i => i.name).join(', ');
    
    // First prompt: Move items?
    const moveItems = confirm(
      `The ${containerName} contains ${itemCount} item(s):\n${itemList}\n\n` +
      `Do you want to move these items to your main Equipment list?`
    );
    
    if (moveItems) {
      // Move items to main equipment
      const moved = this.moveContainerItemsToEquipment(containerId);
      if (moved) {
        // Clear the container
        this.character.containers[containerId] = [];
        this.scheduleAutoSave();
        alert(`${moved} item(s) moved to your Equipment list.`);
        return true;
      } else {
        alert('Not enough empty slots in Equipment to move all items. Please free up some space first.');
        return false;
      }
    } else {
      // Second prompt: Are you sure you want to delete?
      const confirmDelete = confirm(
        `Are you sure you want to permanently delete these items?\n\n` +
        `${itemList}\n\n` +
        `This cannot be undone.`
      );
      
      if (confirmDelete) {
        // Delete the items
        this.character.containers[containerId] = [];
        this.scheduleAutoSave();
        return true;
      } else {
        // User said no - cancel the operation
        return false;
      }
    }
  },

  /**
   * Move items from a container to main equipment
   * Returns number of items moved, or 0 if not enough space
   */
  moveContainerItemsToEquipment(containerId) {
    const items = this.getContainerItems(containerId);
    if (items.length === 0) return 0;
    
    // Find empty slots in equipment
    const emptySlots = [];
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const nameInput = document.getElementById(`equip-${i}-name`);
      if (nameInput && !nameInput.value.trim()) {
        emptySlots.push(i);
      }
    }
    
    // Check if we have enough space
    if (emptySlots.length < items.length) {
      return 0;
    }
    
    // Move items
    items.forEach((item, idx) => {
      const slotIndex = emptySlots[idx];
      const nameInput = document.getElementById(`equip-${slotIndex}-name`);
      const encInput = document.getElementById(`equip-${slotIndex}-enc`);
      
      if (nameInput) {
        nameInput.value = this.toTitleCase(item.name);
        nameInput.dataset.previousValue = item.name.toLowerCase();
      }
      if (encInput && item.enc) {
        encInput.value = item.enc;
      }
    });
    
    // Update totals
    this.updateTotalEnc();
    this.updateContainerButtons();
    
    return items.length;
  },

  /**
   * Setup money input listeners
   */
  setupMoneyListeners() {
    const moneyTypes = ['copper', 'silver', 'gold', 'platinum', 'electrum'];
    moneyTypes.forEach(type => {
      const input = document.getElementById(`money-${type}`);
      if (input) {
        input.addEventListener('input', () => {
          this.updateMoneyEnc();
          this.updateTotalEnc();
          this.scheduleAutoSave();
        });
      }
    });
  },

  /**
   * Calculate and display money ENC
   * Every 100 coins = 1 Thing (ENC)
   */
  updateMoneyEnc() {
    const moneyTypes = ['copper', 'silver', 'gold', 'platinum', 'electrum'];
    let totalCoins = 0;
    
    moneyTypes.forEach(type => {
      const input = document.getElementById(`money-${type}`);
      if (input && input.value) {
        totalCoins += parseInt(input.value) || 0;
      }
    });
    
    const moneyEnc = Math.floor(totalCoins / 100);
    const moneyEncDisplay = document.getElementById('money-enc');
    if (moneyEncDisplay) {
      moneyEncDisplay.textContent = moneyEnc;
    }
    
    return moneyEnc;
  },

  /**
   * Get list of equipment item names (lowercased)
   */
  getEquipmentItemNames() {
    const items = [];
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const input = document.getElementById(`equip-${i}-name`);
      if (input && input.value.trim()) {
        items.push(input.value.trim().toLowerCase());
      }
    }
    return items;
  },

  /**
   * Check if any equipment item matches a trigger
   */
  hasContainerItem(triggers) {
    const items = this.getEquipmentItemNames();
    return items.some(item => 
      triggers.some(trigger => item.includes(trigger))
    );
  },

  /**
   * Update container button visibility based on equipment
   */
  updateContainerButtons() {
    for (const [containerId, config] of Object.entries(CONTAINER_CONFIGS)) {
      const btn = document.getElementById(`btn-open-${containerId}`);
      if (btn) {
        // Check if we need to exclude this container (e.g., don't show backpack if reinforced backpack exists)
        let shouldShow = this.hasContainerItem(config.triggers);
        
        // Special case: don't show regular backpack if reinforced backpack is present
        if (containerId === 'backpack') {
          const hasReinforced = this.hasContainerItem(CONTAINER_CONFIGS['reinforced-backpack'].triggers);
          if (hasReinforced) shouldShow = false;
        }
        
        btn.classList.toggle('hidden', !shouldShow);
      }
    }
  },

  /**
   * Current active container type
   */
  activeContainer: null,

  /**
   * Setup container modal
   */
  setupContainerModal() {
    const modal = document.getElementById('container-modal');
    const closeBtn = document.getElementById('btn-close-container');
    const saveBtn = document.getElementById('btn-save-container');
    
    // Setup click handlers for all container buttons
    for (const containerId of Object.keys(CONTAINER_CONFIGS)) {
      const btn = document.getElementById(`btn-open-${containerId}`);
      if (btn) {
        btn.addEventListener('click', () => {
          this.openContainer(containerId);
        });
      }
    }
    
    // Close button
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        this.activeContainer = null;
      });
    }
    
    // Save & Close button
    if (saveBtn && modal) {
      saveBtn.addEventListener('click', () => {
        this.saveContainerData();
        modal.classList.add('hidden');
        this.activeContainer = null;
      });
    }
    
    // Click outside to close
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.saveContainerData();
          modal.classList.add('hidden');
          this.activeContainer = null;
        }
      });
    }
  },

  /**
   * Open a container modal
   */
  openContainer(containerId) {
    const config = CONTAINER_CONFIGS[containerId];
    if (!config) return;
    
    this.activeContainer = containerId;
    
    const modal = document.getElementById('container-modal');
    const title = document.getElementById('container-modal-title');
    const maxEnc = document.getElementById('container-max-enc');
    const itemsContainer = document.getElementById('container-items');
    
    if (title) title.textContent = `${config.name} Contents`;
    if (maxEnc) maxEnc.textContent = config.maxEnc;
    
    // Generate rows for this container
    this.generateContainerRows(containerId, config.maxEnc);
    
    // Load saved data
    this.loadContainerData(containerId);
    
    // Update capacity display
    this.updateContainerCapacity();
    
    // Show modal
    if (modal) modal.classList.remove('hidden');
  },

  /**
   * Generate rows for container modal
   */
  generateContainerRows(containerId, maxEnc) {
    const container = document.getElementById('container-items');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Use the rows property from config, fallback to maxEnc or 10
    const config = CONTAINER_CONFIGS[containerId];
    const rowCount = config.rows || Math.max(maxEnc, 10);
    
    for (let i = 0; i < rowCount; i++) {
      const row = document.createElement('div');
      row.className = 'equipment-row';
      row.innerHTML = `
        <input type="text" class="equipment-name" id="container-${i}-name" placeholder="">
        <input type="number" class="equipment-enc" id="container-${i}-enc" placeholder="" step="0.1">
      `;
      container.appendChild(row);
      
      const nameInput = row.querySelector('.equipment-name');
      const encInput = row.querySelector('.equipment-enc');
      const rowIndex = i;
      
      // Autofill ENC on blur
      nameInput.addEventListener('blur', () => {
        // Convert to title case
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
        }
        if (window.EncumbranceData) {
          const itemName = nameInput.value;
          if (itemName.trim() === '') {
            window.EncumbranceData.clearEquipmentEncIfEmpty('container', rowIndex, itemName);
          } else {
            window.EncumbranceData.autofillEquipmentEnc('container', rowIndex, itemName);
          }
          this.updateContainerCapacity();
        }
      });
      
      encInput.addEventListener('input', () => {
        this.updateContainerCapacity();
      });
    }
  },

  /**
   * Update container capacity display
   */
  updateContainerCapacity() {
    if (!this.activeContainer) return;
    
    const config = CONTAINER_CONFIGS[this.activeContainer];
    const currentDisplay = document.getElementById('container-current-enc');
    const capacityBar = document.querySelector('.container-capacity-bar');
    
    let totalEnc = 0;
    const container = document.getElementById('container-items');
    if (container) {
      container.querySelectorAll('.equipment-enc').forEach(input => {
        totalEnc += parseFloat(input.value) || 0;
      });
    }
    
    if (currentDisplay) {
      currentDisplay.textContent = totalEnc.toFixed(1);
    }
    
    // Add over-capacity class if exceeded
    const isOverCapacity = totalEnc > config.maxEnc;
    if (capacityBar) {
      capacityBar.classList.toggle('over-capacity', isOverCapacity);
    }
    
    // Show/hide warning message
    let warningEl = document.getElementById('container-capacity-warning');
    if (isOverCapacity) {
      if (!warningEl) {
        warningEl = document.createElement('div');
        warningEl.id = 'container-capacity-warning';
        warningEl.className = 'container-capacity-warning';
        const modalBody = document.querySelector('#container-modal .modal-body');
        if (modalBody) {
          modalBody.insertBefore(warningEl, modalBody.firstChild);
        }
      }
      warningEl.innerHTML = `⚠️ Container is over capacity! Max: ${config.maxEnc} ENC, Current: ${totalEnc.toFixed(1)} ENC`;
    } else if (warningEl) {
      warningEl.remove();
    }
  },

  /**
   * Save container data to character
   */
  saveContainerData() {
    if (!this.activeContainer) return;
    
    if (!this.character.containers) {
      this.character.containers = {};
    }
    
    const items = [];
    const container = document.getElementById('container-items');
    if (container) {
      container.querySelectorAll('.equipment-row').forEach((row, i) => {
        const nameInput = row.querySelector('.equipment-name');
        const encInput = row.querySelector('.equipment-enc');
        items.push({
          name: nameInput?.value || '',
          enc: encInput?.value || ''
        });
      });
    }
    
    this.character.containers[this.activeContainer] = items;
    this.scheduleAutoSave();
  },

  /**
   * Load container data from character
   */
  loadContainerData(containerId) {
    if (!this.character.containers || !this.character.containers[containerId]) return;
    
    const items = this.character.containers[containerId];
    items.forEach((item, i) => {
      const nameInput = document.getElementById(`container-${i}-name`);
      const encInput = document.getElementById(`container-${i}-enc`);
      if (nameInput && item.name) nameInput.value = this.toTitleCase(item.name);
      if (encInput && item.enc) encInput.value = item.enc;
    });
  },

  /**
   * Generate hit location rows based on sheet type
   */
  generateHitLocations() {
    const tbody = document.getElementById('hit-locations-body');
    if (!tbody) return;
    
    const locations = HIT_LOCATIONS[this.sheetType] || HIT_LOCATIONS.human;
    
    tbody.innerHTML = '';
    
    locations.forEach((loc, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${loc.roll}</td>
        <td>${loc.location}</td>
        <td>${loc.noArmor ? '<span class="no-armor-note">Wings may not have armor</span>' : `<input type="text" class="armor-input" id="loc-${i}-armor" placeholder="">`}</td>
        <td>${loc.noArmor ? '' : `<input type="number" class="ap-input" id="loc-${i}-ap" placeholder="0">`}</td>
        <td>
          <input type="number" class="hp-max-input derived-readonly" id="loc-${i}-hp" placeholder="" readonly>
          /
          <input type="number" class="hp-current" id="loc-${i}-current" placeholder="">
        </td>
      `;
      tbody.appendChild(tr);
      
      // Add event listeners (only for editable inputs)
      tr.querySelectorAll('input:not([readonly])').forEach(input => {
        input.addEventListener('input', () => this.scheduleAutoSave());
      });
      
      // Add armor AP auto-fill on blur (only for armor inputs)
      const armorInput = tr.querySelector('.armor-input');
      const apInput = tr.querySelector('.ap-input');
      if (armorInput && apInput) {
        // Store the previous armor value to detect changes
        armorInput.dataset.previousArmor = '';
        
        armorInput.addEventListener('blur', () => {
          const currentArmor = armorInput.value.trim();
          const previousArmor = armorInput.dataset.previousArmor || '';
          
          // Only auto-fill if armor name changed and AP hasn't been manually set
          // or if AP is empty/zero
          if (currentArmor !== previousArmor && window.ArmorData) {
            const ap = window.ArmorData.getAP(currentArmor);
            if (ap !== null) {
              // Only set if AP is empty or was auto-filled (not manually changed)
              const currentAP = apInput.value.trim();
              const wasAutoFilled = apInput.dataset.autoFilled === 'true';
              
              if (!currentAP || currentAP === '0' || wasAutoFilled) {
                apInput.value = ap;
                apInput.dataset.autoFilled = 'true';
                this.scheduleAutoSave();
              }
            }
          }
          
          armorInput.dataset.previousArmor = currentArmor;
        });
        
        // Track when user manually edits AP
        apInput.addEventListener('input', () => {
          apInput.dataset.autoFilled = 'false';
        });
      }
    });
  },

  /**
   * Update hit location HP values based on calculated results
   */
  updateHitLocationHPs(hitLocations) {
    if (!hitLocations) return;
    
    hitLocations.forEach((loc, i) => {
      const hpInput = document.getElementById(`loc-${i}-hp`);
      if (hpInput) {
        hpInput.value = loc.hp;
      }
    });
  },

  /**
   * Save hit locations data to character object
   */
  saveHitLocationsToCharacter() {
    if (!this.character.combat) this.character.combat = {};
    this.character.combat.hitLocations = [];
    
    // Save up to 9 locations (max for syrin)
    for (let i = 0; i < 9; i++) {
      const armorInput = document.getElementById(`loc-${i}-armor`);
      const apInput = document.getElementById(`loc-${i}-ap`);
      const hpInput = document.getElementById(`loc-${i}-hp`);
      const currentInput = document.getElementById(`loc-${i}-current`);
      
      // Only save if we found at least the HP input (always exists)
      if (hpInput || currentInput) {
        this.character.combat.hitLocations.push({
          armor: armorInput?.value || '',
          ap: apInput?.value || '',
          hp: hpInput?.value || '',
          current: currentInput?.value || ''
        });
      }
    }
  },

  /**
   * Load hit locations data from character object
   */
  loadHitLocationsFromCharacter() {
    if (!this.character.combat || !this.character.combat.hitLocations) return;
    
    this.character.combat.hitLocations.forEach((loc, i) => {
      const armorInput = document.getElementById(`loc-${i}-armor`);
      const apInput = document.getElementById(`loc-${i}-ap`);
      const hpInput = document.getElementById(`loc-${i}-hp`);
      const currentInput = document.getElementById(`loc-${i}-current`);
      
      if (armorInput && loc.armor) armorInput.value = loc.armor;
      if (apInput && loc.ap) apInput.value = loc.ap;
      if (hpInput && loc.hp !== undefined && loc.hp !== '') hpInput.value = loc.hp;
      if (currentInput && loc.current) currentInput.value = loc.current;
    });
  },

  /**
   * Generate weapon table rows
   */
  generateWeaponRows() {
    // Melee weapons
    const meleeBody = document.getElementById('melee-weapons-body');
    if (meleeBody) {
      meleeBody.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="text" id="melee-${i}-name" class="weapon-name" placeholder=""></td>
          <td><input type="text" id="melee-${i}-hands" placeholder=""></td>
          <td><input type="text" id="melee-${i}-damage" placeholder=""></td>
          <td><input type="text" id="melee-${i}-size" placeholder=""></td>
          <td><input type="text" id="melee-${i}-effects" placeholder=""></td>
          <td><input type="text" id="melee-${i}-aphp" placeholder=""></td>
          <td><input type="text" id="melee-${i}-traits" placeholder=""></td>
        `;
        meleeBody.appendChild(tr);
        
        // Add autofill listener for weapon name field
        const nameInput = tr.querySelector(`#melee-${i}-name`);
        const rowIndex = i;
        if (nameInput) {
          nameInput.addEventListener('blur', () => {
            // Convert to title case
            if (nameInput.value.trim()) {
              nameInput.value = this.toTitleCase(nameInput.value.trim());
            }
            if (window.WeaponData && window.WeaponData.autofillMeleeWeapon) {
              window.WeaponData.autofillMeleeWeapon(rowIndex, nameInput.value);
              this.scheduleAutoSave();
            }
          });
        }
        
        // Mark row as user-modified when any non-name field is edited
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => {
            // If editing any field other than name, mark this row as user-modified
            if (!input.id.endsWith('-name')) {
              const nameInput = tr.querySelector(`#melee-${rowIndex}-name`);
              if (nameInput) nameInput.dataset.userModified = 'true';
            }
            this.scheduleAutoSave();
          });
        });
      }
    }
    
    // Ranged weapons
    const rangedBody = document.getElementById('ranged-weapons-body');
    if (rangedBody) {
      rangedBody.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="text" id="ranged-${i}-name" class="weapon-name" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-hands" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-damage" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-dm" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-range" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-load" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-effects" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-impl" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-aphp" placeholder=""></td>
          <td><input type="text" id="ranged-${i}-traits" placeholder=""></td>
        `;
        rangedBody.appendChild(tr);
        
        // Add autofill listener for ranged weapon name field
        const nameInput = tr.querySelector(`#ranged-${i}-name`);
        const rowIndex = i;
        if (nameInput) {
          nameInput.addEventListener('blur', () => {
            // Convert to title case
            if (nameInput.value.trim()) {
              nameInput.value = this.toTitleCase(nameInput.value.trim());
            }
            if (window.WeaponData && window.WeaponData.autofillRangedWeapon) {
              window.WeaponData.autofillRangedWeapon(rowIndex, nameInput.value);
              this.scheduleAutoSave();
            }
          });
        }
        
        // Mark row as user-modified when any non-name field is edited
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => {
            // If editing any field other than name, mark this row as user-modified
            if (!input.id.endsWith('-name')) {
              const nameInput = tr.querySelector(`#ranged-${rowIndex}-name`);
              if (nameInput) nameInput.dataset.userModified = 'true';
            }
            this.scheduleAutoSave();
          });
        });
      }
    }
  },
  
  /**
   * Add a new melee weapon row
   */
  addMeleeWeaponRow() {
    const meleeBody = document.getElementById('melee-weapons-body');
    if (!meleeBody) return;
    
    const i = meleeBody.querySelectorAll('tr').length;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" id="melee-${i}-name" class="weapon-name" placeholder=""></td>
      <td><input type="text" id="melee-${i}-hands" placeholder=""></td>
      <td><input type="text" id="melee-${i}-damage" placeholder=""></td>
      <td><input type="text" id="melee-${i}-size" placeholder=""></td>
      <td><input type="text" id="melee-${i}-effects" placeholder=""></td>
      <td><input type="text" id="melee-${i}-aphp" placeholder=""></td>
      <td><input type="text" id="melee-${i}-traits" placeholder=""></td>
    `;
    meleeBody.appendChild(tr);
    
    const nameInput = tr.querySelector(`#melee-${i}-name`);
    const rowIndex = i;
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
        }
        if (window.WeaponData && window.WeaponData.autofillMeleeWeapon) {
          window.WeaponData.autofillMeleeWeapon(rowIndex, nameInput.value);
          this.scheduleAutoSave();
        }
      });
    }
    
    tr.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (!input.id.endsWith('-name')) {
          const nameInput = tr.querySelector(`#melee-${rowIndex}-name`);
          if (nameInput) nameInput.dataset.userModified = 'true';
        }
        this.scheduleAutoSave();
      });
    });
    
    this.scheduleAutoSave();
  },
  
  /**
   * Add a new ranged weapon row
   */
  addRangedWeaponRow() {
    const rangedBody = document.getElementById('ranged-weapons-body');
    if (!rangedBody) return;
    
    const i = rangedBody.querySelectorAll('tr').length;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" id="ranged-${i}-name" class="weapon-name" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-hands" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-damage" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-dm" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-range" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-load" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-effects" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-impl" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-aphp" placeholder=""></td>
      <td><input type="text" id="ranged-${i}-traits" placeholder=""></td>
    `;
    rangedBody.appendChild(tr);
    
    const nameInput = tr.querySelector(`#ranged-${i}-name`);
    const rowIndex = i;
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
        }
        if (window.WeaponData && window.WeaponData.autofillRangedWeapon) {
          window.WeaponData.autofillRangedWeapon(rowIndex, nameInput.value);
          this.scheduleAutoSave();
        }
      });
    }
    
    tr.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (!input.id.endsWith('-name')) {
          const nameInput = tr.querySelector(`#ranged-${rowIndex}-name`);
          if (nameInput) nameInput.dataset.userModified = 'true';
        }
        this.scheduleAutoSave();
      });
    });
    
    this.scheduleAutoSave();
  },

  /**
   * Generate class ability inputs - dynamic list that only shows filled abilities
   */
  generateSpecialAbilities() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Setup add/remove buttons
    this.setupClassAbilityButtons();
    
    // Rows will be populated by populateForm if saved data exists
    // User can click + to add new abilities
  },
  
  /**
   * Setup add/remove buttons for class abilities
   */
  setupClassAbilityButtons() {
    const addBtn = document.getElementById('btn-add-ability');
    const removeBtn = document.getElementById('btn-remove-ability');
    
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.addClassAbilityRow();
      });
    }
    
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.removeLastClassAbilityRow();
      });
    }
  },
  
  /**
   * Add a new class ability row
   */
  addClassAbilityRow(abilityName = '', source = null) {
    const container = document.getElementById('class-abilities-list');
    if (!container) return null;
    
    const index = container.children.length;
    
    const row = document.createElement('div');
    row.className = 'class-ability-row';
    row.dataset.index = index;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'class-ability-input';
    input.id = `ability-${index}`;
    input.placeholder = '';
    input.value = abilityName ? this.toTitleCase(abilityName) : '';
    input.dataset.previousValue = input.value;
    if (source) {
      input.dataset.classAbility = source;
    }
    
    const infoBtn = document.createElement('button');
    infoBtn.type = 'button';
    infoBtn.className = 'class-ability-info-btn';
    infoBtn.innerHTML = 'ℹ';
    infoBtn.title = 'Click for ability details';
    infoBtn.style.display = abilityName ? '' : 'none';
    
    // Handle ability changes
    input.addEventListener('blur', () => {
      this.handleAbilityChange(input);
      this.cleanupEmptyClassAbilityRows();
    });
    
    input.addEventListener('input', () => {
      infoBtn.style.display = input.value.trim() ? '' : 'none';
      this.scheduleAutoSave();
    });
    
    // Info button click handler
    infoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const name = input.value.trim();
      if (name) {
        this.showAbilityDetail(name);
      }
    });
    
    row.appendChild(input);
    row.appendChild(infoBtn);
    container.appendChild(row);
    
    // Apply ability effect if applicable
    if (abilityName) {
      this.applyAbilityEffect(abilityName);
    }
    
    this.scheduleAutoSave();
    return input;
  },
  
  /**
   * Remove last class ability row (warn if has content)
   */
  removeLastClassAbilityRow() {
    const container = document.getElementById('class-abilities-list');
    if (!container || container.children.length === 0) return;
    
    const rows = Array.from(container.children);
    const lastRow = rows[rows.length - 1];
    const input = lastRow.querySelector('.class-ability-input');
    const hasContent = input && input.value.trim();
    
    if (hasContent) {
      // Remove ability effect before deleting
      this.removeAbilityEffect(input.value);
      
      const confirmed = confirm(`Remove "${input.value.trim()}"?\n\nThis will delete this ability.`);
      if (!confirmed) return;
    }
    
    lastRow.remove();
    this.reindexClassAbilityRows();
    this.scheduleAutoSave();
  },
  
  /**
   * Clean up empty class ability rows (remove all empty rows)
   */
  cleanupEmptyClassAbilityRows() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const rows = Array.from(container.children);
    
    // Remove all empty rows
    rows.forEach(row => {
      const input = row.querySelector('.class-ability-input');
      if (input && !input.value.trim()) {
        row.remove();
      }
    });
    
    this.reindexClassAbilityRows();
  },
  
  /**
   * Reindex class ability rows after removal
   */
  reindexClassAbilityRows() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const rows = container.children;
    for (let i = 0; i < rows.length; i++) {
      rows[i].dataset.index = i;
      const input = rows[i].querySelector('.class-ability-input');
      if (input) {
        input.id = `ability-${i}`;
      }
    }
  },
  
  /**
   * Get all class abilities from dynamic list
   */
  getAllClassAbilities() {
    const abilities = [];
    const container = document.getElementById('class-abilities-list');
    if (!container) return abilities;
    
    const inputs = container.querySelectorAll('.class-ability-input');
    inputs.forEach(input => {
      if (input.value.trim()) {
        abilities.push({
          name: input.value.trim(),
          source: input.dataset.classAbility || null
        });
      }
    });
    return abilities;
  },
  
  /**
   * Handle ability input change - check duplicates, update tooltip, track removals
   */
  handleAbilityChange(input) {
    const value = input.value.trim();
    const previousValue = input.dataset.previousValue || '';
    
    // Get info button
    const wrapper = input.closest('.ability-input-wrapper');
    const infoBtn = wrapper ? wrapper.querySelector('.ability-info-btn') : null;
    
    if (!value) {
      // Ability was cleared - remove from tracking if it was previously tracked
      if (previousValue) {
        this.removeAbilityFromTracking(previousValue);
      }
      
      // Reset tooltip for empty input
      input.title = 'Enter a Special Ability name';
      input.classList.remove('duplicate-warning');
      input.dataset.previousValue = '';
      // Hide info button
      if (infoBtn) infoBtn.style.display = 'none';
      return;
    }
    
    // Convert to title case
    input.value = this.toTitleCase(value);
    
    // Store current value as previous for next change
    input.dataset.previousValue = input.value;
    
    // Check for duplicates
    const isDuplicate = this.checkAbilityDuplicate(input);
    
    if (isDuplicate) {
      input.classList.add('duplicate-warning');
    } else {
      input.classList.remove('duplicate-warning');
      // Apply ability effect if this is a new ability (not a duplicate)
      this.applyAbilityEffect(input.value);
    }
    
    // Update tooltip with ability description
    this.updateAbilityTooltip(input);
    
    // Show info button
    if (infoBtn) infoBtn.style.display = '';
  },

  /**
   * Remove an ability from tracking when deleted from the sheet
   */
  removeAbilityFromTracking(abilityName) {
    if (!abilityName) return;
    
    const baseName = abilityName.split('(')[0].trim().toLowerCase();
    
    // Remove from acquiredAbilities
    if (this.character.acquiredAbilities) {
      this.character.acquiredAbilities = this.character.acquiredAbilities.filter(name => {
        const trackBaseName = name.split('(')[0].trim().toLowerCase();
        return trackBaseName !== baseName && name.toLowerCase() !== abilityName.toLowerCase();
      });
    }
    
    // Special handling for Characteristic Increase
    if (baseName === 'characteristic increase') {
      // Clear all characteristic increases (user deleted the ability)
      // Note: This doesn't reverse the stat increases - those remain
      this.character.characteristicIncreases = [];
    }
    
    // Check for ability effects to remove
    this.removeAbilityEffect(abilityName);
    
    this.scheduleAutoSave();
  },

  /**
   * Check if an ability has a special effect and apply it
   */
  applyAbilityEffect(abilityName) {
    if (!abilityName) return;
    
    const baseName = abilityName.split('(')[0].trim().toLowerCase();
    const effect = this.ABILITY_EFFECTS[baseName];
    
    if (!effect) return;
    
    // Check if effect is already active (no stacking)
    if (this.activeAbilityEffects[baseName]) {
      console.log(`Ability effect "${baseName}" already active, not stacking.`);
      return;
    }
    
    // Mark as active and apply
    this.activeAbilityEffects[baseName] = { active: true };
    effect.apply(this);
    console.log(`Applied ability effect: ${baseName} (${effect.description})`);
  },

  /**
   * Remove an ability's special effect
   */
  removeAbilityEffect(abilityName) {
    if (!abilityName) return;
    
    const baseName = abilityName.split('(')[0].trim().toLowerCase();
    const effect = this.ABILITY_EFFECTS[baseName];
    
    if (!effect) return;
    
    // Check if effect is active
    if (!this.activeAbilityEffects[baseName]) {
      return; // Effect wasn't active
    }
    
    // Check if the ability still exists elsewhere on the sheet (from another class)
    if (this.hasAbilityOnSheet(baseName)) {
      console.log(`Ability "${baseName}" still exists on sheet, keeping effect.`);
      return;
    }
    
    // Remove the effect
    effect.remove(this);
    delete this.activeAbilityEffects[baseName];
    console.log(`Removed ability effect: ${baseName}`);
  },

  /**
   * Check if an ability (by base name) still exists on the sheet (class or species)
   */
  hasAbilityOnSheet(baseName) {
    const normalizedBase = baseName.toLowerCase().trim();
    
    // Check class abilities
    const classContainer = document.getElementById('class-abilities-list');
    if (classContainer) {
      const inputs = classContainer.querySelectorAll('.class-ability-input');
      for (const input of inputs) {
        if (input.value.trim()) {
          const abilityBase = input.value.split('(')[0].trim().toLowerCase();
          if (abilityBase === normalizedBase) {
            return true;
          }
        }
      }
    }
    
    // Check species abilities
    const speciesAbilities = this.getSpeciesAbilities();
    for (const ability of speciesAbilities) {
      const abilityBase = ability.split('(')[0].trim().toLowerCase();
      if (abilityBase === normalizedBase) {
        return true;
      }
    }
    
    return false;
  },

  /**
   * Get damage modifier for a given STR+SIZ or STR+DEX sum
   */
  getDamageModifierForSum(sum) {
    const table = [
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
    ];
    
    // Handle values beyond the table
    if (sum > 130) {
      const extraTens = Math.floor((sum - 130) / 10);
      const diceProgression = ['+2d10+1d6', '+2d10+1d8', '+2d10+1d10', '+2d10+1d12', '+3d10'];
      const idx = Math.min(extraTens, diceProgression.length - 1);
      return diceProgression[idx];
    }
    
    for (const entry of table) {
      if (sum <= entry.max) {
        return entry.mod;
      }
    }
    return '+0';
  },

  /**
   * Compare two damage modifiers and return the better (higher) one
   */
  compareDamageModifiers(mod1, mod2) {
    // Convert damage modifiers to a numeric ranking for comparison
    const ranking = [
      '-1d8', '-1d6', '-1d4', '-1d2', '+0',
      '+1d2', '+1d4', '+1d6', '+1d8', '+1d10', '+1d12',
      '+2d6', '+1d8+1d6', '+2d8', '+1d10+1d8', '+2d10',
      '+2d10+1d2', '+2d10+1d4', '+2d10+1d6', '+2d10+1d8', '+2d10+1d10', '+2d10+1d12', '+3d10'
    ];
    
    const rank1 = ranking.indexOf(mod1);
    const rank2 = ranking.indexOf(mod2);
    
    // If not found in ranking, assume it's high
    const effectiveRank1 = rank1 === -1 ? 100 : rank1;
    const effectiveRank2 = rank2 === -1 ? 100 : rank2;
    
    return effectiveRank1 >= effectiveRank2 ? mod1 : mod2;
  },

  /**
   * Restore ability effects on page load
   */
  restoreAbilityEffects() {
    // Check all class abilities on the sheet and apply their effects
    const classContainer = document.getElementById('class-abilities-list');
    if (classContainer) {
      const inputs = classContainer.querySelectorAll('.class-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          const baseName = input.value.split('(')[0].trim().toLowerCase();
          const effect = this.ABILITY_EFFECTS[baseName];
          if (effect && !this.activeAbilityEffects[baseName]) {
            this.activeAbilityEffects[baseName] = { active: true };
            effect.apply(this);
            console.log(`Restored ability effect: ${baseName}`);
          }
        }
      });
    }
    
    // Also check species abilities (already applied in initSpeciesAbilities, but ensure coverage)
    const speciesAbilities = this.getSpeciesAbilities();
    speciesAbilities.forEach(ability => {
      const baseName = ability.split('(')[0].trim().toLowerCase();
      const effect = this.ABILITY_EFFECTS[baseName];
      if (effect && !this.activeAbilityEffects[baseName]) {
        this.activeAbilityEffects[baseName] = { active: true };
        effect.apply(this);
        console.log(`Restored species ability effect: ${baseName}`);
      }
    });
  },

  /**
   * Handle rank decrease - remove abilities and characteristic increases for ranks above the new rank
   */
  handleRankDecrease(rankFieldId, previousRank, newRank) {
    // Determine which class this rank belongs to
    const classFieldId = rankFieldId.replace('rank-', 'class-');
    const className = document.getElementById(classFieldId)?.value?.trim().toLowerCase() || '';
    
    if (!className) return;
    
    // Remove characteristic increases for ranks above the new rank
    if (this.character.characteristicIncreases && this.character.characteristicIncreases.length > 0) {
      const removed = this.character.characteristicIncreases.filter(inc => inc.rank > newRank);
      this.character.characteristicIncreases = this.character.characteristicIncreases.filter(inc => inc.rank <= newRank);
      
      // If we removed any, update the display on the sheet
      if (removed.length > 0) {
        // Notify user about removed characteristic increases
        const removedList = removed.map(inc => `Rank ${inc.rank}: ${inc.char.toUpperCase()}`).join(', ');
        console.log(`Removed Characteristic Increases due to rank decrease: ${removedList}`);
        
        // Update or remove the Characteristic Increase ability on sheet
        if (this.character.characteristicIncreases.length > 0) {
          const displayName = this.buildCharacteristicIncreaseName();
          this.updateCharacteristicIncreaseOnSheet(displayName);
        } else {
          // Remove it entirely from the sheet
          this.removeAbilityFromSheet('Characteristic Increase');
        }
      }
    }
    
    // Note: For other abilities, we don't automatically remove them since
    // the user may have purchased them with EXP and should decide what to do.
    // The Unlock Abilities modal will show them as "Already Acquired" regardless.
  },

  /**
   * Remove an ability from the Class Abilities sheet
   */
  removeAbilityFromSheet(abilityBaseName) {
    const baseNameLower = abilityBaseName.toLowerCase();
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.class-ability-row'));
    for (const row of rows) {
      const input = row.querySelector('.class-ability-input');
      if (input && input.value.toLowerCase().startsWith(baseNameLower)) {
        row.remove();
        this.reindexClassAbilityRows();
        return;
      }
    }
  },
  
  /**
   * Check if ability is duplicated elsewhere
   * @returns {boolean} true if duplicate found
   */
  checkAbilityDuplicate(currentInput) {
    const currentValue = currentInput.value.trim().toLowerCase();
    if (!currentValue) return false;
    
    // Get base name for repeatable ability check
    const currentBaseName = currentValue.split('(')[0].trim();
    
    // Check all other ability inputs
    const container = document.getElementById('class-abilities-list');
    if (!container) return false;
    
    const inputs = container.querySelectorAll('.class-ability-input');
    for (const input of inputs) {
      if (input === currentInput) continue;
      
      const otherValue = input.value.trim().toLowerCase();
      if (otherValue === currentValue) {
        // Exact duplicate - show warning
        const keepDuplicate = confirm(
          `This ability "${currentInput.value}" already exists in another slot.\n\n` +
          `Do you want to keep this duplicate?\n\n` +
          `Click OK to keep, Cancel to clear this entry.`
        );
        
        if (!keepDuplicate) {
          const row = currentInput.closest('.class-ability-row');
          if (row) row.remove();
          this.reindexClassAbilityRows();
          this.scheduleAutoSave();
          return false;
        }
        return true;
      }
      // For repeatable abilities (like Weapon Specialization), different specializations are OK
      // Only warn if it's an exact duplicate, not just same base name
    }
    return false;
  },
  
  /**
   * Update tooltip with ability description
   */
  updateAbilityTooltip(input) {
    const value = input.value.trim();
    
    // Remove hover tooltip - we use click popup instead
    input.title = '';
    
    if (!value) {
      return;
    }
    
    // The click handler is set up in setupAbilityInputs
  },

  /**
   * Setup click handlers for ability inputs to show popup
   */
  setupAbilityInputClickHandlers() {
    // For class abilities, the click handlers are set up when rows are created
    // This function is kept for compatibility but doesn't need to iterate old columns
  },

  /**
   * Show ability detail popup
   */
  showAbilityDetail(abilityName) {
    if (!abilityName) return;
    
    // Get or create the popup overlay
    let overlay = document.getElementById('ability-detail-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'ability-detail-overlay';
      overlay.className = 'ability-detail-overlay';
      overlay.innerHTML = `
        <div class="ability-detail-popup">
          <div class="ability-detail-header">
            <h3 class="ability-detail-title"></h3>
            <button class="ability-detail-close">&times;</button>
          </div>
          <div class="ability-detail-body">
            <div class="ability-detail-description"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      // Close handlers
      overlay.querySelector('.ability-detail-close').addEventListener('click', () => {
        this.closeAbilityDetail();
      });
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAbilityDetail();
        }
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
          this.closeAbilityDetail();
        }
      });
    }
    
    // Get the description
    let description = 'No description available for this ability.';
    let source = '';
    
    if (window.AbilityDescriptions) {
      const desc = AbilityDescriptions.getDescription(abilityName);
      if (desc) {
        description = desc;
      }
    }
    
    // Check if it's a species ability
    const speciesName = document.getElementById('species')?.value || '';
    if (speciesName && window.SpeciesData) {
      if (SpeciesData.isSpeciesAbility(abilityName, speciesName)) {
        source = `Species Ability (${this.toTitleCase(speciesName)})`;
      }
    }
    
    // Check if it's a class ability
    if (!source) {
      const classes = this.getCurrentClasses();
      for (const cls of classes) {
        if (window.ClassAbilitiesData && ClassAbilitiesData[cls]) {
          const classAbilities = ClassAbilitiesData[cls].map(a => a.toLowerCase());
          if (classAbilities.includes(abilityName.toLowerCase().replace(/\s*\(.*\)/, '').trim())) {
            source = `Class Ability (${this.toTitleCase(cls)})`;
            break;
          }
        }
      }
    }
    
    // Get base name for title (capitalize properly)
    const displayName = this.toTitleCase(abilityName);
    
    // Format the description with HTML - convert bullet points to list
    let formattedContent = this.formatAbilityDescription(description);
    
    if (source) {
      formattedContent += `<p class="ability-source"><strong>Source:</strong> ${source}</p>`;
    }
    
    // Add a note about "See description" abilities
    if (description.toLowerCase().includes('see description')) {
      formattedContent += `<p class="ability-note"><em>Refer to the Classic Fantasy rulebook for complete details.</em></p>`;
    }
    
    // Update content
    overlay.querySelector('.ability-detail-title').textContent = displayName;
    overlay.querySelector('.ability-detail-description').innerHTML = formattedContent;
    
    // Show overlay
    overlay.classList.add('active');
  },
  
  /**
   * Format ability description - convert bullet points to HTML list
   */
  formatAbilityDescription(description) {
    // Check if description contains bullet points
    if (description.includes('\n•')) {
      // Split into intro and bullets
      const parts = description.split('\n•');
      const intro = parts[0].trim();
      const bullets = parts.slice(1).map(b => b.trim()).filter(b => b);
      
      let html = '';
      if (intro) {
        html += `<p class="ability-intro">${intro}</p>`;
      }
      if (bullets.length > 0) {
        html += '<ul class="ability-bullets">';
        bullets.forEach(bullet => {
          html += `<li>${bullet}</li>`;
        });
        html += '</ul>';
      }
      return html;
    }
    
    // No bullets - just return as paragraph
    return `<p class="ability-description-text">${description}</p>`;
  },

  /**
   * Close ability detail popup
   */
  closeAbilityDetail() {
    const overlay = document.getElementById('ability-detail-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },
  
  /**
   * Update all ability tooltips and info buttons (called on load)
   */
  updateAllAbilityTooltips() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const inputs = container.querySelectorAll('.class-ability-input');
    inputs.forEach(input => {
      const hasValue = input.value.trim();
      
      // Set previousValue for tracking (used when abilities are deleted)
      input.dataset.previousValue = hasValue || '';
      
      // Update tooltip (removes hover, we use click popup instead)
      this.updateAbilityTooltip(input);
      
      // Show/hide info button
      const infoBtn = input.parentElement?.querySelector('.class-ability-info-btn');
      if (infoBtn) {
        infoBtn.style.display = hasValue ? '' : 'none';
      }
    });
    
    // Setup click handlers for popups
    this.setupAbilityInputClickHandlers();
  },

  /**
   * Add an ability to the Special Abilities section (first empty slot)
   * @param {string} abilityName - Name of the ability to add
   * @returns {boolean} - True if successfully added
   */
  addAbilityToSheet(abilityName) {
    const container = document.getElementById('class-abilities-list');
    if (!container) {
      console.warn('addAbilityToSheet: container not found');
      return false;
    }
    
    if (!abilityName || !abilityName.trim()) {
      console.warn('addAbilityToSheet: empty ability name');
      return false;
    }
    
    // Normalize apostrophes for comparison
    const normalizeApostrophes = (str) => str.replace(/[']/g, "'");
    const normalizedName = normalizeApostrophes(abilityName.toLowerCase().trim());
    
    // Check if ability already exists
    const existingInputs = container.querySelectorAll('.class-ability-input');
    for (const input of existingInputs) {
      if (input.value.trim()) {
        const normalizedExisting = normalizeApostrophes(input.value.trim().toLowerCase());
        if (normalizedExisting === normalizedName) {
          console.log('addAbilityToSheet: ability already exists:', abilityName);
          return true; // Already exists, that's fine
        }
      }
    }
    
    // Find first empty slot
    for (const input of existingInputs) {
      if (!input.value.trim()) {
        // Found empty slot - fill it
        input.value = this.toTitleCase(abilityName);
        input.dataset.previousValue = input.value;
        this.updateAbilityTooltip(input);
        
        // Show the info button
        const infoBtn = input.parentElement?.querySelector('.class-ability-info-btn');
        if (infoBtn) {
          infoBtn.style.display = '';
        }
        
        // Apply ability effect if applicable
        this.applyAbilityEffect(abilityName);
        
        console.log('addAbilityToSheet: filled existing empty slot with:', abilityName);
        
        this.scheduleAutoSave();
        return true;
      }
    }
    
    // No empty slot found - create new row with the ability
    console.log('addAbilityToSheet: creating new row for:', abilityName);
    const newInput = this.addClassAbilityRow(abilityName);
    
    return !!newInput;
  },

  /**
   * Sort special abilities alphabetically
   */
  sortSpecialAbilities() {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    // Collect all abilities
    const inputs = Array.from(container.querySelectorAll('.class-ability-input'));
    const abilities = [];
    
    inputs.forEach(input => {
      if (input.value.trim()) {
        abilities.push({
          value: input.value.trim(),
          classAbility: input.dataset.classAbility || ''
        });
      }
    });
    
    // Sort alphabetically
    abilities.sort((a, b) => a.value.toLowerCase().localeCompare(b.value.toLowerCase()));
    
    // Calculate items per column for column-major ordering
    // We want: col1 gets first N items, col2 gets next N, col3 gets rest
    const totalItems = abilities.length;
    const numCols = 3;
    const itemsPerCol = Math.ceil(totalItems / numCols);
    
    // Split into columns
    const columns = [
      abilities.slice(0, itemsPerCol),
      abilities.slice(itemsPerCol, itemsPerCol * 2),
      abilities.slice(itemsPerCol * 2)
    ];
    
    // CSS grid fills row-by-row, so we need to interleave columns
    // Row 0: col1[0], col2[0], col3[0]
    // Row 1: col1[1], col2[1], col3[1]
    // etc.
    const interleaved = [];
    for (let row = 0; row < itemsPerCol; row++) {
      for (let col = 0; col < numCols; col++) {
        if (columns[col] && columns[col][row]) {
          interleaved.push(columns[col][row]);
        } else {
          interleaved.push({ value: '', classAbility: '' });
        }
      }
    }
    
    // Assign back to inputs
    inputs.forEach((input, index) => {
      const item = interleaved[index] || { value: '', classAbility: '' };
      input.value = item.value;
      if (item.classAbility) {
        input.dataset.classAbility = item.classAbility;
      } else {
        delete input.dataset.classAbility;
      }
      input.dataset.previousValue = item.value;
      
      // Update info button visibility
      const infoBtn = input.parentElement?.querySelector('.class-ability-info-btn');
      if (infoBtn) {
        infoBtn.style.display = item.value ? '' : 'none';
      }
    });
    
    // Update tooltips after sorting
    this.updateAllAbilityTooltips();
    
    // Ensure there's an empty row for new input
    this.cleanupEmptyClassAbilityRows();
    
    this.scheduleAutoSave();
  },

  /**
   * Generate spell rows for all ranks
   */
  generateSpellRows() {
    const ranks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    const rankLabels = {
      'cantrips': 'Cantrip',
      'rank1': 'Rank 1',
      'rank2': 'Rank 2',
      'rank3': 'Rank 3',
      'rank4': 'Rank 4',
      'rank5': 'Rank 5'
    };
    
    ranks.forEach(rank => {
      const tbody = document.getElementById(`${rank}-body`);
      if (!tbody) return;
      
      tbody.innerHTML = '';
      
      for (let i = 0; i < SPELL_SLOTS_PER_RANK; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="checkbox" id="${rank}-${i}-mem" class="spell-memorized"></td>
          <td class="spell-name-cell">
            <input type="text" id="${rank}-${i}-name" class="spell-name" placeholder="" autocomplete="off">
          </td>
          <td><input type="text" id="${rank}-${i}-cost" class="spell-cost" placeholder=""></td>
        `;
        tbody.appendChild(tr);
        
        const nameInput = tr.querySelector(`#${rank}-${i}-name`);
        const costInput = tr.querySelector(`#${rank}-${i}-cost`);
        const memCheck = tr.querySelector(`#${rank}-${i}-mem`);
        
        // Check memorize limit when checkbox is clicked
        if (memCheck) {
          memCheck.addEventListener('change', (e) => {
            if (e.target.checked) {
              const maxInput = document.getElementById(`${rank}-max`);
              const maxAllowed = parseInt(maxInput?.value, 10) || 0;
              
              // Count currently checked boxes in this rank
              const currentlyMemorized = tbody.querySelectorAll('.spell-memorized:checked').length;
              
              if (currentlyMemorized > maxAllowed) {
                e.target.checked = false;
                const label = rankLabels[rank];
                this.showMemorizeWarning(`You may only memorize ${maxAllowed} ${label} spell${maxAllowed !== 1 ? 's' : ''}. Forget one before you memorize another.`);
                return;
              }
            }
            this.scheduleAutoSave();
          });
        }
        
        // Auto-fill cost when spell name is selected/entered
        if (nameInput && costInput) {
          nameInput.addEventListener('change', () => {
            const spellName = nameInput.value.trim();
            if (spellName && window.SpellData) {
              // Convert to title case
              nameInput.value = this.toTitleCase(spellName);
              
              // Convert rank key to number for getSpellCost
              const rankNum = rank === 'cantrips' ? 0 : parseInt(rank.replace('rank', ''), 10);
              const cost = window.SpellData.getSpellCost(spellName, rankNum);
              if (cost) {
                costInput.value = cost;
              }
              // Update tooltip with spell description
              const description = window.SpellData.getSpellDescription(spellName);
              if (description) {
                nameInput.title = description;
              } else {
                nameInput.title = '';
              }
            } else {
              // Spell name was cleared - also clear the cost and tooltip
              costInput.value = '';
              nameInput.title = '';
              // Also clear classSpell marker if present
              delete nameInput.dataset.classSpell;
            }
            this.scheduleAutoSave();
          });
          
          nameInput.addEventListener('input', () => this.scheduleAutoSave());
        }
        
        tr.querySelectorAll('input').forEach(input => {
          if (input !== nameInput && input !== memCheck) {
            input.addEventListener('input', () => this.scheduleAutoSave());
          }
          input.addEventListener('change', () => this.scheduleAutoSave());
        });
      }
      
      // Max memorized input
      const maxInput = document.getElementById(`${rank}-max`);
      if (maxInput) {
        maxInput.addEventListener('input', () => this.scheduleAutoSave());
      }
    });
  },

  /**
   * Show memorize limit warning
   */
  showMemorizeWarning(message) {
    // Create or get warning overlay
    let overlay = document.getElementById('memorize-warning-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'memorize-warning-overlay';
      overlay.className = 'damage-result-overlay';
      overlay.innerHTML = `
        <div class="damage-result-content memorize-warning-content">
          <div class="memorize-warning-icon">⚠️</div>
          <div class="memorize-warning-message"></div>
          <button class="damage-close">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
      
      overlay.querySelector('.damage-close').addEventListener('click', () => {
        overlay.classList.remove('visible');
      });
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('visible');
        }
      });
    }
    
    overlay.querySelector('.memorize-warning-message').textContent = message;
    overlay.classList.add('visible');
  },

  /**
   * Populate form with character data
   */
  populateForm() {
    // Info fields
    const infoMapping = {
      'character-name': 'characterName',
      'species': 'species',
      'culture': 'culture',
      'class-primary': 'classPrimary',
      'class-secondary': 'classSecondary',
      'class-tertiary': 'classTertiary',
      'rank-name': 'rankName',
      'gender': 'gender',
      'age': 'age',
      'handedness': 'handedness',
      'height': 'height',
      'weight': 'weight',
      'hair': 'hair',
      'eyes': 'eyes',
      'rank-primary': 'rankPrimary',
      'rank-secondary': 'rankSecondary',
      'rank-tertiary': 'rankTertiary',
      'tenacity-current': 'tenacityCurrent',
      'tenacity-max': 'tenacityMax',
      'exp-rolls': 'expRolls'
    };
    
    for (const [fieldId, key] of Object.entries(infoMapping)) {
      const field = document.getElementById(fieldId);
      if (field && this.character.info[key] !== undefined) {
        field.value = this.character.info[key];
      }
    }
    
    // Attributes (single value)
    for (const attr of ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA']) {
      const input = document.getElementById(`${attr.toLowerCase()}-value`);
      if (input && this.character.attributes[attr] !== undefined) {
        input.value = this.character.attributes[attr];
      }
    }
    
    // Derived stats (current values)
    const derivedMapping = {
      'action-points-current': 'actionPointsCurrent',
      'damage-mod-current': 'damageModCurrent',
      'exp-mod-current': 'expModCurrent',
      'healing-rate-current': 'healingRateCurrent',
      'initiative-current': 'initiativeCurrent',
      'luck-current': 'luckCurrent',
      'magic-points-current': 'magicPointsCurrent',
      'movement-current': 'movementCurrent',
      'tenacity-current': 'tenacityCurrent'
    };
    
    for (const [fieldId, key] of Object.entries(derivedMapping)) {
      const field = document.getElementById(fieldId);
      if (field && this.character.derived[key] !== undefined) {
        field.value = this.character.derived[key];
        // Store as original value for ENC penalty system (initiative and movement)
        if (fieldId === 'initiative-current' || fieldId === 'movement-current') {
          field.dataset.originalValue = this.character.derived[key];
        }
      }
    }
    
    // Restore locked characteristics state if locked
    if (this.character.originalsLocked) {
      // Update button state to show locked
      const btn = document.getElementById('unlock-originals-btn');
      if (btn) {
        btn.textContent = '🔒 Unlock Characteristics';
        btn.classList.remove('unlocked');
      }
    }
    
    // Standard skills
    for (const skillKey of Object.keys(SKILL_DEFINITIONS.standard)) {
      const input = document.getElementById(`${this.kebabCase(skillKey)}-current`);
      if (input && this.character.standardSkills[skillKey] !== undefined) {
        input.value = this.character.standardSkills[skillKey];
        // Store as original value for ENC penalty system
        input.dataset.originalValue = this.character.standardSkills[skillKey];
      }
    }
    
    // Notes
    const generalNotes = document.getElementById('general-notes');
    if (generalNotes) generalNotes.value = this.character.notes || '';
    
    // Images
    if (this.character.images.fullBody) {
      this.displayImage('full-body', this.character.images.fullBody);
    }
    if (this.character.images.portrait) {
      this.displayImage('portrait', this.character.images.portrait);
    }
    
    // ENC automation
    const encToggle = document.getElementById('enc-automation-toggle');
    if (encToggle) {
      encToggle.checked = !this.character.encAutomation;
    }
    
    // Equipment
    if (this.character.equipment) {
      this.character.equipment.forEach((item, i) => {
        const nameInput = document.getElementById(`equip-${i}-name`);
        const encInput = document.getElementById(`equip-${i}-enc`);
        if (nameInput && item.name) nameInput.value = this.toTitleCase(item.name);
        if (encInput && item.enc) encInput.value = item.enc;
      });
    }
    
    // Money
    if (this.character.money) {
      const moneyTypes = ['copper', 'silver', 'gold', 'platinum', 'electrum'];
      moneyTypes.forEach(type => {
        const input = document.getElementById(`money-${type}`);
        if (input && this.character.money[type] !== undefined && this.character.money[type] !== '') {
          input.value = this.character.money[type];
        }
      });
      this.updateMoneyEnc();
    }
    
    // Professional Skills
    if (this.character.professionalSkills) {
      this.character.professionalSkills.forEach((skill, i) => {
        const nameInput = document.getElementById(`prof-skill-${i}-name`);
        const baseInput = document.getElementById(`prof-skill-${i}-base`);
        const currentInput = document.getElementById(`prof-skill-${i}-current`);
        const prereqKeys = document.getElementById(`prof-skill-${i}-prereq`);
        if (nameInput && skill.name) nameInput.value = this.toTitleCase(skill.name);
        if (baseInput && skill.base) baseInput.value = skill.base;
        if (currentInput && skill.current) {
          currentInput.value = skill.current;
          currentInput.dataset.originalValue = skill.current;
        }
        if (prereqKeys && skill.name) prereqKeys.dataset.skillName = this.toTitleCase(skill.name);
        this.updateProfSkillEncIndicator(i);
      });
      this.recalculateProfessionalSkillBases();
    }
    
    // Alignments
    if (this.character.alignments) {
      this.character.alignments.forEach((item, i) => {
        const nameInput = document.getElementById(`alignment-${i+1}-name`);
        const currentInput = document.getElementById(`alignment-${i+1}-current`);
        if (nameInput && item.name) nameInput.value = item.name;
        if (currentInput && item.current) currentInput.value = item.current;
      });
    }
    
    // Passions
    if (this.character.passions) {
      this.character.passions.forEach((item, i) => {
        const nameInput = document.getElementById(`passion-${i+1}-name`);
        const formulaInput = document.getElementById(`passion-${i+1}-formula`);
        const currentInput = document.getElementById(`passion-${i+1}-current`);
        if (nameInput && item.name) nameInput.value = item.name;
        if (formulaInput && item.formula) formulaInput.value = item.formula;
        if (currentInput && item.current) currentInput.value = item.current;
      });
    }
    
    // Oaths
    if (this.character.oaths) {
      this.character.oaths.forEach((item, i) => {
        const nameInput = document.getElementById(`oath-${i+1}-name`);
        const currentInput = document.getElementById(`oath-${i+1}-current`);
        if (nameInput && item.name) nameInput.value = item.name;
        if (currentInput && item.current) currentInput.value = item.current;
      });
    }
    
    // Languages
    if (this.character.languages) {
      // Native tongue
      if (this.character.languages[0]) {
        const nativeName = document.getElementById('native-tongue-name');
        const nativeCurrent = document.getElementById('native-tongue-current');
        if (nativeName && this.character.languages[0].name) nativeName.value = this.character.languages[0].name;
        if (nativeCurrent && this.character.languages[0].current) nativeCurrent.value = this.character.languages[0].current;
      }
      // Additional languages
      for (let i = 1; i < this.character.languages.length; i++) {
        const item = this.character.languages[i];
        const nameInput = document.getElementById(`language-${i+1}-name`);
        const currentInput = document.getElementById(`language-${i+1}-current`);
        if (nameInput && item.name) nameInput.value = item.name;
        if (currentInput && item.current) currentInput.value = item.current;
      }
    }
    
    // Combat Skills
    if (this.character.combat && this.character.combat.skills && this.character.combat.skills[0]) {
      const skill = this.character.combat.skills[0];
      const nameInput = document.getElementById('combat-skill-1-name');
      const percentInput = document.getElementById('combat-skill-1-percent');
      const weaponsInput = document.getElementById('combat-skill-1-weapons');
      if (nameInput && skill.name) nameInput.value = skill.name;
      if (percentInput && skill.percent) percentInput.value = skill.percent;
      if (weaponsInput && skill.weapons) weaponsInput.value = skill.weapons;
    }
    
    // Unarmed
    if (this.character.combat) {
      const unarmedInput = document.getElementById('unarmed-percent');
      if (unarmedInput && this.character.combat.unarmedPercent) {
        unarmedInput.value = this.character.combat.unarmedPercent;
      }
    }
    
    // Hit Locations
    if (this.character.combat && this.character.combat.hitLocations) {
      this.character.combat.hitLocations.forEach((loc, i) => {
        const armorInput = document.getElementById(`loc-${i}-armor`);
        const apInput = document.getElementById(`loc-${i}-ap`);
        const hpInput = document.getElementById(`loc-${i}-hp`);
        const currentInput = document.getElementById(`loc-${i}-current`);
        if (armorInput && loc.armor) armorInput.value = loc.armor;
        if (apInput && loc.ap) apInput.value = loc.ap;
        if (hpInput && loc.hp !== undefined && loc.hp !== '') hpInput.value = loc.hp;
        if (currentInput && loc.current) currentInput.value = loc.current;
      });
    }
    
    // Melee Weapons
    if (this.character.combat && this.character.combat.meleeWeapons) {
      this.character.combat.meleeWeapons.forEach((weapon, i) => {
        const fields = ['name', 'hands', 'damage', 'size', 'effects', 'aphp', 'traits'];
        const nameInput = document.getElementById(`melee-${i}-name`);
        fields.forEach(field => {
          const input = document.getElementById(`melee-${i}-${field}`);
          if (input && weapon[field]) {
            input.value = field === 'name' ? this.toTitleCase(weapon[field]) : weapon[field];
          }
          // Restore baseDamage data attribute for damage field
          if (field === 'damage' && input && weapon.baseDamage) {
            input.dataset.baseDamage = weapon.baseDamage;
          }
        });
        // Restore userModified flag
        if (nameInput && weapon.userModified) {
          nameInput.dataset.userModified = 'true';
        }
      });
    }
    
    // Ranged Weapons
    if (this.character.combat && this.character.combat.rangedWeapons) {
      this.character.combat.rangedWeapons.forEach((weapon, i) => {
        const fields = ['name', 'hands', 'damage', 'dm', 'range', 'load', 'effects', 'impl', 'aphp', 'traits'];
        const nameInput = document.getElementById(`ranged-${i}-name`);
        fields.forEach(field => {
          const input = document.getElementById(`ranged-${i}-${field}`);
          if (input && weapon[field]) {
            input.value = field === 'name' ? this.toTitleCase(weapon[field]) : weapon[field];
          }
          // Restore baseDamage data attribute for damage field
          if (field === 'damage' && input && weapon.baseDamage) {
            input.dataset.baseDamage = weapon.baseDamage;
          }
        });
        // Restore userModified flag
        if (nameInput && weapon.userModified) {
          nameInput.dataset.userModified = 'true';
        }
      });
    }
    
    // Special Abilities (dynamic format)
    if (this.character.combat && this.character.combat.specialAbilities) {
      this.character.combat.specialAbilities.forEach((ability) => {
        if (ability) {
          // Handle both new format (object with name/source) and old format (string)
          if (typeof ability === 'object' && ability.name && ability.name.trim()) {
            this.addClassAbilityRow(ability.name, ability.source);
          } else if (typeof ability === 'string' && ability.trim()) {
            this.addClassAbilityRow(ability);
          }
        }
      });
      // Update tooltips after loading abilities
      this.updateAllAbilityTooltips();
    }
    
    // Flying Speed
    if (this.character.combat) {
      const flyingInput = document.getElementById('flying-speed');
      if (flyingInput && this.character.combat.flyingSpeed) {
        flyingInput.value = this.character.combat.flyingSpeed;
      }
    }
    
    // Magic Skills
    if (this.character.magic) {
      const magicFields = {
        'deity': 'deity',
        'channel-percent': 'channelPercent',
        'piety-percent': 'pietyPercent',
        'arcane-casting-percent': 'arcaneCastingPercent',
        'arcane-knowledge-percent': 'arcaneKnowledgePercent',
        'arcane-sorcery-percent': 'arcaneSorceryPercent',
        'sorcerous-wisdom-percent': 'sorcerousWisdomPercent',
        'musicianship-percent': 'musicianshipPercent',
        'lyrical-magic-percent': 'lyricalMagicPercent'
      };
      for (const [fieldId, key] of Object.entries(magicFields)) {
        const input = document.getElementById(fieldId);
        if (input && this.character.magic[key]) input.value = this.character.magic[key];
      }
    }
    
    // Spells
    if (this.character.magic && this.character.magic.spells) {
      const ranks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
      ranks.forEach(rank => {
        if (this.character.magic.spells[rank]) {
          // Max spells
          const maxInput = document.getElementById(`${rank}-max`);
          if (maxInput && this.character.magic.spells[rank].max) {
            maxInput.value = this.character.magic.spells[rank].max;
          }
          // Individual spells
          if (this.character.magic.spells[rank].spells) {
            this.character.magic.spells[rank].spells.forEach((spell, i) => {
              const nameInput = document.getElementById(`${rank}-${i}-name`);
              const costInput = document.getElementById(`${rank}-${i}-cost`);
              const memCheck = document.getElementById(`${rank}-${i}-mem`);
              if (nameInput && spell.name) {
                nameInput.value = this.toTitleCase(spell.name);
                // Restore classSpell marker if present
                if (spell.classSpell) {
                  nameInput.dataset.classSpell = spell.classSpell;
                }
                // Set tooltip with spell description
                if (window.SpellData) {
                  const description = window.SpellData.getSpellDescription(spell.name);
                  if (description) {
                    nameInput.title = description;
                  }
                }
              }
              if (costInput && spell.cost) costInput.value = spell.cost;
              if (memCheck && spell.memorized) memCheck.checked = spell.memorized;
            });
          }
        }
      });
    }
    
    // Update weapon damages with current damage modifier after all data is loaded
    if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
      window.WeaponData.updateAllWeaponDamage();
    }
    
    // Restore fatigue state
    if (this.character.fatigueState && this.character.fatigueState !== 'fresh') {
      this.setFatigueState(this.character.fatigueState, false); // false = don't re-save yet
    }
    
    // Ensure ALL skill fields have originalValue set for penalty system
    this.initializeOriginalValues();
  },

  /**
   * Collect all form data into character object
   */
  collectFormData() {
    // This is called before save/export to ensure all data is captured
    // Most data is already saved via event listeners, but this catches anything missed
    
    // Equipment
    this.character.equipment = [];
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const nameInput = document.getElementById(`equip-${i}-name`);
      const encInput = document.getElementById(`equip-${i}-enc`);
      if (nameInput && encInput) {
        this.character.equipment.push({
          name: nameInput.value,
          enc: encInput.value
        });
      }
    }
    
    // Money
    this.character.money = {
      copper: document.getElementById('money-copper')?.value || '',
      silver: document.getElementById('money-silver')?.value || '',
      gold: document.getElementById('money-gold')?.value || '',
      platinum: document.getElementById('money-platinum')?.value || '',
      electrum: document.getElementById('money-electrum')?.value || ''
    };
    
    // Alignments
    for (let i = 1; i <= 2; i++) {
      const nameInput = document.getElementById(`alignment-${i}-name`);
      const currentInput = document.getElementById(`alignment-${i}-current`);
      if (nameInput && currentInput) {
        this.character.alignments[i-1] = {
          name: nameInput.value,
          current: currentInput.value
        };
      }
    }
    
    // Passions (dynamic rows with custom formulas)
    this.character.passions = [];
    const passionsContainer = document.getElementById('passions-container');
    if (passionsContainer) {
      const passionRows = passionsContainer.querySelectorAll('.belief-row');
      passionRows.forEach((row, i) => {
        const nameInput = row.querySelector('.belief-name');
        const formulaInput = row.querySelector('.belief-formula-input');
        const currentInput = row.querySelector('.belief-input');
        this.character.passions.push({
          name: nameInput?.value || '',
          formula: formulaInput?.value || 'POW+INT+50',
          current: currentInput?.value || ''
        });
      });
    }
    
    // Oaths (dynamic rows)
    this.character.oaths = [];
    const oathsContainer = document.getElementById('oaths-container');
    if (oathsContainer) {
      const oathRows = oathsContainer.querySelectorAll('.belief-row');
      oathRows.forEach((row, i) => {
        const nameInput = row.querySelector('.belief-name');
        const currentInput = row.querySelector('.belief-input');
        this.character.oaths.push({
          name: nameInput?.value || '',
          current: currentInput?.value || ''
        });
      });
    }
    
    // Languages
    const nativeName = document.getElementById('native-tongue-name');
    const nativeCurrent = document.getElementById('native-tongue-current');
    if (nativeName && nativeCurrent) {
      this.character.languages[0] = {
        name: nativeName.value,
        current: nativeCurrent.value,
        isNative: true
      };
    }
    
    for (let i = 2; i <= 5; i++) {
      const nameInput = document.getElementById(`language-${i}-name`);
      const currentInput = document.getElementById(`language-${i}-current`);
      if (nameInput && currentInput) {
        this.character.languages[i-1] = {
          name: nameInput.value,
          current: currentInput.value,
          isNative: false
        };
      }
    }
    
    // Professional Skills
    this.character.professionalSkills = [];
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const baseInput = document.getElementById(`prof-skill-${i}-base`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      if (nameInput && baseInput && currentInput) {
        this.character.professionalSkills.push({
          name: nameInput.value,
          base: baseInput.value,
          current: currentInput.dataset.originalValue || currentInput.value
        });
      }
    }
    
    // Combat Skills
    this.character.combat.skills = [];
    const nameInput = document.getElementById('combat-skill-1-name');
    const percentInput = document.getElementById('combat-skill-1-percent');
    const weaponsInput = document.getElementById('combat-skill-1-weapons');
    if (nameInput) {
      this.character.combat.skills.push({
        name: nameInput?.value || '',
        percent: percentInput?.dataset.originalValue || percentInput?.value || '',
        weapons: weaponsInput?.value || ''
      });
    }
    
    // Unarmed
    const unarmedInput = document.getElementById('unarmed-percent');
    if (unarmedInput) {
      this.character.combat.unarmedPercent = unarmedInput.dataset.originalValue || unarmedInput.value;
    }
    
    // Hit Locations
    this.character.combat.hitLocations = [];
    const hitLocCount = this.sheetType === 'syrin' ? 9 : 7;
    for (let i = 0; i < hitLocCount; i++) {
      const armorInput = document.getElementById(`loc-${i}-armor`);
      const apInput = document.getElementById(`loc-${i}-ap`);
      const hpInput = document.getElementById(`loc-${i}-hp`);
      const currentInput = document.getElementById(`loc-${i}-current`);
      this.character.combat.hitLocations.push({
        armor: armorInput?.value || '',
        ap: apInput?.value || '',
        hp: hpInput?.value || '',
        current: currentInput?.value || ''
      });
    }
    
    // Melee Weapons
    this.character.combat.meleeWeapons = [];
    for (let i = 0; i < 6; i++) {
      const weapon = {};
      const fields = ['name', 'hands', 'damage', 'size', 'effects', 'aphp', 'traits'];
      const nameInput = document.getElementById(`melee-${i}-name`);
      fields.forEach(field => {
        const input = document.getElementById(`melee-${i}-${field}`);
        weapon[field] = input?.value || '';
        if (field === 'damage' && input?.dataset?.baseDamage) {
          weapon.baseDamage = input.dataset.baseDamage;
        }
      });
      if (nameInput?.dataset?.userModified === 'true') {
        weapon.userModified = true;
      }
      this.character.combat.meleeWeapons.push(weapon);
    }
    
    // Ranged Weapons
    this.character.combat.rangedWeapons = [];
    for (let i = 0; i < 5; i++) {
      const weapon = {};
      const fields = ['name', 'hands', 'damage', 'dm', 'range', 'load', 'effects', 'impl', 'aphp', 'traits'];
      const nameInput = document.getElementById(`ranged-${i}-name`);
      fields.forEach(field => {
        const input = document.getElementById(`ranged-${i}-${field}`);
        weapon[field] = input?.value || '';
        if (field === 'damage' && input?.dataset?.baseDamage) {
          weapon.baseDamage = input.dataset.baseDamage;
        }
      });
      if (nameInput?.dataset?.userModified === 'true') {
        weapon.userModified = true;
      }
      this.character.combat.rangedWeapons.push(weapon);
    }
    
    // Special Abilities (dynamic list format)
    // If all class fields are empty, clear all class abilities
    const currentClasses = this.getCurrentClasses();
    this.character.combat.specialAbilities = [];
    
    if (currentClasses.length > 0) {
      // Only save abilities if at least one class is set
      const abilityContainer = document.getElementById('class-abilities-list');
      if (abilityContainer) {
        const abilityInputs = abilityContainer.querySelectorAll('.class-ability-input');
        abilityInputs.forEach(input => {
          if (input.value.trim()) {
            this.character.combat.specialAbilities.push({
              name: input.value.trim(),
              source: input.dataset.classAbility || null
            });
          }
        });
      }
    } else {
      // No classes set - clear the abilities from the UI as well
      const abilityContainer = document.getElementById('class-abilities-list');
      if (abilityContainer) {
        // Remove ability effects before clearing
        const abilityInputs = abilityContainer.querySelectorAll('.class-ability-input');
        abilityInputs.forEach(input => {
          if (input.value.trim()) {
            this.removeAbilityEffect(input.value.trim());
          }
        });
        abilityContainer.innerHTML = '';
      }
      // Also clear acquired abilities tracking
      this.character.acquiredAbilities = [];
    }
    
    // Flying Speed
    const flyingInput = document.getElementById('flying-speed');
    if (flyingInput) {
      this.character.combat.flyingSpeed = flyingInput.value;
    }
    
    // Species Abilities (editable)
    this.character.speciesAbilities = [];
    const speciesAbilitiesContainer = document.getElementById('species-abilities-list');
    if (speciesAbilitiesContainer) {
      const abilityInputs = speciesAbilitiesContainer.querySelectorAll('.species-ability-input');
      abilityInputs.forEach(input => {
        if (input.value.trim()) {
          this.character.speciesAbilities.push(input.value.trim());
        }
      });
    }
    
    // Berserk Rage state
    this.character.isRaging = this.isRaging || false;
    this.character.rageUsesRemaining = this.rageUsesRemaining;
    this.character.preRageValues = this.preRageValues;
    const rageRoundsInput = document.getElementById('rage-rounds-used');
    if (rageRoundsInput) {
      this.character.rageRoundsUsed = parseInt(rageRoundsInput.value, 10) || 0;
    }
    
    // Magic Skills
    const magicFields = {
      'deity': 'deity',
      'channel-percent': 'channelPercent',
      'piety-percent': 'pietyPercent',
      'arcane-casting-percent': 'arcaneCastingPercent',
      'arcane-knowledge-percent': 'arcaneKnowledgePercent',
      'arcane-sorcery-percent': 'arcaneSorceryPercent',
      'sorcerous-wisdom-percent': 'sorcerousWisdomPercent',
      'musicianship-percent': 'musicianshipPercent',
      'lyrical-magic-percent': 'lyricalMagicPercent'
    };
    for (const [fieldId, key] of Object.entries(magicFields)) {
      const input = document.getElementById(fieldId);
      if (input) {
        this.character.magic[key] = input.value;
      }
    }
    
    // Spells
    const ranks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    ranks.forEach(rank => {
      // Max spells
      const maxInput = document.getElementById(`${rank}-max`);
      if (maxInput) {
        this.character.magic.spells[rank].max = maxInput.value;
      }
      // Individual spells
      this.character.magic.spells[rank].spells = [];
      for (let i = 0; i < SPELL_SLOTS_PER_RANK; i++) {
        const nameInput = document.getElementById(`${rank}-${i}-name`);
        const costInput = document.getElementById(`${rank}-${i}-cost`);
        const memCheck = document.getElementById(`${rank}-${i}-mem`);
        if (nameInput) {
          this.character.magic.spells[rank].spells.push({
            name: nameInput?.value || '',
            cost: costInput?.value || '',
            memorized: memCheck?.checked || false,
            classSpell: nameInput.dataset.classSpell || null
          });
        }
      }
    });
    
    // General Notes
    const generalNotes = document.getElementById('general-notes');
    if (generalNotes) {
      this.character.notes = generalNotes.value;
    }
  },

  /**
   * Recalculate all derived values
   */
  recalculateAll() {
    const attrs = this.character.attributes;
    
    // Calculate combined rank from all classes
    const primaryRank = parseInt(document.getElementById('rank-primary')?.value, 10) || 0;
    const secondaryRank = parseInt(document.getElementById('rank-secondary')?.value, 10) || 0;
    const tertiaryRank = parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0;
    const combinedRank = primaryRank + secondaryRank + tertiaryRank;
    
    // Update the combined rank display field
    const combinedRankField = document.getElementById('rank-combined');
    if (combinedRankField) {
      combinedRankField.value = combinedRank;
    }
    
    // Check if character is human (for luck bonus)
    const species = document.getElementById('species')?.value?.toLowerCase().trim() || '';
    const isHuman = species === 'human';
    
    // Check if Resilient ability is active (affects HP calculation)
    const hasResilient = this.hasAbility('resilient');
    
    const results = Calculator.recalculateAll(attrs, this.sheetType, combinedRank, isHuman, hasResilient);
    
    // Always update original attribute values (they are auto-calculated and readonly)
    const apOrig = document.getElementById('action-points-original');
    if (apOrig) {
      apOrig.value = results.derived.actionPoints;
    }
    
    const dmgOrig = document.getElementById('damage-mod-original');
    if (dmgOrig) {
      dmgOrig.value = results.derived.damageModifier;
    }
    
    const expOrig = document.getElementById('exp-mod-original');
    if (expOrig) {
      expOrig.value = results.derived.expMod;
    }
    
    const healOrig = document.getElementById('healing-rate-original');
    if (healOrig) {
      healOrig.value = results.derived.healingRate;
    }
    
    const initOrig = document.getElementById('initiative-original');
    if (initOrig) {
      initOrig.value = results.derived.initiative;
    }
    
    const luckOrig = document.getElementById('luck-original');
    if (luckOrig) {
      luckOrig.value = results.derived.luckPoints;
    }
    
    const magicOrig = document.getElementById('magic-points-original');
    if (magicOrig) {
      magicOrig.value = results.derived.magicPoints;
    }
    
    // Update hit location HPs (original only)
    this.updateHitLocationHPs(results.hitLocations);
    
    // Update movement rate from species
    const movementOrig = document.getElementById('movement-original');
    if (movementOrig && window.SpeciesData) {
      const speciesData = window.SpeciesData.getSpecies(species);
      movementOrig.value = speciesData ? speciesData.movement : 20;
    }
    
    // Update weapon damage displays when damage modifier changes
    if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
      window.WeaponData.updateAllWeaponDamage();
    }
    
    // Tenacity Max is always equal to POW (not affected by lock)
    const tenacityMax = document.getElementById('tenacity-max');
    if (tenacityMax) {
      tenacityMax.value = attrs.POW || '';
    }
    
    // Update skill bases
    for (const [skillKey, baseValue] of Object.entries(results.skills)) {
      const baseSpan = document.getElementById(`${this.kebabCase(skillKey)}-base`);
      if (baseSpan) {
        baseSpan.textContent = baseValue;
      }
    }
    
    // Update belief bases
    for (let i = 1; i <= 2; i++) {
      const baseSpan = document.getElementById(`alignment-${i}-base`);
      if (baseSpan) baseSpan.textContent = results.beliefs.alignment;
    }
    
    // Update all passion bases (dynamic count) - each passion can have a custom formula
    const passionsContainer = document.getElementById('passions-container');
    if (passionsContainer) {
      const passionRows = passionsContainer.querySelectorAll('.belief-row');
      passionRows.forEach(row => {
        const formulaInput = row.querySelector('.belief-formula-input');
        const passionBase = row.querySelector('.belief-base');
        if (formulaInput && passionBase) {
          const formula = formulaInput.value.trim();
          if (formula) {
            const result = this.calculateFormulaValue(formula.toUpperCase());
            passionBase.textContent = result !== null ? result : '0';
          } else {
            passionBase.textContent = '0';
          }
        }
      });
    }
    
    // Update all oath bases (dynamic count)
    const oathsContainer = document.getElementById('oaths-container');
    if (oathsContainer) {
      const oathRows = oathsContainer.querySelectorAll('.belief-row');
      oathRows.forEach(row => {
        const oathBase = row.querySelector('.belief-base');
        if (oathBase) oathBase.textContent = results.beliefs.oath;
      });
    }
    
    // Update language bases
    const nativeBase = document.getElementById('native-tongue-base');
    if (nativeBase) nativeBase.textContent = results.languages.native;
    
    // Update all additional language bases (dynamic count)
    const langContainer = document.getElementById('language-container');
    if (langContainer) {
      const langRows = langContainer.querySelectorAll('.language-row:not(.native)');
      langRows.forEach((row, idx) => {
        const langBase = row.querySelector('.language-base');
        if (langBase) langBase.textContent = results.languages.additional;
      });
    }
    
    // Update professional skill base values
    this.recalculateProfessionalSkillBases();
    
    // Note: Hit location HP values are user-editable and saved/loaded from storage
    // They are not auto-calculated from attributes
    
    // Update combat quick reference
    this.updateCombatQuickRef();
    
    // Update movement
    this.updateMovementDisplay();
    
    // Update jumps
    this.updateJumpDisplay();
    
    // Update total ENC
    this.updateTotalEnc();
    
    // Update weapon damages with current damage modifier
    if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
      window.WeaponData.updateAllWeaponDamage();
    }
    
    // Update spell memorization limits (depends on INT)
    this.updateSpellMemorization();
    
    // Populate class spells (for spell-granting classes like Cleric)
    // Don't remove any spells on init - just add missing ones
    this.updateClassSpells(null);
    
    // Populate class abilities
    this.updateClassAbilities(null);
    
    // Re-apply ability effects (Agile, Artful Dodger, Weapon Precision)
    // These modify calculated values and need to be reapplied after base recalculation
    this.reapplyAbilityEffects();
    
    // Update Berserk Rage display if active (uses and rounds depend on CON)
    if (this.hasAbility('berserk rage')) {
      this.updateBerserkRageDisplay();
    }
  },
  
  /**
   * Re-apply ability effects after recalculation
   * This is called after base values are recalculated to re-add bonuses
   * Skips persistent effects (like Lucky, Gifted) which modify input fields
   */
  reapplyAbilityEffects() {
    // Remember which persistent effects were already active (don't clear them)
    const persistentEffects = {};
    for (const [baseName, data] of Object.entries(this.activeAbilityEffects)) {
      const effect = this.ABILITY_EFFECTS[baseName];
      if (effect && effect.persistent) {
        persistentEffects[baseName] = data;
      }
    }
    
    // Clear non-persistent active tracking (base values were just recalculated)
    this.activeAbilityEffects = { ...persistentEffects };
    
    // Check all class abilities on the sheet and apply their effects
    const classContainer = document.getElementById('class-abilities-list');
    if (classContainer) {
      const inputs = classContainer.querySelectorAll('.class-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          const baseName = input.value.split('(')[0].trim().toLowerCase();
          const effect = this.ABILITY_EFFECTS[baseName];
          // Skip persistent effects - they were already applied when gained
          if (effect && !effect.persistent && !this.activeAbilityEffects[baseName]) {
            this.activeAbilityEffects[baseName] = { active: true };
            effect.apply(this);
          }
        }
      });
    }
    
    // Also check species abilities
    const speciesAbilities = this.getSpeciesAbilities();
    speciesAbilities.forEach(ability => {
      const baseName = ability.split('(')[0].trim().toLowerCase();
      const effect = this.ABILITY_EFFECTS[baseName];
      // Skip persistent effects - they were already applied when gained
      if (effect && !effect.persistent && !this.activeAbilityEffects[baseName]) {
        this.activeAbilityEffects[baseName] = { active: true };
        effect.apply(this);
      }
    });
  },

  /**
   * Update combat quick reference values
   */
  updateCombatQuickRef() {
    const initCurrent = document.getElementById('initiative-current');
    const combatInit = document.getElementById('combat-initiative');
    if (initCurrent && combatInit) {
      combatInit.textContent = initCurrent.value || '-';
    }
    
    const luckCurrent = document.getElementById('luck-current');
    const combatLuck = document.getElementById('combat-luck');
    if (luckCurrent && combatLuck) {
      combatLuck.textContent = luckCurrent.value || '-';
    }
    
    const combatAP = document.getElementById('combat-action-points');
    if (combatAP) {
      const apCurrent = document.getElementById('action-points-current');
      const apOrig = document.getElementById('action-points-original');
      combatAP.textContent = (apCurrent && apCurrent.value) ? apCurrent.value : (apOrig ? apOrig.value : '');
    }
    
    // Combat Skill from combat page
    const combatSkillRef = document.getElementById('combat-skill-ref');
    const combatSkillPercent = document.getElementById('combat-skill-1-percent');
    if (combatSkillRef && combatSkillPercent) {
      combatSkillRef.textContent = combatSkillPercent.value ? `${combatSkillPercent.value}%` : '-';
    }
    
    // Combat-relevant skills - show the user's entered % value from Character page
    const skillRefs = ['athletics', 'brawn', 'endurance', 'evade', 'perception', 'stealth', 'swim', 'willpower'];
    skillRefs.forEach(skill => {
      const refItem = document.getElementById(`ref-${skill}`);
      const skillInput = document.getElementById(`${skill}-current`);
      if (refItem) {
        const valueSpan = refItem.querySelector('.ref-skill-value');
        if (valueSpan) {
          valueSpan.textContent = skillInput && skillInput.value ? `${skillInput.value}%` : '-';
        }
      }
    });
  },

  /**
   * Update combat skill name from class fields
   * Combines Primary/Secondary/Tertiary classes with "/" separator
   * @param {boolean} forceUpdate - If true, overwrites existing value (used when classes change)
   */
  updateCombatSkillName(forceUpdate = false) {
    const primaryClass = document.getElementById('class-primary');
    const secondaryClass = document.getElementById('class-secondary');
    const tertiaryClass = document.getElementById('class-tertiary');
    const combatSkillName = document.getElementById('combat-skill-1-name');
    
    if (!combatSkillName) return;
    
    // Only auto-fill if the field is empty, unless forceUpdate is true
    if (!forceUpdate && combatSkillName.value.trim()) return;
    
    const classes = [];
    if (primaryClass && primaryClass.value.trim()) {
      classes.push(primaryClass.value.trim());
    }
    if (secondaryClass && secondaryClass.value.trim()) {
      classes.push(secondaryClass.value.trim());
    }
    if (tertiaryClass && tertiaryClass.value.trim()) {
      classes.push(tertiaryClass.value.trim());
    }
    
    if (classes.length > 0) {
      combatSkillName.value = classes.join('/');
    } else if (forceUpdate) {
      // Clear if all classes are empty and we're forcing update
      combatSkillName.value = '';
    }
  },

  /**
   * Update weapons known from class fields
   * Combines weapons from all classes
   * @param {boolean} forceUpdate - If true, overwrites existing value (used when classes change)
   */
  updateWeaponsKnown(forceUpdate = false) {
    const primaryClass = document.getElementById('class-primary');
    const secondaryClass = document.getElementById('class-secondary');
    const tertiaryClass = document.getElementById('class-tertiary');
    const weaponsKnown = document.getElementById('combat-skill-1-weapons');
    
    if (!weaponsKnown) return;
    
    // Only auto-fill if the field is empty, unless forceUpdate is true
    if (!forceUpdate && weaponsKnown.value.trim()) return;
    
    // Check if WeaponData is available
    if (!window.WeaponData || !window.WeaponData.combineClassWeapons) return;
    
    const classes = [];
    if (primaryClass && primaryClass.value.trim()) {
      classes.push(primaryClass.value.trim());
    }
    if (secondaryClass && secondaryClass.value.trim()) {
      classes.push(secondaryClass.value.trim());
    }
    if (tertiaryClass && tertiaryClass.value.trim()) {
      classes.push(tertiaryClass.value.trim());
    }
    
    if (classes.length > 0) {
      weaponsKnown.value = window.WeaponData.combineClassWeapons(classes);
    } else if (forceUpdate) {
      // Clear if all classes are empty and we're forcing update
      weaponsKnown.value = '';
    }
  },

  /**
   * Validate multiclass restrictions and update field states
   * @param {string} changedFieldId - The field that was just changed
   */
  validateAndUpdateClasses(changedFieldId) {
    if (!window.ClassRankData) return;
    
    const primaryField = document.getElementById('class-primary');
    const secondaryField = document.getElementById('class-secondary');
    const tertiaryField = document.getElementById('class-tertiary');
    const rankSecondaryField = document.getElementById('rank-secondary');
    const rankTertiaryField = document.getElementById('rank-tertiary');
    
    const primary = primaryField?.value?.trim() || '';
    const secondary = secondaryField?.value?.trim() || '';
    const tertiary = tertiaryField?.value?.trim() || '';
    
    // Check if primary class can multiclass
    if (primary) {
      const canMulti = window.ClassRankData.canClassMulticlass(primary);
      
      if (!canMulti) {
        // Disable secondary and tertiary fields
        this.setMulticlassFieldsEnabled(false);
        
        // Clear any existing secondary/tertiary values with warning
        if (secondary || tertiary) {
          this.showMulticlassWarning(`${primary} cannot multiclass.`);
          if (secondaryField) {
            secondaryField.value = '';
            this.character.info.classSecondary = '';
          }
          if (tertiaryField) {
            tertiaryField.value = '';
            this.character.info.classTertiary = '';
          }
          if (rankSecondaryField) {
            rankSecondaryField.value = '';
            this.character.info.rankSecondary = '';
          }
          if (rankTertiaryField) {
            rankTertiaryField.value = '';
            this.character.info.rankTertiary = '';
          }
        }
        return;
      } else {
        // Enable secondary and tertiary fields
        this.setMulticlassFieldsEnabled(true);
      }
    } else {
      // No primary class - enable fields but they're essentially useless
      this.setMulticlassFieldsEnabled(true);
    }
    
    // Validate specific combinations
    if (changedFieldId === 'class-secondary' && secondary) {
      const check = window.ClassRankData.canCombineClasses(primary, secondary);
      if (!check.allowed) {
        this.showMulticlassWarning(check.reason);
        secondaryField.value = '';
        this.character.info.classSecondary = '';
        if (rankSecondaryField) {
          rankSecondaryField.value = '';
          this.character.info.rankSecondary = '';
        }
        return;
      }
    }
    
    if (changedFieldId === 'class-tertiary' && tertiary) {
      // Check tertiary against primary
      const check1 = window.ClassRankData.canCombineClasses(primary, tertiary);
      if (!check1.allowed) {
        this.showMulticlassWarning(check1.reason);
        tertiaryField.value = '';
        this.character.info.classTertiary = '';
        if (rankTertiaryField) {
          rankTertiaryField.value = '';
          this.character.info.rankTertiary = '';
        }
        return;
      }
      
      // Check tertiary against secondary
      if (secondary) {
        const check2 = window.ClassRankData.canCombineClasses(secondary, tertiary);
        if (!check2.allowed) {
          this.showMulticlassWarning(check2.reason);
          tertiaryField.value = '';
          this.character.info.classTertiary = '';
          if (rankTertiaryField) {
            rankTertiaryField.value = '';
            this.character.info.rankTertiary = '';
          }
          return;
        }
      }
    }
    
    // If primary changed, re-validate existing secondary/tertiary
    if (changedFieldId === 'class-primary' && primary) {
      if (secondary) {
        const check = window.ClassRankData.canCombineClasses(primary, secondary);
        if (!check.allowed) {
          this.showMulticlassWarning(check.reason);
          secondaryField.value = '';
          this.character.info.classSecondary = '';
          if (rankSecondaryField) {
            rankSecondaryField.value = '';
            this.character.info.rankSecondary = '';
          }
        }
      }
      if (tertiary) {
        const check = window.ClassRankData.canCombineClasses(primary, tertiary);
        if (!check.allowed) {
          this.showMulticlassWarning(check.reason);
          tertiaryField.value = '';
          this.character.info.classTertiary = '';
          if (rankTertiaryField) {
            rankTertiaryField.value = '';
            this.character.info.rankTertiary = '';
          }
        }
      }
    }
  },
  
  /**
   * Enable or disable secondary/tertiary class and rank fields
   */
  setMulticlassFieldsEnabled(enabled) {
    const fields = [
      'class-secondary', 'class-tertiary',
      'rank-secondary', 'rank-tertiary'
    ];
    
    fields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.disabled = !enabled;
        if (enabled) {
          field.classList.remove('field-disabled');
        } else {
          field.classList.add('field-disabled');
        }
      }
    });
  },
  
  /**
   * Update prerequisite key icons on all skills based on current classes
   */
  updatePrereqKeys() {
    if (!window.ClassRankData) return;
    
    const primaryClass = document.getElementById('class-primary')?.value?.trim() || '';
    const secondaryClass = document.getElementById('class-secondary')?.value?.trim() || '';
    const tertiaryClass = document.getElementById('class-tertiary')?.value?.trim() || '';
    
    const primaryRank = parseInt(document.getElementById('rank-primary')?.value, 10) || 0;
    const secondaryRank = parseInt(document.getElementById('rank-secondary')?.value, 10) || 0;
    const tertiaryRank = parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0;
    
    // Update prereq label visibility based on whether classes are selected
    this.updatePrereqLabelVisibility(secondaryClass, tertiaryClass);
    
    // Get rank requirements for each class slot
    const primaryReq = primaryClass ? window.ClassRankData.getNextRankRequirement(primaryRank, 'primary') : null;
    const secondaryReq = secondaryClass ? window.ClassRankData.getNextRankRequirement(secondaryRank, 'secondary') : null;
    const tertiaryReq = tertiaryClass ? window.ClassRankData.getNextRankRequirement(tertiaryRank, 'tertiary') : null;
    
    // Find all prereq-keys containers
    const allPrereqContainers = document.querySelectorAll('.prereq-keys');
    
    allPrereqContainers.forEach(container => {
      const skillName = container.dataset.skillName;
      if (!skillName) {
        container.innerHTML = '';
        return;
      }
      
      const keys = window.ClassRankData.getPrereqKeysForSkill(skillName, primaryClass, secondaryClass, tertiaryClass);
      
      // Build key icons HTML
      let html = '';
      if (keys.primary) {
        const tooltip = primaryReq 
          ? `${primaryClass}: Rank ${primaryReq.nextRank} requires ${primaryReq.skillsNeeded} skills at ${primaryReq.percentRequired}%`
          : `${primaryClass}: Max Rank`;
        html += this.getPrereqKeySvg('gold', tooltip);
      }
      if (keys.secondary) {
        const tooltip = secondaryReq 
          ? `${secondaryClass}: Rank ${secondaryReq.nextRank} requires ${secondaryReq.skillsNeeded} skills at ${secondaryReq.percentRequired}%`
          : `${secondaryClass}: Max Rank`;
        html += this.getPrereqKeySvg('silver', tooltip);
      }
      if (keys.tertiary) {
        const tooltip = tertiaryReq 
          ? `${tertiaryClass}: Rank ${tertiaryReq.nextRank} requires ${tertiaryReq.skillsNeeded} skills at ${tertiaryReq.percentRequired}%`
          : `${tertiaryClass}: Max Rank`;
        html += this.getPrereqKeySvg('blue', tooltip);
      }
      
      container.innerHTML = html;
    });
    
    // Set up click handlers for all prereq keys
    this.setupPrereqKeyClicks();
  },
  
  /**
   * Set up click handlers for prerequisite key icons
   */
  setupPrereqKeyClicks() {
    document.querySelectorAll('.prereq-key[data-key-info]').forEach(key => {
      // Remove existing listener to avoid duplicates
      key.removeEventListener('click', key._clickHandler);
      
      key._clickHandler = (e) => {
        e.stopPropagation();
        const info = key.dataset.keyInfo;
        const color = key.dataset.keyColor;
        
        if (info) {
          this.showKeyPopup(info, color, e);
        }
      };
      
      key.addEventListener('click', key._clickHandler);
    });
  },
  
  /**
   * Show a small popup for prerequisite key info
   */
  showKeyPopup(info, color, event) {
    // Remove existing popup
    const existing = document.getElementById('key-popup');
    if (existing) existing.remove();
    
    // Parse the info string: "ClassName: Rank X requires Y skills at Z%"
    const parts = info.split(':');
    const className = parts[0].trim();
    const details = parts[1]?.trim() || '';
    
    // Determine header color based on key color
    const headerColors = {
      'gold': '#c9a227',
      'silver': '#808080',
      'blue': '#4a90e2'
    };
    const headerColor = headerColors[color] || headerColors.gold;
    
    // Create popup
    const popup = document.createElement('div');
    popup.id = 'key-popup';
    popup.className = 'key-popup';
    popup.innerHTML = `
      <div class="key-popup-header" style="background: ${headerColor};">
        <span>${className} (Class)</span>
        <button class="key-popup-close">&times;</button>
      </div>
      <div class="key-popup-content">
        <p class="key-popup-label">Prerequisite Skill</p>
        <p class="key-popup-details">${details}</p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Position near the clicked key
    const rect = event.target.closest('.prereq-key').getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    
    let left = rect.left + rect.width / 2 - popupRect.width / 2;
    let top = rect.bottom + 8;
    
    // Keep within viewport
    if (left < 10) left = 10;
    if (left + popupRect.width > window.innerWidth - 10) {
      left = window.innerWidth - popupRect.width - 10;
    }
    if (top + popupRect.height > window.innerHeight - 10) {
      top = rect.top - popupRect.height - 8;
    }
    
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
    
    // Close handlers
    const closeBtn = popup.querySelector('.key-popup-close');
    closeBtn.addEventListener('click', () => popup.remove());
    
    // Close when clicking outside
    setTimeout(() => {
      const outsideClickHandler = (e) => {
        if (!popup.contains(e.target) && !e.target.closest('.prereq-key')) {
          popup.remove();
          document.removeEventListener('click', outsideClickHandler);
        }
      };
      document.addEventListener('click', outsideClickHandler);
    }, 10);
    
    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        popup.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },
  
  /**
   * Update visibility of prereq label links based on whether classes are selected
   * Hide "Subclass 1 Prereq. Skill" if no secondary class
   * Hide "Subclass 2 Prereq. Skill" if no tertiary class
   */
  updatePrereqLabelVisibility(secondaryClass, tertiaryClass) {
    // Get the prereq row containers (the whole row with key icon + label)
    const secondaryLabel = document.getElementById('prereq-label-secondary');
    const tertiaryLabel = document.getElementById('prereq-label-tertiary');
    
    // Get parent prereq-row elements
    const secondaryRow = secondaryLabel?.closest('.prereq-row');
    const tertiaryRow = tertiaryLabel?.closest('.prereq-row');
    
    // Show/hide based on whether class is selected
    if (secondaryRow) {
      secondaryRow.style.display = secondaryClass ? '' : 'none';
    }
    if (tertiaryRow) {
      tertiaryRow.style.display = tertiaryClass ? '' : 'none';
    }
  },
  
  /**
   * Setup click handlers for prerequisite skill labels
   */
  setupPrereqLabelClicks() {
    const labels = document.querySelectorAll('.prereq-label.clickable');
    labels.forEach(label => {
      label.addEventListener('click', () => {
        const classSlot = label.dataset.classSlot;
        this.showPrereqStatus(classSlot);
      });
    });
  },
  
  /**
   * Show prerequisite skill status popup for a class slot
   */
  showPrereqStatus(classSlot) {
    if (!window.ClassRankData) return;
    
    // Get class name and rank for this slot
    const classInput = document.getElementById(`class-${classSlot}`);
    const rankInput = document.getElementById(`rank-${classSlot}`);
    
    const className = classInput?.value?.trim() || '';
    const currentRank = parseInt(rankInput?.value, 10) || 0;
    
    if (!className) {
      this.showPrereqModal('No Class Selected', '<p>No class selected for this slot.</p>');
      return;
    }
    
    // Get next rank requirement
    const req = window.ClassRankData.getNextRankRequirement(currentRank, classSlot);
    
    if (!req) {
      this.showPrereqModal(`${className} - Max Rank`, `<p>${className} is at maximum rank (Rank 5).</p>`);
      return;
    }
    
    // Get prereq skills for this class
    const prereqSkills = window.ClassRankData.getPrereqSkillsForClass(className);
    
    if (!prereqSkills || prereqSkills.length === 0) {
      this.showPrereqModal(`${className}`, `<p>No prerequisite skills defined for ${className}.</p>`);
      return;
    }
    
    // Collect current skill values from the character sheet
    const skillStatus = this.getPrereqSkillStatus(prereqSkills, req.percentRequired);
    
    // Build HTML content
    const slotName = classSlot === 'primary' ? 'Class' : 
                     classSlot === 'secondary' ? 'Subclass 1' : 'Subclass 2';
    
    const metCount = skillStatus.filter(s => s.met).length;
    const metSkills = skillStatus.filter(s => s.met);
    const unmetSkills = skillStatus.filter(s => !s.met);
    
    let html = `
      <div class="prereq-info">
        <p><strong>Current Rank:</strong> ${currentRank}</p>
        <p><strong>Next Rank:</strong> ${req.nextRank}</p>
        <p><strong>Requires:</strong> ${req.skillsNeeded} skills at ${req.percentRequired}%</p>
      </div>
      <div class="prereq-progress ${metCount >= req.skillsNeeded ? 'ready' : ''}">
        Progress: ${metCount}/${req.skillsNeeded} skills met
        ${metCount >= req.skillsNeeded ? ' ★ READY TO ADVANCE! ★' : ''}
      </div>
    `;
    
    if (metSkills.length > 0) {
      html += `<div class="prereq-section met">
        <h4>✓ Skills at ${req.percentRequired}%+</h4>
        <ul>`;
      metSkills.forEach(s => {
        html += `<li><span class="skill-name">${s.name}</span><span class="skill-value">${s.value}%</span></li>`;
      });
      html += `</ul></div>`;
    }
    
    if (unmetSkills.length > 0) {
      html += `<div class="prereq-section unmet">
        <h4>✗ Skills below ${req.percentRequired}%</h4>
        <ul>`;
      unmetSkills.forEach(s => {
        const needed = req.percentRequired - s.value;
        html += `<li><span class="skill-name">${s.name}</span><span class="skill-value">${s.value}% <span class="needed">(need +${needed}%)</span></span></li>`;
      });
      html += `</ul></div>`;
    }
    
    this.showPrereqModal(`${className} (${slotName})`, html);
  },
  
  /**
   * Show a modal dialog for prerequisite skill status
   */
  showPrereqModal(title, content) {
    // Remove existing modal if present
    const existing = document.getElementById('prereq-modal');
    if (existing) existing.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'prereq-modal';
    modal.className = 'prereq-modal-overlay';
    modal.innerHTML = `
      <div class="prereq-modal">
        <div class="prereq-modal-header">
          <h3>${title}</h3>
          <button class="prereq-modal-close">&times;</button>
        </div>
        <div class="prereq-modal-content">
          ${content}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close handlers
    const closeBtn = modal.querySelector('.prereq-modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    
    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },
  
  /**
   * Get current values of prerequisite skills
   */
  getPrereqSkillStatus(prereqSkills, requiredPercent) {
    const status = [];
    
    // Define which skills are standard skills (not professional)
    const standardSkillMap = {
      'athletics': 'athletics',
      'boating': 'boating',
      'brawn': 'brawn',
      'conceal': 'conceal',
      'customs': 'customs',
      'dance': 'dance',
      'deceit': 'deceit',
      'drive': 'drive',
      'endurance': 'endurance',
      'evade': 'evade',
      'first aid': 'first-aid',
      'influence': 'influence',
      'insight': 'insight',
      'locale': 'locale',
      'perception': 'perception',
      'ride': 'ride',
      'sing': 'sing',
      'stealth': 'stealth',
      'swim': 'swim',
      'unarmed': 'unarmed',
      'willpower': 'willpower'
    };
    
    prereqSkills.forEach(skillName => {
      const normalizedSkill = skillName.toLowerCase().trim();
      let skillValue = 0;
      let found = false;
      
      // 1. Check if it's a known standard skill FIRST
      const standardSkillId = standardSkillMap[normalizedSkill];
      if (standardSkillId) {
        // The -current input contains the TOTAL skill value, not points added
        const currentInput = document.getElementById(`${standardSkillId}-current`);
        skillValue = parseInt(currentInput?.value, 10) || 0;
        found = true;
      }
      
      // 2. Check if it's a known magic skill
      if (!found) {
        const magicSkillMap = {
          'channel': 'channel-percent',
          'piety': 'piety-percent',
          'arcane casting': 'arcane-casting-percent',
          'arcane knowledge': 'arcane-knowledge-percent',
          'arcane sorcery': 'arcane-sorcery-percent',
          'sorcerous wisdom': 'sorcerous-wisdom-percent',
          'musicianship': 'musicianship-percent',
          'lyrical magic': 'lyrical-magic-percent'
        };
        
        const inputId = magicSkillMap[normalizedSkill];
        if (inputId) {
          const input = document.getElementById(inputId);
          skillValue = parseInt(input?.value, 10) || 0;
          found = true;
        }
      }
      
      // 3. Check combat skill
      if (!found && normalizedSkill === 'combat skill') {
        const combatPercent = document.getElementById('combat-skill-1-percent');
        skillValue = parseInt(combatPercent?.value, 10) || 0;
        found = true;
      }
      
      // 4. Check professional skills for exact match
      if (!found) {
        for (let i = 0; i < 20; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          
          if (nameInput) {
            const name = nameInput.value?.trim().toLowerCase() || '';
            // Exact match only for professional skills
            if (name === normalizedSkill) {
              // Professional skill -current is the TOTAL
              skillValue = parseInt(currentInput?.value, 10) || 0;
              found = true;
              break;
            }
          }
        }
      }
      
      // 5. Check professional skills for partial match (e.g., "Lore" matching "Lore (History)")
      // Skills that can have specializations in parentheses
      const partialMatchSkills = ['lore', 'art', 'craft', 'musicianship'];
      if (!found && partialMatchSkills.includes(normalizedSkill)) {
        for (let i = 0; i < 20; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          
          if (nameInput) {
            const name = nameInput.value?.trim().toLowerCase() || '';
            // Check if the base name (before parenthesis) matches
            const baseName = name.split('(')[0].trim();
            if (baseName === normalizedSkill) {
              const total = parseInt(currentInput?.value, 10) || 0;
              // Take the highest value if multiple matches
              if (total > skillValue) {
                skillValue = total;
                found = true;
              }
            }
          }
        }
      }
      
      status.push({
        name: skillName,
        value: skillValue,
        met: skillValue >= requiredPercent
      });
    });
    
    // Sort: met skills first, then by value descending
    status.sort((a, b) => {
      if (a.met !== b.met) return b.met - a.met;
      return b.value - a.value;
    });
    
    return status;
  },
  
  /**
   * Update magic page and row visibility based on selected classes
   */
  updateMagicVisibility() {
    // Define which classes use which magic types
    const DIVINE_CLASSES = ['cleric', 'ranger', 'paladin', 'anti-paladin', 'druid'];
    const MAGE_CLASSES = ['mage'];
    const SORCERER_CLASSES = ['sorcerer'];
    const BARD_CLASSES = ['bard'];
    
    // Check if Syrin (Syrin cannot be Mages or Sorcerers)
    const species = document.getElementById('species')?.value?.trim().toLowerCase() || '';
    const isSyrin = species === 'syrin';
    
    // Get all selected classes (normalized to lowercase)
    const classes = [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c);
    
    // If no classes selected, show everything (default state) but respect Syrin restrictions
    if (classes.length === 0) {
      document.querySelectorAll('.magic-class-divine, .magic-class-bard').forEach(row => {
        row.style.display = '';
      });
      // Mage and Sorcerer rows hidden for Syrin
      document.querySelectorAll('.magic-class-mage, .magic-class-sorcerer').forEach(row => {
        row.style.display = isSyrin ? 'none' : '';
      });
      document.querySelectorAll('.tab-btn[data-page="magic1"], .tab-btn[data-page="magic2"]').forEach(tab => {
        tab.parentElement.style.display = '';
      });
      return;
    }
    
    // Check which magic types are needed
    const needsDivine = classes.some(c => DIVINE_CLASSES.includes(c));
    // Syrin cannot be Mages or Sorcerers
    const needsMage = !isSyrin && classes.some(c => MAGE_CLASSES.includes(c));
    const needsSorcerer = !isSyrin && classes.some(c => SORCERER_CLASSES.includes(c));
    const needsBard = classes.some(c => BARD_CLASSES.includes(c));
    
    // Check if any magic is needed
    const needsAnyMagic = needsDivine || needsMage || needsSorcerer || needsBard;
    
    // Show/hide magic skill rows
    const divineRows = document.querySelectorAll('.magic-class-divine');
    const mageRows = document.querySelectorAll('.magic-class-mage');
    const sorcererRows = document.querySelectorAll('.magic-class-sorcerer');
    const bardRows = document.querySelectorAll('.magic-class-bard');
    
    divineRows.forEach(row => row.style.display = needsDivine ? '' : 'none');
    mageRows.forEach(row => row.style.display = needsMage ? '' : 'none');
    sorcererRows.forEach(row => row.style.display = needsSorcerer ? '' : 'none');
    bardRows.forEach(row => row.style.display = needsBard ? '' : 'none');
    
    // Show/hide magic page tabs
    const magicTabs = document.querySelectorAll('.tab-btn[data-page="magic1"], .tab-btn[data-page="magic2"]');
    magicTabs.forEach(tab => {
      tab.parentElement.style.display = needsAnyMagic ? '' : 'none';
    });
    
    // If currently on a magic page and no magic is needed, switch to main page
    if (!needsAnyMagic) {
      const activePage = document.querySelector('.sheet-page.active');
      if (activePage && (activePage.id === 'page-magic1' || activePage.id === 'page-magic2')) {
        // Switch to main page
        document.querySelectorAll('.sheet-page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.getElementById('page-main')?.classList.add('active');
        document.querySelector('.tab-btn[data-page="main"]')?.classList.add('active');
      }
    }
  },
  
  /**
   * Update spell memorization limits based on class, rank, and INT
   */
  updateSpellMemorization() {
    if (!window.ClassRankData) return;
    
    // Get INT value
    const intInput = document.getElementById('int-value');
    const intValue = parseInt(intInput?.value, 10) || 0;
    
    // Get all classes and ranks
    const classes = [
      {
        className: document.getElementById('class-primary')?.value?.trim() || '',
        classRank: parseInt(document.getElementById('rank-primary')?.value, 10) || 0
      },
      {
        className: document.getElementById('class-secondary')?.value?.trim() || '',
        classRank: parseInt(document.getElementById('rank-secondary')?.value, 10) || 0
      },
      {
        className: document.getElementById('class-tertiary')?.value?.trim() || '',
        classRank: parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0
      }
    ].filter(c => c.className);
    
    // Get combined spell memorization
    const spellLimits = window.ClassRankData.getCombinedSpellMemorization(classes, intValue);
    
    // Update the "May Memorize X Spells" inputs
    const spellRankMapping = {
      'cantrips': 'cantrips-max',
      'rank1': 'rank1-max',
      'rank2': 'rank2-max',
      'rank3': 'rank3-max',
      'rank4': 'rank4-max',
      'rank5': 'rank5-max'
    };
    
    for (const [spellRank, inputId] of Object.entries(spellRankMapping)) {
      const input = document.getElementById(inputId);
      if (input) {
        const limit = spellLimits[spellRank];
        if (limit !== undefined) {
          input.value = limit;
        } else {
          input.value = 0;
        }
      }
    }
    
    // Hide/show spell columns based on memorization values
    this.updateSpellColumnVisibility();
    
    // Hide/show Ranks 3-5 tab based on whether any rank 3-5 spells are available
    this.updateMagic2TabVisibility();
    
    // Update prereq keys on magic skills
    this.updateMagicPrereqKeys();
  },
  
  /**
   * Hide spell columns that have 0 memorization
   */
  updateSpellColumnVisibility() {
    const columnMapping = {
      'cantrips': '.spell-column.cantrips',
      'rank1': '.spell-column.rank1',
      'rank2': '.spell-column.rank2',
      'rank3': '.spell-column.rank3',
      'rank4': '.spell-column.rank4',
      'rank5': '.spell-column.rank5'
    };
    
    for (const [rank, selector] of Object.entries(columnMapping)) {
      const maxInput = document.getElementById(`${rank}-max`);
      const column = document.querySelector(selector);
      if (maxInput && column) {
        const maxVal = parseInt(maxInput.value, 10) || 0;
        if (maxVal === 0) {
          column.style.display = 'none';
        } else {
          column.style.display = '';
        }
      }
    }
  },
  
  /**
   * Hide Ranks 3-5 Spells tab if all rank 3, 4, 5 memorization is 0
   */
  updateMagic2TabVisibility() {
    const rank3Max = parseInt(document.getElementById('rank3-max')?.value, 10) || 0;
    const rank4Max = parseInt(document.getElementById('rank4-max')?.value, 10) || 0;
    const rank5Max = parseInt(document.getElementById('rank5-max')?.value, 10) || 0;
    
    const magic2Tab = document.querySelector('.tab-btn[data-page="magic2"]');
    if (magic2Tab) {
      if (rank3Max === 0 && rank4Max === 0 && rank5Max === 0) {
        magic2Tab.style.display = 'none';
        // If currently on magic2 page, switch to magic1
        if (magic2Tab.classList.contains('active')) {
          const magic1Tab = document.querySelector('.tab-btn[data-page="magic1"]');
          if (magic1Tab) {
            magic1Tab.click();
          }
        }
      } else {
        magic2Tab.style.display = '';
      }
    }
  },
  
  /**
   * Update prereq keys on magic casting and knowledge skills
   */
  updateMagicPrereqKeys() {
    if (!window.ClassRankData) return;
    
    // Get current classes and ranks
    const primaryClass = document.getElementById('class-primary')?.value?.trim() || '';
    const secondaryClass = document.getElementById('class-secondary')?.value?.trim() || '';
    const tertiaryClass = document.getElementById('class-tertiary')?.value?.trim() || '';
    
    const primaryRank = parseInt(document.getElementById('rank-primary')?.value, 10) || 0;
    const secondaryRank = parseInt(document.getElementById('rank-secondary')?.value, 10) || 0;
    const tertiaryRank = parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0;
    
    // Get rank requirements for each class slot
    const primaryReq = primaryClass ? window.ClassRankData.getNextRankRequirement(primaryRank, 'primary') : null;
    const secondaryReq = secondaryClass ? window.ClassRankData.getNextRankRequirement(secondaryRank, 'secondary') : null;
    const tertiaryReq = tertiaryClass ? window.ClassRankData.getNextRankRequirement(tertiaryRank, 'tertiary') : null;
    
    // Mapping of magic skill to classes that use it (both casting and knowledge skills)
    const skillClassMapping = {
      'channel': ['cleric', 'druid', 'paladin', 'ranger', 'anti-paladin'],
      'piety': ['cleric', 'druid', 'paladin', 'ranger', 'anti-paladin'],
      'arcane-casting': ['mage', 'magic-user'],
      'arcane-knowledge': ['mage', 'magic-user'],
      'arcane-sorcery': ['sorcerer'],
      'sorcerous-wisdom': ['sorcerer'],
      'musicianship': ['bard'],
      'lyrical-magic': ['bard']
    };
    
    // Clear all prereq key slots first
    document.querySelectorAll('.prereq-key-slot').forEach(slot => {
      slot.innerHTML = '';
    });
    
    // Helper to get tooltip for a class
    const getTooltip = (className, rank, req, keyColor) => {
      const colorName = keyColor === 'gold' ? 'Gold' : (keyColor === 'silver' ? 'Silver' : 'Blue');
      if (req) {
        return `${className}: Rank ${req.nextRank} requires ${req.percentRequired}% (${colorName})`;
      } else {
        return `${className}: Max Rank (${colorName})`;
      }
    };
    
    // Process each class
    const classData = [
      { className: primaryClass, rank: primaryRank, req: primaryReq, keyColor: 'gold' },
      { className: secondaryClass, rank: secondaryRank, req: secondaryReq, keyColor: 'silver' },
      { className: tertiaryClass, rank: tertiaryRank, req: tertiaryReq, keyColor: 'blue' }
    ];
    
    classData.forEach(({ className, rank, req, keyColor }) => {
      if (!className) return;
      
      const normalized = window.ClassRankData.normalizeClassName(className);
      
      for (const [skill, classesForSkill] of Object.entries(skillClassMapping)) {
        if (classesForSkill.includes(normalized)) {
          const tooltip = getTooltip(className, rank, req, keyColor);
          
          // Add to both page 1 and page 2
          document.querySelectorAll(`.prereq-key-slot[data-skill="${skill}"]`).forEach(slot => {
            slot.innerHTML += this.getPrereqKeySvg(keyColor, tooltip);
          });
        }
      }
    });
    
    // Set up click handlers for the dynamically added keys
    this.setupPrereqKeyClicks();
  },
  
  /**
   * Update class spell lists when class or rank changes
   * Auto-populates spells for classes like Cleric, Druid, Paladin, Ranger based on their rank
   */
  updateClassSpells(previousClasses = null) {
    if (!window.ClassSpellLists) return;
    
    // Get current classes and ranks
    const currentClasses = [
      {
        name: document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-primary')?.value, 10) || 0
      },
      {
        name: document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-secondary')?.value, 10) || 0
      },
      {
        name: document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0
      }
    ].filter(c => c.name);
    
    // Use ClassSpellLists to determine which classes grant spells
    const activeSpellClasses = currentClasses.filter(c => 
      window.ClassSpellLists.isSpellGrantingClass(c.name)
    );
    
    // Check if previous classes had any spell-granting classes that are now gone
    const previousSpellClasses = previousClasses ? 
      previousClasses.filter(c => window.ClassSpellLists.isSpellGrantingClass(c.name)) : [];
    
    // Classes that were removed
    const removedClasses = previousSpellClasses.filter(prev => 
      !activeSpellClasses.some(curr => curr.name === prev.name)
    );
    
    // Remove spells for classes that are no longer present
    removedClasses.forEach(removedClass => {
      this.removeClassSpells(removedClass.name);
    });
    
    // Add/update spells for active spell-granting classes
    activeSpellClasses.forEach(activeClass => {
      this.populateClassSpells(activeClass.name, activeClass.rank);
    });
  },
  
  /**
   * Populate spells for a specific class up to the given rank
   */
  populateClassSpells(className, maxRank) {
    if (!window.ClassSpellLists || !window.SpellData) return;
    
    const classSpells = window.ClassSpellLists.getSpellsForClassAndRank(className, maxRank);
    if (!classSpells) {
      console.log('No class spells found for', className, 'maxRank', maxRank);
      return;
    }
    
    const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    
    rankKeys.forEach(rankKey => {
      const spellsForRank = classSpells[rankKey];
      if (!spellsForRank || spellsForRank.length === 0) return;
      
      // Get current spells in this rank (to avoid duplicates)
      const existingSpells = this.getExistingSpellsInRank(rankKey);
      
      // Find available slots and add spells - reset slot index for each rank
      let slotIndex = 0;
      spellsForRank.forEach(spellName => {
        // Skip if spell already exists in this rank
        if (existingSpells.some(s => s.toLowerCase() === spellName.toLowerCase())) {
          return;
        }
        
        // Find next empty slot
        while (slotIndex < SPELL_SLOTS_PER_RANK) {
          const nameInput = document.getElementById(`${rankKey}-${slotIndex}-name`);
          if (nameInput && !nameInput.value.trim()) {
            // Found empty slot - add the spell with proper title case
            nameInput.value = this.toTitleCase(spellName);
            
            // Mark as class spell for later removal
            nameInput.dataset.classSpell = className;
            
            // Auto-fill cost
            const cost = window.SpellData.getSpellCost(spellName);
            const costInput = document.getElementById(`${rankKey}-${slotIndex}-cost`);
            if (costInput && cost) {
              costInput.value = cost;
            }
            
            // Set tooltip
            const description = window.SpellData.getSpellDescription(spellName);
            if (description) {
              nameInput.title = description;
            }
            
            slotIndex++;
            break;
          }
          slotIndex++;
        }
      });
    });
    
    this.scheduleAutoSave();
  },
  
  /**
   * Remove all spells granted by a specific class
   */
  removeClassSpells(className) {
    const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    
    rankKeys.forEach(rankKey => {
      for (let i = 0; i < 60; i++) {
        const nameInput = document.getElementById(`${rankKey}-${i}-name`);
        if (nameInput && nameInput.dataset.classSpell === className) {
          // Clear this spell
          nameInput.value = '';
          nameInput.title = '';
          delete nameInput.dataset.classSpell;
          
          // Clear cost too
          const costInput = document.getElementById(`${rankKey}-${i}-cost`);
          if (costInput) {
            costInput.value = '';
          }
          
          // Clear memorized checkbox
          const memCheck = document.getElementById(`${rankKey}-${i}-mem`);
          if (memCheck) {
            memCheck.checked = false;
          }
        }
      }
    });
    
    this.scheduleAutoSave();
  },
  
  /**
   * Get list of existing spells in a rank
   */
  getExistingSpellsInRank(rankKey) {
    const spells = [];
    for (let i = 0; i < 60; i++) {
      const nameInput = document.getElementById(`${rankKey}-${i}-name`);
      if (nameInput && nameInput.value.trim()) {
        spells.push(nameInput.value.trim());
      }
    }
    return spells;
  },
  
  /**
   * Alphabetize all spells across all ranks
   */
  alphabetizeAllSpells() {
    const rankKeys = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    
    rankKeys.forEach(rankKey => {
      this.alphabetizeSpellsInRank(rankKey);
    });
    
    this.scheduleAutoSave();
  },
  
  /**
   * Alphabetize spells within a single rank
   */
  alphabetizeSpellsInRank(rankKey) {
    // Collect all spell data from this rank
    const spells = [];
    for (let i = 0; i < SPELL_SLOTS_PER_RANK; i++) {
      const nameInput = document.getElementById(`${rankKey}-${i}-name`);
      const costInput = document.getElementById(`${rankKey}-${i}-cost`);
      const memCheck = document.getElementById(`${rankKey}-${i}-mem`);
      
      if (nameInput && nameInput.value.trim()) {
        spells.push({
          name: nameInput.value.trim(),
          cost: costInput ? costInput.value : '',
          memorized: memCheck ? memCheck.checked : false,
          classSpell: nameInput.dataset.classSpell || null,
          title: nameInput.title || ''
        });
      }
    }
    
    // Sort alphabetically by name (case-insensitive)
    spells.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    
    // Clear all slots first
    for (let i = 0; i < SPELL_SLOTS_PER_RANK; i++) {
      const nameInput = document.getElementById(`${rankKey}-${i}-name`);
      const costInput = document.getElementById(`${rankKey}-${i}-cost`);
      const memCheck = document.getElementById(`${rankKey}-${i}-mem`);
      
      if (nameInput) {
        nameInput.value = '';
        nameInput.title = '';
        delete nameInput.dataset.classSpell;
      }
      if (costInput) costInput.value = '';
      if (memCheck) memCheck.checked = false;
    }
    
    // Repopulate in sorted order
    spells.forEach((spell, i) => {
      const nameInput = document.getElementById(`${rankKey}-${i}-name`);
      const costInput = document.getElementById(`${rankKey}-${i}-cost`);
      const memCheck = document.getElementById(`${rankKey}-${i}-mem`);
      
      if (nameInput) {
        nameInput.value = spell.name;
        nameInput.title = spell.title;
        if (spell.classSpell) {
          nameInput.dataset.classSpell = spell.classSpell;
        }
      }
      if (costInput) costInput.value = spell.cost;
      if (memCheck) memCheck.checked = spell.memorized;
    });
  },
  
  // ==================== CLASS ABILITIES AUTO-POPULATION ====================
  
  /**
   * Update class abilities when class or rank changes
   * Auto-populates special abilities based on class and rank
   */
  updateClassAbilities(previousClasses = null) {
    if (!window.ClassAbilities) return;
    
    // Get current classes and ranks
    const currentClasses = [
      {
        name: document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-primary')?.value, 10) || 0
      },
      {
        name: document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-secondary')?.value, 10) || 0
      },
      {
        name: document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || '',
        rank: parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0
      }
    ].filter(c => c.name && c.rank > 0);
    
    // Get classes that grant abilities
    const activeAbilityClasses = currentClasses.filter(c => 
      window.ClassAbilities.isAbilityGrantingClass(c.name)
    );
    
    // Check previous classes
    const previousAbilityClasses = previousClasses ? 
      previousClasses.filter(c => window.ClassAbilities.isAbilityGrantingClass(c.name)) : [];
    
    // Classes that were removed
    const removedClasses = previousAbilityClasses.filter(prev => 
      !activeAbilityClasses.some(curr => curr.name === prev.name)
    );
    
    // Remove abilities for classes that are no longer present
    removedClasses.forEach(removedClass => {
      this.removeClassAbilities(removedClass.name);
    });
    
    // Add/update abilities for active classes
    activeAbilityClasses.forEach(activeClass => {
      this.populateClassAbilities(activeClass.name, activeClass.rank);
    });
  },
  
  /**
   * Populate abilities for a specific class up to the given rank
   */
  populateClassAbilities(className, rank) {
    if (!window.ClassAbilities) return;
    
    const abilities = window.ClassAbilities.getAbilitiesForClassAndRank(className, rank);
    if (!abilities || abilities.length === 0) return;
    
    // Get existing abilities
    const existingAbilities = this.getAllSpecialAbilities();
    
    // Add each ability if not already present
    abilities.forEach(ability => {
      const normalizedAbility = ability.toLowerCase().trim();
      const alreadyExists = existingAbilities.some(
        existing => existing.toLowerCase().trim() === normalizedAbility
      );
      
      if (!alreadyExists) {
        this.addSpecialAbility(ability, className);
      }
    });
    
    // Handle special actions
    this.handleClassSpecialActions(className, rank);
    
    this.updateAllAbilityTooltips();
    this.scheduleAutoSave();
  },
  
  /**
   * Handle special class actions (Druid language, Monk unarmed, Sorcerer familiar)
   * Only triggers special actions if the corresponding class abilities have been acquired
   */
  handleClassSpecialActions(className, rank) {
    if (!window.ClassAbilities) return;
    
    const classKey = className.toLowerCase().trim();
    
    // Get current abilities on the sheet
    const existingAbilities = this.getAllSpecialAbilities().map(a => a.toLowerCase().trim());
    
    // Check all ranks up to current for special actions
    for (let r = 1; r <= rank; r++) {
      const actions = window.ClassAbilities.getSpecialActions(className, r);
      if (!actions) continue;
      
      // Add language (Druid/Rogue) - only if user has at least one rank 1 ability from that class
      if (actions.addLanguage) {
        const classRank1Abilities = window.ClassAbilities.getAbilitiesForClassAndRank(className, 1) || [];
        const hasAnyRank1Ability = classRank1Abilities.some(ability => 
          existingAbilities.includes(ability.toLowerCase().trim())
        );
        
        if (hasAnyRank1Ability) {
          this.addLanguageIfNotExists(actions.addLanguage);
        }
      }
      
      // Add/update Unarmed weapon (Monk) - only if user has Unarmed Proficiency
      if (actions.addUnarmed) {
        if (existingAbilities.includes('unarmed proficiency')) {
          this.addOrUpdateUnarmedWeapon(actions.addUnarmed);
        }
      }
      if (actions.changeUnarmedDamage) {
        if (existingAbilities.includes('unarmed proficiency')) {
          this.updateUnarmedDamage(actions.changeUnarmedDamage);
        }
      }
      
      // Add spell (Sorcerer Familiar) - always add if class is Sorcerer at rank 1+
      if (actions.addSpell) {
        this.addSpellIfNotExists(actions.addSpell.rank, actions.addSpell.spell);
      }
    }
  },
  
  /**
   * Add a language to the first empty language slot
   * Also adds "Language (X)" to Special Abilities for class-granted languages
   */
  addLanguageIfNotExists(languageName, sourceClass = null) {
    // Normalize apostrophes for comparison
    const normalizeApostrophes = (str) => str.replace(/[']/g, "'");
    const normalizedLangName = normalizeApostrophes(languageName.toLowerCase().trim());
    
    // Check native tongue first
    const nativeName = document.getElementById('native-tongue-name');
    if (nativeName) {
      const normalizedNative = normalizeApostrophes(nativeName.value.toLowerCase().trim());
      if (normalizedNative === normalizedLangName) {
        return; // Already exists as native tongue
      }
    }
    
    // Check if language already exists in additional languages (2-7)
    for (let i = 2; i <= 7; i++) {
      const nameInput = document.getElementById(`language-${i}-name`);
      if (nameInput) {
        const normalizedExisting = normalizeApostrophes(nameInput.value.toLowerCase().trim());
        if (normalizedExisting === normalizedLangName) {
          return; // Already exists
        }
      }
    }
    
    // Calculate current value (INT+CHA+40 for class-granted languages)
    const intVal = parseInt(document.getElementById('int-value')?.value, 10) || 0;
    const chaVal = parseInt(document.getElementById('cha-value')?.value, 10) || 0;
    const currentValue = intVal + chaVal + 40;
    
    // Determine source class for tracking
    let classSource = sourceClass;
    if (!classSource) {
      // Infer from language name
      if (languageName.toLowerCase().includes('druid')) {
        classSource = 'druid';
      } else if (languageName.toLowerCase().includes('thie')) {
        classSource = 'rogue';
      }
    }
    
    // Find first empty slot (starting at 2)
    for (let i = 2; i <= 7; i++) {
      const nameInput = document.getElementById(`language-${i}-name`);
      const currentInput = document.getElementById(`language-${i}-current`);
      
      if (nameInput && !nameInput.value.trim()) {
        nameInput.value = languageName;
        if (classSource) {
          nameInput.dataset.classLanguage = classSource.toLowerCase();
        }
        
        // Set the current value to INT+CHA+40
        if (currentInput) {
          currentInput.value = currentValue;
        }
        
        // Also add to Special Abilities as "Language (X)"
        const abilityName = `Language (${languageName})`;
        this.addAbilityToSheet(abilityName);
        
        this.scheduleAutoSave();
        return;
      }
    }
    
    // No empty slots - could potentially add a new row here
    console.warn(`No empty language slots to add ${languageName}`);
  },
  
  /**
   * Add or update Unarmed weapon for Monk
   */
  addOrUpdateUnarmedWeapon(damage) {
    // Find first melee weapon slot or existing Unarmed
    for (let i = 1; i <= 5; i++) {
      const nameInput = document.getElementById(`melee-${i}-name`);
      if (!nameInput) continue;
      
      if (nameInput.value.toLowerCase().trim() === 'unarmed') {
        // Update existing damage
        const damageInput = document.getElementById(`melee-${i}-damage`);
        if (damageInput) {
          damageInput.value = damage + '+DM';
          damageInput.dataset.monkDamage = 'true';
        }
        return;
      }
    }
    
    // Not found, add to first empty slot
    for (let i = 1; i <= 5; i++) {
      const nameInput = document.getElementById(`melee-${i}-name`);
      if (!nameInput) continue;
      
      if (!nameInput.value.trim()) {
        nameInput.value = 'Unarmed';
        nameInput.dataset.classWeapon = 'monk';
        
        const damageInput = document.getElementById(`melee-${i}-damage`);
        if (damageInput) {
          damageInput.value = damage + '+DM';
          damageInput.dataset.monkDamage = 'true';
        }
        
        // Set size to S
        const sizeInput = document.getElementById(`melee-${i}-size`);
        if (sizeInput) sizeInput.value = 'S';
        
        // Set reach to T (touch)
        const reachInput = document.getElementById(`melee-${i}-reach`);
        if (reachInput) reachInput.value = 'T';
        
        return;
      }
    }
  },
  
  /**
   * Update Unarmed weapon damage (Monk rank progression)
   */
  updateUnarmedDamage(damage) {
    for (let i = 1; i <= 5; i++) {
      const nameInput = document.getElementById(`melee-${i}-name`);
      if (!nameInput) continue;
      
      if (nameInput.value.toLowerCase().trim() === 'unarmed') {
        const damageInput = document.getElementById(`melee-${i}-damage`);
        if (damageInput) {
          damageInput.value = damage + '+DM';
        }
        return;
      }
    }
  },
  
  /**
   * Add a spell if it doesn't already exist
   */
  addSpellIfNotExists(rankKey, spellName) {
    // Check if spell already exists in this rank
    const existingSpells = this.getExistingSpellsInRank(rankKey);
    const normalizedSpell = spellName.toLowerCase().trim();
    
    if (existingSpells.some(s => s.toLowerCase().trim() === normalizedSpell)) {
      return; // Already exists
    }
    
    // Find first empty slot
    for (let i = 0; i < 60; i++) {
      const nameInput = document.getElementById(`${rankKey}-${i}-name`);
      if (nameInput && !nameInput.value.trim()) {
        nameInput.value = this.toTitleCase(spellName);
        nameInput.dataset.classSpell = 'sorcerer';
        
        // Set tooltip and cost
        if (window.SpellData) {
          const desc = window.SpellData.getSpellDescription(spellName);
          if (desc) nameInput.title = desc;
          
          const cost = window.SpellData.getSpellCost(spellName);
          const costInput = document.getElementById(`${rankKey}-${i}-cost`);
          if (costInput && cost) costInput.value = cost;
        }
        
        return;
      }
    }
  },
  
  /**
   * Remove abilities granted by a class (both auto-granted and purchased ranked abilities)
   */
  removeClassAbilities(className) {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    // Get auto-granted class abilities
    const classAbilities = window.ClassAbilities ? 
      (window.ClassAbilities.getAllAbilitiesForClass(className) || []) : [];
    
    // Get ranked purchasable abilities for this class
    const rankedAbilities = window.RANKED_CLASS_ABILITIES && window.RANKED_CLASS_ABILITIES[className.toLowerCase()] ?
      window.RANKED_CLASS_ABILITIES[className.toLowerCase()].map(a => a.name) : [];
    
    // Combine both lists
    const allClassAbilities = [...classAbilities, ...rankedAbilities];
    if (allClassAbilities.length === 0) return;
    
    // Normalize for comparison
    const normalizedClassAbilities = allClassAbilities.map(a => a.toLowerCase().trim());
    
    // Track abilities that were actually removed
    const removedAbilities = [];
    
    // Check each ability input in the dynamic list
    const inputs = container.querySelectorAll('.class-ability-input');
    inputs.forEach(input => {
      if (!input.value.trim()) return;
      
      const ability = input.value.toLowerCase().trim();
      // Also check without parenthetical suffixes (e.g., "Language (Thieves' Cant)" -> "language (thieves' cant)")
      const abilityBase = ability;
      
      // Check if this ability belongs to the removed class
      if (normalizedClassAbilities.some(ca => abilityBase.startsWith(ca.toLowerCase()) || ca.toLowerCase() === abilityBase)) {
        // Check if another class also grants this ability
        const otherClassesGrant = this.abilityGrantedByOtherClass(ability, className) || 
                                  this.rankedAbilityGrantedByOtherClass(ability, className);
        
        if (!otherClassesGrant) {
          removedAbilities.push(input.value.trim()); // Store original case
          input.value = '';
          input.title = 'Enter a Special Ability name';
          input.classList.remove('duplicate-warning');
          delete input.dataset.classAbility;
          
          // Hide info button
          const infoBtn = input.parentElement?.querySelector('.class-ability-info-btn');
          if (infoBtn) infoBtn.style.display = 'none';
        }
      }
    });
    
    // Also remove from acquiredAbilities tracking
    if (this.character.acquiredAbilities && removedAbilities.length > 0) {
      this.character.acquiredAbilities = this.character.acquiredAbilities.filter(a => {
        const normalizedAcquired = a.toLowerCase().trim();
        return !removedAbilities.some(r => r.toLowerCase().trim() === normalizedAcquired);
      });
    }
    
    // Also remove any ranked abilities from acquiredAbilities that belong to this class
    // (even if they weren't on the sheet)
    if (this.character.acquiredAbilities) {
      const rankedAbilitiesLower = rankedAbilities.map(a => a.toLowerCase().trim());
      this.character.acquiredAbilities = this.character.acquiredAbilities.filter(a => {
        const normalizedAcquired = a.toLowerCase().trim();
        // Check if this is a ranked ability for the removed class
        const isRankedForClass = rankedAbilitiesLower.some(ra => 
          normalizedAcquired === ra || normalizedAcquired.startsWith(ra.split('(')[0].trim())
        );
        if (isRankedForClass) {
          // Check if another class also has this ranked ability
          return this.rankedAbilityGrantedByOtherClass(a, className);
        }
        return true;
      });
    }
    
    // Handle removal of special class features
    this.removeClassSpecialFeatures(className);
    
    this.scheduleAutoSave();
  },
  
  /**
   * Check if a ranked ability is available from another active class
   */
  rankedAbilityGrantedByOtherClass(abilityName, excludeClass) {
    if (!window.RANKED_CLASS_ABILITIES) return false;
    
    const currentClasses = [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c && c !== excludeClass.toLowerCase());
    
    const normalizedAbility = abilityName.toLowerCase().trim();
    
    for (const cls of currentClasses) {
      const rankedAbilities = window.RANKED_CLASS_ABILITIES[cls];
      if (rankedAbilities) {
        if (rankedAbilities.some(a => {
          const abilityLower = a.name.toLowerCase().trim();
          return normalizedAbility === abilityLower || 
                 normalizedAbility.startsWith(abilityLower.split('(')[0].trim());
        })) {
          return true;
        }
      }
    }
    
    return false;
  },
  
  /**
   * Check if an ability is granted by another active class
   */
  abilityGrantedByOtherClass(abilityName, excludeClass) {
    if (!window.ClassAbilities) return false;
    
    const currentClasses = [
      { name: document.getElementById('class-primary')?.value?.trim().toLowerCase() || '', 
        rank: parseInt(document.getElementById('rank-primary')?.value, 10) || 0 },
      { name: document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '', 
        rank: parseInt(document.getElementById('rank-secondary')?.value, 10) || 0 },
      { name: document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || '', 
        rank: parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0 }
    ].filter(c => c.name && c.rank > 0 && c.name !== excludeClass.toLowerCase());
    
    const normalizedAbility = abilityName.toLowerCase().trim();
    
    for (const cls of currentClasses) {
      const abilities = window.ClassAbilities.getAbilitiesForClassAndRank(cls.name, cls.rank);
      if (abilities.some(a => a.toLowerCase().trim() === normalizedAbility)) {
        return true;
      }
    }
    
    return false;
  },
  
  /**
   * Remove special class features when class is dropped
   */
  removeClassSpecialFeatures(className) {
    const classKey = className.toLowerCase().trim();
    
    // Track removed language abilities for acquiredAbilities cleanup
    const removedLanguageAbilities = [];
    
    // Remove Druid's Cant language
    if (classKey === 'druid') {
      for (let i = 2; i <= 7; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        const currentInput = document.getElementById(`language-${i}-current`);
        if (nameInput) {
          // Normalize apostrophes for comparison
          const langName = nameInput.value.toLowerCase().trim().replace(/[']/g, "'");
          // Check by dataset OR by language name
          if (nameInput.dataset.classLanguage === 'druid' || 
              langName === "druids' cant" || langName === "druid's cant") {
            removedLanguageAbilities.push("Language (Druids' Cant)");
            removedLanguageAbilities.push("Language (Druids' Cant)");
            nameInput.value = '';
            if (currentInput) currentInput.value = '';
            delete nameInput.dataset.classLanguage;
          }
        }
      }
    }
    
    // Remove Thieves' Cant language
    if (classKey === 'rogue') {
      for (let i = 2; i <= 7; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        const currentInput = document.getElementById(`language-${i}-current`);
        if (nameInput) {
          // Normalize apostrophes for comparison
          const langName = nameInput.value.toLowerCase().trim().replace(/[']/g, "'");
          // Check by dataset OR by language name
          if (nameInput.dataset.classLanguage === 'rogue' || 
              langName === "thieves' cant" || langName === "thief's cant") {
            removedLanguageAbilities.push("Language (Thieves' Cant)");
            removedLanguageAbilities.push("Language (Thieves' Cant)");
            nameInput.value = '';
            if (currentInput) currentInput.value = '';
            delete nameInput.dataset.classLanguage;
          }
        }
      }
    }
    
    // Bards can also have Druids' Cant or Thieves' Cant from ranked abilities
    if (classKey === 'bard') {
      // Always remove these from acquiredAbilities for Bards, regardless of Languages section state
      removedLanguageAbilities.push("Language (Druids' Cant)");
      removedLanguageAbilities.push("Language (Thieves' Cant)");
      // Also add variants with straight apostrophes
      removedLanguageAbilities.push("Language (Druids' Cant)");
      removedLanguageAbilities.push("Language (Thieves' Cant)");
      
      for (let i = 2; i <= 7; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        const currentInput = document.getElementById(`language-${i}-current`);
        if (nameInput) {
          // Normalize apostrophes for comparison (both curly ' and straight ')
          const langName = nameInput.value.toLowerCase().trim().replace(/[']/g, "'");
          // Check by dataset OR by language name for bard languages
          const isBardLanguage = nameInput.dataset.classLanguage === 'bard' ||
            langName === "druids' cant" || langName === "druid's cant" ||
            langName === "thieves' cant" || langName === "thief's cant";
          
          if (isBardLanguage) {
            nameInput.value = '';
            if (currentInput) currentInput.value = '';
            delete nameInput.dataset.classLanguage;
          }
        }
      }
    }
    
    // Remove from acquiredAbilities tracking
    if (this.character.acquiredAbilities && removedLanguageAbilities.length > 0) {
      this.character.acquiredAbilities = this.character.acquiredAbilities.filter(a => {
        // Normalize apostrophes for comparison
        const normalizedA = a.toLowerCase().trim().replace(/[']/g, "'");
        return !removedLanguageAbilities.some(r => {
          const normalizedR = r.toLowerCase().trim().replace(/[']/g, "'");
          return normalizedR === normalizedA;
        });
      });
    }
    
    // Also remove Language abilities from Special Abilities section
    if (removedLanguageAbilities.length > 0) {
      this.removeLanguageAbilitiesFromSheet(removedLanguageAbilities);
    }
    
    // Remove Monk's Unarmed weapon
    if (classKey === 'monk') {
      for (let i = 1; i <= 5; i++) {
        const nameInput = document.getElementById(`melee-${i}-name`);
        if (nameInput && nameInput.dataset.classWeapon === 'monk') {
          nameInput.value = '';
          delete nameInput.dataset.classWeapon;
          
          const damageInput = document.getElementById(`melee-${i}-damage`);
          if (damageInput) {
            damageInput.value = '';
            delete damageInput.dataset.monkDamage;
          }
          
          const sizeInput = document.getElementById(`melee-${i}-size`);
          if (sizeInput) sizeInput.value = '';
          
          const reachInput = document.getElementById(`melee-${i}-reach`);
          if (reachInput) reachInput.value = '';
        }
      }
    }
    
    // Remove Sorcerer's Familiar spell
    if (classKey === 'sorcerer') {
      for (let i = 0; i < 60; i++) {
        const nameInput = document.getElementById(`rank1-${i}-name`);
        if (nameInput && nameInput.value.toLowerCase().trim() === 'familiar' && 
            nameInput.dataset.classSpell === 'sorcerer') {
          nameInput.value = '';
          nameInput.title = '';
          delete nameInput.dataset.classSpell;
          
          const costInput = document.getElementById(`rank1-${i}-cost`);
          if (costInput) costInput.value = '';
        }
      }
    }
  },
  
  /**
   * Clean up orphaned class features (Cants without abilities, etc.)
   * Called on init to fix corrupted data
   */
  cleanupOrphanedClassFeatures() {
    if (!window.ClassAbilities) return;
    
    const existingAbilities = this.getAllSpecialAbilities().map(a => a.toLowerCase().trim());
    
    // Check for Druids' Cant without Druid abilities
    const druidRank1 = (window.ClassAbilities.getAbilitiesForClassAndRank('druid', 1) || [])
      .map(a => a.toLowerCase().trim());
    const hasDruidAbilities = druidRank1.some(ability => existingAbilities.includes(ability));
    
    if (!hasDruidAbilities) {
      // Remove orphaned Druids' Cant
      for (let i = 2; i <= 7; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        const currentInput = document.getElementById(`language-${i}-current`);
        if (nameInput) {
          // Normalize apostrophes for comparison
          const langName = nameInput.value.toLowerCase().trim().replace(/[']/g, "'");
          if (langName === "druids' cant" || langName === "druid's cant") {
            nameInput.value = '';
            if (currentInput) currentInput.value = '';
            delete nameInput.dataset.classLanguage;
          }
        }
      }
    }
    
    // Check for Thieves' Cant without Rogue abilities
    const rogueRank1 = (window.ClassAbilities.getAbilitiesForClassAndRank('rogue', 1) || [])
      .map(a => a.toLowerCase().trim());
    const hasRogueAbilities = rogueRank1.some(ability => existingAbilities.includes(ability));
    
    if (!hasRogueAbilities) {
      // Remove orphaned Thieves' Cant
      for (let i = 2; i <= 7; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        const currentInput = document.getElementById(`language-${i}-current`);
        if (nameInput) {
          // Normalize apostrophes for comparison
          const langName = nameInput.value.toLowerCase().trim().replace(/[']/g, "'");
          if (langName === "thieves' cant" || langName === "thief's cant") {
            nameInput.value = '';
            if (currentInput) currentInput.value = '';
            delete nameInput.dataset.classLanguage;
          }
        }
      }
    }
    
    // Clean up orphaned acquiredAbilities - remove entries that aren't on the sheet or in languages
    this.cleanupOrphanedAcquiredAbilities();
  },
  
  /**
   * Remove acquiredAbilities entries that don't correspond to actual abilities on the sheet
   */
  cleanupOrphanedAcquiredAbilities() {
    if (!this.character.acquiredAbilities || this.character.acquiredAbilities.length === 0) return;
    
    // Get all abilities currently on the sheet
    const sheetAbilities = new Set();
    const container = document.getElementById('class-abilities-list');
    if (container) {
      const inputs = container.querySelectorAll('.class-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          sheetAbilities.add(input.value.trim().toLowerCase());
        }
      });
    }
    
    // Get all languages on the sheet (for Language abilities)
    const languages = new Set();
    const nativeName = document.getElementById('native-tongue-name')?.value?.trim();
    if (nativeName) {
      languages.add(`language (${nativeName.toLowerCase()})`);
    }
    for (let i = 2; i <= 7; i++) {
      const langName = document.getElementById(`language-${i}-name`)?.value?.trim();
      if (langName) {
        languages.add(`language (${langName.toLowerCase()})`);
      }
    }
    
    // Filter acquiredAbilities to only include those actually present
    this.character.acquiredAbilities = this.character.acquiredAbilities.filter(ability => {
      const normalized = ability.toLowerCase().trim();
      
      // Check if it's on the abilities sheet
      if (sheetAbilities.has(normalized)) return true;
      
      // Check if it's a language ability that exists
      if (normalized.startsWith('language (') && languages.has(normalized)) return true;
      
      // Also keep Characteristic Increase entries (they're tracked differently)
      if (normalized.startsWith('characteristic increase')) return true;
      
      // Not found - remove from tracking
      return false;
    });
  },
  
  /**
   * Get all current special abilities (class abilities)
   */
  getAllSpecialAbilities() {
    const abilities = [];
    
    // Get class abilities
    const classContainer = document.getElementById('class-abilities-list');
    if (classContainer) {
      const inputs = classContainer.querySelectorAll('.class-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          abilities.push(input.value.trim());
        }
      });
    }
    
    // Get species abilities
    const speciesContainer = document.getElementById('species-abilities-list');
    if (speciesContainer) {
      const inputs = speciesContainer.querySelectorAll('.species-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          abilities.push(input.value.trim());
        }
      });
    }
    
    return abilities;
  },
  
  /**
   * Check if a specific ability is in the Class Abilities list
   * @param {string} abilityName - Name of the ability to check for
   * @returns {boolean} - True if the ability is present
   */
  hasAbility(abilityName) {
    const normalizedTarget = abilityName.toLowerCase().trim();
    const abilities = this.getAllSpecialAbilities();
    return abilities.some(a => a.toLowerCase().trim() === normalizedTarget);
  },
  
  /**
   * Remove Language abilities from Class Abilities section
   */
  removeLanguageAbilitiesFromSheet(languageAbilities) {
    const normalizeApostrophes = (str) => str.replace(/[']/g, "'");
    const normalizedTargets = languageAbilities.map(a => normalizeApostrophes(a.toLowerCase().trim()));
    
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.class-ability-row'));
    rows.forEach(row => {
      const input = row.querySelector('.class-ability-input');
      if (input && input.value.trim()) {
        const normalizedValue = normalizeApostrophes(input.value.toLowerCase().trim());
        if (normalizedTargets.includes(normalizedValue)) {
          row.remove();
        }
      }
    });
    
    this.reindexClassAbilityRows();
  },
  
  /**
   * Add a special ability (alias for addClassAbilityRow for compatibility)
   */
  addSpecialAbility(abilityName, sourceClass = null) {
    return this.addClassAbilityRow(abilityName, sourceClass);
  },
  
  /**
   * Set up syncing between magic skill inputs on page 1 and page 2
   */
  setupMagicSkillSync() {
    const syncInputs = document.querySelectorAll('.sync-magic');
    
    syncInputs.forEach(input => {
      const syncTargetId = input.dataset.sync;
      const syncTarget = document.getElementById(syncTargetId);
      
      if (syncTarget) {
        // Sync from page 2 to page 1
        input.addEventListener('input', () => {
          syncTarget.value = input.value;
          // Also save to character data
          const key = this.camelCase(syncTargetId);
          if (this.character.magic) {
            this.character.magic[key] = input.value;
          }
          this.scheduleAutoSave();
        });
        
        // Sync from page 1 to page 2
        syncTarget.addEventListener('input', () => {
          input.value = syncTarget.value;
        });
      }
    });
    
    // Add special sync for Musicianship (magic page -> professional skills)
    const musicianshipMagic = document.getElementById('musicianship-percent');
    if (musicianshipMagic) {
      musicianshipMagic.addEventListener('input', () => {
        this.syncMusicianshipToProfSkills(musicianshipMagic.value);
      });
    }
  },

  /**
   * Sync Musicianship from magic page to Professional Skills (if user is a Bard)
   */
  syncMusicianshipToProfSkills(value) {
    // Check if user is a Bard
    const classes = [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c);
    
    if (!classes.includes('bard')) return;
    
    // Find Musicianship in professional skills
    const container = document.getElementById('professional-skills-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.professional-skill-row');
    rows.forEach(row => {
      const nameInput = row.querySelector('.prof-skill-name');
      const currentInput = row.querySelector('.prof-skill-current');
      if (nameInput && currentInput) {
        const skillName = nameInput.value.trim().toLowerCase();
        if (skillName.startsWith('musicianship')) {
          if (currentInput.value !== value) {
            currentInput.value = value;
          }
        }
      }
    });
  },
  
  /**
   * Sync magic skill values from page 1 to page 2 (call after populateForm)
   */
  syncMagicSkillValues() {
    const syncInputs = document.querySelectorAll('.sync-magic');
    
    syncInputs.forEach(input => {
      const syncTargetId = input.dataset.sync;
      const syncTarget = document.getElementById(syncTargetId);
      
      if (syncTarget) {
        input.value = syncTarget.value;
      }
    });
    
    // Also sync from Professional Skills to Magic page
    this.syncProfessionalSkillsToMagicPage();
  },
  
  /**
   * Sync magic skill values from Professional Skills to Magic page
   * Called on load to ensure Magic page reflects Professional Skills values
   */
  syncProfessionalSkillsToMagicPage() {
    // Iterate through all professional skill slots
    for (let i = 0; i < 22; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (!nameInput || !currentInput) continue;
      
      const skillName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
      if (!skillName) continue;
      
      // Check if this is a magic skill
      const config = this.MAGIC_SKILL_CONFIG[skillName];
      if (!config) continue;
      
      // Sync to magic page if professional skill has a value
      // Don't check class relevance - if the skill exists in Prof Skills, sync it
      const profValue = currentInput.value;
      if (profValue !== '' && profValue !== null && profValue !== undefined) {
        const magicInput = document.getElementById(config.magicId);
        if (magicInput) {
          magicInput.value = profValue;
          // Dispatch events so any listeners update
          magicInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  },
  
  /**
   * Magic skills configuration - maps skill names to magic page field IDs and class requirements
   */
  MAGIC_SKILL_CONFIG: {
    'channel': { magicId: 'channel-percent', classes: ['cleric', 'ranger', 'paladin', 'anti-paladin', 'druid', 'monk'] },
    'piety': { magicId: 'piety-percent', classes: ['cleric', 'ranger', 'paladin', 'anti-paladin', 'druid', 'monk'] },
    'arcane casting': { magicId: 'arcane-casting-percent', classes: ['mage'] },
    'arcane knowledge': { magicId: 'arcane-knowledge-percent', classes: ['mage'] },
    'arcane sorcery': { magicId: 'arcane-sorcery-percent', classes: ['sorcerer'] },
    'sorcerous wisdom': { magicId: 'sorcerous-wisdom-percent', classes: ['sorcerer'] },
    'musicianship': { magicId: 'musicianship-percent', classes: ['bard'] },
    'lyrical magic': { magicId: 'lyrical-magic-percent', classes: ['bard'] }
  },
  
  /**
   * Get current character classes (lowercase)
   */
  getCurrentClasses() {
    return [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c);
  },
  
  /**
   * Check if a magic skill is relevant to current classes
   */
  isMagicSkillRelevant(skillName) {
    const normalizedName = skillName.toLowerCase().replace(/\s*\(.*\)/, '').trim();
    const config = this.MAGIC_SKILL_CONFIG[normalizedName];
    if (!config) return false;
    
    const currentClasses = this.getCurrentClasses();
    return config.classes.some(cls => currentClasses.includes(cls));
  },
  
  /**
   * Sync a professional skill to the magic page (when pro skill value changes)
   */
  syncProfSkillToMagic(profSkillIndex) {
    const nameInput = document.getElementById(`prof-skill-${profSkillIndex}-name`);
    const currentInput = document.getElementById(`prof-skill-${profSkillIndex}-current`);
    
    if (!nameInput || !currentInput) return;
    
    const skillName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
    const config = this.MAGIC_SKILL_CONFIG[skillName];
    
    if (!config) return;
    if (!this.isMagicSkillRelevant(skillName)) return;
    
    const magicInput = document.getElementById(config.magicId);
    if (magicInput && magicInput.value !== currentInput.value) {
      magicInput.value = currentInput.value;
      magicInput.dispatchEvent(new Event('input', { bubbles: true }));
      magicInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
  
  /**
   * Sync a magic skill to professional skills (when magic page value changes)
   */
  syncMagicToProfSkill(magicFieldId, value) {
    // Find which skill this magic field represents
    let targetSkillName = null;
    for (const [skillName, config] of Object.entries(this.MAGIC_SKILL_CONFIG)) {
      if (config.magicId === magicFieldId) {
        targetSkillName = skillName;
        break;
      }
    }
    
    if (!targetSkillName) return;
    if (!this.isMagicSkillRelevant(targetSkillName)) return;
    
    // Find this skill in professional skills
    for (let i = 0; i < 22; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (nameInput && currentInput) {
        const profSkillName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
        if (profSkillName === targetSkillName) {
          if (currentInput.value !== value) {
            currentInput.value = value;
            currentInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          return; // Found and updated
        }
      }
    }
  },
  
  /**
   * Handle professional skill deletion - also clear magic skill if applicable
   */
  handleProfSkillDeletion(profSkillIndex, previousSkillName) {
    if (!previousSkillName) return;
    
    const normalizedName = previousSkillName.toLowerCase().replace(/\s*\(.*\)/, '').trim();
    const config = this.MAGIC_SKILL_CONFIG[normalizedName];
    
    if (!config) return;
    
    // Clear the magic page field
    const magicInput = document.getElementById(config.magicId);
    if (magicInput && magicInput.value) {
      magicInput.value = '';
      magicInput.dispatchEvent(new Event('input', { bubbles: true }));
      magicInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
  
  /**
   * Check for duplicate magic skills in professional skills
   */
  checkForDuplicateMagicSkill(skillName, excludeIndex) {
    const normalizedName = skillName.toLowerCase().replace(/\s*\(.*\)/, '').trim();
    
    // Check if it's a magic skill
    if (!this.MAGIC_SKILL_CONFIG[normalizedName]) return false;
    
    // Check other professional skill slots
    for (let i = 0; i < 22; i++) {
      if (i === excludeIndex) continue;
      
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      if (nameInput) {
        const existingName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
        if (existingName === normalizedName) {
          return true; // Duplicate found
        }
      }
    }
    return false;
  },
  
  /**
   * Setup magic skill sync listeners on magic page inputs
   */
  setupMagicSkillSyncListeners() {
    Object.values(this.MAGIC_SKILL_CONFIG).forEach(config => {
      const magicInput = document.getElementById(config.magicId);
      if (magicInput) {
        magicInput.addEventListener('input', (e) => {
          this.syncMagicToProfSkill(config.magicId, e.target.value);
        });
      }
    });
  },
  
  /**
   * Remove magic skills from Professional Skills when their class is no longer present
   */
  removeObsoleteMagicSkills() {
    const currentClasses = this.getCurrentClasses();
    
    // Check each professional skill slot
    for (let i = 0; i < 22; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const baseInput = document.getElementById(`prof-skill-${i}-base`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (!nameInput || !nameInput.value.trim()) continue;
      
      const skillName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
      const config = this.MAGIC_SKILL_CONFIG[skillName];
      
      // If this is a magic skill, check if its class is still present
      if (config) {
        const hasRequiredClass = config.classes.some(cls => currentClasses.includes(cls));
        
        if (!hasRequiredClass) {
          // Class removed - clear this skill from professional skills
          nameInput.value = '';
          nameInput.dataset.previousName = '';
          if (baseInput) baseInput.value = '';
          if (currentInput) currentInput.value = '';
          
          // Also clear from magic page
          const magicInput = document.getElementById(config.magicId);
          if (magicInput) {
            magicInput.value = '';
            magicInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          
          // Update data
          this.updateProfessionalSkillData(i);
        }
      }
    }
  },
  
  /**
   * Auto-add magic skills to Professional Skills based on class
   * Called when class changes or during initialization
   */
  autoAddMagicSkillsToProfessional() {
    const currentClasses = this.getCurrentClasses();
    if (currentClasses.length === 0) return;
    
    // Determine which magic skills should be present
    const requiredSkills = [];
    for (const [skillName, config] of Object.entries(this.MAGIC_SKILL_CONFIG)) {
      if (config.classes.some(cls => currentClasses.includes(cls))) {
        requiredSkills.push({
          name: this.toTitleCase(skillName),
          magicId: config.magicId
        });
      }
    }
    
    if (requiredSkills.length === 0) return;
    
    // Check which skills are already in professional skills
    const existingSkills = new Set();
    for (let i = 0; i < 22; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      if (nameInput && nameInput.value.trim()) {
        existingSkills.add(nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim());
      }
    }
    
    // Add missing skills
    for (const skill of requiredSkills) {
      const normalizedName = skill.name.toLowerCase();
      if (!existingSkills.has(normalizedName)) {
        // Find empty slot
        for (let i = 0; i < 22; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          const baseInput = document.getElementById(`prof-skill-${i}-base`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          
          if (nameInput && !nameInput.value.trim()) {
            // Found empty slot - add the skill
            nameInput.value = skill.name;
            nameInput.dataset.previousName = skill.name;
            
            // Auto-fill formula
            if (baseInput) {
              this.autoFillProfessionalSkillFormula(nameInput, baseInput);
            }
            
            // Copy value from magic page
            const magicInput = document.getElementById(skill.magicId);
            if (magicInput && magicInput.value && currentInput) {
              currentInput.value = magicInput.value;
            }
            
            // Update data
            this.updateProfessionalSkillData(i);
            this.calculateProfessionalSkillBase(i);
            this.updateProfSkillEncIndicator(i);
            
            break; // Move to next required skill
          }
        }
      } else {
        // Skill exists - sync values from magic page
        for (let i = 0; i < 22; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          if (nameInput) {
            const existingName = nameInput.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
            if (existingName === normalizedName) {
              const currentInput = document.getElementById(`prof-skill-${i}-current`);
              const magicInput = document.getElementById(skill.magicId);
              if (currentInput && magicInput && magicInput.value) {
                if (currentInput.value !== magicInput.value) {
                  currentInput.value = magicInput.value;
                }
              }
              break;
            }
          }
        }
      }
    }
  },
  
  /**
   * Get SVG for a prereq key icon
   */
  getPrereqKeySvg(color, tooltip = '') {
    const colors = {
      gold: { gradient: ['#F5D98A', '#D4A84B', '#B8860B'], stroke: '#8B6914' },
      silver: { gradient: ['#E8E8E8', '#B8B8B8', '#888888'], stroke: '#666666' },
      blue: { gradient: ['#6A9FD4', '#3A6EA5', '#1E4D78'], stroke: '#1A3A5C' }
    };
    
    const c = colors[color] || colors.gold;
    const uniqueId = `key-${color}-${Math.random().toString(36).substr(2, 9)}`;
    // Store tooltip data in data attributes for click popup instead of hover
    const dataAttrs = tooltip ? `data-key-info="${tooltip.replace(/"/g, '&quot;')}" data-key-color="${color}"` : '';
    
    return `<svg class="prereq-key" viewBox="0 0 32 32" ${dataAttrs}>
      <defs>
        <linearGradient id="${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${c.gradient[0]}"/>
          <stop offset="50%" style="stop-color:${c.gradient[1]}"/>
          <stop offset="100%" style="stop-color:${c.gradient[2]}"/>
        </linearGradient>
      </defs>
      <path d="M20 4a8 8 0 00-7.2 11.5L4 24.3V28h3.7l8.8-8.8A8 8 0 1020 4zm0 12a4 4 0 110-8 4 4 0 010 8z" fill="url(#${uniqueId})" stroke="${c.stroke}" stroke-width="1"/>
      <rect x="17" y="6" width="6" height="6" rx="1" transform="rotate(45 20 9)" fill="none" stroke="${c.stroke}" stroke-width="1.5"/>
    </svg>`;
  },
  
  /**
   * Update multiclass field states on load (without showing warnings)
   */
  updateMulticlassFieldStates() {
    if (!window.ClassRankData) return;
    
    const primary = document.getElementById('class-primary')?.value?.trim() || '';
    
    if (primary) {
      const canMulti = window.ClassRankData.canClassMulticlass(primary);
      this.setMulticlassFieldsEnabled(canMulti);
    } else {
      this.setMulticlassFieldsEnabled(true);
    }
  },
  
  /**
   * Show a warning popup for multiclass restriction violations
   */
  showMulticlassWarning(message) {
    // Remove any existing warning
    const existingWarning = document.getElementById('multiclass-warning');
    if (existingWarning) existingWarning.remove();
    
    // Create warning popup
    const warning = document.createElement('div');
    warning.id = 'multiclass-warning';
    warning.className = 'multiclass-warning';
    warning.innerHTML = `
      <div class="multiclass-warning-icon">⚠️</div>
      <div class="multiclass-warning-title">Illegal Multiclass</div>
      <div class="multiclass-warning-message">${message}</div>
      <button class="multiclass-warning-close">OK</button>
    `;
    
    document.body.appendChild(warning);
    
    // Close handler
    const closeBtn = warning.querySelector('.multiclass-warning-close');
    closeBtn.addEventListener('click', () => {
      warning.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      if (warning.parentNode) {
        warning.remove();
      }
    }, 5000);
  },

  /**
   * Prompt user to enter a rank for a newly entered class
   */
  promptForRank(className, rankFieldId) {
    // Remove any existing prompt
    const existingPrompt = document.getElementById('rank-prompt');
    if (existingPrompt) existingPrompt.remove();
    
    // Create prompt popup
    const prompt = document.createElement('div');
    prompt.id = 'rank-prompt';
    prompt.className = 'rank-prompt-overlay';
    prompt.innerHTML = `
      <div class="rank-prompt-dialog">
        <div class="rank-prompt-title">Enter Rank</div>
        <div class="rank-prompt-message">What Rank do you have for ${className}?</div>
        <input type="number" id="rank-prompt-input" class="rank-prompt-input" min="0" max="5" value="0" autofocus>
        <div class="rank-prompt-buttons">
          <button class="rank-prompt-cancel">Cancel</button>
          <button class="rank-prompt-ok">OK</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(prompt);
    
    const input = prompt.querySelector('#rank-prompt-input');
    const okBtn = prompt.querySelector('.rank-prompt-ok');
    const cancelBtn = prompt.querySelector('.rank-prompt-cancel');
    
    // Focus the input
    setTimeout(() => input.focus(), 50);
    
    // OK handler
    const handleOk = () => {
      let val = parseInt(input.value, 10);
      if (isNaN(val)) val = 0;
      val = Math.max(0, Math.min(5, val));
      
      const rankField = document.getElementById(rankFieldId);
      if (rankField) {
        rankField.value = val;
        const rankKey = this.camelCase(rankFieldId);
        this.character.info[rankKey] = val;
        this.updateRankName();
        this.updatePrereqKeys();
        this.updateSpellMemorization();
        this.updateClassSpells();
        this.updateClassAbilities();
        this.scheduleAutoSave();
      }
      prompt.remove();
    };
    
    okBtn.addEventListener('click', handleOk);
    
    // Cancel handler
    cancelBtn.addEventListener('click', () => {
      prompt.remove();
    });
    
    // Enter key handler
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleOk();
      } else if (e.key === 'Escape') {
        prompt.remove();
      }
    });
    
    // Select all text when focused so user can just type
    input.addEventListener('focus', () => {
      input.select();
    });
  },

  /**
   * Update rank name based on class and rank
   * For single class: uses standard rank titles
   * For multiclass: offers evocative name choices
   */
  updateRankName() {
    if (!window.ClassRankData) return;
    
    const primaryClass = document.getElementById('class-primary')?.value?.trim() || '';
    const secondaryClass = document.getElementById('class-secondary')?.value?.trim() || '';
    const rankPrimary = document.getElementById('rank-primary')?.value || '';
    const rankNameField = document.getElementById('rank-name');
    
    if (!rankNameField) return;
    
    // If no classes, clear rank name (if it's a standard title or evocative name)
    if (!primaryClass) {
      const currentValue = rankNameField.value.trim();
      if (this.isStandardRankTitle(currentValue) || this.isEvocativeName(currentValue)) {
        rankNameField.value = '';
        this.character.info.rankName = '';
      }
      return;
    }
    
    // Check if we have a multiclass combo with evocative names
    if (primaryClass && secondaryClass) {
      const evocativeOptions = window.ClassRankData.getEvocativeNames(primaryClass, secondaryClass);
      
      if (evocativeOptions && evocativeOptions.length > 0) {
        // Check if current value is already one of the evocative options
        const currentValue = rankNameField.value.trim();
        if (!evocativeOptions.includes(currentValue)) {
          // Show dropdown to select evocative name
          this.showEvocativeNameSelector(evocativeOptions, rankNameField);
        }
        return;
      }
    }
    
    // Single class: use standard rank title
    if (primaryClass && rankPrimary !== '') {
      const rankIndex = parseInt(rankPrimary, 10);
      const title = window.ClassRankData.getRankTitle(primaryClass, rankIndex);
      
      // Only auto-fill if empty or matches a standard title
      const currentValue = rankNameField.value.trim();
      const isStandardTitle = this.isStandardRankTitle(currentValue);
      
      if (!currentValue || isStandardTitle) {
        rankNameField.value = title;
      }
    }
  },
  
  /**
   * Check if a value is a standard rank title (not a custom name)
   */
  isStandardRankTitle(value) {
    if (!value || !window.ClassRankData) return false;
    
    for (const titles of Object.values(window.ClassRankData.CLASS_RANK_TITLES)) {
      if (titles.includes(value)) return true;
    }
    return false;
  },
  
  /**
   * Check if a value is an evocative name from multiclass combos
   */
  isEvocativeName(value) {
    if (!value || !window.ClassRankData) return false;
    
    for (const names of Object.values(window.ClassRankData.EVOCATIVE_NAMES)) {
      if (names.includes(value)) return true;
    }
    return false;
  },
  
  /**
   * Show evocative name selector dropdown
   */
  showEvocativeNameSelector(options, targetField) {
    // Remove any existing selector
    const existingSelector = document.getElementById('evocative-name-selector');
    if (existingSelector) existingSelector.remove();
    
    // Create dropdown
    const selector = document.createElement('div');
    selector.id = 'evocative-name-selector';
    selector.className = 'evocative-selector';
    selector.innerHTML = `
      <div class="evocative-header">Choose an Evocative Name:</div>
      <div class="evocative-options">
        ${options.map(opt => `<div class="evocative-option" data-value="${opt}">${opt}</div>`).join('')}
      </div>
      <div class="evocative-cancel">Cancel</div>
    `;
    
    // Position near the rank name field
    const rect = targetField.getBoundingClientRect();
    selector.style.position = 'fixed';
    selector.style.top = `${rect.bottom + 5}px`;
    selector.style.left = `${rect.left}px`;
    selector.style.zIndex = '10000';
    
    document.body.appendChild(selector);
    
    // Add click handlers
    selector.querySelectorAll('.evocative-option').forEach(opt => {
      opt.addEventListener('click', () => {
        targetField.value = opt.dataset.value;
        this.character.info.rankName = opt.dataset.value;
        this.scheduleAutoSave();
        selector.remove();
      });
    });
    
    selector.querySelector('.evocative-cancel').addEventListener('click', () => {
      selector.remove();
    });
    
    // Close on click outside
    setTimeout(() => {
      document.addEventListener('click', function closeSelector(e) {
        if (!selector.contains(e.target) && e.target !== targetField) {
          selector.remove();
          document.removeEventListener('click', closeSelector);
        }
      });
    }, 100);
  },

  /**
   * Update movement display
   */
  updateMovementDisplay() {
    // Use current movement value, fall back to original if current is empty
    const movementCurrent = document.getElementById('movement-current');
    const movementOriginal = document.getElementById('movement-original');
    const baseMovement = parseInt(movementCurrent?.value) || parseInt(movementOriginal?.value) || parseInt(this.character.derived.movementCurrent) || parseInt(this.character.derived.movementBase) || 0;
    const speeds = Calculator.calculateMovement(baseMovement);
    
    const walkEl = document.getElementById('walk-speed');
    const runEl = document.getElementById('run-speed');
    const sprintEl = document.getElementById('sprint-speed');
    const swimEl = document.getElementById('swim-speed');
    const climbEl = document.getElementById('climb-speed');
    
    // Remove any penalty styling
    [walkEl, runEl, sprintEl, swimEl, climbEl].forEach(el => {
      if (el) {
        el.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened');
      }
    });
    
    if (walkEl) walkEl.textContent = `${speeds.walk}'`;
    if (runEl) runEl.textContent = `${speeds.run}'`;
    if (sprintEl) sprintEl.textContent = `${speeds.sprint}'`;
    if (swimEl) swimEl.textContent = `${speeds.swim}'`;
    if (climbEl) climbEl.textContent = `${speeds.climb}'`;
  },

  /**
   * Update jump display
   */
  updateJumpDisplay() {
    const height = this.character.info.height || '';
    const jumps = Calculator.calculateJumps(height);
    
    document.getElementById('vertical-jump').textContent = jumps.vertical || "0' 0\"";
    document.getElementById('horizontal-jump').textContent = jumps.horizontal || "0' 0\"";
  },

  /**
   * Update total encumbrance
   */
  updateTotalEnc() {
    if (!this.character.encAutomation) {
      return;
    }
    
    let total = 0;
    
    // Equipment ENC
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const encInput = document.getElementById(`equip-${i}-enc`);
      if (encInput && encInput.value) {
        total += parseFloat(encInput.value) || 0;
      }
    }
    
    // Money ENC (every 100 coins = 1 Thing)
    const moneyEnc = this.updateMoneyEnc();
    total += moneyEnc;
    
    const totalDisplay = document.getElementById('total-enc');
    if (totalDisplay) {
      totalDisplay.textContent = total.toFixed(1);
    }
    
    const STR = parseInt(this.character.attributes.STR) || 0;
    const status = Calculator.getEncStatus(total, STR);
    
    const statusDisplay = document.getElementById('enc-status');
    if (statusDisplay) {
      statusDisplay.textContent = status.name;
      
      // Add visual styling based on burden level
      statusDisplay.classList.remove('enc-extremely-unburdened', 'enc-unburdened', 'enc-burdened', 'enc-overburdened');
      if (status.name === 'Extremely Unburdened') {
        statusDisplay.classList.add('enc-extremely-unburdened');
      } else if (status.name === 'Unburdened') {
        statusDisplay.classList.add('enc-unburdened');
      } else if (status.name === 'Burdened') {
        statusDisplay.classList.add('enc-burdened');
      } else if (status.name === 'Overburdened') {
        statusDisplay.classList.add('enc-overburdened');
      }
    }
    
    // Update ENC penalty display
    this.updateEncPenaltyDisplay(status);
  },
  
  /**
   * Update ENC penalty display and affected skills visual feedback
   */
  updateEncPenaltyDisplay(status) {
    const isBurdened = status.name === 'Burdened';
    const isOverburdened = status.name === 'Overburdened';
    const hasPenalty = isBurdened || isOverburdened;
    
    // Update the ENC penalty note text
    const penaltyNote = document.querySelector('.enc-penalty-note span:last-child');
    if (penaltyNote) {
      if (hasPenalty) {
        penaltyNote.textContent = `= ENC Penalty: ${status.penaltyText}`;
        penaltyNote.classList.add('enc-penalty-active');
      } else {
        penaltyNote.textContent = '= ENC Penalty';
        penaltyNote.classList.remove('enc-penalty-active');
      }
    }
    
    // Update tooltip on all enc-indicators
    const indicators = document.querySelectorAll('.enc-indicator');
    indicators.forEach(indicator => {
      indicator.classList.remove('enc-penalty-active', 'enc-burdened');
      if (hasPenalty) {
        indicator.title = `Affected by ENC: ${status.penaltyText}`;
        if (isBurdened) {
          indicator.classList.add('enc-burdened');
        } else {
          indicator.classList.add('enc-penalty-active');
        }
      } else {
        indicator.title = 'Affected by ENC';
      }
    });
    
    // Apply all penalties (ENC + Fatigue combined)
    this.applyAllPenalties();
  },
  
  /**
   * Update Initiative and Movement current values based on ENC status
   */
  updateEncInitiativeAndMovement(status) {
    const isBurdened = status.name === 'Burdened';
    const isOverburdened = status.name === 'Overburdened';
    const hasPenalty = isBurdened || isOverburdened;
    const penaltyClass = isBurdened ? 'burdened' : 'overburdened';
    
    // Initiative Current
    const initCurrent = document.getElementById('initiative-current');
    if (initCurrent) {
      // Store original if not already stored
      if (initCurrent.dataset.originalValue === undefined && initCurrent.value) {
        initCurrent.dataset.originalValue = initCurrent.value;
      }
      
      const originalInit = parseInt(initCurrent.dataset.originalValue) || parseInt(initCurrent.value) || 0;
      
      initCurrent.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened');
      
      if (hasPenalty && status.initiativePenalty > 0) {
        const penalizedInit = originalInit - status.initiativePenalty;
        initCurrent.value = penalizedInit;
        initCurrent.classList.add('enc-penalty-init-move', penaltyClass);
        initCurrent.title = `Original: ${originalInit}, ENC Penalty: -${status.initiativePenalty}`;
      } else if (initCurrent.dataset.originalValue !== undefined) {
        initCurrent.value = initCurrent.dataset.originalValue;
        initCurrent.title = '';
      }
      
      // Update combat quick ref
      this.updateCombatQuickRef();
    }
    
    // Movement Current
    const moveCurrent = document.getElementById('movement-current');
    if (moveCurrent) {
      // Store original if not already stored
      if (moveCurrent.dataset.originalValue === undefined && moveCurrent.value) {
        moveCurrent.dataset.originalValue = moveCurrent.value;
      }
      
      const originalMove = parseInt(moveCurrent.dataset.originalValue) || parseInt(moveCurrent.value) || 0;
      
      moveCurrent.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened');
      
      if (hasPenalty && status.movementPenalty > 0) {
        const penalizedMove = Math.max(0, originalMove - status.movementPenalty);
        moveCurrent.value = penalizedMove;
        moveCurrent.classList.add('enc-penalty-init-move', penaltyClass);
        moveCurrent.title = `Original: ${originalMove}', ENC Penalty: -${status.movementPenalty}'`;
        
        // Update movement display with penalized value
        this.updateMovementDisplayWithPenalty(penalizedMove, penaltyClass);
      } else if (moveCurrent.dataset.originalValue !== undefined) {
        moveCurrent.value = moveCurrent.dataset.originalValue;
        moveCurrent.title = '';
        
        // Restore normal movement display
        this.updateMovementDisplay();
      }
    }
  },
  
  /**
   * Update movement speed display with ENC penalty styling
   */
  updateMovementDisplayWithPenalty(baseMove, penaltyClass) {
    const speeds = Calculator.calculateMovement(baseMove);
    
    const walkEl = document.getElementById('walk-speed');
    const runEl = document.getElementById('run-speed');
    const sprintEl = document.getElementById('sprint-speed');
    const swimEl = document.getElementById('swim-speed');
    const climbEl = document.getElementById('climb-speed');
    
    [walkEl, runEl, sprintEl, swimEl, climbEl].forEach(el => {
      if (el) {
        el.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened');
        el.classList.add('enc-penalty-init-move', penaltyClass);
      }
    });
    
    if (walkEl) walkEl.textContent = `${speeds.walk}'`;
    if (runEl) runEl.textContent = `${speeds.run}'`;
    if (sprintEl) sprintEl.textContent = `${speeds.sprint}'`;
    if (swimEl) swimEl.textContent = `${speeds.swim}'`;
    if (climbEl) climbEl.textContent = `${speeds.climb}'`;
  },
  
  /**
   * Update skill percentage displays for ENC-affected skills
   */
  updateEncAffectedSkillValues(status) {
    const penaltyPercent = status.penaltyPercent || 0;
    const isBurdened = status.name === 'Burdened';
    const isOverburdened = status.name === 'Overburdened';
    const hasPenalty = isBurdened || isOverburdened;
    
    // Find all Standard Skills with enc-indicator (those have STR/DEX in formula)
    document.querySelectorAll('.skill-row').forEach(row => {
      const indicator = row.querySelector('.enc-indicator');
      if (!indicator) return; // Skip skills without indicator
      
      const input = row.querySelector('.skill-input');
      if (!input) return;
      
      // Store original value if not already stored
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || parseInt(input.value) || 0;
      
      // Remove previous penalty classes
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty');
      
      if (hasPenalty && originalValue > 0) {
        // Apply penalty and show penalized value
        const penalizedValue = Math.max(0, originalValue - penaltyPercent);
        input.value = penalizedValue;
        input.classList.add('enc-penalized-value');
        if (isBurdened) {
          input.classList.add('enc-burdened-penalty');
        }
        input.title = `Original: ${originalValue}%, Penalized: ${penalizedValue}%`;
      } else if (input.dataset.originalValue !== undefined) {
        // Restore original value
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    });
    
    // Update Professional Skills with STR/DEX in formula
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const encIndicator = document.getElementById(`prof-skill-${i}-enc`);
      if (!encIndicator || encIndicator.style.display === 'none') continue;
      
      const input = document.getElementById(`prof-skill-${i}-current`);
      if (!input) continue;
      
      // Store original value if not already stored
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || parseInt(input.value) || 0;
      
      // Remove previous penalty classes
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty');
      
      if (hasPenalty && originalValue > 0) {
        // Apply penalty and show penalized value
        const penalizedValue = Math.max(0, originalValue - penaltyPercent);
        input.value = penalizedValue;
        input.classList.add('enc-penalized-value');
        if (isBurdened) {
          input.classList.add('enc-burdened-penalty');
        }
        input.title = `Original: ${originalValue}%, Penalized: ${penalizedValue}%`;
      } else if (input.dataset.originalValue !== undefined) {
        // Restore original value
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    }
    
    // Update Combat Skill and Unarmed (both are STR+DEX based)
    const combatSkillInputs = document.querySelectorAll('.enc-affected-combat');
    combatSkillInputs.forEach(input => {
      // Store original value if not already stored
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || parseInt(input.value) || 0;
      
      // Remove previous penalty classes
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty');
      
      if (hasPenalty && originalValue > 0) {
        // Apply penalty and show penalized value
        const penalizedValue = Math.max(0, originalValue - penaltyPercent);
        input.value = penalizedValue;
        input.classList.add('enc-penalized-value');
        if (isBurdened) {
          input.classList.add('enc-burdened-penalty');
        }
        input.title = `Original: ${originalValue}%, Penalized: ${penalizedValue}%`;
      } else if (input.dataset.originalValue !== undefined) {
        // Restore original value
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    });
  },

  // ============================================================
  // FATIGUE & UNIFIED PENALTY SYSTEM
  // ============================================================

  /**
   * Setup fatigue radio button listeners
   */
  setupFatigueListeners() {
    const fatigueRadios = document.querySelectorAll('input[name="fatigue-state"]');
    fatigueRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.setFatigueState(e.target.value, true);
      });
    });
    
    // Allow clicking anywhere on a fatigue row to select it
    const fatigueRows = document.querySelectorAll('.fatigue-table tbody tr');
    fatigueRows.forEach(row => {
      row.addEventListener('click', (e) => {
        // Don't double-trigger if clicking the radio itself
        if (e.target.type === 'radio') return;
        const radio = row.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  },

  /**
   * Set the fatigue state and apply penalties
   * @param {string} state - fatigue state key (e.g., 'fresh', 'wearied')
   * @param {boolean} save - whether to trigger auto-save
   */
  setFatigueState(state, save = true) {
    if (!FATIGUE_PENALTIES[state]) return;
    
    this.character.fatigueState = state;
    
    // Update radio button
    const radio = document.querySelector(`input[name="fatigue-state"][value="${state}"]`);
    if (radio) radio.checked = true;
    
    // Update active row highlight
    document.querySelectorAll('.fatigue-table tbody tr').forEach(row => {
      row.classList.remove('fatigue-active');
    });
    const activeRow = document.querySelector(`tr[data-fatigue="${state}"]`);
    if (activeRow) activeRow.classList.add('fatigue-active');
    
    // Apply all penalties
    this.applyAllPenalties();
    
    // Update summary page - refresh all widgets that display penalized values
    this.updateCombatQuickRef();
    if (typeof this.refreshSummaryWidget === 'function') {
      this.refreshSummaryWidget('fatigue');
      this.refreshSummaryWidget('combat');
      this.refreshSummaryWidget('attributes');
      this.refreshSummaryWidget('movement');
      this.refreshSummaryWidget('key-skills');
      this.refreshSummaryWidget('professional-skills');
      this.refreshSummaryWidget('magic-skills');
    }
    
    if (save) {
      this.scheduleAutoSave();
    }
  },

  /**
   * Short Rest: Open the Short Rest modal to choose an action
   */
  shortRest() {
    this.openShortRestModal();
  },

  /**
   * Long Rest: 8 hours of rest - restore MP and recover fatigue based on recovery times
   */
  longRest() {
    const currentState = this.character.fatigueState || 'fresh';
    const messages = [];
    
    // Recovery time mapping (hours to reach Fresh from each state)
    const recoveryTimes = {
      fresh: 0,
      winded: 0.25,  // 15 min
      tired: 3,
      wearied: 6,
      exhausted: 12,
      debilitated: 18,
      incapacitated: 24,
      semiconscious: 36,
      coma: 48
    };
    
    // Long Rest outcomes (what state you end up in after 8 hours)
    const longRestOutcome = {
      fresh: 'fresh',
      winded: 'fresh',
      tired: 'fresh',
      wearied: 'fresh',
      exhausted: 'wearied',      // 12-8=4 hrs remaining
      debilitated: 'exhausted',   // 18-8=10 hrs remaining
      incapacitated: 'debilitated', // 24-8=16 hrs remaining
      semiconscious: 'semiconscious', // No change - needs Cure Fatigue
      coma: 'coma'                // No change - needs Cure Fatigue
    };
    
    // Restore all Magic Points
    const mpCurrent = document.getElementById('magic-points-current');
    const mpMax = document.getElementById('magic-points-original');
    if (mpCurrent && mpMax) {
      const maxMP = parseInt(mpMax.dataset.originalValue || mpMax.value) || 0;
      const currentMP = parseInt(mpCurrent.value) || 0;
      if (maxMP > 0) {
        mpCurrent.value = maxMP;
        mpCurrent.dispatchEvent(new Event('input', { bubbles: true }));
        if (currentMP < maxMP) {
          messages.push(`<strong>Magic Points restored:</strong> ${currentMP} → ${maxMP}`);
        } else {
          messages.push(`<strong>Magic Points:</strong> Already at maximum (${maxMP})`);
        }
      }
    }
    
    // Calculate fatigue recovery
    const newState = longRestOutcome[currentState] || currentState;
    
    if (currentState === 'semiconscious' || currentState === 'coma') {
      messages.push(`<br><strong>Fatigue:</strong> ${this.formatFatigueState(currentState)}`);
      messages.push(`<span style="color:#cc0000;">⚠ No recovery possible from ${this.formatFatigueState(currentState)} with rest alone.</span>`);
      messages.push(`<em>A Cure Fatigue spell is required to recover from this state.</em>`);
    } else if (newState !== currentState) {
      const hoursNeeded = recoveryTimes[currentState];
      const hoursRemaining = Math.max(0, hoursNeeded - 8);
      this.setFatigueState(newState, true);
      messages.push(`<br><strong>Fatigue recovery:</strong> ${this.formatFatigueState(currentState)} → ${this.formatFatigueState(newState)}`);
      if (hoursRemaining > 0) {
        messages.push(`<em>(${hoursRemaining} hours of recovery time remaining)</em>`);
      }
    } else {
      messages.push(`<br><strong>Fatigue:</strong> Already ${this.formatFatigueState(currentState)}`);
    }
    
    // Reset Berserk Rage uses if character has the ability
    if (this.hasAbility('berserk rage')) {
      const con = parseInt(this.character.attributes.CON, 10) || 10;
      const maxUses = Math.ceil(con / 4);
      const previousUses = this.rageUsesRemaining || 0;
      this.rageUsesRemaining = maxUses;
      this.character.rageUsesRemaining = maxUses;
      this.updateBerserkRageDisplay();
      if (previousUses < maxUses) {
        messages.push(`<br><strong>Berserk Rage uses restored:</strong> ${previousUses} → ${maxUses}`);
      } else {
        messages.push(`<br><strong>Berserk Rage uses:</strong> Already at maximum (${maxUses})`);
      }
    }
    
    // Show the Long Rest result modal
    this.showLongRestResult(messages.join('<br>'));
  },

  /**
   * Show Long Rest result in a simple modal/alert
   */
  showLongRestResult(message) {
    // Create or get the long rest result modal
    let overlay = document.getElementById('long-rest-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'long-rest-modal-overlay';
      overlay.className = 'long-rest-modal-overlay';
      overlay.innerHTML = `
        <div class="long-rest-modal">
          <div class="long-rest-modal-header">
            <h3>⛺ Long Rest (8 hours)</h3>
            <button class="long-rest-modal-close">&times;</button>
          </div>
          <div class="long-rest-modal-body" id="long-rest-modal-body">
          </div>
          <div class="long-rest-modal-footer">
            <button class="btn btn-primary" id="btn-close-long-rest">Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      // Add event listeners
      overlay.querySelector('.long-rest-modal-close').addEventListener('click', () => {
        this.closeLongRestModal();
      });
      overlay.querySelector('#btn-close-long-rest').addEventListener('click', () => {
        this.closeLongRestModal();
      });
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeLongRestModal();
        }
      });
    }
    
    // Set content and show
    document.getElementById('long-rest-modal-body').innerHTML = message;
    overlay.classList.add('active');
    
    // Refresh summary widgets
    this.refreshSummaryWidget('fatigue');
    this.refreshSummaryWidget('attributes');
    this.refreshSummaryWidget('berserk-rage');
  },

  /**
   * Close the Long Rest modal
   */
  closeLongRestModal() {
    const overlay = document.getElementById('long-rest-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  /**
   * Open the Short Rest modal
   */
  openShortRestModal() {
    const overlay = document.getElementById('short-rest-modal-overlay');
    if (overlay) {
      overlay.classList.add('active');
      // Clear any previous selection and result
      const radios = overlay.querySelectorAll('input[name="short-rest-action"]');
      radios.forEach(r => r.checked = false);
      const result = document.getElementById('short-rest-result');
      if (result) {
        result.classList.remove('active', 'success', 'info', 'warning');
        result.innerHTML = '';
      }
      
      // Show/hide spellcasting options based on character class
      const hasSpells = this.hasSpellcastingAbility();
      const spellOptions = ['pray-study', 'cast-spells', 'prepare-spell'];
      spellOptions.forEach(value => {
        const radio = overlay.querySelector(`input[name="short-rest-action"][value="${value}"]`);
        if (radio) {
          const optionLabel = radio.closest('.short-rest-option');
          if (optionLabel) {
            optionLabel.style.display = hasSpells ? '' : 'none';
          }
        }
      });
    }
  },

  /**
   * Close the Short Rest modal
   */
  closeShortRestModal() {
    const overlay = document.getElementById('short-rest-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  /**
   * Apply the selected Short Rest action
   */
  applyShortRestAction() {
    const selected = document.querySelector('input[name="short-rest-action"]:checked');
    if (!selected) {
      this.showShortRestResult('warning', 'Please select a Rest Action.');
      return;
    }

    const action = selected.value;
    const stateOrder = ['fresh', 'winded', 'tired', 'wearied', 'exhausted', 'debilitated', 'incapacitated', 'semiconscious', 'coma'];
    const currentState = this.character.fatigueState || 'fresh';
    const currentIndex = stateOrder.indexOf(currentState);
    
    // Index boundaries for fatigue levels
    const WINDED_INDEX = 1;
    const EXHAUSTED_INDEX = 4;

    switch (action) {
      case 'eat-ration': {
        // Remove one level if no greater than Exhausted (index <= 4)
        let messages = [];
        let newIndex = currentIndex;
        
        if (currentIndex <= EXHAUSTED_INDEX && currentIndex > 0) {
          newIndex = currentIndex - 1;
          messages.push(`Fatigue reduced from ${this.formatFatigueState(currentState)} to ${this.formatFatigueState(stateOrder[newIndex])}.`);
          
          // Bonus: if now no greater than Winded, remove another level
          if (newIndex <= WINDED_INDEX && newIndex > 0) {
            newIndex = newIndex - 1;
            messages.push(`Bonus recovery (non-strenuous): now ${this.formatFatigueState(stateOrder[newIndex])}.`);
          }
          
          this.setFatigueState(stateOrder[newIndex], true);
        } else if (currentIndex > EXHAUSTED_INDEX) {
          messages.push(`Cannot eat a ration while ${this.formatFatigueState(currentState)} (must be Exhausted or better).`);
        } else {
          messages.push('Already at Fresh - no fatigue to remove.');
        }
        
        messages.push('Hunger quelled.');
        this.showShortRestResult('success', messages.join('<br>'));
        break;
      }

      case 'pray-study': {
        // Regain 1 MP
        const mpCurrent = document.getElementById('magic-points-current');
        const mpMax = document.getElementById('magic-points-original');
        let messages = [];
        
        if (mpCurrent && mpMax) {
          const currentMP = parseInt(mpCurrent.value) || 0;
          const maxMP = parseInt(mpMax.dataset.originalValue || mpMax.value) || 0;
          
          if (currentMP < maxMP) {
            const newMP = currentMP + 1;
            mpCurrent.value = newMP;
            mpCurrent.dispatchEvent(new Event('input', { bubbles: true }));
            messages.push(`Regained 1 Magic Point (now ${newMP}/${maxMP}).`);
          } else {
            messages.push('Magic Points already at maximum.');
          }
        }
        
        // Remove fatigue if no greater than Winded
        if (currentIndex <= WINDED_INDEX && currentIndex > 0) {
          const newIndex = currentIndex - 1;
          this.setFatigueState(stateOrder[newIndex], true);
          messages.push(`Fatigue reduced to ${this.formatFatigueState(stateOrder[newIndex])} (non-strenuous activity).`);
        } else if (currentIndex > WINDED_INDEX) {
          messages.push(`No fatigue recovery (currently ${this.formatFatigueState(currentState)}, must be Winded or better).`);
        }
        
        this.showShortRestResult('success', messages.join('<br>'));
        break;
      }

      case 'tend-wounds': {
        this.showShortRestResult('info', 
          '<strong>Tend to Wounds:</strong><br>' +
          '• First Aid skill: 1 Rest Action (15 minutes)<br>' +
          '• Healing skill: 4 Rest Actions (1 hour)<br><br>' +
          '<em>This action does not remove Fatigue.</em>'
        );
        break;
      }

      case 'cast-spells': {
        this.showShortRestResult('info', 
          '<strong>Cast Spells:</strong><br>' +
          'You may cast any number of healing or buff spells, limited by available Magic Points.<br><br>' +
          '<em>This action does not remove Fatigue.</em>'
        );
        // Navigate to magic page after a brief delay
        setTimeout(() => {
          this.closeShortRestModal();
          this.navigateToPage('page-magic1');
        }, 1500);
        return; // Don't close modal immediately
      }

      case 'prepare-spell': {
        this.showShortRestResult('info', 
          '<strong>Prepare a New Spell:</strong><br>' +
          'Following at least 8 hours of sleep, you may memorize or forget an Arcane or Divine spell.<br><br>' +
          '<em>This action does not remove Fatigue.</em>'
        );
        // Navigate to magic page after a brief delay
        setTimeout(() => {
          this.closeShortRestModal();
          this.navigateToPage('page-magic1');
        }, 1500);
        return; // Don't close modal immediately
      }

      case 'dither': {
        let messages = [];
        
        // Remove fatigue if no greater than Winded
        if (currentIndex <= WINDED_INDEX && currentIndex > 0) {
          const newIndex = currentIndex - 1;
          this.setFatigueState(stateOrder[newIndex], true);
          messages.push(`Fatigue reduced to ${this.formatFatigueState(stateOrder[newIndex])} (non-strenuous activity).`);
        } else if (currentIndex > WINDED_INDEX) {
          messages.push(`No fatigue recovery (currently ${this.formatFatigueState(currentState)}, must be Winded or better).`);
        } else {
          messages.push('Already at Fresh - nothing to do but wait.');
        }
        
        messages.push('You waste 15 minutes doing nothing useful.');
        this.showShortRestResult('success', messages.join('<br>'));
        break;
      }
    }

    // Close modal after a brief delay to show result
    setTimeout(() => {
      this.closeShortRestModal();
    }, 2000);
  },

  /**
   * Show a result message in the Short Rest modal
   */
  showShortRestResult(type, message) {
    const result = document.getElementById('short-rest-result');
    if (result) {
      result.className = 'short-rest-result active ' + type;
      result.innerHTML = message;
    }
  },

  /**
   * Format fatigue state for display
   */
  formatFatigueState(state) {
    const labels = {
      fresh: 'Fresh', winded: 'Winded', tired: 'Tired', wearied: 'Wearied',
      exhausted: 'Exhausted', debilitated: 'Debilitated', incapacitated: 'Incapacitated',
      semiconscious: 'Semi-conscious', coma: 'Coma'
    };
    return labels[state] || state;
  },

  /**
   * Check if character has spellcasting ability (based on class selection)
   */
  hasSpellcastingAbility() {
    const MAGIC_CLASSES = ['cleric', 'ranger', 'paladin', 'anti-paladin', 'druid', 'mage', 'sorcerer', 'bard'];
    
    const classes = [
      document.getElementById('class-primary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-secondary')?.value?.trim().toLowerCase() || '',
      document.getElementById('class-tertiary')?.value?.trim().toLowerCase() || ''
    ].filter(c => c);
    
    return classes.some(c => MAGIC_CLASSES.includes(c));
  },

  /**
   * Navigate to a specific page
   */
  navigateToPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      // Save scroll position of current page before switching
      if (this.currentPageId) {
        this.pageScrollPositions[this.currentPageId] = window.scrollY;
      }
      
      // Hide all pages
      document.querySelectorAll('.sheet-page').forEach(page => {
        page.classList.remove('active');
      });
      // Show target page
      targetPage.classList.add('active');
      // Update nav
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) {
          btn.classList.add('active');
        }
      });
      
      // Extract page name from pageId (e.g., 'page-magic1' -> 'magic1')
      const pageName = pageId.replace('page-', '');
      this.currentPageId = pageName;
      
      // Restore scroll position for target page (or scroll to top if none saved)
      const savedScroll = this.pageScrollPositions[pageName];
      if (savedScroll !== undefined) {
        window.scrollTo(0, savedScroll);
      } else {
        window.scrollTo(0, 0);
      }
      
      // Store current page
      try {
        localStorage.setItem('mythras-current-page', pageName);
      } catch (e) {}
      
      // If navigating to magic pages, sync professional skill values
      if (pageId === 'page-magic1' || pageId === 'page-magic2') {
        this.syncProfessionalSkillsToMagicPage();
      }
    }
  },

  /**
   * Ensure all penalty-eligible fields have dataset.originalValue set.
   * Called once on load after populateForm.
   */
  initializeOriginalValues() {
    // Standard skills
    document.querySelectorAll('.skill-input').forEach(input => {
      if (input.value && input.dataset.originalValue === undefined) {
        input.dataset.originalValue = input.value;
      }
    });
    
    // Professional skills
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const input = document.getElementById(`prof-skill-${i}-current`);
      if (input && input.value && input.dataset.originalValue === undefined) {
        input.dataset.originalValue = input.value;
      }
    }
    
    // Combat skills
    ['combat-skill-1-percent', 'unarmed-percent'].forEach(id => {
      const input = document.getElementById(id);
      if (input && input.value && input.dataset.originalValue === undefined) {
        input.dataset.originalValue = input.value;
      }
    });
    
    // Magic skills
    const magicSkillIds = [
      'channel-percent', 'piety-percent', 
      'arcane-casting-percent', 'arcane-knowledge-percent',
      'arcane-sorcery-percent', 'sorcerous-wisdom-percent',
      'musicianship-percent', 'lyrical-magic-percent'
    ];
    magicSkillIds.forEach(id => {
      const input = document.getElementById(id);
      if (input && input.value && input.dataset.originalValue === undefined) {
        input.dataset.originalValue = input.value;
      }
    });
    
    // Initiative
    const initCurrent = document.getElementById('initiative-current');
    if (initCurrent && initCurrent.value && initCurrent.dataset.originalValue === undefined) {
      initCurrent.dataset.originalValue = initCurrent.value;
    }
    
    // Movement
    const moveCurrent = document.getElementById('movement-current');
    if (moveCurrent && moveCurrent.value && moveCurrent.dataset.originalValue === undefined) {
      moveCurrent.dataset.originalValue = moveCurrent.value;
    }
    
    // Action Points
    const apOriginal = document.getElementById('action-points-original');
    if (apOriginal && apOriginal.value && apOriginal.dataset.originalValue === undefined) {
      apOriginal.dataset.originalValue = apOriginal.value;
    }
    const apCurrent = document.getElementById('action-points-current');
    if (apCurrent && apCurrent.value && apCurrent.dataset.originalValue === undefined) {
      apCurrent.dataset.originalValue = apCurrent.value;
    }
  },

  /**
   * Get current ENC status. Centralized helper.
   */
  getCurrentEncStatus() {
    if (!this.character.encAutomation) {
      return { name: 'Unburdened', penaltyPercent: 0, initiativePenalty: 0, movementPenalty: 0 };
    }
    const totalEnc = parseFloat(document.getElementById('total-enc')?.textContent) || 0;
    const STR = parseInt(this.character.attributes?.STR) || 0;
    return Calculator.getEncStatus(totalEnc, STR);
  },

  /**
   * CENTRAL PENALTY ENGINE
   * Applies both ENC and Fatigue penalties to all affected fields.
   * Called whenever ENC or Fatigue state changes.
   */
  applyAllPenalties() {
    const encStatus = this.getCurrentEncStatus();
    const fatigueState = this.character.fatigueState || 'fresh';
    const fatigue = FATIGUE_PENALTIES[fatigueState] || FATIGUE_PENALTIES.fresh;
    
    const encHasPenalty = (encStatus.name === 'Burdened' || encStatus.name === 'Overburdened');
    const encPenaltyPercent = encHasPenalty ? (encStatus.penaltyPercent || 0) : 0;
    const encIsBurdened = encStatus.name === 'Burdened';
    
    const fatigueHasPenalty = fatigue.skillPenalty > 0;
    const fatigueSevere = fatigue.skillPenalty >= 60; // Herculean or worse
    
    // --- SKILLS ---
    this.applySkillPenalties(encPenaltyPercent, encIsBurdened, encHasPenalty, fatigue);
    
    // --- INITIATIVE ---
    this.applyInitiativePenalty(encStatus, fatigue);
    
    // --- MOVEMENT ---
    this.applyMovementPenalty(encStatus, fatigue);
    
    // --- ACTION POINTS ---
    this.applyActionPointPenalty(fatigue);
    
    // --- Update combat quick ref ---
    this.updateCombatQuickRef();
  },

  /**
   * Apply combined ENC + Fatigue penalties to all skill fields
   */
  applySkillPenalties(encPenaltyPercent, encIsBurdened, encHasPenalty, fatigue) {
    const fatigueSkillPenalty = fatigue.skillPenalty || 0;
    const fatigueSevere = fatigueSkillPenalty >= 60;
    const fatigueActive = fatigueSkillPenalty > 0;
    
    // --- Standard Skills ---
    document.querySelectorAll('.skill-row').forEach(row => {
      const hasEncIndicator = row.querySelector('.enc-indicator') !== null;
      const input = row.querySelector('.skill-input');
      if (!input) return;
      
      // Store original if not set
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || 0;
      const encPenalty = hasEncIndicator ? encPenaltyPercent : 0;
      const totalPenalty = encPenalty + fatigueSkillPenalty;
      const hasPenalty = totalPenalty > 0 && originalValue > 0;
      
      // Clear previous penalty classes
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
      
      if (hasPenalty) {
        const penalizedValue = Math.max(0, originalValue - totalPenalty);
        input.value = penalizedValue;
        
        // Build tooltip
        let tooltipParts = [`Original: ${originalValue}%`];
        if (encPenalty > 0) tooltipParts.push(`ENC: -${encPenalty}%`);
        if (fatigueSkillPenalty > 0) tooltipParts.push(`Fatigue (${fatigue.skillGrade}): -${fatigueSkillPenalty}%`);
        tooltipParts.push(`Effective: ${penalizedValue}%`);
        input.title = tooltipParts.join(', ');
        
        // Apply appropriate CSS classes
        if (encPenalty > 0) {
          input.classList.add('enc-penalized-value');
          if (encIsBurdened) input.classList.add('enc-burdened-penalty');
        }
        if (fatigueActive) {
          input.classList.add('fatigue-penalized');
          if (fatigueSevere) input.classList.add('fatigue-severe');
        }
        if (!fatigue.canAct) {
          input.classList.add('fatigue-incapacitated');
        }
      } else if (input.dataset.originalValue !== undefined) {
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    });
    
    // --- Professional Skills ---
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const encIndicator = document.getElementById(`prof-skill-${i}-enc`);
      const hasEncIndicator = encIndicator && encIndicator.style.display !== 'none';
      const input = document.getElementById(`prof-skill-${i}-current`);
      if (!input) continue;
      
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || 0;
      const encPenalty = hasEncIndicator ? encPenaltyPercent : 0;
      const totalPenalty = encPenalty + fatigueSkillPenalty;
      const hasPenalty = totalPenalty > 0 && originalValue > 0;
      
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
      
      if (hasPenalty) {
        const penalizedValue = Math.max(0, originalValue - totalPenalty);
        input.value = penalizedValue;
        
        let tooltipParts = [`Original: ${originalValue}%`];
        if (encPenalty > 0) tooltipParts.push(`ENC: -${encPenalty}%`);
        if (fatigueSkillPenalty > 0) tooltipParts.push(`Fatigue (${fatigue.skillGrade}): -${fatigueSkillPenalty}%`);
        tooltipParts.push(`Effective: ${penalizedValue}%`);
        input.title = tooltipParts.join(', ');
        
        if (encPenalty > 0) {
          input.classList.add('enc-penalized-value');
          if (encIsBurdened) input.classList.add('enc-burdened-penalty');
        }
        if (fatigueActive) {
          input.classList.add('fatigue-penalized');
          if (fatigueSevere) input.classList.add('fatigue-severe');
        }
        if (!fatigue.canAct) input.classList.add('fatigue-incapacitated');
      } else if (input.dataset.originalValue !== undefined) {
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    }
    
    // --- Combat Skills (STR+DEX based, always ENC-affected; fatigue affects all) ---
    const combatSkillInputs = document.querySelectorAll('.enc-affected-combat');
    combatSkillInputs.forEach(input => {
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || 0;
      const totalPenalty = encPenaltyPercent + fatigueSkillPenalty;
      const hasPenalty = totalPenalty > 0 && originalValue > 0;
      
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
      
      if (hasPenalty) {
        const penalizedValue = Math.max(0, originalValue - totalPenalty);
        input.value = penalizedValue;
        
        let tooltipParts = [`Original: ${originalValue}%`];
        if (encPenaltyPercent > 0) tooltipParts.push(`ENC: -${encPenaltyPercent}%`);
        if (fatigueSkillPenalty > 0) tooltipParts.push(`Fatigue (${fatigue.skillGrade}): -${fatigueSkillPenalty}%`);
        tooltipParts.push(`Effective: ${penalizedValue}%`);
        input.title = tooltipParts.join(', ');
        
        if (encPenaltyPercent > 0) {
          input.classList.add('enc-penalized-value');
          if (encIsBurdened) input.classList.add('enc-burdened-penalty');
        }
        if (fatigueActive) {
          input.classList.add('fatigue-penalized');
          if (fatigueSevere) input.classList.add('fatigue-severe');
        }
        if (!fatigue.canAct) input.classList.add('fatigue-incapacitated');
      } else if (input.dataset.originalValue !== undefined) {
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    });
    
    // --- Magic Skills (no ENC penalty, only fatigue) ---
    const magicSkillIds = [
      'channel-percent', 'piety-percent', 
      'arcane-casting-percent', 'arcane-knowledge-percent',
      'arcane-sorcery-percent', 'sorcerous-wisdom-percent',
      'musicianship-percent', 'lyrical-magic-percent'
    ];
    
    magicSkillIds.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      
      if (input.dataset.originalValue === undefined && input.value) {
        input.dataset.originalValue = input.value;
      }
      
      const originalValue = parseInt(input.dataset.originalValue) || 0;
      const totalPenalty = fatigueSkillPenalty; // No ENC penalty for magic skills
      const hasPenalty = totalPenalty > 0 && originalValue > 0;
      
      input.classList.remove('enc-penalized-value', 'enc-burdened-penalty', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
      
      if (hasPenalty) {
        const penalizedValue = Math.max(0, originalValue - totalPenalty);
        input.value = penalizedValue;
        
        let tooltipParts = [`Original: ${originalValue}%`];
        if (fatigueSkillPenalty > 0) tooltipParts.push(`Fatigue (${fatigue.skillGrade}): -${fatigueSkillPenalty}%`);
        tooltipParts.push(`Effective: ${penalizedValue}%`);
        input.title = tooltipParts.join(', ');
        
        if (fatigueActive) {
          input.classList.add('fatigue-penalized');
          if (fatigueSevere) input.classList.add('fatigue-severe');
        }
        if (!fatigue.canAct) input.classList.add('fatigue-incapacitated');
      } else if (input.dataset.originalValue !== undefined) {
        input.value = input.dataset.originalValue;
        input.title = '';
      }
    });
  },

  /**
   * Apply combined ENC + Fatigue penalty to Initiative
   */
  applyInitiativePenalty(encStatus, fatigue) {
    const initCurrent = document.getElementById('initiative-current');
    if (!initCurrent) return;
    
    if (initCurrent.dataset.originalValue === undefined && initCurrent.value) {
      initCurrent.dataset.originalValue = initCurrent.value;
    }
    
    const originalInit = parseInt(initCurrent.dataset.originalValue) || 0;
    const encInitPenalty = encStatus.initiativePenalty || 0;
    const fatigueInitPenalty = fatigue.canAct ? (fatigue.initiativePenalty || 0) : originalInit; // if can't act, zero it
    const totalPenalty = encInitPenalty + fatigueInitPenalty;
    const hasPenalty = totalPenalty > 0;
    
    const encHasPenalty = (encStatus.name === 'Burdened' || encStatus.name === 'Overburdened');
    const penaltyClass = encStatus.name === 'Burdened' ? 'burdened' : 'overburdened';
    
    initCurrent.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
    
    if (hasPenalty) {
      const penalizedInit = fatigue.canAct ? Math.max(0, originalInit - totalPenalty) : 0;
      initCurrent.value = penalizedInit;
      
      let tooltipParts = [`Original: ${originalInit}`];
      if (encInitPenalty > 0) tooltipParts.push(`ENC: -${encInitPenalty}`);
      if (fatigue.initiativePenalty > 0) tooltipParts.push(`Fatigue: -${fatigue.initiativePenalty}`);
      if (!fatigue.canAct) tooltipParts.push('Fatigue: Incapacitated');
      initCurrent.title = tooltipParts.join(', ');
      
      if (encHasPenalty && encInitPenalty > 0) {
        initCurrent.classList.add('enc-penalty-init-move', penaltyClass);
      }
      if (fatigue.initiativePenalty > 0 || !fatigue.canAct) {
        initCurrent.classList.add('fatigue-penalized');
        if (fatigue.skillPenalty >= 60) initCurrent.classList.add('fatigue-severe');
        if (!fatigue.canAct) initCurrent.classList.add('fatigue-incapacitated');
      }
    } else {
      initCurrent.value = initCurrent.dataset.originalValue;
      initCurrent.title = '';
    }
  },

  /**
   * Apply combined ENC + Fatigue penalty to Movement
   * Order: Start with original → subtract ENC → apply fatigue modifier
   */
  applyMovementPenalty(encStatus, fatigue) {
    const moveCurrent = document.getElementById('movement-current');
    if (!moveCurrent) return;
    
    if (moveCurrent.dataset.originalValue === undefined && moveCurrent.value) {
      moveCurrent.dataset.originalValue = moveCurrent.value;
    }
    
    const originalMove = parseInt(moveCurrent.dataset.originalValue) || 0;
    const encMovePenalty = encStatus.movementPenalty || 0;
    
    // Step 1: Apply ENC (flat subtraction)
    const afterEnc = Math.max(0, originalMove - encMovePenalty);
    
    // Step 2: Apply Fatigue on the ENC-adjusted value
    let finalMove = afterEnc;
    switch (fatigue.movementType) {
      case 'none':
        finalMove = afterEnc;
        break;
      case 'flat':
        finalMove = Math.max(0, afterEnc - fatigue.movementFlat);
        break;
      case 'halve':
        finalMove = Math.max(0, Math.floor(afterEnc / 2));
        break;
      case 'zero':
        finalMove = 0;
        break;
    }
    
    const encHasPenalty = (encStatus.name === 'Burdened' || encStatus.name === 'Overburdened');
    const penaltyClass = encStatus.name === 'Burdened' ? 'burdened' : 'overburdened';
    const hasPenalty = (encMovePenalty > 0) || (fatigue.movementType !== 'none');
    
    moveCurrent.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
    
    if (hasPenalty) {
      moveCurrent.value = finalMove;
      
      let tooltipParts = [`Original: ${originalMove}'`];
      if (encMovePenalty > 0) tooltipParts.push(`ENC: -${encMovePenalty}'`);
      if (fatigue.movementType === 'flat') tooltipParts.push(`Fatigue: -${fatigue.movementFlat}'`);
      else if (fatigue.movementType === 'halve') tooltipParts.push('Fatigue: halved');
      else if (fatigue.movementType === 'zero') tooltipParts.push('Fatigue: immobile');
      tooltipParts.push(`Effective: ${finalMove}'`);
      moveCurrent.title = tooltipParts.join(', ');
      
      if (encHasPenalty && encMovePenalty > 0) {
        moveCurrent.classList.add('enc-penalty-init-move', penaltyClass);
      }
      if (fatigue.movementType !== 'none') {
        moveCurrent.classList.add('fatigue-penalized');
        if (fatigue.skillPenalty >= 60) moveCurrent.classList.add('fatigue-severe');
        if (!fatigue.canAct) moveCurrent.classList.add('fatigue-incapacitated');
      }
      
      // Update movement speed display
      this.updateMovementDisplayWithCombinedPenalty(finalMove, encHasPenalty, fatigue);
    } else {
      moveCurrent.value = moveCurrent.dataset.originalValue;
      moveCurrent.title = '';
      this.updateMovementDisplay();
    }
  },

  /**
   * Update movement speed display with combined ENC + Fatigue styling
   */
  updateMovementDisplayWithCombinedPenalty(baseMove, encHasPenalty, fatigue) {
    const speeds = Calculator.calculateMovement(baseMove);
    
    const elements = ['walk-speed', 'run-speed', 'sprint-speed', 'swim-speed', 'climb-speed']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    
    const penaltyClass = encHasPenalty ? 'burdened' : '';
    
    elements.forEach(el => {
      el.classList.remove('enc-penalty-init-move', 'burdened', 'overburdened', 'fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
      if (encHasPenalty) el.classList.add('enc-penalty-init-move', penaltyClass);
      if (fatigue.movementType !== 'none') {
        el.classList.add('fatigue-penalized');
        if (fatigue.skillPenalty >= 60) el.classList.add('fatigue-severe');
        if (!fatigue.canAct) el.classList.add('fatigue-incapacitated');
      }
    });
    
    const walkEl = document.getElementById('walk-speed');
    const runEl = document.getElementById('run-speed');
    const sprintEl = document.getElementById('sprint-speed');
    const swimEl = document.getElementById('swim-speed');
    const climbEl = document.getElementById('climb-speed');
    
    if (walkEl) walkEl.textContent = `${speeds.walk}'`;
    if (runEl) runEl.textContent = `${speeds.run}'`;
    if (sprintEl) sprintEl.textContent = `${speeds.sprint}'`;
    if (swimEl) swimEl.textContent = `${speeds.swim}'`;
    if (climbEl) climbEl.textContent = `${speeds.climb}'`;
  },

  /**
   * Apply Fatigue penalty to Action Points
   */
  applyActionPointPenalty(fatigue) {
    const apOriginal = document.getElementById('action-points-original');
    const apCurrent = document.getElementById('action-points-current');
    if (!apOriginal || !apCurrent) return;
    
    // Store original max AP
    if (apOriginal.dataset.originalValue === undefined && apOriginal.value) {
      apOriginal.dataset.originalValue = apOriginal.value;
    }
    if (apCurrent.dataset.originalValue === undefined && apCurrent.value) {
      apCurrent.dataset.originalValue = apCurrent.value;
    }
    
    const originalMax = parseInt(apOriginal.dataset.originalValue) || 2;
    const originalCurrent = parseInt(apCurrent.dataset.originalValue) || originalMax;
    const apPenalty = fatigue.canAct ? (fatigue.apPenalty || 0) : originalMax;
    
    apOriginal.classList.remove('fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
    apCurrent.classList.remove('fatigue-penalized', 'fatigue-severe', 'fatigue-incapacitated');
    
    if (apPenalty > 0) {
      const newMax = fatigue.canAct ? Math.max(0, originalMax - apPenalty) : 0;
      const newCurrent = Math.min(originalCurrent, newMax);
      
      apOriginal.value = newMax;
      apCurrent.value = newCurrent;
      
      apOriginal.title = `Original Max: ${originalMax}, Fatigue: -${fatigue.canAct ? apPenalty : 'All'}`;
      apOriginal.classList.add('fatigue-penalized');
      apCurrent.classList.add('fatigue-penalized');
      if (fatigue.skillPenalty >= 60) {
        apOriginal.classList.add('fatigue-severe');
        apCurrent.classList.add('fatigue-severe');
      }
      if (!fatigue.canAct) {
        apOriginal.classList.add('fatigue-incapacitated');
        apCurrent.classList.add('fatigue-incapacitated');
      }
    } else {
      // Restore originals
      apOriginal.value = apOriginal.dataset.originalValue;
      apCurrent.value = apCurrent.dataset.originalValue;
      apOriginal.title = '';
    }
  },
  camelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  },

  /**
   * Utility: Convert camelCase to kebab-case
   */
  kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  
  /**
   * Utility: Convert string to Title Case
   * Preserves parenthetical parts and handles special cases like Roman numerals
   */
  toTitleCase(str) {
    if (!str) return '';
    
    // Words that should stay lowercase (unless first word)
    const lowercaseWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in', 'with', 'vs'];
    
    // Words that should stay uppercase (Roman numerals, abbreviations)
    const uppercaseWords = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'];
    
    return str.split(' ').map((word, index) => {
      // Handle parenthetical parts
      if (word.startsWith('(')) {
        const inner = word.slice(1);
        return '(' + this.toTitleCase(inner);
      }
      if (word.endsWith(')')) {
        const inner = word.slice(0, -1);
        return this.toTitleCase(inner) + ')';
      }
      
      const lowerWord = word.toLowerCase();
      
      // Check for Roman numerals
      if (uppercaseWords.includes(lowerWord)) {
        return word.toUpperCase();
      }
      
      // First word is always capitalized
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      
      // Lowercase words stay lowercase (unless first)
      if (lowercaseWords.includes(lowerWord)) {
        return lowerWord;
      }
      
      // Normal capitalization
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  },
  
  // ==================== SUMMARY PAGE ====================
  
  /**
   * Available widget definitions
   */
  summaryWidgets: {
    'character-info': {
      name: 'Character Info',
      icon: '👤',
      render: () => {
        const name = document.getElementById('character-name')?.value || 'Unnamed';
        const species = document.getElementById('species')?.value || '-';
        const culture = document.getElementById('culture')?.value || '-';
        const primaryClass = document.getElementById('class-primary')?.value || '-';
        const rank = document.getElementById('rank-primary')?.value || '0';
        const rankName = document.getElementById('rank-name')?.value || '-';
        const height = document.getElementById('height')?.value || '-';
        const weight = document.getElementById('weight')?.value || '-';
        const age = document.getElementById('age')?.value || '-';
        const handedness = document.getElementById('handedness')?.value || '-';
        const hair = document.getElementById('hair')?.value || '-';
        const eyes = document.getElementById('eyes')?.value || '-';
        const expRolls = document.getElementById('exp-rolls')?.value || '0';
        const tenacityCurrent = document.getElementById('tenacity-current')?.value || '-';
        const tenacityMax = document.getElementById('tenacity-max')?.value || '-';
        
        return `
          <h4>Character Info</h4>
          <div class="stat-row"><span class="stat-label">Name:</span><span class="stat-value">${name}</span></div>
          <div class="stat-row"><span class="stat-label">Species:</span><span class="stat-value">${species}</span></div>
          <div class="stat-row"><span class="stat-label">Culture:</span><span class="stat-value">${culture}</span></div>
          <div class="stat-row"><span class="stat-label">Class:</span><span class="stat-value">${primaryClass} (Rank ${rank})</span></div>
          <div class="stat-row"><span class="stat-label">Rank Name:</span><span class="stat-value">${rankName}</span></div>
          <div class="stat-row"><span class="stat-label">Height:</span><span class="stat-value">${height}</span></div>
          <div class="stat-row"><span class="stat-label">Weight:</span><span class="stat-value">${weight}</span></div>
          <div class="stat-row"><span class="stat-label">Age:</span><span class="stat-value">${age}</span></div>
          <div class="stat-row"><span class="stat-label">Handedness:</span><span class="stat-value">${handedness}</span></div>
          <div class="stat-row"><span class="stat-label">Hair:</span><span class="stat-value">${hair}</span></div>
          <div class="stat-row"><span class="stat-label">Eyes:</span><span class="stat-value">${eyes}</span></div>
          <hr style="border:none;border-top:1px solid #ccc;margin:8px 0;">
          <div class="stat-row">
            <span class="stat-label">EXP Rolls:</span>
            <span class="stat-value-bold">${expRolls}</span>
            <button type="button" class="btn btn-small widget-exp-btn" style="margin-left:8px;font-size:0.7rem;padding:2px 6px;">Spend EXP</button>
          </div>
          <div class="stat-row"><span class="stat-label">Tenacity:</span><span class="stat-value">${tenacityCurrent} / ${tenacityMax}</span></div>
        `;
      }
    },
    'characteristics': {
      name: 'Characteristics',
      icon: '💪',
      render: () => {
        const chars = ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA'];
        let boxes = '';
        chars.forEach(c => {
          const val = document.getElementById(`${c.toLowerCase()}-value`)?.value || '-';
          boxes += `<div class="stat-box"><div class="label">${c}</div><div class="value">${val}</div></div>`;
        });
        return `<h4>Characteristics</h4><div class="stat-grid">${boxes}</div>`;
      }
    },
    'attributes': {
      name: 'Attributes',
      icon: '📊',
      render: () => {
        const ap = document.getElementById('action-points-current')?.value || '-';
        const dmg = document.getElementById('damage-mod-current')?.value || '-';
        const init = document.getElementById('initiative-current')?.value || '-';
        const luck = document.getElementById('luck-current')?.value || '-';
        const mp = document.getElementById('magic-points-current')?.value || '-';
        return `
          <h4>Attributes</h4>
          <div class="stat-row"><span class="stat-label">Action Points:</span><span class="stat-value-bold">${ap}</span></div>
          <div class="stat-row"><span class="stat-label">Damage Modifier:</span><span class="stat-value-bold">${dmg}</span></div>
          <div class="stat-row"><span class="stat-label">Initiative:</span><span class="stat-value-bold">${init}</span></div>
          <div class="stat-row"><span class="stat-label">Luck Points:</span><span class="stat-value-bold">${luck}</span></div>
          <div class="stat-row"><span class="stat-label">Magic Points:</span><span class="stat-value-bold">${mp}</span></div>
        `;
      }
    },
    'hp-overview': {
      name: 'Hit Points',
      icon: '❤️',
      render: () => {
        let html = '<h4>Hit Points</h4><div class="hp-overview">';
        for (let i = 0; i < 7; i++) {
          const hp = document.getElementById(`loc-${i}-hp`)?.value || '-';
          const current = document.getElementById(`loc-${i}-current`)?.value || hp;
          const locNames = ['R.Leg', 'L.Leg', 'Abdom', 'Chest', 'R.Arm', 'L.Arm', 'Head'];
          const damaged = current !== hp && current !== '' && hp !== '';
          html += `<div class="hp-location${damaged ? ' damaged' : ''}">
            <div class="loc-name">${locNames[i] || 'Loc'}</div>
            <div class="loc-hp">${current}/${hp}</div>
          </div>`;
        }
        html += '</div>';
        return html;
      }
    },
    'combat': {
      name: 'Combat',
      icon: '⚔️',
      render: () => {
        // Get combat stats
        const initiative = document.getElementById('initiative-current')?.value || '-';
        const actionPointsMax = document.getElementById('action-points-original')?.value || '2';
        const actionPointsCurrent = document.getElementById('action-points-current')?.value || actionPointsMax;
        const luckPointsMax = document.getElementById('luck-original')?.value || '2';
        const luckPointsCurrent = document.getElementById('luck-current')?.value || luckPointsMax;
        const magicPointsMax = document.getElementById('magic-points-original')?.value || '0';
        const magicPointsCurrent = document.getElementById('magic-points-current')?.value || magicPointsMax;
        
        const combatName = document.getElementById('combat-skill-1-name')?.value || 'Combat Style';
        const combatPct = document.getElementById('combat-skill-1-percent')?.value || '-';
        const unarmedPct = document.getElementById('unarmed-percent')?.value || '-';
        
        let html = `
          <h4>Combat</h4>
          <div class="combat-stats-grid two-col">
            <div class="combat-stat">
              <span class="stat-label">Initiative</span>
              <span class="stat-value">${initiative}</span>
            </div>
            <div class="combat-stat editable">
              <span class="stat-label">Action Pts</span>
              <div class="stat-spinner">
                <button class="spin-btn spin-down" data-target="action-points-current" data-max="${actionPointsMax}">−</button>
                <span class="stat-value" id="summary-ap">${actionPointsCurrent}</span>
                <button class="spin-btn spin-up" data-target="action-points-current" data-max="${actionPointsMax}">+</button>
              </div>
            </div>
            <div class="combat-stat editable">
              <span class="stat-label">Luck Pts</span>
              <div class="stat-spinner">
                <button class="spin-btn spin-down" data-target="luck-current" data-max="${luckPointsMax}">−</button>
                <span class="stat-value" id="summary-luck">${luckPointsCurrent}</span>
                <button class="spin-btn spin-up" data-target="luck-current" data-max="${luckPointsMax}">+</button>
              </div>
            </div>
            <div class="combat-stat editable">
              <span class="stat-label">Magic Pts</span>
              <div class="stat-spinner">
                <button class="spin-btn spin-down" data-target="magic-points-current" data-max="${magicPointsMax}">−</button>
                <span class="stat-value" id="summary-mp">${magicPointsCurrent}</span>
                <button class="spin-btn spin-up" data-target="magic-points-current" data-max="${magicPointsMax}">+</button>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid var(--border-light); margin:8px 0;"></div>
          <div class="combat-skill-header"><span>Combat Skill</span><span>%</span></div>
          <div class="skill-list">
            <div class="skill-item"><span>${combatName}</span><span class="skill-roll">${combatPct}% <button class="d100-btn" data-skill="${combatName}" data-target="${combatPct}" title="Roll a d100!"><img src="images/d10.svg" alt="d10" class="d10-icon"></button></span></div>
            <div class="skill-item"><span>Unarmed</span><span class="skill-roll">${unarmedPct}% <button class="d100-btn" data-skill="Unarmed" data-target="${unarmedPct}" title="Roll a d100!"><img src="images/d10.svg" alt="d10" class="d10-icon"></button></span></div>
          </div>
        `;
        
        // Collect melee weapons
        let meleeWeapons = [];
        for (let i = 0; i < 6; i++) {
          const name = document.getElementById(`melee-${i}-name`)?.value;
          const dmg = document.getElementById(`melee-${i}-damage`)?.value;
          if (name) {
            meleeWeapons.push({ name, dmg });
          }
        }
        
        // Collect ranged weapons
        let rangedWeapons = [];
        for (let i = 0; i < 5; i++) {
          const name = document.getElementById(`ranged-${i}-name`)?.value;
          const dmg = document.getElementById(`ranged-${i}-damage`)?.value;
          if (name) {
            rangedWeapons.push({ name, dmg });
          }
        }
        
        // Unarmed damage
        const unarmedDmg = document.getElementById('unarmed-damage')?.value;
        
        // Melee section
        if (meleeWeapons.length > 0 || unarmedDmg) {
          html += `<div style="margin-top:8px; border-top:1px solid var(--border-light); padding-top:8px;">
            <div class="weapon-section-label">Melee</div>
            <div class="skill-list weapons-list">`;
          
          meleeWeapons.forEach(w => {
            if (w.dmg) {
              html += `<div class="skill-item weapon-row"><span>${w.name}</span><span class="damage-roll">${w.dmg} <button class="dice-btn" data-damage="${w.dmg}" title="Roll damage">🎲</button></span></div>`;
            } else {
              html += `<div class="skill-item"><span>${w.name}</span><span>-</span></div>`;
            }
          });
          
          // Add Unarmed to melee
          if (unarmedDmg) {
            html += `<div class="skill-item weapon-row"><span>Unarmed</span><span class="damage-roll">${unarmedDmg} <button class="dice-btn" data-damage="${unarmedDmg}" title="Roll damage">🎲</button></span></div>`;
          }
          
          html += '</div></div>';
        }
        
        // Ranged section
        if (rangedWeapons.length > 0) {
          html += `<div style="margin-top:8px; border-top:1px solid var(--border-light); padding-top:8px;">
            <div class="weapon-section-label">Ranged</div>
            <div class="skill-list weapons-list">`;
          
          rangedWeapons.forEach(w => {
            if (w.dmg) {
              html += `<div class="skill-item weapon-row"><span>${w.name}</span><span class="damage-roll">${w.dmg} <button class="dice-btn" data-damage="${w.dmg}" title="Roll damage">🎲</button></span></div>`;
            } else {
              html += `<div class="skill-item"><span>${w.name}</span><span>-</span></div>`;
            }
          });
          
          html += '</div></div>';
        }
        
        // No weapons message
        if (meleeWeapons.length === 0 && rangedWeapons.length === 0 && !unarmedDmg) {
          html += `<div style="margin-top:8px; border-top:1px solid var(--border-light); padding-top:8px;">
            <div class="skill-list weapons-list">
              <div class="skill-item"><span style="color:#999;">No weapons</span></div>
            </div>
          </div>`;
        }
        
        return html;
      }
    },
    'key-skills': {
      name: 'Key Standard Skills',
      icon: '🎯',
      render: () => {
        // Always include these skills
        const alwaysShow = ['athletics', 'brawn', 'endurance', 'evade', 'insight', 'perception', 'stealth', 'willpower'];
        const alwaysShowNames = {
          'athletics': 'Athletics', 'brawn': 'Brawn', 'endurance': 'Endurance', 
          'evade': 'Evade', 'insight': 'Insight', 'perception': 'Perception', 
          'stealth': 'Stealth', 'willpower': 'Willpower'
        };
        
        const skills = [];
        const addedSkills = new Set();
        
        // Add the always-show skills
        alwaysShow.forEach(id => {
          const val = parseInt(document.getElementById(`${id}-current`)?.value, 10) || 0;
          skills.push({ name: alwaysShowNames[id], val, required: true });
          addedSkills.add(id);
        });
        
        // Add other standard skills above 50%
        const otherStandard = [
          ['boating', 'Boating'], ['conceal', 'Conceal'], ['customs', 'Customs'],
          ['dance', 'Dance'], ['deceit', 'Deceit'], ['drive', 'Drive'],
          ['first-aid', 'First Aid'], ['influence', 'Influence'], ['locale', 'Locale'],
          ['ride', 'Ride'], ['sing', 'Sing'], ['swim', 'Swim']
        ];
        otherStandard.forEach(([id, name]) => {
          if (!addedSkills.has(id)) {
            const val = parseInt(document.getElementById(`${id}-current`)?.value, 10) || 0;
            if (val >= 50) {
              skills.push({ name, val, required: false });
              addedSkills.add(id);
            }
          }
        });
        
        // Sort alphabetically by name
        skills.sort((a, b) => a.name.localeCompare(b.name));
        
        let html = '<h4>Key Standard Skills</h4><div class="skill-list">';
        skills.forEach(s => {
          const dimmed = s.val < 50 ? ' color:#999;' : '';
          html += `<div class="skill-item"><span class="skill-name-bold">${s.name}</span><span class="skill-value-bold" style="${dimmed}">${s.val}%</span></div>`;
        });
        html += '</div>';
        return html;
      }
    },
    'professional-skills': {
      name: 'Professional Skills',
      icon: '📚',
      render: () => {
        const skills = [];
        
        // Check all professional skill slots
        for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
          const name = document.getElementById(`prof-skill-${i}-name`)?.value;
          const val = parseInt(document.getElementById(`prof-skill-${i}-current`)?.value, 10) || 0;
          if (name && name.trim()) {
            skills.push({ name: name.trim(), val });
          }
        }
        
        // Sort alphabetically by name
        skills.sort((a, b) => a.name.localeCompare(b.name));
        
        let html = '<h4>Professional Skills</h4><div class="skill-list">';
        if (skills.length === 0) {
          html += '<div class="skill-item"><span style="color:#999;">No professional skills</span></div>';
        } else {
          skills.forEach(s => {
            html += `<div class="skill-item"><span class="skill-name-bold">${s.name}</span><span class="skill-value-bold">${s.val}%</span></div>`;
          });
        }
        html += '</div>';
        return html;
      }
    },
    'magic-skills': {
      name: 'Magic Skills',
      icon: '✨',
      hasContent: () => {
        // Check if user has any magic class
        const classes = [
          document.getElementById('class-primary')?.value?.toLowerCase().trim() || '',
          document.getElementById('class-secondary')?.value?.toLowerCase().trim() || '',
          document.getElementById('class-tertiary')?.value?.toLowerCase().trim() || ''
        ].filter(c => c);
        
        const divineClasses = ['cleric', 'druid', 'paladin', 'ranger', 'monk', 'anti-paladin'];
        const arcaneClasses = ['mage'];
        const sorcererClasses = ['sorcerer'];
        const bardClasses = ['bard'];
        
        return classes.some(c => 
          divineClasses.includes(c) || 
          arcaneClasses.includes(c) || 
          sorcererClasses.includes(c) || 
          bardClasses.includes(c)
        );
      },
      render: () => {
        const classes = [
          document.getElementById('class-primary')?.value?.toLowerCase().trim() || '',
          document.getElementById('class-secondary')?.value?.toLowerCase().trim() || '',
          document.getElementById('class-tertiary')?.value?.toLowerCase().trim() || ''
        ].filter(c => c);
        
        const divineClasses = ['cleric', 'druid', 'paladin', 'ranger', 'monk', 'anti-paladin'];
        const arcaneClasses = ['mage'];
        const sorcererClasses = ['sorcerer'];
        const bardClasses = ['bard'];
        
        const hasDivine = classes.some(c => divineClasses.includes(c));
        const hasArcane = classes.some(c => arcaneClasses.includes(c));
        const hasSorcerer = classes.some(c => sorcererClasses.includes(c));
        const hasBard = classes.some(c => bardClasses.includes(c));
        
        let html = '<h4>Magic Skills</h4><div class="skill-list">';
        
        if (hasDivine) {
          const channel = document.getElementById('channel-percent')?.value || '-';
          const piety = document.getElementById('piety-percent')?.value || '-';
          html += `<div class="skill-item"><span>Channel</span><span>${channel}%</span></div>`;
          html += `<div class="skill-item"><span>Piety</span><span>${piety}%</span></div>`;
        }
        
        if (hasArcane) {
          const arcCast = document.getElementById('arcane-casting-percent')?.value || '-';
          const arcKnow = document.getElementById('arcane-knowledge-percent')?.value || '-';
          html += `<div class="skill-item"><span>Arcane Casting</span><span>${arcCast}%</span></div>`;
          html += `<div class="skill-item"><span>Arcane Knowledge</span><span>${arcKnow}%</span></div>`;
        }
        
        if (hasSorcerer) {
          const sorcery = document.getElementById('arcane-sorcery-percent')?.value || '-';
          const wisdom = document.getElementById('sorcerous-wisdom-percent')?.value || '-';
          html += `<div class="skill-item"><span>Arcane Sorcery</span><span>${sorcery}%</span></div>`;
          html += `<div class="skill-item"><span>Sorcerous Wisdom</span><span>${wisdom}%</span></div>`;
        }
        
        if (hasBard) {
          const music = document.getElementById('musicianship-percent')?.value || '-';
          const lyrical = document.getElementById('lyrical-magic-percent')?.value || '-';
          html += `<div class="skill-item"><span>Musicianship</span><span>${music}%</span></div>`;
          html += `<div class="skill-item"><span>Lyrical Magic</span><span>${lyrical}%</span></div>`;
        }
        
        if (!hasDivine && !hasArcane && !hasSorcerer && !hasBard) {
          html += '<div class="skill-item"><span>No magic class selected</span></div>';
        }
        
        html += '</div>';
        return html;
      }
    },
    'movement': {
      name: 'Movement',
      icon: '🏃',
      render: () => {
        const walk = document.getElementById('walk-speed')?.textContent || '-';
        const run = document.getElementById('run-speed')?.textContent || '-';
        const sprint = document.getElementById('sprint-speed')?.textContent || '-';
        const swim = document.getElementById('swim-speed')?.textContent || '-';
        const climb = document.getElementById('climb-speed')?.textContent || '-';
        const jumpV = document.getElementById('vertical-jump')?.textContent || '-';
        const jumpH = document.getElementById('horizontal-jump')?.textContent || '-';
        const fly = document.getElementById('flying-speed')?.value || '';
        
        let html = `
          <h4>Movement</h4>
          <div class="stat-row"><span class="stat-label">Walk:</span><span class="stat-value">${walk}</span></div>
          <div class="stat-row"><span class="stat-label">Run:</span><span class="stat-value">${run}</span></div>
          <div class="stat-row"><span class="stat-label">Sprint:</span><span class="stat-value">${sprint}</span></div>
          <div class="stat-row"><span class="stat-label">Swim:</span><span class="stat-value">${swim}</span></div>
          <div class="stat-row"><span class="stat-label">Climb:</span><span class="stat-value">${climb}</span></div>
          <hr style="border:none;border-top:1px solid #ccc;margin:6px 0;">
          <div class="stat-row"><span class="stat-label">Vertical Jump:</span><span class="stat-value">${jumpV}</span></div>
          <div class="stat-row"><span class="stat-label">Horizontal Jump:</span><span class="stat-value">${jumpH}</span></div>
        `;
        
        if (fly && fly.trim()) {
          html += `<div class="stat-row"><span class="stat-label">Fly:</span><span class="stat-value">${fly}</span></div>`;
        }
        
        return html;
      }
    },
    'encumbrance': {
      name: 'Encumbrance',
      icon: '🎒',
      render: () => {
        const totalEnc = document.getElementById('total-enc')?.textContent || '0';
        const statusEl = document.getElementById('enc-status');
        const statusText = statusEl?.textContent || 'Unknown';
        
        // Determine status color
        let statusColor = '#228b22'; // Green for Unburdened
        if (statusText === 'Overburdened') {
          statusColor = '#c41e3a'; // Red
        } else if (statusText === 'Burdened') {
          statusColor = '#1e90ff'; // Blue
        }
        
        return `
          <h4>Encumbrance</h4>
          <div class="stat-row"><span class="stat-label">Current:</span><span class="stat-value-bold">${totalEnc}</span></div>
          <div class="stat-row"><span class="stat-label">Status:</span><span class="stat-value-bold" style="color: ${statusColor};">${statusText}</span></div>
        `;
      }
    },
    'money': {
      name: 'Money',
      icon: '💰',
      render: () => {
        const pp = document.getElementById('money-platinum')?.value || '0';
        const gp = document.getElementById('money-gold')?.value || '0';
        const sp = document.getElementById('money-silver')?.value || '0';
        const cp = document.getElementById('money-copper')?.value || '0';
        const ep = document.getElementById('money-electrum')?.value || '0';
        return `
          <h4>Money</h4>
          <div class="stat-grid">
            <div class="stat-box"><div class="label">PP</div><div class="value">${pp}</div></div>
            <div class="stat-box"><div class="label">GP</div><div class="value">${gp}</div></div>
            <div class="stat-box"><div class="label">EP</div><div class="value">${ep}</div></div>
            <div class="stat-box"><div class="label">SP</div><div class="value">${sp}</div></div>
            <div class="stat-box"><div class="label">CP</div><div class="value">${cp}</div></div>
          </div>
        `;
      }
    },
    'spells-cantrips': {
      name: 'Cantrips',
      icon: '✨',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`cantrips-${i}-mem`);
          const name = document.getElementById(`cantrips-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Cantrips (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`cantrips-${i}-mem`);
          const nameEl = document.getElementById(`cantrips-${i}-name`);
          const cost = document.getElementById(`cantrips-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'spells-rank1': {
      name: 'Rank 1 Spells',
      icon: '🔮',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank1-${i}-mem`);
          const name = document.getElementById(`rank1-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Rank 1 Spells (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank1-${i}-mem`);
          const nameEl = document.getElementById(`rank1-${i}-name`);
          const cost = document.getElementById(`rank1-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'spells-rank2': {
      name: 'Rank 2 Spells',
      icon: '🔮',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank2-${i}-mem`);
          const name = document.getElementById(`rank2-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Rank 2 Spells (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank2-${i}-mem`);
          const nameEl = document.getElementById(`rank2-${i}-name`);
          const cost = document.getElementById(`rank2-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'spells-rank3': {
      name: 'Rank 3 Spells',
      icon: '🔮',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank3-${i}-mem`);
          const name = document.getElementById(`rank3-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Rank 3 Spells (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank3-${i}-mem`);
          const nameEl = document.getElementById(`rank3-${i}-name`);
          const cost = document.getElementById(`rank3-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'spells-rank4': {
      name: 'Rank 4 Spells',
      icon: '🔮',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank4-${i}-mem`);
          const name = document.getElementById(`rank4-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Rank 4 Spells (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank4-${i}-mem`);
          const nameEl = document.getElementById(`rank4-${i}-name`);
          const cost = document.getElementById(`rank4-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'spells-rank5': {
      name: 'Rank 5 Spells',
      icon: '🔮',
      dynamic: true,
      isAvailable: () => {
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank5-${i}-mem`);
          const name = document.getElementById(`rank5-${i}-name`);
          if (mem?.checked && name?.value?.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Rank 5 Spells (Memorized)</h4>';
        html += '<div class="spell-widget-header"><span>Spell</span><span>Cost</span></div>';
        html += '<div class="skill-list">';
        let found = false;
        for (let i = 0; i < 12; i++) {
          const mem = document.getElementById(`rank5-${i}-mem`);
          const nameEl = document.getElementById(`rank5-${i}-name`);
          const cost = document.getElementById(`rank5-${i}-cost`);
          if (mem?.checked && nameEl?.value?.trim()) {
            const spellName = nameEl.value.trim();
            const description = window.SpellData?.getSpellDescription(spellName) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            html += `<div class="skill-item spell-hover" title="${escapedDesc}"><span>${spellName}</span><span>${cost?.value || ''}</span></div>`;
            found = true;
          }
        }
        if (!found) html += '<div class="skill-item"><span style="color:#999;">None memorized</span></div>';
        html += '</div>';
        return html;
      }
    },
    'fatigue': {
      name: 'Fatigue',
      icon: '😓',
      render: () => {
        const currentState = App.character.fatigueState || 'fresh';
        const stateLabels = {
          fresh: 'Fresh', winded: 'Winded', tired: 'Tired', wearied: 'Wearied',
          exhausted: 'Exhausted', debilitated: 'Debilitated', incapacitated: 'Incapacitated',
          semiconscious: 'Semi-conscious', coma: 'Coma'
        };
        const fatigue = FATIGUE_PENALTIES[currentState] || FATIGUE_PENALTIES.fresh;
        
        // Color based on severity
        let stateColor = '#228b22'; // Fresh = green
        if (fatigue.skillPenalty >= 80) stateColor = '#cc0000'; // Herculean+ = red
        else if (fatigue.skillPenalty >= 40) stateColor = '#b35900'; // Formidable = orange
        else if (fatigue.skillPenalty >= 20) stateColor = '#cc9900'; // Hard = yellow-orange
        if (!fatigue.canAct) stateColor = '#666'; // Incapacitated = grey
        
        let html = `<h4>Fatigue</h4>`;
        html += `<div class="stat-row" style="margin-bottom:8px;">
          <span class="stat-label">Current:</span>
          <span class="stat-value-bold" style="color:${stateColor};">${stateLabels[currentState] || 'Fresh'}</span>
        </div>`;
        
        // Compact button grid
        html += `<div class="fatigue-widget-grid">`;
        const states = ['fresh','winded','tired','wearied','exhausted','debilitated','incapacitated','semiconscious','coma'];
        const shortLabels = {
          fresh: 'Fresh', winded: 'Winded', tired: 'Tired', wearied: 'Wearied',
          exhausted: 'Exhaust.', debilitated: 'Debil.', incapacitated: 'Incap.',
          semiconscious: 'Semi-C.', coma: 'Coma'
        };
        states.forEach(state => {
          const isActive = state === currentState;
          const fp = FATIGUE_PENALTIES[state];
          let cls = 'fatigue-widget-btn';
          if (isActive) cls += ' fatigue-btn-active';
          if (fp.skillPenalty >= 80) cls += ' fatigue-btn-severe';
          else if (fp.skillPenalty >= 40) cls += ' fatigue-btn-moderate';
          else if (fp.skillPenalty >= 20) cls += ' fatigue-btn-mild';
          if (!fp.canAct) cls += ' fatigue-btn-disabled';
          html += `<button class="${cls}" data-fatigue-state="${state}">${shortLabels[state]}</button>`;
        });
        html += `</div>`;
        
        // Show active effects summary
        if (fatigue.skillPenalty > 0 || !fatigue.canAct) {
          html += `<div style="margin-top:6px; font-size:0.72rem; color:var(--text-secondary); border-top:1px solid var(--border-light); padding-top:4px;">`;
          if (!fatigue.canAct) {
            html += `<div style="color:#cc0000;font-weight:600;">Cannot Act</div>`;
          } else {
            const effects = [];
            if (fatigue.skillPenalty > 0) effects.push(`Skills: ${fatigue.skillGrade} (-${fatigue.skillPenalty}%)`);
            if (fatigue.initiativePenalty > 0) effects.push(`Init: -${fatigue.initiativePenalty}`);
            if (fatigue.apPenalty > 0) effects.push(`AP: -${fatigue.apPenalty}`);
            if (fatigue.movementType === 'flat') effects.push(`Move: -${fatigue.movementFlat}'`);
            else if (fatigue.movementType === 'halve') effects.push('Move: ½');
            else if (fatigue.movementType === 'zero') effects.push('Move: Immobile');
            html += effects.join(' · ');
          }
          html += `</div>`;
        }
        
        // Rest buttons with horizontal divider
        html += `<hr style="border:none; border-top:2px solid var(--border-light); margin:10px 0 8px 0;">`;
        html += `<div class="fatigue-widget-rest-buttons">
          <button class="fatigue-widget-rest-btn fatigue-widget-rest-short" data-rest-action="short">☀ Short Rest</button>
          <button class="fatigue-widget-rest-btn fatigue-widget-rest-long" data-rest-action="long">⛺ Long Rest</button>
        </div>`;
        
        return html;
      }
    },
    'special-abilities': {
      name: 'Abilities',
      icon: '⭐',
      dynamic: true,
      isAvailable: () => {
        // Check if there are any class abilities
        const classContainer = document.getElementById('class-abilities-list');
        if (classContainer) {
          const inputs = classContainer.querySelectorAll('.class-ability-input');
          for (const input of inputs) {
            if (input.value.trim()) return true;
          }
        }
        // Check if there are any species abilities
        const speciesContainer = document.getElementById('species-abilities-list');
        if (speciesContainer) {
          const inputs = speciesContainer.querySelectorAll('.species-ability-input');
          for (const input of inputs) {
            if (input.value.trim()) return true;
          }
        }
        return false;
      },
      render: () => {
        let html = '<h4>Abilities</h4>';
        html += '<div class="abilities-widget-list collapsed" data-widget-id="special-abilities">';
        
        // Collect class abilities
        const classAbilities = [];
        const classContainer = document.getElementById('class-abilities-list');
        if (classContainer) {
          const inputs = classContainer.querySelectorAll('.class-ability-input');
          inputs.forEach(input => {
            if (input.value.trim()) {
              classAbilities.push(input.value.trim());
            }
          });
        }
        
        // Collect species abilities
        const speciesAbilities = [];
        const speciesContainer = document.getElementById('species-abilities-list');
        if (speciesContainer) {
          const inputs = speciesContainer.querySelectorAll('.species-ability-input');
          inputs.forEach(input => {
            if (input.value.trim()) {
              speciesAbilities.push(input.value.trim());
            }
          });
        }
        
        // Sort each group alphabetically
        classAbilities.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        speciesAbilities.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        
        let totalCount = 0;
        const initialShow = 5;
        
        // Class abilities first
        if (classAbilities.length > 0) {
          html += '<div class="ability-group-label">Class Abilities</div>';
          classAbilities.forEach((ability, idx) => {
            const description = window.AbilityDescriptions?.getDescription(ability) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            const hiddenClass = totalCount >= initialShow ? ' hidden-ability' : '';
            html += `<div class="ability-widget-item${hiddenClass}" title="${escapedDesc}">${ability}</div>`;
            totalCount++;
          });
        }
        
        // Species abilities second
        if (speciesAbilities.length > 0) {
          const hiddenClass = totalCount >= initialShow ? ' hidden-ability' : '';
          html += `<div class="ability-group-label${hiddenClass}">Species Abilities</div>`;
          speciesAbilities.forEach((ability) => {
            const description = window.AbilityDescriptions?.getDescription(ability) || '';
            const escapedDesc = description.replace(/"/g, '&quot;');
            const hiddenClass2 = totalCount >= initialShow ? ' hidden-ability' : '';
            html += `<div class="ability-widget-item${hiddenClass2}" title="${escapedDesc}">${ability}</div>`;
            totalCount++;
          });
        }
        
        html += '</div>';
        
        // Add expand/collapse button if more than initialShow
        if (totalCount > initialShow) {
          html += `<button class="widget-expand-btn" data-widget-id="special-abilities">Show All (${totalCount})</button>`;
        }
        
        return html;
      }
    },
    'equipment': {
      name: 'Equipment',
      icon: '🎒',
      dynamic: true,
      isAvailable: () => {
        const container = document.getElementById('equipment-container');
        if (!container) return false;
        const rows = container.querySelectorAll('.equipment-row');
        for (const row of rows) {
          const nameInput = row.querySelector('.equipment-name');
          if (nameInput && nameInput.value.trim()) return true;
        }
        return false;
      },
      render: () => {
        let html = '<h4>Equipment</h4>';
        html += '<div class="equipment-widget-list collapsed" data-widget-id="equipment">';
        
        // Collect equipment items
        const items = [];
        const container = document.getElementById('equipment-container');
        if (container) {
          const rows = container.querySelectorAll('.equipment-row');
          rows.forEach(row => {
            const nameInput = row.querySelector('.equipment-name');
            const encInput = row.querySelector('.equipment-enc');
            if (nameInput && nameInput.value.trim()) {
              items.push({
                name: nameInput.value.trim(),
                enc: encInput?.value || '0'
              });
            }
          });
        }
        
        // Sort alphabetically
        items.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        
        const initialShow = 8;
        items.forEach((item, idx) => {
          const hiddenClass = idx >= initialShow ? ' hidden-equipment' : '';
          html += `<div class="equipment-widget-item${hiddenClass}">`;
          html += `<span class="equip-name">${item.name}</span>`;
          html += `<span class="equip-enc">${item.enc}</span>`;
          html += `</div>`;
        });
        
        html += '</div>';
        
        // Add expand/collapse button if more than initialShow
        if (items.length > initialShow) {
          html += `<button class="widget-expand-btn" data-widget-id="equipment">Show All (${items.length})</button>`;
        }
        
        return html;
      }
    },
    'berserk-rage': {
      name: 'Berserk Rage',
      icon: '🔥',
      dynamic: true,
      isAvailable: () => {
        return App.hasAbility('berserk rage');
      },
      render: () => {
        const con = parseInt(App.character.attributes?.CON, 10) || 10;
        const maxUses = Math.ceil(con / 4);
        const maxRounds = con;
        const usesRemaining = App.rageUsesRemaining ?? maxUses;
        const isRaging = App.isRaging || false;
        
        let html = '<h4>🔥 Berserk Rage 🔥</h4>';
        html += '<div class="rage-widget-content">';
        
        html += `<div class="stat-row"><span class="stat-label">Uses/Day:</span><span class="stat-value-bold">${usesRemaining} / ${maxUses}</span></div>`;
        html += `<div class="stat-row"><span class="stat-label">Rounds/Rage:</span><span class="stat-value">${maxRounds}</span></div>`;
        
        if (isRaging) {
          html += '<div class="rage-widget-active">⚔️ CURRENTLY RAGING! ⚔️</div>';
          const roundsUsed = document.getElementById('rage-rounds-used')?.value || '0';
          html += `<div class="stat-row"><span class="stat-label">Rounds Used:</span><span class="stat-value">${roundsUsed} / ${maxRounds}</span></div>`;
          html += '<div class="rage-widget-effects">';
          html += '<div class="rage-effect-item boost">Damage Mod +1 step</div>';
          html += '<div class="rage-effect-item boost">Endurance +20%</div>';
          html += '<div class="rage-effect-item boost">Willpower +20%</div>';
          html += '<div class="rage-effect-item boost">Brawn +40%</div>';
          html += '<div class="rage-effect-item penalty">Evade -2%</div>';
          html += '</div>';
          html += '<button type="button" class="btn btn-small btn-end-rage-widget" style="width:100%;margin-top:8px;background:#8b0000;color:white;">End Rage</button>';
        } else {
          if (usesRemaining > 0) {
            html += '<button type="button" class="btn btn-rage-widget" style="width:100%;margin-top:8px;">⚔️ I\'m RAGING! ⚔️</button>';
          } else {
            html += '<div class="rage-widget-exhausted">No rage uses remaining</div>';
            html += '<button type="button" class="btn btn-small btn-reset-rage-widget" style="width:100%;margin-top:8px;">Reset Uses</button>';
          }
        }
        
        html += '</div>';
        return html;
      }
    }
  },
  
  /**
   * Set up the summary page with drag-and-drop
   */
  setupSummaryPage() {
    const palette = document.getElementById('palette-widgets');
    const canvas = document.getElementById('summary-canvas');
    const resetBtn = document.getElementById('btn-reset-summary');
    
    if (!palette || !canvas) return;
    
    // Load saved layout
    const savedLayout = this.loadSummaryLayout();
    
    // Populate palette with widgets not in the saved layout
    this.populatePalette(savedLayout);
    
    // Populate canvas with saved widgets
    this.populateCanvas(savedLayout);
    
    // Set up canvas drag-over events
    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      canvas.classList.add('drag-over');
    });
    
    canvas.addEventListener('dragleave', () => {
      canvas.classList.remove('drag-over');
    });
    
    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      canvas.classList.remove('drag-over');
      
      const widgetId = e.dataTransfer.getData('text/plain');
      const source = e.dataTransfer.getData('source');
      
      // Only add from palette, not when reordering from canvas
      if (source === 'canvas') {
        // This is a reorder operation, handled by widget drop handlers
        return;
      }
      
      if (widgetId && this.summaryWidgets[widgetId]) {
        this.addWidgetToCanvas(widgetId);
        this.removeWidgetFromPalette(widgetId);
        this.saveSummaryLayout();
      }
    });
    
    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset summary layout to default?')) {
          this.resetSummaryLayout();
        }
      });
    }
    
    // Setup event delegation for widget buttons (spin buttons, dice rolls)
    this.setupWidgetEventListeners();
  },
  
  /**
   * Populate the palette with available widgets
   */
  populatePalette(excludeIds = []) {
    const palette = document.getElementById('palette-widgets');
    if (!palette) return;
    
    palette.innerHTML = '';
    
    Object.entries(this.summaryWidgets).forEach(([id, widget]) => {
      if (excludeIds.includes(id)) return;
      
      // Skip dynamic widgets that aren't available
      if (widget.dynamic && widget.isAvailable && !widget.isAvailable()) return;
      
      const item = document.createElement('div');
      item.className = 'widget-item';
      item.draggable = true;
      item.dataset.widgetId = id;
      item.innerHTML = `<span class="widget-icon">${widget.icon}</span><span>${widget.name}</span>`;
      
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', id);
        item.classList.add('dragging');
      });
      
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
      
      palette.appendChild(item);
    });
  },
  
  /**
   * Populate the canvas with saved widgets
   */
  populateCanvas(widgetIds = []) {
    const canvas = document.getElementById('summary-canvas');
    if (!canvas) return;
    
    canvas.innerHTML = '';
    
    widgetIds.forEach(id => {
      if (this.summaryWidgets[id]) {
        this.addWidgetToCanvas(id, false);
      }
    });
  },
  
  /**
   * Add a widget to the canvas
   */
  addWidgetToCanvas(widgetId, save = true) {
    const canvas = document.getElementById('summary-canvas');
    const widget = this.summaryWidgets[widgetId];
    if (!canvas || !widget) return;
    
    const item = document.createElement('div');
    item.className = 'widget-item';
    item.dataset.widgetId = widgetId;
    item.draggable = true;
    
    const content = document.createElement('div');
    content.className = 'widget-content';
    content.innerHTML = widget.render();
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'widget-remove';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'Remove widget';
    removeBtn.addEventListener('click', () => {
      item.remove();
      this.addWidgetToPalette(widgetId);
      this.saveSummaryLayout();
    });
    
    // Drag handle for reordering
    const dragHandle = document.createElement('div');
    dragHandle.className = 'widget-drag-handle';
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.title = 'Drag to reorder';
    
    // Drag events for reordering within canvas
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', widgetId);
      e.dataTransfer.setData('source', 'canvas');
      item.classList.add('dragging');
      // Store reference for reordering
      this.draggedWidget = item;
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      this.draggedWidget = null;
      // Remove all drop indicators
      canvas.querySelectorAll('.widget-item').forEach(w => {
        w.classList.remove('drop-before', 'drop-after');
      });
    });
    
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!this.draggedWidget || this.draggedWidget === item) return;
      
      const rect = item.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      
      // Remove previous indicators
      canvas.querySelectorAll('.widget-item').forEach(w => {
        w.classList.remove('drop-before', 'drop-after');
      });
      
      // Show indicator
      if (e.clientY < midY) {
        item.classList.add('drop-before');
      } else {
        item.classList.add('drop-after');
      }
    });
    
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const source = e.dataTransfer.getData('source');
      
      if (source === 'canvas' && this.draggedWidget && this.draggedWidget !== item) {
        // Reordering within canvas
        const rect = item.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        
        if (e.clientY < midY) {
          canvas.insertBefore(this.draggedWidget, item);
        } else {
          canvas.insertBefore(this.draggedWidget, item.nextSibling);
        }
        
        this.saveSummaryLayout();
      }
      
      // Clean up indicators
      canvas.querySelectorAll('.widget-item').forEach(w => {
        w.classList.remove('drop-before', 'drop-after');
      });
    });
    
    item.appendChild(dragHandle);
    item.appendChild(content);
    item.appendChild(removeBtn);
    canvas.appendChild(item);
    
    if (save) {
      this.saveSummaryLayout();
    }
  },

  /**
   * Setup event listeners for interactive widget elements
   * Uses event delegation on the canvas for reliability
   */
  setupWidgetEventListeners() {
    // Get the canvas element for event delegation
    const canvas = document.getElementById('summary-canvas');
    if (!canvas || canvas.dataset.listenersAttached) return;
    
    // Mark as attached to prevent duplicate listeners
    canvas.dataset.listenersAttached = 'true';
    
    // Event delegation for all widget buttons
    canvas.addEventListener('click', (e) => {
      // Handle spin buttons
      const spinBtn = e.target.closest('.spin-btn');
      if (spinBtn) {
        e.stopPropagation();
        const targetId = spinBtn.dataset.target;
        const max = parseInt(spinBtn.dataset.max, 10) || 99;
        const isUp = spinBtn.classList.contains('spin-up');
        
        const spinner = spinBtn.closest('.stat-spinner');
        const valueSpan = spinner?.querySelector('.stat-value');
        
        if (!valueSpan) return;
        
        let current = parseInt(valueSpan.textContent, 10) || 0;
        
        if (isUp && current < max) {
          current++;
        } else if (!isUp && current > 0) {
          current--;
        }
        
        valueSpan.textContent = current;
        
        // Sync to character page
        const targetInput = document.getElementById(targetId);
        if (targetInput) {
          targetInput.value = current;
          targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        this.scheduleAutoSave();
        return;
      }
      
      // Handle dice buttons (damage rolls)
      const diceBtn = e.target.closest('.dice-btn');
      if (diceBtn) {
        e.stopPropagation();
        const damage = diceBtn.dataset.damage;
        if (damage) {
          this.rollDamage(damage);
        }
        return;
      }
      
      // Handle d100 buttons (skill rolls)
      const d100Btn = e.target.closest('.d100-btn');
      if (d100Btn) {
        e.stopPropagation();
        const skillName = d100Btn.dataset.skill;
        const targetPct = parseInt(d100Btn.dataset.target, 10) || 50;
        this.rollD100(skillName, targetPct);
        return;
      }
      
      // Handle fatigue state buttons in summary widget
      const fatigueBtn = e.target.closest('.fatigue-widget-btn');
      if (fatigueBtn) {
        e.stopPropagation();
        const newState = fatigueBtn.dataset.fatigueState;
        if (newState && FATIGUE_PENALTIES[newState]) {
          this.setFatigueState(newState, true);
        }
        return;
      }
      
      // Handle rest buttons in fatigue widget
      const restBtn = e.target.closest('.fatigue-widget-rest-btn');
      if (restBtn) {
        e.stopPropagation();
        const restAction = restBtn.dataset.restAction;
        if (restAction === 'short') {
          this.shortRest();
        } else if (restAction === 'long') {
          this.longRest(); // longRest now shows its own modal and refreshes widgets
        }
        return;
      }
      
      // Handle widget expand/collapse buttons
      const expandBtn = e.target.closest('.widget-expand-btn');
      if (expandBtn) {
        e.stopPropagation();
        const widgetId = expandBtn.dataset.widgetId;
        // Find the list specifically (not the widget-item container)
        const list = canvas.querySelector(`.abilities-widget-list[data-widget-id="${widgetId}"], .spell-widget-list[data-widget-id="${widgetId}"], .equipment-widget-list[data-widget-id="${widgetId}"]`);
        if (list) {
          const isCollapsed = list.classList.contains('collapsed');
          if (isCollapsed) {
            list.classList.remove('collapsed');
            expandBtn.textContent = 'Show Less';
          } else {
            list.classList.add('collapsed');
            // Count total items
            const totalItems = list.querySelectorAll('.ability-widget-item, .spell-widget-item, .equipment-widget-item').length;
            expandBtn.textContent = `Show All (${totalItems})`;
          }
        }
        return;
      }
      
      // Handle Spend EXP button in Character Info widget
      const expBtn = e.target.closest('.widget-exp-btn');
      if (expBtn) {
        e.stopPropagation();
        this.openExpModal();
        return;
      }
      
      // Handle Berserk Rage button in widget
      const rageBtn = e.target.closest('.btn-rage-widget');
      if (rageBtn) {
        e.stopPropagation();
        this.startBerserkRage();
        this.refreshSummaryWidgets();
        return;
      }
      
      // Handle End Rage button in widget
      const endRageBtn = e.target.closest('.btn-end-rage-widget');
      if (endRageBtn) {
        e.stopPropagation();
        this.endBerserkRage(true);
        this.refreshSummaryWidgets();
        return;
      }
      
      // Handle Reset Rage button in widget
      const resetRageBtn = e.target.closest('.btn-reset-rage-widget');
      if (resetRageBtn) {
        e.stopPropagation();
        this.resetRageUses();
        this.refreshSummaryWidgets();
        return;
      }
    });
  },

  /**
   * Roll d100 for a skill check and show result
   */
  rollD100(skillName, targetPct) {
    // Roll d100 (1-100, where 100 = "00")
    const roll = Math.floor(Math.random() * 100) + 1;
    
    // Determine result
    let result = '';
    let resultClass = '';
    
    // Critical: 10% of skill value, always rounding UP
    // e.g., 71% skill -> ceil(7.1) = 8, so roll of 8 or less is critical
    const critThreshold = Math.ceil(targetPct / 10);
    
    // Fumble: 99 or 00 (100), but skills over 100% only fumble on 00
    const isFumble = targetPct >= 100 ? (roll === 100) : (roll >= 99);
    
    // Critical must also be a successful roll (roll <= skill)
    if (roll <= critThreshold && roll <= targetPct && !isFumble) {
      result = 'Critical!';
      resultClass = 'roll-critical';
    } else if (isFumble) {
      result = 'Fumble!';
      resultClass = 'roll-fumble';
    } else if (roll <= targetPct) {
      result = 'Success';
      resultClass = 'roll-success';
    } else {
      result = 'Failure';
      resultClass = 'roll-failure';
    }
    
    this.showD100Result(skillName, targetPct, roll, result, resultClass);
  },

  /**
   * Show d100 roll result overlay
   */
  showD100Result(skillName, targetPct, roll, result, resultClass) {
    // Create or get overlay
    let overlay = document.getElementById('d100-result-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'd100-result-overlay';
      overlay.className = 'damage-result-overlay';
      overlay.innerHTML = `
        <div class="damage-result-content d100-result-content">
          <div class="d100-skill-name"></div>
          <div class="d100-target"></div>
          <div class="d100-roll"></div>
          <div class="d100-result"></div>
          <button class="damage-close">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
      
      overlay.querySelector('.damage-close').addEventListener('click', () => {
        overlay.classList.remove('visible');
      });
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('visible');
        }
      });
    }
    
    overlay.querySelector('.d100-skill-name').textContent = skillName;
    overlay.querySelector('.d100-target').textContent = `Target: ${targetPct}%`;
    overlay.querySelector('.d100-roll').textContent = roll.toString().padStart(2, '0');
    
    const resultEl = overlay.querySelector('.d100-result');
    resultEl.textContent = result;
    resultEl.className = 'd100-result ' + resultClass;
    
    overlay.classList.add('visible');
  },

  /**
   * Roll damage dice and show result
   */
  rollDamage(damageString) {
    // Parse damage string like "1d8+1+1d6" or "1d6+1d4"
    const result = this.parseDamageRoll(damageString);
    
    // Show result in an overlay
    this.showDamageResult(damageString, result);
  },

  /**
   * Parse and roll a damage string
   */
  parseDamageRoll(damageString) {
    // Normalize the string
    const normalized = damageString.toLowerCase().replace(/\s/g, '');
    
    // Split by + and - while keeping the operators
    const parts = normalized.split(/(?=[+-])/);
    
    let total = 0;
    const rolls = [];
    
    parts.forEach(part => {
      // Check if it's a dice roll (e.g., 1d8, 2d6)
      const diceMatch = part.match(/([+-]?)(\d*)d(\d+)/);
      if (diceMatch) {
        const sign = diceMatch[1] === '-' ? -1 : 1;
        const count = parseInt(diceMatch[2], 10) || 1;
        const sides = parseInt(diceMatch[3], 10);
        
        let diceTotal = 0;
        const individualRolls = [];
        for (let i = 0; i < count; i++) {
          const roll = Math.floor(Math.random() * sides) + 1;
          individualRolls.push(roll);
          diceTotal += roll;
        }
        
        rolls.push({ dice: `${count}d${sides}`, rolls: individualRolls, total: diceTotal * sign });
        total += diceTotal * sign;
      } else {
        // It's a modifier
        const numMatch = part.match(/([+-]?\d+)/);
        if (numMatch) {
          const mod = parseInt(numMatch[1], 10);
          rolls.push({ modifier: mod });
          total += mod;
        }
      }
    });
    
    return { total, rolls };
  },

  /**
   * Show damage roll result overlay
   */
  showDamageResult(damageString, result) {
    // Create or get overlay
    let overlay = document.getElementById('damage-result-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'damage-result-overlay';
      overlay.className = 'damage-result-overlay';
      overlay.innerHTML = `
        <div class="damage-result-content">
          <div class="damage-formula"></div>
          <div class="damage-breakdown"></div>
          <div class="damage-total"></div>
          <button class="damage-close">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
      
      overlay.querySelector('.damage-close').addEventListener('click', () => {
        overlay.classList.remove('visible');
      });
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('visible');
        }
      });
    }
    
    // Build breakdown string
    let breakdown = '';
    result.rolls.forEach((r, i) => {
      if (i > 0 && !breakdown.endsWith(' ')) breakdown += ' ';
      if (r.dice) {
        const rollsStr = r.rolls.join('+');
        breakdown += `${r.dice} (${rollsStr}=${r.total > 0 ? r.total : r.total})`;
      } else if (r.modifier !== undefined) {
        breakdown += (r.modifier >= 0 ? '+' : '') + r.modifier;
      }
    });
    
    overlay.querySelector('.damage-formula').textContent = `Damage: ${damageString}`;
    overlay.querySelector('.damage-breakdown').textContent = breakdown;
    overlay.querySelector('.damage-total').textContent = result.total;
    
    overlay.classList.add('visible');
  },
  
  /**
   * Set up the floating dice roller
   */
  setupFloatingDiceRoller() {
    const fab = document.getElementById('dice-fab');
    const overlay = document.getElementById('dice-overlay');
    const dieTens = document.getElementById('flying-die-tens');
    const dieOnes = document.getElementById('flying-die-ones');
    const resultDisplay = document.getElementById('dice-result-overlay');
    
    if (!fab || !overlay || !dieTens || !dieOnes || !resultDisplay) return;
    
    let isRolling = false;
    
    fab.addEventListener('click', () => {
      if (isRolling) return;
      isRolling = true;
      
      // Show overlay
      overlay.classList.add('active');
      resultDisplay.textContent = '';
      resultDisplay.className = 'dice-result-overlay';
      
      // Generate final values
      const finalTens = Math.floor(Math.random() * 10);
      const finalOnes = Math.floor(Math.random() * 10);
      
      // Get viewport dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Random start positions (off screen left)
      const startY1 = vh * 0.3 + Math.random() * vh * 0.3;
      const startY2 = vh * 0.3 + Math.random() * vh * 0.3;
      
      // End positions (toward center)
      const endX1 = vw * 0.25 + Math.random() * vw * 0.15;
      const endX2 = vw * 0.55 + Math.random() * vw * 0.15;
      const endY1 = vh * 0.35 + Math.random() * vh * 0.15;
      const endY2 = vh * 0.35 + Math.random() * vh * 0.15;
      
      // Set initial positions
      dieTens.style.transition = 'none';
      dieOnes.style.transition = 'none';
      dieTens.style.left = '-120px';
      dieTens.style.top = startY1 + 'px';
      dieTens.style.transform = 'rotate(0deg) scale(1)';
      dieOnes.style.left = '-120px';
      dieOnes.style.top = startY2 + 'px';
      dieOnes.style.transform = 'rotate(0deg) scale(1)';
      
      // Set initial values
      const tensValue = dieTens.querySelector('.d10-value');
      const onesValue = dieOnes.querySelector('.d10-value');
      tensValue.textContent = Math.floor(Math.random() * 10);
      onesValue.textContent = Math.floor(Math.random() * 10);
      
      // Force reflow
      void dieTens.offsetWidth;
      
      // Start animation
      dieTens.classList.add('rolling');
      dieOnes.classList.add('rolling');
      
      // Animate numbers changing
      let frame = 0;
      const numberInterval = setInterval(() => {
        tensValue.textContent = Math.floor(Math.random() * 10);
        onesValue.textContent = Math.floor(Math.random() * 10);
        frame++;
        if (frame > 25) {
          clearInterval(numberInterval);
          tensValue.textContent = finalTens;
          onesValue.textContent = finalOnes;
        }
      }, 60);
      
      // Random rotation amounts
      const rot1 = 720 + Math.random() * 1080;
      const rot2 = 720 + Math.random() * 1080;
      
      setTimeout(() => {
        dieTens.style.transition = 'left 1.8s cubic-bezier(0.25, 0.1, 0.25, 1), top 1.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        dieOnes.style.transition = 'left 2.1s cubic-bezier(0.25, 0.1, 0.25, 1), top 2.1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 2.1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        dieTens.style.left = endX1 + 'px';
        dieTens.style.top = endY1 + 'px';
        dieTens.style.transform = `rotate(${rot1}deg) scale(1.1)`;
        
        dieOnes.style.left = endX2 + 'px';
        dieOnes.style.top = endY2 + 'px';
        dieOnes.style.transform = `rotate(${rot2}deg) scale(1.1)`;
      }, 50);
      
      // Show result
      setTimeout(() => {
        dieTens.classList.remove('rolling');
        dieOnes.classList.remove('rolling');
        
        const d100 = (finalTens === 0 && finalOnes === 0) ? 100 : finalTens * 10 + finalOnes;
        resultDisplay.textContent = d100;
        resultDisplay.classList.add('show');
        
        // Add critical styling
        if (d100 <= 5) {
          resultDisplay.classList.add('critical-success');
        } else if (d100 >= 96) {
          resultDisplay.classList.add('critical-fail');
        }
        
        // Auto-close after showing result
        setTimeout(() => {
          overlay.classList.remove('active');
          dieTens.classList.remove('rolling');
          dieOnes.classList.remove('rolling');
          resultDisplay.classList.remove('show', 'critical-success', 'critical-fail');
          isRolling = false;
        }, 2000);
      }, 2300);
    });
    
    // Click overlay to close (if not rolling)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && !isRolling) {
        overlay.classList.remove('active');
      }
    });
  },
  
  /**
   * Remove a widget from the palette
   */
  removeWidgetFromPalette(widgetId) {
    const palette = document.getElementById('palette-widgets');
    if (!palette) return;
    
    const item = palette.querySelector(`[data-widget-id="${widgetId}"]`);
    if (item) item.remove();
  },
  
  /**
   * Add a widget back to the palette
   */
  addWidgetToPalette(widgetId) {
    const palette = document.getElementById('palette-widgets');
    const widget = this.summaryWidgets[widgetId];
    if (!palette || !widget) return;
    
    const item = document.createElement('div');
    item.className = 'widget-item';
    item.draggable = true;
    item.dataset.widgetId = widgetId;
    item.innerHTML = `<span class="widget-icon">${widget.icon}</span><span>${widget.name}</span>`;
    
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', widgetId);
      item.classList.add('dragging');
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
    
    palette.appendChild(item);
  },
  
  /**
   * Save current summary layout to localStorage
   */
  saveSummaryLayout() {
    const canvas = document.getElementById('summary-canvas');
    if (!canvas) return;
    
    const widgetIds = Array.from(canvas.querySelectorAll('.widget-item'))
      .map(item => item.dataset.widgetId)
      .filter(id => id);
    
    try {
      localStorage.setItem('mythras-summary-layout', JSON.stringify(widgetIds));
    } catch (e) {
      console.warn('Could not save summary layout');
    }
  },
  
  /**
   * Load summary layout from localStorage
   */
  loadSummaryLayout() {
    try {
      const saved = localStorage.getItem('mythras-summary-layout');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Ignore
    }
    // Default layout
    return ['character-info', 'characteristics', 'attributes', 'hp-overview'];
  },
  
  /**
   * Reset summary layout to default
   */
  resetSummaryLayout() {
    try {
      localStorage.removeItem('mythras-summary-layout');
    } catch (e) {
      // Ignore
    }
    
    const defaultLayout = ['character-info', 'characteristics', 'attributes', 'hp-overview'];
    this.populatePalette(defaultLayout);
    this.populateCanvas(defaultLayout);
  },
  
  /**
   * Refresh all widgets on the summary canvas
   */
  refreshSummaryWidgets() {
    const canvas = document.getElementById('summary-canvas');
    if (!canvas) return;
    
    canvas.querySelectorAll('.widget-item').forEach(item => {
      const widgetId = item.dataset.widgetId;
      const widget = this.summaryWidgets[widgetId];
      if (widget) {
        const content = item.querySelector('.widget-content');
        if (content) {
          content.innerHTML = widget.render();
        }
      }
    });
  },
  
  /**
   * Refresh a single widget on the summary canvas by ID
   */
  refreshSummaryWidget(widgetId) {
    const canvas = document.getElementById('summary-canvas');
    if (!canvas) return;
    
    const item = canvas.querySelector(`.widget-item[data-widget-id="${widgetId}"]`);
    if (item) {
      const widget = this.summaryWidgets[widgetId];
      if (widget) {
        const content = item.querySelector('.widget-content');
        if (content) {
          content.innerHTML = widget.render();
        }
      }
    }
  },

  /**
   * Setup alphabetize buttons
   */
  setupAlphabetizeButton() {
    // Professional Skills
    const profBtn = document.getElementById('btn-alphabetize-prof');
    if (profBtn) {
      profBtn.addEventListener('click', () => this.alphabetizeProfessionalSkills());
    }
    
    // Passions
    const passionsBtn = document.getElementById('btn-alphabetize-passions');
    if (passionsBtn) {
      passionsBtn.addEventListener('click', () => this.alphabetizeBeliefs('passions'));
    }
    
    // Oaths
    const oathsBtn = document.getElementById('btn-alphabetize-oaths');
    if (oathsBtn) {
      oathsBtn.addEventListener('click', () => this.alphabetizeBeliefs('oaths'));
    }
    
    // Languages
    const langBtn = document.getElementById('btn-alphabetize-languages');
    if (langBtn) {
      langBtn.addEventListener('click', () => this.alphabetizeLanguages());
    }
    
    // Equipment
    const equipBtn = document.getElementById('btn-alphabetize-equipment');
    if (equipBtn) {
      equipBtn.addEventListener('click', () => this.alphabetizeEquipment());
    }
    
    // Melee Weapons
    const meleeBtn = document.getElementById('btn-alphabetize-melee');
    if (meleeBtn) {
      meleeBtn.addEventListener('click', () => this.alphabetizeMeleeWeapons());
    }
    
    // Ranged Weapons
    const rangedBtn = document.getElementById('btn-alphabetize-ranged');
    if (rangedBtn) {
      rangedBtn.addEventListener('click', () => this.alphabetizeRangedWeapons());
    }
  },

  /**
   * Setup add/remove row buttons
   */
  setupAddRowButtons() {
    // Professional Skills
    document.getElementById('btn-add-prof-skill')?.addEventListener('click', () => this.addProfessionalSkillRow());
    document.getElementById('btn-remove-prof-skill')?.addEventListener('click', () => this.removeLastRow('professional-skills-container', '.professional-skill-row', '.prof-skill-name'));
    
    // Languages
    document.getElementById('btn-add-language')?.addEventListener('click', () => this.addLanguageRow());
    document.getElementById('btn-remove-language')?.addEventListener('click', () => this.removeLastLanguageRow());
    
    // Oaths
    document.getElementById('btn-add-oath')?.addEventListener('click', () => this.addOathRow());
    document.getElementById('btn-remove-oath')?.addEventListener('click', () => this.removeLastRow('oaths-container', '.belief-row', '.belief-name'));
    
    // Passions
    document.getElementById('btn-add-passion')?.addEventListener('click', () => this.addPassionRow());
    document.getElementById('btn-remove-passion')?.addEventListener('click', () => this.removeLastRow('passions-container', '.belief-row', '.belief-name'));
    
    // Equipment
    document.getElementById('btn-add-equipment')?.addEventListener('click', () => this.addEquipmentRow());
    document.getElementById('btn-remove-equipment')?.addEventListener('click', () => this.removeLastRow('equipment-container', '.equipment-row', '.equipment-name'));
    
    // Melee Weapons
    document.getElementById('btn-add-melee')?.addEventListener('click', () => this.addMeleeWeaponRow());
    document.getElementById('btn-remove-melee')?.addEventListener('click', () => this.removeLastRow('melee-weapons-body', 'tr', '.weapon-name'));
    
    // Ranged Weapons
    document.getElementById('btn-add-ranged')?.addEventListener('click', () => this.addRangedWeaponRow());
    document.getElementById('btn-remove-ranged')?.addEventListener('click', () => this.removeLastRow('ranged-weapons-body', 'tr', '.weapon-name'));
    
    // Species Abilities
    document.getElementById('btn-add-species-ability')?.addEventListener('click', () => this.addSpeciesAbilityRow());
    document.getElementById('btn-remove-species-ability')?.addEventListener('click', () => this.removeLastSpeciesAbilityRow());
  },
  
  /**
   * Remove last row from a section (warn if has content)
   */
  removeLastRow(containerId, rowSelector, dataFieldSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll(rowSelector));
    if (rows.length === 0) return;
    
    const lastRow = rows[rows.length - 1];
    const dataField = lastRow.querySelector(dataFieldSelector);
    const hasContent = dataField && dataField.value.trim();
    
    if (hasContent) {
      // Warn user before deleting row with content
      const confirmed = confirm(`Remove "${dataField.value.trim()}"?\n\nThis will delete this row.`);
      if (!confirmed) return;
    }
    
    lastRow.remove();
    this.reindexSection(containerId, rowSelector);
    this.scheduleAutoSave();
  },
  
  /**
   * Remove last language row (skip native tongue, warn if has content)
   */
  removeLastLanguageRow() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    const rows = Array.from(container.querySelectorAll('.language-row:not(.native)'));
    if (rows.length === 0) return;
    
    const lastRow = rows[rows.length - 1];
    const nameField = lastRow.querySelector('.language-name');
    const hasContent = nameField && nameField.value.trim();
    
    if (hasContent) {
      const confirmed = confirm(`Remove "${nameField.value.trim()}"?\n\nThis will delete this language.`);
      if (!confirmed) return;
    }
    
    lastRow.remove();
    this.reindexLanguages();
    this.scheduleAutoSave();
  },

  /**
   * Setup event listeners for passion formula inputs
   */
  setupPassionFormulaListeners() {
    const container = document.getElementById('passions-container');
    if (!container) return;
    
    container.querySelectorAll('.belief-formula-input').forEach(input => {
      input.addEventListener('input', () => {
        this.recalculateAll();
        this.scheduleAutoSave();
      });
    });
  },

  /**
   * Alphabetize beliefs (passions or oaths)
   */
  alphabetizeBeliefs(type) {
    const containerId = type === 'passions' ? 'passions-container' : 'oaths-container';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Gather all beliefs with their data
    const beliefs = [];
    const rows = container.querySelectorAll('.belief-row');
    rows.forEach(row => {
      const nameInput = row.querySelector('.belief-name');
      const currentInput = row.querySelector('.belief-input');
      if (nameInput && nameInput.value.trim()) {
        beliefs.push({
          name: nameInput.value.trim(),
          current: currentInput?.value || ''
        });
      }
    });
    
    // Sort alphabetically
    beliefs.sort((a, b) => a.name.localeCompare(b.name));
    
    // Re-populate rows
    rows.forEach((row, i) => {
      const nameInput = row.querySelector('.belief-name');
      const currentInput = row.querySelector('.belief-input');
      if (i < beliefs.length) {
        nameInput.value = beliefs[i].name;
        currentInput.value = beliefs[i].current;
      } else {
        nameInput.value = '';
        currentInput.value = '';
      }
    });
    
    this.scheduleAutoSave();
  },

  /**
   * Alphabetize languages (keeping Native Tongue at top)
   */
  alphabetizeLanguages() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    // Gather non-native languages
    const languages = [];
    const rows = container.querySelectorAll('.language-row:not(.native)');
    rows.forEach(row => {
      const nameInput = row.querySelector('.language-name');
      const currentInput = row.querySelector('.language-input');
      if (nameInput && nameInput.value.trim()) {
        languages.push({
          name: nameInput.value.trim(),
          current: currentInput?.value || ''
        });
      }
    });
    
    // Sort alphabetically
    languages.sort((a, b) => a.name.localeCompare(b.name));
    
    // Re-populate non-native rows
    rows.forEach((row, i) => {
      const nameInput = row.querySelector('.language-name');
      const currentInput = row.querySelector('.language-input');
      if (i < languages.length) {
        nameInput.value = languages[i].name;
        currentInput.value = languages[i].current;
      } else {
        nameInput.value = '';
        currentInput.value = '';
      }
    });
    
    this.scheduleAutoSave();
  },
  
  /**
   * Alphabetize equipment
   */
  alphabetizeEquipment() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    
    // Gather all equipment with data
    const equipment = [];
    const rows = container.querySelectorAll('.equipment-row');
    rows.forEach(row => {
      const nameInput = row.querySelector('.equipment-name');
      const encInput = row.querySelector('.equipment-enc');
      if (nameInput && nameInput.value.trim()) {
        equipment.push({
          name: nameInput.value.trim(),
          enc: encInput?.value || ''
        });
      }
    });
    
    // Sort alphabetically
    equipment.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear container and re-create rows with sorted data
    container.innerHTML = '';
    equipment.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'equipment-row';
      row.innerHTML = `
        <input type="text" class="equipment-name" id="equip-${index}-name" placeholder="" value="${item.name.replace(/"/g, '&quot;')}">
        <input type="number" class="equipment-enc" id="equip-${index}-enc" placeholder="" step="0.1" value="${item.enc}">
      `;
      container.appendChild(row);
      
      // Re-attach event listeners
      const nameInput = row.querySelector('.equipment-name');
      const encInput = row.querySelector('.equipment-enc');
      
      nameInput.dataset.previousValue = item.name.toLowerCase();
      
      nameInput.addEventListener('focus', () => {
        nameInput.dataset.previousValue = nameInput.value.trim().toLowerCase();
      });
      
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
        }
        this.updateContainerButtons();
        this.scheduleAutoSave();
      });
      
      nameInput.addEventListener('input', () => {
        this.updateTotalEnc();
        this.scheduleAutoSave();
      });
      
      encInput.addEventListener('input', () => {
        this.updateTotalEnc();
        this.scheduleAutoSave();
      });
    });
    
    this.updateTotalEnc();
    this.updateContainerButtons();
    this.scheduleAutoSave();
  },

  /**
   * Alphabetize melee weapons
   */
  alphabetizeMeleeWeapons() {
    const tbody = document.getElementById('melee-weapons-body');
    if (!tbody) return;
    
    // Gather all weapons with data
    const weapons = [];
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const nameInput = row.querySelector('.weapon-name');
      if (nameInput && nameInput.value.trim()) {
        // Collect all field values
        const fields = Array.from(row.querySelectorAll('input')).map(input => ({
          value: input.value,
          baseDamage: input.dataset.baseDamage || '',
          weaponName: input.dataset.weaponName || '',
          userModified: input.dataset.userModified || ''
        }));
        weapons.push({
          name: nameInput.value.trim(),
          fields: fields,
          userModified: nameInput.dataset.userModified || ''
        });
      }
    });
    
    // Sort alphabetically by weapon name
    weapons.sort((a, b) => a.name.localeCompare(b.name));
    
    // Reassign to rows
    let weaponIndex = 0;
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      if (weaponIndex < weapons.length) {
        const weapon = weapons[weaponIndex];
        inputs.forEach((input, i) => {
          if (weapon.fields[i]) {
            input.value = weapon.fields[i].value;
            if (weapon.fields[i].baseDamage) {
              input.dataset.baseDamage = weapon.fields[i].baseDamage;
            }
            if (weapon.fields[i].weaponName) {
              input.dataset.weaponName = weapon.fields[i].weaponName;
            }
          }
        });
        // Preserve userModified on name input
        const nameInput = row.querySelector('.weapon-name');
        if (nameInput && weapon.userModified) {
          nameInput.dataset.userModified = weapon.userModified;
        }
        weaponIndex++;
      } else {
        // Clear remaining rows
        inputs.forEach(input => {
          input.value = '';
          delete input.dataset.baseDamage;
          delete input.dataset.weaponName;
          delete input.dataset.userModified;
        });
      }
    });
    
    this.scheduleAutoSave();
  },

  /**
   * Alphabetize ranged weapons
   */
  alphabetizeRangedWeapons() {
    const tbody = document.getElementById('ranged-weapons-body');
    if (!tbody) return;
    
    // Gather all weapons with data
    const weapons = [];
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const nameInput = row.querySelector('.weapon-name');
      if (nameInput && nameInput.value.trim()) {
        // Collect all field values
        const fields = Array.from(row.querySelectorAll('input')).map(input => ({
          value: input.value,
          baseDamage: input.dataset.baseDamage || '',
          weaponName: input.dataset.weaponName || '',
          userModified: input.dataset.userModified || ''
        }));
        weapons.push({
          name: nameInput.value.trim(),
          fields: fields,
          userModified: nameInput.dataset.userModified || ''
        });
      }
    });
    
    // Sort alphabetically by weapon name
    weapons.sort((a, b) => a.name.localeCompare(b.name));
    
    // Reassign to rows
    let weaponIndex = 0;
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      if (weaponIndex < weapons.length) {
        const weapon = weapons[weaponIndex];
        inputs.forEach((input, i) => {
          if (weapon.fields[i]) {
            input.value = weapon.fields[i].value;
            if (weapon.fields[i].baseDamage) {
              input.dataset.baseDamage = weapon.fields[i].baseDamage;
            }
            if (weapon.fields[i].weaponName) {
              input.dataset.weaponName = weapon.fields[i].weaponName;
            }
          }
        });
        // Preserve userModified on name input
        const nameInput = row.querySelector('.weapon-name');
        if (nameInput && weapon.userModified) {
          nameInput.dataset.userModified = weapon.userModified;
        }
        weaponIndex++;
      } else {
        // Clear remaining rows
        inputs.forEach(input => {
          input.value = '';
          delete input.dataset.baseDamage;
          delete input.dataset.weaponName;
          delete input.dataset.userModified;
        });
      }
    });
    
    this.scheduleAutoSave();
  },

  /**
   * Generic remove row with warning
   */
  removeRow(containerId, rowClass, typeName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const rows = container.querySelectorAll(`.${rowClass}`);
    if (rows.length <= 1) {
      alert(`Cannot remove the last ${typeName} row.`);
      return;
    }
    
    const lastRow = rows[rows.length - 1];
    const nameInput = lastRow.querySelector('input[type="text"]');
    const hasContent = nameInput && nameInput.value.trim();
    
    if (hasContent) {
      if (!confirm(`The last ${typeName} row contains "${nameInput.value}". Delete it permanently?`)) {
        return;
      }
    }
    
    lastRow.remove();
    this.scheduleAutoSave();
  },

  /**
   * Remove language row with warning
   */
  removeLanguageRow() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.language-row:not(.native)');
    if (rows.length <= 1) {
      alert('Cannot remove the last Language row.');
      return;
    }
    
    const lastRow = rows[rows.length - 1];
    const nameInput = lastRow.querySelector('.language-name');
    const hasContent = nameInput && nameInput.value.trim();
    
    if (hasContent) {
      if (!confirm(`The last Language row contains "${nameInput.value}". Delete it permanently?`)) {
        return;
      }
    }
    
    lastRow.remove();
    this.scheduleAutoSave();
  },

  /**
   * Remove belief row (passion/oath) with warning
   */
  removeBeliefRow(containerId, typeName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const rows = container.querySelectorAll('.belief-row');
    if (rows.length <= 1) {
      alert(`Cannot remove the last ${typeName} row.`);
      return;
    }
    
    const lastRow = rows[rows.length - 1];
    const nameInput = lastRow.querySelector('.belief-name');
    const hasContent = nameInput && nameInput.value.trim();
    
    if (hasContent) {
      if (!confirm(`The last ${typeName} row contains "${nameInput.value}". Delete it permanently?`)) {
        return;
      }
    }
    
    lastRow.remove();
    this.scheduleAutoSave();
  },

  /**
   * Remove equipment row with warning
   */
  removeEquipmentRow() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.equipment-row');
    if (rows.length <= 1) {
      alert('Cannot remove the last Equipment row.');
      return;
    }
    
    const lastRow = rows[rows.length - 1];
    const nameInput = lastRow.querySelector('.equipment-name');
    const hasContent = nameInput && nameInput.value.trim();
    
    if (hasContent) {
      if (!confirm(`The last Equipment row contains "${nameInput.value}". Delete it permanently?`)) {
        return;
      }
    }
    
    lastRow.remove();
    this.recalculateEncumbrance();
    this.scheduleAutoSave();
  },

  /**
   * Add a new passion row
   */
  addPassionRow() {
    const container = document.getElementById('passions-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.belief-row');
    const newIndex = rows.length + 1;
    
    const row = document.createElement('div');
    row.className = 'belief-row';
    row.dataset.index = newIndex;
    row.innerHTML = `
      <input type="text" class="belief-name" id="passion-${newIndex}-name" placeholder="">
      <input type="text" class="belief-formula-input" id="passion-${newIndex}-formula" value="POW+INT+50" placeholder="e.g. POW+INT+50">
      <span class="belief-base" id="passion-${newIndex}-base">0</span>
      <input type="number" class="belief-input" id="passion-${newIndex}-current" placeholder="">
    `;
    container.appendChild(row);
    
    // Add formula input listener
    const formulaInput = row.querySelector('.belief-formula-input');
    if (formulaInput) {
      formulaInput.addEventListener('input', () => {
        this.recalculateAll();
        this.scheduleAutoSave();
      });
    }
    
    this.recalculateAll();
    row.querySelector('.belief-name').focus();
    this.scheduleAutoSave();
  },

  /**
   * Add a new professional skill row
   */
  addProfessionalSkillRow() {
    const container = document.getElementById('professional-skills-container');
    if (!container) return;
    
    // Find current highest index
    const rows = container.querySelectorAll('.professional-skill-row');
    const newIndex = rows.length;
    
    const row = document.createElement('div');
    row.className = 'professional-skill-row';
    row.innerHTML = `
      <span class="prereq-keys" id="prof-skill-${newIndex}-prereq" data-skill-name=""></span>
      <input type="text" class="prof-skill-name" id="prof-skill-${newIndex}-name" placeholder="">
      <input type="text" class="prof-skill-base" id="prof-skill-${newIndex}-base" placeholder="" readonly>
      <span class="prof-skill-base-val" id="prof-skill-${newIndex}-base-val"></span>
      <input type="number" class="prof-skill-current" id="prof-skill-${newIndex}-current" placeholder="">
      <span class="enc-indicator prof-enc-indicator" id="prof-skill-${newIndex}-enc" style="display: none;" title="Affected by ENC"></span>
    `;
    container.appendChild(row);
    
    // Add event listeners
    this.setupProfessionalSkillRowListeners(row, newIndex);
    
    // Scroll to show new row
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    row.querySelector('.prof-skill-name').focus();
    
    this.scheduleAutoSave();
  },
  
  /**
   * Setup event listeners for a professional skill row
   */
  setupProfessionalSkillRowListeners(row, index) {
    const nameInput = row.querySelector('.prof-skill-name');
    const baseInput = row.querySelector('.prof-skill-base');
    const currentInput = row.querySelector('.prof-skill-current');
    const prereqKeys = row.querySelector('.prereq-keys');
    
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
          if (prereqKeys) prereqKeys.dataset.skillName = nameInput.value;
          this.updatePrereqKeys();
          this.scheduleAutoSave();
        }
      });
      
      nameInput.addEventListener('input', () => {
        this.autoFillProfessionalSkillFormula(nameInput, baseInput);
      });
    }
    
    if (baseInput) {
      baseInput.addEventListener('blur', () => {
        this.calculateProfessionalSkillBase(index);
      });
    }
    
    if (currentInput) {
      currentInput.addEventListener('input', () => this.scheduleAutoSave());
    }
  },

  /**
   * Add a new language row
   */
  addLanguageRow() {
    const container = document.getElementById('language-container');
    if (!container) return;
    
    // Find current highest index
    const rows = container.querySelectorAll('.language-row:not(.native)');
    const newIndex = rows.length + 2; // +2 because native is 1, first additional is 2
    
    const row = document.createElement('div');
    row.className = 'language-row';
    row.innerHTML = `
      <input type="text" class="language-name" id="language-${newIndex}-name" placeholder="">
      <span class="language-formula">INT+CHA</span>
      <span class="language-base" id="language-${newIndex}-base">0</span>
      <input type="number" class="language-input" id="language-${newIndex}-current" placeholder="">
    `;
    container.appendChild(row);
    
    // Calculate base value
    this.recalculateAll();
    
    // Scroll to show new row and focus
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    row.querySelector('.language-name').focus();
    
    this.scheduleAutoSave();
  },

  /**
   * Add a new oath row
   */
  addOathRow() {
    const container = document.getElementById('oaths-container');
    if (!container) return;
    
    // Find current highest index
    const rows = container.querySelectorAll('.belief-row');
    const newIndex = rows.length + 1;
    
    const row = document.createElement('div');
    row.className = 'belief-row';
    row.dataset.index = newIndex;
    row.innerHTML = `
      <input type="text" class="belief-name" id="oath-${newIndex}-name" placeholder="">
      <span class="belief-formula">POW+CHA+50</span>
      <span class="belief-base" id="oath-${newIndex}-base">0</span>
      <input type="number" class="belief-input" id="oath-${newIndex}-current" placeholder="">
    `;
    container.appendChild(row);
    
    // Calculate base value
    this.recalculateAll();
    
    // Focus the new row
    row.querySelector('.belief-name').focus();
    
    this.scheduleAutoSave();
  },

  /**
   * Add a new equipment row
   */
  addEquipmentRow() {
    const container = document.getElementById('equipment-container');
    if (!container) return;
    
    const rows = container.querySelectorAll('.equipment-row');
    const newIndex = rows.length;
    
    const row = document.createElement('div');
    row.className = 'equipment-row';
    row.innerHTML = `
      <input type="text" class="equipment-name" id="equip-${newIndex}-name" placeholder="">
      <input type="number" class="equipment-enc" id="equip-${newIndex}-enc" placeholder="" step="0.1">
    `;
    container.appendChild(row);
    
    // Add event listeners (same as generateEquipmentRows)
    const nameInput = row.querySelector('.equipment-name');
    const encInput = row.querySelector('.equipment-enc');
    const rowIndex = newIndex;
    
    nameInput.dataset.previousValue = '';
    
    nameInput.addEventListener('focus', () => {
      nameInput.dataset.previousValue = nameInput.value.trim().toLowerCase();
    });
    
    nameInput.addEventListener('blur', async () => {
      const currentValue = nameInput.value.trim().toLowerCase();
      const previousValue = nameInput.dataset.previousValue || '';
      
      if (previousValue && (!currentValue || currentValue !== previousValue)) {
        const removedContainer = this.getContainerIdFromItemName(previousValue);
        if (removedContainer) {
          const stillExists = this.containerStillExistsElsewhere(removedContainer, rowIndex);
          if (!stillExists) {
            const hasItems = this.containerHasItems(removedContainer);
            if (hasItems) {
              const handled = await this.handleContainerRemoval(removedContainer, nameInput, previousValue);
              if (!handled) {
                nameInput.value = previousValue;
                nameInput.dataset.previousValue = previousValue;
                return;
              }
            }
          }
        }
      }
      
      nameInput.dataset.previousValue = nameInput.value.trim().toLowerCase();
      
      if (nameInput.value.trim()) {
        let itemName = this.toTitleCase(nameInput.value.trim());
        const containerId = this.getContainerIdFromItemName(itemName);
        if (containerId && !itemName.toLowerCase().includes('see below')) {
          itemName = itemName + ' (see below)';
        }
        nameInput.value = itemName;
      }
      
      if (window.EncumbranceData) {
        const itemName = nameInput.value;
        if (itemName.trim() === '') {
          window.EncumbranceData.clearEquipmentEncIfEmpty('equip', rowIndex, itemName);
        } else {
          window.EncumbranceData.autofillEquipmentEnc('equip', rowIndex, itemName);
        }
        this.updateTotalEnc();
        this.updateContainerButtons();
        this.scheduleAutoSave();
      }
    });
    
    nameInput.addEventListener('input', () => {
      this.updateContainerButtons();
      this.scheduleAutoSave();
    });
    
    encInput.addEventListener('input', () => {
      this.updateTotalEnc();
      this.scheduleAutoSave();
    });
    
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    nameInput.focus();
    
    this.scheduleAutoSave();
  },

  /**
   * Alphabetize professional skills
   */
  alphabetizeProfessionalSkills() {
    // Gather all professional skills with their data
    const skills = [];
    for (let i = 0; i < 20; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const baseInput = document.getElementById(`prof-skill-${i}-base`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (nameInput && nameInput.value.trim()) {
        skills.push({
          name: nameInput.value.trim(),
          base: baseInput?.value || '',
          current: currentInput?.value || ''
        });
      }
    }
    
    // Sort alphabetically
    skills.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear all rows and re-populate
    for (let i = 0; i < 20; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const baseInput = document.getElementById(`prof-skill-${i}-base`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (i < skills.length) {
        nameInput.value = skills[i].name;
        baseInput.value = skills[i].base;
        currentInput.value = skills[i].current;
      } else {
        nameInput.value = '';
        baseInput.value = '';
        currentInput.value = '';
      }
      
      // Trigger base value calculation
      nameInput.dispatchEvent(new Event('blur', { bubbles: true }));
    }
    
    this.scheduleAutoSave();
  },

  /**
   * Setup EXP spending modal
   */
  setupExpModal() {
    const btn = document.getElementById('btn-spend-exp');
    if (btn) {
      btn.addEventListener('click', () => {
        this.openExpModal();
      });
    }
  },

  /**
   * Open the main EXP spending modal
   */
  openExpModal() {
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('exp-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'exp-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content exp-modal-content">
          <div class="modal-header">
            <h3>Spend EXP Rolls</h3>
            <button class="modal-close" id="exp-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="exp-modal-rolls">0</span>
            </div>
            <div class="exp-options">
              <button type="button" class="btn exp-option-btn" id="exp-btn-improve-skills">
                <span class="exp-option-icon">📈</span>
                <span class="exp-option-text">Improve Existing Skills</span>
              </button>
              <button type="button" class="btn exp-option-btn" id="exp-btn-unlock-abilities">
                <span class="exp-option-icon">⭐</span>
                <span class="exp-option-text">Unlock Class Abilities</span>
              </button>
              <button type="button" class="btn exp-option-btn" id="exp-btn-learn-skills">
                <span class="exp-option-icon">📚</span>
                <span class="exp-option-text">Learn New Skills</span>
              </button>
              <button type="button" class="btn exp-option-btn" id="exp-btn-passions">
                <span class="exp-option-icon">❤️</span>
                <span class="exp-option-text">Strengthen Passions, Alignment, or Oaths</span>
              </button>
              <button type="button" class="btn exp-option-btn" id="exp-btn-add-subclass">
                <span class="exp-option-icon">🎭</span>
                <span class="exp-option-text">Add New Sub-class</span>
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close button
      document.getElementById('exp-modal-close').addEventListener('click', () => {
        this.closeExpModal();
      });
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeExpModal();
        }
      });
      
      // Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeExpModal();
        }
      });
      
      // Option buttons
      document.getElementById('exp-btn-improve-skills').addEventListener('click', () => {
        this.openImproveSkillsModal();
      });
      
      document.getElementById('exp-btn-unlock-abilities').addEventListener('click', () => {
        this.openUnlockAbilitiesModal();
      });
      
      document.getElementById('exp-btn-learn-skills').addEventListener('click', () => {
        this.closeExpModal();
        this.openLearnNewSkillsModal();
      });
      
      document.getElementById('exp-btn-passions').addEventListener('click', () => {
        this.openStrengthenPassionsModal();
      });
      
      document.getElementById('exp-btn-add-subclass').addEventListener('click', () => {
        this.openAddSubclassModal();
      });
    }
    
    // Update EXP rolls display
    document.getElementById('exp-modal-rolls').textContent = expRolls;
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Close the main EXP modal
   */
  closeExpModal() {
    const modal = document.getElementById('exp-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  /**
   * Open the Improve Existing Skills modal
   */
  openImproveSkillsModal() {
    // Close the main EXP modal
    this.closeExpModal();
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('improve-skills-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'improve-skills-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content improve-skills-modal-content">
          <div class="modal-header">
            <h3>Improve Existing Skills</h3>
            <button class="modal-close" id="improve-skills-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="improve-skills-exp-rolls">0</span>
            </div>
            <p class="improve-skills-instructions">Select skills to attempt improvement (1 EXP Roll each):</p>
            <div class="skills-columns skills-columns-4">
              <div class="skill-column">
                <h4>Standard Skills</h4>
                <div class="skill-list" id="improve-standard-skills"></div>
              </div>
              <div class="skill-column">
                <h4>Professional Skills</h4>
                <div class="skill-list" id="improve-professional-skills"></div>
              </div>
              <div class="skill-column">
                <h4>Combat</h4>
                <div class="skill-list" id="improve-combat-skills"></div>
              </div>
              <div class="skill-column">
                <h4>Magical Skills</h4>
                <div class="skill-list" id="improve-magical-skills"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="improve-skills-back">Back</button>
            <button type="button" class="btn btn-secondary" id="improve-skills-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="improve-skills-continue" disabled>Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close button
      document.getElementById('improve-skills-modal-close').addEventListener('click', () => {
        this.closeImproveSkillsModal();
      });
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeImproveSkillsModal();
        }
      });
      
      // Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeImproveSkillsModal();
        }
      });
      
      // Back button
      document.getElementById('improve-skills-back').addEventListener('click', () => {
        this.closeImproveSkillsModal();
        this.openExpModal();
      });
      
      // Cancel button
      document.getElementById('improve-skills-cancel').addEventListener('click', () => {
        this.closeImproveSkillsModal();
      });
      
      // Continue button
      document.getElementById('improve-skills-continue').addEventListener('click', () => {
        this.processSkillImprovement();
      });
    }
    
    // Populate skill lists
    this.populateImprovementSkills();
    
    // Update EXP rolls display
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    document.getElementById('improve-skills-exp-rolls').textContent = expRolls;
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Populate the skill lists for improvement
   */
  populateImprovementSkills() {
    const standardContainer = document.getElementById('improve-standard-skills');
    const professionalContainer = document.getElementById('improve-professional-skills');
    const combatContainer = document.getElementById('improve-combat-skills');
    const magicalContainer = document.getElementById('improve-magical-skills');
    
    // Clear existing
    standardContainer.innerHTML = '';
    professionalContainer.innerHTML = '';
    combatContainer.innerHTML = '';
    magicalContainer.innerHTML = '';
    
    // Get class names for prereq checking
    const primaryClass = document.getElementById('class-primary')?.value || '';
    const secondaryClass = document.getElementById('class-secondary')?.value || '';
    const tertiaryClass = document.getElementById('class-tertiary')?.value || '';
    
    // Helper to get prereq class level (1=primary, 2=secondary, 3=tertiary, 0=none)
    const getPrereqLevel = (skillName) => {
      // Use the global isPrereqForClass function from class-ranks-data.js
      if (typeof isPrereqForClass === 'function') {
        if (primaryClass && isPrereqForClass(skillName, primaryClass)) return 1;
        if (secondaryClass && isPrereqForClass(skillName, secondaryClass)) return 2;
        if (tertiaryClass && isPrereqForClass(skillName, tertiaryClass)) return 3;
      }
      return 0;
    };
    
    // Helper to create skill row HTML with prereq coloring
    const createSkillRow = (value, skillName, current, displayName) => {
      const prereqLevel = getPrereqLevel(skillName);
      const prereqClass = prereqLevel > 0 ? `prereq-class-${prereqLevel}` : '';
      return `
        <label class="skill-checkbox-row ${prereqClass}">
          <input type="checkbox" name="improve-skill" value="${value}" data-skill-value="${current}">
          <span class="skill-name">${displayName || skillName}</span>
          <span class="skill-value">${current}%</span>
        </label>
      `;
    };
    
    // Standard Skills (removed home-parallel and unarmed - unarmed goes to Combat)
    const standardSkills = [
      'athletics', 'boating', 'brawn', 'conceal', 'customs', 'dance', 'deceit',
      'drive', 'endurance', 'evade', 'first-aid', 'influence',
      'insight', 'locale', 'perception', 'ride', 'sing', 'stealth', 'swim',
      'willpower'
    ];
    
    const standardLabels = {
      'athletics': 'Athletics', 'boating': 'Boating', 'brawn': 'Brawn', 
      'conceal': 'Conceal', 'customs': 'Customs', 'dance': 'Dance',
      'deceit': 'Deceit', 'drive': 'Drive', 'endurance': 'Endurance',
      'evade': 'Evade', 'first-aid': 'First Aid',
      'influence': 'Influence', 'insight': 'Insight', 'locale': 'Locale',
      'perception': 'Perception', 'ride': 'Ride', 'sing': 'Sing',
      'stealth': 'Stealth', 'swim': 'Swim', 'willpower': 'Willpower'
    };
    
    standardSkills.forEach(skillId => {
      const currentEl = document.getElementById(`${skillId}-current`);
      const current = currentEl?.value || currentEl?.textContent || '0';
      const skillName = standardLabels[skillId] || skillId;
      
      standardContainer.innerHTML += createSkillRow(`standard:${skillId}`, skillName, current, skillName);
    });
    
    // Professional Skills (from the character sheet) - collect and sort alphabetically
    const profSkills = [];
    for (let i = 0; i < 20; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      const currentInput = document.getElementById(`prof-skill-${i}-current`);
      
      if (nameInput && nameInput.value.trim()) {
        profSkills.push({
          index: i,
          name: nameInput.value.trim(),
          current: currentInput?.value || '0'
        });
      }
    }
    
    // Sort alphabetically
    profSkills.sort((a, b) => a.name.localeCompare(b.name));
    
    profSkills.forEach(skill => {
      professionalContainer.innerHTML += createSkillRow(`prof:${skill.index}`, skill.name, skill.current, skill.name);
    });
    
    // Combat Skills - Combat Skill and Unarmed
    const combatSkillName = document.getElementById('combat-skill-1-name')?.value || 'Combat Skill';
    const combatSkillCurrent = document.getElementById('combat-skill-1-percent')?.value || '0';
    combatContainer.innerHTML += createSkillRow('combat', combatSkillName, combatSkillCurrent, combatSkillName);
    
    // Unarmed
    const unarmedCurrent = document.getElementById('unarmed-percent')?.value || '0';
    combatContainer.innerHTML += createSkillRow('standard:unarmed', 'Unarmed', unarmedCurrent, 'Unarmed');
    
    // Magical Skills - from the spell pages
    const magicalSkillDefs = [
      { id: 'channel-percent', name: 'Channel' },
      { id: 'piety-percent', name: 'Piety' },
      { id: 'arcane-casting-percent', name: 'Arcane Casting' },
      { id: 'arcane-knowledge-percent', name: 'Arcane Knowledge' },
      { id: 'arcane-sorcery-percent', name: 'Arcane Sorcery' },
      { id: 'sorcerous-wisdom-percent', name: 'Sorcerous Wisdom' },
      { id: 'musicianship-percent', name: 'Musicianship' },
      { id: 'lyrical-magic-percent', name: 'Lyrical Magic' }
    ];
    
    magicalSkillDefs.forEach(skill => {
      const el = document.getElementById(skill.id);
      if (el && el.value) {
        const current = el.value || '0';
        magicalContainer.innerHTML += createSkillRow(`magic:${skill.id}`, skill.name, current, skill.name);
      }
    });
    
    // If no magical skills, show message
    if (magicalContainer.innerHTML === '') {
      magicalContainer.innerHTML = '<p class="no-skills-message">No magical skills</p>';
    }
    
    // Add legend if any classes are set
    this.updateSkillsLegend(primaryClass, secondaryClass, tertiaryClass);
    
    // Add change listeners to enable/disable Continue button
    this.updateContinueButton();
    document.querySelectorAll('#improve-skills-modal input[name="improve-skill"]').forEach(cb => {
      cb.addEventListener('change', () => this.updateContinueButton());
    });
  },

  /**
   * Update the prereq skills legend
   */
  updateSkillsLegend(primaryClass, secondaryClass, tertiaryClass) {
    let legendContainer = document.getElementById('skills-prereq-legend');
    if (!legendContainer) {
      // Create legend container after skills-columns
      const skillsColumns = document.querySelector('.skills-columns');
      if (skillsColumns) {
        legendContainer = document.createElement('div');
        legendContainer.id = 'skills-prereq-legend';
        legendContainer.className = 'skills-prereq-legend';
        skillsColumns.parentNode.insertBefore(legendContainer, skillsColumns.nextSibling);
      }
    }
    
    if (!legendContainer) return;
    
    // Build legend HTML
    let legendItems = [];
    if (primaryClass) {
      legendItems.push(`<span class="legend-item"><span class="legend-color prereq-class-1"></span> ${primaryClass} (Primary)</span>`);
    }
    if (secondaryClass) {
      legendItems.push(`<span class="legend-item"><span class="legend-color prereq-class-2"></span> ${secondaryClass} (Secondary)</span>`);
    }
    if (tertiaryClass) {
      legendItems.push(`<span class="legend-item"><span class="legend-color prereq-class-3"></span> ${tertiaryClass} (Tertiary)</span>`);
    }
    
    if (legendItems.length > 0) {
      legendContainer.innerHTML = `<span class="legend-label">Prerequisite Skills:</span> ${legendItems.join('')}`;
      legendContainer.style.display = 'flex';
    } else {
      legendContainer.style.display = 'none';
    }
  },

  /**
   * Update the Continue button state based on selections
   */
  updateContinueButton() {
    const checked = document.querySelectorAll('#improve-skills-modal input[name="improve-skill"]:checked');
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    const continueBtn = document.getElementById('improve-skills-continue');
    
    if (continueBtn) {
      // Enable if at least one skill selected and have enough EXP rolls
      continueBtn.disabled = checked.length === 0 || checked.length > expRolls;
      
      // Update button text to show count
      if (checked.length > 0) {
        continueBtn.textContent = `Continue (${checked.length} skill${checked.length > 1 ? 's' : ''})`;
      } else {
        continueBtn.textContent = 'Continue';
      }
    }
  },

  /**
   * Close the Improve Skills modal
   */
  closeImproveSkillsModal() {
    const modal = document.getElementById('improve-skills-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  /**
   * Open the Strengthen Passions, Alignment, or Oaths modal
   */
  openStrengthenPassionsModal() {
    // Close the main EXP modal
    this.closeExpModal();
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('strengthen-passions-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'strengthen-passions-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content improve-skills-modal-content">
          <div class="modal-header">
            <h3>Strengthen Passions, Alignment, or Oaths</h3>
            <button class="modal-close" id="strengthen-passions-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="strengthen-passions-exp-rolls">0</span>
            </div>
            <p class="improve-skills-instructions">Select items to attempt strengthening (1 EXP Roll each):</p>
            <div class="skills-columns skills-columns-3">
              <div class="skill-column">
                <h4>Alignment</h4>
                <div class="skill-list" id="strengthen-alignment-list"></div>
              </div>
              <div class="skill-column">
                <h4>Passions</h4>
                <div class="skill-list" id="strengthen-passions-list"></div>
              </div>
              <div class="skill-column">
                <h4>Oaths</h4>
                <div class="skill-list" id="strengthen-oaths-list"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="strengthen-passions-back">Back</button>
            <button type="button" class="btn btn-secondary" id="strengthen-passions-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="strengthen-passions-continue" disabled>Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close button
      document.getElementById('strengthen-passions-modal-close').addEventListener('click', () => {
        this.closeStrengthenPassionsModal();
      });
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeStrengthenPassionsModal();
        }
      });
      
      // Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeStrengthenPassionsModal();
        }
      });
      
      // Back button
      document.getElementById('strengthen-passions-back').addEventListener('click', () => {
        this.closeStrengthenPassionsModal();
        this.openExpModal();
      });
      
      // Cancel button
      document.getElementById('strengthen-passions-cancel').addEventListener('click', () => {
        this.closeStrengthenPassionsModal();
      });
      
      // Continue button
      document.getElementById('strengthen-passions-continue').addEventListener('click', () => {
        this.processPassionStrengthening();
      });
    }
    
    // Populate the lists
    this.populateStrengthenPassions();
    
    // Update EXP rolls display
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    document.getElementById('strengthen-passions-exp-rolls').textContent = expRolls;
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Populate the Passions, Alignment, and Oaths lists for strengthening
   */
  populateStrengthenPassions() {
    const alignmentContainer = document.getElementById('strengthen-alignment-list');
    const passionsContainer = document.getElementById('strengthen-passions-list');
    const oathsContainer = document.getElementById('strengthen-oaths-list');
    
    // Clear existing
    alignmentContainer.innerHTML = '';
    passionsContainer.innerHTML = '';
    oathsContainer.innerHTML = '';
    
    // Helper to create row HTML
    const createRow = (value, name, current) => {
      return `
        <label class="skill-checkbox-row">
          <input type="checkbox" name="strengthen-passion" value="${value}" data-skill-value="${current}">
          <span class="skill-name">${name}</span>
          <span class="skill-value">${current}%</span>
        </label>
      `;
    };
    
    // Alignment (2 fixed slots)
    for (let i = 1; i <= 2; i++) {
      const nameInput = document.getElementById(`alignment-${i}-name`);
      const currentInput = document.getElementById(`alignment-${i}-current`);
      
      if (nameInput && nameInput.value.trim()) {
        const name = nameInput.value.trim();
        const current = currentInput?.value || '0';
        alignmentContainer.innerHTML += createRow(`alignment:${i}`, name, current);
      }
    }
    
    if (alignmentContainer.innerHTML === '') {
      alignmentContainer.innerHTML = '<p class="no-skills-message">No alignments defined</p>';
    }
    
    // Passions (dynamically added, check container)
    const passionsData = [];
    const passionsContainerEl = document.getElementById('passions-container');
    if (passionsContainerEl) {
      const passionRows = passionsContainerEl.querySelectorAll('.belief-row');
      passionRows.forEach(row => {
        const index = row.dataset.index;
        const nameInput = row.querySelector(`#passion-${index}-name`);
        const currentInput = row.querySelector(`#passion-${index}-current`);
        
        if (nameInput && nameInput.value.trim()) {
          passionsData.push({
            index: index,
            name: nameInput.value.trim(),
            current: currentInput?.value || '0'
          });
        }
      });
    }
    
    // Sort alphabetically
    passionsData.sort((a, b) => a.name.localeCompare(b.name));
    
    passionsData.forEach(passion => {
      passionsContainer.innerHTML += createRow(`passion:${passion.index}`, passion.name, passion.current);
    });
    
    if (passionsContainer.innerHTML === '') {
      passionsContainer.innerHTML = '<p class="no-skills-message">No passions defined</p>';
    }
    
    // Oaths (dynamically added, check container)
    const oathsData = [];
    const oathsContainerEl = document.getElementById('oaths-container');
    if (oathsContainerEl) {
      const oathRows = oathsContainerEl.querySelectorAll('.belief-row');
      oathRows.forEach(row => {
        const index = row.dataset.index;
        const nameInput = row.querySelector(`#oath-${index}-name`);
        const currentInput = row.querySelector(`#oath-${index}-current`);
        
        if (nameInput && nameInput.value.trim()) {
          oathsData.push({
            index: index,
            name: nameInput.value.trim(),
            current: currentInput?.value || '0'
          });
        }
      });
    }
    
    // Sort alphabetically
    oathsData.sort((a, b) => a.name.localeCompare(b.name));
    
    oathsData.forEach(oath => {
      oathsContainer.innerHTML += createRow(`oath:${oath.index}`, oath.name, oath.current);
    });
    
    if (oathsContainer.innerHTML === '') {
      oathsContainer.innerHTML = '<p class="no-skills-message">No oaths defined</p>';
    }
    
    // Add change listeners to enable/disable Continue button
    this.updateStrengthenContinueButton();
    document.querySelectorAll('#strengthen-passions-modal input[name="strengthen-passion"]').forEach(cb => {
      cb.addEventListener('change', () => this.updateStrengthenContinueButton());
    });
  },

  /**
   * Update the Continue button state for Strengthen Passions modal
   */
  updateStrengthenContinueButton() {
    const checked = document.querySelectorAll('#strengthen-passions-modal input[name="strengthen-passion"]:checked');
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    const continueBtn = document.getElementById('strengthen-passions-continue');
    
    if (continueBtn) {
      continueBtn.disabled = checked.length === 0 || checked.length > expRolls;
      
      // Update button text to show count
      if (checked.length > expRolls) {
        continueBtn.textContent = `Not enough EXP (${checked.length} selected, ${expRolls} available)`;
      } else if (checked.length > 0) {
        continueBtn.textContent = `Continue (${checked.length} selected)`;
      } else {
        continueBtn.textContent = 'Continue';
      }
    }
  },

  /**
   * Close the Strengthen Passions modal
   */
  closeStrengthenPassionsModal() {
    const modal = document.getElementById('strengthen-passions-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  /**
   * Open the Add New Sub-class modal
   */
  openAddSubclassModal() {
    // Close the main EXP modal
    this.closeExpModal();
    
    // Get current class info
    const primaryClass = document.getElementById('class-primary')?.value?.trim() || '';
    const secondaryClass = document.getElementById('class-secondary')?.value?.trim() || '';
    const tertiaryClass = document.getElementById('class-tertiary')?.value?.trim() || '';
    const primaryRank = parseInt(document.getElementById('rank-primary')?.value, 10) || 0;
    const species = document.getElementById('species')?.value?.trim().toLowerCase() || '';
    const isSyrin = species === 'syrin';
    
    // Check if can add subclass
    const cannotMulticlass = ['anti-paladin', 'berserker', 'cavalier', 'monk', 'paladin'];
    const currentClasses = [primaryClass, secondaryClass, tertiaryClass].filter(c => c).map(c => c.toLowerCase());
    
    // Determine which slot we're filling
    let targetSlot = '';
    if (!secondaryClass) {
      targetSlot = 'secondary';
    } else if (!tertiaryClass) {
      targetSlot = 'tertiary';
    }
    
    // Check restrictions
    let errorMessage = '';
    if (!primaryClass) {
      errorMessage = 'You must have a primary class before adding a sub-class.';
    } else if (currentClasses.length >= 3) {
      errorMessage = 'You already have the maximum of 3 classes.';
    } else if (cannotMulticlass.includes(primaryClass.toLowerCase())) {
      errorMessage = `${primaryClass} cannot multi-class.`;
    } else if (primaryRank < 1) {
      errorMessage = 'You must be at least Rank 1 in your primary class to add a sub-class.';
    }
    
    // Calculate cost
    const expCost = primaryRank;
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('add-subclass-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'add-subclass-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content add-subclass-modal-content">
          <div class="modal-header">
            <h3>Add New Sub-class</h3>
            <button class="modal-close" id="add-subclass-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="add-subclass-exp-rolls">0</span>
            </div>
            <div class="subclass-cost-display" id="subclass-cost-display">
              <span class="subclass-cost-label">Cost:</span>
              <span class="subclass-cost-value" id="subclass-cost-value">0</span>
              <span class="subclass-cost-note" id="subclass-cost-note"></span>
            </div>
            <div class="subclass-error" id="subclass-error"></div>
            <div class="subclass-selection" id="subclass-selection">
              <label for="subclass-select">Choose a class:</label>
              <select id="subclass-select" class="subclass-select">
                <option value="">-- Select a Class --</option>
              </select>
              <div class="subclass-restriction-note" id="subclass-restriction-note"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="add-subclass-back">Back</button>
            <button type="button" class="btn btn-secondary" id="add-subclass-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="add-subclass-confirm" disabled>Add Sub-class</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close button
      document.getElementById('add-subclass-modal-close').addEventListener('click', () => {
        this.closeAddSubclassModal();
      });
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAddSubclassModal();
        }
      });
      
      // Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeAddSubclassModal();
        }
      });
      
      // Back button
      document.getElementById('add-subclass-back').addEventListener('click', () => {
        this.closeAddSubclassModal();
        this.openExpModal();
      });
      
      // Cancel button
      document.getElementById('add-subclass-cancel').addEventListener('click', () => {
        this.closeAddSubclassModal();
      });
      
      // Select change
      document.getElementById('subclass-select').addEventListener('change', () => {
        this.updateSubclassConfirmButton();
      });
      
      // Confirm button
      document.getElementById('add-subclass-confirm').addEventListener('click', () => {
        this.confirmAddSubclass();
      });
    }
    
    // Update display
    document.getElementById('add-subclass-exp-rolls').textContent = expRolls;
    document.getElementById('subclass-cost-value').textContent = expCost + ' EXP Rolls';
    document.getElementById('subclass-cost-note').textContent = `(Based on Rank ${primaryRank} in ${primaryClass})`;
    
    // Show error or selection
    const errorDiv = document.getElementById('subclass-error');
    const selectionDiv = document.getElementById('subclass-selection');
    const costDisplay = document.getElementById('subclass-cost-display');
    
    if (errorMessage) {
      errorDiv.textContent = errorMessage;
      errorDiv.style.display = 'block';
      selectionDiv.style.display = 'none';
      costDisplay.style.display = 'none';
    } else {
      errorDiv.style.display = 'none';
      selectionDiv.style.display = 'block';
      costDisplay.style.display = 'flex';
      
      // Populate class options
      this.populateSubclassOptions(currentClasses, isSyrin);
    }
    
    // Store target slot and cost for confirm
    modal.dataset.targetSlot = targetSlot;
    modal.dataset.expCost = expCost;
    
    // Update confirm button state
    this.updateSubclassConfirmButton();
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Populate the sub-class dropdown with available classes
   */
  populateSubclassOptions(currentClasses, isSyrin) {
    const select = document.getElementById('subclass-select');
    const restrictionNote = document.getElementById('subclass-restriction-note');
    
    // All available classes
    const allClasses = [
      'Anti-Paladin', 'Bard', 'Berserker', 'Cavalier', 'Cleric', 'Druid',
      'Fighter', 'Mage', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlord'
    ];
    
    // Classes that cannot multi-class at all
    const cannotMulticlass = ['anti-paladin', 'berserker', 'cavalier', 'monk', 'paladin'];
    
    // Incompatible pairs
    const incompatibilities = {
      'cleric': ['druid'],
      'druid': ['cleric'],
      'ranger': ['fighter'],
      'fighter': ['ranger'],
      'sorcerer': ['bard', 'mage'],
      'bard': ['sorcerer'],
      'mage': ['sorcerer']
    };
    
    // Build list of incompatible classes based on current classes
    const incompatibleClasses = new Set();
    currentClasses.forEach(cls => {
      const clsLower = cls.toLowerCase();
      if (incompatibilities[clsLower]) {
        incompatibilities[clsLower].forEach(inc => incompatibleClasses.add(inc));
      }
    });
    
    // Clear and rebuild options
    select.innerHTML = '<option value="">-- Select a Class --</option>';
    
    const restrictions = [];
    
    allClasses.forEach(cls => {
      const clsLower = cls.toLowerCase();
      
      // Skip if already has this class
      if (currentClasses.includes(clsLower)) return;
      
      // Skip if cannot multi-class
      if (cannotMulticlass.includes(clsLower)) {
        restrictions.push(`${cls} cannot multi-class`);
        return;
      }
      
      // Skip if Syrin and Mage/Sorcerer
      if (isSyrin && (clsLower === 'mage' || clsLower === 'sorcerer')) {
        restrictions.push(`Syrin cannot be ${cls}`);
        return;
      }
      
      // Skip if incompatible with current classes
      if (incompatibleClasses.has(clsLower)) {
        const conflictWith = currentClasses.find(c => {
          const incs = incompatibilities[c.toLowerCase()];
          return incs && incs.includes(clsLower);
        });
        restrictions.push(`${cls} incompatible with ${conflictWith}`);
        return;
      }
      
      // Add option
      const option = document.createElement('option');
      option.value = cls;
      option.textContent = cls;
      select.appendChild(option);
    });
    
    // Show restrictions note if any
    if (restrictions.length > 0) {
      restrictionNote.innerHTML = '<strong>Unavailable:</strong> ' + restrictions.join('; ');
      restrictionNote.style.display = 'block';
    } else {
      restrictionNote.style.display = 'none';
    }
  },

  /**
   * Update the confirm button state for Add Sub-class
   */
  updateSubclassConfirmButton() {
    const select = document.getElementById('subclass-select');
    const confirmBtn = document.getElementById('add-subclass-confirm');
    const modal = document.getElementById('add-subclass-modal');
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    const expCost = parseInt(modal?.dataset.expCost, 10) || 0;
    
    const selectedClass = select?.value || '';
    const canAfford = expRolls >= expCost;
    
    if (confirmBtn) {
      confirmBtn.disabled = !selectedClass || !canAfford;
      
      if (!canAfford && selectedClass) {
        confirmBtn.textContent = `Not enough EXP (need ${expCost})`;
      } else if (selectedClass) {
        confirmBtn.textContent = `Add ${selectedClass} (${expCost} EXP)`;
      } else {
        confirmBtn.textContent = 'Add Sub-class';
      }
    }
  },

  /**
   * Close the Add Sub-class modal
   */
  closeAddSubclassModal() {
    const modal = document.getElementById('add-subclass-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  /**
   * Confirm adding the sub-class
   */
  confirmAddSubclass() {
    const modal = document.getElementById('add-subclass-modal');
    const select = document.getElementById('subclass-select');
    const selectedClass = select?.value || '';
    const targetSlot = modal?.dataset.targetSlot || '';
    const expCost = parseInt(modal?.dataset.expCost, 10) || 0;
    
    if (!selectedClass || !targetSlot) return;
    
    // Set the new class
    const classInput = document.getElementById(`class-${targetSlot}`);
    const rankInput = document.getElementById(`rank-${targetSlot}`);
    
    if (classInput) {
      classInput.value = selectedClass;
      classInput.dispatchEvent(new Event('input', { bubbles: true }));
      classInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    if (rankInput) {
      rankInput.value = 0;
      rankInput.dispatchEvent(new Event('input', { bubbles: true }));
      rankInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Deduct EXP rolls
    const expRollsInput = document.getElementById('exp-rolls');
    if (expRollsInput) {
      const currentExp = parseInt(expRollsInput.value, 10) || 0;
      expRollsInput.value = Math.max(0, currentExp - expCost);
      expRollsInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Trigger recalculations
    this.recalculateAll();
    this.updateMagicVisibility();
    this.updatePrereqKeys();
    
    // Close modal and show success
    this.closeAddSubclassModal();
    
    // Show confirmation message
    alert(`Added ${selectedClass} as your ${targetSlot === 'secondary' ? '2nd' : '3rd'} class at Rank 0!\n\nSpent ${expCost} EXP Rolls.`);
    
    // Auto-save
    this.scheduleAutoSave();
  },

  /**
   * Open the Unlock Class Abilities modal
   */
  openUnlockAbilitiesModal() {
    // Close the main EXP modal
    this.closeExpModal();
    
    // Get character's classes and ranks
    const classes = this.getCharacterClasses();
    
    if (classes.length === 0) {
      alert('You must have at least one class to unlock abilities.');
      return;
    }
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('unlock-abilities-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'unlock-abilities-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content unlock-abilities-modal-content">
          <div class="modal-header">
            <h3>Unlock Class Abilities</h3>
            <button class="modal-close" id="unlock-abilities-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="unlock-abilities-exp-rolls">0</span>
            </div>
            <div class="class-tabs" id="unlock-abilities-class-tabs"></div>
            <div class="rank-tabs" id="unlock-abilities-rank-tabs"></div>
            <div class="abilities-container" id="unlock-abilities-container">
              <div class="abilities-section available-abilities">
                <h4>Available Abilities</h4>
                <div class="abilities-list" id="available-abilities-list"></div>
              </div>
              <hr class="abilities-divider unqualified-divider">
              <div class="abilities-section unqualified-abilities">
                <h4>Not Yet Qualified</h4>
                <div class="abilities-list" id="unqualified-abilities-list"></div>
              </div>
              <hr class="abilities-divider acquired-divider">
              <div class="abilities-section acquired-abilities">
                <h4>Already Acquired</h4>
                <div class="abilities-list" id="acquired-abilities-list"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="unlock-abilities-back">Back</button>
            <button type="button" class="btn btn-secondary" id="unlock-abilities-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="unlock-abilities-confirm" disabled>Unlock Selected</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close button
      document.getElementById('unlock-abilities-modal-close').addEventListener('click', () => {
        this.closeUnlockAbilitiesModal();
      });
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeUnlockAbilitiesModal();
        }
      });
      
      // Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeUnlockAbilitiesModal();
        }
      });
      
      // Back button
      document.getElementById('unlock-abilities-back').addEventListener('click', () => {
        this.closeUnlockAbilitiesModal();
        this.openExpModal();
      });
      
      // Cancel button
      document.getElementById('unlock-abilities-cancel').addEventListener('click', () => {
        this.closeUnlockAbilitiesModal();
      });
      
      // Confirm button
      document.getElementById('unlock-abilities-confirm').addEventListener('click', () => {
        this.confirmUnlockAbilities();
      });
    }
    
    // Store classes info on modal
    modal.dataset.classes = JSON.stringify(classes);
    
    // Update EXP rolls display
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    document.getElementById('unlock-abilities-exp-rolls').textContent = expRolls;
    
    // Build class tabs
    this.buildClassTabs(classes);
    
    // Select first class by default
    if (classes.length > 0) {
      this.selectClassTab(classes[0].name, classes[0].rank);
    }
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Get character's classes and ranks
   */
  getCharacterClasses() {
    const classes = [];
    
    const primary = document.getElementById('class-primary')?.value?.trim();
    const primaryRank = parseInt(document.getElementById('rank-primary')?.value, 10) || 0;
    if (primary) {
      classes.push({ name: primary, rank: primaryRank, slot: 'primary' });
    }
    
    const secondary = document.getElementById('class-secondary')?.value?.trim();
    const secondaryRank = parseInt(document.getElementById('rank-secondary')?.value, 10) || 0;
    if (secondary) {
      classes.push({ name: secondary, rank: secondaryRank, slot: 'secondary' });
    }
    
    const tertiary = document.getElementById('class-tertiary')?.value?.trim();
    const tertiaryRank = parseInt(document.getElementById('rank-tertiary')?.value, 10) || 0;
    if (tertiary) {
      classes.push({ name: tertiary, rank: tertiaryRank, slot: 'tertiary' });
    }
    
    return classes;
  },

  /**
   * Build class tabs for the unlock abilities modal
   */
  buildClassTabs(classes) {
    const container = document.getElementById('unlock-abilities-class-tabs');
    container.innerHTML = '';
    
    classes.forEach((cls, index) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'class-tab' + (index === 0 ? ' active' : '');
      tab.dataset.className = cls.name;
      tab.dataset.classRank = cls.rank;
      tab.innerHTML = `${cls.name} <span class="rank-badge">Rank ${cls.rank}</span>`;
      tab.addEventListener('click', () => {
        this.selectClassTab(cls.name, cls.rank);
      });
      container.appendChild(tab);
    });
  },

  /**
   * Select a class tab and populate rank tabs
   */
  selectClassTab(className, classRank) {
    // Update active class tab
    document.querySelectorAll('.class-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.className === className);
    });
    
    // Store selected class
    const modal = document.getElementById('unlock-abilities-modal');
    modal.dataset.selectedClass = className;
    modal.dataset.selectedClassRank = classRank;
    
    // Build rank tabs (1 through current rank - Rank 0 has no abilities)
    this.buildRankTabs(classRank);
    
    // Find the lowest rank where the character hasn't taken all abilities
    const selectedRank = this.findLowestIncompleteRank(className, classRank);
    if (classRank >= 1) {
      this.selectRankTab(selectedRank);
    }
  },

  /**
   * Find the lowest rank where the character hasn't acquired all available abilities
   */
  findLowestIncompleteRank(className, maxRank) {
    if (maxRank < 1) return 1;
    
    const acquiredAbilities = this.getAcquiredAbilities();
    const charIncreases = this.character.characteristicIncreases || [];
    const getSkillValue = (skillName) => this.getSkillValueByName(skillName);
    
    for (let rank = 1; rank <= maxRank; rank++) {
      const abilities = getRankedAbilitiesForClass(className, rank);
      
      // Check if any abilities at this rank are still available (not acquired and prereqs met)
      for (const ability of abilities) {
        // Special handling for Characteristic Increase
        if (ability.name === 'Characteristic Increase') {
          const charIncreasesAtThisRank = charIncreases.filter(inc => inc.rank === rank);
          if (charIncreasesAtThisRank.length === 0) {
            // Haven't taken Characteristic Increase at this rank
            return rank;
          }
          continue;
        }
        
        // Check if already acquired
        const alreadyHas = hasAbility(ability.name, acquiredAbilities);
        const repeatable = isRepeatableAbility(ability.name);
        
        if (!alreadyHas || repeatable) {
          // Check prerequisites
          const prereqCheck = checkAbilityPrereqs(ability.prereqs, acquiredAbilities, getSkillValue);
          if (prereqCheck.met) {
            // Found an available ability at this rank
            return rank;
          }
        }
      }
    }
    
    // All abilities acquired at all ranks, default to highest rank
    return maxRank;
  },

  /**
   * Build rank tabs for the selected class (starting at Rank 1, since Rank 0 has no abilities)
   */
  buildRankTabs(maxRank) {
    const container = document.getElementById('unlock-abilities-rank-tabs');
    container.innerHTML = '';
    
    // Start at Rank 1 (Rank 0 has no purchasable abilities)
    for (let r = 1; r <= maxRank; r++) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'rank-tab';
      tab.dataset.rank = r;
      tab.textContent = `Rank ${r}`;
      tab.addEventListener('click', () => {
        this.selectRankTab(r);
      });
      container.appendChild(tab);
    }
    
    // If maxRank is 0, show a message
    if (maxRank === 0) {
      container.innerHTML = '<span class="no-ranks-message">Rank 0 has no purchasable abilities</span>';
    }
  },

  /**
   * Select a rank tab and populate abilities
   */
  selectRankTab(rank) {
    // Update active rank tab
    document.querySelectorAll('.rank-tab').forEach(tab => {
      tab.classList.toggle('active', parseInt(tab.dataset.rank, 10) === rank);
    });
    
    const modal = document.getElementById('unlock-abilities-modal');
    modal.dataset.selectedRank = rank;
    
    // Populate abilities for selected class and rank
    const className = modal.dataset.selectedClass;
    this.populateAbilities(className, rank);
  },

  /**
   * Populate abilities list for a class and rank
   */
  populateAbilities(className, rank) {
    const availableList = document.getElementById('available-abilities-list');
    const unqualifiedList = document.getElementById('unqualified-abilities-list');
    const acquiredList = document.getElementById('acquired-abilities-list');
    
    availableList.innerHTML = '';
    unqualifiedList.innerHTML = '';
    acquiredList.innerHTML = '';
    
    // Get abilities for this class at this rank
    const abilities = getRankedAbilitiesForClass(className, rank);
    
    if (abilities.length === 0) {
      availableList.innerHTML = '<p class="no-abilities">No abilities available at this rank for this class.</p>';
      document.querySelector('.unqualified-divider').style.display = 'none';
      document.querySelector('.unqualified-abilities').style.display = 'none';
      document.querySelector('.acquired-divider').style.display = 'none';
      document.querySelector('.acquired-abilities').style.display = 'none';
      return;
    }
    
    // Get acquired abilities
    const acquiredAbilities = this.getAcquiredAbilities();
    
    // Get characteristic increases for this character
    const charIncreases = this.character.characteristicIncreases || [];
    const charIncreasesAtThisRank = charIncreases.filter(inc => inc.rank === rank);
    
    // Helper to get skill value
    const getSkillValue = (skillName) => this.getSkillValueByName(skillName);
    
    // Sort abilities into categories
    const available = [];      // Can select
    const acquired = [];       // Already have (shown at bottom)
    const unqualified = [];    // Missing prereqs
    
    abilities.forEach(ability => {
      // Special handling for Characteristic Increase - once per rank
      if (ability.name === 'Characteristic Increase') {
        if (charIncreasesAtThisRank.length > 0) {
          // Already took it at this rank
          const charTaken = charIncreasesAtThisRank[0].char.toUpperCase();
          acquired.push({ ...ability, acquired: true, acquiredNote: `+1 ${charTaken}` });
        } else {
          // Available to take at this rank
          available.push({ ...ability, acquired: false });
        }
        return;
      }
      
      // Check if already acquired (using base name matching)
      const alreadyHas = hasAbility(ability.name, acquiredAbilities);
      
      // Check if this is a repeatable ability (can take multiple times)
      const repeatable = isRepeatableAbility(ability.name);
      
      if (alreadyHas && !repeatable) {
        // Show as acquired (greyed out) - goes to bottom section
        acquired.push({ ...ability, acquired: true });
        return;
      }
      
      // Check prerequisites
      const prereqCheck = checkAbilityPrereqs(ability.prereqs, acquiredAbilities, getSkillValue);
      
      if (prereqCheck.met) {
        available.push({ ...ability, acquired: false, repeatable });
      } else {
        unqualified.push({ ...ability, missing: prereqCheck.missing });
      }
    });
    
    // Render available abilities
    if (available.length === 0) {
      availableList.innerHTML = '<p class="no-abilities">No abilities available to unlock at this rank.</p>';
    } else {
      available.forEach(ability => {
        availableList.appendChild(this.createAbilityRow(ability, rank));
      });
    }
    
    // Render unqualified abilities
    if (unqualified.length > 0) {
      document.querySelector('.unqualified-divider').style.display = '';
      document.querySelector('.unqualified-abilities').style.display = '';
      unqualified.forEach(ability => {
        unqualifiedList.appendChild(this.createAbilityRow(ability, rank, true));
      });
    } else {
      document.querySelector('.unqualified-divider').style.display = 'none';
      document.querySelector('.unqualified-abilities').style.display = 'none';
    }
    
    // Render acquired abilities (at the bottom)
    if (acquired.length > 0) {
      document.querySelector('.acquired-divider').style.display = '';
      document.querySelector('.acquired-abilities').style.display = '';
      acquired.forEach(ability => {
        acquiredList.appendChild(this.createAbilityRow(ability, rank));
      });
    } else {
      document.querySelector('.acquired-divider').style.display = 'none';
      document.querySelector('.acquired-abilities').style.display = 'none';
    }
    
    // Update confirm button
    this.updateUnlockConfirmButton();
  },

  /**
   * Create an ability row element
   */
  createAbilityRow(ability, rank, disabled = false) {
    const row = document.createElement('label');
    row.className = 'ability-row' + (ability.acquired ? ' acquired' : '') + (disabled ? ' disabled' : '');
    
    const cost = rank; // EXP cost = rank
    
    let html = `
      <input type="checkbox" name="unlock-ability" value="${ability.name}" 
        data-cost="${cost}" ${ability.acquired || disabled ? 'disabled' : ''}>
      <div class="ability-info">
        <div class="ability-header">
          <span class="ability-name">${ability.name}</span>
          <span class="ability-cost">${cost} EXP</span>
        </div>
        <div class="ability-summary">${ability.summary}</div>
    `;
    
    if (ability.acquired) {
      const acquiredText = ability.acquiredNote 
        ? `✓ Already Acquired (${ability.acquiredNote})`
        : '✓ Already Acquired';
      html += `<div class="ability-status acquired">${acquiredText}</div>`;
    } else if (ability.missing && ability.missing.length > 0) {
      html += `<div class="ability-status missing">⚠ Requires: ${ability.missing.join(', ')}</div>`;
    }
    
    html += `</div>`;
    row.innerHTML = html;
    
    // Add change listener
    const checkbox = row.querySelector('input');
    if (checkbox && !checkbox.disabled) {
      checkbox.addEventListener('change', () => this.updateUnlockConfirmButton());
    }
    
    return row;
  },

  /**
   * Get set of acquired abilities
   */
  getAcquiredAbilities() {
    // Start with tracked acquired abilities
    const abilities = new Set(this.character.acquiredAbilities || []);
    
    // Also include abilities already on the sheet (manually added or from auto-grant)
    const container = document.getElementById('class-abilities-list');
    if (container) {
      const inputs = container.querySelectorAll('.class-ability-input');
      inputs.forEach(input => {
        if (input.value.trim()) {
          abilities.add(input.value.trim());
        }
      });
    }
    
    // Also check Languages section for Language abilities (e.g., Druids' Cant, Thieves' Cant)
    // Check native tongue
    const nativeName = document.getElementById('native-tongue-name')?.value?.trim();
    if (nativeName) {
      abilities.add(`Language (${nativeName})`);
    }
    // Check additional languages
    const langContainer = document.getElementById('language-container');
    if (langContainer) {
      const langRows = langContainer.querySelectorAll('.language-row:not(.native)');
      langRows.forEach(row => {
        const langName = row.querySelector('.language-name')?.value?.trim();
        if (langName) {
          abilities.add(`Language (${langName})`);
        }
      });
    }
    
    return abilities;
  },

  /**
   * Get skill value by name (for prereq checking)
   */
  getSkillValueByName(skillName) {
    const normalized = skillName.toLowerCase().trim();
    
    // Map common names to element IDs
    const skillMappings = {
      'evade': 'evade-current',
      'acrobatics': 'prof-skill-acrobatics', // Professional skill
      'athletics': 'athletics-current',
      'willpower': 'willpower-current',
      'musicianship': 'musicianship-percent',
      'combat style': 'combat-skill-1-percent',
      'combat skill': 'combat-skill-1-percent',
    };
    
    // Try direct mapping first
    if (skillMappings[normalized]) {
      const el = document.getElementById(skillMappings[normalized]);
      if (el) return parseInt(el.value, 10) || 0;
    }
    
    // Try standard skills
    const standardId = `${normalized.replace(/\s+/g, '-')}-current`;
    const standardEl = document.getElementById(standardId);
    if (standardEl) return parseInt(standardEl.value, 10) || 0;
    
    // Try professional skills
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      const nameEl = document.getElementById(`prof-skill-${i}-name`);
      const valueEl = document.getElementById(`prof-skill-${i}-current`);
      if (nameEl && nameEl.value.toLowerCase().trim() === normalized) {
        return parseInt(valueEl?.value, 10) || 0;
      }
    }
    
    // Try magic skills
    const magicMappings = {
      'musicianship': 'musicianship-percent',
      'channel': 'channel-percent',
      'piety': 'piety-percent',
    };
    if (magicMappings[normalized]) {
      const el = document.getElementById(magicMappings[normalized]);
      if (el) return parseInt(el.value, 10) || 0;
    }
    
    return 0;
  },

  /**
   * Update the unlock confirm button state
   */
  updateUnlockConfirmButton() {
    const checked = document.querySelectorAll('#unlock-abilities-modal input[name="unlock-ability"]:checked');
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    const confirmBtn = document.getElementById('unlock-abilities-confirm');
    
    let totalCost = 0;
    checked.forEach(cb => {
      totalCost += parseInt(cb.dataset.cost, 10) || 0;
    });
    
    const canAfford = expRolls >= totalCost;
    
    if (confirmBtn) {
      confirmBtn.disabled = checked.length === 0 || !canAfford;
      
      if (checked.length === 0) {
        confirmBtn.textContent = 'Unlock Selected';
      } else if (!canAfford) {
        confirmBtn.textContent = `Not enough EXP (need ${totalCost}, have ${expRolls})`;
      } else {
        confirmBtn.textContent = `Unlock ${checked.length} Ability${checked.length > 1 ? 'ies' : ''} (${totalCost} EXP)`;
      }
    }
  },

  /**
   * Close the unlock abilities modal
   */
  closeUnlockAbilitiesModal() {
    const modal = document.getElementById('unlock-abilities-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  },

  /**
   * Confirm unlocking selected abilities
   */
  confirmUnlockAbilities() {
    const modal = document.getElementById('unlock-abilities-modal');
    const checked = document.querySelectorAll('#unlock-abilities-modal input[name="unlock-ability"]:checked');
    if (checked.length === 0) return;
    
    // Get the current class context
    const currentClass = modal?.dataset?.selectedClass || '';
    
    let totalCost = 0;
    const newAbilities = [];
    let characteristicIncreaseRank = null;
    
    checked.forEach(cb => {
      const cost = parseInt(cb.dataset.cost, 10) || 0;
      totalCost += cost;
      const abilityName = cb.value;
      
      // Check for Characteristic Increase - needs special handling
      if (abilityName === 'Characteristic Increase') {
        characteristicIncreaseRank = cost; // The rank is the cost
      } else {
        newAbilities.push(abilityName);
      }
    });
    
    // If Characteristic Increase was selected, show the selection modal
    if (characteristicIncreaseRank !== null) {
      // Store the other abilities and cost for after characteristic selection
      this.pendingAbilityUnlock = {
        abilities: newAbilities,
        totalCost: totalCost,
        characteristicRank: characteristicIncreaseRank,
        sourceClass: currentClass
      };
      this.closeUnlockAbilitiesModal();
      this.showCharacteristicIncreaseModal(characteristicIncreaseRank);
      return;
    }
    
    // No Characteristic Increase - proceed normally
    this.finalizeAbilityUnlock(newAbilities, totalCost, currentClass);
  },

  /**
   * Show the characteristic selection modal for Characteristic Increase ability
   */
  showCharacteristicIncreaseModal(rank) {
    let modal = document.getElementById('characteristic-increase-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'characteristic-increase-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content characteristic-increase-modal-content">
          <div class="modal-header">
            <h3>Characteristic Increase</h3>
            <button class="modal-close" id="char-increase-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p class="char-increase-instructions">Choose a Characteristic to increase by +1:</p>
            <div class="char-increase-options">
              <label class="char-option"><input type="radio" name="char-increase" value="STR"><span class="char-label">STR</span><span class="char-current" id="char-inc-str-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="CON"><span class="char-label">CON</span><span class="char-current" id="char-inc-con-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="SIZ"><span class="char-label">SIZ</span><span class="char-current" id="char-inc-siz-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="DEX"><span class="char-label">DEX</span><span class="char-current" id="char-inc-dex-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="INT"><span class="char-label">INT</span><span class="char-current" id="char-inc-int-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="POW"><span class="char-label">POW</span><span class="char-current" id="char-inc-pow-val"></span></label>
              <label class="char-option"><input type="radio" name="char-increase" value="CHA"><span class="char-label">CHA</span><span class="char-current" id="char-inc-cha-val"></span></label>
            </div>
            <p class="char-increase-note">Note: Cannot exceed racial maximum.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="char-increase-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="char-increase-confirm" disabled>Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close handlers
      document.getElementById('char-increase-modal-close').addEventListener('click', () => {
        this.closeCharacteristicIncreaseModal();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeCharacteristicIncreaseModal();
        }
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          this.closeCharacteristicIncreaseModal();
        }
      });
      
      // Cancel button
      document.getElementById('char-increase-cancel').addEventListener('click', () => {
        this.closeCharacteristicIncreaseModal();
      });
      
      // Radio button change
      modal.querySelectorAll('input[name="char-increase"]').forEach(radio => {
        radio.addEventListener('change', () => {
          document.getElementById('char-increase-confirm').disabled = false;
        });
      });
      
      // Confirm button
      document.getElementById('char-increase-confirm').addEventListener('click', () => {
        this.confirmCharacteristicIncrease();
      });
    }
    
    // Get species for characteristic maximums
    const speciesName = document.getElementById('species')?.value || '';
    const charMaxes = SpeciesData.getAllCharacteristicMaxes(speciesName);
    
    // Update current values display and check maximums
    const chars = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
    let anyAvailable = false;
    
    chars.forEach(char => {
      const charUpper = char.toUpperCase();
      const input = document.getElementById(`${char}-value`);
      const display = document.getElementById(`char-inc-${char}-val`);
      const radio = modal.querySelector(`input[name="char-increase"][value="${charUpper}"]`);
      const label = radio?.closest('.char-option');
      
      if (input && display) {
        const currentVal = parseInt(input.value, 10) || 0;
        const maxVal = charMaxes ? charMaxes[charUpper] : null;
        
        if (maxVal && currentVal >= maxVal) {
          // At maximum - disable and show note
          display.textContent = `(${currentVal}) MAX`;
          if (radio) {
            radio.disabled = true;
          }
          if (label) {
            label.classList.add('at-max');
          }
        } else {
          // Still has room to increase
          display.textContent = `(${currentVal})`;
          if (radio) {
            radio.disabled = false;
          }
          if (label) {
            label.classList.remove('at-max');
          }
          anyAvailable = true;
        }
      }
    });
    
    // If no characteristics are available, show a message
    const noOptionsMsg = modal.querySelector('.no-char-options-msg');
    if (!anyAvailable) {
      if (!noOptionsMsg) {
        const msg = document.createElement('p');
        msg.className = 'no-char-options-msg';
        msg.textContent = 'All characteristics are at their species maximum.';
        modal.querySelector('.char-increase-options').appendChild(msg);
      }
    } else if (noOptionsMsg) {
      noOptionsMsg.remove();
    }
    
    // Store the rank
    modal.dataset.rank = rank;
    
    // Reset selection
    modal.querySelectorAll('input[name="char-increase"]').forEach(radio => {
      radio.checked = false;
    });
    document.getElementById('char-increase-confirm').disabled = true;
    
    // Show modal
    modal.classList.remove('hidden');
  },

  /**
   * Close the characteristic increase modal
   */
  closeCharacteristicIncreaseModal() {
    const modal = document.getElementById('characteristic-increase-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
    // Clear pending unlock if cancelled
    this.pendingAbilityUnlock = null;
  },

  /**
   * Confirm the characteristic increase selection
   */
  confirmCharacteristicIncrease() {
    const modal = document.getElementById('characteristic-increase-modal');
    const selected = modal.querySelector('input[name="char-increase"]:checked');
    if (!selected) return;
    
    const charName = selected.value; // e.g., "STR"
    const rank = parseInt(modal.dataset.rank, 10);
    
    // Get current value and increase it
    const charInput = document.getElementById(`${charName.toLowerCase()}-value`);
    if (charInput) {
      const currentVal = parseInt(charInput.value, 10) || 0;
      const newVal = currentVal + 1;
      charInput.value = newVal;
      
      // IMPORTANT: Also update the character data object (used by recalculateAll)
      if (this.character.attributes) {
        this.character.attributes[charName] = newVal;
      }
      
      // Trigger recalculations FIRST (this updates BASE values)
      charInput.dispatchEvent(new Event('input', { bubbles: true }));
      charInput.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Update all skill percentages AFTER recalculations complete
      // Use setTimeout to ensure recalculations finish first
      setTimeout(() => {
        this.updateSkillPercentagesForCharacteristic(charName);
      }, 50);
    }
    
    // Track the characteristic increase
    if (!this.character.characteristicIncreases) {
      this.character.characteristicIncreases = [];
    }
    this.character.characteristicIncreases.push({ rank, char: charName });
    
    // Build the ability name with all increases
    const abilityDisplayName = this.buildCharacteristicIncreaseName();
    
    // Close modal
    modal.classList.add('hidden');
    
    // Now finalize the ability unlock with the other abilities
    const pending = this.pendingAbilityUnlock;
    if (pending) {
      // Add the characteristic increase ability to the list
      const allAbilities = [...pending.abilities];
      const sourceClass = pending.sourceClass || '';
      
      // Add to acquired abilities tracking (use base name for prereq checking)
      if (!this.character.acquiredAbilities) {
        this.character.acquiredAbilities = [];
      }
      
      // Add other abilities
      allAbilities.forEach(name => {
        if (!this.character.acquiredAbilities.includes(name)) {
          this.character.acquiredAbilities.push(name);
        }
      });
      
      // Add abilities to sheet (Language abilities go to Languages section)
      allAbilities.forEach(name => {
        if (name.toLowerCase().startsWith('language (')) {
          const match = name.match(/Language \(([^)]+)\)/i);
          if (match) {
            this.addLanguageIfNotExists(match[1], sourceClass);
          }
        } else {
          this.addAbilityToSheet(name);
        }
      });
      
      // Update or add the Characteristic Increase ability on sheet
      this.updateCharacteristicIncreaseOnSheet(abilityDisplayName);
      
      // Deduct EXP rolls
      const expRollsInput = document.getElementById('exp-rolls');
      if (expRollsInput) {
        const currentExp = parseInt(expRollsInput.value, 10) || 0;
        expRollsInput.value = Math.max(0, currentExp - pending.totalCost);
        expRollsInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      // Recalculate everything
      this.recalculateAll();
      
      // Show success message
      const allNames = [...allAbilities];
      allNames.push(`Characteristic Increase (+1 ${charName.toUpperCase()})`);
      
      alert(`Unlocked ${allNames.length} ability${allNames.length > 1 ? 'ies' : ''}:\n\n• ${allNames.join('\n• ')}\n\nSpent ${pending.totalCost} EXP Rolls.\n\nAbilities added to Special Abilities on Combat page.`);
      
      this.pendingAbilityUnlock = null;
      this.scheduleAutoSave();
    }
  },

  /**
   * Update all skill percentages when a characteristic increases
   * @param {string} charName - The characteristic that increased (e.g., "STR")
   */
  updateSkillPercentagesForCharacteristic(charName) {
    const charUpper = charName.toUpperCase();
    
    // Standard skills (uses skill-name-current for editable percent)
    const standardSkillIds = {
      athletics: 'athletics-current',
      boating: 'boating-current',
      brawn: 'brawn-current',
      conceal: 'conceal-current',
      customs: 'customs-current',
      dance: 'dance-current',
      deceit: 'deceit-current',
      drive: 'drive-current',
      endurance: 'endurance-current',
      evade: 'evade-current',
      firstAid: 'first-aid-current',
      influence: 'influence-current',
      insight: 'insight-current',
      locale: 'locale-current',
      perception: 'perception-current',
      ride: 'ride-current',
      sing: 'sing-current',
      stealth: 'stealth-current',
      swim: 'swim-current',
      willpower: 'willpower-current'
    };
    
    // Check standard skills
    if (typeof SKILL_DEFINITIONS !== 'undefined' && SKILL_DEFINITIONS.standard) {
      Object.entries(SKILL_DEFINITIONS.standard).forEach(([key, skill]) => {
        if (skill.attrs && skill.attrs.includes(charUpper)) {
          const inputId = standardSkillIds[key];
          if (inputId) {
            const input = document.getElementById(inputId);
            if (input && input.value !== '' && input.value !== null) {
              const increment = skill.multiplier === 2 ? 2 : 1;
              const currentVal = parseInt(input.value, 10) || 0;
              input.value = currentVal + increment;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }
      });
    }
    
    // Combat skills
    if (charUpper === 'STR' || charUpper === 'DEX') {
      // Combat Style 1
      const combat1 = document.getElementById('combat-skill-1-percent');
      if (combat1 && combat1.value !== '' && combat1.value !== null) {
        const currentVal = parseInt(combat1.value, 10) || 0;
        combat1.value = currentVal + 1;
        combat1.dispatchEvent(new Event('input', { bubbles: true }));
        combat1.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // Unarmed
      const unarmed = document.getElementById('unarmed-percent');
      if (unarmed && unarmed.value !== '' && unarmed.value !== null) {
        const currentVal = parseInt(unarmed.value, 10) || 0;
        unarmed.value = currentVal + 1;
        unarmed.dispatchEvent(new Event('input', { bubbles: true }));
        unarmed.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    
    // Professional skills - check each one (uses prof-skill-X-name and prof-skill-X-current)
    // PROFESSIONAL_SKILL_SLOTS is 22, loop 0-21
    for (let i = 0; i < 22; i++) {
      const skillNameEl = document.getElementById(`prof-skill-${i}-name`);
      const skillPctEl = document.getElementById(`prof-skill-${i}-current`);
      
      if (skillNameEl && skillPctEl && skillNameEl.value && skillPctEl.value !== '' && skillPctEl.value !== null) {
        const skillName = skillNameEl.value.toLowerCase().replace(/\s*\(.*\)/, '').trim();
        const proDef = SKILL_DEFINITIONS.professional?.[skillName];
        
        if (proDef && proDef.attrs && proDef.attrs.includes(charUpper)) {
          const increment = proDef.multiplier === 2 ? 2 : 1;
          const currentVal = parseInt(skillPctEl.value, 10) || 0;
          skillPctEl.value = currentVal + increment;
          skillPctEl.dispatchEvent(new Event('input', { bubbles: true }));
          skillPctEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
    
    // Magic skills
    const magicSkillIds = {
      channel: { id: 'channel-percent', attrs: ['INT', 'POW'] },
      piety: { id: 'piety-percent', attrs: ['CHA', 'POW'] },
      arcaneCasting: { id: 'arcane-casting-percent', attrs: ['INT', 'POW'] },
      arcaneKnowledge: { id: 'arcane-knowledge-percent', attrs: ['INT'], multiplier: 2 },
      arcaneSorcery: { id: 'arcane-sorcery-percent', attrs: ['CHA', 'POW'] },
      sorcerousWisdom: { id: 'sorcerous-wisdom-percent', attrs: ['CHA', 'INT'] },
      musicianship: { id: 'musicianship-percent', attrs: ['DEX', 'CHA'] },
      lyricalMagic: { id: 'lyrical-magic-percent', attrs: ['CHA', 'POW'] }
    };
    
    Object.entries(magicSkillIds).forEach(([name, skill]) => {
      if (skill.attrs.includes(charUpper)) {
        const input = document.getElementById(skill.id);
        if (input && input.value !== '' && input.value !== null) {
          const increment = skill.multiplier === 2 ? 2 : 1;
          const currentVal = parseInt(input.value, 10) || 0;
          input.value = currentVal + increment;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    
    // Beliefs (Alignments, Passions, Oaths) - POW or INT or CHA
    if (charUpper === 'POW' || charUpper === 'INT') {
      // Alignments use POW+INT (1-indexed, 2 slots)
      for (let i = 1; i <= 2; i++) {
        const alignPct = document.getElementById(`alignment-${i}-current`);
        if (alignPct && alignPct.value !== '' && alignPct.value !== null) {
          const currentVal = parseInt(alignPct.value, 10) || 0;
          alignPct.value = currentVal + 1;
          alignPct.dispatchEvent(new Event('input', { bubbles: true }));
          alignPct.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      // Passions use POW+INT (1-indexed, 4 slots)
      for (let i = 1; i <= 4; i++) {
        const passionPct = document.getElementById(`passion-${i}-current`);
        if (passionPct && passionPct.value !== '' && passionPct.value !== null) {
          const currentVal = parseInt(passionPct.value, 10) || 0;
          passionPct.value = currentVal + 1;
          passionPct.dispatchEvent(new Event('input', { bubbles: true }));
          passionPct.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
    if (charUpper === 'POW' || charUpper === 'CHA') {
      // Oaths use POW+CHA (1-indexed, 4 slots)
      for (let i = 1; i <= 4; i++) {
        const oathPct = document.getElementById(`oath-${i}-current`);
        if (oathPct && oathPct.value !== '' && oathPct.value !== null) {
          const currentVal = parseInt(oathPct.value, 10) || 0;
          oathPct.value = currentVal + 1;
          oathPct.dispatchEvent(new Event('input', { bubbles: true }));
          oathPct.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
    
    // Languages - INT+CHA
    if (charUpper === 'INT' || charUpper === 'CHA') {
      // Native tongue
      const nativePct = document.getElementById('native-tongue-current');
      if (nativePct && nativePct.value !== '' && nativePct.value !== null) {
        const currentVal = parseInt(nativePct.value, 10) || 0;
        nativePct.value = currentVal + 1;
        nativePct.dispatchEvent(new Event('input', { bubbles: true }));
        nativePct.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // Additional languages (2-7)
      for (let i = 2; i <= 7; i++) {
        const langPct = document.getElementById(`language-${i}-current`);
        if (langPct && langPct.value !== '' && langPct.value !== null) {
          const currentVal = parseInt(langPct.value, 10) || 0;
          langPct.value = currentVal + 1;
          langPct.dispatchEvent(new Event('input', { bubbles: true }));
          langPct.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
    
    // Sync magic skills between pages
    this.syncMagicSkillValues();
  },

  /**
   * Build the display name for Characteristic Increase with all ranks/chars
   */
  buildCharacteristicIncreaseName() {
    const increases = this.character.characteristicIncreases || [];
    if (increases.length === 0) return 'Characteristic Increase';
    
    const parts = increases.map(inc => `Rank ${inc.rank}: ${inc.char.toUpperCase()}`);
    return `Characteristic Increase (${parts.join(', ')})`;
  },

  /**
   * Update or add the Characteristic Increase ability on the sheet
   */
  updateCharacteristicIncreaseOnSheet(displayName) {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    // Look for existing Characteristic Increase entry
    const inputs = container.querySelectorAll('.class-ability-input');
    for (const input of inputs) {
      if (input.value.toLowerCase().startsWith('characteristic increase')) {
        // Update existing entry
        input.value = displayName;
        this.updateAbilityTooltip(input);
        return;
      }
    }
    
    // Not found, add new
    this.addAbilityToSheet(displayName);
  },

  /**
   * Restore the Characteristic Increase display name on page load
   */
  restoreCharacteristicIncreaseDisplay() {
    const increases = this.character.characteristicIncreases || [];
    if (increases.length === 0) return;
    
    const displayName = this.buildCharacteristicIncreaseName();
    this.updateCharacteristicIncreaseOnSheet(displayName);
  },

  /**
   * Finalize the ability unlock (when no Characteristic Increase is involved)
   */
  finalizeAbilityUnlock(newAbilities, totalCost, sourceClass = '') {
    // Add to acquired abilities tracking
    if (!this.character.acquiredAbilities) {
      this.character.acquiredAbilities = [];
    }
    newAbilities.forEach(name => {
      if (!this.character.acquiredAbilities.includes(name)) {
        this.character.acquiredAbilities.push(name);
      }
    });
    
    // Add abilities to the Special Abilities section on Combat page
    // Language abilities are handled specially - they go to Languages section
    newAbilities.forEach(name => {
      if (name.toLowerCase().startsWith('language (')) {
        // Extract language name from "Language (Druids' Cant)" format
        const match = name.match(/Language \(([^)]+)\)/i);
        if (match) {
          this.addLanguageIfNotExists(match[1], sourceClass);
        }
      } else {
        this.addAbilityToSheet(name);
      }
    });
    
    // Clean up any empty rows after adding abilities
    this.compactClassAbilities();
    
    // Check for special actions based on abilities being unlocked
    this.handleUnlockedAbilitySpecialActions(newAbilities);
    
    // Deduct EXP rolls
    const expRollsInput = document.getElementById('exp-rolls');
    if (expRollsInput) {
      const currentExp = parseInt(expRollsInput.value, 10) || 0;
      expRollsInput.value = Math.max(0, currentExp - totalCost);
      expRollsInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Close modal and show success
    this.closeUnlockAbilitiesModal();
    
    alert(`Unlocked ${newAbilities.length} ability${newAbilities.length > 1 ? 'ies' : ''}:\n\n• ${newAbilities.join('\n• ')}\n\nSpent ${totalCost} EXP Rolls.\n\nAbilities added to Special Abilities on Combat page.`);
    
    // Auto-save
    this.scheduleAutoSave();
  },
  
  /**
   * Handle special actions when specific abilities are unlocked
   */
  handleUnlockedAbilitySpecialActions(abilities) {
    const normalizedAbilities = abilities.map(a => a.toLowerCase().trim());
    
    // Check for Druid Rank 1 abilities - add Druids' Cant
    const druidRank1 = ['divine spellcasting', 'identify plants and animals', 'identify pure water'];
    const hasDruidAbility = normalizedAbilities.some(a => druidRank1.includes(a));
    const isDruid = this.getCurrentClasses().includes('druid');
    
    if (hasDruidAbility && isDruid) {
      this.addLanguageIfNotExists("Druids' Cant");
    }
    
    // Check for Rogue Rank 1 abilities - add Thieves' Cant
    const rogueRank1 = ['climb walls', 'hide in shadows', 'sneak attack', 'subterfuge'];
    const hasRogueAbility = normalizedAbilities.some(a => rogueRank1.includes(a));
    const isRogue = this.getCurrentClasses().includes('rogue');
    
    if (hasRogueAbility && isRogue) {
      this.addLanguageIfNotExists("Thieves' Cant");
    }
  },

  /**
   * Process the passion/alignment/oath strengthening - reuse the skill improvement flow
   */
  processPassionStrengthening() {
    const checked = document.querySelectorAll('#strengthen-passions-modal input[name="strengthen-passion"]:checked');
    
    if (checked.length === 0) return;
    
    // Gather selected items with their display names
    // Reuse skillsToImprove since the improvement process is the same
    this.skillsToImprove = Array.from(checked).map(cb => {
      const row = cb.closest('.skill-checkbox-row');
      const nameSpan = row.querySelector('.skill-name');
      return {
        id: cb.value,
        name: nameSpan?.textContent || cb.value,
        currentValue: parseInt(cb.dataset.skillValue, 10) || 0
      };
    });
    
    // Close the selection modal and open the roll method modal
    this.closeStrengthenPassionsModal();
    this.openRollMethodModal();
  },

  /**
   * Process the skill improvement rolls - show the roll method selection modal
   */
  processSkillImprovement() {
    const checked = document.querySelectorAll('#improve-skills-modal input[name="improve-skill"]:checked');
    
    if (checked.length === 0) return;
    
    // Gather selected skills with their display names
    this.skillsToImprove = Array.from(checked).map(cb => {
      const row = cb.closest('.skill-checkbox-row');
      const nameSpan = row.querySelector('.skill-name');
      return {
        id: cb.value,
        name: nameSpan?.textContent || cb.value,
        currentValue: parseInt(cb.dataset.skillValue, 10) || 0
      };
    });
    
    // Close the selection modal and open the roll method modal
    this.closeImproveSkillsModal();
    this.openRollMethodModal();
  },

  /**
   * Open the roll method selection modal
   */
  openRollMethodModal() {
    let modal = document.getElementById('roll-method-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'roll-method-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content roll-method-modal-content">
          <div class="modal-header">
            <h3>Skill Improvement</h3>
            <button class="modal-close" id="roll-method-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <h4>Selected Skills to Improve:</h4>
            <div class="selected-skills-list" id="selected-skills-list"></div>
            <div class="roll-method-choice">
              <p>How would you like to roll?</p>
              <div class="roll-method-buttons">
                <button type="button" class="btn btn-primary" id="btn-roll-here">Roll Here</button>
                <button type="button" class="btn btn-secondary" id="btn-roll-myself">I'll Roll Myself</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="roll-method-back">Back</button>
            <button type="button" class="btn btn-secondary" id="roll-method-cancel">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close handlers
      document.getElementById('roll-method-modal-close').addEventListener('click', () => this.closeRollMethodModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeRollMethodModal(); });
      
      // Back button
      document.getElementById('roll-method-back').addEventListener('click', () => {
        this.closeRollMethodModal();
        this.openImproveSkillsModal();
      });
      
      // Cancel button
      document.getElementById('roll-method-cancel').addEventListener('click', () => this.closeRollMethodModal());
      
      // Roll here button
      document.getElementById('btn-roll-here').addEventListener('click', () => {
        this.closeRollMethodModal();
        this.openDiceTypeModal();
      });
      
      // Roll myself button
      document.getElementById('btn-roll-myself').addEventListener('click', () => {
        this.closeRollMethodModal();
        this.openManualEntryModal();
      });
    }
    
    // Populate selected skills list
    const listContainer = document.getElementById('selected-skills-list');
    listContainer.innerHTML = this.skillsToImprove.map(skill => 
      `<div class="selected-skill-item"><span class="skill-name">${skill.name}</span><span class="skill-value">${skill.currentValue}%</span></div>`
    ).join('');
    
    modal.classList.remove('hidden');
  },

  closeRollMethodModal() {
    const modal = document.getElementById('roll-method-modal');
    if (modal) modal.classList.add('hidden');
  },

  /**
   * Open the dice type selection modal (1d4+1 vs 1d6+1)
   */
  openDiceTypeModal() {
    let modal = document.getElementById('dice-type-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'dice-type-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content dice-type-modal-content">
          <div class="modal-header">
            <h3>Improvement Dice</h3>
            <button class="modal-close" id="dice-type-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Which improvement dice are you using?</p>
            <div class="dice-type-buttons">
              <button type="button" class="btn exp-option-btn" id="btn-dice-1d4">
                <span class="dice-type-label">Standard</span>
                <span class="dice-type-value">1d4+1</span>
              </button>
              <button type="button" class="btn exp-option-btn" id="btn-dice-1d6">
                <span class="dice-type-label">Faster Ranking</span>
                <span class="dice-type-value">1d6+1</span>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="dice-type-back">Back</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('dice-type-modal-close').addEventListener('click', () => this.closeDiceTypeModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeDiceTypeModal(); });
      
      document.getElementById('dice-type-back').addEventListener('click', () => {
        this.closeDiceTypeModal();
        this.openRollMethodModal();
      });
      
      document.getElementById('btn-dice-1d4').addEventListener('click', () => {
        this.improvementDice = '1d4+1';
        this.closeDiceTypeModal();
        this.startAutomaticRolling();
      });
      
      document.getElementById('btn-dice-1d6').addEventListener('click', () => {
        this.improvementDice = '1d6+1';
        this.closeDiceTypeModal();
        this.startAutomaticRolling();
      });
    }
    
    modal.classList.remove('hidden');
  },

  closeDiceTypeModal() {
    const modal = document.getElementById('dice-type-modal');
    if (modal) modal.classList.add('hidden');
  },

  /**
   * Start the automatic rolling process
   */
  startAutomaticRolling() {
    const INT = parseInt(document.getElementById('int-value')?.value, 10) || 0;
    this.rollResults = [];
    this.currentRollIndex = 0;
    
    // Process all skills
    this.skillsToImprove.forEach(skill => {
      // Roll 1d100
      const d100Roll = Math.floor(Math.random() * 100) + 1;
      const totalCheck = d100Roll + INT;
      const success = totalCheck > skill.currentValue;
      
      let improvement = 0;
      let improvementRoll = null;
      
      if (success) {
        // Roll improvement dice on success
        if (this.improvementDice === '1d4+1') {
          improvementRoll = Math.floor(Math.random() * 4) + 1;
        } else {
          improvementRoll = Math.floor(Math.random() * 6) + 1;
        }
        improvement = improvementRoll + 1;
      } else {
        // Still get +1 on failure
        improvement = 1;
      }
      
      this.rollResults.push({
        ...skill,
        d100Roll,
        INT,
        totalCheck,
        success,
        improvementRoll,
        improvement,
        newValue: skill.currentValue + improvement
      });
    });
    
    // Show results
    this.openRollResultsModal();
  },

  /**
   * Open the roll results modal
   */
  openRollResultsModal() {
    let modal = document.getElementById('roll-results-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'roll-results-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content roll-results-modal-content">
          <div class="modal-header">
            <h3>Improvement Results</h3>
            <button class="modal-close" id="roll-results-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="roll-results-list" id="roll-results-list"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="roll-results-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="roll-results-apply">Apply Changes</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('roll-results-modal-close').addEventListener('click', () => this.closeRollResultsModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeRollResultsModal(); });
      
      document.getElementById('roll-results-cancel').addEventListener('click', () => this.closeRollResultsModal());
      
      document.getElementById('roll-results-apply').addEventListener('click', () => {
        this.applySkillImprovements();
        this.closeRollResultsModal();
      });
    }
    
    // Build results HTML
    const resultsContainer = document.getElementById('roll-results-list');
    resultsContainer.innerHTML = this.rollResults.map(result => {
      const successClass = result.success ? 'success' : 'failure';
      const successText = result.success ? '✓ Success!' : '✗ Failed (but +1)';
      const improvementText = result.success 
        ? `+${result.improvement} (${this.improvementDice} = ${result.improvementRoll}+1)`
        : '+1 (consolation)';
      
      return `
        <div class="roll-result-item ${successClass}">
          <div class="roll-result-header">
            <span class="skill-name">${result.name}</span>
            <span class="roll-outcome ${successClass}">${successText}</span>
          </div>
          <div class="roll-result-details">
            <span>Roll: ${result.d100Roll} + ${result.INT} INT = ${result.totalCheck}</span>
            <span>vs ${result.currentValue}%</span>
          </div>
          <div class="roll-result-improvement">
            <span>${improvementText}</span>
            <span class="new-value">${result.currentValue}% → ${result.newValue}%</span>
          </div>
        </div>
      `;
    }).join('');
    
    modal.classList.remove('hidden');
  },

  closeRollResultsModal() {
    const modal = document.getElementById('roll-results-modal');
    if (modal) modal.classList.add('hidden');
  },

  /**
   * Open the manual entry modal
   */
  openManualEntryModal() {
    let modal = document.getElementById('manual-entry-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'manual-entry-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content manual-entry-modal-content">
          <div class="modal-header">
            <h3>Manual Skill Improvement</h3>
            <button class="modal-close" id="manual-entry-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p class="manual-entry-instructions">Enter the amount to add to each skill:</p>
            <div class="manual-entry-list" id="manual-entry-list"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="manual-entry-back">Back</button>
            <button type="button" class="btn btn-secondary" id="manual-entry-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="manual-entry-apply">Apply Changes</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('manual-entry-modal-close').addEventListener('click', () => this.closeManualEntryModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeManualEntryModal(); });
      
      document.getElementById('manual-entry-back').addEventListener('click', () => {
        this.closeManualEntryModal();
        this.openRollMethodModal();
      });
      
      document.getElementById('manual-entry-cancel').addEventListener('click', () => this.closeManualEntryModal());
      
      document.getElementById('manual-entry-apply').addEventListener('click', () => {
        this.applyManualImprovements();
        this.closeManualEntryModal();
      });
    }
    
    // Build entry list
    const listContainer = document.getElementById('manual-entry-list');
    listContainer.innerHTML = this.skillsToImprove.map((skill, index) => `
      <div class="manual-entry-row">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-current">${skill.currentValue}%</span>
        <span class="entry-plus">+</span>
        <input type="number" class="manual-entry-input" id="manual-entry-${index}" min="0" max="99" value="0" data-skill-id="${skill.id}">
      </div>
    `).join('');
    
    modal.classList.remove('hidden');
  },

  closeManualEntryModal() {
    const modal = document.getElementById('manual-entry-modal');
    if (modal) modal.classList.add('hidden');
  },

  /**
   * Apply skill improvements from automatic rolling
   */
  applySkillImprovements() {
    console.log('Applying skill improvements:', this.rollResults);
    this.rollResults.forEach(result => {
      // Always apply - everyone gets at least +1
      console.log(`Applying to ${result.id}: improvement=${result.improvement}, newValue=${result.newValue}`);
      if (result.improvement > 0) {
        this.updateSkillValue(result.id, result.newValue);
      }
    });
    
    // Deduct EXP rolls
    const expRollsInput = document.getElementById('exp-rolls');
    if (expRollsInput) {
      const current = parseInt(expRollsInput.value, 10) || 0;
      expRollsInput.value = Math.max(0, current - this.skillsToImprove.length);
    }
    
    this.scheduleAutoSave();
    alert('Skill improvements applied!');
  },

  /**
   * Apply manual skill improvements
   */
  applyManualImprovements() {
    this.skillsToImprove.forEach((skill, index) => {
      const input = document.getElementById(`manual-entry-${index}`);
      const improvement = parseInt(input?.value, 10) || 0;
      if (improvement > 0) {
        const newValue = skill.currentValue + improvement;
        this.updateSkillValue(skill.id, newValue);
      }
    });
    
    // Deduct EXP rolls
    const expRollsInput = document.getElementById('exp-rolls');
    if (expRollsInput) {
      const current = parseInt(expRollsInput.value, 10) || 0;
      expRollsInput.value = Math.max(0, current - this.skillsToImprove.length);
    }
    
    this.scheduleAutoSave();
    alert('Skill improvements applied!');
  },

  /**
   * Update a skill value on the character sheet
   */
  updateSkillValue(skillId, newValue) {
    // Parse skill ID format: "standard:skillname", "prof:index", "combat", "magic:id", "alignment:index", "passion:index", "oath:index"
    const [type, id] = skillId.split(':');
    let el = null;
    
    if (type === 'standard') {
      // Standard skills use {id}-current, except unarmed which uses unarmed-percent
      if (id === 'unarmed') {
        el = document.getElementById('unarmed-percent');
      } else {
        el = document.getElementById(`${id}-current`);
      }
    } else if (type === 'prof') {
      // Professional skills use prof-skill-{index}-current
      el = document.getElementById(`prof-skill-${id}-current`);
    } else if (skillId === 'combat') {
      // Combat skill
      el = document.getElementById('combat-skill-1-percent');
    } else if (type === 'magic') {
      // Magical skills
      el = document.getElementById(id);
    } else if (type === 'alignment') {
      // Alignment uses alignment-{index}-current
      el = document.getElementById(`alignment-${id}-current`);
    } else if (type === 'passion') {
      // Passions use passion-{index}-current
      el = document.getElementById(`passion-${id}-current`);
    } else if (type === 'oath') {
      // Oaths use oath-{index}-current
      el = document.getElementById(`oath-${id}-current`);
    }
    
    if (el) {
      el.value = newValue;
      // Dispatch input event to trigger any listeners
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      console.log(`Updated ${skillId} to ${newValue}`);
    } else {
      console.warn(`Could not find element for skill: ${skillId}`);
    }
    
    // Trigger recalculation
    this.recalculateAll();
  },

  /**
   * Open the Learn New Skills modal
   */
  openLearnNewSkillsModal() {
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    
    // Skills that cannot be learned this way
    const excludedSkills = [
      'arcane casting', 'arcane sorcery', 'channel', 'lyrical magic', 
      'mysticism', 'psychic manipulation', 'sorcerous wisdom', 'arcane knowledge'
    ];
    
    // Skills that need specialties
    const specialtySkills = ['art', 'craft', 'lore'];
    
    // Get currently known professional skills
    const knownSkills = new Set();
    for (let i = 0; i < 20; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      if (nameInput && nameInput.value.trim()) {
        // Get base skill name (before parentheses)
        const baseName = nameInput.value.trim().toLowerCase().split('(')[0].trim();
        knownSkills.add(baseName);
      }
    }
    
    // Get known languages
    const knownLanguages = new Set();
    const nativeTongue = document.getElementById('native-tongue-name')?.value?.trim();
    if (nativeTongue) knownLanguages.add(nativeTongue.toLowerCase());
    for (let i = 2; i <= 5; i++) {
      const langName = document.getElementById(`language-${i}-name`)?.value?.trim();
      if (langName) knownLanguages.add(langName.toLowerCase());
    }
    
    // Build list of available professional skills
    const availableSkills = [];
    if (typeof SKILL_DEFINITIONS !== 'undefined' && SKILL_DEFINITIONS.professional) {
      for (const [skillKey, skillData] of Object.entries(SKILL_DEFINITIONS.professional)) {
        // Skip excluded skills
        if (excludedSkills.includes(skillKey)) continue;
        
        // Skip language (handled separately)
        if (skillKey === 'language') continue;
        
        // For specialty skills, always show them
        if (specialtySkills.includes(skillKey)) {
          availableSkills.push({
            key: skillKey,
            name: this.toTitleCase(skillKey),
            formula: skillData.formula,
            needsSpecialty: true
          });
        } else if (!knownSkills.has(skillKey)) {
          // For non-specialty skills, only show if not known
          availableSkills.push({
            key: skillKey,
            name: this.toTitleCase(skillKey),
            formula: skillData.formula,
            needsSpecialty: false
          });
        }
      }
    }
    
    // Always add Language option and Piety if they need specialty input
    availableSkills.push({
      key: 'language',
      name: 'Language',
      formula: 'INT+CHA',
      needsSpecialty: true,
      isLanguage: true
    });
    
    // Add Piety with deity prompt if not excluded
    if (!knownSkills.has('piety')) {
      // Remove the plain piety that was added above, we'll add special version
      const pietyIdx = availableSkills.findIndex(s => s.key === 'piety' && !s.needsSpecialty);
      if (pietyIdx > -1) availableSkills.splice(pietyIdx, 1);
      
      availableSkills.push({
        key: 'piety',
        name: 'Piety',
        formula: 'CHA+POW',
        needsSpecialty: true,
        isPiety: true
      });
    }
    
    // Sort alphabetically
    availableSkills.sort((a, b) => a.name.localeCompare(b.name));
    
    // Store for later
    this.availableNewSkills = availableSkills;
    
    // Create modal
    let modal = document.getElementById('learn-skills-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'learn-skills-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content learn-skills-modal-content">
          <div class="modal-header">
            <h3>Learn New Skills</h3>
            <button class="modal-close" id="learn-skills-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="exp-rolls-display">
              <span class="exp-rolls-label">Available EXP Rolls:</span>
              <span class="exp-rolls-value" id="learn-skills-exp-rolls">0</span>
            </div>
            <p class="learn-skills-instructions">Select new skills to learn:</p>
            <div class="learn-skills-list" id="learn-skills-list"></div>
            <p class="learn-skills-cost-note">⚠️ New skills cost <strong>3 Experience Rolls</strong> each.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="learn-skills-back">Back</button>
            <button type="button" class="btn btn-secondary" id="learn-skills-cancel">Cancel</button>
            <button type="button" class="btn btn-primary" id="learn-skills-continue" disabled>Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('learn-skills-modal-close').addEventListener('click', () => this.closeLearnSkillsModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeLearnSkillsModal(); });
      
      document.getElementById('learn-skills-back').addEventListener('click', () => {
        this.closeLearnSkillsModal();
        this.openExpModal();
      });
      
      document.getElementById('learn-skills-cancel').addEventListener('click', () => this.closeLearnSkillsModal());
      
      document.getElementById('learn-skills-continue').addEventListener('click', () => {
        this.processLearnNewSkills();
      });
    }
    
    // Populate skill list
    const listContainer = document.getElementById('learn-skills-list');
    listContainer.innerHTML = availableSkills.map((skill, index) => `
      <label class="learn-skill-row">
        <input type="checkbox" name="learn-skill" value="${index}" data-skill-key="${skill.key}">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-formula">(${skill.formula})</span>
      </label>
    `).join('');
    
    // Update EXP display
    document.getElementById('learn-skills-exp-rolls').textContent = expRolls;
    
    // Add checkbox listeners
    document.querySelectorAll('#learn-skills-modal input[name="learn-skill"]').forEach(cb => {
      cb.addEventListener('change', () => this.updateLearnSkillsContinueButton());
    });
    
    modal.classList.remove('hidden');
  },

  closeLearnSkillsModal() {
    const modal = document.getElementById('learn-skills-modal');
    if (modal) modal.classList.add('hidden');
  },

  updateLearnSkillsContinueButton() {
    const checked = document.querySelectorAll('#learn-skills-modal input[name="learn-skill"]:checked');
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    const continueBtn = document.getElementById('learn-skills-continue');
    const cost = checked.length * 3;
    
    if (continueBtn) {
      const canAfford = cost <= expRolls && checked.length > 0;
      continueBtn.disabled = !canAfford;
      continueBtn.textContent = checked.length > 0 
        ? `Continue (${checked.length} skill${checked.length > 1 ? 's' : ''}, ${cost} EXP)`
        : 'Continue';
    }
  },

  /**
   * Process learning new skills - prompt for specialties if needed
   */
  processLearnNewSkills() {
    const checked = document.querySelectorAll('#learn-skills-modal input[name="learn-skill"]:checked');
    if (checked.length === 0) return;
    
    // Gather selected skills
    this.skillsToLearn = Array.from(checked).map(cb => {
      const index = parseInt(cb.value, 10);
      return { ...this.availableNewSkills[index] };
    });
    
    // Check if any need specialty input
    const needsInput = this.skillsToLearn.filter(s => s.needsSpecialty);
    
    if (needsInput.length > 0) {
      this.closeLearnSkillsModal();
      this.openSpecialtyInputModal();
    } else {
      this.closeLearnSkillsModal();
      this.finalizeLearnNewSkills();
    }
  },

  /**
   * Open specialty input modal for skills that need it
   */
  openSpecialtyInputModal() {
    let modal = document.getElementById('specialty-input-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'specialty-input-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-content specialty-input-modal-content">
          <div class="modal-header">
            <h3>Specify Details</h3>
            <button class="modal-close" id="specialty-input-modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="specialty-input-list" id="specialty-input-list"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="specialty-input-back">Back</button>
            <button type="button" class="btn btn-primary" id="specialty-input-confirm">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      document.getElementById('specialty-input-modal-close').addEventListener('click', () => this.closeSpecialtyInputModal());
      modal.addEventListener('click', (e) => { if (e.target === modal) this.closeSpecialtyInputModal(); });
      
      document.getElementById('specialty-input-back').addEventListener('click', () => {
        this.closeSpecialtyInputModal();
        this.openLearnNewSkillsModal();
      });
      
      document.getElementById('specialty-input-confirm').addEventListener('click', () => {
        this.collectSpecialtiesAndFinalize();
      });
    }
    
    // Build input fields
    const listContainer = document.getElementById('specialty-input-list');
    listContainer.innerHTML = this.skillsToLearn
      .filter(s => s.needsSpecialty)
      .map((skill, index) => {
        let prompt = 'What specialty?';
        let placeholder = 'e.g., Painting, Sculpting';
        
        if (skill.isLanguage) {
          prompt = 'What language do you wish to learn?';
          placeholder = 'e.g., Goblin, Infernal, Elvish';
        } else if (skill.isPiety) {
          prompt = 'What deity? The Ten Thousand are the most common.';
          placeholder = 'e.g., Vitus, Mycr';
        } else if (skill.key === 'lore') {
          placeholder = 'e.g., History, Arcana, Religion';
        } else if (skill.key === 'craft') {
          placeholder = 'e.g., Blacksmithing, Carpentry';
        } else if (skill.key === 'art') {
          placeholder = 'e.g., Painting, Sculpture, Music';
        }
        
        return `
          <div class="specialty-input-row">
            <label class="specialty-label">${skill.name}</label>
            <p class="specialty-prompt">${prompt}</p>
            <input type="text" class="specialty-input" id="specialty-input-${index}" 
                   data-skill-key="${skill.key}" placeholder="${placeholder}">
          </div>
        `;
      }).join('');
    
    modal.classList.remove('hidden');
  },

  closeSpecialtyInputModal() {
    const modal = document.getElementById('specialty-input-modal');
    if (modal) modal.classList.add('hidden');
  },

  collectSpecialtiesAndFinalize() {
    // Collect specialty inputs
    let inputIndex = 0;
    this.skillsToLearn.forEach(skill => {
      if (skill.needsSpecialty) {
        const input = document.getElementById(`specialty-input-${inputIndex}`);
        const specialty = input?.value?.trim() || '';
        if (specialty) {
          skill.specialty = this.toTitleCase(specialty);
          skill.fullName = skill.isLanguage ? specialty : `${skill.name} (${skill.specialty})`;
        } else {
          skill.fullName = skill.name;
        }
        inputIndex++;
      } else {
        skill.fullName = skill.name;
      }
    });
    
    this.closeSpecialtyInputModal();
    this.finalizeLearnNewSkills();
  },

  /**
   * Finalize learning new skills - add to character sheet
   */
  finalizeLearnNewSkills() {
    const expCost = this.skillsToLearn.length * 3;
    const expRolls = parseInt(document.getElementById('exp-rolls')?.value, 10) || 0;
    
    if (expCost > expRolls) {
      alert('Not enough EXP rolls!');
      return;
    }
    
    // Add each skill
    this.skillsToLearn.forEach(skill => {
      if (skill.isLanguage) {
        this.addNewLanguage(skill);
      } else {
        this.addNewProfessionalSkill(skill);
      }
    });
    
    // Deduct EXP
    const expRollsInput = document.getElementById('exp-rolls');
    if (expRollsInput) {
      expRollsInput.value = Math.max(0, expRolls - expCost);
    }
    
    this.recalculateAll();
    this.scheduleAutoSave();
    
    const skillNames = this.skillsToLearn.map(s => s.fullName || s.name).join(', ');
    alert(`Added new skill${this.skillsToLearn.length > 1 ? 's' : ''}: ${skillNames}`);
  },

  /**
   * Add a new professional skill to the character sheet
   */
  addNewProfessionalSkill(skill) {
    const container = document.getElementById('professional-skills-container');
    if (!container) {
      alert('Professional skills container not found!');
      return;
    }
    
    // Find first empty slot by checking all rows
    const rows = container.querySelectorAll('.professional-skill-row');
    for (let i = 0; i < rows.length; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      if (nameInput && !nameInput.value.trim()) {
        const baseInput = document.getElementById(`prof-skill-${i}-base`);
        const baseValSpan = document.getElementById(`prof-skill-${i}-base-val`);
        const currentInput = document.getElementById(`prof-skill-${i}-current`);
        
        // Set the skill name
        nameInput.value = skill.fullName || skill.name;
        
        // Set the formula from skill data
        if (baseInput && skill.formula) {
          baseInput.value = skill.formula;
        }
        
        // Trigger input event to auto-fill formula if not already set
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Trigger blur to finalize
        nameInput.dispatchEvent(new Event('blur', { bubbles: true }));
        
        // Calculate base and set current to base value
        setTimeout(() => {
          // Trigger base calculation
          this.calculateProfessionalSkillBase(i);
          
          // Get the calculated base value and set as current
          setTimeout(() => {
            const baseVal = document.getElementById(`prof-skill-${i}-base-val`);
            const currInput = document.getElementById(`prof-skill-${i}-current`);
            if (baseVal && currInput) {
              const calculatedBase = baseVal.textContent || '';
              if (calculatedBase) {
                currInput.value = calculatedBase;
              }
            }
          }, 50);
        }, 50);
        
        return;
      }
    }
    
    // No empty slot found - add a new row
    this.addProfessionalSkillRow();
    setTimeout(() => {
      // Try again with the new row
      const newRows = container.querySelectorAll('.professional-skill-row');
      const lastIndex = newRows.length - 1;
      const nameInput = document.getElementById(`prof-skill-${lastIndex}-name`);
      const baseInput = document.getElementById(`prof-skill-${lastIndex}-base`);
      
      if (nameInput) {
        nameInput.value = skill.fullName || skill.name;
        if (baseInput && skill.formula) {
          baseInput.value = skill.formula;
        }
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        nameInput.dispatchEvent(new Event('blur', { bubbles: true }));
        
        setTimeout(() => {
          this.calculateProfessionalSkillBase(lastIndex);
          setTimeout(() => {
            const baseVal = document.getElementById(`prof-skill-${lastIndex}-base-val`);
            const currInput = document.getElementById(`prof-skill-${lastIndex}-current`);
            if (baseVal && currInput && baseVal.textContent) {
              currInput.value = baseVal.textContent;
            }
          }, 50);
        }, 50);
      }
    }, 100);
  },

  /**
   * Add a new language to the character sheet
   */
  addNewLanguage(skill) {
    const container = document.getElementById('language-container');
    if (!container) {
      alert('Language container not found!');
      return;
    }
    
    // Find first empty language slot (skip native tongue)
    const langRows = container.querySelectorAll('.language-row:not(.native)');
    for (const row of langRows) {
      const nameInput = row.querySelector('.language-name');
      if (nameInput && !nameInput.value.trim()) {
        // Set the language name
        nameInput.value = skill.specialty || skill.fullName || 'New Language';
        
        // Set current to base value
        setTimeout(() => {
          const baseEl = row.querySelector('.language-base');
          const currentInput = row.querySelector('.language-input');
          if (baseEl && currentInput) {
            currentInput.value = baseEl.textContent || '';
          }
        }, 100);
        
        return;
      }
    }
    
    // No empty slots - add a new row
    this.addLanguageRow();
    setTimeout(() => {
      const newRows = container.querySelectorAll('.language-row:not(.native)');
      const lastRow = newRows[newRows.length - 1];
      if (lastRow) {
        const nameInput = lastRow.querySelector('.language-name');
        if (nameInput) {
          nameInput.value = skill.specialty || skill.fullName || 'New Language';
        }
        setTimeout(() => {
          const baseEl = lastRow.querySelector('.language-base');
          const currentInput = lastRow.querySelector('.language-input');
          if (baseEl && currentInput) {
            currentInput.value = baseEl.textContent || '';
          }
        }, 100);
      }
    }, 100);
  },

  // ============================================
  // BERSERK RAGE SYSTEM
  // ============================================
  
  /**
   * Show the Berserk Rage section and initialize values
   */
  showBerserkRageSection() {
    const section = document.getElementById('berserk-rage-section');
    if (!section) return;
    
    section.style.display = '';
    this.updateBerserkRageDisplay();
    this.setupBerserkRageListeners();
  },
  
  /**
   * Hide the Berserk Rage section
   */
  hideBerserkRageSection() {
    const section = document.getElementById('berserk-rage-section');
    if (section) {
      section.style.display = 'none';
    }
  },
  
  /**
   * Update Berserk Rage display values based on CON
   */
  updateBerserkRageDisplay() {
    const con = parseInt(this.character.attributes.CON, 10) || 10;
    const maxUses = Math.ceil(con / 4);
    const maxRounds = con;
    
    // Initialize uses remaining if not set
    if (this.rageUsesRemaining === undefined || this.rageUsesRemaining === null) {
      this.rageUsesRemaining = this.character.rageUsesRemaining ?? maxUses;
    }
    
    document.getElementById('rage-uses-available').textContent = this.rageUsesRemaining;
    document.getElementById('rage-uses-max').textContent = maxUses;
    document.getElementById('rage-rounds-max').textContent = maxRounds;
    document.getElementById('rage-rounds-total').textContent = maxRounds;
    
    // Update button state
    const rageBtn = document.getElementById('btn-rage-toggle');
    if (rageBtn) {
      rageBtn.disabled = this.rageUsesRemaining <= 0 && !this.isRaging;
    }
  },
  
  /**
   * Setup Berserk Rage button listeners
   */
  setupBerserkRageListeners() {
    const rageBtn = document.getElementById('btn-rage-toggle');
    const endRageBtn = document.getElementById('btn-end-rage');
    const resetBtn = document.getElementById('btn-reset-rage');
    
    if (rageBtn && !rageBtn.dataset.listenerAdded) {
      rageBtn.addEventListener('click', () => {
        if (!this.isRaging) {
          this.startBerserkRage();
        }
      });
      rageBtn.dataset.listenerAdded = 'true';
    }
    
    if (endRageBtn && !endRageBtn.dataset.listenerAdded) {
      endRageBtn.addEventListener('click', () => {
        this.endBerserkRage(true);
      });
      endRageBtn.dataset.listenerAdded = 'true';
    }
    
    if (resetBtn && !resetBtn.dataset.listenerAdded) {
      resetBtn.addEventListener('click', () => {
        this.resetRageUses();
      });
      resetBtn.dataset.listenerAdded = 'true';
    }
  },
  
  /**
   * Start Berserk Rage
   */
  startBerserkRage() {
    if (this.isRaging || this.rageUsesRemaining <= 0) return;
    
    this.isRaging = true;
    this.rageUsesRemaining--;
    
    // Store pre-rage values
    this.preRageValues = {
      damageMod: document.getElementById('damage-mod-current')?.value || '+0',
      damageModOrig: document.getElementById('damage-mod-original')?.value || '+0',
      endurance: document.getElementById('endurance-current')?.value || '0',
      willpower: document.getElementById('willpower-current')?.value || '0',
      brawn: document.getElementById('brawn-current')?.value || '0',
      evade: document.getElementById('evade-current')?.value || '0'
    };
    
    // Apply rage bonuses
    this.applyRageBonuses();
    
    // Update UI
    const rageBtn = document.getElementById('btn-rage-toggle');
    const tracker = document.getElementById('rage-tracker');
    const btnText = document.getElementById('rage-btn-text');
    
    if (rageBtn) {
      rageBtn.classList.add('raging');
      rageBtn.disabled = true;
    }
    if (tracker) tracker.style.display = '';
    if (btnText) btnText.textContent = '🔥 RAGING! 🔥';
    
    document.getElementById('rage-rounds-used').value = 0;
    this.updateBerserkRageDisplay();
    
    // Strikethrough Artful Dodger if present
    this.setArtfulDodgerStrikethrough(true);
    
    // Refresh summary widgets to show rage effects
    this.refreshSummaryWidgets();
    
    this.scheduleAutoSave();
  },
  
  /**
   * Apply Berserk Rage bonuses
   */
  applyRageBonuses() {
    // Damage Mod +1 step
    const dmgCurrField = document.getElementById('damage-mod-current');
    const dmgOrigField = document.getElementById('damage-mod-original');
    if (dmgCurrField) {
      const nextMod = this.getNextDamageModStep(dmgCurrField.value);
      dmgCurrField.value = nextMod;
    }
    if (dmgOrigField) {
      const nextMod = this.getNextDamageModStep(dmgOrigField.value);
      dmgOrigField.value = nextMod;
    }
    
    // Endurance +20%
    const enduranceField = document.getElementById('endurance-current');
    if (enduranceField) {
      const curr = parseInt(enduranceField.value, 10) || 0;
      enduranceField.value = curr + 20;
      enduranceField.classList.add('rage-boosted');
    }
    
    // Willpower +20%
    const willpowerField = document.getElementById('willpower-current');
    if (willpowerField) {
      const curr = parseInt(willpowerField.value, 10) || 0;
      willpowerField.value = curr + 20;
      willpowerField.classList.add('rage-boosted');
    }
    
    // Brawn +40%
    const brawnField = document.getElementById('brawn-current');
    if (brawnField) {
      const curr = parseInt(brawnField.value, 10) || 0;
      brawnField.value = curr + 40;
      brawnField.classList.add('rage-boosted');
    }
    
    // Evade -2%
    const evadeField = document.getElementById('evade-current');
    if (evadeField) {
      const curr = parseInt(evadeField.value, 10) || 0;
      evadeField.value = Math.max(0, curr - 2);
      evadeField.classList.add('rage-penalized');
    }
    
    // Update weapon damage displays
    if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
      window.WeaponData.updateAllWeaponDamage();
    }
  },
  
  /**
   * Remove Berserk Rage bonuses
   */
  removeRageBonuses() {
    if (!this.preRageValues) return;
    
    // Restore Damage Mod
    const dmgCurrField = document.getElementById('damage-mod-current');
    const dmgOrigField = document.getElementById('damage-mod-original');
    if (dmgCurrField) {
      dmgCurrField.value = this.preRageValues.damageMod;
    }
    if (dmgOrigField) {
      dmgOrigField.value = this.preRageValues.damageModOrig;
    }
    
    // Restore Endurance
    const enduranceField = document.getElementById('endurance-current');
    if (enduranceField) {
      enduranceField.value = this.preRageValues.endurance;
      enduranceField.classList.remove('rage-boosted');
    }
    
    // Restore Willpower
    const willpowerField = document.getElementById('willpower-current');
    if (willpowerField) {
      willpowerField.value = this.preRageValues.willpower;
      willpowerField.classList.remove('rage-boosted');
    }
    
    // Restore Brawn
    const brawnField = document.getElementById('brawn-current');
    if (brawnField) {
      brawnField.value = this.preRageValues.brawn;
      brawnField.classList.remove('rage-boosted');
    }
    
    // Restore Evade
    const evadeField = document.getElementById('evade-current');
    if (evadeField) {
      evadeField.value = this.preRageValues.evade;
      evadeField.classList.remove('rage-penalized');
    }
    
    // Update weapon damage displays
    if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
      window.WeaponData.updateAllWeaponDamage();
    }
    
    this.preRageValues = null;
  },
  
  /**
   * End Berserk Rage
   * @param {boolean} applyFatigue - Whether to apply fatigue penalty
   */
  endBerserkRage(applyFatigue = true) {
    if (!this.isRaging) return;
    
    this.isRaging = false;
    
    // Remove rage bonuses
    this.removeRageBonuses();
    
    // Remove Artful Dodger strikethrough
    this.setArtfulDodgerStrikethrough(false);
    
    // Update UI
    const rageBtn = document.getElementById('btn-rage-toggle');
    const tracker = document.getElementById('rage-tracker');
    const btnText = document.getElementById('rage-btn-text');
    
    if (rageBtn) {
      rageBtn.classList.remove('raging');
      rageBtn.disabled = this.rageUsesRemaining <= 0;
    }
    if (tracker) tracker.style.display = 'none';
    if (btnText) btnText.textContent = "I'm RAGING!";
    
    this.updateBerserkRageDisplay();
    
    // Refresh summary widgets to reflect end of rage
    this.refreshSummaryWidgets();
    
    // Apply one level of fatigue
    if (applyFatigue) {
      this.increaseFatigueByOne();
    }
    
    this.scheduleAutoSave();
  },
  
  /**
   * Increase fatigue by one level
   */
  increaseFatigueByOne() {
    const fatigueOrder = ['fresh', 'winded', 'tired', 'wearied', 'exhausted', 'debilitated', 'incapacitated', 'semiconscious', 'coma'];
    const currentState = this.character.fatigueState || 'fresh';
    const currentIndex = fatigueOrder.indexOf(currentState);
    
    if (currentIndex < fatigueOrder.length - 1) {
      const newState = fatigueOrder[currentIndex + 1];
      this.setFatigueState(newState, true);
      
      // Show notification
      alert(`Rage ended! Fatigue increased from ${this.toTitleCase(currentState)} to ${this.toTitleCase(newState)}.`);
    }
  },
  
  /**
   * Set strikethrough on Artful Dodger ability if present
   */
  setArtfulDodgerStrikethrough(strikethrough) {
    const container = document.getElementById('class-abilities-list');
    if (!container) return;
    
    const inputs = container.querySelectorAll('.class-ability-input');
    inputs.forEach(input => {
      if (input.value.toLowerCase().trim() === 'artful dodger') {
        if (strikethrough) {
          input.classList.add('rage-disabled');
        } else {
          input.classList.remove('rage-disabled');
        }
      }
    });
  },
  
  /**
   * Get the next step up in damage modifier progression
   */
  getNextDamageModStep(currentMod) {
    const progression = [
      '-1d8', '-1d6', '-1d4', '-1d2', '+0',
      '+1d2', '+1d4', '+1d6', '+1d8', '+1d10', '+1d12',
      '+2d6', '+1d8+1d6', '+2d8', '+1d10+1d8', '+2d10',
      '+2d10+1d2', '+2d10+1d4', '+2d10+1d6', '+2d10+1d8', '+2d10+1d10'
    ];
    
    const normalized = currentMod.replace(/\s/g, '');
    const currentIndex = progression.findIndex(m => m === normalized);
    
    if (currentIndex === -1) {
      // Not found, try to find closest match
      if (normalized === '0' || normalized === '') return '+1d2';
      return currentMod; // Return unchanged if unknown
    }
    
    if (currentIndex < progression.length - 1) {
      return progression[currentIndex + 1];
    }
    
    return currentMod; // Already at max
  },
  
  /**
   * Reset rage uses (call on long rest or new day)
   */
  resetRageUses() {
    const con = parseInt(this.character.attributes.CON, 10) || 10;
    this.rageUsesRemaining = Math.ceil(con / 4);
    this.character.rageUsesRemaining = this.rageUsesRemaining;
    this.updateBerserkRageDisplay();
    this.scheduleAutoSave();
  },
  
  /**
   * Restore Berserk Rage state on page load
   */
  restoreBerserkRageState() {
    // Check if character has Berserk Rage ability
    if (this.hasAbility('berserk rage')) {
      this.showBerserkRageSection();
      
      // Restore uses remaining
      if (this.character.rageUsesRemaining !== undefined) {
        this.rageUsesRemaining = this.character.rageUsesRemaining;
      } else {
        const con = parseInt(this.character.attributes.CON, 10) || 10;
        this.rageUsesRemaining = Math.ceil(con / 4);
      }
      
      // Restore raging state if was raging
      if (this.character.isRaging && this.character.preRageValues) {
        this.isRaging = false; // Set false so startBerserkRage works
        this.rageUsesRemaining++; // Will be decremented by startBerserkRage
        this.preRageValues = this.character.preRageValues;
        
        // Manually set rage state without re-storing pre-values
        this.isRaging = true;
        this.rageUsesRemaining--;
        
        // Apply rage bonuses (they should already be applied from saved values)
        // Just update UI
        const rageBtn = document.getElementById('btn-rage-toggle');
        const tracker = document.getElementById('rage-tracker');
        const btnText = document.getElementById('rage-btn-text');
        
        if (rageBtn) {
          rageBtn.classList.add('raging');
          rageBtn.disabled = true;
        }
        if (tracker) tracker.style.display = '';
        if (btnText) btnText.textContent = '🔥 RAGING! 🔥';
        
        // Restore rounds used
        const roundsInput = document.getElementById('rage-rounds-used');
        if (roundsInput && this.character.rageRoundsUsed !== undefined) {
          roundsInput.value = this.character.rageRoundsUsed;
        }
        
        // Re-apply strikethrough
        this.setArtfulDodgerStrikethrough(true);
      }
      
      this.updateBerserkRageDisplay();
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
