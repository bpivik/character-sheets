/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Main Application Controller
   ============================================ */

const App = {
  // Current character data
  character: null,
  
  // Current sheet type
  sheetType: 'human',

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
    
    // Initial calculations
    this.recalculateAll();
    
    console.log('Initialization complete!');
  },

  /**
   * Set up tab navigation
   */
  setupNavigation() {
    const tabs = document.querySelectorAll('.tab-btn');
    const pages = document.querySelectorAll('.sheet-page');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPage = tab.dataset.page;
        
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
        }
      }
    } catch (e) {
      // Ignore storage errors
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
    
    // Remove previous species abilities (if species changed)
    if (prevData && prevData.abilities && prevData.abilities.length > 0) {
      this.removeSpeciesAbilities(prevData.abilities);
    }
    
    // Add new species abilities
    if (newData && newData.abilities && newData.abilities.length > 0) {
      this.populateSpeciesAbilities(newData.abilities);
    }
    
    this.updateAllAbilityTooltips();
    this.scheduleAutoSave();
  },
  
  /**
   * Populate species abilities (only if not already present with fuzzy matching)
   */
  populateSpeciesAbilities(abilities) {
    if (!abilities || abilities.length === 0) return;
    
    const existingAbilities = this.getAllSpecialAbilities();
    
    abilities.forEach(ability => {
      // Check if ability already exists (with fuzzy matching for notes)
      const alreadyExists = existingAbilities.some(existing => 
        this.abilityMatchesFuzzy(existing, ability)
      );
      
      if (!alreadyExists) {
        this.addSpecialAbility(ability, 'species');
      }
    });
  },
  
  /**
   * Remove species abilities (only if they match exactly or with fuzzy matching)
   */
  removeSpeciesAbilities(abilities) {
    if (!abilities || abilities.length === 0) return;
    
    // 3 columns x 20 rows
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (!input || !input.value.trim()) continue;
        
        const currentAbility = input.value.trim();
        
        // Check if this ability matches any species ability (with fuzzy matching)
        const isSpeciesAbility = abilities.some(baseAbility => 
          this.abilityMatchesFuzzy(currentAbility, baseAbility)
        );
        
        // Only remove if it's a species ability and not granted by class
        if (isSpeciesAbility && input.dataset.classAbility !== 'species') {
          // Check if granted by another source (class)
          if (!input.dataset.classAbility) {
            input.value = '';
            input.title = 'Enter a Special Ability name';
            input.classList.remove('duplicate-warning');
          }
        } else if (isSpeciesAbility && input.dataset.classAbility === 'species') {
          input.value = '';
          input.title = 'Enter a Special Ability name';
          input.classList.remove('duplicate-warning');
          delete input.dataset.classAbility;
        }
      }
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
        // Handle ENC penalty
        if (e.target.classList.contains('enc-penalty-init-move')) {
          // User is editing while penalized - update original value
          e.target.dataset.originalValue = e.target.value;
          // Re-apply penalty after a short delay
          setTimeout(() => this.updateTotalEnc(), 10);
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
    
    // Rank fields need to update rank name
    const rankFields = ['rank-primary', 'rank-secondary', 'rank-tertiary'];
    
    infoFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          const key = this.camelCase(fieldId);
          this.character.info[key] = e.target.value;
          
          // Clamp rank values to 0-5
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
            
            // Update class spells after a brief delay to ensure rank is set
            setTimeout(() => {
              this.updateClassSpells(previousClasses);
              this.updateClassAbilities(previousClasses);
            }, 50);
            
            this.scheduleAutoSave();
          });
        }
        
        // Add blur listener for species field to update sheet type
        if (fieldId === 'species') {
          // Store initial species value
          field.dataset.previousValue = field.value || '';
          
          field.addEventListener('blur', () => {
            const previousSpecies = field.dataset.previousValue || '';
            const currentSpecies = field.value || '';
            
            // Only update if species actually changed
            if (previousSpecies.toLowerCase().trim() !== currentSpecies.toLowerCase().trim()) {
              this.updateSheetTypeFromSpecies(previousSpecies);
              field.dataset.previousValue = currentSpecies;
            }
            
            this.updateMagicVisibility();
            this.scheduleAutoSave();
          });
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
          
          // Handle ENC penalty for initiative
          if (fieldId === 'initiative-current' && e.target.classList.contains('enc-penalty-init-move')) {
            // User is editing while penalized - update original value
            e.target.dataset.originalValue = e.target.value;
            // Re-apply penalty after a short delay
            setTimeout(() => this.updateTotalEnc(), 10);
          } else if (fieldId === 'initiative-current') {
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
        
        // If there's an active penalty and user is editing, update the original value
        if (e.target.classList.contains('enc-penalized-value')) {
          // User is editing a penalized field - treat the input as the NEW original
          // and re-apply penalty
          const newOriginal = e.target.value;
          e.target.dataset.originalValue = newOriginal;
          this.character.standardSkills[skillKey] = newOriginal;
          
          // Re-apply penalty display after a short delay
          setTimeout(() => this.updateTotalEnc(), 10);
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
          // For percent fields, handle ENC penalty
          if (fieldId === 'combat-skill-1-percent' || fieldId === 'unarmed-percent') {
            // If field has a penalty applied, update the original value
            if (field.classList.contains('enc-penalized-value')) {
              const currentStatus = Calculator.getEncStatus(this.character.derived.totalEnc || 0, this.character.characteristics.str || 0);
              const penaltyPercent = currentStatus.penaltyPercent || 0;
              // User entered penalized value, calculate what original should be
              const enteredValue = parseInt(field.value) || 0;
              field.dataset.originalValue = enteredValue + penaltyPercent;
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
    
    // Alphabetize spells buttons (on both magic pages)
    const alphabetizeBtn = document.getElementById('btn-alphabetize-spells');
    if (alphabetizeBtn) {
      alphabetizeBtn.addEventListener('click', () => {
        this.alphabetizeAllSpells();
      });
    }
    const alphabetizeBtnP2 = document.getElementById('btn-alphabetize-spells-p2');
    if (alphabetizeBtnP2) {
      alphabetizeBtnP2.addEventListener('click', () => {
        this.alphabetizeAllSpells();
      });
    }
    
    // Unlock originals button (for Attributes only)
    const unlockOriginalsBtn = document.getElementById('unlock-originals-btn');
    if (unlockOriginalsBtn) {
      unlockOriginalsBtn.addEventListener('click', () => {
        this.toggleOriginalsEditing();
      });
    }
  },
  
  /**
   * Toggle editing of Characteristics and original Attribute values
   */
  toggleOriginalsEditing() {
    const derivedOriginals = document.querySelectorAll('.derived-readonly');
    const charInputs = document.querySelectorAll('.char-readonly, .char-editable');
    const btn = document.getElementById('unlock-originals-btn');
    
    const isCurrentlyReadonly = derivedOriginals[0]?.hasAttribute('readonly');
    
    // Toggle Derived Attributes
    derivedOriginals.forEach(input => {
      if (isCurrentlyReadonly) {
        input.removeAttribute('readonly');
        input.classList.add('derived-editable');
      } else {
        input.setAttribute('readonly', '');
        input.classList.remove('derived-editable');
      }
    });
    
    // Toggle Characteristics
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
    
    // Update locked state
    this.character.originalsLocked = !isCurrentlyReadonly;
    
    // If we just locked, save the current original values
    if (!isCurrentlyReadonly) {
      this.saveDerivedOriginalValues();
    }
    
    this.scheduleAutoSave();
    
    if (btn) {
      if (isCurrentlyReadonly) {
        btn.textContent = '🔓 Lock Characteristics and Original Attributes';
        btn.classList.add('unlocked');
      } else {
        btn.textContent = '🔒 Unlock Characteristics and Original Attributes';
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
        <input type="text" class="prof-skill-base" id="prof-skill-${i}-base" placeholder="">
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
      
      // Convert to title case on blur
      nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
          nameInput.value = this.toTitleCase(nameInput.value.trim());
          prereqKeys.dataset.skillName = nameInput.value;
          this.updatePrereqKeys();
          this.scheduleAutoSave();
        }
      });
      
      // Auto-fill formula when skill name is entered
      nameInput.addEventListener('input', (e) => {
        this.autoFillProfessionalSkillFormula(e.target, baseInput);
        this.updateProfessionalSkillData(i);
        this.updateProfSkillEncIndicator(i);
        // Update prereq keys data attribute
        prereqKeys.dataset.skillName = e.target.value.trim();
        this.updatePrereqKeys();
        this.scheduleAutoSave();
      });
      
      // Also recalculate base value when formula changes
      baseInput.addEventListener('input', () => {
        this.calculateProfessionalSkillBase(i);
        this.updateProfessionalSkillData(i);
        this.updateProfSkillEncIndicator(i);
        this.scheduleAutoSave();
      });
      
      currentInput.addEventListener('input', (e) => {
        // If there's an active penalty and user is editing, update the original value
        if (e.target.classList.contains('enc-penalized-value')) {
          const newOriginal = e.target.value;
          e.target.dataset.originalValue = newOriginal;
          // Re-apply penalty display after a short delay
          setTimeout(() => this.updateTotalEnc(), 10);
        } else if (e.target.dataset.originalValue !== undefined) {
          e.target.dataset.originalValue = e.target.value;
        }
        this.updateProfessionalSkillData(i);
        this.scheduleAutoSave();
      });
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
   * Calculate a formula like "STR+DEX" or "INT x2" using current attribute values
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
    
    // Handle "X x2" format (e.g., "INT x2", "DEX x2")
    const multiplierMatch = formula.match(/^([A-Z]{3})\s*[xX×]\s*2$/);
    if (multiplierMatch) {
      const attr = multiplierMatch[1];
      return attrs[attr] ? attrs[attr] * 2 : null;
    }
    
    // Handle "X+Y" format (e.g., "STR+DEX", "INT+POW")
    const additionMatch = formula.match(/^([A-Z]{3})\s*\+\s*([A-Z]{3})$/);
    if (additionMatch) {
      const attr1 = additionMatch[1];
      const attr2 = additionMatch[2];
      if (attrs[attr1] !== undefined && attrs[attr2] !== undefined) {
        return attrs[attr1] + attrs[attr2];
      }
    }
    
    // Handle "X+Y+N" format (e.g., "INT+CHA+40")
    const additionBonusMatch = formula.match(/^([A-Z]{3})\s*\+\s*([A-Z]{3})\s*\+\s*(\d+)$/);
    if (additionBonusMatch) {
      const attr1 = additionBonusMatch[1];
      const attr2 = additionBonusMatch[2];
      const bonus = parseInt(additionBonusMatch[3]);
      if (attrs[attr1] !== undefined && attrs[attr2] !== undefined) {
        return attrs[attr1] + attrs[attr2] + bonus;
      }
    }
    
    return null;
  },

  /**
   * Recalculate all professional skill base values
   */
  recalculateProfessionalSkillBases() {
    for (let i = 0; i < PROFESSIONAL_SKILL_SLOTS; i++) {
      this.calculateProfessionalSkillBase(i);
    }
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
          <input type="number" class="hp-max-input" id="loc-${i}-hp" placeholder="">
          /
          <input type="number" class="hp-current" id="loc-${i}-current" placeholder="">
        </td>
      `;
      tbody.appendChild(tr);
      
      // Add event listeners
      tr.querySelectorAll('input').forEach(input => {
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
          <td><input type="text" id="melee-${i}-name" placeholder=""></td>
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
        
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => this.scheduleAutoSave());
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
          <td><input type="text" id="ranged-${i}-name" placeholder=""></td>
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
        
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => this.scheduleAutoSave());
        });
      }
    }
  },

  /**
   * Generate special ability inputs - 3 column layout with 20 rows each
   */
  generateSpecialAbilities() {
    for (let col = 1; col <= 3; col++) {
      const container = document.getElementById(`abilities-col-${col}`);
      if (!container) continue;
      
      container.innerHTML = '';
      
      // 20 rows per column = 60 total abilities
      for (let i = 0; i < 20; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'ability-input';
        input.id = `ability-${col}-${i}`;
        input.placeholder = '';
        
        // Set default tooltip
        input.title = 'Enter a Special Ability name';
        
        // Handle ability changes
        input.addEventListener('blur', (e) => {
          this.handleAbilityChange(e.target);
        });
        
        input.addEventListener('input', () => this.scheduleAutoSave());
        container.appendChild(input);
      }
    }
  },
  
  /**
   * Handle ability input change - check duplicates, update tooltip
   */
  handleAbilityChange(input) {
    const value = input.value.trim();
    
    if (!value) {
      // Reset tooltip for empty input
      input.title = 'Enter a Special Ability name';
      input.classList.remove('duplicate-warning');
      return;
    }
    
    // Convert to title case
    input.value = this.toTitleCase(value);
    
    // Check for duplicates
    const isDuplicate = this.checkAbilityDuplicate(input);
    
    if (isDuplicate) {
      input.classList.add('duplicate-warning');
    } else {
      input.classList.remove('duplicate-warning');
    }
    
    // Update tooltip with ability description
    this.updateAbilityTooltip(input);
  },
  
  /**
   * Check if ability is duplicated elsewhere
   * @returns {boolean} true if duplicate found
   */
  checkAbilityDuplicate(currentInput) {
    const currentValue = currentInput.value.trim().toLowerCase();
    if (!currentValue) return false;
    
    // Check all other ability inputs (3 columns, 20 rows each)
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (!input || input === currentInput) continue;
        
        const otherValue = input.value.trim().toLowerCase();
        if (otherValue === currentValue) {
          // Show warning
          const keepDuplicate = confirm(
            `This ability "${currentInput.value}" already exists in another slot.\n\n` +
            `Do you want to keep this duplicate?\n\n` +
            `Click OK to keep, Cancel to clear this entry.`
          );
          
          if (!keepDuplicate) {
            currentInput.value = '';
            currentInput.title = 'Enter a Special Ability name';
            this.scheduleAutoSave();
            return false;
          }
          return true;
        }
      }
    }
    return false;
  },
  
  /**
   * Update tooltip with ability description
   */
  updateAbilityTooltip(input) {
    const value = input.value.trim();
    
    if (!value) {
      input.title = 'Enter a Special Ability name';
      return;
    }
    
    // Look up description from AbilityDescriptions
    if (window.AbilityDescriptions) {
      const description = AbilityDescriptions.getDescription(value);
      if (description) {
        input.title = description;
      } else {
        input.title = value; // Just show the ability name if no description
      }
    } else {
      input.title = value;
    }
  },
  
  /**
   * Update all ability tooltips (called on load)
   */
  updateAllAbilityTooltips() {
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input && input.value.trim()) {
          this.updateAbilityTooltip(input);
        }
      }
    }
  },

  /**
   * Sort special abilities alphabetically
   */
  sortSpecialAbilities() {
    // Collect all abilities from 3 columns
    const abilities = [];
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input && input.value.trim()) {
          abilities.push(input.value.trim());
        }
      }
    }
    
    // Sort alphabetically
    abilities.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    // Redistribute across columns
    let index = 0;
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input) {
          input.value = abilities[index] || '';
          index++;
        }
      }
    }
    
    // Update tooltips after sorting
    this.updateAllAbilityTooltips();
    
    this.scheduleAutoSave();
  },

  /**
   * Generate spell rows for all ranks
   */
  generateSpellRows() {
    const ranks = ['cantrips', 'rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
    
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
          if (input !== nameInput) {
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
    
    // Restore locked original values if locked
    if (this.character.originalsLocked) {
      const originalMapping = {
        'action-points-original': 'actionPointsOriginal',
        'damage-mod-original': 'damageModOriginal',
        'exp-mod-original': 'expModOriginal',
        'healing-rate-original': 'healingRateOriginal',
        'initiative-original': 'initiativeOriginal',
        'luck-original': 'luckOriginal',
        'magic-points-original': 'magicPointsOriginal'
      };
      
      for (const [fieldId, key] of Object.entries(originalMapping)) {
        const field = document.getElementById(fieldId);
        if (field && this.character.derived[key] !== undefined) {
          field.value = this.character.derived[key];
        }
      }
      
      // Update button state to show locked
      const btn = document.getElementById('unlock-originals-btn');
      if (btn) {
        btn.textContent = '🔒 Unlock Characteristics and Original Attributes';
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
          // Store as original value for ENC penalty system
          currentInput.dataset.originalValue = skill.current;
        }
        // Update prereq-keys data attribute
        if (prereqKeys && skill.name) prereqKeys.dataset.skillName = this.toTitleCase(skill.name);
        // Update ENC indicator visibility
        this.updateProfSkillEncIndicator(i);
      });
      // Recalculate base values after loading
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
        const currentInput = document.getElementById(`passion-${i+1}-current`);
        if (nameInput && item.name) nameInput.value = item.name;
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
      });
    }
    
    // Ranged Weapons
    if (this.character.combat && this.character.combat.rangedWeapons) {
      this.character.combat.rangedWeapons.forEach((weapon, i) => {
        const fields = ['name', 'hands', 'damage', 'dm', 'range', 'load', 'effects', 'impl', 'aphp', 'traits'];
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
      });
    }
    
    // Special Abilities (3 columns x 20 rows = 60 total)
    if (this.character.combat && this.character.combat.specialAbilities) {
      this.character.combat.specialAbilities.forEach((ability, i) => {
        const col = Math.floor(i / 20) + 1;
        const row = i % 20;
        const input = document.getElementById(`ability-${col}-${row}`);
        if (input && ability) input.value = this.toTitleCase(ability);
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
    
    // Passions
    for (let i = 1; i <= 4; i++) {
      const nameInput = document.getElementById(`passion-${i}-name`);
      const currentInput = document.getElementById(`passion-${i}-current`);
      if (nameInput && currentInput) {
        this.character.passions[i-1] = {
          name: nameInput.value,
          current: currentInput.value
        };
      }
    }
    
    // Oaths
    for (let i = 1; i <= 4; i++) {
      const nameInput = document.getElementById(`oath-${i}-name`);
      const currentInput = document.getElementById(`oath-${i}-current`);
      if (nameInput && currentInput) {
        this.character.oaths[i-1] = {
          name: nameInput.value,
          current: currentInput.value
        };
      }
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
          current: currentInput.value
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
        percent: percentInput?.value || '',
        weapons: weaponsInput?.value || ''
      });
    }
    
    // Unarmed
    const unarmedInput = document.getElementById('unarmed-percent');
    if (unarmedInput) {
      this.character.combat.unarmedPercent = unarmedInput.value;
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
      fields.forEach(field => {
        const input = document.getElementById(`melee-${i}-${field}`);
        weapon[field] = input?.value || '';
        // Save baseDamage data attribute for damage field
        if (field === 'damage' && input?.dataset?.baseDamage) {
          weapon.baseDamage = input.dataset.baseDamage;
        }
      });
      this.character.combat.meleeWeapons.push(weapon);
    }
    
    // Ranged Weapons
    this.character.combat.rangedWeapons = [];
    for (let i = 0; i < 5; i++) {
      const weapon = {};
      const fields = ['name', 'hands', 'damage', 'dm', 'range', 'load', 'effects', 'impl', 'aphp', 'traits'];
      fields.forEach(field => {
        const input = document.getElementById(`ranged-${i}-${field}`);
        weapon[field] = input?.value || '';
        // Save baseDamage data attribute for damage field
        if (field === 'damage' && input?.dataset?.baseDamage) {
          weapon.baseDamage = input.dataset.baseDamage;
        }
      });
      this.character.combat.rangedWeapons.push(weapon);
    }
    
    // Special Abilities (3 columns x 20 rows = 60 total)
    this.character.combat.specialAbilities = [];
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input) {
          this.character.combat.specialAbilities.push(input.value);
        }
      }
    }
    
    // Flying Speed
    const flyingInput = document.getElementById('flying-speed');
    if (flyingInput) {
      this.character.combat.flyingSpeed = flyingInput.value;
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
    const results = Calculator.recalculateAll(attrs, this.sheetType);
    
    // Only update original values if NOT locked
    if (!this.character.originalsLocked) {
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
      
      // Update weapon damage displays when damage modifier changes
      if (window.WeaponData && window.WeaponData.updateAllWeaponDamage) {
        window.WeaponData.updateAllWeaponDamage();
      }
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
    
    // Update passion bases (static 4 rows for now)
    for (let i = 1; i <= 4; i++) {
      const passionBase = document.getElementById(`passion-${i}-base`);
      if (passionBase) passionBase.textContent = results.beliefs.passion;
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
   */
  handleClassSpecialActions(className, rank) {
    if (!window.ClassAbilities) return;
    
    const classKey = className.toLowerCase().trim();
    
    // Check all ranks up to current for special actions
    for (let r = 1; r <= rank; r++) {
      const actions = window.ClassAbilities.getSpecialActions(className, r);
      if (!actions) continue;
      
      // Add language (Druid)
      if (actions.addLanguage) {
        this.addLanguageIfNotExists(actions.addLanguage);
      }
      
      // Add/update Unarmed weapon (Monk)
      if (actions.addUnarmed) {
        this.addOrUpdateUnarmedWeapon(actions.addUnarmed);
      }
      if (actions.changeUnarmedDamage) {
        this.updateUnarmedDamage(actions.changeUnarmedDamage);
      }
      
      // Add spell (Sorcerer Familiar)
      if (actions.addSpell) {
        this.addSpellIfNotExists(actions.addSpell.rank, actions.addSpell.spell);
      }
    }
  },
  
  /**
   * Add a language to the first empty language slot
   */
  addLanguageIfNotExists(languageName) {
    // Check if language already exists
    for (let i = 1; i <= 4; i++) {
      const nameInput = document.getElementById(`language-${i}-name`);
      if (nameInput && nameInput.value.toLowerCase().trim() === languageName.toLowerCase().trim()) {
        return; // Already exists
      }
    }
    
    // Find first empty slot
    for (let i = 1; i <= 4; i++) {
      const nameInput = document.getElementById(`language-${i}-name`);
      if (nameInput && !nameInput.value.trim()) {
        nameInput.value = languageName;
        nameInput.dataset.classLanguage = 'druid';
        return;
      }
    }
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
   * Remove abilities granted by a class
   */
  removeClassAbilities(className) {
    if (!window.ClassAbilities) return;
    
    const classAbilities = window.ClassAbilities.getAllAbilitiesForClass(className);
    if (!classAbilities || classAbilities.length === 0) return;
    
    // Normalize class abilities for comparison
    const normalizedClassAbilities = classAbilities.map(a => a.toLowerCase().trim());
    
    // Check each ability slot (3 columns x 20 rows)
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (!input || !input.value.trim()) continue;
        
        const ability = input.value.toLowerCase().trim();
        
        // Check if this ability belongs to the removed class
        if (normalizedClassAbilities.includes(ability)) {
          // Check if another class also grants this ability
          const otherClassesGrant = this.abilityGrantedByOtherClass(ability, className);
          
          if (!otherClassesGrant) {
            input.value = '';
            input.title = 'Enter a Special Ability name';
            input.classList.remove('duplicate-warning');
            delete input.dataset.classAbility;
          }
        }
      }
    }
    
    // Handle removal of special class features
    this.removeClassSpecialFeatures(className);
    
    this.scheduleAutoSave();
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
    
    // Remove Druid's Cant language
    if (classKey === 'druid') {
      for (let i = 1; i <= 4; i++) {
        const nameInput = document.getElementById(`language-${i}-name`);
        if (nameInput && nameInput.dataset.classLanguage === 'druid') {
          nameInput.value = '';
          delete nameInput.dataset.classLanguage;
        }
      }
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
   * Get all current special abilities
   */
  getAllSpecialAbilities() {
    const abilities = [];
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input && input.value.trim()) {
          abilities.push(input.value.trim());
        }
      }
    }
    return abilities;
  },
  
  /**
   * Add a special ability to the first empty slot
   */
  addSpecialAbility(abilityName, sourceClass = null) {
    // Find first empty slot (3 columns x 20 rows)
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < 20; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input && !input.value.trim()) {
          input.value = this.toTitleCase(abilityName);
          if (sourceClass) {
            input.dataset.classAbility = sourceClass.toLowerCase();
          }
          this.updateAbilityTooltip(input);
          return true;
        }
      }
    }
    return false; // No empty slots
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
    // Use current movement value (from the movement-current input)
    const movementCurrent = document.getElementById('movement-current');
    const baseMovement = parseInt(movementCurrent?.value) || parseInt(this.character.derived.movementCurrent) || parseInt(this.character.derived.movementBase) || 0;
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
    
    // Update Initiative and Movement current values
    this.updateEncInitiativeAndMovement(status);
    
    // Update Standard Skill percentages that have enc-indicator
    this.updateEncAffectedSkillValues(status);
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

  /**
   * Utility: Convert kebab-case to camelCase
   */
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
        return `
          <h4>Character Info</h4>
          <div class="stat-row"><span class="stat-label">Name:</span><span class="stat-value">${name}</span></div>
          <div class="stat-row"><span class="stat-label">Species:</span><span class="stat-value">${species}</span></div>
          <div class="stat-row"><span class="stat-label">Culture:</span><span class="stat-value">${culture}</span></div>
          <div class="stat-row"><span class="stat-label">Class:</span><span class="stat-value">${primaryClass} (Rank ${rank})</span></div>
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
        const combatName = document.getElementById('combat-skill-1-name')?.value || 'Combat Style';
        const combatPct = document.getElementById('combat-skill-1-percent')?.value || '-';
        const unarmedPct = document.getElementById('unarmed-percent')?.value || '-';
        
        let html = `
          <h4>Combat</h4>
          <div class="skill-list">
            <div class="skill-item"><span>${combatName}</span><span>${combatPct}%</span></div>
            <div class="skill-item"><span>Unarmed</span><span>${unarmedPct}%</span></div>
          </div>
          <div style="margin-top:8px; border-top:1px solid #eee; padding-top:8px;">
          <div class="skill-list">
        `;
        
        let found = false;
        // Check melee weapons
        for (let i = 0; i < 4; i++) {
          const name = document.getElementById(`melee-${i}-name`)?.value;
          const dmg = document.getElementById(`melee-${i}-damage`)?.value;
          if (name) {
            html += `<div class="skill-item"><span>${name}</span><span>${dmg || '-'}</span></div>`;
            found = true;
          }
        }
        // Check ranged weapons
        for (let i = 0; i < 4; i++) {
          const name = document.getElementById(`ranged-${i}-name`)?.value;
          const dmg = document.getElementById(`ranged-${i}-damage`)?.value;
          if (name) {
            html += `<div class="skill-item"><span>${name}</span><span>${dmg || '-'}</span></div>`;
            found = true;
          }
        }
        if (!found) {
          html += '<div class="skill-item"><span style="color:#999;">No weapons</span></div>';
        }
        html += '</div></div>';
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
        for (let i = 0; i < 15; i++) {
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
      render: () => {
        const channel = document.getElementById('channel-percent')?.value || '-';
        const piety = document.getElementById('piety-percent')?.value || '-';
        const arcCast = document.getElementById('arcane-casting-percent')?.value || '-';
        const arcKnow = document.getElementById('arcane-knowledge-percent')?.value || '-';
        return `
          <h4>Magic Skills</h4>
          <div class="skill-list">
            <div class="skill-item"><span>Channel</span><span>${channel}%</span></div>
            <div class="skill-item"><span>Piety</span><span>${piety}%</span></div>
            <div class="skill-item"><span>Arcane Casting</span><span>${arcCast}%</span></div>
            <div class="skill-item"><span>Arcane Knowledge</span><span>${arcKnow}%</span></div>
          </div>
        `;
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
    'tenacity': {
      name: 'Tenacity',
      icon: '🔥',
      render: () => {
        const current = document.getElementById('tenacity-current')?.value || '-';
        const max = document.getElementById('tenacity-max')?.value || '-';
        return `
          <h4>Tenacity</h4>
          <div class="stat-row"><span class="stat-label">Current:</span><span class="stat-value">${current} / ${max}</span></div>
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
   * Setup alphabetize button for Professional Skills
   */
  setupAlphabetizeButton() {
    const btn = document.getElementById('btn-alphabetize-prof');
    if (btn) {
      btn.addEventListener('click', () => {
        this.alphabetizeProfessionalSkills();
      });
    }
  },

  /**
   * Setup add row buttons
   */
  setupAddRowButtons() {
    // Add Professional Skill
    const addProfBtn = document.getElementById('btn-add-prof-skill');
    if (addProfBtn) {
      addProfBtn.addEventListener('click', () => this.addProfessionalSkillRow());
    }
    
    // Add Language
    const addLangBtn = document.getElementById('btn-add-language');
    if (addLangBtn) {
      addLangBtn.addEventListener('click', () => this.addLanguageRow());
    }
    
    // Add Oath
    const addOathBtn = document.getElementById('btn-add-oath');
    if (addOathBtn) {
      addOathBtn.addEventListener('click', () => this.addOathRow());
    }
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
      <input type="text" class="prof-skill-base" id="prof-skill-${newIndex}-base" placeholder="">
      <span class="prof-skill-base-val" id="prof-skill-${newIndex}-base-val"></span>
      <input type="number" class="prof-skill-current" id="prof-skill-${newIndex}-current" placeholder="">
      <span class="enc-indicator prof-enc-indicator" id="prof-skill-${newIndex}-enc" style="display: none;" title="Affected by ENC"></span>
    `;
    container.appendChild(row);
    
    // Add event listeners (same as generateProfessionalSkills)
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
      this.autoFillProfessionalSkillBase(newIndex);
    });
    
    baseInput.addEventListener('blur', () => {
      this.calculateProfessionalSkillBase(newIndex);
    });
    
    currentInput.addEventListener('input', () => this.scheduleAutoSave());
    
    // Scroll to show new row
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    nameInput.focus();
    
    this.scheduleAutoSave();
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
        // TODO: Implement
        alert('Unlock Class Abilities - Coming soon!');
      });
      
      document.getElementById('exp-btn-learn-skills').addEventListener('click', () => {
        this.closeExpModal();
        this.openLearnNewSkillsModal();
      });
      
      document.getElementById('exp-btn-passions').addEventListener('click', () => {
        // TODO: Implement
        alert('Strengthen Passions, Alignment, or Oaths - Coming soon!');
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
    // Parse skill ID format: "standard:skillname", "prof:index", "combat", "magic:id"
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
    // Find first empty slot
    for (let i = 0; i < 20; i++) {
      const nameInput = document.getElementById(`prof-skill-${i}-name`);
      if (nameInput && !nameInput.value.trim()) {
        // Set the skill name
        nameInput.value = skill.fullName || skill.name;
        
        // Trigger blur to calculate base value
        nameInput.dispatchEvent(new Event('blur', { bubbles: true }));
        
        // Set current to base value
        setTimeout(() => {
          const baseVal = document.getElementById(`prof-skill-${i}-base-val`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          if (baseVal && currentInput) {
            currentInput.value = baseVal.textContent || '';
          }
        }, 100);
        
        return;
      }
    }
    
    alert('No empty professional skill slots available!');
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
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
