import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Обмін та повернення | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description: 'Умови повернення та обміну товарів у інтернет-магазині M in M',
	openGraph: {
		title: 'Обмін та повернення | M in M',
		description: '14 днів на повернення товару. Умови та процедура повернення',
	},
	alternates: {
		canonical: '/returns',
	},
}

export default function Returns() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Обмін та повернення</h1>
			<p>
				Ви можете повернути або обміняти товар протягом 14 днів з моменту
				отримання. Товар повинен бути в оригінальному стані.
			</p>
		</section>
	)
}
