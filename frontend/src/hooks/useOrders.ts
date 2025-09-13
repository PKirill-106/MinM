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

	const [dateFilter, setDateFilter] = useState<DateFilter>('month')
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
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

			filtered = filtered.filter(order => {
				const orderDate = new Date(order.orderDate)
				const orderDay = new Date(
					orderDate.getFullYear(),
					orderDate.getMonth(),
					orderDate.getDate()
				)

				switch (dateFilter) {
					case 'week':
						const weekAgo = new Date(today)
						weekAgo.setDate(today.getDate() - 7)
						return orderDay >= weekAgo

					case 'month':
						const monthAgo = new Date(today)
						monthAgo.setMonth(today.getMonth() - 1)
						return orderDay >= monthAgo

					case 'year':
						const yearAgo = new Date(today)
						yearAgo.setFullYear(today.getFullYear() - 1)
						return orderDay >= yearAgo

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

	const totalFilteredEarnings = useMemo(() => {
		return filteredOrders.reduce((sum, order) => {
			const orderTotal = order.orderItems.reduce(
				(s, item) => s + item.price * item.quantity,
				0
			)
			return sum + orderTotal
		}, 0)
	}, [filteredOrders])

	const getDateFilterLabel = (filter: DateFilter) => {
		switch (filter) {
			case 'week':
				return 'тиждень'
			case 'month':
				return 'місяць'
			case 'year':
				return 'рік'
			default:
				return ''
		}
	}

	return {
		loading,
		orders: paginatedOrders,
		filteredOrders,
		totalFilteredEarnings,
		page,
		totalPages,
		setPage,
		dateFilter,
		setDateFilter,
		statusFilter,
		setStatusFilter,
		refetchOrders: fetchOrders,
		getDateFilterLabel,
	}
}
