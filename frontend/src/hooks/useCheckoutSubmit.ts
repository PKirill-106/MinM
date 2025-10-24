import { ICreateOrder } from '@/types/Interfaces'
import useOrderManagement from './useOrderManagement'
import { buildOrderPayload } from '@/lib/utils/buildOrderPayload'
import { redirect, RedirectType } from 'next/navigation'

export const useCheckoutSubmit = (checkoutTotal: number) => {
	const { isLoading, handleOrderCreate } = useOrderManagement()

	const handleSubmit = async (formData: ICreateOrder) => {
		const cleanedFormData = {
			...formData,
			userAddress:
				formData.deliveryMethod === 'courier'
					? formData.userAddress
					: {
							country: '',
							city: '',
							region: '',
							street: '',
							homeNumber: '',
							postalCode: '',
					  },
			postAddress:
				formData.deliveryMethod === 'novaPost'
					? formData.postAddress
					: {
							country: '',
							city: '',
							region: '',
							postDepartment: '',
					  },
		}

		const orderPayload = buildOrderPayload(cleanedFormData)

		const res = await handleOrderCreate(orderPayload)
		const orderNumber = await res.data

		if (formData.paymentMethod === 'onCard') {
			redirect(
				`/payment/result?RESULT=0&SHOPORDERNUMBER=${orderNumber}&DESCRIPTION=${'Оплата+замовлення+M-in-M'}&ONCARD=0`,
				RedirectType.replace
			)
		} else if (formData.paymentMethod === 'paymentSystem') {
			try {
				const response = await fetch('/api/payments/portmone', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						amount: checkoutTotal,
						description: 'Оплата замовлення M-in-M',
						shopOrderNumber: orderNumber,
						successUrl: `${window.location.origin}/api/payments/portmone/callback`,
						failureUrl: `${window.location.origin}/api/payments/portmone/callback`,
					}),
				})

				const payload = await response.json()

				const form = document.createElement('form')
				form.method = 'POST'
				form.action = 'https://www.portmone.com.ua/gateway/'

				const bodyInput = document.createElement('input')
				bodyInput.type = 'hidden'
				bodyInput.name = 'bodyRequest'
				bodyInput.value = JSON.stringify(payload)

				const typeInput = document.createElement('input')
				typeInput.type = 'hidden'
				typeInput.name = 'typeRequest'
				typeInput.value = 'json'

				form.appendChild(bodyInput)
				form.appendChild(typeInput)
				document.body.appendChild(form)
				form.submit()
			} catch (err) {
				console.error('[Portmone] handleSubmit error:', err)
			}
		}
	}

	return { isLoading, handleSubmit }
}
