'use client'

import { IModal } from '@/types/Interfaces'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children, isInput }: IModal) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				if (!isInput) onClose()
			}
		}
		const handleClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleClose)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleClose)
		}
	}, [isOpen, onClose])


	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-white ${
				isOpen ? 'visible' : 'invisible pointer-events-none'
			} ${isInput ? 'text-foreground!' : ''}`}
		>
			<div
				ref={modalRef}
				className={`max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl w-full z-10 duration-300 ease-out transition-all ${
					isOpen
						? 'opacity-100 scale-100 md:translate-x-0 translate-y-0 visible'
						: 'opacity-0 scale-80 md:-translate-x-20 -translate-y-20 invisible'
				} ${isInput ? '' : ''}`}
			>
				<button
					onClick={onClose}
					className={`absolute z-20 -top-25 -right-7 md:-right-20 p-9 li-hover cursor-pointer ${
						isInput
							? 'text-white hover:text-accent active:text-accent cursor-pointer duration-300 ease-out transition-all'
							: ''
					}`}
				>
					<X className='link-size' />
				</button>

				{children}
			</div>
		</div>
	)
}
