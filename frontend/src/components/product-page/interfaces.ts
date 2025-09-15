import { ICategory, IProduct, IProductImage, IProductVariant, IReview } from '@/types/Interfaces'
import { Swiper as SwiperType } from 'swiper/types'

// Top
export interface IProductTopProps {
	product: IProduct
	category: ICategory
}
export interface IProductTopRight {
	product: IProduct
	category: ICategory
	reviews: IReview[]
}
export interface IProductTopLeftProps {
	product: IProduct
}

// Top Left / Images
export interface IMainImage {
	images: IProductImage[]
	selectedImageIndex: number
	onClick: () => void
	productName: string
}
export interface IThumbnail {
	img: string
	index: number
	productName: string
	selectedImageIndex: number
	onClick: () => void
	isModal: boolean
}
export interface IThumbnailScroller {
	images: IProductImage[]
	productName: string
	selectedImageIndex: number
	onSelect: (index: number) => void
	setSwiperRef: (swiper: SwiperType) => void
}
export interface IImageModal {
	isOpen: boolean
	onClose: () => void
	images: IProductImage[]
	productName: string
	selectedImageIndex: number
	onSelect: (i: number) => void
	onPrev: () => void
	onNext: () => void
}

// Top Right / Product Info Panel
export interface IRatings {
	reviews: IReview[]
}
export interface IRating {
	rating: number
}
export interface IProductCart {
	amount: number
	productId: string
	variantId: string
	hasAnyInStock: boolean
}
export interface IProductVariants {
	product: IProduct
	current: IProductVariant
	onSelect: (i: number) => void
}
export interface IShippingPayment {
	variant: 'shipment' | 'payment'
	className: string
}

// Description
export interface QuillDelta {
  ops: QuillOp[];
}
export interface QuillOp {
  insert?: string | object;
  delete?: number;
  retain?: number;
  attributes?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    link?: string;
    list?: 'bullet' | 'ordered';
    header?: number;
    [key: string]: any;
  };
}

export interface IDescription {
	description: string
}

// Reviews
export interface IProductReviews {
	reviews: IReview[]
}
export interface IReviewItem {
	review: IReview
}