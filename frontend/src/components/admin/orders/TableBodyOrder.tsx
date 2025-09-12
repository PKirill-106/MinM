import { TableCell, TableRow } from '@/components/UI/table'
import { IAddress, INovaPost, IOrder, IProduct } from '@/types/Interfaces'
import AdminOrderItemList from './AdminOrderItemList'
import StatusSelect from './StatusSelect'

interface ITableBodyOrder {
	order: IOrder
	onStatusChange: (id: string, status: string) => void
	editedStatus?: string
	products: IProduct[]
}

export default function TableBodyOrder({
	order,
	onStatusChange,
	editedStatus,
	products,
}: ITableBodyOrder) {
	const orderItemIds = order.orderItems.map(item => item.itemId)

	const orderProducts = products.filter(product =>
		product.productVariants.some(variant => orderItemIds.includes(variant.id))
	)

	const totalPrice = order.orderItems.reduce((sum, orderItem) => {
		return sum + orderItem.price * orderItem.quantity
	}, 0)

	const orderDate = new Date(order.orderDate)

	const formattedDate = orderDate.toLocaleString('uk-UA', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	return (
		<TableRow className='border-y border-transparent-text py-4'>
			<TableCell>{formattedDate}</TableCell>
			<TableCell>{order.orderNumber}</TableCell>
			<TableCell>
				{order.deliveryMethod === 'courier' ? "Кур'єром" : 'На адресу'}
			</TableCell>
			<TableCell>
				{order.deliveryMethod === 'courier' ? (
					<span>
						{[
							order.address.region,
							order.address.city,
							(order.address as IAddress).postalCode,
							(order.address as IAddress).street,
							(order.address as IAddress).homeNumber,
						]
							.filter(value => value != null && value !== '')
							.join(', ')}
					</span>
				) : (
					<span>
						{[
							order.address.region,
							order.address.city,
							(order.address as INovaPost).postDepartment,
						]
							.filter(value => value != null && value !== '')
							.join(', ')}
					</span>
				)}
			</TableCell>
			<TableCell>
				<AdminOrderItemList
					orderItems={order.orderItems}
					orderProducts={orderProducts}
					orderItemIds={orderItemIds}
				/>
			</TableCell>
			<TableCell>
				{order.paymentMethod === 'onCard' ? 'На рахунок' : 'Платіжна система'}
			</TableCell>
			<TableCell className='flex gap-2'>
				<StatusSelect
					order={order}
					onChange={status => onStatusChange(order.id, status)}
					overrideStatus={editedStatus}
				/>
			</TableCell>
			<TableCell className='text-center'>
				{order.additionalInfo || '-'}
			</TableCell>
			<TableCell>
				{order.recipientFirstName} {order.recipientLastName}
			</TableCell>
			<TableCell>{`+${order.recipientPhone.slice(
				0,
				2
			)} ${order.recipientPhone.slice(2, 5)} ${order.recipientPhone.slice(
				5,
				8
			)} ${order.recipientPhone.slice(8, 10)} ${order.recipientPhone.slice(
				10,
				12
			)}`}</TableCell>
			<TableCell>{order.recipientEmail}</TableCell>
			<TableCell className='text-right'>{totalPrice}</TableCell>
		</TableRow>
	)
}
