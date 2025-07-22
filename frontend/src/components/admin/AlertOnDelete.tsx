'use client'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/UI/alert-dialog'
import { Trash } from 'lucide-react'
import { IAlertOnDelete } from './interface'
import { useState } from 'react'
export default function AlertOnDelete({
	onClick,
	name,
	setDeleteOption,
}: IAlertOnDelete) {
	const [selectedOption, setSelectedOption] = useState<
		'CascadeDelete' | 'ReassignToParent' | 'Orphan'
	>('CascadeDelete')

	const handleConfirmDelete = () => {
		if (setDeleteOption) {
			setDeleteOption(selectedOption)
		}
		onClick()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger className='ml-4 p-2 rounded-sm bg-red-600 text-white shadow-xs hover:bg-destructive/70 cursor-pointer'>
				<Trash size={18} />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Ви впевнені, що хочете видалити?</AlertDialogTitle>
					<AlertDialogDescription>
						Ця дія не може бути скасована. Це назавжди видалить '{name}'.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{setDeleteOption && (
					<div className='flex flex-col space-y-2 mb-4'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name='deleteOption'
								value='CascadeDelete'
								checked={selectedOption === 'CascadeDelete'}
								onChange={() => setSelectedOption('CascadeDelete')}
							/>
							<span>Каскадно видалити підкатегорії</span>
						</label>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name='deleteOption'
								value='ReassignToParent'
								checked={selectedOption === 'ReassignToParent'}
								onChange={() => setSelectedOption('ReassignToParent')}
							/>
							<span>Перепризначити підкатегорії на батьківську категорію</span>
						</label>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name='deleteOption'
								value='Orphan'
								checked={selectedOption === 'Orphan'}
								onChange={() => setSelectedOption('Orphan')}
							/>
							<span>Зробити підкатегорії сиротами (без батька)</span>
						</label>
					</div>
				)}

				<AlertDialogFooter>
					<AlertDialogCancel>Скасувати</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirmDelete}>
						Так, видалити
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
