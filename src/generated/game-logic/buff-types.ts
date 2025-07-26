/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.104Z
 */

import { z } from 'zod'
import { BuffTypeHridEnum, BuffTypeSchema, type BuffType } from '../schemas/zod/buff-types.js'
// Re-export HRID enum from schema
export { BuffTypeHridEnum } from '../schemas/zod/buff-types.js'
// Re-export schema
export { BuffTypeSchema } from '../schemas/zod/buff-types.js'

// Type definitions
type BuffTypeHrid = z.infer<typeof BuffTypeHridEnum>

// Data
export const BUFFTYPES: Record<BuffTypeHrid, BuffType> = {
  '/buff_types/accuracy': {
    "hrid": "/buff_types/accuracy",
    "isCombat": true,
    "name": "Accuracy",
    "description": "Increases accuracy rating",
    "debuffDescription": "Decreases accuracy rating",
    "sortIndex": 36
  },
  '/buff_types/action_level': {
    "hrid": "/buff_types/action_level",
    "isCombat": false,
    "name": "Action Level",
    "description": "Increases required levels for the action",
    "debuffDescription": "Decreases required levels for the action",
    "sortIndex": 22
  },
  '/buff_types/action_speed': {
    "hrid": "/buff_types/action_speed",
    "isCombat": false,
    "name": "Action Speed",
    "description": "Decreases time cost for the action",
    "debuffDescription": "Increases time cost for the action",
    "sortIndex": 5
  },
  '/buff_types/alchemy_level': {
    "hrid": "/buff_types/alchemy_level",
    "isCombat": false,
    "name": "Alchemy Level",
    "description": "Buffs alchemy level",
    "debuffDescription": "Debuffs alchemy level",
    "sortIndex": 15
  },
  '/buff_types/alchemy_success': {
    "hrid": "/buff_types/alchemy_success",
    "isCombat": false,
    "name": "Alchemy Success",
    "description": "Multiplicative bonus to success rate while alchemizing",
    "debuffDescription": "Multiplicative penalty to success rate while alchemizing",
    "sortIndex": 3
  },
  '/buff_types/armor': {
    "hrid": "/buff_types/armor",
    "isCombat": true,
    "name": "Armor",
    "description": "Decreases physical damage taken",
    "debuffDescription": "Increases physical damage taken",
    "sortIndex": 44
  },
  '/buff_types/artisan': {
    "hrid": "/buff_types/artisan",
    "isCombat": false,
    "name": "Artisan",
    "description": "Reduces required materials during production",
    "debuffDescription": "Increases required materials during production",
    "sortIndex": 20
  },
  '/buff_types/attack_level': {
    "hrid": "/buff_types/attack_level",
    "isCombat": true,
    "name": "Attack Level",
    "description": "Buffs attack level",
    "debuffDescription": "Debuffs attack level",
    "sortIndex": 28
  },
  '/buff_types/attack_speed': {
    "hrid": "/buff_types/attack_speed",
    "isCombat": true,
    "name": "Attack Speed",
    "description": "Increases auto attack speed",
    "debuffDescription": "Decreases auto attack speed",
    "sortIndex": 32
  },
  '/buff_types/blessed': {
    "hrid": "/buff_types/blessed",
    "isCombat": false,
    "name": "Blessed",
    "description": "Chance to gain +2 instead of +1 on enhancing success",
    "debuffDescription": "Lowers chance to gain +2 instead of +1 on enhancing success",
    "sortIndex": 21
  },
  '/buff_types/brewing_level': {
    "hrid": "/buff_types/brewing_level",
    "isCombat": false,
    "name": "Brewing Level",
    "description": "Buffs brewing level",
    "debuffDescription": "Debuffs level",
    "sortIndex": 14
  },
  '/buff_types/cast_speed': {
    "hrid": "/buff_types/cast_speed",
    "isCombat": true,
    "name": "Cast Speed",
    "description": "Increases ability casting speed",
    "debuffDescription": "Decreases ability casting speed",
    "sortIndex": 33
  },
  '/buff_types/cheesesmithing_level': {
    "hrid": "/buff_types/cheesesmithing_level",
    "isCombat": false,
    "name": "Cheesesmithing Level",
    "description": "Buffs cheesesmithing level",
    "debuffDescription": "Debuffs cheesesmithing level",
    "sortIndex": 10
  },
  '/buff_types/combat_drop_quantity': {
    "hrid": "/buff_types/combat_drop_quantity",
    "isCombat": true,
    "name": "Combat Drop Quantity",
    "description": "Increases quantity of combat loot",
    "debuffDescription": "Decreases quantity of combat loot",
    "sortIndex": 58
  },
  '/buff_types/combat_drop_rate': {
    "hrid": "/buff_types/combat_drop_rate",
    "isCombat": true,
    "name": "Combat Drop Rate",
    "description": "Increases drop rate of combat loot",
    "debuffDescription": "Decreases drop rate of combat loot",
    "sortIndex": 57
  },
  '/buff_types/cooking_level': {
    "hrid": "/buff_types/cooking_level",
    "isCombat": false,
    "name": "Cooking Level",
    "description": "Buffs cooking level",
    "debuffDescription": "Debuffs cooking level",
    "sortIndex": 13
  },
  '/buff_types/crafting_level': {
    "hrid": "/buff_types/crafting_level",
    "isCombat": false,
    "name": "Crafting Level",
    "description": "Buffs crafting level",
    "debuffDescription": "Debuffs crafting level",
    "sortIndex": 11
  },
  '/buff_types/critical_damage': {
    "hrid": "/buff_types/critical_damage",
    "isCombat": true,
    "name": "Critical Damage",
    "description": "Increases critical damage",
    "debuffDescription": "Decreases critical damage",
    "sortIndex": 35
  },
  '/buff_types/critical_rate': {
    "hrid": "/buff_types/critical_rate",
    "isCombat": true,
    "name": "Critical Rate",
    "description": "Increases critical rate",
    "debuffDescription": "Decreases critical rate",
    "sortIndex": 34
  },
  '/buff_types/damage': {
    "hrid": "/buff_types/damage",
    "isCombat": true,
    "name": "Damage",
    "description": "Increases damage",
    "debuffDescription": "Decreases damage",
    "sortIndex": 37
  },
  '/buff_types/damage_taken': {
    "hrid": "/buff_types/damage_taken",
    "isCombat": true,
    "name": "Damage Taken",
    "description": "Increases damage taken",
    "debuffDescription": "Decreases damage taken",
    "sortIndex": 48
  },
  '/buff_types/defense_level': {
    "hrid": "/buff_types/defense_level",
    "isCombat": true,
    "name": "Defense Level",
    "description": "Buffs defense level",
    "debuffDescription": "Debuffs defense level",
    "sortIndex": 27
  },
  '/buff_types/efficiency': {
    "hrid": "/buff_types/efficiency",
    "isCombat": false,
    "name": "Efficiency",
    "description": "Chance of repeating the action instantly",
    "debuffDescription": "Lowers chance of repeating the action instantly",
    "sortIndex": 2
  },
  '/buff_types/elemental_thorns': {
    "hrid": "/buff_types/elemental_thorns",
    "isCombat": true,
    "name": "Elemental Thorns",
    "description": "Reflects a percentage of your armor as damage back to the attacker",
    "debuffDescription": "Reduces elemental thorns",
    "sortIndex": 52
  },
  '/buff_types/enhancing_level': {
    "hrid": "/buff_types/enhancing_level",
    "isCombat": false,
    "name": "Enhancing Level",
    "description": "Buffs enhancing level",
    "debuffDescription": "Debuffs enhancing level",
    "sortIndex": 16
  },
  '/buff_types/enhancing_success': {
    "hrid": "/buff_types/enhancing_success",
    "isCombat": false,
    "name": "Enhancing Success",
    "description": "Multiplicative bonus to success rate while enhancing",
    "debuffDescription": "Multiplicative penalty to success rate while enhancing",
    "sortIndex": 4
  },
  '/buff_types/essence_find': {
    "hrid": "/buff_types/essence_find",
    "isCombat": false,
    "name": "Essence Find",
    "description": "Increases drop rate of essences",
    "debuffDescription": "Decreases drop rate of essences",
    "sortIndex": 23
  },
  '/buff_types/evasion': {
    "hrid": "/buff_types/evasion",
    "isCombat": true,
    "name": "Evasion",
    "description": "Increases evasion rating",
    "debuffDescription": "Decreases evasion rating",
    "sortIndex": 43
  },
  '/buff_types/fire_amplify': {
    "hrid": "/buff_types/fire_amplify",
    "isCombat": true,
    "name": "Fire Amplify",
    "description": "Increases fire damage",
    "debuffDescription": "Decreases fire damage",
    "sortIndex": 41
  },
  '/buff_types/fire_resistance': {
    "hrid": "/buff_types/fire_resistance",
    "isCombat": true,
    "name": "Fire Resistance",
    "description": "Decreases fire damage taken",
    "debuffDescription": "Increases fire damage taken",
    "sortIndex": 47
  },
  '/buff_types/foraging_level': {
    "hrid": "/buff_types/foraging_level",
    "isCombat": false,
    "name": "Foraging Level",
    "description": "Buffs foraging level",
    "debuffDescription": "Debuffs foraging level",
    "sortIndex": 8
  },
  '/buff_types/gathering': {
    "hrid": "/buff_types/gathering",
    "isCombat": false,
    "name": "Gathering",
    "description": "Increases gathering quantity",
    "debuffDescription": "Decreases gathering quantity",
    "sortIndex": 1
  },
  '/buff_types/gourmet': {
    "hrid": "/buff_types/gourmet",
    "isCombat": false,
    "name": "Gourmet",
    "description": "Chance to produce an additional item for free",
    "debuffDescription": "Lowers chance to produce an additional item for free",
    "sortIndex": 17
  },
  '/buff_types/healing_amplify': {
    "hrid": "/buff_types/healing_amplify",
    "isCombat": true,
    "name": "Healing Amplify",
    "description": "Increases healing amount",
    "debuffDescription": "Decreases healing amount",
    "sortIndex": 42
  },
  '/buff_types/hp_regen': {
    "hrid": "/buff_types/hp_regen",
    "isCombat": true,
    "name": "HP Regen",
    "description": "Increases HP regeneration",
    "debuffDescription": "Decreases HP regeneration",
    "sortIndex": 54
  },
  '/buff_types/intelligence_level': {
    "hrid": "/buff_types/intelligence_level",
    "isCombat": true,
    "name": "Intelligence Level",
    "description": "Buffs intelligence level",
    "debuffDescription": "Debuffs intelligence level",
    "sortIndex": 26
  },
  '/buff_types/life_steal': {
    "hrid": "/buff_types/life_steal",
    "isCombat": true,
    "name": "Life Steal",
    "description": "Gains life steal on auto attacks",
    "debuffDescription": "Reduces life steal",
    "sortIndex": 49
  },
  '/buff_types/magic_level': {
    "hrid": "/buff_types/magic_level",
    "isCombat": true,
    "name": "Magic Level",
    "description": "Buffs magic level",
    "debuffDescription": "Debuffs magic level",
    "sortIndex": 31
  },
  '/buff_types/mana_leech': {
    "hrid": "/buff_types/mana_leech",
    "isCombat": true,
    "name": "Mana Leech",
    "description": "Gains mana leech on auto attacks",
    "debuffDescription": "Reduces mana leech",
    "sortIndex": 50
  },
  '/buff_types/milking_level': {
    "hrid": "/buff_types/milking_level",
    "isCombat": false,
    "name": "Milking Level",
    "description": "Buffs milking level",
    "debuffDescription": "Debuffs milking level",
    "sortIndex": 7
  },
  '/buff_types/mp_regen': {
    "hrid": "/buff_types/mp_regen",
    "isCombat": true,
    "name": "MP Regen",
    "description": "Increases MP regeneration",
    "debuffDescription": "Decreases MP regeneration",
    "sortIndex": 55
  },
  '/buff_types/nature_amplify': {
    "hrid": "/buff_types/nature_amplify",
    "isCombat": true,
    "name": "Nature Amplify",
    "description": "Increases nature damage",
    "debuffDescription": "Decreases nature damage",
    "sortIndex": 40
  },
  '/buff_types/nature_resistance': {
    "hrid": "/buff_types/nature_resistance",
    "isCombat": true,
    "name": "Nature Resistance",
    "description": "Decreases nature damage taken",
    "debuffDescription": "Increases nature damage taken",
    "sortIndex": 46
  },
  '/buff_types/physical_amplify': {
    "hrid": "/buff_types/physical_amplify",
    "isCombat": true,
    "name": "Physical Amplify",
    "description": "Increases physical damage",
    "debuffDescription": "Decreases physical damage",
    "sortIndex": 38
  },
  '/buff_types/physical_thorns': {
    "hrid": "/buff_types/physical_thorns",
    "isCombat": true,
    "name": "Physical Thorns",
    "description": "Reflects a percentage of your armor as damage back to the attacker",
    "debuffDescription": "Reduces physical thorns",
    "sortIndex": 51
  },
  '/buff_types/power_level': {
    "hrid": "/buff_types/power_level",
    "isCombat": true,
    "name": "Power Level",
    "description": "Buffs power level",
    "debuffDescription": "Debuffs power level",
    "sortIndex": 29
  },
  '/buff_types/processing': {
    "hrid": "/buff_types/processing",
    "isCombat": false,
    "name": "Processing",
    "description": "Chance to instantly convert gathered resource into processed material (cheese, fabric, and lumber)",
    "debuffDescription": "Lowers chance to convert gathered resource into processed material (cheese, fabric, and lumber)",
    "sortIndex": 19
  },
  '/buff_types/ranged_level': {
    "hrid": "/buff_types/ranged_level",
    "isCombat": true,
    "name": "Ranged Level",
    "description": "Buffs ranged level",
    "debuffDescription": "Debuffs ranged level",
    "sortIndex": 30
  },
  '/buff_types/rare_find': {
    "hrid": "/buff_types/rare_find",
    "isCombat": false,
    "name": "Rare Find",
    "description": "Increases rare item drop rate",
    "debuffDescription": "Decreases rare item drop rate",
    "sortIndex": 24
  },
  '/buff_types/stamina_level': {
    "hrid": "/buff_types/stamina_level",
    "isCombat": true,
    "name": "Stamina Level",
    "description": "Buffs stamina level",
    "debuffDescription": "Debuffs stamina level",
    "sortIndex": 25
  },
  '/buff_types/tailoring_level': {
    "hrid": "/buff_types/tailoring_level",
    "isCombat": false,
    "name": "Tailoring Level",
    "description": "Buffs tailoring level",
    "debuffDescription": "Debuffs tailoring level",
    "sortIndex": 12
  },
  '/buff_types/task_action_speed': {
    "hrid": "/buff_types/task_action_speed",
    "isCombat": false,
    "name": "Task Action Speed",
    "description": "Decreases time cost for task actions",
    "debuffDescription": "Increases time cost for task actions",
    "sortIndex": 6
  },
  '/buff_types/tenacity': {
    "hrid": "/buff_types/tenacity",
    "isCombat": true,
    "name": "Tenacity",
    "description": "Reduces chance of being blinded, silenced, or stunned",
    "debuffDescription": "Increases chance of being blinded, silenced, or stunned",
    "sortIndex": 53
  },
  '/buff_types/threat': {
    "hrid": "/buff_types/threat",
    "isCombat": true,
    "name": "Threat",
    "description": "Increases chance of being targeted in combat",
    "debuffDescription": "Decreases chance of being targeted in combat",
    "sortIndex": 56
  },
  '/buff_types/water_amplify': {
    "hrid": "/buff_types/water_amplify",
    "isCombat": true,
    "name": "Water Amplify",
    "description": "Increases water damage",
    "debuffDescription": "Decreases water damage",
    "sortIndex": 39
  },
  '/buff_types/water_resistance': {
    "hrid": "/buff_types/water_resistance",
    "isCombat": true,
    "name": "Water Resistance",
    "description": "Decreases water damage taken",
    "debuffDescription": "Increases water damage taken",
    "sortIndex": 45
  },
  '/buff_types/wisdom': {
    "hrid": "/buff_types/wisdom",
    "isCombat": false,
    "name": "Wisdom",
    "description": "Increases experience gained",
    "debuffDescription": "Decreases experience gained",
    "sortIndex": 18
  },
  '/buff_types/woodcutting_level': {
    "hrid": "/buff_types/woodcutting_level",
    "isCombat": false,
    "name": "Woodcutting Level",
    "description": "Buffs woodcutting level",
    "debuffDescription": "Debuffs woodcutting level",
    "sortIndex": 9
  }
} as const satisfies Record<BuffTypeHrid, BuffType>

