import React from 'react'
import FilterCheckboxGroup from './FilterCheckboxGroup'
import { IProductColor, IProductFilters } from '@/types/Interfaces'
import FilterSelectGroup from './FilterSelectGroup'
import { getAllColors } from '@/lib/services/productServices'

export default async function ProductFilters({
	categories,
	activeCategory,
	activeSubcategory,
}: IProductFilters) {

	const colors: IProductColor[] = await getAllColors()

	return (
		<div className='mb-6'>
			<FilterCheckboxGroup />
			<FilterSelectGroup
				categories={categories}
				activeCategory={activeCategory}
				activeSubcategory={activeSubcategory}
				colors={colors}
			/>
		</div>
	)
}
