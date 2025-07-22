'use client'

import { useState } from 'react'
import { Button } from '@/components/UI/button'
import toast from 'react-hot-toast'
import { codeRequest, confirmEmail } from '@/lib/services/emailServices'
import OtpInput from 'react-otp-input'

interface IEmailConfirmationForm {
	email: string
	token: string
	onSuccess: () => void
}

export default function EmailConfirmationForm({
	email,
	token,
	onSuccess,
}: IEmailConfirmationForm) {
	const [code, setCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [resendMessage, setResendMessage] = useState(false)

	const handleConfirm = async () => {
		setLoading(true)

		try {
			await confirmEmail(email, code, token)
			toast.success('Пошта підтверджена!')
			onSuccess()
		} catch (err: any) {
			toast.error('Невірний код підтвердження')

			// Automatically resend the code
			try {
				await codeRequest(email)
				setResendMessage(true)
			} catch (resendErr: any) {
				toast.error('Не вдалося повторно надіслати код')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='space-y-4'>
			<p className='text-center text-sm text-muted-foreground'>
				Ми надіслали код підтвердження на <strong>{email}</strong>
			</p>

			{resendMessage && (
				<p className='text-center text-xs text-green-600!'>
					Код було повторно надіслано!
				</p>
			)}

			<OtpInput
				value={code}
				onChange={setCode}
				numInputs={6}
				renderInput={props => (
					<input
						{...props}
						className='w-10 h-10 aspect-square text-lg text-center border border-transparent-text text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 rounded-sm'
					/>
				)}
				skipDefaultStyles
				containerStyle='flex justify-center gap-2'
				shouldAutoFocus={true}
			/>

			<Button
				onClick={handleConfirm}
				disabled={loading || code.length < 6}
				className='w-full'
			>
				{loading ? 'Перевірка...' : 'Підтвердити'}
			</Button>
		</div>
	)
}
