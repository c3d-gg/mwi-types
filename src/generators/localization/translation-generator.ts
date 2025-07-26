import { readFile, mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { GameData } from '../../types/source-data'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Base translation interface
 */
export interface TranslationData {
  hrid: string
  name: string
  description?: string
}

/**
 * Generates typed TypeScript translation files for all entities
 */
export class TranslationGenerator {
  private gameData: GameData | null = null
  private localeData: Record<string, any> = {}
  
  async generate() {
    console.log('\n🌍 Generating TypeScript translation files...')
    
    // Load source data
    await this.loadSourceData()
    
    // Generate translations for each locale
    const locales = ['en', 'zh']
    for (const locale of locales) {
      await this.generateLocaleTranslations(locale)
    }
    
    // Generate main translation index
    await this.generateTranslationIndex()
    
    console.log('✅ Translation generation complete!')
  }
  
  private async loadSourceData() {
    // Load game data
    const gameDataPath = join(__dirname, '../../sources/game_data.json')
    const gameDataContent = await readFile(gameDataPath, 'utf-8')
    this.gameData = JSON.parse(gameDataContent) as GameData
    
    // Load locale files
    const localesDir = join(__dirname, '../../sources/locales')
    const enPath = join(localesDir, 'en.json')
    const zhPath = join(localesDir, 'zh.json')
    
    this.localeData.en = JSON.parse(await readFile(enPath, 'utf-8'))
    this.localeData.zh = JSON.parse(await readFile(zhPath, 'utf-8'))
  }
  
  private async generateLocaleTranslations(locale: string) {
    console.log(`\n📝 Generating ${locale.toUpperCase()} translations...`)
    
    const outputDir = join(__dirname, `../../generated/localization/${locale}`)
    await mkdir(outputDir, { recursive: true })
    
    // Generate skill translations
    await this.generateSkillTranslations(locale, outputDir)
    
    // Generate item translations
    await this.generateItemTranslations(locale, outputDir)
    
    // Generate action translations
    await this.generateActionTranslations(locale, outputDir)
    
    // Generate ability translations
    await this.generateAbilityTranslations(locale, outputDir)
    
    // Generate house room translations
    await this.generateHouseRoomTranslations(locale, outputDir)
    
    // Generate locale index
    await this.generateLocaleIndex(locale, outputDir)
  }
  
  private async generateSkillTranslations(locale: string, outputDir: string) {
    if (!this.gameData) throw new Error('Game data not loaded')
    
    const skills = Object.values(this.gameData.skillDetailMap)
    const localeMessages = this.localeData[locale]
    
    let content = `/**
 * Skill translations for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

import type { SkillHrid } from '../../game-logic/skills'

export const skillTranslations: Record<SkillHrid, { name: string; description?: string }> = {
`
    
    for (const skill of skills) {
      const name = locale === 'en' 
        ? skill.name 
        : (localeMessages.skillNames?.[skill.hrid] || skill.name)
      
      const description = locale === 'en'
        ? localeMessages.skillDescriptions?.[skill.hrid]
        : localeMessages.skillDescriptions?.[skill.hrid]
      
      content += `  '${skill.hrid}': {\n`
      content += `    name: '${name.replace(/'/g, "\\'")}',\n`
      if (description) {
        content += `    description: '${description.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',\n`
      }
      content += `  },\n`
    }
    
    content += `} as const\n`
    
    await writeFile(join(outputDir, 'skills.ts'), content, 'utf-8')
  }
  
  private async generateItemTranslations(locale: string, outputDir: string) {
    if (!this.gameData) throw new Error('Game data not loaded')
    
    const items = Object.values(this.gameData.itemDetailMap)
    const localeMessages = this.localeData[locale]
    
    let content = `/**
 * Item translations for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

import type { ItemHrid } from '../../game-logic/items'

export const itemTranslations: Record<ItemHrid, { name: string; description?: string }> = {
`
    
    for (const item of items) {
      const name = locale === 'en' 
        ? item.name 
        : (localeMessages.itemNames?.[item.hrid] || item.name)
      
      const description = locale === 'en'
        ? localeMessages.itemDescriptions?.[item.hrid]
        : localeMessages.itemDescriptions?.[item.hrid]
      
      content += `  '${item.hrid}': {\n`
      content += `    name: '${name.replace(/'/g, "\\'")}',\n`
      if (description) {
        content += `    description: '${description.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',\n`
      }
      content += `  },\n`
    }
    
    content += `} as const\n`
    
    await writeFile(join(outputDir, 'items.ts'), content, 'utf-8')
  }
  
  private async generateActionTranslations(locale: string, outputDir: string) {
    if (!this.gameData) throw new Error('Game data not loaded')
    
    const actions = Object.values(this.gameData.actionDetailMap)
    const localeMessages = this.localeData[locale]
    
    let content = `/**
 * Action translations for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

import type { ActionHrid } from '../../game-logic/actions'

export const actionTranslations: Record<ActionHrid, { name: string; description?: string }> = {
`
    
    for (const action of actions) {
      const name = locale === 'en' 
        ? action.name 
        : (localeMessages.actionNames?.[action.hrid] || action.name)
      
      const description = locale === 'en'
        ? localeMessages.actionDescriptions?.[action.hrid]
        : localeMessages.actionDescriptions?.[action.hrid]
      
      content += `  '${action.hrid}': {\n`
      content += `    name: '${name.replace(/'/g, "\\'")}',\n`
      if (description) {
        content += `    description: '${description.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',\n`
      }
      content += `  },\n`
    }
    
    content += `} as const\n`
    
    await writeFile(join(outputDir, 'actions.ts'), content, 'utf-8')
  }
  
  private async generateAbilityTranslations(locale: string, outputDir: string) {
    if (!this.gameData) throw new Error('Game data not loaded')
    
    const abilities = Object.values(this.gameData.abilityDetailMap)
    const localeMessages = this.localeData[locale]
    
    let content = `/**
 * Ability translations for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

import type { AbilityHrid } from '../../game-logic/abilities'

export const abilityTranslations: Record<AbilityHrid, { name: string; description?: string }> = {
`
    
    for (const ability of abilities) {
      const name = locale === 'en' 
        ? ability.name 
        : (localeMessages.abilityNames?.[ability.hrid] || ability.name)
      
      const description = locale === 'en'
        ? (ability.description || localeMessages.abilityDescriptions?.[ability.hrid])
        : (localeMessages.abilityDescriptions?.[ability.hrid] || ability.description)
      
      content += `  '${ability.hrid}': {\n`
      content += `    name: '${name.replace(/'/g, "\\'")}',\n`
      if (description) {
        content += `    description: '${description.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',\n`
      }
      content += `  },\n`
    }
    
    content += `} as const\n`
    
    await writeFile(join(outputDir, 'abilities.ts'), content, 'utf-8')
  }
  
  private async generateHouseRoomTranslations(locale: string, outputDir: string) {
    if (!this.gameData) throw new Error('Game data not loaded')
    
    const houseRooms = Object.values(this.gameData.houseRoomDetailMap)
    const localeMessages = this.localeData[locale]
    
    let content = `/**
 * House room translations for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

import type { HouseRoomHrid } from '../../game-logic/house-rooms'

export const houseRoomTranslations: Record<HouseRoomHrid, { name: string; description?: string }> = {
`
    
    for (const room of houseRooms) {
      const name = locale === 'en' 
        ? room.name 
        : (localeMessages.houseRoomNames?.[room.hrid] || room.name)
      
      const description = locale === 'en'
        ? localeMessages.houseRoomDescriptions?.[room.hrid]
        : localeMessages.houseRoomDescriptions?.[room.hrid]
      
      content += `  '${room.hrid}': {\n`
      content += `    name: '${name.replace(/'/g, "\\'")}',\n`
      if (description) {
        content += `    description: '${description.replace(/'/g, "\\'").replace(/\n/g, "\\n")}',\n`
      }
      content += `  },\n`
    }
    
    content += `} as const\n`
    
    await writeFile(join(outputDir, 'house-rooms.ts'), content, 'utf-8')
  }
  
  private async generateLocaleIndex(locale: string, outputDir: string) {
    const content = `/**
 * Translation exports for ${locale.toUpperCase()} locale
 * Generated on ${new Date().toISOString()}
 */

export { skillTranslations } from './skills'
export { itemTranslations } from './items'
export { actionTranslations } from './actions'
export { abilityTranslations } from './abilities'
export { houseRoomTranslations } from './house-rooms'
`
    
    await writeFile(join(outputDir, 'index.ts'), content, 'utf-8')
  }
  
  private async generateTranslationIndex() {
    const outputDir = join(__dirname, '../../generated/localization')
    
    const content = `/**
 * Main translation exports
 * Generated on ${new Date().toISOString()}
 */

// Locale exports
export * as en from './en/index.js'
export * as zh from './zh/index.js'

// Translation utilities
import type { SkillHrid } from '../game-logic/skills.js'
import type { ItemHrid } from '../game-logic/items.js'
import type { ActionHrid } from '../game-logic/actions.js'
import type { AbilityHrid } from '../game-logic/abilities.js'
import type { HouseRoomHrid } from '../game-logic/house-rooms.js'

import * as en from './en/index.js'
import * as zh from './zh/index.js'

export type SupportedLocale = 'en' | 'zh'

/**
 * Get translated skill name
 */
export function getSkillName(hrid: SkillHrid, locale: SupportedLocale = 'en'): string {
  if (locale === 'zh') {
    return zh.skillTranslations[hrid]?.name || en.skillTranslations[hrid].name
  }
  return en.skillTranslations[hrid].name
}

/**
 * Get translated skill description
 */
export function getSkillDescription(hrid: SkillHrid, locale: SupportedLocale = 'en'): string | undefined {
  if (locale === 'zh') {
    return zh.skillTranslations[hrid]?.description || en.skillTranslations[hrid].description
  }
  return en.skillTranslations[hrid].description
}

/**
 * Get translated item name
 */
export function getItemName(hrid: ItemHrid, locale: SupportedLocale = 'en'): string {
  if (locale === 'zh') {
    return zh.itemTranslations[hrid]?.name || en.itemTranslations[hrid].name
  }
  return en.itemTranslations[hrid].name
}

/**
 * Get translated item description
 */
export function getItemDescription(hrid: ItemHrid, locale: SupportedLocale = 'en'): string | undefined {
  if (locale === 'zh') {
    return zh.itemTranslations[hrid]?.description || en.itemTranslations[hrid].description
  }
  return en.itemTranslations[hrid].description
}

/**
 * Get translated action name
 */
export function getActionName(hrid: ActionHrid, locale: SupportedLocale = 'en'): string {
  if (locale === 'zh') {
    return zh.actionTranslations[hrid]?.name || en.actionTranslations[hrid].name
  }
  return en.actionTranslations[hrid].name
}

/**
 * Get translated action description
 */
export function getActionDescription(hrid: ActionHrid, locale: SupportedLocale = 'en'): string | undefined {
  if (locale === 'zh') {
    return zh.actionTranslations[hrid]?.description || en.actionTranslations[hrid].description
  }
  return en.actionTranslations[hrid].description
}

/**
 * Get translated ability name
 */
export function getAbilityName(hrid: AbilityHrid, locale: SupportedLocale = 'en'): string {
  if (locale === 'zh') {
    return zh.abilityTranslations[hrid]?.name || en.abilityTranslations[hrid].name
  }
  return en.abilityTranslations[hrid].name
}

/**
 * Get translated ability description
 */
export function getAbilityDescription(hrid: AbilityHrid, locale: SupportedLocale = 'en'): string | undefined {
  if (locale === 'zh') {
    return zh.abilityTranslations[hrid]?.description || en.abilityTranslations[hrid].description
  }
  return en.abilityTranslations[hrid].description
}

/**
 * Get translated house room name
 */
export function getHouseRoomName(hrid: HouseRoomHrid, locale: SupportedLocale = 'en'): string {
  if (locale === 'zh') {
    return zh.houseRoomTranslations[hrid]?.name || en.houseRoomTranslations[hrid].name
  }
  return en.houseRoomTranslations[hrid].name
}

/**
 * Get translated house room description
 */
export function getHouseRoomDescription(hrid: HouseRoomHrid, locale: SupportedLocale = 'en'): string | undefined {
  if (locale === 'zh') {
    return zh.houseRoomTranslations[hrid]?.description || en.houseRoomTranslations[hrid].description
  }
  return en.houseRoomTranslations[hrid].description
}
`
    
    await writeFile(join(outputDir, 'index.ts'), content, 'utf-8')
  }
}