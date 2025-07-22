'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'
import Image from 'next/image'
import { ISortableImage } from '../../interface'

export default function SortableImage({ file, onRemove }: ISortableImage) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: file.filePath })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='relative w-24 h-24 rounded overflow-hidden'
		>
			<Image src={file.filePath} alt='' fill className='object-cover' />
			<button
				onClick={onRemove}
				className='absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full'
			>
				<X size={12} />
			</button>
			<div
				{...attributes}
				{...listeners}
				className='absolute bottom-1 left-1 bg-white/50 p-1 rounded cursor-grab'
			>
				⋮
			</div>
		</div>
	)
}
