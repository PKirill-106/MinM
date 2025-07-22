'use client'

import { useApi } from '@/hooks/useApi'
import { updateUserInfo } from '@/lib/services/userServices'
import { IUpdateUserInfo } from '@/types/Interfaces'
import toast from 'react-hot-toast'
import { IActiveProfile } from '../interfaces'
import { ProfileButtons } from '../ProfileButtons'
import AddressSection from './AddressSection'
import PersonalInfoSection from './PersonalInfoSection'

export default function ActiveProfile({
	user,
	formData,
	changed,
	setFormData,
	setChanged,
}: IActiveProfile) {
	const { apiFetch } = useApi()

	const handleChange = (field: string, value: string) => {
		setFormData(prev => {
			if (!prev) return prev

			if (field.startsWith('addressDto.')) {
				const key = field.split('.')[1] as keyof IUpdateUserInfo['addressDto']
				return {
					...prev,
					addressDto: {
						...prev.addressDto,
						[key]: value,
					},
				}
			}

			const key = field as keyof IUpdateUserInfo
			return {
				...prev,
				[key]: value,
			}
		})
		setChanged(true)
	}

	const handleSave = async () => {
		if (!formData) return
		const safeData: IUpdateUserInfo = {
			...formData,
			addressDto: {
				...formData.addressDto,
				country: formData.addressDto.country?.trim()
					? formData.addressDto.country
					: 'Україна',
			},
		}

		await apiFetch(token => updateUserInfo(safeData, token))
		toast.success('Інформацію збережено')
		setChanged(false)
	}

	return (
		<div className='w-full flex flex-col gap-6'>
			<PersonalInfoSection
				user={user}
				formData={formData}
				onChange={handleChange}
			/>

			<AddressSection formData={formData} onChange={handleChange} />

			<ProfileButtons changed={changed} onSave={handleSave} />
		</div>
	)
}
