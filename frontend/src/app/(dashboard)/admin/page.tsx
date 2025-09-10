import AdminPagesLink from '@/components/admin/AdminPagesLink'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function AdminPage() {
	const session = await getServerSession(authOptions)
	if (!session || session.user.role !== 'Admin') {
		return <p>У вас немає доступу</p>
	}

	return (
		<div className='container'>
			<h1 className='mb-10'>Адмін панель</h1>

			<div className='flex gap-6 md:grid md:grid-cols-4'>
				<AdminPagesLink
					title='Замовлення'
					imgLink='/admin/orders.svg'
					pageLink='/admin/orders'
				/>
				<AdminPagesLink
					title='Продукти'
					imgLink='/admin/products.svg'
					pageLink='/admin/products'
				/>
				<AdminPagesLink
					title='Банери'
					imgLink='/admin/banners.svg'
					pageLink='/admin/banners'
				/>
				<AdminPagesLink
					title='Сезони'
					imgLink='/admin/seasons.svg'
					pageLink='/admin/seasons'
				/>
				<AdminPagesLink
					title='Знижки'
					imgLink='/admin/discounts.svg'
					pageLink='/admin/discounts'
				/>
			</div>
		</div>
	)
}
