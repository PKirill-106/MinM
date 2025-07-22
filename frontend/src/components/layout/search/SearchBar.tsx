'use client'
import { ISearchBarProps } from '@/types/Interfaces'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function SearchBar({
	products,
	isOpen,
	onClose,
}: ISearchBarProps) {
	const searchRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')
	const [filteredProducts, setFilteredProducts] = useState<typeof products>([])
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const pathname = usePathname()

	const clearSearchInput = () => {
		setInputValue('')
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('button.search-toggle')
			) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, onClose])

	useEffect(() => {
		if (!isOpen) {
			timeoutRef.current = setTimeout(() => {
				clearSearchInput()
			}, 3000)
		} else {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [isOpen])

	useEffect(() => {
		clearSearchInput()
	}, [pathname])

	useEffect(() => {
		if (inputValue.trim() === '') {
			setFilteredProducts([])
			return
		}

		const filtered = products.filter(product =>
			product.name.toLowerCase().includes(inputValue.toLowerCase())
		)
		setFilteredProducts(filtered)
	}, [inputValue])

	return (
		<div ref={searchRef} className='flex flex-col'>
			<div
				className={`fixed z-9 top-21 md:top-23 lg:top-28 xl:top-30 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white px-4 py-2 rounded-md shadow-lg focus-within:scale-105 transition-all duration-300 ${
					isOpen
						? 'opacity-100 translate-y-0 scale-100'
						: 'opacity-0 -translate-y-5 scale-85 pointer-events-none'
				}`}
			>
				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					placeholder='Що шукаєте?'
					className='w-full bg-transparent outline-none placeholder:transparent-text text-lg peer transition-opacity duration-300'
				/>
				<Search className='text-transparent-text link-size' />

				<style jsx>{`
					.peer::placeholder {
						opacity: 1;
						transition: opacity 0.3s ease-in-out;
					}
					.peer:focus::placeholder {
						opacity: 0;
					}
				`}</style>
			</div>
			{isOpen && filteredProducts.length > 0 && (
				<div className='absolute top-34 md:top-36 lg:top-42 xl:top-46 left-1/2 transform -translate-x-1/2 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto z-10'>
					{filteredProducts.map(product => (
						<Link
							href={`/product/${product.slug}`}
							key={product.id}
							className='flex items-center p-2 hover:bg-gray-200 duration-100 transition-all cursor-pointer'
						>
							<div className='w-14 mr-1 md:mr-2 lg:mr-3 xl:mr-4'>
								<Image
									src='/M-in-M-GP-7.5.jpg'
									alt={product.name}
									width={267}
									height={267}
									className='w-full h-full aspect-square object-cover'
								/>
							</div>
							{product.name}
						</Link>
					))}
				</div>
			)}
			{isOpen && inputValue && filteredProducts.length === 0 && (
				<div className='absolute top-34 md:top-36 lg:top-42 xl:top-46 left-1/2 transform -translate-x-1/2 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 text-transparent-text text-center py-2'>
					Нічого не знайдено. Спробуйте інший запит.
				</div>
			)}
		</div>
	)
}
