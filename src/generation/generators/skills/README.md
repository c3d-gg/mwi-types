# Skills Generator

## Purpose

The Skills generator creates TypeScript types and utilities for game skills in Milky Way Idle. Skills are fundamental game mechanics that define player progression paths and are used extensively throughout the game system.

## Source Data Analysis

**Entity**: `skillDetailMap` from `game_data.json`
**Count**: 18 skills
**Complexity**: Simple (no dependencies, flat structure)

### Sample Entity Structure
```json
{
  "hrid": "/skills/alchemy",
  "name": "Alchemy", 
  "isSkilling": true,
  "isCombat": false,
  "sortIndex": 10
}
```

### All Properties
- `hrid`: Human-readable ID (e.g., "/skills/alchemy")
- `name`: Display name (e.g., "Alchemy")
- `isSkilling`: Boolean indicating if this is a skilling activity
- `isCombat`: Boolean indicating if this is a combat skill
- `sortIndex`: Numeric sort order for UI display

## Generated Exports

### Types (`types.ts`)
```typescript
export interface Skill {
  hrid: SkillHrid
  name: string
  isSkilling: boolean
  isCombat: boolean
  sortIndex: number
}

export type SkillHrid = 
  | "/skills/alchemy"
  | "/skills/brewing"
  | "/skills/cooking"
  // ... all 18 skill HRIDs
```

### Constants (`constants.ts`)
```typescript
export const SKILL_HRIDS: readonly SkillHrid[]
export const SKILLING_SKILL_HRIDS: readonly SkillHrid[]  // isSkilling === true
export const COMBAT_SKILL_HRIDS: readonly SkillHrid[]    // isCombat === true
```

### Data Collection (`data.ts`)
```typescript
export const SKILLS_RECORD: Record<SkillHrid, Skill>
export function getSkillsRecord(): Record<SkillHrid, Skill>
```

### Utility Functions (`utils.ts`)
```typescript
// Standard utilities from templates
export function getSkill(hrid: SkillHrid): Skill | undefined
export function requireSkill(hrid: SkillHrid): Skill
export function getAllSkills(): Skill[]
export function isSkillHrid(value: string): value is SkillHrid
export function toSkillsMap(record: Record<SkillHrid, Skill>): Map<SkillHrid, Skill>

// Category filtering
export function getSkillingSkills(): Skill[]     // isSkilling === true
export function getCombatSkills(): Skill[]       // isCombat === true  

// Sorting utilities
export function getSkillsSortedByIndex(): Skill[]
export function getSkillsSortedByName(): Skill[]

// Generic filtering
export function filterSkills(predicate: (skill: Skill) => boolean): Skill[]
```

### Lookup Tables (`lookups.ts`)
```typescript
export const SKILL_NAME_BY_HRID: Record<SkillHrid, string>
export const SKILL_HRID_BY_NAME: Record<string, SkillHrid>
```

## Dependencies

**None** - Skills is a foundational module with no external dependencies.

## Usage Examples

### Basic Usage
```typescript
import { getSkill, requireSkill } from '@c3d.gg/mwi-types/skills/utils'
import { SKILL_HRIDS } from '@c3d.gg/mwi-types/skills/constants'
import type { Skill, SkillHrid } from '@c3d.gg/mwi-types/skills/types'

// Safe access
const alchemy = getSkill('/skills/alchemy')
if (alchemy) {
  console.log(`${alchemy.name} (sort: ${alchemy.sortIndex})`)
}

// Required access (throws if not found)
const cooking = requireSkill('/skills/cooking')
```

### Category Filtering
```typescript
import { getSkillingSkills, getCombatSkills } from '@c3d.gg/mwi-types/skills/utils'

// Get all skilling vs combat skills
const skillingSkills = getSkillingSkills()
const combatSkills = getCombatSkills()

console.log(`${skillingSkills.length} skilling skills`)
console.log(`${combatSkills.length} combat skills`)
```

### Performance-Critical Usage
```typescript
import { getSkillsRecord, toSkillsMap } from '@c3d.gg/mwi-types/skills/utils'

// For frequent lookups, convert to Map for O(1) access
const skillsMap = toSkillsMap(getSkillsRecord())
const fastLookup = skillsMap.get('/skills/alchemy')
```

### Integration with Other Modules
```typescript
// Skills are referenced by other modules via SkillHrid type
import type { SkillHrid } from '@c3d.gg/mwi-types/skills/types'
import { requireSkill } from '@c3d.gg/mwi-types/skills/utils'

function processSkillRequirement(skillHrid: SkillHrid, level: number) {
  const skill = requireSkill(skillHrid)
  return `Requires ${skill.name} level ${level}`
}
```

## Testing Strategy

### Data Extraction Tests
- Verify all 18 skills are extracted from source
- Validate each property is correctly mapped
- Test edge cases (missing properties, invalid data)

### Type Generation Tests  
- Confirm SkillHrid union type includes all HRIDs
- Validate Skill interface matches source data structure
- Test type safety and IntelliSense support

### Utility Function Tests
- Test all getter functions (get, require, getAll)
- Validate category filtering (skilling vs combat)
- Test sorting utilities
- Verify Map conversion functionality

### Integration Tests
- Test usage as dependency in other modules
- Validate tree-shaking works correctly
- Performance benchmarking for large-scale usage

## Performance Characteristics

- **Dataset Size**: Small (18 entities)
- **Memory Usage**: Minimal (<1KB)
- **Generation Time**: <100ms
- **Tree-shaking**: Fully compatible
- **Bundle Impact**: Negligible for most use cases

## Generator Configuration

```typescript
{
  entityName: 'Skill',
  entityNamePlural: 'Skills',
  sourceKey: 'skillDetailMap',
  sharedTypes: [], // No shared types needed
  categoryFilters: [
    { name: 'skilling', condition: (skill: any) => skill.isSkilling },
    { name: 'combat', condition: (skill: any) => skill.isCombat }
  ],
  utilityTemplates: [
    { type: 'getByField', field: 'isSkilling' },
    { type: 'getByField', field: 'isCombat' },
    { type: 'sortBy', field: 'sortIndex' },
    { type: 'sortBy', field: 'name' },
    { type: 'filterBy' },
    { type: 'toMap' }
  ]
}
```

## Notes

- Skills serve as the foundation for many other game systems
- The `sortIndex` property is crucial for UI display order
- Clean boolean categorization makes filtering straightforward
- No circular dependencies make this ideal for early-phase generation
- Perfect test case for new TDD workflow due to simplicity

**Estimated Development Time**: 2-3 hours following TDD workflow  
**Risk Level**: Low (simple, well-defined structure)  
**Dependencies**: None  
**Dependents**: Actions, Recipes, Items (and many others)