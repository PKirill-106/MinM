import Image from 'next/image'
import { IOrderProductItem } from '../interfaces'
import Link from 'next/link'

export default function OrderProductItem({
  order,
	orderProduct,
	orderItemIds,
}: IOrderProductItem) {
	const currentVariant = orderProduct.productVariants.find(pV =>
		orderItemIds.includes(pV.id)
	)

	const quantity = order.orderItems.find(
		item => item.itemId === currentVariant?.id
	)?.quantity

	const price = order.orderItems.find(
		item => item.itemId === currentVariant?.id
	)?.price

	const totalPrice = price! * quantity!
	const variantName = currentVariant!.name

	const imgSrc = orderProduct.productImages[0]?.filePath
	const imgValidSrc =
		imgSrc && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
			? imgSrc
			: '/prod/product-image-unavailable.png'

	return (
		<div
			key={orderProduct.id}
			className='bg-white rounded-xs md:rounded-sm flex gap-2 mx-2 p-2'
		>
			<div className='relative aspect-square w-14'>
				<Image
					src={imgValidSrc}
					alt=''
					fill
					className='rounded-sm object-cover'
				/>
			</div>
			<div className='w-full flex flex-col justify-between'>
				<span className='text-sm md:text-base'>
					<Link href={`/product/${orderProduct.slug}`} className='inline-block li-hover'>
						{orderProduct.name}
					</Link>
				</span>
				<div className='flex items-center justify-between gap-3'>
					<div className='space-x-1'>
						<span className='text-sm md:text-base'>{variantName} мл</span>
						{' x '} <span className='text-sm md:text-base'>{quantity}</span>
					</div>
					<span className='text-sm md:text-base font-bold'>
						{totalPrice} грн
					</span>
				</div>
			</div>
		</div>
	)
}
