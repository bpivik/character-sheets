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
        nameInput.value = item.name;
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
    if (capacityBar) {
      capacityBar.classList.toggle('over-capacity', totalEnc > config.maxEnc);
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
      if (nameInput && item.name) nameInput.value = item.name;
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
        if (nameInput && item.name) nameInput.value = item.name;
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
        if (nameInput && skill.name) nameInput.value = skill.name;
        if (baseInput && skill.base) baseInput.value = skill.base;
        if (currentInput && skill.current) {
          currentInput.value = skill.current;
          // Store as original value for ENC penalty system
          currentInput.dataset.originalValue = skill.current;
        }
        // Update prereq-keys data attribute
        if (prereqKeys && skill.name) prereqKeys.dataset.skillName = skill.name;
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
          if (input && weapon[field]) input.value = weapon[field];
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
          if (input && weapon[field]) input.value = weapon[field];
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
        if (input && ability) input.value = ability;
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
                nameInput.value = spell.name;
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
    
    for (let i = 1; i <= 4; i++) {
      const passionBase = document.getElementById(`passion-${i}-base`);
      if (passionBase) passionBase.textContent = results.beliefs.passion;
      
      const oathBase = document.getElementById(`oath-${i}-base`);
      if (oathBase) oathBase.textContent = results.beliefs.oath;
    }
    
    // Update language bases
    const nativeBase = document.getElementById('native-tongue-base');
    if (nativeBase) nativeBase.textContent = results.languages.native;
    
    for (let i = 2; i <= 5; i++) {
      const langBase = document.getElementById(`language-${i}-base`);
      if (langBase) langBase.textContent = results.languages.additional;
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
      'first aid': 'firstaid',
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
    
    // Define magic skills
    const magicSkillMap = {
      'channel': 'channel',
      'piety': 'piety',
      'arcane casting': 'arcane-casting',
      'arcane knowledge': 'arcane-knowledge',
      'arcane sorcery': 'arcane-sorcery',
      'sorcerous wisdom': 'sorcerous-wisdom',
      'musicianship': 'musicianship',
      'lyrical magic': 'lyrical-magic'
    };
    
    prereqSkills.forEach(skillName => {
      const normalizedSkill = skillName.toLowerCase().trim();
      let skillValue = 0;
      let found = false;
      
      // 1. Check if it's a known standard skill FIRST
      const standardSkillId = standardSkillMap[normalizedSkill];
      if (standardSkillId) {
        const baseSpan = document.getElementById(`${standardSkillId}-base`);
        const currentInput = document.getElementById(`${standardSkillId}-current`);
        const base = parseInt(baseSpan?.textContent, 10) || 0;
        const current = parseInt(currentInput?.value, 10) || 0;
        skillValue = base + current;
        found = true;
      }
      
      // 2. Check if it's a known magic skill
      if (!found) {
        const magicSkillId = magicSkillMap[normalizedSkill];
        if (magicSkillId) {
          const baseSpan = document.getElementById(`${magicSkillId}-base`);
          const currentInput = document.getElementById(`${magicSkillId}-current`);
          const base = parseInt(baseSpan?.textContent, 10) || 0;
          const current = parseInt(currentInput?.value, 10) || 0;
          skillValue = base + current;
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
        for (let i = 0; i < 15; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          const baseVal = document.getElementById(`prof-skill-${i}-base-val`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          
          if (nameInput) {
            const name = nameInput.value?.trim().toLowerCase() || '';
            // Exact match only for professional skills
            if (name === normalizedSkill) {
              const base = parseInt(baseVal?.textContent, 10) || 0;
              const current = parseInt(currentInput?.value, 10) || 0;
              skillValue = base + current;
              found = true;
              break;
            }
          }
        }
      }
      
      // 5. Check professional skills for partial match (e.g., "Lore" matching "Lore (History)")
      if (!found) {
        for (let i = 0; i < 15; i++) {
          const nameInput = document.getElementById(`prof-skill-${i}-name`);
          const baseVal = document.getElementById(`prof-skill-${i}-base-val`);
          const currentInput = document.getElementById(`prof-skill-${i}-current`);
          
          if (nameInput) {
            const name = nameInput.value?.trim().toLowerCase() || '';
            // Check if skill name starts with our search term (for "Lore" -> "Lore (History)")
            // Or if the base name (before parenthesis) matches
            const baseName = name.split('(')[0].trim();
            if (name.startsWith(normalizedSkill + ' ') || 
                name.startsWith(normalizedSkill + '(') || 
                baseName === normalizedSkill) {
              const base = parseInt(baseVal?.textContent, 10) || 0;
              const current = parseInt(currentInput?.value, 10) || 0;
              const total = base + current;
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
    const titleEl = tooltip ? `<title>${tooltip}</title>` : '';
    
    return `<svg class="prereq-key" viewBox="0 0 32 32">
      ${titleEl}
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
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
