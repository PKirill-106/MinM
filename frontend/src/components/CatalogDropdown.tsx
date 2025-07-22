'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import CategoryList from './category-lists/CategoryList'
import { ICategory } from '@/types/Interfaces'

function CatalogDropdown({ categories }: { categories : ICategory[]}) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			className='relative inline-block'
		>
			<Link
				href='/catalog'
				className='p-2 pr-1 text-base md:p-3 md:pr-2 md:text-base lg:p-3 lg:pr-2 lg:text-lg xl:p-4 xl:pr-3 xl:text-xl flex gap-1 bg-button items-center text-button-text rounded-md hover:bg-accent hover:text-white-text transition-all duration-300 button-text cursor-pointer'
			>
				<span>Каталог продукції</span>
				<ChevronRight
					className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 transform transition-transform duration-300 ease-out ${
						isOpen ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</Link>

			<div
				className={`text-xs md:text-sm lg:text-base xl:text-lg absolute block left-0 mt-2 xl:w-50 bg-white shadow-lg rounded-md transition-all duration-300 ease-out transform before:absolute before:-top-2 before:left-0 before:w-full before:h-3 before:bg-transparent ${
					isOpen
						? 'opacity-100 scale-100 translate-x-0 translate-y-0 visible'
						: 'opacity-0 scale-80 -translate-x-2 -translate-y-6 invisible'
				}`}
			>
				<CategoryList
					categories={categories}
					className='py-2 text-xs md:text-sm lg:text-base xl:text-lg'
					isFooter={false}
				/>
			</div>
		</div>
	)
}

export default CatalogDropdown
