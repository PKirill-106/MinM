export const getLocalFavorites = (): string[] => {
	if (typeof window === 'undefined') return []
	const json = localStorage.getItem('favorites')
	try {
		return json ? JSON.parse(json) : []
	} catch {
		return []
	}
}

export const addToFavorites = (id: string) => {
	const current = getLocalFavorites()
	const updated = Array.from(new Set([...current, id]))
	localStorage.setItem('favorites', JSON.stringify(updated))
}

export const removeFromFavorites = (id: string) => {
	const current = getLocalFavorites()
	const updated = current.filter(itemId => itemId !== id)
	localStorage.setItem('favorites', JSON.stringify(updated))
}

export const isFavorite = (id: string) => {
	return getLocalFavorites().includes(id)
}

export const saveLocalFavorites = (favorites: string[]) => {
	localStorage.setItem('favorites', JSON.stringify(favorites))
}
