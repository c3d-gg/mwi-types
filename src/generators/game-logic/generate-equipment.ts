import { writeFile } from 'fs/promises'
import { join } from 'path'

import type { GameData, ItemDetail } from '../../types/source-data'

interface GeneratedEquipmentStats {
	type: string
	levelRequirements: Array<{ skillHrid: string; level: number }>
}

/**
 * Generates equipment-specific data for items that need combat/skill stats
 */
export async function generateEquipment(gameData: GameData, outputDir: string) {
	console.log('⚔️ Generating equipment data...')

	const equipmentStats: Record<string, GeneratedEquipmentStats> = {}
	const equipmentByType: Record<string, string[]> = {}
	const equipmentBySkill: Record<string, string[]> = {}

	// Process all equipment items
	for (const [itemHrid, item] of Object.entries(gameData.itemDetailMap)) {
		if (!item.equipmentDetail) continue

		// Only include essential stats
		const stats = {
			type: item.equipmentDetail.type,
			levelRequirements: item.equipmentDetail.levelRequirements
		}

		equipmentStats[itemHrid] = stats

		// Build type index
		const equipType = item.equipmentDetail.type
		if (!equipmentByType[equipType]) {
			equipmentByType[equipType] = []
		}
		equipmentByType[equipType].push(itemHrid)

		// Build skill requirement index
		for (const req of item.equipmentDetail.levelRequirements) {
			if (!equipmentBySkill[req.skillHrid]) {
				equipmentBySkill[req.skillHrid] = []
			}
			equipmentBySkill[req.skillHrid]!.push(itemHrid)
		}
	}

	// Sort arrays for consistent output
	for (const items of Object.values(equipmentByType)) {
		items.sort()
	}
	for (const items of Object.values(equipmentBySkill)) {
		items.sort()
	}

	// Generate TypeScript content
	const content = `/**
 * Auto-generated equipment data - DO NOT EDIT
 * Generated from game data on ${new Date().toISOString()}
 */

// Equipment stats type
type GeneratedEquipmentStats = {
	type: string
	levelRequirements: Array<{ skillHrid: string; level: number }>
}

/**
 * Equipment stats for all equipment items
 */
export const EQUIPMENT_STATS = ${JSON.stringify(equipmentStats, null, 2)} as const

/**
 * Equipment grouped by type
 */
export const EQUIPMENT_BY_TYPE = ${JSON.stringify(equipmentByType, null, 2)} as const

/**
 * Equipment grouped by skill requirement
 */
export const EQUIPMENT_BY_SKILL = ${JSON.stringify(equipmentBySkill, null, 2)} as const

// Type exports
export type EquipmentId = keyof typeof EQUIPMENT_STATS
export type EquipmentStats = typeof EQUIPMENT_STATS[EquipmentId]

/**
 * Get equipment stats for an item
 */
export function getEquipmentStats(itemHrid: string): EquipmentStats | undefined {
	return EQUIPMENT_STATS[itemHrid as EquipmentId]
}

/**
 * Get all equipment of a specific type
 */
export function getEquipmentByType(type: string): string[] {
	return EQUIPMENT_BY_TYPE[type] || []
}

/**
 * Get all equipment requiring a specific skill
 */
export function getEquipmentBySkill(skillHrid: string): string[] {
	return EQUIPMENT_BY_SKILL[skillHrid] || []
}

/**
 * Check if an item is equipment
 */
export function isEquipment(itemHrid: string): boolean {
	return itemHrid in EQUIPMENT_STATS
}

/**
 * Get the highest level requirement for an equipment item
 */
export function getEquipmentLevel(itemHrid: string): number {
	const stats = EQUIPMENT_STATS[itemHrid as EquipmentId]
	if (!stats || stats.levelRequirements.length === 0) return 0
	
	return Math.max(...stats.levelRequirements.map(req => req.level))
}
`

	// Write the file
	const outputPath = join(outputDir, 'equipment.ts')
	await writeFile(outputPath, content, 'utf-8')

	console.log(`✅ Generated ${Object.keys(equipmentStats).length} equipment items`)
	console.log(`   - ${Object.keys(equipmentByType).length} equipment types`)
	console.log(`   - ${Object.keys(equipmentBySkill).length} skill requirements`)

	return {
		equipmentCount: Object.keys(equipmentStats).length,
		typeCount: Object.keys(equipmentByType).length
	}
}
