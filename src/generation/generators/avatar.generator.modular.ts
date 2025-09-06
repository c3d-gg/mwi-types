import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

// Avatar interface for internal use
interface Avatar {
	hrid: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

/**
 * Modular Avatar Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularAvatarGenerator extends ModularBaseGenerator<Avatar> {
	// Collect unique values for lookups
	private seasonalAvatars: string[] = []
	private cowbellAvatars: string[] = []
	private freeAvatars: string[] = []
	private avatarsByCost: Map<number, string[]> = new Map()

	constructor() {
		super({
			entityName: 'Avatar',
			entityNamePlural: 'Avatars',
			sourceKey: 'avatarDetailMap',
			outputPath: './src/generated/avatars/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Avatar> {
		const avatars: Record<string, Avatar> = {}
		const avatarDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(avatarDetailMap)) {
			const avatar = this.extractAvatar(hrid as string, data as any)
			avatars[hrid] = avatar
			this.collectForLookups(avatar)
		}

		return avatars
	}

	private extractAvatar(hrid: string, data: any): Avatar {
		return {
			hrid: data.hrid || hrid,
			isSeasonal: data.isSeasonal === true,
			cowbellCost: typeof data.cowbellCost === 'number' ? data.cowbellCost : 0,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	private collectForLookups(avatar: Avatar): void {
		// Collect seasonal avatars
		if (avatar.isSeasonal) {
			this.seasonalAvatars.push(avatar.hrid)
		}

		// Collect cowbell purchasable avatars
		if (avatar.cowbellCost > 0) {
			this.cowbellAvatars.push(avatar.hrid)
			
			// Group by cost
			const costList = this.avatarsByCost.get(avatar.cowbellCost) || []
			costList.push(avatar.hrid)
			this.avatarsByCost.set(avatar.cowbellCost, costList)
		}

		// Collect free avatars (neither seasonal nor cowbell)
		if (avatar.cowbellCost === 0 && !avatar.isSeasonal) {
			this.freeAvatars.push(avatar.hrid)
		}
	}

	protected override generateTypes(): void {
		// Get the types file
		const typesFile = this.moduleBuilder.getFile('types')
		
		// Add JSDoc comment
		typesFile.addComment('Avatar definitions for player characters')
		
		// Import HRIDS constant for type derivation
		typesFile.addImport('./constants', ['AVATAR_HRIDS'])
		
		// Define the Hrid type here in types.ts
		typesFile.addType(
			'AvatarHrid',
			'(typeof AVATAR_HRIDS)[number]',
		)
		
		// Define type properties
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'AvatarHrid',
				optional: false,
				description: 'Human-readable identifier',
			},
			{
				name: 'isSeasonal',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a seasonal/event avatar',
			},
			{
				name: 'cowbellCost',
				type: 'number',
				optional: false,
				description: 'Cost in cowbells (0 = free)',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		// Add type interface
		typesFile.addInterface('Avatar', properties)
	}

	protected override generateConstants(entities: Record<string, Avatar>): void {
		const constsBuilder = this.moduleBuilder.getFile('constants')
		
		// Extract all HRIDs for the main constant
		const hrids = Object.keys(entities).sort()
		
		// Add the main HRIDS array constant
		constsBuilder.addConstArray('AVATAR_HRIDS', hrids, true)
		
		// Add the AvatarHrid type
		constsBuilder.addType('AvatarHrid', '(typeof AVATAR_HRIDS)[number]')
	}

	protected override generateLookups(entities: Record<string, Avatar>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		
		// Import necessary constants
		lookupsBuilder.addImport('./constants', ['AVATAR_HRIDS'], false)
		
		// Add category arrays
		if (this.seasonalAvatars.length > 0) {
			lookupsBuilder.addConstArray('SEASONAL_AVATAR_HRIDS', this.seasonalAvatars, true)
		}

		if (this.cowbellAvatars.length > 0) {
			lookupsBuilder.addConstArray('COWBELL_AVATAR_HRIDS', this.cowbellAvatars, true)
		}

		if (this.freeAvatars.length > 0) {
			lookupsBuilder.addConstArray('FREE_AVATAR_HRIDS', this.freeAvatars, true)
		}

		// Add cost-based lookup Map
		if (this.avatarsByCost.size > 0) {
			const costGroups: string[] = []
			for (const [cost, hrids] of Array.from(this.avatarsByCost.entries()).sort((a, b) => a[0] - b[0])) {
				costGroups.push(`[${cost}, ${JSON.stringify(hrids)}]`)
			}
			const mapInitializer = `new Map<number, string[]>([\n  ${costGroups.join(',\n  ')}\n])`
			lookupsBuilder.addConstVariable('AVATAR_HRIDS_BY_COST', 'Map<number, string[]>', mapInitializer)
		}
	}

	protected override generateUtilities(entities: Record<string, Avatar>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		
		// Import necessary types and data
		utilsBuilder.addImport('./types', ['Avatar', 'AvatarHrid'], true)
		utilsBuilder.addImport('./data', ['getAvatarsMap'], false)
		
		// Basic utility functions
		utilsBuilder.addFunction(
			'isAvatarHrid',
			[{ name: 'value', type: 'string' }],
			'value is AvatarHrid',
			(writer) => {
				writer.writeLine('return getAvatarsMap().has(value as AvatarHrid)')
			}
		)

		utilsBuilder.addFunction(
			'getAvatar',
			[{ name: 'hrid', type: 'AvatarHrid' }],
			'Avatar | undefined',
			(writer) => {
				writer.writeLine('return getAvatarsMap().get(hrid)')
			}
		)

		utilsBuilder.addFunction(
			'requireAvatar',
			[{ name: 'hrid', type: 'AvatarHrid' }],
			'Avatar',
			(writer) => {
				writer.writeLine('const avatar = getAvatarsMap().get(hrid)')
				writer.writeLine('if (!avatar) {')
				writer.writeLine('  throw new Error(`Avatar not found: ${hrid}`)')
				writer.writeLine('}')
				writer.writeLine('return avatar')
			}
		)

		utilsBuilder.addFunction(
			'getAllAvatars',
			[],
			'Avatar[]',
			(writer) => {
				writer.writeLine('return Array.from(getAvatarsMap().values())')
			}
		)

		// Category-based utility functions
		if (this.seasonalAvatars.length > 0) {
			utilsBuilder.addImport('./lookups', ['SEASONAL_AVATAR_HRIDS'], false)
			utilsBuilder.addFunction(
				'getSeasonalAvatars',
				[],
				'Avatar[]',
				(writer) => {
					writer.writeLine('return SEASONAL_AVATAR_HRIDS.map(hrid => getAvatarsMap().get(hrid as AvatarHrid)!)')
				}
			)
		}

		if (this.cowbellAvatars.length > 0) {
			utilsBuilder.addImport('./lookups', ['COWBELL_AVATAR_HRIDS'], false)
			utilsBuilder.addFunction(
				'getCowbellAvatars',
				[{ name: 'maxCost', type: 'number | undefined = undefined' }],
				'Avatar[]',
				(writer) => {
					writer.writeLine('const avatars = COWBELL_AVATAR_HRIDS.map(hrid => getAvatarsMap().get(hrid as AvatarHrid)!)')
					writer.writeLine('if (maxCost === undefined) return avatars')
					writer.writeLine('return avatars.filter(avatar => avatar.cowbellCost <= maxCost)')
				}
			)
		}

		if (this.freeAvatars.length > 0) {
			utilsBuilder.addImport('./lookups', ['FREE_AVATAR_HRIDS'], false)
			utilsBuilder.addFunction(
				'getFreeAvatars',
				[],
				'Avatar[]',
				(writer) => {
					writer.writeLine('return FREE_AVATAR_HRIDS.map(hrid => getAvatarsMap().get(hrid as AvatarHrid)!)')
				}
			)
		}

		// Sorting and filtering functions
		utilsBuilder.addFunction(
			'sortAvatarsByIndex',
			[{ name: 'avatars', type: 'Avatar[]' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine('return [...avatars].sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		utilsBuilder.addFunction(
			'getAffordableAvatars',
			[{ name: 'cowbells', type: 'number' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine('return getAllAvatars().filter(avatar => {')
				writer.writeLine('  if (avatar.cowbellCost === 0) return true')
				writer.writeLine('  return avatar.cowbellCost <= cowbells')
				writer.writeLine('})')
			}
		)

		// Cost-based functions
		if (this.avatarsByCost.size > 0) {
			utilsBuilder.addImport('./lookups', ['AVATAR_HRIDS_BY_COST'], false)
			utilsBuilder.addFunction(
				'getAvatarsByCost',
				[{ name: 'cost', type: 'number' }],
				'Avatar[]',
				(writer) => {
					writer.writeLine('const hrids = AVATAR_HRIDS_BY_COST.get(cost) || []')
					writer.writeLine('return hrids.map(hrid => getAvatarsMap().get(hrid as AvatarHrid)!)')
				}
			)
		}

		// Stats function
		utilsBuilder.addFunction(
			'getAvatarStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine(`  total: ${Object.keys(entities).length},`)
				writer.writeLine(`  seasonal: ${this.seasonalAvatars.length},`)
				writer.writeLine(`  cowbell: ${this.cowbellAvatars.length},`)
				writer.writeLine(`  free: ${this.freeAvatars.length}`)
				writer.writeLine('}')
			}
		)
	}

}