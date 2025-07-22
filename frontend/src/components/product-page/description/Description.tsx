import React from 'react'
import { IDescription } from '../interfaces'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import './description.css'

export default function Description({ description }: IDescription) {
	let html = ''

	try {
		if (
			description.trim().startsWith('{') ||
			description.trim().startsWith('[')
		) {
			const parsed = JSON.parse(description)
			const ops = Array.isArray(parsed) ? parsed : parsed.ops

			if (Array.isArray(ops)) {
				const converter = new QuillDeltaToHtmlConverter(ops, {
					inlineStyles: true,
				})
				html = converter.convert()
			}
		} else {
			html = `<p>${description}</p>`
		}
	} catch (err) {
		console.warn('Invalid description format:', err)
		html = `<p>${description}</p>` // fallback
	}

	return (
		<div className='flex flex-col'>
			<div className='p-3 bg-white rounded-lg mb-8'>
				<h1>Опис</h1>
			</div>
			{html.length ? (
				<div
					className='px-3 description-content'
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			) : (
				<h3 className='text-center'>Опис відсутній</h3>
			)}
		</div>
	)
}
