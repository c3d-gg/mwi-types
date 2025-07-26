/**
 * @c3d/mwi-types - TypeScript types for Milky Way Idle
 * 
 * This package provides comprehensive TypeScript types, Zod schemas,
 * and constants for all game entities in Milky Way Idle.
 */

// Game logic exports (includes data and utilities)
export * from './game-logic/index.js'

// Constants exports are available through game-logic
// No need to re-export them here as they would cause conflicts

// Schema exports as namespaces to avoid conflicts
export * as zod from './schemas/zod/index.js'
export * as typebox from './schemas/typebox/index.js'

// Localization exports
export { 
  en, 
  zh,
  type SupportedLocale
} from './localization/index.js'

// Player data exports
export * from './player-data/index.js'

// Re-export commonly used types at top level for convenience
export type {
  Skill,
  SkillHridType as SkillHrid,
  Item,
  Action,
  Recipe,
  Ability,
  HouseRoom
} from './game-logic/index.js'

export type {
  PlayerData,
  Character,
  CharacterItem,
  CharacterSkill,
  CharacterQuest,
  CharacterAction
} from './player-data/index.js'