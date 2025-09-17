import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
		<div className='flex justify-center items-center'>
			<LoaderCircle
				className='size-8 md:size-12 lg:size-14 animate-spin text-accent'
				strokeWidth={3}
			/>
		</div>
	)
}
