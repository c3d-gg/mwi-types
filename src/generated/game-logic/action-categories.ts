/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.074Z
 */

import { z } from 'zod'
import { ActionCategoryHridEnum, ActionCategorySchema, type ActionCategory } from '../schemas/zod/action-categories.js'
// Re-export HRID enum from schema
export { ActionCategoryHridEnum } from '../schemas/zod/action-categories.js'
// Re-export schema
export { ActionCategorySchema } from '../schemas/zod/action-categories.js'

// Type definitions
type ActionCategoryHrid = z.infer<typeof ActionCategoryHridEnum>

// Data
export const ACTIONCATEGORIES: Record<ActionCategoryHrid, ActionCategory> = {
  '/action_categories/alchemy/alchemy': {
    "hrid": "/action_categories/alchemy/alchemy",
    "name": "Alchemy",
    "type": "/action_types/alchemy",
    "sortIndex": 1
  },
  '/action_categories/brewing/coffee': {
    "hrid": "/action_categories/brewing/coffee",
    "name": "Coffee",
    "type": "/action_types/brewing",
    "sortIndex": 2
  },
  '/action_categories/brewing/tea': {
    "hrid": "/action_categories/brewing/tea",
    "name": "Tea",
    "type": "/action_types/brewing",
    "sortIndex": 1
  },
  '/action_categories/cheesesmithing/body': {
    "hrid": "/action_categories/cheesesmithing/body",
    "name": "Body",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 10
  },
  '/action_categories/cheesesmithing/feet': {
    "hrid": "/action_categories/cheesesmithing/feet",
    "name": "Feet",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 6
  },
  '/action_categories/cheesesmithing/hands': {
    "hrid": "/action_categories/cheesesmithing/hands",
    "name": "Hands",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 7
  },
  '/action_categories/cheesesmithing/head': {
    "hrid": "/action_categories/cheesesmithing/head",
    "name": "Head",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 8
  },
  '/action_categories/cheesesmithing/legs': {
    "hrid": "/action_categories/cheesesmithing/legs",
    "name": "Legs",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 9
  },
  '/action_categories/cheesesmithing/main_hand': {
    "hrid": "/action_categories/cheesesmithing/main_hand",
    "name": "Main Hand",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 3
  },
  '/action_categories/cheesesmithing/material': {
    "hrid": "/action_categories/cheesesmithing/material",
    "name": "Material",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 1
  },
  '/action_categories/cheesesmithing/off_hand': {
    "hrid": "/action_categories/cheesesmithing/off_hand",
    "name": "Off Hand",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 5
  },
  '/action_categories/cheesesmithing/tool': {
    "hrid": "/action_categories/cheesesmithing/tool",
    "name": "Tool",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 2
  },
  '/action_categories/cheesesmithing/two_hand': {
    "hrid": "/action_categories/cheesesmithing/two_hand",
    "name": "Two Hand",
    "type": "/action_types/cheesesmithing",
    "sortIndex": 4
  },
  '/action_categories/combat/aqua_planet': {
    "hrid": "/action_categories/combat/aqua_planet",
    "name": "Aqua Planet",
    "type": "/action_types/combat",
    "sortIndex": 3
  },
  '/action_categories/combat/bear_with_it': {
    "hrid": "/action_categories/combat/bear_with_it",
    "name": "Bear With It",
    "type": "/action_types/combat",
    "sortIndex": 8
  },
  '/action_categories/combat/dungeons': {
    "hrid": "/action_categories/combat/dungeons",
    "name": "Dungeons",
    "type": "/action_types/combat",
    "sortIndex": 12
  },
  '/action_categories/combat/gobo_planet': {
    "hrid": "/action_categories/combat/gobo_planet",
    "name": "Gobo Planet",
    "type": "/action_types/combat",
    "sortIndex": 5
  },
  '/action_categories/combat/golem_cave': {
    "hrid": "/action_categories/combat/golem_cave",
    "name": "Golem Cave",
    "type": "/action_types/combat",
    "sortIndex": 9
  },
  '/action_categories/combat/infernal_abyss': {
    "hrid": "/action_categories/combat/infernal_abyss",
    "name": "Infernal Abyss",
    "type": "/action_types/combat",
    "sortIndex": 11
  },
  '/action_categories/combat/jungle_planet': {
    "hrid": "/action_categories/combat/jungle_planet",
    "name": "Jungle Planet",
    "type": "/action_types/combat",
    "sortIndex": 4
  },
  '/action_categories/combat/planet_of_the_eyes': {
    "hrid": "/action_categories/combat/planet_of_the_eyes",
    "name": "Planet Of The Eyes",
    "type": "/action_types/combat",
    "sortIndex": 6
  },
  '/action_categories/combat/smelly_planet': {
    "hrid": "/action_categories/combat/smelly_planet",
    "name": "Smelly Planet",
    "type": "/action_types/combat",
    "sortIndex": 1
  },
  '/action_categories/combat/sorcerers_tower': {
    "hrid": "/action_categories/combat/sorcerers_tower",
    "name": "Sorcerer's Tower",
    "type": "/action_types/combat",
    "sortIndex": 7
  },
  '/action_categories/combat/swamp_planet': {
    "hrid": "/action_categories/combat/swamp_planet",
    "name": "Swamp Planet",
    "type": "/action_types/combat",
    "sortIndex": 2
  },
  '/action_categories/combat/twilight_zone': {
    "hrid": "/action_categories/combat/twilight_zone",
    "name": "Twilight Zone",
    "type": "/action_types/combat",
    "sortIndex": 10
  },
  '/action_categories/cooking/heal_over_time': {
    "hrid": "/action_categories/cooking/heal_over_time",
    "name": "Heal Over Time",
    "type": "/action_types/cooking",
    "sortIndex": 2
  },
  '/action_categories/cooking/instant_heal': {
    "hrid": "/action_categories/cooking/instant_heal",
    "name": "Instant Heal",
    "type": "/action_types/cooking",
    "sortIndex": 1
  },
  '/action_categories/cooking/instant_mana': {
    "hrid": "/action_categories/cooking/instant_mana",
    "name": "Instant Mana",
    "type": "/action_types/cooking",
    "sortIndex": 3
  },
  '/action_categories/cooking/mana_over_time': {
    "hrid": "/action_categories/cooking/mana_over_time",
    "name": "Mana Over Time",
    "type": "/action_types/cooking",
    "sortIndex": 4
  },
  '/action_categories/crafting/bow': {
    "hrid": "/action_categories/crafting/bow",
    "name": "Bow",
    "type": "/action_types/crafting",
    "sortIndex": 3
  },
  '/action_categories/crafting/crossbow': {
    "hrid": "/action_categories/crafting/crossbow",
    "name": "Crossbow",
    "type": "/action_types/crafting",
    "sortIndex": 2
  },
  '/action_categories/crafting/dungeon_keys': {
    "hrid": "/action_categories/crafting/dungeon_keys",
    "name": "Dungeon Keys",
    "type": "/action_types/crafting",
    "sortIndex": 11
  },
  '/action_categories/crafting/earrings': {
    "hrid": "/action_categories/crafting/earrings",
    "name": "Earrings",
    "type": "/action_types/crafting",
    "sortIndex": 7
  },
  '/action_categories/crafting/lumber': {
    "hrid": "/action_categories/crafting/lumber",
    "name": "Lumber",
    "type": "/action_types/crafting",
    "sortIndex": 1
  },
  '/action_categories/crafting/neck': {
    "hrid": "/action_categories/crafting/neck",
    "name": "Neck",
    "type": "/action_types/crafting",
    "sortIndex": 8
  },
  '/action_categories/crafting/off_hand': {
    "hrid": "/action_categories/crafting/off_hand",
    "name": "Off Hand",
    "type": "/action_types/crafting",
    "sortIndex": 5
  },
  '/action_categories/crafting/ring': {
    "hrid": "/action_categories/crafting/ring",
    "name": "Ring",
    "type": "/action_types/crafting",
    "sortIndex": 6
  },
  '/action_categories/crafting/special': {
    "hrid": "/action_categories/crafting/special",
    "name": "Special",
    "type": "/action_types/crafting",
    "sortIndex": 10
  },
  '/action_categories/crafting/staff': {
    "hrid": "/action_categories/crafting/staff",
    "name": "Staff",
    "type": "/action_types/crafting",
    "sortIndex": 4
  },
  '/action_categories/crafting/trinket': {
    "hrid": "/action_categories/crafting/trinket",
    "name": "Trinket",
    "type": "/action_types/crafting",
    "sortIndex": 9
  },
  '/action_categories/enhancing/enhance': {
    "hrid": "/action_categories/enhancing/enhance",
    "name": "Enhance",
    "type": "/action_types/enhancing",
    "sortIndex": 1
  },
  '/action_categories/foraging/asteroid_belt': {
    "hrid": "/action_categories/foraging/asteroid_belt",
    "name": "Asteroid Belt",
    "type": "/action_types/foraging",
    "sortIndex": 7
  },
  '/action_categories/foraging/burble_beach': {
    "hrid": "/action_categories/foraging/burble_beach",
    "name": "Burble Beach",
    "type": "/action_types/foraging",
    "sortIndex": 4
  },
  '/action_categories/foraging/farmland': {
    "hrid": "/action_categories/foraging/farmland",
    "name": "Farmland",
    "type": "/action_types/foraging",
    "sortIndex": 1
  },
  '/action_categories/foraging/misty_forest': {
    "hrid": "/action_categories/foraging/misty_forest",
    "name": "Misty Forest",
    "type": "/action_types/foraging",
    "sortIndex": 3
  },
  '/action_categories/foraging/olympus_mons': {
    "hrid": "/action_categories/foraging/olympus_mons",
    "name": "Olympus Mons",
    "type": "/action_types/foraging",
    "sortIndex": 6
  },
  '/action_categories/foraging/shimmering_lake': {
    "hrid": "/action_categories/foraging/shimmering_lake",
    "name": "Shimmering Lake",
    "type": "/action_types/foraging",
    "sortIndex": 2
  },
  '/action_categories/foraging/silly_cow_valley': {
    "hrid": "/action_categories/foraging/silly_cow_valley",
    "name": "Silly Cow Valley",
    "type": "/action_types/foraging",
    "sortIndex": 5
  },
  '/action_categories/milking/cows': {
    "hrid": "/action_categories/milking/cows",
    "name": "Cows",
    "type": "/action_types/milking",
    "sortIndex": 1
  },
  '/action_categories/tailoring/body': {
    "hrid": "/action_categories/tailoring/body",
    "name": "Body",
    "type": "/action_types/tailoring",
    "sortIndex": 6
  },
  '/action_categories/tailoring/feet': {
    "hrid": "/action_categories/tailoring/feet",
    "name": "Feet",
    "type": "/action_types/tailoring",
    "sortIndex": 2
  },
  '/action_categories/tailoring/hands': {
    "hrid": "/action_categories/tailoring/hands",
    "name": "Hands",
    "type": "/action_types/tailoring",
    "sortIndex": 3
  },
  '/action_categories/tailoring/head': {
    "hrid": "/action_categories/tailoring/head",
    "name": "Head",
    "type": "/action_types/tailoring",
    "sortIndex": 4
  },
  '/action_categories/tailoring/legs': {
    "hrid": "/action_categories/tailoring/legs",
    "name": "Legs",
    "type": "/action_types/tailoring",
    "sortIndex": 5
  },
  '/action_categories/tailoring/material': {
    "hrid": "/action_categories/tailoring/material",
    "name": "Material",
    "type": "/action_types/tailoring",
    "sortIndex": 1
  },
  '/action_categories/tailoring/pouch': {
    "hrid": "/action_categories/tailoring/pouch",
    "name": "Pouch",
    "type": "/action_types/tailoring",
    "sortIndex": 7
  },
  '/action_categories/woodcutting/trees': {
    "hrid": "/action_categories/woodcutting/trees",
    "name": "Trees",
    "type": "/action_types/woodcutting",
    "sortIndex": 1
  }
} as const satisfies Record<ActionCategoryHrid, ActionCategory>

