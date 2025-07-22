import Button from '@/components/UI/MyButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Контакти | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	openGraph: {
		title: 'Контакти | M in M',
	},
}

export default function Contacts() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Контакти</h1>
			<div className='space-y-6 text-lg'>
				<div className='items-center md:items-baseline flex flex-col gap-3'>
					<p>Пн-Пт: з 10:00 до 19:00</p>
					<h2>
						<a
							href='tel:+380935412030'
							className='hover-active-text transition'
						>
							093 541 20 30
						</a>
					</h2>
					<p>
						<a
							href='mailto:m.in.m.nails@gmail.com'
							className='hover-active-text transition'
						>
							m.in.m.nails@gmail.com
						</a>
					</p>
				</div>

				{/* Instagram */}
				<Button
					text={'INSTAGRAM'}
					variant='instagram'
					href='https://www.instagram.com/minmchik_/'
					className='w-full md:w-auto'
				/>
			</div>
		</section>
	)
}
