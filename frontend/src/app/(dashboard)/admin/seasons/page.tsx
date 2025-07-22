import SeasonPageClient from '@/components/admin/season/SeasonPageClient'
import { getAllProducts } from '@/lib/services/productServices'
import { getAllSeasons } from '@/lib/services/seasonServices'

export default async function SeasonPage() {
  const seasons = await getAllSeasons()
  const products = await getAllProducts()
  
	return (
		<div>
			<h1 className='mb-10'>Сезони</h1>
			
			<SeasonPageClient seasons={seasons} products={products} />
		</div>
	)
}
