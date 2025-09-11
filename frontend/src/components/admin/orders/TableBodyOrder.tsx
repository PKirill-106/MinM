import { TableCell, TableRow } from '@/components/UI/table'
import { IOrder } from '@/types/Interfaces'
import { useState } from 'react'
import AdminOrderItemList from './AdminOrderItemList'
import StatusSelect from './StatusSelect'

interface ITableBodyOrder {
	order: IOrder
	onStatusChange: (id: string, status: string) => void
	editedStatus?: string
}

export default function TableBodyOrder({
	order,
	onStatusChange,
	editedStatus,
}: ITableBodyOrder) {
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

	const [selectedStatus, setSelectedStatus] = useState(order.status)

	const handleSave = () => {
		onStatusChange(order.id, selectedStatus)
	}

	return (
		<TableRow className='border-y border-transparent-text py-4'>
			<TableCell>{formattedDate}</TableCell>
			<TableCell>{order.orderNumber}</TableCell>
			<TableCell>
				{order.deliveryMethod === 'courier' ? "Кур'єром" : 'На адресу'}
			</TableCell>
			<TableCell>
				{order.address.region}, {order.address.city}
			</TableCell>
			<TableCell>
				<AdminOrderItemList />
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