// HRID utilities

/**
 * Check if a actioncategory HRID is valid
 */
export function validateActionCategoryHrid(hrid: string): hrid is ActionCategoryHrid {
  return hrid in ACTIONCATEGORIES
}

/**
 * Check if a actioncategory exists
 */
export function actioncategoryExists(hrid: string): boolean {
  return hrid in ACTIONCATEGORIES
}

// Getter functions
export function getActionCategory(hrid: ActionCategoryHrid): ActionCategory {
  return ACTIONCATEGORIES[hrid]
}

export function getAllActionCategories(): ActionCategory[] {
  return Object.values(ACTIONCATEGORIES)
}

export function getActionCategoriesSortedByIndex(): ActionCategory[] {
  return getAllActionCategories().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ActionCategory }
export type { ActionCategoryHrid }
export type ActionCategoryId = keyof typeof ACTIONCATEGORIES
export type ActionCategoryData = typeof ACTIONCATEGORIES


// Action category organization
export const ACTION_CATEGORIES_BY_TYPE = Object.entries(ACTIONCATEGORIES).reduce(
  (acc, [hrid, category]) => {
    const type = category.type
    if (!acc[type]) acc[type] = []
    acc[type].push(hrid as ActionCategoryHrid)
    return acc
  },
  {} as Record<string, ActionCategoryHrid[]>
)

