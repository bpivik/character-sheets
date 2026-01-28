# Mythras Classic Fantasy Character Sheet

An interactive, web-based character sheet for the **Mythras Classic Fantasy** tabletop RPG system.

## Features

- **Complete Character Sheet**: All 6 pages from the official PDF recreated as an interactive web form
- **Auto-Calculations**: Derived stats, skill bases, and hit points automatically calculated from attributes
- **Two Sheet Types**: Support for both Human/Demihuman and Syrin (winged race) characters
- **Save/Load**: Characters auto-save to browser localStorage
- **Export/Import**: Export characters as JSON files for backup or sharing
- **Print-Friendly**: Optimized CSS for printing physical character sheets
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Pages

1. **Portrait** - Full-body character image
2. **Character** - Main stats, attributes, skills, equipment
3. **Combat** - Weapons, hit locations, movement, special abilities
4. **Magic 1-2** - Magic skills and spells (Cantrips through Rank 2)
5. **Magic 3-5** - Higher rank spells (Rank 3 through Rank 5)
6. **Notes** - General notes and backstory

## Auto-Calculated Values

The following values are automatically calculated when you enter attributes:

- **Action Points** (from INT + DEX)
- **Damage Modifier** (from STR + SIZ)
- **Healing Rate** (from CON)
- **Initiative** (from INT + DEX)
- **Luck Points** (from POW)
- **Magic Points** (from POW)
- **All Standard Skill Bases** (from various attribute combinations)
- **Hit Location HP** (from CON + SIZ)
- **Encumbrance Status** (from total ENC vs STR)
- **Movement Speeds** (from base movement)
- **Jump Distances** (from height)

## Usage

### Online
Visit: `https://[your-username].github.io/character-sheets/`

### Local
1. Download or clone this repository
2. Open `index.html` in a web browser
3. No server required - runs entirely in the browser

## File Structure

```
character-sheets/
├── index.html          # Main HTML file
├── css/
│   ├── main.css        # Layout styles
│   ├── theme.css       # Parchment theme
│   └── print.css       # Print styles
├── js/
│   ├── app.js          # Main application
│   ├── calculations.js # Auto-calc functions
│   ├── storage.js      # Save/load handling
│   └── data/
│       └── skill-definitions.js  # Skill data
└── README.md
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Saving Characters

Characters are automatically saved to your browser's localStorage every 2 seconds after making changes. You can also:

- Click **Save** to manually save
- Click **Export JSON** to download a backup file
- Click **Load** to import a previously exported JSON file

## Syrin Characters

Select "Syrin" from the dropdown menu to switch to the Syrin character sheet, which includes:
- Additional hit locations for wings
- Flying movement field
- Restricted magic class options (Divine and Bard only)

## Credits

- **Mythras** is a trademark of The Design Mechanism
- **Classic Fantasy** is published by The Design Mechanism
- Character sheet design based on the official Mythras Classic Fantasy PDF sheets

## License

This is a fan-made tool for personal use. Mythras and Classic Fantasy are trademarks of their respective owners.
