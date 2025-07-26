'use client'
import { useCategoryManagement } from '@/hooks/useCategoryManagement'
import { ICategory } from '@/types/Interfaces'
import { ArrowRight, Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../UI/button'
import AlertOnDelete from './AlertOnDelete'
import CategoryModal from './modal/category-modal/CategoryModal'

interface Props {
	categories: ICategory[]
}

export default function ClientProductsPage({ categories }: Props) {
	const {
		isCategoryModalOpen,
		modalType,
		editingCategory,
		openCreateCategory,
		openEditCategory,
		handleSubmitCategory,
		handleDeleteCategory,
		setCategoryModalOpen,
		setDeleteOption,
	} = useCategoryManagement()

	const { data: session } = useSession()
	const accessToken = (session as any)?.accessToken as string

	return (
		<div className='flex flex-col w-full'>
			<h1 className='mb-10'>Категорії</h1>
			<div className='flex flex-col items-center max-w-md'>
				{categories ? (
					<ul className='space-y-2 w-full'>
						{categories.map(cat => (
							<li key={cat.id} className='w-full'>
								<div className='w-full flex items-center'>
									<Link href={`/admin/products/${cat.slug}`} className='flex-1'>
										<div className='flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
											{cat.name}
											<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
										</div>
									</Link>
									<Button
										variant='outline'
										size='icon'
										className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
										onClick={() => openEditCategory(cat)}
										title='Редагувати категорію'
									>
										<Pencil size={18} />
									</Button>
									<AlertOnDelete
										onClick={() => handleDeleteCategory(cat.id)}
										name={cat.name}
										setDeleteOption={setDeleteOption}
									/>
								</div>
							</li>
						))}
					</ul>
				) : (
					<h3>Немає жодної категорії</h3>
				)}

				<Button className='mt-4 w-full rounded-md' onClick={openCreateCategory}>
					+
				</Button>
			</div>

			<CategoryModal
				type={modalType}
				isOpen={isCategoryModalOpen}
				onClose={() => setCategoryModalOpen(false)}
				onSubmit={handleSubmitCategory}
				accessToken={accessToken}
				categoryData={editingCategory || undefined}
				categories={categories}
			/>
		</div>
	)
}
