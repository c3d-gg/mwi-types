import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface GuildCharacterRole {
	hrid: string
	name: string
	sortIndex: number
}

export class GuildCharacterRolesGeneratorModular extends ModularBaseGenerator<GuildCharacterRole> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'GuildCharacterRole',
			entityNamePlural: 'GuildCharacterRoles',
			sourceKey: 'guildCharacterRoleDetailMap',
			outputPath: './src/generated/guild-character-roles',
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
			const roleData = this.cleanEntityData(data as any)
			const role: GuildCharacterRole = {
				hrid: roleData.hrid || '',
				name: roleData.name || '',
				sortIndex:
					typeof roleData.sortIndex === 'number' ? roleData.sortIndex : 0,
			}
			roles[hrid] = role
		}

		return roles
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['GUILDCHARACTERROLE_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType(
			'GuildCharacterRoleHrid',
			'typeof GUILDCHARACTERROLE_HRIDS[number]',
		)

		// Generate interface
		typesBuilder.addInterface('GuildCharacterRole', [
			{ name: 'hrid', type: 'GuildCharacterRoleHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'GuildCharacterRole', 'type')
		this.moduleBuilder.addExport('types', 'GuildCharacterRoleHrid', 'type')
	}

	protected override generateConstants(
		entities: Record<string, GuildCharacterRole>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('GUILDCHARACTERROLE_HRIDS', hrids, true)
		this.moduleBuilder.addExport(
			'constants',
			'GUILDCHARACTERROLE_HRIDS',
			'const',
		)

		// Add special role constants
		const leaderRole = Object.values(entities).find(
			(r) => r.hrid === '/guild_character_roles/leader',
		)
		const memberRole = Object.values(entities).find(
			(r) => r.hrid === '/guild_character_roles/member',
		)
		const officerRole = Object.values(entities).find(
			(r) => r.hrid === '/guild_character_roles/officer',
		)
		const recruiterRole = Object.values(entities).find(
			(r) => r.hrid === '/guild_character_roles/recruiter',
		)

		if (leaderRole) {
			constantsBuilder.addConstVariable(
				'GUILD_LEADER_ROLE_HRID',
				'GuildCharacterRoleHrid',
				`'${leaderRole.hrid}' as GuildCharacterRoleHrid`,
			)
			this.moduleBuilder.addExport(
				'constants',
				'GUILD_LEADER_ROLE_HRID',
				'const',
			)
		}
		if (memberRole) {
			constantsBuilder.addConstVariable(
				'GUILD_MEMBER_ROLE_HRID',
				'GuildCharacterRoleHrid',
				`'${memberRole.hrid}' as GuildCharacterRoleHrid`,
			)
			this.moduleBuilder.addExport(
				'constants',
				'GUILD_MEMBER_ROLE_HRID',
				'const',
			)
		}
		if (officerRole) {
			constantsBuilder.addConstVariable(
				'GUILD_OFFICER_ROLE_HRID',
				'GuildCharacterRoleHrid',
				`'${officerRole.hrid}' as GuildCharacterRoleHrid`,
			)
			this.moduleBuilder.addExport(
				'constants',
				'GUILD_OFFICER_ROLE_HRID',
				'const',
			)
		}
		if (recruiterRole) {
			constantsBuilder.addConstVariable(
				'GUILD_RECRUITER_ROLE_HRID',
				'GuildCharacterRoleHrid',
				`'${recruiterRole.hrid}' as GuildCharacterRoleHrid`,
			)
			this.moduleBuilder.addExport(
				'constants',
				'GUILD_RECRUITER_ROLE_HRID',
				'const',
			)
		}
	}

	protected override generateLazyData(
		entities: Record<string, GuildCharacterRole>,
	): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport(
			'./types',
			['GuildCharacterRole', 'GuildCharacterRoleHrid'],
			true,
		)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'GUILDCHARACTERROLES',
			'getGuildCharacterRolesMap',
			'loadGuildCharacterRoles',
			'GuildCharacterRoleHrid',
			'GuildCharacterRole',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getGuildCharacterRolesMap')
	}

	protected override generateLookups(
		entities: Record<string, GuildCharacterRole>,
	): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['GuildCharacterRoleHrid'], true)

		// Group roles by sortIndex
		const sortedRoles = Object.values(entities).sort(
			(a, b) => a.sortIndex - b.sortIndex,
		)
		const sortedHrids = sortedRoles.map((r) => r.hrid)

		// Use const array for sorted list
		lookupsBuilder.addConstArray(
			'GUILDCHARACTERROLES_BY_SORT_INDEX',
			sortedHrids,
			true,
		)
		this.moduleBuilder.addExport(
			'lookups',
			'GUILDCHARACTERROLES_BY_SORT_INDEX',
			'const',
		)
	}

	protected override generateUtilities(
		entities: Record<string, GuildCharacterRole>,
	): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsBuilder.addImport(
			'./types',
			['GuildCharacterRole', 'GuildCharacterRoleHrid'],
			true,
		)
		utilsBuilder.addImport('./data', ['getGuildCharacterRolesMap'], false)
		utilsBuilder.addImport('./constants', ['GUILDCHARACTERROLE_HRIDS'], false)
		utilsBuilder.addImport(
			'./lookups',
			['GUILDCHARACTERROLES_BY_SORT_INDEX'],
			false,
		)

		// Generate standard utilities

		// Type guard
		utilsBuilder.addFunction(
			'isGuildCharacterRoleHrid',
			[{ name: 'value', type: 'string' }],
			'value is GuildCharacterRoleHrid',
			(writer) => {
				writer.writeLine(
					'return GUILDCHARACTERROLE_HRIDS.includes(value as GuildCharacterRoleHrid)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'isGuildCharacterRoleHrid')

		// Getter functions
		utilsBuilder.addFunction(
			'getGuildCharacterRole',
			[{ name: 'hrid', type: 'GuildCharacterRoleHrid' }],
			'GuildCharacterRole | undefined',
			(writer) => {
				writer.writeLine('return getGuildCharacterRolesMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getGuildCharacterRole')

		utilsBuilder.addFunction(
			'requireGuildCharacterRole',
			[{ name: 'hrid', type: 'GuildCharacterRoleHrid' }],
			'GuildCharacterRole',
			(writer) => {
				writer.writeLine('const entity = getGuildCharacterRolesMap().get(hrid)')
				writer.writeLine('if (!entity) {')
				writer.writeLine(
					'  throw new Error(`GuildCharacterRole not found: ${hrid}`)',
				)
				writer.writeLine('}')
				writer.writeLine('return entity')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireGuildCharacterRole')

		utilsBuilder.addFunction(
			'getAllGuildCharacterRoles',
			[],
			'GuildCharacterRole[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(getGuildCharacterRolesMap().values())',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getAllGuildCharacterRoles')

		// Sort by index
		utilsBuilder.addFunction(
			'sortGuildCharacterRolesByIndex',
			[{ name: 'roles', type: 'GuildCharacterRole[]' }],
			'GuildCharacterRole[]',
			(writer) => {
				writer.writeLine(
					'return roles.slice().sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'sortGuildCharacterRolesByIndex')

		// Get sorted roles
		utilsBuilder.addFunction(
			'getGuildCharacterRolesSorted',
			[],
			'GuildCharacterRole[]',
			(writer) => {
				writer.writeLine('const map = getGuildCharacterRolesMap()')
				writer.writeLine(
					'return GUILDCHARACTERROLES_BY_SORT_INDEX.map(hrid => map.get(hrid)!)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getGuildCharacterRolesSorted')

		// Check if role is leadership (leader or officer)
		utilsBuilder.addFunction(
			'isLeadershipRole',
			[{ name: 'hrid', type: 'GuildCharacterRoleHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine(`return hrid === 'leader' || hrid === 'officer'`)
			},
		)
		this.moduleBuilder.addExport('utils', 'isLeadershipRole')

		// Check if role has permissions (not just member)
		utilsBuilder.addFunction(
			'hasGuildPermissions',
			[{ name: 'hrid', type: 'GuildCharacterRoleHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine(`return hrid !== 'member'`)
			},
		)
		this.moduleBuilder.addExport('utils', 'hasGuildPermissions')
	}
}
