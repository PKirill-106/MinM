'use server'

import { ICreateReview } from '@/types/Interfaces'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllReviews(productId: string) {
	const res = await fetch(`${API_URL}/Review/all/${productId}`, {
		method: 'GET',
		credentials: 'include',
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch reviews: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createReview(reviewData: ICreateReview, token: string) {
	const res = await fetch(`${API_URL}/Review/create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(reviewData),
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to create review: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function deleteReview(reviewId: string, token: string) {
	const res = await fetch(`${API_URL}/Review/${reviewId}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` },
	})

	if (res.status === 401) {
		const error = new Error('Unauthorized (401)')
		;(error as any).status = 401
		;(error as any).digest = 'UNAUTHORIZED_ERROR'
		throw error
	}

	if (!res.ok && res.status !== 401)
		throw new Error(`Review DELETE failed: ${res.status}`)

	return true
}
