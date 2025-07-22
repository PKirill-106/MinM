'use client'

import { Button } from '@/components/UI/button'
import { useCategoryManagement } from '@/hooks/useCategoryManagement'
import { useProductManagement } from '@/hooks/useProductManagement'
import { ICategory, IProduct, IProductColor } from '@/types/Interfaces'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ProductSearch from './ProductSearch'
import ProductPagination from './ProductPagination'
import Product from './modal/category-modal/Product'
import ProductModal from './modal/product-modal/ProductModal'
import CategoryModal from './modal/category-modal/CategoryModal'
import Subcategory from './modal/category-modal/Subcategory'

interface Props {
	activeCategory: ICategory
	products: IProduct[]
	categories: ICategory[]
	subcategories: ICategory[]
	colors: IProductColor[]
}

export default function CategoryProductsClient({
	activeCategory,
	products,
	categories,
	subcategories,
	colors,
}: Props) {
	const { data: session } = useSession()
	const accessToken = (session as any)?.user.accessToken as string
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 8

	const filteredProducts = products.filter(p =>
		p.name.toLowerCase().includes(search.toLowerCase())
	)

	const totalPages = Math.ceil(filteredProducts.length / pageSize)

	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)

	const {
		isProductModalOpen,
		modalType: productModalType,
		editingProduct,
		openCreateProduct,
		openEditProduct,
		handleSubmitProduct,
		handleDeleteProduct,
		setProductModalOpen,
	} = useProductManagement(activeCategory?.slug)

	const {
		isCategoryModalOpen,
		modalType: categoryModalType,
		editingCategory,
		openCreateCategory,
		openEditCategory,
		handleSubmitCategory,
		handleDeleteCategory,
		setCategoryModalOpen,
		setDeleteOption,
	} = useCategoryManagement()

	return (
		<div>
			{subcategories.length ? (
				<Subcategory
					parentCategoryName={activeCategory?.name}
					subcategories={subcategories}
					editCat={openEditCategory}
					createCat={openCreateCategory}
					deleteCat={handleDeleteCategory}
					setDeleteOption={setDeleteOption}
					accessToken={accessToken}
				/>
			) : (
				<div>
					<h1 className='mb-10'>Продукти категорії {activeCategory?.name}</h1>

					<ProductSearch
						setSearch={setSearch}
						setCurrentPage={setCurrentPage}
						search={search}
					/>

					{paginatedProducts.length === 0 ? (
						<div className='flex items-center gap-4 mb-8'>
							<Button onClick={openCreateCategory}>
								Створити підкатегорію
							</Button>
							<Button onClick={openCreateProduct}>Створити продукт</Button>
						</div>
					) : (
						<div className='flex items-center gap-4 mb-8'>
							<Button onClick={openCreateProduct}>Створити продукт</Button>
						</div>
					)}

					<div className='grid-cols-2 items-center'>
						<ul className='space-y-2 w-full'>
							{paginatedProducts.map(p => (
								<Product
									key={p.id}
									product={p}
									onEdit={openEditProduct}
									onDelete={handleDeleteProduct}
									accessToken={accessToken}
								/>
							))}
						</ul>
					</div>
					<ProductPagination
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			)}

			<ProductModal
				type={productModalType}
				isOpen={isProductModalOpen}
				onClose={() => setProductModalOpen(false)}
				onSubmit={handleSubmitProduct}
				productData={editingProduct || undefined}
				activeCategory={activeCategory}
				categories={categories}
				accessToken={accessToken}
				colors={colors}
			/>
			<CategoryModal
				type={categoryModalType}
				isOpen={isCategoryModalOpen}
				onClose={() => setCategoryModalOpen(false)}
				onSubmit={handleSubmitCategory}
				accessToken={accessToken}
				categoryData={editingCategory || undefined}
				activeCategory={activeCategory}
				categories={categories}
			/>
		</div>
	)
}
