# AGENTS.md

This file provides guidance for agentic coding agents operating in this TypeScript type generation repository.

**⚠️ IMPORTANT: We are in the middle of a major v0.x → v1.0 architectural rewrite. This is a CLEAN BREAK with no backward compatibility.**

## 🚀 Project Status: v1.0 Architectural Rewrite

**Current Phase**: Phase 3 - TDD Migration of Simple Generators  
**Progress**: Core infrastructure ✅ | Shared Types ✅ | Actions (Proof of Concept) ✅

### Key v1.0 Changes:

- **Tree-shaking optimization**: From 2MB+ bundles → <100KB target
- **Records over Maps**: `Record<Hrid, Entity>` as primary, `toMap()` utility for O(1) lookups
- **Shared types module**: Eliminates duplication across generators
- **Hook system**: Configuration-driven generation instead of full method overrides
- **Domain control**: Each generator owns ONLY its types - NO re-exports between domains
- **TDD workflow**: 5-phase approach (Understanding → Planning → Testing → Implementation → Validation)

## 🎯 CRITICAL PRINCIPLES (NON-NEGOTIABLES)

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

### 4. **NO FULL METHOD OVERRIDES - USE HOOKS**

- **DON'T** override `generateTypes()`, `generateUtilities()` etc. (internal methods)
- **DO** use `defineInterfaces()`, `defineUtilities()` etc. (hooks that return definitions)
- The `override` keyword is required by TypeScript for type safety - that's fine!
- The principle means: Don't replace entire generation methods, use hooks instead

### 5. **CLEAN BREAK POLICY**

- **NO legacy code support** - All old patterns removed
- **NO deprecated methods** - If it's old, it's gone
- **NO gradual migration** - Full commitment to new architecture
- **NO compatibility layers** - Clean, modern codebase only

## 🛠️ Commands

### Core Development

- **Generate types**: `bun run generate` (full generation)
- **Type check**: `bun run typecheck`
- **Test**: `bun test` (all tests)
- **Clean**: `bun run clean` (removes generated files)

### TDD Development CLI (`bun run dev`)

**ANALYSIS COMMANDS:**

- **Analyze source data**: `bun run dev analyze:source <ENTITY>`
- **Deep entity exploration**: `bun run dev explore:entity <ENTITY>`
- **Generator analysis**: `bun run dev analyze:generator <MODULE>`
- **Generated files analysis**: `bun run dev analyze:generated <MODULE>`

**GENERATOR DEVELOPMENT:**

- **Scaffold generator**: `bun run dev scaffold:generator <MODULE>`
- **Generate single module**: `bun run dev generate:single <MODULE>`
- **Complete validation**: `bun run dev validate:generator <MODULE>`
- **Debug generator**: `bun run dev debug:generator <MODULE>`

**TESTING COMMANDS:**

- **Run generator tests**: `bun run dev test:generator <MODULE>`
- **Test tree-shaking**: `bun run dev test:treeshaking <MODULE>`

**INVESTIGATION COMMANDS:**

- **Log investigation**: `bun run dev investigate:entity <ENTITY> <MODULE>`

## 🏗️ Architecture (v1.0)

### ⚡ Hook System Clarification (CRITICAL TO UNDERSTAND)

**What "No Full Overrides" means:**

- ❌ **DON'T** override `generateTypes()`, `generateUtilities()` etc. (internal generation methods)
- ✅ **DO** use `defineInterfaces()`, `defineUtilities()` etc. (hooks that return definitions)
- ✅ **DO** use TypeScript's `override` keyword (required for type safety)

**Example of CORRECT usage:**

```typescript
// ✅ CORRECT - Using hooks
protected override defineInterfaces(): InterfaceDefinition[] {
  return [{ name: 'MyType', properties: [...] }]
}

// ❌ WRONG - Full method override
protected override generateTypes(): void {
  this.moduleBuilder.addInterface(...) // Don't do this!
}
```

**The Actions generator is our official template - follow its patterns!**

### File Structure:

```
src/generation/generators/[module]/
├── generator.ts        # ModularBaseGenerator implementation
├── generator.test.ts   # Comprehensive unit tests (TDD)
└── README.md          # Module documentation
```

### Generated Output (per module):

