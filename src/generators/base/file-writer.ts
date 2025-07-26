/**
 * File writing utilities for code generation
 * Provides functions to write generated files with proper headers and formatting
 */

import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import type { FileWriteOptions } from './types'

/**
 * Ensure a directory exists, creating it if necessary
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true })
}

/**
 * Write a generated file with proper header and formatting
 */
export async function writeGeneratedFile(
  filePath: string,
  content: string,
  options: FileWriteOptions = {}
): Promise<void> {
  const {
    addHeader = true,
    headerMessage,
    format = true,
    encoding = 'utf-8'
  } = options
  
  // Ensure directory exists
  await ensureDirectory(dirname(filePath))
  
  // Add header if requested
  let finalContent = content
  if (addHeader) {
    finalContent = addGeneratedHeader(content, headerMessage)
  }
  
  // Format if requested
  if (format) {
    finalContent = formatTypeScriptCode(finalContent)
  }
  
  // Write file
  await writeFile(filePath, finalContent, encoding)
}

/**
 * Add a generated file header with timestamp and warning
 */
export function addGeneratedHeader(
  content: string,
  customMessage?: string
): string {
  const defaultMessage = 'Auto-generated file - DO NOT EDIT'
  const message = customMessage || defaultMessage
  const timestamp = new Date().toISOString()
  
  const header = `/**
 * ${message}
 * Generated on ${timestamp}
 */`
  
  return `${header}\n\n${content}`
}

/**
 * Basic TypeScript code formatting
 * Note: In a real implementation, you might use prettier or similar
 */
export function formatTypeScriptCode(code: string): string {
  // Basic formatting rules - preserve newlines
  return code
    // Fix multiple consecutive empty lines first
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Ensure consistent spacing around braces (but preserve newlines)
    .replace(/([^\n\s])\s*{\s*([^\n])/g, '$1 { $2')
    .replace(/([^\n\s])\s*}\s*([^\n])/g, '$1 } $2')
    // Ensure consistent spacing around colons (but preserve newlines)
    .replace(/([^\n\s])\s*:\s*([^\n])/g, '$1: $2')
    // Ensure consistent spacing around equals (but preserve newlines)
    .replace(/([^\n\s])\s*=\s*([^\n])/g, '$1 = $2')
    // Fix arrow functions
    .replace(/=\s*>/g, '=>')
    // Ensure file ends with newline
    .replace(/\s*$/, '\n')
}

/**
 * Generate import statements for a file
 */
export function generateImportStatements(
  imports: Array<{
    from: string
    items: string[]
    typeOnly?: boolean
  }>
): string {
  return imports
    .map(({ from, items, typeOnly }) => {
      const typePrefix = typeOnly ? 'type ' : ''
      const sortedItems = [...items].sort()
      return `import ${typePrefix}{ ${sortedItems.join(', ')} } from '${from}'`
    })
    .join('\n')
}

/**
 * Generate export statements for a file
 */
export function generateExportStatements(
  exports: Array<{
    items: string[]
    typeOnly?: boolean
  }>
): string {
  return exports
    .map(({ items, typeOnly }) => {
      const typePrefix = typeOnly ? 'type ' : ''
      const sortedItems = [...items].sort()
      return `export ${typePrefix}{ ${sortedItems.join(', ')} }`
    })
    .join('\n')
}

/**
 * Write multiple files in parallel
 */
export async function writeGeneratedFiles(
  files: Array<{
    path: string
    content: string
    options?: FileWriteOptions
  }>
): Promise<void> {
  await Promise.all(
    files.map(({ path, content, options }) =>
      writeGeneratedFile(path, content, options)
    )
  )
}

/**
 * Generate a barrel export file (index.ts)
 */
export function generateBarrelExport(
  modules: Array<{
    path: string
    exports: string[]
    typeExports?: string[]
  }>
): string {
  const exports = modules
    .map(({ path, exports: moduleExports, typeExports = [] }) => {
      const exportStatements: string[] = []
      
      if (moduleExports.length > 0) {
        exportStatements.push(
          `export { ${moduleExports.join(', ')} } from '${path}'`
        )
      }
      
      if (typeExports.length > 0) {
        exportStatements.push(
          `export type { ${typeExports.join(', ')} } from '${path}'`
        )
      }
      
      return exportStatements.join('\n')
    })
    .filter(Boolean)
    .join('\n')
  
  return exports
}

/**
 * Create a file path for generated output
 */
export function createOutputPath(
  baseDir: string,
  category: string,
  filename: string
): string {
  // Ensure filename has .ts extension
  const finalFilename = filename.endsWith('.ts') ? filename : `${filename}.ts`
  return join(baseDir, category, finalFilename)
}

/**
 * Generate a comment block
 */
export function generateCommentBlock(
  lines: string[],
  style: 'jsdoc' | 'line' = 'jsdoc'
): string {
  if (style === 'line') {
    return lines.map(line => `// ${line}`).join('\n')
  }
  
  // JSDoc style
  if (lines.length === 1) {
    return `/** ${lines[0]} */`
  }
  
  return [
    '/**',
    ...lines.map(line => ` * ${line}`),
    ' */'
  ].join('\n')
}

/**
 * Wrap content in a namespace
 */
export function wrapInNamespace(
  namespaceName: string,
  content: string
): string {
  const indentedContent = content
    .split('\n')
    .map(line => line ? `  ${line}` : '')
    .join('\n')
  
  return `export namespace ${namespaceName} {\n${indentedContent}\n}`
}

/**
 * Generate a type guard function
 */
export function generateTypeGuard(
  functionName: string,
  paramName: string,
  typeName: string,
  condition: string
): string {
  return `export function ${functionName}(${paramName}: unknown): ${paramName} is ${typeName} {
  return ${condition}
}`
}