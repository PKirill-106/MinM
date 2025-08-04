'use client'

import { useSession, signOut } from 'next-auth/react'
import { refreshTokens } from '@/lib/services/userServices'
import { useCallback } from 'react'

let refreshPromise: Promise<any> | null = null
let refreshInProgress = false

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
					try {
						if (!refreshInProgress) {
							refreshInProgress = true
							refreshPromise = refreshTokens(token, refreshToken)
								.then(async refreshed => {
									const updatedSession = await update({
										accessToken: refreshed.accessToken,
										refreshToken: refreshed.refreshToken,
										expiresAt: refreshed.expiresAt,
									})
									const newToken = updatedSession?.user?.accessToken
									if (!newToken || newToken === token) {
										console.warn('[useApi] Token did not update after refresh')
										throw new Error(
											'Token refresh failed or did not update session'
										)
									}
									return refreshed
								})
								.catch(refreshError => {
									console.error('[useApi] Refresh failed:', refreshError)
									throw refreshError
								})
								.finally(() => {
									refreshPromise = null
									refreshInProgress = false
								})
						}

						const refreshed = await refreshPromise
						token = refreshed.accessToken

						return await request(token)
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
