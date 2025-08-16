/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.685Z
 */

import { z } from 'zod'
import { AbilityHridEnum, AbilitySchema, type Ability } from '../schemas/zod/abilities.js'
// Re-export HRID enum from schema
export { AbilityHridEnum } from '../schemas/zod/abilities.js'
// Re-export schema
export { AbilitySchema } from '../schemas/zod/abilities.js'

// Type definitions
type AbilityHrid = z.infer<typeof AbilityHridEnum>

// Data
export const ABILITIES: Record<AbilityHrid, Ability> = {
  '/abilities/aqua_arrow': {
    "hrid": "/abilities/aqua_arrow",
    "name": "Aqua Arrow",
    "description": "Shoots an arrow made of water at the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 18000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/water",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.9,
        "baseDamageRatioLevelBonus": 0.009,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 15
  },
  '/abilities/aqua_aura': {
    "hrid": "/abilities/aqua_aura",
    "name": "Aqua Aura",
    "description": "Increases water amplify and resistance for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/aqua_aura_water_amplify",
            "typeHrid": "/buff_types/water_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.08,
            "flatBoostLevelBonus": 0.0016,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/aqua_aura_water_resistance",
            "typeHrid": "/buff_types/water_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 4,
            "flatBoostLevelBonus": 0.08,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/aqua_aura_water_amplify",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 53
  },
  '/abilities/arcane_reflection': {
    "hrid": "/abilities/arcane_reflection",
    "name": "Arcane Reflection",
    "description": "Gains elemental thorns temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/arcane_reflection",
            "typeHrid": "/buff_types/elemental_thorns",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.25,
            "flatBoostLevelBonus": 0.0025,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/arcane_reflection",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 47
  },
  '/abilities/berserk': {
    "hrid": "/abilities/berserk",
    "name": "Berserk",
    "description": "Greatly increases physical damage temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/berserk",
            "typeHrid": "/buff_types/physical_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.18,
            "flatBoostLevelBonus": 0.0018,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/berserk",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 43
  },
  '/abilities/cleave': {
    "hrid": "/abilities/cleave",
    "name": "Cleave",
    "description": "Cleaves all enemies",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/slash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.5,
        "baseDamageRatioLevelBonus": 0.005,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 6
  },
  '/abilities/crippling_slash': {
    "hrid": "/abilities/crippling_slash",
    "name": "Crippling Slash",
    "description": "Slashes all enemies and reduce their damage",
    "isSpecialAbility": false,
    "manaCost": 55,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/slash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/crippling_slash",
            "typeHrid": "/buff_types/damage",
            "ratioBoost": -0.12,
            "ratioBoostLevelBonus": -0.0012,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 8
  },
  '/abilities/critical_aura': {
    "hrid": "/abilities/critical_aura",
    "name": "Critical Aura",
    "description": "Increases critical rate for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/critical_aura",
            "typeHrid": "/buff_types/critical_rate",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.03,
            "flatBoostLevelBonus": 0.0006,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/critical_aura",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 57
  },
  '/abilities/elemental_affinity': {
    "hrid": "/abilities/elemental_affinity",
    "name": "Elemental Affinity",
    "description": "Greatly increases elemental damage temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/elemental_affinity_water_amplify",
            "typeHrid": "/buff_types/water_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.4,
            "flatBoostLevelBonus": 0.004,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          },
          {
            "uniqueHrid": "/buff_uniques/elemental_affinity_nature_amplify",
            "typeHrid": "/buff_types/nature_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.4,
            "flatBoostLevelBonus": 0.004,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          },
          {
            "uniqueHrid": "/buff_uniques/elemental_affinity_fire_amplify",
            "typeHrid": "/buff_types/fire_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.4,
            "flatBoostLevelBonus": 0.004,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/elemental_affinity_water_amplify",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 45
  },
  '/abilities/elusiveness': {
    "hrid": "/abilities/elusiveness",
    "name": "Elusiveness",
    "description": "Greatly increases evasion temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/elusiveness",
            "typeHrid": "/buff_types/evasion",
            "ratioBoost": 0.2,
            "ratioBoostLevelBonus": 0.002,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/elusiveness",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 41
  },
  '/abilities/entangle': {
    "hrid": "/abilities/entangle",
    "name": "Entangle",
    "description": "Entangles the targeted enemy, dealing damage with chance to stun",
    "isSpecialAbility": false,
    "manaCost": 10,
    "cooldownDuration": 0,
    "castDuration": 3000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/nature",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.52,
        "baseDamageRatioLevelBonus": 0.0026,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0.1,
        "stunDuration": 2000000000,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 26
  },
  '/abilities/fierce_aura': {
    "hrid": "/abilities/fierce_aura",
    "name": "Fierce Aura",
    "description": "Increases physical amplify and armor for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/fierce_aura_physical_amplify",
            "typeHrid": "/buff_types/physical_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.06,
            "flatBoostLevelBonus": 0.0012,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/fierce_aura_armor",
            "typeHrid": "/buff_types/armor",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 4,
            "flatBoostLevelBonus": 0.08,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/fierce_aura_physical_amplify",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 52
  },
  '/abilities/fireball': {
    "hrid": "/abilities/fireball",
    "name": "Fireball",
    "description": "Casts a fireball at the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 10,
    "cooldownDuration": 0,
    "castDuration": 3000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/fire",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.003,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 30
  },
  '/abilities/firestorm': {
    "hrid": "/abilities/firestorm",
    "name": "Firestorm",
    "description": "Casts a firestorm at all enemies",
    "isSpecialAbility": false,
    "manaCost": 75,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/fire",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 1,
        "damageOverTimeDuration": 6000000000,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 32
  },
  '/abilities/flame_arrow': {
    "hrid": "/abilities/flame_arrow",
    "name": "Flame Arrow",
    "description": "Shoots a flaming arrow at the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 18000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/fire",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.9,
        "baseDamageRatioLevelBonus": 0.009,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 16
  },
  '/abilities/flame_aura': {
    "hrid": "/abilities/flame_aura",
    "name": "Flame Aura",
    "description": "Increases fire amplify and resistance for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/flame_aura_fire_amplify",
            "typeHrid": "/buff_types/fire_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.08,
            "flatBoostLevelBonus": 0.0016,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/flame_aura_fire_resistance",
            "typeHrid": "/buff_types/fire_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 4,
            "flatBoostLevelBonus": 0.08,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/flame_aura_fire_amplify",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 55
  },
  '/abilities/flame_blast': {
    "hrid": "/abilities/flame_blast",
    "name": "Flame Blast",
    "description": "Casts a flame blast at all enemies",
    "isSpecialAbility": false,
    "manaCost": 45,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/fire",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.8,
        "baseDamageRatioLevelBonus": 0.008,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 31
  },
  '/abilities/fracturing_impact': {
    "hrid": "/abilities/fracturing_impact",
    "name": "Fracturing Impact",
    "description": "Attacks all enemies, dealing damage and increases their damage taken",
    "isSpecialAbility": false,
    "manaCost": 55,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/smash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/fracturing_impact",
            "typeHrid": "/buff_types/damage_taken",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.05,
            "flatBoostLevelBonus": 0.0005,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 12
  },
  '/abilities/frenzy': {
    "hrid": "/abilities/frenzy",
    "name": "Frenzy",
    "description": "Greatly increases attack speed temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/frenzy",
            "typeHrid": "/buff_types/attack_speed",
            "ratioBoost": 0.24,
            "ratioBoostLevelBonus": 0.0024,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/frenzy",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 44
  },
  '/abilities/frost_surge': {
    "hrid": "/abilities/frost_surge",
    "name": "Frost Surge",
    "description": "Casts frost surge at all enemies, dealing damage and reducing evasion",
    "isSpecialAbility": false,
    "manaCost": 75,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/water",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/frost_surge",
            "typeHrid": "/buff_types/evasion",
            "ratioBoost": -0.1,
            "ratioBoostLevelBonus": -0.001,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 9000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 24
  },
  '/abilities/heal': {
    "hrid": "/abilities/heal",
    "name": "Heal",
    "description": "Casts heal on yourself",
    "isSpecialAbility": false,
    "manaCost": 60,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/heal",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.45,
        "baseDamageRatioLevelBonus": 0.0045,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/missing_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 35
  },
  '/abilities/ice_spear': {
    "hrid": "/abilities/ice_spear",
    "name": "Ice Spear",
    "description": "Casts an ice spear at the targeted enemy, dealing damage and reducing attack speed",
    "isSpecialAbility": false,
    "manaCost": 45,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/water",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 1.3,
        "baseDamageRatioLevelBonus": 0.013,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/ice_spear",
            "typeHrid": "/buff_types/attack_speed",
            "ratioBoost": -0.25,
            "ratioBoostLevelBonus": -0.0025,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 8000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 23
  },
  '/abilities/impale': {
    "hrid": "/abilities/impale",
    "name": "Impale",
    "description": "Impales the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/stab",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.9,
        "baseDamageRatioLevelBonus": 0.009,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 2
  },
  '/abilities/insanity': {
    "hrid": "/abilities/insanity",
    "name": "Insanity",
    "description": "Increases damage, attack speed, and cast speed temporarily at the cost of HP",
    "isSpecialAbility": true,
    "manaCost": 80,
    "cooldownDuration": 90000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/insanity_damage",
            "typeHrid": "/buff_types/damage",
            "ratioBoost": 0.3,
            "ratioBoostLevelBonus": 0.0015,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/insanity_attack_speed",
            "typeHrid": "/buff_types/attack_speed",
            "ratioBoost": 0.3,
            "ratioBoostLevelBonus": 0.0015,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/insanity_cast_speed",
            "typeHrid": "/buff_types/cast_speed",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.3,
            "flatBoostLevelBonus": 0.0015,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      },
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/spend_hp",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0.3,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/insanity_damage",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 50
  },
  '/abilities/invincible': {
    "hrid": "/abilities/invincible",
    "name": "Invincible",
    "description": "Tremendously increases armor, resistances, and tenacity temporarily",
    "isSpecialAbility": true,
    "manaCost": 80,
    "cooldownDuration": 90000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/invincible_armor",
            "typeHrid": "/buff_types/armor",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 700,
            "flatBoostLevelBonus": 7,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/invincible_water_resistance",
            "typeHrid": "/buff_types/water_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 700,
            "flatBoostLevelBonus": 7,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/invincible_nature_resistance",
            "typeHrid": "/buff_types/nature_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 700,
            "flatBoostLevelBonus": 7,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/invincible_fire_resistance",
            "typeHrid": "/buff_types/fire_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 700,
            "flatBoostLevelBonus": 7,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/invincible_tenacity",
            "typeHrid": "/buff_types/tenacity",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 700,
            "flatBoostLevelBonus": 7,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/invincible_armor",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 51
  },
  '/abilities/life_drain': {
    "hrid": "/abilities/life_drain",
    "name": "Life Drain",
    "description": "Drains the life force of the targeted enemy, dealing damage and healing the caster",
    "isSpecialAbility": false,
    "manaCost": 75,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/nature",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1.8,
        "baseDamageRatioLevelBonus": 0.018,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0.08,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 29
  },
  '/abilities/maim': {
    "hrid": "/abilities/maim",
    "name": "Maim",
    "description": "Maims the targeted enemy and causes bleeding",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/slash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.65,
        "baseDamageRatioLevelBonus": 0.0065,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 1,
        "damageOverTimeDuration": 9000000000,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/maim",
            "typeHrid": "/buff_types/damage_taken",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.08,
            "flatBoostLevelBonus": 0.0008,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 7
  },
  '/abilities/mana_spring': {
    "hrid": "/abilities/mana_spring",
    "name": "Mana Spring",
    "description": "Casts mana spring at all enemies, dealing damage and increasing ally MP regeneration",
    "isSpecialAbility": false,
    "manaCost": 75,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/water",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.7,
        "baseDamageRatioLevelBonus": 0.007,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      },
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/mana_spring",
            "typeHrid": "/buff_types/mp_regen",
            "ratioBoost": 0.5,
            "ratioBoostLevelBonus": 0.005,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 10000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 25
  },
  '/abilities/minor_heal': {
    "hrid": "/abilities/minor_heal",
    "name": "Minor Heal",
    "description": "Casts minor heal on yourself",
    "isSpecialAbility": false,
    "manaCost": 30,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/heal",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.3,
        "baseDamageRatioLevelBonus": 0.003,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/missing_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 34
  },
  '/abilities/natures_veil': {
    "hrid": "/abilities/natures_veil",
    "name": "Nature's Veil",
    "description": "Cast's a veil over all enemies, dealing damage with a chance to blind",
    "isSpecialAbility": false,
    "manaCost": 80,
    "cooldownDuration": 18000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/nature",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0.5,
        "blindDuration": 5000000000,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 28
  },
  '/abilities/penetrating_shot': {
    "hrid": "/abilities/penetrating_shot",
    "name": "Penetrating Shot",
    "description": "Shoots the targeted enemy. On each successful hit, will pierce and hit the next enemy",
    "isSpecialAbility": false,
    "manaCost": 55,
    "cooldownDuration": 20000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.8,
        "baseDamageRatioLevelBonus": 0.008,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 1,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 21
  },
  '/abilities/penetrating_strike': {
    "hrid": "/abilities/penetrating_strike",
    "name": "Penetrating Strike",
    "description": "Strikes the targeted enemy. On each successful hit, will pierce and hit the next enemy.",
    "isSpecialAbility": false,
    "manaCost": 55,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/stab",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.8,
        "baseDamageRatioLevelBonus": 0.008,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 1,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 4
  },
  '/abilities/pestilent_shot': {
    "hrid": "/abilities/pestilent_shot",
    "name": "Pestilent Shot",
    "description": "Shoots the targeted enemy, dealing damage and decreasing regeneration",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/pestilent_shot_hp_regen",
            "typeHrid": "/buff_types/hp_regen",
            "ratioBoost": -0.25,
            "ratioBoostLevelBonus": -0.0025,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 10000000000
          },
          {
            "uniqueHrid": "/buff_uniques/pestilent_shot_mp_regen",
            "typeHrid": "/buff_types/mp_regen",
            "ratioBoost": -0.25,
            "ratioBoostLevelBonus": -0.0025,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 10000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 20
  },
  '/abilities/poke': {
    "hrid": "/abilities/poke",
    "name": "Poke",
    "description": "Pokes the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 25,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/stab",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 1
  },
  '/abilities/precision': {
    "hrid": "/abilities/precision",
    "name": "Precision",
    "description": "Greatly increases accuracy temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/precision",
            "typeHrid": "/buff_types/accuracy",
            "ratioBoost": 0.4,
            "ratioBoostLevelBonus": 0.004,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/precision",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 42
  },
  '/abilities/promote': {
    "hrid": "/abilities/promote",
    "name": "Promote",
    "description": "Promotes a pawn",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 180000000000,
    "castDuration": 10000000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/promote",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [],
    "sortIndex": 58
  },
  '/abilities/provoke': {
    "hrid": "/abilities/provoke",
    "name": "Provoke",
    "description": "Tremendously increases threat rating",
    "isSpecialAbility": false,
    "manaCost": 150,
    "cooldownDuration": 60000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/provoke",
            "typeHrid": "/buff_types/threat",
            "ratioBoost": 5,
            "ratioBoostLevelBonus": 0.05,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 65000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [],
    "sortIndex": 39
  },
  '/abilities/puncture': {
    "hrid": "/abilities/puncture",
    "name": "Puncture",
    "description": "Punctures the targeted enemy's armor, dealing damage and temporarily reducing its armor",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/stab",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1.1,
        "baseDamageRatioLevelBonus": 0.011,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/puncture",
            "typeHrid": "/buff_types/armor",
            "ratioBoost": -0.2,
            "ratioBoostLevelBonus": -0.002,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 10000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 3
  },
  '/abilities/quick_aid': {
    "hrid": "/abilities/quick_aid",
    "name": "Quick Aid",
    "description": "Casts heal on the ally with the lowest HP percentage",
    "isSpecialAbility": false,
    "manaCost": 60,
    "cooldownDuration": 12000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "lowestHpAlly",
        "effectType": "/ability_effect_types/heal",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "",
        "baseDamageFlat": 40,
        "baseDamageFlatLevelBonus": 0.4,
        "baseDamageRatio": 0.3,
        "baseDamageRatioLevelBonus": 0.003,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_allies",
        "conditionHrid": "/combat_trigger_conditions/lowest_hp_percentage",
        "comparatorHrid": "/combat_trigger_comparators/less_than_equal",
        "value": 75
      }
    ],
    "sortIndex": 36
  },
  '/abilities/quick_shot': {
    "hrid": "/abilities/quick_shot",
    "name": "Quick Shot",
    "description": "Takes a quick shot at the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 25,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.55,
        "baseDamageRatioLevelBonus": 0.0055,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 14
  },
  '/abilities/rain_of_arrows': {
    "hrid": "/abilities/rain_of_arrows",
    "name": "Rain Of Arrows",
    "description": "Shoots a rain of arrows on all enemies",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 20000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.5,
        "baseDamageRatioLevelBonus": 0.005,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 17
  },
  '/abilities/rejuvenate': {
    "hrid": "/abilities/rejuvenate",
    "name": "Rejuvenate",
    "description": "Heals all allies",
    "isSpecialAbility": false,
    "manaCost": 90,
    "cooldownDuration": 25000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/heal",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 0.2,
        "baseDamageRatioLevelBonus": 0.002,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_allies",
        "conditionHrid": "/combat_trigger_conditions/missing_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 37
  },
  '/abilities/revive': {
    "hrid": "/abilities/revive",
    "name": "Revive",
    "description": "Revives a dead ally",
    "isSpecialAbility": true,
    "manaCost": 200,
    "cooldownDuration": 300000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "deadAlly",
        "effectType": "/ability_effect_types/revive",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "",
        "baseDamageFlat": 100,
        "baseDamageFlatLevelBonus": 1,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_allies",
        "conditionHrid": "/combat_trigger_conditions/number_of_dead_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 49
  },
  '/abilities/scratch': {
    "hrid": "/abilities/scratch",
    "name": "Scratch",
    "description": "Scratches the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 25,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/slash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 5
  },
  '/abilities/shield_bash': {
    "hrid": "/abilities/shield_bash",
    "name": "Shield Bash",
    "description": "Bashes the targeted enemy with a shield, dealing extra damage based on attacker's armor",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 12000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/smash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.3,
        "baseDamageRatioLevelBonus": 0.003,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0.6,
        "armorDamageRatioLevelBonus": 0.006,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 13
  },
  '/abilities/silencing_shot': {
    "hrid": "/abilities/silencing_shot",
    "name": "Silencing Shot",
    "description": "Takes a shot at the targeted enemy, temporarily silencing them",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0.6,
        "silenceDuration": 5000000000,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 18
  },
  '/abilities/smack': {
    "hrid": "/abilities/smack",
    "name": "Smack",
    "description": "Smacks the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 25,
    "cooldownDuration": 15000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/smash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.006,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 9
  },
  '/abilities/smoke_burst': {
    "hrid": "/abilities/smoke_burst",
    "name": "Smoke Burst",
    "description": "Casts a smoke burst at the targeted enemy, dealing damage and decreasing their accuracy",
    "isSpecialAbility": false,
    "manaCost": 75,
    "cooldownDuration": 15000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/fire",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1.8,
        "baseDamageRatioLevelBonus": 0.018,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/smoke_burst_accuracy",
            "typeHrid": "/buff_types/accuracy",
            "ratioBoost": -0.15,
            "ratioBoostLevelBonus": -0.0015,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 8000000000
          },
          {
            "uniqueHrid": "/buff_uniques/smoke_burst_evasion",
            "typeHrid": "/buff_types/evasion",
            "ratioBoost": -0.15,
            "ratioBoostLevelBonus": -0.0015,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 8000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 33
  },
  '/abilities/speed_aura': {
    "hrid": "/abilities/speed_aura",
    "name": "Speed Aura",
    "description": "Increases attack speed and cast speed for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/speed_aura_attack_speed",
            "typeHrid": "/buff_types/attack_speed",
            "ratioBoost": 0.04,
            "ratioBoostLevelBonus": 0.0008,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/speed_aura_cast_speed",
            "typeHrid": "/buff_types/cast_speed",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.04,
            "flatBoostLevelBonus": 0.0008,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/speed_aura_attack_speed",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 56
  },
  '/abilities/spike_shell': {
    "hrid": "/abilities/spike_shell",
    "name": "Spike Shell",
    "description": "Gains physical thorns temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/spike_shell",
            "typeHrid": "/buff_types/physical_thorns",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.2,
            "flatBoostLevelBonus": 0.002,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/spike_shell",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 46
  },
  '/abilities/steady_shot': {
    "hrid": "/abilities/steady_shot",
    "name": "Steady Shot",
    "description": "Takes a shot at the targeted enemy with greatly enhanced accuracy",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 800000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/ranged",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 1,
        "bonusAccuracyRatioLevelBonus": 0.01,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 19
  },
  '/abilities/stunning_blow': {
    "hrid": "/abilities/stunning_blow",
    "name": "Stunning Blow",
    "description": "Smashes the targeted enemy and has a chance to stun",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/smash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 30,
        "baseDamageFlatLevelBonus": 0.3,
        "baseDamageRatio": 1,
        "baseDamageRatioLevelBonus": 0.01,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0.7,
        "stunDuration": 3000000000,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 11
  },
  '/abilities/sweep': {
    "hrid": "/abilities/sweep",
    "name": "Sweep",
    "description": "Performs a sweeping attack on all enemies",
    "isSpecialAbility": false,
    "manaCost": 35,
    "cooldownDuration": 20000000000,
    "castDuration": 500000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/smash",
        "damageType": "/damage_types/physical",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.5,
        "baseDamageRatioLevelBonus": 0.005,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 10
  },
  '/abilities/sylvan_aura': {
    "hrid": "/abilities/sylvan_aura",
    "name": "Sylvan Aura",
    "description": "Increases nature amplify and resistance for all allies",
    "isSpecialAbility": true,
    "manaCost": 100,
    "cooldownDuration": 120000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "allAllies",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/sylvan_aura_nature_amplify",
            "typeHrid": "/buff_types/nature_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.06,
            "flatBoostLevelBonus": 0.0012,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/sylvan_aura_healing_amplify",
            "typeHrid": "/buff_types/healing_amplify",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.06,
            "flatBoostLevelBonus": 0.0012,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          },
          {
            "uniqueHrid": "/buff_uniques/sylvan_aura_nature_resistance",
            "typeHrid": "/buff_types/nature_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 4,
            "flatBoostLevelBonus": 0.08,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 120000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/sylvan_aura_nature_amplify",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 54
  },
  '/abilities/taunt': {
    "hrid": "/abilities/taunt",
    "name": "Taunt",
    "description": "Greatly increases threat rating",
    "isSpecialAbility": false,
    "manaCost": 120,
    "cooldownDuration": 60000000000,
    "castDuration": 200000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/taunt",
            "typeHrid": "/buff_types/threat",
            "ratioBoost": 2.5,
            "ratioBoostLevelBonus": 0.025,
            "flatBoost": 0,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 65000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [],
    "sortIndex": 38
  },
  '/abilities/toughness': {
    "hrid": "/abilities/toughness",
    "name": "Toughness",
    "description": "Greatly increases armor and resistances temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/toughness_armor",
            "typeHrid": "/buff_types/armor",
            "ratioBoost": 0.2,
            "ratioBoostLevelBonus": 0.002,
            "flatBoost": 20,
            "flatBoostLevelBonus": 0.2,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toughness_water_resistance",
            "typeHrid": "/buff_types/water_resistance",
            "ratioBoost": 0.2,
            "ratioBoostLevelBonus": 0.002,
            "flatBoost": 20,
            "flatBoostLevelBonus": 0.2,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toughness_nature_resistance",
            "typeHrid": "/buff_types/nature_resistance",
            "ratioBoost": 0.2,
            "ratioBoostLevelBonus": 0.002,
            "flatBoost": 20,
            "flatBoostLevelBonus": 0.2,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toughness_fire_resistance",
            "typeHrid": "/buff_types/fire_resistance",
            "ratioBoost": 0.2,
            "ratioBoostLevelBonus": 0.002,
            "flatBoost": 20,
            "flatBoostLevelBonus": 0.2,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/toughness_armor",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 40
  },
  '/abilities/toxic_pollen': {
    "hrid": "/abilities/toxic_pollen",
    "name": "Toxic Pollen",
    "description": "Casts toxic pollen at all enemies, dealing damage and decreasing armor and resistances",
    "isSpecialAbility": false,
    "manaCost": 50,
    "cooldownDuration": 18000000000,
    "castDuration": 2000000000,
    "abilityEffects": [
      {
        "targetType": "allEnemies",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/nature",
        "baseDamageFlat": 20,
        "baseDamageFlatLevelBonus": 0.2,
        "baseDamageRatio": 0.8,
        "baseDamageRatioLevelBonus": 0.008,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/toxic_pollen_armor",
            "typeHrid": "/buff_types/armor",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": -12,
            "flatBoostLevelBonus": -0.12,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toxic_pollen_water_resistance",
            "typeHrid": "/buff_types/water_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": -15,
            "flatBoostLevelBonus": -0.15,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toxic_pollen_nature_resistance",
            "typeHrid": "/buff_types/nature_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": -20,
            "flatBoostLevelBonus": -0.2,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          },
          {
            "uniqueHrid": "/buff_uniques/toxic_pollen_fire_resistance",
            "typeHrid": "/buff_types/fire_resistance",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": -15,
            "flatBoostLevelBonus": -0.15,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 12000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/number_of_active_units",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      },
      {
        "dependencyHrid": "/combat_trigger_dependencies/all_enemies",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 27
  },
  '/abilities/vampirism': {
    "hrid": "/abilities/vampirism",
    "name": "Vampirism",
    "description": "Gains lifesteal temporarily",
    "isSpecialAbility": false,
    "manaCost": 65,
    "cooldownDuration": 30000000000,
    "castDuration": 300000000,
    "abilityEffects": [
      {
        "targetType": "self",
        "effectType": "/ability_effect_types/buff",
        "combatStyleHrid": "",
        "damageType": "",
        "baseDamageFlat": 0,
        "baseDamageFlatLevelBonus": 0,
        "baseDamageRatio": 0,
        "baseDamageRatioLevelBonus": 0,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": [
          {
            "uniqueHrid": "/buff_uniques/vampirism",
            "typeHrid": "/buff_types/life_steal",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.08,
            "flatBoostLevelBonus": 0.0008,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 20000000000
          }
        ]
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/self",
        "conditionHrid": "/combat_trigger_conditions/vampirism",
        "comparatorHrid": "/combat_trigger_comparators/is_inactive",
        "value": 0
      }
    ],
    "sortIndex": 48
  },
  '/abilities/water_strike': {
    "hrid": "/abilities/water_strike",
    "name": "Water Strike",
    "description": "Casts a water strike at the targeted enemy",
    "isSpecialAbility": false,
    "manaCost": 10,
    "cooldownDuration": 0,
    "castDuration": 3000000000,
    "abilityEffects": [
      {
        "targetType": "enemy",
        "effectType": "/ability_effect_types/damage",
        "combatStyleHrid": "/combat_styles/magic",
        "damageType": "/damage_types/water",
        "baseDamageFlat": 10,
        "baseDamageFlatLevelBonus": 0.1,
        "baseDamageRatio": 0.6,
        "baseDamageRatioLevelBonus": 0.003,
        "bonusAccuracyRatio": 0,
        "bonusAccuracyRatioLevelBonus": 0,
        "damageOverTimeRatio": 0,
        "damageOverTimeDuration": 0,
        "armorDamageRatio": 0,
        "armorDamageRatioLevelBonus": 0,
        "hpDrainRatio": 0,
        "pierceChance": 0,
        "blindChance": 0,
        "blindDuration": 0,
        "silenceChance": 0,
        "silenceDuration": 0,
        "stunChance": 0,
        "stunDuration": 0,
        "spendHpRatio": 0,
        "buffs": null
      }
    ],
    "defaultCombatTriggers": [
      {
        "dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
        "conditionHrid": "/combat_trigger_conditions/current_hp",
        "comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
        "value": 1
      }
    ],
    "sortIndex": 22
  }
} as const satisfies Record<AbilityHrid, Ability>

// HRID utilities

/**
 * Check if a ability HRID is valid
 */
export function validateAbilityHrid(hrid: string): hrid is AbilityHrid {
  return hrid in ABILITIES
}

/**
 * Check if a ability exists
 */
export function abilityExists(hrid: string): boolean {
  return hrid in ABILITIES
}

// Getter functions
export function getAbility(hrid: AbilityHrid): Ability {
  return ABILITIES[hrid]
}

export function getAllAbilities(): Ability[] {
  return Object.values(ABILITIES)
}

export function getAbilitiesSortedByIndex(): Ability[] {
  return getAllAbilities().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { Ability }
export type { AbilityHrid }
export type AbilityId = keyof typeof ABILITIES
export type AbilityData = typeof ABILITIES

/**
 * Special abilities (ultimate/powerful abilities)
 */
export const SPECIAL_ABILITIES = [
  "/abilities/aqua_aura",
  "/abilities/critical_aura",
  "/abilities/fierce_aura",
  "/abilities/flame_aura",
  "/abilities/insanity",
  "/abilities/invincible",
  "/abilities/promote",
  "/abilities/revive",
  "/abilities/speed_aura",
  "/abilities/sylvan_aura"
] as const

/**
 * Normal abilities (non-special)
 */
export const NORMAL_ABILITIES = [
  "/abilities/aqua_arrow",
  "/abilities/arcane_reflection",
  "/abilities/berserk",
  "/abilities/cleave",
  "/abilities/crippling_slash",
  "/abilities/elemental_affinity",
  "/abilities/elusiveness",
  "/abilities/entangle",
  "/abilities/fireball",
  "/abilities/firestorm",
  "/abilities/flame_arrow",
  "/abilities/flame_blast",
  "/abilities/fracturing_impact",
  "/abilities/frenzy",
  "/abilities/frost_surge",
  "/abilities/heal",
  "/abilities/ice_spear",
  "/abilities/impale",
  "/abilities/life_drain",
  "/abilities/maim",
  "/abilities/mana_spring",
  "/abilities/minor_heal",
  "/abilities/natures_veil",
  "/abilities/penetrating_shot",
  "/abilities/penetrating_strike",
  "/abilities/pestilent_shot",
  "/abilities/poke",
  "/abilities/precision",
  "/abilities/provoke",
  "/abilities/puncture",
  "/abilities/quick_aid",
  "/abilities/quick_shot",
  "/abilities/rain_of_arrows",
  "/abilities/rejuvenate",
  "/abilities/scratch",
  "/abilities/shield_bash",
  "/abilities/silencing_shot",
  "/abilities/smack",
  "/abilities/smoke_burst",
  "/abilities/spike_shell",
  "/abilities/steady_shot",
  "/abilities/stunning_blow",
  "/abilities/sweep",
  "/abilities/taunt",
  "/abilities/toughness",
  "/abilities/toxic_pollen",
  "/abilities/vampirism",
  "/abilities/water_strike"
] as const

/**
 * Abilities that deal damage
 */
export const DAMAGE_ABILITIES = [
  "/abilities/aqua_arrow",
  "/abilities/cleave",
  "/abilities/crippling_slash",
  "/abilities/entangle",
  "/abilities/fireball",
  "/abilities/firestorm",
  "/abilities/flame_arrow",
  "/abilities/flame_blast",
  "/abilities/fracturing_impact",
  "/abilities/frost_surge",
  "/abilities/ice_spear",
  "/abilities/impale",
  "/abilities/life_drain",
  "/abilities/maim",
  "/abilities/mana_spring",
  "/abilities/natures_veil",
  "/abilities/penetrating_shot",
  "/abilities/penetrating_strike",
  "/abilities/pestilent_shot",
  "/abilities/poke",
  "/abilities/puncture",
  "/abilities/quick_shot",
  "/abilities/rain_of_arrows",
  "/abilities/scratch",
  "/abilities/shield_bash",
  "/abilities/silencing_shot",
  "/abilities/smack",
  "/abilities/smoke_burst",
  "/abilities/steady_shot",
  "/abilities/stunning_blow",
  "/abilities/sweep",
  "/abilities/toxic_pollen",
  "/abilities/water_strike"
] as const

/**
 * Abilities that heal
 */
export const HEALING_ABILITIES = [
  "/abilities/heal",
  "/abilities/minor_heal",
  "/abilities/quick_aid",
  "/abilities/rejuvenate"
] as const

/**
 * Abilities that apply buffs
 */
export const BUFF_ABILITIES = [
  "/abilities/aqua_aura",
  "/abilities/arcane_reflection",
  "/abilities/berserk",
  "/abilities/critical_aura",
  "/abilities/elemental_affinity",
  "/abilities/elusiveness",
  "/abilities/fierce_aura",
  "/abilities/flame_aura",
  "/abilities/frenzy",
  "/abilities/insanity",
  "/abilities/invincible",
  "/abilities/mana_spring",
  "/abilities/precision",
  "/abilities/provoke",
  "/abilities/speed_aura",
  "/abilities/spike_shell",
  "/abilities/sylvan_aura",
  "/abilities/taunt",
  "/abilities/toughness",
  "/abilities/vampirism"
] as const

/**
 * Abilities with no mana cost
 */
export const FREE_ABILITIES = [] as const

/**
 * Abilities grouped by target type
 */
export const ABILITIES_BY_TARGET_TYPE = {
  "enemy": [
    "/abilities/aqua_arrow",
    "/abilities/entangle",
    "/abilities/fireball",
    "/abilities/flame_arrow",
    "/abilities/ice_spear",
    "/abilities/impale",
    "/abilities/life_drain",
    "/abilities/maim",
    "/abilities/penetrating_shot",
    "/abilities/penetrating_strike",
    "/abilities/pestilent_shot",
    "/abilities/poke",
    "/abilities/puncture",
    "/abilities/quick_shot",
    "/abilities/scratch",
    "/abilities/shield_bash",
    "/abilities/silencing_shot",
    "/abilities/smack",
    "/abilities/smoke_burst",
    "/abilities/steady_shot",
    "/abilities/stunning_blow",
    "/abilities/water_strike"
  ],
  "allAllies": [
    "/abilities/aqua_aura",
    "/abilities/critical_aura",
    "/abilities/fierce_aura",
    "/abilities/flame_aura",
    "/abilities/mana_spring",
    "/abilities/rejuvenate",
    "/abilities/speed_aura",
    "/abilities/sylvan_aura"
  ],
  "self": [
    "/abilities/arcane_reflection",
    "/abilities/berserk",
    "/abilities/elemental_affinity",
    "/abilities/elusiveness",
    "/abilities/frenzy",
    "/abilities/heal",
    "/abilities/insanity",
    "/abilities/invincible",
    "/abilities/minor_heal",
    "/abilities/precision",
    "/abilities/promote",
    "/abilities/provoke",
    "/abilities/spike_shell",
    "/abilities/taunt",
    "/abilities/toughness",
    "/abilities/vampirism"
  ],
  "allEnemies": [
    "/abilities/cleave",
    "/abilities/crippling_slash",
    "/abilities/firestorm",
    "/abilities/flame_blast",
    "/abilities/fracturing_impact",
    "/abilities/frost_surge",
    "/abilities/mana_spring",
    "/abilities/natures_veil",
    "/abilities/rain_of_arrows",
    "/abilities/sweep",
    "/abilities/toxic_pollen"
  ],
  "lowestHpAlly": [
    "/abilities/quick_aid"
  ],
  "deadAlly": [
    "/abilities/revive"
  ]
} as const

/**
 * Abilities grouped by effect type
 */
export const ABILITIES_BY_EFFECT_TYPE = {
  "/ability_effect_types/damage": [
    "/abilities/aqua_arrow",
    "/abilities/cleave",
    "/abilities/crippling_slash",
    "/abilities/entangle",
    "/abilities/fireball",
    "/abilities/firestorm",
    "/abilities/flame_arrow",
    "/abilities/flame_blast",
    "/abilities/fracturing_impact",
    "/abilities/frost_surge",
    "/abilities/ice_spear",
    "/abilities/impale",
    "/abilities/life_drain",
    "/abilities/maim",
    "/abilities/mana_spring",
    "/abilities/natures_veil",
    "/abilities/penetrating_shot",
    "/abilities/penetrating_strike",
    "/abilities/pestilent_shot",
    "/abilities/poke",
    "/abilities/puncture",
    "/abilities/quick_shot",
    "/abilities/rain_of_arrows",
    "/abilities/scratch",
    "/abilities/shield_bash",
    "/abilities/silencing_shot",
    "/abilities/smack",
    "/abilities/smoke_burst",
    "/abilities/steady_shot",
    "/abilities/stunning_blow",
    "/abilities/sweep",
    "/abilities/toxic_pollen",
    "/abilities/water_strike"
  ],
  "/ability_effect_types/buff": [
    "/abilities/aqua_aura",
    "/abilities/arcane_reflection",
    "/abilities/berserk",
    "/abilities/critical_aura",
    "/abilities/elemental_affinity",
    "/abilities/elusiveness",
    "/abilities/fierce_aura",
    "/abilities/flame_aura",
    "/abilities/frenzy",
    "/abilities/insanity",
    "/abilities/invincible",
    "/abilities/mana_spring",
    "/abilities/precision",
    "/abilities/provoke",
    "/abilities/speed_aura",
    "/abilities/spike_shell",
    "/abilities/sylvan_aura",
    "/abilities/taunt",
    "/abilities/toughness",
    "/abilities/vampirism"
  ],
  "/ability_effect_types/heal": [
    "/abilities/heal",
    "/abilities/minor_heal",
    "/abilities/quick_aid",
    "/abilities/rejuvenate"
  ],
  "/ability_effect_types/spend_hp": [
    "/abilities/insanity"
  ],
  "/ability_effect_types/promote": [
    "/abilities/promote"
  ],
  "/ability_effect_types/revive": [
    "/abilities/revive"
  ]
} as const

/**
 * Get abilities by target type
 */
export function getAbilitiesByTargetType(targetType: string): readonly AbilityHrid[] {
	return ABILITIES_BY_TARGET_TYPE[targetType as keyof typeof ABILITIES_BY_TARGET_TYPE] || []
}

/**
 * Get abilities by effect type
 */
export function getAbilitiesByEffectType(effectType: string): readonly AbilityHrid[] {
	return ABILITIES_BY_EFFECT_TYPE[effectType as keyof typeof ABILITIES_BY_EFFECT_TYPE] || []
}

/**
 * Check if an ability is special
 */
export function isSpecialAbility(hrid: AbilityHrid): boolean {
	return ABILITIES[hrid]?.isSpecialAbility ?? false
}

/**
 * Get abilities by mana cost range
 */
export function getAbilitiesByManaCostRange(minCost: number, maxCost: number): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => ability.manaCost >= minCost && ability.manaCost <= maxCost)
		.map(([hrid]) => hrid as AbilityHrid)
}

