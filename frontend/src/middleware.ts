import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
	async req => {
		const token = req.nextauth.token

		if (token?.error === 'REQUIRE_REAUTH') {
			console.log('Token requires re-auth, redirecting to sign-in')
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}

		if (req.nextUrl.pathname.startsWith('/admin')) {
			if (token?.role !== 'Admin') {
				return NextResponse.redirect(new URL('/profile', req.url))
			}
		}

		return NextResponse.next()
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: '/sign-in',
		},
		secret: process.env.NEXTAUTH_SECRET,
	}
)

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*'],
}

