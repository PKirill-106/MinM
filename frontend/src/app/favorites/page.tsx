import FilteredFavoriteGrid from '@/components/FilteredFavoriteGrid'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Обране | M in M Nails',
	icons: {
		icon: '/favicon.svg',
	},
	description:
		'Перегляньте ваші обрані товари в інтернет-магазині M in M Nails',
	openGraph: {
		title: 'Обране | M in M Nails',
		description: 'Ваш список обраних товарів для манікюру',
		images: [
			{
				url: '/M-in-M-logo_Thubnail.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
}

export default async function FavoritePage() {
	const products = await getAllProducts()
	const categories = await getAllCategories()

	return (
		<div className='container'>
			<h2 className='mb-2 md:mb-3 lg:mb-4'>Обране</h2>
			<FilteredFavoriteGrid products={products} categories={categories} />
		</div>
	)
}
