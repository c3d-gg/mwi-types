/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.186Z
 */

import { z } from 'zod'
import { ItemHridEnum } from '../../game-logic/items.js'
export const TaskShopItemHridEnum = z.enum(['/task_shop_items/large_artisans_crate', '/task_shop_items/large_meteorite_cache', '/task_shop_items/large_treasure_chest', '/task_shop_items/task_crystal'] as const)
export type TaskShopItemHrid = z.infer<typeof TaskShopItemHridEnum>
export const TaskShopItemSchema = z.object({
  hrid: TaskShopItemHridEnum,
  name: z.string(),
  itemHrid: ItemHridEnum,
  cost: z.object({
  itemHrid: ItemHridEnum,
  count: z.number()
}),
  sortIndex: z.number()
})
export type TaskShopItem = z.infer<typeof TaskShopItemSchema>