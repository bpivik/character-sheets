/**
 * Spell Details Data for Mythras Classic Fantasy
 * Comprehensive spell stat blocks for the Casting Modal
 * 
 * Structure:
 *   Each spell keyed by lowercase name with full stat block.
 *   Reversible spells have a `reverse` object with the alternate version's details.
 *   Aliases map variant names to their canonical entry.
 *
 * Cost types:
 *   'fixed'             - Flat MP cost, no intensity scaling (e.g., all cantrips)
 *   'perIntensity'      - base × Intensity (e.g., "1/Intensity" or "3/Intensity")
 *   'plusPerAdditional'  - base + perAdditional × (Intensity - 1) (e.g., "3, +1/add'l. Intensity")
 *   'special'           - See description for cost details
 *
 * Intensity scaling:
 *   Fields like range, area, duration can scale with intensity.
 *   Expressed as: { field: 'range', base: 30, per: 30, unit: "'" }
 *   meaning: value = base + (per × (Intensity - 1)), displayed with unit
 *   For cantrips, intensity is always 1 and fixed.
 */

const SpellDetails = {

  // =========================================================================
  //  CANTRIPS (Rank 0)
  // =========================================================================

  "appraise": {
    name: "Appraise",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Item",
    castingTime: "1 Turn",
    duration: "Instant",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You finish the spell, and the value of the object floats into your mind like a whisper.",
    description: "When cast, the caster can immediately assess the quality of physical goods of a combined ENC number of Things or SIZ equal to the caster's POW. The spell can determine if identical-looking items are of the same or similar quality or if one or more is flawed or of a higher quality. The spell does not work on living or organic objects, only on inanimate ones. Neither does it determine what flaws or Enhancements are present, merely that they exist. This spell cannot identify or detect magic (see Detect Magic and Identify)."
  },

  "avert": {
    name: "Avert",
    school: "Abjuration",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Spell",
    castingTime: "Instant",
    duration: "Instant",
    range: "60'",
    resist: "None",
    intensityScaling: null,
    flavorText: "A shimmer of invisible force wraps around you as the spell completes. The next incoming cantrip seems to slide off at the last moment, repelled by unseen hands.",
    description: "The caster can use this spell to dismiss another Rank 0 spell within range or reactively neutralize a Rank 0 spell as it is being cast by using the Counter Magic Reactive Action."
  },

  "babble": {
    name: "Babble",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Turn",
    duration: "30 Minutes",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You play the last word of the music, and the target's speech unravels. Their voice warps into jumbled sounds, words breaking apart into nonsense no matter how hard they try to speak clearly.",
    description: "Babble scrambles anything the target says, but their thoughts remain unaffected. It can ruin a commander's attempt to give orders, confuse negotiations, or garble a bard's song. Since it only alters spoken words, the target still knows what they want to say but cannot make themselves understood. If the target relies on verbal components to cast spells, Babble may disrupt their spellcasting."
  },

  "beastcall": {
    name: "Beastcall (X)",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Animal",
    castingTime: "1 Turn",
    duration: "Instant",
    range: "240'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You whistle or growl the final word in the spell, and nearby beasts stir. The animal locks eyes with you and begins to approach, drawn by your call.",
    description: "When cast, the caster can attract a single, specific type of animal within range. The caster must specify the type when memorizing the spell. The summoned animal cannot be sapient and may also resist the spell using its Willpower. If it Fails to resist, it is naturally drawn, in a passive fashion, to the caster, whereupon the spell dissipates and the creature acts as it normally would, finding itself proximate to the caster. Physical obstacles or adverse actions (a wall, river, or line of spears, or a harsh yank on a set of reins or leash) cause the spell to fail."
  },

  "befuddle": {
    name: "Befuddle",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Turn",
    duration: "30 Minutes",
    range: "60'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You utter the last twisting word, and confusion clouds your target's eyes. Their thoughts scatter like leaves in the wind, leaving them dazed and uncertain.",
    description: "The caster causes confusion within the mind of a SIZ 1-20 corporeal target. This spell cannot affect targets of a larger size. The subject of the spell has difficulty thinking straight, forgetting where it is, what it is doing, and why \u2013 often lapsing into disassociated lines of thought. Befuddled targets can still act in self-defense but cannot initiate any constructive activity until the spell ends. Any sort of attack or threatening action instantly breaks the spell, whether directed specifically at the befuddled target or not."
  },

  "calculate": {
    name: "Calculate",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "240'",
    resist: "None",
    intensityScaling: null,
    flavorText: "Numbers and symbols flash through your thoughts as the spell concludes. Complex calculations resolve instantly in your mind, as if you'd known the answer all along.",
    description: "Upon casting, the mage can immediately calculate the numbers, weight, or size of a thing, be it soldiers amassed in battle formation, a pile of objects, the length of a rope, or the weight of a sack of rice. The spell always yields a precise quantity, but not value or quality. The caster can only calculate items that the caster can directly observe (see, lift, smell, and so on) and that are within range. The spell works when cast on an open container \u2013 assuming, of course, that the container is not empty."
  },

  "calm": {
    name: "Calm",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "As you finish the spell, a soothing stillness settles over your target. Tension drains from their body as anger or panic fades into quiet clarity.",
    description: "When cast, the mage attempts to dampen down the desires of a humanoid target, perhaps ensuring that a lovesick paramour does not press their suit or a frightened rival does not scream for help or draw weapons in anger. A calmed person is not otherwise mentally affected; thus, any sort of assault or threatening action still permits them to defend themselves and even attack, albeit they do so in a calm and levelheaded manner. Large humanoids (SIZ 21-40) are less susceptible to this spell, with their Resistance Roll being Easy, and the Resistance Roll for Huge humanoids (SIZ 41+) is Very Easy."
  },

  "calm animal": {
    name: "Calm Animal",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "20'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You lower your voice and complete the spell, and the creature's hackles lower. Its breathing slows, eyes softening as fear and aggression melt away.",
    description: "When cast, the mage attempts to calm a panicked or hostile animal. If successful, the animal regains its composure or otherwise backs down. Attempting to calm a starving animal or a mother protecting its young is Hard. A calmed animal is not otherwise mentally affected; thus, any sort of assault or threatening action still permits the target to defend themselves and even attack. Large animals (SIZ 21-40) are less susceptible to this spell, with their Resistance Roll being Easy, and the Resistance Roll for Huge animals (SIZ 41+) is Very Easy."
  },

  "chill (heat)": {
    name: "Chill (Heat)",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You finish the spell, and a cold sheen spreads across the object, frosting its surface with a breath of winter.",
    description: "Upon casting, the spellcaster dramatically reduces the temperature of small objects (with an ENC Thing value no larger than a third of the caster's POW) down to the temperature of ice water. This spell is useful for rapidly cooling hot items, chilling drinks, and so forth. The spell does not freeze an object nor does it cause any damage to its structure: it merely renders it very cold.",
    reverse: {
      name: "Heat",
      flavorText: "With a final gesture, warmth floods into the object, causing it to steam or glow faintly as if plucked from a hearth.",
      description: "When reversed, Heat dramatically increases the temperature of small objects up to the temperature of boiling water. This versatile spell is useful for mulling wine, cooking food without a fire, or warming a bed prior to sleep. It does not affect living tissue, although it can affect clothing and armor, making it somewhat uncomfortable, but not to the extent of harming the wearer."
    }
  },

  "chill": {
    name: "Chill",
    aliasOf: "chill (heat)",
    version: "primary"
  },

  "heat": {
    name: "Heat",
    aliasOf: "chill (heat)",
    version: "reverse"
  },

  "cleanse (dishevel)": {
    name: "Cleanse (Dishevel)",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You complete the spell, and dirt, grime, and stains vanish in an instant, leaving the object or creature pristine.",
    description: "The caster uses this spell to rid an object, person, or small area of dirt, grease, grime, bad smells, and so on. The spell cannot organize or tidy the target or area; it merely cleans them to a spick-and-span state. Casters often use this spell to launder clothes. The caster can cleanse an Area equal to POW \u00d75 in square feet (a 5' square is 25 square feet).",
    reverse: {
      name: "Dishevel",
      flavorText: "A flick of your fingers, and order gives way to chaos \u2013 laces untie, hair frizzes, and clothing wrinkles with sudden disorder.",
      description: "Dishevel is the reverse of Cleanse. The caster can cover objects immediately in grime, dust, cobwebs, and so forth. Casters can use this spell to make brand new objects look old and weathered or help disguise normally well-turned-out people."
    }
  },

  "cleanse": {
    name: "Cleanse",
    aliasOf: "cleanse (dishevel)",
    version: "primary"
  },

  "dishevel": {
    name: "Dishevel",
    aliasOf: "cleanse (dishevel)",
    version: "reverse"
  },

  "coordination": {
    name: "Coordination",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Trigger",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You whisper the final syllable, and a fluid harmony settles into your limbs. Every motion feels precise, balanced, and effortlessly in sync.",
    description: "Coordination allows the caster to enhance their own or one other person's manual dexterity and agility in performing a single predetermined task. When cast in preparation, it permits the recipient a chance to re-roll a single skill check that requires adroitness such as Acrobatics, Lockpicking, and so on. The recipient may choose the better of the two rolls but doing so expends the spell."
  },

  "deflect": {
    name: "Deflect",
    school: "Evocation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You snap your fingers or raise a hand, and a faint shimmer arcs around you. The small objects aimed your way veer off course at the last second, as if nudged by unseen force.",
    description: "This spell wards the recipient against tiny impacts of foreign material, such as rain drops, a cloud of midges or mosquitoes, and even flying grains of sand. The protection is limited to individual objects smaller than a child's fingernail, so this spell cannot prevent normal missile weapons from striking a character. It also does not work against tiny creatures that do cumulative physical damage to the target, such as an insect swarm."
  },

  "dry": {
    name: "Dry",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You speak the final word, and moisture lifts in wisps of steam or mist. In moments, it feels sun-warmed and dry to the touch.",
    description: "Dry removes all extraneous moisture from an object or person, which either slicks off to form a puddle or evaporates in a cloud of vapor. Casters normally use this spell to dry off after heavy rain or protect equipment from rotting, but it has several other versatile uses. The caster can dry an object up to POW \u00d72 in SIZ."
  },

  "fanaticism (demoralize)": {
    name: "Fanaticism (Demoralize)",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "30 Minutes",
    range: "60'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You shout the last word, and your target's eyes blaze with purpose. Fear vanishes, replaced by unshakable zeal.",
    description: "Fanaticism temporarily fills the target with a wildly excessive or irrational devotion, dedication, or enthusiasm for a particular person, species, situation, or object. Its effect grants the recipient a temporary Passion equal to the casting skill of the caster. Fanaticism can counter Demoralize and vice versa.",
    reverse: {
      name: "Demoralize",
      flavorText: "You finish the spell, and a wave of doubt crashes over your target. Their confidence falters, and their grip on courage slips away.",
      description: "Demoralize is the reversed version of Fanaticism and temporarily fills the target with a sense of despondency toward a particular person, species, situation, or object. When confronted with the subject of this despondency, any proactive skill attempts the afflicted character makes related to the source are one Difficulty Grade harder. For example, the caster could give someone a demoralizing dread of heights, ensuring that any Athletic skill used for climbing or Acrobatics skill for balancing would be one Difficulty Grade harder. Note that a direct assault from the subject instantly breaks the spell."
    }
  },

  "fanaticism": {
    name: "Fanaticism",
    aliasOf: "fanaticism (demoralize)",
    version: "primary"
  },

  "demoralize": {
    name: "Demoralize",
    aliasOf: "fanaticism (demoralize)",
    version: "reverse"
  },

  "frostbite": {
    name: "Frostbite",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "60'",
    resist: "Endurance",
    intensityScaling: null,
    flavorText: "You exhale the final syllable, and a flash of icy pain jolts through the target. Skin numbs and stiffens as a patch of frost blooms where your magic strikes.",
    description: "Frostbite works directly on living, organic tissue, inflicting numbness and pain in one of the recipient's extremities (fingers, toes, buttocks, nose, ears, and so on). The caster must either touch a specific extremity or roll randomly if cast at range. If not resisted, the area affected suffers sensory numbness followed by lingering pain for the Duration, making skill tests using that location one Difficulty Grade harder. Frostbite does not deal direct damage but limits the use of the affected area for a while. For instance, a victim suffering frostbite to the buttocks cannot sit without extreme discomfort.\n\nLarge creatures (SIZ 21-40) are less susceptible to this spell with the Resistance Roll being Easy and, for Huge creatures (SIZ 41+), the Resistance Roll is Very Easy."
  },

  "glamour (repugnance)": {
    name: "Glamour (Repugnance)",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "60'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You complete the spell, and a subtle radiance clings to your features. Eyes linger on you with fascination, drawn by an unnatural allure.",
    description: "Glamour makes the target alluring so people are naturally attracted to them. The caster must choose the nature of the glamour when cast and it can be anything from increased natural beauty, a softer more compelling voice, or even a temptingly perfumed body scent. While the spell grants no mechanical benefits, it does ensure that the recipient can gather an audience, engage the attention of someone they wish, or provide a distraction that enables accomplices to perform nefarious deeds.",
    reverse: {
      name: "Repugnance",
      flavorText: "The final word twists in your throat, and an unsettling aura spreads from you. Faces wrinkle, stomachs churn, and others instinctively recoil.",
      description: "When reversed, Repugnance twists the target so that they cause distaste in all those who see, hear, or smell them. The caster must choose the effect when cast and it can be anything from a hideous wart on the end of a nose, a high-pitched nasal voice, or even a pungent body odor. Whatever they choose, it causes people to turn away from the victim or make excuses to leave their presence as quickly as possible."
    }
  },

  "glamour": {
    name: "Glamour",
    aliasOf: "glamour (repugnance)",
    version: "primary"
  },

  "repugnance": {
    name: "Repugnance",
    aliasOf: "glamour (repugnance)",
    version: "reverse"
  },

  "glue": {
    name: "Glue",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "2 Items or 1 Broken Item",
    castingTime: "1 Action",
    duration: "24 Hours",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You finish the incantation, and a tacky sheen spreads over the two surfaces. They are held fast, as if bound by invisible sap.",
    description: "Glue cements together two solid, inanimate objects for the Duration of the spell, for example, a cartwheel to its axle or a door to its frame. While under the effects of the spell, the items, no matter how disparate, cannot be parted unless something actively tries to wrench them apart. In this circumstance, the spell has a Brawn skill equal to 5\u00d7 the caster's POW and fails when a superior Brawn defeats it in an Opposed Roll. Once the spell concludes or fails, the items part completely unharmed."
  },

  "ignite (extinguish)": {
    name: "Ignite (Extinguish)",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Small Fire",
    castingTime: "1 Action",
    duration: "Instant",
    range: "10'",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "With a sharp gesture, a spark leaps from your fingers, and the object flares to life with sudden flame.",
    description: "Ignite only works on flammable inorganic matter, causing a small object or hand-sized area to burst into flame. Depending on what was set alight, once burning, the flames spread unless quenched or countered in some way. This spell is normally used to light candles, torches, or lanterns from afar. It can also start a camp or cooking fire in adverse conditions, such as using damp kindling or in strong winds. If used to ignite flammable clothing or other worn or carried equipment, the target is allowed an Evade Resistance Roll to extinguish it before it becomes serious. This takes one Action Point.",
    reverse: {
      name: "Extinguish",
      flavorText: "You whisper the final word, and the flame gutters out, snuffed as though swallowed by the air itself.",
      description: "Extinguish immediately quenches flames and small fires of modest size and heat. It is useful for dousing candles, lanterns, torches, or small cook fires, but it does not work on magical or larger, more ferocious conflagrations such as pyres, burning houses, or dragon flames."
    }
  },

  "ignite": {
    name: "Ignite",
    aliasOf: "ignite (extinguish)",
    version: "primary"
  },

  "extinguish": {
    name: "Extinguish",
    aliasOf: "ignite (extinguish)",
    version: "reverse"
  },

  "incognito": {
    name: "Incognito",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "1 Hour",
    range: "Touch",
    resist: "Endurance",
    intensityScaling: null,
    flavorText: "You speak the last word, and a subtle veil settles over you. Faces glance your way, then slide past \u2013 unable to recall or recognize you.",
    description: "Incognito alters the facial features of the recipient to a bland, unmemorable countenance. It does not affect the voice, mannerisms, or physical size/presence of the recipient, but ensures that visually they do not stand out from the crowd. Anyone under the effects of Incognito is actively ignored by those who might otherwise be searching for them; they are simply overlooked and discounted."
  },

  "ironhand": {
    name: "Ironhand",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "10 Minutes",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You complete the spell, and your hand hardens with supernatural force.",
    description: "Ironhand allows the recipient to hold anything that would otherwise cause damage (such as extremely hot or cold items, or those dripping acid) without injuring themselves. Thus, a user could grasp a brand from a fire, lift a bubbling cauldron from a spit, or even reach through a steam vent to grab an object on the other side. The spell does not grant total immunity from damage, it merely stops harm from conducting through the skin of the recipient's hands. The spell does not protect anything worn on the hand, so rings, gloves, and such like suffer the full effects of the source."
  },

  "magic tricks": {
    name: "Magic Tricks",
    school: "Conjuration",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "Caster",
    castingTime: "1 Action",
    duration: "Scene",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You flick your wrist or whisper a word, and a harmless illusion springs to life \u2013 dancing lights, a puff of smoke, or a phantom sound to amuse or distract.",
    description: "Magic Tricks are a great form of entertainment among the common folk, downtrodden, and especially, children. Some effects commonly created with Magic Tricks include puffs of wind to flicker candles, pulling a Silver Piece from behind a child's ear, causing a flower to quickly bloom, performing card tricks, creating eerie ethereal music that issues from nowhere, etc. Magic Tricks are unable to cause even a single point of damage or any amount of distraction in combat, but could be used to keep a crowd occupied while the rest of the party sneaks past."
  },

  "magnify": {
    name: "Magnify",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "0",
    resist: "None",
    intensityScaling: null,
    flavorText: "You utter the final word, and the object swells in detail \u2013 scratches, markings, or text growing clear as if seen through a perfect lens.",
    description: "Magnify allows the caster to see something twice as close as it really is (no matter its distance), which is useful for close work as well as out in the field."
  },

  "might": {
    name: "Might",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Combat",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Trigger",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You finish the spell, and power surges through your muscles. You feel heavier, stronger, ready to lift with ease.",
    description: "Might permits the recipient to engage in an impressive act of physical strength. The spell adds the caster's POW to the recipient's Brawn skill. However, it does not increase the character's Damage Modifier when inflicting combat damage."
  },

  "mimic": {
    name: "Mimic",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "10 Minutes",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You complete the spell, and your voice, posture, or expression subtly shifts. For a brief time, you echo the person's mannerisms with uncanny precision.",
    description: "Mimic allows the recipient to perfectly mimic the voice and mannerisms of someone the caster has seen and heard personally. It does not affect their physical appearance."
  },

  "mobility": {
    name: "Mobility",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "10 Minutes",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You speak the last word, and your limbs feel lighter, joints looser. Every step becomes smoother, quicker \u2013 as if the wind carries you forward.",
    description: "Mobility increases the Movement Rate of the recipient by 5' (roll 01-70) or 10' (71-00) for the spell's Duration. Hunters, herders, and those seeking to escape pursuit find this spell useful."
  },

  "perfume": {
    name: "Perfume",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Noxious Substance",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "90'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You finish the spell, and a pleasant scent blossoms in the air around you \u2013 floral, spicy, or sweet \u2013 lingering like an invisible charm.",
    description: "Perfume can negate a noxious odor or imbue an odorless substance with a pleasing fragrance. The spell does not affect the properties of the source of a stench (so a rotting carcass is still rotten) \u2013 it merely makes its presence tolerable."
  },

  "pet": {
    name: "Pet",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Animal",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You complete the spell with a soft tone, and the creature before you perks up, tail wagging or ears twitching as it instantly bonds to you with affection.",
    description: "Pet allows the caster to take mental control of a small creature, sending it off to scout, fetch, or perform some other complex task. While concentrating, the caster may access the animal's senses (sight, smell, hearing, and so on). The creature's SIZ and INS Characteristics may not exceed half the caster's CHA. The target can make a Willpower roll to resist but does not do so if the targeted creature is the already the loyal pet of the caster."
  },

  "polish": {
    name: "Polish",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "Creation",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You run your hand or breath the final word, and dull surfaces gleam with sudden luster \u2013 metal shines, wood glows, and even old boots look new.",
    description: "Polish instantly buffs an object of ENC in Things or SIZ of up to the caster's POW to a high sheen, making it glossy, shiny, and highly desirable even if the quality of the article is sub-par. The item loses its sheen normally over time."
  },

  "preserve": {
    name: "Preserve",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Ranger", rank: 0 }
    ],
    sphere: "Animal, Plant",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Turn",
    duration: "1d3 Months",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You murmur the final phrase, and the object takes on a faint shimmer. Decay halts, rot is held at bay, and time's touch is gently stayed.",
    description: "Preserve prevents organic matter, both vegetable and animal, from bacterial decay and putrefaction for 1d3 Months by sterilizing it. If the material is later smoked, pickled, or salted, it is preserved indefinitely. The spell can halt decay that has begun, but not reverse it. The caster can affect an amount of organic matter with SIZ or ENC in Things equal to their POW."
  },

  "protection": {
    name: "Protection",
    school: "Abjuration",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Druid", rank: 0 },
      { class: "Mage", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Trigger",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You complete the spell, and a faint barrier settles over you like a second skin. It hums softly, ready to deflect harm or soften a blow.",
    description: "Protection is useful in a wide range of tasks where there is a risk of accidental injury, such as working in a foundry or mine. The first time the character would normally take damage that penetrates protective clothing, armor, or other forms of magical protection, the Protection spell triggers and reduces the damage taken by another 1d3 points. The spell then dissipates. Protection may only be applied once to a single target. The spell only protects against physical damage so does not help against events such as fire, choking, and so on. Unlike the Armor spell, sleeping does not dissipate Protection. The Arcane version of this spell may only be cast on the caster."
  },

  "repair": {
    name: "Repair",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "2 Items or 1 Broken Item",
    castingTime: "1 Action",
    duration: "24 Hours",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You trace the break with your fingers, finishing the spell as fractured edges knit together. Chips vanish, tears mend, and the object is made whole once more.",
    description: "Repair fixes physical damage to an inanimate object. Each separate successful casting repairs 1d3 HP of damage."
  },

  "spiritshield": {
    name: "Spiritshield",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 0 }
    ],
    sphere: "Necromantic, Protection",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You finish the incantation, and a protective force, unseen yet tangible, rises to ward off spectral threats and harmful magic.",
    description: "This spell creates a shield around the recipient that deters spirits and ghosts from entering. Any spirit or ghost wishing to attack or possess the recipient must overcome the spell by winning an Opposed Test of their Willpower vs. the caster's Piety skill."
  },

  "tidy": {
    name: "Tidy",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "20'",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "With a snap or whispered word, clutter rights itself and mess vanishes. Clothes smooth, objects realign, and the space settles into neat order.",
    description: "Tidy immediately restores several items (up to the caster's POW) within the spell's range to a neat, tidy, and orderly fashion. Items larger than 3 Things shift to a more orderly position but require manual intervention to tidy properly."
  },

  "tune": {
    name: "Tune",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Mage", rank: 0 }
    ],
    sphere: "Bardic (Special)",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "Instrument",
    castingTime: "1 Action",
    duration: "One Performance",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You hum the final note, and the instrument responds \u2013 strings tighten, pipes clear, and every sound it makes rings perfectly in tune.",
    description: "Tune ensures that the musical instrument the caster touches is in perfect pitch no matter the dampness, temperature, or its general condition, ensuring such things do not affect its performance."
  },

  "voice": {
    name: "Voice",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 0 },
      { class: "Cleric", rank: 0 },
      { class: "Paladin", rank: 0 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Concentration",
    range: "See Below",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak the last word, and your voice takes on unnatural clarity and charm \u2013 each syllable crisp, compelling, and impossible to ignore.",
    description: "Voice amplifies the recipient's intonation and delivery so that it becomes compelling when they issue verbal commands. All who can hear the speaker must listen. The caster's vocalization also carries across and through even the loudest background noise (howling gales, the roar of a waterfall, the clash of arms on a battlefield) up to a range of 30 times the recipient's CHA in feet."
  }
