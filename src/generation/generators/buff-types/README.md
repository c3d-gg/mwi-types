# BuffTypes Generator

## Purpose

Generates TypeScript types and utilities for Buff Types, which represent different types of buffs and debuffs that can be applied to players, items, or game entities (Accuracy, Strength, Speed, etc.).

## Source Data Analysis

**Source Key**: `buffTypeDetailMap`  
**Entity Count**: 59 buff types  
**Dependencies**: None (Layer 1 - Simple Generator)

### Sample Entity Structure

```json
{
	"hrid": "/buff_types/accuracy",
	"isCombat": true,
	"name": "Accuracy",
	"description": "Increases accuracy rating",
	"debuffDescription": "Decreases accuracy rating",
	"sortIndex": 36
}
```

### Properties

- `hrid`: Unique identifier (BuffTypeHrid)
- `name`: Human-readable display name
- `description`: Effect description when buff is positive
- `debuffDescription`: Effect description when buff is negative/debuff
- `isCombat`: Boolean flag indicating if this is a combat-related buff
- `sortIndex`: Display order sorting

## Generated Exports

### Types (`types.ts`)

```typescript
export type BuffTypeHrid = string & { readonly brand: unique symbol }

export interface BuffType {
	hrid: BuffTypeHrid
	name: string
	description: string
	debuffDescription: string
	isCombat: boolean
	sortIndex: number
}
```

### Constants (`constants.ts`)

```typescript
export const BUFF_TYPE_HRIDS: readonly BuffTypeHrid[]
export const COMBAT_BUFF_TYPES: readonly BuffTypeHrid[]
export const NON_COMBAT_BUFF_TYPES: readonly BuffTypeHrid[]
```

### Utilities (`utils.ts`)

```typescript
// Core collection functions
export function getBuffTypesRecord(): Record<BuffTypeHrid, BuffType>
export function getAllBuffTypes(): BuffType[]
export function getBuffType(hrid: BuffTypeHrid): BuffType | undefined

// Category utilities
export function getCombatBuffTypes(): BuffType[]
export function getNonCombatBuffTypes(): BuffType[]
export function getBuffTypesSortedByIndex(): BuffType[]
export function toMap(
	record: Record<BuffTypeHrid, BuffType>,
): Map<BuffTypeHrid, BuffType>
```

### Lookups (`lookups.ts`)

```typescript
export const buffTypeNames: Record<BuffTypeHrid, string>
export const combatBuffTypeHrids: readonly BuffTypeHrid[]
export const nonCombatBuffTypeHrids: readonly BuffTypeHrid[]
```

## Usage Examples

```typescript
// Import specific utilities (tree-shakeable)
import {
	BUFF_TYPE_HRIDS,
	getBuffType,
	getCombatBuffTypes,
} from '@c3d.gg/mwi-types/buff-types/utils'

import type { BuffTypeHrid } from '@c3d.gg/mwi-types/buff-types/types'

// Get a specific buff type
const accuracy = getBuffType('/buff_types/accuracy' as BuffTypeHrid)

// Get all combat-related buff types
const combatBuffs = getCombatBuffTypes()

// Use HRID constants for type safety
const firstBuffType = BUFF_TYPE_HRIDS[0]
```

## Dependencies

**Imports From**:

- None (Layer 1 generator)

**Used By**:

- Actions generator (for BuffTypeHrid in buff-related fields)
- Items generator (for equipment buff effects)
- Player data (for active buffs/debuffs)
- Combat system (for buff calculations)

## Implementation Strategy

### Generator Configuration

- **Entity Name**: BuffType
- **Source Key**: buffTypeDetailMap
- **Pattern**: Simple entity with boolean categorization
- **Shared Types**: None needed
- **Utility Templates**:
  - `sortBy` (sortIndex)
  - `toMap`
- **Category Filters**:
  - `combat` (isCombat === true)
  - `nonCombat` (isCombat === false)

### Data Transformation

Simple 1:1 mapping from source data:

- `hrid` → `hrid` (typed as BuffTypeHrid)
- `name` → `name`
- `description` → `description`
- `debuffDescription` → `debuffDescription`
- `isCombat` → `isCombat`
- `sortIndex` → `sortIndex`

## Testing Strategy

### Unit Tests Coverage

1. **Configuration**: Verify generator config is correct
2. **Data Extraction**: Test 59 entities extracted correctly
3. **Property Mapping**: Validate all properties mapped properly
4. **Type Generation**: Ensure BuffTypeHrid type is branded string
5. **Category Logic**: Test combat vs non-combat categorization
6. **Utilities**: Test all generated utility functions
7. **Edge Cases**: Handle missing/invalid data gracefully
8. **Integration**: Verify no circular dependencies

### Test Data Validation

- Verify 59 total entities
- Check sample entities have all required properties
- Validate isCombat boolean values
- Ensure sortIndex values are numeric
- Test description and debuffDescription are non-empty strings
- Ensure no duplicate HRIDs

## Performance Characteristics

- **Dataset Size**: 59 entities (small, very fast)
- **Generation Time**: < 0.1s expected
- **Bundle Impact**: Minimal (~2-5KB)
- **Tree-Shaking**: Full support, import only what's needed

## Future Enhancements

1. **Buff Value Types**: Add typing for buff value calculation methods
2. **Buff Stacking**: Add metadata for how buffs stack/combine
3. **Duration Types**: Add categories for temporary vs permanent buffs
4. **Buff Icons**: Add icon/visual metadata for UI rendering
5. **Buff Categories**: Add semantic grouping beyond combat/non-combat
