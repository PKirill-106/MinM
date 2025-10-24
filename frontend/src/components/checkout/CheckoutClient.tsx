'use client'
import { useCartTotal } from '@/hooks/useCartTotal'
import { useCheckoutForm } from '@/hooks/useCheckoutForm'
import { useCheckoutSubmit } from '@/hooks/useCheckoutSubmit'
import { useCheckoutValidation } from '@/hooks/useCheckoutValidation'
import { ICheckoutClient } from '@/types/Interfaces'
import { Button } from '../UI/button'
import CheckoutAuth from './CheckoutAuth'
import CheckoutContactData from './CheckoutContactData'
import CheckoutDeliveryData from './CheckoutDeliveryData'
import CheckoutFreeShipping from './CheckoutFreeShipping'
import CheckoutMoreInfo from './CheckoutMoreInfo'
import CheckoutPayment from './CheckoutPayment'
import CheckoutTotal from './CheckoutTotal'

export default function CheckoutClient({ products }: ICheckoutClient) {
	const cartTotal = useCartTotal(products)
	const deliveryPrice = 80
	const checkoutTotal =
		cartTotal >= 1500 ? cartTotal : cartTotal + deliveryPrice

	const { cartProducts, formData, setFormData, loading } =
		useCheckoutForm(products)
	const { isFormValid } = useCheckoutValidation(formData)
	const { isLoading, handleSubmit } = useCheckoutSubmit(checkoutTotal)

	if (cartProducts.length === 0) {
		return (
			<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
		)
	}

	if (loading) return <div>Завантаження...</div>

	return (
		<div className='flex flex-col md:grid md:grid-cols-7 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6'>
			<div className='space-y-2 md:space-y-3 lg:space-y-6 md:col-span-4 lg:col-span-2 order-2 md:order-1'>
				<CheckoutFreeShipping cartTotal={cartTotal} />
				<CheckoutAuth />
				<CheckoutContactData formData={formData} setFormData={setFormData} />
				<CheckoutDeliveryData formData={formData} setFormData={setFormData} />
				<CheckoutPayment formData={formData} setFormData={setFormData} />
				<CheckoutMoreInfo formData={formData} setFormData={setFormData} />
				<div className='w-full flex justify-end'>
					<Button
						disabled={isLoading || !isFormValid()}
						onClick={() => handleSubmit(formData)}
						className='p-6 md:p-7 text-md md:text-lg w-full md:w-auto'
					>
						Оформити замовлення
					</Button>
				</div>
			</div>
			<CheckoutTotal
				products={products}
				cartTotal={cartTotal}
				checkoutTotal={checkoutTotal}
				deliveryPrice={deliveryPrice}
			/>
		</div>
	)
}
