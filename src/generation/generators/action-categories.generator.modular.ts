import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface ActionCategory {
	hrid: string
	name: string
	type: string
	sortIndex: number
}

/**
 * Modular ActionCategories Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularActionCategoriesGenerator extends ModularBaseGenerator<ActionCategory> {
	constructor() {
		super({
			entityName: 'ActionCategory',
			entityNamePlural: 'ActionCategories',
			sourceKey: 'actionCategoryDetailMap',
			outputPath: './src/generated/action-categories/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, ActionCategory> {
		const actionCategories: Record<string, ActionCategory> = {}
		const categoryMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(categoryMap)) {
			const actionCategory = this.extractActionCategory(hrid, data as any)
			actionCategories[hrid] = actionCategory
		}

		console.log(`  📋 Extracted ${Object.keys(actionCategories).length} action categories`)

		return actionCategories
	}

	private extractActionCategory(hrid: string, data: any): ActionCategory {
		return {
			hrid,
			name: data.name || '',
			type: data.type || '',
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	protected override generateTypes(entities: Record<string, ActionCategory>): void {
		const types = this.moduleBuilder.getFile('types')
		
		// Generate ActionTypeHrid type based on unique types
		const uniqueTypes = new Set(Object.values(entities).map((cat) => cat.type))
		const actionTypes = Array.from(uniqueTypes).sort()
		
		// Add ActionTypeHrid type alias
		this.moduleBuilder.addType(
			'ActionTypeHrid',
			actionTypes.map((type) => `'${type}'`).join(' | ')
		)
		this.moduleBuilder.addExport({ name: 'ActionTypeHrid', source: './types', isType: true })
		
		// Main ActionCategory interface
		const categoryProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'ActionCategoryHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'type', type: 'ActionTypeHrid', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.moduleBuilder.addInterface('ActionCategory', categoryProps)
		
		// Export the ActionCategory interface
		this.moduleBuilder.addExport({ name: 'ActionCategory', source: './types', isType: true })
	}

	protected override generateConstants(entities: Record<string, ActionCategory>): void {
		// Call parent to generate base constants (HRIDS)
		super.generateConstants(entities)
		
		// Generate action type list constant
		const uniqueTypes = new Set(Object.values(entities).map((cat) => cat.type))
		const actionTypes = Array.from(uniqueTypes).sort()
		
		this.moduleBuilder.addConstArray('ACTION_CATEGORY_TYPES', actionTypes)
		this.moduleBuilder.addExport({ name: 'ACTION_CATEGORY_TYPES', source: './constants' })
	}

	protected override generateLookups(entities: Record<string, ActionCategory>): void {
		// Group categories by type
		const categoriesByType: Record<string, string[]> = {}
		
		Object.values(entities).forEach((category) => {
			if (!categoriesByType[category.type]) {
				categoriesByType[category.type] = []
			}
			categoriesByType[category.type]!.push(category.hrid)
		})

		// Generate constants for each action type
		const lookups = this.moduleBuilder.getFile('lookups')
		
		// Add necessary type imports to lookups
		lookups.addImport('./types', ['ActionCategoryHrid'], true)
		
		Object.entries(categoriesByType).forEach(([type, hrids]) => {
			const constName = type
				.replace(/^\/action_types\//, '')
				.toUpperCase()
				.replace(/-/g, '_')

			lookups.addConstArray(`${constName}_CATEGORIES`, hrids.sort())
		})

		// Generate CATEGORIES_BY_TYPE map as a static lookup
		const lookupEntries: Record<string, readonly string[]> = {}
		Object.entries(categoriesByType).forEach(([type, hrids]) => {
			lookupEntries[type] = hrids.sort()
		})
		
		this.moduleBuilder.addStaticLookup(
			'ACTION_CATEGORIES_BY_TYPE',
			lookupEntries,
			'ActionTypeHrid',  // keyType
			'readonly ActionCategoryHrid[]'  // valueType
		)
	}

	protected override generateUtilities(entities: Record<string, ActionCategory>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Get categories by type
		this.moduleBuilder.addUtilityFunction(
			'getCategoriesByType',
			[{ name: 'type', type: 'ActionTypeHrid' }],
			'ActionCategory[]',
			(writer) => {
				writer.writeLine('const hrids = ACTION_CATEGORIES_BY_TYPE[type] || []')
				writer.writeLine('return hrids')
				writer.indent().writeLine('.map(hrid => getActionCategory(hrid))')
				writer.indent().writeLine('.filter((cat): cat is ActionCategory => cat !== undefined)')
			},
			[
				{ from: './types', names: ['ActionCategory', 'ActionTypeHrid'], isType: true },
				{ from: './lookups', names: ['ACTION_CATEGORIES_BY_TYPE'] },
			]
		)

		// Get category type
		this.moduleBuilder.addUtilityFunction(
			'getCategoryType',
			[{ name: 'hrid', type: 'ActionCategoryHrid' }],
			'ActionTypeHrid | undefined',
			(writer) => {
				writer.writeLine('const category = getActionCategory(hrid)')
				writer.writeLine('return category?.type')
			},
			[
				{ from: './types', names: ['ActionTypeHrid', 'ActionCategoryHrid'], isType: true },
			]
		)

		// Sort categories by index
		this.moduleBuilder.addUtilityFunction(
			'sortCategoriesByIndex',
			[{ name: 'categories', type: 'ActionCategory[]' }],
			'ActionCategory[]',
			(writer) => {
				writer.writeLine('return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['ActionCategory'], isType: true },
			]
		)

		// Get category by name
		this.moduleBuilder.addUtilityFunction(
			'getCategoryByName',
			[{ name: 'name', type: 'string' }],
			'ActionCategory | undefined',
			(writer) => {
				writer.writeLine('return getAllActionCategories().find(')
				writer.writeLine('  cat => cat.name.toLowerCase() === name.toLowerCase()')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['ActionCategory'], isType: true },
			]
		)

		// Search action categories
		this.moduleBuilder.addUtilityFunction(
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
			[
				{ from: './types', names: ['ActionCategory'], isType: true },
			]
		)

		// Get all action types
		this.moduleBuilder.addUtilityFunction(
			'getAllActionTypes',
			[],
			'ActionTypeHrid[]',
			(writer) => {
				writer.writeLine('return [...ACTION_CATEGORY_TYPES]')
			},
			[
				{ from: './types', names: ['ActionTypeHrid'], isType: true },
				{ from: './constants', names: ['ACTION_CATEGORY_TYPES'] },
			]
		)

		// Is valid action type guard
		this.moduleBuilder.addUtilityFunction(
			'isValidActionType',
			[{ name: 'type', type: 'string' }],
			'type is ActionTypeHrid',
			(writer) => {
				writer.writeLine('return ACTION_CATEGORY_TYPES.includes(type as ActionTypeHrid)')
			},
			[
				{ from: './types', names: ['ActionTypeHrid'], isType: true },
				{ from: './constants', names: ['ACTION_CATEGORY_TYPES'] },
			]
		)
	}
}