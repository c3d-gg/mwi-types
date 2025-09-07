# ItemLocations Generator

## Overview

Generates type definitions for item locations (equipment slots) in the game. Item locations define where items can be equipped on a character.

## Source Data

- **Source Key**: `itemLocationDetailMap`
- **Entity Count**: 26 item locations
- **Dependencies**: None

## Structure

### Entity Properties

- `hrid`: Unique identifier (ItemLocationHrid)
- `name`: Display name
- `type`: Location type (e.g., "/item_location_types/equipment")
- `isTool`: Whether this slot is for tools
- `isMultiItem`: Whether multiple items can be equipped in this slot
- `conflictingOtherItemLocationHrids`: Array of locations that conflict with this one

### Categories

- **Tool Locations**: Slots for tools (isTool: true)
- **Multi-Item Locations**: Slots supporting multiple items (isMultiItem: true)
- **Equipment Locations**: Standard equipment slots

## Generated Files

- `types.ts`: ItemLocation interface and ItemLocationHrid type
- `constants.ts`: ITEM_LOCATION_HRIDS, TOOL_ITEM_LOCATION_HRIDS, MULTI_ITEM_LOCATION_HRIDS
- `data.ts`: Lazy-loaded item location records
- `lookups.ts`: Static lookup tables
- `utils.ts`: Utility functions for filtering and searching

## Usage Examples

```typescript
import { TOOL_ITEM_LOCATION_HRIDS } from '@c3d.gg/mwi-types/itemlocations/constants'
import { getItemLocation } from '@c3d.gg/mwi-types/itemlocations/utils'

// Get a specific location
const weaponSlot = getItemLocation('/item_locations/weapon')

// Get all tool locations
const toolLocations = getItemLocationsByTool(true)

// Get multi-item slots
const multiSlots = getItemLocationsByMultiItem(true)

// Check for conflicts
const conflicts = getConflictingLocations('/item_locations/main_hand')
```
