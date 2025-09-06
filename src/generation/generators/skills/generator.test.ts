import { describe, test, expect, beforeAll } from 'vitest'
import { ModularSkillsGenerator } from './generator'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Skills Generator', () => {
  let generator: ModularSkillsGenerator
  let sourceData: any

  beforeAll(() => {
    // Load actual source data for realistic testing
    const gameDataPath = join(process.cwd(), 'src/sources/game_data.json')
    const gameData = JSON.parse(readFileSync(gameDataPath, 'utf-8'))
    sourceData = gameData.skillDetailMap
    
    generator = new ModularSkillsGenerator()
  })

  describe('Configuration', () => {
    test('should have correct configuration', () => {
      const config = generator.config
      
      expect(config.entityName).toBe('Skill')
      expect(config.entityNamePlural).toBe('Skills')
      expect(config.sourceKey).toBe('skillDetailMap')
      expect(config.outputPath).toBe('src/generated/skills')
    })

    test('should have no shared types dependencies', () => {
      const config = generator.config
      
      expect(config.sharedTypes).toEqual([])
    })

    test('should have correct category filters', () => {
      const config = generator.config
      
      expect(config.categoryFilters).toHaveLength(2)
      
      const skillingFilter = config.categoryFilters?.find(f => f.name === 'skilling')
      const combatFilter = config.categoryFilters?.find(f => f.name === 'combat')
      
      expect(skillingFilter).toBeDefined()
      expect(combatFilter).toBeDefined()
    })

    test('should use correct utility templates', () => {
      const config = generator.config
      
      expect(config.utilityTemplates).toBeDefined()
      const templateTypes = config.utilityTemplates?.map(t => t.type) || []
      
      expect(templateTypes).toContain('getByField')
      expect(templateTypes).toContain('sortBy')
      expect(templateTypes).toContain('filterBy')
      expect(templateTypes).toContain('toMap')
    })
  })

  describe('Data Extraction', () => {
    test('should extract all skills from source data', () => {
      const entities = generator.extractEntities(sourceData)
      
      expect(Object.keys(entities)).toHaveLength(18)
    })

    test('should correctly map skill properties', () => {
      const entities = generator.extractEntities(sourceData)
      const alchemyHrid = '/skills/alchemy'
      
      expect(entities[alchemyHrid]).toBeDefined()
      
      const alchemy = entities[alchemyHrid]
      expect(alchemy).toMatchObject({
        hrid: '/skills/alchemy',
        name: 'Alchemy',
        isSkilling: true,
        isCombat: false,
        sortIndex: expect.any(Number)
      })
    })

    test('should preserve all required properties', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      const requiredProps = ['hrid', 'name', 'isSkilling', 'isCombat', 'sortIndex']
      
      skills.forEach(skill => {
        requiredProps.forEach(prop => {
          expect(skill).toHaveProperty(prop)
          expect(skill[prop as keyof typeof skill]).toBeDefined()
        })
      })
    })

    test('should handle boolean properties correctly', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      skills.forEach(skill => {
        expect(typeof skill.isSkilling).toBe('boolean')
        expect(typeof skill.isCombat).toBe('boolean')
      })
    })

    test('should validate sortIndex is numeric', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      skills.forEach(skill => {
        expect(typeof skill.sortIndex).toBe('number')
        expect(Number.isInteger(skill.sortIndex)).toBe(true)
      })
    })

    test('should have proper HRID format', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      skills.forEach(skill => {
        expect(skill.hrid).toMatch(/^\/skills\/[a-z_]+$/)
      })
    })
  })

  describe('Category Filtering Logic', () => {
    test('should properly identify skilling skills', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      const skillingSkills = skills.filter(skill => skill.isSkilling)
      const nonSkillingSkills = skills.filter(skill => !skill.isSkilling)
      
      expect(skillingSkills.length).toBeGreaterThan(0)
      expect(nonSkillingSkills.length).toBeGreaterThan(0)
      expect(skillingSkills.length + nonSkillingSkills.length).toBe(18)
      
      // Verify filter logic from config
      const config = generator.config
      const skillingFilter = config.categoryFilters?.find(f => f.name === 'skilling')
      
      if (skillingFilter?.condition) {
        skills.forEach(skill => {
          const filterResult = skillingFilter.condition(skill)
          expect(filterResult).toBe(skill.isSkilling)
        })
      }
    })

    test('should properly identify combat skills', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      const combatSkills = skills.filter(skill => skill.isCombat)
      const nonCombatSkills = skills.filter(skill => !skill.isCombat)
      
      expect(combatSkills.length).toBeGreaterThan(0)
      expect(nonCombatSkills.length).toBeGreaterThan(0)
      expect(combatSkills.length + nonCombatSkills.length).toBe(18)
      
      // Verify filter logic from config
      const config = generator.config
      const combatFilter = config.categoryFilters?.find(f => f.name === 'combat')
      
      if (combatFilter?.condition) {
        skills.forEach(skill => {
          const filterResult = combatFilter.condition(skill)
          expect(filterResult).toBe(skill.isCombat)
        })
      }
    })

    test('should have mutually exclusive categories', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      // No skill should be both skilling and combat
      const bothCategories = skills.filter(skill => skill.isSkilling && skill.isCombat)
      expect(bothCategories).toHaveLength(0)
      
      // Most skills should be in at least one category (except special ones like total_level)
      const inNoCategory = skills.filter(skill => !skill.isSkilling && !skill.isCombat)
      expect(inNoCategory.length).toBeLessThanOrEqual(1) // Allow total_level to be in no category
      
      // If there are skills in no category, they should be special cases
      inNoCategory.forEach(skill => {
        expect(skill.hrid).toMatch(/total_level|summary/) // Allow known special cases
      })
    })
  })

  describe('Type Generation', () => {
    test('should generate without TypeScript errors', () => {
      const entities = generator.extractEntities(sourceData)
      
      // This test validates that the extracted entities conform to expected types
      // TypeScript compilation will catch type mismatches
      expect(() => {
        const skills: Array<{
          hrid: string
          name: string
          isSkilling: boolean
          isCombat: boolean
          sortIndex: number
        }> = Object.values(entities)
        
        expect(skills.length).toBe(18)
      }).not.toThrow()
    })

    test('should define interfaces correctly via hook system', () => {
      expect(() => {
        const interfaces = (generator as any).defineInterfaces()
        expect(interfaces).toHaveLength(1)
        expect(interfaces[0].name).toBe('Skill')
        expect(interfaces[0].properties).toHaveLength(5)
      }).not.toThrow()
    })

    test('should have unique HRIDs', () => {
      const entities = generator.extractEntities(sourceData)
      const hrids = Object.keys(entities)
      const uniqueHrids = new Set(hrids)
      
      expect(hrids.length).toBe(uniqueHrids.size)
    })

    test('should have consistent entity keys and hrids', () => {
      const entities = generator.extractEntities(sourceData)
      
      Object.entries(entities).forEach(([key, skill]) => {
        expect(key).toBe(skill.hrid)
      })
    })
  })

  describe('Integration Scenarios', () => {
    test('should handle empty source data gracefully', () => {
      const emptyEntities = generator.extractEntities({})
      
      expect(emptyEntities).toEqual({})
    })

    test('should handle malformed source data', () => {
      const malformedData = { someSkill: null }
      
      expect(() => {
        generator.extractEntities(malformedData)
      }).not.toThrow()
    })

    test('should maintain data integrity for realistic game usage', () => {
      const entities = generator.extractEntities(sourceData)
      
      // Skills commonly referenced in game (based on actual data)
      const commonSkills = ['/skills/cooking', '/skills/alchemy', '/skills/attack', '/skills/defense']
      
      commonSkills.forEach(hrid => {
        expect(entities[hrid]).toBeDefined()
        expect(entities[hrid].name).toBeTruthy()
        expect(typeof entities[hrid].sortIndex).toBe('number')
      })
    })
  })

  describe('Performance Characteristics', () => {
    test('should extract entities quickly', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 100; i++) {
        generator.extractEntities(sourceData)
      }
      
      const endTime = performance.now()
      const avgTime = (endTime - startTime) / 100
      
      // Should be very fast for 18 entities
      expect(avgTime).toBeLessThan(10) // Less than 10ms average
    })

    test('should have minimal memory footprint', () => {
      const entities = generator.extractEntities(sourceData)
      const serialized = JSON.stringify(entities)
      
      // 18 simple entities should be very lightweight
      expect(serialized.length).toBeLessThan(5000) // Less than 5KB
    })
  })

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing optional properties', () => {
      const partialData = {
        '/skills/test': {
          hrid: '/skills/test',
          name: 'Test Skill',
          sortIndex: 999
          // Missing isSkilling and isCombat
        }
      }
      
      expect(() => {
        generator.extractEntities(partialData)
      }).not.toThrow()
    })

    test('should handle duplicate HRIDs in source', () => {
      const duplicateData = {
        '/skills/duplicate1': {
          hrid: '/skills/same',
          name: 'First',
          isSkilling: true,
          isCombat: false,
          sortIndex: 1
        },
        '/skills/duplicate2': {
          hrid: '/skills/same',
          name: 'Second', 
          isSkilling: false,
          isCombat: true,
          sortIndex: 2
        }
      }
      
      const entities = generator.extractEntities(duplicateData)
      
      // Should handle gracefully, last one wins or merge appropriately
      expect(Object.keys(entities).length).toBeGreaterThan(0)
    })

    test('should validate data consistency', () => {
      const entities = generator.extractEntities(sourceData)
      
      Object.values(entities).forEach(skill => {
        // Name should not be empty
        expect(skill.name.length).toBeGreaterThan(0)
        
        // HRID should start with /skills/
        expect(skill.hrid.startsWith('/skills/')).toBe(true)
        
        // Sort index should be non-negative
        expect(skill.sortIndex).toBeGreaterThanOrEqual(0)
      })
    })
  })

  describe('Expected Generated Output Structure', () => {
    test('should prepare data for HRID constants generation', () => {
      const entities = generator.extractEntities(sourceData)
      const hrids = Object.keys(entities)
      
      expect(hrids.length).toBe(18)
      hrids.forEach(hrid => {
        expect(hrid).toMatch(/^\/skills\/[a-z_]+$/)
      })
    })

    test('should prepare data for category constants generation', () => {
      const entities = generator.extractEntities(sourceData)
      const skills = Object.values(entities)
      
      const skillingHrids = skills.filter(s => s.isSkilling).map(s => s.hrid)
      const combatHrids = skills.filter(s => s.isCombat).map(s => s.hrid)
      
      expect(skillingHrids.length).toBeGreaterThan(0)
      expect(combatHrids.length).toBeGreaterThan(0)
      
      // These will become SKILLING_SKILL_HRIDS and COMBAT_SKILL_HRIDS constants
      expect(skillingHrids.every(hrid => hrid.startsWith('/skills/'))).toBe(true)
      expect(combatHrids.every(hrid => hrid.startsWith('/skills/'))).toBe(true)
    })

    test('should prepare data for lookup table generation', () => {
      const entities = generator.extractEntities(sourceData)
      
      const nameToHridMap = new Map<string, string>()
      const hridToNameMap = new Map<string, string>()
      
      Object.values(entities).forEach(skill => {
        nameToHridMap.set(skill.name, skill.hrid)
        hridToNameMap.set(skill.hrid, skill.name)
      })
      
      expect(nameToHridMap.size).toBe(18)
      expect(hridToNameMap.size).toBe(18)
      
      // Verify bidirectional mapping works
      nameToHridMap.forEach((hrid, name) => {
        expect(hridToNameMap.get(hrid)).toBe(name)
      })
    })
  })
})