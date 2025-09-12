'use client'
import useOrderManagement from '@/hooks/useOrderManagement'
import { ICreateOrder } from '@/types/Interfaces'
import { CircleCheckBig } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'
import { ICheckoutDataProps } from './CheckoutContactData'
import { NovaPostSelector } from './NovaPostSelector'
import UserAddressSection from './UserAddressSection'

export default function CheckoutDeliveryData({
	formData,
	setFormData,
}: ICheckoutDataProps) {
	const { status } = useSession()
	const { saveAddress, setSaveAddress } = useOrderManagement()

	useEffect(() => {
		if (status === 'authenticated') {
			setSaveAddress(true)
		} else {
			setSaveAddress(false)
		}
	}, [status])

	const onChange = (field: string, value: string | boolean) => {
		setFormData(prev => {
			if (field.startsWith('userAddress.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['userAddress']
				return { ...prev, userAddress: { ...prev.userAddress, [key]: value } }
			}
			if (field.startsWith('postAddress.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['postAddress']
				return { ...prev, postAddress: { ...prev.postAddress, [key]: value } }
			}
			return { ...prev, [field]: value }
		})
	}

	const handleDeliveryMethodChange = (value: 'courier' | 'novaPost') => {
		setFormData(prev => {
			if (value === 'courier') {
				return {
					...prev,
					deliveryMethod: value,
					postAddress: {
						country: '',
						city: '',
						region: '',
						postDepartment: '',
					},
				}
			}
			if (value === 'novaPost') {
				return {
					...prev,
					deliveryMethod: value,
					userAddress: {
						country: '',
						city: '',
						region: '',
						street: '',
						homeNumber: '',
						postalCode: '',
					},
				}
			}
			return prev
		})
	}

	const isFilled =
		(formData.userAddress.country.length !== 0 &&
			formData.userAddress.region.length !== 0 &&
			formData.userAddress.city.length !== 0 &&
			formData.userAddress.street.length !== 0 &&
			formData.userAddress.homeNumber) ||
		(formData.postAddress.country.length !== 0 &&
			formData.postAddress.region.length !== 0 &&
			formData.postAddress.city.length !== 0 &&
			formData.postAddress.postDepartment.length !== 0)

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader>
				{isFilled ? (
					<div className='flex items-center gap-2'>
						<CircleCheckBig className='text-green-600!' />
						<CardTitle className='text-2xl'>Дані доставки</CardTitle>
					</div>
				) : (
					<CardTitle className='text-2xl'>Дані доставки</CardTitle>
				)}
			</CardHeader>
			<CardContent className='w-full space-y-2'>
				{/* Choose delivery type */}
				<Select
					value={formData.deliveryMethod}
					onValueChange={handleDeliveryMethodChange}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Оберіть тип доставки' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='courier'>На адресу</SelectItem>
						<SelectItem value='novaPost'>Нова пошта</SelectItem>
					</SelectContent>
				</Select>

				{/* Delivery form */}
				{formData.deliveryMethod === 'courier' ? (
					<UserAddressSection
						formData={formData}
						onChange={onChange}
						saveAddress={saveAddress}
						setSaveAddress={setSaveAddress}
					/>
				) : (
					<NovaPostSelector onChange={onChange} />
				)}
			</CardContent>
		</Card>
	)
}
