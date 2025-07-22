'use client'

import { Button } from '../UI/button'
import LogoutButton from '../UI/LogoutButton'
import { IProfileButtonsProps } from './interfaces'

export function ProfileButtons({ changed, onSave }: IProfileButtonsProps) {
	return (
		<div className='w-full flex justify-between items-center'>
			<LogoutButton />

			<Button onClick={onSave} disabled={!changed}>
				Зберегти зміни
			</Button>
		</div>
	)
}
