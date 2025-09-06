import {
	IGetUserInfo,
	IOrder,
	IProduct,
	IUpdateUserInfo,
} from '@/types/Interfaces'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface IProfileTab {
	activeTab: 'profile' | 'orders'
	setActiveTab: Dispatch<SetStateAction<'profile' | 'orders'>>
}
export interface IActiveProfile {
	user: IGetUserInfo
	formData: IUpdateUserInfo
	changed: boolean
	setFormData: Dispatch<SetStateAction<IUpdateUserInfo | null>>
	setChanged: Dispatch<SetStateAction<boolean>>
}
export interface IClientProfileProps {
	products: IProduct[]
}
export interface IActiveOrderHistory {
	products: IProduct[]
	orders: IOrder[]
	isLoading: boolean
}
export interface IOrderHistoryItem {
	order: IOrder
	products: IProduct[]
}
export interface IOrderDetails {
	order: IOrder
	orderProducts: IProduct[]
	orderItemIds: string[]
	orderDate: string
}
export interface IDetailsInfoSection {
	title: string
	info: string | ReactNode
}
export interface IPersonalInfoSectionProps {
	user: IGetUserInfo
	formData: IUpdateUserInfo
	onChange: (field: string, value: string) => void
}
export interface IAddressSectionProps {
	formData: IUpdateUserInfo
	onChange: (field: string, value: string) => void
}
export interface IProfileButtonsProps {
	changed: boolean
	onSave: () => void
}
