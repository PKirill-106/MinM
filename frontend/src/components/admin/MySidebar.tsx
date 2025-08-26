'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '../UI/LogoutButton'
import { Sidebar, SidebarGroup, SidebarMenuButton } from '../UI/sidebar'

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
				<SidebarMenuButton asChild className={currentClass('/admin/products')}>
					<Link href='/admin/products'>Продукти</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/banners')}>
					<Link href='/admin/banners'>Банери</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/seasons')}>
					<Link href='/admin/seasons'>Сезони</Link>
				</SidebarMenuButton>
				<SidebarMenuButton asChild className={currentClass('/admin/discounts')}>
					<Link href='/admin/discounts'>Знижки</Link>
				</SidebarMenuButton>
				<LogoutButton />
			</SidebarGroup>
		</Sidebar>
	)
}
