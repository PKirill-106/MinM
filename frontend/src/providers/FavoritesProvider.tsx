'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getLocalFavorites, saveLocalFavorites } from '@/lib/localFavorites'
import { IFavoritesContext, IProduct } from '@/types/Interfaces'
import {
	addProductToWishList,
	getAllProductsFromWishList,
	removeProductFromWishList,
} from '@/lib/services/wishlistService'
import { useApi } from '@/hooks/useApi'

const FavoritesContext = createContext<IFavoritesContext | null>(null)

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { data: session, status } = useSession()
	const hasMigrated = useRef(false)
	const [favorites, setFavorites] = useState<string[]>([])
	const [favCount, setFavCount] = useState(0)

	const { apiFetch } = useApi()

	const isAuthenticated = !!session?.user

	const loadFavorites = async () => {
		if (isAuthenticated) {
			try {
				const serverFavorites = await apiFetch(token =>
					getAllProductsFromWishList(token)
				)
				const ids = serverFavorites.map((p: IProduct) => p.id)
				setFavorites(ids)
			} catch (err) {
				console.error('Failed to load server wishlist:', err)
			}
		} else {
			setFavorites(getLocalFavorites())
		}
	}

	const migrateFavorites = async () => {
		if (status !== 'authenticated' || hasMigrated.current) return

		const localFavorites = getLocalFavorites()
		if (!localFavorites.length) return

		try {
			const productsFromServer = await apiFetch(token =>
				getAllProductsFromWishList(token)
			)

			const serverProductIds: string[] = productsFromServer.map(
				(product: IProduct) => product.id
			)

			const toMigrate = localFavorites.filter(
				id => !serverProductIds.includes(id)
			)

			if (!toMigrate.length) {
				localStorage.removeItem('favorites')
				hasMigrated.current = true
				return
			}

			await Promise.all(
				toMigrate.map(id => apiFetch(token => addProductToWishList(id, token)))
			)

			localStorage.removeItem('favorites')
			hasMigrated.current = true

			const refreshedProducts = await apiFetch(token =>
				getAllProductsFromWishList(token)
			)
			const refreshedIds = refreshedProducts.map((p: IProduct) => p.id)
			setFavorites(refreshedIds)
		} catch (err) {
			console.error('Migration failed:', err)
		}
	}

	useEffect(() => {
		loadFavorites()
	}, [isAuthenticated])

	useEffect(() => {
		migrateFavorites()
	}, [status])

	const triggerAnimation = () => {
		setFavCount(prev => prev + 1)
		setTimeout(() => {
			setFavCount(prev => prev - 1)
		}, 1500)
	}

	const addFavorite = async (productId: string) => {
		if (favorites.includes(productId)) return

		const updated = [...favorites, productId]
		setFavorites(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token => addProductToWishList(productId, token))
			} catch (err) {
				console.error('Failed to add to wishlist:', err)
			}
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation()
	}

	const removeFavorite = async (productId: string) => {
		const updated = favorites.filter(id => id !== productId)
		setFavorites(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token => removeProductFromWishList(productId, token))
			} catch (err) {
				console.error('Failed to remove from wishlist:', err)
			}
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation()
	}

	const isFavorite = (productId: string) => favorites.includes(productId)

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
				isFavorite,
				favCount,
				triggerAnimation,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => {
	const context = useContext(FavoritesContext)
	if (!context) {
		throw new Error('useFavorites must be used within FavoritesProvider')
	}
	return context
}
