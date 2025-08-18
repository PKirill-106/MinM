import { Button } from '@/components/UI/button'
import { CardHeader } from '@/components/UI/card'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { IBannerCardHeader } from '../interface'

export default function BannerCardHeader({
	items,
	setItems,
	idx,
}: IBannerCardHeader) {
	const removeAt = (idx: number) => {
		setItems(prev => {
			const newItems = prev.filter((_, i) => i !== idx)
			return newItems.map((item, i) => ({
				...item,
				sequenceNumber: i + 1,
			}))
		})
	}

	const move = (from: number, to: number) => {
		setItems(prev => {
			if (to < 0 || to >= prev.length) return prev

			const copy = [...prev]
			const [moved] = copy.splice(from, 1)
			copy.splice(to, 0, moved)

			return copy.map((item, i) => ({
				...item,
				sequenceNumber: i + 1,
			}))
		})
	}

	const canMoveUp = (i: number) => i > 0
	const canMoveDown = (i: number) => i < items.length - 1
	return (
		<CardHeader className='p-0 relative'>
			<div className='absolute left-2 top-2 text-xs bg-black/70 text-white rounded px-2 py-0.5'>
				#{idx + 1}
			</div>

			<div className='absolute right-2 top-2 flex gap-1'>
				<Button
					type='button'
					variant='outline'
					size='icon'
					onClick={() => move(idx, idx - 1)}
					disabled={!canMoveUp(idx)}
					title='Up'
				>
					<ChevronUp size={16} />
				</Button>
				<Button
					type='button'
					variant='outline'
					size='icon'
					onClick={() => move(idx, idx + 1)}
					disabled={!canMoveDown(idx)}
					title='Down'
				>
					<ChevronDown size={16} />
				</Button>
				<Button
					type='button'
					variant='destructive'
					size='icon'
					onClick={() => removeAt(idx)}
					title='Delete'
				>
					<X size={16} />
				</Button>
			</div>
		</CardHeader>
	)
}
