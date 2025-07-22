import BannerSlider from '@/components/BannerSlider'
import CategorySection from '@/components/CategorySection'
import ProductSection from '@/components/products/ProductSection'
import { getAllCategories } from '@/lib/services/categoryServices'
import { getAllProducts } from '@/lib/services/productServices'
import { ICategory, IProduct } from '@/types/Interfaces'

export default async function Home() {
	const products: IProduct[] = await getAllProducts()
	const categories: ICategory[] = await getAllCategories()

	const filteredCategories = categories.filter(c => c.parentCategoryId === null)

	const seasonProducts = products.filter(p => p.isSeasonal === true)

	return (
			<div className='container md:-mt-10 flex flex-col gap-8 md:gap-10 lg:gap-16 xl:gap-20'>
				<BannerSlider />
				<CategorySection
					categories={filteredCategories}
					linkLabel='Всі матеріали'
					linkHref='/catalog'
				/>
				<ProductSection
					title='Топові товари для майстрів манікюру'
					highlight='Топові товари'
					products={products}
					categories={categories}
					linkLabel='Топові матеріали'
					linkHref='/catalog?sort=popular'
				/>
				<ProductSection
					title='Новинки магазину'
					highlight='Новинки'
					products={products}
					categories={categories}
					linkLabel='Всі новинки'
					linkHref='/catalog?novinki=true'
				/>
				{!!seasonProducts.length && (
					<ProductSection
						title='Сезонні хіти для ідеального манікюру'
						highlight='Сезонні хіти'
						products={seasonProducts}
						categories={categories}
						linkLabel='Хіти сезону'
						linkHref='/catalog?sezon=true'
					/>
				)}
			</div>
	)
}
