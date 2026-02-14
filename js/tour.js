/* ============================================
   GUIDED TOUR ENGINE
   Step-by-step tooltip tour for first-time users
   ============================================ */

const GuidedTour = {
  TOUR_COMPLETE_KEY: 'cf_tour_completed',
  SAMPLE_CHAR_KEY: 'cf_sample_character',
  currentStep: 0,
  isRunning: false,
  elements: {},  // cached DOM refs

  // ─── Tour Step Definitions ─────────────────────────
  steps: [
    {
      // Step 1: Character Name
      target: '#character-name',
      title: 'Character Name',
      text: 'This is where your character\'s name goes. Meet <strong>Cassian Haldric</strong>, a Human Paladin we\'ve loaded as a sample character for you to explore.',
      position: 'bottom',
      page: 'main'
    },
    {
      // Step 2: Species & Culture
      target: '#species',
      title: 'Species & Culture',
      text: 'Choose your character\'s species (Human, Dwarf, Elf, etc.) and cultural background. Species determines special abilities and stat bonuses.',
      position: 'bottom',
      page: 'main'
    },
    {
      // Step 3: Class & Rank
      target: '#class-primary',
      title: 'Class & Rank',
      text: 'Pick up to three classes. Your <strong>primary class</strong> determines your rank title, combat style, and available abilities. You can multiclass into a 2nd or 3rd class later.',
      position: 'bottom',
      page: 'main'
    },
    {
      // Step 4: Characteristics
      target: '.attributes-grid',
      title: 'Characteristics',
      text: 'Your seven core stats: <strong>STR, CON, SIZ, DEX, INT, POW, CHA</strong>. These drive everything — skills, hit points, damage, initiative, and more. All derived values update automatically when you change these.',
      position: 'bottom',
      page: 'main'
    },
    {
      // Step 5: Derived Attributes
      target: '.derived-stats',
      title: 'Derived Attributes',
      text: 'Action Points, Damage Modifier, Initiative, Magic Points, and more — all <strong>auto-calculated</strong> from your characteristics. The gray fields are locked; editable fields let you track temporary changes.',
      position: 'bottom',
      page: 'main'
    },
    {
      // Step 6: Standard Skills + Roll Demo
      target: '.standard-skills',
      title: 'Standard Skills',
      text: 'Every character has these skills. See the <strong>d10 dice icons</strong>? Click one to roll a d100 skill check! Try clicking the die next to <strong>Willpower</strong> after the tour.',
      position: 'bottom',
      page: 'main',
      scrollTo: true
    },
    {
      // Step 7: Professional Skills
      target: '.professional-skills-section',
      title: 'Professional Skills',
      text: 'Specialized skills from your class and culture. Cassian has skills like <strong>Channel</strong>, <strong>Piety</strong>, and <strong>Courtesy</strong>. You can add more rows as needed.',
      position: 'top',
      page: 'main',
      scrollTo: true
    },
    {
      // Step 8: Combat Page - Weapons
      target: '.melee-weapons-table',
      title: 'Weapons & Combat',
      text: 'Your melee and ranged weapons with damage, size, and special effects. Click the <strong>🎲 button</strong> next to any damage field to roll weapon damage.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true
    },
    {
      // Step 9: Hit Locations
      target: '.hit-locations-table',
      title: 'Hit Locations',
      text: 'Track armor and hit points for each body location. When you equip armor from the Equipment page, it auto-fills here. Current HP can be adjusted during combat.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true
    },
    {
      // Step 10: Special Abilities
      target: '.special-abilities-title',
      title: 'Special Abilities',
      text: 'Your class and species abilities are listed here. Abilities with <strong>interactive buttons</strong> (like Lay on Hands or Holy Strike) can be activated during play. Look for the ℹ️ icons for detailed descriptions.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true
    },
    {
      // Step 11: Magic Page
      target: '.magic-header',
      title: 'Magic & Spells',
      text: 'Your spellcasting hub! Cassian worships <strong>Nimue, the Lady of the Lake</strong>. His Channel and Piety skills determine casting success. Memorized spells are marked with a ✓ checkbox.',
      position: 'bottom',
      page: 'magic1'
    },
    {
      // Step 12: Casting a Spell
      target: function() {
        // Find first cast button with a spell
        return document.querySelector('.btn-cast-spell');
      },
      title: 'Casting Spells',
      text: 'Click the <strong>✦ button</strong> next to any spell to open the casting modal. It shows the spell details, MP cost, and lets you roll your casting skill. Try casting <strong>Calm</strong> after the tour!',
      position: 'bottom',
      page: 'magic1',
      scrollTo: true
    },
    {
      // Step 13: Summary Page
      target: '.summary-canvas',
      title: 'Character Summary',
      text: 'A quick-reference dashboard with draggable widgets. Customize it by dragging widgets from the palette on the left. Your layout saves automatically.',
      position: 'bottom',
      page: 'summary'
    },
    {
      // Step 14: Notes Page
      target: function() {
        return document.querySelector('.tab-btn[data-page="notes"]');
      },
      title: 'Notes & Journal',
      text: 'The <strong>Notes</strong> tab holds your backstory, appearance, personality, connections, quest log, and custom sections. Cassian has a rich backstory already filled in for you to explore.',
      position: 'bottom',
      page: null  // don't navigate, just highlight the tab
    },
    {
      // Step 15: Theme & Controls
      target: '.sheet-controls',
      title: 'Theme & Controls',
      text: '<strong>🌙 Dark Mode</strong> toggles the theme. <strong>🎭 Class Theme</strong> applies your class colors. Use <strong>Save</strong>, <strong>Export JSON</strong>, and <strong>Print</strong> to manage your sheet.',
      position: 'bottom',
      page: null
    }
  ],

  // ─── Initialization ─────────────────────────
  /**
   * Check if tour should run, and show welcome modal if needed
   */
  checkAndStart() {
    // If tour already completed and no sample character, do nothing
    if (localStorage.getItem(this.TOUR_COMPLETE_KEY)) {
      // But still check if sample banner should show
      if (localStorage.getItem(this.SAMPLE_CHAR_KEY)) {
        this.showSampleBanner();
      }
      return;
    }

    // Check if there's any existing character data
    const existingData = localStorage.getItem('mythras_character_sheet');
    if (existingData) {
      try {
        const parsed = JSON.parse(existingData);
        // If there's a character name, they already have data - don't tour
        if (parsed.info && parsed.info.characterName) {
          localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
          return;
        }
      } catch (e) {}
    }

    // Show welcome modal
    this.showWelcome();
  },

  // ─── Welcome Modal ─────────────────────────
  showWelcome() {
    const overlay = document.createElement('div');
    overlay.className = 'tour-welcome-overlay';
    overlay.id = 'tour-welcome';
    overlay.innerHTML = `
      <div class="tour-welcome-box">
        <div class="tour-welcome-icon">⚔️</div>
        <h2 class="tour-welcome-title">Welcome to the Classic Fantasy 2.0 Character Sheet!</h2>
        <p class="tour-welcome-subtitle">Would you like a guided tour? We'll load a sample character so you can see everything in action.</p>
        <div class="tour-welcome-buttons">
          <button class="tour-btn-start" id="tour-start-btn">Start Tour</button>
          <button class="tour-btn-skip" id="tour-skip-btn">Skip Tour</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('tour-start-btn').addEventListener('click', () => {
      overlay.remove();
      this.injectSampleCharacter();
    });

    document.getElementById('tour-skip-btn').addEventListener('click', () => {
      overlay.remove();
      // Still inject sample character so they have something to explore
      this.injectSampleAndReload(false);
    });
  },

  // ─── Sample Character Injection ─────────────────────────
  /**
   * Inject sample character data and reload the page to start tour
   */
  injectSampleAndReload(startTour) {
    // Preserve auth
    const auth = localStorage.getItem('mythras_auth');
    
    // Inject all sample data keys
    for (const [key, value] of Object.entries(SAMPLE_CHARACTER_DATA)) {
      localStorage.setItem(key, value);
    }
    
    // Restore auth
    if (auth) localStorage.setItem('mythras_auth', auth);
    
    // Mark that sample character is loaded
    localStorage.setItem(this.SAMPLE_CHAR_KEY, 'true');
    
    // Mark tour as pending or complete
    if (startTour) {
      localStorage.setItem('cf_tour_pending', 'true');
    } else {
      localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
    }
    
    // Force page to main tab
    localStorage.setItem('mythras-current-page', 'main');
    
    // Reload to pick up the new data
    location.reload();
  },

  injectSampleCharacter() {
    this.injectSampleAndReload(true);
  },

  /**
   * Called on page load to check if tour should resume
   */
  checkPendingTour() {
    if (localStorage.getItem('cf_tour_pending')) {
      localStorage.removeItem('cf_tour_pending');
      // Small delay to let the app fully initialize
      setTimeout(() => this.startTour(), 600);
    }
  },

  // ─── Tour Engine ─────────────────────────
  startTour() {
    this.currentStep = 0;
    this.isRunning = true;
    this.showStep(0);
  },

  showStep(index) {
    if (index < 0 || index >= this.steps.length) {
      this.endTour();
      return;
    }

    this.currentStep = index;
    const step = this.steps[index];

    // Clean up previous step
    this.cleanup();

    // Navigate to correct page if needed
    if (step.page) {
      const currentTab = document.querySelector('.tab-btn.active');
      const currentPage = currentTab ? currentTab.dataset.page : 'main';
      if (currentPage !== step.page) {
        const targetTab = document.querySelector(`.tab-btn[data-page="${step.page}"]`);
        if (targetTab) {
          targetTab.click();
        }
      }
    }

    // Small delay to let page switch settle
    setTimeout(() => {
      const target = typeof step.target === 'function' ? step.target() : document.querySelector(step.target);
      
      if (!target) {
        // Target not found, skip to next
        console.warn(`Tour step ${index}: target not found`, step.target);
        this.showStep(index + 1);
        return;
      }

      // Scroll target into view if needed
      if (step.scrollTo) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Wait for scroll to complete
      setTimeout(() => {
        this.showOverlay();
        this.showSpotlight(target);
        this.showTooltip(target, step, index);
      }, step.scrollTo ? 400 : 50);
    }, 150);
  },

  showOverlay() {
    let overlay = document.getElementById('tour-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tour-overlay';
      overlay.className = 'tour-overlay';
      document.body.appendChild(overlay);
    }
  },

  showSpotlight(target) {
    const rect = target.getBoundingClientRect();
    const padding = 8;

    let spotlight = document.getElementById('tour-spotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'tour-spotlight';
      spotlight.className = 'tour-spotlight pulse';
      document.body.appendChild(spotlight);
    }

    spotlight.style.top = (rect.top - padding) + 'px';
    spotlight.style.left = (rect.left - padding) + 'px';
    spotlight.style.width = (rect.width + padding * 2) + 'px';
    spotlight.style.height = (rect.height + padding * 2) + 'px';
  },

  showTooltip(target, step, index) {
    // Remove existing tooltip
    const existing = document.getElementById('tour-tooltip');
    if (existing) existing.remove();

    const rect = target.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.className = 'tour-tooltip';
    tooltip.setAttribute('data-position', step.position || 'bottom');

    const isFirst = index === 0;
    const isLast = index === this.steps.length - 1;

    tooltip.innerHTML = `
      <div class="tour-tooltip-arrow"></div>
      <div class="tour-tooltip-progress">Step ${index + 1} of ${this.steps.length}</div>
      <div class="tour-tooltip-title">${step.title}</div>
      <div class="tour-tooltip-text">${step.text}</div>
      <div class="tour-tooltip-buttons">
        <button class="tour-btn-end" id="tour-end-btn">Skip Tour</button>
        <div class="tour-tooltip-nav">
          ${!isFirst ? '<button class="tour-btn-back" id="tour-back-btn">Back</button>' : ''}
          <button class="tour-btn-next" id="tour-next-btn">${isLast ? 'Finish' : 'Next'}</button>
        </div>
      </div>
    `;

    document.body.appendChild(tooltip);

    // Position the tooltip
    this.positionTooltip(tooltip, rect, step.position || 'bottom');

    // Attach event listeners
    document.getElementById('tour-next-btn').addEventListener('click', () => {
      if (isLast) {
        this.endTour();
      } else {
        this.showStep(index + 1);
      }
    });

    const backBtn = document.getElementById('tour-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.showStep(index - 1));
    }

    document.getElementById('tour-end-btn').addEventListener('click', () => this.endTour());

    // Keyboard navigation
    this._keyHandler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLast) this.endTour();
        else this.showStep(index + 1);
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        this.showStep(index - 1);
      } else if (e.key === 'Escape') {
        this.endTour();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  positionTooltip(tooltip, targetRect, position) {
    const gap = 16;
    const tooltipRect = tooltip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let top, left;

    switch (position) {
      case 'bottom':
        top = targetRect.bottom + gap;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        // If tooltip would go below viewport, flip to top
        if (top + tooltipRect.height > vh - 20) {
          top = targetRect.top - tooltipRect.height - gap;
          tooltip.setAttribute('data-position', 'top');
        }
        break;
      case 'top':
        top = targetRect.top - tooltipRect.height - gap;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        if (top < 20) {
          top = targetRect.bottom + gap;
          tooltip.setAttribute('data-position', 'bottom');
        }
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + gap;
        break;
    }

    // Clamp to viewport
    left = Math.max(12, Math.min(left, vw - tooltipRect.width - 12));
    top = Math.max(12, Math.min(top, vh - tooltipRect.height - 12));

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  },

  // ─── Cleanup & End ─────────────────────────
  cleanup() {
    const tooltip = document.getElementById('tour-tooltip');
    if (tooltip) tooltip.remove();
    
    // Remove key handler
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  endTour() {
    this.cleanup();
    
    const overlay = document.getElementById('tour-overlay');
    if (overlay) overlay.remove();
    
    const spotlight = document.getElementById('tour-spotlight');
    if (spotlight) spotlight.remove();
    
    this.isRunning = false;
    localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');

    // Navigate back to main page
    const mainTab = document.querySelector('.tab-btn[data-page="main"]');
    if (mainTab) mainTab.click();

    // Show the sample banner
    if (localStorage.getItem(this.SAMPLE_CHAR_KEY)) {
      this.showSampleBanner();
    }

    // Show completion message
    this.showCompletionModal();
  },

  showCompletionModal() {
    const overlay = document.createElement('div');
    overlay.className = 'tour-welcome-overlay';
    overlay.innerHTML = `
      <div class="tour-welcome-box">
        <div class="tour-welcome-icon">🎉</div>
        <h2 class="tour-welcome-title">You're All Set!</h2>
        <p class="tour-welcome-subtitle">
          Explore Cassian's character sheet freely — roll skills, cast spells, check abilities.
          When you're ready to create your own character, use the red banner at the top to clear the sample data.
        </p>
        <div class="tour-welcome-buttons">
          <button class="tour-btn-start" id="tour-done-btn">Let's Go!</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('tour-done-btn').addEventListener('click', () => {
      overlay.remove();
    });
  },

  // ─── Sample Character Banner ─────────────────────────
  showSampleBanner() {
    // Don't add if already present
    if (document.getElementById('sample-char-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'sample-char-banner';
    banner.className = 'sample-char-banner';
    banner.innerHTML = `
      <span class="sample-char-banner-icon">⚠️</span>
      <span class="sample-char-banner-text">Sample character loaded — Cassian Haldric, Human Paladin</span>
      <button class="btn-delete-sample" id="btn-delete-sample">Delete the Sample Character and Start Over</button>
    `;

    // Insert at the very top of the app
    const app = document.getElementById('app');
    if (app) {
      app.parentNode.insertBefore(banner, app);
    } else {
      document.body.prepend(banner);
    }

    document.getElementById('btn-delete-sample').addEventListener('click', () => {
      this.confirmDeleteSample();
    });
  },

  confirmDeleteSample() {
    const overlay = document.createElement('div');
    overlay.className = 'tour-confirm-overlay';
    overlay.id = 'tour-confirm-overlay';
    overlay.innerHTML = `
      <div class="tour-confirm-box">
        <div class="tour-confirm-title">Delete Sample Character?</div>
        <div class="tour-confirm-text">
          This will erase all of Cassian Haldric's data and give you a blank character sheet to build your own.
          This cannot be undone.
        </div>
        <div class="tour-confirm-buttons">
          <button class="tour-confirm-yes" id="confirm-delete-yes">Yes, Start Fresh</button>
          <button class="tour-confirm-no" id="confirm-delete-no">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('confirm-delete-yes').addEventListener('click', () => {
      this.deleteSampleAndReload();
    });

    document.getElementById('confirm-delete-no').addEventListener('click', () => {
      overlay.remove();
    });
  },

  deleteSampleAndReload() {
    // Preserve auth
    const auth = localStorage.getItem('mythras_auth');
    
    // Clear everything
    localStorage.clear();
    
    // Restore auth so they don't get logged out
    if (auth) localStorage.setItem('mythras_auth', auth);
    
    // Mark tour as completed so it doesn't trigger again
    localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
    
    // Reload
    location.reload();
  }
};

// ─── Auto-start on page load ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Check if a tour is pending (we just injected data and reloaded)
  if (localStorage.getItem('cf_tour_pending')) {
    // The pending tour will be picked up after App.init() completes
    // We use a MutationObserver or setTimeout approach
    const origInit = App.init.bind(App);
    const origBound = App.init;
    
    // We'll just use the pending check after a delay
    // (App.init is called from DOMContentLoaded in app.js, which runs before this)
  }
});

// This runs after App.init() due to script load order
window.addEventListener('load', () => {
  // Small extra delay to ensure everything is settled
  setTimeout(() => {
    if (localStorage.getItem('cf_tour_pending')) {
      GuidedTour.checkPendingTour();
    } else {
      GuidedTour.checkAndStart();
    }
    
    // Always check if sample banner should show
    if (localStorage.getItem(GuidedTour.SAMPLE_CHAR_KEY) && 
        localStorage.getItem(GuidedTour.TOUR_COMPLETE_KEY)) {
      GuidedTour.showSampleBanner();
    }
  }, 300);
});