// HRID utilities

/**
 * Check if a bufftype HRID is valid
 */
export function validateBuffTypeHrid(hrid: string): hrid is BuffTypeHrid {
  return hrid in BUFFTYPES
}

/**
 * Check if a bufftype exists
 */
export function bufftypeExists(hrid: string): boolean {
  return hrid in BUFFTYPES
}

// Getter functions
export function getBuffType(hrid: BuffTypeHrid): BuffType {
  return BUFFTYPES[hrid]
}

export function getAllBuffTypes(): BuffType[] {
  return Object.values(BUFFTYPES)
}

export function getBuffTypesSortedByIndex(): BuffType[] {
  return getAllBuffTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { BuffType }
export type { BuffTypeHrid }
export type BuffTypeId = keyof typeof BUFFTYPES
export type BuffTypeData = typeof BUFFTYPES

/**
 * Get the display name of a buff type
 */
export function getBuffTypeName(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].name
}

/**
 * Get the buff description (positive effect)
 */
export function getBuffDescription(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].description
}

/**
 * Get the debuff description (negative effect)
 */
export function getDebuffDescription(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].debuffDescription
}

/**
 * Check if a buff type is combat-related
 */
export function isCombatBuff(hrid: BuffTypeHrid): boolean {
  return BUFFTYPES[hrid].isCombat
}

