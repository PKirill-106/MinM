import Reason from './Reason'

export default function AboutWhyUs() {
	return (
		<div className='flex flex-col items-center text-center'>
			<h2>Чому нам довіряють?</h2>
			<div className='mt-4 md:mt-6 lg:mt-8 xl:mt-10 w-full flex flex-col md:flex-row justify-between items-center'>
				<Reason
					link='/icons/quality-icon.svg'
					text={['Висока якість', 'за справедливою ціною']}
				/>
				<Reason
					link='/icons/quick-delivery-icon.svg'
					text={[
						'Оперативна обробка замовлень',
						'та швидка доставка по Україні',
					]}
				/>
				<Reason
					link='/icons/consult-help-icon.svg'
					text={['Професійні консультації', 'та підтримка на всіх етапах']}
				/>
			</div>
		</div>
	)
}
