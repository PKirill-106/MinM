'use client'

import { Button } from '@/components/UI/button'
import { ArrowRight, Pencil } from 'lucide-react'
import Link from 'next/link'
import { ISubcategory } from '../../interface'
import AlertOnDelete from '../../AlertOnDelete'

export default function Subcategory({
	parentCategoryName,
	subcategories,
	editCat,
	createCat,
	deleteCat,
	setDeleteOption,
	accessToken,
}: ISubcategory) {
	return (
		<div>
			<h1 className='mb-6'>Підкатегорії {parentCategoryName}</h1>
			<ul className='space-y-2 w-full max-w-md'>
				{subcategories.map(cat => (
					<li key={cat.id} className='w-full flex items-center'>
						<Link href={`/admin/products/${cat.slug}`} className='flex-1'>
							<div className='flex justify-between p-4 w-full border-1 border-transparent-text rounded-md hover:text-accent group'>
								{cat.name}
								<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
							</div>
						</Link>
						<Button
							variant='outline'
							size='icon'
							className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
							onClick={() => editCat(cat)}
							title='Редагувати категорію'
						>
							<Pencil size={18} />
						</Button>
						<AlertOnDelete
							onClick={() => deleteCat(cat.id, accessToken)}
							name={cat.name}
							setDeleteOption={setDeleteOption}
						/>
					</li>
				))}
			</ul>

			<Button className='mt-4 w-full max-w-md rounded-md' onClick={createCat}>
				+
			</Button>
		</div>
	)
}
