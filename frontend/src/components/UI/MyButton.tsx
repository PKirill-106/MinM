import { IButtonProps } from '@/types/Interfaces'
import { Instagram, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import AnimatedButton from './AnimatedButton'

export default function Button({ text, variant, onClick, href, className }: IButtonProps) {
	const baseClasses: string =
		'button-text inline-flex text-base lg:text-xl justify-center items-center transition-all duration-300 cursor-pointer'

	const variantClasses: Record<'cart' | 'instagram', string> = {
		cart: 'w-full md:w-auto py-3 md:px-4 lg:py-4 lg:px-5 gap-3 rounded-lg font-semibold bg-button hover:bg-accent active:bg-accent text-button-text hover:text-white-text active:text-white-text',
		instagram:
			'py-2 px-4 md:py-3 md:px-5 lg:py-5 lg:px-6 gap-2 rounded-md bg-accent text-white hover:bg-button hover:text-button-text active:bg-button active:text-button-text',
	}

	const wrappedOnClick = useCallback(async () => {
		try {
			if (onClick) {
				await onClick()
			}
			return 'success'
		} catch {
			return 'error'
		}
	}, [onClick])

	if (href) {
		return (
			<Link href={href} target='_blank'>
				<button
					className={`${baseClasses} ${variantClasses[variant]} ${className}`}
				>
					{variant === 'instagram' && (
						<Instagram className='h-4 w-4 lg:h-5 md:w-5' />
					)}
					{text}
				</button>
			</Link>
		)
	}

	return (
		<AnimatedButton
			text={text}
			icon={<ShoppingBag className='h-5 w-5 md:w-6 md:h-6 lg:w-7 lg:h-7' />}
			variant={variant}
			mode='full-cycle'
			onClick={wrappedOnClick}
		/>
	)
}
