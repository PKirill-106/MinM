import { useCart } from '@/providers/CartProvider'
import { ICartButton } from '@/types/Interfaces'
import { ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CartButton({
	productId,
	initialVariantId,
	unitsInStock,
}: ICartButton) {
	const { cartProducts, isInCart, addToCart, removeFromCart } = useCart()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		isInCart(productId)
	}, [productId])

	const handleClick = async () => {
		if (isInCart(productId)) {
			const itemsToRemove = cartProducts.filter(item => item.id === productId)
			await Promise.all(
				itemsToRemove.map(item =>
					removeFromCart(item.id!, productId, item.productVariantId)
				)
			)
		} else {
			addToCart(productId, initialVariantId, 1, unitsInStock)
		}

		setAnimate(true)
		setTimeout(() => setAnimate(false), 300)
	}

	return (
		<button
			onClick={handleClick}
			className={`transition duration-200 cursor-pointer ${
				animate ? 'scale-120' : ''
			}`}
		>
			<ShoppingBag
				className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 ${
					isInCart(productId)
						? 'text-transparent-text hover:text-red-500'
						: 'text-accent hover:text-button-text'
				}`}
			/>
		</button>
	)
}