,

  // =========================================================================
  //  RANK 1 SPELLS
  // =========================================================================

  "acid arrow": {
    name: "Acid Arrow",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "See Below",
    range: "500'",
    resist: "Evade or Shield Parry",
    intensityScaling: null,
    flavorText: "You release the spell, and a sizzling green bolt shoots toward the target, hissing as it eats through armor and flesh.",
    description: "A magical arrow of concentrated acid flies toward the target, who may Evade or Parry with a shield. If hit, the target suffers 1d4 acid damage to the location struck per Round for 1d2 consecutive Rounds, +1 Round per 2 Intensity. Armor protects but is destroyed as acid eats through it; remaining damage passes to the Hit Location. A Successful First Aid roll nullifies continuing effects. Requires a dart as a material component, consumed after use. At Intensity 1-2: 1d4 acid for 1d2+1 Rounds; at 3-4: 1d4 acid for 1d2+2 Rounds; continues."
  },

  "affect normal fires": {
    name: "Affect Normal Fires",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' Radius",
    castingTime: "1 Action",
    duration: "2 Hours/Intensity",
    range: "20'/Intensity",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Hours' },
      { field: 'range', base: 20, per: 20, unit: "'" }
    ],
    flavorText: "You finish the gesture. Nearby flames dim to candlelight or flare into bonfires \u2013 exactly as you command.",
    description: "The mage may command small fires to reduce to a candle flame or grow as large as a bonfire (3' diameter max). Alters all fires within the Area of Effect. Reducing fire halves fuel consumption; increasing it doubles consumption. Light and damage are proportional to the flames' new size."
  },

  "alarm": {
    name: "Alarm",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' Radius",
    castingTime: "1 Minute",
    duration: "4 Hours/Intensity",
    range: "30'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Hours' }
    ],
    flavorText: "You mark the area. An invisible ward locks into place, ready to shriek the moment it\u2019s disturbed.",
    description: "Select an object or area within range to produce a loud ringing if anything interacts with it or anything SIZ 1+ enters the area. Incorporeal, gaseous, invisible, levitating, and flying creatures set it off, but astral/ethereal entities do not. The caster may set parameters for allies. Ringing is heard within 60'. Can alarm a door, window, sword, chest, floor, ladder, or stairs. The mage can dispel it with a word."
  },

  "animal friendship": {
    name: "Animal Friendship",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Animal",
    castingTime: "1 Hour",
    duration: "Permanent",
    range: "30'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You reach out and speak gently. The creature\u2019s wariness melts away as trust takes hold.",
    description: "One animal of up to 6 SIZ per Intensity within range must make a Willpower roll or stand transfixed throughout the casting. Only non-sapient natural animals are affected. On completion, the animal becomes a faithful companion, able to learn tricks without training rolls (though time is still required). Max animal friends = half Willpower in total SIZ. Does not reduce Magic Points for Enduring Magic Costs. Can be dismissed by Dispel Magic or verbally."
  },

  "armor": {
    name: "Armor",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "See Below",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You snap your hand through the air, and a shimmer of force wraps your body like an unseen shell.",
    description: "Grants 4 Armor Points to each Hit Location as an invisible force field. No effect if cast on someone already wearing armor, but supersedes natural armor if superior. If cast on a creature with 4+ natural armor, increases all locations by 1 AP instead. No ENC, doesn't hinder movement or casting. Persists until dispelled or the caster takes 8 damage from a single attack, +1 per Intensity. Must be dropped to sleep. Intensity 1: 4 AP, sustained until 8 damage; Intensity 2: 4 AP, until 9 damage; continues."
  },

  "audible illusion": {
    name: "Audible Illusion",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "3 Minutes/Intensity",
    range: "100'/Intensity",
    resist: "Disbelieve",
    intensityScaling: [
      { field: 'duration', base: 3, per: 3, unit: ' Minutes' },
      { field: 'range', base: 100, per: 100, unit: "'" }
    ],
    flavorText: "You whisper the sound into being \u2013 a voice, a footstep, a scream \u2013 echoing just as you imagined.",
    description: "Creates an illusionary audible noise at any point within range, which may be moved at will. Max volume is roughly 4 people per Intensity. Examples: scurrying rats = Intensity 2, roaring lion = Intensity 4, dragon roar/explosion = Intensity 6. A Willpower Resistance Roll to Disbelieve is only allowed if the character has reason to doubt the noise."
  },

  "barkskin": {
    name: "Barkskin",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 1 }
    ],
    sphere: "Plant, Protection",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "4 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Minutes' }
    ],
    flavorText: "You touch the target, and their skin roughens into bark \u2013 knotted, tough, and thick as old wood.",
    description: "Toughens the recipient\u2019s skin to bark, granting 2 points of natural armor to all Hit Locations, +1 additional AP for every full 3 Intensity (e.g., 3 AP at Intensity 3, 4 AP at Intensity 6). Stacks with normal armor."
  },

  "bind": {
    name: "Bind",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "1 Minute/Intensity",
    range: "100'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' }
    ],
    flavorText: "You chant a word or snap your fingers, and the rope grips your target, locking limbs like chains of air.",
    description: "Command up to 20' of rope per Intensity to coil, loop, knot, tie, and vice versa. One command per Turn as a Free Action. Can bind creatures within 1' of the rope. A typical rope has 1 AP and 4 HP, susceptible to slashing, fire, and acid. Also works on chains and vines. Dispel Magic or the caster can end it early. Intensity 1: 20' rope, 1 Min; Intensity 2: 40', 2 Min; continues."
  },

  "bless": {
    name: "Bless",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "25' Radius",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "180'",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' }
    ],
    flavorText: "You speak a holy word. Your allies move with steady calm, each step touched by divine favor.",
    description: "May bless a single item or a group of allies within the Area of Effect. Blessed items radiate the caster\u2019s Alignment aura and cause 1d3 damage to opposing Outer Planes creatures on contact (added to weapon damage). As an AoE, all allies receive +5% to all skill rolls. Those already Engaged in melee do not gain benefits.",
    reverse: {
      name: "Curse",
      flavorText: "You speak a cruel word. Luck slips through your target\u2019s fingers, hands shake, and fate turns sour.",
      description: "The reverse of Bless, causing enemies to suffer the inverse of the benefits \u2014 -5% to all skill rolls."
    }
  },

  "blindness": {
    name: "Blindness",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Permanent unless mitigated",
    range: "30'/Intensity",
    resist: "Willpower",
    intensityScaling: [
      { field: 'range', base: 30, per: 30, unit: "'" }
    ],
    flavorText: "You finish the spell, and a shadow falls over your target\u2019s eyes, snuffing out their vision in an instant.",
    description: "Blinds one target, reducing sight to deep grayness. Cure Wounds has no effect; only Heal or Dispel Magic can restore sight. The original caster may also restore sight at any time. All actions requiring sight are at Herculean Difficulty Grade."
  },

  "blur": {
    name: "Blur",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "6 Rounds/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 6, per: 6, unit: ' Rounds' }
    ],
    flavorText: "Your form flickers and warps, like something seen through rippling water \u2013 impossible to track clearly.",
    description: "Blurs the caster\u2019s form, causing all physical attacks against them to increase by one Difficulty Grade. Successive attacks by the same opponent suffer -10%. The caster gains +5% to all Evade rolls against magical attacks. Detect Invisibility does not negate this; however, True Sight does."
  },

  "ceremony": {
    name: "Ceremony",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Hour",
    duration: "30 Minutes",
    range: "60'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You complete the rite, and sacred power settles over the moment \u2013 blessing a union, oath, or passage with divine presence.",
    description: "Perform religious rites varying by Rank. Rank 1: Coming of Age (+5% all skills for 24 hrs), Burial (Protection from Evil for 1 week), Dedication (initiate Lay Member), Marriage (couple may share Luck Points once/day). Rank 2: Consecrate Item, Funerary Rites (eternal rest, immune to undead animation), Investiture. Rank 3: Special Vows (immune to Curse), Consecrate Ground (repels undead), Anathematize (excommunication)."
  },

  "change appearance": {
    name: "Change Appearance",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "2d6 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You finish the spell. Your features ripple like liquid, and in seconds, a new face stares back from any reflection.",
    description: "Alters the caster\u2019s appearance to any humanoid or bipedal form. Height/weight change limited to \u00b15 SIZ. Can alter gender, hair, clothing, equipment, and facial features, even perfectly imitating another person. Subject to disbelief as an Illusion spell. Does not alter scent; if touched, the caster feels like their original shape."
  },

  "charm being": {
    name: "Charm Being",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'perIntensity' },
    costDisplay: "3/Intensity",
    area: "1 living human, demi-human, or humanoid",
    castingTime: "1 Action",
    duration: "1 Week/Intensity",
    range: "360'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak with gentle warmth. Your target\u2019s gaze softens \u2013 they now see a trusted friend.",
    description: "One sapient humanoid ceases hostilities and offers help/protection on a failed resist. Target won\u2019t obey suicidal or harmful commands. Any hostile act by the mage or allies breaks the charm. Must speak the target\u2019s language for complex requests. Large humanoids (SIZ 21-40) resist at Easy; Huge (SIZ 41+) at Very Easy. Must be living \u2014 no undead or constructs. After initial resist, 1 week before another attempt. Caster\u2019s MP total is reduced for Enduring Magic Costs."
  },

  "chill touch": {
    name: "Chill Touch",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Pale frost coils around your hand. When it strikes, icy energy jolts through your foe, numbing flesh and draining strength.",
    description: "The caster\u2019s hand glows pale blue. Touching a target causes 1d4 damage +1 per additional Intensity to one Hit Location. Worn armor offers no protection; magical AP and natural armor reduce damage normally. Also causes 1 Level of Fatigue per 2 Intensity (1 at Int 1, 2 at Int 3, etc.). Parry and Evade are valid defenses. Against undead: no damage, but they must make Opposed Willpower or be Turned for 1d4 Rounds +1 per additional Intensity."
  },

  "color cascade": {
    name: "Color Cascade",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "5' x 20' Wedge; 1 target/Intensity",
    castingTime: "1 Action",
    duration: "Instant",
    range: "0",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "Brilliant colors explode from your hands, pulsing in waves that blind and disorient your foes.",
    description: "Creates a wedge-shaped burst of color affecting 1 target per Intensity, closest first. Each victim gets a Willpower Resistance Roll. Results by Level of Success: 1 Success = Stunned for 1d4 Cycles; 2 Successes = Blinded for 1d4 Rounds; 3+ Successes = Unconscious for 2d4 Rounds. Large creatures (SIZ 21-40) resist at Easy; Huge (SIZ 41+) at Very Easy."
  },

  "combine": {
    name: "Combine",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "See Below",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You and your allies move as one. Your strengths and spells weave together for a single, stronger effect.",
    description: "Allows 3-5 casters of the same class to combine abilities. The primary caster (highest Channel skill) stands in a circle formed by others. Circle members provide 1 MP per Rank toward each spell, and grant +5% skill bonus per member. Generates 1 extra Intensity level per circle member (max 4 extra) for Turning and casting at no additional MP cost. Remains active while the circle is unbroken and encircling casters maintain Concentration."
  },

  "command": {
    name: "Command",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 1 }
    ],
    sphere: "Charm",
    cost: { base: 3, type: 'fixed' },
    costDisplay: "3",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "1 Round",
    range: "100'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak one word, sharp and sure \u2013 and the target obeys before they even think to resist.",
    description: "Utter a single word command to one living creature. On a failed resist, the victim spends the entire Round completing the action, wasting all Action Points. The command cannot directly injure the target, but secondary effects may (e.g., \u2018fall\u2019 while climbing). Subject must understand the caster\u2019s language. Example commands: Crawl, Die, Fall, Fumble, Sleep, Flee, Fly, Go, Halt, Leave, Rest, Run, Scream, Sink, Surrender."
  },

  "create water": {
    name: "Create Water",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Elemental (Water)",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "100'",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You raise your hand, and fresh water pours into being \u2013 filling cups, mouths, or thirsty earth.",
    description: "Creates 8 gallons of drinkable water per Intensity. Water lasts until consumed, evaporated, or spilled. Cannot be created where the caster cannot see or inside a creature. Water weighs about 1 Thing per 1/2 gallon.",
    reverse: {
      name: "Destroy Water",
      flavorText: "You whisper or snap your fingers. The water vanishes in a breath, leaving only dry ground behind.",
      description: "Evaporates water (including fog, steam, mist) in the same quantities as Create Water."
    }
  },

  "cure fatigue": {
    name: "Cure Fatigue",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "A soft touch and steady breath renew your target\u2019s strength. Weariness slips away like a shed cloak.",
    description: "The subject regains all lost Fatigue at a rate of 1 level per Round, even regaining consciousness if applicable.",
    reverse: {
      name: "Cause Fatigue",
      flavorText: "Your words land heavy, dragging your target down. Their shoulders sink, and exhaustion swallows them whole.",
      description: "Imparts 1 Level of Fatigue per Round until the subject reaches Comatose. Dispel Magic ends the spell early but any Fatigue already accrued remains."
    }
  },

  "cure minor wounds": {
    name: "Cure Minor Wounds",
    school: "Necromancy",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: 'fixed' },
    costDisplay: "3",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "You press your palm to the wound. Flesh knits beneath your touch, blood slows, and pain fades.",
    description: "Against a Minor Wound: heals all Hit Points in the injured location instantly. Against Serious or Major Wounds: no HP recovered, but stabilizes the location, stopping bleeding and preventing imminent death. Also lifts one minor complaint (headache, cold, warts, etc.). No effect on undead, creatures harmed only by iron/silver/magical weapons, or non-corporeal beings.",
    reverse: {
      name: "Cause Minor Wounds",
      flavorText: "You speak a jagged phrase. Your target\u2019s skin splits as if raked by invisible claws.",
      description: "Reduces the touched location\u2019s HP by 1d3+1. Cannot inflict a Serious Wound, always leaving at least 1 HP. Armor offers no protection. Large creatures (SIZ 21-40) resist at Easy; Huge (SIZ 41+) at Very Easy."
    }
  },

  "deafness": {
    name: "Deafness",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "Permanent unless mitigated",
    range: "180'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You end the spell with a sharp clap or whispered word. The world goes silent for your target, as if sound itself has vanished.",
    description: "Totally deafens one target. Only Heal or Dispel Magic can restore hearing; Cure Wounds has no effect. The original caster can restore hearing at any time. Complete hearing loss is profoundly distressing \u2014 all skill rolls are at Formidable; Herculean if also subjected to Blindness."
  },

  "detect evil": {
    name: "Detect Evil",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' x 360' Path",
    castingTime: "1 Round",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "Your senses tingle with divine judgment \u2013 malice and corruption glow like hot coals in your mind\u2019s eye.",
    description: "Detects emanations of Evil within a 10' wide path to full range. Reveals Evil-Aligned creatures but not traps, poison, or cursed items. Sensed through 3' wood, 1' stone, or 1\" metal. Only one 60\u00b0 arc may be scanned per minute. This is the Divine version.",
    reverse: {
      name: "Detect Good",
      flavorText: "You feel warmth and intent \u2013 selfless acts, good beings, and divine blessings shine gently before your inner vision.",
      description: "Functions identically to Detect Evil but reveals creatures with the Good Alignment."
    }
  },

  "detect charm": {
    name: "Detect Charm",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Paladin", rank: 1 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "2 Minutes/Intensity",
    range: "100'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "Your senses sharpen, and you spot a faint shimmer \u2013 a thread of unnatural charm coming from your target.",
    description: "Discern if one or more selected creatures are under the effects of Charm Being. A full minute\u2019s Concentration is required to scan one creature.",
    reverse: {
      name: "Hide Charm",
      flavorText: "You cloak the charm\u2019s presence like a veiled flame. To any onlooker, it appears completely ordinary.",
      description: "One creature may be shielded from Detect Charm for 6 hours/Intensity."
    }
  },

  "detect illusion": {
    name: "Detect Illusion",
    school: "Divination, Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: "Illusion",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Line of sight to 60'",
    castingTime: "1 Action",
    duration: "3 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 3, per: 3, unit: ' Minutes' }
    ],
    flavorText: "You blink, and the veil lifts. False images flicker and fade, leaving seams and shadows where truth should be.",
    description: "See illusions and phantasms for what they are, negating the need to Disbelieve. If the subject touches another being during the Duration, they can show them that an illusion is unreal. Part of both the School of Divination and the School of Illusion."
  },

  "detect magic": {
    name: "Detect Magic",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' x 60' Path",
    castingTime: "1 Action",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "You finish the spell, and faint blue auras glow like candlelight around enchanted objects and lingering spells.",
    description: "See a glowing blue aura around any magic item or spell effect in a 10' x 60' path. Standard Success deduces Intensity/Magnitude \u00b13; Critical Success gives exact value. 10% chance per Intensity of determining the specific type of magic. Aura projects through 3' wood, 1' stone, 1\" metal. One 60\u00b0 arc per minute. Summoned entities register for Magnitude x10 minutes in the area cast."
  },

  "detect poison": {
    name: "Detect Poison",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "You breathe deep. The air tingles with warning as your senses attune to the presence of poisons and toxins.",
    description: "Check one object or 5' area per minute to detect poison. Allows up to 10 checks per Intensity. If poison is present, 20% chance per Intensity of identifying the specific type (max 100%). Intensity 1: 10 min, 20% ID; Intensity 2: 20 min, 40%; Intensity 3: 30 min, 60%; Intensity 4: 40 min, 80%; Intensity 5: 50 min, 100%."
  },

  "detect snares and pits": {
    name: "Detect Snares and Pits",
    school: "Divination",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' x 40' Path",
    castingTime: "2 Actions",
    duration: "4 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Minutes' }
    ],
    flavorText: "Your eyes sweep the ground, and hidden dangers gleam in your awareness \u2013 tripwires, covered pits, and subtle triggers all revealed.",
    description: "Instantly discern snares, pits, deadfalls, and similar traps set by animals, giant insects, etc. Also detects simple primitive traps (missile traps, mantraps, hunting snares) and some natural hazards (quicksand, unsafe walls, sinkholes). Does not detect poisonous plants, naturally flooding caverns, or magical traps. Requires line of sight; one 60\u00b0 arc per Turn."
  },

  "detect undead": {
    name: "Detect Undead",
    school: "Divination, Necromancy",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: "Divination, Necromancy",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Line of sight to 60' +10'/additional Intensity",
    castingTime: "1 Round",
    duration: "30 Minutes",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You murmur a phrase, and a chill runs through you \u2013 warning of the cold, lurking presence of nearby undead.",
    description: "See a pale blue aura around any undead within line of sight to 60', +10' per additional Intensity. Caster must be motionless to focus. Standard Success detects presence but not type or Intensity; Critical Success deduces exact Intensity but not type. Aura projects through 3' wood, 1' stone, 1\" metal."
  },

  "disk of burden": {
    name: "Disk of Burden",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "3' wide disk",
    castingTime: "1 Action",
    duration: "30 Minutes/Intensity",
    range: "60'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 30, per: 30, unit: ' Minutes' }
    ],
    flavorText: "You gesture in the air, and an invisible platform appears at your side \u2013 ready to carry your load without complaint.",
    description: "Creates a shimmering 3' disk of force hovering 3' above the ground. Carries up to 20 ENC per Intensity (roughly 6 SIZ per Intensity). Concave to prevent items rolling off. Unbidden, it stays within 5' of the caster at Movement Rate 15'. Can be directed anywhere within 60' with concentration. Moving beyond 60' causes it to wink out. Cannot rise above 3'."
  },

  "dust devil": {
    name: "Dust Devil",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 }
    ],
    sphere: "Elemental (Air)",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Minutes",
    duration: "2 Minutes/Intensity",
    range: "100'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "You whirl your hand, and a column of swirling dust springs to life \u2013 spinning, dancing, and waiting for your command.",
    description: "Conjures a small air elemental (dust devil) \u2014 a whirlwind about 5' tall and 3' across the top. Must remain within 30' of the caster. Mundane weapons and non-magical attacks can harm it. Other air elementals can disperse it with a single hit. See Dust Devil in the Monster Manual."
  },

  "endure heat/cold": {
    name: "Endure Heat/Cold",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "90 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 90, per: 90, unit: ' Minutes' }
    ],
    flavorText: "You speak the spell, and protection settles over the target, shielding from extremes of temperature.",
    description: "Protects one creature from mundane extremes of heat or cold (subzero temperatures or desert heat). Provides complete protection against Heat Metal. Any magical heat or cold attack (dragon breath, Cone of Cold, etc.) automatically dispels the protection, but the protected individual ignores the first 10 points of damage in that Round (if matching element). For AoE spells, damage is reduced before being applied to Hit Locations."
  },

  "enlarge": {
    name: "Enlarge",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "5 Rounds/Intensity",
    range: "30'",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 5, per: 5, unit: ' Rounds' }
    ],
    flavorText: "You speak the empowering word, and the target swells. Muscles bulge, weapons stretch, and their presence looms, massive and unstoppable.",
    description: "Increases SIZ by an amount dependent on caster\u2019s Rank: Rank 1 = +4 SIZ (+20% height); Rank 2 = +8 SIZ (+50% height, +5' Movement); Rank 3 = +12 SIZ (double height, +10' Move); Rank 4 = +16 SIZ; Rank 5 = +20 SIZ. DM, HP, and SIZ-based Attributes recalculated. Larger targets are easier to hit with ranged attacks. Initiative reduced based on size increase. Equipment grows with the subject, gaining steps in Size, Reach, and Damage. Cannot exceed available physical space.",
    reverse: {
      name: "Reduce",
      flavorText: "You whisper the diminishing phrase, and the target shrinks. Armor hangs loose, weapons wobble, and their form turns small and uncertain.",
      description: "Applies the inverse effects of Enlarge. No Attribute can be reduced below 1."
    }
  },

  "entangle": {
    name: "Entangle",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20' Radius",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "250'",
    resist: "Brawn",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "You point to the ground and speak the final words. Vines and roots burst upward, lashing around legs and locking foes in place.",
    description: "All vegetation within the AoE comes alive and entangles creatures. Successful Brawn roll = half movement for Duration; Failed = completely entangled. One attempt to break free. Alternatively, a creature can cut free with a bladed weapon (1 minute per attempt, Combat Skill roll; each Level of Success reduces Duration by 10 min; Fumble entangles the weapon)."
  },

  "erase writing": {
    name: "Erase Writing",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Permanent",
    range: "60'",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You whisper the final word and sweep your hand across the text. Ink fades, runes vanish, and the parchment lies blank, as if untouched.",
    description: "Erases all writing from 1-2 facing pages, a scroll, or one spell from a spellbook. Scrolls and spellbooks make the roll 2 Difficulty Grades harder. Can erase 5 sq ft per Intensity on larger surfaces. Can remove magical glyphs/traps (Formidable difficulty, Intensity must equal or exceed Magnitude). If held by a creature, it may resist with Willpower. Only affects written words, not drawings."
  },

  "faerie fire": {
    name: "Faerie Fire",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 1 }
    ],
    sphere: "Weather",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "40' Radius",
    castingTime: "2 Actions",
    duration: "4 Minutes/Intensity",
    range: "250'",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Minutes' }
    ],
    flavorText: "You whisper a fey word, and glowing outlines shimmer into view, tracing every creature around you in light.",
    description: "All creatures within the AoE are outlined with a faint glow, visible even in complete darkness or if invisible. Removes all penalties from darkness or invisibility. Glow visible to 100' in magical darkness, 30' in partial lighting. Caster doesn\u2019t need to see targets, just know they\u2019re present. The glow itself is harmless."
  },

  "faerie lights": {
    name: "Faerie Lights",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "100' Radius/Intensity",
    castingTime: "1 Action",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' },
      { field: 'area', base: 100, per: 100, unit: "' Radius" }
    ],
    flavorText: "You finish the spell, and tiny orbs of colored light flicker to life \u2013 drifting like will-o\u2019-the-wisps through the air.",
    description: "Creates one of: 1d4 flickering lights resembling lanterns/torches with similar illumination; 1d4 glowing spheres like will-o\u2019-wisps; or 1 vaguely humanoid fire elemental shape. Directed without Concentration at any speed within the area. Lights wink out if they leave the AoE or Duration ends."
  },

  "familiar": {
    name: "Familiar",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'perIntensity' },
    costDisplay: "3/Intensity, +1 EXP",
    area: "1/2 mile Radius/Intensity",
    castingTime: "2d12 Hours",
    duration: "Special",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You complete the ritual, and from wind or shadow, the creature emerges. Its eyes meet yours with uncanny intelligence as the bond forms between you.",
    description: "Ritual spell (Formidable difficulty, once per year). Keep a brazier with charcoal and 100 GP of incense. Each additional Intensity extends range by 1/2 mile and reduces difficulty by 1 Grade. Costs 1 EXP to bond. Within 120' of the familiar, the mage can draw on its Magic Points and gains telepathic link + special abilities. If the familiar dies, the caster loses 5 EXP Rolls. Type determined by d100 roll (subtract 5% per Rank above 1)."
  },

  "feather fall": {
    name: "Feather Fall",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "5' Radius",
    castingTime: "Instant",
    duration: "1 Minute/Intensity",
    range: "30'/Intensity",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' },
      { field: 'range', base: 30, per: 30, unit: "'" }
    ],
    flavorText: "You finish the spell mid-fall, and gravity lets go. You drift down like a leaf on the breeze.",
    description: "Targets with combined SIZ no greater than Intensity x20 (including carried ENC at 3 ENC = 1 SIZ) fall at 10' per Round, taking no falling damage. Immune to knockback >5'. Aerial creatures must make a Hard Fly roll each Round to stay airborne at half speed. Instant Casting Time allows reactive use \u2014 can stop arrows or thrown weapons mid-flight."
  },

  "find traps": {
    name: "Find Traps",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Paladin", rank: 1 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10' x 100' Path",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "Your eyes narrow as the spell completes. Subtle seams, pressure plates, and hidden tripwires glow faintly in your vision.",
    description: "Detects all traps, mundane or magical, within line of sight out to 100'."
  },

  "flame blade": {
    name: "Flame Blade",
    school: "Evocation",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "3' long blade",
    castingTime: "2 Actions",
    duration: "3 Rounds, +1/additional Intensity",
    range: "0",
    resist: "Evade or Parry",
    intensityScaling: null,
    flavorText: "A tongue of fire curls into your hand, solidifying into a blazing blade that crackles with living heat.",
    description: "A scimitar-like blade of searing flame springs from the caster\u2019s hand. Uses Combat Skill to wield; deals 1d4+4 fire damage (ignores caster\u2019s Damage Modifier). +2 damage vs undead or fire-vulnerable creatures; -2 vs fire-resistant. Fire elementals and fire-based creatures are immune. Can be Parried. Worn armor offers half protection; magical AP and natural armor reduce normally. 5% chance per damage point to ignite flammable materials. Doesn\u2019t work underwater."
  },

  "flaming hands": {
    name: "Flaming Hands",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "120\u00b0 Cone, 5' long",
    castingTime: "1 Action",
    duration: "Instant",
    range: "0",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You thrust your hands forward, and twin jets of flame erupt from your fingers, sweeping out in a fan of scorching fire.",
    description: "Flames shoot from the hands in a 120\u00b0 arc, max Intensity 9. Int 1: 1d2 to 1 location; Int 3: 1d4 to 1 loc; Int 5: 1d6 to 1d4+1 contiguous locs; Int 7: 2d6 to 1d4+1 locs; Int 9: 3d6 to all locs. AP count as half; magic armor adds full Magic Bonus. SIZ 21-40 creatures take damage as 2 Intensity lower; SIZ 41+ as 4 lower (min 1 loc). Very short range. Can ignite flammable materials."
  },

  "friendship": {
    name: "Friendship",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "60' Radius",
    castingTime: "1 Action",
    duration: "1d4 Minutes/Intensity",
    range: "0",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "Your words carry an unnatural warmth, and suspicion melts away. The target looks at you with unshakable trust.",
    description: "Weaker Charm Being. Those who fail resist want to befriend the mage; all social interaction skills are 1 Grade easier. Won\u2019t cause enemies to switch sides \u2014 they\u2019d prefer to take the mage prisoner. Those who resist find the caster irritating; social skills become 1 Grade harder. No effect on non-sapient creatures, those with INS, undead, or constructs."
  },

  "goodberry": {
    name: "Goodberry",
    school: "Evocation, Transmutation",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "2d4 Fresh Berries",
    castingTime: "2 Actions",
    duration: "1 Day/Intensity",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "You whisper a blessing over a handful of berries, and they glow faintly. Each one now holds nourishment and gentle healing warmth.",
    description: "Magically boosts 2d4 fresh berries. Each provides nourishment equal to a full meal (feeds up to SIZ 20; larger creatures need more). Each berry heals 1 HP to one injured location with a Minor Wound or less. Max 4 HP healed per 24 hours. Druids/rangers of Rank 2+ and Detect Magic can identify them.",
    reverse: {
      name: "Badberry",
      flavorText: "With a crooked grin, you curse the berries in your palm. They look wholesome, but each bite brings cramps, bitterness, or worse.",
      description: "Spoils 2d4 berries that appear fresh. Failed Endurance roll causes all skill rolls to be one Difficulty Grade harder for 1 hour per berry eaten. Only a druid or ranger of Rank 3+ can see badberries for what they are."
    }
  },

  "grease": {
    name: "Grease",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "5' Radius",
    castingTime: "1 Action",
    duration: "2 Rounds/Intensity",
    range: "30'",
    resist: "See Below",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Rounds' }
    ],
    flavorText: "You flick your fingers, and a slick film coats the ground or an object \u2013 ready to send the unwary slipping or tumbling.",
    description: "Coats a surface with grease. Those in the AoE require a Hard Athletics or Acrobatics roll every Turn to remain standing. Fumble = 1d3 damage to random location. Max 5' movement from a standing stop; entering from outside allows previous speed but walking is Formidable. Can also grease an item (weapon, rope, saddle) \u2014 Athletics roll each use or drop/fall off it. Mage can end early; Dispel Magic also works."
  },

  "hypnotism": {
    name: "Hypnotism",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "15' Radius",
    castingTime: "1 Action",
    duration: "1 Minute/Intensity",
    range: "30'/Intensity",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' },
      { field: 'range', base: 30, per: 30, unit: "'" }
    ],
    flavorText: "You speak in a slow, rhythmic tone, and your target\u2019s eyes glaze over \u2013 drawn in by your voice, unable to look away.",
    description: "1 subject per Intensity within AoE is mesmerized, susceptible to simple suggestions (1-2 sentences). Must speak the targets\u2019 language for suggestions to take effect. Subjects won\u2019t follow suggestions that would cause obvious harm to themselves or loved ones. Any attack on a subject breaks the spell. Unfinished tasks simply expire with the Duration."
  },

  "identify": {
    name: "Identify",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Minute",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' }
    ],
    flavorText: "You hold the object, and knowledge floods your mind \u2013 its properties, history, and hidden power unfolding before you.",
    description: "Identify magical properties of one item by wearing/holding it as designed. On Success, one property revealed per minute. Activation words and charges are revealed. Cursed items may activate when first used \u2014 on Successful casting, a Willpower test avoids the curse (but doesn\u2019t dispel it). Requires a pearl worth 100+ GP ground to dust. A powdered Luckstone makes the roll 2 Grades easier and auto-reveals all properties."
  },

  "illusion, lesser": {
    name: "Illusion, Lesser",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "100' Radius/Intensity",
    castingTime: "1 Action",
    duration: "Concentration; See Below",
    range: "50'/Intensity",
    resist: "Disbelieve",
    intensityScaling: [
      { field: 'area', base: 100, per: 100, unit: "' Radius" },
      { field: 'range', base: 50, per: 50, unit: "'" }
    ],
    flavorText: "You trace a simple image or sound into the air, and the illusion takes shape \u2013 brief, convincing, and completely unreal.",
    description: "Creates a visual illusion of anything from a meadow to a dragon, within the AoE. No sound, odor, temperature, or texture. Lasts while the caster maintains Concentration or until touched/entered. The caster can maintain the illusion after contact by spending 1 MP and directing it to react appropriately. No actual damage, but the mind can be convinced of pain or sensation. Additional visual effects added as Free Actions."
  },

  "invisibility, lesser": {
    name: "Invisibility, Lesser",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "6 Hours/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 6, per: 6, unit: ' Hours' }
    ],
    flavorText: "With a whispered word, you blur and vanish. Only soft footsteps and shifting air hint that you\u2019re still there.",
    description: "Subject and carried gear become invisible to all natural sight (max 24 hours). Still detectable by hearing, touch, smell, Life Sense, Sonar, etc. Ends if the subject attacks (first attack is Very Easy melee or Easy ranged, with NO defense). Other actions (opening doors, talking, climbing, pickpocketing, non-combat spells) do not end it. Those under separate castings are invisible to each other."
  },

  "invisibility to animals": {
    name: "Invisibility to Animals",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "You finish the spell, and the animal\u2019s eyes slide past you as if you\u2019re part of the scenery.",
    description: "Renders the recipient completely undetectable by non-sapient animals and insects (those with INS and no magical abilities). Giant versions of normal animals are affected. Unlike Invisibility, this completely masks noise and scent, including normal conversation. Any attack by the recipient ends the enchantment."
  },

  "invisibility to undead": {
    name: "Invisibility to Undead",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 1 }
    ],
    sphere: "Necromantic",
    cost: { base: 3, type: 'fixed' },
    costDisplay: "3",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "6 Minutes",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A chill wraps around you, dimming your life force. Nearby undead drift past, blind to your presence.",
    description: "Makes the recipient invisible to undead. Intensity 4 or lower undead automatically lose track. Intensity 5+ can attempt Willpower to resist. Ends if the recipient makes any attack. Non-combat spells (Cure Minor Wounds, Detect Magic, Chant) don\u2019t break it. Turn Undead can still be used but only on undead already aware of the cleric."
  },

  "jump": {
    name: "Jump",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "1d3 Rounds, +1/additional Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Magic coils through your legs, and with a single bound, you soar farther than muscle alone ever could.",
    description: "One leap per Round: 10' vertical, 30' forward, or 10' backward. Consumes all normal movement. Almost no arc. Athletics or Acrobatics to land safely \u2014 Failure = stumble + Regain Footing; Fumble = fall damage (half distance) + Regain Footing. If grabbing a hold: Crit = good hold + pull up as Free Action; Success = Brawn to pull up; Failure = poor hold + Hard Brawn; Fumble = missed hold + full fall."
  },

  "know languages": {
    name: "Know Languages",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Minute",
    duration: "5 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 5, per: 5, unit: ' Minutes' }
    ],
    flavorText: "As the spell settles, foreign words shift in your mind \u2013 flowing into meaning you instantly understand.",
    description: "Understand and read almost any non-magical language. Only true languages of sapient beings \u2014 not animal speech. Must touch the object or creature. Does not allow speaking or writing the language.",
    reverse: {
      name: "Confuse Languages",
      flavorText: "You twist the spell, and familiar words unravel into gibberish \u2013 meaning lost in a tangle of nonsense.",
      description: "Renders a creature\u2019s speech unintelligible or written text indecipherable. May also be used to counter Know Languages as it is being cast."
    }
  },

  "leonard's false trap": {
    name: "Leonard's False Trap",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'fixed' },
    costDisplay: "1",
    area: "Object Touched",
    castingTime: "1 Action",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch the object or door, and a false trap flickers into view \u2013 menacing, harmless, and all too convincing.",
    description: "Places a false trap on a small mechanism (doorknob, lock, hinge, etc.). A Perception roll always detects the trap, as do trap-revealing spells. However, triggering it does nothing. No more than one casting may affect a 50' area."
  },

  "levitate": {
    name: "Levitate",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "10 Minutes/Intensity",
    range: "60'/Intensity",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' },
      { field: 'range', base: 60, per: 60, unit: "'" }
    ],
    flavorText: "You rise gently into the air, untethered by gravity \u2013 floating with the ease of a leaf on the breeze.",
    description: "Levitate one target of no more than 6 SIZ per Intensity. Others move vertically at 5' per Round; if cast on self, 10' per Round. Only requires Concentration when changing elevation. No horizontal movement granted, but subjects can pull along walls if within reach. Unwilling targets may resist with Willpower. The caster may end the spell at will."
  },

  "light": {
    name: "Light",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "10' Radius/Intensity",
    castingTime: "1 Action",
    duration: "See Below",
    range: "150'/Intensity",
    resist: "See Below",
    intensityScaling: [
      { field: 'area', base: 10, per: 10, unit: "' Radius" },
      { field: 'range', base: 150, per: 150, unit: "'" }
    ],
    flavorText: "You speak the magic words, and steady radiance spills forth \u2013 chasing back the darkness with calm, unwavering glow.",
    description: "Arcane version. A globe of light appears at a spot of the caster\u2019s choosing (object or thin air). Duration: 1 hour per Intensity; at Rank 2+ with 3 Intensity = Permanent (Continual Light). If cast on a creature, Willpower to resist; failure affects the area behind the creature. If cast on eyes, Failed Willpower = partial blindness (+1 Difficulty Grade to sight-based rolls). Immobile but can be cast on portable objects."
  },

  "light (divine)": {
    name: "Light (Divine)",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Cleric", rank: 1 }
    ],
    sphere: "Sun",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "20' Radius",
    castingTime: "2 Actions",
    duration: "30 Minutes/Intensity",
    range: "360'",
    resist: "N/A (Willpower)",
    intensityScaling: [
      { field: 'duration', base: 30, per: 30, unit: ' Minutes' }
    ],
    flavorText: "You whisper the final words of your prayer, and a gentle radiance flows outward \u2013 pushing back the darkness with calm, sacred light.",
    description: "Divine version. A globe of light appears at a spot of the caster\u2019s choosing. Duration: 30 min per Intensity; at Rank 2+ with 3 Intensity = Permanent (Continual Light). If cast on a creature, Willpower to resist. If cast on eyes, Failed Willpower = partial blindness. Immobile but can be cast on portable objects.",
    reverse: {
      name: "Darkness",
      flavorText: "With a whispered prayer, the light vanishes. The world dims as magical blackness rolls outward from the source.",
      description: "Creates a sphere of utter and total darkness. Functions in all ways as the reverse of the Divine Light spell."
    }
  },

  "locate animals or plants": {
    name: "Locate Animals or Plants",
    school: "Divination",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Divination, Animal, Plant",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "300' Radius/Intensity",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "Willpower",
    intensityScaling: [
      { field: 'area', base: 300, per: 300, unit: "' Radius" },
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' }
    ],
    flavorText: "You speak the spell, and your senses stretch outward \u2013 drawing you toward the nearest beast or bloom that matches your desire.",
    description: "Divines the location of a chosen type of animal or plant. Concentrate for 1 minute to detect presence. Returns general area and distance. Centered on the caster and moves with them. Not stopped by intervening terrain. Chance of the specific creature being within range: common 50%, uncommon 30%, rare 15%, very rare 5%."
  },

  "magic aura": {
    name: "Magic Aura",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "24 Hours/Intensity",
    range: "Touch",
    resist: "See Below",
    intensityScaling: [
      { field: 'duration', base: 24, per: 24, unit: ' Hours' }
    ],
    flavorText: "You cloak an object in deceptive energy, making the mundane seem enchanted, or magic feel completely inert.",
    description: "Imbues an object (up to 50 SP per Intensity) with a false magical aura detectable by Detect Magic. The caster chooses the aura type (Illusionary, Transmutation, etc.). To mask a real magic item, Intensity must exceed the item\u2019s Magnitude. Identify reveals the aura after 1 min; with Intensity > Magnitude, can detect the false aura after another min. Dispel Magic must exceed the Magic Aura\u2019s Magnitude."
  },

  "magic missile": {
    name: "Magic Missile",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1-5 Targets",
    castingTime: "1 Action",
    duration: "Instant",
    range: "100'/Intensity",
    resist: "See Below",
    intensityScaling: [
      { field: 'range', base: 100, per: 100, unit: "'" }
    ],
    flavorText: "Glowing darts of pure force leap from your fingertips, striking your target unerringly with crackling precision.",
    description: "One or more missiles of magical energy. Max missiles = caster\u2019s Rank, each costing 1 additional Intensity. Missiles strike unerringly (even in melee/partial cover); cannot be Evaded. Total cover blocks them. Shield spell deflects automatically. Each deals 1d6+1 damage, ignoring non-magical armor. Magic armor applies only Magic Bonus; natural armor offers full protection. No damage to inanimate objects. Multiple missiles can target different creatures; each hits a random Hit Location."
  },

  "magical stone": {
    name: "Magical Stone",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Elemental (Earth)",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Up to 3 pebbles",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "Touch",
    resist: "Hard Evade or Shield Parry",
    intensityScaling: null,
    flavorText: "You whisper ancient words over the stones, and they shimmer faintly \u2013 now charged to strike with surprising force.",
    description: "Enchant up to 3 pebbles (1 per Intensity). Throw up to 100'. Requires Combat Skill roll. Can throw individually (1 per Action) or 2-3 at once (Success = 1d2 or 1d3 hit). Each deals 1d4 damage (no Damage Bonus); undead take 2d4. Evade is Formidable; Shield Parry is Hard. Worn armor provides no protection; magical AP and natural armor reduce normally. Magic lasts 30 min or until used."
  },

  "message": {
    name: "Message",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "5 Minutes/Intensity",
    range: "30'/Intensity",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 5, per: 5, unit: ' Minutes' },
      { field: 'range', base: 30, per: 30, unit: "'" }
    ],
    flavorText: "You cup your hand and speak softly. Your words ride a thin thread of magic, reaching a distant ear unheard by others.",
    description: "Whisper to 1 creature per Intensity. Targeted creatures can whisper back. Requires relatively clear line of sight within range. Communication ends if a recipient moves out of sight or range, but can be reestablished if they return."
  },

  "messenger": {
    name: "Messenger",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Minute",
    duration: "1 Day/Intensity",
    range: "1 mile/Intensity",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Days' },
      { field: 'range', base: 1, per: 1, unit: ' mile(s)' }
    ],
    flavorText: "You breathe a name into the air, and a magical courier \u2013 bird, breeze, or beast \u2013 takes shape to carry your words far away.",
    description: "Calls a small animal (SIZ 1-4, INS 10+) to deliver a small item or note. 20% chance per Intensity that a suitable animal is within range. Animal may resist with Willpower. Caster gives simple directions to a specific location. Anyone may retrieve the message; the caster can set conditions for approach. Requires food appropriate to the animal as a material component. Intensity 1: 1 day, 1 mile, 20%; Intensity 5: 5 days, 5 miles, 100%."
  },

  "misdirection": {
    name: "Misdirection",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'fixed' },
    costDisplay: "3",
    area: "1 Target or Object",
    castingTime: "1 Action",
    duration: "8 Hours",
    range: "100'",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "With a sly smile, you bend perception. Detection spells point elsewhere, chasing false trails.",
    description: "Misdirects detection spell results (Detect Magic, Detect Undead, etc.) if the subject Fails Willpower. The spell produces false results for its Duration. Detect Evil/Good reveals the opposite of truth. No effect on Divination spells (Augury, Clairvoyance, Know Alignment, Read Thoughts)."
  },

  "pass without trace": {
    name: "Pass Without Trace",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 10, per: 10, unit: ' Minutes' }
    ],
    flavorText: "With a quiet word, your steps leave no trail \u2013 no footprints, broken branches, or scent to follow.",
    description: "The subject moves through overgrown woods, deep snow/dust, or mud at normal Movement Rate, leaving no trail, scent, or evidence. However, for 1d6x10 minutes, Detect Magic can sense and follow the creature\u2019s magical aura."
  },

  "predict weather": {
    name: "Predict Weather",
    school: "Divination",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: "Weather",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "5 mile Radius",
    castingTime: "1 Minute",
    duration: "Instant",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You gaze skyward and speak the final phrase. Your mind fills with impressions of storms, sun, or shifting winds soon to come.",
    description: "Predicts weather with complete accuracy within a 5-mile radius. Covers the next 4 hours per Intensity. Includes temperature, precipitation, snow accumulation, wind speed, and other conditions."
  },

  "protection from cantrips": {
    name: "Protection from Cantrips",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "4 Hours/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Hours' }
    ],
    flavorText: "You draw a faint sigil over yourself, warding off minor magical nuisances. Tricks and pranks fizzle before they can take shape.",
    description: "Subject becomes immune to cantrips. Can also be cast on objects. Instead of a single target, can protect an area with 5' radius per Intensity \u2014 all cantrips in the area fail with a \u2018pop.\u2019 Area protection doesn\u2019t travel with objects removed from it. Intensity 1: 4 hrs, 1 target or 5' radius; Intensity 2: 8 hrs, 10' radius; continues."
  },

  "protection from evil": {
    name: "Protection from Evil",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "2 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "A soft radiance surrounds you as the spell settles, driving back malign forces with quiet divine strength.",
    description: "Creates an invisible 12\" aura of protection. Three benefits: (1) Evil creatures\u2019 attacks suffer \u201310% penalty; recipient gains +10% to Resistance Rolls vs Evil. (2) Summoned/conjured beings and extraplanar entities cannot physically touch the target (natural attacks fail, but held weapons can penetrate). (3) Mental control (Charm Being, Command) and possession (Magic Jar) automatically fail. Ends if the protected individual makes a melee attack or forces the barrier.",
    reverse: {
      name: "Protection from Good",
      flavorText: "Dark energy coils around you, shielding you from sacred influence and benevolent interference.",
      description: "Functions identically for benefits 2 and 3, but applies benefit 1 against Good-Aligned creatures."
    }
  },

  "purify food and drink": {
    name: "Purify Food and Drink",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 }
    ],
    sphere: "All",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "5' Radius",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "100'",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch the meal or cup, and a subtle shimmer flows through it \u2013 cleansing rot, filth, and toxins with quiet divine grace.",
    description: "Removes all poison, rot, and contaminants from one average-sized meal of food or water per Intensity within the AoE. Also purifies unholy water.",
    reverse: {
      name: "Contaminate Food and Drink",
      flavorText: "You mutter a corrupt phrase, and fresh food and water sour at your touch \u2013 spoiled, tainted, and dangerous to consume.",
      description: "Spoils food, corrupts holy water, and renders pure water undrinkable."
    }
  },

  "read magic": {
    name: "Read Magic",
    school: "All",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 0 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Minute",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "You pass your hand over the Arcane script, and its meaning unfolds in your mind \u2013 like pages turning in a familiar book.",
    description: "Read magical writings of other spellcasters. A mage can always read their own texts without this spell. Does not usually activate scroll spells, but cursed scrolls may trigger. Takes 1 minute per spell Rank to identify a spell. Once read, inscriptions don\u2019t need to be re-read \u2014 but reading the same spell from a different source requires recasting. Available to all Schools of Magic."
  },

  "reflect gaze": {
    name: "Reflect Gaze",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "You touch your face with the last words, and a protective shimmer flares to life \u2013 ready to reflect any magical gaze.",
    description: "Creates a veil of air before the caster\u2019s face that reflects any gaze-based attack (medusa, vampire, basilisk) back at the attacker. Only the caster benefits. Does not obstruct line of sight for anyone."
  },

  "remove fear": {
    name: "Remove Fear",
    school: "Abjuration, Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 1 }
    ],
    sphere: "Charm",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "See Below",
    range: "30'/Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You speak with calm authority, and a wave of strength washes over the target. Panic fades, resolve burns steady.",
    description: "Banishes fear from 1 individual per Intensity, granting an additional Resistance Roll one Difficulty Grade easier. Can also provide a Divine ward against fear for 10 minutes if cast on someone not yet affected. The cleric can ward themselves but cannot remove ongoing fear that prevents spellcasting. Range: 30' per Intensity.",
    reverse: {
      name: "Cause Fear",
      flavorText: "A whispered threat curls into magic \u2013 terror blooms without cause, clutching at their mind like shadowed hands.",
      description: "Requires physical contact in combat. Failed Willpower causes the victim to flee in terror at a Sprint for 1d4 Rounds. Can be countered by Remove Fear, and vice versa."
    }
  },

  "sanctuary": {
    name: "Sanctuary",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "Protection",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "2 Minutes, +1/additional Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A gentle glow surrounds you. Foes hesitate, their hands unwilling to strike against your sacred protection.",
    description: "The subject becomes protected and concealed. To target them, an enemy must succeed on a Willpower Resistance Roll Opposed by the caster\u2019s Channel result. Failure = attacker loses track of subject for the Duration. No protection from AoE spells (Fireball, Cone of Cold). Ends immediately if the subject attacks or casts a spell targeting an enemy. Non-hostile actions (First Aid, Cure Minor Wounds, Bless, Light) do not break the effect."
  },

  "secure portal": {
    name: "Secure Portal",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Portal",
    castingTime: "1 Action",
    duration: "1 Minute/Intensity",
    range: "60'/Intensity",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Minutes' },
      { field: 'range', base: 60, per: 60, unit: "'" }
    ],
    flavorText: "You touch the door and speak the phrase. Latches click, bolts slide, and it seals shut.",
    description: "Holds shut one door, gate, portcullis, or similar (wood, stone, or metal) as if securely locked. Barrier can have up to 30 HP per Intensity. Can be battered down but not opened normally. Caster may end at any time. Broken by Dispel Magic or Unlock, or automatically disrupted by extraplanar creatures. Does not block teleportation (e.g., Blink)."
  },

  "shield": {
    name: "Shield",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "5 Rounds/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 5, per: 5, unit: ' Rounds' }
    ],
    flavorText: "An invisible barrier flares to life before you, floating like a translucent disk \u2013 ready to deflect blows and missiles alike.",
    description: "Creates an invisible, mobile disk of force hovering in front of the mage. Provides 4 AP against all attacks from that direction. No skill roll required \u2014 automatically interposes. Also deflects Magic Missiles automatically. Only blocks damage from the caster\u2019s front squares."
  },

  "shillelagh": {
    name: "Shillelagh",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 1 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "4 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Minutes' }
    ],
    flavorText: "You grasp your wooden weapon, and it swells with primal strength \u2013 hardening to strike like iron, humming with druidic power.",
    description: "Transforms the druid\u2019s oaken cudgel into a magical shillelagh. The weapon gains double its normal Hit Points and deals 2d4 damage. If wielded by anyone other than the druid, it reverts to a normal club. Can harm creatures requiring +1 magic weapons."
  },

  "shocking touch": {
    name: "Shocking Touch",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "See Below",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Your hand crackles with caged lightning. When it strikes, the jolt surges through your foe, seizing muscle and searing flesh.",
    description: "One touched target takes 1d6 damage +1 per additional Intensity to a single Hit Location. Natural and worn armor offer no protection; only magical armor applies (Magic Bonus only). Parry and Evade may be used before contact. Can be discharged into a conductor (railing, floor grate) \u2014 only the nearest creature takes damage to body parts in contact. The caster must initiate contact."
  },

  "silence": {
    name: "Silence",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 1 }
    ],
    sphere: "Guardian",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "15' Radius",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "360'",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "With a subtle gesture, all sound vanishes from the area \u2013 speech, footsteps, even magic itself falls quiet.",
    description: "Creates complete silence in the AoE. No sound is possible; spells with verbal components cannot be cast. If cast on a creature/object, the AoE moves with it. If cast into open air, it\u2019s stationary. Duration: 2 min/Intensity (willing) or 2 Rounds/Intensity (unwilling). Willpower Resistance Roll for unwilling targets; Success = spell affects the occupied area instead, immobile."
  },

  "sleep": {
    name: "Sleep",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10' Radius",
    castingTime: "1 Action",
    duration: "5 Minutes/Intensity",
    range: "60'",
    resist: "Willpower",
    intensityScaling: [
      { field: 'duration', base: 5, per: 5, unit: ' Minutes' }
    ],
    flavorText: "You weave a lullaby of magic. Eyes droop, heads nod, and your enemy sinks into enchanted slumber.",
    description: "1 living creature per Intensity in a 10' radius falls asleep. Closest resists first, then next closest. In-combat or alert creatures resist 1 Grade easier. Large (SIZ 21-40) resist at Easy; Huge (SIZ 41+) at Very Easy. Smaller creatures (SIZ 20-) always affected before larger. Sleeping creatures are helpless; they don\u2019t wake from noise but can be shaken, slapped, or attacked awake (takes 1 Combat Round)."
  },

  "slow poison": {
    name: "Slow Poison",
    school: "Necromancy",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 1 },
      { class: "Druid", rank: 1 },
      { class: "Paladin", rank: 1 }
    ],
    sphere: "Healing",
    cost: { base: 3, type: 'plusPerAdditional', perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "1 Hour/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 1, per: 1, unit: ' Hours' }
    ],
    flavorText: "You grasp the poisoned creature and whisper a stabilizing word. The venom slows its crawl, buying precious time.",
    description: "Delays poison\u2019s progress; Onset Time doesn\u2019t begin until the spell\u2019s Duration expires. If cast after symptoms begin, they pause for the Duration, then resume. As a last resort, if cast within 10 minutes of a poison death, delays death for 1 hour/Intensity (victim in a coma). If cured during this window, victim can survive with First Aid or magical healing."
  },

  "spider climb": {
    name: "Spider Climb",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "2 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 2, per: 2, unit: ' Minutes' }
    ],
    flavorText: "You finish the spell and touch a surface. Instantly, any wall or ceiling feels like solid ground beneath your feet and hands.",
    description: "Move along vertical surfaces and ceilings at 10' Movement Rate, even upside down. All hand/footwear must be removed. Objects with negligible ENC stick to hands, preventing handling and typically blocking spellcasting. To remove the subject from a surface or pull an object free requires Formidable Brawn."
  },

  "unlock (lock)": {
    name: "Unlock (Lock)",
    school: "Alteration",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "1 Object",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "None",
    intensityScaling: null,
    flavorText: "You press your palm against the lock and speak a word of opening. Tumblers click, bars slide, and the way is clear.",
    description: "Magically opens a single locked door, chest, gate, shackle, or similar mechanism without the key, even if it has been secured by the Lock spell or a mundane lock. The caster must touch the object to be unlocked. The Intensity of the Unlock must equal or exceed the Intensity of any Lock spell upon it. Mundane locks are automatically opened. Magical locks (such as Mage Lock or Secure Portal) are suppressed for 1 Round, allowing the door to be opened during that time.",
    reverse: {
      name: "Lock",
      flavorText: "You trace a sigil over the mechanism, and it seals shut with a resonant click — no key can turn it, no hand can pry it open.",
      description: "When reversed, Lock magically secures a single door, chest, gate, or similar mechanism. The locked object can only be opened by the caster, by a successful Unlock spell of equal or greater Intensity, or by Dispel Magic. The lock persists until dispelled or opened by the caster. Physical force can break through, but the mechanism itself cannot be picked or forced by mundane means."
    }
  },

  "unseen servant": {
    name: "Unseen Servant",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "30' Radius",
    castingTime: "1 Action",
    duration: "30 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: [
      { field: 'duration', base: 30, per: 30, unit: ' Minutes' }
    ],
    flavorText: "You finish the spell, and the air shimmers faintly. An invisible helper stands ready, awaiting your silent command.",
    description: "Summons a mindless magical force within 30' that performs simple tasks (fetching, carrying, mending, opening doors, cleaning). Cannot attack or cause damage. Carries up to 6 ENC (2 SIZ) or pushes/drags up to 12 ENC (4 SIZ). Must remain in AoE. Subject to Dispel Magic; destroyed by 6+ damage from area effects."
  },

  "ventriloquism": {
    name: "Ventriloquism",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 1 }
    ],
    sphere: null,
    cost: { base: 1, type: 'perIntensity' },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "4 Minutes/Intensity",
    range: "30'/Intensity",
    resist: "See Below",
    intensityScaling: [
      { field: 'duration', base: 4, per: 4, unit: ' Minutes' },
      { field: 'range', base: 30, per: 30, unit: "'" }
    ],
    flavorText: "You throw your voice with magical precision, making it echo from across the room \u2013 behind a curtain, inside a barrel, or from a statue\u2019s mouth.",
    description: "Make the caster\u2019s voice (or any producible sound) seem to come from another location \u2014 behind a door, down a hallway, inside a chest, or from another creature. A Formidable Perception test is required to identify the caster as the true source."
  },

  // =========================================================================
  //  RANK 1 REVERSE / ALIAS ENTRIES
  // =========================================================================

  "curse": { name: "Curse", aliasOf: "bless", version: "reverse" },
  "bless (curse)": { name: "Bless (Curse)", aliasOf: "bless", version: "primary" },

  "destroy water": { name: "Destroy Water", aliasOf: "create water", version: "reverse" },
  "create water (destroy water)": { name: "Create Water (Destroy Water)", aliasOf: "create water", version: "primary" },

  "cause fatigue": { name: "Cause Fatigue", aliasOf: "cure fatigue", version: "reverse" },
  "cure fatigue (cause fatigue)": { name: "Cure Fatigue (Cause Fatigue)", aliasOf: "cure fatigue", version: "primary" },

  "cause minor wounds": { name: "Cause Minor Wounds", aliasOf: "cure minor wounds", version: "reverse" },
  "cure minor wounds (cause minor wounds)": { name: "Cure Minor Wounds (Cause Minor Wounds)", aliasOf: "cure minor wounds", version: "primary" },

  "detect good": { name: "Detect Good", aliasOf: "detect evil", version: "reverse" },
  "detect evil (detect good)": { name: "Detect Evil (Detect Good)", aliasOf: "detect evil", version: "primary" },

  "hide charm": { name: "Hide Charm", aliasOf: "detect charm", version: "reverse" },
  "detect charm (hide charm)": { name: "Detect Charm (Hide Charm)", aliasOf: "detect charm", version: "primary" },

  "reduce": { name: "Reduce", aliasOf: "enlarge", version: "reverse" },
  "enlarge (reduce)": { name: "Enlarge (Reduce)", aliasOf: "enlarge", version: "primary" },

  "badberry": { name: "Badberry", aliasOf: "goodberry", version: "reverse" },
  "goodberry (badberry)": { name: "Goodberry (Badberry)", aliasOf: "goodberry", version: "primary" },

  "confuse languages": { name: "Confuse Languages", aliasOf: "know languages", version: "reverse" },
  "know languages (confuse languages)": { name: "Know Languages (Confuse Languages)", aliasOf: "know languages", version: "primary" },

  "darkness": { name: "Darkness", aliasOf: "light (divine)", version: "reverse" },
  "light (darkness)": { name: "Light (Darkness)", aliasOf: "light (divine)", version: "primary" },

  "contaminate food and drink": { name: "Contaminate Food and Drink", aliasOf: "purify food and drink", version: "reverse" },
  "purify food and drink (contaminate food and drink)": { name: "Purify Food and Drink (Contaminate Food and Drink)", aliasOf: "purify food and drink", version: "primary" },

  "protection from good": { name: "Protection from Good", aliasOf: "protection from evil", version: "reverse" },
  "protection from evil (protection from good)": { name: "Protection from Evil (Protection from Good)", aliasOf: "protection from evil", version: "primary" },

  "cause fear": { name: "Cause Fear", aliasOf: "remove fear", version: "reverse" },
  "remove fear (cause fear)": { name: "Remove Fear (Cause Fear)", aliasOf: "remove fear", version: "primary" },

  // Convenience aliases for comma-form names
  "lesser illusion": { name: "Lesser Illusion", aliasOf: "illusion, lesser", version: "primary" },
  "lesser invisibility": { name: "Lesser Invisibility", aliasOf: "invisibility, lesser", version: "primary" },
  "endure heat": { name: "Endure Heat", aliasOf: "endure heat/cold", version: "primary" },
  "endure cold": { name: "Endure Cold", aliasOf: "endure heat/cold", version: "primary" },
  "leonard's trap": { name: "Leonard's Trap", aliasOf: "leonard's false trap", version: "primary" },
  "false trap": { name: "False Trap", aliasOf: "leonard's false trap", version: "primary" },

  // Unlock (Lock) aliases
  "unlock": { name: "Unlock", aliasOf: "unlock (lock)", version: "primary" },
  "lock": { name: "Lock", aliasOf: "unlock (lock)", version: "reverse" },
  "lock (unlock)": { name: "Lock (Unlock)", aliasOf: "unlock (lock)", version: "reverse" }

};


