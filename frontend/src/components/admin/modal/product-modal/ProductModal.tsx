'use client'

import { Button } from '@/components/UI/button'
import Modal from '@/components/UI/Modal'
import {
	ICreateProductVariant,
	IProductColor,
	IProductImage,
} from '@/types/Interfaces'
import {
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import ImageUploader from './ImageUploader'
import ProductForm from './ProductForm'
import { IProductModal } from '../../interface'
import ModalHeader from '../ModalHeader'

type Delta = any

export default function ProductModal({
	type,
	isOpen,
	onClose,
	onSubmit,
	productData,
	activeCategory,
	categories,
	accessToken,
	colors,
}: IProductModal) {
	const isUpdate = type === 'update'

	const [name, setName] = useState('')
	const [descriptionDelta, setDescriptionDelta] = useState<string | Delta>('')
	const [sku, setSku] = useState('')
	const [parentCatId, setParentCatId] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [variants, setVariants] = useState<ICreateProductVariant[]>([
		{ name: '', price: 0, unitsInStock: 0 },
	])
	const [images, setImages] = useState<IProductImage[]>([])
	const [selectedColors, setSelectedColors] = useState<IProductColor[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const subcategories = categories.filter(
		c => c.parentCategoryId === parentCatId
	)
	useEffect(() => {
		if (isUpdate && productData) {
			setName(productData.name)
			try {
				const parsed = JSON.parse(productData.description)
				setDescriptionDelta(parsed)
			} catch {
				setDescriptionDelta(productData.description)
			}

			setSku(productData.sku)

			setVariants(productData.productVariants as ICreateProductVariant[])
			setImages(productData.productImages)
			setSelectedColors(productData.colors || [])
		} else {
			setName('')
			setDescriptionDelta('')
			setSku('')
			setVariants([{ name: '', price: 0, unitsInStock: 0 }])
			setImages([])
			setSelectedColors([])
		}
		setCategoryId(activeCategory.id)
		if (activeCategory.parentCategoryId) {
			setParentCatId(activeCategory.parentCategoryId)
		}
	}, [isUpdate, productData, isOpen, onClose, activeCategory])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files)

			const maxSequence = images.reduce(
				(max, img) => Math.max(max, img.sequenceNumber ?? 0),
				-1
			)

			const newImageObjects: IProductImage[] = files.map((file, i) => ({
				filePath: URL.createObjectURL(file),
				sequenceNumber: maxSequence + 1 + i,
				file,
			}))

			setImages(prev => [...prev, ...newImageObjects])
			e.target.value = ''
		}
	}

	const sensors = useSensors(useSensor(PointerSensor))
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = images.findIndex(i => i.filePath === active.id)
		const newIndex = images.findIndex(i => i.filePath === over.id)
		if (oldIndex !== -1 && newIndex !== -1) {
			const newImages = arrayMove(images, oldIndex, newIndex).map((img, i) => ({
				...img,
				sequenceNumber: i,
			}))
			setImages(newImages)
		}
	}

	const removeImage = (filePath: string) => {
		setImages(prev =>
			prev
				.filter(i => i.filePath !== filePath)
				.map((img, i) => ({
					...img,
					sequenceNumber: i,
				}))
		)
	}

	const handleSubmit = () => {
		const formData = new FormData()

		formData.append('Name', name)
		formData.append(
			'Description',
			typeof descriptionDelta === 'string'
				? descriptionDelta
				: JSON.stringify(descriptionDelta)
		)
		formData.append('CategoryId', categoryId)
		formData.append('SKU', sku)
		formData.append('ProductVariantsJson', JSON.stringify(variants))
		formData.append('ProductColorsJson', JSON.stringify(selectedColors))

		if (isUpdate && productData?.id) {
			formData.append('Id', productData.id)
		}

		images.forEach(img => {
			if ('file' in img && img.file instanceof File) {
				formData.append('Images', img.file)
			} else {
				formData.append('ExistingImageUrls', img.filePath)
			}
			formData.append('ImageSequenceNumbers', img.sequenceNumber.toString())
		})

		onSubmit(formData, accessToken)
	}

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, false] }],
				['bold', 'italic', 'underline'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['link', 'image'],
			],
		}),
		[]
	)

	const isValid = name && sku && categoryId && variants.length > 0

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput={true}>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-h-[80vh] overflow-y-auto'>
				<ModalHeader isUpdate={isUpdate} title='продукт' />

				<ProductForm
					name={name}
					setName={setName}
					sku={sku}
					setSku={setSku}
					descriptionDelta={descriptionDelta}
					setDescriptionDelta={setDescriptionDelta}
					parentCatId={parentCatId}
					setParentCatId={setParentCatId}
					categoryId={categoryId}
					setCategoryId={setCategoryId}
					categories={categories}
					variants={variants}
					setVariants={setVariants}
					subcategories={subcategories}
					modules={modules}
					colors={colors}
					selectedColors={selectedColors}
					setSelectedColors={setSelectedColors}
				/>

				<ImageUploader
					images={images}
					setImages={setImages}
					onDragEnd={handleDragEnd}
					onRemove={removeImage}
					fileInputRef={fileInputRef}
					onFileChange={handleFileChange}
					sensors={sensors}
				/>

				<div className='flex justify-end gap-2 pt-4'>
					<Button variant='outline' type='button' onClick={onClose}>
						Скасувати
					</Button>
					<Button type='button' disabled={!isValid} onClick={handleSubmit}>
						{isUpdate ? 'Зберегти' : 'Створити'}
					</Button>
				</div>
			</div>
		</Modal>
	)
}
