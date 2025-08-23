'use client'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IBannerClientPage } from '@/types/Interfaces'
import 'swiper/css'
import 'swiper/css/pagination'
import { Button } from './UI/button'
import Link from 'next/link'
import type { Swiper as SwiperType } from 'swiper'
import { useRef } from 'react'

export default function BannerSlider({ banners }: IBannerClientPage) {
	const swiperRef = useRef<SwiperType | null>(null)

	return (
		<section className='relative mt-6 w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-md'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{ clickable: true }}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				loop
				onSwiper={swiper => (swiperRef.current = swiper)}
				className='w-full h-90 md:h-125'
				onMouseEnter={() => swiperRef.current?.autoplay.stop()}
				onMouseLeave={() => swiperRef.current?.autoplay.start()}
			>
				{banners.map(banner => (
					<SwiperSlide key={banner.imageURL}>
						<div
							className='flex flex-col items-center justify-end w-full h-full text-white'
							style={{
								backgroundImage: `url(${banner.imageURL})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div>
								{banner.buttonText ? (
									<div className='relative mb-15 md:mb-17 lg:md-20 text-center justify-baseline items-center space-y-4'>
										<div className='p-2 absolute inset-0 bg-black/25 blur-3xl rounded-lg -m-2' />
										<h2
											className='max-w-sm md:max-w-lg lg:max-w-xl relative z-10 text-white !font-bold px-4 py-2'
											style={{ fontFamily: 'var(--font-heading)' }}
										>
											{banner.text}
										</h2>
										<Link href={banner.pageURL} className='relative z-10'>
											<Button className='p-6 md:p-7 text-md md:text-lg'>
												{banner.buttonText}
											</Button>
										</Link>
									</div>
								) : (
									<div className='relative mb-15 md:mb-17 lg:md-20 text-center justify-baseline items-center space-y-4'>
										<div className='p-2 absolute inset-0 bg-black/25 blur-3xl rounded-lg -m-2' />
										<Link href={banner.pageURL}>
											<h2
												className='max-w-sm md:max-w-lg lg:max-w-xl relative z-10 text-white !font-bold px-4 py-2 hover:underline'
												style={{ fontFamily: 'var(--font-heading)' }}
											>
												{banner.text}
											</h2>
										</Link>
									</div>
								)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
