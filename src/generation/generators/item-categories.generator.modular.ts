import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface ItemCategory {
	hrid: string
	name: string
	sortIndex: number
}

/**
 * Modular ItemCategories Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularItemCategoriesGenerator extends ModularBaseGenerator<ItemCategory> {
	constructor() {
		super({
			entityName: 'ItemCategory',
			entityNamePlural: 'ItemCategories',
			sourceKey: 'itemCategoryDetailMap',
			outputPath: './src/generated/item-categories/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, ItemCategory> {
		const itemCategories: Record<string, ItemCategory> = {}
		const categoryMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(categoryMap)) {
			const itemCategory = this.extractItemCategory(hrid, data as any)
			itemCategories[hrid] = itemCategory
		}

		console.log(`  📂 Extracted ${Object.keys(itemCategories).length} item categories`)

		return itemCategories
	}

	private extractItemCategory(hrid: string, data: any): ItemCategory {
		return {
			hrid,
			name: data.name || '',
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	protected override generateTypes(entities: Record<string, ItemCategory>): void {
		// Main ItemCategory interface
		const categoryProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'ItemCategoryHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.moduleBuilder.addInterface('ItemCategory', categoryProps)
		
		// Export the ItemCategory interface
		this.moduleBuilder.addExport({ name: 'ItemCategory', source: './types', isType: true })
	}

	protected override generateLookups(entities: Record<string, ItemCategory>): void {
		// Item categories are simple, no special lookups needed beyond the base constants
		// The base generator already creates ITEM_CATEGORY_HRIDS constant array
	}

	protected override generateUtilities(entities: Record<string, ItemCategory>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Add category-specific utilities
		
		// Get categories sorted by index
		this.moduleBuilder.addUtilityFunction(
			'sortItemCategoriesByIndex',
			[{ name: 'categories', type: 'ItemCategory[]' }],
			'ItemCategory[]',
			(writer) => {
				writer.writeLine('return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['ItemCategory'], isType: true },
			]
		)

		// Get all categories sorted
		this.moduleBuilder.addUtilityFunction(
			'getItemCategoriesSortedByIndex',
			[],
			'ItemCategory[]',
			(writer) => {
				writer.writeLine('return sortItemCategoriesByIndex(getAllItemCategories())')
			},
			[
				{ from: './types', names: ['ItemCategory'], isType: true },
			]
		)

		// Get category by name
		this.moduleBuilder.addUtilityFunction(
			'getItemCategoryByName',
			[{ name: 'name', type: 'string' }],
			'ItemCategory | undefined',
			(writer) => {
				writer.writeLine('return getAllItemCategories().find(category => category.name.toLowerCase() === name.toLowerCase())')
			},
			[
				{ from: './types', names: ['ItemCategory'], isType: true },
			]
		)
	}
}