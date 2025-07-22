'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'


const banners = [
	{ id: 1, color: '#111', text: 'Banner 1' },
	{ id: 2, color: '#222', text: 'Banner 2' },
	{ id: 3, color: '#333', text: 'Banner 3' },
	{ id: 4, color: '#444', text: 'Banner 4' },
]

export default function BannerSlider() {

	return (
		<section className='relative mt-6 w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-md'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{ clickable: true }}
				autoplay={{ delay: 4000 }}
				loop
				className='w-full h-90 md:h-125'
			>
				{banners.map(banner => (
					<SwiperSlide key={banner.id}>
						<div
							className='flex flex-col items-center justify-center w-full h-full text-white'
							style={{ backgroundColor: banner.color }}
						>
							<h2 className='text-xl md:text-2xl font-semibold'>
								{banner.text}
							</h2>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
