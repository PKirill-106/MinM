'use client'
import { IPaginationControlsProps } from '@/types/Interfaces'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function PaginationControls({
	totalPages,
}: IPaginationControlsProps) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentPage = parseInt(searchParams.get('page') || '1', 10)

	const createPageLink = (page: number) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', page.toString())
		return `${pathname}?${params.toString()}`
	}

	const getPageRange = () => {
		const maxVisible = 5
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
		let end = start + maxVisible - 1

		if (end > totalPages) {
			end = totalPages
			start = Math.max(1, end - maxVisible + 1)
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i)
	}

	const pageRange = getPageRange()

	return (
		<div className='flex justify-center mt-10'>
			<div className='flex space-x-2 items-center'>
				{/* Prev button */}
				{currentPage > 1 ? (
					<Link
						href={createPageLink(currentPage - 1)}
						className='flex items-center hover:text-accent li-hover'
					>
						<ChevronLeft className='h-7 w-7 md:h-6 md:w-6' />
					</Link>
				) : (
					<div className='flex items-center text-transparent-text'>
						<ChevronLeft className='h-7 w-7 md:h-6 md:w-6' />
					</div>
				)}

				{/* Page numbers */}
				{pageRange.map(page => (
					<Link
						key={page}
						href={createPageLink(page)}
						className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition ${
							page === currentPage
								? 'bg-accent text-white'
								: 'hover:border-accent border-transparent-text'
						}`}
					>
						{page}
					</Link>
				))}

				{/* Next button */}
				{currentPage < totalPages ? (
					<Link
						href={createPageLink(currentPage + 1)}
						className='flex items-center hover:text-accent li-hover'
					>
						<ChevronRight className='h-7 w-7 md:h-6 md:w-6' />
					</Link>
				) : (
					<div className='flex items-center text-transparent-text'>
						<ChevronRight className='h-7 w-7 md:h-6 md:w-6' />
					</div>
				)}
			</div>
		</div>
	)
}
