import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface CombatStyle {
	hrid: string
	name: string
	skillExpMap: Record<string, boolean> | null
	sortIndex: number
}

export class CombatStylesModularGenerator extends ModularBaseGenerator<CombatStyle> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'CombatStyle',
			entityNamePlural: 'CombatStyles',
			sourceKey: 'combatStyleDetailMap',
			outputPath: 'src/generated/combat-styles',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, CombatStyle> {
		const styles: Record<string, CombatStyle> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const styleData = data as any
			const style: CombatStyle = {
				hrid: styleData.hrid,
				name: styleData.name,
				skillExpMap: styleData.skillExpMap,
				sortIndex: styleData.sortIndex || 0,
			}

			styles[hrid] = style
		}

		return styles
	}

	protected override generateTypes(
		_styles: Record<string, CombatStyle>,
	): void {
		const typesFile = this.moduleBuilder.getFile('types')

		// Add JSDoc header
		typesFile.addComment('Combat style type definitions')

		// Add type imports - we'll import SkillHrid from skills module once it's modular
		// For now, use type alias
		typesFile.addType('SkillHrid', 'string')

		// Generate CombatStyle interface
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'CombatStyleHrid',
				optional: false,
				description: 'Unique combat style identifier',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the combat style',
			},
			{
				name: 'skillExpMap',
				type: 'Partial<Record<SkillHrid, boolean>> | null',
				optional: false,
				description: 'Skills that receive experience from this style',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		typesFile.addInterface('CombatStyle', properties)

		// Export the hrid type
		typesFile.addType('CombatStyleHrid', '(typeof COMBATSTYLE_HRIDS)[number]')

		// Add module exports
		this.moduleBuilder.addExport('types', 'CombatStyle', false)
		this.moduleBuilder.addExport('types', 'CombatStyleHrid', false)
		this.moduleBuilder.addExport('types', 'SkillHrid', false)
	}

	protected override generateConstants(
		entities: Record<string, CombatStyle>,
	): void {
		const constantsFile = this.moduleBuilder.getFile('constants')

		// Generate COMBATSTYLE_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsFile.addConstArray('COMBATSTYLE_HRIDS', hrids, 'as const')

		// Export the constants
		this.moduleBuilder.addExport('constants', 'COMBATSTYLE_HRIDS')
	}

	protected override generateLazyData(
		entities: Record<string, CombatStyle>,
	): void {
		// Clean entity data before adding
		const cleanedEntries = Object.entries(entities)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => [
				key,
				this.cleanEntityData(value),
			]) as Array<[string, CombatStyle]>

		// Use the moduleBuilder's addLazyData method which handles everything
		this.moduleBuilder.addLazyData(
			'CombatStyles',
			cleanedEntries,
			'CombatStyleHrid',
			'CombatStyle',
		)
	}

	protected override generateLookups(
		entities: Record<string, CombatStyle>,
	): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsFile.addImport('./types', ['CombatStyle', 'CombatStyleHrid', 'SkillHrid'], true)

		// Collect styles by combat type (melee, ranged, magic)
		const melee: string[] = []
		const ranged: string[] = []
		const magic: string[] = []

		for (const [hrid, style] of Object.entries(entities)) {
			if (style.skillExpMap) {
				if (style.skillExpMap['/skills/melee']) melee.push(hrid)
				if (style.skillExpMap['/skills/ranged']) ranged.push(hrid)
				if (style.skillExpMap['/skills/magic']) magic.push(hrid)
			}
		}

		// Generate lookup for styles by combat type
		lookupsFile.addStaticLookup(
			'COMBAT_STYLES_BY_TYPE',
			"'melee' | 'ranged' | 'magic'",
			'readonly CombatStyleHrid[]',
			{
				melee: melee.sort(),
				ranged: ranged.sort(),
				magic: magic.sort(),
			},
			false // not partial, all keys are present
		)

		// Generate lookup for styles by skill
		const bySkill: Record<string, string[]> = {}
		for (const [hrid, style] of Object.entries(entities)) {
			if (style.skillExpMap) {
				for (const skillHrid of Object.keys(style.skillExpMap)) {
					if (!bySkill[skillHrid]) bySkill[skillHrid] = []
					bySkill[skillHrid].push(hrid)
				}
			}
		}

		// Sort the arrays
		for (const skillHrid in bySkill) {
			bySkill[skillHrid].sort()
		}

		lookupsFile.addStaticLookup(
			'COMBAT_STYLES_BY_SKILL',
			'SkillHrid',
			'readonly CombatStyleHrid[]',
			bySkill,
			true // isPartial
		)

		// Export the lookups
		this.moduleBuilder.addExport('lookups', 'COMBAT_STYLES_BY_TYPE')
		this.moduleBuilder.addExport('lookups', 'COMBAT_STYLES_BY_SKILL')
	}

	protected override generateUtilities(
		_entities: Record<string, CombatStyle>,
	): void {
		const utilsFile = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsFile.addImport('./types', ['CombatStyle', 'CombatStyleHrid', 'SkillHrid'], true)
		utilsFile.addImport('./constants', ['COMBATSTYLE_HRIDS'])
		utilsFile.addImport('./data', ['getCombatStylesMap'])
		utilsFile.addImport('./lookups', ['COMBAT_STYLES_BY_TYPE', 'COMBAT_STYLES_BY_SKILL'])

		// Type guard
		utilsFile.addFunction(
			'isCombatStyleHrid',
			[{ name: 'value', type: 'string' }],
			'value is CombatStyleHrid',
			(writer) => {
				writer.writeLine('return COMBATSTYLE_HRIDS.includes(value as CombatStyleHrid)')
			}
		)

		// Getter
		utilsFile.addFunction(
			'getCombatStyle',
			[{ name: 'hrid', type: 'CombatStyleHrid' }],
			'CombatStyle | undefined',
			(writer) => {
				writer.writeLine('return getCombatStylesMap().get(hrid)')
			}
		)

		// Require getter
		utilsFile.addFunction(
			'requireCombatStyle',
			[{ name: 'hrid', type: 'CombatStyleHrid' }],
			'CombatStyle',
			(writer) => {
				writer.writeLine('const style = getCombatStylesMap().get(hrid)')
				writer.writeLine('if (!style) {')
				writer.indent(() => {
					writer.writeLine('throw new Error(`Combat style not found: ${hrid}`)')
				})
				writer.writeLine('}')
				writer.writeLine('return style')
			}
		)

		// Get all
		utilsFile.addFunction(
			'getAllCombatStyles',
			[],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine('return Array.from(getCombatStylesMap().values())')
			}
		)

		// Get by combat type using lookup
		utilsFile.addFunction(
			'getCombatStylesByType',
			[{ name: 'type', type: "'melee' | 'ranged' | 'magic'" }],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine('const hrids = COMBAT_STYLES_BY_TYPE[type]')
				writer.writeLine('return hrids.map(hrid => requireCombatStyle(hrid))')
			}
		)

		// Get styles that grant experience to a specific skill
		utilsFile.addFunction(
			'getCombatStylesForSkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine('const hrids = COMBAT_STYLES_BY_SKILL[skillHrid] || []')
				writer.writeLine('return hrids.map(hrid => requireCombatStyle(hrid))')
			}
		)

		// Sort by sortIndex
		utilsFile.addFunction(
			'sortCombatStylesByIndex',
			[{ name: 'styles', type: 'CombatStyle[]' }],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine('return [...styles].sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		// Export utilities
		this.moduleBuilder.addExport('utils', 'isCombatStyleHrid')
		this.moduleBuilder.addExport('utils', 'getCombatStyle')
		this.moduleBuilder.addExport('utils', 'requireCombatStyle')
		this.moduleBuilder.addExport('utils', 'getAllCombatStyles')
		this.moduleBuilder.addExport('utils', 'getCombatStylesByType')
		this.moduleBuilder.addExport('utils', 'getCombatStylesForSkill')
		this.moduleBuilder.addExport('utils', 'sortCombatStylesByIndex')
	}
}