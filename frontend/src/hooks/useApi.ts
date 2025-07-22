'use client'

import { useSession, signOut } from 'next-auth/react'
import { refreshTokens } from '@/lib/services/userServices'
import { useCallback } from 'react'

let refreshPromise: Promise<any> | null = null

export function useApi() {
	const { data: session, update } = useSession()

	const apiFetch = useCallback(
		async <T = any>(request: (token: string) => Promise<T>): Promise<T> => {
			if (!session?.user) throw new Error('No session')

			let token = session.user.accessToken
			const refreshToken = session.user.refreshToken
			const accessExpiresAt = session.user.expiresAt

			if (!token || !refreshToken || !accessExpiresAt) {
				throw new Error('No token or refresh token')
			}

			try {
				return await request(token)
			} catch (error) {
				if (error instanceof Error && error.message.includes('401')) {
					try {
						if (!refreshPromise) {
							refreshPromise = refreshTokens(token, refreshToken)
								.then(async refreshed => {
									await update({
										accessToken: refreshed.accessToken,
										refreshToken: refreshed.refreshToken,
										expiresAt: refreshed.expiresAt,
									})

									return { ...refreshed }
								})
								.finally(() => {
									refreshPromise = null
								})
						}

						const refreshed = await refreshPromise
						token = refreshed.accessToken

						return await request(token) // Повторяем запрос с новым токеном
					} catch (refreshError) {
						console.error('[useApi] Token refresh failed:', refreshError)
						await signOut({ redirect: true })
						throw refreshError
					}
				}
				throw error
			}
		},
		[session?.user, update]
	)

	return { apiFetch }
}
