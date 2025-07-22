'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './button'
import { logout } from '@/lib/services/userServices'
import toast from 'react-hot-toast'

export default function LogoutButton() {
	const { data: session } = useSession()

	const handleLogout = async () => {
		const accessToken = session?.user?.accessToken
		const refreshToken = session?.user?.refreshToken

		try {
			if (accessToken && refreshToken) {
				await logout(accessToken, refreshToken)
			}

			await signOut({ redirect: true, callbackUrl: '/' })
			toast.success('Ви вийшли з акаунту')
		} catch (err) {
			console.error('Logout error:', err)
			toast.error('Сталася помилка при виході з акаунту')
		}
	}

	return (
		<Button variant='outline' onClick={handleLogout}>
			Вийти з акаунту
		</Button>
	)
}
