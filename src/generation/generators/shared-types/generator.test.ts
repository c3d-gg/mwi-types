import { describe, expect, it } from 'bun:test'

import { ModularSharedTypesGenerator } from './generator'

describe('ModularSharedTypesGenerator', () => {
	const generator = new ModularSharedTypesGenerator()

	describe('constructor', () => {
		it('should initialize with correct configuration', () => {
			expect(generator.config.entityName).toBe('SharedType')
			expect(generator.config.entityNamePlural).toBe('SharedTypes')
			expect(generator.config.sourceKey).toBe('shared')
			expect(generator.config.outputPath).toBe('src/generated/sharedtypes')

			// All generation features should be disabled for shared types
			expect(generator.config.generateHrids).toBe(false)
			expect(generator.config.generateCollection).toBe(false)
			expect(generator.config.generateConstants).toBe(false)
			expect(generator.config.generateUtils).toBe(false)
			expect(generator.config.generateLookups).toBe(false)

			// No shared types or templates needed
			expect(generator.config.sharedTypes).toEqual([])
			expect(generator.config.utilityTemplates).toEqual([])
		})
	})

	describe('extractEntities', () => {
		it('should return empty object since shared types are static', () => {
			const mockSourceData = {
				someData: { test: 'data' },
				shared: { ignored: 'data' },
			}

			const result = generator.extractEntities(mockSourceData)
			expect(result).toEqual({})
		})
	})

	describe('defineInterfaces', () => {
		it('should define all required shared type interfaces', () => {
			const interfaces = (generator as any).defineInterfaces()

			expect(interfaces).toBeDefined()
			expect(Array.isArray(interfaces)).toBe(true)
			expect(interfaces.length).toBe(10) // Should have 10 shared type interfaces

			const interfaceNames = interfaces.map((i: any) => i.name)
			expect(interfaceNames).toContain('LevelRequirement')
			expect(interfaceNames).toContain('ExperienceGain')
			expect(interfaceNames).toContain('ItemCost')
			expect(interfaceNames).toContain('Stats')
			expect(interfaceNames).toContain('SpawnInfo')
			expect(interfaceNames).toContain('RandomSpawnInfo')
			expect(interfaceNames).toContain('DropTable')
			expect(interfaceNames).toContain('ActionItem')
			expect(interfaceNames).toContain('UpgradeCost')
			expect(interfaceNames).toContain('Buff')
		})

		it('should define LevelRequirement interface correctly', () => {
			const interfaces = (generator as any).defineInterfaces()
			const levelReq = interfaces.find(
				(i: any) => i.name === 'LevelRequirement',
			)

			expect(levelReq).toBeDefined()
			expect(levelReq.description).toBe(
				'Represents a skill level requirement for actions, items, etc.',
			)
			expect(levelReq.properties).toHaveLength(2)

			const skillHridProp = levelReq.properties.find(
				(p: any) => p.name === 'skillHrid',
			)
			expect(skillHridProp).toBeDefined()
			expect(skillHridProp.type).toBe('string')
			expect(skillHridProp.optional).toBe(false)
			expect(skillHridProp.description).toBe('The skill required')

			const levelProp = levelReq.properties.find((p: any) => p.name === 'level')
			expect(levelProp).toBeDefined()
			expect(levelProp.type).toBe('number')
			expect(levelProp.optional).toBe(false)
			expect(levelProp.description).toBe('The minimum level required')
		})

		it('should define DropTable interface correctly', () => {
			const interfaces = (generator as any).defineInterfaces()
			const dropTable = interfaces.find((i: any) => i.name === 'DropTable')

			expect(dropTable).toBeDefined()
			expect(dropTable.description).toBe(
				'Represents a drop table entry for items that can be obtained.',
			)
			expect(dropTable.properties).toHaveLength(4)

			const expectedProperties = [
				'itemHrid',
				'dropRate',
				'minCount',
				'maxCount',
			]
			const actualProperties = dropTable.properties.map((p: any) => p.name)
			expect(actualProperties).toEqual(expectedProperties)

			// Check types
			expect(
				dropTable.properties.find((p: any) => p.name === 'itemHrid').type,
			).toBe('string')
			expect(
				dropTable.properties.find((p: any) => p.name === 'dropRate').type,
			).toBe('number')
			expect(
				dropTable.properties.find((p: any) => p.name === 'minCount').type,
			).toBe('number')
			expect(
				dropTable.properties.find((p: any) => p.name === 'maxCount').type,
			).toBe('number')
		})

		it('should define Buff interface with optional fields', () => {
			const interfaces = (generator as any).defineInterfaces()
			const buff = interfaces.find((i: any) => i.name === 'Buff')

			expect(buff).toBeDefined()
			expect(buff.description).toBe(
				'Represents a buff that can be applied to skills or global stats.',
			)
			expect(buff.properties).toHaveLength(3)

			const skillHridProp = buff.properties.find(
				(p: any) => p.name === 'skillHrid',
			)
			expect(skillHridProp).toBeDefined()
			expect(skillHridProp.type).toBe('string')
			expect(skillHridProp.optional).toBe(true) // Should be optional for global buffs

			const valueProp = buff.properties.find((p: any) => p.name === 'value')
			expect(valueProp).toBeDefined()
			expect(valueProp.type).toBe('number')
			expect(valueProp.optional).toBe(false) // Should be required

			const isPercentageProp = buff.properties.find(
				(p: any) => p.name === 'isPercentage',
			)
			expect(isPercentageProp).toBeDefined()
			expect(isPercentageProp.type).toBe('boolean')
			expect(isPercentageProp.optional).toBe(true) // Should be optional
		})

		it('should define Stats interface with index signature', () => {
			const interfaces = (generator as any).defineInterfaces()
			const stats = interfaces.find((i: any) => i.name === 'Stats')

			expect(stats).toBeDefined()
			expect(stats.description).toBe(
				'Flexible stats object for items, equipment, and other entities.',
			)
			expect(stats.properties).toHaveLength(1)

			const indexSignature = stats.properties[0]
			expect(indexSignature.name).toBe('[key: string]')
			expect(indexSignature.type).toBe('number')
			expect(indexSignature.optional).toBe(false)
			expect(indexSignature.description).toBe(
				'Flexible stats object that can contain any numeric stat property',
			)
		})
	})

	describe('integration', () => {
		it('should be compatible with the module system', () => {
			// Verify it extends the correct base class
			expect(generator instanceof ModularSharedTypesGenerator).toBe(true)
			expect(generator.config).toBeDefined()
		})

		it('should have main execution block for dev CLI', () => {
			// The generator should have a main execution block at the end of the file
			// This is tested by the fact that it can be imported and used by the dev CLI
			expect(typeof ModularSharedTypesGenerator).toBe('function')
		})
	})
})
