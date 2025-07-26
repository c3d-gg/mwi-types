/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.157Z
 */

import { z } from 'zod'
import { ShopCategoryHridEnum, ShopCategorySchema, type ShopCategory } from '../schemas/zod/shop-categories.js'
// Re-export HRID enum from schema
export { ShopCategoryHridEnum } from '../schemas/zod/shop-categories.js'
// Re-export schema
export { ShopCategorySchema } from '../schemas/zod/shop-categories.js'

// Type definitions
type ShopCategoryHrid = z.infer<typeof ShopCategoryHridEnum>

// Data
export const SHOPCATEGORIES: Record<ShopCategoryHrid, ShopCategory> = {
  '/shop_categories/dungeon': {
    "hrid": "/shop_categories/dungeon",
    "name": "Dungeon",
    "sortIndex": 2
  },
  '/shop_categories/general': {
    "hrid": "/shop_categories/general",
    "name": "General",
    "sortIndex": 1
  }
} as const satisfies Record<ShopCategoryHrid, ShopCategory>

// HRID utilities

/**
 * Check if a shopcategory HRID is valid
 */
export function validateShopCategoryHrid(hrid: string): hrid is ShopCategoryHrid {
  return hrid in SHOPCATEGORIES
}

/**
 * Check if a shopcategory exists
 */
export function shopcategoryExists(hrid: string): boolean {
  return hrid in SHOPCATEGORIES
}

// Getter functions
export function getShopCategory(hrid: ShopCategoryHrid): ShopCategory {
  return SHOPCATEGORIES[hrid]
}

export function getAllShopCategories(): ShopCategory[] {
  return Object.values(SHOPCATEGORIES)
}

export function getShopCategoriesSortedByIndex(): ShopCategory[] {
  return getAllShopCategories().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ShopCategory }
export type { ShopCategoryHrid }
export type ShopCategoryId = keyof typeof SHOPCATEGORIES
export type ShopCategoryData = typeof SHOPCATEGORIES

// Additional utility functions

export function getShopCategoryName(hrid: ShopCategoryHrid): string {
  return SHOPCATEGORIES[hrid].name
}

export function isValidShopCategory(hrid: string): hrid is ShopCategoryHrid {
  return hrid in SHOPCATEGORIES
}