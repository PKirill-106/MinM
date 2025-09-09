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
import { useCartTotal } from '@/hooks/useCartTotal'
import { buildOrderPayload } from '@/lib/utils/buildOrderPayload'

export default function CheckoutClient({ products }: ICheckoutClient) {
	const { apiFetch } = useApi()
	const { status } = useSession()

	const cartTotal = useCartTotal(products)
	const deliveryPrice = 55
	const checkoutTotal = cartTotal + deliveryPrice

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

	const handleSubmit = async (formData: ICreateOrder) => {
		const orderPayload = buildOrderPayload(formData)

		const res = await handleOrderCreate(orderPayload)
		const orderNumber = await res.data

		try {
			const response = await fetch('/api/payments/portmone', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: checkoutTotal,
					description: 'Оплата замовлення M-in-M',
					shopOrderNumber: orderNumber,
					successUrl: `${window.location.origin}/api/payments/portmone/callback`,
					failureUrl: `${window.location.origin}/api/payments/portmone/callback`,
				}),
			})

			const payload = await response.json()

			const form = document.createElement('form')
			form.method = 'POST'
			form.action = 'https://www.portmone.com.ua/gateway/'

			const bodyInput = document.createElement('input')
			bodyInput.type = 'hidden'
			bodyInput.name = 'bodyRequest'
			bodyInput.value = JSON.stringify(payload)

			const typeInput = document.createElement('input')
			typeInput.type = 'hidden'
			typeInput.name = 'typeRequest'
			typeInput.value = 'json'

			form.appendChild(bodyInput)
			form.appendChild(typeInput)
			document.body.appendChild(form)
			form.submit()
		} catch (err) {
			console.error('handleSubmit error:', err)
		}
	}

	// helper: безопасно проверяет, что значение непустое (работает для string | number | undefined | null)
	const isNonEmpty = (v: unknown): boolean => {
		return v !== undefined && v !== null && String(v).trim().length > 0
	}

	const isFormValid = (): boolean => {
		if (!formData) return false

		if (
			!isNonEmpty(formData.recipientFirstName) ||
			!isNonEmpty(formData.recipientLastName) ||
			!isNonEmpty(formData.recipientEmail) ||
			!isNonEmpty(formData.recipientPhone)
		) {
			return false
		}

		if (!formData.orderItems || formData.orderItems.length === 0) return false

		if (formData.deliveryMethod === 'courier') {
			const ua = formData.userAddress
			return (
				isNonEmpty(ua.country) &&
				isNonEmpty(ua.region) &&
				isNonEmpty(ua.city) &&
				isNonEmpty(ua.street) &&
				isNonEmpty(ua.homeNumber)
			)
		} else {
			const pa = formData.postAddress
			return (
				isNonEmpty(pa.country) &&
				isNonEmpty(pa.region) &&
				isNonEmpty(pa.city) &&
				isNonEmpty(pa.postDepartment)
			)
		}
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
						disabled={isLoading || !isFormValid()}
						onClick={() => handleSubmit(formData)}
						className='p-6 md:p-7 text-md md:text-lg w-full md:w-auto'
					>
						Оформити замовлення
					</Button>
				</div>
			</div>
			<CheckoutTotal
				products={products}
				cartTotal={cartTotal}
				checkoutTotal={checkoutTotal}
				deliveryPrice={deliveryPrice}
			/>
		</div>
	)
}
