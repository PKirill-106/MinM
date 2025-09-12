import { Button } from '@/components/UI/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/UI/dialog'
import { IOrderItem, IProduct } from '@/types/Interfaces'
import AdminOrderItemCard from './AdminOrderItemCard'

interface IAdminOrderItemList {
	orderItems: IOrderItem[]
	orderProducts: IProduct[]
	orderItemIds: string[]
}

export default function AdminOrderItemList({
	orderItems,
	orderProducts,
	orderItemIds,
}: IAdminOrderItemList) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='flex items-end justify-end'>
					Деталі
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Список продуктів</DialogTitle>
				</DialogHeader>
				{orderProducts.map(orderProduct => (
					<AdminOrderItemCard
						key={orderProduct.id}
						orderProduct={orderProduct}
						orderItems={orderItems}
						orderItemIds={orderItemIds}
					/>
				))}
			</DialogContent>
		</Dialog>
	)
}