```
src/generated/[entity]/
├── types.ts           # TypeScript interfaces
├── constants.ts       # HRID arrays and categories
├── data.ts           # Lazy-loaded Record data
├── lookups.ts        # Static lookup tables
├── utils.ts          # Utility functions
└── index.ts          # Module exports (tree-shakeable)
```

## 💻 TDD Workflow (MANDATORY for All New Generators)

### 🛠️ Available Development Commands

**Core Commands:**

```bash
bun run generate          # Full generation
bun run typecheck         # Type check all
bun test                  # Run all tests
bun run clean            # Remove generated files
```

**TDD Development CLI (`bun run dev`):**

```bash
# Analysis
bun run dev analyze:source <ENTITY>      # Show keys and count
bun run dev explore:entity <ENTITY>      # Deep dive with sample
bun run dev analyze:generator <MODULE>   # Verify configuration
bun run dev analyze:generated <MODULE>   # Inspect generated files

# Development
bun run dev scaffold:generator <MODULE>   # Create module structure
bun run dev generate:single <MODULE>      # Generate only this module
bun run dev validate:generator <MODULE>   # Complete health check
bun run dev debug:generator <MODULE>      # Debug issues

# Testing
bun run dev test:generator <MODULE>       # Run tests once
bun run dev test:treeshaking <MODULE>     # Verify bundle optimization

# Investigation
bun run dev investigate:entity <ENTITY> <MODULE>  # Log unclear data
```

### Phase 1: Understanding & Planning (15-30 min)

```bash
# Analyze the source data structure
bun run dev explore:entity <ENTITY_NAME>
bun run dev analyze:source <ENTITY_NAME>

# Create module structure
bun run dev scaffold:generator <MODULE>
```

- Analyze source data structure in game_data.json using dev CLI
- Create module folder and structure with scaffolding command
- Write comprehensive README.md documentation
- Use investigation command if data structure is unclear: `bun run dev investigate:entity <ENTITY> <MODULE>`

### Phase 2: Test-Driven Development (45 min)

```bash
# Write tests first, then run them iteratively
bun run dev test:generator <MODULE>
```

- Write `generator.test.ts` with full test coverage
- Test data extraction, type generation, utilities
- Test edge cases and integration
- Run tests frequently during development

### Phase 3: Implementation (60-90 min)

```bash
# Implement generator and test iteratively
bun run dev generate:single <MODULE>
bun run dev analyze:generator <MODULE>  # Verify configuration
```

**CRITICAL Implementation Rules:**

1. **Follow the Actions Generator Template EXACTLY**
2. **Use HOOKS, not full method overrides:**

   ```typescript
   // ✅ CORRECT: Return definitions from hooks
   protected override defineInterfaces(): InterfaceDefinition[] {
     return [/* interface definitions */]
   }

   // ❌ WRONG: Don't override generation methods
   protected override generateTypes(): void { /* DON'T DO THIS */ }
   ```

3. **Import shared types properly:**

   ```typescript
   import type {
   	DropTable,
   	LevelRequirement,
   } from '../../../generated/sharedtypes/types'
   ```

4. **Use configuration for standard patterns:**

   ```typescript
   constructor() {
     super({
       entityName: 'Xxx',
       sourceKey: 'xxxDetailMap',
       sharedTypes: ['DropTable', 'LevelRequirement'],
       utilityTemplates: [
         { type: 'getByField', field: 'category' },
         { type: 'sortBy', field: 'sortIndex' },
         { type: 'toMap' }
       ]
     })
   }
   ```

5. **For simple entities:** Use `transformEntity()` hook
6. **For complex entities:** Override `extractEntities()` if needed

### Phase 4: Validation (15 min)

```bash
# Complete validation suite
bun run dev validate:generator <MODULE>        # Tests + type checking
bun run dev analyze:generated <MODULE>        # Inspect generated files
bun run dev test:treeshaking <MODULE>         # Verify bundle optimization
```

- Run comprehensive validation (tests + type checking)
- Analyze generated files for correctness
- Verify tree-shaking compatibility for bundle size goals
- Debug issues with `bun run dev debug:generator <MODULE>` if needed

## 🔄 Current Migration Status

### ✅ Completed (Templates for Others):

- **SharedTypes**: Cross-generator type definitions
- **Actions**: 728 entities, proof of concept for new architecture

### 📝 Ready for TDD Migration (Layer 1 - No Dependencies):

