'use client'

interface Props {
	isUpdate: boolean
	title: string
}

export default function ModalHeader({ isUpdate, title }: Props) {
	return (
		<h2 className='text-xl font-semibold'>
			{isUpdate ? `Редагувати ${title}` : `Додати ${title}`}
		</h2>
	)
}
