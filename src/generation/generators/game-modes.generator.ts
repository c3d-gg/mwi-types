import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

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

export class GameModesGenerator extends BaseGenerator<GameMode> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'GameMode',
			entityNamePlural: 'GameModes',
			sourceKey: 'gameModeDetailMap',
			outputPath: 'src/generated/types/game-modes.ts',
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
			const modeData = data as any
			const mode: GameMode = {
				hrid: modeData.hrid,
				name: modeData.name || '',
				description: modeData.description || '',
				isCreatable: modeData.isCreatable === true,
				maxCharacterLimit: modeData.maxCharacterLimit || 1,
				marketRestricted: modeData.marketRestricted === true,
				subsetGameModes: Array.isArray(modeData.subsetGameModes)
					? modeData.subsetGameModes
					: null,
				sortIndex: modeData.sortIndex || 0,
			}

			modes[hrid] = mode
		}

		return modes
	}

	protected override generateInterfaces(
		_modes: Record<string, GameMode>,
	): void {
		// Generate main interface with JSDoc
		const properties: PropertyDefinition[] = [
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
		]

		this.builder.addInterface('GameMode', properties)
	}

	protected override generateUtilities(modes: Record<string, GameMode>): void {
		// Call base utilities first
		super.generateUtilities(modes)

		// Generate lookup maps
		this.generateLookupMaps(modes)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(modes: Record<string, GameMode>): void {
		// Categorize game modes
		const creatableModes: string[] = []
		const marketRestrictedModes: string[] = []
		const legacyModes: string[] = []
		const parentModes: string[] = []

		for (const [hrid, mode] of Object.entries(modes)) {
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
		this.builder.addConstArray('CREATABLE_GAME_MODES', creatableModes, true)
		this.builder.addConstArray(
			'MARKET_RESTRICTED_GAME_MODES',
			marketRestrictedModes,
			true,
		)
		this.builder.addConstArray('LEGACY_GAME_MODES', legacyModes, true)
		this.builder.addConstArray('PARENT_GAME_MODES', parentModes, true)

		// Create subset mapping
		const subsetMapping: Record<string, string[]> = {}
		for (const [hrid, mode] of Object.entries(modes)) {
			if (mode.subsetGameModes && mode.subsetGameModes.length > 0) {
				subsetMapping[hrid] = mode.subsetGameModes
			}
		}

		if (Object.keys(subsetMapping).length > 0) {
			this.builder.addConstVariable(
				'GAME_MODE_SUBSETS',
				'Partial<Record<GameModeHrid, readonly GameModeHrid[]>>',
				subsetMapping,
			)
		}
	}

	private generateSpecializedUtils(): void {
		// getCreatableGameModes
		this.builder.addFunction(
			'getCreatableGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return CREATABLE_GAME_MODES.map(hrid => GAMEMODES.get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)

		// getMarketRestrictedGameModes
		this.builder.addFunction(
			'getMarketRestrictedGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return MARKET_RESTRICTED_GAME_MODES.map(hrid => GAMEMODES.get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)

		// getLegacyGameModes
		this.builder.addFunction(
			'getLegacyGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return LEGACY_GAME_MODES.map(hrid => GAMEMODES.get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)

		// getParentGameModes
		this.builder.addFunction(
			'getParentGameModes',
			[],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return PARENT_GAME_MODES.map(hrid => GAMEMODES.get(hrid as GameModeHrid)!).filter(Boolean)',
				)
			},
		)

		// getSubsetGameModes
		this.builder.addFunction(
			'getSubsetGameModes',
			[{ name: 'parentModeHrid', type: 'GameModeHrid' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'const subsetHrids = GAME_MODE_SUBSETS?.[parentModeHrid] || []',
				)
				writer.writeLine(
					'return subsetHrids.map(hrid => GAMEMODES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// isGameModeCreatable
		this.builder.addFunction(
			'isGameModeCreatable',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const mode = GAMEMODES.get(modeHrid)')
				writer.writeLine('return mode ? mode.isCreatable : false')
			},
		)

		// isGameModeMarketRestricted
		this.builder.addFunction(
			'isGameModeMarketRestricted',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const mode = GAMEMODES.get(modeHrid)')
				writer.writeLine('return mode ? mode.marketRestricted : false')
			},
		)

		// getGameModeCharacterLimit
		this.builder.addFunction(
			'getGameModeCharacterLimit',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const mode = GAMEMODES.get(modeHrid)')
				writer.writeLine('return mode ? mode.maxCharacterLimit : 1')
			},
		)

		// sortGameModesByIndex
		this.builder.addFunction(
			'sortGameModesByIndex',
			[{ name: 'modes', type: 'GameMode[]' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine(
					'return [...modes].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// searchGameModes
		this.builder.addFunction(
			'searchGameModes',
			[{ name: 'searchTerm', type: 'string' }],
			'GameMode[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine('return Array.from(GAMEMODES.values()).filter(mode =>')
				writer.writeLine('  mode.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine(
					'  mode.description.toLowerCase().includes(lowerSearch) ||',
				)
				writer.writeLine('  mode.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getGameModeStats
		this.builder.addFunction(
			'getGameModeStats',
			[],
			'{ total: number, creatable: number, marketRestricted: number, legacy: number, parent: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: GAMEMODES.size,')
				writer.writeLine('  creatable: CREATABLE_GAME_MODES.length,')
				writer.writeLine(
					'  marketRestricted: MARKET_RESTRICTED_GAME_MODES.length,',
				)
				writer.writeLine('  legacy: LEGACY_GAME_MODES.length,')
				writer.writeLine('  parent: PARENT_GAME_MODES.length')
				writer.writeLine('}')
			},
		)

		// isLegacyGameMode
		this.builder.addFunction(
			'isLegacyGameMode',
			[{ name: 'modeHrid', type: 'GameModeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('return modeHrid.includes("legacy")')
			},
		)
	}
}
