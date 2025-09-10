'use client'

import ResultContent from '@/components/result/ResultContent'
import { Card } from '@/components/UI/card'
import { useApi } from '@/hooks/useApi'
import {
	updateOrderStatusAsFailed,
	updateOrderToPaid,
} from '@/lib/services/orderServices'
import { useCart } from '@/providers/CartProvider'
import { useSession } from 'next-auth/react'
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
	const onCard = searchParams.get('ONCARD') || undefined

	const isOnCard = onCard === '0'

	const isSuccess = result === '0'

	const updateOrderStatus = async () => {
		if (status === 'authenticated' && isSuccess && !isOnCard) {
			await apiFetch(token => updateOrderToPaid(orderNumber!, token))
		} else if (status === 'authenticated' && !isSuccess) {
			await apiFetch(token => updateOrderStatusAsFailed(orderNumber!, token))
		}
	}

	useEffect(() => {
		if (!orderNumber) return
		if (sessionStorage.getItem(`orderProcessed_${orderNumber}`)) return

		updateOrderStatus().then(() => {
			if (status === 'authenticated') {
				clearCart()
				sessionStorage.setItem(`orderProcessed_${orderNumber}`, 'true')
			}
		})
	}, [isSuccess, clearCart])

	return (
		<div className='flex justify-center items-center'>
			<Card className='max-w-xl w-full flex flex-col items-center justify-center min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]'>
				{isOnCard ? (
					<ResultContent
						description={description || 'Оплата замовлення M in M'}
						orderNumber={orderNumber!}
						orderStatus='Created'
					/>
				) : isSuccess ? (
					<ResultContent
						description={description || 'Оплата замовлення M in M'}
						orderNumber={orderNumber!}
						orderStatus='Paid'
					/>
				) : (
					<ResultContent
						description={description || 'Оплата замовлення M in M'}
						orderNumber={orderNumber!}
						orderStatus='Failed'
					/>
				)}
			</Card>
		</div>
	)
}
