import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface ActionCategory {
	hrid: string
	name: string
	type: string
	sortIndex: number
}

export class ActionCategoriesGenerator extends BaseGenerator<ActionCategory> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ActionCategory',
			entityNamePlural: 'ActionCategories',
			sourceKey: 'actionCategoryDetailMap',
			outputPath: 'src/generated/types/action-categories.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ActionCategory> {
		const categories: Record<string, ActionCategory> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const categoryData = data as any
			const category: ActionCategory = {
				hrid: categoryData.hrid,
				name: categoryData.name,
				type: categoryData.type,
				sortIndex: categoryData.sortIndex || 0,
			}

			categories[hrid] = category
		}

		return categories
	}

	protected override generateInterfaces(
		_categories: Record<string, ActionCategory>,
	): void {
		// Generate ActionTypeHrid type based on unique types
		const uniqueTypes = new Set(
			Object.values(_categories).map((cat) => cat.type),
		)
		const actionTypes = Array.from(uniqueTypes).sort()

		this.builder.addTypeAlias(
			'ActionTypeHrid',
			actionTypes.map((type) => `'${type}'`).join(' | '),
		)

		// Generate main interface
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: `${this.config.entityName}Hrid`,
				description: 'Unique identifier for the action category',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the action category',
			},
			{
				name: 'type',
				type: 'ActionTypeHrid',
				description: 'Type of actions in this category',
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Display sort order',
			},
		]

		this.builder.addInterface(this.config.entityName, properties)
	}

	protected override generateUtilities(
		categories: Record<string, ActionCategory>,
	): void {
		// Call parent utility functions
		super.generateUtilities(categories)

		// Group categories by type
		const categoriesByType: Record<string, string[]> = {}
		Object.values(categories).forEach((category) => {
			if (!categoriesByType[category.type]) {
				categoriesByType[category.type] = []
			}
			categoriesByType[category.type]!.push(category.hrid)
		})

		// Generate constants for each action type
		Object.entries(categoriesByType).forEach(([type, hrids]) => {
			const constName = type
				.replace(/^\/action_types\//, '')
				.toUpperCase()
				.replace(/-/g, '_')

			this.builder.addConstArray(`${constName}_CATEGORIES`, hrids, true)
		})

		// Generate CATEGORIES_BY_TYPE map
		const mapEntries = Object.entries(categoriesByType)
			.map(
				([type, hrids]) =>
					`  '${type}': [${hrids.map((h) => `'${h}'`).join(', ')}]`,
			)
			.join(',\n')

		this.builder.addConstVariable(
			'ACTION_CATEGORIES_BY_TYPE',
			'Partial<Record<ActionTypeHrid, readonly ActionCategoryHrid[]>>',
			`{\n${mapEntries}\n}`,
		)

		// Add helper functions
		this.builder.addFunction(
			'getCategoriesByType',
			[{ name: 'type', type: 'ActionTypeHrid' }],
			'ActionCategory[]',
			(writer) => {
				writer.writeLine('const hrids = ACTION_CATEGORIES_BY_TYPE[type] || []')
				writer.writeLine(
					'return hrids.map(hrid => ACTIONCATEGORIES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getCategoryType',
			[{ name: 'hrid', type: 'ActionCategoryHrid' }],
			'ActionTypeHrid | undefined',
			(writer) => {
				writer.writeLine('const category = ACTIONCATEGORIES.get(hrid)')
				writer.writeLine('return category?.type as ActionTypeHrid | undefined')
			},
		)

		this.builder.addFunction(
			'sortCategoriesByIndex',
			[{ name: 'categories', type: 'ActionCategory[]' }],
			'ActionCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		this.builder.addFunction(
			'getCategoryByName',
			[{ name: 'name', type: 'string' }],
			'ActionCategory | undefined',
			(writer) => {
				writer.writeLine('return getAllActionCategories().find(')
				writer.writeLine(
					'  cat => cat.name.toLowerCase() === name.toLowerCase()',
				)
				writer.writeLine(')')
			},
		)

		this.builder.addFunction(
			'searchActionCategories',
			[{ name: 'query', type: 'string' }],
			'ActionCategory[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllActionCategories().filter(cat =>')
				writer.writeLine('  cat.name.toLowerCase().includes(lowerQuery) ||')
				writer.writeLine('  cat.type.toLowerCase().includes(lowerQuery)')
				writer.writeLine(')')
			},
		)

		// Generate action type list
		const uniqueTypes = new Set(
			Object.values(categories).map((cat) => cat.type),
		)
		const actionTypes = Array.from(uniqueTypes).sort()

		this.builder.addConstArray('ACTION_CATEGORY_TYPES', actionTypes, true)

		this.builder.addFunction(
			'getAllActionTypes',
			[],
			'ActionTypeHrid[]',
			(writer) => {
				writer.writeLine('return [...ACTION_CATEGORY_TYPES]')
			},
		)

		this.builder.addTypeGuard(
			'isValidActionType',
			'type',
			'string',
			'ActionTypeHrid',
			'ACTION_CATEGORY_TYPES.includes(type as ActionTypeHrid)',
		)
	}
}
