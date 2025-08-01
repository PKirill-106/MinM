'use server'

import { ICreateSeason, IUpdateSeason } from '@/types/Interfaces'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllSeasons() {
	const res = await fetch(`${API_URL}/Season/GetAll`)
	if (!res.ok && res.status !== 404)
		throw new Error(`Season GET ALL failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function getSeasonById(id: string) {
	const res = await fetch(`${API_URL}/Season/GetById?id=${id}`)
	if (!res.ok) throw new Error(`Season GET BY ID failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function getSeasonBySlug(slug: string) {
	const res = await fetch(`${API_URL}/Season/${slug}`)
	if (!res.ok) throw new Error(`Season GET BY SLUG failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function createSeason(seasonData: ICreateSeason, token: string) {
	const res = await fetch(`${API_URL}/Season/Create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(seasonData),
	})
	if (!res.ok) throw new Error(`Season CREATE failed: ${res.status}`)

	revalidatePath(`/admin/seasons`)
	const { data } = await res.json()

	return data
}

export async function updateSeason(seasonData: IUpdateSeason, token: string) {
	const res = await fetch(`${API_URL}/Season/Update`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(seasonData),
	})
	if (!res.ok) throw new Error(`Season UPDATE failed: ${res.status}`)

	revalidatePath(`/admin/seasons`)
	const { data } = await res.json()

	return data
}
