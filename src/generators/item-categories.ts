import { BaseGenerator } from './base/base-generator'
import type { GeneratorConfig, PropertyDefinition, BaseEntity } from './base/types'
import type { GameData } from '../types/source-data'

interface ItemCategory extends BaseEntity {
  hrid: string
  name: string
  pluralName: string
  sortIndex: number
}

export class ItemCategoriesGenerator extends BaseGenerator<ItemCategory> {
  constructor() {
    super({
      entityName: 'ItemCategory',
      entityNamePlural: 'ItemCategories',
      sourceKey: 'itemCategoryDetailMap',
      outputFilename: 'item-categories',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true,
    })
  }

  protected override extractEntities(): Record<string, any> {
    return this.gameData!.itemCategoryDetailMap
  }

  protected override defineSchemaProperties(entity: any): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ItemCategoryHridEnum',
        description: 'Item category HRID',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the item category',
      },
      {
        name: 'pluralName',
        type: 'string',
        description: 'Plural form of the category name',
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying categories',
      },
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ItemCategory>): string[] {
    return [`
// Item category utilities
export function getItemCategoryName(hrid: ItemCategoryHrid): string {
  return ITEMCATEGORIES[hrid].name
}

export function getItemCategoryPluralName(hrid: ItemCategoryHrid): string {
  return ITEMCATEGORIES[hrid].pluralName
}`
    ]
  }
}