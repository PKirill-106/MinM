import BannerClientPage from '@/components/admin/banners/BannerClientPage'
import { getBannerImages } from '@/lib/services/bannerServices'
import { IBanner } from '@/types/Interfaces'

export default async function BannersPage() {
	const banners: IBanner[] = await getBannerImages()

	return <BannerClientPage banners={banners} />
}
