import { Star } from 'lucide-react'
import { IRatings } from '../../interfaces'

export default function Ratings({ reviews }: IRatings) {
	const max = 5
	const size = 20

	let avarageRating

	if (reviews) {
		const ratings = reviews.map(review => review.rating)
		avarageRating = ratings.reduce((a, b) => a + b) / ratings.length
	} else {
		avarageRating = 0
	}
	return (
		<div className='flex items-center gap-1'>
			{[...Array(max)].map((_, i) => {
				const isFull = i < Math.floor(avarageRating)
				const isHalf = !isFull && avarageRating > i && avarageRating < i + 1

				if (isFull) {
					return (
						<Star
							key={i}
							size={size}
							strokeWidth={1}
							className='text-stars'
							fill='currentColor'
						/>
					)
				} else if (isHalf) {
					return (
						<div key={i} className='relative w-5 h-5'>
							{/* Background gray star */}
							<Star
								size={size}
								strokeWidth={1}
								className='text-transparent-text absolute top-0 left-0'
								fill='none'
							/>
							{/* Foreground orange half star */}
							<Star
								size={size}
								strokeWidth={1}
								className='text-stars absolute top-0 left-0'
								fill='currentColor'
								style={{ clipPath: 'inset(0 50% 0 0)' }}
							/>
						</div>
					)
				}

				// Empty star
				return (
					<Star
						key={i}
						size={size}
						strokeWidth={1}
						className='text-transparent-text'
						fill='none'
					/>
				)
			})}
			
		</div>
	)
}
