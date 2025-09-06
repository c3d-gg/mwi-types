# Skills Generator Module

## 📋 Purpose

Generates TypeScript types, utilities, constants, and lookups for game skills. Skills represent the different abilities and proficiencies that players can develop in the game, categorized into combat and non-combat (skilling) activities.

## 📊 Source Data Structure

Reads from `game_data.json` → `skillDetailMap`

**Sample Source Data:**

```json
{
	"skillDetailMap": {
		"/skills/alchemy": {
			"hrid": "/skills/alchemy",
			"name": "Alchemy",
			"isSkilling": true,
			"isCombat": false,
			"sortIndex": 10
		},
		"/skills/attack": {
			"hrid": "/skills/attack",
			"name": "Attack",
			"isSkilling": false,
			"isCombat": true,
			"sortIndex": 1
		}
	}
}
```

## 🏗️ Generated Exports

### Types (`types.ts`)

- **`Skill`** - Main skill interface with all properties
- **`SkillHrid`** - Union type of all skill HRIDs

### Constants (`constants.ts`)

- **`SKILL_HRIDS`** - Array of all skill HRIDs
- **`COMBAT_SKILLS`** - Array of combat skill HRIDs (filtered by isCombat: true)
- **`SKILLING_SKILLS`** - Array of skilling skill HRIDs (filtered by isSkilling: true)

### Data (`data.ts`)

- **`getSkillsRecord()`** - Lazy-loaded Record<SkillHrid, Skill>
- Raw skill data in Record format for tree-shaking

### Utilities (`utils.ts`)

**Basic CRUD:**

- `isSkillHrid(value)` - Type guard
- `getSkill(hrid)` - Safe getter
- `requireSkill(hrid)` - Getter with error
- `getAllSkills()` - Get all skills as array
- `toSkillsMap()` - Convert Record to Map

**Generated from Templates:**

- `getSkillsSortedBySortIndex()` - Sorted by display order
- `filterSkills(predicate)` - Custom filtering

**Custom Skill-Specific:**

- `getCombatSkills()` - All combat skills (isCombat: true)
- `getSkillingSkills()` - All skilling skills (isSkilling: true)

### Lookups (`lookups.ts`)

- **`COMBAT_SKILL_HRIDS`** - Pre-filtered array of combat skills
- **`SKILLING_SKILL_HRIDS`** - Pre-filtered array of skilling skills
- Pre-computed lookup arrays for efficient filtering

## 🔗 Dependencies

### Imports FROM other domains:

- None (Skills is a foundational module with no dependencies)

### Imports FROM shared types:

- None (Skills uses only primitive types)

### Exports TO other domains:

- **`SkillHrid`** - Used by actions, recipes, player data, level requirements
- **`Skill`** - Used by game logic requiring skill information

## 💡 Usage Examples

```typescript
// Basic usage

// Tree-shaking friendly imports
import {
	COMBAT_SKILLS,
	SKILLING_SKILLS,
} from '@c3d.gg/mwi-types/skills/constants'
// "Alchemy"

// Category filtering

// Sorted skills for UI display

// Performance-critical lookups
import {
	getCombatSkills,
	getSkill,
	getSkillingSkills,
	getSkillsSortedBySortIndex,
	isSkillHrid,
	toSkillsMap,
} from '@c3d.gg/mwi-types/skills/utils'

import type { SkillHrid } from '@c3d.gg/mwi-types/skills/types'

// Type-safe skill retrieval
const skill = getSkill('/skills/alchemy')
console.log(skill?.name)

const combatSkills = getCombatSkills()
const skillingSkills = getSkillingSkills()

const sortedSkills = getSkillsSortedBySortIndex()

const skillMap = toSkillsMap() // O(1) lookups
const fastLookup = skillMap.get('/skills/alchemy')
```

## 🧪 Testing Strategy

- **Data extraction**: Validate parsing of skill properties (hrid, name, booleans, sortIndex)
- **Type generation**: Confirm Skill interface and SkillHrid union created correctly
- **Utilities**: Test all generated utility functions
- **Category filtering**: Verify combat vs skilling skill filtering
- **Constants**: Validate generated constant arrays
- **Edge cases**: Handle missing/invalid data gracefully

## 📈 Performance Characteristics

- **Dataset size**: 18 skills (small, foundational dataset)
- **Generation time**: <1 second
- **Output size**: Minimal (simple data structure)
- **Tree-shaking**: Individual utilities can be imported
- **Runtime performance**: O(1) lookups via toSkillsMap()

## 🎯 Design Notes

Skills is designed as a foundational module that many other generators depend on:

- Actions reference skills for level requirements and experience gains
- Recipes reference skills for crafting requirements
- Player data tracks skill levels and experience
- Simple data structure makes it ideal for TDD migration practice

---

**Generated with**: MWI Types v1.0 Architecture  
**Migration status**: TDD Phase 3 (Layer 1 - No Dependencies)  
**Last updated**: 2024-09-06
