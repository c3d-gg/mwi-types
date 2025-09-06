# SharedTypes Generator

The SharedTypes generator is a special-case module that defines shared type definitions used across multiple generators. Unlike other generators, it doesn't extract data from source files but defines static TypeScript interfaces that eliminate duplication across the codebase.

## Purpose

This generator creates the foundational shared types that other generators import and use, such as:

- `LevelRequirement` - Skill level requirements for actions, items, etc.
- `ExperienceGain` - Experience gained from actions
- `ItemCost` - Item costs and requirements
- `DropTable` - Loot drop configurations
- `Buff` - Stat buffs and modifiers
- `Stats` - Flexible stat objects
- `SpawnInfo` - Monster spawn information
- `ActionItem` - Item inputs/outputs for actions
- `UpgradeCost` - Upgrade costs for entities

## Architecture

The SharedTypes generator follows the v1.0 architecture principles:

### Configuration

```typescript
{
  entityName: 'SharedType',
  entityNamePlural: 'SharedTypes',
  sourceKey: 'shared', // Not used
  outputPath: 'src/generated/sharedtypes',

  // All generation features disabled for special case
  generateHrids: false,
  generateCollection: false,
  generateConstants: false,
  generateUtils: false,
  generateLookups: false
}
```

### Hook Usage

- **`defineInterfaces()`**: Returns static interface definitions
- **`extractEntities()`**: Returns empty object (no source data extraction)

## Output Structure

```
src/generated/sharedtypes/
├── types.ts           # TypeScript interface definitions
└── index.ts          # Tree-shakeable exports
```

## Key Design Decisions

### 1. **String Literals for HRIDs**

Shared types use `string` for HRID fields to avoid circular dependencies:

```typescript
interface LevelRequirement {
	skillHrid: string // Will be cast to SkillHrid by consuming modules
	level: number
}
```

Consuming modules import and cast as needed:

```typescript
// In actions generator
import type { LevelRequirement } from '../../../generated/sharedtypes/types'
import type { SkillHrid } from '../skills/types'

// The LevelRequirement.skillHrid is cast to SkillHrid in the Action interface
```

### 2. **Domain Control**

Shared types are the only exception to the "no re-exports between domains" rule - they are specifically designed to be imported by multiple domains without creating circular dependencies.

### 3. **Static Generation**

Unlike other generators that process source data, SharedTypes generates purely static definitions. This ensures:

- Consistent type definitions across all generators
- No runtime dependencies on source data
- Faster generation (no data processing required)

## Usage by Other Generators

Other generators import shared types via configuration:

```typescript
export class ModularActionsGenerator extends ModularBaseGenerator<Action> {
	constructor() {
		super({
			// ... other config
			sharedTypes: [
				'LevelRequirement',
				'ExperienceGain',
				'DropTable',
				'ActionItem',
			],
		})
	}
}
```

This automatically adds the import to the generated types file:

```typescript
// Generated in actions/types.ts
import type {
	ActionItem,
	DropTable,
	ExperienceGain,
	LevelRequirement,
} from '../sharedtypes/types'
```

## Development

### Running Tests

```bash
bun run dev test:generator shared-types
```

### Generating Module

```bash
bun run dev generate:single shared-types
```

### Full Validation

```bash
bun run dev validate:generator shared-types
```

## Dependencies

**Imports**: None (this is the root of the dependency tree)

**Exported to**: All other generators that need shared type definitions

## Migration Notes

This generator replaces the old `shared-types.generator.modular.ts` with the new modular folder structure and proper hook system usage. The generated types remain the same to maintain compatibility with existing generators.
