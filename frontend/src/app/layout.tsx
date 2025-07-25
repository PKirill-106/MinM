import type { Metadata, Viewport } from 'next'
import { Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { getAllCategories } from '@/lib/services/categoryServices'
import { ICategory, IProduct } from '@/types/Interfaces'
import { getAllProducts } from '@/lib/services/productServices'
import { Toaster } from 'react-hot-toast'
import CookiesConsent from '@/components/layout/CookiesConsent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AuthSessionProvider from '@/providers/SessionProvider'
import { FavoritesProvider } from '@/providers/FavoritesProvider'
import SessionHandler from '@/components/SessionHandler'
import CartProvider from '@/providers/CartProvider'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	metadataBase: new URL('http://localhost:3000'),
	icons: {
		icon: '/favicon.svg',
	},
	title: 'M in M | Професійна нігтьова продукція',
	description:
		'Інтернет-магазин професійних гель-лаків, баз, топів, гелів для нарощування та аксесуарів для манікюру. Якісна продукція для нігтів.',
	keywords: [
		'гель лаки',
		'бази для манікюру',
		'топи для нігтів',
		'гелі для нарощування',
		'професійна нігтьова продукція',
		'M in M Nails',
		'магазин для нігтьового сервісу',
		'український бренд манікюру',
		'польський бренд манікюру',
		'якісні матеріали для нігтів',
		'інструменти для майстрів манікюру',
		'M in M',
		'M-in-M',
		'MinM',
		'minm',
		'm-in-m',
	],
	openGraph: {
		title: 'M in M | Професійна нігтьова продукція',
		description:
			'Купити якісні гель-лаки, бази, топи та гелі для нарощування нігтів у інтернет-магазині M in M Nails',
		images: [
			{
				url: '/M-in-M-logo_Thubnail.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
}

export const viewport: Viewport = {
	colorScheme: 'light',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const categories: ICategory[] = await getAllCategories()
	const products: IProduct[] = await getAllProducts()
	const session = await getServerSession(authOptions)

	return (
		<html lang='ua' className='h-full'>
			<body
				className={`${montserrat.variable} ${roboto.variable} min-h-screen antialiased`}
			>
				<AuthSessionProvider session={session}>
					<CartProvider>
						<FavoritesProvider>
							<SessionHandler />
							<Navbar categories={categories} products={products} />
							<Breadcrumbs categories={categories} products={products} />
							<Toaster position='top-center' />
							{/* ТУТ Сдвиг */}
							<main className='main-section flex-1'>{children}</main>
							<Footer categories={categories} />
							<CookiesConsent />
						</FavoritesProvider>
					</CartProvider>
				</AuthSessionProvider>
			</body>
		</html>
	)
}
