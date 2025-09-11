'use client'

import { Button } from '../UI/button'
import LogoutButton from '../UI/LogoutButton'
import { IProfileButtonsProps } from './interfaces'

export function ProfileButtons({ changed, onSave }: IProfileButtonsProps) {
	return (
		<div className='w-full flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 justify-between items-center'>
			<LogoutButton className='w-full md:w-auto' />

			<Button
				onClick={onSave}
				disabled={!changed}
				className='w-full md:w-auto'
			>
				Зберегти зміни
			</Button>
		</div>
	)
}
