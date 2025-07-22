'use client'

import { useCart } from '@/providers/CartProvider'
import { ICartList } from '@/types/Interfaces'
import React from 'react'
import CartItem from './CartItem'

export default function CartList({ products }: ICartList) {
	const { cartProducts } = useCart()

	if (cartProducts.length === 0) {
		return (
			<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
		)
	}

	return (
		<div>
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
		</div>
	)
}
