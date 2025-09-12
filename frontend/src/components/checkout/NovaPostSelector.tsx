import {
	getAreas,
	getCities,
	getWarehouses,
} from '@/lib/services/novaPostServices'
import { IArea, ICity, IWarehouse } from '@/types/Interfaces'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { Button } from '../UI/button'
import { PopoverContent } from '../UI/popover'
import { Command, CommandInput, CommandItem, CommandList } from '../UI/command'
import { ChevronRight } from 'lucide-react'

interface INovaPostSelector {
	onChange: (field: string, value: string | boolean) => void
}

export function NovaPostSelector({ onChange }: INovaPostSelector) {
	const [areas, setAreas] = useState<IArea[]>([])
	const [cities, setCities] = useState<ICity[]>([])
	const [warehouses, setWarehouses] = useState<IWarehouse[]>([])

	const [selectedArea, setSelectedArea] = useState<IArea | null>(null)
	const [selectedCity, setSelectedCity] = useState<ICity | null>(null)
	const [selectedWarehouse, setSelectedWarehouse] = useState<IWarehouse | null>(
		null
	)

	useEffect(() => {
		getAreas().then(setAreas)
	}, [])

	useEffect(() => {
		if (selectedArea) {
			getCities(selectedArea.Ref).then(setCities)
			setSelectedCity(null)
			setSelectedWarehouse(null)
			setWarehouses([])
		}
	}, [selectedArea])

	useEffect(() => {
		if (selectedCity) {
			getWarehouses(selectedCity.Ref).then(setWarehouses)
			setSelectedWarehouse(null)
		}
	}, [selectedCity])

	useEffect(() => {
		onChange('postAddress.region', selectedArea?.Description || '')
		onChange('postAddress.city', selectedCity?.Description || '')
		onChange('postAddress.postDepartment', selectedWarehouse?.Description || '')
	}, [selectedArea, selectedCity, selectedWarehouse])

	return (
		<div className='space-y-4'>
			{/* Area */}
			<SearchableSelect
				label='Область'
				items={areas}
				selected={selectedArea}
				onSelect={setSelectedArea}
			/>
			{/* City */}
			{selectedArea && (
				<SearchableSelect
					label='Місто'
					items={cities}
					selected={selectedCity}
					onSelect={setSelectedCity}
				/>
			)}
			{/* Warehouse */}
			{selectedCity && (
				<SearchableSelect
					label='Відділення'
					items={warehouses}
					selected={selectedWarehouse}
					onSelect={setSelectedWarehouse}
				/>
			)}
		</div>
	)
}

function SearchableSelect({ label, items, selected, onSelect }: any) {
	const [open, setOpen] = useState(false)

	return (
		<div className='w-full md:w-80'>
			<span className='text-transparent-text'>{label}</span>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild className=''>
					<Button
						variant='outline'
						className='bg-white w-full justify-between overflow-hidden p-0! '
					>
						<div className='w-full flex justify-between items-center m-4 overflow-hidden '>
							<div className='truncate'>
								{selected
									? selected.Description
									: `Оберіть ${label.toLowerCase()}`}
							</div>
							<ChevronRight />
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-full md:w-80 p-0'>
					<Command>
						<CommandInput placeholder={`Пошук ${label.toLowerCase()}...`} />
						<CommandList>
							{items.map((item: any) => (
								<CommandItem
									key={item.Ref}
									onSelect={() => {
										onSelect(item)
										setOpen(false)
									}}
								>
									{item.Description}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
