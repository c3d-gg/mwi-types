# Avatars Generator

**Character appearance system for MilkyWay Idle**

## Purpose

Generates TypeScript types and utilities for avatar/character appearance entities. Avatars are cosmetic character appearances that players can purchase and equip.

## Source Data Analysis

**Entity**: `avatarDetailMap` (85 avatars)
**Complexity**: Simple (Layer 3 - No dependencies)

### Data Structure

```json
{
	"hrid": "/avatars/blue_person_1",
	"cowbellCost": 2000,
	"isSeasonal": false,
	"sortIndex": 51
}
```

### Properties

- **`hrid`**: Avatar identifier (format: `/avatars/name_pattern`)
- **`cowbellCost`**: Purchase cost in cowbells (number)
- **`isSeasonal`**: Whether avatar is seasonally limited (boolean)
- **`sortIndex`**: Display order for UI (number)

## Generated Exports

### Types (`types.ts`)

- `Avatar` - Main avatar interface
- `AvatarHrid` - Typed HRID literal union

### Constants (`constants.ts`)

- `AVATAR_HRIDS` - Array of all avatar HRIDs
- `SEASONAL_AVATAR_HRIDS` - Seasonally limited avatars
- `REGULAR_AVATAR_HRIDS` - Always-available avatars

### Data (`data.ts`)

- `getAvatarsRecord()` - Lazy-loaded Record<AvatarHrid, Avatar>

### Lookups (`lookups.ts`)

- Static lookup tables for performance-critical queries
- Price ranges, seasonal availability, etc.

### Utils (`utils.ts`)

- `getAvatar(hrid)` - Get avatar by HRID
- `isAvatarHrid(hrid)` - Type guard for avatar HRIDs
- `getAvatarsByCost(min, max)` - Filter avatars by price range
- `getSeasonalAvatars()` - Get seasonally limited avatars
- `getRegularAvatars()` - Get always-available avatars
- `getAvatarsSortedByCost()` - Sort avatars by ascending cost
- `toMap(record)` - Convert Record to Map for O(1) lookups

## Dependencies

**None** - This is a Layer 3 generator with zero dependencies on other modules.

## Usage Examples

```typescript
import {
	AVATAR_HRIDS,
	getAvatar,
	getAvatarsByCost,
} from '@c3d.gg/mwi-types/avatars'

// Get specific avatar
const blueAvatar = getAvatar('/avatars/blue_person_1')
// { hrid: '/avatars/blue_person_1', cowbellCost: 2000, ... }

// Filter by price range
const affordableAvatars = getAvatarsByCost(0, 1000)

// Get all seasonal avatars
const seasonalAvatars = getSeasonalAvatars()

// Type-safe HRID usage
const allAvatars: AvatarHrid[] = AVATAR_HRIDS
```

### Shop Integration

```typescript
import {
	getAvatarsSortedByCost,
	getSeasonalAvatars,
} from '@c3d.gg/mwi-types/avatars'

// Display in shop by price
const shopAvatars = getAvatarsSortedByCost()

// Show seasonal section
const limitedTime = getSeasonalAvatars()
```

### Character Customization

```typescript
import { getAvatar, isAvatarHrid } from '@c3d.gg/mwi-types/avatars'

function equipAvatar(playerAvatarHrid: string) {
	if (!isAvatarHrid(playerAvatarHrid)) {
		throw new Error('Invalid avatar HRID')
	}

	const avatar = getAvatar(playerAvatarHrid)
	return avatar
}
```

## Testing Strategy

### Unit Tests

- Data extraction from `avatarDetailMap`
- Type generation and HRID validation
- Utility function correctness
- Edge cases (empty data, invalid HRIDs)
- Duplication prevention (interface, constants, functions)

### Integration Tests

- Tree-shaking compatibility
- Generated file structure validation
- TypeScript compilation success

### Performance Tests

- Bundle size impact (<100KB requirement)
- Lazy-loading functionality
- Lookup table performance

## Performance Characteristics

- **Dataset Size**: 85 avatars (lightweight)
- **Bundle Impact**: Minimal - simple data structure
- **Memory Usage**: Lazy-loaded Record, Map available via utility
- **Query Performance**: O(1) with Map conversion, filtered arrays for searches
- **Tree-shaking**: Full support - import only what you need

## Implementation Notes

- Follows GuildCharacterRoles pattern exactly (proven type safety)
- Uses explicit `defineInterfaces()` to prevent HridHrid bugs
- No data cleaning needed - all properties are meaningful
- Standard utility templates for common operations
- Category filters for seasonal vs regular avatars

## Development Commands

```bash
# Generate this module only
bun run dev generate:single avatars

# Run tests for this module
bun run dev test:generator avatars

# Validate complete health check
bun run dev validate:generator avatars
```
