import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Project root is two levels up from config
const projectRoot = join(__dirname, '../..')

/**
 * Central configuration for all file paths used in the project
 */
export const PATHS = {
  // Source data files
  sourceData: join(projectRoot, 'src/sources/game_data.json'),
  playerData: join(projectRoot, 'src/sources/player_data.json'),
  locales: join(projectRoot, 'src/sources/locales'),
  
  // Output directories
  output: join(projectRoot, 'src/generated'),
  gameLogic: join(projectRoot, 'src/generated/game-logic'),
  constants: join(projectRoot, 'src/generated/constants'),
  schemasZod: join(projectRoot, 'src/generated/schemas/zod'),
  schemasTypebox: join(projectRoot, 'src/generated/schemas/typebox'),
  localization: join(projectRoot, 'src/generated/localization'),
  
  // Specific locale files
  localeEn: join(projectRoot, 'src/sources/locales/en.json'),
  localeZh: join(projectRoot, 'src/sources/locales/zh.json'),
} as const

/**
 * Get the path for a specific locale file
 */
export function getLocalePath(locale: string): string {
  return join(PATHS.locales, `${locale}.json`)
}

/**
 * Get the output path for a specific entity type
 */
export function getOutputPath(category: 'game-logic' | 'constants' | 'schemas/zod' | 'schemas/typebox' | 'localization', filename: string): string {
  return join(PATHS.output, category, filename)
}