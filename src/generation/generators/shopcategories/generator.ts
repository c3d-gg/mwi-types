import { ModularBaseGenerator } from '../../core/generator.base.modular'
import type { InterfaceDefinition } from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface ShopCategory {
	hrid: string
	name: string
	sortIndex: number
}

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

	// MANDATORY: Explicit interface definition to prevent HridHrid bug
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ShopCategory',
				properties: [
					{ name: 'hrid', type: 'ShopCategoryHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'name', type: 'string' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// Simple transformation for basic entity
	protected override transformEntity(rawData: any): ShopCategory {
		return {
			hrid: rawData.hrid,
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
