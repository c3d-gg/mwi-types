import { BaseGenerator } from '../core/generator.base'

// SkillHrid will be imported in generateInterfaces method
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface CombatStyle {
	hrid: string
	name: string
	skillExpMap: Record<string, boolean> | null
	sortIndex: number
}

export class CombatStylesGenerator extends BaseGenerator<CombatStyle> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'CombatStyle',
			entityNamePlural: 'CombatStyles',
			sourceKey: 'combatStyleDetailMap',
			outputPath: 'src/generated/types/combat-styles.ts',
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

	protected override generateInterfaces(
		_styles: Record<string, CombatStyle>,
	): void {
		// Import SkillHrid type - must be type-only for verbatimModuleSyntax
		this.builder.addImport('./skills', ['SkillHrid'], true)

		// Define CombatStyle interface
		const properties = this.defineProperties()
		this.builder.addInterface('CombatStyle', properties)
	}

	protected defineProperties(): PropertyDefinition[] {
		return [
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
	}

	protected override generateUtilities(
		entities: Record<string, CombatStyle>,
	): void {
		// Type guard
		this.builder.addFunction(
			'isCombatStyleHrid',
			[{ name: 'value', type: 'string' }],
			'value is CombatStyleHrid',
			(writer) => {
				writer.writeLine(
					'return COMBATSTYLE_HRIDS.includes(value as CombatStyleHrid)',
				)
			},
		)

		// Getter
		this.builder.addFunction(
			'getCombatStyle',
			[{ name: 'hrid', type: 'CombatStyleHrid' }],
			'CombatStyle | undefined',
			(writer) => {
				writer.writeLine('return COMBATSTYLES.get(hrid)')
			},
		)

		// Require getter
		this.builder.addFunction(
			'requireCombatStyle',
			[{ name: 'hrid', type: 'CombatStyleHrid' }],
			'CombatStyle',
			(writer) => {
				writer.writeLine('const style = COMBATSTYLES.get(hrid)')
				writer.writeLine('if (!style) {')
				writer.indent(() => {
					writer.writeLine('throw new Error(`Combat style not found: ${hrid}`)')
				})
				writer.writeLine('}')
				writer.writeLine('return style')
			},
		)

		// Get all
		this.builder.addFunction(
			'getAllCombatStyles',
			[],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine('return Array.from(COMBATSTYLES.values())')
			},
		)

		// Get by combat type (melee, ranged, magic)
		this.builder.addFunction(
			'getCombatStylesByType',
			[{ name: 'type', type: "'melee' | 'ranged' | 'magic'" }],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine(`const skillMap: Record<string, SkillHrid> = {`)
				writer.indent(() => {
					writer.writeLine(`melee: '/skills/melee' as SkillHrid,`)
					writer.writeLine(`ranged: '/skills/ranged' as SkillHrid,`)
					writer.writeLine(`magic: '/skills/magic' as SkillHrid,`)
				})
				writer.writeLine(`}`)
				writer.writeLine(`const targetSkill = skillMap[type]`)
				writer.writeLine(`if (!targetSkill) return []`)
				writer.writeLine(`return getAllCombatStyles().filter(style =>`)
				writer.indent(() => {
					writer.writeLine(
						`style.skillExpMap && style.skillExpMap[targetSkill]`,
					)
				})
				writer.writeLine(`)`)
			},
		)

		// Get styles that grant experience to a specific skill
		this.builder.addFunction(
			'getCombatStylesForSkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'CombatStyle[]',
			(writer) => {
				writer.writeLine(`return getAllCombatStyles().filter(style =>`)
				writer.indent(() => {
					writer.writeLine(`style.skillExpMap && style.skillExpMap[skillHrid]`)
				})
				writer.writeLine(`)`)
			},
		)
	}
}
