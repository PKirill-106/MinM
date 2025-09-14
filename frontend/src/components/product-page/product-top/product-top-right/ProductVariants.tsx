import { IProductVariants } from '../../interfaces'

export default function ProductVariants({
	product,
	current,
	onSelect,
}: IProductVariants) {
	return (
		<div className='grid grid-cols-2 sm:flex sm:justify-between md:grid md:grid-cols-2 md:grid-rows-2 gap-2 sm:gap-2 h-full'>
			{product.productVariants.map((variant, index) => {
				const isSelected = current.id === variant.id
				const outOfStock = !variant.isStock

				return (
					<button
						disabled={isSelected || outOfStock}
						key={variant.id}
						onClick={() => onSelect(index)}
						className={`h-full rounded-lg p-2 md:p-3 lg:p-3 text-lg min-w-20 w-auto sm:w-full md:w-auto ${
							isSelected
								? 'bg-button text-button-text'
								: 'border border-transparent-text'
						}	${
							outOfStock ? 'line-through opacity-50' : ''
						} ${!isSelected && !outOfStock && 'li-hover'}`}
					>
						{variant.name} ml
					</button>
				)
			})}
		</div>
	)
}
