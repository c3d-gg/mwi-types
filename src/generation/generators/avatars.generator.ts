import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface AvatarOutfit {
	hrid: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

export class AvatarsGenerator extends BaseGenerator<AvatarOutfit> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'AvatarOutfit',
			entityNamePlural: 'AvatarOutfits',
			sourceKey: 'avatarOutfitDetailMap',
			outputPath: 'src/generated/types/avatars.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, AvatarOutfit> {
		const outfits: Record<string, AvatarOutfit> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const outfitData = data as any
			const outfit: AvatarOutfit = {
				hrid: outfitData.hrid,
				isSeasonal: outfitData.isSeasonal === true,
				cowbellCost: outfitData.cowbellCost || 0,
				sortIndex: outfitData.sortIndex || 0,
			}

			outfits[hrid] = outfit
		}

		return outfits
	}

	protected override generateInterfaces(
		_outfits: Record<string, AvatarOutfit>,
	): void {
		// Generate main interface with JSDoc
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'AvatarOutfitHrid',
				optional: false,
				description: 'Unique identifier for the avatar outfit',
			},
			{
				name: 'isSeasonal',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a seasonal/event outfit',
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

		this.builder.addInterface('AvatarOutfit', properties)
	}

	protected override generateUtilities(
		outfits: Record<string, AvatarOutfit>,
	): void {
		// Call base utilities first
		super.generateUtilities(outfits)

		// Generate lookup maps
		this.generateLookupMaps(outfits)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(outfits: Record<string, AvatarOutfit>): void {
		// Categorize outfits
		const seasonalOutfits: string[] = []
		const cowbellOutfits: string[] = []
		const freeOutfits: string[] = []

		for (const [hrid, outfit] of Object.entries(outfits)) {
			if (outfit.isSeasonal) {
				seasonalOutfits.push(hrid)
			}
			if (outfit.cowbellCost > 0) {
				cowbellOutfits.push(hrid)
			}
			if (outfit.cowbellCost === 0 && !outfit.isSeasonal) {
				freeOutfits.push(hrid)
			}
		}

		// Add category arrays
		this.builder.addConstArray('SEASONAL_AVATAR_OUTFITS', seasonalOutfits, true)
		this.builder.addConstArray('COWBELL_AVATAR_OUTFITS', cowbellOutfits, true)
		this.builder.addConstArray('FREE_AVATAR_OUTFITS', freeOutfits, true)
	}

	private generateSpecializedUtils(): void {
		// getSeasonalAvatarOutfits
		this.builder.addFunction(
			'getSeasonalAvatarOutfits',
			[],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine(
					'return SEASONAL_AVATAR_OUTFITS.map(hrid => AVATAROUTFITS.get(hrid as AvatarOutfitHrid)!).filter(Boolean)',
				)
			},
		)

		// getCowbellAvatarOutfits
		this.builder.addFunction(
			'getCowbellAvatarOutfits',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine(
					'const outfits = COWBELL_AVATAR_OUTFITS.map(hrid => AVATAROUTFITS.get(hrid as AvatarOutfitHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return outfits')
				writer.writeLine(
					'return outfits.filter(outfit => outfit.cowbellCost <= maxCost)',
				)
			},
		)

		// getFreeAvatarOutfits
		this.builder.addFunction(
			'getFreeAvatarOutfits',
			[],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine(
					'return FREE_AVATAR_OUTFITS.map(hrid => AVATAROUTFITS.get(hrid as AvatarOutfitHrid)!).filter(Boolean)',
				)
			},
		)

		// getAffordableAvatarOutfits
		this.builder.addFunction(
			'getAffordableAvatarOutfits',
			[{ name: 'cowbells', type: 'number' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(AVATAROUTFITS.values()).filter(outfit => {',
				)
				writer.writeLine('  if (outfit.cowbellCost === 0) return true')
				writer.writeLine('  return outfit.cowbellCost <= cowbells')
				writer.writeLine('})')
			},
		)

		// sortAvatarOutfitsByIndex
		this.builder.addFunction(
			'sortAvatarOutfitsByIndex',
			[{ name: 'outfits', type: 'AvatarOutfit[]' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine(
					'return [...outfits].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// searchAvatarOutfits
		this.builder.addFunction(
			'searchAvatarOutfits',
			[{ name: 'searchTerm', type: 'string' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(AVATAROUTFITS.values()).filter(outfit =>',
				)
				writer.writeLine('  outfit.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getAvatarOutfitStats
		this.builder.addFunction(
			'getAvatarOutfitStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: AVATAROUTFITS.size,')
				writer.writeLine('  seasonal: SEASONAL_AVATAR_OUTFITS.length,')
				writer.writeLine('  cowbell: COWBELL_AVATAR_OUTFITS.length,')
				writer.writeLine('  free: FREE_AVATAR_OUTFITS.length')
				writer.writeLine('}')
			},
		)

		// getAvatarOutfitCost
		this.builder.addFunction(
			'getAvatarOutfitCost',
			[{ name: 'outfitHrid', type: 'AvatarOutfitHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const outfit = AVATAROUTFITS.get(outfitHrid)')
				writer.writeLine('return outfit ? outfit.cowbellCost : 0')
			},
		)
	}
}
