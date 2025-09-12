import { useEffect, useMemo, useState, useCallback } from 'react'
import { IOrder } from '@/types/Interfaces'
import { getAllOrders } from '@/lib/services/orderServices'
import { useApi } from '@/hooks/useApi'

type DateFilter = 'week' | 'month' | 'year' | 'all'
type SortStatus =
	| 'all'
	| 'Created'
	| 'Canceled'
	| 'Paid'
	| 'Pending'
	| 'Delivering'
	| 'Received'
	| 'Returned'
	| 'Failed'

export function useOrders() {
	const { apiFetch } = useApi()

	const [orders, setOrders] = useState<IOrder[]>([])
	const [loading, setLoading] = useState(true)

	const [dateFilter, setDateFilter] = useState<DateFilter>('all')
	const [statusFilter, setStatusFilter] = useState<SortStatus>('all')

	const [page, setPage] = useState(1)
	const limit = 25

	const fetchOrders = useCallback(async () => {
		setLoading(true)
		try {
			const data: IOrder[] = await apiFetch(token => getAllOrders(token))

			const ordersWithoutFailed = data.filter(o => {
				if (o.status === 'Failed') return false
				if (o.status === 'Created' && o.paymentMethod === 'paymentSystem')
					return false
				return true
			})

			setOrders(
				ordersWithoutFailed.sort(
					(a, b) =>
						new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
				)
			)
		} catch (e) {
			console.error('Failed to fetch orders', e)
		} finally {
			setLoading(false)
		}
	}, [apiFetch])

	useEffect(() => {
		fetchOrders()
	}, [fetchOrders])

	const filteredOrders = useMemo(() => {
		let filtered = [...orders]

		if (statusFilter !== 'all') {
			filtered = filtered.filter(order => order.status === statusFilter)
		}

		if (dateFilter !== 'all') {
			const now = new Date()
			filtered = filtered.filter(order => {
				const orderDate = new Date(order.orderDate)
				switch (dateFilter) {
					case 'week':
						return orderDate >= new Date(now.setDate(now.getDate() - 7))
					case 'month':
						return orderDate >= new Date(now.setMonth(now.getMonth() - 1))
					case 'year':
						return orderDate >= new Date(now.setFullYear(now.getFullYear() - 1))
					default:
						return true
				}
			})
		}

		return filtered
	}, [orders, statusFilter, dateFilter])

	const paginatedOrders = useMemo(() => {
		const start = (page - 1) * limit
		return filteredOrders.slice(start, start + limit)
	}, [filteredOrders, page])

	const totalPages = Math.ceil(filteredOrders.length / limit)

	return {
		loading,
		orders: paginatedOrders,
		page,
		totalPages,
		setPage,
		dateFilter,
		setDateFilter,
		statusFilter,
		setStatusFilter,
		refetchOrders: fetchOrders,
	}
}
