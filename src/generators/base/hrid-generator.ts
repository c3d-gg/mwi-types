/**
 * HRID (Human Readable ID) generation utilities
 * Provides functions to extract and generate HRID constants, enums, and types
 */

import type { BaseEntity, HridGenerationOptions } from './types'

/**
 * Extract HRIDs from an entity collection
 */
export function extractHrids<T extends BaseEntity>(
  entities: Record<string, T> | T[]
): string[] {
  const hrids = Array.isArray(entities)
    ? entities.map(e => e.hrid)
    : Object.values(entities).map(e => e.hrid)
  
  // Sort for consistent output
  return hrids.sort()
}

/**
 * Generate TypeScript enum from HRIDs
 */
export function generateHridEnum(
  hrids: string[],
  enumName: string,
  options: Partial<HridGenerationOptions> = {}
): string {
  const { stripPrefix = '' } = options
  
  // Track used keys to detect duplicates
  const usedKeys = new Map<string, string>()
  
  const enumEntries = hrids.map(hrid => {
    // Convert HRID to enum key (e.g., "/skills/attack" -> "ATTACK")
    let key = hrid
    
    // Strip prefix if provided
    if (stripPrefix && hrid.startsWith(stripPrefix)) {
      key = hrid.substring(stripPrefix.length)
    }
    
    // Remove leading slash and split into segments
    const segments = key.replace(/^\//, '').split('/')
    let baseKey = segments.pop()! // Get last segment
    
    // Convert to UPPER_SNAKE_CASE
    baseKey = baseKey
      .replace(/-/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .toUpperCase()
    
    // Check for duplicates
    if (usedKeys.has(baseKey)) {
      // If duplicate, include parent segment
      if (segments.length > 0) {
        const parentSegment = segments[segments.length - 1]
        if (parentSegment) {
          const cleanParent = parentSegment
            .replace(/-/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '_')
            .toUpperCase()
          baseKey = `${cleanParent}_${baseKey}`
        }
      }
    }
    
    usedKeys.set(baseKey, hrid)
    return `  ${baseKey} = '${hrid}'`
  })
  
  return `export enum ${enumName} {\n${enumEntries.join(',\n')}\n}`
}

/**
 * Generate const object with HRIDs
 */
export function generateHridConstants(
  hrids: string[],
  constName: string,
  options: Partial<HridGenerationOptions> = {}
): string {
  const { stripPrefix = '' } = options
  
  // Track used keys to detect duplicates
  const usedKeys = new Map<string, string>()
  
  const constEntries = hrids.map(hrid => {
    // Convert HRID to const key (e.g., "/skills/attack" -> "ATTACK")
    let key = hrid
    
    // Strip prefix if provided
    if (stripPrefix && hrid.startsWith(stripPrefix)) {
      key = hrid.substring(stripPrefix.length)
    }
    
    // Remove leading slash and split into segments
    const segments = key.replace(/^\//, '').split('/')
    let baseKey = segments.pop()! // Get last segment
    
    // Convert to UPPER_SNAKE_CASE
    baseKey = baseKey
      .replace(/-/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .toUpperCase()
    
    // Check for duplicates
    if (usedKeys.has(baseKey)) {
      // If duplicate, include parent segment
      if (segments.length > 0) {
        const parentSegment = segments[segments.length - 1]
        if (parentSegment) {
          const cleanParent = parentSegment
            .replace(/-/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '_')
            .toUpperCase()
          baseKey = `${cleanParent}_${baseKey}`
        }
      }
    }
    
    usedKeys.set(baseKey, hrid)
    return `  ${baseKey}: '${hrid}'`
  })
  
  return `export const ${constName} = {\n${constEntries.join(',\n')}\n} as const`
}

/**
 * Generate union type from HRIDs
 */
export function generateHridUnionType(
  hrids: string[],
  typeName: string
): string {
  const typeUnion = hrids.map(h => `'${h}'`).join(' | ')
  return `export type ${typeName} = ${typeUnion}`
}

/**
 * Generate all HRID-related code (enum, const, type)
 */
export function generateHridCode(
  hrids: string[],
  baseName: string,
  options: HridGenerationOptions = {}
): string {
  const {
    enumName = `${baseName}Enum`,
    constName = `${baseName.toUpperCase()}_HRIDS`,
    unionTypeName = `${baseName}Type`,
    generateEnum = true,
    generateConst = true,
    generateUnion = true,
    stripPrefix = ''
  } = options
  
  const parts: string[] = []
  
  if (generateEnum) {
    parts.push(generateHridEnum(hrids, enumName, { stripPrefix }))
  }
  
  if (generateConst) {
    parts.push(generateHridConstants(hrids, constName, { stripPrefix }))
  }
  
  if (generateUnion) {
    parts.push(generateHridUnionType(hrids, unionTypeName))
  }
  
  return parts.join('\n\n')
}

/**
 * Generate HRID validation function
 */
export function generateHridValidator(
  hrids: string[],
  functionName: string,
  hridTypeName: string
): string {
  const hridSet = `new Set([${hrids.map(h => `'${h}'`).join(', ')}])`
  
  return `
const ${functionName}Set = ${hridSet}

export function ${functionName}(hrid: string): hrid is ${hridTypeName} {
  return ${functionName}Set.has(hrid)
}`
}

/**
 * Generate HRID getter functions
 */
export function generateHridGetters(
  entityName: string,
  hridTypeName: string,
  constantName?: string
): string {
  const functionNames = {
    validate: `validate${entityName}Hrid`,
    exists: `${entityName.toLowerCase()}Exists`
  }
  
  // Use provided constant name or default to entity name pattern
  const dataConstantName = constantName || `${entityName.toUpperCase()}S`
  
  return `
/**
 * Check if a ${entityName.toLowerCase()} HRID is valid
 */
export function ${functionNames.validate}(hrid: string): hrid is ${hridTypeName} {
  return hrid in ${dataConstantName}
}

/**
 * Check if a ${entityName.toLowerCase()} exists
 */
export function ${functionNames.exists}(hrid: string): boolean {
  return hrid in ${dataConstantName}
}`
}

/**
 * Convert HRID to a valid JavaScript identifier
 */
export function hridToIdentifier(hrid: string, stripPrefix = ''): string {
  let identifier = hrid
  
  // Strip prefix if provided
  if (stripPrefix && hrid.startsWith(stripPrefix)) {
    identifier = hrid.substring(stripPrefix.length)
  }
  
  // Remove leading slash and convert to camelCase
  return identifier
    .replace(/^\//, '')
    .split(/[-_/]/)
    .map((part, index) => {
      if (index === 0) {
        return part.toLowerCase()
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join('')
}

/**
 * Group HRIDs by their category (first segment after slash)
 */
export function groupHridsByCategory(hrids: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {}
  
  for (const hrid of hrids) {
    // Extract category from HRID (e.g., "/skills/attack" -> "skills")
    const match = hrid.match(/^\/([^/]+)\//)
    if (match && match[1]) {
      const category = match[1]
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(hrid)
    }
  }
  
  // Sort each group
  for (const category in groups) {
    if (groups[category]) {
      groups[category].sort()
    }
  }
  
  return groups
}

/**
 * Generate branded HRID type for extra type safety
 */
export function generateBrandedHridType(
  typeName: string,
  brand: string
): string {
  return `
export type ${typeName} = string & { readonly __brand: '${brand}' }

export function ${typeName}Brand(hrid: string): ${typeName} {
  return hrid as ${typeName}
}`
}