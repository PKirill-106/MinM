'use client'
import { Button } from '@/components/UI/button'
import Image from 'next/image'
import { IAdminProduct } from '../../interface'
import AlertOnDelete from '../../AlertOnDelete'

export default function Product({
	product,
	onEdit,
	onDelete,
	accessToken,
}: IAdminProduct) {
	const imgSrc = product.productImages?.[0]?.filePath
	const validSrc =
		imgSrc && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))
			? imgSrc
			: '/prod/product-image-unavailable.png'

	return (
		<li key={product.id}>
			<div className='flex items-center'>
				<div className='flex p-4 w-full max-w-md border-1 border-transparent-text rounded-md'>
					<div className='relative aspect-square w-20 h-20 mr-4'>
						<Image
							src={validSrc}
							alt={product.name}
							fill
							className='object-cover rounded-sm'
						/>
					</div>
					<div className='w-full flex flex-col justify-between'>
						<span>{product.name}</span>
						<div className='flex items-center justify-between gap-2'>
							<span className='text-transparent-text'>{product.sku}</span>
							<Button variant='link' onClick={() => onEdit(product)}>
								Редагувати
							</Button>
						</div>
					</div>
				</div>

				<AlertOnDelete
					onClick={() => onDelete({ id: product.id }, accessToken)}
					name={product.name}
				/>
			</div>
		</li>
	)
}
