'use client'

import { Button } from '../UI/button'
import { IProductPagination } from './interface'

export default function ProductPagination({
	currentPage,
	totalPages,
	setCurrentPage,
}: IProductPagination) {
	if (totalPages <= 1) return null

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1)
	}

	return (
		<div className='flex justify-center items-center gap-4 mt-8'>
			<Button
				variant='outline'
				onClick={handlePrev}
				disabled={currentPage === 1}
			>
				Назад
			</Button>

			<span className='text-sm'>
				Сторінка {currentPage} з {totalPages}
			</span>

			<Button
				variant='outline'
				onClick={handleNext}
				disabled={currentPage === totalPages}
			>
				Далі
			</Button>
		</div>
	)
}
