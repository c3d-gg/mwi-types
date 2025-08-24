# Changelog

All notable changes to `@c3d.gg/mwi-types` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2](https://github.com/c3d-gg/mwi-types/compare/v0.2.1...v0.2.2) (2025-08-24)


### 🐛 Bug Fixes

* add .js extensions to all ES module imports for Node.js compatibility ([79c5f6d](https://github.com/c3d-gg/mwi-types/commit/79c5f6d3a12a3a6680393adc03c13a6f75941b8d))
* correct generation path in generate-types workflow ([ca92ccf](https://github.com/c3d-gg/mwi-types/commit/ca92ccfc4a6807d190beb5f1c48aab0eec5dc003))
* remove utils/index.ts from CI expectations as it's not generated ([b9628fc](https://github.com/c3d-gg/mwi-types/commit/b9628fc0e1f718ed9a7986505f40cc145d23db8c))

## [0.2.1](https://github.com/c3d-gg/mwi-types/compare/v0.2.0...v0.2.1) (2025-08-24)


### 🐛 Bug Fixes

* remove constants/index.ts from CI checks as it's no longer needed ([9b02dff](https://github.com/c3d-gg/mwi-types/commit/9b02dff89eff3bc499271288c698ae40e2bda94e))
* update all docs with the new API ([57cd086](https://github.com/c3d-gg/mwi-types/commit/57cd08640a850b44dc80b48aa2db00fddb0b431d))

## [0.2.0](https://github.com/c3d-gg/mwi-types/compare/v0.1.2...v0.2.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* Complete restructure of the type generation system

### ✨ Features

* complete v1 implementation of type generation system ([e0fc765](https://github.com/c3d-gg/mwi-types/commit/e0fc76585312df6f6ddaaf6c8416a8cd9d28dd4b))
* update all docs with the new API ([d54d709](https://github.com/c3d-gg/mwi-types/commit/d54d7099f58f6b39dca9a472da5af7834ef14d02))


### 🐛 Bug Fixes

* add missing generators to generation pipeline ([b4404d8](https://github.com/c3d-gg/mwi-types/commit/b4404d88a7877e3fab2b2387112ec61cd969f18e))
* correct bun lock file reference in generate-types workflow ([6c26b89](https://github.com/c3d-gg/mwi-types/commit/6c26b8976d982e7f01510abcc540b42fd953dcce))
* remove constants/index.ts from CI checks as it's no longer needed ([de0f183](https://github.com/c3d-gg/mwi-types/commit/de0f183d2a3667101a4a46230ac4bebb00fa392e))
* update bun.lock file to match package.json ([ae59cd7](https://github.com/c3d-gg/mwi-types/commit/ae59cd7fcb9a911a01462d7db0c47b1cbf40af6b))
* update CI test to work with Map-based exports ([ac1d6ae](https://github.com/c3d-gg/mwi-types/commit/ac1d6aecf3c680b2cd05205b643010a3ad248f59))

## [0.1.2](https://github.com/c3d-gg/mwi-types/compare/v0.1.1...v0.1.2) (2025-08-21)

### ✨ Features

- new recipe types and utils funcitons ([82d0263](https://github.com/c3d-gg/mwi-types/commit/82d0263b5a292716dc19182b9fd72ad86552224f))

## [0.1.1](https://github.com/c3d-gg/mwi-types/compare/v0.1.0...v0.1.1) (2025-08-21)

### ✨ Features

- add release script for automated releases ([707ee7f](https://github.com/c3d-gg/mwi-types/commit/707ee7fb9a88484b2457ba4aa0eb1ae26baffa4f))

## [0.1.0](https://github.com/c3d-gg/mwi-types/compare/v0.0.5...v0.1.0) (2025-08-21)

### ⚠ BREAKING CHANGES

- Power skill renamed to Melee throughout all types

### ✨ Features

- update generators for game v1.20250819.0 ([20315c6](https://github.com/c3d-gg/mwi-types/commit/20315c66daff79940f48f67477d5b7a95a162de1))

## [0.0.5](https://github.com/c3d-gg/mwi-types/compare/v0.0.4...v0.0.5) (2025-08-16)

### 🐛 Bug Fixes

- add PAT support for Release Please workflow ([5512136](https://github.com/c3d-gg/mwi-types/commit/551213643a1cfaa6b4ba8c43a932f34d31cbb5a7))

### 🔧 Miscellaneous

- bump version to 0.0.4 and fix Release Please v4 configuration ([1c2063d](https://github.com/c3d-gg/mwi-types/commit/1c2063da251e5068d55547ad62223759e9fea6b0))
- fix .gg name on docs ([6fa6627](https://github.com/c3d-gg/mwi-types/commit/6fa6627fd9549055cb6c529e049659697492b983))

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
