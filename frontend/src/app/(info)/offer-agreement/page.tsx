import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Договір оферти | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description: 'Публічний договір оферти інтернет-магазину M in M Nails',
	openGraph: {
		title: 'Договір оферти | M in M',
		description: 'Офіційні умови покупки товарів у нашому інтернет-магазині',
	},
	alternates: {
		canonical: '/offer-agreement',
	},
}


export default function OfferAgreement() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Договір оферти</h1>
			<p>
				Цей договір визначає правила покупки товарів в нашому інтернет-магазині.
				Будь ласка, уважно ознайомтеся перед замовленням.
			</p>
		</section>
	)
}
