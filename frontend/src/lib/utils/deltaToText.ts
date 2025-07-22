export function deltaToText(delta: any): string {
	if (typeof delta === 'string' && !delta.startsWith('[')) {
		return delta
	}

	try {
		const parsed = typeof delta === 'string' ? JSON.parse(delta) : delta

		if (!Array.isArray(parsed)) return ''

		return parsed
			.map((op: any) => {
				if (typeof op.insert === 'string') {
					return op.insert.replace(/\n/g, ' ')
				}
				return ''
			})
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim()
			.slice(0, 160)
	} catch (e) {
		console.error('Error parsing Delta:', e)
		return ''
	}
}
