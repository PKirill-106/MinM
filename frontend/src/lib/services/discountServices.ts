'use server'

import { ICreateDiscount, IUpdateDiscount } from '@/types/Interfaces'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllDiscounts() {
	const res = await fetch(`${API_URL}/Discount/GetAll`)

	if (!res.ok && res.status !== 404)
		throw new Error(`Discount GET ALL failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function getDiscountById(id: string) {
	const res = await fetch(`${API_URL}/Discount/${id}`)
	if (!res.ok) throw new Error(`Discount GET BY ID failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function createDiscount(
	discountDate: ICreateDiscount,
	token: string
) {
	const res = await fetch(`${API_URL}/Discount/Create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(discountDate),
	})
	if (!res.ok) throw new Error(`Discount CREATE failed: ${res.status}`)

	revalidatePath(`/admin/discounts`)
	const { data } = await res.json()

	return data
}

export async function updateDiscount(
	discountDate: IUpdateDiscount,
	token: string
) {
	const res = await fetch(`${API_URL}/Discount/Update`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(discountDate),
	})
	if (!res.ok) throw new Error(`Discount UPDATE failed: ${res.status}`)

	revalidatePath(`/admin/discounts`)
	const { data } = await res.json()

	return data
}
