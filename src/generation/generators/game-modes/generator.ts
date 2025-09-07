import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

// ✅ STEP 1: Internal interface for TypeScript typing (NOT exported)
interface GameMode {
	hrid: string
	name: string
	description: string
	isCreatable: boolean
	maxCharacterLimit: number
	marketRestricted: boolean
	subsetGameModes: string[]
	sortIndex: number
}

export class ModularGameModesGenerator extends ModularBaseGenerator<GameMode> {
	constructor() {
		super({
			entityName: 'GameMode',
			entityNamePlural: 'GameModes',
			sourceKey: 'gameModeDetailMap',

			// No shared types needed for this simple generator
			sharedTypes: [],

			// Preserve data with null values
			applyDataCleaning: false,

			// Use utility templates
			utilityTemplates: [
				{ type: 'getByField', field: 'isCreatable', config: { fieldType: 'boolean' } },
				{ type: 'getByField', field: 'marketRestricted', config: { fieldType: 'boolean' } },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Auto-generate category constants
			categoryFilters: [
				{
					name: 'creatable',
					condition: (entity: GameMode) => entity.isCreatable,
				},
				{
					name: 'marketRestricted',
					condition: (entity: GameMode) => entity.marketRestricted,
				},
			],
		})
	}

	// 🛡️ STEP 2: MANDATORY explicit interface definition (prevents HridHrid + duplication bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'GameMode', // ✅ SAME NAME as internal interface above
				properties: [
					{ name: 'hrid', type: 'GameModeHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'name', type: 'string' },
					{ name: 'description', type: 'string' },
					{ name: 'isCreatable', type: 'boolean' },
					{ name: 'maxCharacterLimit', type: 'number' },
					{ name: 'marketRestricted', type: 'boolean' },
					{ name: 'subsetGameModes', type: 'GameModeHrid[]' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// For simple entities: Use transformEntity hook
	protected override transformEntity(rawData: any): GameMode {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			description: rawData.description || '',
			isCreatable: rawData.isCreatable || false,
			maxCharacterLimit: rawData.maxCharacterLimit || 0,
			marketRestricted: rawData.marketRestricted || false,
			subsetGameModes: Array.isArray(rawData.subsetGameModes) ? rawData.subsetGameModes : [],
			sortIndex: rawData.sortIndex || 0,
		}
	}

	// Custom utilities specific to game modes
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getCreatableGameModes',
				parameters: [],
				returnType: 'GameMode[]',
				implementation: (writer) => {
					writer.writeLine('const gameModes = getAllGameModes()')
					writer.writeLine(
						'return gameModes.filter(gameMode => gameMode.isCreatable)',
					)
				},
				jsDoc: {
					description:
						'Gets all game modes that players can create characters in',
					returns: 'Array of creatable game modes',
				},
			},
			{
				name: 'getMarketRestrictedGameModes',
				parameters: [],
				returnType: 'GameMode[]',
				implementation: (writer) => {
					writer.writeLine('const gameModes = getAllGameModes()')
					writer.writeLine(
						'return gameModes.filter(gameMode => gameMode.marketRestricted)',
					)
				},
				jsDoc: {
					description:
						'Gets all game modes with marketplace restrictions (e.g., Ironman)',
					returns: 'Array of market-restricted game modes',
				},
			},
		]
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularGameModesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
