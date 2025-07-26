import { BaseGenerator } from "../base/base-generator"
import type { PropertyDefinition } from "../base/types"
import { extractHrids, generateBrandedHridType } from "../base/hrid-generator"
import { createOutputPath, writeGeneratedFile } from "../base/file-writer"
import { PATHS } from "../../config/paths"
import { z } from "zod"

export interface ShopItemCost {
  itemHrid: string
  count: number
}

export interface ShopItemEntity {
  hrid: string
  name: string // Required by BaseEntity
  category: string
  itemHrid: string
  costs: ShopItemCost[]
  sortIndex: number
}

export class ShopItemsGenerator extends BaseGenerator<ShopItemEntity> {
  constructor() {
    super({
      entityName: "ShopItem",
      entityNamePlural: "ShopItems",
      sourceKey: "shopItemDetailMap",
      outputFilename: "shop-items",
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    })
  }

  protected extractEntities(): Record<string, ShopItemEntity> {
    const entities = this.getEntitiesFromGameData() as Record<string, any>
    const result: Record<string, ShopItemEntity> = {}
    
    // Add name property to each entity since it's not in the data
    for (const [hrid, entity] of Object.entries(entities)) {
      result[hrid] = {
        ...entity,
        name: hrid.split('/').pop() || hrid // Generate name from HRID
      }
    }
    
    return result
  }

  protected defineSchemaProperties(entity: ShopItemEntity): PropertyDefinition[] {
    return [
      {
        name: "hrid",
        type: "ref",
        refName: "ShopItemHridEnum",
        description: "Shop item HRID"
      },
      {
        name: "category",
        type: "string", // Will be typed via manual imports
        description: "Shop category HRID this item belongs to"
      },
      {
        name: "itemHrid",
        type: "string", // Will be typed via manual imports
        description: "The actual item HRID being sold"
      },
      {
        name: "costs",
        type: "array",
        items: {
          name: "cost", // Required name for array item
          type: "object",
          properties: [
            {
              name: "itemHrid",
              type: "string", // Will be typed via manual imports
              description: "Item HRID used as currency"
            },
            {
              name: "count",
              type: "number",
              description: "Amount of the currency required"
            }
          ]
        },
        description: "Array of cost requirements for purchasing this item"
      },
      {
        name: "sortIndex",
        type: "number",
        description: "Sort order for displaying items within their category"
      }
    ]
  }


  protected override generateImports(): string {
    return [
      "import { z } from 'zod'",
      "import { ShopItemHridEnum, ShopItemSchema, type ShopItem } from '../schemas/zod/shop-items'",
      "import { ItemHridEnum, type ItemHrid } from '../game-logic/items'",
      "import { ShopCategoryHridEnum, type ShopCategoryHrid } from '../game-logic/shop-categories'",
    ].join("\n")
  }

  protected override async generateGameLogicFile(entities: Record<string, ShopItemEntity>): Promise<void> {
    const imports = this.generateImports()
    
    // Generate basic data using parent method pattern
    const dataEntries = Object.entries(entities).map(([hrid, entity]) => {
      const entityData = this.transformEntityForOutput(entity)
      return `  '${hrid}': ${JSON.stringify(entityData, null, 2).replace(/\n/g, '\n  ')}`
    }).join(',\n')

    // Group shop items by category
    const itemsByCategory: Record<string, string[]> = {}
    Object.entries(entities).forEach(([hrid, item]) => {
      const category = item.category
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = []
      }
      itemsByCategory[category]!.push(hrid)
    })

    const groupedData = `// Shop items grouped by category
export const SHOP_ITEMS_BY_CATEGORY: Record<ShopCategoryHrid, readonly ShopItemHrid[]> = {
${Object.entries(itemsByCategory)
  .map(([category, hrids]) => 
    `  '${category}': [${hrids.map(h => `'${h}'`).join(", ")}] as const`
  )
  .join(",\n")}
} as const satisfies Record<ShopCategoryHrid, readonly ShopItemHrid[]>`

    const content = `${imports}

// Re-export HRID enum from schema
export { ShopItemHridEnum } from '../schemas/zod/shop-items'

// Re-export schema
export { ShopItemSchema } from '../schemas/zod/shop-items'

// Type definitions
type ShopItemHrid = z.infer<typeof ShopItemHridEnum>

// Data
export const SHOPITEMS: Record<ShopItemHrid, ShopItem> = {
${dataEntries}
} as const satisfies Record<ShopItemHrid, ShopItem>

${groupedData}

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
export type ShopItemData = typeof SHOPITEMS`

    const outputPath = createOutputPath(PATHS.gameLogic, '', this.config.outputFilename)
    await writeGeneratedFile(outputPath, content, { format: false })
  }


  protected override transformEntityForOutput(entity: ShopItemEntity): any {
    // Transform entity to ensure proper references
    return {
      hrid: entity.hrid,
      category: entity.category,
      itemHrid: entity.itemHrid,
      costs: entity.costs.map(cost => ({
        itemHrid: cost.itemHrid,
        count: cost.count
      })),
      sortIndex: entity.sortIndex
    }
  }
}