import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { ItemDetail } from '../../types/source-data'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Item translation entry - contains only localized strings
 */
interface ItemTranslation {
	hrid: string
	name_en: string
	name_zh?: string
	description_en?: string
	description_zh?: string
}

/**
 * Item translations index
 */
interface ItemTranslationsIndex {
	items: ItemTranslation[]
	totalCount: number
	translatedCount: number
	generatedAt: string
}

/**
 * Generates JSON files containing only item translations (no game data)
 */
export async function generateItemTranslations() {
	console.log('🌐 Generating item translations...')

	// Read the full game data
	const gameDataPath = path.resolve(__dirname, '../../sources/game_data.json')
	const gameDataContent = await fs.readFile(gameDataPath, 'utf-8')

	let gameData: any
	try {
		gameData = JSON.parse(gameDataContent)
		if (!gameData?.itemDetailMap || typeof gameData.itemDetailMap !== 'object') {
			throw new Error('Invalid game data structure: missing or invalid itemDetailMap')
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

	// Extract ONLY translation data
	const translations: ItemTranslation[] = []
	let translatedCount = 0

	for (const [_hrid, item] of Object.entries(
		gameData.itemDetailMap as Record<string, ItemDetail>
	)) {
		const translation: ItemTranslation = {
			hrid: item.hrid,
			name_en: item.name // Use existing name as English
		}

		// Add Chinese name if exists
		if (zhMessages.itemNames?.[item.hrid]) {
			translation.name_zh = zhMessages.itemNames[item.hrid]
			translatedCount++
		}

		// Add descriptions if they exist
		if (enMessages.itemDescriptions?.[item.hrid]) {
			translation.description_en = enMessages.itemDescriptions[item.hrid]
		}
		if (zhMessages.itemDescriptions?.[item.hrid]) {
			translation.description_zh = zhMessages.itemDescriptions[item.hrid]
		}

		translations.push(translation)
	}

	// Sort by hrid for consistency
	translations.sort((a, b) => a.hrid.localeCompare(b.hrid))

	const translationsIndex: ItemTranslationsIndex = {
		items: translations,
		totalCount: translations.length,
		translatedCount,
		generatedAt: new Date().toISOString()
	}

	// Write translations file
	const outputPath = path.resolve(__dirname, '../../generated/translations/item-translations.json')
	await fs.mkdir(path.dirname(outputPath), { recursive: true })
	await fs.writeFile(outputPath, JSON.stringify(translationsIndex, null, 2))

	// Calculate file sizes
	const translationsSize = Buffer.byteLength(JSON.stringify(translationsIndex))
	const percentTranslated = ((translatedCount / translations.length) * 100).toFixed(1)

	console.log(`✅ Item translations generated successfully!`)
	console.log(`📦 Total items: ${translations.length}`)
	console.log(`🌐 Translated to Chinese: ${translatedCount} (${percentTranslated}%)`)
	console.log(`📂 File size: ${(translationsSize / 1024).toFixed(2)}KB`)
	console.log(`📍 Output: ${outputPath}`)

	return {
		totalCount: translations.length,
		translatedCount,
		outputPath
	}
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	generateItemTranslations().catch(console.error)
}
