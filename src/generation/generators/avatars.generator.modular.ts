import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

// AvatarOutfit interface for internal use
interface AvatarOutfit {
	hrid: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

/**
 * Modular AvatarOutfits Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularAvatarOutfitsGenerator extends ModularBaseGenerator<AvatarOutfit> {
	// Collect unique values for lookups
	private seasonalOutfits: string[] = []
	private cowbellOutfits: string[] = []
	private freeOutfits: string[] = []
	private outfitsByCost: Map<number, string[]> = new Map()

	constructor() {
		super({
			entityName: 'AvatarOutfit',
			entityNamePlural: 'AvatarOutfits',
			sourceKey: 'avatarOutfitDetailMap',
			outputPath: './src/generated/avatars/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, AvatarOutfit> {
		const outfits: Record<string, AvatarOutfit> = {}
		const avatarOutfitDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(avatarOutfitDetailMap)) {
			const outfit = this.extractAvatarOutfit(hrid as string, data as any)
			outfits[hrid] = outfit
			this.collectForLookups(outfit)
		}

		return outfits
	}

	private extractAvatarOutfit(hrid: string, data: any): AvatarOutfit {
		return {
			hrid: data.hrid || hrid,
			isSeasonal: data.isSeasonal === true,
			cowbellCost: typeof data.cowbellCost === 'number' ? data.cowbellCost : 0,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	private collectForLookups(outfit: AvatarOutfit): void {
		// Collect seasonal outfits
		if (outfit.isSeasonal) {
			this.seasonalOutfits.push(outfit.hrid)
		}

		// Collect cowbell purchasable outfits
		if (outfit.cowbellCost > 0) {
			this.cowbellOutfits.push(outfit.hrid)
			
			// Group by cost
			const costList = this.outfitsByCost.get(outfit.cowbellCost) || []
			costList.push(outfit.hrid)
			this.outfitsByCost.set(outfit.cowbellCost, costList)
		}

		// Collect free outfits (neither seasonal nor cowbell)
		if (outfit.cowbellCost === 0 && !outfit.isSeasonal) {
			this.freeOutfits.push(outfit.hrid)
		}
	}

	protected override generateTypes(): void {
		// Get the types file
		const typesFile = this.moduleBuilder.getFile('types')
		
		// Add JSDoc comment
		typesFile.addComment('Avatar outfit definitions for player customization')
		
		// Import HRIDS constant for type derivation
		typesFile.addImport('./constants', ['AVATAROUTFIT_HRIDS'])
		
		// Define the Hrid type here in types.ts
		typesFile.addType(
			'AvatarOutfitHrid',
			'(typeof AVATAROUTFIT_HRIDS)[number]',
		)
		
		// Define type properties
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
		
		// Add interface
		typesFile.addInterface('AvatarOutfit', properties)
		
		// Export from module
		this.moduleBuilder.addExport('types', 'AvatarOutfit', 'type')
		this.moduleBuilder.addExport('types', 'AvatarOutfitHrid', 'type')
	}

	protected override generateConstants(entities: Record<string, AvatarOutfit>): void {
		const constantsFile = this.moduleBuilder.getFile('constants')
		
		// Add main HRID constants
		constantsFile.addComment('Avatar outfit HRID constants')
		const hrids = Object.keys(entities)
		constantsFile.addConstArray('AVATAROUTFIT_HRIDS', hrids, true)
		
		// Add category constants
		constantsFile.addConstArray('SEASONAL_AVATAR_OUTFIT_HRIDS', this.seasonalOutfits, true)
		constantsFile.addConstArray('COWBELL_AVATAR_OUTFIT_HRIDS', this.cowbellOutfits, true)
		constantsFile.addConstArray('FREE_AVATAR_OUTFIT_HRIDS', this.freeOutfits, true)
		
		// Export from module
		this.moduleBuilder.addExport('constants', 'AVATAROUTFIT_HRIDS', 'const')
		this.moduleBuilder.addExport('constants', 'SEASONAL_AVATAR_OUTFIT_HRIDS', 'const')
		this.moduleBuilder.addExport('constants', 'COWBELL_AVATAR_OUTFIT_HRIDS', 'const')
		this.moduleBuilder.addExport('constants', 'FREE_AVATAR_OUTFIT_HRIDS', 'const')
	}

	protected override generateLookups(): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')
		
		lookupsFile.addComment('Pre-computed avatar outfit lookup tables')
		
		// Import required types
		lookupsFile.addImport('./types', ['AvatarOutfitHrid'], true)
		
		// Add outfits by cost
		const outfitsByCostObj: Record<number, readonly string[]> = {}
		for (const [cost, hrids] of this.outfitsByCost) {
			outfitsByCostObj[cost] = hrids
		}
		
		lookupsFile.addStaticLookup(
			'AVATAR_OUTFITS_BY_COST',
			'number',
			'readonly AvatarOutfitHrid[]',
			outfitsByCostObj,
		)
		
		// Export from module
		this.moduleBuilder.addExport('lookups', 'AVATAR_OUTFITS_BY_COST', 'const')
	}

	protected override generateUtils(entities: Record<string, AvatarOutfit>): void {
		const utilsFile = this.moduleBuilder.getFile('utils')
		
		utilsFile.addComment('Avatar outfit utility functions')
		
		// Import required types and data
		utilsFile.addImport('../types', ['AvatarOutfit', 'AvatarOutfitHrid'])
		utilsFile.addImport('../constants', [
			'AVATAROUTFIT_HRIDS',
			'SEASONAL_AVATAR_OUTFIT_HRIDS',
			'COWBELL_AVATAR_OUTFIT_HRIDS',
			'FREE_AVATAR_OUTFIT_HRIDS',
		])
		utilsFile.addImport('../data', ['getAvatarOutfitsMap'])
		utilsFile.addImport('../lookups', ['AVATAR_OUTFITS_BY_COST'])
		
		// isAvatarOutfitHrid - type guard
		utilsFile.addFunction(
			'isAvatarOutfitHrid',
			[{ name: 'value', type: 'string' }],
			'value is AvatarOutfitHrid',
			(writer) => {
				writer.writeLine(
					'return AVATAROUTFIT_HRIDS.includes(value as AvatarOutfitHrid)',
				)
			},
		)
		
		// getAvatarOutfit
		utilsFile.addFunction(
			'getAvatarOutfit',
			[{ name: 'hrid', type: 'AvatarOutfitHrid' }],
			'AvatarOutfit | undefined',
			(writer) => {
				writer.writeLine('return getAvatarOutfitsMap().get(hrid)')
			},
		)
		
		// requireAvatarOutfit
		utilsFile.addFunction(
			'requireAvatarOutfit',
			[{ name: 'hrid', type: 'AvatarOutfitHrid' }],
			'AvatarOutfit',
			(writer) => {
				writer.writeLine('const outfit = getAvatarOutfit(hrid)')
				writer.writeLine('if (!outfit) {')
				writer.writeLine(
					'  throw new Error(`AvatarOutfit not found: ${hrid}`)',
				)
				writer.writeLine('}')
				writer.writeLine('return outfit')
			},
		)
		
		// getAllAvatarOutfits
		utilsFile.addFunction(
			'getAllAvatarOutfits',
			[],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('return Array.from(getAvatarOutfitsMap().values())')
			},
		)
		
		// getSeasonalAvatarOutfits
		utilsFile.addFunction(
			'getSeasonalAvatarOutfits',
			[],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const map = getAvatarOutfitsMap()')
				writer.writeLine(
					'return SEASONAL_AVATAR_OUTFIT_HRIDS.map(hrid => map.get(hrid)!).filter(Boolean)',
				)
			},
		)
		
		// getCowbellAvatarOutfits
		utilsFile.addFunction(
			'getCowbellAvatarOutfits',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const map = getAvatarOutfitsMap()')
				writer.writeLine(
					'const outfits = COWBELL_AVATAR_OUTFIT_HRIDS.map(hrid => map.get(hrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return outfits')
				writer.writeLine(
					'return outfits.filter(outfit => outfit.cowbellCost <= maxCost)',
				)
			},
		)
		
		// getFreeAvatarOutfits
		utilsFile.addFunction(
			'getFreeAvatarOutfits',
			[],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const map = getAvatarOutfitsMap()')
				writer.writeLine(
					'return FREE_AVATAR_OUTFIT_HRIDS.map(hrid => map.get(hrid)!).filter(Boolean)',
				)
			},
		)
		
		// getAffordableAvatarOutfits
		utilsFile.addFunction(
			'getAffordableAvatarOutfits',
			[{ name: 'cowbells', type: 'number' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('return getAllAvatarOutfits().filter(outfit => {')
				writer.writeLine('  if (outfit.cowbellCost === 0) return true')
				writer.writeLine('  return outfit.cowbellCost <= cowbells')
				writer.writeLine('})')
			},
		)
		
		// getAvatarOutfitsByCost
		utilsFile.addFunction(
			'getAvatarOutfitsByCost',
			[{ name: 'cost', type: 'number' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const hrids = AVATAR_OUTFITS_BY_COST[cost] || []')
				writer.writeLine('const map = getAvatarOutfitsMap()')
				writer.writeLine(
					'return hrids.map(hrid => map.get(hrid)!).filter(Boolean)',
				)
			},
		)
		
		// sortAvatarOutfitsByIndex
		utilsFile.addFunction(
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
		utilsFile.addFunction(
			'searchAvatarOutfits',
			[{ name: 'searchTerm', type: 'string' }],
			'AvatarOutfit[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine('return getAllAvatarOutfits().filter(outfit =>')
				writer.writeLine('  outfit.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)
		
		// getAvatarOutfitCost
		utilsFile.addFunction(
			'getAvatarOutfitCost',
			[{ name: 'outfitHrid', type: 'AvatarOutfitHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const outfit = getAvatarOutfit(outfitHrid)')
				writer.writeLine('return outfit ? outfit.cowbellCost : 0')
			},
		)
		
		// getTotalAvatarOutfitCost
		utilsFile.addFunction(
			'getTotalAvatarOutfitCost',
			[{ name: 'outfitHrids', type: 'AvatarOutfitHrid[]' }],
			'number',
			(writer) => {
				writer.writeLine('return outfitHrids.reduce((total, hrid) => {')
				writer.writeLine('  const outfit = getAvatarOutfit(hrid)')
				writer.writeLine(
					'  return total + (outfit ? outfit.cowbellCost : 0)',
				)
				writer.writeLine('}, 0)')
			},
		)
		
		// getAvatarOutfitStats
		utilsFile.addFunction(
			'getAvatarOutfitStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: AVATAROUTFIT_HRIDS.length,')
				writer.writeLine('  seasonal: SEASONAL_AVATAR_OUTFIT_HRIDS.length,')
				writer.writeLine('  cowbell: COWBELL_AVATAR_OUTFIT_HRIDS.length,')
				writer.writeLine('  free: FREE_AVATAR_OUTFIT_HRIDS.length')
				writer.writeLine('}')
			},
		)
		
		// Export all utils from module
		this.moduleBuilder.addExport('utils', 'isAvatarOutfitHrid', 'function')
		this.moduleBuilder.addExport('utils', 'getAvatarOutfit', 'function')
		this.moduleBuilder.addExport('utils', 'requireAvatarOutfit', 'function')
		this.moduleBuilder.addExport('utils', 'getAllAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getSeasonalAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getCowbellAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getFreeAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getAffordableAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getAvatarOutfitsByCost', 'function')
		this.moduleBuilder.addExport('utils', 'sortAvatarOutfitsByIndex', 'function')
		this.moduleBuilder.addExport('utils', 'searchAvatarOutfits', 'function')
		this.moduleBuilder.addExport('utils', 'getAvatarOutfitCost', 'function')
		this.moduleBuilder.addExport('utils', 'getTotalAvatarOutfitCost', 'function')
		this.moduleBuilder.addExport('utils', 'getAvatarOutfitStats', 'function')
	}
}