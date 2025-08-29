import { ICreateOrder } from '@/types/Interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/card'
import { Textarea } from '../UI/textarea'
import { ICheckoutDataProps } from './CheckoutContactData'

export default function CheckoutMoreInfo({
	formData,
	setFormData,
}: ICheckoutDataProps) {
	const onChange = (field: string, value: string | boolean) => {
		setFormData(prev => {
			if (!prev) return prev
			const key = field as keyof ICreateOrder
			return {
				...prev,
				[key]: value,
			}
		})
	}

	return (
		<Card className='w-full shadow-lg text-foreground'>
			<CardHeader>
				<CardTitle className='text-2xl'>Ваш коментар до замовлення</CardTitle>
			</CardHeader>
			<CardContent className='w-full space-y-2'>
				<Textarea
					placeholder='Залиште ваш коментар...'
					value={formData.additionalInfo || ''}
					onChange={e => onChange('additionalInfo', e.target.value)}
				/>
			</CardContent>
		</Card>
	)
}
