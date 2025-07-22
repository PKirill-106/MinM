'use client'

import { Button } from '@/components/UI/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type SignInForm = {
	email: string
	password: string
}

export default function SignInPage() {
	const router = useRouter()
	const { data: session, status } = useSession()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInForm>()

	useEffect(() => {
		if (status === 'authenticated') {
			const role = session?.user?.role
			if (role === 'Admin') {
				router.replace('/admin')
			} else {
				router.replace('/profile')
			}
		}
	}, [session, status, router])

	const onSubmit = async (data: SignInForm) => {
		const result = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		})

		if (result?.error) {
			console.log(result.error)
			toast.error('Упс.. Сталася помилка')
		} else {
			toast.success('Вхід успішний!')
		}
	}

	return (
		<div className='container flex justify-center items-center'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader>
					<CardTitle className='text-center text-2xl text-foreground'>
						Вхід до особистого кабінету
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
								{...register('email', { required: 'Ви забули ввести e-mail' })}
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
										message: 'Мінімум 8 знаків',
									},
								})}
							/>
							{errors.password && (
								<p className='text-sm text-accent mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							type='submit'
							disabled={isSubmitting}
							className='w-full cursor-pointer bg-foreground hover:bg-accent hover:text-white-text'
						>
							{isSubmitting ? 'Вхід...' : 'Увійти'}
						</Button>
					</form>
					<p className='text-sm text-center mt-4 text-muted-foreground'>
						Ще не маєте акаунта?{' '}
						<Link
							href='/sign-up'
							className='text-foreground hover:text-accent underline underline-offset-2 duration-200'
						>
							Зареєструватись
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
