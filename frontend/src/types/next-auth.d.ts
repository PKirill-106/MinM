import { DefaultSession } from 'next-auth'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      accessToken: string
      refreshToken: string
      expiresAt: string
    }
    error?: 'REQUIRE_REAUTH' | 'REFRESH_FAILED'
  }

  interface User {
		id: string
		email: string
		role: string
		accessToken: string
		refreshToken: string
		expiresAt: string
	}
}

declare module 'next-auth/jwt' {
  interface JWT {
		id: string
		email: string
		role: string
		accessToken: string
		refreshToken: string
		expiresAt: string
		error?: 'REQUIRE_REAUTH' | 'REFRESH_FAILED'
	}
}