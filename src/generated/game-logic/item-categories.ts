/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.966Z
 */

import { z } from 'zod'
import { ItemCategoryHridEnum, ItemCategorySchema, type ItemCategory } from '../schemas/zod/item-categories.js'
// Re-export HRID enum from schema
export { ItemCategoryHridEnum } from '../schemas/zod/item-categories.js'
// Re-export schema
export { ItemCategorySchema } from '../schemas/zod/item-categories.js'

// Type definitions
type ItemCategoryHrid = z.infer<typeof ItemCategoryHridEnum>

// Data
export const ITEMCATEGORIES: Record<ItemCategoryHrid, ItemCategory> = {
  '/item_categories/ability_book': {
    "hrid": "/item_categories/ability_book",
    "name": "Ability Book",
    "pluralName": "Ability Books",
    "sortIndex": 6
  },
  '/item_categories/currency': {
    "hrid": "/item_categories/currency",
    "name": "Currency",
    "pluralName": "Currencies",
    "sortIndex": 1
  },
  '/item_categories/drink': {
    "hrid": "/item_categories/drink",
    "name": "Drink",
    "pluralName": "Drinks",
    "sortIndex": 5
  },
  '/item_categories/equipment': {
    "hrid": "/item_categories/equipment",
    "name": "Equipment",
    "pluralName": "Equipment",
    "sortIndex": 7
  },
  '/item_categories/food': {
    "hrid": "/item_categories/food",
    "name": "Food",
    "pluralName": "Foods",
    "sortIndex": 4
  },
  '/item_categories/key': {
    "hrid": "/item_categories/key",
    "name": "Key",
    "pluralName": "Keys",
    "sortIndex": 3
  },
  '/item_categories/loot': {
    "hrid": "/item_categories/loot",
    "name": "Loot",
    "pluralName": "Loots",
    "sortIndex": 2
  },
  '/item_categories/resource': {
    "hrid": "/item_categories/resource",
    "name": "Resource",
    "pluralName": "Resources",
    "sortIndex": 8
  }
} as const satisfies Record<ItemCategoryHrid, ItemCategory>

// HRID utilities

/**
 * Check if a itemcategory HRID is valid
 */
export function validateItemCategoryHrid(hrid: string): hrid is ItemCategoryHrid {
  return hrid in ITEMCATEGORIES
}

/**
 * Check if a itemcategory exists
 */
export function itemcategoryExists(hrid: string): boolean {
  return hrid in ITEMCATEGORIES
}

// Getter functions
export function getItemCategory(hrid: ItemCategoryHrid): ItemCategory {
  return ITEMCATEGORIES[hrid]
}

export function getAllItemCategories(): ItemCategory[] {
  return Object.values(ITEMCATEGORIES)
}

export function getItemCategoriesSortedByIndex(): ItemCategory[] {
  return getAllItemCategories().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ItemCategory }
export type { ItemCategoryHrid }
export type ItemCategoryId = keyof typeof ITEMCATEGORIES
export type ItemCategoryData = typeof ITEMCATEGORIES


// Item category utilities
export function getItemCategoryName(hrid: ItemCategoryHrid): string {
  return ITEMCATEGORIES[hrid].name
}

export function getItemCategoryPluralName(hrid: ItemCategoryHrid): string {
  return ITEMCATEGORIES[hrid].pluralName
}