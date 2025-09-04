import crypto from 'crypto'

export async function POST(req: Request) {
	try {
		const { amount, description, successUrl, failureUrl, shopOrderNumber } =
			await req.json()

		const PAYEE_ID = process.env.PORTMONE_PAYEE_ID as string
		const LOGIN = process.env.PORTMONE_LOGIN as string
		const KEY = process.env.PORTMONE_PASSWORD as string

		// === 1. Create dt (yyyyMMddHHmmss) ===
		const dt = new Date().toISOString().replace(/[-T:]/g, '').slice(0, 19)

		// === 2. shopOrderNumber to string (or empty) ===
		const orderStr = shopOrderNumber ? String(shopOrderNumber) : ''

		// === 3. strToSignature ===
		let strToSignature =
			PAYEE_ID + dt + Buffer.from(orderStr).toString('hex') + amount

		strToSignature =
			strToSignature.toUpperCase() +
			Buffer.from(LOGIN).toString('hex').toUpperCase()

		// === 4. signature ===
		const signature = crypto
			.createHmac('sha256', KEY)
			.update(strToSignature)
			.digest('hex')
			.toUpperCase()

		// === 5. Payload ===
		const payload = {
			payee: {
				payeeId: PAYEE_ID,
				login: LOGIN,
				dt,
				signature,
			},
			order: {
				description,
				shopOrderNumber: orderStr,
				billAmount: amount,
				successUrl,
				failureUrl,
			},
		}

		return Response.json(payload, { status: 200 })
	} catch (err) {
		console.error('Portmone init error:', err)
		return Response.json({ error: 'Payment init failed' }, { status: 500 })
	}
}
