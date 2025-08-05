import { useCallback, useState } from 'react'
import { createProduct } from '@/lib/services/productServices'
import { useApi } from './useApi'
import toast from 'react-hot-toast'

export function useBatchProductManagement(activeCategorySlug?: string) {
	const { apiFetch } = useApi()

	const [isBatchModalOpen, setBatchModalOpen] = useState(false)
	const [isBatchLoading, setBatchLoading] = useState(false)

	const openBatchCreate = () => {
		setBatchModalOpen(true)
	}

	const handleBatchSubmit = useCallback(
		async (batchData: FormData[]) => {
			setBatchLoading(true)
			try {
				for (const formData of batchData) {
					await apiFetch(token =>
						createProduct(formData, token, activeCategorySlug)
					)
				}
				setBatchModalOpen(false)
				toast.success('Групу продуктів успішно створено')
			} catch (err) {
				toast.error('Сталася помилка при створенні групи продуктів')
				console.error('[BatchProductManagement] Submit failed:', err)
			} finally {
				setBatchLoading(false)
			}
		},
		[activeCategorySlug]
	)

	return {
		isBatchModalOpen,
		isBatchLoading,
		openBatchCreate,
		handleBatchSubmit,
		setBatchModalOpen,
	}
}
