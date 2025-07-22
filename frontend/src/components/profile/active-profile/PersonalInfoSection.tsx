'use client'

import 'cleave.js/dist/addons/cleave-phone.ua'
import Cleave from 'cleave.js/react'
import { useEffect, useState } from 'react'
import { Input } from '../../UI/input'
import { IPersonalInfoSectionProps } from '../interfaces'
import { cn } from '@/lib/utils'

export default function PersonalInfoSection({
	user,
	formData,
	onChange,
}: IPersonalInfoSectionProps) {
	const [rawPhone, setRawPhone] = useState(formData.phoneNumber)
	const [isPhoneValid, setIsPhoneValid] = useState(true)

	const countryCode = '+38'

	useEffect(() => {
		if (formData.phoneNumber?.startsWith('38')) {
			setRawPhone(formData.phoneNumber.slice(2))
		} else {
			setRawPhone(formData.phoneNumber)
		}
	}, [formData.phoneNumber])

	const handleCleaveChange = (e: any) => {
		const rawValue: string = e.target.rawValue.replace(/\D/g, '')

		if (rawValue.length > 10) return

		setRawPhone(rawValue)

		if (rawValue.length <= 10) {
			onChange('phoneNumber', `38${rawValue}`)
		}
	}

	const handleCleaveBlur = () => {
		setIsPhoneValid(rawPhone.length >= 10)
	}

	return (
		<div className='w-full border border-transparent-text rounded-md p-4 space-y-2'>
			<h3 className='font-bold! mb-2 md:mb-3 lg:mb-4'>Особисті дані</h3>
			<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
				<div>
					<span className='text-transparent-text'>Ім’я</span>
					<Input
						value={formData.userFirstName}
						onChange={e => onChange('userFirstName', e.target.value)}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Прізвище</span>
					<Input
						value={formData.userLastName}
						onChange={e => onChange('userLastName', e.target.value)}
					/>
				</div>
				<div>
					<span className='text-transparent-text'>Email</span>
					<Input value={user.email} disabled />
				</div>
				<div>
					<span className='text-transparent-text'>Номер телефону</span>
					<div className='flex gap-2'>
						<Input
							value={countryCode}
							disabled
							className='basis-1/4 md:basis-1/5'
						/>
						<Cleave
							options={{
								blocks: [3, 3, 2, 2],
							}}
							maxLength={13}
							value={rawPhone}
							onChange={handleCleaveChange}
							onBlur={handleCleaveBlur}
							inputMode='tel'
							placeholder='097 123 4567'
							className={cn(
								'basis-3/4 md:basis-4/5 e:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
								'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
								'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
							)}
						/>
					</div>
					{!isPhoneValid && (
						<p className='text-red-500 text-xs mt-2'>
							Невірний номер телефону.
						</p>
					)}
				</div>
			</div>
			{/* ADD DATE OF CREATE 
			<div>
				<span className='text-transparent-text'>Дата реєстрації</span>
				<Input value={user.slug} disabled />
			</div> 
			*/}
		</div>
	)
}
