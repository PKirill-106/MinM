'use client'

import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SessionHandler() {
	const { data: session } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.error === 'REQUIRE_REAUTH') {
			console.log('[SessionHandler] Session requires re-auth, redirecting...')
			signOut({ redirect: false })
			router.push('/sign-in')
		}
	}, [session, router])

	return null
}
