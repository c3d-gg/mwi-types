import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

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

export class CommunityBuffsGeneratorModular extends ModularBaseGenerator<CommunityBuffType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'CommunityBuffType',
			entityNamePlural: 'CommunityBuffTypes',
			sourceKey: 'communityBuffTypeDetailMap',
			outputPath: './src/generated/communitybufftypes',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, CommunityBuffType> {
		const entities: Record<string, CommunityBuffType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const buffData = this.cleanEntityData(data as any)
			// Extract action types from usableInActionTypeMap
			const usableInActionTypes = buffData.usableInActionTypeMap
				? Object.keys(buffData.usableInActionTypeMap as Record<string, boolean>)
				: []

			const entity: CommunityBuffType = {
				hrid: hrid as string,
				name: buffData.name || '',
				description: buffData.description || undefined,
				usableInActionTypes,
				buff: {
					uniqueHrid: buffData.buff?.uniqueHrid || '',
					typeHrid: buffData.buff?.typeHrid || '',
					ratioBoost: typeof buffData.buff?.ratioBoost === 'number' ? buffData.buff.ratioBoost : 0,
					ratioBoostLevelBonus: typeof buffData.buff?.ratioBoostLevelBonus === 'number' ? buffData.buff.ratioBoostLevelBonus : 0,
					flatBoost: typeof buffData.buff?.flatBoost === 'number' ? buffData.buff.flatBoost : 0,
					flatBoostLevelBonus: typeof buffData.buff?.flatBoostLevelBonus === 'number' ? buffData.buff.flatBoostLevelBonus : 0,
					startTime: buffData.buff?.startTime || '',
					duration: typeof buffData.buff?.duration === 'number' ? buffData.buff.duration : 0,
				},
				cowbellCost: typeof buffData.cowbellCost === 'number' ? buffData.cowbellCost : 0,
				sortIndex: typeof buffData.sortIndex === 'number' ? buffData.sortIndex : 0,
			}

			entities[hrid as string] = entity
		}

		return entities
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['COMMUNITYBUFFTYPE_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType('CommunityBuffTypeHrid', 'typeof COMMUNITYBUFFTYPE_HRIDS[number]')

		// External type aliases (temporarily) - will be replaced when other modules are converted
		typesBuilder.addType('BuffTypeHrid', 'string')
		typesBuilder.addType('ActionType', 'string')

		// Generate CommunityBuff interface (instance of a buff)
		typesBuilder.addInterface('CommunityBuff', [
			{ name: 'uniqueHrid', type: 'string', optional: false },
			{ name: 'typeHrid', type: 'BuffTypeHrid', optional: false },
			{ name: 'ratioBoost', type: 'number', optional: false },
			{ name: 'ratioBoostLevelBonus', type: 'number', optional: false },
			{ name: 'flatBoost', type: 'number', optional: false },
			{ name: 'flatBoostLevelBonus', type: 'number', optional: false },
			{ name: 'startTime', type: 'string', optional: false },
			{ name: 'duration', type: 'number', optional: false },
		])

		// Generate CommunityBuffType interface
		typesBuilder.addInterface('CommunityBuffType', [
			{ name: 'hrid', type: 'CommunityBuffTypeHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'description', type: 'string', optional: true },
			{ name: 'usableInActionTypes', type: 'ActionType[]', optional: false },
			{ name: 'buff', type: 'CommunityBuff', optional: false },
			{ name: 'cowbellCost', type: 'number', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'CommunityBuffType', 'type')
		this.moduleBuilder.addExport('types', 'CommunityBuffTypeHrid', 'type')
		this.moduleBuilder.addExport('types', 'CommunityBuff', 'type')
	}

	protected override generateConstants(entities: Record<string, CommunityBuffType>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('COMMUNITYBUFFTYPE_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'COMMUNITYBUFFTYPE_HRIDS', 'const')
	}

	protected override generateLazyData(entities: Record<string, CommunityBuffType>): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport('./types', ['CommunityBuffType', 'CommunityBuffTypeHrid'], true)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'COMMUNITYBUFFTYPES',
			'getCommunityBuffTypesMap',
			'loadCommunityBuffTypes',
			'CommunityBuffTypeHrid',
			'CommunityBuffType',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getCommunityBuffTypesMap')
	}

	protected override generateLookups(entities: Record<string, CommunityBuffType>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['CommunityBuffTypeHrid', 'ActionType'], true)

		// Generate lookup map by action type
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
		lookupsBuilder.addStaticLookup(
			'COMMUNITY_BUFFS_BY_ACTION_TYPE',
			'ActionType',
			'readonly CommunityBuffTypeHrid[]',
			buffsByActionType,
			true, // isPartial
		)
		this.moduleBuilder.addExport('lookups', 'COMMUNITY_BUFFS_BY_ACTION_TYPE', 'const')

		// Group buffs by cowbell cost
		const buffsByCost: Record<number, string[]> = {}
		for (const [hrid, buff] of Object.entries(entities)) {
			const cost = buff.cowbellCost
			if (!buffsByCost[cost]) {
				buffsByCost[cost] = []
			}
			buffsByCost[cost].push(hrid)
		}

		lookupsBuilder.addStaticLookup(
			'COMMUNITY_BUFFS_BY_COST',
			'number',
			'readonly CommunityBuffTypeHrid[]',
			buffsByCost,
			false, // not partial
		)
		this.moduleBuilder.addExport('lookups', 'COMMUNITY_BUFFS_BY_COST', 'const')
	}

	protected override generateUtilities(entities: Record<string, CommunityBuffType>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsBuilder.addImport('./types', ['CommunityBuffType', 'CommunityBuffTypeHrid', 'CommunityBuff', 'ActionType'], true)
		utilsBuilder.addImport('./data', ['getCommunityBuffTypesMap'], false)
		utilsBuilder.addImport('./constants', ['COMMUNITYBUFFTYPE_HRIDS'], false)
		utilsBuilder.addImport('./lookups', ['COMMUNITY_BUFFS_BY_ACTION_TYPE', 'COMMUNITY_BUFFS_BY_COST'], false)

		// Generate standard utilities
		
		// Type guard
		utilsBuilder.addFunction(
			'isCommunityBuffTypeHrid',
			[{ name: 'value', type: 'string' }],
			'value is CommunityBuffTypeHrid',
			(writer) => {
				writer.writeLine('return COMMUNITYBUFFTYPE_HRIDS.includes(value as CommunityBuffTypeHrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'isCommunityBuffTypeHrid')
		
		// Getter functions
		utilsBuilder.addFunction(
			'getCommunityBuffType',
			[{ name: 'hrid', type: 'CommunityBuffTypeHrid' }],
			'CommunityBuffType | undefined',
			(writer) => {
				writer.writeLine('return getCommunityBuffTypesMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getCommunityBuffType')
		
		utilsBuilder.addFunction(
			'requireCommunityBuffType',
			[{ name: 'hrid', type: 'CommunityBuffTypeHrid' }],
			'CommunityBuffType',
			(writer) => {
				writer.writeLine('const entity = getCommunityBuffTypesMap().get(hrid)')
				writer.writeLine('if (!entity) {')
				writer.writeLine('  throw new Error(`CommunityBuffType not found: ${hrid}`)')
				writer.writeLine('}')
				writer.writeLine('return entity')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireCommunityBuffType')
		
		utilsBuilder.addFunction(
			'getAllCommunityBuffTypes',
			[],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine('return Array.from(getCommunityBuffTypesMap().values())')
			},
		)
		this.moduleBuilder.addExport('utils', 'getAllCommunityBuffTypes')

		// Get buffs by action type
		utilsBuilder.addFunction(
			'getCommunityBuffsByActionType',
			[{ name: 'actionType', type: 'ActionType' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine('const hrids = COMMUNITY_BUFFS_BY_ACTION_TYPE[actionType] || []')
				writer.writeLine('const map = getCommunityBuffTypesMap()')
				writer.writeLine('return hrids.map(hrid => map.get(hrid)!).filter(Boolean)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getCommunityBuffsByActionType')

		// Calculate buff value
		utilsBuilder.addFunction(
			'calculateCommunityBuffValue',
			[
				{ name: 'buff', type: 'CommunityBuff' },
				{ name: 'level', type: 'number' },
			],
			'{ flat: number; ratio: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  flat: buff.flatBoost + (buff.flatBoostLevelBonus * level),')
				writer.writeLine('  ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level)')
				writer.writeLine('}')
			},
		)
		this.moduleBuilder.addExport('utils', 'calculateCommunityBuffValue')

		// Check if buff is active for action
		utilsBuilder.addFunction(
			'isCommunityBuffActiveForAction',
			[
				{ name: 'buffType', type: 'CommunityBuffType' },
				{ name: 'actionType', type: 'ActionType' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('return buffType.usableInActionTypes.includes(actionType)')
			},
		)
		this.moduleBuilder.addExport('utils', 'isCommunityBuffActiveForAction')

		// Get total cowbell cost
		utilsBuilder.addFunction(
			'getTotalCowbellCost',
			[{ name: 'buffHrids', type: 'CommunityBuffTypeHrid[]' }],
			'number',
			(writer) => {
				writer.writeLine('const map = getCommunityBuffTypesMap()')
				writer.writeLine('return buffHrids.reduce((total, hrid) => {')
				writer.writeLine('  const buff = map.get(hrid)')
				writer.writeLine('  return total + (buff?.cowbellCost || 0)')
				writer.writeLine('}, 0)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getTotalCowbellCost')

		// Sort by index
		utilsBuilder.addFunction(
			'sortCommunityBuffsByIndex',
			[{ name: 'buffs', type: 'CommunityBuffType[]' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine('return buffs.slice().sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)
		this.moduleBuilder.addExport('utils', 'sortCommunityBuffsByIndex')

		// Get buffs by cost
		utilsBuilder.addFunction(
			'getCommunityBuffsByCost',
			[{ name: 'cost', type: 'number' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine('const hrids = COMMUNITY_BUFFS_BY_COST[cost] || []')
				writer.writeLine('const map = getCommunityBuffTypesMap()')
				writer.writeLine('return hrids.map(hrid => map.get(hrid)!).filter(Boolean)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getCommunityBuffsByCost')

		// Get affordable buffs
		utilsBuilder.addFunction(
			'getAffordableCommunityBuffs',
			[{ name: 'cowbells', type: 'number' }],
			'CommunityBuffType[]',
			(writer) => {
				writer.writeLine('const map = getCommunityBuffTypesMap()')
				writer.writeLine('return Array.from(map.values()).filter(buff => buff.cowbellCost <= cowbells)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getAffordableCommunityBuffs')
	}
}