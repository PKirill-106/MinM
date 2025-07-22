declare module 'cleave.js/react' {
	import * as React from 'react'

	interface CleaveOptions {
		phone?: boolean
		phoneRegionCode?: string
		delimiters?: string[]
		blocks?: number[]
		numeral?: boolean
		numeralDecimalMark?: string
		delimiter?: string
		prefix?: string
		rawValueTrimPrefix?: boolean
	}

	interface CleaveProps extends React.InputHTMLAttributes<HTMLInputElement> {
		options?: CleaveOptions
		onChange?: (event: any) => void
	}

	export default class Cleave extends React.Component<CleaveProps> {}
}
