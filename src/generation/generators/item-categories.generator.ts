import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface ItemCategory {
	hrid: string
	name: string
	sortIndex: number
}

export class ItemCategoriesGenerator extends BaseGenerator<ItemCategory> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ItemCategory',
			entityNamePlural: 'ItemCategories',
			sourceKey: 'itemCategoryDetailMap',
			outputPath: 'src/generated/types/item-categories.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ItemCategory> {
		const itemCategories: Record<string, ItemCategory> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const categoryData = data as any
			const itemCategory: ItemCategory = {
				hrid: categoryData.hrid,
				name: categoryData.name || '',
				sortIndex: categoryData.sortIndex || 0,
			}
			itemCategories[hrid] = itemCategory
		}

		return itemCategories
	}

	protected override generateInterfaces(
		_itemCategories: Record<string, ItemCategory>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'ItemCategoryHrid',
				optional: false,
				description: 'Unique identifier for the item category',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the item category',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		this.builder.addInterface('ItemCategory', properties)
	}

	protected override generateUtilities(
		itemCategories: Record<string, ItemCategory>,
	): void {
		super.generateUtilities(itemCategories)

		this.builder.addFunction(
			'sortItemCategoriesByIndex',
			[{ name: 'categories', type: 'ItemCategory[]' }],
			'ItemCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
