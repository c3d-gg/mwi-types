/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.592Z
 */

import { z } from 'zod'
import { TaskShopItemHridEnum, TaskShopItemSchema, type TaskShopItem } from '../schemas/zod/task-shop-items.js'
// Re-export HRID enum from schema
export { TaskShopItemHridEnum } from '../schemas/zod/task-shop-items.js'
// Re-export schema
export { TaskShopItemSchema } from '../schemas/zod/task-shop-items.js'

// Type definitions
type TaskShopItemHrid = z.infer<typeof TaskShopItemHridEnum>

// Data
export const TASKSHOPITEMS: Record<TaskShopItemHrid, TaskShopItem> = {
  '/task_shop_items/large_artisans_crate': {
    "hrid": "/task_shop_items/large_artisans_crate",
    "name": "Large Artisan's Crate",
    "itemHrid": "/items/large_artisans_crate",
    "cost": {
      "itemHrid": "/items/task_token",
      "count": 30
    },
    "sortIndex": 3
  },
  '/task_shop_items/large_meteorite_cache': {
    "hrid": "/task_shop_items/large_meteorite_cache",
    "name": "Large Meteorite Cache",
    "itemHrid": "/items/large_meteorite_cache",
    "cost": {
      "itemHrid": "/items/task_token",
      "count": 30
    },
    "sortIndex": 2
  },
  '/task_shop_items/large_treasure_chest': {
    "hrid": "/task_shop_items/large_treasure_chest",
    "name": "Large Treasure Chest",
    "itemHrid": "/items/large_treasure_chest",
    "cost": {
      "itemHrid": "/items/task_token",
      "count": 30
    },
    "sortIndex": 4
  },
  '/task_shop_items/task_crystal': {
    "hrid": "/task_shop_items/task_crystal",
    "name": "Task Crystal",
    "itemHrid": "/items/task_crystal",
    "cost": {
      "itemHrid": "/items/task_token",
      "count": 50
    },
    "sortIndex": 1
  }
} as const satisfies Record<TaskShopItemHrid, TaskShopItem>

// HRID utilities

/**
 * Check if a taskshopitem HRID is valid
 */
export function validateTaskShopItemHrid(hrid: string): hrid is TaskShopItemHrid {
  return hrid in TASKSHOPITEMS
}

/**
 * Check if a taskshopitem exists
 */
export function taskshopitemExists(hrid: string): boolean {
  return hrid in TASKSHOPITEMS
}

// Getter functions
export function getTaskShopItem(hrid: TaskShopItemHrid): TaskShopItem {
  return TASKSHOPITEMS[hrid]
}

export function getAllTaskShopItems(): TaskShopItem[] {
  return Object.values(TASKSHOPITEMS)
}

export function getTaskShopItemsSortedByIndex(): TaskShopItem[] {
  return getAllTaskShopItems().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { TaskShopItem }
export type { TaskShopItemHrid }
export type TaskShopItemId = keyof typeof TASKSHOPITEMS
export type TaskShopItemData = typeof TASKSHOPITEMS

// Import item types for utility functions

import type { ItemHrid } from '../schemas/zod/items.js'



// Utility functions

export function getTaskShopItemName(hrid: TaskShopItemHrid): string {

  return TASKSHOPITEMS[hrid].name

}



export function getTaskShopItemCost(hrid: TaskShopItemHrid): { itemHrid: ItemHrid; count: number } {

  return TASKSHOPITEMS[hrid].cost

}



export function getTaskShopItemsForItem(itemHrid: ItemHrid): TaskShopItem[] {

  return Object.values(TASKSHOPITEMS).filter(item => item.itemHrid === itemHrid)

}



export function getTaskShopItemsRequiringCurrency(currencyHrid: ItemHrid): TaskShopItem[] {

  return Object.values(TASKSHOPITEMS).filter(item => item.cost.itemHrid === currencyHrid)

}



export function canAffordTaskShopItem(hrid: TaskShopItemHrid, availableQuantity: number): boolean {

  const item = TASKSHOPITEMS[hrid]

  return availableQuantity >= item.cost.count

}



export function getTaskShopItemPurchaseQuantity(hrid: TaskShopItemHrid, availableQuantity: number): number {

  const item = TASKSHOPITEMS[hrid]

  return Math.floor(availableQuantity / item.cost.count)

}



// Group by cost currency

export const TASK_SHOP_ITEMS_BY_CURRENCY = Object.values(TASKSHOPITEMS).reduce<Record<ItemHrid, TaskShopItem[]>>((acc, item) => {

  const currency = item.cost.itemHrid

  if (!acc[currency]) acc[currency] = []

  acc[currency].push(item)

  return acc

}, {} as Record<ItemHrid, TaskShopItem[]>)