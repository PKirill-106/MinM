import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '40mb',
		},
	},
	output: 'standalone',
}

export default nextConfig
