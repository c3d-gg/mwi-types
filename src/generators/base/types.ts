/**
 * Base types for the generator infrastructure
 * These types are used across all entity generators
 */

import type { GameData } from '../../types/source-data'

/**
 * Configuration for a generator
 */
export interface GeneratorConfig {
  /** Name of the entity being generated (e.g., "skill", "item") */
  entityName: string
  /** Plural form of entity name for collections */
  entityNamePlural: string
  /** Key in GameData that contains the entity map */
  sourceKey: keyof GameData
  /** Output filename (without extension) */
  outputFilename: string
  /** Whether to generate HRID constants/enums */
  generateHrids: boolean
  /** Whether to generate Zod schemas */
  generateZodSchema: boolean
  /** Whether to generate Typebox schemas */
  generateTypeboxSchema: boolean
}

/**
 * Result returned by generators
 */
export interface GeneratorResult {
  /** Number of entities processed */
  count: number
  /** Entity type name for logging */
  entityType: string
  /** Any additional metadata */
  metadata?: Record<string, any>
}

/**
 * Property types supported by schema generators
 */
export type PropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'union'
  | 'literal'
  | 'enum'
  | 'ref'
  | 'record'

/**
 * Definition of a property for schema generation
 */
export interface PropertyDefinition {
  /** Property name */
  name: string
  /** Property type */
  type: PropertyType
  /** Whether the property is optional */
  optional?: boolean
  /** Whether the property can be null */
  nullable?: boolean
  /** Description for JSDoc comments */
  description?: string
  /** For literal types */
  value?: any
  /** For enum types */
  enumValues?: string[] | number[]
  /** For array types */
  items?: PropertyDefinition
  /** For object types */
  properties?: PropertyDefinition[]
  /** For union types */
  unionTypes?: PropertyDefinition[]
  /** For ref types (reference to another schema) */
  refName?: string
  /** For record types - the key type */
  keyType?: PropertyDefinition
  /** For record types - the value type */
  valueType?: PropertyDefinition
  /** Additional validation constraints */
  constraints?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

/**
 * Schema generation options
 */
export interface SchemaOptions {
  /** Schema name */
  schemaName: string
  /** Whether to export the schema */
  export?: boolean
  /** Whether to generate a const assertion */
  asConst?: boolean
  /** Additional imports needed */
  imports?: ImportStatement[]
}

/**
 * Import statement definition
 */
export interface ImportStatement {
  /** Items to import */
  items: string[]
  /** Module to import from */
  from: string
  /** Whether this is a type-only import */
  typeOnly?: boolean
}

/**
 * Base entity interface that all game entities extend
 */
export interface BaseEntity {
  /** Human readable ID */
  hrid: string
  /** Display name */
  name: string
  /** Sort order index */
  sortIndex?: number
}

/**
 * Options for HRID generation
 */
export interface HridGenerationOptions {
  /** Name for the enum (e.g., "SkillHrid") */
  enumName?: string
  /** Name for the const object (e.g., "SKILL_HRIDS") */
  constName?: string
  /** Name for the union type (e.g., "SkillHridType") */
  unionTypeName?: string
  /** Whether to generate enum */
  generateEnum?: boolean
  /** Whether to generate const object */
  generateConst?: boolean
  /** Whether to generate union type */
  generateUnion?: boolean
  /** Prefix to remove from HRIDs when creating enum keys */
  stripPrefix?: string
}

/**
 * File writing options
 */
export interface FileWriteOptions {
  /** Whether to add generated header */
  addHeader?: boolean
  /** Custom header message */
  headerMessage?: string
  /** Whether to format the code */
  format?: boolean
  /** File encoding */
  encoding?: BufferEncoding
}

