'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/UI/card'
import { useRouter } from 'next/navigation'
import SignInForm from './SignInForm'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { CircleCheckBig } from 'lucide-react'

export default function CheckoutAuth() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const [isGuest, setIsGuest] = useState<boolean>(false)

	useEffect(() => {
		if (status === 'authenticated') {
			setIsAuth(true)
		} else {
			setIsAuth(false)
		}
	}, [session, status, router])

	return (
		<div className='flex justify-center items-center'>
			{isAuth ? (
				<Card className='w-full'>
					<CardHeader className='flex'>
						<div className='flex items-center gap-2'>
							<CircleCheckBig className='text-green-600!' />
							<CardTitle className='text-2xl'>Ви авторизовані</CardTitle>
						</div>
					</CardHeader>
				</Card>
			) : isGuest ? (
				<Card className='w-full'>
					<CardHeader>
						<div className='flex items-center gap-2'>
							<CircleCheckBig className='text-green-600' />
							<CardTitle className='text-2xl'>
								Ви продовжуєте як гість
							</CardTitle>
						</div>
					</CardHeader>
				</Card>
			) : (
				<Card className='w-full shadow-lg text-foreground'>
					<CardHeader>
						<CardTitle className='text-2xl '>Авторизуйтесь</CardTitle>
						<CardDescription>
							Пропустіть авторизацію, якщо бажаєте замовити без акаунта.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<SignInForm
							onSuccess={() => router.refresh()}
							continueAsGuest={() => setIsGuest(true)}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
