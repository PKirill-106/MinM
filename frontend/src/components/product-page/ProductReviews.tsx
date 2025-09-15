'use client'
import { useState } from 'react'
import { IProductReviews } from './interfaces'
import ReviewItem from './ReviewItem'
import { ChevronRight } from 'lucide-react'

export default function ProductReviews({ reviews }: IProductReviews) {
	const [isOpen, setIsOpen] = useState<boolean>(false)



	return (
		<div id='reviews-section' className='flex flex-col gap-4'>
			<div
				onClick={() => setIsOpen(p => !p)}
				className='flex p-3 bg-white rounded-lg items-center justify-between cursor-pointer'
			>
				<h1>Відгуки</h1>
				<ChevronRight
					className={isOpen ? 'rotate-90 transition-all' : 'transition-all'}
				/>
			</div>
			{reviews.length === 0 ? (
				''
			) : (
				<div
					className={`space-y-6 overflow-hidden transition-all duration-300 ease-in-out ${
						isOpen
							? 'max-h-200 opacity-100 translate-y-0'
							: 'max-h-0 opacity-0 -translate-y-6'
					}`}
				>
					{reviews.map(review => (
						<ReviewItem key={review.id} review={review} />
					))}
				</div>
			)}
		</div>
	)
}
