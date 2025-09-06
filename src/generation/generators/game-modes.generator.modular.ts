import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface GameMode {
	hrid: string
	name: string
	description: string
	isCreatable: boolean
	maxCharacterLimit: number
	marketRestricted: boolean
	subsetGameModes: string[] | null
	sortIndex: number
}

export class GameModesGeneratorModular extends ModularBaseGenerator<GameMode> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'GameMode',
			entityNamePlural: 'GameModes',
			sourceKey: 'gameModeDetailMap',
			outputPath: './src/generated/gamemodes',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, GameMode> {
		const modes: Record<string, GameMode> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const modeData = this.cleanEntityData(data as any)
			const mode: GameMode = {
				hrid: modeData.hrid || '',
				name: modeData.name || '',
				description: modeData.description || '',
				isCreatable: modeData.isCreatable === true,
				maxCharacterLimit:
					typeof modeData.maxCharacterLimit === 'number'
						? modeData.maxCharacterLimit
						: 1,
				marketRestricted: modeData.marketRestricted === true,
				subsetGameModes: Array.isArray(modeData.subsetGameModes)
					? modeData.subsetGameModes
					: [],
				sortIndex:
					typeof modeData.sortIndex === 'number' ? modeData.sortIndex : 0,
			}

			modes[hrid] = mode
		}

		return modes
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['GAMEMODE_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType('GameModeHrid', 'typeof GAMEMODE_HRIDS[number]')

		// Generate interface
		typesBuilder.addInterface('GameMode', [
			{
				name: 'hrid',
				type: 'GameModeHrid',
				optional: false,
				description: 'Unique identifier for the game mode',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the game mode',
			},
			{
				name: 'description',
				type: 'string',
				optional: false,
				description: 'Detailed description of the game mode',
			},
			{
				name: 'isCreatable',
				type: 'boolean',
				optional: false,
				description: 'Whether players can create new characters in this mode',
			},
			{
				name: 'maxCharacterLimit',
				type: 'number',
				optional: false,
				description: 'Maximum number of characters allowed in this mode',
			},
			{
				name: 'marketRestricted',
				type: 'boolean',
				optional: false,
				description: 'Whether marketplace trading is restricted in this mode',
			},
			{
				name: 'subsetGameModes',
				type: 'GameModeHrid[] | null',
				optional: false,
				description: 'Child game modes that are subsets of this mode',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		])

		// Export types
		this.moduleBuilder.addExport('types', 'GameMode', 'type')
		this.moduleBuilder.addExport('types', 'GameModeHrid', 'type')
	}

	protected override generateConstants(
		entities: Record<string, GameMode>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('GAMEMODE_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'GAMEMODE_HRIDS', 'const')

		// Categorize game modes
		const creatableModes: string[] = []
		const marketRestrictedModes: string[] = []
		const legacyModes: string[] = []
		const parentModes: string[] = []

		for (const [hrid, mode] of Object.entries(entities)) {
			if (mode.isCreatable) {
				creatableModes.push(hrid)
			}
			if (mode.marketRestricted) {
				marketRestrictedModes.push(hrid)
			}
			if (hrid.includes('legacy')) {
				legacyModes.push(hrid)
			}
			if (mode.subsetGameModes && mode.subsetGameModes.length > 0) {
				parentModes.push(hrid)
			}
		}

		// Add category arrays
		constantsBuilder.addConstArray('CREATABLE_GAME_MODES', creatableModes, true)
		constantsBuilder.addConstArray(
			'MARKET_RESTRICTED_GAME_MODES',
			marketRestrictedModes,
			true,
		)
		constantsBuilder.addConstArray('LEGACY_GAME_MODES', legacyModes, true)
		constantsBuilder.addConstArray('PARENT_GAME_MODES', parentModes, true)

		// Export all constants
		this.moduleBuilder.addExport('constants', 'CREATABLE_GAME_MODES', 'const')
		this.moduleBuilder.addExport(
			'constants',
			'MARKET_RESTRICTED_GAME_MODES',
			'const',
		)
		this.moduleBuilder.addExport('constants', 'LEGACY_GAME_MODES', 'const')
		this.moduleBuilder.addExport('constants', 'PARENT_GAME_MODES', 'const')
	}

	protected override generateLookups(entities: Record<string, GameMode>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['GameModeHrid'], true)

		// Create subset mapping
		const subsetMapping: Record<string, string[]> = {}
		for (const [hrid, mode] of Object.entries(entities)) {
			if (mode.subsetGameModes && mode.subsetGameModes.length > 0) {
				subsetMapping[hrid] = mode.subsetGameModes
			}
		}

		if (Object.keys(subsetMapping).length > 0) {
			lookupsBuilder.addStaticLookup(
				'GAME_MODE_SUBSETS',
				'GameModeHrid',
				'readonly GameModeHrid[]',
				subsetMapping,
				true,
			)
			this.moduleBuilder.addExport('lookups', 'GAME_MODE_SUBSETS', 'const')
		}

		// Game modes sorted by index
		const sortedByIndex = Object.values(entities)
			.sort((a, b) => a.sortIndex - b.sortIndex)
			.map((mode) => mode.hrid)

		lookupsBuilder.addConstArray('GAME_MODES_BY_INDEX', sortedByIndex, true)
		this.moduleBuilder.addExport('lookups', 'GAME_MODES_BY_INDEX', 'const')
	}

	protected override generateUtilities(
		entities: Record<string, GameMode>,
	): void {
		// Call parent implementation for basic utilities
		super.generateUtilities(entities)

		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import additional dependencies
		utilsBuilder.addImport('./types', ['GameMode', 'GameModeHrid'], true)
		utilsBuilder.addImport('./data', ['getGameModesMap'], false)
		utilsBuilder.addImport(
			'./constants',
			[
				'CREATABLE_GAME_MODES',
				'MARKET_RESTRICTED_GAME_MODES',
				'LEGACY_GAME_MODES',
				'PARENT_GAME_MODES',
			],
			false,
		)
		utilsBuilder.addImport(
			'./lookups',
			['GAME_MODE_SUBSETS', 'GAME_MODES_BY_INDEX'],
			false,
		)

		// getCreatableGameModes
		utilsBuilder.addFunction(
			'getCreatableGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return CREATABLE_GAME_MODES.map(hrid => getGameModesMap().get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getCreatableGameModes')

		// getMarketRestrictedGameModes
		utilsBuilder.addFunction(
			'getMarketRestrictedGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return MARKET_RESTRICTED_GAME_MODES.map(hrid => getGameModesMap().get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getMarketRestrictedGameModes')

		// getLegacyGameModes
		utilsBuilder.addFunction(
			'getLegacyGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return LEGACY_GAME_MODES.map(hrid => getGameModesMap().get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getLegacyGameModes')

		// getParentGameModes
		utilsBuilder.addFunction(
			'getParentGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return PARENT_GAME_MODES.map(hrid => getGameModesMap().get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getParentGameModes')

		// getSubsetGameModes
		utilsBuilder.addFunction(
			'getSubsetGameModes',
			[{ name: 'parentModeHrid', type: 'GameModeHrid' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'const subsetHrids = GAME_MODE_SUBSETS?.[parentModeHrid] || []',
				)
				writer.writeLine(
					'return subsetHrids.map(hrid => getGameModesMap().get(hrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getSubsetGameModes')

		// isGameModeCreatable
		utilsBuilder.addFunction(
			'isGameModeCreatable',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const mode = getGameModesMap().get(modeHrid)')
				writer.writeLine('return mode ? mode.isCreatable : false')
			},
		)
		this.moduleBuilder.addExport('utils', 'isGameModeCreatable')

		// isGameModeMarketRestricted
		utilsBuilder.addFunction(
			'isGameModeMarketRestricted',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const mode = getGameModesMap().get(modeHrid)')
				writer.writeLine('return mode ? mode.marketRestricted : false')
			},
		)
		this.moduleBuilder.addExport('utils', 'isGameModeMarketRestricted')

		// getGameModeCharacterLimit
		utilsBuilder.addFunction(
			'getGameModeCharacterLimit',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const mode = getGameModesMap().get(modeHrid)')
				writer.writeLine('return mode ? mode.maxCharacterLimit : 1')
			},
		)
		this.moduleBuilder.addExport('utils', 'getGameModeCharacterLimit')

		// sortGameModesByIndex
		utilsBuilder.addFunction(
			'sortGameModesByIndex',
			[{ name: 'modes', type: 'GameMode[]' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return [...modes].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'sortGameModesByIndex')

		// getGameModesSorted
		utilsBuilder.addFunction(
			'getGameModesSorted',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return GAME_MODES_BY_INDEX.map(hrid => getGameModesMap().get(hrid as GameModeHrid)!)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getGameModesSorted')

		// searchGameModes
		utilsBuilder.addFunction(
			'searchGameModes',
			[{ name: 'searchTerm', type: 'string' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(getGameModesMap().values()).filter(mode =>',
				)
				writer.writeLine('  mode.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine(
					'  mode.description.toLowerCase().includes(lowerSearch) ||',
				)
				writer.writeLine('  mode.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)
		this.moduleBuilder.addExport('utils', 'searchGameModes')

		// getGameModeStats
		utilsBuilder.addFunction(
			'getGameModeStats',
			[],
			'{ total: number, creatable: number, marketRestricted: number, legacy: number, parent: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: getGameModesMap().size,')
				writer.writeLine('  creatable: CREATABLE_GAME_MODES.length,')
				writer.writeLine(
					'  marketRestricted: MARKET_RESTRICTED_GAME_MODES.length,',
				)
				writer.writeLine('  legacy: LEGACY_GAME_MODES.length,')
				writer.writeLine('  parent: PARENT_GAME_MODES.length')
				writer.writeLine('}')
			},
		)
		this.moduleBuilder.addExport('utils', 'getGameModeStats')

		// isLegacyGameMode
		utilsBuilder.addFunction(
			'isLegacyGameMode',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('return modeHrid.includes("legacy")')
			},
		)
		this.moduleBuilder.addExport('utils', 'isLegacyGameMode')
	}
}
