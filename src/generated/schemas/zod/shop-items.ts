/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.167Z
 */

import { z } from 'zod'
export const ShopItemHridEnum = z.enum(['/shop_items/acrobats_ribbon', '/shop_items/bishops_scroll', '/shop_items/chaotic_chain', '/shop_items/cheese_alembic', '/shop_items/cheese_brush', '/shop_items/cheese_chisel', '/shop_items/cheese_enhancer', '/shop_items/cheese_hammer', '/shop_items/cheese_hatchet', '/shop_items/cheese_mace', '/shop_items/cheese_needle', '/shop_items/cheese_pot', '/shop_items/cheese_shears', '/shop_items/cheese_spatula', '/shop_items/cheese_spear', '/shop_items/cheese_sword', '/shop_items/chimerical_essence', '/shop_items/chimerical_quiver', '/shop_items/corsair_crest', '/shop_items/cursed_ball', '/shop_items/damaged_anchor', '/shop_items/dodocamel_plume', '/shop_items/enchanted_cloak', '/shop_items/enchanted_essence', '/shop_items/griffin_leather', '/shop_items/griffin_talon', '/shop_items/jackalope_antler', '/shop_items/knights_ingot', '/shop_items/kraken_fang', '/shop_items/kraken_leather', '/shop_items/maelstrom_plating', '/shop_items/magicians_cloth', '/shop_items/manticore_sting', '/shop_items/marksman_brooch', '/shop_items/pirate_essence', '/shop_items/regal_jewel', '/shop_items/royal_cloth', '/shop_items/sinister_cape', '/shop_items/sinister_essence', '/shop_items/sundering_jewel', '/shop_items/wooden_bow', '/shop_items/wooden_crossbow', '/shop_items/wooden_fire_staff', '/shop_items/wooden_nature_staff', '/shop_items/wooden_water_staff'] as const)
export type ShopItemHrid = z.infer<typeof ShopItemHridEnum>
export const ShopItemSchema = z.object({
  hrid: ShopItemHridEnum,
  category: z.string(),
  itemHrid: z.string(),
  costs: z.array(z.object({
  itemHrid: z.string(),
  count: z.number()
})),
  sortIndex: z.number()
})
export type ShopItem = z.infer<typeof ShopItemSchema>