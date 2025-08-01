'use server'

import { IDeleteCategory } from '@/types/Interfaces'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllCategories() {
	const res = await fetch(`${API_URL}/Category/GetAll`, {
		method: 'GET',
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch categories: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createCategory(formData: FormData, token: string) {
	const res = await fetch(`${API_URL}/Category/Create`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	})

	if (!res.ok) throw new Error(`Category CREATE failed: ${res.status}`)

	revalidatePath(`/admin/products`)
	const { data } = await res.json()

	return data
}

export async function updateCategory(formData: FormData, token: string) {
	const res = await fetch(`${API_URL}/Category/Update`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${token}` },
		body: formData,
	})
	if (!res.ok) throw new Error(`Category UPDATE failed: ${res.status}`)

	revalidatePath(`/admin/products`)
	const { data } = await res.json()

	return data
}

export async function deleteCategory(
	categoryData: IDeleteCategory,
	token: string
) {
	const res = await fetch(`${API_URL}/Category/Delete`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(categoryData),
	})

	if (!res.ok) throw new Error(`Category DELETE failed: ${res.status}`)

	revalidatePath(`/admin/products`)
	return true
}
