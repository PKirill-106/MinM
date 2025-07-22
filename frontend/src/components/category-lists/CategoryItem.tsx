import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ICategoryItem } from '@/types/Interfaces'

export function CategoryItem({
	category,
	subcategories,
	isFooter,
	isHovered,
	isOpen,
	onMouseEnter,
	onMouseLeave,
	onToggle,
	isMobile,
}: ICategoryItem) {
	const hasSubcategories = subcategories.length > 0
	const footer: string = 'li-hover py-2'
	const nav: string =
		'md:px-4 md:py-2 hover:text-accent cursor-pointer transition-colors'

	const subClass = isMobile
		? `overflow-hidden transition-all duration-300 ease-out ${
				isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
		  } flex`
		: `absolute left-full top-0 ml-4 bg-white shadow-lg rounded-md p-2 transition-all duration-300 ease-out
										${
											isHovered
												? 'visible opacity-100 translate-x-0 scale-100'
												: 'invisible opacity-0 -translate-x-2 scale-80'
										}
										before:absolute before:-left-4 before:top-0 before:w-4 before:h-full before:bg-transparent`

	return (
		<li
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className='relative'
		>
			<div className='flex md:block justify-between'>
				<Link
					href={`/catalog/${category.slug}`}
					className={`flex items-center justify-between ${
						isMobile
							? ' flex-grow py-2 px-3 li-hover'
							: `${isFooter ? footer : nav}`
					}`}
				>
					<span>{category.name}</span>
					{!isMobile && !isFooter && !!hasSubcategories && (
						<ChevronRight
							className={`transition-all duration-300 ease-out ${
								isHovered ? 'rotate-90' : ''
							}`}
						/>
					)}
				</Link>
				{!!isMobile && !!hasSubcategories && (
					<button
						onClick={onToggle}
						className='flex items-center justify-center w-10'
					>
						<ChevronRight
							className={`h-5 w-5 transition-transform duration-300 ${
								isOpen ? 'rotate-90' : ''
							}`}
						/>
					</button>
				)}
			</div>

			{/* Subcategories */}
			{!isFooter && hasSubcategories && (
				<div className={subClass}>
					{isMobile && <div className='w-px bg-foreground/20 ml-3 py-5'></div>}
					<ul>
						{subcategories.map(sub => (
							<li key={sub.id}>
								<Link
									href={`/catalog/${category.slug}/${sub.slug}`}
									className='block px-2 pr-3 py-2 hover-active-text transition-colors whitespace-nowrap'
								>
									{sub.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</li>
	)
}
