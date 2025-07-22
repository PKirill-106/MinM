'use client'
import { ILogoProps } from '@/types/Interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Tooltip from './MyTooltip'

export default function Logo({ width, height, isFooter }: ILogoProps) {
	const pathname = usePathname()

	const isHome: boolean = pathname === '/'

	const logoSrc: string = isFooter ? '/inverse-logo.svg' : '/logo.svg'

	const responsiveFooterLogo: string =
		'w-28 h-12 md:w-37 md:h-16 lg:w-42 lg:h-18'
	const responsiveNavLogo: string =
		'w-30 h-14 md:w-34 md:h-15 lg:w-46 lg:h-20 xl:w-50 xl:h-22'

	const logo = (
		<Image
			src={logoSrc}
			alt='logo'
			className={`object-contain ${
				isFooter ? responsiveFooterLogo : responsiveNavLogo
			}`}
			width={width}
			height={height}
		/>
	)

	return (
		<div className='flex items-center'>
			{isHome ? (
				logo
			) : (
				<Tooltip content='Головна сторінка'>
					<Link
						href='/'
						className={`${isHome ? '' : 'hover:scale-110 duration-300'} `}
					>
						{logo}
					</Link>
				</Tooltip>
			)}
		</div>
	)
}