/**
 * Check if an ability has a specific target type
 */
export function hasTargetType(hrid: AbilityHrid, targetType: string): boolean {
	const ability = ABILITIES[hrid]
	if (!ability) return false
	return ability.abilityEffects.some(effect => effect.targetType === targetType)
}

/**
 * Check if an ability has a specific effect type
 */
export function hasEffectType(hrid: AbilityHrid, effectType: string): boolean {
	const ability = ABILITIES[hrid]
	if (!ability) return false
	return ability.abilityEffects.some(effect => effect.effectType === effectType)
}

/**
 * Get abilities sorted by their sort index
 */
export function getAbilitiesSorted(): Ability[] {
	return Object.values(ABILITIES).sort((a, b) => a.sortIndex - b.sortIndex)
}

/**
 * Get abilities that use a specific combat style
 */
export function getAbilitiesByCombatStyle(combatStyleHrid: string): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => 
			ability.abilityEffects.some(effect => effect.combatStyleHrid === combatStyleHrid)
		)
		.map(([hrid]) => hrid as AbilityHrid)
}

/**
 * Get abilities that deal a specific damage type
 */
export function getAbilitiesByDamageType(damageTypeHrid: string): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => 
			ability.abilityEffects.some(effect => effect.damageType === damageTypeHrid)
		)
		.map(([hrid]) => hrid as AbilityHrid)
}