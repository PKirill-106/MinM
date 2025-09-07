'use client'
import { useCart } from '@/providers/CartProvider'
import { IProduct } from '@/types/Interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import CheckoutItem from './CheckoutItem'
import './styles/scrollbar.css'

export interface ICheckoutTotal {
	products: IProduct[]
	cartTotal: number
	checkoutTotal: number
	deliveryPrice: number
}

export default function CheckoutTotal({
	products,
	cartTotal,
	checkoutTotal,
	deliveryPrice,
}: ICheckoutTotal) {
	const { cartProducts } = useCart()

	return (
		<Card className='w-full h-fit shadow-lg text-foreground md:sticky md:top-23 lg:top-28 xl:top-30 md:col-span-3 lg:col-span-1 order-1 md:order-2'>
			<CardHeader className='text-2xl flex justify-between '>
				<CardTitle>Товарів: {cartProducts.length}</CardTitle>{' '}
				<CardTitle>{cartTotal} грн</CardTitle>{' '}
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='space-y-2 max-h-120 custom-scrollbar overflow-y-scroll scrollbar-y-hide'>
					{cartProducts.map(cartItem => {
						const product = products.find(p => p.id === cartItem.productId)
						const variant = product?.productVariants.find(
							pV => pV.id === cartItem.productVariantId
						)
						if (!product || !variant) return null
						return (
							<CheckoutItem
								key={`${cartItem.productId}-${cartItem.productVariantId}`}
								product={product}
								variant={variant}
								cartItem={cartItem}
							/>
						)
					})}
				</div>
				<hr className='my-5' />
				<div className='px-2'>
					<div className='flex justify-between'>
						<span>Вартість товару:</span>
						<span>{cartTotal} грн</span>
					</div>
					<div className='flex justify-between'>
						<span>Вартість доставки:</span>
						<span>{deliveryPrice} грн</span>
					</div>
				</div>
				<hr className='my-5' />
				<div className='flex justify-between'>
					<span className='text-xl md:text-xl font-semibold'>
						Загальна сума
					</span>
					<span className='text-xl md:text-xl font-semibold'>
						{checkoutTotal} грн
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
