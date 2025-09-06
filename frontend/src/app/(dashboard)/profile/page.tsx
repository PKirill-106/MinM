import ClientProfile from '@/components/profile/ClientProfile'
import { getAllProducts } from '@/lib/services/productServices'
import { IProduct } from '@/types/Interfaces'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const session = await getServerSession()

	if (!session) {
		return redirect('/sign-in')
	}

	const products: IProduct[] = await getAllProducts()

	return (
		<div className='container'>
			<ClientProfile products={products} />
		</div>
	)
}
