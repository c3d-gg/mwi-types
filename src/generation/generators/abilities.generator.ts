import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

// Placeholder abilities generator - will be fully implemented later
export class AbilitiesGenerator extends BaseGenerator<Ability> {
	constructor() {
		super({
			entityName: 'Ability',
			entityNamePlural: 'Abilities',
			sourceKey: 'abilityDetailMap',
			outputPath: 'src/generated/types/abilities.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Ability> {
		const abilities: Record<string, Ability> = {}

		// Extract abilities from abilityDetailMap
		if (sourceData.abilityDetailMap) {
			for (const [hrid, data] of Object.entries(sourceData.abilityDetailMap)) {
				const abilityData = data as any
				abilities[hrid as string] = {
					hrid: abilityData.hrid || hrid,
					name: abilityData.name || '',
				}
			}
		}

		return abilities
	}

	protected override generateInterfaces(
		entities: Record<string, Ability>,
	): void {
		// Generate basic Ability interface
		const abilityProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'AbilityHrid' },
			{ name: 'name', type: 'string' },
		]
		this.builder.addInterface('Ability', abilityProps)
	}
}

// Type definitions for internal use
interface Ability {
	hrid: string
	name: string
}
