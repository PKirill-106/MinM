import Modal from '@/components/UI/Modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Thumbnail from './Thumbnail'
import { IImageModal } from '../../interfaces'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

export default function ImageModal({
	isOpen,
	onClose,
	images,
	productName,
	selectedImageIndex,
	onSelect,
	onPrev,
	onNext,
}: IImageModal) {
	const swiperRef = useRef<SwiperRef>(null)

	useEffect(() => {
		if (swiperRef.current?.swiper && isOpen) {
			swiperRef.current.swiper.slideTo(selectedImageIndex)
		}
	}, [selectedImageIndex, isOpen])

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='relative flex flex-col items-center gap-4 px-4'>
				<div className='relative w-full aspect-square flex items-center justify-between text-foreground md:text-white'>
					<button
						onClick={onPrev}
						disabled={selectedImageIndex === 0}
						className={`absolute -left-5 md:-left-20 top-0 bottom-0 z-50 px-6 h-full disabled:opacity-30  ${
							selectedImageIndex !== 0 ? 'li-hover' : ''
						}`}
					>
						<ChevronLeft className='link-size' />
					</button>

					<Swiper
						ref={swiperRef}
						className='w-full aspect-square'
						slidesPerView={1}
						initialSlide={selectedImageIndex}
						onSlideChange={swiper => onSelect(swiper.activeIndex)}
					>
						{images.map((src, i) => (
							<SwiperSlide key={i}>
								<div className='relative w-full aspect-square'>
									<Image
										src={src.filePath}
										alt={`Image ${i}`}
										fill
										className='object-contain'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<button
						onClick={onNext}
						disabled={selectedImageIndex >= images.length - 1}
						className={`absolute bg-black-to-transparent -right-5 md:-right-20 top-0 bottom-0 z-20 px-6 h-full disabled:opacity-30  ${
							selectedImageIndex < images.length - 1 ? 'li-hover' : ''
						}`}
					>
						<ChevronRight className='link-size' />
					</button>
				</div>
				<div className='flex gap-2 mt-2 md:mt-3 lg:mt-4'>
					{images.map((img, i) => (
						<Thumbnail
							key={img.sequenceNumber}
							img={img.filePath}
							index={i}
							productName={productName}
							selectedImageIndex={selectedImageIndex}
							onClick={() => onSelect(i)}
							isModal={true}
						/>
					))}
				</div>
			</div>
		</Modal>
	)
}
