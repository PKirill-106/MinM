'use client'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/UI/table'
import { useApi } from '@/hooks/useApi'
import { getAllOrders } from '@/lib/services/orderServices'
import { IOrder } from '@/types/Interfaces'
import { useEffect, useState } from 'react'
import TableBodyOrder from './TableBodyOrder'
import useOrderManagement from '@/hooks/useOrderManagement'
import toast from 'react-hot-toast'
import { Button } from '@/components/UI/button'
import { Save } from 'lucide-react'

export default function OrdersTable() {
	const { apiFetch } = useApi()
	const { changeOrderStatus } = useOrderManagement()

	const [orders, setOrders] = useState<IOrder[]>([])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [editedStatuses, setEditedStatuses] = useState<Record<string, string>>(
		{}
	)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const orders: IOrder[] = await apiFetch(token => getAllOrders(token))
				const filteredOrders = orders.filter(o => {
					if (o.status === 'Failed') return false
					if (o.status === 'Created' && o.paymentMethod === 'paymentSystem')
						return false
					return true
				})
				setOrders(filteredOrders)
			} catch (error) {
				console.error('Failed to fetch orders:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchOrders()
	}, [apiFetch])

	const handleStatusChange = (orderId: string, newStatus: string) => {
		setEditedStatuses(prev => ({
			...prev,
			[orderId]: newStatus,
		}))
	}

	const handleSaveAll = async () => {
		if (Object.keys(editedStatuses).length === 0) {
			toast('Немає змін для збереження')
			return
		}

		setSaving(true)
		try {
			await Promise.all(
				Object.entries(editedStatuses).map(([orderId, status]) =>
					changeOrderStatus(orderId, status)
				)
			)

			// обновляем локальный список заказов
			setOrders(prev =>
				prev.map(order =>
					editedStatuses[order.id]
						? { ...order, status: editedStatuses[order.id] }
						: order
				)
			)

			toast.success('Статуси оновлено')
			setEditedStatuses({})
		} catch (e) {
			console.error(e)
			toast.error('Помилка при збереженні')
		} finally {
			setSaving(false)
		}
	}


	if (loading) return <h3 className='text-center'>Завантаження...</h3>

	return (
		<div className=''>
			<div className='flex justify-end'>
				<Button
					variant='secondary'
					size='sm'
					onClick={handleSaveAll}
					disabled={saving || Object.keys(editedStatuses).length === 0}
					className={
						Object.keys(editedStatuses).length > 0
							? 'bg-accent text-background'
							: ''
					}
				>
					<Save className='mr-2 h-4 w-4' />
					{saving ? 'Збереження...' : 'Зберегти'}
				</Button>
			</div>
			<Table>
				<TableCaption>Список замовлень</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Дата</TableHead>
						<TableHead>№ замовлення</TableHead>
						<TableHead>Доставка</TableHead>
						<TableHead>Адреса</TableHead>
						<TableHead>Продукти</TableHead>
						<TableHead>Оплата</TableHead>
						<TableHead>Статус</TableHead>
						<TableHead>Коментар</TableHead>
						<TableHead>Ім'я та прізвище</TableHead>
						<TableHead>Номер телефону</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className='text-right'>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map(order => (
						<TableBodyOrder
							key={order.id}
							order={order}
							onStatusChange={handleStatusChange}
							editedStatus={editedStatuses[order.id]}
						/>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={11}>Total</TableCell>
						<TableCell className='text-right'>$2,500.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}
