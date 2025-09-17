'use client'

import { useCart } from '@/providers/CartProvider'
import { ICartList } from '@/types/Interfaces'
import React, { Suspense } from 'react'
import Loader from '../UI/Loader'
import dynamic from 'next/dynamic'

const CartItem = dynamic(() => import('./CartItem'), {
	ssr: false,
	loading: () => <Loader />,
})

export default function CartList({ products }: ICartList) {
	const { cartProducts } = useCart()

	return (
		<Suspense fallback={<Loader />}>
			{cartProducts.length === 0 ? (
				<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
			) : (
				<div className='flex flex-col gap-6'>
					{cartProducts.map(cartItem => {
						const product = products.find(p => p.id === cartItem.productId)
						if (!product) return null
						return (
							<CartItem
								key={`${cartItem.productId}-${cartItem.productVariantId}`}
								product={product}
								cartItem={cartItem}
							/>
						)
					})}
				</div>
			)}
		</Suspense>
	)
}
