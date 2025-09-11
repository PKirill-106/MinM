import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/UI/select'
import { IOrder } from '@/types/Interfaces'
import { useEffect, useState } from 'react'

interface IStatusSelect {
	order: IOrder
	onChange: (status: string) => void
	overrideStatus?: string
}

export default function StatusSelect({
	order,
	onChange,
	overrideStatus,
}: IStatusSelect) {
	const [status, setStatus] = useState<string>(order.status)

  useEffect(() => {
		if (overrideStatus) {
			setStatus(overrideStatus)
		}
	}, [overrideStatus])

	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus)
		onChange(newStatus)
	}

	return (
		<Select value={status} onValueChange={handleStatusChange}>
			<SelectTrigger className='w-[180px] cursor-pointer hover:border-accent duration-300'>
				<SelectValue placeholder='Змінити статус' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Статус</SelectLabel>
					<SelectItem value='Created'>Створено</SelectItem>
					<SelectItem value='Canceled'>Скасовано</SelectItem>
					<SelectItem value='Paid'>Оплачено</SelectItem>
					<SelectItem value='Pending'>В обробці</SelectItem>
					<SelectItem value='Delivering'>В дорозі</SelectItem>
					<SelectItem value='Received'>Отримано</SelectItem>
					<SelectItem value='Returned'>Повернено</SelectItem>
					<SelectItem value='Failed'>Помилка виконання</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
