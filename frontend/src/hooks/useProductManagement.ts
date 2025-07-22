import { useState, useCallback } from 'react'
import { IProduct, IDeleteProduct } from '@/types/Interfaces'
import {
	createProduct,
	updateProduct,
	deleteProduct,
} from '@/lib/services/productServices'
import toast from 'react-hot-toast'
import { useApi } from './useApi'

export function useProductManagement(activeCategorySlug?: string) {
	const { apiFetch } = useApi()

	const [isProductModalOpen, setProductModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

	const openCreateProduct = () => {
		setModalType('create')
		setEditingProduct(null)
		setProductModalOpen(true)
	}

	const openEditProduct = (prod: IProduct) => {
		setModalType('update')
		setEditingProduct(prod)
		setProductModalOpen(true)
	}

	const handleSubmitProduct = useCallback(
		async (formData: FormData, token: string) => {
			if (!token) {
				console.error('[ProductManagement] No access token')
				return
			}

			try {
				if (modalType === 'create') {
					await apiFetch(token =>
						createProduct(formData, token, activeCategorySlug)
					)
				} else {
					await apiFetch(token =>
						updateProduct(formData, token, activeCategorySlug)
					)
				}
				setProductModalOpen(false)
				toast.success(
					`Продукт ${modalType === 'create' ? 'створено' : 'оновлено'}`
				)
			} catch (err) {
				toast.error('Сталася помилка')
				console.error('[ProductManagement] Submit failed:', err)
			}
		},
		[modalType, activeCategorySlug]
	)

	const handleDeleteProduct = async (productId: IDeleteProduct) => {
		try {
			await apiFetch(token =>
				deleteProduct(productId, token, activeCategorySlug)
			)
			toast.success('Продукт видалено')
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[ProductManagement] Delete failed:', err)
		}
	}

	return {
		isProductModalOpen,
		modalType,
		editingProduct,
		openCreateProduct,
		openEditProduct,
		handleSubmitProduct,
		handleDeleteProduct,
		setProductModalOpen,
	}
}
