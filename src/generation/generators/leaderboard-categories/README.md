# LeaderboardCategories Generator

## Purpose

Generates TypeScript types and utilities for leaderboard categories in Milky Way Idle. Leaderboard categories define the different types of leaderboards available in the game, including skill-based and guild leaderboards.

## Source Data

Extracts from `leaderboardCategoryDetailMap` in game_data.json:

```json
{
	"alchemy": {
		"hrid": "alchemy",
		"name": "Alchemy",
		"skillHrid": "/skills/alchemy",
		"isGuild": false,
		"sortIndex": 10
	}
}
```

## Data Structure Analysis

- **Total entities**: 21 leaderboard categories
- **Entity types**: Skill-based leaderboards and guild leaderboards
- **Dependencies**: Skills module (for skillHrid references)
- **Complexity**: Simple - enum-like data with skill references

## Generated Exports

### Types (`types.ts`)

- `LeaderboardCategory` - Main interface for leaderboard category entities
- `LeaderboardCategoryHrid` - Branded type for category identifiers

### Constants (`constants.ts`)

- `LEADERBOARDCATEGORY_HRIDS` - Array of all leaderboard category HRIDs
- `SKILL_LEADERBOARDS` - Categories that track skills (isGuild: false)
- `GUILD_LEADERBOARDS` - Categories for guild competitions (isGuild: true)

### Utilities (`utils.ts`)

- `getLeaderboardCategory(hrid)` - Get category by HRID
- `getAllLeaderboardCategories()` - Get all categories
- `getLeaderboardCategoriesBySkill(skillHrid)` - Filter by skill
- `getSkillLeaderboards()` - Get non-guild categories
- `getGuildLeaderboards()` - Get guild-only categories
- `getLeaderboardCategoriesSortedByIndex()` - Sort by sortIndex

### Data Collection (`data.ts`)

- `getLeaderboardCategoriesRecord()` - Lazy-loaded Record collection

### Lookups (`lookups.ts`)

- `LEADERBOARDCATEGORIES_BY_SKILL` - Lookup table by skillHrid

## Dependencies

- **Skills**: References SkillHrid type for skillHrid property
- **SharedTypes**: Uses standard shared interfaces if applicable

## Usage Examples

```typescript
import {
	getLeaderboardCategoriesBySkill,
	getLeaderboardCategory,
	getSkillLeaderboards,
} from '@c3d.gg/mwi-types/leaderboard-categories/utils'

import type { LeaderboardCategoryHrid } from '@c3d.gg/mwi-types/leaderboard-categories/types'

// Get specific category
const alchemyCategory = getLeaderboardCategory(
	'alchemy' as LeaderboardCategoryHrid,
)

// Get categories for a skill
const alchemyLeaderboards = getLeaderboardCategoriesBySkill('/skills/alchemy')

// Get all skill-based leaderboards (non-guild)
const skillLeaderboards = getSkillLeaderboards()
```

## Testing Strategy

- Entity extraction and transformation
- HRID type generation and safety
- Skill dependency resolution
- Category filtering (skill vs guild)
- Sort index functionality
- Utility function behavior
- Tree-shaking compatibility

## Performance Characteristics

- **Dataset size**: 21 entities (small)
- **Generation time**: <1 second
- **Memory usage**: Minimal
- **Bundle impact**: <5KB when tree-shaken

## Business Context

Leaderboard categories define the competitive aspects of Milky Way Idle:

- **Skill leaderboards**: Track player progress in individual skills
- **Guild leaderboards**: Enable guild-vs-guild competition
- **Sorting**: UI display order via sortIndex
- **Skill integration**: Direct references to skill system for validation

This generator provides the foundation for the leaderboard system, enabling:

- Leaderboard UI generation
- Competition category validation
- Skill progress tracking
- Guild ranking systems
