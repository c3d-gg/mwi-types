# DamageTypes Generator

## Overview

The DamageTypes generator creates TypeScript definitions for all damage types in the MWI game system. This is a **critical prerequisite generator** that unblocks Monsters and Abilities generators.

## Purpose

Damage types represent the different types of damage that can be dealt or resisted in combat, including fire, nature, physical, and water damage.

## Data Source

- **Source**: `game_data.json` → `damageTypeDetailMap`
- **Entity Count**: 4 damage types
- **Dependencies**: None (Layer 1 generator)

## Entity Structure

Each damage type has the following properties:

```typescript
interface DamageType {
	/** Unique identifier (e.g., "/damage_types/fire") */
	hrid: string
	/** Display name (e.g., "Fire") */
	name: string
	/** Sort order for UI display */
	sortIndex: number
}
```

## Generated Exports

### Types Module (`types.ts`)

- `DamageType` - Main entity interface
- `DamageTypeHrid` - Union type of all HRIDs

### Constants Module (`constants.ts`)

- `DAMAGE_TYPE_HRIDS` - Array of all damage type HRIDs
- `DAMAGE_TYPE_KEYS` - Array for iteration

### Data Module (`data.ts`)

- `getDamageTypesRecord()` - Lazy-loaded Record<DamageTypeHrid, DamageType>

### Lookups Module (`lookups.ts`)

- `DAMAGE_TYPE_BY_HRID` - Static lookup table

### Utilities Module (`utils.ts`)

- `getDamageType(hrid)` - Get damage type by HRID
- `getAllDamageTypes()` - Get all damage types as array
- `getDamageTypesSortedByIndex()` - Get damage types sorted by sortIndex
- `toMap(record)` - Convert Record to Map for O(1) lookups

## Domain Usage

This generator is critical for:

- **Monsters** - Need damage types for attacks and resistances
- **Abilities** - Need damage types for ability effects
- **Items** (future) - Weapons may have damage type properties
- **Combat System** - Core damage calculation mechanics

## Implementation Notes

- Simple entity structure with no complex nested objects
- No shared types needed (all properties are primitives)
- Perfect candidate for utility templates (getByField, sortBy, toMap)
- No category filters needed (small dataset)

## Migration Strategy

**Phase**: Layer 1 - Critical Prerequisites
**Dependencies**: None
**Blocks**: Monsters, Abilities
**Approach**: Standard TDD migration using Skills generator as template

## Examples

```typescript
import { getDamageType } from '@c3d.gg/mwi-types/damage-types/utils'

import type { DamageTypeHrid } from '@c3d.gg/mwi-types/damage-types/types'

// Get specific damage type
const fireDamage = getDamageType('/damage_types/fire')

// Type-safe HRID usage
const damageTypeHrid: DamageTypeHrid = '/damage_types/water'
```
