/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.770Z
 */

import { z } from 'zod'
export const ShopCategoryHridEnum = z.enum(['/shop_categories/dungeon', '/shop_categories/general'] as const)
export type ShopCategoryHrid = z.infer<typeof ShopCategoryHridEnum>
export const ShopCategorySchema = z.object({
  hrid: ShopCategoryHridEnum,
  name: z.string(),
  sortIndex: z.number()
})
export type ShopCategory = z.infer<typeof ShopCategorySchema>