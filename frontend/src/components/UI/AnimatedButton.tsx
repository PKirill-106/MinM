'use client'

import { cn } from '@/lib/utils'
import { ButtonVariantType, IAnimatedButton } from '@/types/Interfaces'
import { AnimatePresence, motion, easeInOut } from 'framer-motion'
import { Check, LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'


export default function AnimatedButton({
	text,
	icon,
	variant = 'custom',
	mode = 'full-cycle',
	onClick,
	...rest
}: IAnimatedButton) {
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')

	const handleClick = async () => {
		setStatus('loading')
		const result = await onClick()
		try {
			setTimeout(() => {
				if (mode === 'simple-cycle') {
					setStatus('idle')
				} else if (result === 'success' || result === undefined) {
					setStatus('success')
					setTimeout(() => setStatus('idle'), 1500)
				} else {
					setStatus('error')
					setTimeout(() => setStatus('idle'), 1500)
				}
			}, 700)
		} catch {
			setStatus('error')
			setTimeout(() => setStatus('idle'), 1500)
		}
	}

	const bounceScale = {
		animate: {
			scale: [1, 1.3, 0.9, 1.15, 1],
			transition: { duration: 0.6, ease: easeInOut },
		},
	}

	const getStatusIcon = () => {
		switch (status) {
			case 'loading':
				return <LoaderCircle className='animate-spin' strokeWidth={3} />
			case 'success':
				return (
					<motion.div key={status} {...bounceScale}>
						<Check strokeWidth={3} />
					</motion.div>
				)
			case 'error':
				return (
					<motion.div key={status} {...bounceScale}>
						<X strokeWidth={3} />
					</motion.div>
				)
			default:
				return icon || null
		}
	}

	const variantClasses: Record<ButtonVariantType, string> = {
		cart: 'w-full md:w-auto py-3 md:px-4 lg:py-4 lg:px-5 gap-3 rounded-lg font-semibold bg-button hover:bg-accent active:bg-accent text-button-text hover:text-white-text active:text-white-text',
		instagram:
			'py-2 px-4 md:py-3 md:px-5 lg:py-5 lg:px-6 gap-2 rounded-md bg-accent text-white hover:bg-button hover:text-button-text active:bg-button active:text-button-text',
		custom: '',
	}

	return (
		<motion.button
			{...rest}
			disabled={status !== 'idle'}
			style={{
				pointerEvents: status !== 'idle' ? 'none' : 'auto',
				...rest.style,
			}}
			className={cn(
				'inline-flex items-center justify-center text-base lg:text-xl transition-all duration-300 cursor-pointer gap-2 relative',
				variantClasses[variant],
				status === 'success'
					? 'bg-green-300! text-green-950!'
					: status === 'error'
					? 'bg-red-500! text-red-100!'
					: ''
			)}
			onClick={handleClick}
			whileTap={{ scale: 0.95 }}
		>
			<span className='flex invisible' aria-hidden='true'>
				{text} {icon}
			</span>
			<AnimatePresence mode='wait' initial={false}>
				<motion.span
					key={status}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.2 }}
					className='flex items-center gap-2 absolute inset-0 justify-center'
				>
					{status === 'idle' ? (
						<>
							{text} {icon}
						</>
					) : (
						getStatusIcon()
					)}
				</motion.span>
			</AnimatePresence>
		</motion.button>
	)
}
