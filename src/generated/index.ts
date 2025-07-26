/**
 * @c3d.gg/mwi-types - TypeScript types for Milky Way Idle
 *
 * This package provides comprehensive TypeScript types, Zod schemas,
 * and constants for all game entities in Milky Way Idle.
 */

// Game logic exports (includes data and utilities)
export * from './game-logic/index.js'

// Constants exports are available through game-logic
// No need to re-export them here as they would cause conflicts

// Schema exports as namespaces to avoid conflicts
export * as typebox from './schemas/typebox/index.js'
export * as zod from './schemas/zod/index.js'

// Localization exports
export { en, zh, type SupportedLocale } from './localization/index.js'

// Player data exports
export * from './player-data/index.js'

// Re-export commonly used types at top level for convenience
export type {
  Ability,
  Action,
  HouseRoom,
  Item,
  Recipe,
  Skill,
  SkillHridType as SkillHrid,
} from './game-logic/index.js'

export type {
  Character,
  CharacterAction,
  CharacterItem,
  CharacterQuest,
  CharacterSkill,
  PlayerData,
} from './player-data/index.js'
