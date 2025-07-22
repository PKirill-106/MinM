import Description from '@/components/product-page/description/Description'
import ProductTop from '@/components/product-page/product-top/ProductTop'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getProductBySlug } from '@/lib/services/productServices'
import { deltaToText } from '@/lib/utils/deltaToText'
import { ICategory, IProduct } from '@/types/Interfaces'
import { Metadata } from 'next'

type PropsType = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({
	params,
}: PropsType): Promise<Metadata> {
	const { slug } = await params 
	const product: IProduct = await getProductBySlug(slug)

	if (!product) {
		return {
			title: 'Продукт не знайдено | M in M',
			description: 'Сторінка не знайдена.',
		}
	}

	const title = `${product.name} — Купити від M in M`

	const descriptionText = deltaToText(product.description)

	const description =
		descriptionText.slice(0, 160) + (descriptionText.length > 160 ? '...' : '')

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


export default async function ProductPage({ params }: PropsType) {
	const { slug } = await params

	const product: IProduct = await getProductBySlug(slug)
	const categories: ICategory[] = await getAllCategories()

	const subcategory = categories.find(cat => cat.id === product?.categoryId)
	const category = categories.find(
		cat =>
			cat.id === subcategory?.parentCategoryId || cat.id === product?.categoryId
	)

	if (!product || !category) {
		return <div className='container'>Product not found</div>
	}

	return (
		<div className='container'>
			<ProductTop product={product} category={category} />
			<Description description={product.description} />
		</div>
	)
}
