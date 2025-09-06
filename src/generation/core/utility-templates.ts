/**
 * Utility Function Templates System
 *
 * Provides reusable patterns for generating common utility functions.
 * Templates cover 80% of use cases and are easily extensible.
 *
 * @see ARCHITECTURE.md for template usage guidelines
 */

import type { UtilityDefinition, UtilityTemplate } from './types'

/**
 * Template generator interface
 */
export interface TemplateGenerator {
	/**
	 * Generate a utility function definition from template configuration
	 */
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition
}

/**
 * Get by field template - filters entities by a specific field value
 * Example: getActionsByType(type: ActionType): Action[]
 */
class GetByFieldTemplate implements TemplateGenerator {
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		if (!template.field) {
			throw new Error('GetByFieldTemplate requires field parameter')
		}

		const field = template.field
		const fieldType = template.config?.fieldType || 'string'
		const functionName = `get${entityNamePlural}By${field.charAt(0).toUpperCase() + field.slice(1)}`
		const getRecordName = `get${entityNamePlural}Record`

		// Avoid reserved keywords as parameter names
		const paramName = field === 'function' ? 'functionValue' : field

		return {
			name: functionName,
			parameters: [{ name: paramName, type: fieldType }],
			returnType: `${entityName}[]`,
			implementation: (writer) => {
				writer.writeLine(`return Object.values(${getRecordName}())`)
				writer.writeLine(
					`  .filter(entity => entity.${field} === ${paramName})`,
				)
			},
			imports: [
				{ from: './data', names: [getRecordName] },
				{ from: './types', names: [entityName], isType: true },
			],
			jsDoc: {
				description: `Gets all ${entityNamePlural.toLowerCase()} that match the specified ${field}.`,
				params: [{ name: paramName, description: `The ${field} to filter by` }],
				returns: `Array of ${entityNamePlural.toLowerCase()} with matching ${field}`,
				examples: [
					`\\nconst filtered = ${functionName}(someValue)\\nconsole.log(\`Found \\$\{filtered.length\} ${entityNamePlural.toLowerCase()}\`)`,
				],
			},
		}
	}
}

/**
 * Get all with property template - filters entities that have a specific property
 * Example: getItemsWithSellPrice(): Item[]
 */
class GetAllWithTemplate implements TemplateGenerator {
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		if (!template.field) {
			throw new Error('GetAllWithTemplate requires field parameter')
		}

		const field = template.field
		const functionName = `get${entityNamePlural}With${field.charAt(0).toUpperCase() + field.slice(1)}`
		const getRecordName = `get${entityNamePlural}Record`

		return {
			name: functionName,
			parameters: [],
			returnType: `${entityName}[]`,
			implementation: (writer) => {
				writer.writeLine(`return Object.values(${getRecordName}())`)
				writer.writeLine(
					`  .filter(entity => entity.${field} !== undefined && entity.${field} !== null)`,
				)
			},
			imports: [
				{ from: './data', names: [getRecordName] },
				{ from: './types', names: [entityName], isType: true },
			],
			jsDoc: {
				description: `Gets all ${entityNamePlural.toLowerCase()} that have a ${field} property.`,
				returns: `Array of ${entityNamePlural.toLowerCase()} with ${field}`,
				examples: [
					`\\nconst withProperty = ${functionName}()\\nconsole.log(\`Found \\$\{withProperty.length\} ${entityNamePlural.toLowerCase()} with ${field}\`)`,
				],
			},
		}
	}
}

/**
 * Sort by field template - sorts entities by a specific field
 * Example: getActionsSortedByLevel(): Action[]
 */
class SortByTemplate implements TemplateGenerator {
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		if (!template.field) {
			throw new Error('SortByTemplate requires field parameter')
		}

		const field = template.field
		const direction = template.config?.direction || 'asc'
		const functionName = `get${entityNamePlural}SortedBy${field.charAt(0).toUpperCase() + field.slice(1)}`
		const getRecordName = `get${entityNamePlural}Record`

		return {
			name: functionName,
			parameters: [],
			returnType: `${entityName}[]`,
			implementation: (writer) => {
				writer.writeLine(`return Object.values(${getRecordName}())`)
				if (direction === 'desc') {
					writer.writeLine(
						`  .sort((a, b) => (b.${field} ?? 0) - (a.${field} ?? 0))`,
					)
				} else {
					writer.writeLine(
						`  .sort((a, b) => (a.${field} ?? 0) - (b.${field} ?? 0))`,
					)
				}
			},
			imports: [
				{ from: './data', names: [getRecordName] },
				{ from: './types', names: [entityName], isType: true },
			],
			jsDoc: {
				description: `Gets all ${entityNamePlural.toLowerCase()} sorted by ${field} in ${direction}ending order.`,
				returns: `Array of ${entityNamePlural.toLowerCase()} sorted by ${field}`,
				examples: [
					`\\nconst sorted = ${functionName}()\\nconsole.log('First item:', sorted[0]?.${field})`,
				],
			},
		}
	}
}

