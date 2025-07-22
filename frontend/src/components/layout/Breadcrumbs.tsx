'use client'

import { IBreadcrumbs } from '@/types/Interfaces'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Breadcrumbs({ categories, products }: IBreadcrumbs) {
	const pathname = usePathname()
	const pathSegments = pathname.split('/').filter(Boolean)
	const isHomePage = pathname === '/'
	const [isNotFound, setIsNotFound] = useState(false)

	const STATIC_ROUTES: Record<string, string> = {
		cooperation: 'Співпраця',
		'shipping-payment': 'Доставка і Оплата',
		about: 'Про нас',
		returns: 'Обмін та повернення',
		'offer-agreement': 'Договір оферти',
		'privacy-policy': 'Політика конфіденційності',
		contacts: 'Контакти',
		profile: 'Мій профіль',
		favorites: 'Обране',
		cart: 'Кошик',
		checkout: 'Оформлення',
		'sign-in': 'Вхід',
		'sign-up': 'Реєстрація',
		catalog: 'Каталог',
		product: 'Продукт',
	}

	const findOriginalName = (slug: string): string | null => {
		// static routes
		if (STATIC_ROUTES[slug]) return STATIC_ROUTES[slug]

		// dynamic routes(categories, products)
		const match =
			categories.find(c => c.slug === slug) ||
			products.find(p => p.slug === slug)
		return match ? match.name : null
	}
	// check if user is currently on not-found(404) page
	useEffect(() => {
		fetch(pathname, { method: 'HEAD' })
			.then(response => {
				if (response.status === 404) {
					setIsNotFound(true)
				} else {
					setIsNotFound(false)
				}
			})
			.catch(() => setIsNotFound(true)) // If the request failed, consider that 404
	}, [pathname])

	if (isHomePage)
		return <section className='mt-18 md:mt-19 lg:mt-24 xl:mt-26'></section>

	return (
		<section className='px-2 lg:px-15 xl:px-30 mt-21 md:mt-23 lg:mt-28 xl:mt-30'>
			<div className='container overflow-x-auto whitespace-nowrap'>
				<div className='flex items-center gap-2 text-transparent-text '>
					<Link href='/'>
						<Home className='h-5 w-5 text-accent hover:text-pink-600 hover:scale-125 ease-out duration-300 transition-all' />
					</Link>

					{pathSegments.length > 0 && !isNotFound ? (
						pathSegments.map((segment, index) => {
							const href = '/' + pathSegments.slice(0, index + 1).join('/')
							const isLast = index === pathSegments.length - 1
							const originalName = findOriginalName(segment)

							return (
								<div key={href} className='flex items-center gap-2'>
									<span>{'>'}</span>
									{isLast ? (
										<span className='capitalize'>
											{originalName || decodeURIComponent(segment)}
										</span>
									) : (
										<Link
											href={href}
											className='hover:text-accent hover:scale-110 ease-out duration-300 transition-all capitalize'
										>
											{originalName || decodeURIComponent(segment)}
										</Link>
									)}
								</div>
							)
						})
					) : (
						// if page is not found
						<span className='text-transparent-text'>
							{'>'} Сторінку не знайдено
						</span>
					)}
				</div>
			</div>
		</section>
	)
}
