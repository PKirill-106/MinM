import { getAllReviews } from '@/lib/services/reviewServices'
import { IReview } from '@/types/Interfaces'
import { IProductTopProps } from '../interfaces'
import ProductTopLeft from './product-top-left/ProductTopLeft'
import ProductTopRight from './product-top-right/ProductTopRight'

export default async function ProductTop({
	product,
	category,
}: IProductTopProps) {
	const reviews: IReview[] = await getAllReviews(product.id)

	return (
		<div className='flex flex-col md:grid md:grid-cols-3 gap-6 mb-8'>
			<ProductTopLeft product={product} />
			<ProductTopRight
				product={product}
				category={category}
				reviews={reviews}
			/>
		</div>
	)
}
