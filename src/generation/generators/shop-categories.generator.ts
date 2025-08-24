import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface ShopCategory {
	hrid: string
	name: string
	sortIndex: number
}

export class ShopCategoriesGenerator extends BaseGenerator<ShopCategory> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ShopCategory',
			entityNamePlural: 'ShopCategories',
			sourceKey: 'shopCategoryDetailMap',
			outputPath: 'src/generated/types/shop-categories.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ShopCategory> {
		const categories: Record<string, ShopCategory> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const categoryData = data as any
			const category: ShopCategory = {
				hrid: categoryData.hrid,
				name: categoryData.name || '',
				sortIndex: categoryData.sortIndex || 0,
			}
			categories[hrid] = category
		}

		return categories
	}

	protected override generateInterfaces(
		_categories: Record<string, ShopCategory>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'ShopCategoryHrid',
				optional: false,
				description: 'Unique identifier for the shop category',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the shop category',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		this.builder.addInterface('ShopCategory', properties)
	}

	protected override generateUtilities(
		categories: Record<string, ShopCategory>,
	): void {
		super.generateUtilities(categories)

		this.builder.addFunction(
			'sortShopCategoriesByIndex',
			[{ name: 'categories', type: 'ShopCategory[]' }],
			'ShopCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
