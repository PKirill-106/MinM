'use client'

import clsx from 'clsx'
import { IProfileTab } from './interfaces'
import { ShoppingCart, User } from 'lucide-react'

export default function ProfileTab({ activeTab, setActiveTab }: IProfileTab) {
	return (
		<div className='flex gap-8 justify-center border-b pb-2'>
			<button
				onClick={() => setActiveTab('profile')}
				className={clsx(
					'w-full flex items-center justify-center gap-2 pb-1 border-b-1 border-transparent-text li-hover font-light',
					activeTab === 'profile' && 'border-b-2 border-foreground font-medium'
				)}
			>
				<User strokeWidth={activeTab === 'profile' ? 2 : 1} />
				<p>Мій профіль</p>
			</button>
			<button
				onClick={() => setActiveTab('orders')}
				className={clsx(
					'w-full flex items-center justify-center gap-2 pb-1 border-b-1 border-transparent-text li-hover font-light',
					activeTab === 'orders' && 'border-b-2 border-foreground font-medium'
				)}
			>
				<ShoppingCart strokeWidth={activeTab === 'orders' ? 2 : 1} />
				<p>Історія замовлень</p>
			</button>
		</div>
	)
}
