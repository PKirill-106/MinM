import {
	createProduct,
	deleteProduct,
	updateProduct,
} from '@/lib/services/productServices'
import { IDeleteProduct, IProduct } from '@/types/Interfaces'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useApi } from './useApi'

export function useProductManagement(
	activeCategorySlug?: string,
	products?: IProduct[]
) {
	const { apiFetch } = useApi()

	const [isProductModalOpen, setProductModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'create' | 'update'>('create')
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
	const [isProductLoading, setIsProductLoading] = useState(false)

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
		async (formData: FormData) => {
			setIsProductLoading(true)
			const name = formData.get('Name')?.toString().trim().toLowerCase()

			const nameAlreadyExists = products!.some(
				product => product.name.toLowerCase() === name
			)
			
			if (nameAlreadyExists && modalType === 'create') {
				toast.error('Продукт з такою назвою вже існує')
				setIsProductLoading(false)
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
			} finally {
				setIsProductLoading(false)
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
		isProductLoading,
		openCreateProduct,
		openEditProduct,
		handleSubmitProduct,
		handleDeleteProduct,
		setProductModalOpen,
	}
}
