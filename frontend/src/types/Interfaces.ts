import { HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

export interface ISignUpUser {
	email: string
	password: string
}

export interface ISignInUser {
	email: string
	password: string
}

export interface IAddress {
	street: string
	homeNumber: number
	city: string
	region: string
	postalCode: string
	country: string
}

export interface IGetUserInfo {
	userName: string
	slug: string
	userFirstName: string
	userLastName: string
	email: string
	address: IAddress
	phoneNumber: string
}

export interface IUpdateUserInfo {
	userFirstName: string
	userLastName: string
	phoneNumber: string
	addressDto: IAddress
}

export interface IApiError {
	type?: string
	title?: string
	status?: number
	errors?: {
		DuplicateUserName?: string[]
		PasswordTooShort?: string[]
		PasswordRequiresNonAlphanumeric?: string[]
		PasswordRequiresDigit?: string[]
		PasswordRequiresUpper?: string[]
	}
	message?: string
}

// Favorites
export interface IFavoritesContext {
	favorites: string[]
	addFavorite: (productId: string) => Promise<void>
	removeFavorite: (productId: string) => Promise<void>
	isFavorite: (productId: string) => boolean
	favCount: number
	triggerAnimation: () => void
}

export interface IFilteredFavoriteGrid {
	products: IProduct[]
	categories: ICategory[]
	initialFavoriteIds: string[]
}

export interface IFavoriteButton {
	productId: string
	heartClassName: string
	buttonClassName: string
}

// Cart
export interface IGetCartItem extends ICartItem {
	id?: string
	addedAt?: string
}

export interface ICartItem {
	productId: string
	productVariantId: string
	quantity: number
}

export interface IUpdateCartItem {
	id: string
	productVariantId: string
	quantity: number
}

export type CartOperation = (
	productId: string,
	variantId: string,
	quantity: number,
	maxAvailable: number,
	itemId?: string,
) => Promise<void>

export type VariantUpdate = (
	productId: string,
	oldVariantId: string,
	newVariantId: string
) => Promise<void>

export interface ICartContext {
	cartProducts: IGetCartItem[]
	addToCart: CartOperation
	removeFromCart: (
		itemId: string,
		productId: string,
		variantId: string
	) => Promise<void>
	updateCartItem: (
		itemId: string,
		productVariantId: string,
		quantity: number,
		unitsInStock?: number
	) => Promise<void>

	isInCart: (productId: string) => boolean
	isVariantInCart: (productId: string, variantId: string) => boolean
	cartCount: number
	triggerAnimation: () => void
}

export interface ICartList {
	products: IProduct[]
}

export interface ICartItemProps {
	product: IProduct
	cartItem: IGetCartItem
}

export interface ICartButton {
	productId: string
	initialVariantId: string
	unitsInStock: number
}

// Category
export interface ICategory {
	id: string
	name: string
	slug: string
	description: string
	parentCategoryId?: string
	imageURL?: string
}

export interface ICreateCategory {
	name: string
	description: string
	parentCategoryId?: string
	image: File | string
}

export interface IUpdateCategory extends ICreateCategory {
	id: string
}

export interface IDeleteCategory {
	categoryId: string
	option: 'CascadeDelete' | 'ReassignToParent' | 'Orphan'
}

export interface ICategorySection {
	categories: ICategory[]
	linkLabel: string
	linkHref: string
}

export interface ICategoryList {
	categories: ICategory[]
	className?: string
	isFooter?: boolean
}

export interface ICategoryItem {
	category: ICategory
	subcategories: ICategory[]
	isFooter?: boolean
	isHovered?: boolean
	isOpen?: boolean
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	onToggle?: (event: React.MouseEvent) => void
	isMobile?: boolean
}

// Discount
export interface IDiscount extends ISeason {
	discountPercentage: number
}

export interface ICreateDiscount {
	name: string
	discountPercentage: number
	startDate: string
	endDate: string
	removeAfterExpiration: boolean
	productIds: string[]
}

export interface IUpdateDiscount extends ICreateDiscount {
	id: string
}

// Season
export interface ISeason {
	id: string
	name: string
	slug: string
	startDate: string
	endDate: string
	products: IProduct[]
}

export interface ICreateSeason {
	name: string
	startDate: string
	endDate: string
	productIds: string[]
}

export interface IUpdateSeason {
	id: string
	name: string
	startDate: string
	endDate: string
	productIds: string[]
}

// Product
export interface IProductVariant {
	id: string
	name: string
	price: number
	discountPrice: number
	unitsInStock: number
	isStock: boolean
}
export interface IProductImage {
	filePath: string
	sequenceNumber: number
	file?: File
}
export interface IProductColor {
	name: string
	colorHex: string
}
export interface IProduct {
	id: string
	name: string
	slug: string
	description: string
	productVariants: IProductVariant[]
	discountId: string
	isSeasonal: boolean
	isDiscounted: boolean
	isNew: boolean
	categoryId: string
	categoryName: string
	sku: string
	productImages: IProductImage[]
	colors: IProductColor[]
}

export interface ICreateProductVariant {
	name: string
	price: number
	unitsInStock: number
}
export interface ICreateProduct {
	name: string
	description: string
	productVariantsJson: string
	categoryId: string
	sku: string
	images: (File | string)[]
}

export interface IUpdateProduct extends ICreateProduct {
	id: string
}
export interface IDeleteProduct {
	id: string
}

export interface IProductSection {
	title: string
	highlight?: string
	products: IProduct[]
	categories: ICategory[]
	linkLabel: string
	linkHref: string
}

export interface IProductGrid {
	products: IProduct[]
	categories: ICategory[]
	type?: 'favorites'
}

export interface IProductFilters {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
}

export interface IProductCard {
	product: IProduct
	categories: ICategory[]
}

export interface IQuantity {
	quantity?: number
	amount: number
	onChange?: (newQuantity: number) => void
}

export interface IFilterSelectGroup {
	categories: ICategory[]
	activeCategory: string
	activeSubcategory: string
	colors: IProductColor[]
}

export interface IBreadcrumbs {
	categories: ICategory[]
	products: IProduct[]
}

export interface ILogoProps {
	width: number
	height: number
	isFooter?: boolean
	priority?: boolean
}

export interface IButtonProps {
	text: string
	variant: 'cart' | 'instagram'
	onClick?: () => void
	href?: string
	className?: string
}

export interface IInputProps {
	text: string
}

export interface ISelectProps {
	options: ICategory[] | IProductColor[]
	variant: 'cat' | 'subcat' | 'sort' | 'color'
	defaultValue: string
	onSelect?: (id: string) => void
	activeSlug?: string
	activeId?: string
}

export interface ITooltipProps {
	content: string | React.ReactNode
	children: React.ReactNode
	isShoppingBag?: boolean
	className?: string
}

export interface INavbarProps {
	categories: ICategory[]
	products: IProduct[]
}

export interface ISearchBarProps {
	products: IProduct[]
	isOpen: boolean
	onClose: () => void
}

export interface IPaginationControlsProps {
	totalPages: number
}

export interface IModal {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	isInput?: boolean
}

export type ButtonModeType = 'full-cycle' | 'simple-cycle'
export type ButtonVariantType = 'cart' | 'instagram' | 'custom'

export interface IAnimatedButton
	extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
	text: string
	icon?: React.ReactNode
	variant?: ButtonVariantType
	mode?: ButtonModeType
	onClick: () => Promise<'success' | 'error' | void>
}
