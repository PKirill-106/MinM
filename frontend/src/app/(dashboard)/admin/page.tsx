import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function AdminPage() {
	const session = await getServerSession(authOptions)
	if (!session || session.user.role !== 'Admin') {
		return <p>У вас немає доступу</p>
	}

	return (
		<div className=''>
			<div className='row-span-3'></div>
		</div>
	)
}
