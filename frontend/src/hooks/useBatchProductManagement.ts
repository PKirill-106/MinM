import { ChevronLeft } from 'lucide-react';
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
			const successes: number[] = [] // Track indices of successful creations
			const failures: { index: number; error: any }[] = [] // Track failures
			try {
				for (let i = 0; i < batchData.length; i++) {
					const formData = batchData[i]
					try {
						await apiFetch(token =>
							createProduct(formData, token, activeCategorySlug)
						)
						successes.push(i)
					} catch (err) {
						failures.push({ index: i, error: err })
						console.error(
							`[BatchProductManagement] Failed to create product at index ${i}:`,
							err
						)
					}
				}
				setBatchModalOpen(false)
				if (failures.length === 0) {
					toast.success('Групу продуктів успішно створено')
				} else if (successes.length > 0) {
					toast.error(
						`Створено ${successes.length} з ${batchData.length} продуктів. Перевірте помилки.`
					)
				} else {
					toast.error('Не вдалося створити жодного продукту')
				}
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
