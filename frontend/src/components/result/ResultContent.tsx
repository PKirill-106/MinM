'use client'
import { IResultContent } from '@/types/Interfaces'
import { CircleCheckBig, CircleX, ClipboardCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../UI/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ResultContent({
	description,
	orderNumber,
	orderStatus,
}: IResultContent) {
	const { status } = useSession()
	const router = useRouter()

	return (
		<div className='flex flex-col items-center gap-12 md:gap-16 lg:gap-20 px-3 md:px-4 lg:px-5 w-full'>
			{orderStatus === 'Created' ? (
				<ClipboardCheck className='size-20 md:size-30 lg:size-40 text-gray-500' />
			) : orderStatus === 'Paid' ? (
				<CircleCheckBig className='size-20 md:size-30 lg:size-40 text-green-600' />
			) : (
				orderStatus === 'Failed' && (
					<CircleX className='size-20 md:size-30 lg:size-40 text-red-600' />
				)
			)}

			<div className='space-y-12 md:space-y-16 lg:space-y-20 w-full'>
				<div className='flex flex-col items-center gap-4'>
					{description && <h2 className='mb-2 text-gray-600'>{description}</h2>}
					{orderStatus !== 'Failed' ? (
						<span className='text-sm md:text-base'>
							Номер замовлення <span className='font-bold'>№{orderNumber}</span>
							.
						</span>
					) : (
						orderStatus === 'Failed' && (
							<span className='text-sm md:text-base'>
								Сталася помилка при оплаті замовлення{' '}
								<span className='font-bold'>№{orderNumber}</span>.
							</span>
						)
					)}

					{orderStatus === 'Created' ? (
						<>
							<h1 className='text-2xl font-bold text-gray-500'>
								Замовлення створено
							</h1>
							<span className='text-center text-sm md:text-base'>
								Після підтвердження менеджером наявності всіх позицій, буде
								відправлено номер рахунку для оплати замовлення.
							</span>
						</>
					) : orderStatus === 'Paid' ? (
						<h1 className='text-2xl font-bold text-green-600'>
							Оплата успішна
						</h1>
					) : (
						orderStatus === 'Failed' && (
							<h1 className='text-2xl font-bold text-red-600'>
								Оплата не виконана
							</h1>
						)
					)}
				</div>
				<div className='flex flex-col w-full gap-4'>
					<Button
						variant='outline'
						onClick={() => router.replace('/')}
						className='w-full'
					>
						На головну
					</Button>
					{orderStatus !== 'Failed' && status === 'authenticated' ? (
						<Button
							onClick={() => router.replace('/profile?tab=orders')}
							className='w-full'
						>
							Історія замовлень
						</Button>
					) : orderStatus === 'Failed' ? (
						<Link href='/checkout' replace>
							<Button
								onClick={() => router.replace('/checkout')}
								className='w-full'
							>
								Оформлення замовлення
							</Button>
						</Link>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}
