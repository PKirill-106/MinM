import { Button } from '@/components/UI/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/UI/dialog'
import { Textarea } from '@/components/UI/textarea'
import Image from 'next/image'
import { IOrderDetails } from '../interfaces'
import DetailsInfoSection from './DetailsInfoSection'
import { IAddress, INovaPost } from '@/types/Interfaces'

export default function OrderDetails({
	order,
	orderProducts,
	orderItemIds,
	orderDate,
}: IOrderDetails) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='secondary' className='flex items-end justify-end'>
					Деталі
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Деталі замовлення</DialogTitle>
					<DialogDescription>
						Номер замовлення:{' '}
						<span className='font-semibold'>{order.orderNumber}</span>.
					</DialogDescription>
				</DialogHeader>
				<span className='text-sm lg:text-base'>
					Товари<span className='caption'>({orderProducts.length})</span>:
				</span>
				<div className='mx-2 border-l-1 border-transparent-text'>
					<div className='space-y-2'>
						{orderProducts.map(p => {
							const currentVariant = p.productVariants.find(pV =>
								orderItemIds.includes(pV.id)
							)

							const quantity = order.orderItems.find(
								item => item.itemId === currentVariant?.id
							)?.quantity

							const price = currentVariant!.price * quantity!
							const variantName = currentVariant!.name

							const imgSrc = p.productImages[0]?.filePath
							const imgValidSrc =
								imgSrc &&
								(imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
									? imgSrc
									: '/prod/product-image-unavailable.png'

							return (
								<div
									key={p.id}
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
										<span className='text-sm md:text-base'>{p.name}</span>
										<div className='flex items-center justify-between gap-3'>
											<div className='space-x-1'>
												<span className='text-sm md:text-base'>
													{variantName} мл
												</span>
												{' x '}{' '}
												<span className='text-sm md:text-base'>{quantity}</span>
											</div>
											<span className='text-sm md:text-base font-bold'>
												{price} грн
											</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div>
					<DetailsInfoSection
						title='Отримувач: '
						info={`${order.recipientFirstName} ${order.recipientLastName}`}
					/>
					<DetailsInfoSection
						title='email: '
						info={`${order.recipientEmail}`}
					/>
					<DetailsInfoSection
						title='Номер телефону: '
						info={`+${order.recipientPhone.slice(
							0,
							2
						)} ${order.recipientPhone.slice(2, 5)} ${order.recipientPhone.slice(
							5,
							8
						)} ${order.recipientPhone.slice(
							8,
							10
						)} ${order.recipientPhone.slice(10, 12)}`}
					/>
					<DetailsInfoSection
						title='Оплата: '
						info={`${
							order.paymentMethod === 'paymentSystem'
								? 'Платіжна система'
								: 'На рахунок'
						}`}
					/>
					<DetailsInfoSection
						title='Доставка: '
						info={`${
							order.deliveryMethod === 'courier' ? 'За адресою' : 'Нова пошта'
						}`}
					/>
					<span className='text-sm lg:text-base'>Адреса:</span>
					<div className='mx-4 mt-1 mb-2'>
						{order.deliveryMethod === 'courier' ? (
							<>
								<DetailsInfoSection
									title='Область:'
									info={order.address?.region || '-'}
								/>
								<DetailsInfoSection
									title='Місто:'
									info={order.address?.city || '-'}
								/>
								<DetailsInfoSection
									title='Вулиця:'
									info={(order.address as IAddress)?.street || '-'}
								/>
								<DetailsInfoSection
									title='№ буд. / кв:'
									info={(order.address as IAddress)?.homeNumber || '-'}
								/>
							</>
						) : (
							<>
								<DetailsInfoSection
									title='Область:'
									info={order.address?.region || '-'}
								/>
								<DetailsInfoSection
									title='Місто:'
									info={order.address?.city || '-'}
								/>
								<DetailsInfoSection
									title='Відділення:'
									info={(order.address as INovaPost)?.postDepartment || '-'}
								/>
							</>
						)}
					</div>
					<div className='mb-4'>
						<span className='text-sm lg:text-base'>Коментар: </span>
						<Textarea readOnly value={order.additionalInfo} />
					</div>
					<span className='text-sm lg:text-base text-gray-500'>
						{orderDate}
					</span>
				</div>
			</DialogContent>
		</Dialog>
	)
}
