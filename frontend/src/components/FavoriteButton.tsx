'use client'

import { useFavorites } from '@/providers/FavoritesProvider'
import { IFavoriteButton } from '@/types/Interfaces'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FavoriteButton({
	productId,
	heartClassName,
	buttonClassName,
}: IFavoriteButton) {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		isFavorite(productId)
	}, [productId])

	const handleClick = () => {
		if (isFavorite(productId)) {
			removeFavorite(productId)
		} else {
			addFavorite(productId)
		}

		setAnimate(true)
		setTimeout(() => setAnimate(false), 300)
	}

	return (
		<button
			onClick={handleClick}
			className={`${buttonClassName} ${animate ? 'scale-120' : ''}`}
		>
			<Heart
				className={`${heartClassName} ${
					isFavorite(productId) ? 'fill-red-500 text-red-500' : ''
				}`}
			/>
		</button>
	)
}
