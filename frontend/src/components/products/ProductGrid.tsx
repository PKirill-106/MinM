'use client'
import { IProductGrid } from '@/types/Interfaces'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({
	products,
	categories,
	type,
}: IProductGrid) {
	if (products.length === 0) {
		if (type) {
			return (
				<h3 className='flex justify-center my-30'>
					Відсутні товари в обраному
				</h3>
			)
		}
		return (
			<h3 className='flex justify-center my-30'>
				Відсутні продукти у вибраній категорії
			</h3>
		)
	}

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					categories={categories}
				/>
			))}
		</div>
	)
}
