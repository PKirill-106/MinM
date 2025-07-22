'use client'

import ProductGrid from '@/components/products/ProductGrid'
import { useFavorites } from '@/providers/FavoritesProvider'
import { IProductGrid } from '@/types/Interfaces'

export default function FilteredFavoriteGrid({
	products,
	categories,
}: IProductGrid) {
	const { favorites } = useFavorites()

	const favoriteProducts = products.filter(product =>
		favorites.includes(product.id)
	)

	return (
		<ProductGrid
			products={favoriteProducts}
			categories={categories}
			type='favorites'
		/>
	)
}
