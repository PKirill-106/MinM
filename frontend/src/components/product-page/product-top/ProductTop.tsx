import { IProductTopProps } from '../interfaces'
import ProductTopLeft from './product-top-left/ProductTopLeft'
import ProductTopRight from './product-top-right/ProductTopRight'

export default function ProductTop({ product, category }: IProductTopProps) {
	return (
		<div className='flex flex-col md:grid md:grid-cols-3 gap-6 mb-8'>
			<ProductTopLeft product={product} />
			<ProductTopRight product={product} category={category} />
		</div>
	)
}
