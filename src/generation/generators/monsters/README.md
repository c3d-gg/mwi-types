# Monsters Generator

**Status**: 🚧 In Development  
**Complexity**: Complex (77 entities, multi-dependency)  
**Source Key**: `combatMonsterDetailMap`  
**Dependencies**: CombatStyles✅, DamageTypes✅, Abilities✅, Items✅

## 🎯 Purpose

Generates TypeScript types and utilities for combat monsters in Milky Way Idle. Monsters are complex entities with combat statistics, abilities, damage types, and drop tables.

## 📊 Source Data Analysis

### Data Structure

- **Source**: `combatMonsterDetailMap` in game_data.json
- **Count**: 77 monsters
- **Type**: Complex nested objects with combat mechanics

### Sample Entity Structure

```json
{
  "hrid": "/monsters/abyssal_imp",
  "name": "Abyssal Imp",
  "enrageTime": 180000000000,
  "experience": 240,
  "combatDetails": {
    "currentHitpoints": 1800,
    "maxHitpoints": 1800,
    "attackInterval": 2803738317,
    "combatLevel": 156,
    "combatStats": {
      "combatStyleHrids": ["/combat_styles/magic"],
      "damageType": "/damage_types/fire"
    }
  },
  "abilities": [{
    "abilityHrid": "/abilities/fireball",
    "level": 20,
    "minDifficultyTier": 0
  }],
  "dropTable": [{
    "itemHrid": "/items/coin",
    "dropRate": 0.8,
    "minCount": 500,
    "maxCount": 2500
  }],
  "rareDropTable": [...]
}
```

## 🏗️ Generated Exports

### Types (`types.ts`)

```typescript
// Main entity interface
export interface Monster {
	hrid: MonsterHrid
	name: string
	enrageTime: number
	experience: number
	combatDetails: CombatDetails
	abilities: MonsterAbility[]
	dropTable: DropTable[]
	rareDropTable: DropTable[]
}

// Nested interfaces
export interface CombatDetails {
	currentHitpoints: number
	maxHitpoints: number
	combatLevel: number
	combatStats: CombatStats
	// ... all combat stats
}

export interface CombatStats {
	combatStyleHrids: CombatStyleHrid[]
	damageType: DamageTypeHrid
	attackInterval: number
	// ... various combat modifiers
}

export interface MonsterAbility {
	abilityHrid: AbilityHrid
	level: number
	minDifficultyTier: number
}

// HRID type export
export type MonsterHrid = string & { __brand: 'MonsterHrid' }
```

### Constants (`constants.ts`)

```typescript
export const MONSTER_HRIDS: readonly MonsterHrid[]
export const MONSTER_NAMES: readonly string[]

// Categories (if applicable)
export const BOSS_MONSTER_HRIDS: readonly MonsterHrid[]
export const ELEMENTAL_MONSTER_HRIDS: readonly MonsterHrid[]
```

### Data (`data.ts`)

```typescript
export const getMonsters: () => Promise<Record<MonsterHrid, Monster>>
```

### Lookups (`lookups.ts`)

```typescript
export const MONSTER_BY_COMBAT_LEVEL: Record<number, MonsterHrid[]>
export const MONSTER_BY_DAMAGE_TYPE: Record<DamageTypeHrid, MonsterHrid[]>
```

### Utilities (`utils.ts`)

```typescript
// Standard utilities
export function getMonstersByDamageType(damageType: DamageTypeHrid): Monster[]
export function getMonstersByCombatLevel(
	minLevel: number,
	maxLevel?: number,
): Monster[]
export function getMonstersWithAbility(abilityHrid: AbilityHrid): Monster[]
export function getMonstersByDropItem(itemHrid: ItemHrid): Monster[]
export function toMap(
	record: Record<MonsterHrid, Monster>,
): Map<MonsterHrid, Monster>

// Combat-specific utilities
export function getMonsterCombatLevel(monster: Monster): number
export function getMonsterMaxHitpoints(monster: Monster): number
export function getMonsterExperienceReward(monster: Monster): number
```

## 🔗 Dependencies

### Import Sources

- **CombatStyleHrid** from `../combatsyles/types`
- **DamageTypeHrid** from `../damagetypes/types`
- **AbilityHrid** from `../abilities/types`
- **ItemHrid** from `../items/types`
- **DropTable** from `../sharedtypes/types` (shared interface)

### Domain Boundaries

- Monsters owns ONLY monster types
- NO re-exports of other domain types
- Direct imports from source domains only

## 🎮 Usage Examples

```typescript
// Consumer usage examples
import { getMonsters } from '@c3d.gg/mwi-types/monsters/data'
import { getMonstersByDamageType } from '@c3d.gg/mwi-types/monsters/utils'

import type { Monster, MonsterHrid } from '@c3d.gg/mwi-types/monsters/types'

// Load monsters
const monsters = await getMonsters()
const abyssalImp = monsters['/monsters/abyssal_imp' as MonsterHrid]

// Find fire-damage monsters
const fireMonsters = getMonstersByDamageType(
	'/damage_types/fire' as DamageTypeHrid,
)

// Combat calculations
const combatLevel = getMonsterCombatLevel(abyssalImp)
const maxHp = getMonsterMaxHitpoints(abyssalImp)
```

## 🧪 Testing Strategy

### Data Extraction Tests

- Verify 77 monsters extracted correctly
- Validate HRID format (`/monsters/*`)
- Test required fields present
- Test nested object structure

### Type Generation Tests

- Verify TypeScript interfaces generated
- Test HRID type exports
- Validate imported dependency types
- Test complex nested interfaces

### Utility Tests

- Test filtering by damage type
- Test combat level ranges
- Test ability and drop table lookups
- Test O(1) Map conversion

### Integration Tests

- Test imports from dependency modules
- Verify shared types usage (DropTable)
- Test domain boundary compliance

## ⚡ Performance Characteristics

- **Dataset Size**: 77 entities (medium)
- **Generation Time**: ~1-2 seconds (complex structure)
- **Bundle Impact**: ~15-20KB (with tree-shaking)
- **Memory Usage**: Lazy-loaded Record structure

## 🔧 Generator Configuration

```typescript
// Expected configuration
{
  entityName: 'Monster',
  entityNamePlural: 'Monsters',
  sourceKey: 'combatMonsterDetailMap',

  sharedTypes: ['DropTable'],

  utilityTemplates: [
    { type: 'getByField', field: 'damageType' },
    { type: 'sortBy', field: 'combatLevel' },
    { type: 'filterBy' },
    { type: 'toMap' }
  ],

  // May need custom extraction due to complex nested structure
  applyDataCleaning: false  // Complex entity handling
}
```

## 🚨 Implementation Notes

### Complexity Indicators

- **Complex nested objects** (combatDetails, combatStats)
- **Multiple array relationships** (abilities, dropTable, rareDropTable)
- **Cross-domain type references** (4 different domains)
- **Rich combat mechanics data**

### Special Considerations

- May need custom `extractEntities()` override for complex data transformation
- DropTable is shared type - import from sharedtypes
- Combat stats have many optional fields - careful with type safety
- Large nested structure - consider interface decomposition

### Data Cleaning Strategy

- Use `applyDataCleaning: false` - this is a complex entity
- Manual validation of nested object structure
- Careful handling of optional vs required combat stats

---

**Phase**: 📋 Planning Complete  
**Next**: Write comprehensive test suite (generator.test.ts)  
**Estimated Implementation**: 2-3 hours (complex structure)
