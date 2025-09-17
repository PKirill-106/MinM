'use client'

import { useFavorites } from '@/providers/FavoritesProvider'
import { IProductGrid } from '@/types/Interfaces'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loader from './UI/Loader'

const ProductGrid = dynamic(() => import('@/components/products/ProductGrid'), {
	ssr: false,
	loading: () => <Loader />,
})

export default function FilteredFavoriteGrid({
	products,
	categories,
}: IProductGrid) {
	const { favorites } = useFavorites()

	const favoriteProducts = products.filter(product =>
		favorites.includes(product.id)
	)

	return (
		<Suspense fallback={<Loader />}>
			<ProductGrid
				products={favoriteProducts}
				categories={categories}
				type='favorites'
			/>
		</Suspense>
	)
}
