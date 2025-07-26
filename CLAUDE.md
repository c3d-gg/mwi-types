# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@c3d/mwi-types` is a TypeScript type generation library for the Milky Way Idle game. It reads game data from JSON files and generates comprehensive TypeScript types, Zod schemas, Typebox schemas, HRID constants, and typed translations.

## Commands

### Development

- **Generate all types**: `bun run generate`
- **Type check**: `bun run typecheck`
- **Clean generated files**: `bun run clean`
- **Watch mode**: `bun run generate:watch`

### NPM Scripts

```json
{
  "generate": "bun run src/generators/index.ts",
  "generate:watch": "bun run --watch src/generators/index.ts",
  "typecheck": "bun tsc --noEmit",
  "clean": "rm -rf src/generated"
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
├── generators/          # Generator implementations
│   ├── index.ts        # Main orchestrator
│   ├── base/           # Core generator infrastructure
│   ├── game-logic/     # Entity type generators
│   └── localization/   # Translation generators
├── generated/          # Output directory (git-ignored)
│   ├── game-logic/     # Entity types
│   ├── constants/      # HRID constants/enums
│   ├── schemas/        # Schema definitions
│   │   ├── zod/        # Zod schemas
│   │   └── typebox/    # Typebox schemas
│   └── localization/   # Typed translations
└── types/              # Base type definitions
```

### Core Flow

1. **Source data** (`src/sources/`) contains game_data.json with 30+ entity types
2. **Base infrastructure** (`src/generators/base/`) provides reusable utilities
3. **Entity generators** read source data → generate schemas → write TypeScript files
4. **Main generator** (`src/generators/index.ts`) orchestrates all sub-generators

### Schema Generation Strategy

**Important**: We generate only Zod schemas directly. Typebox schemas are derived from Zod schemas using the `@sinclair/typemap` package during the build process. This ensures:
- Single source of truth (Zod schemas)
- No duplicate schema definitions
- Consistent validation behavior
- Smaller, simpler codebase

### Key Implementation Details

- **Dependency Order**: Skills MUST be generated first (other entities depend on skill types)
- **Schema Support**: Zod schemas generated directly, Typebox derived via adapter
- **HRID Pattern**: All entities use Human Readable IDs (e.g., `/items/milk`, `/skills/alchemy`)
- **Type Safety**: Full TypeScript types with runtime validation via schemas
- **Translation System**: Type-safe translations mapped to entity HRIDs

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
- **Zod v4**: Runtime schema validation
- **@sinclair/typemap**: Typebox schema conversion utilities
- **TypeScript 5+**: Type system and compilation

## Publishing

This package is published to NPM as `@c3d/mwi-types` with automated releases via GitHub Actions. Breaking changes are documented in CHANGELOG.md following semantic versioning.

## Implementation Status

The package is feature-complete with all entity types generated from game data:
- Foundation infrastructure for type generation
- All 30+ entity type generators implemented
- Type-safe translation system for multiple locales
- NPM package properly configured for publishing
- Ready for GitHub Actions automation
