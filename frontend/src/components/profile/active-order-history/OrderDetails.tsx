import { Button } from '@/components/UI/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/UI/dialog'
import { IOrderDetails } from '../interfaces'
import OrderProductItem from './OrderProductItem'
import DetailsInfoSection from './DetailsInfoSection'

export default function OrderDetails({
	order,
	orderProducts,
	orderItemIds,
	orderDate,
}: IOrderDetails) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='secondary' className='flex items-end justify-end'>
					Деталі
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Деталі замовлення</DialogTitle>
					<DialogDescription>
						Номер замовлення:{' '}
						<span className='font-semibold'>{order.orderNumber}</span>.
					</DialogDescription>
				</DialogHeader>
				<span className='text-sm lg:text-base'>
					Товари<span className='caption'>({orderProducts.length})</span>:
				</span>
				<div className='mx-2 border-l-1 border-transparent-text'>
					<div className='space-y-2'>
						{orderProducts.map(p => (
							<OrderProductItem
								key={p.id}
								order={order}
								orderItemIds={orderItemIds}
								orderProduct={p}
							/>
						))}
					</div>
				</div>
				<DetailsInfoSection order={order} orderDate={orderDate} />
			</DialogContent>
		</Dialog>
	)
}
