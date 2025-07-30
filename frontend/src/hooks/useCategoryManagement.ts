import { useState, useCallback } from 'react'
import { ICategory } from '@/types/Interfaces'
import {
	createCategory,
	updateCategory,
	deleteCategory,
} from '@/lib/services/categoryServices'
import toast from 'react-hot-toast'
import { useApi } from './useApi'

export function useCategoryManagement(categories?: ICategory[]) {
	const { apiFetch } = useApi()

	const [isCategoryModalOpen, setCategoryModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)
	const [deleteOption, setDeleteOption] = useState<
		'CascadeDelete' | 'ReassignToParent' | 'Orphan' | null
	>(null)
	const [isCategoryLoading, setCategoryIsLoading] = useState(false)

	const openCreateCategory = () => {
		setModalType('create')
		setEditingCategory(null)
		setCategoryModalOpen(true)
	}

	const openEditCategory = (cat: ICategory) => {
		setModalType('update')
		setEditingCategory(cat)
		setCategoryModalOpen(true)
	}

	const handleSubmitCategory = useCallback(
		async (formData: FormData) => {
			setCategoryIsLoading(true)

			const name = formData.get('name')?.toString().trim().toLowerCase()

			const nameAlreadyExists = categories!.some(
				category => category.name.toLowerCase() === name
			)

			if (nameAlreadyExists && modalType === 'create') {
				toast.error('Категорія з такою назвою вже існує')
				setCategoryIsLoading(false)
				return
			}

			try {
				if (modalType === 'create') {
					await apiFetch(token => createCategory(formData, token))
				} else {
					await apiFetch(token => updateCategory(formData, token))
				}
				setCategoryModalOpen(false)
				toast.success(
					`Категорію ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('[CategoryManagement] Submit failed:', err)
			} finally {
				setCategoryIsLoading(false)
			}
		},
		[modalType, apiFetch]
	)

	const handleDeleteCategory = async (categoryId: string) => {
		try {
			const payload = {
				categoryId,
				option: deleteOption ?? 'CascadeDelete',
			}
			await apiFetch(token => deleteCategory(payload, token))
			toast.success('Категорію видалено')
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[CategoryManagement] Delete failed:', err)
		}
	}

	return {
		isCategoryModalOpen,
		modalType,
		editingCategory,
		deleteOption,
		isCategoryLoading,
		openCreateCategory,
		openEditCategory,
		handleSubmitCategory,
		handleDeleteCategory,
		setCategoryModalOpen,
		setDeleteOption,
	}
}
