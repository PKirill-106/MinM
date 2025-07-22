import { IGetUserInfo, IUpdateUserInfo } from "@/types/Interfaces";
import { Dispatch, SetStateAction } from "react";

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