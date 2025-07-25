'use server'

import { IApiError, ISignUpUser, IUpdateUserInfo } from '@/types/Interfaces'
import { revalidatePath } from 'next/cache'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function signUpUser(userData: ISignUpUser) {
	const res = await fetch(`${API_URL}/User/Register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})

	if (!res.ok) {
		const errorData: IApiError = await res.json().catch(() => ({}))

		if (res.status === 400 && errorData.errors?.DuplicateUserName) {
			throw new Error(
				'Цей email вже зареєстрований. Використайте інший email або увійдіть у систему.'
			)
		}

		if (res.status === 400 && errorData.errors) {
			const passwordErrors = errorData.errors
			let errorMessage = 'Пароль повинен містити мінімум: '

			const requirements = []
			if (passwordErrors.PasswordTooShort) requirements.push('8 символів')
			if (passwordErrors.PasswordRequiresNonAlphanumeric)
				requirements.push('1 спецсимвол (!@# і т.д.)')
			if (passwordErrors.PasswordRequiresDigit)
				requirements.push('1 цифра (0-9)')
			if (passwordErrors.PasswordRequiresUpper)
				requirements.push('1 велика літера (A-Z)')

			if (requirements.length > 0) {
				errorMessage += requirements.join(', ')
				throw new Error(errorMessage)
			}
		}

		throw new Error(
			errorData.message || 'Сталася невідома помилка під час реєстрації'
		)
	}
	return true
}

export async function signInUser(credentials: {
	email: string
	password: string
}) {
	const res = await fetch(`${API_URL}/User/Login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '[No body]')
		console.error('Backend returned non-200:', res.status, text)
		throw new Error(`Failed to sign in: ${res.status}`)
	}

	const data = await res.json()

	if (!data?.data) {
		throw new Error('Missing tokens in response')
	}

	return {
		email: credentials.email,
		accessToken: data.data.accessToken,
		refreshToken: data.data.refreshToken,
		expiresAt: data.data.expiresAt,
	}
}

export async function logout(accessToken: string, refreshToken: string) {
	try {
		const res = await fetch(`${API_URL}/User/Logout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				accessToken,
				refreshToken,
			}),
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Logout failed')
		}

		const data = await res.json()

		return {
			success: true,
			message: data.message || 'Logged out successfully',
		}
	} catch (error) {
		console.error('Logout error:', error)
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Logout failed',
		}
	}
}

export async function getUserInfo(token: string) {
	const res = await fetch(`${API_URL}/User/UserInfo`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch user info: ${res.status}`)
	}

	const { data } = await res.json()

	return data
}

export async function updateUserInfo(userData: IUpdateUserInfo, token: string) {
	const res = await fetch(`${API_URL}/User/UpdateInfo`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userData),
	})

	if (!res.ok) {
		throw new Error(`Failed to update user info: ${res.status}`)
	}

	const { data } = await res.json()
	revalidatePath(`/profile`)
	return data
}

export async function refreshTokens(accessToken: string, refreshToken: string) {
	try {
		const res = await fetch(`${API_URL}/User/RefreshToken`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ accessToken, refreshToken }),
		})

		const data = await res.json()

		if (!res.ok || !data?.data?.accessToken) {
			throw new Error(data.message || 'REFRESH_FAILED')
		}

		return {
			accessToken: data.data.accessToken,
			refreshToken: data.data.refreshToken || refreshToken,
			expiresAt:
				data.data.expiresAt ||
				new Date(Date.now() + 15 * 60 * 1000).toISOString(),
		}
	} catch (error) {
		console.error('[refreshTokens] Error:', error)
		throw error
	}
}
