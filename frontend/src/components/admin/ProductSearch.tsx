'use client'
import { Input } from '../UI/input'
import { IProductSearch } from './interface'

export default function ProductSearch({
	setSearch,
	setCurrentPage,
	search,
}: IProductSearch) {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-8'>
			<Input
				placeholder='Пошук продукту...'
				value={search}
				onChange={e => {
					setSearch(e.target.value)
					setCurrentPage(1)
				}}
				className='w-full sm:w-96 border-transparent-text'
			/>
		</div>
	)
}
