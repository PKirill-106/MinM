import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Співпраця | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description:
		'Пропозиції співпраці для магазинів, блогерів та партнерів. Станьте частиною команди M in M Nails',
	openGraph: {
		title: 'Співпраця | M in M',
		description:
			'Запрошуємо до співпраці магазини, блогерів та інших партнерів у сфері нігтьового сервісу',
	},
	alternates: {
		canonical: '/cooperation',
	},
	keywords: ['співпраця', 'партнерство', 'оптом', 'блогерам', 'магазинам'],
}


export default function Cooperation() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Співпраця</h1>
			<p>
				Ми відкриті до співпраці з магазинами, блогерами та іншими партнерами.
				Зв'яжіться з нами, щоб обговорити можливості співпраці.
			</p>
		</section>
	)
}
