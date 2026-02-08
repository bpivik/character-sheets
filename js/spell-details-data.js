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
  "lock (unlock)": { name: "Lock (Unlock)", aliasOf: "unlock (lock)", version: "reverse" },

  // =========================================================================
  //  RANK 2 SPELL ENTRIES
  // =========================================================================

  "aid": {
    name: "Aid",
    school: "Necromancy, Conjuration",
    classes: [
      { class: "Cleric", rank: 2 }
    ],
    sphere: "Healing",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "4 Rounds, +2 Rounds/additional Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You speak a holy word of encouragement, and warm energy flows into your ally -- bolstering their strength and resolve.",
    description: "When cast, the subject gains a +5% bonus to all skill rolls. This stacks with the +5% bonus from Bless (see page XX). Each Hit Location also gains 2 temporary Hit Points, which may exceed the character\u2019s normal maximum. These bonus Hit Points are lost first when taking damage and cannot be healed by any means. Any remaining at the end of the Duration disappear."
  },

  "alter self": {
    name: "Alter Self",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Round",
    duration: "3d4 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your features ripple and reshape, becoming an entirely new form. Height, build, and even voice shift to match your will.",
    description: "When cast, the mage alters their form to that of any humanoid-shaped biped. They may increase or reduce their SIZ by up to 50%, choosing to appear fat, thin, tall, short, or to change biological sex. Hair, clothing, equipment, and facial features can all be changed -- including perfect mimicry of an existing person -- though the caster\u2019s scent remains unchanged. Only one form may be assumed per casting. Forms with gills allow the caster to breathe underwater for the Duration. Winged forms allow flight at half the speed of the actual creature; if the caster lacks the Fly skill, they gain it at Base Level (STR+DEX). Alter Self does not grant supernatural abilities. The caster may end the spell at will and reverts to their normal form upon death."
  },

  "augury": {
    name: "Augury",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "2 Minutes",
    duration: "Instant",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Casting bones or tokens, you peer through the veil of fate. A vague omen of success, danger, or both floods your mind.",
    description: "This spell allows the caster to determine whether a specific action, to be taken within the next 30 minutes, will benefit or harm an individual or group. A focal object is required to read the omens -- typically the claws or small bones of a dragon, or a pearl or pure gold worth at least 100 GP, which must be crushed or melted. The Channel skill roll is Hard and may be increased by +5% per additional Intensity, up to a maximum of 95%. Magic Points spent to boost the chance are lost regardless of the roll\u2019s outcome. This roll should be made secretly by the Games Master, as the caster should never be entirely certain whether the results were interpreted correctly. If Successful, the spell provides one of four outcomes:"
  },

  "blink": {
    name: "Blink",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "1 Round/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You vanish in the space of a blink, stepping between planes. A heartbeat later, you reappear nearby -- unpredictable and elusive.",
    description: "When cast, this spell causes the mage to randomly teleport -- or \"blink\" -- between locations, making them difficult to target. Each point of Intensity grants a cumulative 20% chance (to a maximum of 80%) that the spell will trigger just as an attack is about to hit, teleporting the caster to a random location 10 feet away. Roll 1d8 for direction on a square grid, or 1d12 using clock-face orientation. The caster may choose their Facing after blinking. If the triggering attack is an area-effect (e.g., a breath weapon or Fireball), and the caster doesn\u2019t blink fully out of range, they take only half damage. The caster cannot blink into solid objects. If they arrive in a space occupied by a movable object of equal or lesser SIZ, it\u2019s shoved aside. If the object is immovable or too large, the caster blinks to a different random location. If no safe location is available, the caster becomes trapped on the Ethereal Plane. Blinking is disorienting. After each blink, the caster must make a Willpower roll. On Success, they regain their bearings and may defend normally. On Failure, they are confused for 1 Turn and cannot act, though they may still defend themselves. The caster may also attempt to blink deliberately through objects, such as doors or people. This requires the same blink chance roll. On Success, the caster teleports up to 10 feet in the chosen direction. On Failure, the blink still occurs, but the direction and Facing must be determined randomly as above."
  },

  "breathe water": {
    name: "Breathe Water (Breathe Air)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Mage", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental Water; Elemental Air",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 or more Targets",
    castingTime: "2 Actions",
    duration: "1 Hour/Intensity, +1d4 Hours",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Gills shimmer into being as you inhale deeply. Water fills your lungs, but you feel no fear -- only breath.",
    description: "This spell allows the caster -- or any touched recipients -- to breathe water for the Duration. Multiple subjects may be affected during casting, but the Duration is divided evenly among them. The exact Duration should be rolled secretly by the Games Master, keeping its length unknown to those affected.",
    reverse: {
      name: "Breathe Air",
      flavorText: "You exhale the magic into your lungs, letting you breathe freely where no air should exist.",
      description: "The reverse, Breathe Air, enables a creature that cannot normally breathe oxygen to do so. In either case, the subject retains the ability to breathe their natural element. The Divine version has a Casting Time of 1 Round and a Duration of 1 hour per point of Intensity."
    }
  },

  "call lightning": {
    name: "Call Lightning",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 }
    ],
    sphere: "Weather",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Round",
    duration: "1 Round/Intensity",
    range: "1,000\u2019",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You raise your hands skyward as storm clouds gather. Bolts crash down with thunderous wrath at your command.",
    description: "This spell requires appropriate weather conditions in the area -- such as rain, strong winds, heat with overcast skies, or a storm. Weather effects produced by creatures (e.g., air elementals) may also serve as a valid source. See the *Games Master\u2019s Guide*, page XX for more information on Weather. Once cast, the druid may summon one lightning bolt per Round for the Duration. No additional Action Points are required, but the caster must remain stationary and take no other Actions except defensive ones on any Turn in which a bolt is summoned. The caster may choose to skip Rounds to perform other Actions, including casting other spells, though this does not extend the spell\u2019s Duration. Each bolt strikes a target within 1,000 feet, affecting a 10-foot radius and dealing damage to 1d3 Hit Locations as shown on the Spell Damage Table (see page XX). Natural and worn armor provide no protection; only magical armor applies, equal to its Magic Bonus. A successful Resistance roll halves the damage. Lightning may ignite flammable materials (see Fires in the *Games Master\u2019s Guide,* page XX) and can shatter or destroy inanimate objects through force. Call Lightning cannot be cast indoors, underground, or underwater."
  },

  "chant": {
    name: "Chant",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Combat",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "30\u2019 Radius",
    castingTime: "2 Actions",
    duration: "4 Rounds/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A rhythmic, droning hymn fills the air. Your voice empowers allies and weakens the will of nearby foes.",
    description: "When casting is complete, all allies within 30 feet gain +5% to all skill rolls and +1 to damage per point of Intensity. Enemies in the same area suffer the inverse: --5% to skill rolls and --1 to damage per Intensity. The caster must maintain the Chant for the entire Duration; otherwise, the effects end immediately. Because the chanting is non-magical, Dispel Magic has no effect, but Silence nullifies all benefits. Chant stacks with both Bless and Curse, but the caster cannot cast other spells while maintaining it."
  },

  "charm being or mammal": {
    name: "Charm Being or Mammal",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 2 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "1 Week/Intensity",
    range: "250\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You lock eyes with your target and murmur enchantment. Their stance softens -- they see you as a trusted companion.",
    description: "Except as noted below, this spell is identical to the Rank 1 Arcane spell Charm Being (see page XX). In addition to sapient humanoids, it also affects natural mammalian animals. Large animals (SIZ 21-40) resist with an Easy roll, while Huge animals (SIZ 41+) use a Very Easy roll. Elves and half-elves are naturally resistant to charm effects."
  },

  "clairaudience/clairvoyance": {
    name: "Clairaudience/Clairvoyance",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 0, type: "special" },
    costDisplay: "See Below",
    area: "See Below",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "See Below",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your senses reach beyond the physical, letting you see or hear across distance as if you stood there yourself.",
    description: "When cast, the mage chooses either Clairaudience or Clairvoyance for 1 Magic Point per Intensity. Both effects may be used simultaneously for 3 Magic Points, +1 per additional Intensity. - **Clairaudience**: This effect allows the caster, while concentrating, to hear sounds within a 60-foot radius of a fixed location as if standing there. The point must be on the same plane of existence and personally known to the caster -- either a distant location or an obvious spot within the caster\u2019s line of sight (e.g., beyond a door, inside a nearby building, or atop a distant tower). The area is immobile. The spell requires a small horn worth at least 100 GP, which is consumed on a successful casting. - **Clairvoyance**: This effect lets the caster see, using normal vision, from a fixed location as if physically present. The chosen point must be on the same plane and either personally known or clearly visible. Magical sight such as Darkvision does not apply -- darkness limits visibility. In total darkness, the caster sees dimly within 10 feet; magical darkness blocks vision entirely. The spell requires a cat\u2019s eye gem worth at least 100 GP, which is consumed on a successful casting. In either case, Dispel Magic can end the effect early, and even a thin sheet of lead blocks the spell completely."
  },

  "commune with nature": {
    name: "Commune with Nature",
    school: "Divination",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Animal, Divination, Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1, expCost: 1 },
    costDisplay: "3, +1/additional Intensity, +1 EXP",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch the earth or close your eyes to the wind. Nature answers in feelings, whispers, and signs that surround you.",
    description: "This spell allows the caster to merge their spirit with the natural world, gaining insight into the surrounding area. For outdoor environments, the caster learns one piece of information per point of Intensity within a radius of 1 mile per Intensity. For example, at Intensity 4, the caster gains four pieces of information about an area within a 4-mile radius. The knowledge gained must relate to the natural world -- such as sources of water, vegetation, caves, minerals, animals, people, ruins, monsters, or dragons. In natural subterranean areas, the range is reduced to 30 feet per Intensity. The spell has no effect in constructed areas like buildings, dungeons, or tombs. Each additional use within the same 30-day period increases the Difficulty Grade by one step (e.g., second use is Formidable, third is Herculean). This applies whether previous uses were Successful or not. A Difficulty of Hopeless prevents further casting until a full 30 days have passed, as each attempt resets the count. 1 3 One piece of info about a 1 mile Radius, or 30\u2019 Radius in natural subterranean areas 2 4 Two pieces of info about a 2 mile Radius, or 60\u2019 Radius in natural subterranean areas 3 5 Three pieces of info about a 3 mile Radius, or 90\u2019 Radius in natural subterranean areas 4 6 Four pieces of info about a 4 mile Radius, or 120\u2019 Radius in natural subterranean areas 5 7 Five pieces of info about a 5 mile Radius, or 150\u2019 Radius in natural subterranean areas"
  },

  "continual light": {
    name: "Continual Light (Continual Darkness)",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: "Sun",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "60\u2019 Radius",
    castingTime: "1 Action",
    duration: "Semi-Permanent (See Below)",
    range: "180\u2019",
    resist: "See below",
    intensityScaling: null,
    flavorText: "You call forth lasting radiance that clings to an object -- banishing shadow for days with a steady, unwavering glow.",
    description: "This spell creates a globe of light equal in brightness to full daylight at a chosen point -- either on an object or in midair. The light is semi-permanent but may be dismissed at will by the caster. It is temporarily negated in areas of magical darkness, and permanently ended by Dispel Magic or Darkness cast at a higher Intensity than the spell\u2019s Magnitude. Creatures sensitive to daylight suffer normal penalties within the Area of Effect. If cast on a creature, a Willpower roll allows the target to shift the effect to the area behind them. If centered on the eyes, a Failed roll causes partial blindness, increasing the Difficulty Grade of all sight-based skill and Resistance Rolls by one. This condition can be removed only by Cure Blindness and Deafness or Dispel Magic at a higher Intensity than the Continual Light spell. The light is immobile unless cast on a movable object.",
    reverse: {
      name: "Continual Darkness",
      flavorText: "A bubble of magical blackness forms, cloaking the area in shadow no torch or daylight can pierce.",
      description: "The cleric version is reversible as Continual Darkness, which creates an inky blackness that negates Continual Light and otherwise functions as the Darkness spell, except for its longer Duration."
    }
  },

  "create food and water": {
    name: "Create Food and Water",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 }
    ],
    sphere: "Creation",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "See Below",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You lift your hands in prayer or purpose, and a humble meal with clean water appears -- nourishment shaped by will.",
    description: "This spell creates enough food to feed three creatures of SIZ 20 or less, or one creature of SIZ 21-40, for one full day per point of Intensity. Creatures larger than SIZ 40 require 1 Intensity per meal. The food appears from thin air, resembles normal food, and can be of any type the caster chooses. While bland, it provides full nourishment. Once created, it lasts for 24 hours, regardless of storage. After spoiling, it may be made edible again for another 24 hours with Purify Food and Water. The spell also produces a sufficient amount of clean drinking water, functioning as the Rank 1 spell Create Water (see page XX)."
  },

  "cure blindness or deafness": {
    name: "Cure Blindness or Deafness (Cause Blindness of Deafness)",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "With a gentle holy word and touch, you lift the veil from eyes or unstop muffled ears -- restoring lost senses.",
    description: "When cast, this spell restores sight or hearing to a subject suffering from blindness or deafness caused by a magical effect or similar non-physical malady. It does not cure sensory loss caused by disease or physical injury -- such cases require the Rank 4 Divine spell Heal (see page XX).",
    reverse: {
      name: "Cause Blindness of Deafness",
      flavorText: "You whisper a curse and make a sharp gesture. Sight or hearing vanishes as your target reels in sudden darkness or silence.",
      description: "The spell may be reversed to inflict either blindness or deafness on a touched target. A Successful Resistance roll negates the effect. On a Failed roll, the target is affected by the chosen condition. **Blindness**: The subject cannot make sight-based Perception rolls and suffers a three-Difficulty Grade penalty on all skills requiring vision. They cannot defend against attacks they cannot hear, and those they can hear are defended against with the same penalty. **Deafness**: The subject cannot make hearing-based Perception rolls and takes a one Difficulty Grade penalty to spellcasting due to being unable to hear the verbal components. They cannot defend against unseen or out-of-view attacks. Suffering from either condition reduces Initiative by 2; suffering from both reduces it by 5."
    }
  },

  "cure disease": {
    name: "Cure Disease (Cause Disease)",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "Your touch pulses with warmth, driving out infection and decay -- restoring balance before sickness can return.",
    description: "This spell cures any mundane or magical disease with a Potency less than the caster\u2019s Intensity x20. Once cured, the target begins recovery as described in the disease\u2019s write-up. Afflictions caused by parasitic creatures (e.g., green slime, rot grubs, or lycanthropy) may also be cured. In the case of lycanthropy, Cure Disease must be cast within 72 hours and at Intensity 12 or higher. All other parasitic conditions require Intensity 3 or more. The spell does not grant immunity to future infection.",
    reverse: {
      name: "Cause Disease",
      flavorText: "You speak an infectious curse. Your target pales as fever blooms and illness burrows deep into their flesh.",
      description: "The reverse, Cause Disease, inflicts a magical illness. If the target Fails their Resistance Roll, the caster may select any known disease with a Potency equal to or less than the spell\u2019s Intensity x20. Once inflicted, the disease follows normal rules for Resistance, Onset Time, and Duration. The only cure is magical (casting Cure Disease), as the Healing skill has no effect on magically inflicted diseases."
    }
  },

  "cure serious wounds": {
    name: "Cure Serious Wounds (Cause Serious Wounds)",
    school: "Necromancy",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "You channel potent healing energy. Deep cuts knit closed, bruises fade, and strength floods aching limbs.",
    description: "This spell functions like the Rank 1 Divine spell Cure Minor Wounds (see page XX), with the following differences: Cure Serious Wounds fully heals one Hit Location, provided the injury is no worse than a Serious Wound. It cannot heal Major Wounds, but it does stabilize them and prevent death. While it can be used on Minor Wounds, it is less efficient unless the caster is at least Rank 3.",
    reverse: {
      name: "Cause Serious Wounds",
      flavorText: "With grim focus, your magic tears through flesh -- leaving blood, bruises, and pain where healing could have been.",
      description: "When reversed, Cause Serious Wounds reduces a single Hit Location to 0 Hit Points, plus 1d3+1 additional damage. This damage cannot cause a Major Wound -- any excess is lost -- and armor offers no protection. Large creatures (SIZ 21-40) resist more easily, rolling at Easy Difficulty. Huge creatures (SIZ 41+) roll at Very Easy."
    }
  },

  "darkness": {
    name: "Darkness",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Action",
    duration: "10 Minutes/ Intensity",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You summon a smothering shroud that chokes the light. Vision fails, and even fire flickers out in the gloom.",
    description: "This spell creates an area of total magical darkness in a 10-foot radius, blocking all normal vision and racial sight abilities such as Darkvision. All mundane light sources -- sunlight, torches, candles -- are nullified. Darkness may be countered by the spell Light, and vice versa. However, other magical light sources, including Faerie Lights, Faerie Fire, and the glow from detection spells, are also suppressed. If either Light or Darkness is already active, the other has no effect until the original spell ends."
  },

  "darkvision": {
    name: "Darkvision",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Minute",
    duration: "2 Hours/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your eyes shimmer after the last magic word, letting you see through darkness as clearly as daylight.",
    description: "This spell grants the recipient Darkvision out to 60 feet as per the Class Ability (see page XX of the *Player\u2019s Handbook*). They can see in dim light as if it were bright light, using Standard Perception rolls. In complete darkness, they see as if in dim light, but Perception rolls are Hard. In darkness, only shades of gray are visible. Darkvision does not function in magical darkness."
  },

  "detect evil (arcane)": {
    name: "Detect Evil (Detect Good) (Arcane)",
    school: "Divination",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "10\u2019 x 180\u2019 Path",
    castingTime: "1 Action",
    duration: "5 Minutes/ Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your senses tingle with divine judgment -- malice and corruption glow like hot coals in your mind\u2019s eye.",
    description: "When cast, this spell allows the mage to detect emanations of Evil within a 10-foot-wide path extending to the spell\u2019s full range. It reveals the presence of creatures with the Evil Alignment but does not detect traps, poison, cursed items, or similar threats. Emanations can be sensed through up to 3 feet of wood, 1 foot of stone or dirt, or 1 inch of solid metal. Because magical auras take time to register, only one 60\u00B0 arc may be scanned per minute.",
    reverse: {
      name: "Detect Good",
      flavorText: "You feel warmth and intent -- selfless acts, good beings, and divine blessings shine gently before your inner vision.",
      description: "The reverse, Detect Good, functions identically, revealing creatures with the Good Alignment. *Note that this spell differs from the Rank 1 Divine spell. See page XX*"
    }
  },

  "detect invisibility": {
    name: "Detect Invisibility",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "Field of Vision",
    castingTime: "1 Action",
    duration: "5 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "The veil lifts as you speak the words. Invisible creatures and objects shimmer faintly, outlined by magic in your sight.",
    description: "When cast, this spell allows the mage to see invisible objects or beings, including those that are hidden, ethereal, astral, or out of phase. It also reveals targets concealed by mundane means. Unlike most Detect spells, Detect Invisibility is limited to the caster\u2019s line of sight, but it does not require a minute to scan an arc of vision."
  },

  "dispel magic": {
    name: "Dispel Magic",
    school: "Abjuration",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 3 },
      { class: "Mage", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "15\u2019 Radius",
    castingTime: "2 Actions",
    duration: "Instant",
    range: "360\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You release a ripple of pure arcane force, unraveling spells and magical effects in its path.",
    description: "This spell may target a specific object, creature, or area. When cast, all magic within a 15-foot radius of the target point is subject to dismissal. Dispel Magic removes all magical effects in the area with a Magnitude less than the spell\u2019s Intensity. Magic items and effects like Charm Being must be targeted individually. A spell\u2019s effects cannot be partially removed. The spell begins with the most powerful effect in the area -- if it fails to dispel it due to insufficient Intensity, no further spells are affected. Dispel Magic may also be used defensively as a Counter Spell to neutralize incoming offensive spells. The Divine version has a range of 180 feet but functions identically in all other respects. Sphere: Protection"
  },

  "enfeeblement": {
    name: "Enfeeblement",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "30\u2019/Intensity",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You gesture sharply, and your target staggers. Their strength drains as their muscles forget how to act.",
    description: "This magical ray weakens a single target that Fails a Resistance Roll, imposing a two Difficulty Grade penalty to all skill rolls and to their Damage Modifier. Creatures of SIZ 20 or larger suffer only half the penalty. The ray must remain focused on the same target for the effect to persist. If the Duration ends or the ray shifts to a new target, the original victim immediately regains full strength. The mage must Concentrate to maintain the ray; taking any other Action disrupts the effect and requires another Cast Action to reacquire the target."
  },

  "feign death": {
    name: "Feign Death",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "30 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You drop into perfect stillness -- no breath, no pulse -- undetectable to both sight and spell.",
    description: "This spell places a willing creature (including the caster) into a death-like state indistinguishable from actual death. While under its effects, the subject remains fully aware of their surroundings through hearing, smell, and sight (if their eyes are open), but they feel no pain, regardless of injury or mistreatment. All damage suffered is real and can still result in death. While the spell is active, the subject is immune to paralysis, poisoning, and Energy Drain. However, any poison introduced during this time takes effect once the spell ends, at which point the subject may make a normal Resistance Roll. Only willing targets may be affected. The caster may end the spell at will, but the subject requires 1 minute to fully recover. The Divine version of this spell has a Duration of 10 minutes per point of Intensity. Sphere: Necromancy"
  },

  "fire trap": {
    name: "Fire Trap",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Mage", rank: 3 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Object",
    castingTime: "10 Minutes",
    duration: "Permanent until Discharged",
    range: "Touch",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You trace a rune on an object\u2019s surface. When opened, a blast of fire lashes out, searing the unwary.",
    description: "This spell may be cast on any item that can be opened and closed -- such as a book, chest, bottle, or box. It cannot be combined with other locking spells like Secure Portal or Mage Lock. An Unlock spell cast on a Fire Trap-protected item has a 50% chance of negating the trap. Touching the enchanted item triggers a fiery explosion in a 5-foot radius. All creatures in the area take 1d4 damage, plus 1 per level of Intensity, to each Hit Location. Armor Points count as half normal, while magic armor applies its full Magic Bonus. A successful Resistance roll halves the damage. Fire Trap may ignite flammable materials. See \"Fires\" in the *Games Master\u2019s Guide* for more information."
  },

  "fireball": {
    name: "Fireball",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "Instant",
    range: "30\u2019/Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "A blazing ball of flame streaks from your hand and explodes, engulfing your foes in roaring flame and concussive heat.",
    description: "On the first Turn of casting, the mage begins the incantation and gestures, forming a small cinder of flame in their hand. By the second Turn, the incantation is complete, and the mage hurls the growing fireball, which explodes with a low roar into a massive blast of flame. All creatures in the Area of Effect take damage based on the Spell Damage Table, applied to each Hit Location. Worn armor provides only half its normal Armor Points, though magical armor applies its full Magic Bonus. A successful Resistance roll halves the total damage taken. Fireball may ignite flammable materials. See \"Fires\" in the *Games Master\u2019s Guide*, page XX, for more details."
  },

  "flame arrow": {
    name: "Flame Arrow",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Minute",
    range: "50\u2019/Intensity",
    resist: "Evade or Shield Parry",
    intensityScaling: null,
    flavorText: "You whisper to the missile, and it blazes to life -- trailing fire as it streaks toward its target.",
    description: "This spell may be used in two ways: **Primary Use -- Flame Bolt**s: The mage creates one bolt of searing flame per Rank (minimum of two). All targets must be within the caster\u2019s field of view and no more than 60 feet apart. Bolts may be hurled immediately as part of the casting roll, or held and thrown later. Throwing held bolts requires a single Action and a separate Combat Skill or Athletics roll (whichever is higher). Any unthrown bolts vanish after 1 minute. Each bolt deals 2d6 fire damage to a single Hit Location. Worn armor offers only half protection; natural armor and magical Armor Points apply in full. A Successful Evade or Shield Parry negates the damage. **Secondary Use -- Igniting Ammunition**: The caster may ignite mundane arrows or bolts, up to 10 per Rank. These remain lit for the spell\u2019s 1-minute Duration and must be nocked and fired during that time -- otherwise, they are consumed. Flaming arrows and bolts deal normal damage, plus 1 point of fire damage. With either version, Flame Arrow has a 5% chance per point of damage dealt to ignite flammable materials. See Fires on page XX of the *Games Master\u2019s Guide*."
  },

  "flame strike": {
    name: "Flame Strike",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 2 }
    ],
    sphere: "Combat, Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 Radius",
    castingTime: "2 Actions",
    duration: "Instantaneous",
    range: "100\u2019, +20\u2019/additional Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You call down a pillar of holy fire, burning your foes from above with searing wrath.",
    description: "Upon successful casting, a 30-foot column of flame descends from above, striking a designated area. The column deals 1d8 damage per 2 points of Intensity (round up) to all creatures within the Area of Effect. Roll once for damage and apply it to each of the target\u2019s Hit Locations. Worn armor provides only half protection; magical Armor Points and natural armor reduce damage normally. A Successful Evade roll -- requiring the target to roll or throw themselves clear and end prone -- negates all damage. Characters with the Artful Dodger ability may Evade without falling prone. Flame Strike has a 5% chance per point of damage rolled to ignite flammable materials. See Fires in Chapter XX of the *Games Master\u2019s Guide* for more details."
  },

  "flame walk": {
    name: "Flame Walk",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 or more Targets",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Flames bend away from your steps. You move through fire or across burning ground without harm.",
    description: "When cast, this spell allows one creature per point of Intensity to endure temperatures up to 2,000\u00BAF. Affected targets can walk through non-magical fire or across molten lava at normal Movement Rate without harm. Against magical flame (e.g., Fireball, red dragon breath), a Successful Resistance roll reduces damage to one-quarter; a Failed roll reduces it to half. Unlike Protection from Fire, this spell does not provide additional Damage Resistance. Each level of Intensity allows a single creature to gain the benefits of Flame Walk. The spell is not cumulative with other fire protection spells."
  },

  "fly": {
    name: "Fly",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity, +1d6x10 Minutes",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "The wind lifts you gently. With focus, you take to the sky -- gliding and soaring with ease.",
    description: "This spell grants flight to one creature of up to 3 SIZ per point of Intensity (including the caster). The affected creature gains a flying Movement Rate of 30 feet -- halved while climbing, doubled when diving. Ground-based skill penalties affecting Movement Rate also apply to flying, including those related to spellcasting and combat. The exact Duration is unknown to the subject and should be secretly rolled by the Games Master. If a fly skill roll is required, Athletics or Acrobatics may be used instead at two Difficulty Grades higher. Frequent users of this spell may develop the Fly skill, which begins at a Base Level of STR+DEX."
  },

  "forget": {
    name: "Forget",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Action",
    duration: "Permanent",
    range: "100\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You lock eyes and murmur the spell. Moments (or hours) slip away like mist from your target\u2019s mind.",
    description: "When cast, this spell causes 1-4 creatures within the Area of Effect to forget events from the 5 minutes prior to casting. Each additional point of Intensity adds 5 more minutes to the memory loss (e.g., Intensity 6 erases the last 30 minutes). Each target may make a Willpower roll to resist. The target\u2019s Difficulty Grade depends on the number of targets: 1 target -- Formidable; 2 targets -- Hard; 3-4 targets -- Standard. Lost memories are permanent unless recovered by Alter Reality, Heal, Restoration, Limited Wish, or Wish."
  },

  "gust of wind": {
    name: "Gust of Wind",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 x 30\u2019/Intensity",
    castingTime: "1 Round",
    duration: "1 Round",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You exhale the final word, and a powerful blast erupts -- toppling creatures and scattering smoke and fog.",
    description: "This spell creates a Moderate Gale with 40 mph winds (STR 60+1d12) along a path 10 feet wide and 30 feet long per point of Intensity. All STR- or DEX-based physical skill rolls within the area are Hard, and Base Movement Rate is halved when moving against the wind. Ground-based creatures of SIZ 20 or less are affected unless they succeed on a Brawn roll. Flying creatures of SIZ 20 are automatically pushed back 1d6 x30 feet. Larger flying creatures may make a Brawn roll to resist; a Success allows Movement Rate into the wind at half speed, while a Failure holds them stationary. Moving with the wind grants a 25% bonus to Movement Rate regardless of SIZ. The gale tears loose items like open scrolls or maps from those who fail a Hard Athletics roll. It extinguishes flames of Intensity 1-2 and fans those of Intensity 3+ an additional 5 feet in the wind\u2019s direction. See Fires in the *Games Master\u2019s Guide* for additional information. Gases, vapors, and levitating creatures are swept along the wind path unless properly secured. Continue progression"
  },

  "haste": {
    name: "Haste",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "3 Rounds/Intensity",
    range: "180\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your body surges with unnatural speed. Every movement sharpens -- faster, cleaner, unstoppable.",
    description: "This spell affects one creature (including the caster) per point of Intensity within the Area of Effect. Each target gains double their normal Movement Rate, +4 Initiative (or to current Initiative if combat is already underway), and 2 extra Action Points for defensive Actions such as Parry and Evade for the Duration. As a side effect of the accelerated metabolism, each casting ages the target by 1% of their normal life expectancy (e.g., about 1 year for humans). See Aging on page XX for life expectancy details by species. Haste cancels the effects of Slow, and when used in this way, the target does not age. The spell does not stack with itself or similar magical effects."
  },

  "heat metal": {
    name: "Heat Metal (Chill Metal)",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "7 Rounds",
    range: "120\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Metal glows red-hot -- armor scorches, weapons sear, and pain drives your foes into a frenzy.",
    description: "This spell causes 5 ENC per point of Intensity worth of ferrous metal (iron, copper, steel) worn or carried by a man-sized target to heat up painfully. Targets may be affected individually or shared in groups of at least 5 ENC. On the first Round, affected items grow warm. By the second Round, they begin to burn, and by Rounds 3-5, they become red-hot, causing severe damage. The metal then cools, returning to normal temperature by Round 8.",
    reverse: {
      name: "Chill Metal",
      flavorText: "A creeping frost clings to metal -- blades crack, armor bites, and numbness spreads with each breath.",
      description: "The reverse, Chill Metal, causes the same amount of metal to become painfully cold, leading to frostbite and similar damage. Items may freeze to skin and become difficult to release. **Heat Metal Effects:** - **Round 1**: Discomfort only - **Round 2**: 1 HP damage to the location in contact (minor burns/blistering) - **Rounds 3-5**: 1d3 HP damage to the location in contact (severe burns) - **Round 6**: 1 HP damage to the location in contact (minor burns) - **Round 7**: Discomfort only, no damage **Chill Metal Effects:** - **Round 1**: Discomfort only - **Round 2**: 1 HP damage to the location in contact - **Rounds 3-5**: 1d2 HP damage (severe frostbite) to the location in contact; by Round 4, the target must pass an Endurance roll or drop a frozen held item - **Round 6**: 1 HP damage to the location in contact - **Round 7**: Discomfort only Leather, cloth, or wood may ignite when in contact with Heat Metal effects (see Fires on page XX of the *Games Master\u2019s Guide*). A Ring of Fire Resistance or similar item grants total immunity to Heat Metal. It can also be cancelled by immersion in water/snow or exposure to spells like Cone of Cold or Ice Storm. Chill Metal can be nullified by significant heat sources such as a Wall of Fire, campfire, or flaming sword (a torch is insufficient). The Endure Heat/Endure Cold spells offer complete protection from both versions."
    }
  },

  "hold animal": {
    name: "Hold Animal",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "1 Round",
    duration: "2 Minutes/Intensity",
    range: "250\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You lock eyes with the beast, and it freezes mid-step -- caught in unseen chains.",
    description: "This spell immobilizes 1 mundane mammal per point of Intensity, or 1 non-mammal (e.g., reptile, bird, fish) per 2 points of Intensity, within the Area of Effect. It affects normal animals such as apes, eagles, snakes, sharks, and giant versions of these creatures. It does not affect monsters like harpies, dragons, naga, or gorgons; however, it will affect giant versions of normal animals (such as giant bats or giant frogs). Targets may resist with a Willpower roll. Large animals (SIZ 21-40) resist with an Easy roll; Huge animals (SIZ 41+) resist with a Very Easy roll. A Successful roll negates the effect entirely. Held creatures are completely helpless. Only Dispel Magic can end the effect before the spell\u2019s Duration expires."
  },

  "hold person": {
    name: "Hold Person",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "2 Rounds/Intensity",
    range: "360\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "With a word and a gesture, your foe goes rigid, their eyes wide, limbs frozen by magic.",
    description: "This spell immobilizes 1 humanoid creature per point of Intensity. A Successful Willpower roll negates the effect. Large humanoids (SIZ 21-40) resist with an Easy roll, while Huge humanoids (SIZ 41+) resist with a Very Easy roll. Held creatures are completely helpless. Only Dispel Magic can end the effect before the Duration expires. The Divine version of this spell functions identically, except its Area of Effect affects all valid targets within a 10-foot radius. Sphere: Charm"
  },

  "hold undead": {
    name: "Hold Undead",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1d3 Undead",
    castingTime: "2 Actions",
    duration: "2 Rounds/Intensity",
    range: "60\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak the final words of the spell. The undead shudder and freeze in place, bound by arcane power.",
    description: "This spell freezes in place 1d3 undead -- corporeal or non-corporeal -- that fail a Willpower roll to resist. A Successful roll negates the effect entirely. The caster targets a visible point within range; the closest undead to that point is affected first. If multiple undead are present, the weakest are affected first. The number and strength of undead the caster can affect depend on their Rank and the spell\u2019s Intensity, as detailed on the table below. 2 1-3 3 4-6 4 7-9 5 10+ The spell automatically affects non-sentient undead -- those with INS instead of INT -- such as skeletons and zombies, without requiring a Resistance Roll. While held, affected undead are completely helpless. Only Dispel Magic can end the effect before the spell\u2019s Duration expires."
  },

  "illusion, greater": {
    name: "Illusion, Greater",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "50\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "Concentration; See Below",
    range: "50\u2019/Intensity",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "You conjure a complex falsehood -- sight, simple sounds, and motion woven into a seamless deception.",
    description: "This spell functions as the Rank 1 Lesser Illusion, except as noted above and here. Greater Illusion requires less Concentration, allowing the caster to move at a jog (Movement Rate x2) and make skill rolls without penalty. The caster may not cast other spells or make attacks while maintaining the illusion. The spell also allows simple sounds to accompany the visual illusion, though not complex enough to form recognizable speech. Due to its tighter focus and clarity, attempts to Disbelieve are 2 Difficulty Grades harder than for Lesser Illusion. Once Concentration ends, the illusion persists for an additional 2 minutes. See Lesser Illusion (page XX) and Illusions and Phantasms (page XX of the *Player\u2019s Handbook*) for more details."
  },

  "invisibility (10ft)": {
    name: "Invisibility (10ft)",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "6 Hours/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You and your nearby companions shimmer and vanish, cloaked from sight in a field of silence and shadow.",
    description: "This spell functions as the Rank 1 Lesser Invisibility, with the following differences: All individuals within 10 feet of the original recipient when the spell is cast are rendered invisible. They can see each other but do not gain the ability to see other invisible creatures. If a subject moves outside the 10-foot radius, their invisibility ends. Re-entering the area or arriving after casting does not restore or grant the effect. Attacks or offensive spellcasting by anyone other than the original recipient only end invisibility for that individual. However, if the original target attacks or casts an offensive spell, all affected creatures become visible. See Lesser Invisibility for additional details (page XX)"
  },

  "know passions": {
    name: "Know Passions (Obscure Passions)",
    school: "Divination",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "1 Round/Intensity",
    range: "30\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You peer into your target\u2019s heart and see their strongest emotions -- love, hatred, fear -- laid bare.",
    description: "This spell allows the caster to discern the Passions and Alignment of one creature. The target may make a Willpower Resistance Roll to negate the effect. On a Failed roll, the caster immediately learns the target\u2019s Alignment (Good, Neutral, or Evil). Each additional Round of Concentration reveals one more random Passion or defining trait. The strength of any revealed Passion is determined by the Games Master using the following scale: *Example: Rengarth casts Know Passions on a rival wizard. The rival\u2019s Alignment is Evil (Cruel and Spiteful) at 37%. The spell succeeds, and the rival Fails their Resistance Roll. Rengarth learns she has an Average tendency toward Evil.*",
    reverse: {
      name: "Obscure Passions",
      flavorText: "You cloud the heart and mask the soul. No spell can sense what stirs within.",
      description: "The reverse of this spell, Obscure Passions, makes a single target\u2019s Passions unreadable for 24 hours. This blocks Know Passions, Detect Evil/Good, and similar abilities, including a paladin\u2019s detection powers. **When used as a level 1 Divine spell**, use the following description: Rank: Cleric 1, Druid 1, Paladin 1, Ranger 1 Sphere: Divination Cost: 1/Intensity Area: 1 or more Targets Casting Time: 1 Round Duration: 2 Minutes/Intensity Range: 30\u2019 Resist: Willpower"
    }
  },

  "leonard's tiny magic hut": {
    name: "Leonard\u2019s Tiny Magic Hut",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "15\u2019 Diameter Sphere",
    castingTime: "2 Actions",
    duration: "4 Hours, +2 Hours/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A dome of force rises around you -- warm, dry, and safe. An invisible haven amid wilds or weather.",
    description: "When cast, an unmoving, opaque globe of force forms around the caster, half above and half below ground. The globe may be any color the caster chooses at the time of casting. Up to 100 points of SIZ worth of creatures (e.g., seven creatures of SIZ 14) may occupy the hut and freely enter or exit without disrupting the effect. If the caster leaves the area, the hut immediately dispels. It is also subject to Dispel Magic. The interior is a hemisphere with a flat floor at ground level. The caster may darken or illuminate it at will. From outside, the globe is fully opaque, but from inside, it remains fully transparent. It offers complete protection from the elements, including rain, snow, dust, gas, and winds up to STR 90. Stronger winds will dispel it. The temperature inside remains a constant 68 \u00BAF as long as the external temperature is between 0 and 100 \u00BAF. For each degree outside this range, the interior adjusts by 1 \u00BAF to maintain balance."
  },

  "lightning bolt": {
    name: "Lightning Bolt",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 wide Path",
    castingTime: "2 Actions",
    duration: "Instant",
    range: "50\u2019/Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "A crackling arc erupts from your hands, blasting through everything in its path with furious, forked energy.",
    description: "On the first Turn of casting, the mage begins the incantation and gestures, generating electrical arcs between their fingers. On the second Turn, the spell is released, sending a bolt of lightning in a straight line from the caster\u2019s fingertip. The bolt strikes all targets in a 10-foot-wide path to the spell\u2019s maximum range, dealing damage as per the Spell Damage Table (see page XX) to 1d6 random Hit Locations per victim. Natural and worn armor offer no protection; only magical armor applies, and only up to its Magic Bonus. A successful Resistance roll halves the damage. Lightning Bolt has a chance to ignite flammable materials equal to damage rolled x5%. It may also shatter or destroy inanimate objects through sheer force. See Fires on page XX of the *Games Master\u2019s Guide* for more information."
  },

  "locate object": {
    name: "Locate Object (Obscure Object)",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Mage", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "60\u2019/Intensity",
    castingTime: "1 Action",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You close your eyes and focus. The item you seek tugs at your mind like a thread pulled through space.",
    description: "This spell directs the caster toward a known or familiar object within the spell\u2019s Area of Effect. While slowly turning in place, the caster senses the direction to the item. The object may be specific (e.g., Tashana\u2019s longsword) only if the caster has a clear mental image of it, either from firsthand experience or magical observation. Generic items -- such as a bed, chest, gold, stairwell, or ladder -- do not require prior familiarity. The spell cannot locate living creatures.",
    reverse: {
      name: "Obscure Object",
      flavorText: "You shroud the item in protective magic. Scrying and seeking spells slide off like water on stone.",
      description: "The reverse, Obscure Object, hides one item from magical detection (e.g., Detect Magic, crystal balls) for the same Duration. **The Divine version of this spell** has an Area of 100\u2019/Intensity"
    }
  },

  "mage lock": {
    name: "Mage Lock",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Portal",
    castingTime: "1 Action",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "An arcane shimmer seals the object, locking it tight against intrusion -- both physical and magical.",
    description: "This spell may be cast on any lockable object, such as a door, chest, portal, or lockable tome. The object (up to 30 Hit Points per point of Intensity) is permanently sealed unless physically broken or opened via a Successful Dispel Magic. The Unlock spell can temporarily open a Mage Locked object for 10 minutes, after which the original enchantment resumes. A mage of higher Rank than the original caster may pass through a Mage Locked portal freely without dispelling it and may hold it open for others. Unlike Secure Portal, a Mage Locked object is not disrupted by extraplanar creatures (e.g., demons, devils, angels, elementals) or bypassed by spells like Blink or Read Thoughts."
  },

  "magic mouth": {
    name: "Magic Mouth",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Object",
    castingTime: "1 Minute",
    duration: "See Below",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You enchant an object to speak aloud on command. Its voice echoes with your words, delivered in eerie clarity.",
    description: "This spell causes a mouth to appear on an inanimate object, triggered by a specific event or condition set by the caster at the time of casting. When activated, the mouth speaks a predetermined phrase -- up to 5 words per point of Intensity -- at a rate of 1 word per second (e.g., 12 words require 3 full Rounds to speak). The mouth cannot speak words of power or cast spells. The spell may be cast on any non-living object, such as a wall, tree, chest, or statue. It cannot be cast on living or once-living creatures with INT or INS. Casting it on a statue is especially effective, as it appears the statue itself is speaking. The trigger condition can be broad (\"when the next person enters this room\") or specific (\"when a female Cleric of Mithras comes within 10 feet of the statue on a Saturday\"). However, the trigger must be based on observable, non-magical criteria -- e.g., presence, sound, or visible clothing -- not things like invisibility, Passions, or Class. The maximum trigger range is 25 feet per point of Intensity. The spell\u2019s Duration is Permanent until triggered, after which it ends."
  },

  "minute meteors": {
    name: "Minute Meteors",
    school: "",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target per Meteor",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "60\u2019/Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "Tiny flaming spheres orbit your hand -- each one ready to launch and detonate at the flick of a thought.",
    description: "When cast, this spell creates many small fiery spheres that burst into 1-foot balls of flame on impact. The caster gains 5 meteors per Rank above 1 (e.g., 5 at Rank 2, 10 at Rank 3, etc.). Each meteor deals 1d6 damage to a random Hit Location. Multiple meteors striking a single target are rolled and applied separately. Worn armor provides half protection; magical Armor Points and natural armor apply in full. A Successful Evade or Shield Parry negates damage from a single meteor. Each sphere may target a separate opponent within the caster\u2019s field of view, if desired, and does 1d6 points of damage to the target struck. Apply the damage from each sphere to one random Hit Location. Meteors have a 5% x damage rolled chance of igniting flammable materials. See Fires on page XX of the *Games Master\u2019s Guide*. The caster chooses one of two modes at the time of casting: - **Volley Mode**: Hurl 5 meteors per Cast Action, beginning with the final Cast Action that completes the spell. The Duration ends when the final 5 are thrown. - **Single-Shot Mode**: Hurl 1 meteor per Cast Action, starting with the final Cast Action. The caster may perform other actions between throws, including attacks or spellcasting. However, Concentration spells cancel any unused meteors. The spell\u2019s Duration ends when all meteors are used, the current Scene ends, or the caster voluntarily ends it. The spell is subject to Dispel Magic as normal."
  },

  "mirror images": {
    name: "Mirror Images",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "5\u2019 Radius",
    castingTime: "1 Action",
    duration: "3 Rounds/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your form fractures into duplicates. Illusory copies move with you, confusing every eye and blade.",
    description: "When cast, 2d4 illusory duplicates of the caster appear within a 5-foot radius, perfectly mimicking the mage\u2019s movements. The area shimmers and distorts, making it nearly impossible to pinpoint the real caster\u2019s location. Each time a target strikes an image, that image vanishes. Striking the real caster does not affect the remaining illusions. The caster\u2019s movements and any injuries are mirrored across all images, keeping their identity hidden. The images continue to shift, so even repeated attacks offer no advantage in identifying the caster. The Games Master may determine if the real caster is struck using one of the following methods: - Roll a die equal to the total number of targets (caster + images). For example, with 4 images and the caster, roll 1d5. A result of 1 hits the real caster. - Use markers equal to the number of targets, with one marked as the caster. Draw a marker for each attack. If the caster is hit, apply damage; otherwise, remove an image and its marker. All remaining images vanish when the spell\u2019s Duration ends. *For example, with 4 images and the caster, the attacker should roll 1d6, rerolling a result of 6, with the caster being hit on a roll of 1. Another would be to have a number of markers equal to the number of potential targets, marking one as being the caster. A marker is drawn each time an attack is made and if the target is hit damage is applied; otherwise, an image disappears removing one of the markers.*"
  },

  "monster summoning, lesser": {
    name: "Monster Summoning, Lesser",
    school: "Conjuration",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "100\u2019 Radius",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You tear a hole in space, and a lesser creature steps forth -- bound to your cause until dismissed.",
    description: "When cast, this spell conjures a small group of creatures that appear at a point designated by the caster within the Area of Effect. Roll on the Lesser Monster Summoning table to determine the type and number of creatures. The caster may command the summoned creatures if able to communicate with them. Otherwise, they act on instinct, attacking any obvious enemies of the caster or their allies, regardless of Alignment. If slain, the creatures vanish, returning to their place of origin -- usually unharmed. If no enemies are present, the caster may direct the summoned creatures to perform another task. This also requires some form of communication. Rarely, this spell has unintentionally summoned actual adventurers, briefly pulling them from their parties. The chance of this happening to the characters is very small -- about 1% per session. If there\u2019s not enough room for the summoned creatures to appear, the spell fails automatically. For this reason, using higher Rank versions of this spell in tight spaces (like dungeon corridors) may result in impractical or wasted summons -- e.g., calling forth a young dragon in a 10-foot hallway. *\\* See Flocks, Hordes, Packs, and Shoals in the Monster Manual, page XX.* *\\*\\* 01-25 Earth, 26-50 Air, 51-75 Fire, 76-00 Water.*"
  },

  "obscurement": {
    name: "Obscurement",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 }
    ],
    sphere: "Weather",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "5\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "4 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Mist coils outward, cloaking you and your allies in shifting concealment.",
    description: "When cast, a thick mist rises around the druid, reducing all forms of vision to 5 feet. A Successful Perception roll allows faint shapes or movement to be detected up to 10 feet away, or entirely through the fog if its radius is smaller than 10 feet. Due to the fog\u2019s constant shifting, this roll must be repeated each Round when attempting to see through it. If exposed to a moderately strong wind, the spell\u2019s Duration is reduced by 75%."
  },

  "plant growth": {
    name: "Plant Growth",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "150 m (500 ft)",
    resist: "NA",
    intensityScaling: null,
    flavorText: "You call to the earth, and nature erupts. Trees stretch, vines twist, and wild growth surges unnaturally fast.",
    description: "The Divine version of Plant Growth also allows for the blessing of crops (see the Arcane version on page XX for additional abilities). When cast in this way, all vegetation in a 1/2 mile radius becomes hardier and more fruitful, increasing yields by 10% per Intensity to a maximum of 50% greater than that of a normal growing season. The spell\u2019s duration lasts only as long as required to see the crop to the end of the season. It does not prevent any crop from suffering the effects of natural disasters such as flood, drought, insects, etc. However, it does improve their chance to survive a disaster by the increased yield percentage noted above. This version is typically used by druids in farming communities during the spring festival and cast at planting time."
  },

  "produce flame": {
    name: "Produce Flame",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "See Below",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You cup your hand, and fire dances within -- ready to light a torch, scorch a foe, or fly as a blazing dart.",
    description: "When cast, a bright flame appears in the caster\u2019s palm, equal in brightness to a torch. It does not harm the caster but produces heat and can ignite combustible materials such as cloth, paper, oil, and wood. At any point during the Duration, the caster may hurl the flame up to 40 feet. On impact, it bursts, igniting flammable materials within a 5-foot diameter. If the Duration continues, a new flame forms in the caster\u2019s hand. The caster may also end the Duration at will. Any fires started by the spell continue to burn naturally (see Fires in the *Games Master\u2019s Guide*, page XX). Throwing the flame requires a Successful Throw (Athletics) skill roll, and the attack may be Evaded. If the attack misses, determine the landing point using the \"Missing with a Thrown Weapon\" rules (see *Games Master\u2019s Guide*, page XX). Damage depends on the target\u2019s SIZ: - **SIZ ≤ 20:** 1d6 damage to 1d3+1 random Hit Locations. - **SIZ 21--40:** 1d6 damage to 1d2+1 contiguous Hit Locations. - **SIZ \\> 40:** 1d6 damage to a single Hit Location. A successful Resistance roll halves the damage. Armor Points count as half, but magical armor applies its full Magic Bonus. The flame may ignite flammable materials. See Fires in the *Games Master\u2019s Guide* page XX for more details."
  },

  "protection from cold": {
    name: "Protection from Cold",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "15 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A layer of warmth surrounds you. Frost cracks, and icy winds brush past like gentle breezes.",
    description: "When cast, this spell creates an invisible field that offers complete protection from natural cold. When cast on oneself, the field also absorbs 12 points of magical cold damage per point of Intensity (e.g., white dragon breath, Cone of Cold, Chill Metal). Once the absorption is depleted, any remaining damage from that attack is halved before being applied. When cast on another, the target gains full protection from natural cold and takes only half damage from magical cold sources. No damage absorption applies."
  },

  "protection from evil 10 foot radius": {
    name: "Protection from Evil 10' Radius (Protection from Good 10' Radius)",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Mage", rank: 2 }
    ],
    sphere: "Protection",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "Touch",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "You form a protective barrier. Malicious spirits and dark forces recoil from its unseen edge.",
    description: "This spell functions as Protection from Evil (see page XX), with the following changes: The touched creature (including the caster) is surrounded by a protective sphere with a 10-foot radius, which moves with the subject. All creatures within the radius benefit from the protection. If any protected individual attacks an affected creature \u2013 typically summoned or enchanted entities \u2013 the spell ends immediately for everyone. The spell\u2019s radius is proportionate to the size of the caster, with creatures of SIZ 31-60 producing a 20\u2019 radius, and creatures of SIZ 61+ producing a radius of 30\u2019. Note: The Divine version (Cleric 3) may differ slightly from the Arcane version (Mage 2) in casting time and other details.",
    reverse: {
      name: "Protection from Good 10' Radius",
      flavorText: "You radiate warding power, shielding against radiant interference and benevolent influence.",
      description: "The reverse, Protection from Good (10\u2019 Radius), offers identical protection against creatures of Good Alignment. **When using the Divine version of this spell, make the following changes:** Rank: Cleric 3 Sphere: Protection Cost: 3, +1/additional Intensity Area: 10\u2019 Radius Casting Time: 1 Round Duration: 10 Minutes/Intensity Range: Touch Resist: N/A (Willpower)"
    }
  },

  "protection from fire": {
    name: "Protection from Fire",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "15 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your skin glows faintly red, and flame bends away -- searing heat reduced to a dull warmth.",
    description: "When cast, this spell creates an invisible field that offers complete protection from natural fire. When cast on oneself, the field also absorbs 12 points of magical fire damage per point of Intensity (e.g., red dragon breath). Once the absorption is depleted, any remaining damage from that attack is halved before being applied. When cast on another, the target gains full protection from natural fire and takes only half damage from magical fire sources. No damage absorption applies."
  },

  "protection from mundane missiles": {
    name: "Protection from Mundane Missiles",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A field of force whirls around you. Arrows and stones slow mid-flight, dropping harmlessly to the ground.",
    description: "This spell grants the touched subject complete immunity to non-magical ranged weapons, including arrows, bolts, throwing knives, darts, spears, and hurled objects smaller than SIZ 3. Against magical ranged weapons (e.g., enchanted arrows or a thrown magic axe), or mundane projectiles larger than SIZ 3, the spell reduces the damage by one die type (e.g., 2d8 becomes 1d8+1d6, 1d10 becomes 1d8, 1d8 becomes 1d6, etc. See the Damage Modifier Table in the *Player\u2019s Handbook*, page XX). The spell does not protect against magical attacks such as Magic Missile or Fireball."
  },

  "pyrotechnics": {
    name: "Pyrotechnics",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Mage", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Source of Fire",
    castingTime: "1 Action",
    duration: "See Below",
    range: "360\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You wave your hand through the flame, twisting it into blinding fireworks or clouds of thick, choking smoke.",
    description: "When cast in the presence of an existing flame, this spell allows the caster to create one of two effects: - **Cloud of Choking Smoke**: Thick, black smoke billows from the source, lasting 1 minute per point of Intensity. The smoke fills a radius equal to 100 times that of the original flame source. *Example: A campfire with a 3-foot radius produces a 300-foot-radius smoke cloud.* Natural vision, including Darkvision, is reduced to 2 feet. Creatures within the cloud are subject to Asphyxiation (see the Games Master\u2019s Book, page XX). The smoke rises freely unless confined and may be visible from far away. - **Blinding Fireworks**: Colorful fireworks explode overhead, blinding those within 120 feet who fail an Evade roll. Affected creatures are blinded for 1d4+1 Rounds. The effect covers a radius equal to 10 times the original flame\u2019s radius. The spell typically consumes the original fire source. Larger flames may be partially extinguished (see Fires in the *Games Master\u2019s Guide*, page XX); magical fires are unaffected. Flame-based entities (e.g., fire elementals) take 2d6 x Intensity damage and must pass a Willpower Resistance Roll or flee the caster for 2d4 minutes. Elemental Protection offers no defense. Pyrotechnics has no effect underwater."
  },

  "read thoughts": {
    name: "Read Thoughts",
    school: "Divination",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "15\u2019/Intensity Radius",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "0",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You brush against their mind, and stray thoughts drift into yours -- secrets, desires, and intentions laid bare.",
    description: "This spell allows the caster to read the surface thoughts of one creature per Round of Concentration. Language is not required, but the caster cannot decipher the minds of undead or beings with alien mental structures. The level of detail depends on the target\u2019s intelligence. Sapient creatures yield specific, nuanced thoughts, while non-sapient animals reveal simple urges (e.g., hunger, fear, mating). The caster may scan the area instead of selecting a specific target, detecting the presence of minds within range -- but not their exact type. Read Thoughts can penetrate up to 2 feet of stone or dirt and 2 inches of non-lead metal. Even a thin sheet of lead blocks the spell entirely, while wood provides no resistance. As such, the spell is useful for detecting minds behind a door or within a wooden structure, but ineffective through typical dungeon walls, which are usually over 5 feet thick."
  },

  "remove curse (divine)": {
    name: "Remove Curse (Bestow Curse) (Divine)",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Protection",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "See below",
    range: "Touch",
    resist: "See below",
    intensityScaling: null,
    flavorText: "You place your hand on the cursed victim or item. Magic fractures, and the burden lifts.",
    description: "When cast, Remove Curse typically eliminates the effects of a curse afflicting a creature or item. While it does not remove the cursed nature of an item (such as a weapon, shield, or armor), it does allow a creature bound to such an item to discard it safely. Some powerful curses may only be lifted if Remove Curse is cast at a minimum Intensity, which will be noted in the curse\u2019s description. *For example, curing lycanthropy requires either Cure Disease or Remove Curse at a minimum Intensity of 12 within 3 days of its acquisition.*",
    reverse: {
      name: "Bestow Curse",
      flavorText: "You speak a word of doom, and misfortune takes hold -- sapping strength, clouding clarity, or dimming hope.",
      description: "When reversed, Bestow Curse inflicts one of several debilitating effects on a chosen enemy. The curse lasts for 1 minute per point of Intensity, and the target may resist with an Opposed Willpower roll. Roll 1d100 to determine the nature of the curse inflicted: - 01-25: All skills based on STR, DEX, or CON are 1 Grade more Difficult. Initiative -4, Damage Modifier reduced by 2 steps. - 26-50: All skills based on INT, POW, or CHA are 1 Grade more Difficult. Initiative -4. - 51-75: All Combat Skills and Resistance Rolls are 2 Grades more Difficult. - 76-00: All Failed skill rolls are treated as Fumbles. Note that this differs slightly from the Arcane version on page XX."
    }
  },

  "remove paralysis": {
    name: "Remove Paralysis",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Protection",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 to 4 Targets in a 10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You grasp the person\u2019s frozen limb or frame, and warmth floods through -- freeing muscles locked in magical stasis.",
    description: "This spell frees one or more creatures from any form of paralysis, whether magical or mundane. This includes effects caused by spells like Hold or Slow, as well as paralyzing attacks such as a ghoul\u2019s touch, or paralysis gas used in traps. - **One target**: The paralysis is automatically removed. - **Two targets**: Each makes a Resistance Roll against the original attack\u2019s skill roll, but at two Difficulty Grades easier. - **Three or four targets**: Each makes a Resistance Roll, one Difficulty Grade easier than normal. The spell automatically fails if any physical or magical barrier exists between the caster and the target(s), even if the spell is successfully cast."
  },

  "scare": {
    name: "Scare",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "15\u2019 Radius",
    castingTime: "1 Action",
    duration: "1d4 Rounds, +1 Round/Intensity",
    range: "100\u2019, +30\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Your shadow stretches unnaturally, your voice echoes with menace -- planting fear deep in your target\u2019s mind.",
    description: "When cast, this spell overwhelms several creatures with an intense sense of fear, causing them to tremble and shake uncontrollably. Even those of elven blood are affected, although their Willpower Resistance Rolls are one Difficulty Grade easier. This reduced Difficulty also applies to clerics and druids. Large humanoids (SIZ 21-40) are less susceptible and roll at Easy Difficulty, while Huge humanoids (SIZ 41+) resist at Very Easy Difficulty. The spell has no effect on undead or beings from other planes of existence. Creatures that fail their Resistance Roll are frozen in place for the Duration, paralyzed by terror. If a target Fumbles their roll, they drop any held equipment. If a terrified creature is forced into combat, it may still act, but all skill and Resistance Rolls suffer a --5% penalty. Ranged attacks are one Difficulty Grade harder, and melee attacks deal 1 less point of damage than normal."
  },

  "sigil of warding": {
    name: "Sigil of Warding",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 2 }
    ],
    sphere: "Guardian",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "5\u2019 Radius/Intensity",
    castingTime: "1 Minute/Intensity",
    duration: "Permanent until Discharged",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You draw a glowing rune with your trigger. The next to disturb it unleashes the magical wrath sealed within.",
    description: "This spell creates a magical, invisible inscription on an object or location, designed to prevent entry or access by harmful or unauthorized entities. The cleric sets the specific conditions at the time of casting. Common triggers include attempting to pass without speaking the sigil\u2019s name, or entry by creatures of a certain Alignment, species, religion, gender, size, or type. Only one sigil may be placed on a given area, and it may take any shape, provided it fits within the spell\u2019s radius. For containers such as cabinets or dressers, each drawer or door may have its own separate ward. To cast the spell, the cleric traces glowing lines using an index finger, accompanied by incense and other components. This process takes one minute per point of Intensity. Once completed, the sigil vanishes. If the Intensity exceeds 6, the cleric must also sacrifice one Experience Roll in addition to the normal Magic Point Cost. Common sigil effects include fire or lightning damage (as per the Spell Damage Table on page XX), or afflictions such as blindness, deafness, or paralysis. In most cases, any harmful Divine spell the cleric knows may serve as the sigil\u2019s effect, and Resistance Rolls are made according to the rules of that spell. Sigils can be detected with Detect Magic and removed with Dispel Magic, assuming sufficient Intensity. Thieves of Rank 3 or higher are trained to identify their presence by spotting residual signs such as powdered incense. They may detect a sigil with a Successful Formidable Perception roll and disarm it with a Formidable Mechanisms roll."
  },

  "slow": {
    name: "Slow",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "2 Rounds/Intensity",
    range: "100\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "Time thickens around your enemies -- their movements stagger, their reactions drag.",
    description: "This spell reduces the Movement Rate of one creature per point of Intensity to half its normal value. All affected creatures must be within the Area of Effect at the moment of casting, though they may move freely afterward. In addition to reduced movement, each affected creature suffers a --4 penalty to Initiative (or current Initiative, if combat is already underway) and has its total number of Action Points halved for the Duration of the spell. Slow cancels the effects of Haste when cast, and cannot be stacked with itself or similar magical effects."
  },

  "snake charm": {
    name: "Snake Charm",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 1 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "15\u2019 Radius",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You sway and hum the words to the spell. The serpent stills, hypnotized by rhythm and magic alike.",
    description: "This spell creates a series of hypnotic patterns and gestures that charm up to 10 SIZ points of snakes per point of Intensity. Affected snakes become mesmerized, ceasing all activity and simply swaying in place, staring at the caster. The Duration depends on the snakes\u2019 mental state at the time of casting. Snakes in a torpid state remain charmed for 1d4+2 x10 minutes. Snakes that are active but not hostile are affected for 1d3 x10 minutes. Snakes that are angry or already attacking remain charmed for only 1d4+4 Combat Rounds. Once charmed, the caster does not need to maintain Concentration for the effect to continue."
  },

  "snare": {
    name: "Snare",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "2\u2019",
    castingTime: "3 Minutes",
    duration: "Until Triggered +12 hrs.",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You whisper to the rope or vine, and it stirs -- ready to spring at the next careless step.",
    description: "When cast on a length of vine or rope fashioned into a snare, this spell renders the trap nearly undetectable by mundane means. Perception rolls to spot it are made at Herculean Difficulty. Typically, one end of the snare fastens itself to the ground. Any creature stepping into it triggers the trap, causing it to tighten around one or more limbs -- usually a leg, though the location may be randomly determined if the creature is prone. If the free end is tied to a tree or branch, the spell holds the limb bent until sprung. When triggered, the tree snaps upright, lifting the trapped creature off the ground and inflicting 1d6 points of damage to the entangled location. For creatures over SIZ 20, whether they are lifted is left to the Games Master\u2019s discretion, though the other effects still apply. If the snare catches the creature\u2019s head, there is a 30% chance it wraps around the neck. In such cases, if the snare is tied to a tree, the damage is doubled. Even if the creature survives, the snare begins to constrict, initiating strangulation. Refer to Asphyxiation, Drowning, and Suffocation in the *Games Master\u2019s Guide*, page XX. Escaping the trap requires an Opposed Brawn roll against the snare, which has a Brawn of 125%. The affected limb is magically strengthened, making it especially difficult to break free. However, the snare\u2019s magic weakens over time -- its Brawn decreases by 10% every hour after being triggered. After 12 hours, the enchantment fades and the snare releases automatically. Any bladed magical weapon may be used to cut the snare. The enchanted cord has 8 Armor Points and 12 Hit Points for this purpose. Dispel Magic may also end the effect if cast at sufficient Intensity."
  },

  "speak with animals": {
    name: "Speak with Animals",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Animal, Divination",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 or more Animals",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You murmur the final word. Growls, chirps, and howls of the chosen animal type become clear, carrying thought and meaning.",
    description: "This spell allows the caster to understand, and be understood by, one type of natural animal within 30 feet. The chosen creature must respond to any questions asked, and even hostile animals cooperate freely for the Duration. Non-hostile creatures may go further, offering assistance or helping the caster and their party in some way. The spell applies only to non-sapient animals -- those with the INS Characteristic. It does not grant them intelligence beyond their natural level, so communication is limited to thoughts and knowledge as the creature understands them. The caster may switch communication from one animal to another during the spell\u2019s Duration."
  },

  "speak with dead (arcane)": {
    name: "Speak with Dead (Arcane)",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Creature",
    castingTime: "30 Minutes",
    duration: "See Below",
    range: "10\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You touch the remains. Their eyes glow faintly, and the dead speak -- slow, cryptic, and bound by memory.",
    description: "This spell allows the caster to communicate with one dead creature, asking a limited number of questions over the spell\u2019s Duration. The caster must have the remains present and must speak the language the creature knew in life. The dead will respond based on their knowledge at the time of death. Answers are usually brief, literal, and often cryptic, as the dead tend to be evasive or overly precise. The number of questions allowed depends on the spell\u2019s Intensity (1 Intensity = 1 question), as does the maximum time since death -- outlined in the Time Since Death Table below. Intensity Max. Time Since Death 1-2 1 Week 3-4 1 Month 5-6 1 Year 7-8 10 Years 9+ 100 Years If the spirit\u2019s Alignment differs from that of the caster, it may attempt to resist answering. This requires a Successful Opposed Willpower roll. Additionally, the creature\u2019s Passions can influence its replies. For instance, a Neutral (Dishonest) spirit is likely to offer misleading or deceptive information."
  },

  "speak with dead (divine)": {
    name: "Speak with Dead (Divine)",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Paladin", rank: 2 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Creature",
    castingTime: "10 Minutes",
    duration: "See Below",
    range: "10\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You touch the remains. Their eyes glow faintly, and the dead speak -- slow, cryptic, and bound by memory.",
    description: "This spell allows the caster to communicate with one dead creature, asking a limited number of questions over the spell\u2019s Duration. The caster must have the remains present and must speak the language the creature knew in life. The dead will respond based on their knowledge at the time of death. Answers are usually brief, literal, and often cryptic, as the dead tend to be evasive or overly precise. The number of questions allowed depends on the spell\u2019s Intensity, as does the maximum time since death -- outlined in the Time Since Death Table below. Intensity Max. Time Since Death 1-2 1 Week 3-4 1 Month 5-6 1 Year 7-8 10 Years 9+ 100 Years If the spirit\u2019s Alignment differs from that of the caster, it may attempt to resist answering. This requires a Successful Opposed Willpower roll. Additionally, the creature\u2019s Passions can influence its replies. For instance, a Neutral (Dishonest) spirit is likely to offer misleading or deceptive information."
  },

  "spectral hand": {
    name: "Spectral Hand",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "2 Rounds/Intensity",
    range: "40\u2019/Intensity",
    resist: "N/A/Evade",
    intensityScaling: null,
    flavorText: "A ghostly hand rises from your own -- glowing faintly, ready to deliver touch-based magic from afar.",
    description: "When cast, a translucent, glowing hand appears beside the mage. The caster may move this hand instantly within range and use it to deliver Rank 1 or 2 Touch spells. To do so, the mage must make an Arcane Casting roll for the desired spell and spend the required Magic Points. Casting Time is as listed in the chosen spell\u2019s write-up. If successful, the hand becomes imbued with that spell. While manipulating the hand, the caster cannot move. To touch an opponent, the mage must use an Attack Action and succeed at an Easy roll against their Combat Skill. The attack benefits from flanking or rear-position bonuses if applicable. If the target successfully Evades, the touch is avoided, but the spell remains charged in the hand, allowing the caster to try again in a later Action. Only one Touch spell may be imbued in the hand at a time, though the caster may imbue additional spells during the Duration, one after another. The hand remains until dismissed, dispelled, or destroyed. The hand can be attacked by magic weapons or damaging spells. It may attempt to Evade when targeted. A Successful roll avoids all damage except from area effects; Failure means the hand is hit. Any amount of damage dispels the hand and causes the caster to suffer one Level of Fatigue. Continue progression"
  },

  "spiritual hammer": {
    name: "Spiritual Hammer",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Combat",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "30\u2019/Intensity",
    castingTime: "2 Actions",
    duration: "3 Rounds/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A radiant hammer-shaped weapon appears beside you -- floating, swinging, and striking with divine force at your command.",
    description: "Upon casting, the cleric summons a hammer-shaped force of spiritual energy that immediately launches itself toward a designated target. The hammer has 3 Action Points, which the cleric may spend to command it -- provided they maintain Concentration. Each Action Point allows the hammer to move freely within the spell\u2019s Area of Effect and strike from the most advantageous angle, such as from behind, potentially denying the target their best defense. The hammer attacks using the cleric\u2019s Combat Skill and deals 1d8+1 damage, equivalent to a normal war hammer. The hammer is considered a magical weapon and can strike creatures only harmed by such. Every 3 points of Intensity grants it the equivalent of a +1 Magic Bonus, up to a maximum of +5. This bonus applies only to overcoming Resistance or Magical Immunity -- not to damage. *For example, at Intensity 3, the hammer is treated as a +2 magic weapon for the purpose of hitting resistant or immune creatures.*"
  },

  "stinking cloud": {
    name: "Stinking Cloud",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Action",
    duration: "2 Rounds/Intensity",
    range: "100\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A thick, noxious fog erupts -- eyes burn, stomachs churn, and chaos follows wherever it drifts.",
    description: "When cast, a wispy cloud of noxious fumes forms at a location within range, causing intense nausea in all creatures caught within it. At the start of each Round, affected creatures must succeed at an Endurance Resistance Roll or suffer two Difficulty Grades of penalty to all skill rolls due to uncontrollable retching. This condition persists each Round the creature remains in the cloud, and for 1d4+1 minutes after leaving its Area of Effect. The Duration of the cloud assumes calm weather. Moderate wind reduces its Duration by half, while strong wind disperses it entirely in a single Round. See the *Games Master\u2019s Guide*, page XX for more information on Wind."
  },

  "strength": {
    name: "Strength",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Mage", rank: 2 },
      { class: "Paladin", rank: 2 }
    ],
    sphere: "Combat",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Minute",
    duration: "1 Hour/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your muscles tense and swell -- gripping harder, hitting heavier, every movement filled with power.",
    description: "When cast, this spell imbues the subject with enhanced strength. For mechanical purposes, assume the subject\u2019s STR increases by +4. All Brawn and other STR-based skill rolls gain a +5% bonus. In addition, the subject\u2019s Damage Modifier increases by one step per point of Intensity for the Duration of the spell. steps steps steps Continue progression"
  },

  "suggestion": {
    name: "Suggestion",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Creature",
    castingTime: "2 Rounds",
    duration: "1 Hour/Intensity",
    range: "300\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak calmly and reasonably. Your words nestle into your target\u2019s thoughts like their own idea.",
    description: "This spell allows the caster to influence the actions of a single individual for up to 1 hour per point of Intensity, provided the target Fails a Resistance Roll. The caster must speak a language the target understands, and the suggestion must be phrased as a sentence or two proposing a course of action desirable to the caster. The target will not follow any suggestion that would lead to obvious harm. However, indirect or misleading suggestions -- such as describing a stagnant pool of poison as a crystal-clear spring to a thirsty target -- may succeed. The suggestion must be clearly stated at the time of casting. If the course of action seems especially reasonable, the Games Master may rule that the Resistance Roll is one Difficulty Grade harder."
  },

  "summon insects": {
    name: "Summon Insects",
    school: "Conjuration",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 or more Targets",
    castingTime: "1 Round",
    duration: "1 Round/Intensity",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You whistle softly. A swarm of stinging, biting bugs rises to harass and overwhelm.",
    description: "This spell summons a swarm of normal biting, stinging, or pinching insects at a point of the caster\u2019s choosing within range. Seventy percent of the time, the swarm consists of flying insects such as bees, hornets, or wasps; the remaining 30 percent consists of crawling insects such as ants or beetles. The swarm will appears at a spot of the caster\u2019s choosing within range of the spell and attack any target the caster designates. Refer to Insect Swarm in the *Monster Manual*, page XX, for full swarm mechanics. The total SIZ of the swarm equals 3 per point of Intensity. *For example, a casting at Intensity 8 produces a SIZ 24 swarm, capable of attacking two average-sized humanoids and inflicting 1d4 damage to all Hit Locations.* The caster must maintain Concentration throughout the spell\u2019s Duration; breaking Concentration causes the swarm to disperse early. If the spell is cast underground, there is a 30% chance it summons 1d4 giant ants, plus 1 additional ant per point of Intensity beyond the first. If a giant ant lair is nearby, they automatically respond instead. Each ant operates independently and may attack separate targets. This spell cannot summon swarms into environments unsuitable for insect survival."
  },

  "tongues (arcane)": {
    name: "Tongues (Confuse Tongues) (Arcane)",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your mouth opens, and foreign words flow -- perfect and fluent, no matter the language.",
    description: "This spell allows the caster to both speak and understand any one language spoken by a sapient species, including those of newly encountered creatures. The language is chosen at the time of casting and grants the caster perfect fluency and native-level accent. The caster can understand and be understood by all within hearing range, typically about 60 feet. This includes the ability to read and comprehend any racially written script used by the chosen species. The spell does not make the caster more persuasive or likable -- it only enables communication. For every 3 points of Intensity, the caster may choose an additional language to speak and understand. *For example, at Intensity 3, the caster could communicate with both goblins and elves, potentially acting as a translator or mediator.*",
    reverse: {
      name: "Confuse Tongues",
      flavorText: "You twist the meaning of speech. Words slur and tangle -- gibberish, even to the one who speaks them.",
      description: "The reverse of this spell, Confuse Tongues, cancels Tongues if cast at an Intensity equal to or greater than its Magnitude. If cast independently, it causes confusion in all verbal communication within a 60-foot radius. *Note that this spell differs from the Rank 3 Divine spell. See page XX.*"
    }
  },

  "tree": {
    name: "Tree",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Round",
    duration: "1 Hour/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You transform into a sturdy tree. Roots grip the earth, bark shields you, and danger passes by.",
    description: "This spell transforms the caster and all carried gear into a small tree, a large dead trunk with a few branches, or a large shrub or bush -- at the caster\u2019s discretion. While transformed, the caster is fully aware of their surroundings but is otherwise treated as an ordinary plant. In this form, the caster has 6 Armor Points and receives damage normally, though Hit Locations should not be revealed until the caster returns to normal form. Special Effects triggered while in tree form should be interpreted with context. For example, Bleed may appear as dripping sap, while Trip Opponent is likely ignored. The caster may end the spell at will, instantly reverting to normal form as a Free Action. Upon return, any damage sustained is applied to the appropriate Hit Locations."
  },

  "trip": {
    name: "Trip",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Item or Object",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "Athletics",
    intensityScaling: null,
    flavorText: "You flick your hand, and force yanks at your foe\u2019s feet -- toppling them with invisible mischief.",
    description: "This spell is cast on a loose object no longer than 10 feet -- such as a stick, stone, rope, vine, or pole -- causing it to subtly lift and attempt to trip any creature that passes over or near it. Affected creatures must make a Resistance Roll to avoid falling; the roll becomes one Difficulty Grade harder if the creature is moving faster than a walk. The number of potential targets is based on the object\u2019s size, typically one man-sized creature per 5 feet of length, unless the Games Master rules otherwise due to formation or spacing. Creatures that fall while moving faster than a walk take 1d4 damage to a random Hit Location. On soft ground, this is reduced to 1d2. In either case, the victim must use the Regain Footing action before standing again."
  },

  "vampiric touch": {
    name: "Vampiric Touch",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "Caster",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Your hand pulses with dark energy. On contact, life drains from your foe -- warmth flowing into you.",
    description: "When cast, the mage drains Hit Points from each of the target\u2019s Hit Locations through touch. The spell takes effect either immediately upon a successful touch or automatically after 10 minutes, whichever comes first. Once discharged, the spell is expended. The amount drained is determined by the caster\u2019s Rank (see table below). The result is rolled once and applied equally to all of the target\u2019s Hit Locations. The same number of Hit Points is then added to the caster\u2019s corresponding locations. If the caster has Hit Locations that the target does not (such as wings or a tail), they still gain the full benefit. However, any damage drained from a location the caster does not possess is lost. Worn and natural armor offer no protection against this spell, though magical Armor Points reduce the damage normally. A Successful Evade or Parry prevents the touch and negates the effect. 1 \\- 2 1d2 3 1d4 4 1d6 5 1d8 The caster\u2019s total Hit Points may not exceed twice their normal maximum in any location. Multiple castings may or may not provide additional benefit, depending on the caster\u2019s current totals. Any excess Hit Points gained through Vampiric Touch expire after 1 hour. The victim may recover lost Hit Points through normal or magical healing. Undead are immune to this spell."
  },

  "warp wood": {
    name: "Warp Wood (Straighten Wood)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 1 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Wooden Item or Object",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "Athletics",
    intensityScaling: null,
    flavorText: "You twist your fingers, and the wood groans -- bending, splintering, and warping beyond use.",
    description: "This spell causes wood to twist and bend, potentially rendering it unusable. The caster may affect 1 Thing or 5 Hit Points of wood per point of Intensity. Use Things for small items and Hit Points for larger structures such as doors, walls, or beams. It\u2019s not always necessary to warp an entire object to disable it; for instance, a single bent plank might be enough to cause a boat to leak, depending on the situation. The full piece of wood must be covered for the effect to take hold, unless the Games Master rules otherwise. When targeting an enchanted wooden object, the casting roll is Opposed by the skill of the original caster. If the skill is unknown, assume 60%, +20% per spell Rank above 1 (Rank 2 = 80%, Rank 3 = 100%, and so on). For wooden magic items, use the item\u2019s Intensity x10 as the opposing skill.",
    reverse: {
      name: "Straighten Wood",
      flavorText: "With a firm gesture, splinters fuse and warped lines smooth -- restoring the wood to its true form.",
      description: "The reverse of this spell, Straighten Wood, can undo the effects of Warp Wood or straighten naturally warped or crooked wooden items."
    }
  },

  "water walk": {
    name: "Water Walk",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Ranger", rank: 2 }
    ],
    sphere: "Elemental (Water)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 or more Targets",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You bless your feet. With each step, the water firms beneath you -- bearing your weight like solid stone.",
    description: "When cast, this spell allows one or more subjects to walk on the surface of liquids or liquefied solids -- including water, oil, snow, mud, or quicksand -- as though walking on solid ground. Subjects move across these surfaces at their normal Movement Rate and may leave shallow footprints in softer materials like mud or snow. If cast while underwater, the spell causes the subject to rise toward the surface at a rate of 20 feet per Round. An unwilling target in this case may Evade to avoid the caster\u2019s touch. Each level of Intensity allows the spell to affect one additional subject."
  },

  "web": {
    name: "Web",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "1 Action",
    duration: "20 Minutes/Intensity",
    range: "30\u2019/Intensity",
    resist: "Evade, plus See Below",
    intensityScaling: null,
    flavorText: "Sticky strands burst forth, coating walls and floors -- ensnaring anything that moves through their grasp.",
    description: "This spell causes thick, sticky strands of webbing to shoot from the caster\u2019s hand. The webs may be anchored floor to ceiling or wall to wall to block movement, or sprayed directly at opponents to entangle them. If a target has space to escape, they may attempt an Evade roll to move outside the Area of Effect. This requires an available Action Point. A Failed Resistance Roll results in immobilization, with 1d3 random Hit Locations entangled. A webbed limb cannot be used, and if the chest, abdomen, or a leg is ensnared, all physical skill rolls (except Brawn rolls to escape) are made one Difficulty Grade harder. If the head is entangled, the victim begins to suffocate (see Asphyxiation, Drowning, and Suffocation in the *Games Master\u2019s Guide*, page XX). On the following Turn, the victim may spend an Action Point to attempt to break free. Magic webbing has 6 Armor Points and Hit Points equal to 3x the spell\u2019s Intensity. Escaping requires winning an Opposed Brawn roll against the web\u2019s Stickiness, which equals the caster\u2019s Arcane Casting skill. If the roll Fails, the victim remains trapped. Attempting to cut free exposes any tool or weapon used to the same entangling effects. Despite common belief, webs are not flammable. However, they can be slowly burned through by applying open flame -- fire damage bypasses the web\u2019s Armor Points."
  },

  // =========================================================================
  //  RANK 2 REVERSE / ALIAS ENTRIES
  // =========================================================================

  "breathe air": { name: "Breathe Air", aliasOf: "breathe water", version: "reverse" },
  "continual darkness": { name: "Continual Darkness", aliasOf: "continual light", version: "reverse" },
  "cause blindness of deafness": { name: "Cause Blindness of Deafness", aliasOf: "cure blindness or deafness", version: "reverse" },
  "cause disease": { name: "Cause Disease", aliasOf: "cure disease", version: "reverse" },
  "cause serious wounds": { name: "Cause Serious Wounds", aliasOf: "cure serious wounds", version: "reverse" },
  "detect good (arcane)": { name: "Detect Good (Arcane)", aliasOf: "detect evil (arcane)", version: "reverse" },
  "chill metal": { name: "Chill Metal", aliasOf: "heat metal", version: "reverse" },
  "obscure passions": { name: "Obscure Passions", aliasOf: "know passions", version: "reverse" },
  "obscure object": { name: "Obscure Object", aliasOf: "locate object", version: "reverse" },
  "protection from good 10' radius": { name: "Protection from Good 10' Radius", aliasOf: "protection from evil 10 foot radius", version: "reverse" },
  "bestow curse": { name: "Bestow Curse", aliasOf: "remove curse (divine)", version: "reverse" },
  "confuse tongues": { name: "Confuse Tongues", aliasOf: "tongues (arcane)", version: "reverse" },
  "straighten wood": { name: "Straighten Wood", aliasOf: "warp wood", version: "reverse" },

  // =========================================================================
  //  RANK 3 SPELL ENTRIES (A-F)
  // =========================================================================

  "aerial servant": {
    name: "Aerial Servant",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Summoning",
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "See Below",
    castingTime: "1 Minute or 2 Actions",
    duration: "1 Day/Intensity",
    range: "30\u2019",
    resist: "N/A/Willpower",
    intensityScaling: null,
    flavorText: "You summon an invisible force \u2013 silent, strong, and relentless in carrying out your will.",
    description: "This spell summons an invisible entity tasked with retrieving a specified creature or item and bringing it before the cleric. Before casting, the cleric must draw a protective circle and cast Protection from Evil, a process that takes 1 minute. If the cleric has a magical item that controls aerial servants, these requirements are waived and the Casting Time is reduced to 2 Actions. Without either condition, the summoned servant will turn on the caster, attempting to kill them before returning to its home plane.\n\nThe caster must clearly describe the target and its suspected location. The aerial servant will not fight on the caster\u2019s behalf, except as needed to retrieve the designated item or creature. Unless the target can see invisible creatures, the servant attacks from surprise (*Games Master\u2019s Guide*, page XX), using a Very Easy Grapple roll (see the *Games Master\u2019s Guide*, page XX). The target may attempt a Formidable Perception check to sense the attack and, if Successful, may then attempt a Formidable Evade roll. Once attacked, the victim can sense the servant\u2019s presence and may strike back, though all attacks are one Difficulty Grade harder. If not attacked within 1 Round, the servant\u2019s location is lost again.\n\nIf the servant grapples successfully, the victim gets one chance to break free with a Brawn check Opposed by the servant\u2019s Brawn of 115%. If this Fails, no further escape is possible.\n\nThe aerial servant can carry a creature up to SIZ 33 or a load totaling 99 ENC, or a mix thereof (use the guideline: 1 SIZ = 3 ENC).\n\nOnce the spell\u2019s Duration ends or the caster dies, the servant vanishes, returning to its plane. The caster may also dismiss it at will.\n\nSee Air Elemental and Aerial Servant in the *Monster Manual*, pages XX and XX, for full creature details."
  },

  "air walk": {
    name: "Air Walk",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Elemental (Air)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your feet press lightly on the wind as you stride across open air like climbing unseen stairs.",
    description: "This spell allows one creature (up to SIZ 50) to walk on air as though it were solid ground. The target may ascend or descend at an angle of up to 45 degrees. Movement Rate is halved when ascending, but remains normal when moving level or downward.\n\nWind strength can alter the target\u2019s Movement Rate as follows: Wind STR 31-60: Movement into the wind is reduced to two-thirds normal; moving with the wind increases it by one-third. Wind STR 61-90: A Brawn roll is required to move into the wind. If Successful, Movement Rate is halved. Moving with the wind requires no roll and increases Movement Rate by half. Wind STR 91+: A Hard Brawn roll is required to move into the wind. If Successful, Movement Rate is reduced to one-third normal. Moving with the wind requires no roll and increases Movement Rate to two-thirds normal. (See Weather Rules in the *Games Master\u2019s Guide* page XX for more on Wind STR.)\n\nAir Walk may be cast on a mount trained for it using the Animal Handling skill (see page XX of the *Player\u2019s Handbook*). This counts as one \u201ctrick.\u201d If the mount is untrained, the rider must make a Successful Ride roll each Round to stay in control. On a Failed roll, the mount fails to move. On a Fumble, the rider and/or mount may suffer a Minor Injury (1d2 to 1d4 damage, ignoring armor)."
  },

  "animal growth": {
    name: "Animal Growth (Shrink Animal)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "250\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "The creature swells with magic \u2013 muscles bulging, eyes sharpening, power multiplying.",
    description: "When cast, this spell enhances up to twice the caster\u2019s Rank in animals within the Area of Effect, transforming them into stronger, tougher versions of themselves. The animals appear larger, though their SIZ category remains the same for mechanical purposes. For this spell, an animal is any non-sapient, non-magical creature \u2013 such as birds, mammals, reptiles, or fish. It has no effect on beings with the INT Characteristic or supernatural creatures like pegasi, dragons, or basilisks.\n\nAffected animals gain bonuses based on their original SIZ (see accompanying table). For example, a Rank 3 druid could enhance nine SIZ 8 wolves within a 10\u2019 radius, adjusting their Attributes based on the SIZ 5-8 column. Thus, they would gain a +10% modifier to Brawn, a +6% modifier to physical skills (those with STR as part of its Base Level), and increase the Damage Modifier by two steps and Hit Points in each location by +2.\n\n**Enhancement Effects Table:** SIZ 1-4: Brawn +5%, Physical +3%, DM +1 Step, Armor +0, HP +1. SIZ 5-8: Brawn +10%, Physical +6%, DM +2 Steps, Armor +0, HP +2. SIZ 9-12: Brawn +15%, Physical +9%, DM +3 Steps, Armor +1, HP +3. SIZ 13-16: Brawn +20%, Physical +12%, DM +3 Steps, Armor +2, HP +4. SIZ 17-20: Brawn +25%, Physical +15%, DM +4 Steps, Armor +3, HP +5. SIZ 21-24: Brawn +30%, Physical +18%, DM +4 Steps, Armor +3, HP +6. SIZ 25-28: Brawn +35%, Physical +21%, DM +5 Steps, Armor +4, HP +7. SIZ 29-32: Brawn +40%, Physical +24%, DM +5 Steps, Armor +4, HP +8. SIZ 33-36: Brawn +45%, Physical +27%, DM +6 Steps, Armor +5, HP +9. SIZ 37-40: Brawn +50%, Physical +30%, DM +6 Steps, Armor +5, HP +10. Follow progression.",
    reverse: {
      name: "Shrink Animal",
      flavorText: "You whisper a command. The creature contracts \u2013 smaller, lighter, easier to control or hide.",
      description: "The reversed version (Shrink Animal) weakens animals instead. It affects three times the caster\u2019s Rank in animals and applies the inverse of the table\u2019s modifiers. The same SIZ 8 wolves from the previous example modify their Attributes accordingly: a -10% modifier to Brawn, a -6% modifier to physical skills (those with STR as part of its Base Level), and decreasing Damage Modifier by two steps and Hit Points in each location by -2."
    }
  },

  "animal summoning i": {
    name: "Animal Summoning I",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Animal",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 mile Radius",
    castingTime: "1 Round",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You call to the wild. Nearby creatures answer, rushing to your side with primal loyalty.",
    description: "This spell calls one or more normal or giant-sized mundane animals to aid the caster. The type of animal summoned is chosen by the caster, but only non-supernatural, non-fantastical creatures may respond \u2013 no unicorns, dragons, basilisks, or similar entities. Only animals within the spell\u2019s Area of Effect can respond. The Games Master may adjust the casting Difficulty based on the likelihood of the chosen animals being nearby, depending on terrain and environment.\n\nThe total combined SIZ of the summoned animals may not exceed Intensity x6. For example, an Intensity 3 casting could summon one SIZ 17 boar or two SIZ 8 wolves (for a total SIZ of 16 out of a max of 18). The maximum SIZ of any individual animal is 45, and no more than eight animals will respond, regardless of size.\n\nSummoned animals arrive 1d20 minutes after casting unless they are already nearby. They remain for the Duration of a Scene \u2013 typically from one combat to the end of a short-term quest \u2013 depending on the danger involved and at the Games Master\u2019s discretion (see the *Games Master\u2019s Guide*, page XX). They will assist the caster as best they can but will not remain if mistreated, and may turn hostile if abused."
  },

  "animate dead": {
    name: "Animate Dead",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 2 },
      { class: "Mage", rank: 3 }
    ],
    sphere: "Necromantic",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity (+1 EXP)",
    area: "30\u2019 Radius",
    castingTime: "5 Rounds",
    duration: "Permanent",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You chant over bones or a corpse. It shudders, then rises \u2013 empty-eyed and bound to serve.",
    description: "Animate Dead uses the physical remains of one or more corpses to create either skeletons or zombies, depending on their current state of decay. The spell animates one skeleton per point of Intensity or one zombie per 2 Intensity. Since skeletons have higher DEX to offset their lack of intellect, the caster may enchant them (only) to use ranged weapons in combat. This costs 1 additional level of Intensity.\n\nBoth skeletons and zombies must be roughly human-sized or smaller \u2013 essentially, SIZ 20 or less. That said, a corpse of any size can be animated. To animate a larger corpse as a skeleton costs 1 Intensity per 6 SIZ; as a zombie, it costs 1 Intensity per 3 SIZ. The spell grants each skeleton or zombie an Intensity vs. Turning equal to the Intensity used to animate it.\n\nFor example: At 6 Intensity and 8 Magic Points, the caster could animate 6 skeletons, 3 skeletal archers, 3 zombies, or 1 SIZ 25 ogre skeleton. An ogre zombie would require 9 Intensity and 11 Magic Points however. The skeletons would possess an Intensity vs. Turning of 1, the zombies a 2, and the ogre skeleton an Intensity vs. Turning of 5. This means that a zombie ogre would have an Intensity vs. Turning of 9, making it very difficult to contend with by all but the most powerful of clerics.\n\nIn addition to spending the required Magic Points, the caster must sacrifice 1 Experience Roll per 6 Intensity to infuse the remains with part of their life force. This lets the undead follow commands and act with some independence. It also gives them a Permanent Duration, and the animating magic can\u2019t be dispelled. The caster may give the undead one sentence of instruction per point of INS, no matter the type.\n\nAnimating the dead is considered an Evil act in terms of Alignment. It requires dead bodies of the appropriate type to be present and within the spell\u2019s range. They don\u2019t have to be visible, though \u2013 so casting in a cemetery or burial ground can have dramatic results. Buried skeletons and zombies can claw to the surface in as little as 1d3+2 Rounds.\n\nTypically (though not always), Evil spellcasters animate skeletons and zombies. Still, corpses in places steeped in necromantic magic may spontaneously animate without a caster. That\u2019s why ancient tombs and burial grounds are often crawling with undead, even when no necromancer is around. If the area\u2019s Intensity is higher than that of the undead, they adopt the area\u2019s Intensity vs. Turning. But undead can\u2019t spontaneously animate with a higher Intensity than the area itself.\n\nCorpses in such areas animate on their own after a number of days equal to 5 minus the area\u2019s Intensity. If the result is less than zero, the corpse animates in 1d12x2 hours, minus 1 hour for each point below zero.\n\n**Skeletons:** Since skeletons lack flesh and muscle, their Characteristics are based on the racial average of the creature being animated. Multiply average STR x0.85, CON x0.85, and change INT to INS, with a value of 8. POW x0.5 and DEX is multiplied by 1.25. Skeletons lack CHA. Their mode and Movement Rate is equal to that possessed in life; however, a skeletal fish would not be able to swim and a skeletal bird could not fly. They have the following skills at Base Level +30%: Athletics, Brawn, Endurance, Perception, Unarmed, and Willpower. Evade is base +40%. Their higher DEX compensates for the loss of intellect and allows the use of melee weapons in combat; replace original Combat Skill with Combat Skill (Skeletal Warrior) equal to Athletics skill, with 2 or 3 melee weapons making up their proficiency. Skeletons possess the Creature Abilities Immunity (Fear, Sleep, and Charm) and Undead, and those of SIZ 20 or smaller have an Intensity vs. Turning of 1. Larger skeletons have an Intensity vs. Turning equal to the Intensity required to animate them.\n\n**Zombies:** The freshness of a corpse doesn\u2019t affect a zombie\u2019s durability. Much of a zombie\u2019s strength and toughness comes from the animating magic itself. Because zombies retain flesh and muscle, unlike skeletons, apply changes to the specific corpse being animated \u2013 not the racial average. A strong creature in life will still be strong as a zombie. Adjustments: Multiply STR and CON by x1.25, INT becomes INS with a value of 8. POW is x0.5, DEX is x0.6. Zombies lack CHA. Zombies move at a flat rate of 5 feet per Round, regardless of their original speed. Unlike skeletons, zombies usually retain all previous modes of Movement, as long as the corpse is mostly intact. Zombies have the following skills at Base Level +30%: Athletics, Brawn, Endurance, Evade, Perception, Unarmed, and Willpower. Unlike skeletons, zombies typically lack a Combat Skill, instead relying on their Unarmed skill. Zombies possess the Creature Abilities Immunity (Fear, Sleep, and Charm) and Undead, and those of SIZ 20 or smaller have an Intensity vs. Turning of 2. Larger zombies use the Intensity required to animate them as their Intensity vs. Turning.\n\nThe Divine version of this spell operates exactly as above, with the following changes: Rank: Cleric 2, Sphere: Necromantic, Cost: 3, +1/additional Intensity (+1 EXP), Casting Time: 1 Round (instead of 5 Rounds)."
  },

  "anti-plant shell": {
    name: "Anti-Plant Shell",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 Radius",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A shimmering barrier surrounds you. Roots, vines, and thorns recoil, unable to reach your space.",
    description: "When cast, this spell creates an invisible globe that shields those inside from hostile plants or plant-based creatures, such as shamble mounds and tree\u2019nt (see the *Monster Manual*). These creatures can\u2019t willingly enter the barrier. The shell moves with the caster, but if the caster tries to push it into a plant creature, the magic immediately ends."
  },

  "atonement": {
    name: "Atonement",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "All",
    cost: { base: 3, type: "special" },
    costDisplay: "3, plus See Below",
    area: "1 Target",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "With solemn words and ritual, you cleanse guilt and divine anger \u2013 restoring balance to the soul.",
    description: "When the spell is cast, the caster can lift the burden of actions the subject either didn\u2019t know they committed or was forced to perform against their will. These acts often result in breaking an Oath, a negative change to one or more of the target\u2019s current Passions, or the gain of a new harmful Passion \u2013 including those imposed through magic. For the spell to take effect, the subject must feel genuine remorse. Even if they acted unwillingly, they need to experience the same level of guilt as if they had chosen to act freely. Without true repentance, the magic won\u2019t work.\n\nA subject may also atone for actions they chose to take, though this path usually demands more effort and personal cost. To do so, the character must earn one or more Experience Rolls by doing something that directly counters the misdeed. These must be newly earned rolls \u2013 unspent ones don\u2019t count. The number required equals one-tenth of the score in the Passion being atoned for. If a character refuses to atone for an unwilling or unknown action when given the chance, it counts as if they performed the deed knowingly.\n\nThis spell gives characters like clerics, druids, paladins, and rangers (who may have lost Class Abilities or powers due to breaking an Oath or shifting their Alignment) a path to make things right. With atonement complete, they can be reinstated in their order and regain any lost Class Abilities."
  },

  "big interposing hand": {
    name: "Big Interposing Hand",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A massive spectral hand appears between you and danger, ready to block or shove with great force.",
    description: "When cast, the mage conjures a large, magical hand made of shimmering, translucent force. It appears between the caster and a chosen opponent, automatically staying between them without requiring Concentration. The hand holds its position even if it becomes invisible, polymorphed, or otherwise altered. The caster can redirect the hand to block a different target at any time during the spell\u2019s Duration. Ranged attacks against the caster are Formidable due to the visual distortion created by the hand. However, a Successful attack still hits the caster. Melee weapons and spells can damage the hand, which has 2 Armor Points and 5 Hit Points per level of Intensity, up to a maximum of 10 Armor Points and 25 Hit Points. If destroyed, the hand vanishes.\n\nBig Interposing Hand blocks opponents of SIZ 50 or smaller from reaching the caster, cutting their Movement Rate in half. Larger creatures are unaffected.\n\n**Interposing Hand Effects Table:** Intensity 1: Cost 3, 1 Round, 30\u2019 range, 2 AP, 5 HP. Intensity 2: Cost 4, 2 Rounds, 60\u2019 range, 4 AP, 10 HP. Intensity 3: Cost 5, 3 Rounds, 90\u2019 range, 6 AP, 15 HP. Intensity 4: Cost 6, 4 Rounds, 120\u2019 range, 8 AP, 20 HP. Intensity 5: Cost 7, 5 Rounds, 150\u2019 range, 10 AP, 25 HP. Continue progression."
  },

  "call woodland beings": {
    name: "Call Woodland Beings",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Animal, Summoning",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "300\u2019/Intensity Radius",
    castingTime: "See Below",
    duration: "See Below",
    range: "0",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You whisper to the forest. Creatures of magical power step forward \u2013 cautious but willing to aid.",
    description: "When cast, this spell summons one or more woodland creatures to aid the caster. It can only be used outdoors and is limited to wilderness areas. Once the ritual begins, the caster must remain uninterrupted until the summons is answered or 30 minutes have passed. The caster may call any of the creatures listed in the table below. The chance of each responding depends on the type of woodland in which the spell is cast.\n\n**Call Woodland Beings Table:** Brownies: 2d8, Light 30%, Mod 20%, Dense 10%. Centaurs: 1d4, Light 5%, Mod 30%, Dense 5%. Dryads: 1d4, Light 1%, Mod 25%, Dense 15%. Pixies: 1d8, Light 10%, Mod 20%, Dense 10%. Satyrs: 1d4, Light 1%, Mod 30%, Dense 10%. Sprites: 1d6, Light 0%, Mod 5%, Dense 25%. Tree\u2019nt: 1, Light -, Mod 5%, Dense 25%. Unicorn: 1, Light -, Mod 15%, Dense 20%.\n\nEach additional level of Intensity increases the spell\u2019s Area of Effect, which in turn boosts the chance of a creature responding by 10%. Tree\u2019nts and unicorns cannot be summoned in Light Woodlands.\n\nThe caster may attempt the summons up to three times during the casting, but must choose a different type of creature with each new attempt. Once a creature responds, no further summons can be made.\n\nEven if the spell successfully summons a creature, it may still resist with an Opposed Willpower roll. This should be handled as a Group Roll (see *Games Master\u2019s Guide*, page XX), since those who succeed can influence others in the group. If the Resistance Fails, the summoned creatures won\u2019t react with hostility and will assist the caster in any way they can, within their natural capabilities. If the caster (or any member of the party) is of Evil Alignment, the summoned creatures are allowed another Willpower roll once they recognize the true Alignment. This second roll is one Difficulty Grade easier and doesn\u2019t need to be Opposed. If Successful, the creatures will try to leave at the first opportunity.\n\nSummoned creatures will help in any way they are willing and able, provided the request doesn\u2019t conflict with their moral nature. They remain for the Duration of a Scene \u2013 ranging from a single battle to an entire quest \u2013 depending on the level of danger, as judged by the Games Master. If mistreated, they may leave early or even turn against the caster and their companions."
  },

  "charm monster": {
    name: "Charm Monster",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Week/Intensity",
    range: "180\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak the charm. The creature\u2019s gaze softens \u2013 they now see you as an ally.",
    description: "This spell is an enhanced version of the Rank 1 spell Charm Being (see page XX). It affects all living creatures of SIZ 20 or less within the Area of Effect, or a single creature of any SIZ. In all other respects, it functions identically to Charm Being."
  },

  "cloud kill": {
    name: "Cloud Kill",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "2 Rounds/Intensity",
    range: "30\u2019",
    resist: "Endurance",
    intensityScaling: null,
    flavorText: "You conjure a rolling green fog. It spreads fast, clinging and choking life from everything inside.",
    description: "The caster creates a deep green, 40-foot-long cloud of thick, toxic fog, 30 feet high and deep. Its poison is so potent that even holding one\u2019s breath offers no protection. The cloud moves away from the caster at a rate of 10 feet per Round, following the contours of the ground. Heavier than air, it sinks into low areas and seeps into cracks and sinkholes, making it effective against burrowing vermin and insects.\n\nAll living beings within the cloud must attempt an Endurance roll. The Difficulty Level depends on either the target\u2019s Rank or SIZ (whichever is more favorable).\n\n**Cloud Kill Effects Table:** SIZ 1-3 (no Rank): Impossible Endurance, instant and automatic death. Rank 0-1 / SIZ 4-30: Hard Endurance, collapse Incapacitated after an Onset Time of 1 Round; death follows after a further \u00bd CON Rounds; effects persist even after leaving the cloud. Rank 2+ / SIZ 31+: Standard Endurance, collapse Incapacitated after an Onset Time of 1d3+1 Rounds; death follows after a further CON Rounds if still in the cloud; effects subside 1d3 Rounds after leaving.\n\nFailing the Endurance roll causes the victim to collapse after a brief, violent fit of coughing and wheezing. Death follows shortly after. Larger creatures and seasoned adventurers may survive if they escape the cloud quickly, but others continue to suffer until the poison kills them \u2013 even after exiting the Area of Effect.\n\nThere is no mundane cure for this gas. Spells such as Slow Poison or Neutralize Poison may offer relief as described in their effects.\n\nThe Duration of Cloud Kill assumes calm weather. A moderate wind cuts the Duration in half, while a strong wind disperses the cloud in 1 Round (see Wind in the *Games Master\u2019s Guide*, page XX)."
  },

  "commune": {
    name: "Commune",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity, +1 EXP",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You lower your head and open your mind to the divine. Clarity and sacred truth flash through.",
    description: "This spell allows the caster to enter a meditative, trance-like state to contact their deity or one of its representatives. The caster may ask one yes-or-no question per level of Intensity. The Games Master may allow a short answer \u2013 no more than five words \u2013 if added detail feels appropriate. Answers are always truthful. However, since the deities of Greymyr are not omniscient, a response such as \u201cI\u2019m unsure\u201d is perfectly valid, even if disappointing to the caster. The spell cannot reveal the future. It only provides answers about events that have already happened or are currently taking place.\n\nBecause divine beings value their time and dislike being bothered needlessly, each additional use of this spell within the same 30-day period increases the Difficulty by one Grade, whether the previous attempt succeeded or not. Each use also resets the 30-day timer. For example, a second attempt becomes Formidable, and a third becomes Herculean. Once the Difficulty reaches Hopeless, no further attempts may be made. If a third attempt Fails at this level, the caster must wait a full month before trying again."
  },

  "cone of cold": {
    name: "Cone of Cold",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Round",
    duration: "Instant",
    range: "0",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You release a blast of frigid air. Everything it touches freezes in bitter frost.",
    description: "The caster unleashes a cone of blistering cold from their hand. The Area of Effect is a 90-degree arc extending 10 feet per level of Intensity. All creatures caught within the area take 1d6+1 damage per 2 points of Intensity, or fraction thereof. Roll damage once and apply it to each of the target\u2019s Hit Locations. Worn armor offers only half its usual protection, but natural armor and magical Armor Points reduce damage as normal. If a Huge creature is only partially within the cone, the Games Master may determine how many locations are affected by whatever means they see fit.\n\nA victim who successfully rolls Evade and throws themselves prone takes no damage. A character with the Artful Dodger ability may Evade without going prone, but in that case, a Success only halves the damage \u2013 unless the character is within 5 feet of the cone\u2019s edge. After taking damage, a creature has a chance of becoming frozen. Roll a percentage equal to (modified damage) x5%. If frozen, the target becomes encased in ice and is unable to move or act. Once per Round, they may spend an Action Point and attempt a Brawn roll to break free. They remain immobilized until they succeed.\n\n**Cone of Cold Effects Table:** Intensity 1: Cost 3, 10\u2019 long, 1d6+1 damage. Intensity 2: Cost 4, 20\u2019 long, 1d6+1 damage. Intensity 3: Cost 5, 30\u2019 long, 2d6+2 damage. Intensity 4: Cost 6, 40\u2019 long, 2d6+2 damage. Intensity 5: Cost 7, 50\u2019 long, 3d6+3 damage. Continue progression."
  },

  "confusion": {
    name: "Confusion",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 4 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "60\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "120\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "Your words warp reason. The target\u2019s mind fractures \u2013 friend becomes foe, and intent dissolves.",
    description: "When this spell is cast, 1d3 creatures within the Area of Effect that fail their Resistance Roll become afflicted with magical confusion. Each additional level of Intensity affects another 1d3 creatures, up to a maximum of 4d3. Targets closest to the caster are affected first. Creatures under the spell\u2019s effects may attempt a new Resistance Roll at the start of each Round to break free. If they fail, roll on the Confusion Table to determine that Round\u2019s specific effect. A creature that wanders away will always move in the direction opposite the caster. Once this occurs, it may no longer attempt further Resistance Rolls for the Duration of the spell. Large creatures (SIZ 21\u201340) are less vulnerable to the spell and make their Resistance Roll at Easy Difficulty. Huge creatures (SIZ 41+) roll at Very Easy Difficulty.\n\n**Confusion Effects Table:** 01-10: Act normally for 1 Round. 11-20: Attack the caster or the caster\u2019s allies for 1 Round. 21-50: Stop in place and babble incoherently for 1 Round. 51-70: Meander away from the caster for 10 Rounds. 71-00: Attack the nearest creature for 1 Round.\n\n**Optional Rule:** A gamemaster who wishes may use the Insanity Conditions Experienced, rolling on the Immediate Table (see the *Games Master\u2019s Guide*, page XX). The effects of the insanity conditions last until the Duration of the spell ends, or they resist."
  },

  "conjure elemental": {
    name: "Conjure Elemental",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "10 Minutes/Intensity",
    range: "180\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You reach across planes, and an elemental emerges \u2013 yours to command until dismissed.",
    description: "There are four distinct versions of the Arcane Conjure Elemental spell: Earth, Air, Fire, and Water. Knowing one version does not grant access to the others. The caster may conjure only one elemental per day using this spell. For example, a caster with Conjure Earth Elemental can summon a single earth elemental within a 24-hour period, regardless of how many times the spell is memorized. However, if the caster has both Conjure Earth Elemental and Conjure Fire Elemental memorized, they may summon one of each per day. In addition to the core types, this spell also supports specific subtypes such as Conjure Efreeti, Conjure Salamanders, and other unique elemental variants.\n\nBefore casting, the caster must have access to a sufficient quantity of the corresponding elemental material: A large fire for a fire elemental, a water source for a water elemental, open air with wind for an air elemental, earth or stone for an earth elemental (easily found in most environments).\n\nWhen cast, the spell summons a Medium elemental from its native plane. Upon arrival, the elemental immediately turns on the caster unless brought under control through an Opposed Willpower roll. If the caster Succeeds, they control the elemental as long as they maintain Concentration. The caster must repeat this roll every 10 minutes or whenever they lose Concentration. If control is lost, the elemental attacks the caster \u2013 though it won\u2019t abandon a current opponent, it avoids others and focuses solely on the caster.\n\nAnother spellcaster may attempt to wrest control of the elemental using Dispel Magic. To do so, they must cast the spell at a higher Intensity than that of the elemental and succeed in an Opposed Willpower roll against the elemental. A Successful attempt transfers control to the new caster for the remainder of the Duration, or until they also lose control. If they fail or lose control, the elemental targets that caster instead.\n\nAn elemental returns to its native plane when its Duration ends or when its physical form is destroyed. A caster who still maintains control may also dismiss the elemental at will. If control is lost, either the original caster or another may attempt to banish the creature using Dispel Magic. For more details, refer to Elementals in the *Monster Manual*."
  },

  "control temperature 10 foot radius": {
    name: "Control Temperature 10' Radius",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Weather",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "40 Minutes, +20/additional Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "The air bends to your will. Warm or cool, you shape the climate around you for comfort or concealment.",
    description: "The caster alters the surrounding temperature within a 10-foot radius by up to two Difficulty Grades, either warmer or colder, as shown on the Temperature table (see the *Games Master\u2019s Guide*, page XX). This spell is typically used to maintain a comfortable environment for the caster and nearby companions while traveling through extreme conditions like blizzards or heat waves.\n\nControl Temperature also provides limited protection against temperature-based attacks, such as a Cone of Cold or the fiery breath of a red dragon. In these cases, the spell absorbs 3 points of damage per level of Intensity. Any remaining damage is resolved normally, using the results of a Resistance Roll if applicable. Once the caster is struck by such an attack, the spell ends immediately.\n\n**Control Temperature Effects Table:** Intensity 1: Cost 3, 40 Minutes, stops up to 3 heat or cold damage then dispelled. Intensity 2: Cost 4, 60 Minutes, stops up to 6 heat or cold damage then dispelled. Intensity 3: Cost 5, 80 Minutes, stops up to 9 heat or cold damage then dispelled. Intensity 4: Cost 6, 100 Minutes, stops up to 12 heat or cold damage then dispelled. Intensity 5: Cost 7, 120 Minutes, stops up to 15 heat or cold damage then dispelled. Continue progression."
  },

  "control winds": {
    name: "Control Winds",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Weather",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "40\u2019/Intensity",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You lift your hands, and the sky answers. Gusting winds whip the area with force and fury or calmness as you prefer.",
    description: "This spell allows the caster to significantly alter the current wind strength. To do so, they choose a desired Wind STR compared to the current Wind STR, as detailed on the Wind Table (see page XX of the *Games Master\u2019s Guide*). Each point of Intensity allows the caster to shift the current Wind STR by up to two Difficulty Grades, either higher or lower.\n\nThe change isn\u2019t immediate \u2013 wind speed adjusts at a rate of 5 STR per Round until it reaches the selected level. Throughout the spell\u2019s Duration, the caster may concentrate to increase, decrease, or hold the wind at its current STR, adjusting it as desired from Round to Round. However, they can\u2019t change how quickly the wind accelerates or slows. Once the spell ends, the wind gradually returns to its original strength at the same rate: 5 STR per Round.\n\nA 20-foot-radius area of calm surrounds the caster. In enclosed spaces \u2013 such as a great hall, cavern, or dungeon chamber \u2013 this area shrinks by 5 feet for every full 5 feet of restriction on the spell\u2019s Area of Effect. If confined enough, the area of calm may vanish entirely, leaving the caster fully exposed to the wind\u2019s effects. Control Winds can be countered by another casting of the same spell."
  },

  "cure major wounds": {
    name: "Cure Major Wounds (Cause Major Wounds)",
    school: "Necromancy",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "Your touch glows with healing power \u2013 bone resets, flesh knits, and strength returns.",
    description: "This spell functions as per the Rank 1 Divine spell Cure Minor Wounds (see page XX), except as noted below. Cure Major Wounds heals a single Hit Location suffering from a Major Wound, regardless of whether it has been crushed, mutilated, or dismembered. The freshness of the injury affects how quickly the spell works. If the location was wounded within a number of hours equal to the spell\u2019s Intensity, and the recipient is still alive, the spell heals all damage to that location instantly.\n\nIf the wound occurred beyond this time limit, the repair becomes more difficult and traumatic. In this case, the caster must perform Cure Major Wounds once per day for a number of days equal to the Hit Points lost on the location. Each casting must occur consecutively. If this chain is broken before the location fully regenerates, the body part remains maimed and unusable. It may also be left at a negative Hit Point value, which can only be restored by the Rank 4 Divine spell Heal (see page XX).",
    reverse: {
      name: "Cause Major Wounds",
      flavorText: "You twist your hand and speak the spell words with malice. Pain surges through your foe as force tears at body and spirit.",
      description: "When reversed, Cause Major Wounds reduces a single Hit Location to a negative value equal to its full Hit Points, maiming it. While it cannot sever a location, it can crush or mutilate it as normal. Armor offers no protection from this damage.\n\nLarge creatures (SIZ 21-40) are more likely to resist sustaining a Serious Wound, with their Resistance Roll being Easy, while the Resistance Roll for Huge creatures (SIZ 41+) is Very Easy."
    }
  },

  "detect lie": {
    name: "Detect Lie (Undetectable Lie)",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "100\u2019",
    resist: "Deceit",
    intensityScaling: null,
    flavorText: "You listen closely. Every false word hums in your mind with a subtle, undeniable distortion.",
    description: "When cast, this spell reveals whether a single being is knowingly lying or withholding the truth. It does not uncover the actual truth \u2013 only whether the answers given are inaccurate or deceptive. The target may attempt to deceive the caster with a Formidable Deceit roll Opposed by the spell\u2019s Intensity x20%. If Successful, the lie goes undetected.",
    reverse: {
      name: "Undetectable Lie",
      flavorText: "A magical veil cloaks your words, making lies sound completely true.",
      description: "The reverse of this spell, Undetectable Lie, prevents magical detection of falsehoods for 6 hours per point of Intensity."
    }
  },

  "dimension door": {
    name: "Dimension Door",
    school: "Transmutation",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Mage", rank: 2 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "Instant",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You take a step \u2013 and vanish. In a blink, you appear somewhere else, no path between.",
    description: "Dimension Door is a short-range teleportation spell that allows the caster to instantly travel 100 feet per point of Intensity, without crossing the intervening space and with no chance of error. The destination can either be a location within line of sight or specified by direction and distance (e.g., \u201c40 feet straight ahead,\u201d \u201c65 feet down,\u201d or \u201c65 feet distant and 45\u00b0 to the left\u201d). If the caster arrives midair, they fall and take damage as normal unless protected by a spell such as Feather Fall. If they accidentally teleport into a solid object, they become trapped in the Astral Plane.\n\nAll carried equipment (non-living, inanimate matter) travels with the caster, up to a maximum of 75 ENC. The caster may also bring along one living creature of SIZ 20 or less, provided they are in physical contact. For each point of SIZ the creature has, reduce the maximum ENC by 3. For example, a creature with SIZ 11 may travel with the caster, but the maximum ENC is reduced from 75 to 42 (75 \u2013 SIZ x3).\n\nAfter teleporting, both the caster and any creature transported must spend a full Combat Round to recover. During this time, they may take no actions other than defending, and all defenses are made at one Difficulty Grade higher than normal."
  },

  "dispel evil": {
    name: "Dispel Evil (Banish Good)",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Protection, Summoning",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "3 Rounds/Intensity",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You raise your hand. Holy force bursts outward, driving malevolent spirits from your presence.",
    description: "When cast, this spell empowers the cleric to banish Evil entities from other planes of existence with a touch. This effect can be delivered through any object wielded by the cleric, such as a staff or melee weapon. The target may attempt a Resistance Roll to avoid banishment. While the spell is active, all attacks made against the cleric by creatures subject to its effects are one Difficulty Grade harder. The spell ends immediately after a successful banishment. Otherwise, it lasts for 3 Rounds per point of Intensity.",
    reverse: {
      name: "Banish Good",
      flavorText: "You summon dark power. Beings of light or goodness are repelled or cast out as shadows seal the space.",
      description: "The reverse of this spell, Banish Good, functions identically but targets Good-Aligned extraplanar creatures instead."
    }
  },

  "divination": {
    name: "Divination",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "Time required to receive an answer",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You pose a question, cast sacred symbols, and visions fill your mind \u2013 fragmented but true.",
    description: "When cast, this spell allows a cleric to receive divine insight about an event or activity that has not yet occurred, but is expected to happen within the next week. While similar to the Rank 2 spell Augury, Divination provides specific information, rather than vague omens. The cleric must succeed on a Formidable Channel roll to receive a true vision. This chance may be increased by +5% for each additional point of Intensity, up to a maximum chance of 95%. Magic Points spent to improve the chance are expended whether the roll Succeeds or Fails.\n\nThe Games Master should roll in secret to prevent metagaming, especially in situations where hostile magic may be influencing the outcome. In such cases, a Failure might result in false or misleading information."
  },

  "domination": {
    name: "Domination",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "1 Week/Intensity",
    range: "30\u2019/Intensity",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You seize the target\u2019s mind and crush their will. They now act only as you command.",
    description: "Using this spell, the mage attempts to take control of a specific individual. If the target Fails a Resistance Roll, they fall under the caster\u2019s control for 1 week per level of Intensity. At the end of each week, they may attempt another Resistance Roll. The spell remains active until the target successfully resists or the Duration ends. While the spell is in effect, the caster\u2019s Magic Point total is reduced by the number spent to cast the spell, as detailed under Enduring Magic Costs (see page XX of the *Player\u2019s Handbook*).\n\nOnce control is established, the caster forms a telepathic link with the subject. If they share a language, the caster may command the subject to perform any action they are physically capable of. This link is not limited by distance, provided both caster and subject remain on the same plane of existence. If either moves to another plane, the enchantment ends immediately. If the caster issues a command that is contrary to the subject\u2019s nature \u2013 as defined by their Passions or at the Games Master\u2019s discretion \u2013 the subject may attempt an additional Resistance Roll at Easy Difficulty. If commanded to perform a suicidal or clearly harmful act, the roll becomes Very Easy, and even if it Fails, the subject refuses to carry out the action.\n\nAs with all charm spells, elves and half-elves are resistant to Domination. Elves improve their Resistance Rolls by two Difficulty Grades, and half-elves by one Difficulty Grade. Large humanoids (SIZ 21-40) are also harder to control, making their Resistance Roll Easy, while Huge humanoids (SIZ 41+) roll at Very Easy.\n\nA subject protected by Protection from Evil cannot be controlled while the protection remains active. However, the spell can still take hold if the protection is cast afterward, and Protection from Evil cannot dispel an existing enchantment.\n\n**Domination Effects Table:** Intensity 1: Cost 3, 1 Week, 30\u2019 range. Intensity 2: Cost 6, 2 Weeks, 60\u2019 range. Intensity 3: Cost 9, 3 Weeks, 90\u2019 range. Intensity 4: Cost 12, 4 Weeks, 120\u2019 range. Continue progression."
  },

  "enchant weapon": {
    name: "Enchant Weapon",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Weapon",
    castingTime: "1 Minute",
    duration: "5 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch the weapon. Runes glow along its edge, granting deadly precision and bite.",
    description: "When cast while touching a normal weapon, this spell temporarily imbues it with a +1 Damage Bonus. The enchantment also allows the weapon to strike creatures that can only be harmed by weapons with a +1 or greater magical Enhancement. The caster may enchant two weapons that have no ENC (such as daggers, knives, or arrows). Otherwise, only one weapon may be enchanted per casting.\n\nIf cast on an already magical weapon, this spell can increase its bonus by +1, up to a maximum total bonus of +3. A weapon with a +3 bonus increases its SIZ by one category for damage purposes: Large to Huge, Huge to Enormous, Enormous to Colossal.\n\nAn Enchanted Weapon also gains +5 Armor Points and +2 Hit Points per point of Magic Bonus, appropriate to its weapon type. This spell may be combined with Enchant Item and Permanency (page XX) to create a permanently Enchanted Weapon."
  },

  "exorcism": {
    name: "Exorcism",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Protection",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1d10x100 Minutes",
    duration: "Permanent",
    range: "10\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You speak sacred verses and raise your focus. The spirit screams as it\u2019s forced from its host.",
    description: "By means of this spell, the cleric calls upon their deity to expel a spirit or supernatural force currently possessing a corporeal being \u2013 such as in cases of demonic possession. Exorcism may also be used to remove domination by cursed objects, magical items, spells, curses, or charms. It is equally effective whether the possession is overt or subtle. The spell expels all forms of possession with an Intensity up to half the spell\u2019s Intensity.\n\nWhat happens next depends on the nature and disposition of the entity. Some may flee quietly, while hostile or powerful spirits capable of discorporation may choose to engage in Spirit Combat with other nearby targets, as described in page XX of the *Games Master\u2019s Guide*. For this reason, Exorcism can be dangerous to the caster and their allies.\n\nThe spell\u2019s Casting Time is highly variable and cannot be interrupted without breaking the ritual entirely."
  },

  "fear": {
    name: "Fear",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 x 20\u2019 Cone",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "0",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You call forth raw terror. The target\u2019s courage crumbles under the weight of their worst nightmare.",
    description: "When cast, this spell sends out a wave of supernatural terror that radiates from the caster. All creatures within range must attempt a Resistance Roll. Those who fail immediately flee directly away from the caster at sprinting speed for a number of Rounds equal to Intensity x2. The fear is so overwhelming that any creature that Fumbles their Resistance Roll also drops any unsecured held items in their panic."
  },

  "feeblemind": {
    name: "Feeblemind",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "30\u2019/Intensity",
    resist: "Willpower (See Below)",
    intensityScaling: null,
    flavorText: "You utter a blunt magic word. Your foe\u2019s thoughts collapse \u2013 confusion takes hold and reason fades.",
    description: "This spell reduces any sapient creature to the cognitive state of an imbecile. The target\u2019s INT is reduced to 3, and their Action Points are lowered by 1 (to a minimum of 1). The effect is most devastating to skills. Rather than recalculate every value, treat all casting skills and any skill that includes INT in its Base Level calculation as being used at Herculean Difficulty. The effects of Feeblemind are permanent. Only a casting of Heal or Wish can restore the target\u2019s normal intellect.\n\n**Resistance Roll Modifiers:** Arcane caster: Formidable. Divine caster: Easy. Multi-class Arcane/Divine: Hard. Humanoids and monsters (that do not fall under one of the above): Hard. Humans and demi-humans (that do not fall under one of the above): Standard."
  },

  "free action": {
    name: "Free Action",
    school: "Abjuration, Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Charm",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You speak the last word. Your target moves like water, unhindered. No trap, terrain, or spell can slow them down.",
    description: "When cast, this spell allows the subject to act normally for the Duration, regardless of spells, effects, or terrain that would otherwise hinder Movement Rate or penalize attacks. This includes ignoring Movement penalties from impeding terrain, such as mud, snow, or undergrowth. While underwater, the subject may move at their full land speed, and may use swung weapons (swords, axes, maces, etc.) without penalty. This spell does not grant the ability to breathe underwater. The spell also negates the effects of hindering magic \u2013 such as Entangle, Slow, Hold, Paralysis, Web, and similar spells \u2013 but only in terms of Movement and action penalties."
  },

  "fumble": {
    name: "Fumble",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "30\u2019/Intensity",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You curse your foe with your magic words. Their grip slips, their steps falter, and luck turns against them.",
    description: "This spell causes all opponents within the Area of Effect to become clumsy. All physical skill rolls are made at one Difficulty Grade higher, and any Failure is treated as a Fumble. Even simple physical actions that don\u2019t normally require a skill check \u2013 such as picking up a dropped item, moving faster than a walk, or climbing stairs \u2013 now require an Athletics roll. A Failure in these cases results in a Fumble, usually leading to awkward falls or accidental blunders (such as kicking an item further away while trying to retrieve it).\n\nThe Games Master is encouraged to get creative with Fumble outcomes. In non-combat situations, most should be humorous or inconvenient rather than deadly. In combat, Fumbles are resolved normally and may result in Special Effects as per standard rules. A successful Resistance roll negates the spell\u2019s effects for the current Round. However, if the victim remains within the Area of Effect, they must roll again at the start of the next Round. Allies of the caster must also avoid the area or suffer the same penalties.\n\nAlternatively, the spell may be targeted on a single creature, in which case it does not create an Area of Effect. If the target Fails their Resistance Roll, they suffer the full effects of Fumble for the Duration. If they succeed, they are still affected by the Rank 2 spell Slow (see page XX)."
  },

  // =========================================================================
  //  RANK 3 SPELL ENTRIES (H-Q)
  // =========================================================================

  "hail/ice storm": {
    name: "Hail/Ice Storm",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "30\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You summon a barrage of stone or ice. It slams the ground, punishing everything beneath it.",
    description: "Hail/Ice Storm has two distinct effects. The caster chooses one at the time of casting:\n\n**Hail Stones** (Duration: Instant): This version summons a barrage of large hailstones that pummel an area with a 60-foot radius. All creatures caught within the area take damage based on the spell\u2019s Intensity, as determined by the Spell Damage Table. Roll damage separately for each target, and apply it to 1d3+3 random Hit Locations.\n\n**Driving Sleet** (Duration: 1 Round per Intensity): This version conjures a wave of sleet in a path-shaped area 60 feet wide and 120 feet long, with the caster choosing the direction when the spell is cast. All creatures within the area are blinded for the Duration. The ground quickly becomes slick with ice, reducing Movement Rate by 50%. Flying creatures must succeed at a Formidable Fly skill roll or be grounded. Creatures on the ground must make an Athletics roll each Round to avoid falling prone, and this roll becomes two Difficulty Grades harder if they are moving faster than a walk. Characters trained in Acrobatics may substitute that skill instead. Small fires, such as torches or campfires, are automatically extinguished (see Fires in the *Games Master\u2019s Guide*, page XX). This version of the spell also negates the effects of Heat Metal. After the spell ends, the ice melts at a rate determined by the Games Master based on the ambient temperature; however, even in warm conditions, it will persist for at least 10 minutes."
  },

  "hallucinatory forest": {
    name: "Hallucinatory Forest",
    school: "Illusion",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "100\u2019/Intensity Radius",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "250\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You spin an illusion of twisted woods. Paths shift, trees shimmer, and all who enter lose their way.",
    description: "This spell creates a forest of illusion, appearing completely real in every respect \u2013 including sight, sound, and even touch. While subjects believe they are interacting physically with the forest, no actual contact occurs. For example, a tree may appear climbable, and the subject may believe they are ascending it, yet they remain on the ground the entire time.\n\nDruids and clerics attuned to nature, as well as sapient woodland creatures (such as elves, gnomes, dryads, centaurs, etc.), can see through the illusion automatically. All others \u2013 including lesser, non-sapient creatures \u2013 fully believe in the forest\u2019s reality. Rangers gain the ability to see through the illusion once they acquire the ability to cast druidic spells.\n\nThe illusion affects Movement Rate, line of sight, and other aspects of navigation as though it were a real forest. It also radiates magic and can be detected accordingly. The forest need not be circular; it may take any shape the caster desires, provided it fits within the spell\u2019s Area of Effect at the time of casting. The illusion remains indefinitely, or until it is dispelled by Dispel Magic. Alternatively, a second casting of Hallucinatory Forest may be used to counter an existing illusion created by this spell."
  },

  "heat/cold shield": {
    name: "Heat/Cold Shield",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Target",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "0",
    resist: "N/A (see description)",
    intensityScaling: null,
    flavorText: "Flames swirl around you. Strikes with fire or ice are met with bitter cold or burning heat, nullifying the attacking energy.",
    description: "This spell creates a shield of wispy flames that immolates the caster or one other person, but causes no damage in and of itself. Instead, the flames protect the recipient from either fire or cold, depending on which of two variants is in memory:\n\n**Heat Shield:** Creates blue or green flames and protects against heat and Fire-Based Damage (see page XX of the *Player\u2019s Handbook*). These flames are cool to the touch and reduce any fire or heat-based damage to half. A successful Resistance roll will negate all damage. The Resistance Roll is 1 Difficulty Grade easier, and in the case of Evade, the defender is not rendered prone. However, a Fumble results in normal damage \u2013 in other words, the damage is not halved.\n\n**Cold Shield:** Creates violet or blue flames and protects against cold and ice-based damage. These flames are warm to the touch and reduce any cold-based damage to half. A successful Resistance roll will negate all damage. The Resistance Roll is 1 Difficulty Grade easier, and in the case of Evade, the defender is not rendered prone. However, a Fumble results in normal damage \u2013 in other words, the damage is not halved.\n\nThe color of the flames should be determined randomly with a 50% chance of either, and the fact that both types can emit blue flames creates an element of uncertainty on the part of any attacker. The decision as to which to memorize is made when spells are prepared, and both may be memorized if desired. These flames give off no heat and shed light at only half the brightness of a torch.\n\nMelee attacks against the recipient of either variant \u2013 whether armed or unarmed \u2013 inflict normal damage, unless the attack uses one of the elements protected against. In that case, the attacker receives damage equal to that inflicted, before reducing for armor. Creatures with innate Magic Resistance may attempt to dispel either shield on a Successful Willpower roll when the recipient is first struck. If the roll Fails, the opponent cannot negate the shield."
  },

  "hold monster": {
    name: "Hold Monster",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "40\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "180\u2019",
    resist: "Endurance",
    intensityScaling: null,
    flavorText: "You lock eyes with the monster, and magical power floods out. The creature freezes mid-stride, trapped in perfect stillness.",
    description: "Like the Hold Person spell, this spell allows the caster to immobilize and freeze in place one creature per point of Intensity, up to a maximum of four within the spell\u2019s Area of Effect.\n\nHowever, Hold Monster affects only non-mundane, living creatures \u2013 including monsters such as harpies, dragons, naga, demons, devils, medusas, elementals, and similar beings. It does not affect people, ogres, giants, giant versions of normal animals, or any form of undead. For those, see instead Hold Person, Hold Animal, or Hold Undead, respectively.\n\nA successful Resistance roll completely negates the spell\u2019s effect. The number of SIZ 1-20 victims to be affected modifies the chance of their attempt to resist, as follows. For three or four monsters, their Resistance Roll is unmodified. However, for two monsters, the Resistance Roll is one Difficulty Grade harder and, for a single monster, it is two Difficulty Grades harder. Large creatures (SIZ 21-40), regardless of number, are less susceptible to being held, with their Resistance Roll being Easy and, for Huge creatures (SIZ 41+), the Resistance Roll is Very Easy. While held, creatures are completely helpless, and nothing short of Dispel Magic can end the effect before the spell\u2019s Duration expires.\n\n**Hold Monster Effects Table:** Intensity 1: Cost 3, 1 Round, 1 target. Intensity 2: Cost 4, 2 Rounds, 2 targets. Intensity 3: Cost 5, 3 Rounds, 3 targets. Intensity 4: Cost 6, 4 Rounds, 4 targets. Continue progression."
  },

  "hold plant": {
    name: "Hold Plant",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "250\u2019",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "You whisper a word. Vines, trees, and creeping plants fall still \u2013 silent and unmoving.",
    description: "This spell allows the caster to immobilize (freeze in place) one plant per Intensity, up to a maximum of four. The affected subjects must be within the spell\u2019s Area of Effect, and this includes all forms of vegetable matter: parasitic plants, fungus, grasping carnivorous plants such as mantraps, and sapient vegetation like shambling mounds, tree\u2019nts, and green slime. The spell can also silence a screecher. Hold Plant may also counter a previous casting of Entangle, provided it is cast at sufficient Intensity.\n\nSapient vegetation is allowed a roll to resist; a Successful roll completely negates the spell\u2019s effect. If the spell targets more than one large plant, the Resistance Roll becomes easier for the subjects: plants of SIZ 21\u201340 roll at Easy, and plants of SIZ 41+ roll at Very Easy. While held, affected plants are completely helpless. Nothing short of Dispel Magic can release them before the spell\u2019s Duration ends."
  },

  "illusion, advanced": {
    name: "Illusion, Advanced",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "180\u2019/Intensity",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "You conjure an illusion that fools every sense \u2013 sight, sound, even touch. Only the cleverest can see through it.",
    description: "This spell functions like the Rank 1 spell Lesser Illusion (see page XX), except as noted here and in the preceding text. Once the caster completes the casting, they no longer need to concentrate on the illusion. It follows a pre-programmed course of action without requiring further guidance or supervision. Advanced Illusion includes visual, auditory, olfactory, and thermal components, making it far more convincing than its lesser counterpart. If one individual Successfully Disbelieves the illusion, they may inform others, who may then attempt their own Disbelieve roll at one Difficulty Grade easier. For more details, see Illusions and Phantasms, page XX.\n\n**Advanced Illusion Effects Table:** Intensity 1: Cost 3, 180\u2019 range, 20\u2019 Radius. Intensity 2: Cost 4, 360\u2019 range, 40\u2019 Radius. Intensity 3: Cost 5, 540\u2019 range, 60\u2019 Radius. Intensity 4: Cost 6, 720\u2019 range, 80\u2019 Radius. Continue progression."
  },

  "illusionary terrain": {
    name: "Illusionary Terrain",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019/Intensity Radius",
    castingTime: "10 Minutes",
    duration: "1 Hour/Intensity",
    range: "30\u2019/Intensity",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "You craft entire landscapes with your final magical word \u2013 all made of convincing illusion.",
    description: "When this spell is cast, the terrain within the Area of Effect is masked by an illusion of the caster\u2019s choosing. For example, a deep crevasse could be made to appear as a peaceful meadow, or a clear field might be disguised as a steaming swamp. The illusion persists until the spell\u2019s Duration expires or the area is affected by Dispel Magic.\n\nThose within the area may attempt to Disbelieve the illusion (see page XX of the *Player\u2019s Handbook*). If Successful, they see the terrain as it truly is. Those who fail continue to perceive the illusion as real. However, anyone who sees a creature take an action that clearly contradicts the terrain \u2013 such as an ally vanishing while walking across an apparently solid field \u2013 may attempt another Disbelieve roll, provided they declare the intent to do so to the Games Master. The more drastic or unnatural the change, the more likely observers are to grow suspicious and attempt to Disbelieve the illusion."
  },

  "insect plague": {
    name: "Insect Plague",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "180\u2019 Radius Cloud",
    castingTime: "2 Actions",
    duration: "2 Rounds/Intensity",
    range: "360\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "At your command, a cloud of biting, stinging insects erupts from the nearby area \u2013 swarming with chittering fury.",
    description: "This spell must be cast in an area where insects are naturally present. Upon completion, the caster summons a thick cloud of flying, crawling, and jumping insects, drawn from the surrounding environment. The swarm remains for the Duration of the spell and stays centered on a point designated by the cleric or druid when casting. Unlike attacks by natural insect swarms, targets cannot Evade, but the swarm also cannot pursue creatures who leave the Area of Effect. Within the area, the swarm: Reduces vision to 10 feet. Makes spellcasting Herculean Difficulty. Forces all creatures to make a Willpower roll or be compelled to flee by the fastest possible route, continuing to flee until at least 500 feet from the swarm\u2019s edge.\n\nThe swarm fills a vertical space 60 feet high. In all other ways, Insect Plague functions as an Insect Swarm, as described in the *Monster Manual*. A Dispel Magic spell of sufficient Intensity can counter Insect Plague.\n\n**Insect Plague Potency Table:** Intensity 1: Cost 3, 2 Rounds, Swarm SIZ 34-41, 1d8 Sting/Bite, 6 Combat Actions. Intensity 2: Cost 4, 4 Rounds, Swarm SIZ 42-50, 1d10 Sting/Bite, 7 Combat Actions. Intensity 3: Cost 5, 6 Rounds, Swarm SIZ 51-59, 1d12 Sting/Bite, 8 Combat Actions. Intensity 4: Cost 6, 8 Rounds, Swarm SIZ 60-69, 2d6 Sting/Bite, 9 Combat Actions. Intensity 5: Cost 7, 10 Rounds, Swarm SIZ 70-79, 1d8+1d6 Sting/Bite, 10 Combat Actions."
  },

  "invisibility, greater": {
    name: "Invisibility, Greater",
    school: "Illusion",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "3 Rounds/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You vanish entirely, even from magical sight. Footsteps fade, breath stills, and your presence dissolves.",
    description: "This spell functions as per the Rank 1 spell Lesser Invisibility (see page XX); however, no action taken by the subject ends the Duration early. The target may make melee or ranged attacks, cast spells, or take other actions without disrupting the invisibility effect.\n\nNote that actions performed while invisible still produce visible clues, such as distortion or movement of the environment. Anyone with line of sight to the subject may attempt a Formidable Perception roll to detect the invisible character\u2019s location. This roll is made after the action is taken, or possibly before if the character is observed delaying or preparing to act.\n\nIf the invisible subject is perceived, attackers may make an attack against them that Round at 1 Difficulty Grade higher than normal."
  },

  "legend lore": {
    name: "Legend Lore",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Mage", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "special" },
    costDisplay: "3, +1/hour",
    area: "See Below",
    castingTime: "See Below",
    duration: "See Below",
    range: "0",
    resist: "None",
    intensityScaling: null,
    flavorText: "Ancient truths stir in your mind. Forgotten names, myths, and stories bloom like dreams made real.",
    description: "When cast, this spell provides the caster with information about any legend connected to an object, location, or individual. The Casting Time depends on how much the caster already knows about the subject:\n\nIf the object or person is present, or the caster is physically in the location, the casting takes only 1d4 x10 minutes and costs 3 Magic Points. If the subject is not present, but the caster has detailed information, the spell takes 1d10 Days to cast. If only rumors or vague tales are known, the spell takes 2d6 Weeks.\n\nFor the Day and Week casting times, the Cost is 3 Magic Points, plus 1 additional Magic Point per full hour of casting. Even if the caster has a large Magic Point pool, they must sleep at least 8 hours per night to replenish it before continuing the spell. If the spell requires Days or Weeks to complete, the Games Master may determine the exact completion time by assuming the caster begins each day at 6:00 a.m. and then adding 1d6+6 hours. During the casting period, the mage may only perform routine, non-strenuous activities, such as eating, sleeping, or tending to bodily needs (see page XX of the *Games Master\u2019s Guide* for more information on Strenuous activities)."
  },

  "leonard's secure cottage": {
    name: "Leonard\u2019s Secure Cottage",
    school: "Transmutation or Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1d4+1 Hours/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You conjure a cozy, furnished cottage \u2013 warm, well-stocked, and guarded by unseen protectors.",
    description: "When cast, this spell conjures a cottage appropriate to the local environment, constructed from materials found in the area. The cottage includes a sturdy door, several shuttered windows, a small fireplace, and an interior floor plan of 200 square feet per level of Intensity. The inside is clean, dry, and optionally furnished with up to 8 bunks, a writing desk, table and benches, and either four chairs or eight stools \u2013 as chosen by the caster at the time of casting. The caster may also summon an Unseen Servant along with the cottage to assist during its Duration, if desired.\n\nThe cottage offers protection comparable to a mundane dwelling. The fireplace is sufficient to heat the space, even in extreme cold, but provides no magical cooling during summer months \u2013 though windows may be opened. The walls can withstand winds up to hurricane strength (STR 90 or less). Winds stronger than that will gradually destroy the structure over 1d6x10 minutes.\n\nEach door, shutter, and 6-foot section of wall has 10 Armor Points and 30 Hit Points. Doors and shutters are protected by Wizard Lock as per the spell of the same name. The chimney is fitted with an iron grate and a narrow flue, preventing most intrusions. The Alarm spell may be cast at the time of summoning to secure the door, windows, and chimney. The cottage is also immune to Fire-Based Damage (see page XX of the *Player\u2019s Handbook*). If the caster wishes to include Unseen Servant or Alarm, they must spend one additional Action and one additional Magic Point for each effect at the time of casting.\n\n**Leonard\u2019s Secure Cottage Effects Table:** Intensity 1: Cost 3, 1d4+1 hour Duration, 200\u2019 square (e.g. 10\u2019 x 20\u2019). Intensity 2: Cost 4, 2d4+2 hour Duration, 400\u2019 square (e.g. 20\u2019 x 20\u2019). Intensity 3: Cost 5, 3d4+3 hour Duration, 600\u2019 square (e.g. 30\u2019 x 20\u2019). Intensity 4: Cost 6, 4d4+4 hour Duration, 800\u2019 square (e.g. 40\u2019 x 20\u2019). Continue progression."
  },

  "lesser creation": {
    name: "Lesser Creation",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "1 Hour/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Simple items form from air, ready to serve your purpose.",
    description: "When this spell is cast, the caster conjures an item made of non-living material. By drawing filaments from the Plane of Shadow and weaving them into form, the caster may create any mundane object, up to 5 ENC per point of Intensity. For larger items that lack an ENC value \u2013 such as doors, walls, or panels \u2013 the spell allows for the creation of 1 square foot of material per Intensity. Assign Hit Points based on the material used, as appropriate (see Inanimate Objects in the *Games Master\u2019s Guide*, page XX).\n\nThis is not a permanent creation. The item exists only for the Duration of the spell. In addition to any normal material components, the caster must possess a small piece of the material the item is to be constructed from. Examples include: a steel nugget and splinter of wood to create a sword, a scrap of leather and piece of thread to create leather armor, a strand of hemp to create a length of rope, etc."
  },

  "lower water": {
    name: "Lower Water (Raise Water)",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Elemental (Water)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "10 Minutes/Intensity",
    range: "360\u2019",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "With a wide gesture, the tide pulls back. Rivers shrink, ponds drain, and watery paths open.",
    description: "When cast, this spell causes a body of water or similar liquid to lower by 2 feet per point of Intensity, to a maximum depth of 1 inch. The affected area covers a radius of up to 10 feet per Intensity. For example, at 8 Intensity, the caster could lower water in an 80-foot radius to a depth of 16 feet.\n\nThis spell may also be cast on creatures composed of water, in which case it evaporates 3 points of SIZ per Intensity. Such creatures are allowed a Resistance Roll, and in this form, the spell\u2019s Duration is Instant.\n\nWhen cast on a body of water vastly larger than the Area of Effect, such as a lake or the ocean, the spell instead creates a whirlpool capable of pulling even large vessels beneath the waves.\n\n**Lower Water Intensity Table:** Intensity 1-2: Personal (Small Raft, Kayak, Dugout, Rowing Boat). Intensity 3-5: Small War (Canoe, Small Fishing Boat or Skiff). Intensity 6-8: Medium (Large Raft, Reed Galley, River Transport). Intensity 9-11: Large (Northern Longboat, Small Merchantman/Cog). Intensity 12-14: Huge (Small Galley, Medium Merchantman, Bireme). Intensity 15-17: Enormous (Trireme, Large Merchantman). Intensity 18-20: Colossal (Hexareme, Grain Transport). Intensity 21+: Beyond Colossal (Imperial Battle Barge).\n\nIf a vessel is caught in the whirlpool, the crew must make a Boating or Seamanship roll: Critical Success \u2013 escapes in 1d8 minutes, no damage. Success \u2013 escapes in half Duration, 1d4 hull damage per 10 minutes. Failure \u2013 caught circling for full Duration, 2d4 hull damage per 10 minutes. Fumble \u2013 vessel capsizes and is pulled under. For more information on ships, see the Mythras supplement *Ships & Shield Walls*.",
    reverse: {
      name: "Raise Water",
      flavorText: "With a wide gesture, the tide pulls back. Rivers shrink, ponds drain, and watery paths open.",
      description: "The reverse of this spell, Raise Water, causes a body of water to rise by 2 feet per point of Intensity, functioning as the inverse of Lower Water."
    }
  },

  "monster summoning": {
    name: "Monster Summoning",
    school: "Conjuration",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "120\u2019 Radius",
    castingTime: "2 Actions",
    duration: "3 Rounds or 3 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You tear open a rift between worlds. Strange beasts pour through \u2013 wild-eyed, magic-bound, and ready to obey.",
    description: "This spell functions in all ways as Lesser Monster Summoning (page XX) except where it differs as noted above. The monsters summoned are drawn from the Monster Summoning Table, which includes creatures such as young dragons (black, blue, brass, bronze, copper, gold, green, red, silver, white), bugbears, cave bears, cyclopes, dark elf warriors, displacer cats, gargoyles, ghasts, ghouls, giant snakes, giant spiders, gnolls, gorgons (lesser), hell hounds, hobgoblins, large elementals, lizard men, minotaurs, ogres, orcs, owl bears, skeletons, troglodytes, werewolves, and zombies."
  },

  "neutralize poison": {
    name: "Neutralize Poison (Inflict Poison)",
    school: "Necromancy",
    classes: [
      { class: "Bard", rank: 2 },
      { class: "Cleric", rank: 2 },
      { class: "Druid", rank: 2 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "You press your hands to the poisoned. Warmth spreads, and the venom flees from blood and breath.",
    description: "This spell allows the caster to cancel the effects of poison or venom currently afflicting a creature. It can even be used to revive an individual who has \u201cdied\u201d of poisoning, provided it is cast within ten minutes of death. The required Intensity is based on the Potency of the poison \u2013 one level of Intensity is needed for every 20 points of Potency.\n\nNeutralize Poison may also be cast on venomous creatures, such as snakes or scorpions, to temporarily nullify their ability to poison others. In this case, the spell requires one Intensity per 40 Potency, and the effect lasts for 24 hours.\n\nThe spell can also be used to treat poisoned or tainted substances. For each point of Intensity, the caster may purify up to 4.4 pounds of solids or 2.11 gallons of liquids.",
    reverse: {
      name: "Inflict Poison",
      flavorText: "A whispered curse hangs in the air. The target gasps as the poisonous sickness takes root deep within.",
      description: "When reversed, Inflict Poison allows the caster to introduce a deadly toxin into a living target. Application: Contact. Potency: equal to Channel. Resistance: Endurance. Onset Time: 1d2+1 Rounds. Duration: 1d3x10 Minutes. Conditions: Victims begin with Agony lasting 2 Rounds before Asphyxiation strikes (see the *Games Master\u2019s Guide*, page XX), usually resulting in death, unless magically treated with either Slow Poison or Neutralize Poison. Antidote/Cure: None short of magical treatment."
    }
  },

  "pass wall": {
    name: "Pass Wall",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Hour, +30 Minutes/Intensity",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch solid stone and speak arcane words. It melts into mist, leaving a tunnel wide enough to pass.",
    description: "When cast, this spell allows the mage to create a temporary passage measuring 5 feet wide, 8 feet high, and 10 feet deep through solid stone, wood, or plaster. Other materials are unaffected. The spell may be cast multiple times to extend the passage through thicker or broader barriers. When the Duration ends, the caster may choose to close the passage. If the spell is dispelled before it expires, any creatures still inside are safely ejected from the nearest end of the passage."
  },

  "phantasmal terror": {
    name: "Phantasmal Terror",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "10\u2019/Intensity",
    resist: "Disbelieve/Evade",
    intensityScaling: null,
    flavorText: "You reach into a mind and summon its deepest fear. It\u2019s not real \u2013 but the panic is.",
    description: "When this spell is cast, the mage reaches deep into the psyche of a victim and conjures forth the most terrifying horror lurking within. Being a phantasm, the target of the spell is allowed a chance to Disbelieve as soon as it is cast (see page XX of the *Player\u2019s Handbook*), and if Successful, the magic binding it unravels, returning the horror to the target\u2019s subconscious. Phantasmal Terrors possess the Creature Abilities Natural Invisibility and Terrifying, and exist only to the caster and its victim. Even spells such as True Sight or Detect Invisibility are useless when attempting to aid the victim, as phantasms are firmly entrenched in the victim\u2019s mind. If aided with a spell or ability that cancels or reduces fear (e.g., being the subject of Remove Fear or standing within the 10-foot radius of a cavalier or paladin), the victim may make another attempt to Disbelieve. Only one additional attempt may be made per effect.\n\nThe only other method of ending this spell before the Duration expires is to render the victim unconscious or to kill or render the caster unconscious. Either method unravels the killer and returns it to the subject\u2019s subconscious.\n\nA Phantasmal Terror possesses a Combat Skill equal to the victim\u2019s Willpower. To determine damage dealt, figure 1/10th of the victim\u2019s Willpower as the phantasm\u2019s Intensity, and use this Intensity on the Spell Damage Table (page XX) to determine damage on a Successful attack. This damage bypasses all worn non-magical armor. Magical armor offers protection only equal to its Magic Bonus. The Action Points and Initiative are determined as normal, calculated using the victim\u2019s INT + POW.\n\nThe terror cannot be outrun or avoided, being able to move instantly from point to point, and being intangible, it may pass through solid objects at will. It will pursue its victim relentlessly.\n\nThe only defensive action that may be taken by the subject, other than the aforementioned attempts to Disbelieve, is to Evade. It is impossible to damage the killer, as any attack passes harmlessly through its body; however, damage dealt to the victim by the killer is perceived by them as real, even though it leaves no outward physical effect. Unlike a normal illusion or phantasm, a victim that has suffered enough phantasmal damage to cause death suffers actual death, from mental shock."
  },

  "plane shift": {
    name: "Plane Shift",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Astral",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "Touch",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "A glowing sigil flares beneath you. Reality twists, and you\u2019re flung into another plane in an instant.",
    description: "When cast, the cleric and up to seven others (one additional creature per level of Intensity beyond the first) can travel to another plane of existence. All participants must be touching and forming a circle during the casting of the spell. Alternatively, the caster may use Plane Shift to transport a single creature, separate from themselves, to a plane of the caster\u2019s choosing. The target may be willing or unwilling; however, an unwilling creature may make a Willpower roll to resist. A Successful roll negates the spell\u2019s effect.\n\nThe precise point of arrival on the destination plane is rarely exact. If using a hex map, roll 1d6 to determine direction and 1d10x10 miles to determine the distance from the intended arrival point. In addition to standard material components, the casting of Plane Shift requires rods of rare metals, each one specially attuned to a specific plane. These rods are difficult to obtain and typically valued at 10,000 GP or more each. See the *Games Master\u2019s Guide* for more information on the Planes of Existence and their characteristics."
  },

  "plant door": {
    name: "Plant Door",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Round",
    duration: "See Below",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You draw a line across the foliage. An arch opens \u2013 a secret, living passage only you can see.",
    description: "This spell allows the caster to travel between trees, undergrowth, or bushes by creating a magical passageway or gate within dense vegetation. The caster may also choose to remain hidden within a single tree for the Duration of the spell, without traveling through it. Other higher Rank casters and dryads may use the passage as well. Anyone else must be shown the portal\u2019s location in order to see or use it.\n\nThe portal has a SIZ of 20 for determining how much space is available if it\u2019s used to hide within. If the host tree is cut down or burned, anyone inside must exit before it collapses or burns completely, or be killed. When used for travel, Plant Door has a Duration of 10 minutes per point of Intensity. If used solely for hiding, the Duration increases to 90 minutes per Intensity. The passageway is 5 feet wide, 7 feet high, and can extend up to 15 feet per Intensity. It must connect from one tree or bush to another, and cannot be used to pass through sapient or semi-sapient vegetation, such as tree\u2019nts, shamble mounds, and similar creatures."
  },

  "plant growth (arcane)": {
    name: "Plant Growth (Arcane)",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019/Intensity Radius",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "30\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You call to the earth, and nature erupts. Trees stretch, vines twist, and wild growth surges unnaturally fast.",
    description: "When cast upon a spot on the ground, all vegetation animates and entwines, creating a dense thicket in a 10-foot radius per point of Intensity. Creatures attempting to move through the thicket must hack and cut their way through using a bladed weapon, which reduces Movement Rate to 25% of normal and prevents movement faster than a walk. Creatures with a Damage Modifier of +1d8 or greater are less hindered, suffering only a 50% reduction to Movement Rate.\n\nNote: This is the Arcane (Mage) version of Plant Growth. The Divine version (Druid 2, Ranger 2) uses different stats and also allows the caster to bless crops. See the Divine version for those additional effects."
  },

  "polymorph other": {
    name: "Polymorph Other",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "15\u2019/Intensity",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "With a flick of your hand, flesh reshapes. Fur, feathers, or scales replace what once was familiar.",
    description: "This spell allows the caster to alter the form of one corporeal creature into that of another. Each point of Intensity allows for a change of up to 3 points of SIZ. For example, transforming an orc of SIZ 16 into a SIZ 1 rabbit would require 5 levels of Intensity (15 SIZ difference). The subject is allowed a Willpower roll to resist the transformation. If the roll Fails, the change takes one full Round to complete. The process is highly stressful, and the creature must make a second Willpower roll to retain its original personality. A Fumble on this roll results in death from mental shock. Each doubling or halving of the creature\u2019s original SIZ increases the Difficulty Level of this second Willpower roll by one step harder. A complete change of environment (e.g., land to sea, or air to underground) also increases the Difficulty by one Grade harder. A Successful roll allows the victim to retain INT, CHA, and any skills tied to those Attributes.\n\nAs long as the subject\u2019s personality remains, the transformation grants the assumed form\u2019s natural traits: breathing method (if different), natural attacks, and mundane modes of Movement (walking, flying, swimming, burrowing, etc.). It does not grant any magical or supernatural abilities. The victim also gains the new form\u2019s physical skills, such as Athletics, Brawn, Fly, Swim, and so on. Hit Points and Damage Modifier are recalculated. The target loses the ability to speak unless the new form can articulate words. If they were previously able to cast spells, they may still do so in the new form, provided they can perform any required verbal or somatic components.\n\nIf the transformation is drastic (such as changing from biped to quadruped, or from a land creature to a sea creature), the Games Master may apply a one Difficulty Grade penalty to physical skills until the character has had time to adjust.\n\nThe Willpower roll to retain one\u2019s personality must be repeated daily. Once Failed, the creature succumbs entirely to the new form\u2019s mentality. If the new form is non-sapient, INT is replaced with INS. When this final shift occurs, the creature gains access to any special or magical Creature Abilities of the new form it had previously lacked. At this point, the character becomes a non-player character under the control of the Games Master.\n\nWhile the personality remains intact, Dispel Magic can end the transformation at any time with no Resistance required. However, another Willpower roll is required to survive the shock of returning to their natural form, with only a Fumble resulting in death. If the victim has already lost their identity, they resist Dispel Magic with a Willpower roll. A Failed roll forces them back into their original body, again requiring a Willpower roll to survive (Fumble = death).\n\nOnce identity is lost, it cannot be regained through natural means. Only powerful magic such as Wish or similar reality-altering effects may restore the creature\u2019s true self. All worn and carried equipment merges into the new form. Creatures with natural shape-changing Creature Abilities, such as doppelg\u00e4ngers or lycanthropes, may be affected by Polymorph, but can revert to their natural form after one Round. If the polymorphed creature is slain, it reverts to its original form."
  },

  "polymorph self": {
    name: "Polymorph Self",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "2 Actions",
    duration: "20 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your body bends to your will \u2013 beast, bird, or fish, you become your vision made flesh.",
    description: "The caster is able to assume the form of any corporeal creature with a SIZ between 1 and 40. Each point of Intensity allows for an increase or decrease of up to 6 points of SIZ. For example, a mage with SIZ 13 could take on the shape of a SIZ 34 grizzly bear by casting this spell at 4 Intensity. The transformation takes a full Round to complete and grants the caster the assumed creature\u2019s natural method of breathing, if different from their own, along with any natural attacks and mundane forms of Movement (e.g., walking, swimming, flying). Hit Points and Damage Modifier must be recalculated to reflect the new form.\n\nThe spell does not grant any supernatural, magical, or heightened Creature Abilities possessed by the creature. The caster gains the creature\u2019s physical skills, such as Athletics, Brawn, Fly, Swim, and so on. However, they retain their own mental and social skills \u2013 those that rely on INT and CHA. The caster loses the ability to speak unless the new form is capable of articulate speech. If so, they may still cast spells, provided they can also perform the somatic components required.\n\nThe caster may end the effect at will. When doing so: All Minor Wounds suffered while in the transformed form are healed. Any Serious Wounds are reduced to Minor Wounds, with half the Hit Points lost in each affected location. Major Wounds are not affected and remain unchanged.\n\nThere is no healing when transforming into an animal form \u2013 only when reverting back to the caster\u2019s natural body. Polymorph Self is subject to Dispel Magic. If the caster is slain while transformed or the spell is successfully dispelled, they immediately revert to their natural form without wound recovery benefits. If the caster takes the form of a flying creature and must make a Fly skill roll, they may substitute Athletics or Acrobatics at two grades of increased Difficulty. A caster who regularly uses this spell may learn the Fly skill normally, beginning with a Base Level equal to STR+DEX."
  },

  "power word - stun": {
    name: "Power Word \u2013 Stun",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Action",
    duration: "See Below",
    range: "20\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You say one arcane word. No gesture, no flash \u2013 just sound. And your target stops, mind silenced mid-thought.",
    description: "When successfully cast, this spell stuns one creature of the caster\u2019s choice that is both within range and line of sight. The target becomes briefly insensible, able to take only reactive, defensive actions (such as Parrying or Evading) for the Duration. The Duration is modified based on either the target\u2019s Rank or SIZ (whichever is more favorable to the target).\n\n**Power Word \u2013 Stun Modifier:** Rank 0-1 / SIZ 1-20: 4d4 Rounds. Rank 2 / SIZ 21-40: 2d4 Rounds. Rank 3 / SIZ 41-60: 1d4 Rounds. Rank 4 / SIZ 61-80: 1 Round. Rank 5 / SIZ 81+: Unaffected. The effect of Stun may be ended early by a Successful Dispel Magic."
  },

  "prayer": {
    name: "Prayer",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Combat",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "60\u2019 Radius",
    castingTime: "1 Minute",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You offer a whispered plea, and divine light answers \u2013 strengthening allies and weakening foes under sacred watch.",
    description: "When cast, this spell blesses the caster and all allies within the Area of Effect, while simultaneously cursing enemies. Allies gain a +5% bonus to all skills and +1 to all damage dealt for the Duration of the spell. Enemies suffer a -5% penalty to all skills and -1 to all damage dealt (effectively reducing damage by 1 point).\n\nIf the spell is cast in conjunction with Chant by a caster of the same religion, the effects stack: a +10% bonus to skills and +2 to damage, while enemies receive the opposite."
  },

  "produce fire": {
    name: "Produce Fire (Quench Fire)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Round",
    range: "120\u2019",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You snap your fingers. Fire bursts to life \u2013 flickering, warm, and ready to burn.",
    description: "When cast, this spell creates a normal fire in a 10-foot radius, which burns for 1 Round. The fire is treated as Intensity 4, as detailed in the *Games Master\u2019s Guide*, page XX. All creatures within the Area of Effect suffer 2d6 damage to 1d4+1 Hit Locations nearest the flame. Worn armor provides half protection, while magical Armor Points and natural armor reduce damage as normal.\n\nCreatures within the area but within 5 feet of the edge may attempt to Evade. A Successful roll means they take no damage. Any flammable items in the area have a 5% chance per point of damage dealt to catch fire.",
    reverse: {
      name: "Quench Fire",
      flavorText: "Cool words fall from your lips. The flames shrink, hiss, and die \u2013 leaving only ash and smoke behind.",
      description: "When reversed, Quench Fire extinguishes all normal fire within the Area of Effect, including any fire of Intensity 4 or less."
    }
  },

  "protection from lightning": {
    name: "Protection from Lightning",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 3 }
    ],
    sphere: "Protection, Weather",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A crackling shield surrounds you. Lightning bolts veer off or vanish as you walk unharmed through the storm.",
    description: "When this spell is cast, it creates a magical field around the target that absorbs 2 points of electrical damage per point of Intensity. Any excess damage beyond what the field can absorb is halved, and then applied to the target after normal reductions based on the result of the Resistance Roll. For example, if the target successfully Evades a lightning breath attack from a blue dragon, only one-quarter of the remaining damage (after the field\u2019s absorption) is applied. If the Resistance Roll Fails, the remaining damage is still halved, thanks to the protective field."
  },

  "quest": {
    name: "Quest",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Charm",
    cost: { base: 3, type: "special" },
    costDisplay: "3, +1 EXP",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "Until Fulfilled",
    range: "180\u2019",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "Your words carry the weight of fate. The target feels destiny stir \u2013 and cannot turn away.",
    description: "This spell instills in the subject an overwhelming compulsion to fulfill a specific service for the caster and return with proof of its completion. The task may vary widely \u2013 from delivering a message, retrieving an artifact, assassinating a target, or even slaying a dragon. Quest only affects sapient beings, and once cast, the subject must follow the directive until it is completed. This compulsion functions as an Oath, as defined on page XX, with a base of 60%+POW+INT.\n\nThe spell may be cast on a willing subject, such as an ally or a follower of the cleric\u2019s religion. In this case, no Resistance Roll is required. If the subject is unwilling, they may attempt to resist with a Willpower roll. Creatures of the same Alignment as the cleric resist at one Difficulty Grade harder.\n\nEach day, the subject may attempt to ignore the Quest by making a Passion roll. The stronger the relevant Passion, the harder it is to resist the call. If the Passion roll Fails and the subject chooses not to act on the Quest, they lose 5% permanently from Willpower, Endurance, and Evade. These penalties remain until the Quest is completed or cancelled by the caster. Normally, Dispel Magic has no effect on Quest. However, a cleric of the same religion or one of higher Rank may use Dispel Magic to remove it. The original caster may also cancel the spell permanently or suspend it temporarily, reactivating it at a later time. Some rare artifacts or the spell Wish can cancel a Quest, as can Divine intervention by a deity. Otherwise, only completing the requirements set forth by the caster can end the spell. Once the effects of Quest are over, the subject loses the Passion related to it."
  },

  // =========================================================================
  //  RANK 3 SPELL ENTRIES (R-W)
  // =========================================================================

  "raise dead": {
    name: "Raise Dead (Slay Living)",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 3 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity, +1 EXP",
    area: "One Target",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "100\u2019",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "You reach beyond the veil. The fallen breathe again \u2013 shaken, weakened, but alive.",
    description: "This spell may be cast on the corpse of a creature that has been dead for no more than 24 hours per point of Intensity. The body must be mostly intact \u2013 severed limbs or missing parts must be reattached before the spell can be effective. If the deceased was of any Alignment other than Evil, they may resist the call to return with an Opposed Willpower roll. A Successful roll means the subject refuses to return to life. This is due to the soul being generally unwilling to leave its eternal reward. At the Games Master\u2019s discretion, this Resistance Roll may be waived for subjects who have unfinished business, a true love, or some heroic reason to return.\n\nIn the case of Evil souls, it is not the deceased\u2019s Willpower resisting, but that of the infernal being \u2013 a demon, devil, or similar entity \u2013 responsible for their torment. The caster must overcome the tormentor\u2019s Willpower score, which is typically 20 points higher than that of the deceased, representing that stronger-willed souls are punished by more powerful entities. If the roll Fails, the soul either cannot or will not return.\n\nIf the spell is successful, the subject returns to life with full Hit Points. However, any severed body parts remain missing. For example, a decapitated or bisected corpse cannot be revived until the parts are physically rejoined using a healer\u2019s kit and a Successful Healing skill check. This often leaves a visible and lasting scar. Other conditions such as disease or poison must be treated before or shortly after casting Raise Dead, or the animation will only be temporary. Raise Dead cannot restore creatures who have died of old age at the end of their natural lifespan.\n\nBeing restored from death is extremely taxing. The revived character is reduced to a Fatigue Level of Incapacitated for 24 hours per day they were dead. During this recovery time, Cure Fatigue has no effect. Afterward, the character may recover from Fatigue normally.",
    reverse: {
      name: "Slay Living",
      flavorText: "You whisper death into the air. Life drains in a blink \u2013 the heart stills, the soul breaks free.",
      description: "When reversed, the caster may use Slay Living to attempt to kill one designated target. The target may resist the spell with a Willpower roll, modified by Rank or SIZ (whichever provides the more favorable result). **Willpower Modifier Table:** Rank 0-1 / SIZ 1-20: Hard. Rank 2 / SIZ 21-40: Standard. Rank 3 / SIZ 41-60: Easy. Rank 4-5 / SIZ 61+: Very Easy. If the target Fails the Resistance Roll, they are slain instantly. The damage is applied as per Cause Serious Wounds (see page XX). Armor offers no protection against this effect."
    }
  },

  "regenerate": {
    name: "Regenerate (Wither)",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 3 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1 Creature",
    castingTime: "3 Minutes",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Parry or Evade)",
    intensityScaling: null,
    flavorText: "With your prayerful magic, limbs return. The body heals at a pace no time could match.",
    description: "When cast, the cleric touches one creature to regrow a dismembered Hit Location. The missing limb or body part regenerates at a rate of 1 Hit Point every 10 minutes until fully healed. If the severed part is present and held against the wound, the entire regeneration process is reduced to 1 minute. This spell does not allow cloning or regrowth of separate body parts independent of the brain and central nervous system. Only locations connected to the torso and head benefit from the spell. Each level of Intensity allows the caster to regrow one separate Hit Location. While Regenerate could technically be used to heal lesser injuries over time, it is inefficient compared to lower Rank, less costly healing spells designed for that purpose.",
    reverse: {
      name: "Wither",
      flavorText: "You point, and decay spreads. Muscle shrinks, skin cracks, and strength rots from the inside out.",
      description: "The reversed version of this spell causes the touched Hit Location to shrivel, gradually becoming useless and eventually falling off. The affected location takes 1 Hit Point of damage every 10 minutes. At 0 Hit Points, the location becomes unusable, and it falls off once it reaches negative Hit Points. Only Regenerate can reverse the effects of Wither. No other magical healing is effective once the withering begins."
    }
  },

  "remove curse (arcane)": {
    name: "Remove Curse (Bestow Curse) (Arcane)",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You place your hand on the cursed victim or item. Magic fractures, and the burden lifts.",
    description: "When cast, Remove Curse typically eliminates the effects of a curse afflicting a creature or item. While it does not remove the cursed nature of an item (such as a weapon, shield, or armor), it does allow a creature bound to such an item to discard it safely. Some powerful curses may only be lifted if Remove Curse is cast at a minimum Intensity, which will be noted in the curse\u2019s description. For example, curing lycanthropy requires either Cure Disease or Remove Curse at a minimum Intensity of 12.",
    reverse: {
      name: "Bestow Curse (Arcane)",
      flavorText: "You speak a word of doom, and misfortune takes hold \u2013 sapping strength, clouding clarity, or dimming hope.",
      description: "When reversed, Bestow Curse inflicts one of several debilitating effects on a chosen enemy. The curse lasts for 1 minute per point of Intensity, and the target may resist with an Opposed Willpower roll. Roll 1d100 to determine the nature of the curse inflicted: 01-25: All skills based on STR, DEX, or CON are 1 Grade more Difficult. Initiative -4, Damage Modifier reduced by 2 steps. 26-50: All skills based on INT, POW, or CHA are 1 Grade more Difficult. Initiative -4. 51-75: All Combat Skills and Resistance Rolls are 2 Grades more Difficult. 76-00: All Failed skill rolls are treated as Fumbles. Note that this differs slightly from the Divine version on page XX."
    }
  },

  "repel insects": {
    name: "Repel Insects",
    school: "Abjuration, Transmutation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Minute",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A gentle magic surrounds you. Crawling things scatter, stingers flee \u2013 no pest dares draw near.",
    description: "This spell creates an invisible barrier around the caster that repels all normal insects within a 10-foot radius. The barrier moves with the caster for the Duration of the spell. To repel giant insects, the spell must be cast at a higher Intensity. To determine the maximum SIZ of insect repelled, multiply the spell\u2019s Intensity by 9. For example, at Intensity 3, the barrier repels insects of up to SIZ 27.\n\nInsects with a SIZ greater than the barrier\u2019s threshold may attempt to force their way through, especially if driven by hunger or aggression. Doing so requires a Successful Willpower roll. If they succeed, they still suffer 1d3 points of damage to each Hit Location when crossing the barrier. Armor offers no protection against this damage. Insects suffer no damage when leaving the Area of Effect and are not required to make a Resistance Roll to exit.\n\nThis spell only affects true insects \u2013 that is, creatures with six legs and three distinct body segments. It has no effect on arachnids (such as spiders), myriapods (such as millipedes or centipedes), or similar non-insect creatures.\n\n**Repel Insects Effects Table:** Intensity 1: Cost 3, 10 Minutes, repels all normal insects and up to SIZ 9 giant insects. Intensity 2: Cost 4, 20 Minutes, repels all normal insects and up to SIZ 18 giant insects. Intensity 3: Cost 5, 30 Minutes, repels all normal insects and up to SIZ 27 giant insects. Intensity 4: Cost 6, 40 Minutes, repels all normal insects and up to SIZ 36 giant insects. Continue progression."
  },

  "restoration": {
    name: "Restoration",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 4 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Healing",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "3 Minutes",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Willpower)",
    intensityScaling: null,
    flavorText: "You channel divine grace. Lost strength returns, drained spirit renews \u2013 like tide rushing back to shore.",
    description: "When cast, this spell restores a portion of a creature\u2019s life force previously drained by Energy Drain or similar effects of Fatigue loss. At Intensity 1, the spell can restore one lost Level of Fatigue, but only if the drain occurred within the last 24 hours. For every additional point of Intensity, the time window extends by another 24 hours. For example, if the victim was drained just under 48 hours ago, the spell would need to be cast at Intensity 2 to take effect. This spell only restores one Level of Fatigue per casting. If a creature has lost multiple levels, each must be restored with a separate casting of Restoration.\n\nIn addition to its effect on Fatigue, Restoration also fully restores all mental faculties lost due to Feeblemind, Insanity, dementia, or similar effects. These mental effects are cured regardless of when they occurred and do not require separate castings. Due to its potent nature, Restoration is extremely taxing on the caster. In addition to the normal Magic Point Cost, the spell also ages the caster by 2% of their natural lifespan. For a typical human, this equates to two years per casting (see Aging on page XX of the *Player\u2019s Handbook* for demi-human aging)."
  },

  "rock to mud": {
    name: "Rock to Mud (Mud to Rock)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Elemental (Earth, Water)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "500\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You point at stone, and it sinks. It softens into thick mud \u2013 foundations buckle, walls collapse.",
    description: "When cast, this spell transforms natural stone in the Area of Effect into soft mud to a depth of 10 feet. It affects only non-magical, natural stone, and has no effect on magically enchanted stone or living magical stone creatures (such as stone golems or earth elementals). Creatures unable to escape the mud will sink at a rate of 1/3 of their SIZ per minute. Once fully submerged, they begin to suffer the effects of Asphyxiation unless aided (see the *Games Master\u2019s Guide*, page XX). Creatures large enough to touch the bottom while keeping their head above the surface may move at 5 feet per Round, or 10 feet with a Successful Brawn roll. The mud naturally transforms into dirt over time, taking 1d6 days per 10 square feet of area affected. This process can be hastened with Dispel Magic or a casting of Mud to Rock.",
    reverse: {
      name: "Mud to Rock",
      flavorText: "You clench your fist. Sludge hardens into stone \u2013 solid, weighty, and stubborn as the earth itself.",
      description: "The reverse of this spell, Mud to Rock, hardens mud or quicksand into soft stone such as limestone or sandstone. This transformation is permanent unless dispelled or later reversed again with Rock to Mud. Creatures currently in the mud may attempt one final escape before the transformation occurs by making a Brawn roll or a Formidable Evade roll, assuming there\u2019s a plausible escape route. Failure results in the creature becoming trapped in the stone."
    }
  },

  "shadow door": {
    name: "Shadow Door",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "1 Minute/Intensity",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You slip into the illusionary doorway. All those remaining behind only see a door leading to an empty room. But you remain, unseen.",
    description: "When cast, the mage creates the illusion of a door that opens into a 10-foot square room. The caster may choose to be visibly seen stepping into the room and/or closing the door behind them. In reality, the caster becomes invisible and may either leave the area entirely or remain nearby to observe. Any creature that opens the door and steps inside believes themselves to be in a clearly empty room, and outside observers perceive the same illusion. The space appears normal and unoccupied.\n\nOnly True Sight, a gem of seeing, or a similar magic item or effect can reveal the truth. In addition, some powerful creatures may be able to see through the illusion naturally and detect the caster despite the spell.\n\n**Shadow Door Effects Table:** Intensity 1: Cost 3, 1 Minute, 30\u2019 range. Intensity 2: Cost 4, 2 Minutes, 60\u2019 range. Intensity 3: Cost 5, 3 Minutes, 90\u2019 range. Intensity 4: Cost 6, 4 Minutes, 120\u2019 range. Continue progression."
  },

  "shadow magic": {
    name: "Shadow Magic",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 0, type: "special" },
    costDisplay: "See Below",
    area: "See Below",
    castingTime: "See Below",
    duration: "See Below",
    range: "See Below",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You twist darkness into spellcraft. Each illusionary spell hums with dread, each strike chills like void-born wind.",
    description: "This spell allows the illusionist to cast a quasi-real version of a Rank 1 or 2 Arcane Evocation spell, such as Fireball, Lightning Bolt, Magic Missile, and so on. The caster selects the specific spell at the time of casting, and it functions exactly as described in its original spell entry.\n\nHowever, because the effect is illusory in nature, targets who suspect the spell to be unreal may attempt to Disbelieve as per the rules on page XX. If a target Successfully Disbelieves, they take only 1/2 of the rolled damage, before applying any reductions from a Resistance Roll, if applicable. If the target Fails to Disbelieve, they suffer full damage and effects as normal."
  },

  "shadow monsters": {
    name: "Shadow Monsters",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "100\u2019",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "Shapes crawl from shadow \u2013 half-formed, half-real, and entirely dangerous.",
    description: "This spell allows the caster to extract substance from the Plane of Shadow to create quasi-real illusions of one or more real creatures. All summoned creatures must be of the same type, and their combined total SIZ may not exceed 6 per point of Intensity. Shadow Monsters do not follow the standard rules for Illusions and Phantasms as detailed on page XX of the *Player\u2019s Handbook* when it comes to damage or contact. Instead, they function according to the rules below. The creatures behave as the normal versions they are mimicking with regard to natural Creature Abilities, skills, attacks, and Armor Points.\n\nHowever, as semi-corporeal entities made of shadow, they have only half their normal Hit Points per location. Regardless of the original creature\u2019s traits, all Shadow Monsters possess the Terrifying Trait. Observers may attempt to Disbelieve (see page XX of the *Player\u2019s Handbook*), but only if prompted by the caster\u2019s behavior or clues.\n\nThose who fail to Disbelieve suffer real damage from the creatures\u2019 attacks. While magical Creature Abilities such as breath weapons, gaze attacks, or spell-like effects may appear to take place, these effects are not real \u2013 though victims must still make saving throws or Resistance Rolls and react as though affected.\n\nThose who succeed at Disbelieving recognize the creatures as shadowy and partially transparent. They may attack them, ignoring any Armor Points, and take only half damage from the monsters\u2019 attacks. They are also immune to any illusory magical effects, such as breath or gaze attacks.\n\nSee Demi-Shadow Monster page XX, for the stronger variant and related effects."
  },

  "speak with plants": {
    name: "Speak with Plants",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Ranger", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "30\u2019 Radius",
    castingTime: "10 Minutes",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You whisper to bark and leaves. They answer slowly, sharing old secrets and quiet memory.",
    description: "Upon casting this spell, the caster gains the ability to communicate in basic terms with all living vegetation within the Area of Effect. This includes both sapient plant creatures \u2013 such as shambling mounds and tree\u2019nts \u2013 and non-sapient vegetation like trees, bushes, fungi, mold, and similar lifeforms. The caster may understand and be understood by all such plants. In the case of non-sapient vegetation, the caster can also exert limited control, enabling actions such as parting dense undergrowth to clear a path, bending tree canopies to provide shelter, or lowering branches to assist with climbing.\n\nThis control does not extend to locomotion \u2013 plants cannot uproot themselves or move from their location. Additionally, Speak with Plants may be used to dispel the Rank 1 spell Entangle, freeing any creatures currently trapped by it."
  },

  "sphere of invulnerability, lesser": {
    name: "Sphere of Invulnerability, Lesser",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "An unseen dome surrounds you. Lesser elemental spells strike, then vanish \u2013 like they were never cast at all.",
    description: "When cast, this spell creates an immobile sphere of shimmering magical protection centered on the caster. The sphere blocks all Rank 1 spells and any magical areas of effect they generate. This includes spells cast via magical items or through the innate magical Creature Abilities of creatures. In addition, the sphere protects against offensive Elemental spells of Rank 2, such as Fireball, Lightning Bolt, and similar effects. It does not stop non-Elemental Rank 2 spells, nor does it affect any spell of Rank 3 or higher. The caster may freely cast spells from within the sphere without penalty and may leave and re-enter the sphere without interrupting its Duration. Lesser Sphere of Invulnerability may be dispelled by Dispel Magic as normal."
  },

  "sticks to snakes": {
    name: "Sticks to Snakes (Snakes to Sticks)",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Druid", rank: 3 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1d4 Sticks, +1/additional Intensity",
    castingTime: "1 Round",
    duration: "2 Rounds/Intensity",
    range: "100\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Branches twist and hiss. Wood becomes serpent \u2013 alive, alert, and coiled to strike.",
    description: "When this spell is cast, 1d4 sticks within the Area of Effect, plus 1 additional stick per level of Intensity beyond the first, are transformed into venomous snakes. Each snake takes on a SIZ appropriate to the size of the stick it originated from. As a general rule, a stick the size of a torch becomes a snake of SIZ 1, a wand-sized stick produces a snake of SIZ 2, and a staff- or one-handed spear-sized stick becomes a snake of SIZ 3. Sticks larger than a staff or one-handed spear cannot be transformed.\n\nIf the caster attempts to transform a stick or wooden weapon currently held by a creature \u2013 such as a staff, spear, or wand \u2013 the target may attempt a Willpower roll to resist the transformation. Magical items are immune to this effect unless they are being held by the caster at the time and the caster chooses to transform them. The snakes created by the spell automatically attack the caster\u2019s opponents and ignore allies. They cannot be directed to take specific actions beyond their initial aggression. Any damage dealt to a snake while the spell is in effect is transferred to the original stick or item after the spell ends, which may result in the destruction of a weapon, wand, rod, or staff.\n\nSnakes produced by this spell function as Small Animals as described on page XX of the *Monster Manual*. These creatures are typically constrictors and possess the traits Cold-Blooded and Grappler. There is a chance that a snake may instead be venomous. This chance is equal to 10% per point of Intensity of the spell. If venomous, replace the Grappler Creature Ability with Venomous (see the *Monster Manual*), and treat the snake as a cobra.\n\n**Sticks to Snakes Hit Location Table:** 1d20: 1-2 Tail Tip (1 AP, 1-2 HP), 3-10 End Length (1 AP, 1-2 HP), 11-18 Fore Length (1 AP, 1-2 HP), 19-20 Head (1 AP, 1-2 HP). If the snake has a combined CON+SIZ of 6 or more, it has 2 HP per location; otherwise, 1 HP. Snakes from magical items retain that item\u2019s Hit Points.",
    reverse: {
      name: "Snakes to Sticks",
      flavorText: "You speak a sharp command. Serpents freeze, then stiffen into lifeless wood.",
      description: "When reversed, Snakes to Sticks transforms appropriate snakes into harmless sticks for the Duration of the spell. It may also be used to counter Sticks to Snakes if cast at an Intensity equal to or greater than the Magnitude of the original casting."
    }
  },

  "stone shape (arcane)": {
    name: "Stone Shape (Arcane)",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You press your hand to rock while speaking the words of magic. It yields like clay into your desired form.",
    description: "Upon casting this spell while touching a piece of stone, the caster may reshape it into any desired form, limited to a volume of 1 cubic foot per point of Intensity. The caster could create makeshift weapons, a stone idol, a hatch, or even carve out a doorway in a larger stone wall, among other functional forms. However, the spell cannot produce works of fine art, and any moving parts \u2013 such as hinges, gears, or latches \u2013 will be non-functional unless the spell is cast at 2 Grades of increased Difficulty. This check may be augmented with either the Mechanisms or Engineering skill, as determined by the Games Master.\n\nNote: The Rank 2 Divine version (Druid 2, Ranger 2) functions identically but is limited to a volume of no more than 9 cubic ft, +1\u2019 per additional Intensity."
  },

  "stone tell": {
    name: "Stone Tell",
    school: "Divination",
    classes: [
      { class: "Druid", rank: 3 }
    ],
    sphere: "Elemental (Earth)",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "5 cu. ft",
    castingTime: "10 Minutes",
    duration: "10 Minutes",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You place your palm on stone. In a slow, deep voice, it recounts what it has seen and felt across the years.",
    description: "When cast on an area of stone, the stone becomes capable of answering questions posed by the caster, offering information about its immediate surroundings. The caster may ask questions such as what creatures have passed by recently, what lies behind or beneath it, or whether any traps are nearby. The usefulness of the answers depends entirely on the stone\u2019s perspective \u2013 it can only reveal what it has \u201cwitnessed\u201d or what exists within or immediately around it. How much detail or clarity the stone provides is left to the discretion of the Games Master, based on the stone\u2019s position, surface exposure, and age."
  },

  "summon shadow": {
    name: "Summon Shadow",
    school: "Conjuration or Necromancy",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "10\u2019 Radius",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You call a figure from the land of shadow. It moves like smoke, and its touch saps the soul.",
    description: "For every 3 levels of Intensity, this spell summons one shadow from the Plane of Shadow (see the *Monster Manual*, page XX). Shadows typically understand the Common Tongue and are willing to follow the caster\u2019s commands, attacking those hostile to the mage and so forth. Shadows are Evil undead entities; slaying or Turning them banishes them before the spell\u2019s Duration expires. Dispel Magic has no effect after the caster summons the shadow. Shadows are detailed in the *Monster Manual*, page XX.\n\n**Summon Shadow Effects Table:** Intensity 1: Cost 3, 1 Minute, 1 shadow summoned. Intensity 2: Cost 6, 2 Minutes, 2 shadows summoned. Intensity 3: Cost 9, 3 Minutes, 3 shadows summoned. Intensity 4: Cost 12, 4 Minutes, 4 shadows summoned. Continue progression."
  },

  "telekinesis": {
    name: "Telekinesis",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "30\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "2 min, +1 min/additional Intensity",
    range: "50\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Your mind grips objects and lifts them. A sword, a foe, a boulder \u2013 motion bends to your will.",
    description: "When cast, this spell allows the mage to move objects through mental manipulation and focus. The caster can apply either a gentle, sustained movement or a single burst of force. The spell has a Duration of 2 minutes, plus 1 additional minute per level of Intensity.\n\nTo move an object gently, it must weigh no more than 9 ENC or 3 SIZ (approximately 25 lb.). The caster may also manipulate inanimate objects without a listed SIZ or ENC as long as their Hit Points do not exceed 8 (see page XX in the *Games Master\u2019s Guide*). Objects that can typically be handled with one hand \u2013 such as buttons, levers, keys, and similar items \u2013 may be manipulated telekinetically. The object may be moved up to 20 feet per Round. If the object is moved beyond the spell\u2019s Area of Effect or the caster loses Concentration, it will fall to the ground or remain suspended midair for the remainder of the spell\u2019s Duration, at the caster\u2019s discretion. Opponents that fall within the weight limit may also be moved, but may resist with a Willpower roll.\n\nThe caster may instead choose to use Telekinesis to hurl one or more objects in a single burst of force. All targeted objects must be within the Area of Effect, and if multiple are used, they must lie within a 5-foot radius of one another. The total combined weight may not exceed 9 ENC or 3 SIZ (25 lb.). The objects may be hurled up to 30 feet per level of Intensity, and deal 1d6 damage, plus 1 additional point per level of Intensity, regardless of construction. Targets may avoid the incoming object with a Successful Evade roll or Parry with a shield. Armor offers only half its normal protection against this damage. Living creatures that fall within the weight limit may also be hurled but may resist with a Willpower roll.\n\nVarious \u201cBig Hand\u201d spells may be used to counter either use of Telekinesis. Additionally, a well-timed casting of Enlarge can counter this spell if the target grows beyond the caster\u2019s capacity to affect.\n\n**Telekinesis Effects Table:** Intensity 1: Cost 3, 2 Minutes, 50\u2019 range, 30\u2019 Radius, hurl 20\u2019 for 1d6+1. Intensity 2: Cost 4, 3 Minutes, 100\u2019 range, 60\u2019 Radius, hurl 40\u2019 for 1d6+2. Intensity 3: Cost 5, 4 Minutes, 150\u2019 range, 90\u2019 Radius, hurl 60\u2019 for 1d6+3. Intensity 4: Cost 6, 5 Minutes, 200\u2019 range, 120\u2019 Radius, hurl 80\u2019 for 1d6+4. Continue progression."
  },

  "teleport": {
    name: "Teleport",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You picture your destination. In a blink, the world folds \u2013 and you\u2019re there.",
    description: "When cast, this spell allows the mage to instantly transport themselves any distance within the same plane of existence. In addition to themselves, the caster may carry 20 SIZ (or 60 ENC), plus an additional 10 SIZ (30 ENC) per additional level of Intensity, as long as the extra weight is worn or physically touched. This may include one or more willing allies, but the caster cannot teleport unwilling beings.\n\nThe destination must contain a solid surface \u2013 the caster may not intentionally teleport into open air or empty space. Upon arrival, the caster and any companions may take no action for the rest of the Round, though they are aware of their surroundings and may defend themselves normally in the following Round.\n\n**Destination Table:** Very Familiar: Easy. Carefully Studied: Standard. Casually Seen: Hard. Seen Only Once: Formidable. Never Seen: Herculean.\n\nIf the casting Fumbles, the Games Master rolls 1d100 to determine the mishap: 01-70 the caster arrives above the ground, 71-00 below. **Distance Table:** 1d10: 01-40: 10\u2019. 41-70: 20\u2019. 71-90: 30\u2019. 91-96: 40\u2019. 97-00: 50\u2019. Arriving above ground results in a fall with damage determined by height. Arriving below a solid surface results in the instant death of the caster and any beings or items being teleported with them."
  },

  "tongues (divine)": {
    name: "Tongues (Confuse Tongues) (Divine)",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "Caster",
    castingTime: "1 Round",
    duration: "10 Minutes",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your mouth opens, and foreign words flow \u2013 perfect and fluent, no matter the language.",
    description: "This spell allows the caster to both speak and understand any one language spoken by a sapient species, including those of newly encountered creatures. The language is chosen at the time of casting and grants the caster perfect fluency and native-level accent. The caster can understand and be understood by all within hearing range, typically about 60 feet. This includes the ability to read and comprehend any racially written script used by the chosen species. The spell does not make the caster more persuasive or likable \u2013 it only enables communication. For every 3 points of Intensity, the caster may choose an additional language to speak and understand. For example, at Intensity 3, the caster could communicate with both goblins and elves, potentially acting as a translator or mediator.\n\nNote that this spell differs from the Rank 2 Arcane spell. See page XX.",
    reverse: {
      name: "Confuse Tongues (Divine)",
      flavorText: "You twist the meaning of speech. Words slur and tangle \u2013 gibberish, even to the one who speaks them.",
      description: "The reverse of this spell, Confuse Tongues, cancels Tongues if cast at an Intensity equal to or greater than its Magnitude. If cast independently, it causes confusion in all verbal communication within a 60-foot radius."
    }
  },

  "true sight": {
    name: "True Sight (False Sight)",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 3 },
      { class: "Mage", rank: 4 },
      { class: "Paladin", rank: 3 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your eyes sharpen. Illusions crumble, invisible entities are revealed, and only truth remains.",
    description: "When cast, True Sight grants the subject the ability to perceive the world with perfect clarity out to a distance of 60 feet, provided there is line of sight. Within this area, all forms of deception and concealment are revealed.\n\nThe spell allows the subject to: See through both magical and natural darkness. Detect secret doors. Reveal invisible and ethereal attackers. See through Illusions and Phantasms. Perceive the true forms of creatures that are polymorphed or shape-shifted.\n\nWith Concentration, the subject may even glimpse planes adjacent to the Prime Material Plane, such as the ethereal realm, as described on page XX of the *Games Master\u2019s Guide*. True Sight also negates the effects of spells like Blur and Mirror Image.\n\nCasting this spell requires mundane material components, as well as rare ingredients valued at 300 GP, consisting of powdered mushrooms, saffron, and animal fat.",
    reverse: {
      name: "False Sight",
      flavorText: "You wrap the mind in illusion. Every vision lies \u2013 truth hides behind carefully crafted falsehood.",
      description: "The Divine version of the spell may be reversed. False Sight causes the victim to perceive a twisted and deceptive version of reality. Under this spell\u2019s effects: That which is Good appears Evil, and Evil seems Good. Hideous things look beautiful, and vice versa. Stairs may vanish, or appear where none exist. Labels on potions or scrolls become gibberish. The victim may mistake friends for enemies, or miss threats entirely. False Sight can be cast upon a target unwillingly. In addition to mundane materials, the casting requires rare components valued at 300 GP, including poppy dust, essence of pink orchid, and specially prepared oils."
    }
  },

  "wall of fire": {
    name: "Wall of Fire",
    school: "Evocation",
    classes: [
      { class: "Druid", rank: 3 },
      { class: "Mage", rank: 3 }
    ],
    sphere: "Elemental/Fire",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "See Below",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You carve a path with arcane words. Fire follows, roaring up into a wall or circle that scorches all who near it.",
    description: "This spell allows the caster to conjure a wall or circle of blazing flame, chosen at the time of casting. The flames burn with a purple or reddish-blue hue, and the effect lasts as long as the caster maintains Concentration, or for 1 Round per Intensity after Concentration ends.\n\n**Wall of Fire** creates a stationary wall of flame that extends 20 feet in length per Intensity, with a fixed height of 20 feet, regardless of Intensity. The wall may be placed anywhere within 180 feet of the caster.\n\n**Circle of Fire** forms a mobile ring of flame centered on the caster, moving with them as they travel. The circle has a radius of 10 feet, plus an additional 5 feet per Intensity beyond the first, and a fixed height of 20 feet. This version has a range of 0 and must fully encircle the caster.\n\nThe side of the wall or circle facing away from the caster radiates intense heat. All creatures within 10 feet of that side suffer 1d6 damage per Round, while those within 20 feet take 1d4 damage. This heat damage is typically applied at the end of the Round. Any creature leaping through the flames suffers 2d6 points of damage, plus 1 additional point per Intensity beyond the first. This damage is applied to each Hit Location, and Armor Points count as half, unless magical. Magic armor may apply its full Magic Bonus.\n\nA Successful Evade Resistance Roll allows a creature to take only half damage on the Round the spell first manifests. Fire-using creatures take half damage from this spell, while cold-using creatures take double damage. The flames may ignite flammable materials. For further detail, refer to Fires in the *Games Master\u2019s Guide*."
  },

  "wall of force": {
    name: "Wall of Force",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "5 Minutes/Intensity",
    range: "100\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You raise an invisible wall of pure arcane force. No blade cuts it, no spell breaches it, no breath passes through.",
    description: "When cast, the mage conjures an invisible wall of magical force into existence within 100 feet of them. The Wall of Force ignores almost all spells and magical effects \u2013 even Dispel Magic cannot nullify it. The wall completely blocks spells, elemental breath weapons, and is immune to physical attacks, including those from magical weapons. It is also unaffected by extreme temperatures, electricity, and similar forms of damage. Only a few specific effects can bypass or destroy it. Teleport, Dimension Door, and similar spells allow creatures to pass beyond the barrier. A Wall of Force can be destroyed by Disintegrate, a Wish, a Rod of Cancellation, or a Sphere of Annihilation.\n\nThe wall may be shaped as a flat barrier, a sphere, or a hemisphere. If cast as a hemisphere, it extends equally below ground from the point of origin. The wall must be continuous and unbroken \u2013 any attempt to create it across a surface that isn\u2019t sealed or complete will cause the spell to fail. At any point during the spell\u2019s Duration, the caster may choose to dismiss the wall with a mental command.\n\n**Wall of Force Effects Table:** Intensity 1: Cost 3, 5 Minutes, wall 10\u2019x10\u2019, sphere/hemisphere 5\u2019 Radius. Intensity 2: Cost 4, 10 Minutes, wall 20\u2019x10\u2019, sphere/hemisphere 5\u2019 Radius. Intensity 3: Cost 5, 15 Minutes, wall 30\u2019x10\u2019, sphere/hemisphere 10\u2019 Radius. Intensity 4: Cost 6, 20 Minutes, wall 40\u2019x10\u2019, sphere/hemisphere 10\u2019 Radius. Continue progression."
  },

  "wall of ice": {
    name: "Wall of Ice",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "10\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You gesture, and frost rises. An ice wall forms \u2013 glittering, solid, and cold enough to sear.",
    description: "This spell allows the caster to conjure a large mass of ice in one of three distinct forms: a wall, a dome, or a sheet that falls on enemies. Regardless of the form, the ice has a thickness of 1 inch per level of Intensity.\n\n**Wall of Ice:** Creates a solid, durable wall ideal for defense or blocking pursuers. Each level of Intensity generates a 10-foot by 10-foot section of ice wall. For example, at 10 Intensity, the caster could create a wall 100 feet long, 10 feet high, and 10 inches thick; or a wall 50 feet long, 10 feet high, and 20 inches thick; or any combination that does not exceed the total square footage and thickness allowed by Intensity.\n\n**Dome of Ice:** Forms a hemisphere of ice like an upside down bowl. The radius is 5 feet per 6 Intensity, and the height is 5 feet per 12 Intensity. The dome may be cast to enclose one or more creatures, requiring them to make a Successful Evade roll to throw themselves clear before the ice forms. The dome may also be inverted to serve as a container or even a makeshift boat.\n\n**Sheet of Ice:** Conjures a horizontal sheet of ice above opponents, which then drops down, striking all creatures beneath. Damage is based on the spell\u2019s Intensity, using the Spell Damage Table, and is applied to 1d3+1 Hit Locations. In the case of humanoids, the head is always the first Hit Location unless they Evade. If the victim successfully Evades, they take only half damage to 1d2 Hit Locations.\n\nBoth walls and domes may be destroyed through brute force or weapon attacks. Each 5-foot section of ice has 1 Armor Point and 12 Hit Points per inch of thickness. When enough damage is dealt to shatter the ice, all creatures within 5 feet suffer 1 point of damage per inch of thickness from exploding shards. Fire-using creatures take double damage, while cold-using creatures take half. Magical fire or supernatural flame can melt the ice in as little as 1 Round, creating a dense fog that lasts for 10 minutes."
  },

  "wizard sight": {
    name: "Wizard Sight",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 3 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "1 Minute",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your magical eye searches ahead for danger. Not even darkness stops it from seeing for you.",
    description: "This spell creates a small, invisible magical \u2018eye\u2019 that the mage can see through for the Duration of the spell. The eye may be sent ahead of the party or moved around corners, into rooms, or along corridors to scout for danger. When scanning only the floor or for obvious threats or items of interest, the eye has a Movement Rate of 10 feet per Round. If examining more thoroughly \u2013 including walls and ceilings \u2013 its Movement Rate drops to 5 feet per Round. The Games Master may call for Perception rolls by the caster to notice subtle details or visual anomalies.\n\nThe eye is corporeal, meaning it cannot pass through solid objects, and has Darkvision out to 10 feet. For the purpose of fitting through tight spaces, the eye is no larger than 1 inch in diameter and has a SIZ of 1.\n\nThe caster must maintain Concentration for the eye to function. If Concentration is broken, the eye becomes inert and remains in place until Concentration is re-established. The eye is separate from the caster for the purposes of magical effects like darkness spells or blindness. However, gaze attacks (such as that from a Beyonder) still affect the caster if the eye perceives them, just as if they were looking directly at the threat."
  },


  // =========================================================================
  //  RANK 3 REVERSE / ALIAS ENTRIES
  // =========================================================================

    "shrink animal": { name: "Shrink Animal", aliasOf: "animal growth", version: "reverse" },
  "cause major wounds": { name: "Cause Major Wounds", aliasOf: "cure major wounds", version: "reverse" },
  "undetectable lie": { name: "Undetectable Lie", aliasOf: "detect lie", version: "reverse" },
  "banish good": { name: "Banish Good", aliasOf: "dispel evil", version: "reverse" },

    "raise water": { name: "Raise Water", aliasOf: "lower water", version: "reverse" },
  "inflict poison": { name: "Inflict Poison", aliasOf: "neutralize poison", version: "reverse" },
  "quench fire": { name: "Quench Fire", aliasOf: "produce fire", version: "reverse" },

    "slay living": { name: "Slay Living", aliasOf: "raise dead", version: "reverse" },
  "wither": { name: "Wither", aliasOf: "regenerate", version: "reverse" },
  "bestow curse (arcane)": { name: "Bestow Curse (Arcane)", aliasOf: "remove curse (arcane)", version: "reverse" },
  "mud to rock": { name: "Mud to Rock", aliasOf: "rock to mud", version: "reverse" },
  "snakes to sticks": { name: "Snakes to Sticks", aliasOf: "sticks to snakes", version: "reverse" },
  "confuse tongues (divine)": { name: "Confuse Tongues (Divine)", aliasOf: "tongues (divine)", version: "reverse" },
  "false sight": { name: "False Sight", aliasOf: "true sight", version: "reverse" },



  // =========================================================================
  //  RANK 4 SPELL ENTRIES (A-G) - Batch 1
  // =========================================================================

  "animal summoning ii": {
    name: "Animal Summoning II",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 mile Radius/Intensity",
    castingTime: "1 Round",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You call to the wild, and stronger beasts respond, ready to fight for you.",
    description: "With the exceptions noted above and in the following text, this spell functions as per Animal Summoning I. The Channel check gains a +5% bonus for each level of Intensity beyond the first, reflecting the expanded Area of Effect and increased likelihood that suitable animals are within range. The maximum combined SIZ of all animals summoned is equal to the spell\u2019s Intensity x10. For example, at Intensity 4, the caster could summon five SIZ 8 wolves (total SIZ 40); or two SIZ 17 boars (total SIZ 34); or one SIZ 34 bear.\n\nThe animals summoned may be of any kind appropriate to the area, but no individual animal may exceed SIZ 60, and no more than eight animals will respond, regardless of the total SIZ allowed. Each additional level of Intensity beyond the first extends the range of the spell by 1 mile. Animals that answer the summons typically arrive in 2d10 minutes x Intensity, unless they are already within line of sight of the caster.\n\n**Animal Summoning II Effects Table:** Intensity 1: Cost 3, +0%, 1 mile Radius, up to 10 SIZ. Intensity 2: Cost 4, +5%, 2 mile Radius, up to 20 SIZ. Intensity 3: Cost 5, +10%, 3 mile Radius, up to 30 SIZ. Intensity 4: Cost 6, +15%, 4 mile Radius, up to 40 SIZ. Intensity 5: Cost 7, +20%, 5 mile Radius, up to 50 SIZ. Continue progression."
  },

  "animate object": {
    name: "Animate Object",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 4 },
      { class: "Druid", rank: 5 }
    ],
    sphere: "Creation, Summoning",
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "6 HP/Intensity",
    castingTime: "2 Actions",
    duration: "1 Minute/Intensity",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You point, and the object jolts to life \u2013 marching, flying, or lashing out as if guided by unseen hands.",
    description: "This spell allows the caster to imbue a normally inert, inorganic object with mobility and limited autonomy. In most cases, there is no Resistance Roll required to animate an object. However, if a creature or person is currently holding the item, they may make a Willpower roll to resist the spell.\n\nEach level of Intensity allows the caster to animate an object with up to 6 Hit Points. The animated object\u2019s Attributes and behavior are determined based on its form and function. To determine the object\u2019s Damage Modifier, double its total Hit Points and consult the Damage Modifier Table on page XX of the *Player\u2019s Handbook*. If the resulting value falls into a penalty range, simply ignore the penalty \u2013 animated objects never have a negative modifier. Hit Locations are not used. Instead, the object is destroyed when it is reduced to 0 Hit Points. If it drops to half its total Hit Points, it is typically rendered immobile, which dispels the enchantment.\n\nThe druidic version of Animate Object functions similarly but is limited to items made of natural materials, such as wood or stone.\n\nThe caster imbues each animated object with a number of INS points equal to 1/10th of their Channel skill, rounded down. This total is divided among all animated items, as the caster chooses. Each point of INS allows the object to carry out one distinct task, such as \u201cpatrol the corridor,\u201d \u201cattack intruders,\u201d \u201chold the door,\u201d and so on.\n\n**Animate Object Effects Table:** Intensity 1: Cost 1, 1 Minute, up to 6 HP. Intensity 2: Cost 2, 2 Minutes, 7-12 HP. Intensity 3: Cost 3, 3 Minutes, 13-18 HP. Intensity 4: Cost 4, 4 Minutes, 19-24 HP. Intensity 5: Cost 5, 5 Minutes, 25-30 HP. Continue progression.\n\n**Initiative and Action Points by Material:** Flexible (Rope, Chain): Initiative 20, AP 3. Wood: Initiative 15, AP 3. Metal, Articulated: Initiative 15, AP 2. Metal, Solid: Initiative 10, AP 2. Stone: Initiative 10, AP 2."
  },

  "anti-animal shell": {
    name: "Anti-Animal Shell",
    school: "Abjuration",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Minute",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "An invisible dome forms around you. No beast or natural creature can cross its edge \u2013 they recoil in fear.",
    description: "The caster creates an invisible globe that shields those within it from hostile, living creatures of the animal family. This includes beings such as humans, giants, griffins, dragons, and similar naturally occurring lifeforms. Creatures of the vegetable family, such as shambling mounds and tree\u2019nts, are unaffected and may enter the barrier freely.\n\nThis spell does not protect against magically conjured or constructed entities, including demons, golems, elementals, and other summoned or artificial beings.\n\nThe globe is mobile and moves with the caster. However, attempting to force the barrier into a creature it repels immediately ends the spell, dispelling the protective shell."
  },

  "anti-magic shell": {
    name: "Anti-Magic Shell",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 Radius/Intensity",
    castingTime: "1 Action",
    duration: "10 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A shimmering field surrounds you, snuffing out spells and repelling magic like reality itself is pushing back.",
    description: "When cast, this spell creates an invisible shell of magical energy that surrounds and moves with the mage. The shell negates all magic and spell-like effects within its Area of Effect, blocking magical energy from passing through in either direction. While active, magic items do not function, and spells cannot be cast from within or into the shell. Those inside the shell are also immune to magical attacks, including breath weapons, gaze attacks, charm spell effects, and similar magical Creature Abilities.\n\nSummoned or charmed creatures are unable to enter the shell. If they are already within its bounds when the spell is cast, they are immediately forced outside. The caster may not push the shell into creatures that cannot retreat \u2013 doing so immediately breaks the spell. Creatures such as elementals, encountered on their native plane, are not considered summoned and may enter the shell freely. However, they still cannot use any Spell-Like Abilities while within its boundaries. Normal creatures, even those with innate magical powers, may pass through the barrier, but their magical Creature Abilities are suppressed while inside. Magic weapons (e.g., +1 arrows, enchanted swords) may pass through the shell, but lose their magical properties while within it and become mundane until they exit. This spell does not affect artifacts, relics, or beings of at least demigod status \u2013 they may act normally within the shell.\n\nIf the barrier does not fully encompass a creature, the Games Master may rule that exposed Hit Locations are vulnerable to magical effects. Anti-Magic Shell is immune to Dispel Magic, and the caster may end the spell at will with a command.\n\n**Anti-Magic Shell Effects Table:** Intensity 1: Cost 3, 10 Minutes, 5\u2019 Radius. Intensity 2: Cost 4, 20 Minutes, 10\u2019 Radius. Intensity 3: Cost 5, 30 Minutes, 15\u2019 Radius. Intensity 4: Cost 6, 40 Minutes, 20\u2019 Radius. Continue progression."
  },

  "big grasping hand": {
    name: "Big Grasping Hand",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "30\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A giant ghostly hand bursts into being \u2013 grabbing, pinning, or crushing whatever it catches.",
    description: "Like Big Interposing Hand, this spell conjures a large magical hand of shimmering, translucent force. The hand appears between the caster and an opponent of their choice, automatically maintaining its position between them with no need for Concentration. The hand remains in position even if the caster or target becomes invisible, polymorphed, or otherwise altered. The caster may, at any time during the spell\u2019s Duration, redirect the hand to block a different opponent. Ranged attacks against the caster become Formidable due to the obscuring nature of the hand, though a Successful attack roll still hits. The hand itself can be damaged by melee weapons and spells, with 2 Armor Points and 5 Hit Points per level of Intensity, up to a maximum of 10 Armor Points and 25 Hit Points. Once destroyed, the hand vanishes. In addition to blocking, Big Grasping Hand can:\n\nHold an opponent of up to SIZ 35, keeping them motionless. Push a creature of SIZ 25 or less directly away from the caster, up to the spell\u2019s maximum range. If the target strikes a solid surface, they take 1d6 damage to 1d3 random Hit Locations. Armor protects as normal. Reduce the Base Movement Rate of creatures between SIZ 25 and 50 to 5 feet per Round. Halve the Movement Rate of creatures larger than SIZ 50.\n\n**Big Grasping Hand Effects Table:** Intensity 1: Cost 3, 1 Round, 30\u2019 range, 2 AP, 5 HP. Intensity 2: Cost 4, 2 Rounds, 60\u2019 range, 4 AP, 10 HP. Intensity 3: Cost 5, 3 Rounds, 90\u2019 range, 6 AP, 15 HP. Intensity 4: Cost 6, 4 Rounds, 120\u2019 range, 8 AP, 20 HP. Intensity 5: Cost 7, 5 Rounds, 150\u2019 range, 10 AP, 25 HP. Continue progression; Max 10 AP and 25 HP."
  },

  "blade barrier": {
    name: "Blade Barrier",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Guardian, Creation",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 to 30\u2019 Radius",
    castingTime: "2 Actions",
    duration: "3 Rounds/Intensity",
    range: "100\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Whirling blades scream into existence, forming a wall or circle \u2013 anything that enters is sliced to pieces.",
    description: "This spell creates a whirling wall of magical blades \u2013 swords, daggers, and knives \u2013 that slash and spin around a fixed point, forming a deadly barrier. Any creature that passes through the Area of Effect suffers 1d8 damage to 1d4+2 random Hit Locations. Armor offers only half its normal protection against this damage, though magical Armor Points reduce damage as normal. Due to the blinding speed and density of the spinning weapons, it is impossible to Parry or Evade the effect. A shield may be used passively to block Hit Locations it covers. In such cases, compare the rolled damage to the shield\u2019s Armor Points and Hit Points to determine whether the shield is damaged or destroyed.\n\nBlade Barrier may be cast defensively, to protect the cleric or allies, or offensively, to trap or injure enemies. If opponents are within five feet of the edge of the barrier as it forms, they may attempt an Evade roll to dive clear. On a Successful roll, they suffer no damage and land prone just outside the Area of Effect. On a Failed roll, they suffer full damage from the blades."
  },

  "chain lightning": {
    name: "Chain Lightning",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "Instant",
    range: "50\u2019/Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You hurl a crackling bolt that jumps from one foe to another \u2013 each hit leaves scorched flesh and a ringing boom.",
    description: "Upon casting, the mage releases a 5-foot bolt of electricity from their fingertips that strikes one visible target within range, dealing 1d6+1 points of damage per 2 levels of Intensity. After hitting the first target, the bolt arcs to the next nearest object or creature, dealing the same amount of damage, minus 1 point. It continues jumping from target to target, each time reducing the damage by an additional 1 point, until it either reaches a damage value of 0, hits an object that grounds the energy (such as metal bars, a large pool of water, etc.), or finds no further valid targets in range.\n\nThe bolt may even arc to allies or back to the caster. While the initial target must be visible, subsequent arcs do not require line of sight. Each arc has its own 50-foot range, which may extend the spell\u2019s effect well beyond the original casting range. Each creature struck takes damage to a single Hit Location. Worn armor offers no protection, but natural armor and magical Armor Points reduce damage as normal.\n\nWith a Successful Evade roll, throwing oneself prone, the victim suffers no damage. Someone with the Artful Dodger ability can Evade without going prone, but a Success in this case only reduces damage by half.\n\n**Chain Lightning Effects Table:** Intensity 1: Cost 3, 50\u2019 range, 1d6+1 damage. Intensity 2: Cost 4, 100\u2019 range, 1d6+1 damage. Intensity 3: Cost 5, 150\u2019 range, 2d6+2 damage. Intensity 4: Cost 6, 200\u2019 range, 2d6+2 damage. Intensity 5: Cost 7, 250\u2019 range, 3d6+3 damage. Continue progression."
  },

  "conjure animals": {
    name: "Conjure Animals",
    school: "Conjuration",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Summoning",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You reach into nature\u2019s core. A host of beasts appears \u2013 claws, hooves, and wings eager to strike.",
    description: "When cast, the cleric conjures one or more natural animals. The maximum combined SIZ of the animals summoned depends on how the spell is used: If the caster summons randomly, the maximum total is Intensity x10, with the Games Master determining which animals appear, based on the surrounding biome. If the caster specifies a type of animal, the limit is Intensity x5. However, if the chosen creature is unsuited to the environment, the Channel roll is made at one Difficulty Grade harder.\n\nThe caster can issue simple commands to the summoned animals \u2013 such as attack an opponent. Attempts to direct them to perform non-hostile or complex actions require an Opposed Persuasion roll vs. the creature\u2019s Willpower. On a Failed roll, the animals either flee or turn hostile, depending on their temperament and instincts. Unless killed or otherwise dismissed, the animals remain for the Duration of the spell.\n\n**Conjure Animals Effects Table:** Intensity 1: Cost 3, 2 Minutes, 10 SIZ random / 5 SIZ specific. Intensity 2: Cost 4, 4 Minutes, 20 SIZ random / 10 SIZ specific. Intensity 3: Cost 5, 6 Minutes, 30 SIZ random / 15 SIZ specific. Intensity 4: Cost 6, 8 Minutes, 40 SIZ random / 20 SIZ specific. Intensity 5: Cost 7, 10 Minutes, 50 SIZ random / 25 SIZ specific. Continue progression."
  },

  "conjure fire elemental": {
    name: "Conjure Fire Elemental (Dismiss Fire Elemental)",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Elemental (Fire)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "5 Minutes",
    duration: "10 Minutes/Intensity",
    range: "250\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A rift flares open. From it steps a being of flame \u2013 towering, blazing, and alive with heat.",
    description: "Unlike the Arcane version of Conjure Elemental (see page XX), this Divine spell does not require a portion of the corresponding element to be present when cast. Instead, the caster opens a gate or portal and summons one or more fire elementals directly from the Elemental Plane of Fire. These elementals do not survive in opposing environments, such as being fully submerged in water, and will dissipate if placed in such conditions. Unlike their Arcane counterparts, Divine-summoned fire elementals never attack the caster or their allies. They act in complete cooperation, defending the caster and providing any assistance within their capabilities for the Duration of the spell.\n\nA summoned elemental returns to its plane when the spell\u2019s Duration ends, its physical form is destroyed, or it is banished.\n\n**Fire Element Summoning Table:** d100: 01-65 \u2013 1 Large. 66-85 \u2013 1 Huge. 86-94 \u2013 1d3+1 Salamanders. 95-97 \u2013 1 Efreeti. 98-99 \u2013 1 Colossal. 00 \u2013 1 Enormous.",
    reverse: {
      name: "Dismiss Fire Elemental",
      flavorText: "You speak a binding word. The elemental writhes, then vanishes in a cloud of smoke and sparks.",
      description: "The caster may banish the elemental at will using Dispel Magic or the reversed version of this spell, Dismiss Fire Elemental. When cast as Dismiss Fire Elemental, only a single level of Intensity is required, regardless of the Magnitude of the original summoning spell."
    }
  },

  "control undead": {
    name: "Control Undead",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1d6 undead",
    castingTime: "1 Round",
    duration: "2d6 Minutes, +2 Minutes/Intensity",
    range: "60\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You assert your will. The dead pause, then bow \u2013 forced to obey you instead of their master.",
    description: "This spell allows the caster to control up to six undead creatures, with more powerful undead counting as multiple creatures based on their Intensity. The caster targets a visible point within range, and the closest undead to that point are affected first. If multiple undead of different Intensities are equally close, the spell prioritizes weaker undead before stronger ones.\n\n**Control Undead Table:** Undead Intensity 1-5: Each counts as 1. Intensity 6-10: Each counts as 2. Intensity 11-15: Each counts as 3. Intensity 16-20: Each counts as 4, and caster must be Rank 5.\n\nUndead of Intensity 1-3 (e.g., skeletons, zombies, ghouls) are automatically controlled. Undead of Intensity 4 or higher may resist with a Willpower roll Opposed by the caster\u2019s spellcasting roll.\n\nOnce under control, the caster may command the undead freely, so long as they are within hearing distance. Communication is not limited by language, and even unintelligent undead can follow basic commands. At the end of the spell\u2019s Duration, the undead return to their normal behavior. Sentient undead (those with INT instead of INS) remember being controlled and may retaliate. Note that dracoliches are immune to Control Undead."
  },

  "control weather": {
    name: "Control Weather",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 5 },
      { class: "Mage", rank: 4 }
    ],
    sphere: "Weather",
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1d4 square miles/Intensity",
    castingTime: "10 Minutes",
    duration: "1d6/1d12 Hours/Intensity*",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You raise your hands to the sky. Storms form, winds shift, or sun breaks through \u2013 whatever you command.",
    description: "This spell allows the caster to alter the current weather conditions across a large area. It is far more powerful than Control Winds, affecting not just wind, but also precipitation and temperature. Once the spell is cast, the desired changes take 1d4 x10 minutes to fully manifest. The caster may adjust each of the following aspects of the weather by up to two Difficulty Grades, as outlined in the Weather Rules in the *Games Master\u2019s Guide*, page XX: Precipitation (e.g., clear skies, light rain, thunderstorms), Temperature (e.g., freezing, cool, warm, scorching), and Wind strength (e.g., still, breeze, gale, storm).\n\nThe Duration of these changes is determined by the spell\u2019s Duration, not the durations listed in the *Games Master\u2019s Guide*.\n\n**Control Weather Effects Table:** Intensity 1: Cost 3, 1d6/1d12 hour Duration*, 1d4 square miles. Intensity 2: Cost 6, 2d6/2d12 hour Duration*, 2d4 square miles. Intensity 3: Cost 9, 3d6/3d12 hour Duration*, 3d4 square miles. Intensity 4: Cost 12, 4d6/4d12 hour Duration*, 4d4 square miles. Continue progression. *1d6 for Arcane, 1d12 for Divine.*"
  },

  "death spell": {
    name: "Death Spell",
    school: "Necromancy",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity, +2 EXP",
    area: "15\u2019 Radius",
    castingTime: "2 Actions",
    duration: "Instantaneous",
    range: "30\u2019/Intensity",
    resist: "Endurance",
    intensityScaling: null,
    flavorText: "You speak a word of pure murder. Creatures caught in its reach collapse \u2013 lifeless before they hit the ground.",
    description: "The successful casting of this spell causes the instant death of a variable number of living creatures within the Area of Effect, so long as they are SIZ 40 or less. For each level of Intensity, the caster rolls 1d6 to determine how many creatures the spell can potentially affect. The spell targets human-sized creatures (SIZ 1-20) before larger ones when both are present. Creatures between SIZ 21-40 count as five human-sized creatures for the purposes of this calculation and are allowed an Easy Resistance Roll to survive. The spell has no effect on creatures larger than SIZ 40, nor on undead or other-planar beings. Only a Wish spell can restore life to those slain by Death Spell.\n\nThe mage must cast the spell using an Intensity equal to or exceeding the number of potential targets. If the number of creatures exceeds the maximum rolled, unused Intensity points are lost.\n\n**Death Spell Effects Table:** Intensity 1: Cost 3 +2 EXP, 30\u2019 range, 1d6 creatures affected. Intensity 2: Cost 4 +2 EXP, 60\u2019 range, 2d6 creatures affected. Intensity 3: Cost 5 +2 EXP, 90\u2019 range, 3d6 creatures affected. Intensity 4: Cost 6 +2 EXP, 120\u2019 range, 4d6 creatures affected. Continue progression."
  },

  "demi-shadow magic": {
    name: "Demi-Shadow Magic",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "180\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Your spell takes on a half-real form \u2013 shadowy, strange, still capable of harm or fear.",
    description: "Apart from any differences noted here or in the text below, this spell functions identically to Shadow Magic (Rank 3; see page XX). Demi-Shadow Magic allows the caster to create quasi-real versions of Rank 3 Arcane Evocation spells, such as Cone of Cold, Cloud Kill, Wall of Force, and others."
  },

  "demi-shadow monsters": {
    name: "Demi-Shadow Monsters",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "100\u2019",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "Creatures shaped from shadow step forward \u2013 not fully real, but still dangerous.",
    description: "This spell is like the Rank 3 spell Shadow Monsters (see page XX), except the creatures have their normal Hit Points per location, rather than half. Those who successfully Disbelieve still take only half the damage rolled from the monsters\u2019 attacks."
  },

  "disintegrate": {
    name: "Disintegrate",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity, +1 EXP",
    area: "1 Target or a 10\u2019 cube",
    castingTime: "2 Actions",
    duration: "Instant",
    range: "20\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You point, a ray of green flies forward from your fingers, and your target crumbles into dust \u2013 stone, steel, or flesh gone in a flash.",
    description: "When cast, a thin green ray shoots from the mage\u2019s fingertip, disintegrating the first object or creature struck. Targets may avoid the beam with a Successful Formidable Evade roll. It is also possible to intercept the beam with a shield using a Successful Combat Skill roll, though doing so disintegrates the shield. Any creature \u2013 living or undead \u2013 touched by the ray briefly glows before instantly vaporizing. The victim may attempt an Endurance roll to resist, modified by their Rank or SIZ, whichever is more favorable.\n\n**Disintegrate Resist Table:** Rank 0-2 / SIZ 1-40: Standard. Rank 3-4 / SIZ 41-60: Easy. Rank 5 / SIZ 61+: Very Easy.\n\nIf the target resists, they still suffer 1d3 damage to the location struck, which is applied equally to any armor or equipment in that location, as well as the location\u2019s Hit Points. If disintegrated, all carried items are also destroyed, except for handheld items or shields, which have a 50% chance of being dropped as the victim vanishes. Only a fine dust remains of the target. The caster may also use this spell to disintegrate non-living matter in a 10-foot cube. When used in this way, the caster does not need to expend EXP. Nothing short of a Wish can restore a disintegrated victim."
  },

  "duo-dimension": {
    name: "Duo-Dimension",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "2 Actions",
    duration: "3 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You flatten into a near-2D sliver \u2013 able to vanish along walls, slip through cracks, and avoid most harm.",
    description: "The successful casting of this spell reduces the caster to two dimensions \u2013 height and width. When viewed from the side, the caster becomes effectively invisible and may only be seen with True Sight or similar magic. This transformation allows the caster to slip through the narrowest of spaces, provided there is enough vertical clearance.\n\nWhile under the effects of Duo-Dimension, the caster may move and act normally. For instance, they could turn sideways to become invisible, move across a room, turn to face an opponent, cast a spell, and then turn sideways again to vanish. While invisible, no form of direct attack may target the caster, though they may still be affected by Area of Effect spells or effects. If the caster is struck by a weapon while visible, they suffer double the rolled damage. Damage Bonus and area-effect damage are calculated as normal.\n\nPart of the caster\u2019s form exists in the Astral Plane during the spell\u2019s Duration. Creatures that dwell in or travel through the Astral Plane may detect and attack the caster. These attacks deal normal damage, and each successful hit carries a 25% chance of pulling the caster entirely into the Astral Plane.\n\nIn addition to standard material components, this spell requires a flat ivory likeness of the caster, finely crafted and decorated with gold and gems, valued between 500 and 1,000 GP. The likeness is consumed during casting."
  },

  "enchant item": {
    name: "Enchant Item",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "special" },
    costDisplay: "3, + See Below",
    area: "1 Item",
    castingTime: "See Below",
    duration: "See Below",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You carve arcane runes and focus your power. The item hums with permanent energy, alive with enchantment.",
    description: "This spell prepares an item for enchantment. The object must be in good condition and of the finest construction and workmanship. An additional cost of at least 100 GP covers the required tooling, carving, embroidery, bejeweling, engraving, and similar Enhancements. The enchantment process also requires a laboratory or workshop.\n\nWhile casting the spell, the mage must remain in physical contact with the item for the entire Casting Time of 1d8+2 days. This time includes rest and sleep, during which the item must remain within arm\u2019s reach. The mage may not cast any other spell or perform any other form of magic during this time. Violating any of these conditions automatically causes the spell to fail.\n\nOnce the spell is successfully cast, the item is ready for the final step \u2013 imbuing it with a specific spell. The caster must either have the spell in memory or on a scroll, and they must begin the casting within 24 hours of completing Enchant Item, or the entire process must be restarted. Imbuing the item requires: The normal Magic Point Cost for the desired Intensity. 1d12 hours per spell Rank to complete the casting. Constant physical contact with the item throughout, or proximity during rest. A Successful Arcane Casting roll at the end of the process.\n\nA spell imbued in this way can be cast only once. However, the caster may imbue multiple copies of the same spell, repeating the process for each. Alternatively, the caster may imbue a single spell and follow it with a casting of the Rank 5 spell Permanency. If successful, that spell may then be cast as often as desired, according to the limitations found in the Permanency spell description."
  },

  "etherealness, lesser": {
    name: "Etherealness, Lesser",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "Caster",
    castingTime: "1 Action",
    duration: "1 Round/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your form blurs and dims. You slip partway into the ethereal \u2013 half-here, half-ghost.",
    description: "When cast, the caster and any carried equipment become ethereal, transitioning into the border region of the Ethereal Plane. This border overlaps the Prime Material Plane, which appears gray and ephemeral from the caster\u2019s perspective. While ethereal, the caster can see and hear the Prime Material Plane (sight is limited to 60 feet). To those on the Prime Material Plane, the caster is invisible and insubstantial, able to move in any direction, including vertically, at their normal Movement Rate simply by concentrating. Being insubstantial, the caster may move through objects or creatures without resistance.\n\nSpells function normally within the Ethereal Plane, and certain spells from the School of Abjuration may harm ethereal characters and entities when cast from the Prime Material Plane. However, no spells cast within the Ethereal Plane can affect the Prime Material Plane. Other ethereal creatures encountered are treated as fully material for purposes of interaction and combat. The caster may end the spell at any time.\n\nIt is nearly impossible for an ethereal traveler to rematerialize into a solid object. If the caster becomes material while inside a solid object (such as a wall, tree, or chest), they are shunted to the nearest open space, taking 1d6 damage to a separate location for every 5 feet moved. Armor offers no protection from this damage.\n\nSee the *Games Master\u2019s Guide*, pages XX-XX, for additional information on the Ethereal Plane and ethereal travel."
  },

  "find the path": {
    name: "Find the Path (Lose the Path)",
    school: "Divination",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Target",
    castingTime: "3 Minutes",
    duration: "10 Minutes/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your vision clears as you speak the final words of your prayer. The true path glows in your mind \u2013 no trap, trick, or turn can hide it.",
    description: "When cast, the subject can locate the most direct and shortest route to a desired locale. The spell cannot locate items or creatures, only specific places. For example, \u201cLead me to the Silver Glade\u201d is a valid use, but \u201cBring me to the nearest pile of gold\u201d is not. The recipient senses the correct direction to travel when presented with a choice of paths or options. For the Duration of the spell, the subject may concentrate to detect hindrances such as traps and will intuitively \u201cknow\u201d any required password to bypass a magical glyph. While active, Find the Path also frees the subject and their allies from the effects of a Maze spell. It does not reveal the presence of living creatures that may block the way, such as animals, monsters, or bandits.",
    reverse: {
      name: "Lose the Path",
      flavorText: "You twist the trail with false turns. No matter their skill, the seeker wanders lost.",
      description: "When reversed, Lose the Path causes a touched subject to become hopelessly lost, unable to find their way. However, an ally can still lead them without issue."
    }
  },

  "fireball, delayed": {
    name: "Fireball, Delayed",
    school: "Evocation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "20\u2019 Radius",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "50\u2019/Intensity",
    resist: "Evade",
    intensityScaling: null,
    flavorText: "You conjure a glowing bead and toss it. Moments later, at your signal, it erupts in fire, burning all in the area.",
    description: "With the exceptions noted above and in the following text, this spell functions as per the standard Fireball spell. A Delayed Fireball is slightly more powerful, inflicting 1d6+1 points of damage for each 2 points of Intensity, or fraction thereof, to all victims in the Area of Effect.\n\nWhen cast, the mage may choose to delay detonation by any amount of time from instantaneously up to 5 minutes. The fireball travels to the designated location and remains inert, appearing as a tiny floating cinder, until the chosen time \u2013 at which point it bursts into a massive explosion of flame.\n\nA Delayed Fireball has a chance to ignite flammable materials equal to the damage rolled x5%. See Fires on page XX of the *Games Master\u2019s Guide* for more information.\n\n**Delayed Fireball Effects Table:** Intensity 1: Cost 3, 50\u2019 range, 1d6+1 damage. Intensity 2: Cost 4, 100\u2019 range, 1d6+1 damage. Intensity 3: Cost 5, 150\u2019 range, 2d6+2 damage. Intensity 4: Cost 6, 200\u2019 range, 2d6+2 damage. Intensity 5: Cost 7, 250\u2019 range, 3d6+3 damage. Continue progression."
  },

  "flesh to stone": {
    name: "Flesh to Stone (Stone to Flesh)",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "1 Target",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "30\u2019/Intensity",
    resist: "Willpower",
    intensityScaling: null,
    flavorText: "You point, and the target freezes. Skin hardens, limbs lock, and they turn to cold, unmoving stone.",
    description: "When cast, a victim within range must make a Willpower Resistance Roll. If unsuccessful, the spell transforms the victim and all worn or carried belongings into solid stone. This transformation does not cause death, but rather induces a state of suspended animation. The reversed version of this spell, or a Wish, can restore the victim. Any damage sustained while petrified carries over and takes effect immediately upon restoration. Large creatures (SIZ 21-40) are less susceptible, making the Resistance Roll Easy. For Huge creatures (SIZ 41+), the Resistance Roll is Very Easy.",
    reverse: {
      name: "Stone to Flesh",
      flavorText: "You touch the statue and speak. The stone ripples, softens, and breath returns to flesh.",
      description: "The reverse of the spell, Stone to Flesh, restores a petrified victim with no roll to resist required (for example, from the victim of a greater or lesser gorgon). It can also transform ordinary, non-living stone into living matter, allowing for several creative uses. For example, a Wall of Stone of up to 10 cubic feet per level of Intensity may be changed into soft flesh, forming a tunnel up to 3 feet wide and 10 feet long per Intensity. The caster may also target a stone statue, restoring it into a living body, or even transform a stone golem into a flesh golem. In the latter case, the golem is allowed a Willpower roll to resist as normal. Stone turned to flesh by this spell is pliable and soft \u2013 while it retains its normal Hit Points, it has no Armor Points, making it easier to damage or hack apart."
    }
  },

  "forbiddance": {
    name: "Forbiddance",
    school: "Abjuration",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Protection",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "60\u2019 Radius/Intensity",
    castingTime: "5 Minutes",
    duration: "Permanent",
    range: "100\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A ward settles across the area. No teleportation, no planar travel, no uninvited step can cross the boundary.",
    description: "Forbiddance allows the caster to consecrate a designated area, sealing it from entry by teleportation, ethereal travel, or plane shifting. At the time of casting, the caster may decide whether the ward can be bypassed by a password or is keyed to the entity\u2019s Alignment (Lawful Good, True Neutral, etc.). A password may also take the form of a hand signal or gesture.\n\nWhere multiple Alignment conditions apply, use the one with the most severe penalty: Alignment identical: No effect (however, if a password is used, no one can enter without it). Alignment opposition with regard to Good vs. Evil: A Willpower roll is required to enter, Opposed by the caster\u2019s Channel roll at the time of casting. On a Failure, the trespasser suffers 1d3 damage to the head; a Fumble increases this to 1d6. Armor offers no protection, and this damage must heal naturally or via magic. Alignment opposition with regard to Lawful vs. Chaotic: As per Good vs. Evil, but a Failure causes 1d6 damage to the head, and a Fumble causes 2d6.\n\nIf the trespasser Fails their Resistance Roll, they cannot enter the consecrated area while Forbiddance is in effect. The spell is permanent unless dispelled, which requires a caster of at least equal Rank to cast Dispel Magic at a higher Intensity than the spell\u2019s Magnitude.\n\nThe spell requires the caster\u2019s holy symbol, a bottle of holy water, and rare incense valued at 1,000 GP per 60\u2019 radius. Adding a password requires an additional 4,000 GP per 60\u2019, for a total of 5,000 GP."
  },

  "geas": {
    name: "Geas",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "special" },
    costDisplay: "3, +1 EXP",
    area: "One Target",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "Your magical words bind the soul. The target must complete your task \u2013 or suffer for disobedience.",
    description: "When cast, the mage places a magical command on a single creature that it must carry out to the best of its ability. The target \u2013 typically a human, demi-human, or humanoid \u2013 must be sapient (possessing INT rather than INS) and able to understand the caster. The spell cannot compel the creature to take an action that would certainly result in its death, but nearly any other command is possible. The creature is compelled to follow the caster\u2019s instructions until the task is completed. If it ignores the command, it begins to suffer: all skill rolls become one Difficulty Grade harder for each full cumulative week of disobedience. This penalty reduces by one Difficulty Grade per day once the creature resumes following the command. If the target disregards the command for four full weeks, it dies.\n\nAttempting to twist or subvert the command results in the loss of 1 Fatigue level per day. These levels are restored at a rate of 2 per day once the creature resumes compliance. Only Wish can remove this spell. Neither Dispel Magic nor Remove Curse has any effect."
  },

  // RANK 4 A-G REVERSE ALIASES
  "dismiss fire elemental": { name: "Dismiss Fire Elemental", aliasOf: "conjure fire elemental", version: "reverse" },
  "lose the path": { name: "Lose the Path", aliasOf: "find the path", version: "reverse" },
  "delayed fireball": { name: "Delayed Fireball", aliasOf: "fireball, delayed", version: "primary" },
  "stone to flesh": { name: "Stone to Flesh", aliasOf: "flesh to stone", version: "reverse" },


  // =========================================================================
  //  RANK 4 SPELL ENTRIES (H-W) - Batch 2
  // =========================================================================

  "heal": {
    name: "Heal (Harm)",
    school: "Necromancy",
    classes: [
      { class: "Cleric", rank: 4 },
      { class: "Druid", rank: 4 }
    ],
    sphere: "Healing/Necromantic",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Creature",
    castingTime: "1 Minute",
    duration: "Permanent",
    range: "Touch",
    resist: "N/A (Endurance)",
    intensityScaling: null,
    flavorText: "You touch the wounded or whisper a prayer. Illness ends, wounds close, blindness and deafness fade, and strength returns like rushing water.",
    description: "Upon casting, the cleric cures all disease and injury with a single touch. The extent of recovery depends on the spell\u2019s Intensity. At Intensity 1, the spell either heals all disease, cures blindness and/or deafness, removes mental disorders caused by injury or magic (see Sanity & Corruption in the *Games Master\u2019s Guide*), or completely heals one Hit Location. It cannot restore severed limbs \u2013 that requires a casting of the Rank 5 spell Regenerate. Each additional level of Intensity completely heals one more Hit Location. For example, a casting at Intensity 7 would fully heal a character suffering burns across their entire body. Unlike lesser healing spells (see Magical Healing, page XX), Heal is not limited by the length of time the subject has suffered the injury or ailment.",
    reverse: {
      name: "Harm",
      flavorText: "You flood the target with decay. Vitality withers, breath shortens, and death creeps in like rot.",
      description: "When reversed, Harm inflicts magical injury to a single Hit Location. With a Successful Resistance roll, that location is reduced to 1 Hit Point. On a Failed roll, it drops to \u20131 Hit Point. In addition, the target suffers a malady identical in effect to the reversed Rank 2 spell Cause Disease. Each additional Intensity affects another Hit Location contiguous to the first, with the results determined by the initial Resistance Roll. Large creatures (SIZ 21-40) are more resistant to Harm, treating the Resistance Roll as Easy. Huge creatures (SIZ 41+) treat the roll as Very Easy. Neither version of this spell affects undead, non-corporeal entities, or creatures that can only be harmed by iron, silver, or magical weapons."
    }
  },

  "heroes feast": {
    name: "Heroes Feast",
    school: "Evocation",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Creation",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 feaster/Intensity",
    castingTime: "10 Minutes",
    duration: "1 Hour",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A banquet appears at the final words of your prayer \u2013 fine food, rich drink, and sacred blessing that strengthens the body and protects the soul.",
    description: "When cast, the cleric conjures a lavish feast complete with a grand table, chairs, delicious food, and refreshing drink, enough to serve one being per level of Intensity. The meal is magically restorative, curing all diseases and granting Immunity to Poison for 12 hours. In addition, the feast heals 1d4+4 Hit Points, divided evenly among all injured locations. After consuming the ambrosia-like food and nectar-like wine, each participant gains the benefits of a Bless spell, as well as Immunity to fear, panic, and hopelessness, all lasting for 12 hours. The spell requires the full one-hour Duration to consume. If the meal is interrupted before completion, all benefits are lost and the spell has no effect."
  },

  "illusion, permanent": {
    name: "Illusion, Permanent",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "30\u2019/Intensity",
    resist: "Disbelieve",
    intensityScaling: null,
    flavorText: "You craft an illusion so perfect it lasts forever \u2013 real to the eye, ear, and touch.",
    description: "This spell functions as the standard Rank 1 version of Illusion (see page XX), except as noted below. A Permanent Illusion includes visual, audio, olfactory, and thermal components and remains indefinitely. Creatures within the Area of Effect perceive the illusion as entirely real, to the point of suffering actual damage from illusionary sources. For example, an attack from an illusionary lion deals damage as though the lion were real.\n\nIf one creature Successfully Disbelieves the illusion, they may inform others, granting those individuals a Disbelieve roll one Difficulty Grade easier. Dispel Magic can dispel the illusion using the standard rules. See Illusions and Phantasms, page XX of the *Player\u2019s Handbook*, for additional information.\n\n**Permanent Illusion Effects Table:** Intensity 1: Cost 3, 30\u2019 range, 10\u2019 Radius. Intensity 2: Cost 4, 60\u2019 range, 20\u2019 Radius. Intensity 3: Cost 5, 90\u2019 range, 30\u2019 Radius. Intensity 4: Cost 6, 120\u2019 range, 40\u2019 Radius. Continue progression."
  },

  "invisible stalker": {
    name: "Invisible Stalker",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "special" },
    costDisplay: "3, +1 EXP, Plus See Below",
    area: "See Below",
    castingTime: "1 Round",
    duration: "See Below",
    range: "30\u2019",
    resist: "N/A/Willpower",
    intensityScaling: null,
    flavorText: "You summon a silent hunter from the Elemental Planes. Tireless, unseen, and loyal only to you.",
    description: "This spell summons an invisible stalker from the Elemental Plane of Air to carry out a task assigned by the mage. The stalker is tireless and relentless, capable of pursuing its target across any distance. It understands the Common Tongue but speaks only its native language. Once given a command, the stalker follows it without question, regardless of difficulty or duration. However, it acts out of obligation, not loyalty, and resents overly complex or lengthy tasks. In such cases, it may attempt an Opposed Willpower roll. If Successful, the stalker breaks free of the summoning and returns to its plane.\n\nTo keep the stalker bound and its mission active, the caster must spend the +1 EXP listed in the spell\u2019s Cost each time Experience Rolls are awarded. If the caster fails to pay this Cost, the stalker immediately escapes back to the Elemental Plane of Air. See Invisible Stalker in the *Monster Manual*, page XX, for additional information."
  },

  "live oak": {
    name: "Live Oak",
    school: "Enchantment (Charm)",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 Oak Tree",
    castingTime: "10 Minutes",
    duration: "24 Hours/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You touch the mighty oak. It stirs, then moves \u2013 ready to follow, defend, or crush at your command.",
    description: "The casting of this spell enchants an oak tree so it may serve as a guardian and protector. Only one oak may be under the effects of this spell from a single caster at any given time. The chosen tree must be within an area sacred to the caster or no more than 100 feet from the caster\u2019s dwelling or the object/place they wish to guard.\n\nAt the time of casting, the druid selects a basic triggering phrase of no more than 20 words. The oak radiates magic. A Successful Dispel Magic cast at an Intensity greater than the Magnitude of the spell causes the tree to revert to normal, rooting it in its current location. The original caster may also choose to end the spell, in which case the tree returns to its original position if possible. Plant Growth may be used to heal the enchanted oak of injuries as if casting Cure Serious Wounds; however, this does not increase the tree\u2019s SIZ or Hit Points beyond their normal maximum. Unlike a typical tree\u2019nt, however, its Base Movement Rate is limited to 10 feet.\n\n**Live Oak Size Table:** Intensity 1: Cost 3, Small (12\u2019-14\u2019 tall), equal to a Young tree\u2019nt. Intensity 2: Cost 4, Medium (15\u2019-19\u2019 tall), equal to a Middle Age tree\u2019nt. Intensity 3: Cost 5, Large (20\u2019+), equal to an Elder tree\u2019nt."
  },

  "major creation": {
    name: "Major Creation",
    school: "Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 1, type: "perIntensity" },
    costDisplay: "1/Intensity",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "1 Day (24 Hours)",
    range: "30\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "From nothing, you shape a complex object \u2013 stone, cloth, wood, or stranger things pulled from the void.",
    description: "Like Lesser Creation (see page XX), this spell allows the caster to conjure an item made of non-living material by drawing filaments from the Plane of Shadow and weaving them into form. The item may weigh up to 10 ENC per level of Intensity (or have up to 10 Hit Points in the case of objects without ENC) or consist of up to 5 cubic feet of material per Intensity. This spell functions exactly as Lesser Creation, except as noted above.\n\n**Major Creation Effects Table:** Intensity 1: Cost 1, 24-Hour Duration, item up to 10 ENC/HP or 5 cubic ft. Intensity 2: Cost 2, 48-Hour Duration, item up to 20 ENC/HP or 10 cubic ft. Intensity 3: Cost 3, 72-Hour Duration, item up to 30 ENC/HP or 15 cubic ft. Intensity 4: Cost 4, 96-Hour Duration, item up to 40 ENC/HP or 20 cubic ft. Continue progression."
  },

  "monster summoning, greater": {
    name: "Monster Summoning, Greater",
    school: "Conjuration",
    classes: [
      { class: "Bard", rank: 3 },
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "120\u2019 Radius",
    castingTime: "2 Rounds",
    duration: "6 Minutes/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You open a larger rift with the final arcane words. Powerful beasts rush through \u2013 flying, stomping, roaring to join the fight.",
    description: "This spell functions in all respects as the Rank 2 spell Lesser Monster Summoning (see page XX), except as noted below. The creatures summoned by this version are drawn from the Greater Monster Summoning Table.\n\n**Greater Monster Summoning Table (d100):** 01 \u2013 Black Dragon (Young). 02 \u2013 Blue Dragon (Very Young). 03 \u2013 Brass Dragon (Young). 04 \u2013 Bronze Dragon (Very Young). 05-09 \u2013 1d4+2 Bugbears. 10-12 \u2013 Cave Bear. 13 \u2013 Copper Dragon (Young). 14-16 \u2013 1d2 Cyclopes. 17-20 \u2013 2d3 Dark Elf Warriors. 21-23 \u2013 1d2 Displacer Cats. 24-27 \u2013 1d2+1 Gargoyles. 28-31 \u2013 2d3 Ghasts. 32-36 \u2013 2d4 Ghouls. 37-38 \u2013 Giant Snake (Constrictor, 20% poisonous). 39-41 \u2013 Giant Spider. 42-46 \u2013 1d6+1 Gnolls. 47 \u2013 Gold Dragon (Very Young). 48-49 \u2013 Gorgon, Lesser. 50 \u2013 Green Dragon (Young). 51-52 \u2013 2d3 Hell Hounds. 53-57 \u2013 1d6+3 Hobgoblins. 58-59 \u2013 Large Elemental (sub-type: 01-25 Earth, 26-50 Air, 51-75 Fire, 76-00 Water). 60-62 \u2013 1d6+1 Lizard Men. 63-65 \u2013 1d3 Minotaurs. 66-68 \u2013 1d3+1 Ogres. 69-74 \u2013 1d6+3 Orcs. 75-77 \u2013 1d2 Owl Bears. 78 \u2013 Red Dragon (Very Young). 79 \u2013 Silver Dragon (Very Young). 80-85 \u2013 1d6+4 Skeletons. 86-90 \u2013 1d6+1 Troglodytes. 91-93 \u2013 1d3+1 Werewolves. 94 \u2013 White Dragon (Young). 95-00 \u2013 1d6+4 Zombies."
  },

  "pass plant": {
    name: "Pass Plant",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "See Below",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You step into a tree \u2013 and step out of another, no matter how far the forest stretches.",
    description: "This spell allows the caster to enter a tree and pass from it to another tree of the same type no more than 1,800 feet away. The destination tree does not need to be within the caster\u2019s line of sight. At the time of casting, the caster simply states the desired direction of travel \u2013 such as \u201cas far north as possible\u201d \u2013 and the spell transports them to the nearest tree of the same type in that direction, within range. If no tree lies in the chosen direction, the spell defaults to the closest eligible tree in any direction within range.\n\nIf no suitable tree exists within the 1,800-foot radius, the caster remains within the original tree for the Duration. The caster may step out of the destination tree immediately, using any remaining movement, or choose to remain within it for up to 10 minutes per level of Intensity. While inside the tree, the caster can only hear the outside world and must succeed at a Perception roll to notice anything quieter than a yell. If the tree is burned or chopped down before the caster exits, the caster dies instantly."
  },

  "phase door": {
    name: "Phase Door",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 usage/Intensity",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You trace a symbol, and a hidden passage opens in solid wall. Only you \u2013 and those you choose \u2013 can pass.",
    description: "Upon casting, the mage attunes themselves to a section of wall, creating a passage invisible to all other creatures. The passage measures 5\u2019 wide, 8\u2019 high, and 10\u2019 deep, and may pass through otherwise solid walls made of stone, wood, or plaster. Other materials are unaffected. The caster may pass through this doorway once per level of Intensity. Each time, they appear to phase into the wall and emerge on the other side. Other creatures cannot use the passage, even if they witness the caster using it. However, the caster may choose to bring one creature of SIZ 20 or less with them. Doing so counts as one additional usage. The spell endures indefinitely as long as remaining uses are available, though a Dispel Magic cast at sufficient Intensity can end it prematurely.\n\nThe passage blocks all light and sound and prevents any spell-like effects from entering unless they are in direct contact with the caster while passing through.\n\nLegends speak of powerful mages who developed versions of Phase Door that could be renewed, made permanent, or keyed to specific individuals. Some permanent variants are even tied to rings, amulets, or other enchanted items, allowing or denying passage based on who carries them."
  },

  "power word - blind": {
    name: "Power Word \u2013 Blind",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "15\u2019 Radius",
    castingTime: "1 Action",
    duration: "See Below",
    range: "20\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You speak a single word. Light dies in your target\u2019s eyes \u2013 their vision gone in an instant.",
    description: "Upon successfully casting this spell, one creature of the mage\u2019s choice within both line of sight and range is struck blind \u2013 along with all other creatures within a 15\u2019 radius of that target. The blindness persists for a Duration modified by the target\u2019s Rank or SIZ, whichever provides the more favorable result.\n\n**Power Word \u2013 Blind Modifier Table:** Rank 0-1 / SIZ 1-20: 1d4+1 x10 Minutes (if only 1-3 creatures in area, effects are permanent until magically treated). Rank 2 / SIZ 21-40: 1d4+1 Minutes. Rank 3 / SIZ 41-60: 1d4+1 Rounds. Rank 4 / SIZ 61-80: 1d3 Rounds. Rank 5 / SIZ 81+: 1 Round.\n\nBlindness caused by this spell may be cured by a casting of Heal or Dispel Magic."
  },

  "prismatic spray": {
    name: "Prismatic Spray",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "Instantaneous",
    range: "65\u2019 x 15\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A rainbow of energy blasts from your hand. Each color brings chaos \u2013 fire, fear, stone, and worse.",
    description: "When cast, seven multicolored lights spray from the caster\u2019s hand in a 90-degree arc, extending 60 feet. Anyone within the Area of Effect who Fails an Endurance roll (modified by Rank or SIZ) is temporarily blinded for 2d4x10 minutes.\n\n**Endurance Roll Modifiers:** Rank 0-1 / SIZ 1-20: Standard. Rank 2 / SIZ 21-30: Easy. Rank 3+ / SIZ 31+: No Effect.\n\nEach target is struck by one or two colored rays (roll 1d8). **Prismatic Spray Damage Table (d8):** 1 Red: 2d6 fire damage to all Hit Locations, worn armor offers no protection, magical AP and natural armor reduce normally. 2 Orange: 1d6 acid damage for 3 Rounds to all exposed Hit Locations and armor. 3 Yellow: 3d6 electricity damage to 1d6 random Hit Locations, worn and natural armor offer no protection, magic armor offers Magic Bonus only. 4 Green: Potency 80 poison (Endurance, Onset 1d3 Rounds, Condition: Death, Antidote: Magic only). 5 Blue: Petrification on Failed Willpower roll (suspended animation, reversed by Stone to Flesh or Wish). 6 Indigo: Insanity on Failed Willpower roll (long-term; Success = Immediate Conditions table instead). 7 Violet: Banishment on Failed Willpower roll (sent to another plane). 8: Struck by two rays, roll twice ignoring further 8s.\n\nEvade rolls (going prone) negate Red and Yellow damage entirely. Artful Dodger allows Evade without going prone but only halves damage unless within 5 feet of the edge."
  },

  "prismatic wall": {
    name: "Prismatic Wall",
    school: "Conjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "perIntensity" },
    costDisplay: "3/Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "30\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "Seven glowing layers form a wall. Each is deadly, and none can be crossed without pain \u2013 or death.",
    description: "When cast, a stationary, multicolored barrier of oscillating light materializes at a point within the spell\u2019s Effective Range. The wall is 5 feet long and 2.5 feet tall per level of Intensity. It cycles through the seven colors of the visible spectrum, each layer possessing a distinct magical effect. Creatures (other than the caster) that do not avert their eyes risk temporary blindness for 2d4x10 minutes on a Failed Endurance roll.\n\n**Endurance Roll Modifiers:** Rank 0-1 / SIZ 1-20: Standard. Rank 2 / SIZ 21-30: Easy. Rank 3+ / SIZ 31+: No Effect.\n\nWhile the caster may position the wall to protect others, only the caster can pass through it unharmed. The wall can be destroyed, but only one color at a time, in sequence from outermost to innermost. Each layer must be negated using a specific magical attack. A Rod of Cancellation or the Disjunction spell can destroy the entire wall, but Anti-Magic Shell offers no protection or effect.\n\nAny creature attempting to force their way through the wall takes damage from each color layer as detailed in the Rank 4 Prismatic Spray spell (see page XX). The violet layer prevents physical passage by projecting a force field. For a full list of each color\u2019s effects and the spells needed to negate them, refer to the Rank 5 Prismatic Sphere spell."
  },

  "project image": {
    name: "Project Image",
    school: "Transmutation, Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "5 Minutes/Intensity",
    range: "30\u2019/Intensity",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "With the words of the spell, a phantom double appears elsewhere, casting spells and speaking as you watch silently.",
    description: "When cast, the mage draws energy from the Plane of Shadow to create an illusionary image of themselves anywhere within the spell\u2019s range. This image mimics the caster\u2019s movements, voice, and scent. It automatically performs whatever actions the caster takes, duplicating them precisely. However, the caster may spend an Action to have the image perform a separate Action. With Concentration, the caster can take direct control of the image, allowing them to see and hear through it and to speak or cast spells as if they were physically present in that location. While doing so, the caster\u2019s actual body becomes blind and deaf. Maintaining line of effect is required \u2013 if broken, the spell ends.\n\nThe mage may cast spells with a range of Touch or greater and have them originate from the image. The image can also cast illusion spells upon itself due to its quasi-real nature. Any spells it casts on others affect them as normal.\n\nIf attacked, weapons pass harmlessly through the image. The caster may dispel the image at will. Dispel Magic also ends the spell if cast at a greater Intensity than its Magnitude, or a Successful attempt to Disbelieve may reveal and negate it. Any spell that breaks line of effect \u2013 such as Dimension Door, Plane Shift, or Teleport \u2013 ends Project Image immediately.\n\n**Project Image Effects Table:** Intensity 1: Cost 3, 5 Minutes, 30\u2019 range. Intensity 2: Cost 4, 10 Minutes, 60\u2019 range. Intensity 3: Cost 5, 15 Minutes, 90\u2019 range. Intensity 4: Cost 6, 20 Minutes, 120\u2019 range. Continue progression."
  },

  "reincarnation": {
    name: "Reincarnation (Arcane/Divine)",
    school: "Necromancy",
    classes: [
      { class: "Druid", rank: 4 },
      { class: "Mage", rank: 4 }
    ],
    sphere: "Animal",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity, +1 EXP",
    area: "One Target",
    castingTime: "10 Minutes",
    duration: "Permanent",
    range: "Touch",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You touch a fallen soul. It returns \u2013 alive and fully grown, but in a new form, strange or familiar.",
    description: "This spell reincarnates the soul of the dead into another being. It may be cast while touching the corpse of a creature that\u2019s been dead for less than 24 hours per level of Intensity. Note that the Arcane version of Reincarnation has no effect on full-blooded elves \u2013 this requires the Divine version.\n\nIf the victim\u2019s Alignment was anything other than Evil, they may resist the spell with an Opposed Willpower roll. A Success negates the spell, as the soul of the deceased is rarely willing to return to life in a new body after reaching its eternal reward. For Evil souls, it\u2019s not the deceased\u2019s Willpower that resists the spell, but that of the demon, devil, or other tormentor overseeing their damnation. The caster must overcome the tormentor\u2019s Willpower, which is typically at least 20 points higher than the deceased\u2019s.\n\nIf Successful, a fully formed adult body appears within 1d6x10 minutes, inhabited by the soul of the deceased. The caster has no control over the form or sex of the new body. The reincarnated individual retains their former character Class and Rank, but convincing others of their identity may require Influence rolls. All physical Characteristics must be determined randomly based on the new form. INT, POW, and CHA remain unchanged. Former racial abilities are lost and replaced by those of the new species. A Wish spell can restore the character to their previous form.\n\n**Arcane Reincarnation Form (d100):** 01-20 Human. 21-60 Demi-Human (sub-table: 01-11 Abyssar, 12-22 Dwarf, 23-33 Elf, 34-44 Gnome, 45-55 Half-elf, 56-66 Halfling, 67-77 Khelmar, 78-88 Syrin, 89-00 Vulpan). 61-95 Humanoid/Monster (sub-table: 01-10 Bugbear, 11-26 Gnoll, 27-42 Goblin, 43-58 Hobgoblin, 59-74 Kobold, 75-90 Orc, 91-95 Ogre, 96-00 Troll). 96-00 Other, GM\u2019s option.\n\n**Divine Reincarnation Form (d100):** 01-15 Human. 16-35 Woodland Being (sub-table: 01-15 Centaur, 16-30 Dryad, 31-45 Faun/Satyr, 46-65 Elf, 66-85 Gnome, 86-00 Pixie). 36-85 Woodland Animal (sub-table: 01-11 Eagle, 12-23 Bear, 24-32 Boar, 33-37 Fox, 38-46 Hawk, 47-53 Lynx, 54-60 Owl, 61-65 Raccoon, 66-76 Stag, 77-88 Wolf, 89-00 Wolverine). 86-00 Other, GM\u2019s option."
  },

  "shadow walk": {
    name: "Shadow Walk",
    school: "Enchantment (Charm), Illusion",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "60 Minutes/Intensity",
    range: "100\u2019",
    resist: "N/A, but See Below",
    intensityScaling: null,
    flavorText: "You step into dim light and vanish. Through the edge of the Plane of Shadow, you reappear far away in the material world.",
    description: "When cast while the caster is occupying an area of shadow, this spell transports the mage and any creature in contact with them to a point on the edge of the Prime Material Plane where it touches the Shadow Plane (see the *Games Master\u2019s Guide*, page XX).\n\nWhile in the Plane of Shadow, the caster and companions may travel at great speed \u2013 8 miles in just 10 minutes (approximately 50 miles per hour). This allows the caster to enter the Plane of Shadow, traverse long distances, and step back into the Prime Material Plane far from their point of origin. The caster is fully aware of the physical location they will occupy upon exit, but not its current state or any dangers that may be present. Exiting into the Prime Material Plane is done at will and does not require another casting of Shadow Walk.\n\nCompanions may follow the caster or go their own way. If separated and they lose sight of the caster, a Hard Perception roll is required to find them again. Individuals who fail and become lost have a 50% chance per day of stumbling back into the Prime Material Plane. While wandering the Plane of Shadow, these travelers are exposed to the dangers of its dark and unstable terrain.\n\nThe caster may also choose to use Shadow Walk to travel to another plane that borders the Plane of Shadow. This includes the Elemental Planes, Energy Planes, and even the Astral or Ethereal. Doing so requires navigating the hazards of the Plane of Shadow and a separate casting of Shadow Walk to complete the transition."
  },

  "speak with monsters": {
    name: "Speak with Monsters",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Divination",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "1 or more Monsters",
    castingTime: "2 Actions",
    duration: "2 Minutes/Intensity",
    range: "100\u2019",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You cast the spell, and monstrous voices make sense \u2013 growls, croaks, hisses, and roars become words.",
    description: "This spell allows the cleric to understand and be understood by any type of creature capable of communication \u2013 whether telepathic, pheromonal, tactile, or otherwise. The caster speaks in their own language, and the creature perceives the caster\u2019s intent or query in its native form of communication.\n\nThe Games Master should determine the creature\u2019s reaction based on its Alignment compared to that of the caster. The caster may switch communication from one creature to another of the same type at any time throughout the spell\u2019s Duration."
  },

  "sphere of invulnerability, greater": {
    name: "Sphere of Invulnerability, Greater",
    school: "Abjuration",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "5\u2019 Radius",
    castingTime: "1 Round",
    duration: "1 Minute/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A powerful dome surrounds you. No lesser spell can pass \u2013 only the greatest magics stand a chance.",
    description: "When cast, this spell creates an immobile sphere of shimmering magical protection centered on the caster. The sphere blocks all Rank 1 and Rank 2 spells, and any magical areas of effect they generate. This includes spells cast via magical items or through the innate magical Creature Abilities of creatures. In addition, the sphere protects against offensive Elemental spells of Rank 3, such as Lower Water, Produce Fire, Wall of Fire, and similar effects. It does not stop any non-elemental spells of Rank 3, nor does it affect any spells of Rank 4 or higher. The caster may freely cast spells from within the sphere without penalty and may leave and re-enter the sphere without interrupting its Duration. Greater Sphere of Invulnerability may be dispelled by Dispel Magic as normal."
  },

  "teleport, precise": {
    name: "Teleport, Precise",
    school: "Transmutation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "1 Action",
    duration: "Instant",
    range: "Touch",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You picture the destination exactly. A breath later, you arrive \u2013 no error, no drift, just there.",
    description: "This spell functions in all ways as the Rank 3 spell Teleport (see page XX), except where it differs as noted below.\n\nWhen cast, the mage and any additional weight brought along can teleport to any point within their own plane of existence without any chance of error. In addition, the spell allows the caster to teleport to other planes beyond their home plane. The chance of successfully teleporting from one plane to another depends on whether the caster has previously visited the destination and how familiar they are with the location, as detailed under Teleport. However, the caster cannot be considered \u201cVery Familiar\u201d with any location on another plane unless they have lived there for several years."
  },

  "turn wood": {
    name: "Turn Wood",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "1 Round/Intensity",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You lift your hands. Wood splinters and shifts \u2013 trees bend away, weapons twist, barriers shatter.",
    description: "When cast, waves of magical energy issue forth from the caster in the direction they face at the moment the spell completes. These waves push wooden objects in a 120\u2019-wide path directly away from the caster, forcing them back 20\u2019 per level of Intensity. Fixed wooden objects at least 3\u201d in diameter are sturdy enough to resist this force. Thinner items splinter and snap, flung back as described above. Loose items \u2013 such as weapons with wooden hafts (spears, axes), wooden shields, arrows, bolts, and similar objects \u2013 are all pushed away. Even magic weapons made of wood are affected. Wielders of such weapons must either release them or be dragged along. Anti-Magic Shell blocks this spell entirely, while Dispel Magic cast at a higher Intensity than the spell\u2019s Magnitude can negate it.\n\nAffected objects move at a rate of 30\u2019 per Round. Once cast, the path of the spell remains fixed for the Duration. The caster may leave the area or take other actions without disrupting the effect.\n\n**Turn Wood Effects Table:** Intensity 1: Cost 3, 1 Round, wood pushed 20\u2019. Intensity 2: Cost 4, 2 Rounds, wood pushed 40\u2019. Intensity 3: Cost 5, 3 Rounds, wood pushed 60\u2019. Intensity 4: Cost 6, 4 Rounds, wood pushed 80\u2019. Continue progression."
  },

  "wall of stone": {
    name: "Wall of Stone",
    school: "Evocation",
    classes: [
      { class: "Druid", rank: 5 },
      { class: "Mage", rank: 4 }
    ],
    sphere: "Elemental (Earth)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "See Below",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "50\u2019/Intensity",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "A stone wall rises at your command \u2013 fortress, bridge, or trap shaped in seconds.",
    description: "When cast, this spell conjures a stone wall that melds seamlessly with an existing stone surface. It\u2019s often used to seal passages, block portals, or bridge gaps. The wall has a thickness of 1 inch per level of Intensity. Each level of Intensity also creates a 10\u2019 x 10\u2019 section of wall. For example, a spell cast at Intensity 10 could create: A wall 100\u2019 long, 10\u2019 high, and 10\u201d thick; or a wall 50\u2019 long, 10\u2019 high, and 20\u201d thick; or a wall 50\u2019 long, 20\u2019 high, and 10\u201d thick; or any other configuration that doesn\u2019t exceed the total surface area and thickness allowed.\n\nTools or weapons can break through a Wall of Stone using the rules for inanimate objects (see page XX in the *Games Master\u2019s Guide*). Each 5\u2019 section has 10 Armor Points and 15 Hit Points per inch of thickness.\n\n**Wall of Stone Effects Table:** Intensity 1: Cost 3, 50\u2019 range, typically a 10\u2019 x 10\u2019 section. Intensity 2: Cost 4, 100\u2019 range, typically a 20\u2019 x 10\u2019 section. Intensity 3: Cost 5, 150\u2019 range, typically a 30\u2019 x 10\u2019 section. Intensity 4: Cost 6, 200\u2019 range, typically a 40\u2019 x 10\u2019 section. Continue progression."
  },

  "wall of thorns": {
    name: "Wall of Thorns",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Plant",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "two 10\u2019 x 10\u2019 walls/Intensity",
    castingTime: "2 Actions",
    duration: "10 Minutes/Intensity",
    range: "250\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "A tangled wall of brambles erupts \u2013 thick, sharp, and nearly impassable without bleeding.",
    description: "When cast, the spell creates a durable wall of dense brush lined with thorns the length of short swords, forming a barrier of hindering terrain. The caster creates two 10\u2019 x 10\u2019 x 10\u2019 sections per level of Intensity. The wall can take any shape, as long as the dimensions stay within the limits provided.\n\nAttempting to force a way through the thorns causes 1d6+1 damage to 1d4 separate Hit Locations. Armor provides only half its normal protection, though magical Armor Points apply in full. Any damage that penetrates armor causes Bleeding unless the target Succeeds at an Endurance Resistance Roll, as per the Bleed Special Effect. Creatures caught in the area when the wall forms must make a Brawn roll Opposed by the caster\u2019s original casting roll. A Success allows them to escape but still take damage. Failure results in both damage and entrapment. While trapped, a creature can avoid further harm by staying still.\n\nBladed weapons may be used to cut through the wall. Each 10\u2019 section has 6 Armor Points and 20 Hit Points. Normal fire has no effect. Magical fire \u2013 such as Flaming Hands, Fireball, or red dragon breath \u2013 burns the wall down in 10 minutes. While burning, the wall functions as per the Wall of Fire spell (page XX), with the \u201chot\u201d side facing away from the caster.\n\n**Wall of Thorns Effects Table:** Intensity 1: Cost 3, 10 Minutes, typically a 20\u2019 x 10\u2019 section. Intensity 2: Cost 4, 20 Minutes, typically a 40\u2019 x 10\u2019 section. Intensity 3: Cost 5, 30 Minutes, typically a 60\u2019 x 10\u2019 section. Intensity 4: Cost 6, 40 Minutes, typically an 80\u2019 x 10\u2019 section. Continue progression."
  },

  "water to dust": {
    name: "Water to Dust (Dust to Water)",
    school: "Transmutation",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Elemental (Earth, Water)",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "10\u2019 Radius/Intensity",
    castingTime: "2 Actions",
    duration: "Permanent",
    range: "180\u2019",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You speak a parching word. Water evaporates instantly \u2013 ponds vanish, flasks crack dry.",
    description: "When cast, this spell transforms the designated area of liquid into a fine dust. If cast on muddy water, the affected area doubles. If cast on wet mud, it quadruples. If the area is still in contact with a larger body of water, the dust quickly reverts to silty mud or muddy liquid, depending on the surrounding moisture. The spell also renders any potions within the Area of Effect useless.\n\nWater to Dust has no effect on living creatures, except those native to the elemental or water planes. Such beings must succeed at a Willpower Resistance Roll Opposed by the caster\u2019s casting roll or die, regardless of their SIZ or the spell\u2019s Area of Effect. Only one such creature may be targeted per casting.\n\nIn addition to any generic spell components, casting this spell in either form requires 500 GP worth of diamond dust.",
    reverse: {
      name: "Dust to Water",
      flavorText: "With a touch, dust liquefies \u2013 fresh water flows from dry earth like a miracle.",
      description: "When reversed (Dust to Water), the spell functions as a more powerful version of Create Water."
    }
  },

  "weather summoning": {
    name: "Weather Summoning",
    school: "Conjuration",
    classes: [
      { class: "Druid", rank: 4 }
    ],
    sphere: "Weather",
    cost: { base: 3, type: "fixed" },
    costDisplay: "3",
    area: "See Below",
    castingTime: "10 Minutes",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You call to the sky. Storms roar, rain falls, or sun blazes \u2013 whatever you choose.",
    description: "When cast, this spell allows the caster to summon weather appropriate to the current season, climate, and region \u2013 anything that might naturally occur. The caster does not control the weather after it manifests; it proceeds according to natural patterns. The effect can last from as little as 10 minutes (such as a summer shower or tornado) to several days or even weeks (such as a cold snap or heat wave). Similarly, the area affected may range from a single mile to over 100 miles, depending on the nature of the weather change.\n\nSome examples include: Spring: High or low temperatures, sleet, thunderstorms, tornadoes, hurricane-force winds (early spring, coastal). Summer: Heat waves, hailstorms, heavy rains. Fall: High or low temperatures, fog, sleet, high winds. Winter: Freezing cold, thaw conditions, snowstorms, blizzards, hurricane-force winds (late winter, coastal).\n\nRoughly 1d4 x10 minutes after casting, signs of the coming weather become apparent \u2013 dark clouds gather, winds strengthen, temperatures shift. Dispel Magic of sufficient Intensity may negate the spell during this phase. Otherwise, 1d12 + 5 x10 minutes after the casting, the new weather comes fully into effect. See the Weather Rules in the *Games Master\u2019s Guide* for more details."
  },

  "wish, limited": {
    name: "Wish, Limited",
    school: "Conjuration, Evocation",
    classes: [
      { class: "Mage", rank: 4 }
    ],
    sphere: null,
    cost: { base: 3, type: "special" },
    costDisplay: "3, +1 or more EXP",
    area: "See Below",
    castingTime: "See Below",
    duration: "See Below",
    range: "Unlimited",
    resist: "See Below",
    intensityScaling: null,
    flavorText: "You speak your will aloud, shaping fate within careful bounds. A single moment changes everything.",
    description: "This spell can change reality in a partial or limited way at the time of casting. It cannot significantly change major realities or permanently restore life. For example, it could heal a victim of all Minor Wounds, but Major Wounds would only be healed temporarily, becoming Minor Wounds after a short time. Limited Wish cannot grant wealth or experience but might reduce the levels of all skill rolls by one Difficulty Grade for the Duration of a Scene, or add 1d8 to all damage rolls. Alternatively, it could reduce the skill or damage rolls of an opponent by the same amount. This spell can also grant a Luck Point in an emergency, influence another creature\u2019s emotions, imitate any spell of Rank 4 or lower at 8 Intensity, or extend the Duration of an existing magical effect.\n\nThe results of a Limited Wish should be interpreted literally and are subject to the Games Master\u2019s discretion. Wishes made with selfish or greedy intent carry a 10% chance of backfiring in some unforeseen way. Casting Time is generally equal to the time required to verbally describe the specifics of the Wish. Each casting of Limited Wish ages the target by 1% of their normal lifespan, regardless of the Wish\u2019s Duration (for humans, this equals roughly one year).\n\n**Limited Wish Examples and Costs:** Reverse certain effects requiring Limited Wish: 1 EXP. Duplicate Rank 1 or 2 spell at 8 Intensity: 1 EXP. Duplicate Rank 3 or 4 spell at 8 Intensity: 2 EXP. Heal all Minor Wounds: 1 EXP. Heal all Major Wounds for 24 Hours (then become Minor): 2 EXP. Decrease Difficulty Grade of all party skill rolls by one step for one Scene: 1 EXP. Add +1d8 damage to all attacks for one Scene: 1 EXP. Gain emergency Luck Point (auto-success): 1 EXP. Reshape terrain (100\u2019 cube, 24 Hours): 1 EXP per 100\u2019 cube."
  },

  "word of recall": {
    name: "Word of Recall",
    school: "Transmutation",
    classes: [
      { class: "Cleric", rank: 4 }
    ],
    sphere: "Summoning",
    cost: { base: 3, type: "plusPerAdditional", perAdditional: 1 },
    costDisplay: "3, +1/additional Intensity",
    area: "The Caster",
    castingTime: "1 Action",
    duration: "See Below",
    range: "0",
    resist: "N/A",
    intensityScaling: null,
    flavorText: "You whisper a sacred phrase \u2013 and vanish, instantly returned to your prepared sanctuary.",
    description: "When cast, the cleric instantly teleports to a pre-designated sanctuary, arriving at a specific location no larger than a 10-foot radius. There is no limit to the teleportation range, including travel between planes of existence. Within the same plane, there is no chance of a mishap. However, teleporting across planes introduces the risk of a Fumble, replacing the cleric\u2019s normal Fumble chance: Crossing one plane: Fumble on a roll of 91\u201300%. Crossing two planes: Fumble on 81\u201300%. Continue this pattern for additional planes.\n\nA Fumble when crossing planes means the cleric is irrevocably lost. Fumbles occurring while traveling within the same plane follow the standard Fumble rules.\n\nIn addition to themselves and any carried equipment, the cleric may transport an additional 3 SIZ (or 9 ENC) per level of Intensity. The additional mass may be living beings, treasure, or equipment. However, living creatures must be included in the spell at sufficient Intensity to cover both their SIZ and any equipment they carry."
  },

  // RANK 4 H-W REVERSE AND CONVENIENCE ALIASES
  "harm": { name: "Harm", aliasOf: "heal", version: "reverse" },
  "dust to water": { name: "Dust to Water", aliasOf: "water to dust", version: "reverse" },
  "permanent illusion": { name: "Permanent Illusion", aliasOf: "illusion, permanent", version: "primary" },
  "greater monster summoning": { name: "Greater Monster Summoning", aliasOf: "monster summoning, greater", version: "primary" },
  "greater sphere of invulnerability": { name: "Greater Sphere of Invulnerability", aliasOf: "sphere of invulnerability, greater", version: "primary" },
  "precise teleport": { name: "Precise Teleport", aliasOf: "teleport, precise", version: "primary" },
  "limited wish": { name: "Limited Wish", aliasOf: "wish, limited", version: "primary" },

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
