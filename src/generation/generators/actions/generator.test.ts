import { describe, test, expect, beforeAll } from 'vitest'
import { ModularActionsGenerator } from './generator'
import { readFileSync } from 'fs'
import path from 'path'

describe('Actions Generator', () => {
  let generator: ModularActionsGenerator
  let sampleSourceData: any

  beforeAll(() => {
    generator = new ModularActionsGenerator()
    
    // Load sample source data for testing
    const sourcePath = path.join(process.cwd(), 'src/sources/game_data.json')
    sampleSourceData = JSON.parse(readFileSync(sourcePath, 'utf-8'))
  })

  describe('Configuration', () => {
    test('should have correct configuration', () => {
      expect(generator.config.entityName).toBe('Action')
      expect(generator.config.entityNamePlural).toBe('Actions')
      expect(generator.config.sourceKey).toBe('actionDetailMap')
      expect(generator.config.outputPath).toBe('src/generated/actions')
    })

    test('should have shared types configured', () => {
      expect(generator.config.sharedTypes).toContain('LevelRequirement')
      expect(generator.config.sharedTypes).toContain('ExperienceGain')
      expect(generator.config.sharedTypes).toContain('ActionItem')
      expect(generator.config.sharedTypes).toContain('DropTable')
    })

    test('should have utility templates configured', () => {
      expect(generator.config.utilityTemplates).toBeDefined()
      expect(generator.config.utilityTemplates?.length).toBeGreaterThan(0)
    })

    test('should have category filters configured', () => {
      expect(generator.config.categoryFilters).toBeDefined()
      expect(generator.config.categoryFilters?.length).toBeGreaterThan(0)
    })
  })

  describe('Data Extraction', () => {
    test('should extract actions from source data', () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      expect(Object.keys(entities).length).toBeGreaterThan(0)
      expect(Object.keys(entities).length).toBe(728) // Known action count
    })

    test('should extract action properties correctly', () => {
      const entities = generator.extractEntities(sampleSourceData)
      const actionHrid = Object.keys(entities)[0]
      const action = entities[actionHrid]

      expect(action).toBeDefined()
      expect(action.hrid).toBe(actionHrid)
      expect(action.name).toBeDefined()
      expect(action.function).toBeDefined()
      expect(action.type).toBeDefined()
      expect(action.category).toBeDefined()
      expect(typeof action.baseTimeCost).toBe('number')
      expect(typeof action.maxDifficulty).toBe('number')
      expect(typeof action.maxPartySize).toBe('number')
    })

    test('should handle optional properties correctly', () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      // Find an action with level requirement
      const actionWithLevelReq = Object.values(entities).find(a => a.levelRequirement !== null)
      expect(actionWithLevelReq?.levelRequirement).toBeDefined()
      expect(actionWithLevelReq?.levelRequirement?.skillHrid).toBeDefined()
      expect(actionWithLevelReq?.levelRequirement?.level).toBeGreaterThan(0)
    })

    test('should categorize actions correctly', () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      const combatActions = Object.values(entities).filter(a => a.combatZoneInfo !== null)
      expect(combatActions.length).toBeGreaterThan(0)
      
      const nonCombatActions = Object.values(entities).filter(a => a.combatZoneInfo === null)
      expect(nonCombatActions.length).toBeGreaterThan(0)
    })
  })

  describe('Type Generation', () => {
    test('should generate types without errors', async () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      // This should not throw
      expect(() => {
        generator.generateTypes(entities)
      }).not.toThrow()
    })
  })

  describe('Constants Generation', () => {
    test('should generate constants without errors', async () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      // This should not throw  
      expect(() => {
        generator.generateConstants(entities)
      }).not.toThrow()
    })
  })

  describe('Lookups Generation', () => {
    test('should generate lookups without errors', async () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      // This should not throw
      expect(() => {
        generator.generateLookups(entities)
      }).not.toThrow()
    })
  })

  describe('Utilities Generation', () => {
    test('should generate utilities without errors', async () => {
      const entities = generator.extractEntities(sampleSourceData)
      
      // This should not throw
      expect(() => {
        generator.generateUtilities(entities)  
      }).not.toThrow()
    })
  })

  describe('Full Generation', () => {
    test('should complete full generation without errors', async () => {
      const sourcePath = path.join(process.cwd(), 'src/sources/')
      
      // This should not throw
      await expect(generator.generate(sourcePath)).resolves.not.toThrow()
    })
  })

  describe('Integration', () => {
    test('should maintain domain boundaries', () => {
      // Verify the generator doesn't re-export types from other domains
      // This is more of a code review item, but we can check configuration
      expect(generator.config.sharedTypes).not.toContain('ItemHrid')
      expect(generator.config.sharedTypes).not.toContain('SkillHrid')
    })

    test('should use shared types correctly', () => {
      // Verify shared types are properly configured
      const sharedTypes = generator.config.sharedTypes || []
      
      expect(sharedTypes).toContain('LevelRequirement')
      expect(sharedTypes).toContain('ExperienceGain')
      expect(sharedTypes).toContain('ActionItem')
      expect(sharedTypes).toContain('DropTable')
      expect(sharedTypes).toContain('SpawnInfo')
      expect(sharedTypes).toContain('RandomSpawnInfo')
    })
  })
})

// Helper function for testing individual action extraction
function createSampleActionData() {
  return {
    name: 'Test Action',
    function: '/action_functions/combat',
    type: '/action_types/combat', 
    category: '/action_categories/combat',
    maxDifficulty: 1,
    levelRequirement: {
      skillHrid: '/skills/attack',
      level: 5
    },
    baseTimeCost: 4000,
    experienceGain: {
      skillHrid: '/skills/attack',
      value: 10
    },
    maxPartySize: 1
  }
}