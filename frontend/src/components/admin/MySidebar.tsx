'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '../UI/LogoutButton'
import { Sidebar, SidebarGroup, SidebarMenuButton } from '../UI/sidebar'
import {
	BetweenHorizontalStart,
	Blocks,
	ClipboardList,
	SunSnow,
	Tags,
} from 'lucide-react'

export default function MySidebar() {
	const pathname = usePathname()

	const count = pathname.split('/')

	const isAbleToClick = count.length > 3

	const currentClass = (path: string) => {
		const isActive = pathname.startsWith(path)
		return isActive
			? `bg-button text-button-text font-semibold ${
					isAbleToClick ? '' : 'pointer-events-none'
			  }`
			: 'border-1'
	}

	return (
		<Sidebar className='md:col-span-1'>
			<SidebarGroup title='Admin Menu'>
				<SidebarMenuButton asChild className={currentClass('/admin/orders')}>
					<Link href='/admin/orders'>
						<ClipboardList />
						Замовлення
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/products')}>
					<Link href='/admin/products'>
						<Blocks />
						Продукти
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/banners')}>
					<Link href='/admin/banners'>
						<BetweenHorizontalStart />
						Банери
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/seasons')}>
					<Link href='/admin/seasons'>
						<SunSnow />
						Сезони
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/discounts')}>
					<Link href='/admin/discounts'>
						<Tags />
						Знижки
					</Link>
				</SidebarMenuButton>
				<LogoutButton />
			</SidebarGroup>
		</Sidebar>
	)
}
