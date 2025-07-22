import Image from 'next/image'
import '@/components/product-page/description/description.css'

export default function AboutMiddle() {
	return (
		<div className='flex flex-col lg:flex-row gap-10'>
			<div className='relative flex-1 aspect-square overflow-hidden rounded-lg lg:order-2'>
				<Image
					src='/static-footer-pages/about-image-2.jpg'
					alt='about image 1'
					fill
					className='object-cover scale-101 rounded-lg'
				/>
			</div>
			<div className='flex-1 flex flex-col gap-10 description-content lg:order-1'>
				<div>
					<p className='text-accent italic font-semibold text-lg md:text-xl lg:text-xl'>
						У чому сила M-in-M?
					</p>
					<ul>
						<li>
							Стабільність у роботі — матеріали лягають рівно та передбачувано
						</li>
						<li>Ідеальна консистенція — легко наносити, комфортно працювати</li>
						<li>
							Сучасні формули — трендові відтінки, міцність, блиск і
							гіпоалергенність
						</li>
						<li>
							Ретельний контроль якості — кожен продукт проходить перевірку
							перед потраплянням до ваших рук
						</li>
					</ul>
				</div>
				<div className='flex-1 flex flex-col gap-10 description-content '>
					<div>
						<p className='text-accent italic font-semibold text-lg md:text-xl lg:text-xl'>
							Ми працюємо з усіма сегментами ринку:
						</p>
						<ul>
							<li>Індивідуальні майстри та салони краси</li>
							<li>Дистриб’ютори та навчальні центри</li>
							<li>
								Бренди, що бажають створити власну лінійку під private label — з
								гнучкими умовами співпраці та технологічним супроводом
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
