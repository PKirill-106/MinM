import {
	cancelOrder,
	createAuthOrder,
	createGuestOrder,
	updateOrder,
	updateOrderStatusAsFailed,
	updateOrderToPaid,
} from '@/lib/services/orderServices'
import { updateUserInfo } from '@/lib/services/userServices'
import { ICreateOrder, IUpdateUserInfo } from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useApi } from './useApi'

export default function useOrderManagement() {
	const { apiFetch } = useApi()
	const { data: session } = useSession()

	const [isLoading, setIsLoading] = useState(false)
	const [saveAddress, setSaveAddress] = useState<boolean>(true)

	function mapOrderToUserInfo(order: Partial<ICreateOrder>): IUpdateUserInfo {
		if (
			!order.userAddress ||
			!order.recipientFirstName ||
			!order.recipientLastName ||
			!order.recipientPhone
		) {
			throw new Error('All fields are required when mapping to user info')
		}

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

	const handleOrderCreate = async (orderData: Partial<ICreateOrder>) => {
		setIsLoading(true)
		let result
		try {
			if (session) {
				result = await apiFetch(token => createAuthOrder(orderData, token))
				toast.success('Замовлення створено')
				if (saveAddress && orderData.deliveryMethod === 'courier') {
					const userUpdate: IUpdateUserInfo = mapOrderToUserInfo(orderData)
					await apiFetch(token => updateUserInfo(userUpdate, token))
					toast.success('Дані оновлено')
				}
			} else {
				result = await createGuestOrder(orderData)
				toast.success('Замовлення створено')
			}

			return { success: true, data: result }
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] Order create failed:', err)
			return { success: false, error: err }
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

	const setOrderAsFailed = async (orderId: string) => {
		setIsLoading(true)
		try {
			await apiFetch(token => updateOrderStatusAsFailed(orderId, token))
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] failed to set Order as failed:', err)
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
		setOrderAsFailed,
		changeOrderStatus,
	}
}
