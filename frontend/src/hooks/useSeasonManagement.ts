'use client'

import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ICreateSeason, ISeason, IUpdateSeason } from '@/types/Interfaces'
import { createSeason, updateSeason } from '@/lib/services/seasonServices'
import { useApi } from './useApi'

export function useSeasonManagement() {
	const { apiFetch } = useApi()

	const [isSeasonModalOpen, setSeasonModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingSeason, setEditingSeason] = useState<ISeason | null>(null)

	const openCreateSeason = () => {
		setModalType('create')
		setEditingSeason(null)
		setSeasonModalOpen(true)
	}

	const openEditSeason = (season: ISeason) => {
		setModalType('update')
		setEditingSeason(season)
		setSeasonModalOpen(true)
	}

	const handleSubmitSeason = useCallback(
		async (seasonData: ICreateSeason | IUpdateSeason) => {
			try {
				if (modalType === 'create') {
					await apiFetch(token =>
						createSeason(seasonData as ICreateSeason, token)
					)
				} else {
					await apiFetch(token =>
						updateSeason(seasonData as IUpdateSeason, token)
					)
				}
				setSeasonModalOpen(false)
				toast.success(
					`Сезон ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('[SeasonManagement] Submit failed:', err)
			}
		},
		[modalType, apiFetch]
	)

	return {
		isSeasonModalOpen,
		modalType,
		editingSeason,
		openCreateSeason,
		openEditSeason,
		handleSubmitSeason,
		setSeasonModalOpen,
	}
}
