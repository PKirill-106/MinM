import MySidebar from '@/components/admin/MySidebar'
import {
	SidebarProvider
} from '@/components/UI/sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
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
				<MySidebar />
				<main className='md:col-span-3'>{children}</main>
			</div>
		</SidebarProvider>
	)
}
