'use client'

import Input from '@/components/UI/MyInput'

export default function FilterCheckboxGroup() {
	return (
		<div className='flex flex-col gap-2 mb-6'>
			<Input text='Сезон' />
			<Input text='Акція' />
			<Input text='Новинки' />
		</div>
	)
}
