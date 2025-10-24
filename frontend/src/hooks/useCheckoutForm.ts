import { getUserInfo } from '@/lib/services/userServices'
import { normalizeInput } from '@/lib/utils/normalizeInput'
import { useCart } from '@/providers/CartProvider'
import { ICreateOrder, IProductVariant } from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IGetUserInfo } from './../types/Interfaces'
import { useApi } from './useApi'

export const useCheckoutForm = (products: any[]) => {
	const { apiFetch } = useApi()
	const { status } = useSession()
	const { cartProducts } = useCart()

	const [loading, setLoading] = useState(true)
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
				p.productVariants.some(
					(pV: IProductVariant) => pV.id === item.productVariantId
				)
			)

			const variant = product?.productVariants.find(
				(pV: IProductVariant) => pV.id === item.productVariantId
			)

			const totalPrice = product?.isDiscounted
				? variant?.discountPrice
				: variant?.price

			return {
				itemId: item.productVariantId,
				quantity: item.quantity,
				price: totalPrice ?? 0,
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

	useEffect(() => {
		const fetchUser = async () => {
			if (status !== 'authenticated') {
				setLoading(false)
				return
			}
			try {
				const userData: IGetUserInfo = await apiFetch(token =>
					getUserInfo(token)
				)
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
					p.productVariants.some(
						(pV: IProductVariant) => pV.id === item.productVariantId
					)
				)
				const variant = product?.productVariants.find(
					(pV: IProductVariant) => pV.id === item.productVariantId
				)

				const totalPrice = product?.isDiscounted
					? variant?.discountPrice
					: variant?.price

				return {
					itemId: item.productVariantId,
					quantity: item.quantity,
					price: totalPrice ?? 0,
				}
			}),
		}))
	}, [cartProducts, products])

	return { cartProducts, formData, setFormData, loading }
}
