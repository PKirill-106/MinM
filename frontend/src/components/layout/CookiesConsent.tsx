'use client'

import { useEffect, useState } from 'react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'

export default function CookiesConsent() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (!getCookie('localConsent')) {
			setVisible(true)
		}
	}, [])

	const handleAccept = () => {
		setCookie('localConsent', 'accepted', {
			maxAge: 60 * 60 * 24 * 365, // 1 year
			path: '/',
		})
		setVisible(false)
	}

	const handleDecline = () => {
		setCookie('localConsent', 'declined', {
			maxAge: 60 * 60 * 24 * 30, // 30 days
			path: '/',
		})
		
		deleteCookie('_ga')
		deleteCookie('_gid')
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className='fixed inset-x-0 bottom-4 md:bottom-10 lg:bottom-20 flex justify-center'>
			<div className='max-w-2xl w-full mx-4 bg-white-text rounded-md p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md'>
				<p className='text-sm sm:text-base text-center sm:text-left'>
					Ми використовуємо файли cookie на цьому сайті, щоб покращити взаємодію
					з користувачем.{' '}
					<Link
						href='/privacy-policy'
						className='underline text-accent-text hover:text-accent active:text-accent  duration-300 ease-out transition-all'
					>
						Privacy Policy
					</Link>
				</p>
				<div className='flex flex-col md:flex-row w-full md:w-auto gap-2'>
					<button
						className='border border-transparent-text py-2 px-4 rounded-sm hover:text-accent active:text-accent hover:underline active:underline cursor-pointer duration-300 ease-out transition-all'
						onClick={handleDecline}
					>
						Decline
					</button>
					<button
						className='bg-accent text-white py-2 px-6 rounded-sm hover:bg-foreground active:bg-foreground cursor-pointer duration-300 ease-out transition-all'
						onClick={handleAccept}
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	)
}
