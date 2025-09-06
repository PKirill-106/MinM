import { ICreateOrder } from '@/types/Interfaces'

export function buildOrderPayload(
	formData: ICreateOrder
): Partial<ICreateOrder> {
	if (formData.deliveryMethod === 'courier') {
		const {
			userAddress,
			orderItems,
			paymentMethod,
			deliveryMethod,
			additionalInfo,
			recipientFirstName,
			recipientLastName,
			recipientEmail,
			recipientPhone,
		} = formData
		return {
			userAddress,
			orderItems,
			paymentMethod,
			deliveryMethod,
			additionalInfo,
			recipientFirstName,
			recipientLastName,
			recipientEmail,
			recipientPhone,
		}
	} else {
		const {
			postAddress,
			orderItems,
			paymentMethod,
			deliveryMethod,
			additionalInfo,
			recipientFirstName,
			recipientLastName,
			recipientEmail,
			recipientPhone,
		} = formData
		return {
			postAddress,
			orderItems,
			paymentMethod,
			deliveryMethod,
			additionalInfo,
			recipientFirstName,
			recipientLastName,
			recipientEmail,
			recipientPhone,
		}
	}
}
