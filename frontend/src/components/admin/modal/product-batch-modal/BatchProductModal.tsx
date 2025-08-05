'use client'
import { Button } from '@/components/UI/button'
import Modal from '@/components/UI/Modal'
import {
	ICategory,
	ICreateProductVariant,
	IProductColor,
} from '@/types/Interfaces'
import { useEffect, useState } from 'react'
import ModalHeader from '../ModalHeader'
import BatchProductForm from './BatchProductForm'

type Delta = any

export interface IBatchProductModal {
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData[], accessToken: string) => Promise<void>
	activeCategory: ICategory
	categories: ICategory[]
	accessToken: string
	colors: IProductColor[]
	isLoading: boolean
}

export default function BatchProductModal({
	isOpen,
	onClose,
	onSubmit,
	activeCategory,
	categories,
	accessToken,
	colors,
	isLoading,
}: IBatchProductModal) {
	const [nameTemplate, setNameTemplate] = useState('')
	const [skuTemplate, setSkuTemplate] = useState('')
	const [descriptionDelta, setDescriptionDelta] = useState<string | Delta>('')
	const [variantValues, setVariantValues] = useState('')
	const [parentCatId, setParentCatId] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [variants, setVariants] = useState<ICreateProductVariant[]>([
		{ name: 0, price: 0, unitsInStock: 0 },
	])
	const [selectedColors, setSelectedColors] = useState<IProductColor[]>([])

	useEffect(() => {
		if (isOpen) {
			setNameTemplate('')
			setSkuTemplate('')
			setDescriptionDelta('')
			setVariantValues('')
			setVariants([{ name: 0, price: 0, unitsInStock: 0 }])
			setSelectedColors([])
			setCategoryId(activeCategory.id)
			if (activeCategory.parentCategoryId) {
				setParentCatId(activeCategory.parentCategoryId)
			} else {
				setParentCatId('')
			}
		}
	}, [isOpen, activeCategory])

	const modules = () => ({
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
		],
	})

	const isValidDescription =
		typeof descriptionDelta === 'string'
			? descriptionDelta.trim().length > 0
			: descriptionDelta?.ops?.some(
					(op: any) => op.insert && op.insert.trim?.().length > 0
			  ) || false

	const isValidVariants = variants.every(
		v => v.name > 0 && v.price > 0 && v.unitsInStock > 0
	)

	const isValid =
		nameTemplate.trim().length > 0 &&
		nameTemplate.includes('[VARIANT]') &&
		skuTemplate.trim().length > 0 &&
		skuTemplate.includes('[VARIANT]') &&
		variantValues.trim().length > 0 &&
		categoryId.trim().length > 0 &&
		isValidDescription &&
		isValidVariants

	const handleSubmit = async () => {
		const variantList = variantValues
			.split(',')
			.map(v => v.trim())
			.filter(v => v)

		if (variantList.length === 0) {
			console.error('Не вказано значення для [VARIANT]')
			return
		}

		try {
			const formDataList: FormData[] = await Promise.all(
				variantList.map(async variant => {
					const name = nameTemplate.replace('[VARIANT]', variant)
					const sku = skuTemplate.replace('[VARIANT]', variant)

					let description: string

					if (typeof descriptionDelta === 'string') {
						description = descriptionDelta.replaceAll('[VARIANT]', variant)
					} else if (
						descriptionDelta?.ops &&
						Array.isArray(descriptionDelta.ops)
					) {
						const replaced = await replaceVariantInDelta(
							descriptionDelta,
							variant
						)
						description = JSON.stringify(replaced)
					} else {
						throw new Error('Invalid Delta format: missing ops')
					}

					const formData = new FormData()
					formData.append('Name', name)
					formData.append('Description', description)
					formData.append('CategoryId', categoryId)
					formData.append('SKU', sku)
					formData.append('ProductVariantsJson', JSON.stringify(variants))
					formData.append('ProductColorsJson', JSON.stringify(selectedColors))
					return formData
				})
			)

			await onSubmit(formDataList, accessToken)
			onClose()
		} catch (error) {
			console.error('Помилка при створенні групи товарів:', error)
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput={true}>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-h-[80vh] overflow-y-auto'>
				<ModalHeader isUpdate={false} title='групу товарів' />

				<BatchProductForm
					nameTemplate={nameTemplate}
					setNameTemplate={setNameTemplate}
					skuTemplate={skuTemplate}
					setSkuTemplate={setSkuTemplate}
					descriptionDelta={descriptionDelta}
					setDescriptionDelta={setDescriptionDelta}
					variantValues={variantValues}
					setVariantValues={setVariantValues}
					parentCatId={parentCatId}
					setParentCatId={setParentCatId}
					categoryId={categoryId}
					setCategoryId={setCategoryId}
					categories={categories}
					variants={variants}
					setVariants={setVariants}
					modules={modules}
					colors={colors}
					selectedColors={selectedColors}
					setSelectedColors={setSelectedColors}
				/>

				<div className='flex justify-end gap-2 pt-4'>
					<Button
						disabled={isLoading}
						variant='outline'
						type='button'
						onClick={onClose}
					>
						Скасувати
					</Button>
					<Button
						type='button'
						disabled={!isValid || isLoading}
						onClick={handleSubmit}
					>
						Створити
					</Button>
				</div>
			</div>
		</Modal>
	)
}

async function replaceVariantInDelta(
	delta: any,
	variant: string
): Promise<any> {
	const { Delta } = await import('quill')

	if (!delta?.ops || !Array.isArray(delta.ops)) {
		throw new Error('Invalid Delta format: missing ops')
	}

	const newOps = delta.ops.flatMap((op: any) => {
		if (typeof op.insert === 'string') {
			const parts = op.insert.split('[VARIANT]')
			if (parts.length > 1) {
				return parts.reduce((acc: any[], part: string, i: number) => {
					if (i > 0) acc.push({ insert: variant, attributes: op.attributes })
					acc.push({ insert: part, attributes: op.attributes })
					return acc
				}, [])
			}
		}
		return [op]
	})

	return new Delta(newOps)
}
