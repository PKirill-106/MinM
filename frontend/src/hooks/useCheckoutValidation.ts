import { ICreateOrder } from '@/types/Interfaces'

export const useCheckoutValidation = (formData: ICreateOrder | null) => {
	const isNonEmpty = (v: unknown): boolean => {
		return v !== undefined && v !== null && String(v).trim().length > 0
	}

	const isFormValid = (): boolean => {
		if (!formData) return false

		if (
			!isNonEmpty(formData.recipientFirstName) ||
			!isNonEmpty(formData.recipientLastName) ||
			!isNonEmpty(formData.recipientEmail) ||
			!isNonEmpty(formData.recipientPhone)
		) {
			return false
		}

		if (!formData.orderItems || formData.orderItems.length === 0) return false

		if (formData.deliveryMethod === 'courier') {
			const ua = formData.userAddress
			return (
				isNonEmpty(ua.country) &&
				isNonEmpty(ua.region) &&
				isNonEmpty(ua.city) &&
				isNonEmpty(ua.street) &&
				isNonEmpty(ua.homeNumber)
			)
		} else {
			const pa = formData.postAddress
			return (
				isNonEmpty(pa.country) &&
				isNonEmpty(pa.region) &&
				isNonEmpty(pa.city) &&
				isNonEmpty(pa.postDepartment)
			)
		}
	}
  
	return { isFormValid }
}
