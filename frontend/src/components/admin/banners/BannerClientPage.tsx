'use client'
import { Button } from '@/components/UI/button'
import { Card, CardContent, CardHeader } from '@/components/UI/card'
import { Input } from '@/components/UI/input'
import { useApi } from '@/hooks/useApi'
import { updateBanner } from '@/lib/services/bannerServices'
import { IBannerClientPage } from '@/types/Interfaces'
import { ChevronDown, ChevronUp, ImagePlus, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BannerCardHeader from './BannerCardHeader'
import BannerCardContent from './BannerCardContent'
import AddBannerButton from './AddBannerButton'

export type BannerItem = {
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

	return (
		<div className='max-w-2xl w-full'>
			<h1 className='mb-10'>Банери</h1>

			<AddBannerButton items={items} setItems={setItems} />

			<div className='grid grid-cols-1 gap-4 mt-6'>
				{items.map((it, idx) => (
					<Card
						key={it.filePath + idx}
						className={`p-0 ${!it.file ? 'border-2 border-green-500' : ''}`}
					>
						<BannerCardHeader items={items} setItems={setItems} idx={idx} />
						<BannerCardContent it={it} idx={idx} setItems={setItems} />
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
