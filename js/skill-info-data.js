/**
 * Skill Information Data
 * Contains descriptions (for ℹ buttons) and d100 roll outcomes (Critical/Failure/Fumble)
 * for Standard Skills, Combat Skills, and Unarmed.
 * 
 * Keys match data-skill attributes or normalized skill names.
 * Outcomes use second-person ("You") phrasing.
 */

const SKILL_INFO = {

  'athletics': {
    title: 'Athletics (STR+DEX)',
    description: `
      <p>Athletics covers a variety of physical activities, including climbing, jumping, throwing, and running. All rolls for these actions are made using a single check against the Athletics skill.</p>
    `,
    critical: `
      <strong>If Climbing:</strong> You climb quickly or avoid hidden dangers.<br>
      <strong>If Jumping:</strong> You add 3 extra feet to your jump and land upright.
    `,
    failure: `
      <strong>If Climbing:</strong> You make no progress.<br>
      <strong>If Running:</strong> You gain one Level of Fatigue.
    `,
    fumble: `
      <strong>If Climbing:</strong> You fall and cannot use Acrobatics to reduce fall damage.<br>
      <strong>If Jumping:</strong> You land awkwardly and must make an additional Endurance roll:<br>
      &emsp;• <em>Success:</em> You take 1 point of damage to one leg.<br>
      &emsp;• <em>Failure:</em> You take 1d4 damage instead.<br>
      <strong>If Running:</strong> You pull a muscle or tear a ligament and must stop running. Make an Endurance roll:<br>
      &emsp;• <em>Success:</em> You take 1 damage to one leg.<br>
      &emsp;• <em>Failure:</em> You take 1d4 damage instead.
    `
  },

  'boating': {
    title: 'Boating (STR+CON)',
    description: `
      <p>This skill covers handling small watercraft on rivers, lakes, and nearshore waters. It applies to vessels like canoes, rafts, and rowboats — craft built for short trips and usually powered by paddles, oars, punts, simple sails, or even animals towing from the shore.</p>
      <p>Larger ships or long-distance sea travel fall under the Professional Skill <em>Seamanship</em> instead.</p>
    `,
    critical: `You increase the vessel's Movement Rate by one-tenth.`,
    failure: `Your vessel either moves at half speed or misses its intended destination (like trying to reach a lone rock above a waterfall).`,
    fumble: `Something goes wrong — maybe you lose an oar, the boat takes on water, or another major hassle occurs. In rough weather or violent waters, the boat capsizes.`
  },

  'brawn': {
    title: 'Brawn (STR+SIZ)',
    description: `
      <p>Brawn is the use of technique to maximize physical force. It covers tasks like lifting, breaking down doors, and competing in tests of strength.</p>
    `
    // No critical/failure/fumble defined
  },

  'conceal': {
    title: 'Conceal (DEX+POW)',
    description: `
      <p>Conceal focuses on hiding objects rather than the character (which is covered by Stealth). It can be used to obscure a chariot behind rocks, erase tracks to prevent pursuit, hide a scroll in a library, or disguise a trap or secret passage.</p>
      <p>The skill is versatile, covering anything from masking evidence to creating hidden caches.</p>
    `,
    critical: `You hide the item so well that any attempt to find it is one Difficulty Grade harder.`,
    failure: `If someone searches the area, they'll find the item without needing to roll.`,
    fumble: `Your hiding attempt backfires in a big way. The item falls, rolls, or blows out of its spot — making it so obvious that everyone nearby notices.`
  },

  'customs': {
    title: 'Customs (INT×2+40)',
    description: `
      <p>Customs represents your knowledge of your community's social codes, rites, rituals, and taboos. It is used when you must interpret or perform culturally significant customs or act appropriately in social situations.</p>
    `,
    critical: `You either impress others with perfect manners or pick up on a subtle social cue that could be useful now or later.`,
    failure: `Your misstep causes mild irritation or maybe a few raised eyebrows — nothing serious.`,
    fumble: `You badly misjudge the situation, possibly offending someone, even if unintentionally. The consequences depend on the culture involved and could range from a sharp reprimand to ostracism, exile, or worse.`
  },

  'dance': {
    title: 'Dance (DEX+CHA)',
    description: `
      <p>Dance reflects your ability to perform rhythmic and coordinated movements, whether for recreation or as part of a ritual. Many cultures use dance in court ceremonies, war preparations, religious rites, or simple communal gatherings.</p>
    `,
    critical: `Your dance is expressive, fluid, and deeply moving. It has the same persuasive power as an Influence roll and can be used that way in social situations. Alternatively, you gain a bonus to your next Influence test equal to the Critical score of the Dance roll. A performance this strong may also earn enthusiastic applause, admiration, or even gifts.`,
    failure: `Your performance is flat and forgettable.`,
    fumble: `You stumble or lose the rhythm entirely. The dance falls apart, failing to convey its message. This clumsiness affects more than just the performance — any skills based on communication or personal presence may take a penalty, at the Games Master's discretion.`
  },

  'deceit': {
    title: 'Deceit (INT+CHA)',
    description: `
      <p>Deceit involves any attempt to mask the truth or present a falsehood, whether through outright lies, misleading statements, or bluffing in situations like card games. It also applies to hiding emotions or motives — for instance, feigning pleasure when disappointed or appearing friendly while harboring distrust.</p>
      <p>Deceit opposes the Insight skill, as it can be used to counter attempts to discern truth or intent.</p>
    `,
    critical: `Your lie is completely convincing. Those deceived won't question it later — unless new evidence comes to light.`,
    failure: `Your attempt lacks conviction, raising doubt and inviting closer scrutiny.`,
    fumble: `Your lie falls apart. It's so obvious that it damages your credibility, making it harder to be believed in the future.`
  },

  'drive': {
    title: 'Drive (DEX+POW)',
    description: `
      <p>Drive covers the handling of wheeled or drawn vehicles such as carts, carriages, chariots, or sleds, whether pulled by common beasts of burden or more unusual creatures.</p>
      <p>Rolls are required for difficult maneuvers, like navigating rough terrain or jumping obstacles, as well as for unfamiliar situations. Where two or more vehicles are contesting with each other, the drivers should determine the result with an opposed Drive test.</p>
    `,
    critical: `You either boost the vehicle's Movement Rate by 10% or pull off a skilled or showy maneuver.`,
    failure: `Your vehicle's Movement Rate is reduced by half.`,
    fumble: `Something goes wrong. The vehicle breaks down (a wheel might fall off or the harness might snap), or — if moving fast or attempting a risky move — it overturns. All passengers must succeed at an Acrobatics or Evade roll to jump clear. Those who fail take falling damage based on the vehicle's speed.`
  },

  'endurance': {
    title: 'Endurance (CON×2)',
    description: `
      <p>Endurance measures your ability to withstand physical stress, pain, and fatigue. It reflects overall stamina, resilience, and the body's capacity to endure harmful conditions.</p>
      <p>The skill is often used to resist the effects of injuries, poisons, and diseases, making it a key counterpart to Willpower, which focuses on mental resilience. See your Fatigue table on the Combat/Abilities page.</p>
      <p>In most situations, Endurance is used in Opposed Tests, though certain conditions may call for a standard skill roll instead.</p>
    `,
    critical: `You shrug off the worst of the strain or injury. Even in situations where you'd normally be knocked out or sidelined, you can keep going.`,
    failure: `You give in to the stress or injury and can't continue resisting it.`,
    fumble: `Your body gives out completely. You are overwhelmed and become Incapacitated. If the cause is disease or poison, you automatically fail any future Resistance Rolls against it.`
  },

  'evade': {
    title: 'Evade (DEX×2)',
    // description is dynamic — set at runtime based on Artful Dodger
    description: null,
    getDescription: function(hasArtfulDodger) {
      const adNote = hasArtfulDodger
        ? '<strong>(You have this)</strong>'
        : '<strong>(You don\'t have this)</strong>';
      return `
        <p>This skill is used to avoid immediate, visible danger. It applies to dodging ranged attacks (such as diving for cover), escaping traps, adjusting distance in combat, or otherwise getting out of the way of a physical threat. Evade can also serve as a Resistance Roll against certain types of magic.</p>
        <p>Characters with the Artful Dodger ability ${adNote} can use Evade to avoid melee attacks without falling prone; when dodging ranged attacks, they only fall prone if they fail the roll.</p>
      `;
    },
    critical: `You may gain an advantage over your opponent. Ask your Games Master.`,
    failure: `You were hit by whatever you were trying to avoid.`,
    fumble: `You react poorly and leave yourself wide open. You might take the full damage from a trap, fall prone, or be exposed to further danger. Ask your Games Master if your opponent (if facing one) gains an advantage over you.`
  },

  'first-aid': {
    title: 'First Aid (DEX+INT)',
    description: `
      <p>This skill measures your ability to treat minor injuries and stabilize more acute wounds. First Aid may be applied only once per specific injury.</p>
      <p>You may attempt to administer First Aid on yourself, though the Difficulty Grade may increase depending on the wound's location, its severity, and the situation.</p>
      <p>Applying First Aid takes 1d3 minutes. During this time, neither the healer nor the patient may take any other actions.</p>
      <table class="attr-info-table">
        <thead><tr><th>Injury</th><th>Successful Treatment</th></tr></thead>
        <tbody>
          <tr><td>Asphyxiation</td><td>The victim starts breathing again.</td></tr>
          <tr><td>Bleeding</td><td>The wound is staunched.</td></tr>
          <tr><td>Impaled</td><td>The object is removed without causing further harm.</td></tr>
          <tr><td>Unconsciousness</td><td>If not caused by poison or narcotics, the person regains consciousness.</td></tr>
          <tr><td>Minor Wound</td><td>Restores 1d3 Hit Points to the injured area.</td></tr>
          <tr><td>Serious Wound</td><td>The affected area regains partial functionality.</td></tr>
          <tr><td>Major Wound</td><td>The injury is stabilized, preventing immediate death, but does not restore Hit Points or function.</td></tr>
        </tbody>
      </table>
    `,
    critical: `Your treatment is especially effective. A Minor Wound restores 1d6 Hit Points; a Serious Wound restores 1d3 Hit Points; a Major Wound restores partial function (if possible) and allows the injury to begin healing naturally.`,
    failure: `The injury remains untreated.`,
    fumble: `Your treatment goes wrong, causing 1 additional point of damage to the injured location. This may worsen the injury's severity.`
  },

  'influence': {
    title: 'Influence (CHA×2)',
    description: `
      <p>This skill measures your ability to persuade others, whether through charm, logic, or manipulation. Influence can be used in a wide range of situations — from changing someone's mind to offering a bribe.</p>
    `,
    critical: `You are highly persuasive. Not only does your attempt succeed, but your next Influence test with the same person (whenever it happens) is one Difficulty Grade easier (for example, Standard becomes Easy, or Hard becomes Standard).`,
    failure: `Your attempt fails. The person isn't convinced, but no harm is done.`,
    fumble: `Your attempt backfires and causes offense. The reaction depends on the situation and the person involved. Any future Influence rolls with them are one Difficulty Grade harder.`
  },

  'insight': {
    title: 'Insight (INT+POW)',
    description: `
      <p>Insight allows you to interpret someone's behavior (both verbal and non-verbal) to gauge their motives or emotional state. It's used to detect lies (Opposed by Deceit) or predict someone's feelings about a situation.</p>
      <p>Insight can also apply to assessing environments, such as sensing trouble in a tavern or predicting an ambush in the hills.</p>
    `,
    critical: `You gain a deep understanding of the other person's current thoughts, feelings, and motives. Any future Deceit or Influence roll against that person is one Difficulty Grade easier than normal (e.g., Standard becomes Easy).`,
    failure: `You pick up nothing useful at that moment.`,
    fumble: `You completely misread the situation. The Games Master should provide misleading cues about the person's motives or behavior. Future Deceit and Influence rolls against them are one Difficulty Grade harder.`
  },

  'locale': {
    title: 'Locale (INT×2)',
    description: `
      <p>This skill reflects your knowledge of the local terrain, weather, wildlife, and natural features within the region you know best — typically the area where you grew up or have spent most of your life.</p>
      <p>You know which plants and animals are common, their behaviors and uses, where to fish, where game tends to move, how to find shelter, what weather to expect in a given season, and what regional dangers to watch for.</p>
      <p>In nearby but unfamiliar areas, Locale rolls should be made one or more Difficulty Grades harder.</p>
    `,
    critical: `You either find what you're looking for in abundance or identify something with total certainty. Any related skill rolls (such as Survival or Track) become one Difficulty Grade easier.`,
    failure: `There's not enough information to draw clear conclusions, or the target simply can't be found.`,
    fumble: `You completely misread the situation. The needed information is not just missed — it's misunderstood. Any related skill rolls become one Difficulty Grade harder.`
  },

  'native-tongue': {
    title: 'Native Tongue (INT+CHA+40)',
    description: `
      <p>Native Tongue measures your ability to speak and read the language you learned growing up. For humans, this is the Common Tongue, while demi-humans and other species have their own native languages.</p>
      <p>Unlike other skills, Native Tongue isn't rolled directly. Instead, it represents your overall fluency, limiting how well you can engage in complex conversation.</p>
      <table class="attr-info-table">
        <thead><tr><th>Language %</th><th>Conversational Fluency</th></tr></thead>
        <tbody>
          <tr><td>01–25%</td><td>Understands only a few words; cannot form sentences or read</td></tr>
          <tr><td>26–50%</td><td>Can communicate in simple, broken sentences and read at an elementary level</td></tr>
          <tr><td>51–75%</td><td>Fluent enough for general conversation; reads at a high school level</td></tr>
          <tr><td>76%+</td><td>Speaks with eloquence; reads at a college level</td></tr>
        </tbody>
      </table>
    `
    // No critical/failure/fumble — not rolled directly
  },

  'perception': {
    title: 'Perception (INT+POW)',
    description: `
      <p>This skill is used for both passive awareness and active observation — whether scanning an area, searching for something specific, or simply staying alert to the environment.</p>
      <p>Conditions such as lighting, noise, or scent may affect the Difficulty Grade of a Perception roll, depending on which senses are being used.</p>
    `,
    critical: `You notice what you were looking for — and also pick up on extra details that would have gone unnoticed.`,
    failure: `Nothing useful is spotted.`,
    fumble: `You miss or misread even obvious signs. This might raise the Difficulty Grade of related rolls. For example, failing to notice a trap could turn a Standard Evade check into a Hard or Formidable one.`
  },

  'ride': {
    title: 'Ride (DEX+POW)',
    description: `
      <p>This skill reflects your ability to control and stay mounted on creatures trained for riding. It applies to a wide range of beasts — from mules and camels to elephants, giant eagles, or even dolphins.</p>
      <p>Riding an unfamiliar species is one Difficulty Grade harder. Attempting to ride a creature of a different movement medium — such as a land rider switching to a flying or swimming mount — is two Difficulty Grades harder. Wild or untamed creatures cannot be ridden effectively until they have been broken and trained.</p>
    `,
    critical: `You pull off a flashy or skilled maneuver (like a jump or sharp turn), or push your mount to move 10% faster for a short time.`,
    failure: `Your mount becomes fatigued and drops one level of Endurance.`,
    fumble: `Something goes wrong. You might fall, or your mount could suffer an injury — such as going lame or breaking a limb.`
  },

  'sing': {
    title: 'Sing (POW+CHA)',
    description: `
      <p>Sing covers your ability to carry a tune, from simple chants to complex arias. Singing is a vital part of many cultures, used for entertainment, rituals, and important traditions.</p>
      <p>Songs might inspire troops, convey history, or even be used in courtship.</p>
    `,
    critical: `Your performance stands out. If singing for money, you earn 50% more thanks to the audience's reaction. If trying to impress someone, a follow-up Influence or similar skill roll becomes one Difficulty Grade easier.`,
    failure: `Your performance is unremarkable and forgettable.`,
    fumble: `Your singing is off-key and poorly received. Earnings are halved, and any later attempts to influence or deceive become one Difficulty Grade harder.`
  },

  'stealth': {
    title: 'Stealth (DEX+INT)',
    description: `
      <p>This skill covers hiding from view and moving quietly to avoid detection. Environmental factors such as cover, darkness, or background noise can improve the Difficulty Grade of a Stealth roll.</p>
      <p>Conversely, open ground, silence, or poor lighting conditions may make it harder.</p>
    `,
    critical: `You stay completely unnoticed. Any attempts to track, follow, or observe you are one Difficulty Grade harder.`,
    failure: `You are easy to spot, as long as someone is actively looking.`,
    fumble: `Your attempt backfires and draws attention instead of avoiding it. You might make a noise, reveal your position, or suffer some mishap — like hiding on a window ledge and getting knocked off when someone opens the shutter.`
  },

  'swim': {
    title: 'Swim (STR+CON)',
    description: `
      <p>Without training, you can do little more than flail and keep your head above water briefly. Higher Swim skill levels represent the ability to handle deeper or more dangerous waters with greater control and reduced risk of drowning.</p>
      <p>The Difficulty of a Swim roll depends entirely on the conditions. Under normal conditions, your maximum swimming speed per Round is equal to your Base Movement Rate, plus 3 feet for every full 20% you possess in Swim. Subtract 1 for each 'Thing' carried more than your STR. See Movement on the Combat/Abilities page for swim speeds.</p>
    `,
    critical: `You gain an extra 3 ft on your Movement Rate.`,
    failure: `You make no progress and gain one Level of Fatigue.`,
    fumble: `You lose control, either due to cramps or rough water. All future Swim rolls become one Difficulty Grade harder. From that point on, you can only try to keep your head above water until rescued or until exhaustion sets in. If that happens, drowning becomes a real risk.`
  },

  'willpower': {
    title: 'Willpower (POW×2)',
    description: `
      <p>This skill measures your mental resolve — the ability to concentrate, focus intent, or resist psychological and magical strain. It reflects inner strength and determination.</p>
      <p>Willpower is commonly used in situations requiring mental resilience, including the resistance to magic as well as emotionally traumatic experiences.</p>
    `,
    critical: `If resisting magic, you are rendered immune to any further mentally afflicting spells cast by that opponent during the same encounter.`,
    failure: `The effects depend on the situation but usually mean temporary submission to the mental or emotional force being applied.`,
    fumble: `You suffer total mental collapse. Your will is broken, leaving you completely vulnerable to whatever is affecting you. If resisting a spell or shock, the psychological impact becomes permanent until healed.`
  },

  // === Professional Skills ===

  'acrobatics': {
    title: 'Acrobatics (STR+DEX)',
    description: `
      <p>This skill covers physical feats involving balance, agility, tumbling, and juggling. It can be used to perform crowd-pleasing tricks or to assist with practical challenges, such as navigating unstable terrain or reducing fall damage.</p>
      <p>In some cases, Acrobatics may be used in place of Evade. If Successful, you not only avoid the hazard but also remain on your feet, automatically avoiding the prone condition.</p>
    `,
    critical: `You move at double speed while balancing or crossing unstable ground.`,
    failure: `Your attempt is unimpressive or ends early, drawing little attention or success.`,
    fumble: `You lose control entirely. You might fall, drop an object in a spectacularly bad way, or hurt yourself during a failed tumble — taking 1d4 points of damage to a random location.`
  },

  'acting': {
    title: 'Acting (CHA×2)',
    description: `
      <p>This skill governs the ability to convincingly portray another character, whether on stage or in a social setting. The actor adopts different mannerisms, speech patterns, and personality traits to impersonate someone other than themselves.</p>
      <p>When combined with Disguise and Deceit, Acting becomes a powerful tool for assuming a false identity.</p>
    `,
    critical: `Your performance is entirely convincing. On stage, it earns a standing ovation or similar praise. In a social setting, you become the role. Any related skill rolls — such as Deceit or Influence — are one Difficulty Grade easier.`,
    failure: `Your performance is flat and forgettable.`,
    fumble: `Your act falls apart. No one is fooled, and even the least observant can see through it — or worse, laugh and jeer.`
  },

  'animal handling': {
    title: 'Animal Handling (POW+CHA)',
    description: `
      <p>This skill is used to teach animals specific commands and behaviors — such as teaching a dog to sit, stay, fetch, or heel, or breaking a horse for riding. Training a single trick typically takes 20 days, minus the animal's INS.</p>
      <p>If the animal is not typically trainable, the roll is one Difficulty Grade harder. Training an unfamiliar species is also one Difficulty Grade harder, while a different environment species is two Difficulty Grades harder.</p>
      <p>Most animals can learn a number of tricks equal to half their INS.</p>
    `,
    critical: `Training time is halved, and the trick does not count against the animal's maximum number of learned tricks.`,
    failure: `The attempt doesn't take. You'll need to try again to teach that trick.`,
    fumble: `The animal can't grasp the trick or flat-out refuses to learn it. Worse, it may now be able to learn one fewer trick than usual.`
  },

  'arcane casting': {
    title: 'Arcane Casting (INT+POW)',
    description: `
      <p>This magical skill is essential for using Arcane magic by mages. It measures your ability to successfully cast spells that have been previously memorized from a spellbook or scroll.</p>
      <p>Arcane Casting reflects more than rote recitation — it represents the ability to enter the correct mental state, perform the required gestures, and speak the necessary incantations. Higher skill levels not only increase the chance of successful casting but also enhance the final Intensity of spells cast.</p>
    `
  },

  'arcane knowledge': {
    title: 'Arcane Knowledge (INT×2)',
    description: `
      <p>This magical skill is essential to the use of Arcane magic. It reflects a mage's accumulated understanding of magical theory and spells.</p>
      <p>Arcane Knowledge is used when attempting to learn new spells, copy them into a spellbook, create magical scrolls, or identify spells as they are being cast. This skill isn't restricted to spellcasters; anyone can study Arcane subjects without practicing magic.</p>
    `
  },

  'arcane sorcery': {
    title: 'Arcane Sorcery (CHA+POW)',
    description: `
      <p>Arcane Sorcery represents your innate ability to channel and manipulate arcane energy without formal study or preparation. Unlike the rigorous discipline of mages, sorcerers shape raw magical power instinctively.</p>
      <p>This skill governs your ability to successfully cast spells spontaneously, resist magical interference, and control the chaotic nature of your innate magic.</p>
    `,
    critical: `The spell works, but only half the Magic Points are expended.`,
    failure: `The spell fails, but no Magic Points are lost. A Minor Arcane Flux may occur.`,
    fumble: `The spell backfires spectacularly, triggering a Major Arcane Flux.`
  },

  'art': {
    title: 'Art (POW+CHA)',
    description: `
      <p>This skill represents your ability in a chosen artistic medium — whether painting, poetry, literature, sculpture, or another form. Each additional art form must be advanced separately.</p>
    `,
    critical: `You produce something of remarkable quality, elegance, or beauty — worth 50% more than similar work. Any subsequent skill rolls to influence the commissioner or anyone impressed by the piece are temporarily one Difficulty Grade easier.`,
    failure: `The result is dull and uninspired. It fails to impress and is worth no more than the materials used.`,
    fumble: `The piece is a disaster. Time, materials, and effort are wasted. If seen by others, it could damage your reputation.`
  },

  'bureaucracy': {
    title: 'Bureaucracy (INT×2)',
    description: `
      <p>This skill covers the understanding of administrative systems, official records, and unspoken civic conventions. It is used to navigate red tape, interact with officials, and uncover relevant bureaucratic information.</p>
      <p>Your Bureaucracy skill cannot exceed your Language skill in the relevant language.</p>
    `,
    critical: `You gain clear insight into the process and complete the task in half the usual time. Any related skill rolls (such as Influence or Deceit) become one Difficulty Grade easier.`,
    failure: `You hit a wall — delayed by red tape or lost paperwork. Any relevant follow-up rolls become one Difficulty Grade harder.`,
    fumble: `Your attempt backfires completely. Access is denied, or you offend someone important, ending the request or inquiry altogether.`
  },

  'channel': {
    title: 'Channel (INT+CHA)',
    description: `
      <p>This is a Divine magic skill used to call upon and direct the power of the gods. It reflects your understanding of your deity's history, mythology, rituals, prayers, and divine practices.</p>
      <p>Channel is essential to Divine magic, as it allows clerics, rangers, druids, and paladins to manifest and wield their spells through spiritual connection and devotion.</p>
    `
  },

  'commerce': {
    title: 'Commerce (INT+CHA)',
    description: `
      <p>This skill is used to evaluate the value of goods and commodities and to trade them at the most favorable price. It also covers an understanding of business practices, negotiation, and profit-making.</p>
      <p>Commerce rolls may be Opposed by an opponent's Commerce or Willpower skill.</p>
    `,
    critical: `In transactions where rolls are not Opposed, you secure the item or service at half price, or sell it for double its value.`,
    failure: `The transaction goes poorly: the item is bought for twice its cost, or sold for only half its worth.`,
    fumble: `The deal collapses. You may offend the other party enough to lose the opportunity entirely — or worse, get cheated by overpaying for something worthless or underselling something valuable.`
  },

  'courtesy': {
    title: 'Courtesy (INT+CHA)',
    description: `
      <p>This skill covers knowing how to behave appropriately in formal or social settings. It includes the correct forms of address, expected rituals, and cultural conventions.</p>
    `,
    critical: `You make an excellent impression. Any relevant follow-up skill rolls are one Difficulty Grade easier.`,
    failure: `You fail to impress. Subsequent related skill rolls are one Difficulty Grade harder.`,
    fumble: `The result is humiliating or offensive. Depending on the situation, it may lead to serious consequences. No further social interaction is possible after this failure.`
  },

  'craft': {
    title: 'Craft (DEX+INT)',
    description: `
      <p>Each Craft represents a specialized trade or practical skill — blacksmithing, carpentry, weaving, pottery, and so on. The time required depends on the nature of the product, the crafter's skill, the quality of materials, and attention to detail.</p>
    `,
    critical: `The item is of exceptional quality, showing superior durability, utility, or beauty.`,
    failure: `The result is sub-standard. Its function, sturdiness, or appearance is noticeably flawed.`,
    fumble: `The item is worthless and unusable. Alternatively, something goes wrong during the process — damaging tools, materials, property, or even injuring you.`
  },

  'culture': {
    title: 'Culture (INT×2)',
    description: `
      <p>This skill focuses on understanding the customs, traditions, and practices of societies foreign to your own. Unlike the Customs skill, which applies to your native community, Culture must be taken for specific nations or peoples.</p>
      <p>Mechanically, it works the same way as Customs but is essential for navigating unfamiliar social landscapes.</p>
    `
  },

  'disguise': {
    title: 'Disguise (INT+CHA)',
    description: `
      <p>This skill covers the creation of convincing disguises using appropriate materials such as costumes, cosmetics, wigs, or hairpieces. If any elements are missing or improvised, the roll becomes one or more Difficulty Grades harder.</p>
      <p>Disguise works well in combination with Acting to enhance the believability of a false identity.</p>
    `,
    critical: `Your disguise is flawless. Even a close relative or lifelong enemy wouldn't recognize you.`,
    failure: `Your disguise is weak, giving casual observers a chance to see through it.`,
    fumble: `Your disguise falls apart — either immediately obvious or failing at the worst possible moment. No amount of acting can recover the illusion.`
  },

  'engineering': {
    title: 'Engineering (INT×2)',
    description: `
      <p>This skill covers the design, assessment, and construction of large-scale structures, ranging from houses and bridges to gates and siege engines.</p>
    `,
    critical: `You spot hidden structural flaws or weaknesses that would otherwise go unnoticed. Any subsequent rolls that rely on this analysis are one Difficulty Grade easier. Alternatively, the structure gains 10% more Hit Points or Armor Points.`,
    failure: `The structure is built to sub-standard quality (10% fewer Hit Points or Armor Points), or you are unable to determine anything useful.`,
    fumble: `A major flaw is introduced into the design, or your assessment is completely wrong. Any related skill rolls become one Difficulty Grade harder.`
  },

  'fly': {
    title: 'Fly (STR+DEX)',
    description: `
      <p>This skill represents the ability to control aerial movement — steering, diving, hovering, landing, or maneuvering at speed. Only creatures or beings with an inherent ability to fly may use this skill.</p>
      <p>Weather, wind currents, and fatigue can increase the Difficulty Grade of a roll.</p>
    `,
    critical: `You execute your maneuver with perfect control, gaining an advantageous position or increased speed. Your next Fly rolls during the next Round are one Difficulty Grade easier.`,
    failure: `Your maneuver is clumsy or partially successful. You lose altitude, drift off course, or become vulnerable to attacks until the next Round.`,
    fumble: `You completely lose control — stalling, colliding with an obstacle, or tumbling out of the sky. You may crash or be unable to recover without immediate action.`
  },

  'gambling': {
    title: 'Gambling (INT+POW)',
    description: `
      <p>This skill measures your ability in games of chance, particularly where money or valuables are at stake. It includes assessing the odds of success or failure, reading opponents, and detecting cheating.</p>
      <p>Cheating allows you to roll twice and take the best result. However each time this is attempted you must roll an Opposed test of your Sleight skill against the Perception or Gambling skill of everyone else playing.</p>
    `,
    critical: `You win outright or clean out one of the other players.`,
    failure: `You lose the hand or stake.`,
    fumble: `You misjudge the odds or suffer terrible luck. You lose everything wagered and are thrown out of the game.`
  },

  'healing': {
    title: 'Healing (INT+POW)',
    description: `
      <p>This skill represents your knowledge of medical treatment. Healing includes the ability to set broken bones, suture wounds, treat infections, and provide general medical care. Applying Healing takes 1 hour, or 4 Short Rests.</p>
      <table class="attr-info-table">
        <thead><tr><th>Treatment</th><th>Success</th><th>Critical</th><th>Fumble</th></tr></thead>
        <tbody>
          <tr><td>Serious Wound</td><td>Restores 1d3 HP</td><td>Restores 1d3+1 HP</td><td>+1 HP damage</td></tr>
          <tr><td>Disease/Poison (before effect)</td><td colspan="3">Counteracts illness if Opposed Roll beats Potency</td></tr>
          <tr><td>Disease/Poison (after effect)</td><td>New Resistance at 1 grade easier</td><td>2 grades easier</td><td>1 grade harder</td></tr>
          <tr><td>Surgery (Major Wound)</td><td>Heals normally</td><td>Regains 1 HP immediately</td><td>Endurance roll or death</td></tr>
        </tbody>
      </table>
    `
  },

  'intimidation': {
    title: 'Intimidation (INT+CHA)',
    description: `
      <p>Intimidation is used to coerce someone into doing something they wouldn't otherwise do, often by threatening violence. A show of strength might allow Brawn to Augment the roll; subtle hints of torture could involve Deceit.</p>
      <p>Intimidation is usually Opposed by Willpower, though Endurance may apply if physical harm is involved.</p>
    `,
    critical: `You gain an additional opportunity with the target, such as obtaining more information or another task to be performed.`,
    failure: `The target is not intimidated and ignores the request at coercion.`,
    fumble: `The target is not only not intimidated, but they also laugh at the attempt. Any further attempts to intimidate are one Difficulty Grade harder.`
  },

  'language': {
    title: 'Language (INT+CHA)',
    description: `
      <p>This skill represents your ability to speak and understand languages other than your native tongue. Like Native Tongue, Language is not usually rolled but instead serves as a static measure of fluency.</p>
      <table class="attr-info-table">
        <thead><tr><th>Language %</th><th>Conversational Fluency</th></tr></thead>
        <tbody>
          <tr><td>01–25%</td><td>Understands only a few words; cannot form sentences or read</td></tr>
          <tr><td>26–50%</td><td>Can communicate in simple, broken sentences and read at an elementary level</td></tr>
          <tr><td>51–75%</td><td>Fluent enough for general conversation; reads at a high school level</td></tr>
          <tr><td>76%+</td><td>Speaks with eloquence; reads at a college level</td></tr>
        </tbody>
      </table>
    `
  },

  'lockpicking': {
    title: 'Lockpicking (DEX×2)',
    description: `
      <p>Lockpicking covers the skill of opening mechanical locks without a key. This includes doors, chests, windows, and even locking something without a key (reverse-picking).</p>
      <p>Picking a lock usually requires an Opposed Test: your Lockpicking skill versus the Mechanisms skill of the original crafter.</p>
    `,
    critical: `You open the lock quickly and without a sound. For a short time, picking similar locks becomes one Difficulty Grade easier.`,
    failure: `The lock stays shut.`,
    fumble: `The lock jams — maybe from broken tools or internal damage. This usually draws attention.`
  },

  'lore': {
    title: 'Lore (INT×2)',
    description: `
      <p>This skill represents a specific area of learned knowledge, chosen when the skill is first acquired. Examples include Astrology, Astronomy, Geography, History, Monsters, Mythology, Politics, and Strategy and Tactics.</p>
    `,
    critical: `You gain deep insight into the subject. Any related skill roll becomes one Difficulty Grade easier.`,
    failure: `No useful information is gained.`,
    fumble: `The subject is completely misunderstood. Incorrect conclusions are drawn, and any follow-up rolls relying on that knowledge are one Difficulty Grade harder.`
  },

  'mechanisms': {
    title: 'Mechanisms (DEX+INT)',
    description: `
      <p>This skill covers the knowledge and technical ability to build, dismantle, or repair mechanical devices — especially those involving intricate moving parts, such as traps, clockworks, or automated gadgets.</p>
      <p>Simple tasks take a minimum of 1d3×10 minutes. More complex work may take hours, days, or even months.</p>
    `,
    critical: `The device is completed in half the usual time and works flawlessly. Any attempts to disable or bypass it are one Difficulty Grade harder.`,
    failure: `The device functions, but unreliably. It's prone to breaking down, and attempts to circumvent it are one Difficulty Grade easier.`,
    fumble: `The mechanism is ruined beyond repair. It must be discarded and built again from scratch.`
  },

  'meditation': {
    title: 'Meditation (INT+CON)',
    description: `
      <p>This skill allows you to enter a state of deep relaxation and focused concentration. While technically a magical skill, it is essential to monks, helping them attain the focus needed to enhance their abilities beyond normal limits.</p>
      <p>A Successful Meditation roll enables a monk to recover Fatigue or Hit Points in situations normally forbidden by the rules. However, Meditation is not exclusive to monks.</p>
    `
  },

  'musicianship': {
    title: 'Musicianship (DEX+CHA)',
    description: `
      <p>This skill covers the ability to play musical instruments and is used by bards to cast magic. Each application applies to a family of related instruments: Bow Strings, Keyboards, Percussion, Plucked Strings, Strummed Strings, or Wind.</p>
    `,
    critical: `Your music is exceptional — stunning in quality, elegance, or beauty. Any related skill rolls, such as Influence, become one Difficulty Grade easier.`,
    failure: `Your performance is uninspired and forgettable.`,
    fumble: `A musical disaster. The instrument might break, or the performance might be taken as a serious insult. At the very least, the failure causes embarrassment and may damage your reputation.`
  },

  'mysticism': {
    title: 'Mysticism (POW+CON)',
    description: `
      <p>This magical skill is essential to monks, forming the foundation of their training. It represents your ability to perform superhuman feats by channeling inner strength and mastering, suppressing, or harnessing powerful emotions or concepts.</p>
      <p>As your skill in Mysticism improves, so does your access to special Class Abilities (Standard and Ranked Abilities).</p>
    `
  },

  'navigation': {
    title: 'Navigation (INT+POW)',
    description: `
      <p>This skill covers the ability to accurately plot and follow a course using natural signs: landmarks, celestial bodies, or even the taste of seawater. Each Navigation skill applies to a specific environment, such as Open Seas, Underground, or Wilderness.</p>
    `,
    critical: `You find a shortcut (such as a hidden pass or fast-moving current) that speeds up the journey.`,
    failure: `Progress is delayed due to uncertainty or temporary loss of direction.`,
    fumble: `You become completely lost and cannot even retrace your steps.`
  },

  'oratory': {
    title: 'Oratory (POW+CHA)',
    description: `
      <p>This skill is the art of addressing large groups with the intent to persuade, inspire, or assert control. When attempting to influence a crowd or deliver a message to many, Oratory is used instead of Influence.</p>
    `,
    critical: `You completely win over the audience, even swaying staunch opponents. Any related skill rolls become one Difficulty Grade easier.`,
    failure: `Your speech has no effect. The audience remains indifferent or hostile.`,
    fumble: `You alienate the crowd, appear foolish, or accidentally convince them of the opposite point. Any related rolls become one Difficulty Grade harder.`
  },

  'piety': {
    title: 'Piety (POW+CHA)',
    description: `
      <p>This magical skill reflects your devotion to a specific deity or pantheon. Piety not only measures the depth of that faith, but also governs the potency of Divine spells you cast.</p>
      <p>Piety is not restricted to clerics or druids. Any character may develop the skill as a mark of reverence, even if they do not actively practice Divine magic.</p>
    `
  },

  'psychic manipulation': {
    title: 'Psychic Manipulation (POW×2)',
    description: `
      <p>Psychic Manipulation represents your ability to successfully use Psychic Disciplines. Unlike spells, most psychic disciplines do not use Intensity in calculating their effects. For those that do, figure Intensity as equal to one tenth of your Psychic Manipulation skill.</p>
      <p>Psychic disciplines are not magic and cannot be dispelled.</p>
    `
  },

  'seamanship': {
    title: 'Seamanship (INT+CON)',
    description: `
      <p>This skill functions like Boating but applies to large waterborne vessels powered by sails or rows of oars. In addition to handling and maneuvering ships, Seamanship covers their maintenance and upkeep, identifying when repairs are needed, choosing safe anchor points, and recognizing hazards.</p>
    `
  },

  'seduction': {
    title: 'Seduction (INT+CHA)',
    description: `
      <p>This skill involves romantic or sexual persuasion and is distinct from Influence. Seduction typically unfolds over time — ranging from hours to days or even weeks. Targets may always oppose a Seduction attempt with a Willpower roll.</p>
    `,
    critical: `The target is deeply captivated — falling into passion or desire. Any skill rolls that take advantage of this connection become one Difficulty Grade easier.`,
    failure: `Your attempt is rebuffed or politely dismissed.`,
    fumble: `Your effort causes offense or emotional harm. Further attempts are impossible for the time being, and any related rolls become one Difficulty Grade harder.`
  },

  'sleight': {
    title: 'Sleight (DEX+CHA)',
    description: `
      <p>This skill covers the covert manipulation of small objects — palming, concealing, picking pockets, cutting purses, or creating distractions. It can be used on any object no larger than your hand.</p>
      <p>Observers may oppose a Sleight attempt with a Perception roll to detect the act.</p>
    `,
    critical: `The object is hidden or handled flawlessly. Any attempt to spot or recover it becomes one Difficulty Grade harder.`,
    failure: `The object isn't hidden. It will be found automatically if someone looks for it.`,
    fumble: `The object isn't just exposed — it's dropped or revealed at the worst possible moment.`
  },

  'sorcerous wisdom': {
    title: 'Sorcerous Wisdom (CHA+INT)',
    description: `
      <p>This skill measures the amount of information you learn through practice about your ability to use sorcery, and your ability to use Weaving. Unlike other skills, Sorcerous Wisdom is only improved through Experience Rolls as you learn more about your innate abilities.</p>
      <p>It is also a measure of your ability to overcome and control Arcane Fluxes.</p>
    `
  },

  'streetwise': {
    title: 'Streetwise (POW+CHA)',
    description: `
      <p>This skill represents your familiarity with the people, places, and social undercurrents of a settlement. It covers identifying dangerous areas, locating services (legal or illegal), and knowing who to talk to.</p>
    `,
    critical: `You quickly find exactly the right person or place with no bribes and no middlemen. This may even lead to forming a new contact.`,
    failure: `Time is wasted searching, with no useful result.`,
    fumble: `Not only do you fail to find what you're after, but you also attract the wrong kind of attention: anything from local criminals to the city watch.`
  },

  'survival': {
    title: 'Survival (CON+POW)',
    description: `
      <p>This skill covers living off the land in rural or wilderness environments. It includes foraging, building fires, locating shelter, and finding safe places to rest. The skill becomes essential when you are without gear or when environmental conditions turn hostile.</p>
    `,
    critical: `You find a reliable source of food or shelter and won't need to make another Survival roll for a number of days equal to one-tenth of your skill (the Critical range).`,
    failure: `You gain one Level of Fatigue, which remains until the environment improves or another Survival roll is made.`,
    fumble: `A serious mishap occurs, such as a dangerous encounter, exposure to harsh conditions, or eating something toxic.`
  },

  'teach': {
    title: 'Teach (INT+CHA)',
    description: `
      <p>Teach lets you share your knowledge and techniques in a clear, constructive way. Without this skill, even the most experienced masters can struggle to train others.</p>
      <p>Like some other skills, Teach isn't rolled directly. Instead, it sets a limit on what can actually be passed on to more advanced students.</p>
    `
  },

  'track': {
    title: 'Track (INT+CON)',
    description: `
      <p>This skill is used to follow any type of quarry — animal or humanoid — by interpreting both clear and subtle signs of passage. Track rolls are made periodically, especially when conditions change. A Conceal roll may be used to oppose a Track attempt.</p>
    `,
    critical: `You stay on the trail regardless of terrain or conditions, as long as the quarry isn't trying to hide their tracks. No further Track rolls are needed.`,
    failure: `The trail is lost, requiring you to backtrack to find it again.`,
    fumble: `The trail is lost completely, ending the pursuit. Alternatively, you may walk straight into a trap set by the quarry.`
  },

  // === Combat Skills (used on Combat page) ===

  'combat skill': {
    title: 'Combat Skill (STR+DEX)',
    description: `
      <p>Combat Skill covers the ability to fight and use weapons, either through attacking or parrying. It's broad, with many specializations depending on your Class.</p>
    `,
    critical: `You've performed your attack or parry with excellence. Check with your Games Master to see if you gained any advantage over your opponent.`,
    failure: `You've failed in your attack or parry. Check with your Games Master to see if your opponent gained an advantage over you.`,
    fumble: `You've failed spectacularly in your attack or parry. Check with your Games Master to see if your opponent gained an advantage over you.`
  },

  'unarmed': {
    title: 'Unarmed (STR+DEX)',
    description: `
      <p>This is a universal Combat Skill known to all characters, representing the ability to fight without weapons. Unarmed covers basic brawling and wrestling techniques common to your culture.</p>
      <p>Some cultures or traditions develop specialized unarmed styles. These are learned separately as distinct Combat Skills, offering unique advantages in hand-to-hand combat.</p>
    `,
    critical: `You've performed your unarmed attack or parry with excellence. Check with your Games Master to see if you gained any advantage over your opponent.`,
    failure: `You've failed in your unarmed attack or parry. Check with your Games Master to see if your opponent gained an advantage over you.`,
    fumble: `You've failed spectacularly in your unarmed attack or parry. Check with your Games Master to see if your opponent gained an advantage over you.`
  },

  'read languages': {
    title: 'Read Languages (INT×2) — Rogue',
    description: `
      <p>You have learned to decipher written languages, even those you do not normally know. This does not grant complete fluency, but it allows you to piece together words and phrases to interpret meaning.</p>
      <p>The primary use of this skill is to understand notes, instructions, and treasure maps, though it can also be used to attempt to decipher unknown languages.</p>
      <p><strong>Requirement:</strong> Oath at 70% or higher and one month of training with the thieves' guild. Only members of a thieves' guild may take this Ranked Ability.</p>
      <p><em>⚠️ The Games Master should roll this skill check in secret — the rogue does not know if the translation is accurate.</em></p>
      <p><strong>On Success:</strong> Reveals a few useful pieces of information equal to INT/4.</p>
    `,
    critical: `You decipher the text with remarkable clarity, revealing several useful pieces of information equal to your INT/2.`,
    failure: `You are unable to make sense of the text. No useful information is gleaned.`,
    fumble: `You believe your translation is correct, but the Games Master provides <strong>false information</strong>. You have no way of knowing the translation is wrong.`
  }
};
