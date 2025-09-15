import React from 'react'
import { IRating } from '../../interfaces'
import { Star } from 'lucide-react'

export default function Rating({ rating }: IRating) {
	const max = 5
	const size = 24

	return (
		<div className='flex gap-1'>
			{[...Array(max)].map((_, i) => {
				if (i < rating) {
					return (
						<Star
							key={i}
							size={size}
							strokeWidth={1}
							className='text-stars'
							fill='currentColor'
						/>
					)
				} else {
          return (
						<Star
							key={i}
							size={size}
							strokeWidth={1}
							className='text-transparent-text'
							fill='none'
						/>
					)
        }
			})}
		</div>
	)
}
