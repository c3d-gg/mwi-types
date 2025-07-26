import { BaseGenerator } from '../base/base-generator'
import type { PropertyDefinition } from '../base/types'
import type { TaskShopItem as TaskShopItemEntity } from '../../types/source-data'

export class TaskShopItemsGenerator extends BaseGenerator<TaskShopItemEntity> {
  constructor() {
    const config = {
      entityName: 'TaskShopItem',
      entityNamePlural: 'TaskShopItems',
      sourceKey: 'taskShopItemDetailMap' as const,
      outputFilename: 'task-shop-items',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, TaskShopItemEntity> {
    return this.getEntitiesFromGameData() as Record<string, TaskShopItemEntity>
  }

  protected defineSchemaProperties(entity: TaskShopItemEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'TaskShopItemHridEnum',
        description: 'Human readable ID for the task shop item'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the task shop item'
      },
      {
        name: 'itemHrid',
        type: 'ref',
        refName: 'ItemHridEnum',
        description: 'Reference to the item being sold'
      },
      {
        name: 'cost',
        type: 'object',
        properties: [
          {
            name: 'itemHrid',
            type: 'ref',
            refName: 'ItemHridEnum',
            description: 'Reference to the currency item required'
          },
          {
            name: 'count',
            type: 'number',
            description: 'Amount of currency required'
          }
        ],
        description: 'Cost information for purchasing this item'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override getZodImports() {
    return [
      { from: '../../game-logic/items', items: ['ItemHridEnum'] }
    ] as any
  }

  protected override generateAdditionalExports(entities: Record<string, TaskShopItemEntity>): string[] {
    return [
      '// Import item types for utility functions',
      'import type { ItemHrid } from \'../schemas/zod/items\'',
      '',
      '// Utility functions',
      'export function getTaskShopItemName(hrid: TaskShopItemHrid): string {',
      '  return TASKSHOPITEMS[hrid].name',
      '}',
      '',
      'export function getTaskShopItemCost(hrid: TaskShopItemHrid): { itemHrid: ItemHrid; count: number } {',
      '  return TASKSHOPITEMS[hrid].cost',
      '}',
      '',
      'export function getTaskShopItemsForItem(itemHrid: ItemHrid): TaskShopItem[] {',
      '  return Object.values(TASKSHOPITEMS).filter(item => item.itemHrid === itemHrid)',
      '}',
      '',
      'export function getTaskShopItemsRequiringCurrency(currencyHrid: ItemHrid): TaskShopItem[] {',
      '  return Object.values(TASKSHOPITEMS).filter(item => item.cost.itemHrid === currencyHrid)',
      '}',
      '',
      'export function canAffordTaskShopItem(hrid: TaskShopItemHrid, availableQuantity: number): boolean {',
      '  const item = TASKSHOPITEMS[hrid]',
      '  return availableQuantity >= item.cost.count',
      '}',
      '',
      'export function getTaskShopItemPurchaseQuantity(hrid: TaskShopItemHrid, availableQuantity: number): number {',
      '  const item = TASKSHOPITEMS[hrid]',
      '  return Math.floor(availableQuantity / item.cost.count)',
      '}',
      '',
      '// Group by cost currency',
      'export const TASK_SHOP_ITEMS_BY_CURRENCY = Object.values(TASKSHOPITEMS).reduce<Record<ItemHrid, TaskShopItem[]>>((acc, item) => {',
      '  const currency = item.cost.itemHrid',
      '  if (!acc[currency]) acc[currency] = []',
      '  acc[currency].push(item)',
      '  return acc',
      '}, {} as Record<ItemHrid, TaskShopItem[]>)'
    ]
  }
}