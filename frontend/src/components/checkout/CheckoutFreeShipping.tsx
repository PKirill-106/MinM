import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'

interface ICheckoutFreeShipping {
	cartTotal: number
}

export default function CheckoutFreeShipping({
	cartTotal,
}: ICheckoutFreeShipping) {
	return (
		<Card className='w-full shadow-lg'>
			<CardContent className='space-y-6'>
				<p className='font-semibold text-sm md:text-base lg:text-xl'>
					{cartTotal >= 1500 ? (
						'Вітаємо! Ваше замовлення вже відповідає вимогам для безкоштовної доставки!'
					) : (
						<span>
							Замовте ще на{' '}
							<span className='text-accent'>{1500 - cartTotal} грн</span>, щоб
							отримати безкоштовну доставку!
						</span>
					)}{' '}
					<Link
						href='/catalog'
						className='underline text-accent hover:text-accent/70 active:text-accent/70 duration-200'
					>
						Продовжити покупки
					</Link>
				</p>
			</CardContent>
		</Card>
	)
}
