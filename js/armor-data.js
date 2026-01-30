/* ============================================
   MYTHRAS CLASSIC FANTASY CHARACTER SHEET
   Armor Data - AP Values by Armor Type
   ============================================ */

const ArmorData = {
  // Armor type to AP mapping (case-insensitive lookup)
  apMap: {
    "robes": 0,
    "clothing": 0,
    "fur": 1,
    "furs": 1,
    "hide": 1,
    "hides": 1,
    "leather": 2,
    "padded": 2,
    "quilted": 2,
    "studded leather": 3,
    "studded": 3,
    "ringmail": 3,
    "ring mail": 3,
    "brigandine": 4,
    "scale": 4,
    "laminated": 4,
    "chain": 5,
    "chainmail": 5,
    "chain mail": 5,
    "splint": 6,
    "splintmail": 6,
    "splint mail": 6,
    "banded": 6,
    "banded mail": 6,
    "platemail": 7,
    "plate mail": 7,
    "full plate": 8,
    "plate": 8
  },
  
  /**
   * Normalize armor name for lookup
   * @param {string} name - The armor name
   * @returns {string} - Normalized name (lowercase, trimmed, collapsed whitespace)
   */
  normalize(name) {
    if (!name) return '';
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
  },
  
  /**
   * Look up AP value for armor type
   * @param {string} armorName - The armor name/type
   * @returns {number|null} - AP value or null if not found
   */
  getAP(armorName) {
    const normalized = this.normalize(armorName);
    
    // Try exact match first
    if (this.apMap.hasOwnProperty(normalized)) {
      return this.apMap[normalized];
    }
    
    // Try partial match - check if any key is contained in the armor name
    for (const [key, ap] of Object.entries(this.apMap)) {
      if (normalized.includes(key)) {
        return ap;
      }
    }
    
    return null;
  }
};

// Make available globally
window.ArmorData = ArmorData;
