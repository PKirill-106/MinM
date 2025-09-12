'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UI/select'

interface OrdersFiltersProps {
	dateFilter: string
	setDateFilter: (value: any) => void
	statusFilter: string
	setStatusFilter: (value: any) => void
}

export default function OrdersFilters({
	dateFilter,
	setDateFilter,
	statusFilter,
	setStatusFilter,
}: OrdersFiltersProps) {
	return (
		<div className='flex gap-4 mb-4'>
			<Select value={dateFilter} onValueChange={setDateFilter}>
				<SelectTrigger className='w-[180px] hover:border-accent cursor-pointer duration-300'>
					<SelectValue placeholder='За період' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>Всі</SelectItem>
					<SelectItem value='week'>Тиждень</SelectItem>
					<SelectItem value='month'>Місяць</SelectItem>
					<SelectItem value='year'>Рік</SelectItem>
				</SelectContent>
			</Select>

			<Select value={statusFilter} onValueChange={setStatusFilter}>
				<SelectTrigger className='w-[180px] hover:border-accent cursor-pointer duration-300'>
					<SelectValue placeholder='Статус замовлення' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>Всі</SelectItem>
					<SelectItem value='Created'>Створено</SelectItem>
					<SelectItem value='Canceled'>Скасовано</SelectItem>
					<SelectItem value='Paid'>Оплачено</SelectItem>
					<SelectItem value='Pending'>В обробці</SelectItem>
					<SelectItem value='Delivering'>В дорозі</SelectItem>
					<SelectItem value='Received'>Отримано</SelectItem>
					<SelectItem value='Returned'>Повернено</SelectItem>
					<SelectItem value='Failed'>Помилка виконання</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
