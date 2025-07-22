import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Авторизація | M-in-M',
	description: 'Вхід та реєстрація в особистому кабінеті M-in-M',
	icons: {
		icon: '/favicon.svg',
	},
	openGraph: {
		title: 'Авторизація | M-in-M',
		description: 'Вхід та реєстрація в особистому кабінеті M-in-M',
		images: [
			{
				url: '/M-in-M-logo_Thubnail.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
}

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
