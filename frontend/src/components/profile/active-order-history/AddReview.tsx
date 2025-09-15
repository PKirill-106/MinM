import { Button } from '@/components/UI/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/UI/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu'
import { Textarea } from '@/components/UI/textarea'
import useReviews from '@/hooks/useReviews'
import clsx from 'clsx'
import { Ellipsis, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IAddReview } from '../interfaces'

export default function AddReview({ productId }: IAddReview) {
	const reviewRef = useRef<HTMLTextAreaElement>(null)

	const [rating, setRating] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

	const { handleReviewCreate, isLoading } = useReviews()

	const handleCreate = async () => {
		const comment = reviewRef.current?.value.trim() || ''
		if (!rating) {
			toast.error('Будь ласка, оберіть оцінку')
			return
		}

		const reviewData = {
			productId,
			rating,
			comment,
		}

		try {
			await handleReviewCreate(reviewData)
			reviewRef.current!.value = ''
			setRating(0)
      setOpen(false)
		} catch (err) {
			console.error('Failed to create review: ', err)
			toast.error('Сталася помилка')
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Ellipsis className='li-hover' />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem asChild>
						<DialogTrigger className='w-full text-left cursor-pointer'>
							Додати відгук
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Напишіть відгук</DialogTitle>
					<div className='flex flex-col gap-2 md:gap-3 lg:gap-4'>
						{/* Rating */}
						<div className='flex gap-1'>
							{[1, 2, 3, 4, 5].map(star => (
								<Star
									key={star}
									size={28}
									strokeWidth={1}
									className={clsx(
										'cursor-pointer transition-colors',
										star <= rating
											? 'fill-yellow-500 text-yellow-500'
											: 'text-gray-300'
									)}
									onClick={() => setRating(star)}
								/>
							))}
						</div>

						<Textarea
							ref={reviewRef}
							placeholder='Напишіть ваш відгук...'
							className='w-full'
						/>
						<Button
							onClick={handleCreate}
							disabled={isLoading || rating === 0}
							className='self-end'
						>
							{isLoading ? 'Надсилається...' : 'Надіслати'}
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
