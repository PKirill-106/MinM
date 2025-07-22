import DiscountPageClient from '@/components/admin/discount/DiscountPageClient'
import { getAllDiscounts } from '@/lib/services/discountServices'
import { getAllProducts } from '@/lib/services/productServices'
import React from 'react'

export default async function page() {
	const discounts = await getAllDiscounts()
	const products = await getAllProducts()

	return (
		<div>
			<h1 className='mb-10'>Знижки</h1>

			<DiscountPageClient discounts={discounts} products={products} />
		</div>
	)
}
