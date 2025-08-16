/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.792Z
 */

import { z } from 'zod'
import { ShopItemHridEnum, ShopItemSchema, type ShopItem } from '../schemas/zod/shop-items.js'
import { ItemHridEnum, type ItemHrid } from '../game-logic/items.js'
import { ShopCategoryHridEnum, type ShopCategoryHrid } from '../game-logic/shop-categories.js'

// Re-export HRID enum from schema
export { ShopItemHridEnum } from '../schemas/zod/shop-items.js'

// Re-export schema
export { ShopItemSchema } from '../schemas/zod/shop-items.js'

// Type definitions
type ShopItemHrid = z.infer<typeof ShopItemHridEnum>

// Data
export const SHOPITEMS: Record<ShopItemHrid, ShopItem> = {
  '/shop_items/acrobats_ribbon': {
    "hrid": "/shop_items/acrobats_ribbon",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/acrobats_ribbon",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 2000
      }
    ],
    "sortIndex": 27
  },
  '/shop_items/bishops_scroll': {
    "hrid": "/shop_items/bishops_scroll",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/bishops_scroll",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 2000
      }
    ],
    "sortIndex": 35
  },
  '/shop_items/chaotic_chain': {
    "hrid": "/shop_items/chaotic_chain",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/chaotic_chain",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 3000
      }
    ],
    "sortIndex": 29
  },
  '/shop_items/cheese_alembic': {
    "hrid": "/shop_items/cheese_alembic",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_alembic",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 17
  },
  '/shop_items/cheese_brush': {
    "hrid": "/shop_items/cheese_brush",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_brush",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 9
  },
  '/shop_items/cheese_chisel': {
    "hrid": "/shop_items/cheese_chisel",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_chisel",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 13
  },
  '/shop_items/cheese_enhancer': {
    "hrid": "/shop_items/cheese_enhancer",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_enhancer",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 18
  },
  '/shop_items/cheese_hammer': {
    "hrid": "/shop_items/cheese_hammer",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_hammer",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 12
  },
  '/shop_items/cheese_hatchet': {
    "hrid": "/shop_items/cheese_hatchet",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_hatchet",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 11
  },
  '/shop_items/cheese_mace': {
    "hrid": "/shop_items/cheese_mace",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_mace",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 3
  },
  '/shop_items/cheese_needle': {
    "hrid": "/shop_items/cheese_needle",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_needle",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 14
  },
  '/shop_items/cheese_pot': {
    "hrid": "/shop_items/cheese_pot",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_pot",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 16
  },
  '/shop_items/cheese_shears': {
    "hrid": "/shop_items/cheese_shears",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_shears",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 10
  },
  '/shop_items/cheese_spatula': {
    "hrid": "/shop_items/cheese_spatula",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_spatula",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 15
  },
  '/shop_items/cheese_spear': {
    "hrid": "/shop_items/cheese_spear",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_spear",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 2
  },
  '/shop_items/cheese_sword': {
    "hrid": "/shop_items/cheese_sword",
    "category": "/shop_categories/general",
    "itemHrid": "/items/cheese_sword",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 1
  },
  '/shop_items/chimerical_essence': {
    "hrid": "/shop_items/chimerical_essence",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/chimerical_essence",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 1
      }
    ],
    "sortIndex": 19
  },
  '/shop_items/chimerical_quiver': {
    "hrid": "/shop_items/chimerical_quiver",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/chimerical_quiver",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 35000
      }
    ],
    "sortIndex": 25
  },
  '/shop_items/corsair_crest': {
    "hrid": "/shop_items/corsair_crest",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/corsair_crest",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 2000
      }
    ],
    "sortIndex": 41
  },
  '/shop_items/cursed_ball': {
    "hrid": "/shop_items/cursed_ball",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/cursed_ball",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 3000
      }
    ],
    "sortIndex": 30
  },
  '/shop_items/damaged_anchor': {
    "hrid": "/shop_items/damaged_anchor",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/damaged_anchor",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 2000
      }
    ],
    "sortIndex": 42
  },
  '/shop_items/dodocamel_plume': {
    "hrid": "/shop_items/dodocamel_plume",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/dodocamel_plume",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 3000
      }
    ],
    "sortIndex": 23
  },
  '/shop_items/enchanted_cloak': {
    "hrid": "/shop_items/enchanted_cloak",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/enchanted_cloak",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 27000
      }
    ],
    "sortIndex": 38
  },
  '/shop_items/enchanted_essence': {
    "hrid": "/shop_items/enchanted_essence",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/enchanted_essence",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 1
      }
    ],
    "sortIndex": 32
  },
  '/shop_items/griffin_leather': {
    "hrid": "/shop_items/griffin_leather",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/griffin_leather",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 600
      }
    ],
    "sortIndex": 20
  },
  '/shop_items/griffin_talon': {
    "hrid": "/shop_items/griffin_talon",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/griffin_talon",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 3000
      }
    ],
    "sortIndex": 24
  },
  '/shop_items/jackalope_antler': {
    "hrid": "/shop_items/jackalope_antler",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/jackalope_antler",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 1200
      }
    ],
    "sortIndex": 22
  },
  '/shop_items/knights_ingot': {
    "hrid": "/shop_items/knights_ingot",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/knights_ingot",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 2000
      }
    ],
    "sortIndex": 34
  },
  '/shop_items/kraken_fang': {
    "hrid": "/shop_items/kraken_fang",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/kraken_fang",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 3000
      }
    ],
    "sortIndex": 45
  },
  '/shop_items/kraken_leather': {
    "hrid": "/shop_items/kraken_leather",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/kraken_leather",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 2000
      }
    ],
    "sortIndex": 44
  },
  '/shop_items/maelstrom_plating': {
    "hrid": "/shop_items/maelstrom_plating",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/maelstrom_plating",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 2000
      }
    ],
    "sortIndex": 43
  },
  '/shop_items/magicians_cloth': {
    "hrid": "/shop_items/magicians_cloth",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/magicians_cloth",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 2000
      }
    ],
    "sortIndex": 28
  },
  '/shop_items/manticore_sting': {
    "hrid": "/shop_items/manticore_sting",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/manticore_sting",
    "costs": [
      {
        "itemHrid": "/items/chimerical_token",
        "count": 1000
      }
    ],
    "sortIndex": 21
  },
  '/shop_items/marksman_brooch': {
    "hrid": "/shop_items/marksman_brooch",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/marksman_brooch",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 2000
      }
    ],
    "sortIndex": 40
  },
  '/shop_items/pirate_essence': {
    "hrid": "/shop_items/pirate_essence",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/pirate_essence",
    "costs": [
      {
        "itemHrid": "/items/pirate_token",
        "count": 1
      }
    ],
    "sortIndex": 39
  },
  '/shop_items/regal_jewel': {
    "hrid": "/shop_items/regal_jewel",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/regal_jewel",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 3000
      }
    ],
    "sortIndex": 36
  },
  '/shop_items/royal_cloth': {
    "hrid": "/shop_items/royal_cloth",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/royal_cloth",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 2000
      }
    ],
    "sortIndex": 33
  },
  '/shop_items/sinister_cape': {
    "hrid": "/shop_items/sinister_cape",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/sinister_cape",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 27000
      }
    ],
    "sortIndex": 31
  },
  '/shop_items/sinister_essence': {
    "hrid": "/shop_items/sinister_essence",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/sinister_essence",
    "costs": [
      {
        "itemHrid": "/items/sinister_token",
        "count": 1
      }
    ],
    "sortIndex": 26
  },
  '/shop_items/sundering_jewel': {
    "hrid": "/shop_items/sundering_jewel",
    "category": "/shop_categories/dungeon",
    "itemHrid": "/items/sundering_jewel",
    "costs": [
      {
        "itemHrid": "/items/enchanted_token",
        "count": 3000
      }
    ],
    "sortIndex": 37
  },
  '/shop_items/wooden_bow': {
    "hrid": "/shop_items/wooden_bow",
    "category": "/shop_categories/general",
    "itemHrid": "/items/wooden_bow",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 5
  },
  '/shop_items/wooden_crossbow': {
    "hrid": "/shop_items/wooden_crossbow",
    "category": "/shop_categories/general",
    "itemHrid": "/items/wooden_crossbow",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 4
  },
  '/shop_items/wooden_fire_staff': {
    "hrid": "/shop_items/wooden_fire_staff",
    "category": "/shop_categories/general",
    "itemHrid": "/items/wooden_fire_staff",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 8
  },
  '/shop_items/wooden_nature_staff': {
    "hrid": "/shop_items/wooden_nature_staff",
    "category": "/shop_categories/general",
    "itemHrid": "/items/wooden_nature_staff",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 7
  },
  '/shop_items/wooden_water_staff': {
    "hrid": "/shop_items/wooden_water_staff",
    "category": "/shop_categories/general",
    "itemHrid": "/items/wooden_water_staff",
    "costs": [
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "sortIndex": 6
  }
} as const satisfies Record<ShopItemHrid, ShopItem>

