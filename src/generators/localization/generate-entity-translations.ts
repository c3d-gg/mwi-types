import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Translation entry interfaces - contain only localized strings
 */
interface SkillTranslation {
	hrid: string
	name_en: string
	name_zh?: string
	description_en?: string
	description_zh?: string
}

interface ActionTranslation {
	hrid: string
	name_en: string
	name_zh?: string
	description_en?: string
	description_zh?: string
}

interface AbilityTranslation {
	hrid: string
	name_en: string
	name_zh?: string
	description_en?: string
	description_zh?: string
}

interface HouseRoomTranslation {
	hrid: string
	name_en: string
	name_zh?: string
	description_en?: string
	description_zh?: string
}

/**
 * Translation index interfaces
 */
interface TranslationIndex<T> {
	items: T[]
	totalCount: number
	translatedCount: number
	generatedAt: string
}

/**
 * Generates JSON files containing only entity translations (no game data)
 */
export async function generateEntityTranslations() {
	console.log('🌐 Generating entity translations...')

	// Read the full game data
	const gameDataPath = path.resolve(__dirname, '../../sources/game_data.json')
	const gameDataContent = await fs.readFile(gameDataPath, 'utf-8')

	let gameData: any
	try {
		gameData = JSON.parse(gameDataContent)
		// Validate all required maps
		const requiredMaps = [
			'skillDetailMap',
			'actionDetailMap',
			'abilityDetailMap',
			'houseRoomDetailMap'
		]
		for (const map of requiredMaps) {
			if (!gameData[map] || typeof gameData[map] !== 'object') {
				throw new Error(`Invalid game data structure: missing or invalid ${map}`)
			}
		}
	} catch (error) {
		console.error('❌ Failed to parse game data:', error)
		throw error
	}

	// Read translation files from sources
	const localesDir = path.resolve(__dirname, '../../sources/locales')
	const enMessagesPath = path.join(localesDir, 'en.json')
	const zhMessagesPath = path.join(localesDir, 'zh.json')

	let enMessages: any, zhMessages: any
	try {
		enMessages = JSON.parse(await fs.readFile(enMessagesPath, 'utf-8'))
		zhMessages = JSON.parse(await fs.readFile(zhMessagesPath, 'utf-8'))
		console.log(`✅ Found translation files in: ${localesDir}`)
	} catch (error) {
		console.error('❌ Failed to read translation files:', error)
		throw new Error(`Could not find translation files in ${localesDir}`)
	}

	// Process Skills
	console.log('\n📚 Processing skill translations...')
	const skillTranslations: SkillTranslation[] = []
	let skillsTranslated = 0

	for (const [_hrid, skill] of Object.entries(gameData.skillDetailMap as Record<string, any>)) {
		const translation: SkillTranslation = {
			hrid: skill.hrid,
			name_en: skill.name
		}

		if (zhMessages.skillNames?.[skill.hrid]) {
			translation.name_zh = zhMessages.skillNames[skill.hrid]
			skillsTranslated++
		}

		if (enMessages.skillDescriptions?.[skill.hrid]) {
			translation.description_en = enMessages.skillDescriptions[skill.hrid]
		}
		if (zhMessages.skillDescriptions?.[skill.hrid]) {
			translation.description_zh = zhMessages.skillDescriptions[skill.hrid]
		}

		skillTranslations.push(translation)
	}

	// Process Actions
	console.log('\n⚡ Processing action translations...')
	const actionTranslations: ActionTranslation[] = []
	let actionsTranslated = 0

	for (const [_hrid, action] of Object.entries(gameData.actionDetailMap as Record<string, any>)) {
		const translation: ActionTranslation = {
			hrid: action.hrid,
			name_en: action.name
		}

		if (zhMessages.actionNames?.[action.hrid]) {
			translation.name_zh = zhMessages.actionNames[action.hrid]
			actionsTranslated++
		}

		if (enMessages.actionDescriptions?.[action.hrid]) {
			translation.description_en = enMessages.actionDescriptions[action.hrid]
		}
		if (zhMessages.actionDescriptions?.[action.hrid]) {
			translation.description_zh = zhMessages.actionDescriptions[action.hrid]
		}

		actionTranslations.push(translation)
	}

	// Process Abilities (Buffs)
	console.log('\n🎯 Processing ability translations...')
	const abilityTranslations: AbilityTranslation[] = []
	let abilitiesTranslated = 0

	for (const [_hrid, ability] of Object.entries(gameData.abilityDetailMap as Record<string, any>)) {
		const translation: AbilityTranslation = {
			hrid: ability.hrid,
			name_en: ability.name
		}

		// Use existing description as English if available
		if (ability.description) {
			translation.description_en = ability.description
		}

		if (zhMessages.abilityNames?.[ability.hrid]) {
			translation.name_zh = zhMessages.abilityNames[ability.hrid]
			abilitiesTranslated++
		}

		if (zhMessages.abilityDescriptions?.[ability.hrid]) {
			translation.description_zh = zhMessages.abilityDescriptions[ability.hrid]
		}

		abilityTranslations.push(translation)
	}

	// Process House Rooms
	console.log('\n🏠 Processing house room translations...')
	const houseRoomTranslations: HouseRoomTranslation[] = []
	let houseRoomsTranslated = 0

	for (const [_hrid, room] of Object.entries(gameData.houseRoomDetailMap as Record<string, any>)) {
		const translation: HouseRoomTranslation = {
			hrid: room.hrid,
			name_en: room.name
		}

		if (zhMessages.houseRoomNames?.[room.hrid]) {
			translation.name_zh = zhMessages.houseRoomNames[room.hrid]
			houseRoomsTranslated++
		}

		if (enMessages.houseRoomDescriptions?.[room.hrid]) {
			translation.description_en = enMessages.houseRoomDescriptions[room.hrid]
		}
		if (zhMessages.houseRoomDescriptions?.[room.hrid]) {
			translation.description_zh = zhMessages.houseRoomDescriptions[room.hrid]
		}

		houseRoomTranslations.push(translation)
	}

	// Sort all translations by hrid for consistency
	skillTranslations.sort((a, b) => a.hrid.localeCompare(b.hrid))
	actionTranslations.sort((a, b) => a.hrid.localeCompare(b.hrid))
	abilityTranslations.sort((a, b) => a.hrid.localeCompare(b.hrid))
	houseRoomTranslations.sort((a, b) => a.hrid.localeCompare(b.hrid))

	// Create translation indices
	const skillIndex: TranslationIndex<SkillTranslation> = {
		items: skillTranslations,
		totalCount: skillTranslations.length,
		translatedCount: skillsTranslated,
		generatedAt: new Date().toISOString()
	}

	const actionIndex: TranslationIndex<ActionTranslation> = {
		items: actionTranslations,
		totalCount: actionTranslations.length,
		translatedCount: actionsTranslated,
		generatedAt: new Date().toISOString()
	}

	const abilityIndex: TranslationIndex<AbilityTranslation> = {
		items: abilityTranslations,
		totalCount: abilityTranslations.length,
		translatedCount: abilitiesTranslated,
		generatedAt: new Date().toISOString()
	}

	const houseRoomIndex: TranslationIndex<HouseRoomTranslation> = {
		items: houseRoomTranslations,
		totalCount: houseRoomTranslations.length,
		translatedCount: houseRoomsTranslated,
		generatedAt: new Date().toISOString()
	}

	// Write all translation files
	const outputDir = path.resolve(__dirname, '../../generated/translations')
	await fs.mkdir(outputDir, { recursive: true })

	await fs.writeFile(
		path.join(outputDir, 'skill-translations.json'),
		JSON.stringify(skillIndex, null, 2)
	)

	await fs.writeFile(
		path.join(outputDir, 'action-translations.json'),
		JSON.stringify(actionIndex, null, 2)
	)

	await fs.writeFile(
		path.join(outputDir, 'ability-translations.json'),
		JSON.stringify(abilityIndex, null, 2)
	)

	await fs.writeFile(
		path.join(outputDir, 'house-room-translations.json'),
		JSON.stringify(houseRoomIndex, null, 2)
	)

	// Statistics
	console.log('\n✅ Entity translations generated successfully!')
	console.log('\n📊 Statistics:')
	console.log(
		`📚 Skills: ${skillTranslations.length} total, ${skillsTranslated} translated (${((skillsTranslated / skillTranslations.length) * 100).toFixed(1)}%)`
	)
	console.log(
		`⚡ Actions: ${actionTranslations.length} total, ${actionsTranslated} translated (${((actionsTranslated / actionTranslations.length) * 100).toFixed(1)}%)`
	)
	console.log(
		`🎯 Abilities: ${abilityTranslations.length} total, ${abilitiesTranslated} translated (${((abilitiesTranslated / abilityTranslations.length) * 100).toFixed(1)}%)`
	)
	console.log(
		`🏠 House Rooms: ${houseRoomTranslations.length} total, ${houseRoomsTranslated} translated (${((houseRoomsTranslated / houseRoomTranslations.length) * 100).toFixed(1)}%)`
	)

	return {
		skills: { totalCount: skillTranslations.length, translatedCount: skillsTranslated },
		actions: { totalCount: actionTranslations.length, translatedCount: actionsTranslated },
		abilities: { totalCount: abilityTranslations.length, translatedCount: abilitiesTranslated },
		houseRooms: { totalCount: houseRoomTranslations.length, translatedCount: houseRoomsTranslated }
	}
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	generateEntityTranslations().catch(console.error)
}