/**
 * Filter by predicate template - applies a custom filter function
 * Example: filterActions(predicate: (action: Action) => boolean): Action[]
 */
class FilterByTemplate implements TemplateGenerator {
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		const functionName = `filter${entityNamePlural}`
		const getRecordName = `get${entityNamePlural}Record`

		return {
			name: functionName,
			parameters: [
				{ name: 'predicate', type: `(entity: ${entityName}) => boolean` },
			],
			returnType: `${entityName}[]`,
			implementation: (writer) => {
				writer.writeLine(
					`return Object.values(${getRecordName}()).filter(predicate)`,
				)
			},
			imports: [
				{ from: './data', names: [getRecordName] },
				{ from: './types', names: [entityName], isType: true },
			],
			jsDoc: {
				description: `Filters ${entityNamePlural.toLowerCase()} using a custom predicate function.`,
				params: [
					{
						name: 'predicate',
						description: `Function that returns true for ${entityNamePlural.toLowerCase()} to include`,
					},
				],
				returns: `Array of ${entityNamePlural.toLowerCase()} that match the predicate`,
				examples: [
					`\\nconst highLevel = ${functionName}(entity => entity.level > 10)\\nconst withName = ${functionName}(entity => entity.name.includes('sword'))`,
				],
			},
		}
	}
}

/**
 * To Map conversion template - converts Record to Map for O(1) lookups
 * Example: toActionsMap(): Map<ActionHrid, Action>
 */
class ToMapTemplate implements TemplateGenerator {
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		const functionName = `to${entityNamePlural}Map`
		const getRecordName = `get${entityNamePlural}Record`
		const hridType = `${entityName}Hrid`

		return {
			name: functionName,
			parameters: [],
			returnType: `Map<${hridType}, ${entityName}>`,
			implementation: (writer) => {
				writer.writeLine(`const record = ${getRecordName}()`)
				writer.writeLine(
					`return new Map(Object.entries(record) as [${hridType}, ${entityName}][])`,
				)
			},
			imports: [
				{ from: './data', names: [getRecordName] },
				{ from: './types', names: [entityName, hridType], isType: true },
			],
			jsDoc: {
				description: `Converts the ${entityNamePlural.toLowerCase()} record to a Map for O(1) lookups.\\nUseful for performance-critical code that needs frequent lookups.`,
				returns: `Map with ${hridType} keys and ${entityName} values`,
				examples: [
					`\\nconst map = ${functionName}()\\nconst entity = map.get('/path/to/entity') // O(1) lookup\\nif (entity) console.log(entity.name)`,
				],
			},
		}
	}
}

/**
 * Template registry
 */
export class UtilityTemplateRegistry {
	private templates: Map<string, TemplateGenerator> = new Map()

	constructor() {
		// Register built-in templates
		this.register('getByField', new GetByFieldTemplate())
		this.register('getAllWith', new GetAllWithTemplate())
		this.register('sortBy', new SortByTemplate())
		this.register('filterBy', new FilterByTemplate())
		this.register('toMap', new ToMapTemplate())
	}

	/**
	 * Register a custom template generator
	 */
	register(type: string, generator: TemplateGenerator): void {
		this.templates.set(type, generator)
	}

	/**
	 * Generate utility function from template
	 */
	generate(
		template: UtilityTemplate,
		entityName: string,
		entityNamePlural: string,
	): UtilityDefinition {
		const generator = this.templates.get(template.type)
		if (!generator) {
			throw new Error(`Unknown template type: ${template.type}`)
		}

		return generator.generate(template, entityName, entityNamePlural)
	}

	/**
	 * Get all registered template types
	 */
	getRegisteredTypes(): string[] {
		return Array.from(this.templates.keys())
	}
}

/**
 * Global template registry instance
 */
export const templateRegistry = new UtilityTemplateRegistry()

/**
 * Generate utilities from templates
 */
export function generateFromTemplates(
	templates: UtilityTemplate[],
	entityName: string,
	entityNamePlural: string,
): UtilityDefinition[] {
	return templates.map((template) =>
		templateRegistry.generate(template, entityName, entityNamePlural),
	)
}
