import { ICartItem } from '@/types/Interfaces'

export const getLocalCart = (): ICartItem[] => {
	if (typeof window === 'undefined') return []
	const json = localStorage.getItem('cartProducts')
	try {
		return json ? JSON.parse(json) : []
	} catch {
		return []
	}
}

export const saveLocalCart = (cart: ICartItem[]) => {
	localStorage.setItem('cartProducts', JSON.stringify(cart))
	window.dispatchEvent(new Event('cartProducts-changed'))
}

export const addToCart = (id: string, productVariantId: string, quantity: number) => {
	const current = getLocalCart()
	const index = current.findIndex(
		item => item.productId === id && item.productVariantId === productVariantId
	)

	let updated: ICartItem[]
	if (index !== -1) {
		current[index].quantity += quantity
		updated = [...current]
	} else {
		updated = [...current, { productId: id, productVariantId, quantity }]
	}

	saveLocalCart(updated)
}

export const removeFromCart = (
	id: string,
	variantId: string,
	removeCompletely = true
) => {
	let current = getLocalCart()
	const index = current.findIndex(
		item => item.productId === id && item.productVariantId === variantId
	)

	if (index === -1) return

	if (removeCompletely || current[index].quantity <= 1) {
		current = current.filter(
			item => !(item.productId === id && item.productVariantId === variantId)
		)
	} else {
		current[index].quantity -= 1
	}

	saveLocalCart(current)
}

export const updateCartQuantity = (
	id: string,
	variantId: string,
	quantity: number
) => {
	const current = getLocalCart()
	const index = current.findIndex(
		item => item.productId === id && item.productVariantId === variantId
	)

	if (index === -1) return

	if (quantity <= 0) {
		removeFromCart(id, variantId)
		return
	}

	current[index].quantity = quantity
	saveLocalCart([...current])
}

export const isInCart = (id: string, variantId: string): boolean => {
	return getLocalCart().some(
		item => item.productId === id && item.productVariantId === variantId
	)
}

export const getQuantity = (id: string, variantId: string): number => {
	const item = getLocalCart().find(
		item => item.productId === id && item.productVariantId === variantId
	)
	return item?.quantity ?? 0
}
