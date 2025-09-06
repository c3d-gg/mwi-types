# MWI Types Architecture Document - v1.0
**THIS IS THE SOURCE OF TRUTH FOR ALL DEVELOPMENT DECISIONS**

## 🎯 CRITICAL PRINCIPLES

### 1. **TREE-SHAKING IS MANDATORY**
- **NO BARREL EXPORTS** - They break tree-shaking and add 2MB+ to bundles
- Each module exports individual files (types, utils, constants, lookups)
- Consumers import exactly what they need: `import { getAction } from '@c3d.gg/mwi-types/actions/utils'`
- Every architectural decision must consider tree-shaking impact

### 2. **DOMAIN CONTROL IS SACRED**
- Each generator owns ONLY its domain
- **NEVER** re-export types from other domains
- **NEVER** create type aliases for other domains
- **ALWAYS** import directly from the source domain
- Example: Actions needs ItemHrid? Import from `../items/types`, NOT re-export

### 3. **RECORDS ARE THE DEFAULT**
- All collections use `Record<Hrid, Entity>` as primary structure
- Maps available via utility for O(1) performance needs
- Pattern: `getActionsRecord()` → Record, `toMap(record)` → Map

## 📐 Architecture Overview

```
src/
├── generation/
│   ├── core/                    # Core infrastructure
│   │   ├── generator.base.modular.ts  # Base class with hooks
│   │   ├── module-builder.ts          # File generation orchestrator
│   │   ├── ast-builder.ts             # TypeScript AST manipulation
│   │   ├── utility-templates.ts       # Reusable utility patterns
│   │   └── types.ts                   # Core type definitions
│   └── generators/              # Individual generators
│       ├── *.generator.modular.ts     # Standard generators
│       └── special/                    # Special case generators
│           ├── player-data.generator.ts
│           ├── translations.generator.ts
│           └── shared-types.generator.ts
└── generated/                   # Output (git-ignored)
    ├── sharedtypes/            # Shared type definitions
    │   ├── types.ts            # Shared interfaces
    │   └── index.ts            # Module exports
    ├── [entity]/               # Per-entity modules
    │   ├── types.ts            # TypeScript interfaces
    │   ├── constants.ts        # HRID arrays and categories
    │   ├── data.ts             # Lazy-loaded Record data
    │   ├── lookups.ts          # Static lookup tables
    │   ├── utils.ts            # Utility functions
    │   └── index.ts            # Module exports (tree-shakeable)
    └── index.ts                # Package entry (explicit exports)
```

## 🏗️ Generator Configuration System

```typescript
interface GeneratorConfig {
  // === REQUIRED ===
  entityName: string              // Singular (e.g., "Action")
  entityNamePlural: string        // Plural (e.g., "Actions")
  sourceKey: string               // Key in source data file
  
  // === FEATURE FLAGS (all default to true) ===
  generateHrids?: boolean         // Generate HRID constants
  generateCollection?: boolean    // Generate data collection
  generateConstants?: boolean     // Generate constant arrays
  generateUtils?: boolean         // Generate utility functions
  generateLookups?: boolean       // Generate lookup tables
  
  // === CUSTOMIZATION ===
  interfaces?: InterfaceConfig[]      // Additional interfaces
  sharedTypes?: string[]              // Which shared types to import
  categoryFilters?: CategoryFilter[]  // Auto-generate categories
  utilityTemplates?: UtilityTemplate[] // Standard utilities to include
  customUtilities?: UtilityConfig[]   // Additional custom utilities
}
```

## 🪝 Hook System (No More Full Overrides!)

```typescript
abstract class ModularBaseGenerator<T> {
  // === LIFECYCLE HOOKS ===
  protected beforeGenerate?(): void
  protected afterGenerate?(): void
  
  // === DEFINITION HOOKS (return additional definitions) ===
  protected defineInterfaces?(): InterfaceDefinition[]
  protected defineConstants?(): ConstantDefinition[]
  protected defineLookups?(): LookupDefinition[]
  protected defineUtilities?(): UtilityDefinition[]
  
  // === EXTENSION HOOKS (modify existing) ===
  protected extendTypes?(builder: TypeBuilder): void
  protected extendConstants?(builder: ConstantBuilder): void
  protected extendLookups?(builder: LookupBuilder): void
  protected extendUtilities?(builder: UtilityBuilder): void
  
  // === DATA TRANSFORMATION ===
  protected transformEntity?(raw: any): T
  protected shouldIncludeEntity?(entity: T): boolean
}
```

## 🔄 Shared Types Module

**Rule**: If 2+ generators need the same type → Goes in `sharedtypes`