// =========================================================================
//  LOOKUP UTILITIES
// =========================================================================

const SpellDetailsLookup = {

  /**
   * Look up full spell details by name.
   * Handles aliases, combined/reverse spells, and case-insensitive matching.
   * @param {string} spellName - The spell name to look up
   * @returns {Object|null} - Full spell details or null
   */
  get(spellName) {
    if (!spellName) return null;
    const key = spellName.trim().toLowerCase();

    let entry = SpellDetails[key];
    if (!entry) {
      // Try partial match: strip trailing parenthetical
      const baseKey = key.replace(/\s*\([^)]*\)\s*$/, '').trim();
      entry = SpellDetails[baseKey];
    }
    if (!entry) return null;

    // If it's an alias, resolve to the canonical entry
    if (entry.aliasOf) {
      const canonical = SpellDetails[entry.aliasOf];
      if (!canonical) return null;

      // Return a merged view based on which version (primary or reverse)
      if (entry.version === 'reverse' && canonical.reverse) {
        return {
          ...canonical,
          name: canonical.reverse.name,
          flavorText: canonical.reverse.flavorText,
          description: canonical.reverse.description,
          isReverse: true,
          canonicalName: canonical.name,
          _originalName: canonical.name,
          _originalDescription: canonical.description
        };
      }
      // Primary version — return the canonical entry as-is
      return { ...canonical, isReverse: false };
    }

    return { ...entry, isReverse: false };
  },

  /**
   * Get the spell rank (0-5) from the spell's class list.
   * Returns the lowest rank found across all classes.
   * @param {string} spellName
   * @returns {number|null}
   */
  getSpellRank(spellName) {
    const details = this.get(spellName);
    if (!details || !details.classes) return null;
    return Math.min(...details.classes.map(c => c.rank));
  },

  /**
   * Check if a spell belongs to a specific class.
   * @param {string} spellName
   * @param {string} className - e.g., "Mage", "Cleric"
   * @returns {boolean}
   */
  isClassSpell(spellName, className) {
    const details = this.get(spellName);
    if (!details || !details.classes) return false;
    return details.classes.some(c => c.class.toLowerCase() === className.toLowerCase());
  },

  /**
   * Get the casting skill field ID for a given class.
   * @param {string} className
   * @returns {string|null} - The DOM field ID for the casting skill percentage
   */
  getCastingSkillId(className) {
    const map = {
      'cleric': 'channel-percent',
      'paladin': 'channel-percent',
      'ranger': 'channel-percent',
      'druid': 'channel-percent',
      'anti-paladin': 'channel-percent',
      'mage': 'arcane-casting-percent',
      'magic-user': 'arcane-casting-percent',
      'sorcerer': 'arcane-sorcery-percent',
      'bard': 'musicianship-percent'
    };
    return map[className.toLowerCase()] || null;
  },

  /**
   * Get the casting skill name for display in the modal.
   * @param {string} className
   * @returns {string}
   */
  getCastingSkillName(className) {
    const map = {
      'cleric': 'Channel',
      'paladin': 'Channel',
      'ranger': 'Channel',
      'druid': 'Channel',
      'anti-paladin': 'Channel',
      'mage': 'Arcane Casting',
      'magic-user': 'Arcane Casting',
      'sorcerer': 'Arcane Sorcery',
      'bard': 'Musicianship'
    };
    return map[className.toLowerCase()] || 'Casting Skill';
  },

  /**
   * Get the casting type for animation theming.
   * @param {string} className
   * @returns {string} - 'divine', 'arcane', 'sorcery', or 'bardic'
   */
  getCastingType(className) {
    const map = {
      'cleric': 'divine',
      'paladin': 'divine',
      'ranger': 'divine',
      'druid': 'divine',
      'anti-paladin': 'divine',
      'mage': 'arcane',
      'magic-user': 'arcane',
      'sorcerer': 'sorcery',
      'bard': 'bardic'
    };
    return map[className.toLowerCase()] || 'arcane';
  },

  /**
   * Calculate the MP cost for a spell at a given intensity and caster rank.
   * Applies rank-based cost reduction for lower-rank spells.
   * @param {Object} costObj - The spell's cost object
   * @param {number} intensity - Desired intensity (1+)
   * @param {number} spellRank - The spell's rank (0-5)
   * @param {number} casterRank - The caster's rank (1-5)
   * @returns {number} - Final MP cost (minimum 1)
   */
  calculateCost(costObj, intensity, spellRank, casterRank) {
    if (!costObj) return 1;

    let cost = 0;

    switch (costObj.type) {
      case 'fixed':
        cost = costObj.base;
        break;
      case 'perIntensity':
        cost = (costObj.perIntensity || costObj.base) * intensity;
        break;
      case 'plusPerAdditional':
        // Base cost covers first 2 intensities, +perAdditional for each beyond that
        // e.g., "3, +1/add'l": Int 1=3, Int 2=3, Int 3=4, Int 4=5
        cost = costObj.base + (costObj.perAdditional || 1) * Math.max(0, intensity - 2);
        break;
      case 'special':
        cost = costObj.base || 1;
        break;
      default:
        cost = costObj.base || 1;
    }

    return Math.max(1, cost);
  },

  /**
   * Get the maximum intensity a caster can achieve for a spell.
   * = 1/10th of the relevant casting skill, minimum 1.
   * For cantrips, always returns 1.
   * @param {number} castingSkillPercent - The casting skill percentage
   * @param {number} spellRank - The spell's rank (0 = cantrip)
   * @returns {number}
   */
  getMaxIntensity(castingSkillPercent, spellRank) {
    if (spellRank === 0) return 1; // Cantrips are always Intensity 1
    return Math.max(1, Math.floor(castingSkillPercent / 10));
  },

  /**
   * Get the maximum affordable intensity given current MP.
   * @param {Object} costObj - The spell's cost object
   * @param {number} currentMP - Current magic points
   * @param {number} spellRank - Spell rank
   * @param {number} casterRank - Caster rank
   * @returns {number}
   */
  getMaxAffordableIntensity(costObj, currentMP, spellRank, casterRank) {
    if (!costObj || costObj.type === 'fixed') return 1;

    // Binary search for max intensity
    for (let i = 20; i >= 1; i--) {
      if (this.calculateCost(costObj, i, spellRank, casterRank) <= currentMP) {
        return i;
      }
    }
    return 0; // Can't afford even intensity 1
  },

  // =========================================================================
  //  ARMOR RESTRICTION CHECKS
  // =========================================================================

  /**
   * Armor weight categories
   */
  LIGHT_ARMOR: [
    'furs', 'hides', 'fur', 'hide',
    'leather', 'padded', 'quilted',
    'studded leather', 'ring mail', 'ringmail',
    'brigandine', 'scale', 'laminated', 'scale mail', 'lamellar'
  ],

  HEAVY_ARMOR: [
    'chain mail', 'chainmail', 'chain',
    'splint mail', 'splint', 'banded mail', 'banded',
    'plate mail', 'plate', 'full plate'
  ],

  ELVEN_CHAIN: ['elven chain', 'elven chainmail', 'elven chain mail'],

  /**
   * Classify an armor name as 'none', 'light', 'heavy', or 'elven-chain'.
   * @param {string} armorName
   * @returns {string}
   */
  classifyArmor(armorName) {
    if (!armorName) return 'none';
    const lower = armorName.trim().toLowerCase();
    if (!lower || lower === 'none' || lower === 'unarmored') return 'none';

    if (this.ELVEN_CHAIN.some(ec => lower.includes(ec))) return 'elven-chain';
    if (this.HEAVY_ARMOR.some(h => lower.includes(h))) return 'heavy';
    if (this.LIGHT_ARMOR.some(l => lower.includes(l))) return 'light';

    // If it has AP > 0 but we can't classify, assume heavy to be safe
    return 'unknown';
  },

  /**
   * Check if a class can cast spells in the given armor.
   * @param {string} className - e.g., "Mage", "Cleric"
   * @param {string} armorCategory - 'none', 'light', 'heavy', 'elven-chain'
   * @param {string} species - e.g., "Elf", "Half-Elf"
   * @returns {Object} - { canCast: boolean, penalty: string|null, reason: string|null }
   */
  checkArmorRestriction(className, armorCategory, species) {
    const cls = className.toLowerCase();
    const isElven = species && ['elf', 'half-elf', 'half elf'].includes(species.toLowerCase());

    // Cleric, Paladin: no restriction
    if (['cleric', 'paladin'].includes(cls)) {
      return { canCast: true, penalty: null, reason: null };
    }

    // Mage, Sorcerer: no armor at all (0 AP only)
    if (['mage', 'magic-user', 'sorcerer'].includes(cls)) {
      if (armorCategory === 'none') {
        return { canCast: true, penalty: null, reason: null };
      }
      return {
        canCast: false,
        penalty: null,
        reason: `${className} cannot cast spells while wearing armor.`
      };
    }

    // Druid, Ranger: light armor only
    if (['druid', 'ranger'].includes(cls)) {
      if (armorCategory === 'none' || armorCategory === 'light') {
        return { canCast: true, penalty: null, reason: null };
      }
      if (armorCategory === 'elven-chain' && isElven) {
        return {
          canCast: true,
          penalty: '1 Difficulty Grade harder',
          reason: `Elven Chain: casting is 1 Difficulty Grade harder.`
        };
      }
      return {
        canCast: false,
        penalty: null,
        reason: `${className} can only cast in light armor.`
      };
    }

    // Bard: light armor or elven chain
    if (cls === 'bard') {
      if (armorCategory === 'none' || armorCategory === 'light') {
        return { canCast: true, penalty: null, reason: null };
      }
      if (armorCategory === 'elven-chain') {
        if (isElven) {
          return {
            canCast: true,
            penalty: '1 Difficulty Grade harder',
            reason: `Elven Chain: casting is 1 Difficulty Grade harder.`
          };
        }
        // Non-elf bard in elven chain — can wear it but still penalty
        return {
          canCast: true,
          penalty: '1 Difficulty Grade harder',
          reason: `Elven Chain: casting is 1 Difficulty Grade harder.`
        };
      }
      return {
        canCast: false,
        penalty: null,
        reason: `Bard can only cast in light armor or Elven Chain.`
      };
    }

    // Default: allow (non-caster class shouldn't be casting anyway)
    return { canCast: true, penalty: null, reason: null };
  },

  // =========================================================================
  //  SPELL DAMAGE TABLE
  // =========================================================================

  /**
   * Get standard spell damage dice for a given intensity.
   * @param {number} intensity
   * @returns {string} - e.g., "2d6"
   */
  getSpellDamage(intensity) {
    const dice = Math.ceil(intensity / 2);
    return `${dice}d6`;
  },

  // =========================================================================
  //  CANTRIP-SPECIFIC RULES
  // =========================================================================

  /**
   * Get the effective casting difficulty for a cantrip based on caster rank.
   * Each rank above 0 makes cantrips 1 Difficulty Grade easier.
   * @param {number} casterRank - 1-5
   * @returns {string} - Description of difficulty adjustment
   */
  getCantripDifficultyAdjustment(casterRank) {
    const grades = [
      'Standard',      // Rank 0 (shouldn't happen, but safety)
      '1 Grade Easier', // Rank 1
      '2 Grades Easier', // Rank 2
      '3 Grades Easier (Very Easy)', // Rank 3
      '4 Grades Easier (Automatic)', // Rank 4
      '5 Grades Easier (Automatic)'  // Rank 5
    ];
    return grades[Math.min(casterRank, 5)] || 'Standard';
  },

  /**
   * Get the skill adjustment percentage for cantrip ease.
   * Each grade easier = +20% to the roll target (approximately).
   * @param {number} casterRank
   * @returns {number} - Bonus to add to casting skill for the roll
   */
  getCantripSkillBonus(casterRank) {
    // Each Difficulty Grade easier adds approximately +20% (up to Automatic)
    // Rank 1 = +20%, Rank 2 = +40%, Rank 3 = +60%, etc.
    return Math.min(casterRank, 5) * 20;
  }

};

// Make available globally
window.SpellDetails = SpellDetails;
window.SpellDetailsLookup = SpellDetailsLookup;
