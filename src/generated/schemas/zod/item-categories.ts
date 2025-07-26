/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.969Z
 */

import { z } from 'zod'
export const ItemCategoryHridEnum = z.enum(['/item_categories/ability_book', '/item_categories/currency', '/item_categories/drink', '/item_categories/equipment', '/item_categories/food', '/item_categories/key', '/item_categories/loot', '/item_categories/resource'] as const)
export type ItemCategoryHrid = z.infer<typeof ItemCategoryHridEnum>
export const ItemCategorySchema = z.object({
  hrid: ItemCategoryHridEnum,
  name: z.string(),
  pluralName: z.string(),
  sortIndex: z.number()
})
export type ItemCategory = z.infer<typeof ItemCategorySchema>