/**
 * Base generator infrastructure exports
 * Provides utilities for all entity generators
 */

// Type exports
export type {
  GeneratorConfig,
  GeneratorResult,
  PropertyType,
  PropertyDefinition,
  SchemaOptions,
  ImportStatement,
  BaseEntity,
  HridGenerationOptions,
  FileWriteOptions
} from './types'

// Schema generator exports
export {
  generateZodSchema,
  generateTypeFromSchema,
  generateEnumSchema,
  generateImports,
  generateZodSchemaFile
} from './schema-generator'

// Typebox adapter exports
export {
  convertZodToTypebox,
  generateTypeboxAdapterFile
} from './typebox-adapter'

// HRID generator exports
export {
  extractHrids,
  generateHridEnum,
  generateHridConstants,
  generateHridUnionType,
  generateHridCode,
  generateHridValidator,
  generateHridGetters,
  hridToIdentifier,
  groupHridsByCategory,
  generateBrandedHridType
} from './hrid-generator'

// File writer exports
export {
  ensureDirectory,
  writeGeneratedFile,
  addGeneratedHeader,
  formatTypeScriptCode,
  generateImportStatements,
  generateExportStatements,
  writeGeneratedFiles,
  generateBarrelExport,
  createOutputPath,
  generateCommentBlock,
  wrapInNamespace,
  generateTypeGuard
} from './file-writer'

// Base generator class
export { BaseGenerator } from './base-generator'