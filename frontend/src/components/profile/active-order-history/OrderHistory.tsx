import { useState } from 'react'
import { IActiveOrderHistory } from '../interfaces'
import OrderHistoryItem from './OrderHistoryItem'
import { Button } from '@/components/UI/button'

export default function OrderHistory({
	products,
	orders,
	isLoading,
}: IActiveOrderHistory) {
	const [visibleCount, setVisibleCount] = useState(8)

	const loadMore = () => {
		setVisibleCount(prev => prev + 8)
	}

	return (
		<div>
			{isLoading ? (
				<h3 className='text-center'>Завантаження</h3>
			) : (
				<>
					{orders.length ? (
						<div className='space-y-6'>
							{orders.slice(0, visibleCount).map(order => (
								<OrderHistoryItem
									key={order.id}
									order={order}
									products={products}
								/>
							))}

							{visibleCount < orders.length && (
								<div className='flex justify-center mt-6'>
									<Button onClick={loadMore} variant='outline'>
										Завантажити ще
									</Button>
								</div>
							)}
						</div>
					) : (
						<h3 className='text-center'>Ви не зробили жодного замовлення</h3>
					)}
				</>
			)}
		</div>
	)
}
