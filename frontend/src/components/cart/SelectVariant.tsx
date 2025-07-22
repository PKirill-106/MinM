'use client'
import { useCart } from '@/providers/CartProvider'
import { IGetCartItem, IProduct } from '@/types/Interfaces'
import { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'

export interface ISelectVariant {
	cartItem: IGetCartItem
	product: IProduct
}

export default function SelectVariant({
	cartItem,
	product,
}: ISelectVariant) {
	const { updateCartItem } = useCart()

	const [selectedVariantId, setSelectedVariantId] = useState(
		cartItem.productVariantId
	)

	const handleVariantChange = (newId: string) => {
		setSelectedVariantId(newId)

		const newVariant = product.productVariants.find(v => v.id === newId)
		if (!newVariant) return

		updateCartItem(
			cartItem.id!,
			newId,
			cartItem.quantity,
			newVariant.unitsInStock
		)
	}

	return (
		<Select value={selectedVariantId} onValueChange={handleVariantChange}>
			<SelectTrigger className='px-5 md:py-[22px] lg:py-7 border-1 aspect-square rounded-sm md:rounded-md cursor-pointer border-transparent-text hover:border-accent lg:text-2xl'>
				<SelectValue placeholder='Варіант' />
			</SelectTrigger>
			<SelectContent>
				{product.productVariants.map(v => (
					<SelectItem key={v.id} value={v.id}>
						<span className='text:lg md:text-xl lg:text-2xl '>{v.name} ml</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