/**
 * Check if a buff type is non-combat (skilling)
 */
export function isNonCombatBuff(hrid: BuffTypeHrid): boolean {
  return !BUFFTYPES[hrid].isCombat
}

/**
 * Check if a buff type is a level buff
 */
export function isLevelBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_level')
}

/**
 * Check if a buff type is a resistance buff
 */
export function isResistanceBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_resistance')
}

/**
 * Check if a buff type is an amplify buff
 */
export function isAmplifyBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_amplify')
}

/**
 * Check if a buff type is a thorns buff
 */
export function isThornsBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_thorns')
}

/**
 * Get all combat buff types
 */
export function getCombatBuffTypes(): readonly string[] {
  return [
  "/buff_types/accuracy",
  "/buff_types/armor",
  "/buff_types/attack_level",
  "/buff_types/attack_speed",
  "/buff_types/cast_speed",
  "/buff_types/combat_drop_quantity",
  "/buff_types/combat_drop_rate",
  "/buff_types/critical_damage",
  "/buff_types/critical_rate",
  "/buff_types/damage",
  "/buff_types/damage_taken",
  "/buff_types/defense_level",
  "/buff_types/elemental_thorns",
  "/buff_types/evasion",
  "/buff_types/fire_amplify",
  "/buff_types/fire_resistance",
  "/buff_types/healing_amplify",
  "/buff_types/hp_regen",
  "/buff_types/intelligence_level",
  "/buff_types/life_steal",
  "/buff_types/magic_level",
  "/buff_types/mana_leech",
  "/buff_types/mp_regen",
  "/buff_types/nature_amplify",
  "/buff_types/nature_resistance",
  "/buff_types/physical_amplify",
  "/buff_types/physical_thorns",
  "/buff_types/power_level",
  "/buff_types/ranged_level",
  "/buff_types/stamina_level",
  "/buff_types/tenacity",
  "/buff_types/threat",
  "/buff_types/water_amplify",
  "/buff_types/water_resistance"
]
}

