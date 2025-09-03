'use server'

import { ICreateOrder } from '@/types/Interfaces'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllOrders() {
	const res = await fetch(`${API_URL}/Order/all`, {
		method: 'GET',
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch orders: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function getMyOrders(token: string) {
	const res = await fetch(`${API_URL}/Order/my`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch my orders: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function getMyOrderById(orderId: string, token: string) {
	const res = await fetch(`${API_URL}/Order/my${orderId}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to fetch my order by id: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createAuthOrder(orderData: ICreateOrder, token: string) {
	const res = await fetch(`${API_URL}/Order/create-authenticated`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(orderData),
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to create auth order: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function createGuestOrder(orderData: ICreateOrder) {
	const res = await fetch(`${API_URL}/Order/create-guest`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData),
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to create guest order: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function cancelOrder(orderId: string, token: string) {
	const res = await fetch(`${API_URL}/Order/cancel/${orderId}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to cancel order: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function updateOrderToPaid(orderId: string, token: string) {
	const res = await fetch(`${API_URL}/Order/paid/${orderId}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to set order as paid: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function updateOrder(orderId: string, status: string) {
	const res = await fetch(`${API_URL}/Order/change/${orderId}`, {
		method: 'PUT',
		credentials: 'include',
		body: status,
	})

	if (!res.ok && res.status !== 404) {
		throw new Error(`Failed to change order status: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}
