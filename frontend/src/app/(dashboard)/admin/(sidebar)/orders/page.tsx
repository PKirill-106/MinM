import OrdersTable from '@/components/admin/orders/OrdersTable'

export default async function OrderAdminPage() {
	return (
		<div>
			<h1 className='mb-10'>Замовлення</h1>
			<OrdersTable />
		</div>
	)
}
