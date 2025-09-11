import React from 'react'
import { IAdminPagesLink } from './interface'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminPagesLink({
	title,
	imgLink,
	pageLink,
}: IAdminPagesLink) {
	return (
		<Link href={pageLink}>
			<div className='relative flex justify-center p-4 w-full aspect-square shadow-lg rounded-xl hover:scale-110 duration-300'>
				<Image src={imgLink} alt='' fill className='rounded-xl bg-white' />
				<h4 className='absolute bottom-2 md:bottom-4 lg:bottom-8'>{title}</h4>
			</div>
		</Link>
	)
}
