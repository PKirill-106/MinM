'use client'
import { Button } from '@/components/UI/button'
import dynamic from 'next/dynamic'
import { IProductForm } from '../../interface'
import CategorySelector from './CategorySelector'
import ColorSelector from './ColorSelector'
import FormInput from './FormInput'
import Variant from './Variant'

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
})

export default function ProductForm({
	name,
	setName,
	sku,
	setSku,
	descriptionDelta,
	setDescriptionDelta,
	parentCatId,
	setParentCatId,
	categoryId,
	setCategoryId,
	categories,
	subcategories,
	variants,
	setVariants,
	modules,
	colors,
	selectedColors,
	setSelectedColors,
}: IProductForm) {
	const addVariant = () =>
		setVariants([...variants, { name: '', price: 0, unitsInStock: 0 }])

	return (
		<div className='flex flex-col gap-4'>
			<FormInput
				title='Назва продукту'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Назва продукту'
				isRequired={true}
			/>

			<div>
				<span className='mb-2'>Опис продукту</span>
				<ReactQuill
					theme='snow'
					value={descriptionDelta}
					onChange={setDescriptionDelta}
					modules={modules}
				/>
			</div>

			<FormInput
				title='Артикул'
				value={sku}
				onChange={e => setSku(e.target.value)}
				placeholder='SKU'
				isRequired={true}
			/>

			<CategorySelector
				categories={categories}
				subcategories={subcategories}
				parentCatId={parentCatId}
				categoryId={categoryId}
				setParentCatId={setParentCatId}
				setCategoryId={setCategoryId}
			/>

			<div className='mt-4'>
				<div className='flex justify-between items-center'>
					<label>Варіанти:</label>
					<Button
						variant='outline'
						size='sm'
						type='button'
						onClick={addVariant}
					>
						+ Варіант
					</Button>
				</div>
				{variants.map((v, idx) => (
					<Variant
						key={idx}
						v={v}
						idx={idx}
						setVariants={setVariants}
						variants={variants}
					/>
				))}
			</div>

			<ColorSelector
				colors={colors}
				selectedColors={selectedColors}
				setSelectedColors={setSelectedColors}
			/>
		</div>
	)
}
