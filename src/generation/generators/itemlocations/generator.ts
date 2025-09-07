import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

export interface ItemLocation {
	hrid: string
	name: string
	type: string
	isTool: boolean
	isMultiItem: boolean
	conflictingOtherItemLocationHrids: string[]
}

export class ModularItemLocationsGenerator extends ModularBaseGenerator<ItemLocation> {
	constructor() {
		super({
			entityName: 'ItemLocation',
			entityNamePlural: 'ItemLocations',
			sourceKey: 'itemLocationDetailMap',
			outputPath: 'src/generated/itemlocations',

			// Preserve data including empty arrays
			applyDataCleaning: false,

			// Utility templates for common functions
			utilityTemplates: [{ type: 'toMap' }],

			// Category filters for tools and multi-items
			categoryFilters: [
				{
					name: 'tool',
					condition: (entity: any) => entity.isTool,
				},
				{
					name: 'multiItem',
					condition: (entity: any) => entity.isMultiItem,
				},
			],
		})
	}

	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ItemLocation',
				properties: [
					{ name: 'hrid', type: 'ItemLocationHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'type', type: 'string' },
					{ name: 'isTool', type: 'boolean' },
					{ name: 'isMultiItem', type: 'boolean' },
					{
						name: 'conflictingOtherItemLocationHrids',
						type: 'ItemLocationHrid[]',
					},
				],
			},
		]
	}

	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getItemLocationsByTool',
				parameters: [{ name: 'isTool', type: 'boolean' }],
				returnType: 'ItemLocation[]',
				implementation: (writer) => {
					writer.writeLine(
						`return getAllItemLocations().filter(location => location.isTool === isTool)`,
					)
				},
				jsDoc: {
					description: 'Get item locations filtered by tool status',
					params: [
						{
							name: 'isTool',
							description:
								'Whether to get tool locations or non-tool locations',
						},
					],
					returns: 'Array of matching item locations',
				},
			},
			{
				name: 'getItemLocationsByMultiItem',
				parameters: [{ name: 'isMultiItem', type: 'boolean' }],
				returnType: 'ItemLocation[]',
				implementation: (writer) => {
					writer.writeLine(
						`return getAllItemLocations().filter(location => location.isMultiItem === isMultiItem)`,
					)
				},
				jsDoc: {
					description: 'Get item locations filtered by multi-item capability',
					params: [
						{
							name: 'isMultiItem',
							description:
								'Whether to get multi-item locations or single-item locations',
						},
					],
					returns: 'Array of matching item locations',
				},
			},
			{
				name: 'getConflictingLocations',
				parameters: [{ name: 'hrid', type: 'ItemLocationHrid' }],
				returnType: 'ItemLocation[]',
				implementation: (writer) => {
					writer.writeLine(`const location = getItemLocation(hrid)`)
					writer.writeLine(`if (!location) return []`)
					writer.writeLine(`return location.conflictingOtherItemLocationHrids`)
					writer.writeLine(
						`  .map(conflictHrid => getItemLocation(conflictHrid))`,
					)
					writer.writeLine(
						`  .filter((loc): loc is ItemLocation => loc !== null)`,
					)
				},
				jsDoc: {
					description:
						'Get all locations that conflict with the given location',
					params: [
						{
							name: 'hrid',
							description: 'The location HRID to check conflicts for',
						},
					],
					returns: 'Array of conflicting item locations',
				},
			},
		]
	}

	protected override transformEntity(rawData: any): ItemLocation {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			type: rawData.type,
			isTool: rawData.isTool,
			isMultiItem: rawData.isMultiItem,
			conflictingOtherItemLocationHrids:
				rawData.conflictingOtherItemLocationHrids || [],
		}
	}
}

// Required for dev CLI generate:single command
if (import.meta.main) {
	const generator = new ModularItemLocationsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
