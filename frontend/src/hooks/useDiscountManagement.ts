'use client'

import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { ICreateDiscount, IDiscount, IUpdateDiscount } from '@/types/Interfaces'
import { createDiscount, updateDiscount } from '@/lib/services/discountServices'
import { useApi } from './useApi'

export function useDiscountManagement() {
	const { apiFetch } = useApi()

	const [isDiscountModalOpen, setDiscountModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingDiscount, setEditingDiscount] = useState<IDiscount | null>(null)

	const openCreateDiscount = () => {
		setModalType('create')
		setEditingDiscount(null)
		setDiscountModalOpen(true)
	}

	const openEditDiscount = (discount: IDiscount) => {
		setModalType('update')
		setEditingDiscount(discount)
		setDiscountModalOpen(true)
	}

	const handleSubmitDiscount = useCallback(
		async (discountData: ICreateDiscount | IUpdateDiscount) => {
			try {
				if (modalType === 'create') {
					await apiFetch(token =>
						createDiscount(discountData as ICreateDiscount, token)
					)
				} else {
					await apiFetch(token =>
						updateDiscount(discountData as IUpdateDiscount, token)
					)
				}
				setDiscountModalOpen(false)
				toast.success(
					`Знижку ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('[DiscountManagement] Submit failed:', err)
			}
		},
		[modalType, apiFetch]
	)

	return {
		isDiscountModalOpen,
		modalType,
		editingDiscount,
		openCreateDiscount,
		openEditDiscount,
		handleSubmitDiscount,
		setDiscountModalOpen,
	}
}