### Currently Identified Shared Types:
```typescript
// Combat & Game Mechanics
export interface DropTable { itemHrid, dropRate, minCount, maxCount }
export interface LevelRequirement { skillHrid, level }
export interface ExperienceGain { skillHrid, value }

// Items & Actions
export interface ActionItem { itemHrid, count }
export interface EnhancementSlot { slotNumber, enhancementHrid }

// Combat Spawning
export interface SpawnInfo { monsterHrid, rate, strength }
export interface RandomSpawnInfo { maxCount, maxStrength, spawns }

// Buffs & Effects
export interface BuffEffect { typeHrid, value, duration }
export interface StatModifier { stat, value, operation }
```

### Shared Types Generator:
- Automatically identifies types used by multiple generators
- Generates clean interfaces with proper imports
- Maintains domain boundaries (imports ItemHrid from items, not redefines)

## 🛠️ Utility Function Templates

### Standard Templates (80% Coverage):
```typescript
// 1. GET BY FIELD - Filter by any property
getActionsByType(type: ActionType): Action[]
getItemsByCategory(category: ItemCategory): Item[]

// 2. GET ALL WITH - Filter by property existence
getItemsWithSellPrice(): Item[]
getActionsWithCombatInfo(): Action[]

// 3. SORT BY - Sort by any field
getActionsSortedByLevel(): Action[]
getItemsSortedByValue(): Item[]

// 4. FILTER BY - Custom predicate
filterActions(predicate: (action: Action) => boolean): Action[]
filterItems(predicate: (item: Item) => boolean): Item[]

// 5. TO MAP - Convert Record to Map for O(1) lookups
toMap<K, V>(record: Record<K, V>): Map<K, V>
getActionsMap(): Map<ActionHrid, Action>  // Convenience wrapper
```

### Template Configuration:
```typescript
interface UtilityTemplate {
  type: 'getByField' | 'getAllWith' | 'sortBy' | 'filterBy'
  field?: string           // Which field to operate on
  condition?: string       // Condition for filtering
  customLogic?: (writer: CodeWriter) => void
}
```

## 🎭 Special Case Generators

### 1. **PlayerData** (Singleton)
- No HRID generation (single instance)
- No collection (not an array of players)
- Imports types from other domains (Skills, Items)
- Custom structure for runtime player state

### 2. **Translations** (Localization)
- Completely different structure
- Handles multiple locales
- Generates typed translation keys
- Special lazy-loading for locale data

### 3. **SharedTypes** (Cross-Domain)
- Generates shared type definitions
- No data collection
- Pure type exports

### 4. **Index** (Package Entry)
- Aggregates explicit exports
- NO barrel exports
- Tree-shakeable structure
- May not need full generator

## 📦 Implementation Phases

> **Related Documents**: 
> - [GENERATOR_ANALYSIS.md](./GENERATOR_ANALYSIS.md) - Investigation findings
> - [PROJECT_PROGRESS.md](./PROJECT_PROGRESS.md) - **Live progress tracking and decisions**

### Phase 1: Core Infrastructure ⚡ CURRENT PHASE
**Goal**: Build the foundation that enables all other improvements

#### Tasks:
- [ ] Extend GeneratorConfig interface with new options
- [ ] Implement hook system in ModularBaseGenerator
- [ ] Create utility template system
- [ ] Add Record/Map conversion utilities
- [ ] Update ModuleBuilder for better automation

#### Files to modify:
- `src/generation/core/types.ts` - Add new config interfaces
- `src/generation/core/generator.base.modular.ts` - Add hooks
- `src/generation/core/utility-templates.ts` - NEW FILE
- `src/generation/core/module-builder.ts` - Enhance automation

### Phase 2: Shared Types Module
**Goal**: Eliminate type duplication across generators

#### Tasks:
- [ ] Create SharedTypes generator
- [ ] Identify all shared types (DropTable, LevelRequirement, etc.)
- [ ] Generate shared types module
- [ ] Update all generators to import from sharedtypes

#### Shared types to extract:
- `DropTable` (Actions, Items, Recipes, Monsters)
- `LevelRequirement` (Actions, Recipes)
- `ExperienceGain` (Actions, Recipes)
- `ActionItem` (Actions, Recipes)
- `SpawnInfo`, `RandomSpawnInfo` (Actions, possibly others)
- `Buff` structures (multiple generators)

### Phase 3: Migrate Simple Generators (Layer 1)
**Goal**: Test new system with simplest generators

#### Generators to migrate (no dependencies):
- [ ] Skills
- [ ] DamageTypes
- [ ] CombatStyles
- [ ] GuildCharacterRoles
- [ ] Avatars
- [ ] AvatarOutfits
- [ ] ChatChannelTypes
- [ ] EquipmentTypes
- [ ] ItemCategories
- [ ] ItemLocations
- [ ] NameColors
- [ ] ShopCategories

### Phase 4: Migrate Dependent Generators (Layers 2-4)
**Goal**: Handle increasingly complex dependencies

#### Layer 2 (single dependency):
- [ ] Items (depends on Skills)
- [ ] CommunityBuffs (depends on BuffTypes)
- [ ] ShopItems (depends on Items)
- [ ] TaskShopItems (depends on Items)

