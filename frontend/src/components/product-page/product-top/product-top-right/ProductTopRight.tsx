'use client'
import FavoriteButton from '@/components/FavoriteButton'
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IProductTopRight } from '../../interfaces'
import ProductCart from './ProductCart'
import ProductVariants from './ProductVariants'
import Ratings from './Ratings'
import ShippingPayment from './ShippingPayment'
import Link from 'next/link'

export default function ProductTopRight({
	product,
	category,
	reviews,
}: IProductTopRight) {
	const [variant, setVariant] = useState(0)
	const currentVariant = product.productVariants[variant]

	useEffect(() => {
		if (!currentVariant?.isStock) {
			const nearestAvailable = product.productVariants.find(v => v.isStock)
			if (nearestAvailable) {
				setVariant(product.productVariants.indexOf(nearestAvailable))
			}
		}
	}, [currentVariant, product.productVariants])

	const hasAnyInStock = product.productVariants.some(v => v.isStock)

	const scrollToReviews = (e: React.MouseEvent) => {
		e.preventDefault()
		const element = document.getElementById('reviews-section')
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	return (
		<div className='col-span-2 flex flex-col h-full'>
			<div className='flex-grow'>
				<h2 className='text-2xl md:text-xl/6 lg:text-2xl/6 xl:text-4xl mb-2'>
					{product?.name}
				</h2>
				<div className='flex items-center text-transparent-text gap-3 md:gap-5 mb-2 md:mb-3 lg:mb-4 flex-wrap'>
					<span>{category.name}</span>
					{currentVariant.isStock ? (
						<span className='flex items-center gap-1'>
							<Check size={20} className='!text-green-600' />В наявності
						</span>
					) : (
						<span className='flex items-center gap-1'>
							<X size={20} className='!text-red-600' />
							Немає в наявності
						</span>
					)}
				</div>
				<div className='flex gap-3 md:gap-5 items-center flex-wrap text-sm md:text-xs xl:text-md 2xl:text-lg'>
					{!!product.isDiscounted && (
						<div className='bg-accent text-white-text py-1 px-3 md:px-4 rounded-full'>
							<span>Акція</span>
						</div>
					)}
					{!!product.isSeasonal && (
						<div className='bg-accent text-white-text py-1 px-3 md:px-4 rounded-full'>
							<span>Сезон</span>
						</div>
					)}
					<span className='text-transparent-text'>art. {product.sku}</span>
					<div className='flex items-center gap-2'>
						<Ratings reviews={reviews} />
						{reviews ? (
							<Link
								href='#reviews-section'
								onClick={scrollToReviews}
								className='li-hover underline'
							>
								{reviews?.length || 0} відгуків
							</Link>
						) : (
							<span className='underline'>0 відгуків</span>
						)}
					</div>
				</div>
				<div className='flex items-center gap-3 lg:gap-5 flex-wrap mt-4'>
					<div className='flex items-center justify-between w-full md:w-auto'>
						{product.isDiscounted ? (
							<div className='flex items-center'>
								<h1 className='text-accent lg:min-w-37 xl:min-w-50'>
									{currentVariant.discountPrice} грн
								</h1>
								<h3 className='line-through text-transparent-text text-center'>
									{currentVariant.price} грн
								</h3>
							</div>
						) : (
							<h1>{currentVariant.price} грн</h1>
						)}
						<FavoriteButton
							productId={product.id}
							heartClassName='h-6 w-6 link-hover cursor-pointer'
							buttonClassName='flex md:hidden'
						/>
					</div>

					<ProductCart
						amount={currentVariant.unitsInStock}
						productId={product.id}
						variantId={currentVariant.id}
						hasAnyInStock={hasAnyInStock}
					/>
				</div>

				<div className='mt-4 lg:mt-8'>
					<p className='!text-xl mb-3 md:mb-4'>Варіант товару</p>
					<div className='flex flex-col xl:flex-row  justify-between gap-5'>
						<div className='w-full xl:w-auto shrink-0'>
							<ProductVariants
								product={product}
								current={currentVariant}
								onSelect={setVariant}
							/>
						</div>

						<div className='flex flex-col md:flex-row justify-between gap-5 w-full grow'>
							<ShippingPayment variant='shipment' className='basis-1/3' />
							<ShippingPayment variant='payment' className='basis-2/3' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
