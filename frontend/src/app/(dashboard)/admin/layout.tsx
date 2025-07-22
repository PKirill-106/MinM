import LogoutButton from '@/components/UI/LogoutButton'
import {
	Sidebar,
	SidebarGroup,
	SidebarMenuButton,
	SidebarProvider,
} from '@/components/UI/sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	if (!session || session.user.role !== 'Admin') {
		return <p>У вас немає доступу</p>
	}

	return (
		<SidebarProvider>
			<div className='container flex gap-10 md:grid md:grid-cols-4'>
				<Sidebar className='md:col-span-1'>
					<SidebarGroup title='Admin Menu'>
						<SidebarMenuButton asChild className='border-1'>
							<Link href='/admin/products'>Продукти</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild className='p-2 border-1'>
							<Link href='/admin/seasons'>Сезони</Link>
						</SidebarMenuButton>
						<SidebarMenuButton asChild className='p-2 border-1'>
							<Link href='/admin/discounts'>Знижки</Link>
						</SidebarMenuButton>
						<LogoutButton />
					</SidebarGroup>
				</Sidebar>
				<main className='md:col-span-3'>{children}</main>
			</div>
		</SidebarProvider>
	)
}
