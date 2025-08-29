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

export default function useOrderManagement() {
	const { apiFetch } = useApi()
	const { data: session } = useSession()

	const [isLoading, setIsLoading] = useState(false)
	const [saveAddress, setSaveAddress] = useState<boolean>(true)

	function mapOrderToUserInfo(order: ICreateOrder): IUpdateUserInfo {
		return {
			userFirstName: order.recipientFirstName,
			userLastName: order.recipientLastName,
			phoneNumber: order.recipientPhone,
			addressDto: {
				street: order.address.street,
				homeNumber: order.address.homeNumber,
				city: order.address.city,
				region: order.address.region,
				postalCode: order.address.postalCode,
				country: order.address.country,
			},
		}
	}

	const handleOrderCreate = async (orderData: ICreateOrder) => {
		setIsLoading(true)
		try {
			if (session) {
				await apiFetch(token => createAuthOrder(orderData, token))
				if (saveAddress && orderData.deliveryType === 'address') {
					const userUpdate: IUpdateUserInfo = mapOrderToUserInfo(orderData)
					await apiFetch(token => updateUserInfo(userUpdate, token))
				}
			} else {
				await createGuestOrder(orderData)
			}
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[Checkout] Order create failed:', err)
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
