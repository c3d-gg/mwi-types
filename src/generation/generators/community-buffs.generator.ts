import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

export class CommunityBuffsGenerator extends BaseGenerator<CommunityBuffType> {
	constructor() {
		super({
			entityName: 'CommunityBuffType',
			entityNamePlural: 'CommunityBuffTypes',
			sourceKey: 'communityBuffTypeDetailMap',
			outputPath: 'src/generated/types/community-buffs.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, CommunityBuffType> {
		const entities: Record<string, CommunityBuffType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey],
		)) {
			const buffData = data as any
			// Extract action types from usableInActionTypeMap
			const usableInActionTypes = buffData.usableInActionTypeMap
				? Object.keys(buffData.usableInActionTypeMap as Record<string, boolean>)
				: []

			const entity: CommunityBuffType = {
				hrid: hrid as string,
				name: buffData.name,
				description: buffData.description || undefined,
				usableInActionTypes,
				buff: {
					uniqueHrid: buffData.buff.uniqueHrid,
					typeHrid: buffData.buff.typeHrid,
					ratioBoost: buffData.buff.ratioBoost,
					ratioBoostLevelBonus: buffData.buff.ratioBoostLevelBonus,
					flatBoost: buffData.buff.flatBoost,
					flatBoostLevelBonus: buffData.buff.flatBoostLevelBonus,
					startTime: buffData.buff.startTime,
					duration: buffData.buff.duration,
				},
				cowbellCost: buffData.cowbellCost,
				sortIndex: buffData.sortIndex,
			}

			entities[hrid as string] = entity
		}

		return entities
	}

	protected override generateInterfaces(
		entities: Record<string, CommunityBuffType>,
	): void {
		// Import types from other generators
		this.builder.addImport('./buff-types', ['Buff', 'BuffTypeHrid'], true)
		this.builder.addImport('./actions', ['ActionType'], true)

		// Generate CommunityBuff interface (instance of a buff provided by community)
		const communityBuffProperties: PropertyDefinition[] = [
			{
				name: 'uniqueHrid',
				type: 'string',
				description: 'Unique identifier for this buff instance',
			},
			{
				name: 'typeHrid',
				type: 'BuffTypeHrid',
				description: 'Reference to the buff type',
			},
			{
				name: 'ratioBoost',
				type: 'number',
				description: 'Percentage boost value',
			},
			{
				name: 'ratioBoostLevelBonus',
				type: 'number',
				description: 'Additional ratio boost per level',
			},
			{
				name: 'flatBoost',
				type: 'number',
				description: 'Flat boost value',
			},
			{
				name: 'flatBoostLevelBonus',
				type: 'number',
				description: 'Additional flat boost per level',
			},
			{
				name: 'startTime',
				type: 'string',
				description: 'When the buff started',
			},
			{
				name: 'duration',
				type: 'number',
				description: 'Duration in milliseconds (0 for permanent)',
			},
		]

		this.builder.addInterface('CommunityBuff', communityBuffProperties)

		// Generate CommunityBuffType interface
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'CommunityBuffTypeHrid',
				description: 'Community buff type HRID',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the community buff',
			},
			{
				name: 'description',
				type: 'string',
				optional: true,
				description: 'Description of the buff effect',
			},
			{
				name: 'usableInActionTypes',
				type: 'ActionType[]',
				description: 'Action types this buff applies to',
			},
			{
				name: 'buff',
				type: 'CommunityBuff',
				description: 'The buff configuration',
			},
			{
				name: 'cowbellCost',
				type: 'number',
				description: 'Cost in cowbells to activate',
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
		entities: Record<string, CommunityBuffType>,
	): void {
		// Generate base utilities
		super.generateUtilities(entities)

		// Generate lookup maps by action type
		const buffsByActionType: Record<string, string[]> = {}

		for (const [hrid, buff] of Object.entries(entities)) {
			for (const actionType of buff.usableInActionTypes) {
				if (!buffsByActionType[actionType]) {
					buffsByActionType[actionType] = []
				}
				buffsByActionType[actionType].push(hrid)
			}
		}

		// Add lookup map for buffs by action type
		const lookupMapInitializer = JSON.stringify(
			buffsByActionType,
			null,
			2,
		).replace(/"([^"]+)":/g, "'$1':")

		this.builder.addConstVariable(
			'COMMUNITY_BUFFS_BY_ACTION_TYPE',
			'Partial<Record<ActionType, readonly CommunityBuffTypeHrid[]>>',
			lookupMapInitializer + ' as const',
		)

		// Add utility functions
		this.builder.addFunction(
			'getCommunityBuffsByActionType',
			[{ name: 'actionType', type: 'ActionType' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine(
					'const hrids = COMMUNITY_BUFFS_BY_ACTION_TYPE[actionType] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => COMMUNITYBUFFTYPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'calculateCommunityBuffValue',
			[
				{ name: 'buff', type: 'CommunityBuff' },
				{ name: 'level', type: 'number' },
			],
			'{ flat: number; ratio: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine(
					'  flat: buff.flatBoost + (buff.flatBoostLevelBonus * level),',
				)
				writer.writeLine(
					'  ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level)',
				)
				writer.writeLine('}')
			},
		)

		this.builder.addFunction(
			'isCommunityBuffActiveForAction',
			[
				{ name: 'buffType', type: 'CommunityBuffType' },
				{ name: 'actionType', type: 'ActionType' },
			],
			'boolean',
			(writer) => {
				writer.writeLine(
					'return buffType.usableInActionTypes.includes(actionType)',
				)
			},
		)

		this.builder.addFunction(
			'getTotalCowbellCost',
			[{ name: 'buffHrids', type: 'CommunityBuffTypeHrid[]' }],
			'number',
			(writer) => {
				writer.writeLine('return buffHrids.reduce((total, hrid) => {')
				writer.writeLine('  const buff = COMMUNITYBUFFTYPES.get(hrid)')
				writer.writeLine('  return total + (buff?.cowbellCost || 0)')
				writer.writeLine('}, 0)')
			},
		)

		this.builder.addFunction(
			'sortCommunityBuffsByIndex',
			[{ name: 'buffs', type: 'CommunityBuffType[]' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine(
					'return [...buffs].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}

// Type definitions for the generator
interface CommunityBuff {
	uniqueHrid: string
	typeHrid: string
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

interface CommunityBuffType {
	hrid: string
	name: string
	description?: string
	usableInActionTypes: string[]
	buff: CommunityBuff
	cowbellCost: number
	sortIndex: number
}
