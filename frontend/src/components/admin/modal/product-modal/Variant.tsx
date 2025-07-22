'use client'
import { Button } from '@/components/UI/button'
import { ICreateProductVariant } from '@/types/Interfaces'
import { X } from 'lucide-react'
import { IVariant } from '../../interface'
import FormInput from './FormInput'

export default function Variant({ v, idx, setVariants, variants }: IVariant) {
	const removeVariant = (index: number) =>
		setVariants(variants.filter((_, i) => i !== index))

	const updateVariant = (
		index: number,
		field: keyof ICreateProductVariant,
		value: string | number
	) => {
		const updated = variants.map((v, i) =>
			i === index
				? {
						...v,
						[field]: field === 'name' ? (value as string) : Number(value),
				  }
				: v
		)
		setVariants(updated)
	}
	return (
		<div key={idx} className='flex gap-2 justify-between items-center my-2'>
			<div className='basis-1/3'>
				<FormInput
					title={
						<>
							Об'єм
							<span className='text-transparent-text'>, мл</span>
						</>
					}
					value={v.name}
					onChange={e => updateVariant(idx, 'name', e.target.value)}
					placeholder="Об'єм, мл"
					isRequired={true}
				/>
			</div>
			<div className='basis-1/3'>
				<FormInput
					title={
						<>
							Ціна<span className='text-transparent-text'>, грн</span>
						</>
					}
					value={v.price}
					onChange={e => updateVariant(idx, 'price', e.target.value)}
					placeholder='Ціна'
					isRequired={true}
				/>
			</div>
			<div className='basis-1/3'>
				<FormInput
					title='Кіль-сть'
					value={v.unitsInStock}
					onChange={e => updateVariant(idx, 'unitsInStock', e.target.value)}
					placeholder='Кіль-сть на складі'
					isRequired={true}
				/>
			</div>
			{variants.length > 1 && (
				<Button
					variant='outline'
					size='sm'
					type='button'
					onClick={() => removeVariant(idx)}
					className='translate-y-3'
				>
					<X className='link-size' />
				</Button>
			)}
		</div>
	)
}
