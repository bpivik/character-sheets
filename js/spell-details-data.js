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
          canonicalName: canonical.name
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

    let rawCost = 0;

    switch (costObj.type) {
      case 'fixed':
        rawCost = costObj.base;
        break;
      case 'perIntensity':
        rawCost = (costObj.perIntensity || costObj.base) * intensity;
        break;
      case 'plusPerAdditional':
        rawCost = costObj.base + (costObj.perAdditional || 1) * Math.max(0, intensity - 1);
        break;
      case 'special':
        rawCost = costObj.base || 1;
        break;
      default:
        rawCost = costObj.base || 1;
    }

    // Apply rank-based cost reduction (2 MP per rank difference, min 1)
    const rankDiff = Math.max(0, casterRank - spellRank);
    const reduction = rankDiff * 2;
    const finalCost = Math.max(1, rawCost - reduction);

    return finalCost;
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
