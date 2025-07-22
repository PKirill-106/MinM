'use client'
import { IQuantity } from '@/types/Interfaces'
import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default function Quantity({ quantity, amount, onChange }: IQuantity) {
	const isControlled = quantity !== undefined && typeof onChange === 'function'

	const [internalCount, setInternalCount] = useState(1)
	const count = isControlled ? quantity! : internalCount

	useEffect(() => {
		if (!isControlled && typeof quantity === 'number') {
			setInternalCount(quantity)
		}
	}, [quantity, isControlled])

	const updateCount = (newCount: number) => {
		if (isControlled) {
			onChange?.(newCount)
		} else {
			setInternalCount(newCount)
		}
	}

	const handleDecrement = useCallback(() => {
		if (count > 1) updateCount(count - 1)
	}, [count, updateCount])

	const handleIncrement = useCallback(() => {
		if (count < amount) updateCount(count + 1)
	}, [count, amount, updateCount])

	const isDecrementDisabled = useMemo(() => count <= 1, [count])
	const isIncrementDisabled = useMemo(() => count >= amount, [count, amount])

	const buttonClass = 'py-3 px-6 md:p-0'

	return (
		<div
			className={`w-full flex gap-6 items-center justify-between md:justify-center ${
				isControlled ? 'md:w-auto rounded-md ' : 'md:w-auto rounded-lg font-medium'
			} p-0 md:py-2 md:px-4 lg:py-3 lg:px-5 border-transparent-text border-1 font-normal text:lg md:text-xl lg:text-2xl text-accent`}
		>
			<button
				onClick={handleDecrement}
				className={clsx(
					buttonClass,
					isDecrementDisabled
						? 'text-transparent-text'
						: 'cursor-pointer link-hover'
				)}
				disabled={isDecrementDisabled}
			>
				-
			</button>
			<span className='min-w-7 text-center text-foreground'>{count}</span>
			<button
				onClick={handleIncrement}
				className={clsx(
					buttonClass,
					isIncrementDisabled
						? 'text-transparent-text'
						: 'cursor-pointer link-hover'
				)}
				disabled={isIncrementDisabled}
			>
				+
			</button>
		</div>
	)
}
