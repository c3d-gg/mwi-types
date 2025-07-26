/**
 * Base generator class that all entity generators extend
 * Provides common functionality for reading data, generating schemas, and writing files
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import type { GameData } from '../../types/source-data'
import { PATHS } from '../../config/paths'
import type {
  GeneratorConfig,
  GeneratorResult,
  BaseEntity,
  PropertyDefinition,
  SchemaOptions,
  HridGenerationOptions,
  ImportStatement
} from './types'
import {
  generateZodSchema,
  generateTypeFromSchema,
  generateZodSchemaFile
} from './schema-generator'
import {
  generateTypeboxAdapterFile
} from './typebox-adapter'
import {
  extractHrids,
  generateHridCode,
  generateHridGetters,
  generateBrandedHridType
} from './hrid-generator'
import {
  writeGeneratedFile,
  generateImportStatements,
  generateCommentBlock,
  createOutputPath
} from './file-writer'

/**
 * Abstract base class for entity generators
 */
export abstract class BaseGenerator<TEntity extends BaseEntity> {
  protected config: GeneratorConfig
  protected gameData: GameData | null = null
  
  constructor(config: GeneratorConfig) {
    this.config = config
  }
  
  /**
   * Main generation method - orchestrates the entire process
   */
  async generate(): Promise<GeneratorResult> {
    console.log(`🔧 Generating ${this.config.entityNamePlural}...`)
    
    // Load game data
    await this.loadGameData()
    
    // Extract entities
    const entities = this.extractEntities()
    const entityCount = Object.keys(entities).length
    
    // Generate game logic file
    await this.generateGameLogicFile(entities)
    
    // Generate schema files if requested
    if (this.config.generateZodSchema) {
      await this.generateZodSchemaFile(entities)
      
      // Also generate Typebox adapter file if requested
      if (this.config.generateTypeboxSchema) {
        await this.generateTypeboxSchemaFile(entities)
      }
    }
    
    // Generate HRID constants if requested
    if (this.config.generateHrids) {
      await this.generateHridConstantsFile(entities)
    }
    
    return {
      count: entityCount,
      entityType: this.config.entityNamePlural
    }
  }
  
  /**
   * Load game data from JSON file
   */
  protected async loadGameData(): Promise<void> {
    const rawData = await readFile(PATHS.sourceData, 'utf-8')
    this.gameData = JSON.parse(rawData) as GameData
  }
  
  /**
   * Extract entities from game data - must be implemented by subclasses
   */
  protected abstract extractEntities(): Record<string, TEntity>
  
  /**
   * Define properties for schema generation - must be implemented by subclasses
   */
  protected abstract defineSchemaProperties(entity: TEntity): PropertyDefinition[]
  
  /**
   * Generate additional exports for the game logic file
   */
  protected generateAdditionalExports(entities: Record<string, TEntity>): string[] {
    return []
  }
  
