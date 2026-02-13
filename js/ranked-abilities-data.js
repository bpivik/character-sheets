/**
 * Ranked Class Abilities Data for Mythras Classic Fantasy
 * These are purchasable abilities that cost EXP Rolls (cost = rank)
 * 
 * Prereq format:
 * - "SkillName 50%" = requires skill at that percentage
 * - "SkillName 50% OR OtherSkill 50%" = either skill qualifies
 * - "AbilityName" (no %) = requires that ability first
 * - "AbilityName; SkillName 50%" = requires ability AND skill (semicolon = AND)
 * - null = no prerequisites
 * 
 * Special flags:
 * - repeatable: true = can be taken multiple times (e.g., Weapon Specialization)
 * - specialType: 'weapon-spec' = triggers weapon specialization sub-selection
 */

const RANKED_CLASS_ABILITIES = {
  bard: [
    // Rank 1
    { 
      name: "Agile", 
      rank: 1, 
      prereqs: "Evade 50% OR Acrobatics 50%",
      summary: "+4 Initiative (Unburdened, Light armor max)"
    },
    { 
      name: "Artful Dodger", 
      rank: 1, 
      prereqs: "Evade 50%",
      summary: "+10% Evade, dodge melee without falling prone (Unburdened, Light armor max)"
    },
    { 
      name: "Inspire Competence", 
      rank: 1, 
      prereqs: "Musicianship 60%; Willpower 60%",
      summary: "1 MP: allies within 30ft get +10% to skills for 5 rounds"
    },
    { 
      name: "Language (Druids' Cant)", 
      rank: 1, 
      prereqs: null,
      summary: "Secret druidic language for nature communication (Druidic bards only)"
    },
    { 
      name: "Language (Thieves' Cant)", 
      rank: 1, 
      prereqs: null,
      summary: "Secret language for discussing illicit activities (Arcane bards only)"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Swashbuckling", 
      rank: 1, 
      prereqs: "Combat Style 50%",
      summary: "Attack/Evade while jumping or swinging, ignore Athletics cap (Unburdened, Light armor max)"
    },
    { 
      name: "Unarmored Defense", 
      rank: 1, 
      prereqs: "Artful Dodger; Evade 50% OR Acrobatics 50%",
      summary: "Evade rolls one grade easier (unarmored, Unburdened)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Parry/Evade only (one reaction per attack)"
    },
    { 
      name: "Inspire Courage II", 
      rank: 2, 
      prereqs: "Musicianship 100%; Willpower 100%",
      summary: "As Inspire Courage I but +10% bonus and +2 rounds duration"
    },
    { 
      name: "Suggestion", 
      rank: 2, 
      prereqs: "Musicianship 70%; Willpower 70%",
      summary: "1 MP: implant Suggestion spell on Fascinated target; 1 Grade harder if woven into performance"
    },
    
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Inspire Greatness", 
      rank: 3, 
      prereqs: "Musicianship 90%; Willpower 90%",
      summary: "3 MP: 2 allies (+2/Rank beyond 3) get +10% skills/Resistance, first attack damage halved, 5 rounds/Rank"
    },
    { 
      name: "Song of Freedom", 
      rank: 3, 
      prereqs: "Musicianship 100%; Willpower 100%",
      summary: "3 MP: 1 min performance breaks Enchantment/Charm on ally within 30ft (Intensity = skill/10)"
    },
    
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "Use Defensive Reflexes twice per combat (not on same attack, not with Luck Points)"
    },
    { 
      name: "Inspire Heroics", 
      rank: 4, 
      prereqs: "Musicianship 110%; Willpower 110%",
      summary: "3 MP: self or 1 ally (+2 at Rank 5) gets +20% to Resistance, Evade, Parry; 5 rounds/Rank"
    },
    { 
      name: "Mass Suggestion", 
      rank: 4, 
      prereqs: "Musicianship 120%; Willpower 120%",
      summary: "As Suggestion but affects all Fascinated subjects"
    },
    
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes III", 
      rank: 5, 
      prereqs: "Defensive Reflexes II",
      summary: "Use Defensive Reflexes three times per combat (not on same attack, not with Luck Points)"
    },
    { 
      name: "Inspire Courage III", 
      rank: 5, 
      prereqs: "Musicianship 120%; Willpower 120%",
      summary: "As Inspire Courage I but +15% bonus and +3 rounds duration"
    },
  ],
  
  cavalier: [
    // Rank 1
    { 
      name: "Forceful Strike", 
      rank: 1, 
      prereqs: "Brawn 50% OR Mysticism 50%; Combat Style 50%",
      summary: "-1 grade to attack, +2 grades to Damage Modifier"
    },
    { 
      name: "Just a Scratch", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: Heal one hit location by Healing Rate (not Major Wounds)"
    },
    { 
      name: "Mental Strength I", 
      rank: 1, 
      prereqs: "Arcane Casting 60% OR Arcane Sorcery 60% OR Oath 60% OR Piety 60%",
      summary: "1/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Overrun", 
      rank: 1, 
      prereqs: "Forceful Strike; Ride 60%",
      summary: "On mounted Charge Through, free attack on another target if first drops (1/round)"
    },
    { 
      name: "Second Wind", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: After 1hr rest, recover up to 3 Fatigue levels"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Reactive Actions (Parry/Evade)"
    },
    { 
      name: "Greater Overrun", 
      rank: 2, 
      prereqs: "Overrun; Ride 70%",
      replaces: "Overrun",
      summary: "As Overrun, but attack ALL enemies along path if each drops"
    },
    { 
      name: "Mental Strength II", 
      rank: 2, 
      prereqs: "Mental Strength I; Arcane Casting 80% OR Arcane Sorcery 80% OR Oath 80% OR Piety 80%",
      summary: "2/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Mounted Combat Mastery", 
      rank: 2, 
      prereqs: "Ride 70%",
      summary: "Shield +1 size for parry; ignore first 2 Difficulty Grades on Ride in combat"
    },
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength III", 
      rank: 3, 
      prereqs: "Mental Strength II; Arcane Casting 100% OR Arcane Sorcery 100% OR Oath 100% OR Piety 100%",
      summary: "3/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "Use Defensive Reflexes twice per combat (no re-roll same attack, no Luck Point combo)"
    },
    { 
      name: "Mental Strength IV", 
      rank: 4, 
      prereqs: "Mental Strength III; Arcane Casting 120% OR Arcane Sorcery 120% OR Oath 120% OR Piety 120%",
      summary: "4/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength V", 
      rank: 5, 
      prereqs: "Mental Strength IV; Arcane Casting 140% OR Arcane Sorcery 140% OR Oath 140% OR Piety 140%",
      summary: "5/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
  ],
  
  cleric: [
    // Rank 1
    { 
      name: "Greater Turning", 
      rank: 1, 
      prereqs: "Willpower 60%",
      summary: "May re-roll Turn Undead Channel roll (must use new result)"
    },
    { 
      name: "Holy Smite", 
      rank: 1, 
      prereqs: "Piety 50%; Willpower 50%",
      summary: "+1 step Damage Modifier vs undead/demons/devils (1/day per Rank)"
    },
    { 
      name: "Mental Strength I", 
      rank: 1, 
      prereqs: "Piety 60%",
      summary: "1/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Powerful Concentration", 
      rank: 1, 
      prereqs: "Piety 50%",
      summary: "Willpower tests to maintain spell Concentration are 1 grade easier"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Modifier with finesse weapons (max 2× weapon die)"
    },
    
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 Reactive Action Point for Parry/Evade only"
    },
    { 
      name: "Extra Turning", 
      rank: 2, 
      prereqs: "Piety 80%; Willpower 80%",
      summary: "Double Turn Undead uses per encounter"
    },
    { 
      name: "Mental Strength II", 
      rank: 2, 
      prereqs: "Mental Strength I; Piety 80%",
      summary: "2/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Ranged Touch", 
      rank: 2, 
      prereqs: "Willpower 80%",
      summary: "Extend Touch spell to 30ft (counts as 1 Rank higher for memorization)"
    },
    
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Improved Holy Smite", 
      rank: 3, 
      prereqs: "Holy Smite; Piety 90%; Willpower 90%",
      summary: "+2 steps Damage Modifier vs undead/demons/devils (replaces Holy Smite)"
    },
    { 
      name: "Mental Strength III", 
      rank: 3, 
      prereqs: "Mental Strength II; Piety 100%",
      summary: "3/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "+1 Reactive AP usable twice per combat (not vs same attack, no Luck combo)"
    },
    { 
      name: "Mental Strength IV", 
      rank: 4, 
      prereqs: "Mental Strength III; Piety 120%",
      summary: "4/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Greater Holy Smite", 
      rank: 5, 
      prereqs: "Improved Holy Smite; Piety 130%; Willpower 130%",
      summary: "+4 steps Damage Modifier vs undead/demons/devils (replaces Improved Holy Smite)"
    },
    { 
      name: "Mental Strength V", 
      rank: 5, 
      prereqs: "Mental Strength IV; Piety 140%",
      summary: "5/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
  ],
  
  druid: [
    // Rank 1
    { 
      name: "Animal Companion I", 
      rank: 1, 
      prereqs: "Survival 50%",
      summary: "Call/befriend small animal companion (SIZ up to ½ Animal Handling, max 35)"
    },
    { 
      name: "Animal Empathy", 
      rank: 1, 
      prereqs: "Piety 50%",
      summary: "Use Influence vs Willpower to calm/befriend natural animals (up to 1/10th Influence)"
    },
    { 
      name: "Immune to Charm Spells", 
      rank: 1, 
      prereqs: "Willpower 60%",
      summary: "Immune to Charm spells from woodland creatures and bards"
    },
    { 
      name: "Mental Strength I", 
      rank: 1, 
      prereqs: "Piety 60%",
      summary: "1/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Pass Without a Trace", 
      rank: 1, 
      prereqs: "Survival 60%",
      summary: "Move through woods at normal pace, no trail, no damage from natural hazards"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Modifier with finesse weapons (max 2× weapon die)"
    },
    { 
      name: "Woodland Languages", 
      rank: 1, 
      prereqs: "Piety 50%",
      summary: "Gain one woodland language at Base+40% (may take multiple times)"
    },
    
    // Rank 2
    { 
      name: "Animal Companion II", 
      rank: 2, 
      prereqs: "Survival 70%",
      summary: "As Animal Companion I, but max SIZ 36-45"
    },
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Immunity to Poison", 
      rank: 2, 
      prereqs: "Survival 70%",
      summary: "No negative effects from poison or venom"
    },
    { 
      name: "Mental Strength II", 
      rank: 2, 
      prereqs: "Mental Strength I; Piety 80%",
      summary: "2/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Ranged Touch", 
      rank: 2, 
      prereqs: "Willpower 80%",
      summary: "Extend Touch spell to 30ft (counts as 1 Rank higher for memorization)"
    },
    { 
      name: "Shape Change I", 
      rank: 2, 
      prereqs: "Piety 70%",
      summary: "Transform to reptile/bird/mammal SIZ 3-20; 1/day (+1 per 10% above 70%); lasts 5hrs+5/Rank"
    },
    
    // Rank 3
    { 
      name: "Animal Companion III", 
      rank: 3, 
      prereqs: "Survival 90%",
      summary: "As Animal Companion I, but max SIZ 46-55"
    },
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 3, 
      prereqs: null,
      summary: "+1 Reactive Action Point for Parry/Evade only"
    },
    { 
      name: "Mental Strength III", 
      rank: 3, 
      prereqs: "Mental Strength II; Piety 100%",
      summary: "3/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Shape Change II", 
      rank: 3, 
      prereqs: "Shape Change I; Piety 90%",
      summary: "Transform to SIZ 1-2 or 21-60; at 100% Piety can become plant creatures"
    },
    { 
      name: "Wild Casting", 
      rank: 3, 
      prereqs: "Willpower 90%",
      summary: "Cast spells while shape changed at 1 Difficulty Grade harder"
    },
    
    // Rank 4
    { 
      name: "Agelessness", 
      rank: 4, 
      prereqs: "Piety 120%",
      summary: "No longer subject to Aging penalties; immune to magical aging"
    },
    { 
      name: "Alter Self", 
      rank: 4, 
      prereqs: "Piety 110%",
      summary: "Alter form at will (as Arcane spell); must be in natural form"
    },
    { 
      name: "Animal Companion IV", 
      rank: 4, 
      prereqs: "Survival 110%",
      summary: "As Animal Companion I, but max SIZ 46-65"
    },
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength IV", 
      rank: 4, 
      prereqs: "Mental Strength III; Piety 120%",
      summary: "4/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Shape Change III", 
      rank: 4, 
      prereqs: "Shape Change II; Piety 110%",
      summary: "Transform to small/medium/large elemental 1/day (2/day at 120% Piety)"
    },
    
    // Rank 5
    { 
      name: "Animal Companion V", 
      rank: 5, 
      prereqs: "Survival 130%",
      summary: "As Animal Companion I, but max SIZ 66-75"
    },
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 5, 
      prereqs: "Defensive Reflexes I",
      summary: "+1 Reactive AP usable twice per combat (not vs same attack, no Luck combo)"
    },
    { 
      name: "Mental Strength V", 
      rank: 5, 
      prereqs: "Mental Strength IV; Piety 140%",
      summary: "5/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Shape Change IV", 
      rank: 5, 
      prereqs: "Shape Change III; Piety 130%",
      summary: "Transform to Huge elemental 1/day (in addition to other forms)"
    },
  ],
  
  berserker: [
    // Rank 1
    { 
      name: "Agile", 
      rank: 1, 
      prereqs: "Evade 50% OR Acrobatics 50%",
      summary: "+4 Initiative (Unburdened, Light armor max)"
    },
    { 
      name: "Forceful Strike", 
      rank: 1, 
      prereqs: "Brawn 50% OR Mysticism 50%; Combat Style 50%",
      summary: "-1 grade to attack, +2 grades to Damage Modifier"
    },
    { 
      name: "Just a Scratch", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: Heal one hit location by Healing Rate (not Major Wounds)"
    },
    { 
      name: "Second Wind", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: After 1hr rest, recover up to 3 Fatigue levels"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Sweeping Strike", 
      rank: 1, 
      prereqs: "Forceful Strike; Combat Style 60%",
      summary: "Free attack on nearby foe when you drop an opponent (1/round)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "1 bonus Action Point for Reactive Actions (Parry/Evade only)"
    },
    { 
      name: "Extra Rage I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 additional Berserk Rage use per day"
    },
    { 
      name: "Greater Sweeping Strike", 
      rank: 2, 
      prereqs: "Sweeping Strike; Combat Style 70%",
      summary: "Sweeping Strike against ALL enemies in range (if each attack drops a foe)"
    },
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Extra Rage II", 
      rank: 3, 
      prereqs: "Endurance 100%",
      summary: "+1 additional Berserk Rage use per day (stacks with Extra Rage I)"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "Use Defensive Reflexes twice per combat (not against the same attack, cannot combine with Luck)"
    },
    { 
      name: "Extra Rage III", 
      rank: 4, 
      prereqs: "Endurance 120%",
      summary: "+1 additional Berserk Rage use per day (stacks with Extra Rage I–II)"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Extra Rage IV", 
      rank: 5, 
      prereqs: "Endurance 140%",
      summary: "+1 additional Berserk Rage use per day (stacks with Extra Rage I–III)"
    },
  ],
  
  fighter: [
    // Rank 1
    { 
      name: "Forceful Strike", 
      rank: 1, 
      prereqs: "Brawn 50% OR Mysticism 50%; Combat Style 50%",
      summary: "-1 grade to attack, +2 grades to Damage Modifier"
    },
    { 
      name: "Just a Scratch", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: Heal one hit location by Healing Rate (not Major Wounds)"
    },
    { 
      name: "Mounted Combat", 
      rank: 1, 
      prereqs: "Ride 50%",
      summary: "Combat Skills not limited by Ride, no Charge penalty, ignore first Ride difficulty"
    },
    { 
      name: "Second Wind", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: After 1hr rest, recover up to 3 Fatigue levels"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    { 
      name: "Weapon Specialization", 
      rank: 1, 
      prereqs: "Combat Style 50%",
      summary: "Specialize in another weapon or shield (+5% Combat Skill, +1 AP Parry, or ranged benefits)"
    },
    // Rank 2
    { 
      name: "Brute Strength", 
      rank: 2, 
      prereqs: null,
      summary: "1/day per Rank: Brawn one Grade easier for a single action (costs 1 Fatigue)"
    },
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Sweeping Strike", 
      rank: 2, 
      prereqs: "Forceful Strike; Combat Style 60%",
      summary: "If you drop an opponent, free attack on another target within reach (1/round)"
    },
    { 
      name: "Weapon Specialization", 
      rank: 2, 
      prereqs: "Combat Style 70%",
      summary: "Specialize in another weapon or shield (+5% Combat Skill, +1 AP Parry, or ranged benefits)"
    },
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 3, 
      prereqs: null,
      summary: "+1 bonus Action Point for Reactive Actions (Parry/Evade). One reaction per incident."
    },
    { 
      name: "Greater Sweeping Strike", 
      rank: 3, 
      prereqs: "Sweeping Strike; Combat Style 70%",
      summary: "Sweeping Strike against ALL enemies in range (each attack must drop opponent)"
    },
    { 
      name: "Weapon Specialization", 
      rank: 3, 
      prereqs: "Combat Style 90%",
      summary: "Specialize in another weapon or shield (+5% Combat Skill, +1 AP Parry, or ranged benefits)"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Greater Brute Strength", 
      rank: 4, 
      prereqs: "Brute Strength",
      summary: "2/day: Brawn one Grade easier. First use costs no Fatigue, second costs 1 Fatigue."
    },
    { 
      name: "Weapon Specialization", 
      rank: 4, 
      prereqs: "Combat Style 110%",
      summary: "Specialize in another weapon or shield (+5% Combat Skill, +1 AP Parry, or ranged benefits)"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 5, 
      prereqs: "Defensive Reflexes I",
      summary: "May use Defensive Reflexes twice per combat. Cannot re-roll same attack or combine with Luck Point."
    },
    { 
      name: "Weapon Specialization", 
      rank: 5, 
      prereqs: "Combat Style 130%",
      summary: "Specialize in another weapon or shield (+5% Combat Skill, +1 AP Parry, or ranged benefits)"
    },
  ],
  
  mage: [
    // Rank 1
    { 
      name: "Mental Strength I", 
      rank: 1, 
      prereqs: "Arcane Casting 60%",
      summary: "1/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Powerful Concentration", 
      rank: 1, 
      prereqs: "Arcane Casting 50%",
      summary: "Willpower tests to maintain spell Concentration are 1 grade easier"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, slings, etc.)"
    },
    
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength II", 
      rank: 2, 
      prereqs: "Mental Strength I; Arcane Casting 80%",
      summary: "As Mental Strength I, but usable 2/day"
    },
    { 
      name: "Ranged Touch", 
      rank: 2, 
      prereqs: "Willpower 80%",
      summary: "Extend Touch-range spells to 30ft; spell counts as 1 Rank higher for memorization"
    },
    
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 3, 
      prereqs: null,
      summary: "+1 bonus Action Point for Parry/Evade only (one reaction per attack)"
    },
    { 
      name: "Mental Strength III", 
      rank: 3, 
      prereqs: "Mental Strength II; Arcane Casting 100%",
      summary: "As Mental Strength I, but usable 3/day"
    },
    
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength IV", 
      rank: 4, 
      prereqs: "Mental Strength III; Arcane Casting 120%",
      summary: "As Mental Strength I, but usable 4/day"
    },
    
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 5, 
      prereqs: "Defensive Reflexes I",
      summary: "As Defensive Reflexes I, but usable 2/combat (not vs same attack, no Luck Point combo)"
    },
    { 
      name: "Mental Strength V", 
      rank: 5, 
      prereqs: "Mental Strength IV; Arcane Casting 140%",
      summary: "As Mental Strength I, but usable 5/day"
    },
  ],
  
  monk: [
    // Rank 1
    { 
      name: "Defensive Reflexes I", 
      rank: 1, 
      prereqs: null,
      summary: "+1 bonus AP for Parry/Evade only (1 reaction per attack)"
    },
    { 
      name: "Fleet of Foot", 
      rank: 1, 
      prereqs: null,
      summary: "Outmaneuver attempts 2 grades easier (Unburdened, Light armor max)"
    },
    { 
      name: "Ki Strike", 
      rank: 1, 
      prereqs: "Mysticism 60%; Unarmed 60%",
      summary: "Unarmed attacks count as magical (+1 at Rank 1, +2 at Rank 2, etc.)"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Slow Fall", 
      rank: 1, 
      prereqs: "Mysticism 50%",
      summary: "Ignore fall damage up to ½ Mysticism in feet (Extremely Unburdened, no armor, near surface)"
    },
    { 
      name: "Spatial Awareness", 
      rank: 1, 
      prereqs: "Willpower 50%",
      summary: "React to attacks from behind via Formidable Perception check (1 AP)"
    },
    { 
      name: "Sweeping Strike", 
      rank: 1, 
      prereqs: "Forceful Strike; Combat Style 60%",
      summary: "Free attack on another target if you drop your opponent (1/round)"
    },
    { 
      name: "Very Agile", 
      rank: 1, 
      prereqs: "Mysticism 60%; Evade 60% OR Acrobatics 60%",
      summary: "+1/10 Mysticism to Initiative (min +5, Extremely Unburdened, no armor)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 2, 
      prereqs: "Defensive Reflexes I",
      summary: "May use Defensive Reflexes twice per combat (no re-rolls vs same attack, no Luck combo)"
    },
    { 
      name: "Greater Sweeping Strike", 
      rank: 2, 
      prereqs: "Sweeping Strike; Combat Style 70%",
      summary: "Sweeping Strike against all enemies in range if each preceding attack drops an opponent"
    },
    { 
      name: "Mystic Healing", 
      rank: 2, 
      prereqs: "Meditation 70%; Mysticism 70%",
      summary: "Heal 2× Healing Rate HP/day via meditation (15 min + Meditation roll)"
    },
    { 
      name: "Pain Control", 
      rank: 2, 
      prereqs: "Meditation 70%",
      summary: "Endurance rolls vs injury penalties are Automatic Successes (fail only on 100)"
    },
    { 
      name: "Speak with Animals", 
      rank: 2, 
      prereqs: "Mysticism 70%",
      summary: "Communicate with a chosen animal species",
      promptForDetail: "animal"
    },
    // Rank 3
    { 
      name: "Arrowcut", 
      rank: 3, 
      prereqs: "Mysticism 90%",
      summary: "Parry arrows, darts, & spears at Standard Difficulty (Extremely Unburdened, no armor)"
    },
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes III", 
      rank: 3, 
      prereqs: "Defensive Reflexes II",
      summary: "May use Defensive Reflexes 3 times per combat (no re-rolls vs same attack, no Luck combo)"
    },
    { 
      name: "Nether Walk", 
      rank: 3, 
      prereqs: "Meditation 100%; Mysticism 100%",
      summary: "1/day: Teleport up to 1/10 Mysticism in feet (1 Action, as Dimension Door)"
    },
    { 
      name: "Speak with Plants", 
      rank: 3, 
      prereqs: "Mysticism 90%",
      summary: "Communicate with natural vegetation; request passage or entanglement"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes IV", 
      rank: 4, 
      prereqs: "Defensive Reflexes III",
      summary: "May use Defensive Reflexes 4 times per combat (no re-rolls vs same attack, no Luck combo)"
    },
    { 
      name: "Heart Slow", 
      rank: 4, 
      prereqs: "Meditation 110%; Mysticism 110%",
      summary: "Appear dead — immune to Life Sense; must remain completely inactive"
    },
    { 
      name: "Indomitable", 
      rank: 4, 
      prereqs: "Meditation 110%",
      summary: "Immune to all mind control, domination, spells, and spirit possession"
    },
    { 
      name: "Quivering Palm", 
      rank: 4, 
      prereqs: "Mysticism 110%",
      summary: "Kill with a touch — 1/week, Extremely Unburdened + No Armor (costs 10 EXP Rolls)"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes V", 
      rank: 5, 
      prereqs: "Defensive Reflexes IV",
      summary: "May use Defensive Reflexes 5 times per combat (no re-rolls vs same attack, no Luck combo)"
    },
    { 
      name: "Perfection", 
      rank: 5, 
      prereqs: "Meditation 140%; Mysticism 140%",
      summary: "10 pts magical armor, ethereal state 20 rds/day, immune to Charm, no Aging penalties"
    },
  ],
  
  paladin: [
    // Rank 1
    { 
      name: "Cure Disease", 
      rank: 1, 
      prereqs: "Oath 60%; Willpower 60%",
      summary: "1/week per Rank: Remove one natural disease from a sick individual"
    },
    { 
      name: "Divine Protection", 
      rank: 1, 
      prereqs: "Oath 50%",
      summary: "+10% to Willpower, Endurance, and Evade when resisting offensive actions"
    },
    { 
      name: "Forceful Strike", 
      rank: 1, 
      prereqs: "Brawn 50% OR Mysticism 50%; Combat Style 50%",
      summary: "-1 grade to attack, +2 grades to Damage Modifier"
    },
    { 
      name: "Immunity to Disease", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "Immune to natural diseases (not supernatural like lycanthropy or vampirism)"
    },
    { 
      name: "Immunity to Fear (10' Radius)", 
      rank: 1, 
      prereqs: "Willpower 60%",
      summary: "Immune to all fear effects; allies within 10ft also immune"
    },
    { 
      name: "Just a Scratch", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: Heal one hit location by Healing Rate (not Major Wounds)"
    },
    { 
      name: "Protection from Evil (10' Radius)", 
      rank: 1, 
      prereqs: "Willpower 50%",
      summary: "Permanent Protection from Evil aura; attackers become immune for 24hrs"
    },
    { 
      name: "Second Wind", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "1/day: After 1hr rest, recover up to 3 Fatigue levels"
    },
    { 
      name: "Sweeping Strike", 
      rank: 1, 
      prereqs: "Forceful Strike; Combat Style 60%",
      summary: "If you drop an opponent, free melee attack on another target in reach (1/round)"
    },
    { 
      name: "Turn Undead", 
      rank: 1, 
      prereqs: "Oath 60%; Willpower 60%",
      summary: "Turn undead/evil beings as per the clerical ability"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    // Rank 2
    { 
      name: "Call War Horse", 
      rank: 2, 
      prereqs: "Oath 70%; Willpower 70%",
      summary: "Summon a warhorse; if killed, wait 1 year + 2 EXP Rolls to call another"
    },
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Reactive Actions (Parry/Evade)"
    },
    { 
      name: "Greater Sweeping Strike", 
      rank: 2, 
      prereqs: "Sweeping Strike; Combat Style 70%",
      replaces: "Sweeping Strike",
      summary: "As Sweeping Strike, but attack ALL enemies in reach if each drops"
    },
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Circle of Power (Holy Weapon Only)", 
      rank: 3, 
      prereqs: "Willpower 90%",
      summary: "Holy weapon creates 10ft circle suppressing hostile magic ≤ Channel/10 Magnitude"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      replaces: "Defensive Reflexes I",
      summary: "May use Defensive Reflexes twice per combat (no re-roll vs same attack, no Luck combo)"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
  ],
  
  // More classes to be added...

  ranger: [
    // Rank 1
    { 
      name: "Animal Empathy", 
      rank: 1, 
      prereqs: null,
      summary: "Use Influence vs Willpower to calm/befriend natural animals (max 1/10th Influence)"
    },
    { 
      name: "Artful Dodger", 
      rank: 1, 
      prereqs: "Evade 50%",
      summary: "+10% Evade when Unburdened & Light armor; dodge melee without falling prone"
    },
    { 
      name: "Camouflage", 
      rank: 1, 
      prereqs: null,
      summary: "Perception rolls to spot you in natural terrain are 1 Difficulty Grade harder"
    },
    { 
      name: "Forceful Strike", 
      rank: 1, 
      prereqs: "Brawn 50%; Combat Style 50%",
      summary: "Make attack 1 Grade harder to increase Damage Modifier by 2 steps"
    },
    { 
      name: "Just a Scratch", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "Once/day, regain HP equal to Healing Rate in one Hit Location (not Major Wounds)"
    },
    { 
      name: "Second Wind", 
      rank: 1, 
      prereqs: "Endurance 50%",
      summary: "Once/day after 1hr rest, recover up to 3 levels of Fatigue"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Launch ranged attacks while running (not sprinting); capped by Athletics skill"
    },
    { 
      name: "Species Enemy I", 
      rank: 1, 
      prereqs: null,
      summary: "+10% to all skill rolls vs chosen enemy; +1 Damage Bonus step"
    },
    { 
      name: "Sweeping Strike", 
      rank: 1, 
      prereqs: "Forceful Strike; Combat Style 60%",
      summary: "If you drop a foe, free attack on another target within reach (1/Round)"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },
    
    // Rank 2
    { 
      name: "Animal Companion I", 
      rank: 2, 
      prereqs: null,
      summary: "Call/befriend animal companion (SIZ up to ½ Animal Handling, max 35). May be taken multiple times.",
      repeatable: true
    },
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Parry/Evade only (one reaction per attack)"
    },
    { 
      name: "Greater Sweeping Strike", 
      rank: 2, 
      prereqs: "Sweeping Strike; Combat Style 70%",
      summary: "Sweeping Strike against ALL enemies in range (if each attack drops a foe)"
    },
    { 
      name: "Species Enemy II", 
      rank: 2, 
      prereqs: "Species Enemy I",
      summary: "Select an additional Species Enemy (+10% skills, +1 Damage step vs chosen foe)"
    },
    
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Species Enemy III", 
      rank: 3, 
      prereqs: "Species Enemy II",
      summary: "Select an additional Species Enemy (+10% skills, +1 Damage step vs chosen foe)"
    },
    
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 4, 
      prereqs: "Defensive Reflexes I",
      summary: "+1 bonus AP for Parry/Evade only. May now use this ability twice per combat (cannot re-roll same attack or combine with Luck Point)"
    },
    { 
      name: "Species Enemy IV", 
      rank: 4, 
      prereqs: "Species Enemy III",
      summary: "Select an additional Species Enemy (+10% skills, +1 Damage step vs chosen foe)"
    },
    
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Species Enemy V", 
      rank: 5, 
      prereqs: "Species Enemy IV",
      summary: "Select an additional Species Enemy (+10% skills, +1 Damage step vs chosen foe)"
    },
  ],

  rogue: [
    // Rank 1
    { 
      name: "Agile", 
      rank: 1, 
      prereqs: "Evade 50% OR Acrobatics 50%",
      summary: "+4 Initiative (Unburdened, Light armor max)"
    },
    { 
      name: "Artful Dodger", 
      rank: 1, 
      prereqs: "Evade 50%",
      summary: "+10% Evade, dodge melee without falling prone (Unburdened, Light armor max)"
    },
    { 
      name: "Great Hearing", 
      rank: 1, 
      prereqs: "Perception 50%",
      summary: "Perception (hearing) rolls are 1 Difficulty Grade easier (+20%)"
    },
    { 
      name: "Sharp Eyed", 
      rank: 1, 
      prereqs: "Perception 50%",
      summary: "Perception (vision) rolls are 1 Difficulty Grade easier (+20%)"
    },
    { 
      name: "Skirmishing", 
      rank: 1, 
      prereqs: "Athletics 50%; Combat Style 50%",
      summary: "Ranged attacks while running (capped by Athletics)"
    },
    { 
      name: "Swashbuckling", 
      rank: 1, 
      prereqs: "Combat Style 50%",
      summary: "Attack/Evade while jumping or swinging, ignore Athletics cap (Unburdened, Light armor max)"
    },
    { 
      name: "Unarmored Defense", 
      rank: 1, 
      prereqs: "Artful Dodger; Evade 50% OR Acrobatics 50%",
      summary: "Evade rolls one grade easier (+20%) when unarmored and Unburdened"
    },
    { 
      name: "Vaulting", 
      rank: 1, 
      prereqs: "Acrobatics 50%",
      summary: "Pole vault with Easy Acrobatics (+20%) — horizontal: 2x height + 1d4+6 ft"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, etc.)"
    },

    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes I", 
      rank: 2, 
      prereqs: null,
      summary: "+1 bonus Action Point for Reactive Actions (Parry/Evade), once per incident"
    },
    { 
      name: "Read Languages", 
      rank: 2, 
      prereqs: "Oath 70%",
      summary: "Decipher written languages (INT x2 base). Requires thieves' guild training"
    },

    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes II", 
      rank: 3, 
      prereqs: "Defensive Reflexes I",
      summary: "+1 bonus AP for Reactive Actions, usable twice per combat"
    },
    { 
      name: "Use Arcane Scrolls", 
      rank: 3, 
      prereqs: "Oath 90%",
      summary: "Cast spells from mage scrolls (INT x5%). Failure = Fumble. Requires guild training"
    },

    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes III", 
      rank: 4, 
      prereqs: "Defensive Reflexes II",
      summary: "+1 bonus AP for Reactive Actions, usable three times per combat"
    },

    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (cannot exceed racial max, once per Rank)"
    },
    { 
      name: "Defensive Reflexes IV", 
      rank: 5, 
      prereqs: "Defensive Reflexes III",
      summary: "+1 bonus AP for Reactive Actions, usable four times per combat"
    },
  ],

  sorcerer: [
    // Rank 1
    { 
      name: "Mental Strength I", 
      rank: 1, 
      prereqs: "Arcane Sorcery 60%",
      summary: "1/day: 2 grades easier on Willpower vs mind magic; 1 grade easier to Disbelieve"
    },
    { 
      name: "Powerful Concentration", 
      rank: 1, 
      prereqs: "Arcane Sorcery 50%",
      summary: "Willpower tests to maintain spell Concentration are 1 grade easier"
    },
    { 
      name: "Weapon Precision", 
      rank: 1, 
      prereqs: null,
      summary: "Use STR+DEX for Damage Bonus with finesse weapons (daggers, rapiers, slings, etc.)"
    },
    
    // Rank 2
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength II", 
      rank: 2, 
      prereqs: "Mental Strength I; Arcane Sorcery 80%",
      summary: "As Mental Strength I, but usable 2/day"
    },

    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Magic Surge", 
      rank: 3, 
      prereqs: null,
      summary: "1/day: Regain 1d6 Magic Points instantly (costs 1 AP in combat)"
    },
    { 
      name: "Mental Strength III", 
      rank: 3, 
      prereqs: "Mental Strength II; Arcane Sorcery 100%",
      summary: "As Mental Strength I, but usable 3/day"
    },

    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Mental Strength IV", 
      rank: 4, 
      prereqs: "Mental Strength III; Arcane Sorcery 120%",
      summary: "As Mental Strength I, but usable 4/day"
    },

    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    { 
      name: "Legendary Sorcerer", 
      rank: 5, 
      prereqs: null,
      summary: "Cast any spell without components. Wordless & Stillness weaves built-in (MP/time costs still apply)"
    },
    { 
      name: "Mental Strength V", 
      rank: 5, 
      prereqs: "Mental Strength IV; Arcane Sorcery 140%",
      summary: "As Mental Strength I, but usable 5/day"
    },
  ],

  'anti-paladin': [
    // Rank 2
    { 
      name: "Turn Undead", 
      rank: 2, 
      prereqs: null,
      summary: "Turn or control undead, demons, and devils (control lasts 24 hours)"
    },
    { 
      name: "Call War Horse", 
      rank: 2, 
      prereqs: null,
      summary: "Summon a dark warhorse (25% chance of Nightmare)"
    },
    { 
      name: "Characteristic Increase", 
      rank: 2, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    // Rank 3
    { 
      name: "Characteristic Increase", 
      rank: 3, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    // Rank 4
    { 
      name: "Characteristic Increase", 
      rank: 4, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
    // Rank 5
    { 
      name: "Characteristic Increase", 
      rank: 5, 
      prereqs: null,
      summary: "+1 to any Characteristic (once per Rank, cannot exceed racial max)"
    },
  ],
};

/**
 * Abilities that can be taken multiple times (with different specializations)
 */
const REPEATABLE_ABILITIES = {
  'Weapon Specialization': {
    types: ['Melee', 'Ranged', 'Shield'],
    // Ranged grants additional abilities
    grantsAbilities: {
      'Ranged': ['Quick Shot', 'Improved Aim', 'Reduced Reload Time']
    }
  },
  'Woodland Languages': {
    // Can be taken multiple times to learn different woodland languages
    description: 'Select a different woodland language each time'
  },
  'Animal Companion I': {
    // Can be taken multiple times for different companions
    description: 'Call and befriend another animal companion'
  },
  'Animal Companion II': {
    description: 'Call and befriend another animal companion'
  },
  'Animal Companion III': {
    description: 'Call and befriend another animal companion'
  },
  'Animal Companion IV': {
    description: 'Call and befriend another animal companion'
  },
  'Animal Companion V': {
    description: 'Call and befriend another animal companion'
  }
};

/**
 * Get abilities for a class at a specific rank
 */
function getRankedAbilitiesForClass(className, rank) {
  const normalized = className.toLowerCase().trim();
  // Try exact match first (preserves hyphens like 'anti-paladin'), then stripped
  const abilities = RANKED_CLASS_ABILITIES[normalized] 
    || RANKED_CLASS_ABILITIES[normalized.replace(/[-\s]/g, '')]
    || null;
  if (!abilities) return [];
  return abilities.filter(a => a.rank === rank);
}

/**
 * Get all abilities for a class up to a specific rank
 */
function getAllRankedAbilitiesUpToRank(className, maxRank) {
  const normalized = className.toLowerCase().trim();
  const abilities = RANKED_CLASS_ABILITIES[normalized] 
    || RANKED_CLASS_ABILITIES[normalized.replace(/[-\s]/g, '')]
    || null;
  if (!abilities) return [];
  return abilities.filter(a => a.rank <= maxRank);
}

/**
 * Check if a character meets the prerequisites for an ability
 * @param {string} prereqs - The prerequisite string
 * @param {Set} acquiredAbilities - Set of ability names the character has
 * @param {Function} getSkillValue - Function to get skill value by name
 * @returns {Object} - { met: boolean, missing: string[] }
 */
function checkAbilityPrereqs(prereqs, acquiredAbilities, getSkillValue) {
  if (!prereqs) return { met: true, missing: [] };
  
  const missing = [];
  
  // Split by semicolon for AND conditions
  const andConditions = prereqs.split(';').map(s => s.trim());
  
  for (const condition of andConditions) {
    // Check for OR conditions
    if (condition.includes(' OR ')) {
      const orParts = condition.split(' OR ').map(s => s.trim());
      let anyMet = false;
      const orMissing = [];
      
      for (const part of orParts) {
        const result = checkSingleCondition(part, acquiredAbilities, getSkillValue);
        if (result.met) {
          anyMet = true;
          break;
        } else {
          orMissing.push(result.reason);
        }
      }
      
      if (!anyMet) {
        missing.push(orParts.join(' OR '));
      }
    } else {
      // Single condition
      const result = checkSingleCondition(condition, acquiredAbilities, getSkillValue);
      if (!result.met) {
        missing.push(result.reason);
      }
    }
  }
  
  return { met: missing.length === 0, missing };
}

/**
 * Check a single prerequisite condition
 */
function checkSingleCondition(condition, acquiredAbilities, getSkillValue) {
  // Check if it's a skill requirement (contains %)
  const skillMatch = condition.match(/^(.+?)\s+(\d+)%$/);
  if (skillMatch) {
    const skillName = skillMatch[1].trim();
    const requiredValue = parseInt(skillMatch[2], 10);
    const currentValue = getSkillValue(skillName);
    
    if (currentValue >= requiredValue) {
      return { met: true };
    } else {
      return { met: false, reason: `${skillName} ${requiredValue}% (you have ${currentValue}%)` };
    }
  }
  
  // Otherwise it's an ability requirement - check base name (before parentheses)
  const baseCondition = condition.split('(')[0].trim();
  
  // Special handling for Species Enemy I/II/III/IV/V prereqs
  // On the sheet these get renamed to "Species Enemy (Orcs)" / "Species Enemies (Orcs, Goblins)"
  // so we need to count species enemy entries rather than match by exact name
  const seCondMatch = baseCondition.match(/^species enem(?:y|ies)\s*(i{1,3}|iv|v|\d+)?$/i);
  if (seCondMatch) {
    const romanToNum = { 'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5 };
    const numeral = (seCondMatch[1] || 'i').toLowerCase();
    const requiredCount = romanToNum[numeral] || parseInt(numeral, 10) || 1;
    
    // Count species enemy entries in acquired abilities
    let seCount = 0;
    for (const acquired of acquiredAbilities) {
      const baseAcquired = acquired.split('(')[0].trim().toLowerCase();
      if (baseAcquired.match(/^species enem(?:y|ies)\s*(?:i{1,3}|iv|v|\d+)?$/i)) {
        seCount++;
      }
    }
    if (seCount >= requiredCount) {
      return { met: true };
    } else {
      return { met: false, reason: `Species Enemy ${seCondMatch[1] || 'I'} ability` };
    }
  }
  
  // Check if any acquired ability matches (with or without parenthetical suffix)
  for (const acquired of acquiredAbilities) {
    const baseAcquired = acquired.split('(')[0].trim();
    if (baseAcquired.toLowerCase() === baseCondition.toLowerCase()) {
      return { met: true };
    }
  }
  
  return { met: false, reason: `${condition} ability` };
}

/**
 * Check if character has a specific ability (accounting for parenthetical variants)
 * e.g., "Weapon Specialization" matches "Weapon Specialization (Longsword)"
 */
function hasAbility(abilityName, acquiredAbilities) {
  const baseName = abilityName.split('(')[0].trim().toLowerCase();
  const fullName = abilityName.toLowerCase().trim();
  
  // Normalize apostrophes for comparison
  const normalizeApostrophes = (str) => str.replace(/[']/g, "'");
  const normalizedFullName = normalizeApostrophes(fullName);
  
  // Special handling for Species Enemy I/II/III/IV/V
  // Display format drops numerals, so count how many species enemies exist
  const seMatch = baseName.match(/^species enem(?:y|ies)\s*(i{1,3}|iv|v|\d+)?$/i);
  if (seMatch) {
    const romanToNum = { 'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5 };
    const numeral = (seMatch[1] || 'i').toLowerCase();
    const requiredCount = romanToNum[numeral] || parseInt(numeral, 10) || 1;
    
    // Count species enemy entries in acquired abilities
    let seCount = 0;
    for (const acquired of acquiredAbilities) {
      const baseAcquired = acquired.split('(')[0].trim().toLowerCase();
      if (baseAcquired.match(/^species enem(?:y|ies)\s*(?:i{1,3}|iv|v|\d+)?$/i)) {
        seCount++;
      }
    }
    return seCount >= requiredCount;
  }
  
  for (const acquired of acquiredAbilities) {
    const baseAcquired = acquired.split('(')[0].trim().toLowerCase();
    const normalizedAcquired = normalizeApostrophes(acquired.toLowerCase().trim());
    
    // For "Language" abilities, require exact match (Language (X) != Language (Y))
    if (baseName === 'language') {
      if (normalizedAcquired === normalizedFullName) {
        return true;
      }
    } else {
      // For other abilities, base name matching is fine
      if (baseAcquired === baseName) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if an ability is repeatable (can be taken multiple times)
 */
function isRepeatableAbility(abilityName) {
  const baseName = abilityName.split('(')[0].trim();
  return REPEATABLE_ABILITIES.hasOwnProperty(baseName);
}

/**
 * Get the repeatable ability info
 */
function getRepeatableAbilityInfo(abilityName) {
  const baseName = abilityName.split('(')[0].trim();
  return REPEATABLE_ABILITIES[baseName] || null;
}

// Make available globally
window.RANKED_CLASS_ABILITIES = RANKED_CLASS_ABILITIES;
window.REPEATABLE_ABILITIES = REPEATABLE_ABILITIES;
window.getRankedAbilitiesForClass = getRankedAbilitiesForClass;
window.getAllRankedAbilitiesUpToRank = getAllRankedAbilitiesUpToRank;
window.checkAbilityPrereqs = checkAbilityPrereqs;
window.hasAbility = hasAbility;
window.isRepeatableAbility = isRepeatableAbility;
window.getRepeatableAbilityInfo = getRepeatableAbilityInfo;
