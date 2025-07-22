import Image from 'next/image'
import React from 'react'
import { IMainImage } from '../../interfaces'

export default function MainImage({
	images,
	selectedImageIndex,
	onClick,
	productName,
}: IMainImage) {
	return (
		<div
			onClick={onClick}
			className='relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer'
		>
			{images.map((img, i) => (
				<Image
					key={img.filePath}
					src={img.filePath}
					alt={productName}
					fill
					className={`object-cover absolute top-0 left-0 transition-opacity duration-300 ${
						selectedImageIndex === i ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			))}
		</div>
	)
}
