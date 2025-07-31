'use client'
import { ICategory, ISelectProps } from '@/types/Interfaces'
import { ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type SelectOption = {
	id?: string
	name: string
	slug?: string
	colorHex?: string
}

export default function Select({
	options,
	variant,
	defaultValue,
	onSelect,
	activeSlug,
	activeId,
	createColorSlug,
}: ISelectProps) {
	const [selected, setSelected] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	useEffect(() => {
		if (activeSlug) {
			const match = options.find(
				opt => 'slug' in opt && opt.slug === activeSlug
			)
			if (match) {
				setSelected(match.name)
			}
		} else if (activeId && variant === 'sort') {
			const sortOptions = [
				{ id: 'suggested', name: 'Рекомендовані' },
				{ id: 'price-asc', name: 'Від дешевих' },
				{ id: 'price-desc', name: 'Від дорогих' },
				{ id: 'popular', name: 'Популярні' },
			]
			const match = sortOptions.find(opt => opt.id === activeId)
			if (match) {
				setSelected(match.name)
			}
		} else if (activeId && variant === 'color') {
			const match = options.find(opt => createColorSlug!(opt.name) === activeId)
			if (match) {
				setSelected(match.name)
			}
		} else if (variant === 'color') {
			setSelected(null)
		}
	}, [activeSlug, activeId, options, variant])

	const getSelectOptions = useCallback((): SelectOption[] => {
		switch (variant) {
			case 'cat':
				return options.filter(
					(opt): opt is ICategory =>
						'parentCategoryId' in opt && opt.parentCategoryId === null
				)
			case 'subcat':
				return options.filter(
					(opt): opt is ICategory =>
						'parentCategoryId' in opt && opt.parentCategoryId !== null
				)
			case 'sort':
				return [
					{ id: 'suggested', name: 'Рекомендовані' },
					{ id: 'price-asc', name: 'Від дешевих' },
					{ id: 'price-desc', name: 'Від дорогих' },
					{ id: 'popular', name: 'Популярні' },
				]
			case 'color':
				const baseOptions = options.map(opt => ({
					id: createColorSlug!(opt.name),
					name: opt.name,
					colorHex: 'colorHex' in opt ? opt.colorHex : undefined,
				}))

				if (activeId) {
					return [
						{ id: '', name: 'Очистити фільтр', colorHex: undefined },
						...baseOptions,
					]
				}
				return baseOptions

			default:
				return []
		}
	}, [options, variant])

	const selectOptions = useMemo(() => getSelectOptions(), [getSelectOptions])
	const selectedOption = useMemo(
		() => selectOptions.find(opt => opt.name === selected),
		[selectOptions, selected]
	)

	const handleOptionClick = useCallback(
		(option: SelectOption) => {
			setIsOpen(false)
			setSelected(option.name)

			const params = new URLSearchParams(searchParams.toString())
			params.delete('page')

			if (variant === 'color') {
				if (option.name === 'Очистити фільтр') {
					params.delete('color')
				} else {
					const colorSlug = createColorSlug!(option.name)
					params.set('color', colorSlug)
					onSelect?.(colorSlug)
				}
				const newUrl = params.toString()
					? `${pathname}?${params.toString()}`
					: pathname

				router.push(newUrl)
				return
			}

			if (option.id) {
				onSelect?.(option.id)
			}
		},
		[onSelect, variant, searchParams, router, pathname, createColorSlug]
	)

	return (
		<div
			ref={selectRef}
			className='relative p-2 border-1 rounded-md md:w-60 cursor-pointer border-transparent-text hover:border-accent active:border-accent duration-300 ease-out transition-colors'
			onClick={() => setIsOpen(prev => !prev)}
		>
			<div className='flex items-center justify-between'>
				{variant === 'color' && selectedOption?.colorHex && (
					<div
						className='aspect-square rounded-sm w-6 border'
						style={{ backgroundColor: selectedOption.colorHex }}
					/>
				)}
				<span>{selected || defaultValue}</span>
				<ChevronRight
					className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 transform transition-transform duration-300 ease-out ${
						isOpen ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</div>

			{isOpen && (
				<div className='absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-md z-10'>
					{selectOptions.map(option => (
						<div
							key={option.id || option.name}
							className='px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-100 cursor-pointer'
							onClick={e => {
								e.stopPropagation()
								handleOptionClick(option)
							}}
						>
							<div className='flex gap-2'>
								{variant === 'color' && option.colorHex && (
									<div
										className='aspect-square rounded-sm w-6 border'
										style={{ backgroundColor: option.colorHex }}
									/>
								)}
								<span>{option.name}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
