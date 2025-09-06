'use client'

import { Button } from '@/components/UI/button'
import { Card } from '@/components/UI/card'
import { useApi } from '@/hooks/useApi'
import {
	updateOrderStatusAsFailed,
	updateOrderToPaid,
} from '@/lib/services/orderServices'
import { useCart } from '@/providers/CartProvider'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PaymentResultPage() {
	const { apiFetch } = useApi()
	const { status } = useSession()
	const searchParams = useSearchParams()
	const { clearCart } = useCart()

	const orderNumber = searchParams.get('SHOPORDERNUMBER')
	const result = searchParams.get('RESULT')
	const description = searchParams.get('DESCRIPTION')

	const isSuccess = result === '0'

	const updateOrderStatus = async () => {
		if (status === 'authenticated' && isSuccess) {
			await apiFetch(token => updateOrderToPaid(orderNumber!, token))
		} else if (status === 'authenticated' && !isSuccess) {
			await apiFetch(token => updateOrderStatusAsFailed(orderNumber!, token))
		}
	}

	useEffect(() => {
		updateOrderStatus()

		localStorage.removeItem('checkoutFormData')
		clearCart()
	}, [isSuccess, clearCart])

	return (
		<div className='flex justify-center items-center'>
			<Card className='max-w-xl w-full flex flex-col items-center justify-center min-h-[50vh]'>
				{isSuccess ? (
					<div className='flex flex-col items-center gap-20'>
						<CircleCheckBig className='size-20 md:size-30 lg:size-40 text-green-600' />
						<div className='space-y-20'>
							<div className='flex flex-col items-center gap-4'>
								{description && (
									<h2 className='mb-2 text-gray-600'>{description}</h2>
								)}
								<span className='text-sm md:text-base'>
									Номер замовлення{' '}
									<span className='font-bold'>№{orderNumber}</span>.
								</span>
								<h1 className='text-2xl font-bold text-green-600'>
									Оплата успішна
								</h1>
							</div>
							<div className='flex flex-col w-full gap-4'>
								<Link href='/'>
									<Button variant='outline' className='w-full'>
										На головну
									</Button>
								</Link>
								<Link href='/profile?tab=orders'>
									<Button className='w-full'>Історія замовлень</Button>
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div className='flex flex-col items-center gap-20'>
						<CircleX className='size-20 md:size-30 lg:size-40 text-red-600' />
						<div className='space-y-20'>
							<div className='flex flex-col items-center gap-4'>
								{description && (
									<h2 className='mb-2 text-gray-600'>{description}</h2>
								)}
								<span className='text-sm md:text-base'>
									Сталася помилка при оплаті замовлення{' '}
									<span className='font-bold'>№{orderNumber}</span>.
								</span>
								<h1 className='text-2xl font-bold text-red-600'>
									Оплата не виконана
								</h1>
							</div>
							<div className='flex flex-col w-full gap-4'>
								<Link href='/'>
									<Button variant='outline' className='w-full'>
										На головну
									</Button>
								</Link>
								<Link href='/checkout'>
									<Button className='w-full'>Оформлення замовлення</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</Card>
		</div>
	)
}
