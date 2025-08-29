'use client'

import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type SignInFormData = {
	email: string
	password: string
}

interface SignInFormProps {
	onSuccess?: () => void
	continueAsGuest: Dispatch<SetStateAction<boolean>>
}

export default function SignInForm({
	onSuccess,
	continueAsGuest,
}: SignInFormProps) {
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>()

	const onSubmit = async (data: SignInFormData) => {
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
			onSuccess?.()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			<div className='flex flex-col md:flex-row gap-2'>
				<div className='md:max-w-xs w-full'>
					<Label htmlFor='email'>E-mail</Label>
					<Input
						id='email'
						type='email'
						placeholder='example@gmail.com'
						autoComplete='email'
						{...register('email', { required: 'Ви забули ввести e-mail' })}
					/>
					{errors.email && (
						<p className='text-sm text-accent mt-1'>{errors.email.message}</p>
					)}
				</div>
				<div className='md:max-w-xs w-full'>
					<Label htmlFor='password'>Пароль</Label>
					<div className='relative'>
						<Input
							id='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='Введіть пароль...'
							autoComplete='current-password'
							{...register('password', {
								required: 'Ви забули ввести пароль',
								minLength: { value: 8, message: 'Мінімум 8 знаків' },
							})}
						/>
						<Button
							variant='link'
							type='button'
							className='absolute right-0 top-1/2 -translate-y-1/2'
							onClick={e => {
								e.preventDefault()
								setShowPassword(!showPassword)
							}}
						>
							{showPassword ? (
								<EyeOff className='h-4 w-4' />
							) : (
								<Eye className='h-4 w-4' />
							)}
						</Button>
					</div>
					{errors.password && (
						<p className='text-sm text-accent mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-2'>
				<Button disabled={isSubmitting} className='w-full md:w-auto md:'>
					{isSubmitting ? 'Вхід...' : 'Увійти'}
				</Button>
				<Button
					variant='outline'
					className='w-full md:w-auto'
					onClick={() => continueAsGuest(true)}
				>
					Продовжити як гість
				</Button>
			</div>
		</form>
	)
}
