# ActionCategories Generator

## Purpose

Generates TypeScript types and utilities for Action Categories, which represent different types of player actions in the game (Alchemy, Brewing, Combat, etc.).

## Source Data Analysis

**Source Key**: `actionCategoryDetailMap`  
**Entity Count**: 59 action categories  
**Dependencies**: None (Layer 1 - Simple Generator)

### Sample Entity Structure

```json
{
	"hrid": "/action_categories/alchemy/alchemy",
	"name": "Alchemy",
	"type": "/action_types/alchemy",
	"sortIndex": 1
}
```

### Properties

- `hrid`: Unique identifier (ActionCategoryHrid)
- `name`: Human-readable display name
- `type`: Reference to action type (appears to be ActionTypeHrid)
- `sortIndex`: Display order sorting

## Generated Exports

### Types (`types.ts`)

```typescript
export type ActionCategoryHrid = string & { readonly brand: unique symbol }

export interface ActionCategory {
	hrid: ActionCategoryHrid
	name: string
	type: string // TODO: Make this ActionTypeHrid when ActionTypes implemented
	sortIndex: number
}
```

### Constants (`constants.ts`)

```typescript
export const ACTION_CATEGORY_HRIDS: readonly ActionCategoryHrid[]
export const ACTION_CATEGORIES_BY_TYPE: Record<string, ActionCategoryHrid[]>
```

### Utilities (`utils.ts`)

```typescript
// Core collection functions
export function getActionCategoriesRecord(): Record<
	ActionCategoryHrid,
	ActionCategory
>
export function getAllActionCategories(): ActionCategory[]
export function getActionCategory(
	hrid: ActionCategoryHrid,
): ActionCategory | undefined

// Utility functions
export function getActionCategoriesByType(type: string): ActionCategory[]
export function getActionCategoriesSortedByIndex(): ActionCategory[]
export function toMap(
	record: Record<ActionCategoryHrid, ActionCategory>,
): Map<ActionCategoryHrid, ActionCategory>
```

### Lookups (`lookups.ts`)

```typescript
export const actionCategoryNames: Record<ActionCategoryHrid, string>
export const actionCategoriesByType: Record<string, ActionCategoryHrid[]>
```

## Usage Examples

```typescript
// Import specific utilities (tree-shakeable)
import {
	ACTION_CATEGORY_HRIDS,
	getActionCategoriesByType,
	getActionCategory,
} from '@c3d.gg/mwi-types/action-categories/utils'

import type { ActionCategoryHrid } from '@c3d.gg/mwi-types/action-categories/types'

// Get a specific action category
const alchemy = getActionCategory(
	'/action_categories/alchemy/alchemy' as ActionCategoryHrid,
)

// Get all categories of a specific type
const alchemyCategories = getActionCategoriesByType('/action_types/alchemy')

// Use HRID constants for type safety
const firstCategory = ACTION_CATEGORY_HRIDS[0]
```

## Dependencies

**Imports From**:

- None (Layer 1 generator)

**Used By**:

- Actions generator (for ActionCategoryHrid typing)
- Potentially other generators that reference action categories

## Implementation Strategy

### Generator Configuration

- **Entity Name**: ActionCategory
- **Source Key**: actionCategoryDetailMap
- **Pattern**: Simple entity with no dependencies
- **Shared Types**: None needed
- **Utility Templates**:
  - `getByField` (type)
  - `sortBy` (sortIndex)
  - `toMap`

### Data Transformation

Simple 1:1 mapping from source data:

- `hrid` → `hrid` (typed as ActionCategoryHrid)
- `name` → `name`
- `type` → `type` (string for now, ActionTypeHrid later)
- `sortIndex` → `sortIndex`

## Testing Strategy

### Unit Tests Coverage

1. **Configuration**: Verify generator config is correct
2. **Data Extraction**: Test 59 entities extracted correctly
3. **Property Mapping**: Validate all properties mapped properly
4. **Type Generation**: Ensure ActionCategoryHrid type is branded string
5. **Utilities**: Test all generated utility functions
6. **Edge Cases**: Handle missing/invalid data gracefully
7. **Integration**: Verify no circular dependencies

### Test Data Validation

- Verify 59 total entities
- Check sample entities have required properties
- Validate sortIndex values are numeric
- Ensure no duplicate HRIDs

## Performance Characteristics

- **Dataset Size**: 59 entities (small, very fast)
- **Generation Time**: < 0.1s expected
- **Bundle Impact**: Minimal (~2-5KB)
- **Tree-Shaking**: Full support, import only what's needed

## Future Enhancements

1. **ActionType Integration**: When ActionTypes generator is implemented, change `type` property to `ActionTypeHrid`
2. **Category Grouping**: Add utilities for grouping related categories
3. **Validation**: Add runtime validation for category data integrity
