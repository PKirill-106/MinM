import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Доставка і оплата | M in M',
	icons: {
		icon: '/favicon.svg',
	},
	description: 'Умови доставки та способи оплати в інтернет-магазині M in M',
	openGraph: {
		title: 'Доставка і оплата | M in M',
		description:
			"Доставка Новою Поштою, кур'єром або самовивіз. Оплата карткою або при отриманні",
	},
}

export default function ShippingPayment() {
	return (
		<section className='container py-10'>
			<h1 className='text-3xl font-bold mb-6'>Доставка і оплата</h1>
			<p>Ми пропонуємо різні способи доставки:</p>
			<ul className='list-disc ml-5'>
				<li>Нова Пошта</li>
				<li>Кур'єрська доставка</li>
				<li>Самовивіз</li>
			</ul>
			<p className='mt-4'>Оплата можлива через:</p>
			<ul className='list-disc ml-5'>
				<li>Картку банку</li>
				<li>Оплату при отриманні</li>
			</ul>
		</section>
	)
}
