import ProductGrid from '@/components/products/ProductGrid'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import { Metadata } from 'next'
import ProductFilters from '../../components/filters/ProductFilters'
import PaginationControls from '../../components/PaginationControls'

type PageProps = {
	params: Promise<{ slug?: string[] }>
	searchParams: Promise<{
		sort?: string
		sezon?: string
		akciya?: string
		novinki?: string
		page?: string
	}>
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const categories: ICategory[] = await getAllCategories()
	const { slug = [] } = await params
	const categorySlug = slug[1] ?? null
	const subcategorySlug = slug[2] ?? null

	const activeCategory = categories.find(
		cat => cat.slug === categorySlug && !cat.parentCategoryId
	)
	const activeSubcategory = categories.find(
		cat => cat.slug === subcategorySlug && cat.parentCategoryId
	)

	const title = activeSubcategory?.name
		? `${activeSubcategory.name} | M in M`
		: activeCategory?.name
		? `${activeCategory.name} | M in M`
		: 'Каталог товарів | M in M'

	const description = activeSubcategory?.description
		? activeSubcategory.description
		: activeCategory?.description
		? activeCategory.description
		: 'Широкий вибір товарів для манікюру та педикюру у інтернет-магазині M in M Nails'

	return {
		title,
		icons: {
			icon: '/favicon.svg',
		},
		description,
		openGraph: {
			title,
			description,
		},
	}
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const PRODUCTS_PER_PAGE = 12
	const page = parseInt((await searchParams).page || '1', 10)

	const { slug = [] } = await params
	const { sort = 'suggested', sezon, akciya, novinki } = await searchParams

	const categorySlug = slug[1] ?? null
	const subcategorySlug = slug[2] ?? null

	const activeCategory = categories.find(
		cat => cat.slug === categorySlug && !cat.parentCategoryId
	)
	const activeSubcategory = categories.find(
		cat => cat.slug === subcategorySlug && cat.parentCategoryId
	)

	let filteredProducts = products
	if (activeSubcategory) {
		filteredProducts = products.filter(
			p => p.categoryId === activeSubcategory.id
		)
	} else if (activeCategory) {
		const subcategoryIds = categories
			.filter(cat => cat.parentCategoryId === activeCategory.id)
			.map(cat => cat.id)
		filteredProducts = products.filter(
			p =>
				p.categoryId === activeCategory.id ||
				subcategoryIds.includes(p.categoryId)
		)
	}

	if (sezon === 'true') {
		filteredProducts = filteredProducts.filter(p => p.isSeasonal)
	}

	if (akciya === 'true') {
		filteredProducts = filteredProducts.filter(p => p.isDiscounted)
	}

	if (novinki) {
		filteredProducts = filteredProducts.filter(p => p.isNew)
	}

	const sortProducts = (products: IProduct[], sort: string): IProduct[] => {
		switch (sort) {
			case 'price-desc':
				return [...products].sort(
					(a, b) => b.productVariants[0].price - a.productVariants[0].price
				)
			case 'price-asc':
				return [...products].sort(
					(a, b) => a.productVariants[0].price - b.productVariants[0].price
				)
			case 'popular':
				return [...products].sort(
					(a, b) => b.productVariants[0].price - a.productVariants[0].price
				)
			default:
				return products // suggested
		}
	}
	filteredProducts = sortProducts(filteredProducts, sort)

	const startIndex = (page - 1) * PRODUCTS_PER_PAGE
	const endIndex = startIndex + PRODUCTS_PER_PAGE
	const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
	const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

	return (
		<div className='container'>
			<h2 className='mb-6'>
				{activeSubcategory?.name || activeCategory?.name || 'Каталог'}
			</h2>

			<ProductFilters
				categories={categories}
				activeCategory={categorySlug}
				activeSubcategory={subcategorySlug}
			/>

			<ProductGrid categories={categories} products={paginatedProducts} />

			<PaginationControls totalPages={totalPages} />
		</div>
	)
}
