'use client'
import { cn } from '@/lib/utils'
import { ICreateOrder } from '@/types/Interfaces'
import Cleave from 'cleave.js/react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { Input } from '../UI/input'

export interface ICheckoutDataProps {
	formData: ICreateOrder
	setFormData: React.Dispatch<React.SetStateAction<ICreateOrder>>
}

export default function CheckoutContactData({ formData, setFormData }: ICheckoutDataProps) {
	const [changed, setChanged] = useState(false)

	const handleChange = (field: string, value: string) => {
		setFormData(prev => {
			if (!prev) return prev

			if (field.startsWith('address.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['address']
				return {
					...prev,
					address: {
						...prev.address,
						[key]: value,
					},
				}
			}

			const key = field as keyof ICreateOrder
			return {
				...prev,
				[key]: value,
			}
		})
		setChanged(true)
	}

	const [rawPhone, setRawPhone] = useState(formData.recipientPhone)
	const [isPhoneValid, setIsPhoneValid] = useState(true)

	const countryCode = '+38'

	useEffect(() => {
		if (formData.recipientPhone?.startsWith('38')) {
			setRawPhone(formData.recipientPhone.slice(2))
		} else {
			setRawPhone(formData.recipientPhone)
		}
	}, [formData.recipientPhone])

	const handleCleaveChange = (e: any) => {
		const rawValue: string = e.target.rawValue.replace(/\D/g, '')

		if (rawValue.length > 10) return

		setRawPhone(rawValue)

		if (rawValue.length <= 10) {
			handleChange('phoneNumber', `38${rawValue}`)
		}
	}

	const handleCleaveBlur = () => {
		setIsPhoneValid(rawPhone.length >= 10)
	}

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader>
				<CardTitle className='text-2xl'>Контактні дані</CardTitle>
			</CardHeader>
			<CardContent className='w-full space-y-2'>
				<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
					<div>
						<span className='text-transparent-text'>Ім’я</span>
						<Input
							value={formData.recipientFirstName}
							onChange={e => handleChange('userFirstName', e.target.value)}
						/>
					</div>
					<div>
						<span className='text-transparent-text'>Прізвище</span>
						<Input
							value={formData.recipientLastName}
							onChange={e => handleChange('userLastName', e.target.value)}
						/>
					</div>
					<div>
						<span className='text-transparent-text'>Email</span>
						<Input
							value={formData.recipientEmail}
							onChange={e => handleChange('email', e.target.value)}
							disabled={!!formData.recipientEmail}
						/>
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
									'basis-3/4 md:basis-4/5 e:text-foreground placeholder:text-transparent-text selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
			</CardContent>
		</Card>
	)
}
