/**
 * Schema generation utilities for Zod and Typebox
 * Provides functions to generate schema code from property definitions
 */

import type {
  PropertyDefinition,
  SchemaOptions,
  ImportStatement
} from './types'

/**
 * Generate a Zod schema from property definitions
 */
export function generateZodSchema(
  properties: PropertyDefinition[],
  options: SchemaOptions
): string {
  const { schemaName, export: shouldExport = true, asConst = false } = options
  
  const schemaBody = generateZodSchemaBody(properties)
  const exportPrefix = shouldExport ? 'export ' : ''
  const constSuffix = asConst ? ' as const' : ''
  
  return `${exportPrefix}const ${schemaName} = ${schemaBody}${constSuffix}`
}

/**
 * Generate the body of a Zod schema from properties
 */
function generateZodSchemaBody(properties: PropertyDefinition[]): string {
  if (properties.length === 0) {
    return 'z.object({})'
  }
  
  const propertyStrings = properties.map(prop => {
    const propSchema = generateZodPropertySchema(prop)
    const nullableSuffix = prop.nullable ? '.nullable()' : ''
    const optionalSuffix = prop.optional ? '.optional()' : ''
    return `  ${prop.name}: ${propSchema}${nullableSuffix}${optionalSuffix}`
  })
  
  return `z.object({\n${propertyStrings.join(',\n')}\n})`
}

/**
 * Generate Zod schema for a single property
 */
function generateZodPropertySchema(prop: PropertyDefinition): string {
  switch (prop.type) {
    case 'string':
      let schema = 'z.string()'
      if (prop.constraints?.minLength) {
        schema += `.min(${prop.constraints.minLength})`
      }
      if (prop.constraints?.maxLength) {
        schema += `.max(${prop.constraints.maxLength})`
      }
      if (prop.constraints?.pattern) {
        schema += `.regex(/${prop.constraints.pattern}/)`
      }
      return schema
      
    case 'number':
      let numSchema = 'z.number()'
      if (prop.constraints?.min !== undefined) {
        numSchema += `.min(${prop.constraints.min})`
      }
      if (prop.constraints?.max !== undefined) {
        numSchema += `.max(${prop.constraints.max})`
      }
      return numSchema
      
    case 'boolean':
      return 'z.boolean()'
      
    case 'literal':
      return `z.literal(${JSON.stringify(prop.value)})`
      
    case 'enum':
      if (!prop.enumValues || prop.enumValues.length === 0) {
        throw new Error('Enum property must have enumValues')
      }
      const values = prop.enumValues.map(v => JSON.stringify(v)).join(', ')
      return `z.enum([${values}])`
      
    case 'array':
      if (!prop.items) {
        throw new Error('Array property must have items definition')
      }
      return `z.array(${generateZodPropertySchema(prop.items)})`
      
    case 'object':
      if (!prop.properties) {
        return 'z.object({})'
      }
      return generateZodSchemaBody(prop.properties)
      
    case 'union':
      if (!prop.unionTypes || prop.unionTypes.length === 0) {
        throw new Error('Union property must have unionTypes')
      }
      const unionSchemas = prop.unionTypes.map(t => generateZodPropertySchema(t)).join(', ')
      return `z.union([${unionSchemas}])`
      
    case 'ref':
      if (!prop.refName) {
        throw new Error('Ref property must have refName')
      }
      return prop.refName
      
    case 'record':
      if (!prop.keyType || !prop.valueType) {
        throw new Error('Record property must have keyType and valueType')
      }
      const keySchema = generateZodPropertySchema(prop.keyType)
      const valueSchema = generateZodPropertySchema(prop.valueType)
      return `z.record(${keySchema}, ${valueSchema})`
      
    default:
      throw new Error(`Unknown property type: ${prop.type}`)
  }
}


/**
 * Generate TypeScript type from schema name
 */
export function generateTypeFromSchema(
  schemaName: string,
  schemaType: 'zod' | 'typebox'
): string {
  const inferType = schemaType === 'zod' ? 'z.infer' : 'Static'
  return `export type ${schemaName.replace(/Schema$/, '')} = ${inferType}<typeof ${schemaName}>`
}

/**
 * Generate enum schema for Zod
 */
export function generateEnumSchema(
  enumName: string,
  values: string[]
): string {
  const enumValues = values.map(v => `'${v}'`).join(', ')
  return `export const ${enumName} = z.enum([${enumValues}])`
}

/**
 * Generate import statements
 */
export function generateImports(imports: ImportStatement[]): string {
  return imports.map(imp => {
    const typePrefix = imp.typeOnly ? 'type ' : ''
    const items = imp.items.join(', ')
    return `import ${typePrefix}{ ${items} } from '${imp.from}'`
  }).join('\n')
}

/**
 * Generate a complete Zod schema file with imports and exports
 */
export function generateZodSchemaFile(
  properties: PropertyDefinition[],
  options: SchemaOptions & {
    additionalExports?: string[]
  }
): string {
  const { imports = [], additionalExports = [] } = options
  
  // Add default imports
  const defaultImports: ImportStatement[] = [{ items: ['z'], from: 'zod' }]
  const allImports = [...defaultImports, ...imports]
  
  // Generate schema
  const schema = generateZodSchema(properties, options)
  
  // Generate type from schema
  const typeExport = generateTypeFromSchema(options.schemaName, 'zod')
  
  // Combine all parts - HRID enums must come before schema that uses them
  const parts = [
    generateImports(allImports),
    '',
    ...additionalExports.map(exp => exp),
    additionalExports.length > 0 ? '' : '',
    schema,
    '',
    typeExport
  ].filter(Boolean)
  
  return parts.join('\n')
}