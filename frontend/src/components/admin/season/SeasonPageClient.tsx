'use client'
import { Button } from '@/components/UI/button'
import { useSeasonManagement } from '@/hooks/useSeasonManagement'
import { ArrowRight, Pencil } from 'lucide-react'
import { ISeasonPageClient } from '../interface'
import SeasonModal from './SeasonModal'

export default function SeasonPageClient({
	seasons,
	products,
}: ISeasonPageClient) {
	const {
		isSeasonModalOpen,
		modalType,
		editingSeason,
		openCreateSeason,
		openEditSeason,
		handleSubmitSeason,
		setSeasonModalOpen,
	} = useSeasonManagement()

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col items-center max-w-md'>
				{seasons.length ? (
					<ul className='space-y-2 w-full'>
						{seasons.map(season => (
							<li key={season.id} className='w-full'>
								<div className='w-full flex items-center'>
									<div className='flex-1 flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
										{season.name}
										<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
									</div>

									<Button
										variant='outline'
										size='icon'
										className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
										onClick={() => openEditSeason(season)}
										title='Редагувати категорію'
									>
										<Pencil size={18} />
									</Button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<h3>Не створено жодного сезону</h3>
				)}
				<Button className='mt-4 w-full rounded-md' onClick={openCreateSeason}>
					+
				</Button>
			</div>

			<SeasonModal
				type={modalType}
				isOpen={isSeasonModalOpen}
				onClose={() => setSeasonModalOpen(false)}
				onSubmit={handleSubmitSeason}
				seasonData={editingSeason || undefined}
				allProducts={products}
			/>
		</div>
	)
}
