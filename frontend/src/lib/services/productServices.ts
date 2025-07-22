'use server'

import { IDeleteProduct } from '@/types/Interfaces'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// if (process.env.NODE_ENV === 'development') {
// 	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
// }

export async function getAllProducts() {
	const res = await fetch(`${API_URL}/api/Product/GetAll`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch products: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
export async function getProductBySlug(slug: string) {
	const res = await fetch(`${API_URL}/api/Product/${slug}`, {
		method: 'GET',
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch product by slug: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createProduct(
	formData: FormData,
	token: string,
	slug: string | undefined
) {
	const res = await fetch(`${API_URL}/api/Product/Create`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	})
	if (!res.ok) {
		const errorText = await res.text()
		console.error('Server response:', errorText)
		throw new Error(`Product CREATE failed: ${res.status} - ${errorText}`)
	}

	revalidatePath(`/admin/products/${slug}`)
	const { data } = await res.json()

	return data
}

export async function updateProduct(
	formData: FormData,
	token: string,
	slug: string | undefined
) {
	const res = await fetch(`${API_URL}/api/Product/Update`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	})
	if (!res.ok) throw new Error(`Product UPDATE failed: ${res.status}`)

	revalidatePath(`/admin/products/${slug}`)
	const { data } = await res.json()

	return data
}

export async function deleteProduct(
	productId: IDeleteProduct,
	token: string,
	slug: string | undefined
) {
	const res = await fetch(`${API_URL}/api/Product/Delete?id=${productId.id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify(productId),
	})
	if (!res.ok) throw new Error(`Product DELETE failed: ${res.status}`)

	revalidatePath(`/admin/products/${slug}`)
	return true
}

export async function getAllColors() {
	const res = await fetch(`${API_URL}/api/Product/GetAllColors`, {
		method: 'GET',
	})

	if (!res.ok) {
		const error = await res.text()
		console.error('Fetch colors failed:', error)
		throw new Error(`Failed to fetch colors: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
