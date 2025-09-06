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

## 🛠️ Commands

### Core Development

- **Generate types**: `bun run generate` (full generation)
- **Type check**: `bun run typecheck`
- **Test**: `bun test` (all tests)
- **Clean**: `bun run clean` (removes generated files)

### TDD Development (New v1.0 Workflow)

- **Single generator**: `MODULE=skills bun run generate:single`
- **Generator tests**: `MODULE=skills bun run test:generator`
- **Test + Generate**: `MODULE=skills bun run generate:test`
- **Watch mode**: `MODULE=skills bun run test:generator:watch`

## 🏗️ Architecture (v1.0)

### Critical Rules (NON-NEGOTIABLES):

1. **NO BARREL EXPORTS** - They destroy tree-shaking (causes 2MB+ bundles)
2. **NO DOMAIN VIOLATIONS** - Each module owns its types, imports from others when needed
3. **NO MAP COLLECTIONS** - Use Records, provide toMap() utility
4. **NO FULL OVERRIDES** - Use hook system and configuration
5. **NO EDITING GENERATED FILES** - Always fix the generator that creates them

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

## 💻 TDD Workflow (Required for All New Generators)

### Phase 1: Understanding & Planning (30 min)

- Analyze source data structure in game_data.json
- Create module folder: `src/generation/generators/[name]/`
- Write comprehensive README.md documentation

### Phase 2: Test-Driven Development (45 min)

- Write `generator.test.ts` with full test coverage
- Test data extraction, type generation, utilities
- Test edge cases and integration

### Phase 3: Implementation (60 min)

- Implement `generator.ts` following Actions template
- Use GeneratorConfig with shared types
- Import shared types from `../sharedtypes/types`
- Use utility templates from configuration

### Phase 4: Validation (15 min)

- Run tests: `MODULE=name bun run test:generator`
- Type check generated files
- Verify tree-shaking compatibility

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

## 🤝 Collaboration Guidelines

**ASK FOR HELP WHEN:**

- Source data structure is confusing or unclear
- Entity relationships are ambiguous
- Type generation strategy is uncertain
- Domain knowledge needed for game context
- Performance/bundle size concerns

**Investigation Process:**

1. Document confusion in INVESTIGATION_LOG.md
2. Use analysis tools: `ENTITY=skillDetailMap bun run explore:entity`
3. Ask for human review with specific examples
4. Collaborate on solution before implementing

## 🎯 Code Standards (v1.0)

- **Runtime**: Bun (NOT Node.js)
- **Style**: Tabs, single quotes, no semicolons, trailing commas
- **Imports**: ts-morph, builtins, third-party, relative paths, then types
- **Strict TypeScript**: noUncheckedIndexedAccess enabled
- **Naming**: PascalCase types, camelCase variables
- **JSDoc**: Document all public APIs
- **Domain boundaries**: Import from source domains, never re-export

## 🔍 Key Migration Patterns

### Old Pattern (v0.x) - DEPRECATED:

```typescript
// ❌ Don't do this anymore
class OldGenerator extends BaseGenerator {
	generateTypes() {
		/* full override */
	}
	generateUtils() {
		/* full override */
	}
}
```

### New Pattern (v1.0) - USE THIS:

```typescript
// ✅ New approach
class ModularXxxGenerator extends ModularBaseGenerator<Xxx> {
	constructor() {
		super({
			entityName: 'Xxx',
			sourceKey: 'xxxDetailMap',
			sharedTypes: ['SharedType1', 'SharedType2'],
			utilityTemplates: ['getByField', 'sortBy', 'toMap'],
		})
	}

	// Override only what's necessary using hooks
	protected defineInterfaces() {
		/* custom interfaces */
	}
	protected extendUtilities() {
		/* custom utilities */
	}
}
```

## 📚 Essential Files to Reference

- **ARCHITECTURE.md**: Complete architectural rules and decisions
- **DEVELOPMENT_WORKFLOW.md**: Detailed TDD process and tools
- **PROJECT_PROGRESS.md**: Live status, decisions, and next steps
- **Actions generator**: Template example for new architecture

**Remember**: This is a complete rewrite. When in doubt, follow the Actions generator pattern and ask for clarification on complex entities.
