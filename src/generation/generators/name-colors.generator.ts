import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface NameColor {
	hrid: string
	name: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

export class NameColorsGenerator extends BaseGenerator<NameColor> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'NameColor',
			entityNamePlural: 'NameColors',
			sourceKey: 'nameColorDetailMap',
			outputPath: 'src/generated/types/name-colors.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, NameColor> {
		const colors: Record<string, NameColor> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const colorData = data as any
			const color: NameColor = {
				hrid: colorData.hrid,
				name: colorData.name || '',
				isSeasonal: colorData.isSeasonal === true,
				cowbellCost: colorData.cowbellCost || 0,
				sortIndex: colorData.sortIndex || 0,
			}

			colors[hrid] = color
		}

		return colors
	}

	protected override generateInterfaces(
		_colors: Record<string, NameColor>,
	): void {
		// Generate main interface with JSDoc
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'NameColorHrid',
				optional: false,
				description: 'Unique identifier for the name color',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the color (empty for custom colors)',
			},
			{
				name: 'isSeasonal',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a seasonal/event color',
			},
			{
				name: 'cowbellCost',
				type: 'number',
				optional: false,
				description: 'Cost in cowbells (0 if not purchasable)',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('NameColor', properties)
	}

	protected override generateUtilities(
		colors: Record<string, NameColor>,
	): void {
		// Call base utilities first
		super.generateUtilities(colors)

		// Generate lookup maps
		this.generateLookupMaps(colors)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(colors: Record<string, NameColor>): void {
		// Categorize name colors
		const seasonalColors: string[] = []
		const cowbellColors: string[] = []
		const freeColors: string[] = []
		const customColors: string[] = []
		const standardColors: string[] = []

		for (const [hrid, color] of Object.entries(colors)) {
			if (color.isSeasonal) {
				seasonalColors.push(hrid)
			}
			if (color.cowbellCost > 0) {
				cowbellColors.push(hrid)
			}
			if (color.cowbellCost === 0 && !color.isSeasonal) {
				freeColors.push(hrid)
			}
			if (hrid.includes('custom_')) {
				customColors.push(hrid)
			} else {
				standardColors.push(hrid)
			}
		}

		// Add category arrays
		this.builder.addConstArray('SEASONAL_NAME_COLORS', seasonalColors, true)
		this.builder.addConstArray('COWBELL_NAME_COLORS', cowbellColors, true)
		this.builder.addConstArray('FREE_NAME_COLORS', freeColors, true)
		this.builder.addConstArray('CUSTOM_NAME_COLORS', customColors, true)
		this.builder.addConstArray('STANDARD_NAME_COLORS', standardColors, true)
	}

	private generateSpecializedUtils(): void {
		// getSeasonalNameColors
		this.builder.addFunction(
			'getSeasonalNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return SEASONAL_NAME_COLORS.map(hrid => NAMECOLORS.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
		)

		// getCowbellNameColors
		this.builder.addFunction(
			'getCowbellNameColors',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'const colors = COWBELL_NAME_COLORS.map(hrid => NAMECOLORS.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return colors')
				writer.writeLine(
					'return colors.filter(color => color.cowbellCost <= maxCost)',
				)
			},
		)

		// getFreeNameColors
		this.builder.addFunction(
			'getFreeNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return FREE_NAME_COLORS.map(hrid => NAMECOLORS.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
		)

		// getCustomNameColors
		this.builder.addFunction(
			'getCustomNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return CUSTOM_NAME_COLORS.map(hrid => NAMECOLORS.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
		)

		// getStandardNameColors
		this.builder.addFunction(
			'getStandardNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return STANDARD_NAME_COLORS.map(hrid => NAMECOLORS.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
		)

		// getAffordableNameColors
		this.builder.addFunction(
			'getAffordableNameColors',
			[{ name: 'cowbells', type: 'number' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(NAMECOLORS.values()).filter(color => {',
				)
				writer.writeLine('  if (color.cowbellCost === 0) return true')
				writer.writeLine('  return color.cowbellCost <= cowbells')
				writer.writeLine('})')
			},
		)

		// sortNameColorsByIndex
		this.builder.addFunction(
			'sortNameColorsByIndex',
			[{ name: 'colors', type: 'NameColor[]' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return [...colors].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// searchNameColors
		this.builder.addFunction(
			'searchNameColors',
			[{ name: 'searchTerm', type: 'string' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(NAMECOLORS.values()).filter(color =>',
				)
				writer.writeLine('  color.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine('  color.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getNameColorStats
		this.builder.addFunction(
			'getNameColorStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number, custom: number, standard: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: NAMECOLORS.size,')
				writer.writeLine('  seasonal: SEASONAL_NAME_COLORS.length,')
				writer.writeLine('  cowbell: COWBELL_NAME_COLORS.length,')
				writer.writeLine('  free: FREE_NAME_COLORS.length,')
				writer.writeLine('  custom: CUSTOM_NAME_COLORS.length,')
				writer.writeLine('  standard: STANDARD_NAME_COLORS.length')
				writer.writeLine('}')
			},
		)

		// getNameColorCost
		this.builder.addFunction(
			'getNameColorCost',
			[{ name: 'colorHrid', type: 'NameColorHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const color = NAMECOLORS.get(colorHrid)')
				writer.writeLine('return color ? color.cowbellCost : 0')
			},
		)

		// isCustomNameColor
		this.builder.addFunction(
			'isCustomNameColor',
			[{ name: 'colorHrid', type: 'NameColorHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('return colorHrid.includes("custom_")')
			},
		)

		// getNameColorsByPrefix
		this.builder.addFunction(
			'getNameColorsByPrefix',
			[{ name: 'prefix', type: 'string' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const lowerPrefix = prefix.toLowerCase()')
				writer.writeLine(
					'return Array.from(NAMECOLORS.values()).filter(color =>',
				)
				writer.writeLine('  color.hrid.toLowerCase().startsWith(lowerPrefix)')
				writer.writeLine(')')
			},
		)
	}
}