#### Layer 3 (multiple dependencies):
- [ ] Actions (Skills, Items, Categories, Buffs)
- [ ] HouseRooms (Skills, Items, Actions, Buffs)
- [ ] Monsters (Items, Abilities, DamageTypes, CombatStyles)

#### Layer 4 (complex):
- [ ] Recipes (Skills, Items, Actions, Categories)

### Phase 5: Special Cases
**Goal**: Handle non-standard generators

- [ ] PlayerData (singleton, imports from others)
- [ ] Translations (localization system)
- [ ] Index (package entry point)

### Phase 6: Documentation & Testing
**Goal**: Ensure quality and maintainability

#### Tasks:
- [ ] Create example generator in docs/
- [ ] Add JSDoc to all public APIs
- [ ] Write migration guide
- [ ] Bundle size analysis
- [ ] Tree-shaking verification
- [ ] Integration tests

### Migration Checklist per Generator:
```markdown
## Generator: [NAME]
- [ ] Replace getXxxMap() with getXxxRecord()
- [ ] Add toMap() utility function
- [ ] Import shared types from ../sharedtypes/types
- [ ] Remove duplicated type definitions
- [ ] Convert full overrides to hooks
- [ ] Use utility templates where applicable
- [ ] Add JSDoc documentation
- [ ] Fix import paths (no re-exports)
- [ ] Test tree-shaking
- [ ] Verify bundle size impact
```

## 🚀 Implementation Priorities

### MUST HAVE (v1.0):
1. Hook system implementation
2. Record-based data with Map utilities
3. Shared types module
4. Tree-shakeable exports
5. Domain control enforcement

### NICE TO HAVE (v1.1+):
1. Utility function templates
2. Auto-generated documentation
3. Bundle size reporting
4. Type coverage metrics
5. Generator validation tools

## 📝 Example: Ideal Generator

```typescript
import { ModularBaseGenerator } from '../core/generator.base.modular'

export class ItemsGenerator extends ModularBaseGenerator<Item> {
  constructor() {
    super({
      entityName: 'Item',
      entityNamePlural: 'Items',
      sourceKey: 'itemDetailMap',
      
      // Import shared types we need
      sharedTypes: ['DropTable', 'EnhancementSlot'],
      
      // Auto-generate category arrays
      categoryFilters: [
        { name: 'tradeable', field: 'isTradeable', value: true },
        { name: 'equipment', field: 'equipmentType', exists: true },
        { name: 'consumable', field: 'category', value: 'consumable' }
      ],
      
      // Use standard utility templates
      utilityTemplates: [
        { type: 'getByField', field: 'category' },
        { type: 'getByField', field: 'equipmentType' },
        { type: 'getAllWith', field: 'sellPrice' },
        { type: 'sortBy', field: 'sortIndex' }
      ]
    })
  }
  
  // Only define what's unique to Items
  protected defineInterfaces(): InterfaceDefinition[] {
    return [
      {
        name: 'ItemStats',
        properties: [
          { name: 'attack', type: 'number' },
          { name: 'defense', type: 'number' }
        ]
      }
    ]
  }
  
  // Add custom utilities beyond templates
  protected extendUtilities(builder: UtilityBuilder): void {
    builder.addFunction({
      name: 'calculateItemValue',
      params: [{ name: 'item', type: 'Item' }],
      returns: 'number',
      body: (writer) => {
        writer.writeLine('// Custom value calculation logic')
      }
    })
  }
}
```

## ✅ Success Metrics

1. **Bundle Size**: < 100KB for typical usage (vs 2MB+ with barrels)
2. **Tree-Shaking**: Unused code eliminated completely
3. **Type Safety**: 100% type coverage
4. **DX Score**: Intuitive imports, clear documentation
5. **Generation Time**: < 5 seconds for full regeneration

## 🔒 Non-Negotiables

1. **NO BARREL EXPORTS** - They destroy tree-shaking
2. **NO DOMAIN VIOLATIONS** - Each module owns its types
3. **NO MAP COLLECTIONS** - Records only, Maps via utility
4. **NO FULL OVERRIDES** - Use hooks and configuration
5. **NO UNDOCUMENTED CODE** - JSDoc everything
6. **NO BACKWARD COMPATIBILITY** - Clean v1.0 break, no legacy support

## ⚡ Clean Break Policy

**This is a complete architectural rewrite from v0.x to v1.0**

- **NO legacy code support** - All old patterns removed
- **NO deprecated methods** - If it's old, it's gone
- **NO gradual migration** - Full commitment to new architecture
- **NO compatibility layers** - Clean, modern codebase only

**Why this matters:**
- Prevents technical debt accumulation
- Forces adoption of better patterns
- Keeps bundle sizes minimal
- Maintains code clarity and maintainability

---

**Version**: 1.0.0
**Status**: APPROVED FOR IMPLEMENTATION
**Last Updated**: 2024
**Next Review**: After Phase 1 Implementation

This document is the single source of truth for all architectural decisions in the MWI Types project.