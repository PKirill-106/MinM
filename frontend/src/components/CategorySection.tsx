import { ICategorySection } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CategorySection({
	categories,
	linkLabel,
	linkHref,
}: ICategorySection) {
	const displayedCategories = categories.slice(0, 7)

	return (
		<div>
			<h2 className='mx-auto text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6 md:mb-8 lg:mb-12 xl:mb-15'>
				Манікюрні матеріали, <br /> яким{' '}
				<span className='text-accent font-bold'>довіряють професіонали!</span>
			</h2>

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
				{displayedCategories.map(category => (
					<div
						className='hover:scale-105 transition-all duration-300'
						key={category.id}
					>
						<Link
							href={`/catalog/${category.slug}`}
							className='relative flex flex-col max-w-90 overflow-hidden rounded-lg shadow-sm mb-2 md:mb-3 lg:mb-4'
						>
							<div className='relative w-full h-100'>
								<Image
									src={
										category.imageURL ||
										'/category/category-image-unavailable.png'
									}
									alt={category.name}
									fill
									priority
									className='object-cover'
								/>
							</div>
						</Link>
						<Link
							href={`/catalog/${category.slug}`}
							key={category.id}
							className='li-hover inline-block'
						>
							<h3 className='font-medium'>{category.name}</h3>
						</Link>
					</div>
				))}

				<Link
					href={linkHref}
					className='bg-foreground text-white rounded-lg flex items-center justify-center text-center font-semibold hover:bg-accent hover:scale-105 hover:shadow-lg transition-all duration-300 px-4 py-6 text-sm'
				>
					<h3 className='ml-2 flex flex-col items-center'>
						{linkLabel} <div className='my-4' /> <ChevronRight />
					</h3>
				</Link>
			</div>
		</div>
	)
}
