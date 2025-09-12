import { useCart } from '@/providers/CartProvider'
import { IGetCartItem, IProduct, IProductVariant } from '@/types/Interfaces'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../UI/button'
import Link from 'next/link'

export interface ICheckoutItem {
	product: IProduct
	variant: IProductVariant
	cartItem: IGetCartItem
}

export default function CheckoutItem({
	product,
	variant,
	cartItem,
}: ICheckoutItem) {
	const { removeFromCart } = useCart()

	const imgSrc = product.productImages?.[0]?.filePath
	const validSrc =
		imgSrc && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
			? imgSrc
			: '/prod/product-image-unavailable.png'

	const displayPrice = product.isDiscounted
		? variant.discountPrice
		: variant.price

	const totalPrice = displayPrice * cartItem.quantity

	return (
		<div className='flex gap-2 border p-2 rounded-lg'>
			<div className='flex-1 relative w-full max-w-30 h-full max-h-30 aspect-square'>
				<Image src={validSrc} alt='' fill className='object-cover rounded-lg' />
				<Button
					onClick={() => removeFromCart(cartItem!.id!, product.id, variant.id)}
					variant='destructive'
					className='relative p-0! z-8 w-7 h-7 md:w-6 md:h-6! rounded-sm'
				>
					<Trash className='md:w-4! md:h-4!' />
				</Button>
			</div>
			<div className='flex flex-2 flex-col justify-between w-full'>
				<Link
					href={`/product/${product.slug}`}
					className='w-fit line-clamp-1 li-hover'
				>
					{product.name}
				</Link>
				<div className='flex flex-col justify-between'>
					<div className='flex items-center gap-2'>
						<div className='border p-1 xl:p-2 rounded-lg'>
							<span className='text-sm md:text-base'>{variant.name} мл</span>
						</div>
						<span className='text-gray-700/70 text-sm md:text-base'>
							x {cartItem.quantity}
						</span>
					</div>
					{product.isDiscounted ? (
						<div className='space-x-2'>
							<span className='line-through text-transparent-text '>
								{variant.price * cartItem.quantity} грн
							</span>
							<span className='font-bold text-accent'>{totalPrice} грн</span>
						</div>
					) : (
						<span className='text-xl font-bold'>{totalPrice} грн</span>
					)}{' '}
				</div>
			</div>
		</div>
	)
}
