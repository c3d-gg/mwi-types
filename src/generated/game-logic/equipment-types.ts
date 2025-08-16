/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.336Z
 */

import { z } from 'zod'
import { EquipmentTypeHridEnum, EquipmentTypeSchema, type EquipmentType } from '../schemas/zod/equipment-types.js'
// Re-export HRID enum from schema
export { EquipmentTypeHridEnum } from '../schemas/zod/equipment-types.js'
// Re-export schema
export { EquipmentTypeSchema } from '../schemas/zod/equipment-types.js'

// Type definitions
type EquipmentTypeHrid = z.infer<typeof EquipmentTypeHridEnum>

// Data
export const EQUIPMENTTYPES: Record<EquipmentTypeHrid, EquipmentType> = {
  '/equipment_types/alchemy_tool': {
    "hrid": "/equipment_types/alchemy_tool",
    "name": "Alchemy Tool",
    "itemLocationHrid": "/item_locations/alchemy_tool",
    "sortIndex": 23
  },
  '/equipment_types/back': {
    "hrid": "/equipment_types/back",
    "name": "Back",
    "itemLocationHrid": "/item_locations/back",
    "sortIndex": 4
  },
  '/equipment_types/body': {
    "hrid": "/equipment_types/body",
    "name": "Body",
    "itemLocationHrid": "/item_locations/body",
    "sortIndex": 6
  },
  '/equipment_types/brewing_tool': {
    "hrid": "/equipment_types/brewing_tool",
    "name": "Brewing Tool",
    "itemLocationHrid": "/item_locations/brewing_tool",
    "sortIndex": 22
  },
  '/equipment_types/cheesesmithing_tool': {
    "hrid": "/equipment_types/cheesesmithing_tool",
    "name": "Cheesesmithing Tool",
    "itemLocationHrid": "/item_locations/cheesesmithing_tool",
    "sortIndex": 18
  },
  '/equipment_types/cooking_tool': {
    "hrid": "/equipment_types/cooking_tool",
    "name": "Cooking Tool",
    "itemLocationHrid": "/item_locations/cooking_tool",
    "sortIndex": 21
  },
  '/equipment_types/crafting_tool': {
    "hrid": "/equipment_types/crafting_tool",
    "name": "Crafting Tool",
    "itemLocationHrid": "/item_locations/crafting_tool",
    "sortIndex": 19
  },
  '/equipment_types/earrings': {
    "hrid": "/equipment_types/earrings",
    "name": "Earrings",
    "itemLocationHrid": "/item_locations/earrings",
    "sortIndex": 12
  },
  '/equipment_types/enhancing_tool': {
    "hrid": "/equipment_types/enhancing_tool",
    "name": "Enhancing Tool",
    "itemLocationHrid": "/item_locations/enhancing_tool",
    "sortIndex": 24
  },
  '/equipment_types/feet': {
    "hrid": "/equipment_types/feet",
    "name": "Feet",
    "itemLocationHrid": "/item_locations/feet",
    "sortIndex": 9
  },
  '/equipment_types/foraging_tool': {
    "hrid": "/equipment_types/foraging_tool",
    "name": "Foraging Tool",
    "itemLocationHrid": "/item_locations/foraging_tool",
    "sortIndex": 16
  },
  '/equipment_types/hands': {
    "hrid": "/equipment_types/hands",
    "name": "Hands",
    "itemLocationHrid": "/item_locations/hands",
    "sortIndex": 8
  },
  '/equipment_types/head': {
    "hrid": "/equipment_types/head",
    "name": "Head",
    "itemLocationHrid": "/item_locations/head",
    "sortIndex": 5
  },
  '/equipment_types/legs': {
    "hrid": "/equipment_types/legs",
    "name": "Legs",
    "itemLocationHrid": "/item_locations/legs",
    "sortIndex": 7
  },
  '/equipment_types/main_hand': {
    "hrid": "/equipment_types/main_hand",
    "name": "Main Hand",
    "itemLocationHrid": "/item_locations/main_hand",
    "sortIndex": 2
  },
  '/equipment_types/milking_tool': {
    "hrid": "/equipment_types/milking_tool",
    "name": "Milking Tool",
    "itemLocationHrid": "/item_locations/milking_tool",
    "sortIndex": 15
  },
  '/equipment_types/neck': {
    "hrid": "/equipment_types/neck",
    "name": "Neck",
    "itemLocationHrid": "/item_locations/neck",
    "sortIndex": 11
  },
  '/equipment_types/off_hand': {
    "hrid": "/equipment_types/off_hand",
    "name": "Off Hand",
    "itemLocationHrid": "/item_locations/off_hand",
    "sortIndex": 3
  },
  '/equipment_types/pouch': {
    "hrid": "/equipment_types/pouch",
    "name": "Pouch",
    "itemLocationHrid": "/item_locations/pouch",
    "sortIndex": 10
  },
  '/equipment_types/ring': {
    "hrid": "/equipment_types/ring",
    "name": "Ring",
    "itemLocationHrid": "/item_locations/ring",
    "sortIndex": 13
  },
  '/equipment_types/tailoring_tool': {
    "hrid": "/equipment_types/tailoring_tool",
    "name": "Tailoring Tool",
    "itemLocationHrid": "/item_locations/tailoring_tool",
    "sortIndex": 20
  },
  '/equipment_types/trinket': {
    "hrid": "/equipment_types/trinket",
    "name": "Trinket",
    "itemLocationHrid": "/item_locations/trinket",
    "sortIndex": 14
  },
  '/equipment_types/two_hand': {
    "hrid": "/equipment_types/two_hand",
    "name": "Two Hand",
    "itemLocationHrid": "/item_locations/two_hand",
    "sortIndex": 1
  },
  '/equipment_types/woodcutting_tool': {
    "hrid": "/equipment_types/woodcutting_tool",
    "name": "Woodcutting Tool",
    "itemLocationHrid": "/item_locations/woodcutting_tool",
    "sortIndex": 17
  }
} as const satisfies Record<EquipmentTypeHrid, EquipmentType>

