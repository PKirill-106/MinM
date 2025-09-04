export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const RESULT = (formData.get('RESULT') as string) || ''
		const SHOPORDERNUMBER = (formData.get('SHOPORDERNUMBER') as string) || ''
		const DESCRIPTION = (formData.get('DESCRIPTION') as string) || ''

		const query = new URLSearchParams({
			RESULT,
      SHOPORDERNUMBER,
			DESCRIPTION,
		}).toString()

		return Response.redirect(
			`${new URL(req.url).origin}/payment/result?${query}`,
			302
		)
	} catch (err) {
		console.error(err)
		return new Response(JSON.stringify({ error: 'Callback failed' }), {
			status: 500,
		})
	}
}
