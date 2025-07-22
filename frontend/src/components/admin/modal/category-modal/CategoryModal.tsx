'use client'

import Modal from '@/components/UI/Modal'
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { Textarea } from '@/components/UI/textarea'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ICategoryModal } from '../../interface'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select'


export default function CategoryModal({
	type,
	isOpen,
	onClose,
	onSubmit,
	accessToken,
	categoryData,
	activeCategory,
	categories,
}: ICategoryModal) {
	const isUpdate = type === 'update'

	const [name, setName] = useState('')
	const [description, setDescription] = useState('Опис')
	const [parentCategoryId, setParentCategoryId] = useState<string>('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isUpdate && categoryData) {
			setName(categoryData.name)
			setDescription(categoryData.description || 'Опис')
			setParentCategoryId(categoryData.parentCategoryId || '')
			setImageFile(null)
			setImagePreview(categoryData.imageURL || '')
		} else {
			setName('')
			setDescription('Опис')
			if (activeCategory?.id) {
				setParentCategoryId(activeCategory.id)
			} else {
				setParentCategoryId('')
			}
			setImageFile(null)
			setImagePreview('')
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
		}
	}, [isUpdate, categoryData, isOpen, onClose, onSubmit])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImageFile(file)
			setImagePreview(URL.createObjectURL(file))
		}
	}

	const handleRemoveImage = () => {
		setImageFile(null)
		setImagePreview('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleSubmit = () => {
		const formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		if (parentCategoryId) {
			formData.append('parentCategoryId', parentCategoryId)
		}

		if (isUpdate && categoryData?.id) {
			formData.append('id', categoryData.id)
		}

		if (imageFile) {
			formData.append('image', imageFile)
		}

		onSubmit(formData, accessToken)
	}

	const isValid = name.trim().length > 0

	return (
		<Modal isOpen={isOpen} onClose={onClose} isInput>
			<div className='space-y-4 p-6 bg-white rounded shadow-lg w-full max-h-[80vh] overflow-y-auto'>
				<h2 className='text-xl font-semibold'>
					{isUpdate ? 'Редагувати категорію' : 'Створити категорію'}
				</h2>

				<div>
					<span className='mb-1 block'>Назва категорії</span>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Назва'
						required
					/>
				</div>

				<div>
					<span className='mb-1 block'>Опис</span>
					<Textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Опис'
					/>
				</div>

				<div>
					<span className='mb-1 block'>
						Батьківська категорія (необовʼязково)
					</span>
					<Select
						value={parentCategoryId || 'none'}
						onValueChange={value =>
							setParentCategoryId(value === 'none' ? '' : value)
						}
					>
						<SelectTrigger>
							<SelectValue>
								{parentCategoryId
									? categories.find(c => c.id === parentCategoryId)?.name
									: 'Оберіть категорію'}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='none'>Немає</SelectItem>
							{categories
								.filter(c => c.parentCategoryId === null)
								.map(c => (
									<SelectItem key={c.id} value={c.id}>
										{c.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<span className='mb-1 block'>Фото категорії (необовʼязково)</span>
					<Input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileChange}
					/>
					{imagePreview && (
						<div className='relative mt-2 w-32 h-32'>
							<Image
								src={imagePreview}
								alt='Превʼю фото'
								fill
								className='object-cover'
							/>
							<Button
								type='button'
								variant='destructive'
								size='sm'
								className='absolute top-1 right-1'
								onClick={handleRemoveImage}
							>
								×
							</Button>
						</div>
					)}
				</div>

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
