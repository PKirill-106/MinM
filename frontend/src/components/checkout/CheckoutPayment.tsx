'use client'
import React from 'react'
import { ICheckoutDataProps } from './CheckoutContactData'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'
import { ICreateOrder } from '@/types/Interfaces'
import { CircleCheckBig } from 'lucide-react'

export default function CheckoutPayment({
	formData,
	setFormData,
}: ICheckoutDataProps) {
	const handleChange = (field: string, value: string) => {
		setFormData(prev => {
			if (!prev) return prev

			const key = field as keyof ICreateOrder
			return {
				...prev,
				[key]: value,
			}
		})
	}

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader className='flex'>
				<div className='flex items-center gap-2'>
					<CircleCheckBig className='text-green-600!' />
					<CardTitle className='text-2xl'>Оплата</CardTitle>
				</div>
			</CardHeader>
			<CardContent className='w-full space-y-4'>
				<Select
					value={formData.paymentMethod}
					onValueChange={value => handleChange('paymentMethod', value)}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Оберіть спосіб оплати' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='paymentSystem'>Платіжна система</SelectItem>
						<SelectItem value='onCard'>Оплата на рахунок</SelectItem>
					</SelectContent>
				</Select>
				{formData.paymentMethod === 'onCard' && (
					<span className='text-sm'>
						Після підтвердження менеджером наявності всіх позицій, буде
						відправлено номер рахунку для оплати замовлення.
					</span>
				)}
			</CardContent>
		</Card>
	)
}
