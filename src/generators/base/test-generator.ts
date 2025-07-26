/**
 * Test generator to verify base infrastructure works correctly
 * Generates damage types as a simple test case
 */

import { BaseGenerator } from './base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from './types'

interface DamageTypeDetail extends BaseEntity {
  hrid: string
  name: string
  sortIndex: number
}

/**
 * Test generator for damage types
 */
export class DamageTypeGenerator extends BaseGenerator<DamageTypeDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'DamageType',
      entityNamePlural: 'damageTypes',
      sourceKey: 'damageTypeDetailMap',
      outputFilename: 'damage-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }
  
  protected extractEntities(): Record<string, DamageTypeDetail> {
    return this.getEntitiesFromGameData() as Record<string, DamageTypeDetail>
  }
  
  protected defineSchemaProperties(entity: DamageTypeDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'string',
        description: 'Human readable ID'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order index'
      }
    ]
  }
  
  protected override generateAdditionalExports(entities: Record<string, DamageTypeDetail>): string[] {
    // Get sorted damage types
    const sortedTypes = Object.values(entities)
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map(dt => `'${dt.hrid}'`)
      .join(', ')
    
    return [
      `// Sorted damage types
export const DAMAGE_TYPES_SORTED = [${sortedTypes}] as const

export function isDamageType(value: string): value is DamageTypeHrid {
  return value in DAMAGE_TYPE_S
}`
    ]
  }
}

/**
 * Run the test generator
 */
export async function runTestGenerator(): Promise<void> {
  console.log('🧪 Running test generator...\n')
  
  try {
    const generator = new DamageTypeGenerator()
    const result = await generator.generate()
    
    console.log(`✅ Test generator completed successfully!`)
    console.log(`   Generated ${result.count} ${result.entityType}`)
    console.log(`   Files created:`)
    console.log(`   - src/generated/game-logic/damage-types.ts`)
    console.log(`   - src/generated/schemas/zod/damage-types.ts`)
    console.log(`   - src/generated/schemas/typebox/damage-types.ts`)
    console.log(`   - src/generated/constants/damage-types-hrids.ts`)
  } catch (error) {
    console.error('❌ Test generator failed:', error)
    throw error
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTestGenerator()
}