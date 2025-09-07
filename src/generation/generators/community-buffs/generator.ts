import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface CommunityBuffType {
	hrid: string
	name: string
	usableInActionTypeMap: Record<string, boolean>
	buff: {
		uniqueHrid: string
		typeHrid: string
		ratioBoost: number
		ratioBoostLevelBonus: number
		flatBoost: number
		flatBoostLevelBonus: number
		startTime: string
		duration: number
	}
	description: string
	cowbellCost: number
	sortIndex: number
}

export class ModularCommunityBuffsGenerator extends ModularBaseGenerator<CommunityBuffType> {
	constructor() {
		super({
			entityName: 'CommunityBuffType',
			entityNamePlural: 'CommunityBuffTypes',
			sourceKey: 'communityBuffTypeDetailMap',
			outputPath: 'src/generated/communitybufftypes',

			// Import shared types
			sharedTypes: ['Buff'],

			// Use utility templates
			utilityTemplates: [
				{ type: 'toMap' },
				{ type: 'sortBy', field: 'sortIndex' },
			],
		})
	}

	// MANDATORY explicit interface definition (prevents HridHrid + duplication bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'CommunityBuffType',
				properties: [
					{ name: 'hrid', type: 'CommunityBuffTypeHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'usableInActionTypeMap', type: 'Record<string, boolean>' },
					{ name: 'buff', type: 'CommunityBuff' },
					{ name: 'description', type: 'string' },
					{ name: 'cowbellCost', type: 'number' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
			{
				name: 'CommunityBuff',
				properties: [
					{ name: 'uniqueHrid', type: 'string' },
					{ name: 'typeHrid', type: 'BuffTypeHrid' },
					{ name: 'ratioBoost', type: 'number' },
					{ name: 'ratioBoostLevelBonus', type: 'number' },
					{ name: 'flatBoost', type: 'number' },
					{ name: 'flatBoostLevelBonus', type: 'number' },
					{ name: 'startTime', type: 'string' },
					{ name: 'duration', type: 'number' },
				],
			},
		]
	}

	/**
	 * Extension hook: Add imports for external types
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import BuffTypeHrid from bufftypes module
		typesBuilder.addImport('../bufftypes/types', ['BuffTypeHrid'], true)
	}

	// Custom utilities
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getCommunityBuffsByCost',
				parameters: [
					{ name: 'cost', type: 'number' },
				],
				returnType: 'CommunityBuffType[]',
				implementation: (writer) => {
					writer.writeLine('return getAllCommunityBuffTypes().filter(buff => buff.cowbellCost === cost)')
				},
				jsDoc: {
					description: 'Get all community buff types with a specific cowbell cost',
					param: { cost: 'The cowbell cost to filter by' },
					returns: 'Array of community buff types with the specified cost',
				},
			},
			{
				name: 'getCommunityBuffsForActionType',
				parameters: [
					{ name: 'actionType', type: 'string' },
				],
				returnType: 'CommunityBuffType[]',
				implementation: (writer) => {
					writer.writeLine('return getAllCommunityBuffTypes().filter(buff => buff.usableInActionTypeMap[actionType] === true)')
				},
				jsDoc: {
					description: 'Get all community buff types usable for a specific action type',
					param: { actionType: 'The action type to filter by' },
					returns: 'Array of community buff types usable for the action type',
				},
			},
		]
	}

	// For simple entities: Use transformEntity hook
	protected override transformEntity(rawData: any): CommunityBuffType {
		return {
			hrid: rawData.hrid,
			name: rawData.name || '',
			usableInActionTypeMap: rawData.usableInActionTypeMap || {},
			buff: {
				uniqueHrid: rawData.buff?.uniqueHrid || '',
				typeHrid: rawData.buff?.typeHrid || '',
				ratioBoost: rawData.buff?.ratioBoost || 0,
				ratioBoostLevelBonus: rawData.buff?.ratioBoostLevelBonus || 0,
				flatBoost: rawData.buff?.flatBoost || 0,
				flatBoostLevelBonus: rawData.buff?.flatBoostLevelBonus || 0,
				startTime: rawData.buff?.startTime || '0001-01-01T00:00:00Z',
				duration: rawData.buff?.duration || 0,
			},
			description: rawData.description || '',
			cowbellCost: rawData.cowbellCost || 0,
			sortIndex: rawData.sortIndex || 0,
		}
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularCommunityBuffsGenerator()
	await generator.generate('./src/sources/game_data.json')
}