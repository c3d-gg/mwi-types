import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface ItemLocation {
	hrid: string
	name: string
	sortIndex: number
}

export class ItemLocationsGeneratorModular extends ModularBaseGenerator<ItemLocation> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ItemLocation',
			entityNamePlural: 'ItemLocations',
			sourceKey: 'itemLocationDetailMap',
			outputPath: './src/generated/item-locations',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ItemLocation> {
		const locations: Record<string, ItemLocation> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const locationData = this.cleanEntityData(data as any)
			const location: ItemLocation = {
				hrid: locationData.hrid || '',
				name: locationData.name || '',
				sortIndex: typeof locationData.sortIndex === 'number' ? locationData.sortIndex : 0,
			}
			locations[hrid] = location
		}

		return locations
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['ITEMLOCATION_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType('ItemLocationHrid', 'typeof ITEMLOCATION_HRIDS[number]')

		// Generate interface
		typesBuilder.addInterface('ItemLocation', [
			{ name: 'hrid', type: 'ItemLocationHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'ItemLocation', 'type')
		this.moduleBuilder.addExport('types', 'ItemLocationHrid', 'type')
	}

	protected override generateConstants(entities: Record<string, ItemLocation>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('ITEMLOCATION_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'ITEMLOCATION_HRIDS', 'const')
	}

	protected override generateLazyData(entities: Record<string, ItemLocation>): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport('./types', ['ItemLocation', 'ItemLocationHrid'], true)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'ITEMLOCATIONS',
			'getItemLocationsMap',
			'loadItemLocations',
			'ItemLocationHrid',
			'ItemLocation',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getItemLocationsMap')
	}

	protected override generateLookups(entities: Record<string, ItemLocation>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['ItemLocationHrid'], true)

		// Group locations by sortIndex
		const sortedLocations = Object.values(entities).sort((a, b) => a.sortIndex - b.sortIndex)
		const sortedHrids = sortedLocations.map(l => l.hrid)

		// Instead of a static lookup, use a const array
		lookupsBuilder.addConstArray('ITEMLOCATIONS_BY_SORT_INDEX', sortedHrids, true)
		this.moduleBuilder.addExport('lookups', 'ITEMLOCATIONS_BY_SORT_INDEX', 'const')
	}

	protected override generateUtilities(entities: Record<string, ItemLocation>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsBuilder.addImport('./types', ['ItemLocation', 'ItemLocationHrid'], true)
		utilsBuilder.addImport('./data', ['getItemLocationsMap'], false)
		utilsBuilder.addImport('./constants', ['ITEMLOCATION_HRIDS'], false)
		utilsBuilder.addImport('./lookups', ['ITEMLOCATIONS_BY_SORT_INDEX'], false)

		// Generate standard utilities
		
		// Type guard
		utilsBuilder.addFunction(
			'isItemLocationHrid',
			[{ name: 'value', type: 'string' }],
			'value is ItemLocationHrid',
			(writer) => {
				writer.writeLine('return ITEMLOCATION_HRIDS.includes(value as ItemLocationHrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'isItemLocationHrid')
		
		// Getter functions
		utilsBuilder.addFunction(
			'getItemLocation',
			[{ name: 'hrid', type: 'ItemLocationHrid' }],
			'ItemLocation | undefined',
			(writer) => {
				writer.writeLine('return getItemLocationsMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getItemLocation')
		
		utilsBuilder.addFunction(
			'requireItemLocation',
			[{ name: 'hrid', type: 'ItemLocationHrid' }],
			'ItemLocation',
			(writer) => {
				writer.writeLine('const entity = getItemLocationsMap().get(hrid)')
				writer.writeLine('if (!entity) {')
				writer.writeLine('  throw new Error(`ItemLocation not found: ${hrid}`)')
				writer.writeLine('}')
				writer.writeLine('return entity')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireItemLocation')
		
		utilsBuilder.addFunction(
			'getAllItemLocations',
			[],
			'ItemLocation[]',
			(writer) => {
				writer.writeLine('return Array.from(getItemLocationsMap().values())')
			},
		)
		this.moduleBuilder.addExport('utils', 'getAllItemLocations')

		// Sort by index
		utilsBuilder.addFunction(
			'sortItemLocationsByIndex',
			[{ name: 'locations', type: 'ItemLocation[]' }],
			'ItemLocation[]',
			(writer) => {
				writer.writeLine('return locations.slice().sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)
		this.moduleBuilder.addExport('utils', 'sortItemLocationsByIndex')

		// Get sorted locations
		utilsBuilder.addFunction(
			'getItemLocationsSorted',
			[],
			'ItemLocation[]',
			(writer) => {
				writer.writeLine('const map = getItemLocationsMap()')
				writer.writeLine('return ITEMLOCATIONS_BY_SORT_INDEX.map(hrid => map.get(hrid)!)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getItemLocationsSorted')
	}
}