  /**
   * Generate the main game logic file
   */
  protected async generateGameLogicFile(entities: Record<string, TEntity>): Promise<void> {
    const entityName = this.config.entityName
    const entityNamePlural = this.config.entityNamePlural
    const entityNameUpper = entityName.toUpperCase()
    const entityNameUpperPlural = entityNamePlural.toUpperCase()
    
    // Extract HRIDs
    const hrids = extractHrids(entities)
    
    // Generate data object
    const dataEntries = Object.entries(entities).map(([hrid, entity]) => {
      const entityData = this.transformEntityForOutput(entity)
      return `  '${hrid}': ${JSON.stringify(entityData, null, 2).replace(/\n/g, '\n  ')}`
    }).join(',\n')
    
    // Generate content
    const imports = this.generateImports()
    const schemaName = `${entityName}Schema`
    const typeName = entityName
    const hridTypeName = `${entityName}Hrid`
    
    // Add re-exports from schema if HRIDs and schemas are generated
    const hridEnumName = `${entityName}HridEnum`
    const hridExports = this.config.generateHrids && this.config.generateZodSchema
      ? `\n// Re-export HRID enum from schema\nexport { ${hridEnumName} } from '../schemas/zod/${this.config.outputFilename}'`
      : ''
    
    // Re-export schema for backward compatibility
    const schemaExports = this.config.generateZodSchema
      ? `\n// Re-export schema\nexport { ${schemaName} } from '../schemas/zod/${this.config.outputFilename}'`
      : ''
    
    const content = `${imports}${hridExports}${schemaExports}

// Type definitions
${this.config.generateHrids && this.config.generateZodSchema ? `type ${hridTypeName} = z.infer<typeof ${hridEnumName}>` : generateBrandedHridType(hridTypeName, entityName)}

// Data
export const ${entityNameUpperPlural}: Record<${this.config.generateHrids && this.config.generateZodSchema ? hridTypeName : 'string'}, ${typeName}> = {
${dataEntries}
} as const${this.config.generateHrids && this.config.generateZodSchema ? ` satisfies Record<${hridTypeName}, ${typeName}>` : ''}

// HRID utilities
${this.config.generateHrids && this.config.generateZodSchema ? this.generateHridUtilities(entityName, hridTypeName, entityNameUpperPlural) : generateHridGetters(entityName, hridTypeName, entityNameUpperPlural)}

// Getter functions
export function get${entityName}(hrid: ${this.config.generateHrids && this.config.generateZodSchema ? hridTypeName : 'string'}): ${typeName}${this.config.generateHrids && this.config.generateZodSchema ? '' : ' | undefined'} {
  return ${entityNameUpperPlural}[${this.config.generateHrids && this.config.generateZodSchema ? 'hrid' : 'hrid'}]
}

export function getAll${entityNamePlural}(): ${typeName}[] {
  return Object.values(${entityNameUpperPlural})
}

export function get${entityNamePlural}SortedByIndex(): ${typeName}[] {
  return getAll${entityNamePlural}().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ${typeName} }
${this.config.generateHrids && this.config.generateZodSchema ? `export type { ${hridTypeName} }` : `// Note: ${hridTypeName} is a branded type defined above`}
export type ${entityName}Id = keyof typeof ${entityNameUpperPlural}
export type ${entityName}Data = typeof ${entityNameUpperPlural}

${this.generateAdditionalExports(entities).join('\n\n')}`
    
    const outputPath = createOutputPath(PATHS.gameLogic, '', this.config.outputFilename)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
  
  /**
   * Generate Zod schema file
   */
  protected async generateZodSchemaFile(entities: Record<string, TEntity>): Promise<void> {
    const entityName = this.config.entityName
    const schemaName = `${entityName}Schema`
    
    // Get a sample entity to define schema
    const sampleEntity = Object.values(entities)[0]
    if (!sampleEntity) {
      console.warn(`No entities found for ${entityName}, skipping Zod schema generation`)
      return
    }
    const properties = this.defineSchemaProperties(sampleEntity)
    
    // Extract HRIDs if configured to generate them
    const additionalExports: string[] = []
    if (this.config.generateHrids) {
      const hrids = extractHrids(entities)
      if (hrids.length > 0) {
        const hridEnumName = `${entityName}HridEnum`
        const hridTypeName = `${entityName}Hrid`
        const hridValues = hrids.map(h => `'${h}'`).join(', ')
        additionalExports.push(`export const ${hridEnumName} = z.enum([${hridValues}] as const)`)
        additionalExports.push(`export type ${hridTypeName} = z.infer<typeof ${hridEnumName}>`)
      }
    }
    
    const content = generateZodSchemaFile(properties, {
      schemaName,
      imports: this.getZodImports(),
      additionalExports
    })
    
    const outputPath = createOutputPath(PATHS.schemasZod, '', this.config.outputFilename)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
  
  /**
   * Generate Typebox schema file (via adapter)
   */
  protected async generateTypeboxSchemaFile(entities: Record<string, TEntity>): Promise<void> {
    const entityName = this.config.entityName
    
    // Generate adapter file that imports from Zod
    const content = generateTypeboxAdapterFile(entityName, '../zod', this.config.outputFilename)
    
    const outputPath = createOutputPath(PATHS.schemasTypebox, '', this.config.outputFilename)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
  
  /**
   * Generate HRID constants file
   */
  protected async generateHridConstantsFile(entities: Record<string, TEntity>): Promise<void> {
    const entityName = this.config.entityName
    const hrids = extractHrids(entities)
    
    const hridOptions: HridGenerationOptions = {
      enumName: `${entityName}HridEnum`,
      constName: `${entityName.toUpperCase()}_HRIDS`,
      unionTypeName: `${entityName}HridType`,
      stripPrefix: `/${this.config.entityNamePlural}/`
    }
    
    const content = `${this.generateConstantsImports()}

${generateHridCode(hrids, entityName, hridOptions)}

// Total count
export const ${entityName.toUpperCase()}_COUNT = ${hrids.length} as const`
    
    const outputPath = createOutputPath(PATHS.constants, '', `${this.config.outputFilename}-hrids`)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
  
  /**
   * Transform entity for output - can be overridden by subclasses
   */
  protected transformEntityForOutput(entity: TEntity): any {
    // Default implementation returns entity as-is
    // Subclasses can override to transform/minimize data
    return entity
  }
  
  /**
   * Generate imports for game logic file
   */
  protected generateImports(): string {
    const entityName = this.config.entityName
    const schemaName = `${entityName}Schema`
    
    const imports = [
      {
        from: 'zod',
        items: ['z']
      }
    ]
    
    // Import type from schema file if schema generation is enabled
    if (this.config.generateZodSchema) {
      const schemaImports = [schemaName, `type ${entityName}`]
      // Also import the enum if HRIDs are generated
      if (this.config.generateHrids) {
        schemaImports.push(`${entityName}HridEnum`)
      }
      imports.push({
        from: `../schemas/zod/${this.config.outputFilename}`,
        items: schemaImports
      })
    }
    
    return generateImportStatements(imports)
  }
  
  /**
   * Get Zod-specific imports
   */
  protected getZodImports(): ImportStatement[] {
    return []
  }
  
  /**
   * Get Typebox-specific imports
   */
  protected getTypeboxImports() {
    return []
  }
  
  /**
   * Generate imports for constants file
   */
  protected generateConstantsImports(): string {
    return generateCommentBlock([
      `${this.config.entityName} HRID constants and enums`,
      'Auto-generated from game data'
    ])
  }
  
  /**
   * Helper to get entities from game data
   */
  protected getEntitiesFromGameData(): Record<string, any> {
    if (!this.gameData) {
      throw new Error('Game data not loaded')
    }
    
    const entities = this.gameData[this.config.sourceKey]
    if (!entities) {
      throw new Error(`No entities found for key: ${this.config.sourceKey}`)
    }
    
    return entities as Record<string, any>
  }
  
  /**
   * Generate HRID utilities for type-safe pattern
   */
  protected generateHridUtilities(entityName: string, hridTypeName: string, dataConstantName: string): string {
    return `
/**
 * Check if a ${entityName.toLowerCase()} HRID is valid
 */
export function validate${entityName}Hrid(hrid: string): hrid is ${hridTypeName} {
  return hrid in ${dataConstantName}
}

/**
 * Check if a ${entityName.toLowerCase()} exists
 */
export function ${entityName.toLowerCase()}Exists(hrid: string): boolean {
  return hrid in ${dataConstantName}
}`
  }
}