'use client'
import { Button } from '@/components/UI/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/UI/dialog'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu'
import { Input } from '@/components/UI/input'
import { IProductColor } from '@/types/Interfaces'
import { X } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import { IColorSelector } from '../../interface'

const ColorChip = React.memo(
	({ color, onRemove }: { color: IProductColor; onRemove: () => void }) => (
		<div className='flex items-center gap-2 px-2 py-1 rounded-md border text-sm'>
			<div
				className='w-6 h-6 rounded-sm border'
				style={{ backgroundColor: color.colorHex }}
			/>
			<span>{color.name}</span>
			<Button size='icon' variant='ghost' onClick={onRemove}>
				<X className='w-6 h-6' />
			</Button>
		</div>
	)
)

export default function ColorSelector({
	colors,
	selectedColors,
	setSelectedColors,
}: IColorSelector) {
	const [newColor, setNewColor] = useState<IProductColor>({
		name: '',
		colorHex: '#000000',
	})
	const dialogTriggerRef = useRef<HTMLButtonElement | null>(null)

	// Додавання нового кольору
	const addColor = useCallback(() => {
		if (
			newColor.name.trim() &&
			!selectedColors.some(c => c.colorHex === newColor.colorHex)
		) {
			setSelectedColors([...selectedColors, newColor])
			setNewColor({ name: '', colorHex: '#000000' })

			dialogTriggerRef.current?.click()
		}
	}, [newColor, selectedColors, setSelectedColors])

	// Видалення кольору
	const removeColor = useCallback(
		(index: number) => {
			setSelectedColors(selectedColors.filter((_, i) => i !== index))
		},
		[selectedColors, setSelectedColors]
	)

	// Перемикання вибору кольору
	const toggleColor = useCallback(
		(color: IProductColor) => {
			if (selectedColors.some(c => c.colorHex === color.colorHex)) {
				setSelectedColors(
					selectedColors.filter(c => c.colorHex !== color.colorHex)
				)
			} else {
				setSelectedColors([...selectedColors, color])
			}
		},
		[selectedColors, setSelectedColors]
	)

	// Оновлення даних нового кольору
	const updateNewColor = useCallback(
		(field: keyof IProductColor, value: string) => {
			setNewColor(prev => ({ ...prev, [field]: value }))
		},
		[]
	)

	return (
		<div className='mt-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='sm'>
							Оберіть колір
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='max-h-60 overflow-y-auto w-56'>
						{colors.length > 0 ? (
							colors.map(color => {
								const isSelected = selectedColors.some(
									selected => selected.colorHex === color.colorHex
								)

								return (
									<DropdownMenuCheckboxItem
										key={color.colorHex}
										checked={isSelected}
										onCheckedChange={() => toggleColor(color)}
										className='flex gap-2'
									>
										<div
											className='w-6 h-6 rounded-sm border'
											style={{ backgroundColor: color.colorHex }}
										/>
										<span>{color.name}</span>
									</DropdownMenuCheckboxItem>
								)
							})
						) : (
							<p className='px-2 py-1 text-sm text-muted-foreground'>
								Кольори не знайдено
							</p>
						)}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Add new color */}
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline' size='sm' ref={dialogTriggerRef}>
							+ Додати
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Новий колір</DialogTitle>
						</DialogHeader>
						<div className='flex flex-col gap-4'>
							<div className='flex gap-4'>
								<Input
									value={newColor.name}
									onChange={e => updateNewColor('name', e.target.value)}
									placeholder='Назва нового кольору'
									className='basis-4/5'
								/>
								<Input
									type='color'
									value={newColor.colorHex}
									onChange={e => updateNewColor('colorHex', e.target.value)}
									className='basis-1/5 px-1 py-0'
								/>
							</div>
							<Button onClick={addColor}>Додати</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Selected colors */}
			{selectedColors.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{selectedColors.map((color, idx) => (
						<ColorChip
							key={color.colorHex}
							color={color}
							onRemove={() => removeColor(idx)}
						/>
					))}
				</div>
			)}

			{selectedColors.length === 0 && (
				<p className='text-muted-foreground text-sm'>Кольори не вибрані</p>
			)}
		</div>
	)
}
