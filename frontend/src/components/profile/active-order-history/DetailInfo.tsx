import React from 'react'
import { IDetailsInfo } from '../interfaces'

export default function DetailsInfo({ title, info }: IDetailsInfo) {
	return (
		<div className='flex items-center justify-between gap-2'>
			<span className='text-sm lg:text-base'>{title}</span>
			<span className='text-sm lg:text-base'>{info}</span>
		</div>
	)
}
