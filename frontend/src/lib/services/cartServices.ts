'use server'

import { ICartItem, IUpdateCartItem } from '@/types/Interfaces'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProductsFromCart(token: string) {
	const res = await fetch(`${API_URL}/CartItem/GetAllCartProducts`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404 && res.status !== 401) throw new Error('Failed to fetch Cart')

	const { data } = await res.json()

	return data
}

export async function addProductToCart(productData: ICartItem, token: string) {
	const res = await fetch(`${API_URL}/CartItem/AddProductToCart`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404 && res.status !== 401)
		throw new Error(`Failed to add Cart: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function updateProductInCart(
	productData: IUpdateCartItem,
	token: string
) {
	const res = await fetch(`${API_URL}/CartItem/UpdateCartItem`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404 && res.status !== 401)
		throw new Error(`Failed to update Cart: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function migrateProductToCart(
	cartItems: ICartItem[],
	token: string
) {
	const res = await fetch(`${API_URL}/CartItem/ActualizeCart`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cartItems),
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404 && res.status !== 401)
		throw new Error(`Failed to migrate cart: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function removeProductFromCart(itemId: string, token: string) {
	const res = await fetch(
		`${API_URL}/CartItem/DeleteProductFromCart?itemId=${itemId}`,
		{
			method: 'DELETE',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	)

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404 && res.status !== 401)
		throw new Error(`Remove from Cart failed: ${res.status}`)

	const { data } = await res.json()

	return data
}
