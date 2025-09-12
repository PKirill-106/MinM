import OrdersTable from '@/components/admin/orders/OrdersTable'
import { getAllProducts } from '@/lib/services/productServices'
import { IProduct } from '@/types/Interfaces'

export default async function OrderAdminPage() {
	const products: IProduct[] = await getAllProducts()

	return (
		<div>
			<h1 className='mb-10'>Замовлення</h1>
			<OrdersTable products={products} />
		</div>
	)
}
