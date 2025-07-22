import Image from 'next/image'
import React from 'react'

interface IReason {
	link: string
	text: string | string[]
}

export default function Reason({ link, text }: IReason) {
	return (
		<div className='mb-4 md:mb-0 w-full md:w-auto flex md:flex-col items-center md:justify-between'>
			<div className='relative aspect-square w-full max-w-15 md:max-w-20 lg:max-w-30 xl:max-w-40 mr-2 md:mr-0'>
				<Image src={link} alt='Quality icon' fill className='object-contain' />
			</div>
			<div className='text-left md:text-center'>
				{Array.isArray(text) ? (
					<div>
						<h3 className='hidden md:block'>
							{text.map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</h3>

						<h3 className='block md:hidden'>{text.join(' ')}</h3>
					</div>
				) : (
					<h3>{text}</h3>
				)}
			</div>
		</div>
	)
}
