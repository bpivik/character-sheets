// ============================================
// MYTHRAS CLASSIC FANTASY - APP INITIALIZATION
// ============================================

// Data definitions
const STANDARD_SKILLS = [
  ['Athletics', 'STR+DEX'],
  ['Boating', 'STR+CON'],
  ['Brawn', 'STR+SIZ'],
  ['Conceal', 'DEX+POW'],
  ['Customs', 'INT×2+40'],
  ['Dance', 'DEX+CHA'],
  ['Deceit', 'INT+CHA'],
  ['Drive', 'DEX+POW'],
  ['Endurance', 'CON×2'],
  ['Evade', 'DEX×2'],
  ['First Aid', 'INT+DEX'],
  ['Influence', 'CHA×2'],
  ['Insight', 'INT+POW'],
  ['Locale', 'INT×2'],
  ['Perception', 'INT+POW'],
  ['Ride', 'DEX+POW'],
  ['Sing', 'CHA+POW'],
  ['Stealth', 'DEX+INT'],
  ['Swim', 'STR+CON'],
  ['Willpower', 'POW×2']
];

const HUMAN_HIT_LOCS = [
  ['1-3', 'Right Leg'],
  ['4-6', 'Left Leg'],
  ['7-9', 'Abdomen'],
  ['10-12', 'Chest'],
  ['13-15', 'Right Arm'],
  ['16-18', 'Left Arm'],
  ['19-20', 'Head']
];

const SYRIN_HIT_LOCS = [
  ['1-3', 'Right Leg'],
  ['4-6', 'Left Leg'],
  ['7-9', 'Abdomen'],
  ['10', 'Chest'],
  ['11-12', 'Left Wing'],
  ['13-14', 'Right Wing'],
  ['15-16', 'Right Arm'],
  ['17-18', 'Left Arm'],
  ['19-20', 'Head']
];

const ATTRIBUTES = ['STR', 'CON', 'SIZ', 'DEX', 'INT', 'POW', 'CHA'];

const DERIVED_STATS = [
  ['Action Points', 'action-pts'],
  ['Damage Mod', 'damage-mod'],
  ['Healing Rate', 'heal-rate'],
  ['Experience Mod', 'exp-mod'],
  ['Movement', 'movement', true],
  ['Initiative', 'init', true],
  ['Luck Points', 'luck', true],
  ['Magic Points', 'mp', true]
];

// ============================================
// NAVIGATION
// ============================================
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('page-' + tab.dataset.page).classList.add('active');
  });
});

// Logout
document.getElementById('btn-logout').addEventListener('click', () => {
  if (confirm('Logout?')) {
    localStorage.removeItem('mythras_auth');
    window.location.href = 'index.html';
  }
});

// ============================================
// PORTRAIT UPLOADS
// ============================================
document.getElementById('portrait-container').addEventListener('click', () => {
  document.getElementById('portrait-upload').click();
});

