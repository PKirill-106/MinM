import { useCart } from '@/providers/CartProvider'
import { IProduct } from '@/types/Interfaces'
import { useMemo } from 'react'

export const useCartTotal = (products: IProduct[]) => {
	const { cartProducts } = useCart()

	return useMemo(() => {
		return cartProducts.reduce((sum, cartItem) => {
			const product = products?.find(p => p?.id === cartItem?.productId)
			if (!product || !product?.productVariants) return sum

			const productVariant = product.productVariants?.find(
				pV => pV?.id === cartItem?.productVariantId
			)
			if (!productVariant) return sum

			const price = product.isDiscounted
				? productVariant.discountPrice
				: productVariant?.price

			return sum + (price * (cartItem?.quantity || 1) || 0)
		}, 0)
	}, [cartProducts, products])
}
