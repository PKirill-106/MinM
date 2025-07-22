import Image from 'next/image'
import '@/components/product-page/description/description.css'

export default function AboutTop() {
	return (
		<div>
			<h1 className='text-3xl font-bold mb-6'>Про нас</h1>
			<div className='flex flex-col lg:flex-row gap-10'>
				<div className='relative flex-1 aspect-square overflow-hidden rounded-lg'>
					<Image
						src='/static-footer-pages/about-image-1.jpg'
						alt='about image 1'
						fill
						className='object-cover scale-101 rounded-lg'
					/>
				</div>
				<div className='flex-1 flex flex-col gap-10 description-content '>
					<p className='text-lg md:text-lg lg:text-xl'>
						<strong>M-in-M</strong> — це більше, ніж продукція для манікюру. Це
						перевірений інструмент, який дозволяє творити з упевненістю,
						досягати професійного результату з легкістю та задоволенням. З{' '}
						<strong>2013</strong> року ми представляємо в Україні польський
						бренд професійної косметики для нігтьового сервісу — M-in-M. За
						понад десятиліття ми стали надійним партнером для майст
					</p>
					<div>
						<p className='text-accent italic font-semibold text-lg md:text-xl lg:text-xl'>
							Наш асортимент включає:
						</p>
						<ul>
							<li>Матеріали для моделювання, зміцнення та дизайну нігтів</li>
							<li>Доглядові засоби для рук і ніг</li>
							<li>Професійну продукцію для педикюру</li>
							<li>
								Лінійку HEMA & TPO free — для майстрів і клієнтів, які цінують
								безпечну косметику
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