// Shop items grouped by category
export const SHOP_ITEMS_BY_CATEGORY: Record<ShopCategoryHrid, readonly ShopItemHrid[]> = {
  '/shop_categories/dungeon': ['/shop_items/acrobats_ribbon', '/shop_items/bishops_scroll', '/shop_items/chaotic_chain', '/shop_items/chimerical_essence', '/shop_items/chimerical_quiver', '/shop_items/corsair_crest', '/shop_items/cursed_ball', '/shop_items/damaged_anchor', '/shop_items/dodocamel_plume', '/shop_items/enchanted_cloak', '/shop_items/enchanted_essence', '/shop_items/griffin_leather', '/shop_items/griffin_talon', '/shop_items/jackalope_antler', '/shop_items/knights_ingot', '/shop_items/kraken_fang', '/shop_items/kraken_leather', '/shop_items/maelstrom_plating', '/shop_items/magicians_cloth', '/shop_items/manticore_sting', '/shop_items/marksman_brooch', '/shop_items/pirate_essence', '/shop_items/regal_jewel', '/shop_items/royal_cloth', '/shop_items/sinister_cape', '/shop_items/sinister_essence', '/shop_items/sundering_jewel'] as const,
  '/shop_categories/general': ['/shop_items/cheese_alembic', '/shop_items/cheese_brush', '/shop_items/cheese_chisel', '/shop_items/cheese_enhancer', '/shop_items/cheese_hammer', '/shop_items/cheese_hatchet', '/shop_items/cheese_mace', '/shop_items/cheese_needle', '/shop_items/cheese_pot', '/shop_items/cheese_shears', '/shop_items/cheese_spatula', '/shop_items/cheese_spear', '/shop_items/cheese_sword', '/shop_items/wooden_bow', '/shop_items/wooden_crossbow', '/shop_items/wooden_fire_staff', '/shop_items/wooden_nature_staff', '/shop_items/wooden_water_staff'] as const
} as const satisfies Record<ShopCategoryHrid, readonly ShopItemHrid[]>