- Skills, DamageTypes, CombatStyles, GuildCharacterRoles
- Avatars, ChatChannelTypes, EquipmentTypes, ItemCategories
- ItemLocations, NameColors, ShopCategories

### ⏳ Later Layers (Have Dependencies):

- Layer 2: Items, CommunityBuffs, ShopItems (single dependency)
- Layer 3: HouseRooms, Monsters (multiple dependencies)
- Layer 4: Recipes (complex dependencies)
- Special: PlayerData, Translations, Index

## 🤝 Collaboration Guidelines (CRITICAL - ASK FOR HELP!)

### **⚠️ ALWAYS ASK FOR HELP WHEN:**

1. **Source data structure is confusing or unclear**
   - Complex nested objects with unclear relationships
   - Inconsistent data patterns across entities
   - Missing or optional fields that need clarification

2. **Entity relationships are ambiguous**
   - Not sure which other modules this should import from
   - Uncertain about circular dependency implications
   - Unclear what the "primary" vs "secondary" properties are

3. **Type generation strategy is uncertain**
   - Should this be a simple enum or complex interface?
   - Are there business rules that affect the type structure?
   - Uncertain about which fields should be optional vs required

4. **Domain knowledge is needed**
   - Not clear what the entity represents in the game context
   - Uncertain about expected usage patterns by consumers
   - Game-specific terminology or concepts need explanation

5. **Performance or bundle size concerns**
   - Entity has unusually large dataset (1000+ entries)
   - Complex nested structures that might impact tree-shaking
   - Utility functions might be too numerous or heavy

### **🔍 Investigation Process:**

```bash
# Step 1: Document the confusion
echo "## Investigation Needed: {MODULE}" >> INVESTIGATION_LOG.md
echo "- Confusion: [describe the issue]" >> INVESTIGATION_LOG.md
ENTITY=confusingEntity bun run dev explore:entity >> INVESTIGATION_LOG.md

# Step 2: Use investigation command
bun run dev investigate:entity <ENTITY> <MODULE>

# Step 3: Ask for human review with specific examples
# Step 4: Collaborate on solution before implementing
```

### **💡 BETTER TO ASK THAN ASSUME**

**Examples of good questions:**

- ❓ "This entity has 3 different date formats - which should be the canonical type?"
- ❓ "Should `skillHrid` reference the Skills module or be a generic string?"
- ❓ "This field is null in 90% of entries - is it really optional or legacy data?"
- ❓ "The naming suggests these are related - should they be separate types or unified?"
- ❓ "This dataset has 2000+ entries - should we optimize for memory or convenience?"

**Remember: Every 5-minute clarification saves hours of refactoring later!**

## 🎯 Code Standards (v1.0)

- **Runtime**: Bun (NOT Node.js)
- **Style**: Tabs, single quotes, no semicolons, trailing commas
- **Imports**: ts-morph, builtins, third-party, relative paths, then types
- **Strict TypeScript**: noUncheckedIndexedAccess enabled
- **Naming**: PascalCase types, camelCase variables
- **JSDoc**: Document all public APIs
- **Domain boundaries**: Import from source domains, never re-export

## 🔍 Key Migration Patterns

### ❌ Old Pattern (v0.x) - NEVER USE THIS:

```typescript
// ❌ DON'T DO THIS - Full method overrides
class OldGenerator extends BaseGenerator {
	generateTypes() {
		/* full override */
	}
	generateUtils() {
		/* full override */
	}
}
```

### ✅ New Pattern (v1.0) - ALWAYS USE THIS:

```typescript
// ✅ CORRECT - Follow Actions generator pattern
import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

export class ModularXxxGenerator extends ModularBaseGenerator<Xxx> {
	constructor() {
		super({
			entityName: 'Xxx',
			entityNamePlural: 'Xxxs',
			sourceKey: 'xxxDetailMap',

			// Import shared types needed
			sharedTypes: ['DropTable', 'LevelRequirement'],

			// Use utility templates
			utilityTemplates: [
				{ type: 'getByField', field: 'category' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Auto-generate category constants
			categoryFilters: [{ name: 'active', condition: (x: any) => x.isActive }],
		})
	}

	// ✅ Use hooks to provide definitions
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			/* interface definitions */
		]
	}

	protected override defineUtilities(): UtilityDefinition[] {
		return [
			/* utility definitions */
		]
	}

	// For simple entities: Transform raw data
	protected override transformEntity(rawData: any): Xxx {
		return { hrid: rawData.hrid /* ... */ }
	}

	// For complex entities: Custom extraction (like Actions)
	public override extractEntities(sourceData: any): Record<string, Xxx> {
		// Only if needed for complex extraction
	}
}
```

