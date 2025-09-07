import { Metadata } from 'next'
import Image from 'next/image'
import '@/components/product-page/description/description.css'

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
			<div className='flex flex-col lg:grid lg:grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6'>
				{/* Image */}
				<div>
					<div className='relative aspect-video'>
						<Image
							src='/shipping-payment.png'
							alt=''
							fill
							className='object-cover object-center-top rounded-md'
							style={{ objectPosition: 'center 40%' }}
						/>
					</div>
					<Image
						src='/payment-logos.svg'
						alt=''
						width={370}
						height={60}
						className='object-contain rounded-md'
					/>
				</div>

				{/* Delivery */}
				<div className='space-y-2'>
					<h2>Доставка</h2>
					<div className='flex flex-col space-y-4 lg:space-y-2'>
						<span className='text-xs md:text-sm lg:text-base'>
							Зазвичай доставка займає 2-3 робочих дні. Точну дату доставки
							товару ви дізнаєтесь з смс повідомлення додатку Нової пошти.
						</span>
						<span className='m-0 text-xs md:text-sm lg:text-base'>
							<strong>Доставка по Україні</strong> відбувається за допомогою
							служби Нова Пошта.
						</span>
						<div className='description-content m-0! p-0!'>
							<ul>
								<li>
									Вартість доставки розраховується згідно тарифів сервісу
									доставки.
								</li>
								<li>Доставка по Україні від 1500грн безкоштовна.</li>
							</ul>
						</div>
						<div className='flex flex-col'>
							<span className='text-xs md:text-sm lg:text-base'>
								MinM не робить відправлення закордон.
							</span>
							<span className='text-xs md:text-sm lg:text-base'>
								Ми не відправляємо перевізниками.
							</span>
							<span className='text-xs md:text-sm lg:text-base'>
								Ми не підписуємо коробки для перевізників.
							</span>
						</div>
					</div>
				</div>

				{/* Payment */}
				<div className='space-y-2'>
					<h2>Оплата</h2>
					<div className='flex flex-col space-y-4 lg:space-y-2'>
						<span className='text-xs md:text-sm lg:text-base'>
							Оплата може здійснюватись через онлайн сервіс Portmone, або на
							розрахунковий рахунок. Якщо Ви вибираєте оплату на розрахунковий
							рахунок, з Вами зв'яжеться менеджер на рахунок замовлення і
							оплати. Оплата через сервіс Portmone здійснюється автоматично.
						</span>
						<span className='text-xs md:text-sm lg:text-base'>
							Доставка товару можлива тільки після підтвердження платежу.
						</span>
						<span className='text-xs md:text-sm lg:text-base'>
							У графі Оплата вам потрібно вибрати «Платіжна система» або «Оплата
							на рахунок».
						</span>
						<span className='text-xs md:text-sm lg:text-base'>
							Відправляємо продукцію тільки по території України.
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}
