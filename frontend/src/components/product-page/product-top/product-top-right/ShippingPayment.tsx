import Image from 'next/image'
import { IShippingPayment } from '../../interfaces'

export default function ShippingPayment({
	variant,
	className,
}: IShippingPayment) {
	const variantName: Record<'shipment' | 'payment', string> = {
		shipment: 'Доставка',
		payment: 'Оплата',
	}
	const variantDescription: Record<'shipment' | 'payment', string[]> = {
		shipment: ['Нова Пошта', 'Кур’єром'],
		payment: ['Онлайн оплата через платіжну систему', 'Оплата на рахунок'],
	}
	const variantIcon: Record<'shipment' | 'payment', string> = {
		shipment: '/icons/shipping-icon.svg',
		payment: '/icons/payment-icon.svg',
	}

	return (
		<div className={`${className} bg-white rounded-lg p-3 md:p-4 min-w-50`}>
			<div className='flex items-center gap-2 md:gap-3'>
				<Image
					src={variantIcon[variant]}
					alt={variantName[variant]}
					width={24}
					height={24}
					className='link-size'
				/>
				<p className='underline'>{variantName[variant]}</p>
			</div>
			<ul className='space-y-1 mt-2 '>
				{variantDescription[variant].map((item, index) => (
					<li key={index}>
						<span className='text-accent font-semibold text-xl mr-1'>-</span>{' '}
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}
