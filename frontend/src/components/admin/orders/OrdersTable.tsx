'use client'
import { Button } from '@/components/UI/button'
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
import useOrderManagement from '@/hooks/useOrderManagement'
import { useOrders } from '@/hooks/useOrders'
import { cn } from '@/lib/utils'
import { IProduct } from '@/types/Interfaces'
import { Save } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import OrdersFilters from './OrderFilters'
import TableBodyOrder from './TableBodyOrder'

export default function OrdersTable({ products }: { products: IProduct[] }) {
	const { changeOrderStatus } = useOrderManagement()
	const {
		orders,
		filteredOrders,
		totalFilteredEarnings,
		loading,
		page,
		totalPages,
		setPage,
		dateFilter,
		setDateFilter,
		statusFilter,
		setStatusFilter,
		refetchOrders,
		getDateFilterLabel,
	} = useOrders()

	const [saving, setSaving] = useState(false)
	const [editedStatuses, setEditedStatuses] = useState<Record<string, string>>(
		{}
	)

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

			await refetchOrders()
			toast.success('Статуси оновлено')
			setEditedStatuses({})
		} catch (e) {
			console.error(e)
			toast.error('Помилка при збереженні')
		} finally {
			setSaving(false)
		}
	}

	const formattedEarnings = totalFilteredEarnings.toLocaleString('uk-UA')

	if (loading) return <h3 className='text-center'>Завантаження...</h3>

	return (
		<div className=''>
			<div className='flex justify-between'>
				<OrdersFilters
					dateFilter={dateFilter}
					setDateFilter={setDateFilter}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
				<Button
					variant='secondary'
					size='sm'
					onClick={handleSaveAll}
					disabled={saving || Object.keys(editedStatuses).length === 0}
					className={cn(
						Object.keys(editedStatuses).length > 0
							? 'bg-accent text-background'
							: '',
						'p-6! text-lg gap-2 items-center justify-center'
					)}
				>
					<Save className='size-5' />
					{saving ? 'Збереження...' : 'Зберегти'}
				</Button>
			</div>
			<Table>
				<TableCaption>
					Список замовлень{' '}
					{dateFilter !== 'all' && `(за ${getDateFilterLabel(dateFilter)})`}
				</TableCaption>
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
						<TableHead className='text-right'>Сума</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map(order => (
						<TableBodyOrder
							key={order.id}
							order={order}
							onStatusChange={handleStatusChange}
							editedStatus={editedStatuses[order.id]}
							products={products}
						/>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={11}>
							Загалом {filteredOrders.length} замовлень на суму
						</TableCell>
						<TableCell className='text-right'>
							{formattedEarnings} грн
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>

			<div className='flex items-center justify-center gap-2 mt-4'>
				<Button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					variant='outline'
				>
					Попередня
				</Button>
				<span>
					{page} / {totalPages}
				</span>
				<Button
					onClick={() => setPage(page + 1)}
					disabled={page === totalPages}
					variant='outline'
				>
					Наступна
				</Button>
			</div>
		</div>
	)
}
