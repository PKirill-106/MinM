'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/UI/Modal'
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { IProduct, ISeason } from '@/types/Interfaces'
import { ICreateSeason, IUpdateSeason } from '@/types/Interfaces'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/UI/popover'
import { Calendar } from '@/components/UI/calendar'
import { format } from 'date-fns'

interface Props {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (seasonData: ICreateSeason | IUpdateSeason) => void
	seasonData?: ISeason
	allProducts: IProduct[]
}

export default function SeasonModal({
	type,
	isOpen,
	onClose,
	onSubmit,
	seasonData,
	allProducts,
}: Props) {
	const isUpdate = type === 'update'

	const [name, setName] = useState('')
	const [startDate, setStartDate] = useState<Date | undefined>()
	const [endDate, setEndDate] = useState<Date | undefined>()
	const [productIds, setProductIds] = useState<string[]>([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		if (isUpdate && seasonData) {
			setName(seasonData.name)
			setStartDate(new Date(seasonData.startDate))
			setEndDate(new Date(seasonData.endDate))
			setProductIds(seasonData.products.map(p => p.id))
		} else {
			setName('')
			setStartDate(undefined)
			setEndDate(undefined)
			setProductIds([])
		}
	}, [isUpdate, seasonData, isOpen])

	const toggleProduct = (productId: string) => {
		setProductIds(prev =>
			prev.includes(productId)
				? prev.filter(id => id !== productId)
				: [...prev, productId]
		)
	}

	const handleSubmit = () => {
		if (!startDate || !endDate) return

		const payload = isUpdate
			? {
					id: seasonData!.id,
					slug: seasonData!.slug,
					name,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
					productIds,
			  }
			: {
					name,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
					productIds,
			  }

		onSubmit(payload)
	}

	const filteredProducts = allProducts.filter(p =>
		p.name.toLowerCase().includes(search.toLowerCase())
	)

	const isValid = name.trim() !== '' && startDate && endDate

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-h-[80vh] overflow-y-auto'>
				<h2 className='text-xl font-semibold'>
					{isUpdate ? 'Редагувати сезон' : 'Створити сезон'}
				</h2>

				<div>
					<span className='mb-1 block'>Назва сезону</span>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Наприклад: Весна 2025'
						required
					/>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<span className='mb-1 block'>Дата початку</span>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-full justify-start text-left font-normal',
										!startDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{startDate ? format(startDate, 'yyyy-MM-dd') : 'Оберіть дату'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={startDate}
									onSelect={setStartDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div>
						<span className='mb-1 block'>Дата завершення</span>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-full justify-start text-left font-normal',
										!endDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{endDate ? format(endDate, 'yyyy-MM-dd') : 'Оберіть дату'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={endDate}
									onSelect={setEndDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<div>
					<span className='mb-1 block'>Пошук продукту</span>
					<Input
						placeholder='Введіть назву продукту...'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>

				<div>
					<span className='mb-1 block'>Продукти в сезоні</span>
					<div className='max-h-48 overflow-y-auto border rounded p-2 space-y-1'>
						{filteredProducts.map(product => (
							<label
								key={product.id}
								className='flex items-center gap-2 cursor-pointer'
							>
								<input
									type='checkbox'
									checked={productIds.includes(product.id)}
									onChange={() => toggleProduct(product.id)}
								/>
								{product.name}
							</label>
						))}
					</div>
				</div>

				<div className='flex justify-end gap-2 pt-4'>
					<Button variant='outline' type='button' onClick={onClose}>
						Скасувати
					</Button>
					<Button type='button' onClick={handleSubmit} disabled={!isValid}>
						{isUpdate ? 'Зберегти' : 'Створити'}
					</Button>
				</div>
			</div>
		</Modal>
	)
}