/**
 * Get all non-combat (skilling) buff types
 */
export function getNonCombatBuffTypes(): readonly string[] {
  return [
  "/buff_types/action_level",
  "/buff_types/action_speed",
  "/buff_types/alchemy_level",
  "/buff_types/alchemy_success",
  "/buff_types/artisan",
  "/buff_types/blessed",
  "/buff_types/brewing_level",
  "/buff_types/cheesesmithing_level",
  "/buff_types/cooking_level",
  "/buff_types/crafting_level",
  "/buff_types/efficiency",
  "/buff_types/enhancing_level",
  "/buff_types/enhancing_success",
  "/buff_types/essence_find",
  "/buff_types/foraging_level",
  "/buff_types/gathering",
  "/buff_types/gourmet",
  "/buff_types/milking_level",
  "/buff_types/processing",
  "/buff_types/rare_find",
  "/buff_types/tailoring_level",
  "/buff_types/task_action_speed",
  "/buff_types/wisdom",
  "/buff_types/woodcutting_level"
]
}

/**
 * Get all level buff types
 */
export function getLevelBuffTypes(): readonly string[] {
  return [
  "/buff_types/action_level",
  "/buff_types/alchemy_level",
  "/buff_types/attack_level",
  "/buff_types/brewing_level",
  "/buff_types/cheesesmithing_level",
  "/buff_types/cooking_level",
  "/buff_types/crafting_level",
  "/buff_types/defense_level",
  "/buff_types/enhancing_level",
  "/buff_types/foraging_level",
  "/buff_types/intelligence_level",
  "/buff_types/magic_level",
  "/buff_types/milking_level",
  "/buff_types/power_level",
  "/buff_types/ranged_level",
  "/buff_types/stamina_level",
  "/buff_types/tailoring_level",
  "/buff_types/woodcutting_level"
]
}

