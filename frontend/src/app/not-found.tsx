import Link from 'next/link'

export default function NotFound() {
	return (
		<section className='flex h-full items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-7xl font-bold'>404</h1>
				<p className='mt-5 text-lg'>Сторінку не знайдено</p>
				<Link
					href='/'
					className='mt-6 inline-block text-accent hover:underline active:underline'
				>
					Повернутися на головну
				</Link>
			</div>
		</section>
	)
}
