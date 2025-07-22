import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Політика конфіденційності | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description:
		'Як ми збираємо, використовуємо та захищаємо ваші персональні дані',
	openGraph: {
		title: 'Політика конфіденційності | M in M',
		description: 'Захист персональних даних у інтернет-магазині M in M',
	},
	alternates: {
		canonical: '/privacy-policy',
	},
}

export default function PrivacyPolicy() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Політика конфіденційності</h1>
			<p>
				Ми дбаємо про безпеку ваших даних. Ознайомтесь із тим, як ми збираємо,
				обробляємо та захищаємо вашу інформацію.
			</p>
		</section>
	)
}
