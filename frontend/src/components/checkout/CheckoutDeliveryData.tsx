import { cn } from '@/lib/utils'
import { ICreateOrder } from '@/types/Interfaces'
import Cleave from 'cleave.js/react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { Checkbox } from '../UI/checkbox'
import { Input } from '../UI/input'
import { Label } from '../UI/label'
import { ICheckoutDataProps } from './CheckoutContactData'

export default function CheckoutDeliveryData({
	formData,
	setFormData,
}: ICheckoutDataProps) {
	const onChange = (field: string, value: string | boolean) => {
		setFormData(prev => {
			if (field.startsWith('address.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['address']
				return { ...prev, address: { ...prev.address, [key]: value } }
			}
			if (field.startsWith('novaPost.')) {
				const key = field.split('.')[1] as keyof ICreateOrder['novaPost']
				return { ...prev, novaPost: { ...prev.novaPost, [key]: value } }
			}
			return { ...prev, [field]: value }
		})
	}

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader>
				<CardTitle className='text-2xl'>Дані доставки</CardTitle>
			</CardHeader>
			<CardContent className='w-full space-y-2'>
				{/* Choose delivery type */}
				<div className='flex gap-4'>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='addressDeliveryType'
							checked={formData.deliveryType === 'address'}
							onCheckedChange={checked => {
								onChange('deliveryType', checked ? 'address' : '')
							}}
						/>
						<Label
							htmlFor='addressDeliveryType'
							className='flex items-center gap-2 cursor-pointer'
						>
							На адресу
						</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='novaPostDeliveryType'
							checked={formData.deliveryType === 'novaPost'}
							onCheckedChange={checked => {
								onChange('deliveryType', checked ? 'novaPost' : '')
							}}
						/>
						<Label
							htmlFor='novaPostDeliveryType'
							className='flex items-center gap-2 cursor-pointer'
						>
							Нова пошта
						</Label>
					</div>
				</div>

				{/* Delivery form */}
				{formData.deliveryType === 'address' ? (
					<>
						<div className='sm:grid sm:grid-cols-2 gap-4 mb-4'>
							<div>
								<span className='text-transparent-text'>Країна</span>
								<Input
									disabled
									value='Україна'
									onChange={() => onChange('address.country', 'Україна')}
								/>
							</div>
							<div>
								<span className='text-transparent-text'>Область</span>
								<Input
									value={formData.address.region}
									onChange={e => onChange('address.region', e.target.value)}
								/>
							</div>
							<div>
								<span className='text-transparent-text'>Місто</span>
								<Input
									value={formData.address.city}
									onChange={e => onChange('address.city', e.target.value)}
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
									value={formData.address.postalCode}
									onChange={e => onChange('address.postalCode', e.target.value)}
									className={cn(
										'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
										'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
										'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
									)}
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='basis-3/5 md:basis-4/5'>
								<span className='text-transparent-text'>Вулиця</span>
								<Input
									value={formData.address.street}
									onChange={e => onChange('address.street', e.target.value)}
								/>
							</div>
							<div className='basis-2/5 md:basis-1/5'>
								<span className='text-transparent-text'>№ буд. / кв.</span>
								<Input
									value={formData.address.homeNumber}
									onChange={e => onChange('address.homeNumber', e.target.value)}
								/>
							</div>
						</div>
					</>
				) : (
					<div className='space-y-4'>
						<div>
							<span className='text-transparent-text'>Область</span>
							<Input
								value={formData.novaPost.region || ''}
								onChange={e => onChange('novaPost.region', e.target.value)}
							/>
						</div>
						<div>
							<span className='text-transparent-text'>Місто</span>
							<Input
								value={formData.novaPost.city || ''}
								onChange={e => onChange('novaPost.city', e.target.value)}
							/>
						</div>
						<div>
							<span className='text-transparent-text'>Відділення</span>
							<Input
								value={formData.novaPost.departmentAddress || ''}
								onChange={e => onChange('novaPost.warehouse', e.target.value)}
							/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
