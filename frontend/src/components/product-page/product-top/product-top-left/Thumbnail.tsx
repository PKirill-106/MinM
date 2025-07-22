import React from 'react'
import { IThumbnail } from '../../interfaces'
import Image from 'next/image'

export default function Thumbnail({
	img,
	index,
	productName,
	selectedImageIndex,
	onClick,
	isModal
}: IThumbnail) {
	const isActive = selectedImageIndex === index

	return (
		<div
			key={img}
			className={`relative aspect-square max-w-18 rounded-sm md:rounded-xs lg:rounded-md overflow-hidden transition-all duration-200 ${
				isActive ? 'ring-2 ring-accent' : 'hover:brightness-80 opacity-100'
			} ${isModal ? 'w-8 md:w-10 lg:w-12 xl:w-14' : ''} cursor-pointer`}
			onClick={onClick}
		>
			<Image
				src={img}
				alt={`${productName} thumbnail ${index}`}
				fill
				loading={index < 5 ? 'eager' : 'lazy'}
				className={`object-cover transition-all duration-300 ${
					isActive ? 'brightness-90' : ''
				}`}
			/>
		</div>
	)
}
