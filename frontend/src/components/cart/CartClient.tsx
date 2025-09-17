'use client'
import React, { Suspense } from 'react'
import CartCTA from './CartCTA'
import { IProduct } from '@/types/Interfaces'
import Loader from '../UI/Loader'
import dynamic from 'next/dynamic'

export interface ICartClient {
	products: IProduct[]
}

const CartList = dynamic(() => import('./CartList'), {
	ssr: false,
	loading: () => <Loader />,
})

export default function CartClient({ products }: ICartClient) {
	return (
		<Suspense fallback={<Loader />}>
			<div className='flex flex-col gap-6'>
				<CartList products={products} />
				<CartCTA products={products} />
			</div>
		</Suspense>
	)
}
