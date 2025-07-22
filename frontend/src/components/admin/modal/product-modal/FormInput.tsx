import { Input } from '@/components/UI/input'
import React, { ReactNode } from 'react'

interface IFormInput {
	title: string | ReactNode
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	isRequired: boolean
}

export default function FormInput(props: IFormInput) {
	return (
		<div className='' >
			<span className='mb-2'>{props.title}</span>
			<Input
				type={typeof props.value === 'number' ? 'number' : 'text' }
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				required={props.isRequired}
			/>
		</div>
	)
}
