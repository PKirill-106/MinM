'use server'

import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getBannerImages() {
	const res = await fetch(`${API_URL}/Banner/GetBannerImages`, {
		method: 'GET',
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch banners: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function updateBanner(formData: FormData, token: string) {
	const res = await fetch(`${API_URL}/Banner/UpdateBanner`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 401)
		throw new Error(`Banner UPDATE failed: ${res.status}`)

	revalidatePath(`/admin/banners/`)
	const { data } = await res.json()

	return data
}
