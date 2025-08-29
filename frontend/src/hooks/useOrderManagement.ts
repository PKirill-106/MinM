import { useState } from 'react'
import { useApi } from './useApi'
import { ICreateOrder } from '@/types/Interfaces'
import {
	cancelOrder,
	createAuthOrder,
	createGuestOrder,
  updateOrder,
  updateOrderToPaid,
} from '@/lib/services/orderServices'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function useOrderManagement() {
	const { apiFetch } = useApi()
	const { data: session } = useSession()

	const [isLoading, setIsLoading] = useState(false)

	const handleOrderCreate = async (orderData: ICreateOrder) => {
		setIsLoading(true)
		try {
			if (session) {
				await apiFetch(token => createAuthOrder(orderData, token))
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
		handleOrderCreate,
		handleOrderCancel,
		setOrderAsPaid,
		changeOrderStatus,
	}
}
