'use client'

import EmailConfirmationForm from '@/components/EmailConfirmationForm'
import { Button } from '@/components/UI/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { codeRequest } from '@/lib/services/emailServices'
import { signUpUser } from '@/lib/services/userServices'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type SignUpForm = {
	email: string
	password: string
	confirmPassword: string
}

export default function SignUpPage() {
	const router = useRouter()
	const [passwordError, setPasswordError] = useState<string | null>(null)
	const [showEmailConfirm, setShowEmailConfirm] = useState<boolean>(false)
	const [emailToken, setEmailToken] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignUpForm>()

	const onSubmit = async (data: SignUpForm) => {
		setPasswordError(null)
		if (data.password !== data.confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'Паролі не збігаються',
			})
			return
		}

		try {
			await signUpUser({
				email: data.email,
				password: data.password,
			})
			toast.success('Обліковий запис створено')

			const { token } = await codeRequest(data.email)
			setEmailToken(token)
			setShowEmailConfirm(true)
		} catch (err: any) {
			const msg = 'Помилка реєстрації'
			toast.error(msg)

			if (msg.includes('Цей email вже зареєстрований')) {
				setError('email', {
					type: 'manual',
					message: msg,
				})
			} else if (msg.includes('Пароль повинен містити')) {
				setPasswordError(msg)
			} else {
				setError('root', {
					type: 'manual',
					message: msg,
				})
			}
		}
	}

	return (
		<div className='container flex justify-center'>
			{showEmailConfirm ? (
				<EmailConfirmationForm
					email={watch('email')}
					token={emailToken!}
					onSuccess={async () => {
						const result = await signIn('credentials', {
							redirect: false,
							email: watch('email'),
							password: watch('password'),
						})

						if (result?.error) {
							setError('root', {
								type: 'manual',
								message: 'Помилка входу після реєстрації',
							})
							toast.error('Помилка реєстрації та входу!')
						} else {
							toast.success('Успішна реєстрація та вхід!')
							router.push('/profile')
						}
					}}
				/>
			) : (
				<Card className='w-full max-w-md shadow-lg'>
					<CardHeader>
						<CardTitle className='text-center text-2xl text-foreground'>
							Реєстрація нового користувача
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-4 text-foreground'
						>
							<div>
								<Label htmlFor='email'>E-mail</Label>
								<Input
									id='email'
									type='email'
									placeholder='example@gmail.com'
									autoComplete='email'
									{...register('email', {
										required: 'Ви забули ввести e-mail',
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: 'Невірний формат e-mail',
										},
									})}
								/>
								{errors.email && (
									<p className='text-sm text-accent mt-1'>
										{errors.email.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor='password'>Пароль</Label>
								<Input
									id='password'
									type='password'
									placeholder='Введіть пароль...'
									autoComplete='current-password'
									{...register('password', {
										required: 'Ви забули ввести пароль',
										minLength: {
											value: 8,
											message:
												'Має містити: мінімум 8 символів, 1 цифру, 1 велику літеру, 1 спецсимвол',
										},
										onChange: () => setPasswordError(null),
									})}
								/>
								<p
									className={`text-xs mt-1 ${
										errors.password && !passwordError
											? 'text-accent'
											: 'text-transparent-text'
									}`}
								>
									Має містити: мінімум 8 символів, 1 цифру, 1 велику літеру, 1
									спецсимвол
								</p>
							</div>
							<div>
								<Label htmlFor='confirmPassword'>Підтвердіть пароль</Label>
								<Input
									id='confirmPassword'
									type='password'
									placeholder='Введіть пароль ще раз)'
									{...register('confirmPassword', {
										required: 'Будь ласка, підтвердіть пароль',
										validate: value =>
											value === watch('password') || 'Паролі не збігаються',
									})}
								/>
								{errors.confirmPassword && (
									<p className='text-sm text-accent mt-1'>
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='w-full cursor-pointer bg-foreground hover:bg-accent hover:text-white-text'
							>
								{isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
							</Button>
						</form>
						<p className='text-sm text-center mt-4 text-muted-foreground'>
							Вже маєте акаунт?{' '}
							<Link
								href='/sign-in'
								className='text-foreground hover:text-accent underline underline-offset-2 duration-200'
							>
								Увійти
							</Link>
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
