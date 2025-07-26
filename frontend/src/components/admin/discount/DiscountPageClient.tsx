'use client'
import { Button } from '@/components/UI/button'
import { useDiscountManagement } from '@/hooks/useDiscountManagement'
import { ArrowRight, Pencil } from 'lucide-react'
import { IDiscountPageClient } from '../interface'
import DiscountModal from './DiscountModal'

export default function DiscountPageClient({
	discounts,
	products,
}: IDiscountPageClient) {
	const {
		isDiscountModalOpen,
		modalType,
		editingDiscount,
		openCreateDiscount,
		openEditDiscount,
		handleSubmitDiscount,
		setDiscountModalOpen,
	} = useDiscountManagement()

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col items-center max-w-md'>
				{discounts.length ? (
					<ul className='space-y-2 w-full'>
						{discounts.map(discount => (
							<li key={discount.id} className='w-full'>
								<div className='w-full flex items-center'>
									<div className='flex-1 flex justify-between p-4 w-full max-w-md border-1 border-transparent-text rounded-md hover:text-accent group'>
										{discount.name}
										<ArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
									</div>

									<Button
										variant='outline'
										size='icon'
										className='text-accent hover:bg-muted ml-4 p-2 rounded-sm'
										onClick={() => openEditDiscount(discount)}
										title='Редагувати категорію'
									>
										<Pencil size={18} />
									</Button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<h3>Не створено жодної знижки</h3>
				)}
				<Button className='mt-4 w-full rounded-md' onClick={openCreateDiscount}>
					+
				</Button>
			</div>

			<DiscountModal
				type={modalType}
				isOpen={isDiscountModalOpen}
				onClose={() => setDiscountModalOpen(false)}
				onSubmit={handleSubmitDiscount}
				discountData={editingDiscount || undefined}
				allProducts={products}
			/>
		</div>
	)
}
