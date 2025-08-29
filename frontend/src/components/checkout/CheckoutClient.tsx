'use client'
import { useApi } from '@/hooks/useApi'
import useOrderManagement from '@/hooks/useOrderManagement'
import { getUserInfo } from '@/lib/services/userServices'
import { useCart } from '@/providers/CartProvider'
import { ICheckoutClient, ICreateOrder, IGetUserInfo } from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CheckoutAuth from './CheckoutAuth'
import CheckoutContactData from './CheckoutContactData'
import CheckoutDeliveryData from './CheckoutDeliveryData'
import CheckoutTotal from './CheckoutTotal'
import CheckoutMoreInfo from './CheckoutMoreInfo'
import { Button } from '../UI/button'

export default function CheckoutClient({ products }: ICheckoutClient) {
	const { apiFetch } = useApi()
	const { status } = useSession()

	const { cartProducts } = useCart()
	const [formData, setFormData] = useState<ICreateOrder>({
		deliveryType: 'address',
		address: {
			country: 'Україна',
			city: '',
			region: '',
			postalCode: '',
			street: '',
			homeNumber: '',
		},
		novaPost: {
			country: '',
			region: '',
			city: '',
			departmentAddress: '',
		},
		orderItems: {
			itemId: '',
			quantity: 0,
			price: 0,
		},
		paymentMethod: '',
		deliveryMethod: '',
		additionalInfo: '',
		recipientFirstName: '',
		recipientLastName: '',
		recipientEmail: '',
		recipientPhone: '',
	})

	const [loading, setLoading] = useState(true)

	const { isLoading, handleOrderCreate, handleOrderCancel } =
		useOrderManagement()

	function normalizeInput(value: unknown): string {
		if (
			!value ||
			typeof value !== 'string' ||
			value.trim().toLowerCase() === 'string'
		) {
			return ''
		}
		return value
	}

	useEffect(() => {
		const fetchUser = async () => {
			if (status !== 'authenticated') {
				setLoading(false)
				return
			}
			try {
				const userData: IGetUserInfo = await apiFetch(getUserInfo)
				setFormData({
					deliveryType: 'address',
					address: {
						country: normalizeInput(userData.address?.country),
						city: normalizeInput(userData.address?.city),
						region: normalizeInput(userData.address?.region),
						postalCode: normalizeInput(userData.address?.postalCode),
						street: normalizeInput(userData.address?.street),
						homeNumber: userData.address?.homeNumber || '',
					},
					novaPost: {
						country: '',
						region: '',
						city: '',
						departmentAddress: '',
					},
					orderItems: {
						itemId: '',
						quantity: 0,
						price: 0,
					},
					paymentMethod: '',
					deliveryMethod: '',
					additionalInfo: '',
					recipientFirstName: normalizeInput(userData.userFirstName),
					recipientLastName: normalizeInput(userData.userLastName),
					recipientEmail: normalizeInput(userData.email),
					recipientPhone: normalizeInput(userData.phoneNumber),
				})
			} catch (error) {
				console.error('Failed to fetch user info:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [apiFetch, status])

	if (cartProducts.length === 0) {
		return (
			<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
		)
	}

	if (loading) return <div>Завантаження...</div>

	return (
		<div className='flex flex-col md:grid md:grid-cols-5 lg:grid-cols-3 gap-6'>
			<div className='space-y-6 md:col-span-3 lg:col-span-2 order-2 md:order-1'>
				<CheckoutAuth />
				<CheckoutContactData formData={formData} setFormData={setFormData} />
				<CheckoutDeliveryData formData={formData} setFormData={setFormData} />
				<CheckoutMoreInfo formData={formData} setFormData={setFormData} />
				<div className='w-full flex justify-end'>
					<Button
						onClick={() => handleOrderCreate(formData)}
						className='p-6 md:p-7 text-md md:text-lg w-full md:w-auto'
					>
						Оформити замовлення
					</Button>
				</div>
			</div>
			<CheckoutTotal products={products} />
		</div>
	)
}
