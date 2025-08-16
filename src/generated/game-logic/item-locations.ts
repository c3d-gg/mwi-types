/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.336Z
 */

import { z } from 'zod'
import { ItemLocationHridEnum, ItemLocationSchema, type ItemLocation } from '../schemas/zod/item-locations.js'
// Re-export HRID enum from schema
export { ItemLocationHridEnum } from '../schemas/zod/item-locations.js'
// Re-export schema
export { ItemLocationSchema } from '../schemas/zod/item-locations.js'

// Type definitions
type ItemLocationHrid = z.infer<typeof ItemLocationHridEnum>

// Data
export const ITEMLOCATIONS: Record<ItemLocationHrid, ItemLocation> = {
  '/item_locations/alchemy_tool': {
    "hrid": "/item_locations/alchemy_tool",
    "name": "Alchemy Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/alchemy_tool"
    ]
  },
  '/item_locations/back': {
    "hrid": "/item_locations/back",
    "name": "Back",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/back"
    ]
  },
  '/item_locations/body': {
    "hrid": "/item_locations/body",
    "name": "Body",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/body"
    ]
  },
  '/item_locations/brewing_tool': {
    "hrid": "/item_locations/brewing_tool",
    "name": "Brewing Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/brewing_tool"
    ]
  },
  '/item_locations/cheesesmithing_tool': {
    "hrid": "/item_locations/cheesesmithing_tool",
    "name": "Cheesesmithing Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/cheesesmithing_tool"
    ]
  },
  '/item_locations/cooking_tool': {
    "hrid": "/item_locations/cooking_tool",
    "name": "Cooking Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/cooking_tool"
    ]
  },
  '/item_locations/crafting_tool': {
    "hrid": "/item_locations/crafting_tool",
    "name": "Crafting Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/crafting_tool"
    ]
  },
  '/item_locations/earrings': {
    "hrid": "/item_locations/earrings",
    "name": "Earrings",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/earrings"
    ]
  },
  '/item_locations/enhancing_tool': {
    "hrid": "/item_locations/enhancing_tool",
    "name": "Enhancing Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/enhancing_tool"
    ]
  },
  '/item_locations/feet': {
    "hrid": "/item_locations/feet",
    "name": "Feet",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/feet"
    ]
  },
  '/item_locations/foraging_tool': {
    "hrid": "/item_locations/foraging_tool",
    "name": "Foraging Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/foraging_tool"
    ]
  },
  '/item_locations/hands': {
    "hrid": "/item_locations/hands",
    "name": "Hands",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/hands"
    ]
  },
  '/item_locations/head': {
    "hrid": "/item_locations/head",
    "name": "Head",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/head"
    ]
  },
  '/item_locations/inventory': {
    "hrid": "/item_locations/inventory",
    "name": "Inventory",
    "type": "/item_location_types/inventory",
    "isTool": false,
    "isMultiItem": true,
    "conflictingOtherItemLocationHrids": []
  },
  '/item_locations/legs': {
    "hrid": "/item_locations/legs",
    "name": "Legs",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/legs"
    ]
  },
  '/item_locations/main_hand': {
    "hrid": "/item_locations/main_hand",
    "name": "Main Hand",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/main_hand",
      "/item_locations/two_hand"
    ]
  },
  '/item_locations/milking_tool': {
    "hrid": "/item_locations/milking_tool",
    "name": "Milking Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/milking_tool"
    ]
  },
  '/item_locations/neck': {
    "hrid": "/item_locations/neck",
    "name": "Neck",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/neck"
    ]
  },
  '/item_locations/off_hand': {
    "hrid": "/item_locations/off_hand",
    "name": "Off Hand",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/off_hand",
      "/item_locations/two_hand"
    ]
  },
  '/item_locations/pouch': {
    "hrid": "/item_locations/pouch",
    "name": "Pouch",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/pouch"
    ]
  },
  '/item_locations/ring': {
    "hrid": "/item_locations/ring",
    "name": "Ring",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/ring"
    ]
  },
  '/item_locations/tailoring_tool': {
    "hrid": "/item_locations/tailoring_tool",
    "name": "Tailoring Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/tailoring_tool"
    ]
  },
  '/item_locations/trinket': {
    "hrid": "/item_locations/trinket",
    "name": "Trinket",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/trinket"
    ]
  },
  '/item_locations/two_hand': {
    "hrid": "/item_locations/two_hand",
    "name": "Main Hand",
    "type": "/item_location_types/equipment",
    "isTool": false,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/two_hand",
      "/item_locations/main_hand",
      "/item_locations/off_hand"
    ]
  },
  '/item_locations/woodcutting_tool': {
    "hrid": "/item_locations/woodcutting_tool",
    "name": "Woodcutting Tool",
    "type": "/item_location_types/equipment",
    "isTool": true,
    "isMultiItem": false,
    "conflictingOtherItemLocationHrids": [
      "/item_locations/woodcutting_tool"
    ]
  }
} as const satisfies Record<ItemLocationHrid, ItemLocation>

// HRID utilities

/**
 * Check if a itemlocation HRID is valid
 */
export function validateItemLocationHrid(hrid: string): hrid is ItemLocationHrid {
  return hrid in ITEMLOCATIONS
}

/**
 * Check if a itemlocation exists
 */
export function itemlocationExists(hrid: string): boolean {
  return hrid in ITEMLOCATIONS
}

// Getter functions
export function getItemLocation(hrid: ItemLocationHrid): ItemLocation {
  return ITEMLOCATIONS[hrid]
}

export function getAllItemLocations(): ItemLocation[] {
  return Object.values(ITEMLOCATIONS)
}

export function getItemLocationsSortedByIndex(): ItemLocation[] {
  return getAllItemLocations().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ItemLocation }
export type { ItemLocationHrid }
export type ItemLocationId = keyof typeof ITEMLOCATIONS
export type ItemLocationData = typeof ITEMLOCATIONS


// Item location utilities
export function getItemLocationName(hrid: ItemLocationHrid): string {
  return ITEMLOCATIONS[hrid].name
}

export function isToolLocation(hrid: ItemLocationHrid): boolean {
  return ITEMLOCATIONS[hrid].isTool
}

export function isMultiItemLocation(hrid: ItemLocationHrid): boolean {
  return ITEMLOCATIONS[hrid].isMultiItem
}

export function getConflictingLocations(hrid: ItemLocationHrid): string[] {
  return ITEMLOCATIONS[hrid].conflictingOtherItemLocationHrids
}

// Get all equipment locations (non-tool, non-inventory)
export function getEquipmentLocations(): ItemLocation[] {
  return Object.values(ITEMLOCATIONS).filter(
    (loc: ItemLocation) => !loc.isTool && loc.hrid !== '/item_locations/inventory'
  )
}

// Get all tool locations
export function getToolLocations(): ItemLocation[] {
  return Object.values(ITEMLOCATIONS).filter((loc: ItemLocation) => loc.isTool)
}

// Check if two locations conflict
export function doLocationsConflict(loc1: ItemLocationHrid, loc2: ItemLocationHrid): boolean {
  const location1 = ITEMLOCATIONS[loc1]
  return location1.conflictingOtherItemLocationHrids.includes(loc2)
}

// Get all weapon locations
export function getWeaponLocations(): ItemLocation[] {
  const weaponHrids: ItemLocationHrid[] = [
    '/item_locations/main_hand' as ItemLocationHrid,
    '/item_locations/off_hand' as ItemLocationHrid,
    '/item_locations/two_hand' as ItemLocationHrid,
  ]
  return weaponHrids.map(hrid => ITEMLOCATIONS[hrid])
}