'use client'
import { useApi } from '@/hooks/useApi'
import { getUserInfo } from '@/lib/services/userServices'
import { IGetUserInfo, IUpdateUserInfo } from '@/types/Interfaces'
import { useEffect, useState } from 'react'
import ProfileTab from './ProfileTab'
import ActiveProfile from './active-profile/ActiveProfile'

export interface IClientProfileProps {}

export default function ClientProfile({}: IClientProfileProps) {
	const { apiFetch } = useApi()
	const [user, setUser] = useState<IGetUserInfo | null>(null)
	const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile')
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
				const userData = await apiFetch(getUserInfo)
				setUser(userData)
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

	if (loading) return <div>Завантаження...</div>

	if (!user || !formData) return <div>Не вдалося завантажити дані</div>

	return (
		<div className='flex flex-col gap-6 mx-auto w-full max-w-2xl'>
			<ProfileTab activeTab={activeTab} setActiveTab={setActiveTab} />

			{activeTab === 'profile' ? (
				<ActiveProfile
					user={user}
					formData={formData}
					changed={changed}
					setFormData={setFormData}
					setChanged={setChanged}
				/>
			) : (
				''
			)}
		</div>
	)
}
