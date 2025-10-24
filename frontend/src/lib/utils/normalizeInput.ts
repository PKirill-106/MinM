export function normalizeInput(value: unknown): string {
	if (
		!value ||
		typeof value !== 'string' ||
		value.trim().toLowerCase() === 'string'
	) {
		return ''
	}
	return value
}
