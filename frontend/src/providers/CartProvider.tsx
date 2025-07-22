'use client'

import { useApi } from '@/hooks/useApi'
import { getLocalCart, saveLocalCart } from '@/lib/localCart'
import {
	addProductToCart,
	getAllProductsFromCart,
	migrateProductToCart,
	removeProductFromCart,
	updateProductInCart,
} from '@/lib/services/cartServices'
import {
	CartOperation,
	ICartContext,
	ICartItem,
	IGetCartItem,
} from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext<ICartContext | null>(null)

export default function CartProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { data: session, status } = useSession()
	const hasMigrated = useRef(false)
	const [cartProducts, setCartProducts] = useState<IGetCartItem[]>([])
	const [cartCount, setCartCount] = useState(0)

	const { apiFetch } = useApi()
	const isAuthenticated = !!session?.user

	const loadCart = async () => {
		if (isAuthenticated) {
			try {
				const serverCart: IGetCartItem[] = await apiFetch(token =>
					getAllProductsFromCart(token)
				)
				setCartProducts(serverCart)
			} catch (err) {
				console.error('Failed to load server cart:', err)
			}
		} else {
			setCartProducts(getLocalCart())
		}
	}

	const migrateCart = async () => {
		if (status !== 'authenticated' || hasMigrated.current) return

		const localCart = getLocalCart()
		if (!localCart.length) return

		try {
			const serverCart: IGetCartItem[] = await apiFetch(token =>
				getAllProductsFromCart(token)
			)
			const serverKeys = new Set(
				serverCart.map(item => `${item.productId}_${item.productVariantId}`)
			)

			const toMigrate = localCart.filter(
				localItem =>
					!serverKeys.has(
						`${localItem.productId}_${localItem.productVariantId}`
					)
			)

			if (toMigrate.length > 0) {
				console.log('localCart: ', localCart)
				console.log('toMigrate: ', toMigrate)
				await apiFetch(token => migrateProductToCart(toMigrate, token))
			}

			localStorage.removeItem('cartProducts')
			hasMigrated.current = true

			await loadCart()
		} catch (err) {
			console.error('Cart migration failed:', err)
		}
	}


	useEffect(() => {
		loadCart()
	}, [isAuthenticated])

	useEffect(() => {
		migrateCart()
	}, [status])

	const triggerAnimation = () => {
		setCartCount(prev => prev + 1)
		setTimeout(() => {
			setCartCount(prev => prev - 1)
		}, 1500)
	}

	const addToCart: CartOperation = async (
		productId,
		productVariantId,
		quantity,
		maxAvailable,
		itemId
	) => {
		const existingItem = cartProducts.find(
			item =>
				item.productId === productId &&
				item.productVariantId === productVariantId
		)

		const currentQuantity = existingItem?.quantity ?? 0
		const newTotalQuantity = currentQuantity + quantity

		if (newTotalQuantity > maxAvailable) {
			toast.error('Недостатньо товару')
			throw new Error('Cannot add more than available stock.')
		}

		let updatedCart: ICartItem[]

		if (existingItem) {
			updatedCart = cartProducts.map(item =>
				item.productId === productId &&
				item.productVariantId === productVariantId
					? { ...item, quantity: newTotalQuantity }
					: item
			)
		} else {
			updatedCart = [...cartProducts, { productId, productVariantId, quantity }]
		}

		setCartProducts(updatedCart)

		if (isAuthenticated) {
			try {
				const addProductData = {
					productId: productId,
					productVariantId: productVariantId,
					quantity: quantity,
				}
				const updateProductData = {
					id: itemId!,
					productVariantId: productVariantId,
					quantity: newTotalQuantity,
				}
				if (existingItem) {
					await apiFetch(token => updateProductInCart(updateProductData, token))
				} else {
					await apiFetch(token => addProductToCart(addProductData, token))
				}
				await loadCart()
			} catch (err) {
				console.error('Failed to sync with server:', err)
				toast.error('Не вдалося синхронізувати з сервером')
				setCartProducts(cartProducts)
			}
		} else {
			saveLocalCart(updatedCart)
		}

		triggerAnimation()
		toast.success('Продукт додано')
	}

	const removeFromCart = async (
		itemId: string,
		productId: string,
		variantId: string
	) => {
		const updated = cartProducts.filter(
			item =>
				!(item.productId === productId && item.productVariantId === variantId)
		)

		setCartProducts(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token => removeProductFromCart(itemId, token))
			} catch (err) {
				console.error('Failed to remove from cart:', err)
			}
		} else {
			saveLocalCart(updated)
		}

		await loadCart()
		triggerAnimation()
	}

	const updateCartItem = async (
		itemId: string,
		newVariantId: string,
		newQuantity: number
	) => {
		if (newQuantity <= 0) {
			await apiFetch(token => removeProductFromCart(itemId, token))
			const filtered = cartProducts.filter(item => item.id !== itemId)
			setCartProducts(filtered)
			if (!isAuthenticated) saveLocalCart(filtered)
			triggerAnimation()
			return
		}

		const updated = cartProducts.map(item =>
			item.id === itemId
				? {
						...item,
						productVariantId: newVariantId,
						quantity: newQuantity,
				  }
				: item
		)

		setCartProducts(updated)

		if (isAuthenticated) {
			try {
				await apiFetch(token =>
					updateProductInCart(
						{
							id: itemId,
							productVariantId: newVariantId,
							quantity: newQuantity,
						},
						token
					)
				)
			} catch (err) {
				console.error('Failed to update cart item on server:', err)
			}
		} else {
			saveLocalCart(updated)
		}

		await loadCart()
		triggerAnimation()
	}

	const isInCart = (productId: string) =>
		cartProducts.some(item => item.productId === productId)
	const isVariantInCart = (productId: string, variantId: string) =>
		cartProducts.some(
			item =>
				item.productId === productId && item.productVariantId === variantId
		)

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				addToCart,
				removeFromCart,
				updateCartItem,
				isInCart,
				isVariantInCart,
				cartCount,
				triggerAnimation,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}
	return context
}