// HRID utilities

/**
 * Check if a equipmenttype HRID is valid
 */
export function validateEquipmentTypeHrid(hrid: string): hrid is EquipmentTypeHrid {
  return hrid in EQUIPMENTTYPES
}

/**
 * Check if a equipmenttype exists
 */
export function equipmenttypeExists(hrid: string): boolean {
  return hrid in EQUIPMENTTYPES
}

// Getter functions
export function getEquipmentType(hrid: EquipmentTypeHrid): EquipmentType {
  return EQUIPMENTTYPES[hrid]
}

export function getAllEquipmentTypes(): EquipmentType[] {
  return Object.values(EQUIPMENTTYPES)
}

export function getEquipmentTypesSortedByIndex(): EquipmentType[] {
  return getAllEquipmentTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { EquipmentType }
export type { EquipmentTypeHrid }
export type EquipmentTypeId = keyof typeof EQUIPMENTTYPES
export type EquipmentTypeData = typeof EQUIPMENTTYPES


// Equipment type utilities
export function getEquipmentTypeName(hrid: EquipmentTypeHrid): string {
  return EQUIPMENTTYPES[hrid].name
}

export function getEquipmentTypeLocation(hrid: EquipmentTypeHrid): string {
  return EQUIPMENTTYPES[hrid].itemLocationHrid
}

export function getEquipmentTypeSortIndex(hrid: EquipmentTypeHrid): number {
  return EQUIPMENTTYPES[hrid].sortIndex
}

/**
 * Weapon equipment types (main hand, off hand, two hand)
 */
export const WEAPON_EQUIPMENT_TYPES = [
  "/equipment_types/main_hand",
  "/equipment_types/off_hand",
  "/equipment_types/two_hand"
] as const

/**
 * Armor equipment types (head, body, legs, feet, hands, back)
 */
export const ARMOR_EQUIPMENT_TYPES = [
  "/equipment_types/back",
  "/equipment_types/body",
  "/equipment_types/feet",
  "/equipment_types/hands",
  "/equipment_types/head",
  "/equipment_types/legs"
] as const

/**
 * Accessory equipment types (neck, earrings, ring, trinket, pouch)
 */
export const ACCESSORY_EQUIPMENT_TYPES = [
  "/equipment_types/earrings",
  "/equipment_types/neck",
  "/equipment_types/pouch",
  "/equipment_types/ring",
  "/equipment_types/trinket"
] as const

/**
 * Tool equipment types (all tools like alchemy_tool, cooking_tool, etc.)
 */
export const TOOL_EQUIPMENT_TYPES = [
  "/equipment_types/alchemy_tool",
  "/equipment_types/brewing_tool",
  "/equipment_types/cheesesmithing_tool",
  "/equipment_types/cooking_tool",
  "/equipment_types/crafting_tool",
  "/equipment_types/enhancing_tool",
  "/equipment_types/foraging_tool",
  "/equipment_types/milking_tool",
  "/equipment_types/tailoring_tool",
  "/equipment_types/woodcutting_tool"
] as const

/**
 * Check if equipment type is a weapon
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is a weapon
 */
export function isWeaponEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (WEAPON_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is armor
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is armor
 */
export function isArmorEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (ARMOR_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is an accessory
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is an accessory
 */
export function isAccessoryEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (ACCESSORY_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is a tool
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is a tool
 */
export function isToolEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (TOOL_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Get all equipment types sorted by sort index
 * @returns Array of equipment types ordered by sortIndex
 */
export function getEquipmentTypesSorted(): EquipmentType[] {
  return Object.values(EQUIPMENTTYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}

/**
 * Equipment types organized by category
 */
export const EQUIPMENT_TYPES_BY_CATEGORY = {
  weapons: WEAPON_EQUIPMENT_TYPES,
  armor: ARMOR_EQUIPMENT_TYPES,
  accessories: ACCESSORY_EQUIPMENT_TYPES,
  tools: TOOL_EQUIPMENT_TYPES
} as const