import AdminPagesLink from '@/components/admin/AdminPagesLink'
import LogoutButton from '@/components/UI/LogoutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function AdminPage() {
	const session = await getServerSession(authOptions)
	if (!session || session.user.role !== 'Admin') {
		return <p>У вас немає доступу</p>
	}

	return (
		<div className='container space-y-10'>
			<h1 className=''>Адмін панель</h1>

			<div className='gap-6 grid grid-cols-2 md:grid-cols-4'>
				<AdminPagesLink
					title='Замовлення'
					imgLink='/admin/icons_orders.svg'
					pageLink='/admin/orders'
				/>
				<AdminPagesLink
					title='Продукти'
					imgLink='/admin/icons_products.svg'
					pageLink='/admin/products'
				/>
				<AdminPagesLink
					title='Банери'
					imgLink='/admin/icons_banners.svg'
					pageLink='/admin/banners'
				/>
				<AdminPagesLink
					title='Сезони'
					imgLink='/admin/icons_seasons.svg'
					pageLink='/admin/seasons'
				/>
				<AdminPagesLink
					title='Знижки'
					imgLink='/admin/icons_discounts.svg'
					pageLink='/admin/discounts'
				/>
				<LogoutButton
					className='bg-foreground text-background w-full h-full flex-col gap-4 text-xs/5 sm:text-base/5 md:text-lg/5 xl:text-xl/6'
					iconClassName='size-8 lg:size-16'
				/>
			</div>
		</div>
	)
}
