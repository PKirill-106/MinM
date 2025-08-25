import { Metadata } from 'next'
import Link from 'next/link'

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
			<div className='space-y-4'>
				<h3>
					У разі потреби ви можете обміняти або повернути товар, придбаний в
					інтернет-магазині{' '}
					<Link
						href='https://m-in-m.com.ua'
						className='text-accent hover:text-accent-text active:text-accent-text duration-200'
					>
						https://m-in-m.com.ua
					</Link>
					, не пізніше ніж за 14 календарних днів з моменту його отримання
					(відповідно до Закону України «Про захист прав споживачів» від
					12.05.1991 №1023-XII ), за умови що товар не був у використанні,
					збереження його товарного вигляду, комплектності, цілісності упаковки
					та наявності чека нашого магазину.
				</h3>
				<h3>
					Повернути або обміняти товар упродовж строку, встановленого Законом
					України "Про захист прав споживачів". Для цього достатньо зв'язатися з
					менеджером, зателефонувавши вказаних у контактах. Ви отримаєте
					вичерпну відповідь, як ви можете зробити повернення товару.
				</h3>
			</div>
		</section>
	)
}
