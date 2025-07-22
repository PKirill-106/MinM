'use client'
import { ICategoryList } from '@/types/Interfaces'
import { useState } from 'react'
import { CategoryItem } from './CategoryItem'

export default function DesktopCategoryList({
	categories,
	className,
	isFooter,
}: ICategoryList) {
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

	if (!categories || categories.length === 0) return null

	const getSubcategories = (parentId: string) =>
		categories.filter(cat => cat.parentCategoryId === parentId)

	return (
		<ul className={`flex flex-col ${className}`}>
			{categories
				.filter(category => category.parentCategoryId == null)
				.map(category => (
					<CategoryItem
						key={category.id}
						category={category}
						subcategories={getSubcategories(category.id)}
						isFooter={isFooter}
						isHovered={hoveredCategory === category.id}
						onMouseEnter={() => setHoveredCategory(category.id)}
						onMouseLeave={() => setHoveredCategory(null)}
					/>
				))}
		</ul>
	)
}
