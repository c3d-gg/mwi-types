export class SourceReader {
	async readJSON(filePath: string): Promise<any> {
		try {
			const content = await Bun.file(filePath).json()

			return content
		} catch (error) {
			throw new Error(`Failed to read JSON file at ${filePath}: ${error}`)
		}
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
