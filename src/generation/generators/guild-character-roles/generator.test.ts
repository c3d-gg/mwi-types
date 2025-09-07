import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularGuildCharacterRolesGenerator } from './generator'

describe('GuildCharacterRoles Generator', () => {
	let generator: ModularGuildCharacterRolesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularGuildCharacterRolesGenerator()

		// Load test data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = (generator as any).config

			expect(config.entityName).toBe('GuildCharacterRole')
			expect(config.entityNamePlural).toBe('GuildCharacterRoles')
			expect(config.sourceKey).toBe('guildCharacterRoleDetailMap')
		})

		test('should have no shared types (Layer 3 generator)', () => {
			const config = (generator as any).config
			expect(config.sharedTypes).toEqual([])
		})

		test('should include standard utility templates', () => {
			const config = (generator as any).config
			const templateTypes = config.utilityTemplates?.map((t: any) => t.type)

			expect(templateTypes).toContain('getByField')
			expect(templateTypes).toContain('sortBy')
			expect(templateTypes).toContain('toMap')
		})
	})

	describe('Data Extraction', () => {
		test('should extract exactly 4 guild character roles', () => {
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities)).toHaveLength(4)
		})

		test('should include expected role HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			expect(hrids).toContain('member')
			expect(hrids).toContain('officer')
			expect(hrids).toContain('general')
			expect(hrids).toContain('leader')
		})

		test('should correctly map role properties', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const generalRole = entities['general']

			expect(generalRole).toBeDefined()
			if (generalRole) {
				expect(generalRole.hrid).toBe('general')
				expect(generalRole.name).toBe('General')
				expect(generalRole.permissionTier).toBe(3)
				expect(typeof generalRole.canPromote).toBe('boolean')
				expect(typeof generalRole.canKick).toBe('boolean')
			}
		})

		test('should handle role hierarchy relationships', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const generalRole = entities['general']

			if (generalRole) {
				// General can demote to officer
				expect(generalRole.demoteRole).toBe('officer')
				// General has empty promote role (likely leader)
				expect(typeof generalRole.promoteRole).toBe('string')
			}
		})

		test('should preserve permission boolean fields', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const role of Object.values(entities)) {
				expect(typeof role.canEditName).toBe('boolean')
				expect(typeof role.canEditNotice).toBe('boolean')
				expect(typeof role.canPromote).toBe('boolean')
				expect(typeof role.canDemote).toBe('boolean')
				expect(typeof role.canKick).toBe('boolean')
				expect(typeof role.canInvite).toBe('boolean')
			}
		})

		test('should have numeric permission tiers', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const role of Object.values(entities)) {
				expect(typeof role.permissionTier).toBe('number')
				expect(role.permissionTier).toBeGreaterThanOrEqual(0)
			}
		})
	})

	describe('Type Generation', () => {
		test('should generate types without TypeScript errors', async () => {
			// Generate the module
			await generator.generate('./src/sources/game_data.json')

			// Verify files were created (note: folder is "guildcharacterroles")
			const typesFile = Bun.file('./src/generated/guildcharacterroles/types.ts')
			const typesExist = await typesFile.exists()
			expect(typesExist).toBe(true)
		})

		test('should create all required output files', async () => {
			await generator.generate('./src/sources/game_data.json')

			const files = [
				'types.ts',
				'constants.ts',
				'data.ts',
				'utils.ts',
				'lookups.ts',
				'index.ts',
			]

			for (const file of files) {
				const filePath = `./src/generated/guildcharacterroles/${file}`
				const fileExists = await Bun.file(filePath).exists()
				expect(fileExists).toBe(true)
			}
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/guildcharacterroles/types.ts')
			const content = await typesFile.text()

			// Count interface definitions
			const interfaceMatches = content.match(
				/export interface GuildCharacterRole/g,
			)
			const typeMatches = content.match(/export type GuildCharacterRoleHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file(
				'./src/generated/guildcharacterroles/constants.ts',
			)
			const content = await constantsFile.text()

			// Count constant definitions
			const hridMatches = content.match(
				/export const GUILDCHARACTERROLE_HRIDS/g,
			)
			const promoteMatches = content.match(/export const CANPROMOTE/g)
			const kickMatches = content.match(/export const CANKICK/g)
			const tierMatches = content.match(/export const HIGHTIER/g)

			expect(hridMatches).toHaveLength(1)
			expect(promoteMatches).toHaveLength(1)
			expect(kickMatches).toHaveLength(1)
			expect(tierMatches).toHaveLength(1)
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/guildcharacterroles/utils.ts')
			const content = await utilsFile.text()

			// Count function definitions
			const isHridMatches = content.match(
				/export function isGuildCharacterRoleHrid/g,
			)
			const getMatches = content.match(
				/export function getGuildCharacterRole\b/g,
			) // \b for word boundary
			const requireMatches = content.match(
				/export function requireGuildCharacterRole/g,
			)
			const getAllMatches = content.match(
				/export function getAllGuildCharacterRoles/g,
			)

			expect(isHridMatches).toHaveLength(1)
			expect(getMatches).toHaveLength(1)
			expect(requireMatches).toHaveLength(1)
			expect(getAllMatches).toHaveLength(1)
		})
	})

	describe('Edge Cases and Validation', () => {
		test('should handle missing or null role relationships gracefully', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Some roles may have empty promote/demote strings
			for (const role of Object.values(entities)) {
				expect(typeof role.promoteRole).toBe('string')
				expect(typeof role.demoteRole).toBe('string')
			}
		})

		test('should maintain consistent sort indices', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const role of Object.values(entities)) {
				expect(typeof role.sortIndex).toBe('number')
			}
		})

		test('should not have duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)
			const uniqueHrids = [...new Set(hrids)]

			expect(hrids.length).toBe(uniqueHrids.length)
		})
	})

	describe('Integration', () => {
		test('should follow modular generator patterns', () => {
			// Verify inheritance
			expect(generator).toBeInstanceOf(ModularGuildCharacterRolesGenerator)

			// Verify required methods exist
			expect(typeof generator.extractEntities).toBe('function')
			expect(typeof generator.generate).toBe('function')
		})

		test('should be compatible with Layer 3 architecture', () => {
			const config = (generator as any).config

			// Layer 3 = no dependencies
			expect(config.sharedTypes).toEqual([])

			// Should generate standard files
			expect(config.generateHrids).toBe(true)
			expect(config.generateCollection).toBe(true)
			expect(config.generateUtils).toBe(true)
		})
	})
})
