import { CardContent } from '@/components/UI/card'
import { Input } from '@/components/UI/input'
import Image from 'next/image'
import React from 'react'
import { IBannerCardContent } from '../interface'

export default function BannerCardContent({
	it,
	idx,
	setItems,
}: IBannerCardContent) {
	const handleChange = <K extends 'pageURL' | 'buttonText' | 'text'>(
		idx: number,
		key: K,
		value: string
	) => {
		setItems(prev =>
			prev.map((it, i) => (i !== idx ? it : { ...it, [key]: value }))
		)
	}
	return (
		<CardContent className='p-3 flex gap-2'>
			<div className='relative max-w-2xl h-40 w-full basis-2/5'>
				<Image src={it.filePath} alt='banner' fill className='object-cover' />
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
					onChange={e => handleChange(idx, 'buttonText', e.target.value)}
				/>
			</div>
		</CardContent>
	)
}
