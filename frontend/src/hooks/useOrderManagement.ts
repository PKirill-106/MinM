import { useState } from 'react'
import { useApi } from './useApi'
import { ICreateOrder, IUpdateUserInfo } from '@/types/Interfaces'
import {
	cancelOrder,
	createAuthOrder,
	createGuestOrder,
	updateOrder,
	updateOrderToPaid,
} from '@/lib/services/orderServices'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { updateUserInfo } from '@/lib/services/userServices'
import { useRouter } from 'next/navigation'

export default function useOrderManagement() {
	const { apiFetch } = useApi()
	const { data: session } = useSession()
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const [saveAddress, setSaveAddress] = useState<boolean>(true)

	function mapOrderToUserInfo(order: ICreateOrder): IUpdateUserInfo {
		return {
			userFirstName: order.recipientFirstName,
			userLastName: order.recipientLastName,
			phoneNumber: order.recipientPhone,
			addressDto: {
				street: order.userAddress.street,
				homeNumber: order.userAddress.homeNumber,
				city: order.userAddress.city,
				region: order.userAddress.region,
				postalCode: order.userAddress.postalCode,
				country: order.userAddress.country,
			},
		}
	}

	const handleOrderCreate = async (orderData: ICreateOrder) => {
		setIsLoading(true)
		console.log(orderData)
		try {
			if (session) {
				await apiFetch(token => createAuthOrder(orderData, token))
				toast.success('Замовлення створено')
				if (saveAddress && orderData.deliveryMethod === 'courier') {
					const userUpdate: IUpdateUserInfo = mapOrderToUserInfo(orderData)
					await apiFetch(token => updateUserInfo(userUpdate, token))
					toast.success('Дані оновлено')
				}
			} else {
				await createGuestOrder(orderData)
			}
			//router.push('/profile')
		} catch (err) {
			toast.error('Сталася помилка')
			console.log('[Checkout] Order create failed:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleOrderCancel = async (orderId: string) => {
		setIsLoading(true)
		try {
			await apiFetch(token => cancelOrder(orderId, token))
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] Order cancel failed:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const setOrderAsPaid = async (orderId: string) => {
		setIsLoading(true)
		try {
			await apiFetch(token => updateOrderToPaid(orderId, token))
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] failed to set Order as paid:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const changeOrderStatus = async (orderId: string) => {
		setIsLoading(true)
		try {
			await apiFetch(token => updateOrder(orderId, token))
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] failed to change Order status:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		saveAddress,
		setSaveAddress,
		handleOrderCreate,
		handleOrderCancel,
		setOrderAsPaid,
		changeOrderStatus,
	}
}
