import React from 'react'
import { IRating } from '../../interfaces'
import { Star } from 'lucide-react'

export default function GetRating({ rating }: IRating) {
	const max = 5
	const size = 20

	return (
		<div className='flex items-center gap-1'>
			{[...Array(max)].map((_, i) => {
				const isFull = i < Math.floor(rating)
				const isHalf = !isFull && rating > i && rating < i + 1

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
			<span className='underline'>X reviews</span>
		</div>
	)
}
