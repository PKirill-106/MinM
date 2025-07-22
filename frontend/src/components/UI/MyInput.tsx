'use client'
import { IInputProps } from '@/types/Interfaces'
import { Check } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { transliterate as tr, slugify } from 'transliteration'

export default function Input({ text }: IInputProps) {
	const id = slugify(tr(text))
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const isChecked = searchParams.get(id) === 'true'

	const handleChange = useCallback(() => {
		const params = new URLSearchParams(searchParams)
		if (isChecked) {
			params.delete(id)
		} else {
			params.set(id, 'true')
		}
		params.delete('page') // reset page to 1 on filter change
		router.push(`${pathname}?${params.toString()}`)
	}, [id, isChecked, pathname, router, searchParams])

	return (
		<label
			htmlFor={id}
			className='flex gap-2 items-center active:text-accent duration-300 ease-out transition-all cursor-pointer pointer-events-none'
		>
			<div className='relative w-5 h-5 cursor-pointer pointer-events-auto'>
				<input
					id={id}
					type='checkbox'
					className={`appearance-none w-full h-full border-1 border-transparent-text hover:border-accent rounded-xs li-hover peer checked:invisible active:bg-accent`}
					checked={isChecked}
					onChange={handleChange}
				/>
				<Check
					className='absolute top-0 left-0 bg-accent text-white-text rounded-xs invisible peer-checked:visible pointer-events-auto active:bg-button active:text-button-text duration-300 ease-out transition-all'
					strokeWidth={3}
					size={20}
				/>
			</div>
			<p className='text-[18px] pointer-events-auto'>{text}</p>
		</label>
	)
}
