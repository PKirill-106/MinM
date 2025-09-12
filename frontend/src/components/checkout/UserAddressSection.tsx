import { ICreateOrder } from '@/types/Interfaces'
import React, { Dispatch, SetStateAction } from 'react'
import { Input } from '../UI/input'
import Cleave from 'cleave.js/react'
import { Checkbox } from '../UI/checkbox'
import { Label } from '../UI/label'
import { cn } from '@/lib/utils'

interface IUserAddressSection {
	formData: ICreateOrder
	onChange: (field: string, value: string | boolean) => void
	saveAddress: boolean
	setSaveAddress: Dispatch<SetStateAction<boolean>>
}

export default function UserAddressSection({
	formData,
	onChange,
	saveAddress,
	setSaveAddress,
}: IUserAddressSection) {
	return (
		<>
			<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
				<div>
					<span className='text-transparent-text'>Країна</span>
					<Input
						disabled
						value={formData.userAddress.country}
						onChange={() => onChange('userAddress.country', 'Україна')}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Область</span>
					<Input
						value={formData.userAddress.region}
						onChange={e => onChange('userAddress.region', e.target.value)}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Місто</span>
					<Input
						value={formData.userAddress.city}
						onChange={e => onChange('userAddress.city', e.target.value)}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Поштовий індекс</span>
					<Cleave
						options={{
							delimiter: '-',
							blocks: [2, 3],
						}}
						maxLength={6}
						value={formData.userAddress.postalCode}
						onChange={e => onChange('userAddress.postalCode', e.target.value)}
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</div>
			</div>
			<div className='flex gap-4'>
				<div className='basis-3/5 md:basis-4/6 lg:basis-4/5'>
					<span className='text-transparent-text'>Вулиця</span>
					<Input
						value={formData.userAddress.street}
						onChange={e => onChange('userAddress.street', e.target.value)}
					/>
				</div>
				<div className='basis-2/5 md:basis-2/6 lg:basis-1/5'>
					<span className='text-transparent-text'>№ буд. / кв.</span>
					<Input
						value={formData.userAddress.homeNumber}
						onChange={e => onChange('userAddress.homeNumber', e.target.value)}
					/>
				</div>
			</div>
			{status === 'authenticated' && (
				<div className='flex items-center space-x-2 mt-4'>
					<Checkbox
						id='saveAddress'
						checked={saveAddress}
						onClick={() => setSaveAddress(p => !p)}
					/>
					<Label
						htmlFor='saveAddress'
						className='flex items-center gap-2 cursor-pointer'
					>
						Чи бажаєте зберегти адресу для наступних замовлень?
					</Label>
				</div>
			)}
		</>
	)
}
