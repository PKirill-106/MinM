import CartClient from '@/components/cart/CartClient'
import { getAllProducts } from '@/lib/services/productServices'
import { IProduct } from '@/types/Interfaces'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Кошик | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description:
		'Ваш кошик з товарами для манікюру. Готові до оформлення замовлення',
	openGraph: {
		title: 'Кошик  | M in M',
		description:
			'Ваш кошик з товарами для манікюру. Готові до оформлення замовлення',
		images: [
			{
				url: '/M-in-M-logo_Thubnail.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
}

export default async function CartPage() {
	const products: IProduct[] = await getAllProducts()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Кошик</h2>
			<CartClient products={products}  />
		</div>
	)
}
