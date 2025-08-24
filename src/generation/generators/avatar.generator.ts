import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

interface Avatar {
	hrid: string
	isSeasonal: boolean
	cowbellCost: number
	sortIndex: number
}

/**
 * Avatar Generator - Handles Avatar entities from avatarDetailMap
 *
 * This generator processes the avatarDetailMap (85 avatars) to create:
 * - Avatar interface
 * - AvatarHrid type
 * - Utility functions for working with avatars
 *
 * Separate from AvatarsGenerator which handles AvatarOutfits.
 */
export class AvatarGenerator extends BaseGenerator<Avatar> {
	constructor() {
		super({
			entityName: 'Avatar',
			entityNamePlural: 'Avatars',
			sourceKey: 'avatarDetailMap',
			outputPath: 'src/generated/types/avatar.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Avatar> {
		const avatars: Record<string, Avatar> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const avatarData = data as any
			const avatar: Avatar = {
				hrid: avatarData.hrid,
				isSeasonal: avatarData.isSeasonal === true,
				cowbellCost: avatarData.cowbellCost || 0,
				sortIndex: avatarData.sortIndex || 0,
			}

			avatars[hrid] = avatar
		}

		console.log(`  👤 Extracted ${Object.keys(avatars).length} avatars`)

		return avatars
	}

	protected override generateInterfaces(
		_avatars: Record<string, Avatar>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'AvatarHrid',
				optional: false,
				description: 'Unique identifier for the avatar',
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
				description: 'Cost in cowbells (0 if not purchasable)',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('Avatar', properties)
	}

	protected override generateUtilities(avatars: Record<string, Avatar>): void {
		// Call base utilities first
		super.generateUtilities(avatars)

		// Generate lookup maps
		this.generateLookupMaps(avatars)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(avatars: Record<string, Avatar>): void {
		// Categorize avatars
		const seasonalAvatars: string[] = []
		const cowbellAvatars: string[] = []
		const freeAvatars: string[] = []

		for (const [hrid, avatar] of Object.entries(avatars)) {
			if (avatar.isSeasonal) {
				seasonalAvatars.push(hrid)
			}
			if (avatar.cowbellCost > 0) {
				cowbellAvatars.push(hrid)
			}
			if (avatar.cowbellCost === 0 && !avatar.isSeasonal) {
				freeAvatars.push(hrid)
			}
		}

		// Add category arrays
		this.builder.addConstArray('SEASONAL_AVATARS', seasonalAvatars, true)
		this.builder.addConstArray('COWBELL_AVATARS', cowbellAvatars, true)
		this.builder.addConstArray('FREE_AVATARS', freeAvatars, true)
	}

	private generateSpecializedUtils(): void {
		// getSeasonalAvatars
		this.builder.addFunction('getSeasonalAvatars', [], 'Avatar[]', (writer) => {
			writer.writeLine(
				'return SEASONAL_AVATARS.map(hrid => AVATARS.get(hrid as AvatarHrid)!).filter(Boolean)',
			)
		})

		// getCowbellAvatars
		this.builder.addFunction(
			'getCowbellAvatars',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine(
					'const avatars = COWBELL_AVATARS.map(hrid => AVATARS.get(hrid as AvatarHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return avatars')
				writer.writeLine(
					'return avatars.filter(avatar => avatar.cowbellCost <= maxCost)',
				)
			},
		)

		// getFreeAvatars
		this.builder.addFunction('getFreeAvatars', [], 'Avatar[]', (writer) => {
			writer.writeLine(
				'return FREE_AVATARS.map(hrid => AVATARS.get(hrid as AvatarHrid)!).filter(Boolean)',
			)
		})

		// getAffordableAvatars
		this.builder.addFunction(
			'getAffordableAvatars',
			[{ name: 'cowbells', type: 'number' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(AVATARS.values()).filter(avatar => {',
				)
				writer.writeLine('  if (avatar.cowbellCost === 0) return true')
				writer.writeLine('  return avatar.cowbellCost <= cowbells')
				writer.writeLine('})')
			},
		)

		// sortAvatarsByIndex
		this.builder.addFunction(
			'sortAvatarsByIndex',
			[{ name: 'avatars', type: 'Avatar[]' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine(
					'return [...avatars].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// searchAvatars
		this.builder.addFunction(
			'searchAvatars',
			[{ name: 'searchTerm', type: 'string' }],
			'Avatar[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine('return Array.from(AVATARS.values()).filter(avatar =>')
				writer.writeLine('  avatar.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getAvatarStats
		this.builder.addFunction(
			'getAvatarStats',
			[],
			'{ total: number, seasonal: number, cowbell: number, free: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: AVATARS.size,')
				writer.writeLine('  seasonal: SEASONAL_AVATARS.length,')
				writer.writeLine('  cowbell: COWBELL_AVATARS.length,')
				writer.writeLine('  free: FREE_AVATARS.length')
				writer.writeLine('}')
			},
		)

		// getAvatarCost
		this.builder.addFunction(
			'getAvatarCost',
			[{ name: 'avatarHrid', type: 'AvatarHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const avatar = AVATARS.get(avatarHrid)')
				writer.writeLine('return avatar ? avatar.cowbellCost : 0')
			},
		)
	}
}
