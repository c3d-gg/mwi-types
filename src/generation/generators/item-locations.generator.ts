import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface ItemLocation {
	hrid: string
	name: string
	sortIndex: number
}

export class ItemLocationsGenerator extends BaseGenerator<ItemLocation> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ItemLocation',
			entityNamePlural: 'ItemLocations',
			sourceKey: 'itemLocationDetailMap',
			outputPath: 'src/generated/types/item-locations.ts',
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
			const locationData = data as any
			const location: ItemLocation = {
				hrid: locationData.hrid,
				name: locationData.name || '',
				sortIndex: locationData.sortIndex || 0,
			}
			locations[hrid] = location
		}

		return locations
	}

	protected override generateInterfaces(
		_locations: Record<string, ItemLocation>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'ItemLocationHrid',
				optional: false,
				description: 'Unique identifier for the item location',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the item location',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		this.builder.addInterface('ItemLocation', properties)
	}

	protected override generateUtilities(
		locations: Record<string, ItemLocation>,
	): void {
		super.generateUtilities(locations)

		this.builder.addFunction(
			'sortItemLocationsByIndex',
			[{ name: 'locations', type: 'ItemLocation[]' }],
			'ItemLocation[]',
			(writer) => {
				writer.writeLine(
					'return [...locations].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
