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
import CheckoutPayment from './CheckoutPayment'

export default function CheckoutClient({ products }: ICheckoutClient) {
	const { apiFetch } = useApi()
	const { status } = useSession()

	const { cartProducts } = useCart()

	const [formData, setFormData] = useState<ICreateOrder>({
		userAddress: {
			country: 'Україна',
			city: '',
			region: '',
			postalCode: '',
			street: '',
			homeNumber: '',
		},
		postAddress: {
			country: 'Україна',
			region: '',
			city: '',
			postDepartment: '',
		},
		orderItems: cartProducts.map(item => {
			const product = products.find(p =>
				p.productVariants.some(pV => pV.id === item.productVariantId)
			)

			const variant = product?.productVariants.find(
				pV => pV.id === item.productVariantId
			)

			return {
				itemId: item.productVariantId,
				quantity: item.quantity,
				price: variant?.price ?? 0,
			}
		}),
		paymentMethod: 'paymentSystem',
		deliveryMethod: 'courier',
		additionalInfo: '',
		recipientFirstName: '',
		recipientLastName: '',
		recipientEmail: '',
		recipientPhone: '',
	})

	const [loading, setLoading] = useState(true)

	const { isLoading, handleOrderCreate } = useOrderManagement()

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
				setFormData(prev => ({
					...prev,
					userAddress: {
						country: normalizeInput(userData.address?.country),
						city: normalizeInput(userData.address?.city),
						region: normalizeInput(userData.address?.region),
						postalCode: normalizeInput(userData.address?.postalCode),
						street: normalizeInput(userData.address?.street),
						homeNumber: userData.address?.homeNumber || '',
					},
					postAddress: {
						country: 'Україна',
						region: '',
						city: '',
						postDepartment: '',
					},
					paymentMethod: 'paymentSystem',
					deliveryMethod: 'courier',
					additionalInfo: '',
					recipientFirstName: normalizeInput(userData.userFirstName),
					recipientLastName: normalizeInput(userData.userLastName),
					recipientEmail: normalizeInput(userData.email),
					recipientPhone: normalizeInput(userData.phoneNumber),
				}))
			} catch (error) {
				console.error('Failed to fetch user info:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [apiFetch, status])

	useEffect(() => {
		setFormData(prev => ({
			...prev,
			orderItems: cartProducts.map(item => {
				const product = products.find(p =>
					p.productVariants.some(pV => pV.id === item.productVariantId)
				)
				const variant = product?.productVariants.find(
					pV => pV.id === item.productVariantId
				)
				return {
					itemId: item.productVariantId,
					quantity: item.quantity,
					price: variant?.price ?? 0,
				}
			}),
		}))
	}, [cartProducts, products])

	if (cartProducts.length === 0) {
		return (
			<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
		)
	}

	if (loading) return <div>Завантаження...</div>

	return (
		<div className='flex flex-col md:grid md:grid-cols-7 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6'>
			<div className='space-y-2 md:space-y-3 lg:space-y-6 md:col-span-4 lg:col-span-2 order-2 md:order-1'>
				<CheckoutAuth />
				<CheckoutContactData formData={formData} setFormData={setFormData} />
				<CheckoutDeliveryData formData={formData} setFormData={setFormData} />
				<CheckoutPayment formData={formData} setFormData={setFormData} />
				<CheckoutMoreInfo formData={formData} setFormData={setFormData} />
				<div className='w-full flex justify-end'>
					<Button
						disabled={isLoading}
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
