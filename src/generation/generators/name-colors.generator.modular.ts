import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface NameColor {
	hrid: string
	name: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

/**
 * Modular NameColors Generator - Creates tree-shakeable name colors modules
 */
export class NameColorsGeneratorModular extends ModularBaseGenerator<NameColor> {
	constructor() {
		super({
			entityName: 'NameColor',
			entityNamePlural: 'NameColors',
			sourceKey: 'nameColorDetailMap',
			outputPath: './src/generated/name-colors/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, NameColor> {
		const colors: Record<string, NameColor> = {}
		const colorMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(colorMap)) {
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

	protected override cleanEntityData(color: NameColor): any {
		const cleaned = super.cleanEntityData(color) as any
		// Preserve empty strings for required string fields
		if (color.name === '') {
			cleaned.name = ''
		}
		return cleaned
	}

	protected override generateTypes(entities: Record<string, NameColor>): void {
		// Main NameColor interface
		const nameColorProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'NameColorHrid', optional: false, description: 'Unique identifier for the name color' },
			{ name: 'name', type: 'string', optional: false, description: 'Display name of the color (empty for custom colors)' },
			{ name: 'isSeasonal', type: 'boolean', optional: false, description: 'Whether this is a seasonal/event color' },
			{ name: 'cowbellCost', type: 'number', optional: false, description: 'Cost in cowbells (0 if not purchasable)' },
			{ name: 'sortIndex', type: 'number', optional: false, description: 'Display sort order' },
		]
		this.moduleBuilder.addInterface('NameColor', nameColorProps)
		
		// Export the interface
		this.moduleBuilder.addExport({ name: 'NameColor', source: './types', isType: true })
	}

	protected override generateConstants(entities: Record<string, NameColor>): void {
		// Call base to generate HRID constants
		super.generateConstants(entities)

		// Categorize name colors
		const seasonalColors: string[] = []
		const cowbellColors: string[] = []
		const freeColors: string[] = []
		const customColors: string[] = []
		const standardColors: string[] = []

		for (const [hrid, color] of Object.entries(entities)) {
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

		// Add category arrays to constants file using the base builder directly
		const constantsBuilder = this.moduleBuilder.getFile('constants')
		
		// Generate category arrays
		constantsBuilder.addConstArray('SEASONAL_NAME_COLORS', seasonalColors, true)
		constantsBuilder.addConstArray('COWBELL_NAME_COLORS', cowbellColors, true)
		constantsBuilder.addConstArray('FREE_NAME_COLORS', freeColors, true)
		constantsBuilder.addConstArray('CUSTOM_NAME_COLORS', customColors, true)
		constantsBuilder.addConstArray('STANDARD_NAME_COLORS', standardColors, true)

		// Export category constants
		this.moduleBuilder.addExport({ name: 'SEASONAL_NAME_COLORS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'COWBELL_NAME_COLORS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'FREE_NAME_COLORS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'CUSTOM_NAME_COLORS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'STANDARD_NAME_COLORS', source: './constants' })
	}

	protected override generateLookups(entities: Record<string, NameColor>): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')
		
		// Add import for NameColorHrid
		lookupsFile.addImport('./types', ['NameColorHrid'], true)

		// Group by cowbell cost
		const byCost: Record<number, string[]> = {}
		for (const [hrid, color] of Object.entries(entities)) {
			if (color.cowbellCost > 0) {
				if (!byCost[color.cowbellCost]) {
					byCost[color.cowbellCost] = []
				}
				byCost[color.cowbellCost].push(hrid)
			}
		}

		// Add static lookups
		lookupsFile.addStaticLookup(
			'NAME_COLORS_BY_COST',
			'number',
			'readonly NameColorHrid[]',
			byCost
		)

		// Export lookups
		this.moduleBuilder.addExport({ name: 'NAME_COLORS_BY_COST', source: './lookups' })
	}

	protected override generateUtilities(entities: Record<string, NameColor>): void {
		// Call base utilities first (creates standard utils)
		super.generateUtilities(entities)

		// Get seasonal name colors
		this.moduleBuilder.addUtilityFunction(
			'getSeasonalNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const map = getNameColorsMap()')
				writer.writeLine(
					'return SEASONAL_NAME_COLORS.map(hrid => map.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
			[
				{ from: './types', names: ['NameColor', 'NameColorHrid'], isType: true },
				{ from: './constants', names: ['SEASONAL_NAME_COLORS'] },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Get cowbell name colors
		this.moduleBuilder.addUtilityFunction(
			'getCowbellNameColors',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const map = getNameColorsMap()')
				writer.writeLine(
					'const colors = COWBELL_NAME_COLORS.map(hrid => map.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return colors')
				writer.writeLine(
					'return colors.filter(color => color.cowbellCost <= maxCost)',
				)
			},
			[
				{ from: './types', names: ['NameColor', 'NameColorHrid'], isType: true },
				{ from: './constants', names: ['COWBELL_NAME_COLORS'] },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Get free name colors
		this.moduleBuilder.addUtilityFunction(
			'getFreeNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const map = getNameColorsMap()')
				writer.writeLine(
					'return FREE_NAME_COLORS.map(hrid => map.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
			[
				{ from: './types', names: ['NameColor', 'NameColorHrid'], isType: true },
				{ from: './constants', names: ['FREE_NAME_COLORS'] },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Get custom name colors
		this.moduleBuilder.addUtilityFunction(
			'getCustomNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const map = getNameColorsMap()')
				writer.writeLine(
					'return CUSTOM_NAME_COLORS.map(hrid => map.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
			[
				{ from: './types', names: ['NameColor', 'NameColorHrid'], isType: true },
				{ from: './constants', names: ['CUSTOM_NAME_COLORS'] },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Get standard name colors
		this.moduleBuilder.addUtilityFunction(
			'getStandardNameColors',
			[],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const map = getNameColorsMap()')
				writer.writeLine(
					'return STANDARD_NAME_COLORS.map(hrid => map.get(hrid as NameColorHrid)!).filter(Boolean)',
				)
			},
			[
				{ from: './types', names: ['NameColor', 'NameColorHrid'], isType: true },
				{ from: './constants', names: ['STANDARD_NAME_COLORS'] },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Get affordable name colors
		this.moduleBuilder.addUtilityFunction(
			'getAffordableNameColors',
			[{ name: 'cowbells', type: 'number' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return getAllNameColors().filter(color => {',
				)
				writer.writeLine('  if (color.cowbellCost === 0) return true')
				writer.writeLine('  return color.cowbellCost <= cowbells')
				writer.writeLine('})')
			},
			[
				{ from: './types', names: ['NameColor'], isType: true },
			]
		)

		// Sort name colors by index
		this.moduleBuilder.addUtilityFunction(
			'sortNameColorsByIndex',
			[{ name: 'colors', type: 'NameColor[]' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine(
					'return [...colors].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
			[
				{ from: './types', names: ['NameColor'], isType: true },
			]
		)

		// Search name colors
		this.moduleBuilder.addUtilityFunction(
			'searchNameColors',
			[{ name: 'searchTerm', type: 'string' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return getAllNameColors().filter(color =>',
				)
				writer.writeLine('  color.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine('  color.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['NameColor'], isType: true },
			]
		)

		// Get name color stats
		this.moduleBuilder.addUtilityFunction(
			'getNameColorStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number, custom: number, standard: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: getNameColorsMap().size,')
				writer.writeLine('  seasonal: SEASONAL_NAME_COLORS.length,')
				writer.writeLine('  cowbell: COWBELL_NAME_COLORS.length,')
				writer.writeLine('  free: FREE_NAME_COLORS.length,')
				writer.writeLine('  custom: CUSTOM_NAME_COLORS.length,')
				writer.writeLine('  standard: STANDARD_NAME_COLORS.length')
				writer.writeLine('}')
			},
			[
				{ from: './data', names: ['getNameColorsMap'] },
				{ from: './constants', names: [
					'SEASONAL_NAME_COLORS',
					'COWBELL_NAME_COLORS',
					'FREE_NAME_COLORS',
					'CUSTOM_NAME_COLORS',
					'STANDARD_NAME_COLORS'
				] },
			]
		)

		// Get name color cost
		this.moduleBuilder.addUtilityFunction(
			'getNameColorCost',
			[{ name: 'colorHrid', type: 'NameColorHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const color = getNameColorsMap().get(colorHrid)')
				writer.writeLine('return color ? color.cowbellCost : 0')
			},
			[
				{ from: './types', names: ['NameColorHrid'], isType: true },
				{ from: './data', names: ['getNameColorsMap'] },
			]
		)

		// Is custom name color
		this.moduleBuilder.addUtilityFunction(
			'isCustomNameColor',
			[{ name: 'colorHrid', type: 'NameColorHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('return colorHrid.includes("custom_")')
			},
			[
				{ from: './types', names: ['NameColorHrid'], isType: true },
			]
		)

		// Get name colors by prefix
		this.moduleBuilder.addUtilityFunction(
			'getNameColorsByPrefix',
			[{ name: 'prefix', type: 'string' }],
			'NameColor[]',
			(writer) => {
				writer.writeLine('const lowerPrefix = prefix.toLowerCase()')
				writer.writeLine(
					'return getAllNameColors().filter(color =>',
				)
				writer.writeLine('  color.hrid.toLowerCase().startsWith(lowerPrefix)')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['NameColor'], isType: true },
			]
		)
	}
}