# ItemCategories Generator

Generates TypeScript types and utilities for MWI item categories.

## Overview

ItemCategories define the high-level classification system for items in the game. Each category groups related items together and provides display names for UI categorization.

## Source Data

- **Source**: `game_data.json` → `itemCategoryDetailMap`
- **Entity Count**: 8 categories
- **Structure**: Simple 4-property objects

## Generated Types

### `ItemCategory`

```typescript
interface ItemCategory {
	hrid: ItemCategoryHrid
	name: string
	pluralName: string
	sortIndex: number
}
```

### `ItemCategoryHrid`

Union type of all category HRIDs:

- `/item_categories/ability_book`
- `/item_categories/armor`
- `/item_categories/consumable`
- `/item_categories/enhancement_stone`
- `/item_categories/food`
- `/item_categories/recipe`
- `/item_categories/tool`
- `/item_categories/weapon`

## Key Features

- **Sorting Support**: `sortIndex` property enables proper UI ordering
- **Display Names**: Both singular (`name`) and plural (`pluralName`) forms
- **Type Safety**: Strongly typed HRIDs for compile-time validation
- **Utility Functions**: Sorting, filtering, and lookup helpers

## Dependencies

- **Layer**: 1 (No dependencies on other generators)
- **Shared Types**: None required
- **Imports**: None from other domains

## Usage Examples

```typescript
import { getItemCategoriesRecord } from '@c3d.gg/mwi-types/item-categories/data'
import { getItemCategoriesSortedByIndex } from '@c3d.gg/mwi-types/item-categories/utils'

import type {
	ItemCategory,
	ItemCategoryHrid,
} from '@c3d.gg/mwi-types/item-categories/types'

// Get all categories sorted by display order
const sortedCategories = getItemCategoriesSortedByIndex()

// Type-safe category reference
const armorCategoryHrid: ItemCategoryHrid = '/item_categories/armor'
```

## Generated Files

- `types.ts` - TypeScript interfaces and HRID union
- `constants.ts` - HRID arrays and lookup tables
- `data.ts` - Lazy-loaded Record data
- `utils.ts` - Utility functions (sorting, filtering, conversion)
- `lookups.ts` - Static lookup tables for performance
- `index.ts` - Tree-shakeable module exports

## Architecture Notes

- Uses Record<Hrid, Entity> as primary collection type
- Follows v1.0 modular architecture with hook system
- Tree-shaking optimized - no barrel exports
- No domain violations - self-contained module
