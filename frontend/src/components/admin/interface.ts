import {
	ICategory,
	ICreateProductVariant,
	IDiscount,
	IProduct,
	IProductColor,
	IProductImage,
} from '@/types/Interfaces'
import { DragEndEvent } from '@dnd-kit/core'
import { Dispatch, RefObject, SetStateAction } from 'react'
import { ISeason } from './../../types/Interfaces'
import { BannerItem } from './banners/BannerClientPage'

export interface IProductModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData, token: string) => Promise<void>
	productData?: IProduct
	activeCategory: ICategory
	categories: ICategory[]
	accessToken: string
	colors: IProductColor[]
	isLoading: boolean
}
export interface IColorSelector {
	colors: IProductColor[]
	selectedColors: IProductColor[]
	setSelectedColors: (colors: IProductColor[]) => void
}
export interface IProductForm {
	name: string
	setName: (val: string) => void
	sku: string
	setSku: (val: string) => void
	descriptionDelta: string | any
	setDescriptionDelta: (val: string | any) => void
	parentCatId: string
	setParentCatId: (val: string) => void
	categoryId: string
	setCategoryId: (val: string) => void
	categories: ICategory[]
	subcategories: ICategory[]
	variants: ICreateProductVariant[]
	setVariants: (val: ICreateProductVariant[]) => void
	modules?: any
	colors: IProductColor[]
	selectedColors: IProductColor[]
	setSelectedColors: (colors: IProductColor[]) => void
}

export interface IBatchProductForm {
	nameTemplate: string
	setNameTemplate: (value: string) => void
	skuTemplate: string
	setSkuTemplate: (value: string) => void
	descriptionDelta: string | any
	setDescriptionDelta: (val: string | any) => void
	variantValues: string
	setVariantValues: (value: string) => void
	parentCatId: string
	setParentCatId: (id: string) => void
	categoryId: string
	setCategoryId: (id: string) => void
	categories: ICategory[]
	variants: ICreateProductVariant[]
	setVariants: (variants: ICreateProductVariant[]) => void
	modules: any
	colors: IProductColor[]
	selectedColors: IProductColor[]
	setSelectedColors: (colors: IProductColor[]) => void
}
export interface IVariant {
	v: ICreateProductVariant
	idx: number
	setVariants: (val: ICreateProductVariant[]) => void
	variants: ICreateProductVariant[]
}
export interface ISortableImage {
	file: IProductImage
	onRemove: () => void
}
export interface IImageUploader {
	images: IProductImage[]
	setImages: (images: IProductImage[]) => void
	onDragEnd: (event: DragEndEvent) => void
	onRemove: (filePath: string) => void
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: RefObject<HTMLInputElement | null>
	sensors: any
}
export interface ICategoryModal {
	type: 'create' | 'update'
	isOpen: boolean
	onClose: () => void
	onSubmit: (formData: FormData, token: string) => void
	accessToken: string
	categoryData?: ICategory
	activeCategory?: ICategory
	categories: ICategory[]
	isLoading: boolean
}
export interface IAlertOnDelete {
	onClick: () => void
	name: string
	setDeleteOption?: (
		option: 'CascadeDelete' | 'ReassignToParent' | 'Orphan'
	) => void
}
export interface ISubcategory {
	parentCategoryName: string
	subcategories: ICategory[]
	editCat: (cat: ICategory) => void
	createCat: () => void
	deleteCat: (catId: string, token: string) => void
	setDeleteOption: Dispatch<
		SetStateAction<'CascadeDelete' | 'ReassignToParent' | 'Orphan' | null>
	>
	accessToken: string
}
export interface IAdminProduct {
	product: IProduct
	onEdit: (product: IProduct) => void
	onDelete: (productId: { id: string }, token: string) => void
	accessToken: string
}
export interface IProductSearch {
	search: string
	setSearch: (e: string) => void
	setCurrentPage: (page: number) => void
}
export interface IProductPagination {
	currentPage: number
	totalPages: number
	setCurrentPage: (page: number) => void
}

export interface ISeasonPageClient {
	seasons: ISeason[]
	products: IProduct[]
}
export interface IDiscountPageClient {
	discounts: IDiscount[]
	products: IProduct[]
}
export interface IBannerCardHeader {
	items: BannerItem[]
	setItems: Dispatch<SetStateAction<BannerItem[]>>
	idx: number
}
export interface IBannerCardContent {
	it: BannerItem
	setItems: Dispatch<SetStateAction<BannerItem[]>>
	idx: number
}