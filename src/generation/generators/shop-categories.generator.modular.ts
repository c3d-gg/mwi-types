import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface ShopCategory {
	hrid: string
	name: string
	sortIndex: number
}

export class ShopCategoriesGeneratorModular extends ModularBaseGenerator<ShopCategory> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ShopCategory',
			entityNamePlural: 'ShopCategories',
			sourceKey: 'shopCategoryDetailMap',
			outputPath: './src/generated/shop-categories',
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
			const categoryData = this.cleanEntityData(data as any)
			const category: ShopCategory = {
				hrid: categoryData.hrid || '',
				name: categoryData.name || '',
				sortIndex: typeof categoryData.sortIndex === 'number' ? categoryData.sortIndex : 0,
			}
			categories[hrid] = category
		}

		return categories
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['SHOPCATEGORY_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType('ShopCategoryHrid', 'typeof SHOPCATEGORY_HRIDS[number]')

		// Generate interface
		typesBuilder.addInterface('ShopCategory', [
			{ name: 'hrid', type: 'ShopCategoryHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'ShopCategory', 'type')
		this.moduleBuilder.addExport('types', 'ShopCategoryHrid', 'type')
	}

	protected override generateConstants(entities: Record<string, ShopCategory>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('SHOPCATEGORY_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'SHOPCATEGORY_HRIDS')
	}

	protected override generateData(entities: Record<string, ShopCategory>): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport('./types', ['ShopCategory', 'ShopCategoryHrid'], true)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'SHOPCATEGORIES',
			'ShopCategoryHrid',
			'ShopCategory',
			entries,
			'getShopCategoriesMap',
		)

		this.moduleBuilder.addExport('data', 'getShopCategoriesMap')
	}

	protected override generateLookups(entities: Record<string, ShopCategory>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['ShopCategoryHrid'], true)

		// Categories sorted by index
		const sorted = Object.values(entities)
			.sort((a, b) => a.sortIndex - b.sortIndex)
			.map(cat => cat.hrid)

		lookupsBuilder.addConstArray('SHOPCATEGORIES_BY_INDEX', sorted, true)
		this.moduleBuilder.addExport('lookups', 'SHOPCATEGORIES_BY_INDEX')
	}

	protected override generateUtils(): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types
		utilsBuilder.addImport('./types', ['ShopCategory', 'ShopCategoryHrid'], true)
		utilsBuilder.addImport('./data', ['getShopCategoriesMap'], false)
		utilsBuilder.addImport('./constants', ['SHOPCATEGORY_HRIDS'], false)
		utilsBuilder.addImport('./lookups', ['SHOPCATEGORIES_BY_INDEX'], false)

		// Type guard
		utilsBuilder.addFunction(
			'isShopCategoryHrid',
			[{ name: 'value', type: 'string' }],
			'value is ShopCategoryHrid',
			(writer) => {
				writer.writeLine('return SHOPCATEGORY_HRIDS.includes(value as ShopCategoryHrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'isShopCategoryHrid')

		// Basic getters
		utilsBuilder.addFunction(
			'getShopCategory',
			[{ name: 'hrid', type: 'ShopCategoryHrid' }],
			'ShopCategory | undefined',
			(writer) => {
				writer.writeLine('return getShopCategoriesMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getShopCategory')

		utilsBuilder.addFunction(
			'requireShopCategory',
			[{ name: 'hrid', type: 'ShopCategoryHrid' }],
			'ShopCategory',
			(writer) => {
				writer.writeLine('const category = getShopCategoriesMap().get(hrid)')
				writer.writeLine('if (!category) {')
				writer.writeLine(`  throw new Error(\`ShopCategory not found: \${hrid}\`)`)
				writer.writeLine('}')
				writer.writeLine('return category')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireShopCategory')

		utilsBuilder.addFunction('getAllShopCategories', [], 'ShopCategory[]', (writer) => {
			writer.writeLine('return Array.from(getShopCategoriesMap().values())')
		})
		this.moduleBuilder.addExport('utils', 'getAllShopCategories')

		// Sort function
		utilsBuilder.addFunction(
			'sortShopCategoriesByIndex',
			[{ name: 'categories', type: 'ShopCategory[]' }],
			'ShopCategory[]',
			(writer) => {
				writer.writeLine('return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)
		this.moduleBuilder.addExport('utils', 'sortShopCategoriesByIndex')

		// Get sorted categories
		utilsBuilder.addFunction('getShopCategoriesSorted', [], 'ShopCategory[]', (writer) => {
			writer.writeLine('return SHOPCATEGORIES_BY_INDEX.map(hrid => getShopCategoriesMap().get(hrid)!)')
		})
		this.moduleBuilder.addExport('utils', 'getShopCategoriesSorted')
	}
}