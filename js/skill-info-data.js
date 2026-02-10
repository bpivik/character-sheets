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
    // No critical defined
    failure: `The effects depend on the situation but usually mean temporary submission to the mental or emotional force being applied.`,
    fumble: `You suffer total mental collapse. Your will is broken, leaving you completely vulnerable to whatever is affecting you. If resisting a spell or shock, the psychological impact becomes permanent until healed.`
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
  }
};
