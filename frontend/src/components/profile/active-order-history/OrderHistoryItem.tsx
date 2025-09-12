import Image from 'next/image'
import { IOrderHistoryItem } from '../interfaces'
import OrderDetails from './OrderDetails'
import { convertOrderStatus } from '@/lib/utils/convertOrderStatus'

export default function OrderHistoryItem({
	order,
	products,
}: IOrderHistoryItem) {
	const orderItemIds = order.orderItems.map(item => item.itemId)

	const orderProducts = products.filter(product =>
		product.productVariants.some(variant => orderItemIds.includes(variant.id))
	)

	const firstImgSrc = products[0].productImages?.[0]?.filePath
	const firstValidSrc =
		firstImgSrc &&
		(firstImgSrc.startsWith('http://') || firstImgSrc.startsWith('https://'))
			? firstImgSrc
			: '/prod/product-image-unavailable.png'
	const secondImgSrc = products[0].productImages?.[0]?.filePath
	const secondValidSrc =
		secondImgSrc &&
		(secondImgSrc.startsWith('http://') || secondImgSrc.startsWith('https://'))
			? secondImgSrc
			: '/prod/product-image-unavailable.png'

	const orderDate = new Date(order.orderDate)

	const formattedDate = orderDate.toLocaleString('uk-UA', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	const orderPrice = order.orderItems.reduce((sum, orderItem) => {
		return sum + orderItem.price * orderItem.quantity
	}, 0)

	const deliveryPrice = orderPrice >= 1500 ? 0 : 80

	const totalPrice = orderPrice + deliveryPrice

	const orderStatus = convertOrderStatus(order.status)

	return (
		<div className='border border-transparent-text rounded-md p-4 space-y-4'>
			<div className='flex items-center gap-1'>
				<div className={`p-2 rounded-sm ${orderStatus.color}`}>
					{orderStatus.icon}
				</div>
				<p>{orderStatus.name} </p>
			</div>
			<h4>
				Замовлення <span className='font-semibold'>№{order.orderNumber}</span>
			</h4>
			<div className='flex'>
				{orderProducts.length > 1 ? (
					<div className='relative aspect-square w-14 md:w-24 lg:w-30'>
						<Image
							src={firstValidSrc}
							alt=''
							fill
							className='object-cover rounded-md z-2'
						/>
						<div className='max-w-24 -right-4 md:-right-5 lg:-right-7 '>
							<Image
								src={secondValidSrc}
								alt=''
								fill
								className='blur-[1px] md:blur-[2px] object-cover rounded-md translate-x-5 md:translate-x-8 lg:translate-x-12 z-1'
							/>
						</div>

						<div className='absolute flex z-3 -right-4.5 md:-right-5.5 lg:-right-7 items-center justify-end w-full h-full'>
							<h4 className='font-semibold'>+{orderProducts.length - 1}</h4>
						</div>
					</div>
				) : (
					<div className='relative aspect-square w-14 md:w-24 lg:w-30'>
						<Image
							src={firstValidSrc}
							alt=''
							fill
							className='object-cover rounded-md'
						/>
					</div>
				)}
				<div
					className={`flex w-full justify-between ${
						orderProducts.length > 1
							? 'translate-x-7 md:translate-x-10 lg:translate-x-14'
							: 'ml-2 md:ml-3 lg:ml-4'
					}`}
				>
					<div className='flex flex-col justify-end gap-2 md:gap-3 lg:gap-4'>
						<p className='price'>{totalPrice} грн</p>
						<p>{formattedDate}</p>
					</div>
					<div
						className={`flex flex-col justify-end ${
							orderProducts.length > 1 &&
							'-translate-x-7 md:-translate-x-10 lg:-translate-x-14'
						}`}
					>
						<OrderDetails
							order={order}
							orderProducts={orderProducts}
							orderItemIds={orderItemIds}
							orderDate={formattedDate}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
