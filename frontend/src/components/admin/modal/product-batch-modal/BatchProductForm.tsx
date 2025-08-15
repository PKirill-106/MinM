'use client'
import { Button } from '@/components/UI/button'
import dynamic from 'next/dynamic'
import { IBatchProductForm } from '../../interface'
import CategorySelector from '../product-modal/CategorySelector'
import ColorSelector from '../product-modal/ColorSelector'
import FormInput from '../product-modal/FormInput'
import Variant from '../product-modal/Variant'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
})

export default function BatchProductForm(props: IBatchProductForm) {
	const {
		nameTemplate,
		setNameTemplate,
		skuTemplate,
		setSkuTemplate,
		descriptionDelta,
		setDescriptionDelta,
		variantValues,
		setVariantValues,
		parentCatId,
		setParentCatId,
		categoryId,
		setCategoryId,
		categories,
		variants,
		setVariants,
		modules,
		colors,
		selectedColors,
		setSelectedColors,
	} = props

	const subcategories = categories.filter(
		c => c.parentCategoryId === parentCatId
	)

	const addVariant = () =>
		setVariants([...variants, { name: 0, price: 0, unitsInStock: 0 }])

	const copyVariantPlaceholder = useCallback(() => {
		navigator.clipboard.writeText('[VARIANT]').then(() => {
			toast.success('Скопійовано: [VARIANT]')
		})
	}, [])

	const copyButton = (
		<Button
			variant='link'
			className='text-accent-text p-0'
			onClick={copyVariantPlaceholder}
		>
			[VARIANT]
		</Button>
	)

	return (
		<div className='flex flex-col gap-4'>
			<FormInput
				title={
					<div className='flex items-center gap-2'>
						Шаблон назви продукту (використовуйте
						{copyButton}
						як плейсхолдер)
					</div>
				}
				value={nameTemplate}
				onChange={e => setNameTemplate(e.target.value)}
				placeholder='Наприклад: Топ для гель-лаку Top Secret №[VARIANT] 13ml'
				isRequired={true}
			/>

			<div>
				<div className='flex items-center gap-2'>
					Шаблон опису продукту (використовуйте
					{copyButton}
					як плейсхолдер)
				</div>
				<ReactQuill
					theme='snow'
					value={descriptionDelta}
					onChange={setDescriptionDelta}
					modules={modules}
				/>
			</div>

			<FormInput
				title={
					<div className='flex items-center gap-2'>
						Шаблон артикулу (використовуйте
						{copyButton}
						як плейсхолдер)
					</div>
				}
				value={skuTemplate}
				onChange={e => setSkuTemplate(e.target.value)}
				placeholder='Наприклад: TS-[VARIANT]-13ml'
				isRequired={true}
			/>

			<FormInput
				title='Значення для [VARIANT] (розділені комами)'
				value={variantValues}
				onChange={e => setVariantValues(e.target.value)}
				placeholder='Наприклад: 1,2,3,4,5'
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
