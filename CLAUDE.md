# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@c3d.gg/mwi-types` is a TypeScript type generation library for the Milky Way Idle game. It reads game data from JSON files and generates comprehensive TypeScript types with Map-based collections, utility functions, HRID constants, and typed translations using ts-morph for code generation.

## Commands

### Development

- **Generate all types**: `bun run generate`
- **Type check**: `bun run typecheck`
- **Clean generated files**: `bun run clean`
- **Watch mode**: `bun run generate:watch`

### NPM Scripts

```json
{
	"generate": "bun run src/generation/index.ts",
	"generate:watch": "bun run --watch src/generation/index.ts", 
	"typecheck": "bun tsc --noEmit",
	"clean": "rm -rf src/generated",
	"build": "bun run generate && bun run typecheck"
}
```

## Architecture

### Directory Structure

```
src/
├── sources/              # Source game data files
│   ├── game_data.json   # Main game definitions
│   ├── player_data.json # Player state structure
│   └── locales/         # Translation files
│       ├── en.json
│       └── zh.json
├── generation/          # Generator implementations (ts-morph based)
│   ├── index.ts        # Main orchestrator
│   ├── base/           # Core generator infrastructure
│   │   └── BaseGenerator.ts  # Abstract base with ts-morph setup
│   ├── generators/     # Entity type generators
│   │   ├── skills.generator.ts
│   │   ├── items.generator.ts
│   │   └── ... (30+ generators)
│   └── localization.generator.ts
├── generated/          # Output directory (git-ignored)
│   ├── types/          # Generated TypeScript types
│   │   ├── skills.ts   # Map collections + utilities
│   │   ├── items.ts
│   │   └── ... (all entity types)
│   ├── localization/   # Typed translations
│   ├── utils/          # Shared utility functions
│   └── index.ts        # Main barrel export
└── types/              # Base type definitions
    └── game-data.types.ts  # Source data interfaces
```

### Core Flow

1. **Source data** (`src/sources/`) contains game_data.json with 30+ entity types
2. **Base infrastructure** (`src/generation/base/`) provides BaseGenerator with ts-morph setup
3. **Entity generators** extend BaseGenerator to create TypeScript files programmatically
4. **Main generator** (`src/generation/index.ts`) orchestrates all generators in dependency order

### Code Generation Strategy (v1)

**Key Changes from v0**:
- Uses **ts-morph** for programmatic TypeScript generation
- Generates **Map collections** instead of arrays for O(1) lookups
- Includes **comprehensive utility functions** for each type
- Creates **const arrays** for HRID constants with proper type inference
- No longer generates Zod/Typebox schemas (simplified approach)

### Key Implementation Details

- **Dependency Order**: Skills MUST be generated first (other entities depend on skill types)
- **Map Collections**: All entity collections use `Map<Hrid, Entity>` for O(1) lookups
- **HRID Pattern**: All entities use Human Readable IDs (e.g., `/items/milk`, `/skills/alchemy`)
- **Utility Functions**: Each type includes `get`, `require`, `getAll`, `isHrid`, and domain-specific helpers
- **Translation System**: Type-safe translations mapped to entity HRIDs with locale support
- **Fix Generators**: Whenever there's a problem in a file inside `generated`, you should fix the `generator` that makes that file, not the file itself
- **ts-morph Usage**: All generators use ts-morph for clean, maintainable code generation

### Entity Types Generated

All 30+ entity types from game_data.json including:

- Skills, Items, Actions, Recipes, Equipment
- Combat system (abilities, monsters, damage types, combat styles)
- House rooms, Shops, Tasks
- Community features (buffs, guilds)
- Chat system (icons, colors, channels)
- Avatars, Game modes, Leaderboards, Quests
- Player data structures

### Important Dependencies

- **Bun**: JavaScript runtime (NOT Node.js)
- **ts-morph**: TypeScript AST manipulation for code generation
- **TypeScript 5+**: Type system and compilation
- **prettier**: Code formatting for generated files

## Utility Function Patterns

Each generated type module follows a consistent pattern for utility functions:

### Standard Functions (all types have these):
- `isTypeHrid(value: string): value is TypeHrid` - Type guard
- `getType(hrid: TypeHrid): Type | undefined` - Safe getter
- `requireType(hrid: TypeHrid): Type` - Throws if not found
- `getAllTypes(): Type[]` - Returns all as array

### Domain-Specific Functions (examples):
- Items: `getItemsByCategory()`, `getItemsBySellPrice()`, `sortItemsByIndex()`
- Actions: `getActionsBySkill()`, `getActionsByLevel()`
- Recipes: `getRecipesByCategory()`, `getRecipesBySkill()`
- Monsters: `getCombatMonstersByZone()`, `getCombatMonstersByLevel()`

### Collection Exports:
- `TYPES: Map<TypeHrid, Type>` - Main Map collection
- `TYPE_HRIDS: readonly TypeHrid[]` - Const array of all HRIDs
- Additional const arrays for subsets (e.g., `COMBAT_RANDOM_TASKS`, `MOO_PASS_BUNDLES`)

## Publishing

This package is published to NPM as `@c3d.gg/mwi-types` with automated releases via GitHub Actions. Breaking changes are documented in CHANGELOG.md following semantic versioning.

## Implementation Status

The package is feature-complete with all entity types generated from game data:

- Foundation infrastructure using ts-morph for type generation
- All 30+ entity type generators implemented with Map collections
- Comprehensive utility functions for all types
- Type-safe translation system for multiple locales
- NPM package properly configured for publishing
- GitHub Actions automation with Release Please
