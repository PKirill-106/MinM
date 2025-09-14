'use client'

import { useSession, signOut } from 'next-auth/react'
import { refreshTokens } from '@/lib/services/userServices'
import { useCallback } from 'react'

let isRefreshing = false
let refreshSubscribers: Array<{
	resolve: (token: string) => void
	reject: (error: any) => void
}> = []

export function useApi() {
	const { data: session, update } = useSession()

	const apiFetch = useCallback(
		async <T = any>(request: (token: string) => Promise<T>): Promise<T> => {
			if (!session?.user) {
				throw new Error('No session')
			}

			let token = session.user.accessToken
			const refreshToken = session.user.refreshToken
			const accessExpiresAt = session.user.expiresAt

			if (!token || !refreshToken || !accessExpiresAt) {
				throw new Error('No token or refresh token')
			}

			try {
				return await request(token)
			} catch (error) {
				if (
					error instanceof Error &&
					(error.message.includes('Unauthorized') ||
						(error as any).digest === 'UNAUTHORIZED_ERROR')
				) {
					if (isRefreshing) {
						return new Promise((resolve, reject) => {
							refreshSubscribers.push({ resolve, reject })
						}).then(newToken => request(newToken as string))
					}

					isRefreshing = true
					try {
						const refreshed = await refreshTokens(token, refreshToken)
						const updatedSession = await update({
							accessToken: refreshed.accessToken,
							refreshToken: refreshed.refreshToken,
							expiresAt: refreshed.expiresAt,
						})
						const newToken =
							updatedSession?.user?.accessToken || refreshed.accessToken

						refreshSubscribers.forEach(({ resolve }) => resolve(newToken))
						refreshSubscribers = []

						return await request(newToken)
					} catch (refreshError) {
						refreshSubscribers.forEach(({ reject }) => reject(refreshError))
						refreshSubscribers = []
						console.error('[useApi] Token refresh failed:', refreshError)
						await signOut({ redirect: true })
						throw refreshError
					} finally {
						isRefreshing = false
					}
				}
				throw error
			}
		},
		[session?.user, update]
	)

	return { apiFetch }
}