/**
 * Get all resistance buff types
 */
export function getResistanceBuffTypes(): readonly string[] {
  return [
  "/buff_types/fire_resistance",
  "/buff_types/nature_resistance",
  "/buff_types/water_resistance"
]
}

/**
 * Get all amplify buff types
 */
export function getAmplifyBuffTypes(): readonly string[] {
  return [
  "/buff_types/fire_amplify",
  "/buff_types/healing_amplify",
  "/buff_types/nature_amplify",
  "/buff_types/physical_amplify",
  "/buff_types/water_amplify"
]
}

/**
 * Get all stat buff types (accuracy, armor, damage, etc.)
 */
export function getStatBuffTypes(): readonly string[] {
  return [
  "/buff_types/accuracy",
  "/buff_types/armor",
  "/buff_types/attack_speed",
  "/buff_types/cast_speed",
  "/buff_types/critical_damage",
  "/buff_types/critical_rate",
  "/buff_types/damage",
  "/buff_types/evasion",
  "/buff_types/hp_regen",
  "/buff_types/mp_regen"
]
}

/**
 * Get all thorns buff types
 */
export function getThornsBuffTypes(): readonly string[] {
  return [
  "/buff_types/elemental_thorns",
  "/buff_types/physical_thorns"
]
}

/**
 * Get all buff types sorted by their sortIndex
 */
