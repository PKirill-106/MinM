// cspell: disable
'use client'

import Cleave from 'cleave.js/react'
import { Input } from '../../UI/input'
import { IAddressSectionProps } from '../interfaces'
import { delimiter } from 'path'
import { cn } from '@/lib/utils'

export default function AddressSection({
	formData,
	onChange,
}: IAddressSectionProps) {
	return (
		<div className='w-full border border-transparent-text rounded-md p-4 space-y-2'>
			<h3 className='font-bold! mb-2 md:mb-3 lg:mb-4'>Адресна книга</h3>
			<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
				<div>
					<span className='text-transparent-text'>Країна</span>
					<Input
						disabled
						value='Україна'
						onChange={() => onChange('addressDto.country', 'Україна')}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Область</span>
					<Input
						value={formData.addressDto.region}
						onChange={e => onChange('addressDto.region', e.target.value)}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Місто</span>
					<Input
						value={formData.addressDto.city}
						onChange={e => onChange('addressDto.city', e.target.value)}
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
						value={formData.addressDto.postalCode}
						onChange={e => onChange('addressDto.postalCode', e.target.value)}
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</div>
			</div>
			<div className='flex gap-4'>
				<div className='basis-3/5 md:basis-4/5'>
					<span className='text-transparent-text'>Вулиця</span>
					<Input
						value={formData.addressDto.street}
						onChange={e => onChange('addressDto.street', e.target.value)}
					/>
				</div>
				<div className='basis-2/5 md:basis-1/5'>
					<span className='text-transparent-text'>№ буд. / кв.</span>
					<Input
						value={formData.addressDto.homeNumber}
						onChange={e => onChange('addressDto.homeNumber', e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}
