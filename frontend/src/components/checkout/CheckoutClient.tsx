'use client'
import { useCart } from '@/providers/CartProvider'
import { ICheckoutClient } from '@/types/Interfaces'
import React from 'react'

export default function CheckoutClient({ products }: ICheckoutClient) {
	const { cartProducts } = useCart()

	if (cartProducts.length === 0) {
		return (
			<h3 className='flex justify-center my-30'>Відсутні товари в кошику</h3>
		)
	}

	return <div>CheckoutClient</div>
}
