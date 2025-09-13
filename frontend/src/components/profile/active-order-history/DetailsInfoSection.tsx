import React from 'react'
import { IDetailsInfoSection } from '../interfaces'
import DetailsInfo from './DetailInfo'
import { IAddress, INovaPost } from '@/types/Interfaces'
import { Textarea } from '@/components/UI/textarea'

export default function DetailsInfoSection({
	order,
	orderDate,
}: IDetailsInfoSection) {
	return (
		<div>
			<DetailsInfo
				title='Отримувач: '
				info={`${order.recipientFirstName} ${order.recipientLastName}`}
			/>
			<DetailsInfo title='email: ' info={`${order.recipientEmail}`} />
			<DetailsInfo
				title='Номер телефону: '
				info={`+${order.recipientPhone.slice(
					0,
					2
				)} ${order.recipientPhone.slice(2, 5)} ${order.recipientPhone.slice(
					5,
					8
				)} ${order.recipientPhone.slice(8, 10)} ${order.recipientPhone.slice(
					10,
					12
				)}`}
			/>
			<DetailsInfo
				title='Оплата: '
				info={`${
					order.paymentMethod === 'paymentSystem'
						? 'Платіжна система'
						: 'На рахунок'
				}`}
			/>
			<DetailsInfo
				title='Доставка: '
				info={`${
					order.deliveryMethod === 'courier' ? 'За адресою' : 'Нова пошта'
				}`}
			/>
			<span className='text-sm lg:text-base'>Адреса:</span>
			<div className='mx-4 mt-1 mb-2'>
				{order.deliveryMethod === 'courier' ? (
					<>
						<DetailsInfo title='Область:' info={order.address?.region || '-'} />
						<DetailsInfo title='Місто:' info={order.address?.city || '-'} />
						<DetailsInfo
							title='Вулиця:'
							info={(order.address as IAddress)?.street || '-'}
						/>
						<DetailsInfo
							title='№ буд. / кв:'
							info={(order.address as IAddress)?.homeNumber || '-'}
						/>
					</>
				) : (
					<>
						<DetailsInfo title='Область:' info={order.address?.region || '-'} />
						<DetailsInfo title='Місто:' info={order.address?.city || '-'} />
						<DetailsInfo
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
			<span className='text-sm lg:text-base text-gray-500'>{orderDate}</span>
		</div>
	)
}
