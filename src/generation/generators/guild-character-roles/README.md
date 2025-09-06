# Guild Character Roles Generator

## Purpose

Generates TypeScript types and utilities for guild character roles, which define permission hierarchies and role-based access control within guilds.

## Source Data

Reads from `guildCharacterRoleDetailMap` in game_data.json:

```json
{
	"hrid": "general",
	"name": "General",
	"permissionTier": 3,
	"promoteRole": "",
	"demoteRole": "officer",
	"canEditName": false,
	"canEditNotice": true,
	"canPromote": true,
	"canDemote": true,
	"canKick": true,
	"canInvite": true,
	"sortIndex": 2
}
```

**Dataset Size**: 4 roles (member, officer, general, leader)

## Generated Exports

### Types (`types.ts`)

- `GuildCharacterRole` - Complete role interface with permissions
- `GuildCharacterRoleHrid` - Union type of role identifiers

### Constants (`constants.ts`)

- `GUILD_CHARACTER_ROLE_HRIDS` - Array of all role HRIDs
- Category arrays for filtering

### Data (`data.ts`)

- `getGuildCharacterRolesRecord()` - Lazy-loaded Record<GuildCharacterRoleHrid, GuildCharacterRole>

### Utilities (`utils.ts`)

- `getGuildCharacterRolesByTier()` - Filter by permission tier
- `getGuildCharacterRolesSortedByIndex()` - Sorted by display order
- `toMap()` - Convert Record to Map for O(1) lookups

### Lookups (`lookups.ts`)

- Role hierarchy and promotion/demotion mappings

## Dependencies

None - this is a Layer 3 simple generator with no external dependencies.

## Usage Examples

```typescript
import { getGuildCharacterRolesRecord } from '@c3d.gg/mwi-types/guild-character-roles/data'

import type { GuildCharacterRoleHrid } from '@c3d.gg/mwi-types/guild-character-roles/types'

// Get all roles
const roles = getGuildCharacterRolesRecord()
const leaderRole = roles['leader']

// Check permissions
if (leaderRole.canPromote) {
	// Allow promotion action
}

// Role hierarchy checks
const isHighTier = leaderRole.permissionTier >= 3
```

## Testing Strategy

- Data extraction validation (4 roles expected)
- Type generation without errors
- Permission boolean verification
- Role hierarchy relationships
- Utility function correctness

## Performance

- **Dataset**: Very small (4 entities)
- **Bundle impact**: Minimal (<1KB)
- **Generation time**: <100ms
- **Tree-shaking**: Fully compatible
