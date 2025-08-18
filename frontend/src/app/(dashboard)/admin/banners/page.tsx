import BannerClientPage from '@/components/admin/banners/BannerClientPage'
import { getBannerImages } from '@/lib/services/bannerServices'
import { IBanner, IUpdateBanner } from '@/types/Interfaces'
import { useCallback } from 'react'

export default async function BannersPage() {
	const banners: IBanner[] = await getBannerImages()

	return <BannerClientPage banners={banners} />
}
