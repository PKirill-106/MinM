import {
	AlertCircle,
	Check,
	ClipboardCheck,
	Clock,
	Truck,
	Undo2,
	Wallet,
	X
} from 'lucide-react';

const statusData: Record<
	string,
	{ name: string; icon: React.ReactElement; color: string }
> = {
	Created: {
		name: 'Створено',
		icon: <ClipboardCheck className='size-4 md:size-5 lg:size-6' />,
		color: 'text-background bg-gray-500/70',
	},
	Canceled: {
		name: 'Скасовано',
		icon: <X className='size-4 md:size-5 lg:size-6' />,
		color: 'text-red-700 bg-red-200',
	},
	Paid: {
		name: 'Оплачено',
		icon: <Wallet className='size-4 md:size-5 lg:size-6' />,
		color: 'text-green-700 bg-green-200',
	},
	Pending: {
		name: 'В обробці',
		icon: <Clock className='size-4 md:size-5 lg:size-6' />,
		color: 'text-yellow-700 bg-yellow-200',
	},
	Delivering: {
		name: 'В дорозі',
		icon: <Truck className='size-4 md:size-5 lg:size-6' />,
		color: 'text-blue-700 bg-blue-200',
	},
	Received: {
		name: 'Отримано',
		icon: <Check className='size-4 md:size-5 lg:size-6' />,
		color: 'text-green-700 bg-green-200',
	},
	Returned: {
		name: 'Повернено',
		icon: <Undo2 className='size-4 md:size-5 lg:size-6' />,
		color: 'text-orange-700 bg-orange-200',
	},
	Failed: {
		name: 'Помилка виконання',
		icon: <AlertCircle className='size-4 md:size-5 lg:size-6' />,
		color: 'text-red-700 bg-red-100',
	},
}

export function convertOrderStatus(status: string) {
	return statusData[status]
}
