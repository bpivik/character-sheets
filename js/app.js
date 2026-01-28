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
    this.generateBackpackRows();
    this.setupBackpackModal();
    this.generateHitLocations();
    this.generateWeaponRows();
    this.generateSpecialAbilities();
    this.generateSpellRows();
    
    // Populate form with loaded data
    this.populateForm();
    
    // Update combat skill name from classes (if not already set)
    this.updateCombatSkillName();
    
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
      });
    });
  },

  /**
   * Set up sheet type selector (Human/Syrin)
   */
  setupSheetTypeSelector() {
    const selector = document.getElementById('sheet-type-select');
    if (!selector) return;
    
    selector.value = this.sheetType;
    
    selector.addEventListener('change', (e) => {
      this.sheetType = e.target.value;
      this.character.sheetType = this.sheetType;
      document.getElementById('app').dataset.sheetType = this.sheetType;
      
      // Regenerate hit locations for new type
      this.generateHitLocations();
      this.recalculateAll();
      this.scheduleAutoSave();
    });
    
    // Set initial sheet type
    document.getElementById('app').dataset.sheetType = this.sheetType;
  },

  /**
   * Set up attribute input listeners
   */
  setupAttributeListeners() {
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
    
    // Movement input
    const movementInput = document.getElementById('movement-base');
    if (movementInput) {
      movementInput.addEventListener('input', (e) => {
        this.character.derived.movementBase = e.target.value;
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
    
    infoFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          const key = this.camelCase(fieldId);
          this.character.info[key] = e.target.value;
          this.scheduleAutoSave();
        });
        
        // Add blur listener for class fields to update combat skill name
        if (classFields.includes(fieldId)) {
          field.addEventListener('blur', () => {
            this.updateCombatSkillName(true); // Force update when classes change
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
          this.character.derived[key] = e.target.value;
          this.scheduleAutoSave();
        });
      }
    });
    
    // Skill current values
    document.querySelectorAll('.skill-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const skillKey = e.target.id.replace('-current', '');
        this.character.standardSkills[skillKey] = e.target.value;
        this.updateCombatQuickRef();
        this.scheduleAutoSave();
      });
    });
    
    // Notes
    const notesFields = ['combat-notes', 'general-notes'];
    notesFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', (e) => {
          if (fieldId === 'combat-notes') {
            this.character.combat.notes = e.target.value;
          } else {
            this.character.notes = e.target.value;
          }
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
    
    // Edit derived values button
    const editDerivedBtn = document.getElementById('edit-derived-btn');
    if (editDerivedBtn) {
      editDerivedBtn.addEventListener('click', () => {
        this.toggleDerivedEditing();
      });
    }
  },
  
  /**
   * Toggle editing of derived original values
   */
  toggleDerivedEditing() {
    const derivedInputs = document.querySelectorAll('.derived-readonly');
    const btn = document.getElementById('edit-derived-btn');
    
    const isCurrentlyReadonly = derivedInputs[0]?.hasAttribute('readonly');
    
    derivedInputs.forEach(input => {
      if (isCurrentlyReadonly) {
        // Unlocking for editing
        input.removeAttribute('readonly');
        input.classList.add('derived-editable');
      } else {
        // Locking - save current values before locking
        input.setAttribute('readonly', '');
        input.classList.remove('derived-editable');
      }
    });
    
    // Update locked state
    this.character.derivedLocked = !isCurrentlyReadonly;
    
    // If we just locked, save the current original values
    if (!isCurrentlyReadonly) {
      this.saveDerivedOriginalValues();
    }
    
    this.scheduleAutoSave();
    
    if (btn) {
      btn.textContent = isCurrentlyReadonly ? 'Lock Original Values' : 'Edit Original Values';
      btn.classList.toggle('btn-warning', isCurrentlyReadonly);
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
        <input type="text" class="prof-skill-name" id="prof-skill-${i}-name" placeholder="">
        <input type="text" class="prof-skill-base" id="prof-skill-${i}-base" placeholder="">
        <span class="prof-skill-base-val" id="prof-skill-${i}-base-val"></span>
        <input type="number" class="prof-skill-current" id="prof-skill-${i}-current" placeholder="">
      `;
      container.appendChild(row);
      
      // Add event listeners
      const nameInput = row.querySelector('.prof-skill-name');
      const baseInput = row.querySelector('.prof-skill-base');
      const currentInput = row.querySelector('.prof-skill-current');
      
      // Auto-fill formula when skill name is entered
      nameInput.addEventListener('input', (e) => {
        this.autoFillProfessionalSkillFormula(e.target, baseInput);
        this.updateProfessionalSkillData(i);
        this.scheduleAutoSave();
      });
      
      // Also recalculate base value when formula changes
      baseInput.addEventListener('input', () => {
        this.calculateProfessionalSkillBase(i);
        this.updateProfessionalSkillData(i);
        this.scheduleAutoSave();
      });
      
      currentInput.addEventListener('input', () => {
        this.updateProfessionalSkillData(i);
        this.scheduleAutoSave();
      });
    }
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
    const current = document.getElementById(`prof-skill-${index}-current`)?.value || '';
    
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
      const encInput = row.querySelector('.equipment-enc');
      encInput.addEventListener('input', () => {
        this.updateTotalEnc();
        this.scheduleAutoSave();
      });
      
      row.querySelector('.equipment-name').addEventListener('input', () => {
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

  generateBackpackRows() {
    const container = document.getElementById('backpack-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < BACKPACK_SLOTS; i++) {
      const row = document.createElement('div');
      row.className = 'equipment-row';
      row.innerHTML = `
        <input type="text" class="equipment-name" id="backpack-${i}-name" placeholder="">
        <input type="number" class="equipment-enc" id="backpack-${i}-enc" placeholder="" step="0.1">
      `;
      container.appendChild(row);
      
      // Add event listeners for auto-save
      row.querySelector('.equipment-name').addEventListener('input', () => {
        this.scheduleAutoSave();
      });
      
      row.querySelector('.equipment-enc').addEventListener('input', () => {
        this.scheduleAutoSave();
      });
    }
  },

  setupBackpackModal() {
    const openBtn = document.getElementById('btn-open-backpack');
    const closeBtn = document.getElementById('btn-close-backpack');
    const saveBtn = document.getElementById('btn-save-backpack');
    const modal = document.getElementById('backpack-modal');
    
    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }
    
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
    
    if (saveBtn && modal) {
      saveBtn.addEventListener('click', () => {
        this.saveCharacter();
        modal.classList.add('hidden');
      });
    }
    
    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
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
        
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => this.scheduleAutoSave());
        });
      }
    }
  },

  /**
   * Generate special ability inputs
   */
  generateSpecialAbilities() {
    for (let col = 1; col <= 3; col++) {
      const container = document.getElementById(`abilities-col-${col}`);
      if (!container) continue;
      
      container.innerHTML = '';
      
      for (let i = 0; i < ABILITY_SLOTS_PER_COLUMN; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'ability-input';
        input.id = `ability-${col}-${i}`;
        input.placeholder = '';
        input.addEventListener('input', () => this.scheduleAutoSave());
        container.appendChild(input);
      }
    }
  },

  /**
   * Sort special abilities alphabetically
   */
  sortSpecialAbilities() {
    // Collect all abilities
    const abilities = [];
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < ABILITY_SLOTS_PER_COLUMN; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input && input.value.trim()) {
          abilities.push(input.value.trim());
        }
      }
    }
    
    // Sort alphabetically
    abilities.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    // Redistribute
    let index = 0;
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < ABILITY_SLOTS_PER_COLUMN; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input) {
          input.value = abilities[index] || '';
          index++;
        }
      }
    }
    
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
          <td><input type="text" id="${rank}-${i}-name" class="spell-name" placeholder=""></td>
          <td><input type="text" id="${rank}-${i}-cost" class="spell-cost" placeholder=""></td>
        `;
        tbody.appendChild(tr);
        
        tr.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', () => this.scheduleAutoSave());
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
    
    // Attributes
    for (const attr of ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA']) {
      const input = document.getElementById(`${attr.toLowerCase()}-value`);
      if (input && this.character.attributes[attr] !== undefined) {
        input.value = this.character.attributes[attr];
      }
    }
    
    // Derived stats (current values)
    const derivedMapping = {
      'movement-base': 'movementBase',
      'action-points-current': 'actionPointsCurrent',
      'damage-mod-current': 'damageModCurrent',
      'exp-mod-current': 'expModCurrent',
      'healing-rate-current': 'healingRateCurrent',
      'initiative-current': 'initiativeCurrent',
      'luck-current': 'luckCurrent',
      'magic-points-current': 'magicPointsCurrent',
      'tenacity-current': 'tenacityCurrent'
    };
    
    for (const [fieldId, key] of Object.entries(derivedMapping)) {
      const field = document.getElementById(fieldId);
      if (field && this.character.derived[key] !== undefined) {
        field.value = this.character.derived[key];
      }
    }
    
    // Restore locked original values if locked
    if (this.character.derivedLocked) {
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
      const btn = document.getElementById('edit-derived-btn');
      if (btn) {
        btn.textContent = 'Edit Original Values';
      }
    }
    
    // Standard skills
    for (const skillKey of Object.keys(SKILL_DEFINITIONS.standard)) {
      const input = document.getElementById(`${this.kebabCase(skillKey)}-current`);
      if (input && this.character.standardSkills[skillKey] !== undefined) {
        input.value = this.character.standardSkills[skillKey];
      }
    }
    
    // Notes
    const combatNotes = document.getElementById('combat-notes');
    if (combatNotes) combatNotes.value = this.character.combat.notes || '';
    
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
    
    // Backpack
    if (this.character.backpack) {
      this.character.backpack.forEach((item, i) => {
        const nameInput = document.getElementById(`backpack-${i}-name`);
        const encInput = document.getElementById(`backpack-${i}-enc`);
        if (nameInput && item.name) nameInput.value = item.name;
        if (encInput && item.enc) encInput.value = item.enc;
      });
    }
    
    // Professional Skills
    if (this.character.professionalSkills) {
      this.character.professionalSkills.forEach((skill, i) => {
        const nameInput = document.getElementById(`prof-skill-${i}-name`);
        const baseInput = document.getElementById(`prof-skill-${i}-base`);
        const currentInput = document.getElementById(`prof-skill-${i}-current`);
        if (nameInput && skill.name) nameInput.value = skill.name;
        if (baseInput && skill.base) baseInput.value = skill.base;
        if (currentInput && skill.current) currentInput.value = skill.current;
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
        });
      });
    }
    
    // Special Abilities
    if (this.character.combat && this.character.combat.specialAbilities) {
      this.character.combat.specialAbilities.forEach((ability, i) => {
        const col = Math.floor(i / ABILITY_SLOTS_PER_COLUMN) + 1;
        const row = i % ABILITY_SLOTS_PER_COLUMN;
        const input = document.getElementById(`ability-${col}-${row}`);
        if (input && ability) input.value = ability;
      });
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
              const nameInput = document.getElementById(`${rank}-spell-${i}-name`);
              const costInput = document.getElementById(`${rank}-spell-${i}-cost`);
              const memCheck = document.getElementById(`${rank}-spell-${i}-mem`);
              if (nameInput && spell.name) nameInput.value = spell.name;
              if (costInput && spell.cost) costInput.value = spell.cost;
              if (memCheck && spell.memorized) memCheck.checked = spell.memorized;
            });
          }
        }
      });
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
    
    // Backpack
    this.character.backpack = [];
    for (let i = 0; i < BACKPACK_SLOTS; i++) {
      const nameInput = document.getElementById(`backpack-${i}-name`);
      const encInput = document.getElementById(`backpack-${i}-enc`);
      if (nameInput && encInput) {
        this.character.backpack.push({
          name: nameInput.value,
          enc: encInput.value
        });
      }
    }
    
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
      });
      this.character.combat.rangedWeapons.push(weapon);
    }
    
    // Special Abilities
    this.character.combat.specialAbilities = [];
    for (let col = 1; col <= 3; col++) {
      for (let i = 0; i < ABILITY_SLOTS_PER_COLUMN; i++) {
        const input = document.getElementById(`ability-${col}-${i}`);
        if (input) {
          this.character.combat.specialAbilities.push(input.value);
        }
      }
    }
    
    // Combat Notes
    const combatNotes = document.getElementById('combat-notes');
    if (combatNotes) {
      this.character.combat.notes = combatNotes.value;
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
        const nameInput = document.getElementById(`${rank}-spell-${i}-name`);
        const costInput = document.getElementById(`${rank}-spell-${i}-cost`);
        const memCheck = document.getElementById(`${rank}-spell-${i}-mem`);
        if (nameInput) {
          this.character.magic.spells[rank].spells.push({
            name: nameInput?.value || '',
            cost: costInput?.value || '',
            memorized: memCheck?.checked || false
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
    if (!this.character.derivedLocked) {
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
   * Update movement display
   */
  updateMovementDisplay() {
    const baseMovement = parseInt(this.character.derived.movementBase) || 0;
    const speeds = Calculator.calculateMovement(baseMovement);
    
    document.getElementById('walk-speed').textContent = `${speeds.walk}'`;
    document.getElementById('run-speed').textContent = `${speeds.run}'`;
    document.getElementById('sprint-speed').textContent = `${speeds.sprint}'`;
    document.getElementById('swim-speed').textContent = `${speeds.swim}'`;
    document.getElementById('climb-speed').textContent = `${speeds.climb}'`;
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
    for (let i = 0; i < EQUIPMENT_SLOTS; i++) {
      const encInput = document.getElementById(`equip-${i}-enc`);
      if (encInput && encInput.value) {
        total += parseFloat(encInput.value) || 0;
      }
    }
    
    const totalDisplay = document.getElementById('total-enc');
    if (totalDisplay) {
      totalDisplay.textContent = total.toFixed(1);
    }
    
    const STR = parseInt(this.character.attributes.STR) || 0;
    const status = Calculator.getEncStatus(total, STR);
    
    const statusDisplay = document.getElementById('enc-status');
    if (statusDisplay) {
      statusDisplay.textContent = status;
    }
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
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
