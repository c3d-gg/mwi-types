import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

interface LeaderboardType {
	hrid: string
	name: string
	gameMode: string
	isSteam: boolean
	minJoinTime: string
	isGuild: boolean
	sortIndex: number
}

export class LeaderboardTypesGenerator extends BaseGenerator<LeaderboardType> {
	private uniqueGameModes: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'LeaderboardType',
			entityNamePlural: 'LeaderboardTypes',
			sourceKey: 'leaderboardTypeDetailMap',
			outputPath: 'src/generated/types/leaderboard-types.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected extractEntities(sourceData: any): Record<string, LeaderboardType> {
		const types: Record<string, LeaderboardType> = {}
		const typeMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(typeMap)) {
			const type = this.extractLeaderboardType(hrid, data as any)
			types[hrid] = type
			this.collectUniqueValues(type)
		}

		return types
	}

	private extractLeaderboardType(hrid: string, data: any): LeaderboardType {
		return {
			hrid,
			name: data.name || '',
			gameMode: data.gameMode || '',
			isSteam: data.isSteam === true,
			minJoinTime: data.minJoinTime || '',
			isGuild: data.isGuild === true,
			sortIndex: data.sortIndex || 0,
		}
	}

	protected override collectUniqueValues(type: LeaderboardType): void {
		if (type.gameMode) {
			this.uniqueGameModes.add(type.gameMode)
		}
	}

	protected generateInterfaces(
		entities: Record<string, LeaderboardType>,
	): void {
		// Import game mode types if we have them
		if (this.uniqueGameModes.size > 0) {
			this.builder.addImport('./game-modes', ['GameModeHrid'], true)
		}

		const properties: PropertyDefinition[] = [
			{ name: 'hrid', type: 'LeaderboardTypeHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'gameMode', type: 'string' }, // Could be GameModeHrid if game-modes generator exists
			{ name: 'isSteam', type: 'boolean' },
			{ name: 'minJoinTime', type: 'string' },
			{ name: 'isGuild', type: 'boolean' },
			{ name: 'sortIndex', type: 'number' },
		]

		this.builder.addInterface('LeaderboardType', properties)
	}

	protected override generateUtilities(
		entities: Record<string, LeaderboardType>,
	): void {
		// Generate base utilities
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(entities: Record<string, LeaderboardType>): void {
		const guildTypes: string[] = []
		const steamTypes: string[] = []
		const standardTypes: string[] = []
		const typesByGameMode: Record<string, string[]> = {}

		for (const [hrid, type] of Object.entries(entities)) {
			if (type.isGuild) {
				guildTypes.push(hrid)
			}
			if (type.isSteam) {
				steamTypes.push(hrid)
			} else {
				standardTypes.push(hrid)
			}
			if (type.gameMode) {
				if (!typesByGameMode[type.gameMode]) {
					typesByGameMode[type.gameMode] = []
				}
				typesByGameMode[type.gameMode]!.push(hrid)
			}
		}

		// Generate lookup arrays
		this.builder.addComment('Guild leaderboard types')
		this.builder.addConstArray('GUILD_LEADERBOARD_TYPES', guildTypes, true)

		this.builder.addComment('Steam-specific leaderboard types')
		this.builder.addConstArray('STEAM_LEADERBOARD_TYPES', steamTypes, true)

		this.builder.addComment('Standard (non-Steam) leaderboard types')
		this.builder.addConstArray(
			'STANDARD_LEADERBOARD_TYPES',
			standardTypes,
			true,
		)

		// Generate game mode lookup map
		if (Object.keys(typesByGameMode).length > 0) {
			this.builder.addComment('Leaderboard types grouped by game mode')
			this.builder.getSourceFile().addVariableStatement({
				isExported: true,
				declarationKind: 'const' as any,
				declarations: [
					{
						name: 'LEADERBOARD_TYPES_BY_GAME_MODE',
						type: 'Partial<Record<string, readonly LeaderboardTypeHrid[]>>',
						initializer: (writer) => {
							writer.write('{')
							writer.newLine()
							Object.entries(typesByGameMode).forEach(
								([gameMode, types], index, arr) => {
									writer.indent(() => {
										writer.write(`'${gameMode}': [`)
										types.forEach((t, i) => {
											writer.write(`'${t}'`)
											if (i < types.length - 1) writer.write(', ')
										})
										writer.write(']')
										if (index < arr.length - 1) writer.write(',')
										writer.newLine()
									})
								},
							)
							writer.write('}')
						},
					},
				],
			})
		}
	}

	private generateSpecializedUtils(): void {
		// isGuildLeaderboardType
		this.builder.addFunction(
			'isGuildLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const type = LEADERBOARDTYPES.get(hrid)')
				writer.writeLine('return type?.isGuild === true')
			},
		)

		// isSteamLeaderboardType
		this.builder.addFunction(
			'isSteamLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const type = LEADERBOARDTYPES.get(hrid)')
				writer.writeLine('return type?.isSteam === true')
			},
		)

		// getLeaderboardTypesByGameMode
		this.builder.addFunction(
			'getLeaderboardTypesByGameMode',
			[{ name: 'gameMode', type: 'string' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_TYPES_BY_GAME_MODE[gameMode] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => LEADERBOARDTYPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// getGuildLeaderboardTypes
		this.builder.addFunction(
			'getGuildLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_TYPES.map(hrid => LEADERBOARDTYPES.get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// getSteamLeaderboardTypes
		this.builder.addFunction(
			'getSteamLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return STEAM_LEADERBOARD_TYPES.map(hrid => LEADERBOARDTYPES.get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// getStandardLeaderboardTypes
		this.builder.addFunction(
			'getStandardLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return STANDARD_LEADERBOARD_TYPES.map(hrid => LEADERBOARDTYPES.get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// canPlayerJoinLeaderboard
		this.builder.addFunction(
			'canPlayerJoinLeaderboard',
			[
				{ name: 'type', type: 'LeaderboardType' },
				{ name: 'joinDate', type: 'Date' },
				{ name: 'isSteamPlayer', type: 'boolean' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('// Check Steam requirement')
				writer.writeLine('if (type.isSteam && !isSteamPlayer) {')
				writer.writeLine('  return false')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('// Check join time requirement')
				writer.writeLine('if (type.minJoinTime) {')
				writer.writeLine('  const minDate = new Date(type.minJoinTime)')
				writer.writeLine('  if (joinDate > minDate) {')
				writer.writeLine('    return false')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return true')
			},
		)

		// sortLeaderboardTypesByIndex
		this.builder.addFunction(
			'sortLeaderboardTypesByIndex',
			[{ name: 'types', type: 'LeaderboardType[]' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return [...types].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// getDefaultLeaderboardType
		this.builder.addFunction(
			'getDefaultLeaderboardType',
			[],
			'LeaderboardType | undefined',
			(writer) => {
				writer.writeLine('// Returns the first non-guild, non-steam type')
				writer.writeLine('return Array.from(LEADERBOARDTYPES.values())')
				writer.writeLine('  .filter(type => !type.isGuild && !type.isSteam)')
				writer.writeLine('  .sort((a, b) => a.sortIndex - b.sortIndex)[0]')
			},
		)
	}
}