### 🎯 Common Mistakes to Avoid:

```typescript
// ❌ WRONG - Don't override generation methods
protected override generateTypes(): void { }
protected override generateUtilities(): void { }
protected override generateConstants(): void { }

// ✅ CORRECT - Use definition hooks
protected override defineInterfaces(): InterfaceDefinition[] { }
protected override defineUtilities(): UtilityDefinition[] { }
protected override defineConstants(): ConstantDefinition[] { }
```

## 💡 Common Workflow Examples

### Creating a New Generator (Full Workflow):

```bash
# 1. Explore the source data
bun run dev explore:entity skillDetailMap
bun run dev analyze:source skillDetailMap

# 2. Scaffold the generator
bun run dev scaffold:generator skills

# 3. TDD Development (write tests first, then implement)
bun run dev test:generator skills           # Should fail initially
bun run dev generate:single skills          # Implement and test
bun run dev test:generator skills           # Should pass

# 4. Complete validation
bun run dev validate:generator skills       # Full health check
bun run dev test:treeshaking skills         # Bundle size check
```

### Debugging a Generator:

```bash
# Analyze the current state
bun run dev analyze:generator skills
bun run dev analyze:generated skills

# Run debug mode for detailed output
bun run dev debug:generator skills

# Test specific aspects
bun run dev test:generator skills
bun run dev generate:single skills
```

### Investigation Workflow:

```bash
# When you need help understanding data structure
bun run dev investigate:entity skillDetailMap skills
# This logs to INVESTIGATION_LOG.md for human review
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

## 🛠️ Utility Function Templates

### Standard Templates (Use These First):

```typescript
// 1. GET BY FIELD - Filter by any property
getActionsByType(type: ActionType): Action[]

// 2. GET ALL WITH - Filter by property existence
getItemsWithSellPrice(): Item[]

// 3. SORT BY - Sort by any field
getActionsSortedByLevel(): Action[]

// 4. FILTER BY - Custom predicate
filterActions(predicate: (action: Action) => boolean): Action[]

// 5. TO MAP - Convert Record to Map for O(1) lookups
toMap<K, V>(record: Record<K, V>): Map<K, V>
```

## ✅ Success Metrics & Validation

### Every Generator Must Pass:

1. **Bundle Size**: < 100KB for typical usage (vs 2MB+ with barrels)
2. **Tree-Shaking**: Unused code eliminated completely
3. **Type Safety**: 100% type coverage, zero TS errors
4. **Test Coverage**: All tests passing
5. **Generation Time**: < 5 seconds for full regeneration

### Validation Commands:

```bash
# Must pass all of these
bun run dev validate:generator <MODULE>   # Complete health check
bun run dev test:treeshaking <MODULE>     # Bundle optimization
bun run typecheck                         # Zero TS errors
bun test                                  # All tests pass
```

## 📚 Essential Files to Reference

- **ARCHITECTURE.md**: Complete architectural rules and decisions (SOURCE OF TRUTH)
- **DEVELOPMENT_WORKFLOW.md**: Detailed TDD process and tools
- **PROJECT_PROGRESS.md**: Live status, decisions, and next steps
- **src/generation/generators/actions/**: Official template for ALL generators

## ⚡ Quick Checklist for New Generators

```markdown
## Before Starting:

- [ ] Read this AGENTS.md completely
- [ ] Study the Actions generator as template
- [ ] Understand hook system vs full overrides

## Implementation:

- [ ] NO barrel exports
- [ ] NO domain violations (no re-exports)
- [ ] NO Map collections (use Records)
- [ ] NO full method overrides (use hooks)
- [ ] NO editing generated files
- [ ] YES to TDD workflow
- [ ] YES to asking for help when unclear
- [ ] YES to following Actions pattern exactly
```

**Remember**: This is a CLEAN BREAK v1.0 rewrite. When in doubt, follow the Actions generator pattern EXACTLY and ask for clarification on complex entities.
