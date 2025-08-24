import { readFileSync } from 'fs'
import { join } from 'path'

export class SourceReader {
	private cache: Map<string, any> = new Map()

	async readJSON(filePath: string): Promise<any> {
		if (this.cache.has(filePath)) {
			return this.cache.get(filePath)
		}

		try {
			const content = await Bun.file(filePath).text()
			const data = JSON.parse(content)
			this.cache.set(filePath, data)
			return data
		} catch (error) {
			throw new Error(`Failed to read JSON file at ${filePath}: ${error}`)
		}
	}

	readJSONSync(filePath: string): any {
		if (this.cache.has(filePath)) {
			return this.cache.get(filePath)
		}

		try {
			const content = readFileSync(filePath, 'utf-8')
			const data = JSON.parse(content)
			this.cache.set(filePath, data)
			return data
		} catch (error) {
			throw new Error(`Failed to read JSON file at ${filePath}: ${error}`)
		}
	}

	clearCache() {
		this.cache.clear()
	}

	getCachedData(filePath: string): any | undefined {
		return this.cache.get(filePath)
	}

	extractFromPath(data: any, path: string): any {
		const keys = path.split('.')
		let result = data

		for (const key of keys) {
			if (result && typeof result === 'object' && key in result) {
				result = result[key]
			} else {
				return undefined
			}
		}

		return result
	}

	getAllKeys(data: any, prefix = ''): string[] {
		const keys: string[] = []

		if (data && typeof data === 'object') {
			for (const key in data) {
				const fullKey = prefix ? `${prefix}.${key}` : key
				keys.push(fullKey)

				if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
					keys.push(...this.getAllKeys(data[key], fullKey))
				}
			}
		}

		return keys
	}
}
