const API_URL = process.env.NEXT_PUBLIC_API_URL

// if (process.env.NODE_ENV === 'development') {
// 	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
// }

export async function codeRequest(email: string) {
	try {
		const res = await fetch(
			`${API_URL}/api/EmailSender/request-confirmation-code`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(email),
			}
		)

		const data = await res.json()

		if (!res.ok) {
			throw new Error(data.message)
		}

		return data
	} catch (error) {
		console.error('[codeRequest] Error:', error)
		throw error
	}
}

export async function confirmEmail(email: string, code: string, token: string) {
	try {
		const res = await fetch(`${API_URL}/api/EmailSender/confirm-email`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, code, token }),
		})

		const data = await res.text()

		if (!res.ok) {
			throw new Error(data)
		}

		console.log('[confirmEmail] success:', data)
		return data
	} catch (error) {
		console.error('[confirmEmail] Error:', error)
		throw error
	}
}
