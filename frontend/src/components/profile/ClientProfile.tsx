'use client'
import { useApi } from '@/hooks/useApi'
import { getMyOrders } from '@/lib/services/orderServices'
import { getUserInfo } from '@/lib/services/userServices'
import { IGetUserInfo, IOrder, IUpdateUserInfo } from '@/types/Interfaces'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProfileTab from './ProfileTab'
import OrderHistory from './active-order-history/OrderHistory'
import ActiveProfile from './active-profile/ActiveProfile'
import { IClientProfileProps } from './interfaces'

export default function ClientProfile({ products }: IClientProfileProps) {
	const { apiFetch } = useApi()
	const [user, setUser] = useState<IGetUserInfo | null>(null)

	const router = useRouter()
	const searchParams = useSearchParams()

	const tabFromUrl = searchParams.get('tab') as 'profile' | 'orders' | null
	const activeTab = tabFromUrl || 'profile'

	const [myOrders, setMyOrders] = useState<IOrder[]>([])
	const [formData, setFormData] = useState<IUpdateUserInfo | null>(null)
	const [changed, setChanged] = useState(false)
	const [loading, setLoading] = useState(true)

	function normalizeInput(value: unknown): string {
		if (
			value === undefined ||
			value === null ||
			typeof value !== 'string' ||
			value.trim().toLowerCase() === 'string'
		) {
			return ''
		}
		return value
	}

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const [userData, orders] = await Promise.all([
					apiFetch(getUserInfo),
					apiFetch(getMyOrders),
				])
				setUser(userData)
				setMyOrders(orders)

				setFormData({
					userFirstName: normalizeInput(userData.userFirstName),
					userLastName: normalizeInput(userData.userLastName),
					phoneNumber: normalizeInput(userData.phoneNumber),
					addressDto: {
						country: normalizeInput(userData.address?.country),
						city: normalizeInput(userData.address?.city),
						region: normalizeInput(userData.address?.region),
						postalCode: normalizeInput(userData.address?.postalCode),
						street: normalizeInput(userData.address?.street),
						homeNumber: userData.address?.homeNumber || '',
					},
				})
				setLoading(false)
			} catch (error) {
				console.error('Failed to fetch user info:', error)
			}
		}

		fetchUser()
	}, [apiFetch])

	useEffect(() => {
		if (!tabFromUrl) {
			const params = new URLSearchParams(searchParams.toString())
			params.set('tab', 'profile')
			router.replace(`?${params.toString()}`)
		}
	}, [tabFromUrl, router, searchParams])

	if (loading) return <h3 className='text-center'>Завантаження...</h3>

	if (!user || !formData) return <div>Не вдалося завантажити дані</div>

	const filteredOrders = myOrders.filter(o => {
		if (o.status === 'Failed') return false
		if (o.status === 'Created' && o.paymentMethod === 'paymentSystem')
			return false
		return true
	})

	return (
		<div className='flex flex-col gap-6 mx-auto w-full max-w-2xl'>
			<ProfileTab activeTab={activeTab} />

			{activeTab === 'profile' ? (
				<ActiveProfile
					user={user}
					formData={formData}
					changed={changed}
					setFormData={setFormData}
					setChanged={setChanged}
				/>
			) : (
				<OrderHistory
					products={products}
					orders={filteredOrders}
					isLoading={loading}
				/>
			)}
		</div>
	)
}
