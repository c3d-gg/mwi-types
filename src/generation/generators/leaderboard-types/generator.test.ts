import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularLeaderboardTypesGenerator } from './generator'

describe('LeaderboardTypes Generator', () => {
	let generator: ModularLeaderboardTypesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularLeaderboardTypesGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = generator['config']
			expect(config.entityName).toBe('LeaderboardType')
			expect(config.entityNamePlural).toBe('LeaderboardTypes')
			expect(config.sourceKey).toBe('leaderboardTypeDetailMap')
		})
	})

	describe('Data Extraction', () => {
		test('should extract all leaderboard types', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			expect(Object.keys(entities).length).toBe(6)
		})

		test('should properly transform leaderboard data', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const guild = entities['guild']

			expect(guild).toBeDefined()
			expect(guild.hrid).toBe('guild')
			expect(guild.name).toBe('Guild')
			expect(guild.isGuild).toBe(true)
			expect(guild.isSteam).toBe(false)
		})

		test('should handle guild and player leaderboards', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const guildLeaderboards = Object.values(entities).filter(lb => lb.isGuild)
			const playerLeaderboards = Object.values(entities).filter(lb => !lb.isGuild)

			expect(guildLeaderboards.length).toBeGreaterThan(0)
			expect(playerLeaderboards.length).toBeGreaterThan(0)
			expect(guildLeaderboards.length + playerLeaderboards.length).toBe(6)
		})

		test('should handle game mode filtering', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const ironcowBoards = Object.values(entities).filter(lb => lb.gameMode === 'ironcow')

			expect(ironcowBoards.length).toBeGreaterThan(0)
			ironcowBoards.forEach(lb => {
				expect(lb.gameMode).toBe('ironcow')
			})
		})
	})

	describe('Type Generation', () => {
		test('should generate without errors', async () => {
			await expect(async () => {
				await generator.generate('./src/sources/game_data.json')
			}).not.toThrow()
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/leaderboardtypes/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface LeaderboardType/g)
			const typeMatches = content.match(/export type LeaderboardTypeHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/leaderboardtypes/constants.ts')
			const content = await constantsFile.text()

			const hridMatches = content.match(/export const LEADERBOARDTYPE_HRIDS/g)
			expect(hridMatches).toHaveLength(1)

			// Check for category constants
			const guildMatches = content.match(/export const GUILD_LEADERBOARDS/g)
			const playerMatches = content.match(/export const PLAYER_LEADERBOARDS/g)
			const steamMatches = content.match(/export const STEAM_LEADERBOARDS/g)
			
			expect(guildMatches).toHaveLength(1)
			expect(playerMatches).toHaveLength(1)
			expect(steamMatches).toHaveLength(1)
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/leaderboardtypes/utils.ts')
			const content = await utilsFile.text()

			const getMatches = content.match(/export function getLeaderboardType\(/g)
			const isHridMatches = content.match(/export function isLeaderboardTypeHrid/g)
			const getGuildMatches = content.match(/export function getGuildLeaderboards/g)
			const getPlayerMatches = content.match(/export function getPlayerLeaderboards/g)

			expect(getMatches).toHaveLength(1)
			expect(isHridMatches).toHaveLength(1)
			expect(getGuildMatches).toHaveLength(1)
			expect(getPlayerMatches).toHaveLength(1)
		})
	})

	describe('Category Filters', () => {
		test('should generate guild, player and steam category constants', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/leaderboardtypes/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('export const GUILD_LEADERBOARDS')
			expect(content).toContain('export const PLAYER_LEADERBOARDS')
			expect(content).toContain('export const STEAM_LEADERBOARDS')
		})
	})

	describe('Utility Functions', () => {
		test('should generate custom utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/leaderboardtypes/utils.ts')
			const content = await utilsFile.text()

			expect(content).toContain('export function getGuildLeaderboards')
			expect(content).toContain('export function getPlayerLeaderboards')
			expect(content).toContain('export function getSteamLeaderboards')
			expect(content).toContain('export function getLeaderboardsByGameMode')
		})
	})

	describe('Integration', () => {
		test('should handle all 6 leaderboard types', async () => {
			await generator.generate('./src/sources/game_data.json')

			const dataFile = Bun.file('./src/generated/leaderboardtypes/data.ts')
			const content = await dataFile.text()

			// Count the number of leaderboard entries
			const lbMatches = content.match(/hrid: '[^']+'/g)
			expect(lbMatches).toBeDefined()
			if (lbMatches) {
				expect(lbMatches.length).toBe(6)
			}
		})
	})
})