# Items Generator

The most complex generator in the MWI Types system - handles **894 items** across 8 categories with rich type safety and extensive utilities.

## Overview

Items are the core entities in the game - resources, equipment, consumables, ability books, currency, keys, and loot. This generator provides comprehensive type safety for all item structures, cross-references, and business logic.

## Source Data

- **Source**: `game_data.json` → `itemDetailMap`
- **Entity Count**: 894 items
- **Complexity**: High - multiple detail interfaces, cross-references, rich stats system

## Item Categories & Structures

### 8 Item Categories

1. **Equipment** (518 items) - Weapons, armor, jewelry, tools
2. **Resource** (185 items) - Crafting materials with alchemy details
3. **Consumable** (92 items) - Food (28) + Drinks (64) with buff effects
4. **Ability Books** (56 items) - Unlock combat abilities
5. **Loot** (19 items) - Openable containers
6. **Keys** (17 items) - Dungeon and area access
7. **Currency** (7 items) - Dungeon tokens and special currencies

### Universal Properties

**Always Present**: `hrid`, `name`, `description`, `categoryHrid`, `sellPrice`, `sortIndex`
**Nearly Universal**: `itemLevel` (867/894), `isTradable` (842/894), `alchemyDetail` (868/894)

## Complex Type System

### Equipment (518 items)

- **25 Equipment Types**: Combat gear + 10 skill tools
- **Tool Detection**: Types ending with `_tool`
- **Enhancement System**: `enhancementCosts`, `protectionItemHrids`
- **Rich Stats**: Combat (60+ stats) + Noncombat (skill bonuses)

#### Combat Stats (60+ types)

- **Accuracy/Evasion**: `magicAccuracy`, `stabEvasion`, `slashEvasion`, etc.
- **Damage**: `autoAttackDamage`, `magicDamage`, `rangedDamage`, etc.
- **Resistances**: `fireResistance`, `waterResistance`, `natureResistance`
- **Special Effects**: `criticalRate`, `lifeSteal`, `parry`, `weaken`, etc.

#### Noncombat Stats (Skill System)

Pattern-based for 10 skills (woodcutting, tailoring, milking, foraging, enhancing, crafting, cooking, cheesesmithing, brewing, alchemy):

- `{skill}Speed` - Action speed bonus
- `{skill}Experience` - Experience multiplier
- `{skill}Efficiency` - Resource efficiency
- `{skill}RareFind` - Rare item chance

### Consumables (92 items)

- **Cooldowns**: `cooldownDuration`, `recoveryDuration`
- **Healing**: `hitpointRestore`, `manapointRestore`
- **Buffs**: 35+ buff types with complex structure
- **Action Restrictions**: `usableInActionTypeMap`

### Alchemy System (868 items)

- **Transmutation**: Success rates and drop tables
- **Decomposition**: Item breakdown recipes
- **Bulk Processing**: Multipliers and coinification

## Generated Types

### Core Interfaces

```typescript
interface Item {
	hrid: ItemHrid
	name: string
	description: string
	categoryHrid: ItemCategoryHrid
	sellPrice: number
	sortIndex: number

	// Optional properties by category
	itemLevel?: number
	isTradable?: boolean

	// Detail objects
	alchemyDetail?: AlchemyDetail
	equipmentDetail?: EquipmentDetail
	consumableDetail?: ConsumableDetail
	abilityBookDetail?: AbilityBookDetail

	// Equipment-specific
	enhancementCosts?: ItemCost[]
	protectionItemHrids?: ItemHrid[]

	// Loot-specific
	isOpenable?: boolean
	openKeyItemHrid?: ItemHrid
}

interface CombatStats {
	// 60+ combat stats as optional properties
	magicAccuracy?: number
	stabEvasion?: number
	autoAttackDamage?: number
	fireResistance?: number
	// ... all combat stats fully typed
}

interface NoncombatStats {
	// Skill-based stats patterns
	alchemySpeed?: number
	alchemyExperience?: number
	alchemyEfficiency?: number
	// ... all skill stats fully typed
}
```

### Utility Categories

- **Item Lookups**: Get by category, equipment type, marketplace category
- **Type Guards**: `isEquipment()`, `isTool()`, `isTradable()`, `isConsumable()`
- **Business Logic**: Marketplace categorization, tool detection
- **Enhancement**: Cost calculations, protection items
- **Performance**: O(1) lookups via Maps, chunked data loading

## Key Features

### 🎯 Full Type Safety

- **Zero `any` types** - all stats individually typed
- **Discriminated unions** for category-specific properties
- **Cross-references** properly typed (ItemHrid → Item)

### 📊 Rich Lookups

- Items by category/equipment type/marketplace category
- Tools by skill, tradable items, alchemical items
- Cached lookup maps for O(1) performance

### 🛠️ Business Logic

- **Marketplace Categories**: 7 categories (Resources, Equipment, Tools, etc.)
- **Tool Detection**: Automatic via equipment type patterns
- **Enhancement Costs**: Multi-level cost calculations

### ⚡ Performance Optimized

- Tree-shakeable exports - import only what you need
- Lazy-loaded data with chunking for large datasets
- Pre-computed lookup maps

## Dependencies

- **ItemCategories** ✅ (categoryHrid references)
- **SharedTypes** (LevelRequirement, Buff structures)
- **EquipmentTypes** (equipmentDetail.type references)
- **Skills** (level requirements, stat bonuses)

## Usage Examples

```typescript
import { getItemsRecord } from '@c3d.gg/mwi-types/items/data'
import {
	getMarketplaceCategory,
	isEquipment,
	isTool,
} from '@c3d.gg/mwi-types/items/utils'

import type { CombatStats, Item } from '@c3d.gg/mwi-types/items/types'

// Type-safe item access
const sword: Item | undefined = getItemsRecord()['/items/steel_sword']

// Business logic utilities
if (isEquipment(sword) && isTool(sword)) {
	console.log('This is a tool:', sword.equipmentDetail?.type)
}

// Marketplace categorization
const category = getMarketplaceCategory(sword) // 'Equipment' | 'Tools' | etc.

// Fully typed stats access
const combatStats: CombatStats | undefined = sword?.equipmentDetail?.combatStats
if (combatStats?.magicAccuracy) {
	console.log('Magic accuracy bonus:', combatStats.magicAccuracy)
}
```

## Generated Files

- `types.ts` - All interfaces (Item, detail objects, stats)
- `constants.ts` - HRID arrays and category lookups
- `data.ts` - Lazy-loaded Record data (tree-shakeable)
- `utils.ts` - 15+ utility functions for business logic
- `lookups.ts` - Pre-computed lookup maps for performance
- `index.ts` - Tree-shakeable module exports

## Architecture Notes

- **Largest generator**: 894 entities with complex cross-references
- **Performance critical**: Uses caching, lazy loading, and lookup maps
- **Fully typed**: No `any` types - all 60+ stats individually defined
- **Business logic**: Marketplace and tool categorization algorithms
- **Tree-shaking optimized**: Zero-cost for unused functionality
