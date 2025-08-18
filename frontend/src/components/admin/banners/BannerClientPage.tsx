'use client'
import { Button } from '@/components/UI/button'
import { Card, CardContent, CardHeader } from '@/components/UI/card'
import { Input } from '@/components/UI/input'
import { useApi } from '@/hooks/useApi'
import { updateBanner } from '@/lib/services/bannerServices'
import { IBannerClientPage } from '@/types/Interfaces'
import { ChevronDown, ChevronUp, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type BannerItem = {
	filePath: string
	sequenceNumber: number
	pageURL: string
	buttonText: string
	text: string
	file?: File
}

export default function BannerClientPage(props: IBannerClientPage) {
	const { apiFetch } = useApi()

	const [items, setItems] = useState<BannerItem[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const initial: BannerItem[] =
			props.banners?.map((b, index) => ({
				filePath: b.imageURL,
				sequenceNumber: b.sequenceNumber ?? index + 1,
				pageURL: b.pageURL ?? '',
				buttonText: b.buttonText ?? '',
				text: b.text ?? '',
			})) ?? []

		setItems(initial)
	}, [props.banners])

	const addFiles = (files: FileList | null) => {
		if (!files) return

		const maxSequence = items.reduce(
			(max, img) => Math.max(max, img.sequenceNumber ?? 0),
			-1
		)

		const toAdd: BannerItem[] = Array.from(files).map((f, index) => ({
			filePath: URL.createObjectURL(f),
			sequenceNumber: maxSequence + 1 + index,
			pageURL: '',
			buttonText: '',
			text: '',
			file: f,
		}))
		setItems(prev => [...prev, ...toAdd])
	}

	const removeAt = (idx: number) => {
		setItems(prev => {
			const newItems = prev.filter((_, i) => i !== idx)
			return newItems.map((item, i) => ({
				...item,
				sequenceNumber: i + 1,
			}))
		})
	}

	const move = (from: number, to: number) => {
		setItems(prev => {
			if (to < 0 || to >= prev.length) return prev

			const copy = [...prev]
			const [moved] = copy.splice(from, 1)
			copy.splice(to, 0, moved)

			return copy.map((item, i) => ({
				...item,
				sequenceNumber: i + 1,
			}))
		})
	}

	const handleChange = <K extends 'pageURL' | 'buttonText' | 'text'>(
		idx: number,
		key: K,
		value: string
	) => {
		setItems(prev =>
			prev.map((it, i) => (i !== idx ? it : { ...it, [key]: value }))
		)
	}

	const handleUpload = async () => {
		setIsLoading(true)
		if (items.length === 0 && props.banners.length === 0) return

		const sorted = [...items].sort(
			(a, b) => a.sequenceNumber - b.sequenceNumber
		)

		const formData = new FormData()

		const existing = sorted.filter(it => !it.file)
		const existingImages = existing.map(it => ({
			sequenceNumber: it.sequenceNumber,
			imageURL: it.filePath,
			pageURL: it.pageURL ?? '',
			buttonText: it.buttonText ?? '',
			text: it.text ?? '',
		}))
		formData.append('ExistingImages', JSON.stringify(existingImages))

		const newItems = sorted.filter(it => !!it.file)
		newItems.forEach(it => {
			formData.append('NewImages', it.file!)
			formData.append('ImageSequenceNumbers', JSON.stringify(it.sequenceNumber))
			formData.append('PageURLs', it.pageURL ?? '')
			formData.append('ButtonTexts', it.buttonText ?? '')
			formData.append('Texts', it.text ?? '')
		})

		try {
			await apiFetch(token => updateBanner(formData, token))
			toast.success('Банери оновлені')

			setItems(prev =>
				prev.map(it => (it.file ? { ...it, file: undefined } : it))
			)
		} catch (err) {
			console.error(err)
			toast.error('Сталася помилка')
		} finally {
			setIsLoading(false)
		}
	}

	const canMoveUp = (i: number) => i > 0
	const canMoveDown = (i: number) => i < items.length - 1

	return (
		<div className='max-w-2xl w-full'>
			<h1 className='text-xl font-semibold'>Управління банерами</h1>

			<div className='space-y-4 mt-4'>
				<label className='block text-sm font-medium'>Нові банери</label>
				<input
					type='file'
					multiple
					accept='image/*'
					onChange={e => addFiles(e.target.files)}
					className='block w-full text-sm text-gray-600'
				/>
			</div>

			<div className='grid grid-cols-1 gap-4 mt-6'>
				{items.map((it, idx) => (
					<Card
						key={it.filePath + idx}
						className={`p-0 ${!it.file ? 'border-2 border-green-500' : ''}`}
					>
						<CardHeader className='p-0 relative'>
							<div className='absolute left-2 top-2 text-xs bg-black/70 text-white rounded px-2 py-0.5'>
								#{idx + 1}
							</div>

							<div className='absolute right-2 top-2 flex gap-1'>
								<Button
									type='button'
									variant='outline'
									size='icon'
									onClick={() => move(idx, idx - 1)}
									disabled={!canMoveUp(idx)}
									title='Up'
								>
									<ChevronUp size={16} />
								</Button>
								<Button
									type='button'
									variant='outline'
									size='icon'
									onClick={() => move(idx, idx + 1)}
									disabled={!canMoveDown(idx)}
									title='Down'
								>
									<ChevronDown size={16} />
								</Button>
								<Button
									type='button'
									variant='destructive'
									size='icon'
									onClick={() => removeAt(idx)}
									title='Delete'
								>
									<X size={16} />
								</Button>
							</div>
						</CardHeader>

						<CardContent className='p-3 flex gap-2'>
							<div className='relative max-w-2xl h-40 w-full basis-2/5'>
								<Image
									src={it.filePath}
									alt='banner'
									fill
									className='object-cover'
								/>
							</div>
							<div className='basis-3/5 flex flex-col justify-between'>
								<span>Посилання</span>
								<Input
									placeholder='Посилання на сторінку'
									value={it.pageURL}
									onChange={e => handleChange(idx, 'pageURL', e.target.value)}
								/>
								<span>Текст баннера</span>
								<Input
									placeholder='Текст баннера'
									value={it.text}
									onChange={e => handleChange(idx, 'text', e.target.value)}
								/>
								<span>Текст кнопки</span>
								<Input
									placeholder='Текст кнопки'
									value={it.buttonText}
									onChange={e =>
										handleChange(idx, 'buttonText', e.target.value)
									}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Button
				onClick={handleUpload}
				className='w-full flex items-center gap-2 mt-6'
				disabled={isLoading}
			>
				<Upload size={16} /> Зберегти
			</Button>
		</div>
	)
}