export function getBuffTypesSorted(): BuffType[] {
  return Object.values(BUFFTYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}

// Export grouped constants for easier access
export const COMBAT_BUFFTYPES = [
  "/buff_types/accuracy",
  "/buff_types/armor",
  "/buff_types/attack_level",
  "/buff_types/attack_speed",
  "/buff_types/cast_speed",
  "/buff_types/combat_drop_quantity",
  "/buff_types/combat_drop_rate",
  "/buff_types/critical_damage",
  "/buff_types/critical_rate",
  "/buff_types/damage",
  "/buff_types/damage_taken",
  "/buff_types/defense_level",
  "/buff_types/elemental_thorns",
  "/buff_types/evasion",
  "/buff_types/fire_amplify",
  "/buff_types/fire_resistance",
  "/buff_types/healing_amplify",
  "/buff_types/hp_regen",
  "/buff_types/intelligence_level",
  "/buff_types/life_steal",
  "/buff_types/magic_level",
  "/buff_types/mana_leech",
  "/buff_types/mp_regen",
  "/buff_types/nature_amplify",
  "/buff_types/nature_resistance",
  "/buff_types/physical_amplify",
  "/buff_types/physical_thorns",
  "/buff_types/power_level",
  "/buff_types/ranged_level",
  "/buff_types/stamina_level",
  "/buff_types/tenacity",
  "/buff_types/threat",
  "/buff_types/water_amplify",
  "/buff_types/water_resistance"
] as const

export const NON_COMBAT_BUFFTYPES = [
  "/buff_types/action_level",
  "/buff_types/action_speed",
  "/buff_types/alchemy_level",
  "/buff_types/alchemy_success",
  "/buff_types/artisan",
  "/buff_types/blessed",
  "/buff_types/brewing_level",
  "/buff_types/cheesesmithing_level",
  "/buff_types/cooking_level",
  "/buff_types/crafting_level",
  "/buff_types/efficiency",
  "/buff_types/enhancing_level",
  "/buff_types/enhancing_success",
  "/buff_types/essence_find",
  "/buff_types/foraging_level",
  "/buff_types/gathering",
  "/buff_types/gourmet",
  "/buff_types/milking_level",
  "/buff_types/processing",
  "/buff_types/rare_find",
  "/buff_types/tailoring_level",
  "/buff_types/task_action_speed",
  "/buff_types/wisdom",
  "/buff_types/woodcutting_level"
] as const

export const LEVEL_BUFFTYPES = [
  "/buff_types/action_level",
  "/buff_types/alchemy_level",
  "/buff_types/attack_level",
  "/buff_types/brewing_level",
  "/buff_types/cheesesmithing_level",
  "/buff_types/cooking_level",
  "/buff_types/crafting_level",
  "/buff_types/defense_level",
  "/buff_types/enhancing_level",
  "/buff_types/foraging_level",
  "/buff_types/intelligence_level",
  "/buff_types/magic_level",
  "/buff_types/milking_level",
  "/buff_types/power_level",
  "/buff_types/ranged_level",
  "/buff_types/stamina_level",
  "/buff_types/tailoring_level",
  "/buff_types/woodcutting_level"
] as const

export const RESISTANCE_BUFFTYPES = [
  "/buff_types/fire_resistance",
  "/buff_types/nature_resistance",
  "/buff_types/water_resistance"
] as const

export const AMPLIFY_BUFFTYPES = [
  "/buff_types/fire_amplify",
  "/buff_types/healing_amplify",
  "/buff_types/nature_amplify",
  "/buff_types/physical_amplify",
  "/buff_types/water_amplify"
] as const

export const STAT_BUFFTYPES = [
  "/buff_types/accuracy",
  "/buff_types/armor",
  "/buff_types/attack_speed",
  "/buff_types/cast_speed",
  "/buff_types/critical_damage",
  "/buff_types/critical_rate",
  "/buff_types/damage",
  "/buff_types/evasion",
  "/buff_types/hp_regen",
  "/buff_types/mp_regen"
] as const

export const THORNS_BUFFTYPES = [
  "/buff_types/elemental_thorns",
  "/buff_types/physical_thorns"
] as const