# Combat Styles Generator

## Purpose

Generates TypeScript types, constants, and utilities for combat styles from the MWI game data. Combat styles define how combat actions and abilities are categorized (ranged, melee, magic, etc.).

## Source Data

Extracts data from `combatStyleDetailMap` in `game_data.json`:

```json
{
	"hrid": "/combat_styles/ranged",
	"name": "Ranged",
	"skillExpMap": null,
	"sortIndex": 2
}
```

**Data Structure Analysis:**

- **Total entities**: 6 combat styles
- **Complexity**: Simple enumeration with basic properties
- **Dependencies**: None (Layer 3 - no dependencies)
- **Key fields**: hrid (identifier), name (display), sortIndex (ordering)
- **Optional fields**: skillExpMap (typically null)

## Generated Exports

### Types (`types.ts`)

- `CombatStyle` - Main interface with all properties
- `CombatStyleHrid` - Union type of all combat style HRIDs

### Constants (`constants.ts`)

- `COMBAT_STYLE_HRIDS` - Array of all combat style HRIDs
- `COMBAT_STYLES_COUNT` - Total number of combat styles

### Data (`data.ts`)

- `getCombatStylesRecord()` - Lazy-loaded Record&lt;CombatStyleHrid, CombatStyle&gt;

### Utilities (`utils.ts`)

- `getCombatStyle(hrid)` - Get combat style by HRID
- `getCombatStylesArray()` - Get all combat styles as array
- `getCombatStylesByName(name)` - Filter by name pattern
- `getCombatStylesSortedByIndex()` - Get all styles sorted by sortIndex
- `toMap(record)` - Convert Record to Map for O(1) lookups

### Lookups (`lookups.ts`)

- `COMBAT_STYLE_BY_NAME` - Name → CombatStyle lookup table

## Dependencies

**None** - This is a Layer 3 generator with no external dependencies.

## Usage Examples

```typescript
import { COMBAT_STYLE_HRIDS } from '@c3d.gg/mwi-types/combat-styles/constants'
import { CombatStyleHrid } from '@c3d.gg/mwi-types/combat-styles/types'
import { getCombatStyle } from '@c3d.gg/mwi-types/combat-styles/utils'

// Type-safe HRID usage
const rangedStyle: CombatStyleHrid = '/combat_styles/ranged'

// Get specific combat style
const ranged = getCombatStyle('/combat_styles/ranged')
console.log(ranged?.name) // "Ranged"

// Get all combat styles
const allStyles = getCombatStylesArray()
console.log(allStyles.length) // 6

// Iterate over all HRIDs
COMBAT_STYLE_HRIDS.forEach((hrid) => {
	const style = getCombatStyle(hrid)
	console.log(`${style.name}: ${style.sortIndex}`)
})
```

## Testing Strategy

- **Configuration validation**: Verify generator config is correct
- **Data extraction**: Test entity extraction from source data
- **Property mapping**: Verify all fields are mapped correctly
- **Type generation**: Ensure interfaces generate without errors
- **Utility functions**: Test all generated utilities work correctly
- **Edge cases**: Handle null/undefined values properly

## Performance

- **Dataset size**: 6 entities (very small)
- **Generation time**: < 100ms
- **Bundle impact**: Minimal (&lt; 2KB per import)
- **Tree-shaking**: Full support for individual imports

## Related Generators

**Used by:**

- `abilities` - References combat styles in ability effects
- `actions` - May reference combat styles for action categorization
- `monsters` - May reference combat styles for combat mechanics

**Uses:**

- None (no dependencies)
