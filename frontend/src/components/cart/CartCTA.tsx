'use client'
import { useCart } from '@/providers/CartProvider'
import { ICartCTA } from '@/types/Interfaces'
import Link from 'next/link'
import { Button } from '../UI/button'
import { useCartTotal } from '@/hooks/useCartTotal'

export default function CartCTA({ products }: ICartCTA) {
	const { cartProducts } = useCart()

	const cartTotal = useCartTotal(products)

	if (!cartProducts || cartProducts.length === 0) return null

	return (
		<div className='sticky md:static bg-background md:bg-transparent bottom-0 pt-2 md:pt-0 flex justify-center items-center'>
			<div className='flex flex-col max-w-2xl w-full justify-start md:justify-end md:items-end gap-2'>
				<div className='flex justify-start items-center gap-2 text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-normal'>
					Загальна сума: <h2>{cartTotal}</h2>
				</div>
				<Link href='/checkout'>
					<Button className='p-6 md:p-7 text-md md:text-lg w-full'>
						Оформити замовлення
					</Button>
				</Link>
			</div>
		</div>
	)
}
