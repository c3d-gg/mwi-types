import { ModularBaseGenerator } from '../../core/generator.base.modular'

export interface ShopCategory {
	hrid: ShopCategoryHrid
	name: string
	sortIndex: number
}

export type ShopCategoryHrid = string & { __brand: 'ShopCategoryHrid' }

export class ModularShopCategoriesGenerator extends ModularBaseGenerator<ShopCategory> {
	constructor() {
		super({
			entityName: 'ShopCategory',
			entityNamePlural: 'ShopCategories',
			sourceKey: 'shopCategoryDetailMap',
			outputPath: 'src/generated/shopcategories',

			// Simple entity - use standard templates
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],
		})
	}

	// Simple transformation for basic entity
	protected override transformEntity(rawData: any): ShopCategory {
		return {
			hrid: rawData.hrid as ShopCategoryHrid,
			name: rawData.name,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularShopCategoriesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
