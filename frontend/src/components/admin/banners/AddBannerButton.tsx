import { Button } from '@/components/UI/button'
import { ImagePlus } from 'lucide-react'
import React, { useRef } from 'react'
import { BannerItem } from './BannerClientPage'
import { IAddBannerButton } from '../interface'

export default function AddBannerButton({ items, setItems }: IAddBannerButton) {
	const inputRef = useRef<HTMLInputElement | null>(null)

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

	const handleClick = () => {
		inputRef.current?.click()
	}

	return (
		<div className='space-y-4 mt-4'>
			<input
				ref={inputRef}
				type='file'
				multiple
				accept='image/*'
				onChange={e => addFiles(e.target.files)}
				className='hidden'
			/>
			<Button variant='outline' onClick={handleClick}>
				<ImagePlus />
				Додати зображення
			</Button>
		</div>
	)
}
