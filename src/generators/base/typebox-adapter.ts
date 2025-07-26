/**
 * Typebox adapter utilities
 * Converts Zod schemas to Typebox schemas using @sinclair/typemap
 */

import { TypeBoxFromZod } from '@sinclair/typemap'
import type { ZodSchema } from 'zod'
import type { TSchema } from '@sinclair/typebox'

/**
 * Convert a Zod schema to Typebox schema
 */
export function convertZodToTypebox(zodSchema: ZodSchema): TSchema {
  return TypeBoxFromZod(zodSchema) as unknown as TSchema
}

/**
 * Convert a Zod schema file to Typebox
 * This reads the exported schema from a file and converts it
 */
export async function convertZodFileToTypebox(
  zodSchemaPath: string,
  schemaName: string
): Promise<{ schema: TSchema; code: string }> {
  // Import the Zod schema module
  const zodModule = await import(zodSchemaPath)
  const zodSchema = zodModule[schemaName]
  
  if (!zodSchema) {
    throw new Error(`Schema ${schemaName} not found in ${zodSchemaPath}`)
  }
  
  // Convert to Typebox
  const typeboxSchema = convertZodToTypebox(zodSchema)
  
  // Generate the code
  const code = generateTypeboxCode(schemaName, typeboxSchema)
  
  return { schema: typeboxSchema, code }
}

/**
 * Generate Typebox schema code as a string
 */
function generateTypeboxCode(schemaName: string, schema: TSchema): string {
  // We'll generate the code that recreates the schema
  // For now, we'll use the converted schema directly
  return `import { type Static, TypeBoxFromZod } from '@sinclair/typemap'
import { ${schemaName} as Zod${schemaName} } from '../zod/${schemaName.replace(/Schema$/, '').toLowerCase()}'

export const ${schemaName} = TypeBoxFromZod(Zod${schemaName})
export type ${schemaName.replace(/Schema$/, '')} = Static<typeof ${schemaName}>`
}

/**
 * Convert all Zod schemas in a directory to Typebox
 */
export async function convertAllZodSchemas(
  zodDir: string,
  typeboxDir: string,
  schemaFiles: Array<{ filename: string; schemaName: string }>
): Promise<void> {
  const { writeGeneratedFile, ensureDirectory } = await import('./file-writer')
  const { join } = await import('path')
  
  // Ensure output directory exists
  await ensureDirectory(typeboxDir)
  
  // Convert each schema
  for (const { filename, schemaName } of schemaFiles) {
    const zodPath = join(zodDir, filename)
    const typeboxPath = join(typeboxDir, filename)
    
    try {
      const { code } = await convertZodFileToTypebox(zodPath, schemaName)
      await writeGeneratedFile(typeboxPath, code)
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error)
    }
  }
}

/**
 * Generate a Typebox schema that imports and converts from Zod
 */
export function generateTypeboxAdapterFile(
  entityName: string,
  zodImportPath = '../zod',
  filename?: string
): string {
  const schemaName = `${entityName}Schema`
  
  // Use provided filename or generate from entity name
  const importFilename = filename || entityName.toLowerCase().replace(/type$/, '-type').replace(/types$/, '-types')
  
  return `import { type Static, TypeBoxFromZod } from '@sinclair/typemap'
import { ${schemaName} as Zod${schemaName} } from '${zodImportPath}/${importFilename}'

// Convert Zod schema to Typebox
export const ${schemaName} = TypeBoxFromZod(Zod${schemaName})

// Type is already exported from Zod schema, no need to re-export`
}