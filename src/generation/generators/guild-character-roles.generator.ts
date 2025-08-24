import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface GuildCharacterRole {
	hrid: string
	name: string
	sortIndex: number
}

export class GuildCharacterRolesGenerator extends BaseGenerator<GuildCharacterRole> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'GuildCharacterRole',
			entityNamePlural: 'GuildCharacterRoles',
			sourceKey: 'guildCharacterRoleDetailMap',
			outputPath: 'src/generated/types/guild-character-roles.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, GuildCharacterRole> {
		const roles: Record<string, GuildCharacterRole> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const roleData = data as any
			const role: GuildCharacterRole = {
				hrid: roleData.hrid,
				name: roleData.name || '',
				sortIndex: roleData.sortIndex || 0,
			}
			roles[hrid] = role
		}

		return roles
	}

	protected override generateInterfaces(
		_roles: Record<string, GuildCharacterRole>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'GuildCharacterRoleHrid',
				optional: false,
				description: 'Unique identifier for the guild character role',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the guild role',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		this.builder.addInterface('GuildCharacterRole', properties)
	}

	protected override generateUtilities(
		roles: Record<string, GuildCharacterRole>,
	): void {
		super.generateUtilities(roles)

		this.builder.addFunction(
			'sortGuildCharacterRolesByIndex',
			[{ name: 'roles', type: 'GuildCharacterRole[]' }],
			'GuildCharacterRole[]',
			(writer) => {
				writer.writeLine(
					'return [...roles].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
