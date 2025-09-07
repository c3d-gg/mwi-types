import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularCommunityBuffsGenerator } from './generator'

describe('CommunityBuffs Generator', () => {
	let generator: ModularCommunityBuffsGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularCommunityBuffsGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = generator['config']
			expect(config.entityName).toBe('CommunityBuffType')
			expect(config.entityNamePlural).toBe('CommunityBuffTypes')
			expect(config.sourceKey).toBe('communityBuffTypeDetailMap')
		})
	})

	describe('Data Extraction', () => {
		test('should extract all community buff types', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			expect(Object.keys(entities).length).toBe(5)
		})

		test('should properly transform community buff data', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const combatDropBuff = entities['/community_buff_types/combat_drop_quantity']

			expect(combatDropBuff).toBeDefined()
			expect(combatDropBuff.hrid).toBe('/community_buff_types/combat_drop_quantity')
			expect(combatDropBuff.name).toBe('Combat Drop Quantity')
			expect(combatDropBuff.cowbellCost).toBe(10)
			expect(combatDropBuff.buff).toBeDefined()
			expect(combatDropBuff.buff.typeHrid).toBe('/buff_types/combat_drop_quantity')
		})

		test('should handle buff properties correctly', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			Object.values(entities).forEach((buff) => {
				expect(buff.buff).toBeDefined()
				expect(typeof buff.buff.flatBoost).toBe('number')
				expect(typeof buff.buff.flatBoostLevelBonus).toBe('number')
				expect(typeof buff.buff.ratioBoost).toBe('number')
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

			const typesFile = Bun.file('./src/generated/communitybufftypes/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface CommunityBuffType/g)
			const typeMatches = content.match(/export type CommunityBuffTypeHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should generate CommunityBuff interface', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/communitybufftypes/types.ts')
			const content = await typesFile.text()

			expect(content).toContain('export interface CommunityBuff')
		})
	})

	describe('Integration', () => {
		test('should import BuffTypeHrid from bufftypes module', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/communitybufftypes/types.ts')
			const content = await typesFile.text()

			expect(content).toContain("import type { BuffTypeHrid } from '../bufftypes/types'")
		})

		test('should handle all 5 community buff types', async () => {
			await generator.generate('./src/sources/game_data.json')

			const dataFile = Bun.file('./src/generated/communitybufftypes/data.ts')
			const content = await dataFile.text()

			// Count the number of buff entries
			const buffMatches = content.match(/\/community_buff_types\/\w+/g)
			expect(buffMatches).toBeDefined()
			if (buffMatches) {
				expect(buffMatches.length).toBeGreaterThanOrEqual(5)
			}
		})
	})
})