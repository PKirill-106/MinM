'use client'
import React from 'react'
import Logo from '../UI/Logo'
import Button from '../UI/MyButton'
import Link from 'next/link'
import CategoryList from '@/components/category-lists/CategoryList'
import { ICategory } from '@/types/Interfaces'

export default function Footer({ categories }: { categories: ICategory[] }) {
	const year: number = new Date().getFullYear()

	return (
		<section className='bg-foreground text-white section pb-8'>
			<div className='container'>
				<div className='flex flex-wrap md:grid-cols-3 gap-4 md:gap-8 justify-between'>
					<div className='flex-1 flex flex-col gap-7 '>
						<Logo width={160} height={80} isFooter={true} />
						<div className='flex flex-col gap-3'>
							<p>Пн-Пт: з 10:00 до 19:00</p>
							<h2>
								<a
									href='tel:+380935412030'
									className='hover-active-text transition'
								>
									093 541 20 30
								</a>
							</h2>
							<p>
								<a
									href='mailto:m.in.m.nails@gmail.com'
									className='hover-active-text transition'
								>
									m.in.m.nails@gmail.com
								</a>
							</p>
						</div>

						<Button
							text={'INSTAGRAM'}
							variant='instagram'
							href='https://www.instagram.com/minmchik_/'
						/>
					</div>
					<div className='flex-1 hidden md:block'>
						<h1>Каталог</h1>
						<CategoryList
							categories={categories}
							className='flex flex-col gap-5 py-4 font-light text-sm md:text-base lg:text-lg xl:text-xl'
							isFooter={true}
						/>
					</div>
					<div className='flex-1'>
						<h1>M in M</h1>
						<ul className='flex flex-col gap-5 py-4 font-light text-sm md:text-base lg:text-lg xl:text-xl'>
							<li className='li-hover'>
								<Link href='/cooperation'>Співпраця</Link>
							</li>
							<li className='li-hover'>
								<Link href='/shipping-payment'>Доставка і оплата</Link>
							</li>
							<li className='li-hover'>
								<Link href='/about'>Про нас</Link>
							</li>
							<li className='li-hover'>
								<Link href='/returns'>Обмін та повернення</Link>
							</li>
							<li className='li-hover'>
								<Link href='/offer-agreement'>Договір оферти</Link>
							</li>
							<li className='li-hover'>
								<Link href='/privacy-policy'>Політика конфіденційності</Link>
							</li>
							<li className='li-hover'>
								<Link href='/contacts'>Контакти</Link>
							</li>
						</ul>
					</div>
				</div>
				<p className='text-xs lg:text-sm xl:text-base mt-15'>
					© {year} “M-in-M” — український виробник гель-лакових систем
				</p>
			</div>
		</section>
	)
}
