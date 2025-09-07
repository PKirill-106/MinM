import { IActiveOrderHistory } from '../interfaces'
import OrderHistoryItem from './OrderHistoryItem'

export default function OrderHistory({
	products,
	orders,
	isLoading,
}: IActiveOrderHistory) {
	return (
		<div>
			{isLoading ? (
				<h3 className='text-center'>Завантаження</h3>
			) : (
				<>
					{orders.length ? (
						<div className='space-y-6'>
							{orders.map(order => (
								<OrderHistoryItem
									key={order.id}
									order={order}
									products={products}
								/>
							))}
						</div>
					) : (
						<h3 className='text-center'>Ви не зробили жодного замовлення</h3>
					)}
				</>
			)}
		</div>
	)
}
