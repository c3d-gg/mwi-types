/**
 * Main translation exports
 * Generated on 2025-07-26T21:25:23.354Z
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
