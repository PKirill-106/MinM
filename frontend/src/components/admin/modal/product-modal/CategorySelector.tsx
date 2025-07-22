import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/UI/select'
import { ICategory } from '@/types/Interfaces'

interface ICategorySelector {
	categories: ICategory[]
	subcategories: ICategory[]
	parentCatId: string
	categoryId: string
	setParentCatId: (val: string) => void
	setCategoryId: (val: string) => void
}

export default function CategorySelector({
	categories,
	subcategories,
	parentCatId,
	categoryId,
	setParentCatId,
	setCategoryId,
}: ICategorySelector) {
	const hasSubcategories: boolean = subcategories.length > 0

	let catId = null
	if (hasSubcategories && parentCatId) {
		catId = parentCatId
	} else {
		catId = categoryId
	}

	const renderCategorySelect = () => (
		<div>
			<span className='mb-2'>Категорія</span>
			<Select
				value={catId}
				onValueChange={val => {
					setParentCatId(val)
					setCategoryId(val)
				}}
			>
				<SelectTrigger>
					<SelectValue>
						{catId
							? categories.find(c => c.id === catId)?.name
							: 'Оберіть категорію'}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{categories
							.filter(c => c.parentCategoryId === null)
							.map(c => (
								<SelectItem key={c.id} value={c.id}>
									{c.name}
								</SelectItem>
							))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)

	const renderSubcategorySelect = () => (
		<div>
			<span>Підкатегорія</span>
			<Select value={categoryId} onValueChange={setCategoryId}>
				<SelectTrigger>
					<SelectValue>
						{categoryId
							? categories.find(c => c.id === categoryId)?.name
							: 'Оберіть підкатегорію'}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{subcategories.map(c => (
							<SelectItem key={c.id} value={c.id}>
								{c.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)

	return (
		<div>
			{hasSubcategories && parentCatId ? (
				<div className='flex flex-col gap-4'>
					{renderCategorySelect()}
					{renderSubcategorySelect()}
				</div>
			) : (
				renderCategorySelect()
			)}
		</div>
	)
}
