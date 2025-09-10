import ClientProductsPage from '@/components/admin/ClientProductsPage'
import { getAllCategories } from '@/lib/services/categoryServices'
import { ICategory } from '@/types/Interfaces'

export default async function ProductsPage() {
	const categories: ICategory[] = await getAllCategories()

	const filteredCategories = categories.filter(c => c.parentCategoryId === null)

	return <ClientProductsPage categories={filteredCategories} />
}
