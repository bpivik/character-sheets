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
  },
  
  /**
   * Check if armor is classified as Light (AP ≤ 4) or non-armor (robes, clothing, none).
   * Per the Player's Handbook Armor Table:
   *   Light: Furs/Hides(1), Leather/Padded/Quilted(2), Studded Leather/Ring Mail(3), Brigandine/Scale/Laminated(4)
   *   Heavy: Chain Mail(5), Splint/Banded(6), Plate Mail(7), Full Plate(8)
   * @param {string} armorName - The armor name/type
   * @returns {boolean} - true if light armor, no armor, or unrecognized empty string
   */
  isLightArmor(armorName) {
    const normalized = this.normalize(armorName);
    if (!normalized || normalized === 'none') return true; // No armor = fine
    const ap = this.getAP(armorName);
    if (ap === null) return true; // Unrecognized armor treated as non-restrictive (edge case)
    return ap <= 4;
  },
  
  /**
   * Check if armor is classified as Heavy (AP ≥ 5).
   * @param {string} armorName - The armor name/type
   * @returns {boolean} - true if heavy armor
   */
  isHeavyArmor(armorName) {
    const normalized = this.normalize(armorName);
    if (!normalized || normalized === 'none') return false;
    const ap = this.getAP(armorName);
    if (ap === null) return false;
    return ap >= 5;
  }
};

// Make available globally
window.ArmorData = ArmorData;
