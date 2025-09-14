import { useState } from 'react'
import { useApi } from './useApi'
import { ICreateReview } from '@/types/Interfaces'
import { createReview, deleteReview } from '@/lib/services/reviewServices'
import toast from 'react-hot-toast'

export default function useReviews() {
	const { apiFetch } = useApi()

	const [isLoading, setIsLoading] = useState(false)

	const handleReviewCreate = async (reviewData: ICreateReview) => {
		setIsLoading(true)
		let result
		try {
			result = await apiFetch(token => createReview(reviewData, token))
			toast.success('Відгук створено')

			return { success: true, data: result }
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[useReviews] Review create failed:', err)
			return { success: false, error: err }
		} finally {
			setIsLoading(false)
		}
	}

	const handleReviewDelete = async (reviewId: string) => {
		setIsLoading(true)
		let result
		try {
			result = await apiFetch(token => deleteReview(reviewId, token))
			toast.success('Відгук видалено')

			return { success: true, data: result }
		} catch (err) {
			toast.error('Сталася помилка')
			console.error('[useReviews] Review create failed:', err)
			return { success: false, error: err }
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, handleReviewCreate, handleReviewDelete }
}
