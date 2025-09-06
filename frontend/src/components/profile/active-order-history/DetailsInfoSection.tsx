import React from 'react'
import { IDetailsInfoSection } from '../interfaces'

export default function DetailsInfoSection({
	title,
	info,
}: IDetailsInfoSection) {
	return (
		<div className='flex items-center justify-between gap-2'>
			<span className='text-sm lg:text-base'>{title}</span>
			<span className='text-sm lg:text-base'>{info}</span>
		</div>
	)
}