document.getElementById('portrait-upload').addEventListener('change', function(e) {
  if (e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById('portrait-img').src = ev.target.result;
      document.getElementById('portrait-img').classList.remove('hidden');
      document.getElementById('portrait-label').classList.add('hidden');
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

document.getElementById('portrait-upload-sm').addEventListener('change', function(e) {
  if (e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById('portrait-sm-img').src = ev.target.result;
      document.getElementById('portrait-sm-img').classList.remove('hidden');
      document.getElementById('portrait-sm-label').classList.add('hidden');
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// ============================================
// GENERATE ATTRIBUTES
// ============================================
const attrGrid = document.getElementById('attr-grid');
ATTRIBUTES.forEach((attr, i) => {
  const box = document.createElement('div');
  box.className = 'attr-box' + (i === 6 ? ' wide' : '');
  box.innerHTML = `
    <span class="attr-label">${attr}</span>
    <input type="number" class="attr-input" id="attr-${attr.toLowerCase()}" data-attr="${attr}">
  `;
  attrGrid.appendChild(box);
});

// ============================================
// GENERATE DERIVED STATS
// ============================================
const derivedGrid = document.getElementById('derived-grid');
DERIVED_STATS.forEach(([label, id, isInput]) => {
  const row = document.createElement('div');
  row.className = 'derived-row';
  if (isInput) {
    row.innerHTML = `<label>${label}</label><input type="number" id="${id}">`;
  } else {
    row.innerHTML = `<label>${label}</label><span id="${id}">—</span>`;
  }
  derivedGrid.appendChild(row);
});

// ============================================
// GENERATE SKILLS
// ============================================
const skillsContainer = document.getElementById('skills-container');
STANDARD_SKILLS.forEach(([name, formula], i) => {
  const row = document.createElement('div');
  row.className = 'skill-row';
  row.innerHTML = `
    <span class="skill-name">${name}</span>
    <span class="skill-formula">${formula}</span>
    <span class="skill-base" id="skill-base-${i}">0</span>
    <input type="number" class="skill-total" id="skill-total-${i}">
  `;
  skillsContainer.appendChild(row);
});

// Generate professional skills (empty rows)
const profContainer = document.getElementById('prof-skills-container');
for (let i = 0; i < 8; i++) {
  const row = document.createElement('div');
  row.className = 'skill-row';
  row.innerHTML = `
    <input type="text" class="skill-name" id="prof-name-${i}" placeholder="Skill name" style="border:1px solid var(--parchment-shadow);border-radius:3px;background:rgba(255,255,255,0.6);padding:0.1rem 0.2rem;font-size:0.75rem;">
    <input type="text" class="skill-formula" id="prof-formula-${i}" placeholder="Base" style="border:1px solid var(--parchment-shadow);border-radius:3px;background:rgba(255,255,255,0.6);padding:0.1rem;font-size:0.6rem;text-align:center;">
    <span class="skill-base" id="prof-base-${i}">0</span>
    <input type="number" class="skill-total" id="prof-total-${i}">
  `;
  profContainer.appendChild(row);
}

// Generate languages
const langContainer = document.getElementById('languages-container');
for (let i = 0; i < 5; i++) {
  const row = document.createElement('div');
  row.className = 'skill-row';
  const label = i === 0 ? 'Native Tongue' : '';
  row.innerHTML = `
    <input type="text" id="lang-name-${i}" placeholder="${label || 'Language'}" style="border:1px solid var(--parchment-shadow);border-radius:3px;background:rgba(255,255,255,0.6);padding:0.1rem 0.2rem;font-size:0.75rem;">
    <span class="skill-formula">${i === 0 ? 'INT+CHA+40' : 'INT+CHA'}</span>
    <span class="skill-base" id="lang-base-${i}">0</span>
    <input type="number" class="skill-total" id="lang-total-${i}">
  `;
  langContainer.appendChild(row);
}

// ============================================
// GENERATE BELIEFS/PASSIONS/OATHS
// ============================================
['alignments', 'passions', 'oaths'].forEach(type => {
  const container = document.getElementById(type + '-container');
  const count = type === 'alignments' ? 2 : 4;
  for (let i = 0; i < count; i++) {
    const row = document.createElement('div');
    row.className = 'belief-row';
    row.innerHTML = `
      <input type="text" class="belief-name" id="${type}-name-${i}" placeholder="${type.slice(0,-1)}">
      <input type="number" class="belief-value" id="${type}-val-${i}" placeholder="%">
    `;
    container.appendChild(row);
  }
});

// ============================================
// GENERATE EQUIPMENT
// ============================================
const equipContainer = document.getElementById('equipment-container');
for (let i = 0; i < 15; i++) {
  const row = document.createElement('div');
  row.className = 'equip-row';
  row.innerHTML = `
    <input type="text" class="equip-input" id="equip-name-${i}">
    <input type="number" class="equip-input equip-enc" id="equip-enc-${i}">
  `;
  equipContainer.appendChild(row);
}

// ============================================
// GENERATE HIT LOCATIONS
// ============================================
function generateHitLocations(type) {
  const locs = type === 'syrin' ? SYRIN_HIT_LOCS : HUMAN_HIT_LOCS;
  const tbody = document.getElementById('hit-loc-body');
  tbody.innerHTML = '';
  locs.forEach(([roll, loc], i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${roll}</td>
      <td>${loc}</td>
      <td><input type="text" id="armor-${i}"></td>
      <td><input type="number" id="ap-${i}"></td>
      <td id="hp-${i}">0</td>
      <td><input type="number" id="hp-cur-${i}"></td>
    `;
    tbody.appendChild(tr);
  });
}
generateHitLocations('human');

// Sheet type change
document.getElementById('sheet-type').addEventListener('change', function() {
  generateHitLocations(this.value);
});

// ============================================
// GENERATE QUICK REFERENCE
// ============================================
const quickRef = document.getElementById('quick-ref');
[
  ['Initiative', 'ref-init', '0'],
  ['Action Pts', 'ref-ap', '2'],
  ['Damage Mod', 'ref-dmg', '+0'],
  ['Luck Points', 'ref-luck', '0']
].forEach(([label, id, val]) => {
  const box = document.createElement('div');
  box.className = 'ref-box';
  box.innerHTML = `<div class="ref-label">${label}</div><div class="ref-value" id="${id}">${val}</div>`;
  quickRef.appendChild(box);
});

// ============================================
// GENERATE COMBAT SKILLS
// ============================================
const combatContainer = document.getElementById('combat-skills-container');
for (let i = 0; i < 5; i++) {
  const row = document.createElement('div');
  row.className = 'combat-skill-row';
  row.innerHTML = `
    <input type="text" id="combat-name-${i}" placeholder="${i === 0 ? 'Unarmed' : 'Combat Style'}">
    <input type="number" id="combat-pct-${i}" placeholder="%">
    <input type="text" id="combat-weapons-${i}" placeholder="${i === 0 ? 'Hands/Feet' : 'Weapons known'}">
  `;
  combatContainer.appendChild(row);
}

// ============================================
// GENERATE WEAPONS
// ============================================
const meleeBody = document.getElementById('melee-body');
for (let i = 0; i < 6; i++) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" id="melee-name-${i}"></td>
    <td><input type="text" id="melee-dmg-${i}"></td>
    <td><input type="text" id="melee-size-${i}"></td>
    <td><input type="text" id="melee-aphp-${i}"></td>
    <td><input type="text" id="melee-fx-${i}"></td>
    <td><input type="text" id="melee-traits-${i}"></td>
  `;
  meleeBody.appendChild(tr);
}

const rangedBody = document.getElementById('ranged-body');
for (let i = 0; i < 5; i++) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" id="ranged-name-${i}"></td>
    <td><input type="text" id="ranged-dmg-${i}"></td>
    <td><input type="text" id="ranged-range-${i}"></td>
    <td><input type="text" id="ranged-load-${i}"></td>
    <td><input type="text" id="ranged-aphp-${i}"></td>
    <td><input type="text" id="ranged-fx-${i}"></td>
  `;
  rangedBody.appendChild(tr);
}

// ============================================
// GENERATE ABILITIES
// ============================================
const abilitiesContainer = document.getElementById('abilities-container');
for (let i = 0; i < 24; i++) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'ability-input';
  input.id = `ability-${i}`;
  input.placeholder = 'Ability';
  abilitiesContainer.appendChild(input);
}

// ============================================
// GENERATE SPELL LISTS
// ============================================
const spellGrid = document.getElementById('spell-grid');
['Cantrips', 'Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Rank 5'].forEach((title, rank) => {
  const section = document.createElement('div');
  section.className = 'section spell-list';
  
  let html = `<h3 class="section-title">${title}</h3>`;
  html += `<div class="spell-header"><span>Memorize:</span><input type="number" id="spell-max-${rank}" value="0"></div>`;
  html += `<div id="spell-list-${rank}">`;
  
  for (let i = 0; i < 20; i++) {
    html += `
      <div class="spell-row">
        <input type="checkbox" id="spell-mem-${rank}-${i}">
        <input type="text" id="spell-name-${rank}-${i}" placeholder="Spell name">
        <input type="text" id="spell-cost-${rank}-${i}" placeholder="MP">
      </div>
    `;
  }
  html += '</div>';
  
  section.innerHTML = html;
  spellGrid.appendChild(section);
});

// ============================================
// SAVE FUNCTIONALITY (placeholder)
// ============================================
document.getElementById('btn-save').addEventListener('click', () => {
  alert('Save functionality coming soon!\n\nCharacter data will be saved to browser storage.');
});

document.getElementById('btn-export').addEventListener('click', () => {
  alert('Export functionality coming soon!');
});

document.getElementById('btn-import').addEventListener('click', () => {
  alert('Import functionality coming soon!');
});

document.getElementById('btn-new').addEventListener('click', () => {
  alert('New character functionality coming soon!');
});

document.getElementById('btn-delete').addEventListener('click', () => {
  alert('Delete character functionality coming soon!');
});

// Add buttons
['add-prof-skill', 'add-language', 'add-passion', 'add-oath', 'add-equipment', 
 'add-combat-skill', 'add-melee', 'add-ranged', 'add-ability'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Add row functionality coming soon!');
    });
  }
});

console.log('Mythras Character Sheet initialized!');
