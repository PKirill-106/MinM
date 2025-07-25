'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProductsFromWishList(token: string) {
	const res = await fetch(
		`${API_URL}/WhisList/GetAllProductsFromWishList`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	if (!res.ok && res.status !== 404) throw new Error('Failed to fetch wishlist')

	const { data } = await res.json()

	return data
}

export async function getProductFromWishList(token: string) {
	const res = await fetch(
		`${API_URL}/WhisList/GetProductFromWishList?productId=${token}`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	if (!res.ok) throw new Error('Product is not in wishlist')
	return res.json()
}

export async function addProductToWishList(productId: string, token: string) {
	const res = await fetch(
		`${API_URL}/WhisList/AddProductToWishList?productId=${productId}`,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	if (!res.ok) throw new Error(`Add to wishlist failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function updateWishList(wishlistItemId: string[], token: string) {
	const res = await fetch(`${API_URL}/WhisList/UpdateWishList`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(wishlistItemId),
	})

	if (!res.ok) throw new Error(`Update wishlist failed: ${res.status}`)

	const { data } = await res.json()

	return data
}

export async function removeProductFromWishList(
	wishlistItemId: string,
	token: string
) {
	const res = await fetch(
		`${API_URL}/WhisList/RemoveWishList?whishListItemId=${wishlistItemId}`,
		{
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	)
	
	if (!res.ok) throw new Error(`Remove from wishlist failed: ${res.status}`)

	const { data } = await res.json()

	return data
}
