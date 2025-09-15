import { IReviewItem } from './interfaces'
import Rating from './product-top/product-top-right/Rating'

export default function ReviewItem({ review }: IReviewItem) {
	return (
		<div className='bg-white p-4 rounded-md'>
			<div className='flex items-center gap-4'>
				<h4 className='font-semibold'>UserName</h4>
				<Rating rating={review.rating} />
			</div>
			{review.comment && (
				<div className='py-4'>
					<h4 className='font-sans! font-light'>{review.comment}</h4>
				</div>
			)}
		</div>
	)
}