// Getter functions
export function getShopItem(hrid: ShopItemHrid): ShopItem {
  return SHOPITEMS[hrid]
}

export function getAllShopItems(): ShopItem[] {
  return Object.values(SHOPITEMS)
}

export function getShopItemsSortedByIndex(): ShopItem[] {
  return getAllShopItems().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Additional utility functions
export function getShopItemsByCategory(categoryHrid: ShopCategoryHrid): readonly ShopItem[] {
  const hrids = SHOP_ITEMS_BY_CATEGORY[categoryHrid] || []
  return hrids.map(hrid => SHOPITEMS[hrid])
}

export function getShopItemsSorted(categoryHrid?: ShopCategoryHrid): readonly ShopItem[] {
  let items: ShopItem[]
  
  if (categoryHrid) {
    items = [...getShopItemsByCategory(categoryHrid)]
  } else {
    items = Object.values(SHOPITEMS)
  }
  
  return items.sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getShopItemsForItem(itemHrid: ItemHrid): readonly ShopItem[] {
  return Object.values(SHOPITEMS).filter(shopItem => shopItem.itemHrid === itemHrid)
}

export function getShopItemsRequiringCurrency(currencyHrid: ItemHrid): readonly ShopItem[] {
  return Object.values(SHOPITEMS).filter(shopItem =>
    shopItem.costs.some(cost => cost.itemHrid === currencyHrid)
  )
}

export function getShopItemCosts(hrid: ShopItemHrid): ReadonlyArray<{ itemHrid: ItemHrid; count: number }> {
  const shopItem = SHOPITEMS[hrid]
  return shopItem.costs.map(cost => ({
    itemHrid: cost.itemHrid as ItemHrid,
    count: cost.count
  }))
}

export function canAffordShopItem(
  hrid: ShopItemHrid,
  inventory: Record<ItemHrid, number>
): boolean {
  const shopItem = SHOPITEMS[hrid]
  return shopItem.costs.every(cost => {
    const owned = inventory[cost.itemHrid as ItemHrid] || 0
    return owned >= cost.count
  })
}

export function getAllShopCurrencies(): readonly ItemHrid[] {
  const currencies = new Set<ItemHrid>()
  Object.values(SHOPITEMS).forEach(shopItem => {
    shopItem.costs.forEach(cost => {
      currencies.add(cost.itemHrid as ItemHrid)
    })
  })
  return Array.from(currencies)
}

export function getCheapestShopItem(itemHrid: ItemHrid): ShopItem | null {
  const shopItems = getShopItemsForItem(itemHrid)
  if (shopItems.length === 0) return null
  
  // Simple comparison - just by first cost amount (could be improved)
  const sorted = [...shopItems].sort((a, b) => {
    const aCost = a.costs[0]?.count || 0
    const bCost = b.costs[0]?.count || 0
    return aCost - bCost
  })
  return sorted[0] || null
}

// Type exports
export type { ShopItem }
export type { ShopItemHrid }
export type ShopItemId = keyof typeof SHOPITEMS
export type ShopItemData = typeof SHOPITEMS