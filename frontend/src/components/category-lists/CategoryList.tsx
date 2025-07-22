import { ICategoryList } from '@/types/Interfaces'
import DesktopCategoryList from './DesktopCategoryList'
import MobileCategoryList from './MobileCategoryList'

export default function CategoryList({
	categories,
	className,
	isFooter,
}: ICategoryList) {
	return (
		<div className={className}>
			{/* Render different components based on screen size */}
			<div className='hidden md:block'>
				<DesktopCategoryList categories={categories} isFooter={isFooter} />
			</div>
			<div className='md:hidden'>
				<MobileCategoryList categories={categories} isFooter={isFooter} />
			</div>
		</div>
	)
}