// Get all action categories for a specific type
export function getActionCategoriesByType(type: string): ActionCategory[] {
  return (ACTION_CATEGORIES_BY_TYPE[type] || []).map(hrid => ACTIONCATEGORIES[hrid])
}

// Get action category display name
export function getActionCategoryName(hrid: ActionCategoryHrid): string {
  return ACTIONCATEGORIES[hrid].name
}

// Get action category type
export function getActionCategoryType(hrid: ActionCategoryHrid): string {
  return ACTIONCATEGORIES[hrid].type
}

// Get all action categories sorted by sortIndex
export function getActionCategoriesSorted(): ActionCategory[] {
  return Object.values(ACTIONCATEGORIES).sort((a, b) => a.sortIndex - b.sortIndex)
}

// Get action categories by type sorted
export function getActionCategoriesByTypeSorted(type: string): ActionCategory[] {
  return getActionCategoriesByType(type).sort((a, b) => a.sortIndex - b.sortIndex)
}

// Get all unique action types from categories
export function getAllActionTypesFromCategories(): string[] {
  return [...new Set(Object.values(ACTIONCATEGORIES).map(cat => cat.type))]
}

// Check if action category exists
export function isValidActionCategory(hrid: string): hrid is ActionCategoryHrid {
  return hrid in ACTIONCATEGORIES
}

// Count categories by type
export function countCategoriesByType(): Record<string, number> {
  return Object.values(ACTIONCATEGORIES).reduce(
    (acc, category) => {
      acc[category.type] = (acc[category.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}