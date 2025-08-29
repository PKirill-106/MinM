import CheckoutClient from '@/components/checkout/CheckoutClient'
import { getAllProducts } from '@/lib/services/productServices'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Оформлення замовлення | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description: 'Оформіть замовлення товарів M in M для манікюру.',
	openGraph: {
		title: 'Кошик  | M in M',
		description: 'Оформіть замовлення товарів M in M для манікюру',
		images: [
			{
				url: '/M-in-M-logo_Thubnail.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
}

export default async function CheckoutPage() {
	const products = await getAllProducts()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Оформлення замовлення</h2>
			<CheckoutClient products={products} />
		</div>
	)
}
