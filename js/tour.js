/* ============================================
   GUIDED TOUR ENGINE
   Step-by-step tooltip tour for first-time users
   ============================================ */

const GuidedTour = {
  TOUR_COMPLETE_KEY: 'cf_tour_completed',
  SAMPLE_CHAR_KEY: 'cf_sample_character',
  currentStep: 0,
  isRunning: false,

  // Tour Step Definitions
  steps: [
    // Character Page Overview
    {
      target: '.sheet-header',
      title: 'Character Information',
      text: 'This is where the general information on your character lies \u2014 name, species, culture, class, rank, physical traits, and deity. Meet <strong>Cassian Haldric</strong>, a Human Paladin we\'ve loaded as a sample character.',
      position: 'bottom',
      page: 'main'
    },
    // Rest Buttons
    {
      target: '.rest-buttons',
      title: 'Short Rest & Long Rest',
      text: '<strong>\u2600 Short Rest</strong> lets you choose a 15-minute rest action \u2014 recover fatigue, tend wounds, or prepare a spell. <strong>\u26fa Long Rest</strong> fully recovers you to Fresh after 8 hours of sleep.',
      position: 'bottom',
      page: 'main'
    },
    // New Game / Finish Game
    {
      target: '.game-buttons-vertical',
      title: 'New Game & Finish Game',
      text: '<strong>\ud83c\udfb2 New Game</strong> starts a fresh session \u2014 restoring Luck Points and resetting daily abilities. <strong>\ud83c\udfc6 Finish Game</strong> ends the session and awards EXP Rolls for character advancement.',
      position: 'bottom',
      page: 'main'
    },
    // DEMO: Class Prereq Skills
    {
      target: function() {
        return document.getElementById('prereq-label-primary');
      },
      title: 'Class Prerequisite Skills',
      text: 'Click the <strong>Class Prereq. Skill</strong> label to see your progress toward the next rank. It shows which skills meet the threshold and how much each remaining skill needs to improve.',
      position: 'bottom',
      page: 'main',
      demo: true,
      action: function() {
        setTimeout(function() {
          App.showPrereqStatus('primary');
          setTimeout(function() {
            var modal = document.getElementById('prereq-modal');
            if (modal) modal.style.zIndex = '100002';
          }, 100);
        }, 400);
      },
      cleanupAction: function() {
        var modal = document.getElementById('prereq-modal');
        if (modal) { modal.style.zIndex = ''; modal.remove(); }
      }
    },
    // DEMO: Spend EXP Rolls
    {
      target: function() {
        return document.getElementById('btn-spend-exp');
      },
      title: 'Spend EXP Rolls',
      text: 'After a session, spend your <strong>EXP Rolls</strong> to grow your character. You can improve existing skills, unlock new class abilities, learn new skills or spells, strengthen passions, or even add a sub-class!',
      position: 'bottom',
      page: 'main',
      demo: true,
      action: function() {
        setTimeout(function() {
          App.openExpModal();
          setTimeout(function() {
            var modal = document.getElementById('exp-modal');
            if (modal) modal.style.zIndex = '100002';
          }, 100);
        }, 400);
      },
      cleanupAction: function() {
        var modal = document.getElementById('exp-modal');
        if (modal) { modal.style.zIndex = ''; modal.classList.add('hidden'); }
      }
    },
    // Characteristics
    {
      target: '.attributes-grid',
      title: 'Characteristics',
      text: 'Your seven core stats: <strong>STR, CON, SIZ, DEX, INT, POW, CHA</strong>. These drive everything \u2014 skills, hit points, damage, initiative, and more. All derived values update automatically.',
      position: 'bottom',
      page: 'main'
    },
    // Derived Attributes
    {
      target: '.derived-stats',
      title: 'Derived Attributes',
      text: 'Action Points, Damage Modifier, Initiative, Magic Points, and more \u2014 all <strong>auto-calculated</strong> from your characteristics. Gray fields are locked; editable fields track temporary changes.',
      position: 'bottom',
      page: 'main'
    },
    // Standard Skills
    {
      target: '.standard-skills',
      title: 'Standard Skills',
      text: 'Every character has these skills. See the <strong>d10 dice icons</strong>? Click one to roll a d100 skill check! Let\'s try one now...',
      position: 'bottom',
      page: 'main',
      scrollTo: true
    },
    // DEMO: Skill Roll
    {
      target: function() {
        var rows = document.querySelectorAll('.standard-skills .skill-row');
        for (var i = 0; i < rows.length; i++) {
          var label = rows[i].querySelector('.skill-label');
          if (label && label.textContent.trim().toLowerCase().indexOf('willpower') !== -1) {
            return rows[i].querySelector('.d100-btn') || rows[i];
          }
        }
        return document.querySelector('.standard-skills .d100-btn');
      },
      title: 'Skill Roll Demo',
      text: 'Watch this! We\'re rolling Cassian\'s <strong>Willpower (77%)</strong>. A d100 result \u2264 your skill means success. Critical successes and fumbles add extra drama!',
      position: 'bottom',
      page: 'main',
      scrollTo: true,
      demo: true,
      action: function() {
        setTimeout(function() {
          App.rollD100('Willpower', 77);
          setTimeout(function() {
            var overlay = document.getElementById('d100-result-overlay');
            if (overlay) overlay.style.zIndex = '100002';
          }, 50);
        }, 400);
      },
      cleanupAction: function() {
        var overlay = document.getElementById('d100-result-overlay');
        if (overlay) { overlay.style.zIndex = ''; overlay.remove(); }
      }
    },
    // Professional Skills
    {
      target: '.professional-skills-section',
      title: 'Professional Skills',
      text: 'Specialized skills from your class and culture. Cassian has <strong>Channel</strong>, <strong>Piety</strong>, <strong>Courtesy</strong>, and more. You can add, remove, and alphabetize rows.',
      position: 'top',
      page: 'main',
      scrollTo: true
    },
    // Equipment
    {
      target: '.equipment-section',
      title: 'Equipment & Encumbrance',
      text: 'Track your gear here. Every item has an <strong>ENC</strong> (encumbrance) value. When you add a container like a Backpack, a button appears to manage its contents separately.',
      position: 'top',
      page: 'main',
      scrollTo: true
    },
    // DEMO: Backpack Modal
    {
      target: function() {
        return document.getElementById('btn-open-backpack');
      },
      title: 'Backpack Contents',
      text: 'Cassian has a <strong>Backpack</strong> with trail rations, a bedroll, torches, and a keepsake from the Lady Entissa. Containers keep your gear organized and track capacity.',
      position: 'top',
      page: 'main',
      scrollTo: true,
      demo: true,
      action: function() {
        setTimeout(function() {
          var btn = document.getElementById('btn-open-backpack');
          if (btn && !btn.classList.contains('hidden')) {
            btn.click();
            setTimeout(function() {
              var modal = document.getElementById('container-modal');
              if (modal) modal.style.zIndex = '100002';
            }, 100);
          }
        }, 400);
      },
      cleanupAction: function() {
        var modal = document.getElementById('container-modal');
        if (modal) { modal.style.zIndex = ''; modal.classList.add('hidden'); }
      }
    },
    // Combat Quick Ref
    {
      target: '.quick-reference',
      title: 'Combat Quick Reference',
      text: 'The top of the Combat page shows your key combat stats at a glance \u2014 Initiative, Luck Points, Action Points, Damage Modifier, and commonly-used skills.',
      position: 'bottom',
      page: 'combat'
    },
    // Hit Locations
    {
      target: '.hit-locations',
      title: 'Hit Locations',
      text: 'Track armor and hit points for each body location. Armor <strong>auto-fills</strong> when you equip it from Equipment. Current HP can be adjusted during combat.',
      position: 'bottom',
      page: 'combat'
    },
    // DEMO: Serious Wound Modal
    {
      target: function() {
        return document.getElementById('wound-info-modal');
      },
      title: 'Serious Wound Example',
      text: 'When a hit location drops to <strong>0 HP or below</strong>, a Serious Wound occurs! This modal explains the effects \u2014 your character is <strong>stunned for 1d3 Turns</strong> and must pass an <strong>Endurance roll</strong> or suffer further penalties.',
      position: 'bottom',
      page: 'combat',
      demo: true,
      action: function() {
        setTimeout(function() {
          App.showWoundInfoModal('wound-serious', 'Right Arm');
          setTimeout(function() {
            var modal = document.getElementById('wound-info-modal');
            if (modal) modal.style.zIndex = '100002';
          }, 100);
        }, 400);
      },
      cleanupAction: function() {
        var modal = document.getElementById('wound-info-modal');
        if (modal) { modal.style.zIndex = ''; modal.classList.add('hidden'); }
      }
    },
    // Weapons
    {
      target: '.melee-weapons',
      title: 'Weapons',
      text: 'Your melee and ranged weapons with damage, size, and special effects. Click the <strong>\ud83c\udfb2 button</strong> next to any damage field to roll weapon damage.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true
    },
    // Special Abilities
    {
      target: '.special-abilities-title',
      title: 'Special Abilities',
      text: 'Class and species abilities live here. Abilities with <strong>interactive buttons</strong> can be activated during play. Click the ability name to get more detailed descriptions.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true
    },
    // DEMO: Holy Strike Ability
    {
      target: function() {
        var section = document.getElementById('holy-strike-section');
        if (section && section.style.display !== 'none') {
          return document.getElementById('btn-holy-strike-use') || section;
        }
        return section;
      },
      title: 'Holy Strike Demo',
      text: 'Cassian activates <strong>Holy Strike</strong>, adding <strong>+1d6 holy damage</strong> to his next melee attack against an evil creature. Abilities like this have daily uses that reset with a New Game session.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true,
      demo: true,
      action: function() {
        setTimeout(function() {
          // Create a persistent version of the animation overlay (the real one auto-dismisses in 1.5s)
          var overlay = document.getElementById('tour-holy-strike-demo');
          if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'tour-holy-strike-demo';
            overlay.className = 'ability-anim-overlay';
            overlay.style.zIndex = '100002';
            overlay.innerHTML =
              '<div class="ability-anim-content holy-strike-anim">' +
              '<div class="holy-strike-icon">\u2694\ufe0f</div>' +
              '<div class="holy-strike-title">Holy Strike</div>' +
              '<div class="holy-strike-subtitle">+1d6 Holy Damage to next melee attack!</div>' +
              '</div>';
            document.body.appendChild(overlay);
          }
          overlay.style.display = 'flex';
          overlay.offsetHeight;
          overlay.classList.add('active');
        }, 400);
      },
      cleanupAction: function() {
        var overlay = document.getElementById('tour-holy-strike-demo');
        if (overlay) {
          overlay.classList.remove('active');
          overlay.style.display = 'none';
          overlay.remove();
        }
      }
    },
    // Holy Strike Effect on Weapons
    {
      target: function() {
        // Activate Holy Strike visuals so +1d6 badges appear on melee weapons
        if (App.character && !App.character.holyStrikeActive) {
          var btn = document.getElementById('btn-holy-strike-use');
          if (btn && !btn.disabled) {
            App.character.holyStrikeUsesRemaining--;
            App.character.holyStrikeActive = true;
            App._applyHolyStrikeVisuals();
            App.updateHolyStrikeDisplay();
          }
        }
        return document.querySelector('.melee-weapons');
      },
      title: 'Holy Strike \u2014 Weapon Damage',
      text: 'See the <strong>+1d6 badges</strong> on each melee weapon? That\u2019s Holy Strike in action! The bonus holy damage is added to your next attack roll against an evil creature, then the effect ends.',
      position: 'bottom',
      page: 'combat',
      scrollTo: true,
      cleanupAction: function() {
        // Deactivate Holy Strike and restore the used charge
        if (App.character && App.character.holyStrikeActive) {
          App.deactivateHolyStrike();
          App.character.holyStrikeUsesRemaining = (App.character.holyStrikeUsesRemaining || 0) + 1;
          App.updateHolyStrikeDisplay();
          App.scheduleAutoSave();
        }
      }
    },
    // Magic Page
    {
      target: '.magic-skills-section',
      title: 'Magic & Spells',
      text: 'Your spellcasting hub! Cassian worships <strong>Nimue, the Lady of the Lake</strong>. His <strong>Channel</strong> and <strong>Piety</strong> skills determine casting success. Each class type has its own casting and knowledge skills.',
      position: 'bottom',
      page: 'magic1'
    },
    // Spell List
    {
      target: function() {
        return document.querySelector('#page-magic1 .spell-section');
      },
      title: 'Spells & Memorization',
      text: 'Spells are organized by rank. The <strong>\u2713 checkbox</strong> marks memorized spells \u2014 casting non-memorized spells is harder. The <strong>\u2726 button</strong> opens the casting modal. Let\'s try it...',
      position: 'bottom',
      page: 'magic1',
      scrollTo: true
    },
    // DEMO: Spell Cast
    {
      target: function() {
        var castBtns = document.querySelectorAll('#page-magic1 .btn-cast-spell');
        for (var i = 0; i < castBtns.length; i++) {
          var row = castBtns[i].closest('tr');
          if (row) {
            var cb = row.querySelector('input[type="checkbox"]');
            if (cb && cb.checked) return castBtns[i];
          }
        }
        return castBtns[1] || castBtns[0];
      },
      title: 'Casting a Spell',
      text: 'Here\'s the <strong>casting modal</strong>! It shows the spell description, MP cost, intensity, and your casting skill. You can roll your skill check right from here. Try casting spells yourself after the tour!',
      position: 'bottom',
      page: 'magic1',
      scrollTo: true,
      demo: true,
      action: function() {
        setTimeout(function() {
          var castBtns = document.querySelectorAll('#page-magic1 .btn-cast-spell');
          var targetBtn = null;
          for (var i = 0; i < castBtns.length; i++) {
            var row = castBtns[i].closest('tr');
            if (row) {
              var cb = row.querySelector('input[type="checkbox"]');
              if (cb && cb.checked) { targetBtn = castBtns[i]; break; }
            }
          }
          if (!targetBtn && castBtns.length > 1) targetBtn = castBtns[1];
          if (!targetBtn && castBtns.length > 0) targetBtn = castBtns[0];
          if (targetBtn) {
            targetBtn.click();
            setTimeout(function() {
              var modal = document.getElementById('cast-modal');
              if (modal) modal.style.zIndex = '100002';
            }, 150);
          }
        }, 400);
      },
      cleanupAction: function() {
        var modal = document.getElementById('cast-modal');
        if (modal) { modal.style.zIndex = ''; modal.classList.add('hidden'); }
      }
    },
    // Summary Page
    {
      target: '#summary-canvas',
      title: 'Character Summary',
      text: 'A quick-reference dashboard with <strong>draggable widgets</strong>. Customize your layout by dragging widgets from the palette on the left. Your arrangement saves automatically.',
      position: 'bottom',
      page: 'summary'
    },
    // Notes Page
    {
      target: '.notes-page-content',
      title: 'Notes & Journal',
      text: 'The <strong>Notes</strong> page holds your backstory, appearance, personality, connections, quest log, and custom sections. You can reorder sections, add your own, and use the rich text toolbar to format entries. Cassian\'s backstory is already filled in \u2014 explore it!',
      position: 'bottom',
      page: 'notes'
    },
    // Theme & Controls
    {
      target: '.sheet-controls',
      title: 'Theme & Controls',
      text: '<strong>\ud83c\udf19 Dark Mode</strong> toggles the theme. <strong>\ud83c\udfad Class Theme</strong> applies your class\u2019s colors. Use <strong>Save</strong>, <strong>Export JSON</strong>, and <strong>Print</strong> to manage your character sheet.',
      position: 'bottom',
      page: null
    }
  ],

  // Initialization
  checkAndStart: function() {
    if (localStorage.getItem(this.TOUR_COMPLETE_KEY)) {
      if (localStorage.getItem(this.SAMPLE_CHAR_KEY)) {
        this.showSampleBanner();
      }
      return;
    }
    var existingData = localStorage.getItem('mythras_character_sheet');
    if (existingData) {
      try {
        var parsed = JSON.parse(existingData);
        if (parsed.info && parsed.info.characterName) {
          localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
          return;
        }
      } catch (e) {}
    }
    this.showWelcome();
  },

  // Welcome Modal
  showWelcome: function() {
    var self = this;
    var overlay = document.createElement('div');
    overlay.className = 'tour-welcome-overlay';
    overlay.id = 'tour-welcome';
    overlay.innerHTML = '<div class="tour-welcome-box">' +
      '<div class="tour-welcome-icon">\u2694\ufe0f</div>' +
      '<h2 class="tour-welcome-title">Welcome to the Classic Fantasy 2.0 Character Sheet!</h2>' +
      '<p class="tour-welcome-subtitle">Would you like a guided tour? We\u2019ll load a sample character so you can see everything in action.</p>' +
      '<div class="tour-welcome-buttons">' +
      '<button class="tour-btn-start" id="tour-start-btn">Start Tour</button>' +
      '<button class="tour-btn-skip" id="tour-skip-btn">Skip Tour</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    document.getElementById('tour-start-btn').addEventListener('click', function() {
      overlay.remove();
      self.injectSampleCharacter();
    });
    document.getElementById('tour-skip-btn').addEventListener('click', function() {
      overlay.remove();
      self.injectSampleAndReload(false);
    });
  },

  // Sample Character Injection
  injectSampleAndReload: function(startTour) {
    var auth = localStorage.getItem('mythras_auth');
    for (var key in SAMPLE_CHARACTER_DATA) {
      if (SAMPLE_CHARACTER_DATA.hasOwnProperty(key)) {
        localStorage.setItem(key, SAMPLE_CHARACTER_DATA[key]);
      }
    }
    if (auth) localStorage.setItem('mythras_auth', auth);
    localStorage.setItem(this.SAMPLE_CHAR_KEY, 'true');
    if (startTour) {
      localStorage.setItem('cf_tour_pending', 'true');
    } else {
      localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
    }
    localStorage.setItem('mythras-current-page', 'main');
    location.reload();
  },

  injectSampleCharacter: function() {
    this.injectSampleAndReload(true);
  },

  checkPendingTour: function() {
    if (localStorage.getItem('cf_tour_pending')) {
      localStorage.removeItem('cf_tour_pending');
      var self = this;
      setTimeout(function() { self.startTour(); }, 600);
    }
  },

  // Tour Engine
  startTour: function() {
    this.currentStep = 0;
    this.isRunning = true;
    this.showStep(0);
  },

  showStep: function(index) {
    if (index < 0 || index >= this.steps.length) {
      this.endTour();
      return;
    }
    this.currentStep = index;
    var step = this.steps[index];
    this.cleanup();

    if (step.page) {
      var currentTab = document.querySelector('.tab-btn.active');
      var currentPage = currentTab ? currentTab.dataset.page : 'main';
      if (currentPage !== step.page) {
        var targetTab = document.querySelector('.tab-btn[data-page="' + step.page + '"]');
        if (targetTab) targetTab.click();
      }
    }

    var self = this;
    setTimeout(function() {
      var target = typeof step.target === 'function' ? step.target() : document.querySelector(step.target);
      if (!target) {
        console.warn('Tour step ' + index + ': target not found', step.target);
        self.showStep(index + 1);
        return;
      }
      if (step.scrollTo) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(function() {
        self.showOverlay(step.demo);
        self.showSpotlight(target, step.demo);
        self.showTooltip(target, step, index);
        if (step.demo && step.action) {
          step.action();
        }
      }, step.scrollTo ? 400 : 50);
    }, 200);
  },

  showOverlay: function(isDemoStep) {
    var overlay = document.getElementById('tour-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tour-overlay';
      overlay.className = 'tour-overlay';
      document.body.appendChild(overlay);
    }
    if (isDemoStep) {
      overlay.classList.add('tour-overlay-demo');
    } else {
      overlay.classList.remove('tour-overlay-demo');
    }
  },

  showSpotlight: function(target, isDemoStep) {
    var rect = target.getBoundingClientRect();
    var padding = 8;
    var spotlight = document.getElementById('tour-spotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'tour-spotlight';
      spotlight.className = 'tour-spotlight pulse';
      document.body.appendChild(spotlight);
    }
    if (isDemoStep) {
      spotlight.style.display = 'none';
    } else {
      spotlight.style.display = '';
      spotlight.style.top = (rect.top - padding) + 'px';
      spotlight.style.left = (rect.left - padding) + 'px';
      spotlight.style.width = (rect.width + padding * 2) + 'px';
      spotlight.style.height = (rect.height + padding * 2) + 'px';
    }
  },

  showTooltip: function(target, step, index) {
    var existing = document.getElementById('tour-tooltip');
    if (existing) existing.remove();

    var rect = target.getBoundingClientRect();
    var tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.className = 'tour-tooltip';
    if (step.demo) tooltip.style.zIndex = '100005';
    tooltip.setAttribute('data-position', step.position || 'bottom');

    var isFirst = index === 0;
    var isLast = index === this.steps.length - 1;
    var self = this;

    tooltip.innerHTML =
      '<div class="tour-tooltip-arrow"></div>' +
      '<div class="tour-tooltip-progress">Step ' + (index + 1) + ' of ' + this.steps.length + '</div>' +
      '<div class="tour-tooltip-title">' + step.title + '</div>' +
      '<div class="tour-tooltip-text">' + step.text + '</div>' +
      '<div class="tour-tooltip-buttons">' +
      '<button class="tour-btn-end" id="tour-end-btn">Skip Tour</button>' +
      '<div class="tour-tooltip-nav">' +
      (!isFirst ? '<button class="tour-btn-back" id="tour-back-btn">Back</button>' : '') +
      '<button class="tour-btn-next" id="tour-next-btn">' + (isLast ? 'Finish' : 'Next') + '</button>' +
      '</div></div>';

    document.body.appendChild(tooltip);

    if (step.demo) {
      this.positionTooltipForDemo(tooltip);
    } else {
      this.positionTooltip(tooltip, rect, step.position || 'bottom');
    }

    document.getElementById('tour-next-btn').addEventListener('click', function() {
      if (step.cleanupAction) step.cleanupAction();
      if (isLast) self.endTour();
      else self.showStep(index + 1);
    });

    var backBtn = document.getElementById('tour-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        if (step.cleanupAction) step.cleanupAction();
        self.showStep(index - 1);
      });
    }

    document.getElementById('tour-end-btn').addEventListener('click', function() {
      if (step.cleanupAction) step.cleanupAction();
      self.endTour();
    });

    this._keyHandler = function(e) {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (step.cleanupAction) step.cleanupAction();
        if (isLast) self.endTour();
        else self.showStep(index + 1);
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        if (step.cleanupAction) step.cleanupAction();
        self.showStep(index - 1);
      } else if (e.key === 'Escape') {
        if (step.cleanupAction) step.cleanupAction();
        self.endTour();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  positionTooltip: function(tooltip, targetRect, position) {
    var gap = 16;
    var tooltipRect = tooltip.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var top, left;

    switch (position) {
      case 'bottom':
        top = targetRect.bottom + gap;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
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
    left = Math.max(12, Math.min(left, vw - tooltipRect.width - 12));
    top = Math.max(12, Math.min(top, vh - tooltipRect.height - 12));
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  },

  positionTooltipForDemo: function(tooltip) {
    var tooltipRect = tooltip.getBoundingClientRect();
    var vw = window.innerWidth;
    tooltip.style.left = Math.max(12, (vw / 2) - (tooltipRect.width / 2)) + 'px';
    tooltip.style.bottom = '24px';
    tooltip.style.top = 'auto';
    var arrow = tooltip.querySelector('.tour-tooltip-arrow');
    if (arrow) arrow.style.display = 'none';
  },

  // Cleanup
  cleanup: function() {
    var prevStep = this.steps[this.currentStep];
    if (prevStep && prevStep.cleanupAction) {
      prevStep.cleanupAction();
    }
    var tooltip = document.getElementById('tour-tooltip');
    if (tooltip) tooltip.remove();
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  endTour: function() {
    var currentStep = this.steps[this.currentStep];
    if (currentStep && currentStep.cleanupAction) {
      currentStep.cleanupAction();
    }
    this.cleanup();
    var overlay = document.getElementById('tour-overlay');
    if (overlay) overlay.remove();
    var spotlight = document.getElementById('tour-spotlight');
    if (spotlight) spotlight.remove();
    this.isRunning = false;
    localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
    var mainTab = document.querySelector('.tab-btn[data-page="main"]');
    if (mainTab) mainTab.click();
    if (localStorage.getItem(this.SAMPLE_CHAR_KEY)) {
      this.showSampleBanner();
    }
    this.showCompletionModal();
  },

  showCompletionModal: function() {
    var overlay = document.createElement('div');
    overlay.className = 'tour-welcome-overlay';
    overlay.innerHTML = '<div class="tour-welcome-box">' +
      '<div class="tour-welcome-icon">\ud83c\udf89</div>' +
      '<h2 class="tour-welcome-title">You\u2019re All Set!</h2>' +
      '<p class="tour-welcome-subtitle">Explore Cassian\u2019s character sheet freely \u2014 roll skills, cast spells, activate abilities. When you\u2019re ready to create your own character, use the red banner at the top to clear the sample data.</p>' +
      '<div class="tour-welcome-buttons">' +
      '<button class="tour-btn-start" id="tour-done-btn">Let\u2019s Go!</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    document.getElementById('tour-done-btn').addEventListener('click', function() {
      overlay.remove();
    });
  },

  // Sample Character Banner
  showSampleBanner: function() {
    if (document.getElementById('sample-char-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'sample-char-banner';
    banner.className = 'sample-char-banner';
    banner.innerHTML = '<span class="sample-char-banner-icon">\u26a0\ufe0f</span>' +
      '<span class="sample-char-banner-text">Sample character loaded \u2014 Cassian Haldric, Human Paladin</span>' +
      '<button class="btn-delete-sample" id="btn-delete-sample">Delete the Sample Character and Start Over</button>';
    var app = document.getElementById('app');
    if (app) {
      app.parentNode.insertBefore(banner, app);
    } else {
      document.body.prepend(banner);
    }
    var self = this;
    document.getElementById('btn-delete-sample').addEventListener('click', function() {
      self.confirmDeleteSample();
    });
  },

  confirmDeleteSample: function() {
    var self = this;
    var overlay = document.createElement('div');
    overlay.className = 'tour-confirm-overlay';
    overlay.id = 'tour-confirm-overlay';
    overlay.innerHTML = '<div class="tour-confirm-box">' +
      '<div class="tour-confirm-title">Delete Sample Character?</div>' +
      '<div class="tour-confirm-text">This will erase all of Cassian Haldric\u2019s data and give you a blank character sheet to build your own. This cannot be undone.</div>' +
      '<div class="tour-confirm-buttons">' +
      '<button class="tour-confirm-yes" id="confirm-delete-yes">Yes, Start Fresh</button>' +
      '<button class="tour-confirm-no" id="confirm-delete-no">Cancel</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    document.getElementById('confirm-delete-yes').addEventListener('click', function() {
      self.deleteSampleAndReload();
    });
    document.getElementById('confirm-delete-no').addEventListener('click', function() {
      overlay.remove();
    });
  },

  deleteSampleAndReload: function() {
    var auth = localStorage.getItem('mythras_auth');
    localStorage.clear();
    if (auth) localStorage.setItem('mythras_auth', auth);
    localStorage.setItem(this.TOUR_COMPLETE_KEY, 'true');
    location.reload();
  }
};

// Auto-start on page load
window.addEventListener('load', function() {
  setTimeout(function() {
    if (localStorage.getItem('cf_tour_pending')) {
      GuidedTour.checkPendingTour();
    } else {
      GuidedTour.checkAndStart();
    }
    if (localStorage.getItem(GuidedTour.SAMPLE_CHAR_KEY) && 
        localStorage.getItem(GuidedTour.TOUR_COMPLETE_KEY)) {
      GuidedTour.showSampleBanner();
    }
  }, 300);
});
