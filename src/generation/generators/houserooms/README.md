# House Rooms Generator

## Purpose

Generates TypeScript types and utilities for the MWI house rooms system. House rooms are upgradeable structures that provide skill-specific and global buffs to players, with complex upgrade paths requiring various items.

## Source Data

**Source**: `game_data.json` → `houseRoomDetailMap`
**Entity Count**: 17 house rooms

### Sample Structure

```json
{
	"hrid": "/house_rooms/archery_range",
	"name": "Archery Range",
	"skillHrid": "/skills/ranged",
	"usableInActionTypeMap": {
		"/action_types/combat": true
	},
	"actionBuffs": [
		{
			"uniqueHrid": "/buff_uniques/house_ranged_level",
			"typeHrid": "/buff_types/ranged_level",
			"ratioBoost": 0,
			"ratioBoostLevelBonus": 0,
			"flatBoost": 1,
			"flatBoostLevelBonus": 1,
			"startTime": "0001-01-01T00:00:00Z",
			"duration": 0
		}
	],
	"globalBuffs": [
		{
			"uniqueHrid": "/buff_uniques/house_experience",
			"typeHrid": "/buff_types/wisdom",
			"ratioBoost": 0,
			"ratioBoostLevelBonus": 0,
			"flatBoost": 0.0005,
			"flatBoostLevelBonus": 0.0005,
			"startTime": "0001-01-01T00:00:00Z",
			"duration": 0
		}
	],
	"upgradeCostsMap": {
		"1": [
			{ "itemHrid": "/items/coin", "count": 500000 },
			{ "itemHrid": "/items/lumber", "count": 75 }
		],
		"2": [
			{ "itemHrid": "/items/coin", "count": 2000000 },
			{ "itemHrid": "/items/lumber", "count": 150 }
		]
		// ... levels 3-8
	},
	"sortIndex": 16
}
```

## Generated Exports

### Types (`types.ts`)

- **`HouseRoom`** - Main entity interface
- **`HouseRoomHrid`** - String literal type for all house room HRIDs
- **`UpgradeCost`** - Interface for upgrade cost items
- **`UpgradeCostsMap`** - Map of upgrade levels to costs
- **`ActionBuffMap`** - Map of action type HRIDs to usability
- **`HouseRoomBuff`** - Interface for buff effects (actionBuffs/globalBuffs)

### Constants (`constants.ts`)

- **`HOUSE_ROOM_HRIDS`** - Array of all house room HRIDs
- **`HOUSE_ROOMS_BY_SKILL`** - Categorized by skillHrid
- **`MAX_UPGRADE_LEVEL`** - Maximum upgrade level (8)

### Data (`data.ts`)

- **`getHouseRoomsRecord()`** - Lazy-loaded `Record<HouseRoomHrid, HouseRoom>`

### Utilities (`utils.ts`)

- **`getHouseRoomsBySkill(skillHrid)`** - Filter rooms by skill
- **`getHouseRoomUpgradeCost(hrid, level)`** - Get specific upgrade costs
- **`getMaxUpgradeLevel()`** - Get maximum upgrade level
- **`getHouseRoomsWithActionBuffs()`** - Rooms that provide action buffs
- **`getHouseRoomsWithGlobalBuffs()`** - Rooms that provide global buffs
- **`toMap(record)`** - Convert Record to Map for O(1) lookups

### Lookups (`lookups.ts`)

- **`HOUSE_ROOM_SKILL_LOOKUP`** - Static skill → rooms mapping
- **`UPGRADE_LEVELS_LOOKUP`** - Available upgrade levels per room

## Dependencies

### Module Imports

```typescript
// Type imports from other domains
import type { ActionTypeHrid } from '../../../generated/actions/types'
import type { ItemHrid } from '../../../generated/items/types'
// Shared types
import type {
	HouseRoomBuff, // Buff structure used in actionBuffs/globalBuffs
} from '../../../generated/sharedtypes/types'
import type { SkillHrid } from '../../../generated/skills/types'
```

### Domain Dependencies

- **Items** ✅ - `upgradeCostsMap` references `ItemHrid`
- **Skills** ✅ - `skillHrid` property references `SkillHrid`
- **Actions** ✅ - `usableInActionTypeMap` references `ActionTypeHrid`
- **BuffTypes** ✅ - `actionBuffs` and `globalBuffs` reference buff type HRIDs

## Usage Examples

### Basic Usage

```typescript
import {
	getHouseRoomsBySkill,
	getHouseRoomsRecord,
} from '@c3d.gg/mwi-types/houserooms'

import type {
	HouseRoom,
	HouseRoomHrid,
} from '@c3d.gg/mwi-types/houserooms/types'

// Get all house rooms
const allRooms = getHouseRoomsRecord()
const archeryRange = allRooms['/house_rooms/archery_range' as HouseRoomHrid]

// Get rooms for a specific skill
const rangedRooms = getHouseRoomsBySkill('/skills/ranged')
```

### Upgrade Costs

```typescript
import { getHouseRoomUpgradeCost } from '@c3d.gg/mwi-types/houserooms/utils'

// Get upgrade costs for level 5 archery range
const upgradeCosts = getHouseRoomUpgradeCost('/house_rooms/archery_range', 5)
// Returns: UpgradeCost[] with itemHrid and count for each required item
```

### Buff Analysis

```typescript
import {
	getHouseRoomsWithActionBuffs,
	getHouseRoomsWithGlobalBuffs,
} from '@c3d.gg/mwi-types/houserooms/utils'

// Find rooms that provide combat-specific buffs
const actionBuffRooms = getHouseRoomsWithActionBuffs()

// Find rooms that provide global bonuses
const globalBuffRooms = getHouseRoomsWithGlobalBuffs()
```

### Tree-Shakable Imports

```typescript
// Import only what you need
import { HOUSE_ROOM_HRIDS } from '@c3d.gg/mwi-types/houserooms/constants'
import { getHouseRoomsBySkill } from '@c3d.gg/mwi-types/houserooms/utils'

import type { HouseRoom } from '@c3d.gg/mwi-types/houserooms/types'
```

## Testing Strategy

### Unit Tests

- **Configuration validation** - Generator config is properly set up
- **Data extraction** - All 17 rooms extracted correctly from source
- **Property mapping** - All properties (hrid, name, skillHrid, etc.) mapped correctly
- **Nested structure handling** - Complex upgradeCostsMap and buff arrays processed
- **Type generation** - TypeScript interfaces generated without errors
- **Utility functions** - All utility functions work correctly
- **Integration** - Shared types and imports from other modules work

### Edge Cases

- **Empty arrays** - Rooms with no actionBuffs or globalBuffs
- **Missing properties** - Optional fields handled correctly
- **Invalid references** - Validation of HRID references to other modules
- **Upgrade level bounds** - Validate levels 1-8 handling

## Performance Characteristics

- **Dataset Size**: Small (17 entities)
- **Generation Time**: < 1 second
- **Memory Usage**: Low
- **Bundle Impact**: Minimal with tree-shaking
- **Complexity**: Medium (nested structures, multiple dependencies)

## Implementation Notes

- Uses **medium complexity** pattern with custom `transformEntity()` hook
- Imports shared types for buff structures to avoid duplication
- Generates level-based utility functions for upgrade cost queries
- Categorizes rooms by skill specialization for easy filtering
- Maintains domain boundaries - imports types from source modules only
