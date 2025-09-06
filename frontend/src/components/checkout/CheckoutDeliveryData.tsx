'use client'
import useOrderManagement from '@/hooks/useOrderManagement'
import { cn } from '@/lib/utils'
import { ICreateOrder } from '@/types/Interfaces'
import Cleave from 'cleave.js/react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { Checkbox } from '../UI/checkbox'
import { Input } from '../UI/input'
import { Label } from '../UI/label'
import { ICheckoutDataProps } from './CheckoutContactData'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../UI/select'
import { CircleCheckBig } from 'lucide-react'

export default function CheckoutDeliveryData({
	formData,
	setFormData,
}: ICheckoutDataProps) {
	const { saveAddress, setSaveAddress } = useOrderManagement()

	const onChange = (field: string, value: string | boolean) => {
		setFormData(prev => {
			if (field.startsWith('userAddress.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['userAddress']
				return { ...prev, userAddress: { ...prev.userAddress, [key]: value } }
			}
			if (field.startsWith('postAddress.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['postAddress']
				return { ...prev, postAddress: { ...prev.postAddress, [key]: value } }
			}
			return { ...prev, [field]: value }
		})
	}

	const handleDeliveryMethodChange = (value: 'courier' | 'novaPost') => {
		setFormData(prev => {
			if (value === 'courier') {
				return {
					...prev,
					deliveryMethod: value,
					postAddress: {
						country: '',
						city: '',
						region: '',
						postDepartment: '',
					},
				}
			}
			if (value === 'novaPost') {
				return {
					...prev,
					deliveryMethod: value,
					userAddress: {
						country: '',
						city: '',
						region: '',
						street: '',
						homeNumber: '',
						postalCode: '',
					},
				}
			}
			return prev
		})
	}

	const isFilled =
		(formData.userAddress.country.length !== 0 &&
			formData.userAddress.region.length !== 0 &&
			formData.userAddress.city.length !== 0 &&
			formData.userAddress.street.length !== 0 &&
			formData.userAddress.homeNumber) ||
		(formData.postAddress.country.length !== 0 &&
			formData.postAddress.region.length !== 0 &&
			formData.postAddress.city.length !== 0 &&
			formData.postAddress.postDepartment.length !== 0)

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader>
				{isFilled ? (
					<div className='flex items-center gap-2'>
						<CircleCheckBig className='text-green-600!' />
						<CardTitle className='text-2xl'>Дані доставки</CardTitle>
					</div>
				) : (
					<CardTitle className='text-2xl'>Дані доставки</CardTitle>
				)}
			</CardHeader>
			<CardContent className='w-full space-y-2'>
				{/* Choose delivery type */}
				<Select
					value={formData.deliveryMethod}
					onValueChange={handleDeliveryMethodChange}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Оберіть тип доставки' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='courier'>На адресу</SelectItem>
						<SelectItem value='novaPost'>Нова пошта</SelectItem>
					</SelectContent>
				</Select>

				{/* Delivery form */}
				{formData.deliveryMethod === 'courier' ? (
					<>
						<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
							<div>
								<span className='text-transparent-text'>Країна</span>
								<Input
									disabled
									value={formData.userAddress.country}
									onChange={() => onChange('userAddress.country', 'Україна')}
								/>
							</div>
							<div>
								<span className='text-transparent-text'>Область</span>
								<Input
									value={formData.userAddress.region}
									onChange={e => onChange('userAddress.region', e.target.value)}
								/>
							</div>
							<div>
								<span className='text-transparent-text'>Місто</span>
								<Input
									value={formData.userAddress.city}
									onChange={e => onChange('userAddress.city', e.target.value)}
								/>
							</div>
							<div>
								<span className='text-transparent-text'>Поштовий індекс</span>
								<Cleave
									options={{
										delimiter: '-',
										blocks: [2, 3],
									}}
									maxLength={6}
									value={formData.userAddress.postalCode}
									onChange={e =>
										onChange('userAddress.postalCode', e.target.value)
									}
									className={cn(
										'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
										'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
										'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
									)}
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='basis-3/5 md:basis-4/6 lg:basis-4/5'>
								<span className='text-transparent-text'>Вулиця</span>
								<Input
									value={formData.userAddress.street}
									onChange={e => onChange('userAddress.street', e.target.value)}
								/>
							</div>
							<div className='basis-2/5 md:basis-2/6 lg:basis-1/5'>
								<span className='text-transparent-text'>№ буд. / кв.</span>
								<Input
									value={formData.userAddress.homeNumber}
									onChange={e =>
										onChange('userAddress.homeNumber', e.target.value)
									}
								/>
							</div>
						</div>
						<div className='flex items-center space-x-2 mt-4'>
							<Checkbox
								id='saveAddress'
								checked={saveAddress}
								onClick={() => setSaveAddress(p => !p)}
							/>
							<Label
								htmlFor='saveAddress'
								className='flex items-center gap-2 cursor-pointer'
							>
								Чи бажаєте зберегти адресу для наступних замовлень?
							</Label>
						</div>
					</>
				) : (
					<div className='flex flex-col md:grid md: md:grid-cols-2 gap-4'>
						<div>
							<span className='text-transparent-text'>Країна</span>
							<Input
								disabled
								value={formData.postAddress.country || 'Україна'}
								onChange={e => onChange('postAddress.country', e.target.value)}
							/>
						</div>
						<div>
							<span className='text-transparent-text'>Область</span>
							<Input
								value={formData.postAddress.region || ''}
								onChange={e => onChange('postAddress.region', e.target.value)}
							/>
						</div>
						<div>
							<span className='text-transparent-text'>Місто</span>
							<Input
								value={formData.postAddress.city || ''}
								onChange={e => onChange('postAddress.city', e.target.value)}
							/>
						</div>
						<div>
							<span className='text-transparent-text'>Відділення</span>
							<Input
								value={formData.postAddress.postDepartment || ''}
								onChange={e =>
									onChange('postAddress.postDepartment.', e.target.value)
								}
							/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
