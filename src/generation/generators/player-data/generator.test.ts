import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularPlayerDataGenerator } from './generator'

describe('PlayerData Generator', () => {
	let generator: ModularPlayerDataGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularPlayerDataGenerator()
		
		// Load player data sample
		const sourceFile = Bun.file('./src/sources/player_data.json')
		if (sourceFile.size > 0) {
			sampleSourceData = await sourceFile.json()
		} else {
			// Fallback sample data for testing
			sampleSourceData = {
				type: 'init_character_data',
				currentTimestamp: '2024-01-01T00:00:00Z',
				user: { id: 'user123', username: 'testuser', createdAt: '2024-01-01' },
				email: 'test@example.com',
				character: { id: 'char123', name: 'TestChar', gameMode: 'normal' },
				characterSkills: [],
				characterItems: [],
				characterActions: [],
			}
		}
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = (generator as any).config
			expect(config.entityName).toBe('PlayerData')
			expect(config.entityNamePlural).toBe('PlayerData') // Singleton
			expect(config.sourceKey).toBe('') // Root level
			expect(config.outputPath).toBe('src/generated/player-data')
		})

		test('should have correct feature flags for singleton', () => {
			const config = (generator as any).config
			expect(config.generateHrids).toBe(false) // No HRIDs for singleton
			expect(config.generateCollection).toBe(false) // Single instance
			expect(config.generateConstants).toBe(false) // No constants
			expect(config.generateUtils).toBe(true) // Custom utilities
			expect(config.generateLookups).toBe(false) // No lookups
		})

		test('should preserve all data fields', () => {
			const config = (generator as any).config
			expect(config.applyDataCleaning).toBe(false)
		})
	})

	describe('Data Extraction', () => {
		test('should extract singleton player data', () => {
			const extracted = generator.extractEntities(sampleSourceData)
			expect(Object.keys(extracted)).toHaveLength(1)
			expect(extracted['player-data']).toBeDefined()
		})

		test('should preserve all top-level properties', () => {
			const extracted = generator.extractEntities(sampleSourceData)
			const playerData = extracted['player-data']
			
			// Check core properties exist
			expect(playerData.type).toBeDefined()
			expect(playerData.currentTimestamp).toBeDefined()
		})

		test('should handle missing optional fields gracefully', () => {
			const minimalData = {
				type: 'init_character_data',
				currentTimestamp: '2024-01-01',
			}
			
			const extracted = generator.extractEntities(minimalData)
			expect(extracted['player-data']).toBeDefined()
			expect(extracted['player-data'].type).toBe('init_character_data')
		})
	})

	describe('Type Generation', () => {
		test('should generate without errors', async () => {
			// Clean up any existing generated files
			await Bun.$`rm -rf ./src/generated/playerdata`
			
			// Generate types
			await generator.generate('./src/sources/game_data.json')
			
			// Check that files were created
			const typesFile = Bun.file('./src/generated/playerdata/types.ts')
			expect(typesFile.size).toBeGreaterThan(0)
		})

		test('should not generate HRIDs for singleton', async () => {
			await generator.generate('./src/sources/game_data.json')
			
			const constantsFile = Bun.file('./src/generated/playerdata/constants.ts')
			const constantsContent = await constantsFile.text()
			
			// Should not have HRID arrays
			expect(constantsContent).not.toContain('PLAYERDATA_HRIDS')
		})

		test('should generate utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')
			
			const utilsFile = Bun.file('./src/generated/playerdata/utils.ts')
			const utilsContent = await utilsFile.text()
			
			// Check for custom utility functions
			expect(utilsContent).toContain('export function getCharacterSkill')
			expect(utilsContent).toContain('export function getCharacterItemCount')
			expect(utilsContent).toContain('export function hasCharacterAbility')
			expect(utilsContent).toContain('export function getTotalLevel')
			expect(utilsContent).toContain('export function isInGuild')
		})

		test('should not generate collection data', async () => {
			await generator.generate('./src/sources/game_data.json')
			
			// data.ts should not exist for singleton
			const dataFile = Bun.file('./src/generated/playerdata/data.ts')
			expect(dataFile.size).toBe(0) // File doesn't exist
		})
	})

	describe('Interface Definitions', () => {
		test('should define PlayerData interface', () => {
			const interfaces = (generator as any).defineInterfaces()
			const playerDataInterface = interfaces.find((i: any) => i.name === 'PlayerData')
			
			expect(playerDataInterface).toBeDefined()
			expect(playerDataInterface.properties).toContainEqual(
				expect.objectContaining({ name: 'type', type: 'string' })
			)
			expect(playerDataInterface.properties).toContainEqual(
				expect.objectContaining({ name: 'character', type: 'Character' })
			)
		})

		test('should define supporting interfaces', () => {
			const interfaces = (generator as any).defineInterfaces()
			
			// Check for supporting interfaces
			const userInterface = interfaces.find((i: any) => i.name === 'User')
			expect(userInterface).toBeDefined()
			
			const characterInterface = interfaces.find((i: any) => i.name === 'Character')
			expect(characterInterface).toBeDefined()
			
			const characterSkillInterface = interfaces.find((i: any) => i.name === 'CharacterSkill')
			expect(characterSkillInterface).toBeDefined()
		})

		test('should handle arrays and records correctly', () => {
			const interfaces = (generator as any).defineInterfaces()
			const playerDataInterface = interfaces.find((i: any) => i.name === 'PlayerData')
			
			// Check array types
			expect(playerDataInterface.properties).toContainEqual(
				expect.objectContaining({ name: 'characterSkills', type: 'CharacterSkill[]' })
			)
			
			// Check record types
			expect(playerDataInterface.properties).toContainEqual(
				expect.objectContaining({ 
					name: 'characterLoadoutMap', 
					type: 'Record<string, CharacterLoadout>' 
				})
			)
		})
	})

	describe('Utility Functions', () => {
		test('should define character skill utilities', () => {
			const utilities = (generator as any).defineUtilities()
			
			const getSkill = utilities.find((u: any) => u.name === 'getCharacterSkill')
			expect(getSkill).toBeDefined()
			expect(getSkill.parameters).toHaveLength(2)
			expect(getSkill.returnType).toBe('CharacterSkill | undefined')
		})

		test('should define inventory utilities', () => {
			const utilities = (generator as any).defineUtilities()
			
			const getItemCount = utilities.find((u: any) => u.name === 'getCharacterItemCount')
			expect(getItemCount).toBeDefined()
			expect(getItemCount.returnType).toBe('number')
		})

		test('should define guild utilities', () => {
			const utilities = (generator as any).defineUtilities()
			
			const isInGuild = utilities.find((u: any) => u.name === 'isInGuild')
			expect(isInGuild).toBeDefined()
			expect(isInGuild.returnType).toBe('boolean')
		})
	})

	describe('TypeScript Compilation', () => {
		test('should generate valid TypeScript', async () => {
			await generator.generate('./src/sources/game_data.json')
			
			// Test TypeScript compilation
			const result = await Bun.$`bun tsc --noEmit --skipLibCheck src/generated/playerdata/*.ts`.quiet()
			expect(result.exitCode).toBe(0)
		})
	})
})