import { IOrderItem, IProduct } from '@/types/Interfaces'
import Image from 'next/image'

interface IAdminOrderItemCard {
	orderProduct: IProduct
	orderItems: IOrderItem[]
	orderItemIds: string[]
}

export default function AdminOrderItemCard({
	orderProduct,
	orderItems,
	orderItemIds,
}: IAdminOrderItemCard) {
	const currentVariant = orderProduct.productVariants.find(pV =>
		orderItemIds.includes(pV.id)
	)

	const quantity = orderItems.find(
		item => item.itemId === currentVariant?.id
	)?.quantity

	const price = currentVariant!.price * quantity!
	const variantName = currentVariant!.name

	const imgSrc = orderProduct.productImages[0]?.filePath
	const imgValidSrc =
		imgSrc && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
			? imgSrc
			: '/prod/product-image-unavailable.png'
	return (
		<div className='flex gap-2 border border-transparent-text p-2 rounded-md'>
			<div className='relative aspect-square w-14 md:w-16 lg:w-18'>
				<Image
					src={imgValidSrc}
					alt=''
					fill
					className='rounded-sm object-cover'
				/>
			</div>
			<div className='flex flex-col justify-between w-full'>
				<span className='text-sm'>{orderProduct.name}</span>
				<span className='text-gray-500 text-xs'>{orderProduct.sku}</span>
				<div className='flex justify-between'>
					<div>
						<span className='text-sm'>{variantName} мл</span>
						<span className='text-sm'> x {quantity}</span>
					</div>
					<span>{price} грн</span>
				</div>
			</div>
		</div>
	)
}
