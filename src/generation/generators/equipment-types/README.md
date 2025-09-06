# EquipmentTypes Generator

## Overview

The EquipmentTypes generator creates TypeScript definitions for all equipment types in the MWI game system. This is a **critical prerequisite generator** that is required for Items migration.

## Purpose

Equipment types represent the different categories of equipment that can be equipped by players, including armor pieces (head, body, hands, etc.), weapons (main_hand, off_hand, two_hand), jewelry (ring, earrings, charm), and various skill-specific tools.

## Data Source

- **Source**: `game_data.json` → `equipmentTypeDetailMap`
- **Entity Count**: 25 equipment types
- **Dependencies**: None (Layer 1 generator)

## Entity Structure

Each equipment type has the following properties:

```typescript
interface EquipmentType {
	/** Unique identifier (e.g., "/equipment_types/alchemy_tool") */
	hrid: string
	/** Display name (e.g., "Alchemy Tool") */
	name: string
	/** Reference to item location (e.g., "/item_locations/alchemy_tool") */
	itemLocationHrid: string
	/** Sort order for UI display */
	sortIndex: number
}
```

## Equipment Categories

### 🛡️ Armor/Body Slots (9 types)

- `head`, `body`, `back`, `hands`, `feet`, `legs`
- `main_hand`, `off_hand`, `two_hand`

### 💍 Jewelry/Accessories (6 types)

- `ring`, `earrings`, `charm`, `trinket`, `neck`, `pouch`

### 🔧 Skill Tools (10 types)

- `alchemy_tool`, `brewing_tool`, `cooking_tool`, `crafting_tool`, `enhancing_tool`
- `foraging_tool`, `milking_tool`, `tailoring_tool`, `woodcutting_tool`, `cheesesmithing_tool`

## Generated Exports

### Types Module (`types.ts`)

- `EquipmentType` - Main entity interface
- `EquipmentTypeHrid` - Union type of all HRIDs

### Constants Module (`constants.ts`)

- `EQUIPMENT_TYPE_HRIDS` - Array of all equipment type HRIDs
- `EQUIPMENT_TYPE_KEYS` - Array for iteration

### Data Module (`data.ts`)

- `getEquipmentTypesRecord()` - Lazy-loaded Record<EquipmentTypeHrid, EquipmentType>

### Lookups Module (`lookups.ts`)

- `EQUIPMENT_TYPE_BY_HRID` - Static lookup table

### Utilities Module (`utils.ts`)

- `getEquipmentType(hrid)` - Get equipment type by HRID
- `getAllEquipmentTypes()` - Get all equipment types as array
- `getEquipmentTypesSortedByIndex()` - Get equipment types sorted by sortIndex
- `toMap(record)` - Convert Record to Map for O(1) lookups

## Domain Usage

This generator is critical for:

- **Items** - Need equipment types to define what slots items can be equipped in
- **Player Equipment** - Managing equipped items by slot type
- **UI Systems** - Displaying equipment slots and categories
- **Crafting** - Tool requirements for various skills

## Implementation Notes

- Simple entity structure with primitive properties and one reference field
- No shared types needed (all properties are primitives or simple strings)
- Perfect candidate for utility templates (sortBy, toMap)
- No category filters needed (manageable 25-item dataset)
- ItemLocationHrid reference suggests future integration with ItemLocations module

## Migration Strategy

**Phase**: Layer 1 - Critical Prerequisites
**Dependencies**: None
**Blocks**: Items (critical blocker)
**Approach**: Standard TDD migration using DamageTypes generator as template

## Examples

```typescript
import { getEquipmentType } from '@c3d.gg/mwi-types/equipment-types/utils'

import type { EquipmentTypeHrid } from '@c3d.gg/mwi-types/equipment-types/types'

// Get specific equipment type
const helmet = getEquipmentType('/equipment_types/head')

// Type-safe HRID usage
const equipmentTypeHrid: EquipmentTypeHrid = '/equipment_types/main_hand'
```
