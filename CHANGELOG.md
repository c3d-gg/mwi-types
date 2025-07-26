# Changelog

All notable changes to `@c3d.gg/mwi-types` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions workflows for automated CI/CD:
  - `generate-types.yml`: Automatic type regeneration on source data changes
  - `publish.yml`: Automated NPM publishing on version tags
  - `ci.yml`: Comprehensive CI checks on all PRs
  - `release-please.yml`: Automated release management and changelog updates
- Security scanning and bundle size analysis in CI pipeline
- Cross-platform testing (Ubuntu, Windows, macOS) with Node.js 18 and 20
- NPM package provenance for enhanced security
- Comprehensive GitHub Actions setup documentation

## [0.0.1] - 2025-07-26

### Added

- Initial release of @c3d.gg/mwi-types
- Complete TypeScript type definitions for all Milky Way Idle game entities
- Zod schemas for runtime validation of all entity types
- Typebox schemas derived from Zod schemas via @sinclair/typemap
- HRID constants and enums for compile-time type safety
- Type-safe translations for English (EN) and Chinese (ZH) locales
- Comprehensive utility functions for all entity types
- Player data type definitions with full character state
- Multiple export paths for optimal tree-shaking:
  - Main entry: All types and utilities
  - `/zod`: Zod schemas only
  - `/typebox`: Typebox schemas only
  - `/constants`: HRID constants only
  - `/game-logic`: Game logic types and utilities
  - `/player-data`: Player data types
  - `/localization`: Translation utilities

### Entity Types Included

- **Core Game Logic**: Skills (18), Items (754), Actions (630), Recipes (509), Equipment Types (24)
- **Combat System**: Abilities (58), Combat Monsters (77), Combat Styles (6), Damage Types (4), Buff Types (58)
- **Game Features**: House Rooms (17), Shops (2 categories, 45 items), Tasks (9 types, 4 shop items), Community Buffs (5)
- **Social & UI**: Chat (419 icons, 129 colors, 21 channels), Avatars (83), Avatar Outfits (93), Guild Roles (4)
- **Game Systems**: Game Modes (3), Leaderboards (6 types, 21 categories), Action Categories (57)
- **Localization**: Full translations for all entities in EN and ZH

[unreleased]: https://github.com/c3d-gg/mwi-types/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/c3d-gg/mwi-types/releases/tag/v0.0.1
