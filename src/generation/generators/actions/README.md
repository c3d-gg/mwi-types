# Actions Generator Module

## 📋 Purpose
Generates TypeScript types, utilities, constants, and lookups for game actions. Actions represent all activities players can perform in the game, from combat encounters to crafting recipes to gathering resources.

## 📊 Source Data Structure
Reads from `game_data.json` → `actionDetailMap`

**Sample Source Data:**
```json
{
  "actionDetailMap": {
    "/actions/combat/imp": {
      "name": "Imp",
      "function": "/action_functions/combat", 
      "type": "/action_types/combat",
      "category": "/action_categories/combat",
      "levelRequirement": {
        "skillHrid": "/skills/attack",
        "level": 1
      },
      "baseTimeCost": 4000,
      "experienceGain": {
        "skillHrid": "/skills/attack", 
        "value": 5
      },
      "combatZoneInfo": {
        "isDungeon": false,
        "fightInfo": { /* combat data */ }
      }
    }
  }
}
```

## 🏗️ Generated Exports

### Types (`types.ts`)
- **`Action`** - Main action interface with all properties
- **`ActionHrid`** - Union type of all action HRIDs
- **`ActionFunction`** - Union of action functions (combat, gathering, production, etc.)
- **`ActionType`** - Union of action types (combat, alchemy, crafting, etc.)  
- **`FightInfo`** - Combat encounter details
- **`DungeonInfo`** - Dungeon-specific information
- **`CombatZoneInfo`** - Combat zone configuration

### Constants (`constants.ts`)
- **`ACTION_HRIDS`** - Array of all action HRIDs
- **`ACTION_FUNCTIONS`** - Array of all action functions
- **`ACTION_TYPES`** - Array of all action types
- **`ACTION_CATEGORIES`** - Array of all action categories
- **`COMBAT`** - Array of combat action HRIDs (filtered)
- **`NONCOMBAT`** - Array of non-combat action HRIDs (filtered)
- **`PRODUCTION`** - Array of production action HRIDs (filtered)
- **`GATHERING`** - Array of gathering action HRIDs (filtered)

### Data (`data.ts`)
- **`getActionsRecord()`** - Lazy-loaded Record<ActionHrid, Action>
- Raw action data in Record format for tree-shaking

### Utilities (`utils.ts`)
**Basic CRUD:**
- `isActionHrid(value)` - Type guard
- `getAction(hrid)` - Safe getter
- `requireAction(hrid)` - Getter with error
- `getAllActions()` - Get all actions as array
- `toActionsMap()` - Convert Record to Map

**Generated from Templates:**
- `getActionsByCategory(category)` - Filter by category
- `getActionsByType(type)` - Filter by type  
- `getActionsBySkillHrid(skillHrid)` - Filter by skill
- `getActionsWithCombatZoneInfo()` - Get combat actions
- `getActionsSortedBySortIndex()` - Sorted by display order
- `filterActions(predicate)` - Custom filtering

**Custom Action-Specific:**
- `getActionsBySkill(skillHrid)` - Using skill lookup table
- `getCombatActions()` - All combat encounters
- `getProductionActions()` - All crafting/production
- `getGatheringActions()` - All resource gathering
- `getDungeonActions()` - All dungeon encounters

### Lookups (`lookups.ts`)
- **`ACTIONS_BY_SKILL`** - Mapping: SkillHrid → ActionHrid[]
- **`ACTIONS_BY_CATEGORY`** - Mapping: ActionCategoryHrid → ActionHrid[]
- **`ACTIONS_BY_TYPE`** - Mapping: ActionType → ActionHrid[]
- **`ACTIONS_BY_FUNCTION`** - Mapping: ActionFunction → ActionHrid[]
- Pre-computed lookup tables for O(1) filtering

## 🔗 Dependencies

### Imports FROM other domains:
- `ItemHrid` from `../items/types` - For input/output items
- `SkillHrid` from `../skills/types` - For skill requirements
- `MonsterHrid` from `../monsters/types` - For combat spawns
- `ActionCategoryHrid` from `../actioncategories/types` - For categorization
- `Buff`, `BuffTypeHrid` from `../bufftypes/types` - For action buffs

### Imports FROM shared types:
- `LevelRequirement` - Skill level requirements
- `ExperienceGain` - Experience rewards
- `ActionItem` - Items consumed/produced
- `DropTable` - Random item drops
- `SpawnInfo`, `RandomSpawnInfo` - Combat spawn data

### Exports TO other domains:
- **`ActionHrid`** - Used by recipes, house rooms, player data
- **`Action`** - Used by game logic consuming action data

## 💡 Usage Examples

```typescript
// Basic usage
import { getAction, isActionHrid } from '@c3d.gg/mwi-types/actions/utils'
import type { ActionHrid } from '@c3d.gg/mwi-types/actions/types'

// Type-safe action retrieval
const action = getAction('/actions/combat/imp')
console.log(action?.name) // "Imp"

// Category filtering  
import { getActionsByCategory } from '@c3d.gg/mwi-types/actions/utils'
const combatActions = getActionsByCategory('/action_categories/combat')

// Skill-based filtering
import { getActionsBySkill } from '@c3d.gg/mwi-types/actions/utils'
const attackActions = getActionsBySkill('/skills/attack')

// Performance-critical lookups
import { toActionsMap } from '@c3d.gg/mwi-types/actions/utils'
const actionMap = toActionsMap() // O(1) lookups
const fastLookup = actionMap.get('/actions/combat/imp')

// Tree-shaking friendly imports
import { COMBAT_ACTION_HRIDS } from '@c3d.gg/mwi-types/actions/constants'
import { getActionsWithCombatZoneInfo } from '@c3d.gg/mwi-types/actions/utils'
```

## 🧪 Testing Strategy
- **Data extraction**: Validate parsing of action properties
- **Type generation**: Confirm all types and unions created correctly
- **Shared types**: Verify imports from sharedtypes module  
- **Utilities**: Test all generated and custom utility functions
- **Lookups**: Validate lookup table accuracy and completeness
- **Edge cases**: Handle missing/invalid data gracefully

## 📈 Performance Characteristics
- **Dataset size**: 728 actions (large dataset)
- **Generation time**: ~2 seconds
- **Output size**: ~1MB total across all files
- **Tree-shaking**: Individual utilities can be imported
- **Runtime performance**: O(1) lookups via toActionsMap()

---

**Generated with**: MWI Types v1.0 Architecture  
**Template**: Proof of concept for all other generators  
**Last updated**: 2024-09-06