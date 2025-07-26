import { BaseGenerator } from "../base/base-generator"
import type { PropertyDefinition } from "../base/types"

export interface ShopCategoryEntity {
  hrid: string
  name: string
  sortIndex: number
}

export class ShopCategoriesGenerator extends BaseGenerator<ShopCategoryEntity> {
  constructor() {
    super({
      entityName: "ShopCategory",
      entityNamePlural: "ShopCategories",
      sourceKey: "shopCategoryDetailMap",
      outputFilename: "shop-categories",
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    })
  }

  protected extractEntities(): Record<string, ShopCategoryEntity> {
    return this.getEntitiesFromGameData() as Record<string, ShopCategoryEntity>
  }

  protected defineSchemaProperties(entity: ShopCategoryEntity): PropertyDefinition[] {
    return [
      {
        name: "hrid",
        type: "ref",
        refName: "ShopCategoryHridEnum",
        description: "Shop category HRID"
      },
      {
        name: "name", 
        type: "string",
        description: "Display name of the shop category"
      },
      {
        name: "sortIndex",
        type: "number",
        description: "Sort order for displaying categories"
      }
    ]
  }


  protected override generateAdditionalExports(entities: Record<string, ShopCategoryEntity>): string[] {
    return [
      `// Additional utility functions`,
      `export function getShopCategoryName(hrid: ShopCategoryHrid): string {
  return SHOPCATEGORIES[hrid].name
}`,
      `export function isValidShopCategory(hrid: string): hrid is ShopCategoryHrid {
  return hrid in SHOPCATEGORIES
}`
    ]
  }
}