# GameModes Generator

**Purpose**: Generates TypeScript types and utilities for game mode configurations (Ironman, Standard, etc.)

## Source Data

Reads from `gameModeDetailMap` in game_data.json.

**Dataset Size**: 3 game modes
**Complexity**: Simple (no dependencies)

**Sample Entity:**

```json
{
	"hrid": "ironcow",
	"name": "Ironcow",
	"description": "The Ironcow game mode is for players who enjoys being self-sufficient...",
	"isCreatable": true,
	"maxCharacterLimit": 3,
	"marketRestricted": true,
	"subsetGameModes": ["legacy_ironcow"],
	"sortIndex": 2
}
```

## Generated Exports

### Types (`types.ts`)

- `GameMode` - Main interface for game mode data
- `GameModeHrid` - Union type of all game mode HRIDs

### Constants (`constants.ts`)

- `GAME_MODE_HRIDS` - Array of all game mode HRIDs
- Category constants for filtering (creatable modes, restricted modes, etc.)

### Data (`data.ts`)

- `getGameModesRecord()` - Lazy-loaded Record<GameModeHrid, GameMode>

### Lookups (`lookups.ts`)

- Static lookup tables for O(1) access patterns

### Utils (`utils.ts`)

- `getGameMode(hrid)` - Get game mode by HRID
- `isGameModeHrid(value)` - Type guard function
- `getCreatableGameModes()` - Filter for modes players can choose
- `getGameModesSortedByIndex()` - Sorted by display order
- `toMap()` - Convert Record to Map for O(1) lookups

## Dependencies

**None** - This is a simple, dependency-free generator.

## Usage Examples

```typescript
import {
	GameMode,
	GameModeHrid,
	getCreatableGameModes,
	getGameMode,
} from '@c3d.gg/mwi-types/game-modes'

// Get specific game mode
const ironMode = getGameMode('/game_modes/ironcow')

// Get all player-selectable modes
const creatableModes = getCreatableGameModes()

// Type-safe HRID usage
const validHrid: GameModeHrid = '/game_modes/standard'
```

## Testing Strategy

- Data extraction from gameModeDetailMap
- Interface generation with correct HRID typing
- Utility function behavior and edge cases
- Category filtering (creatable, restricted, etc.)
- Integration with type system

## Performance

- **Generation Time**: < 1 second
- **Bundle Impact**: < 5KB (3 entities, simple structure)
- **Tree-Shaking**: Full support for selective imports
