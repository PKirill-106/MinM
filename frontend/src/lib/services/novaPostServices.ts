import { IArea, ICity, IWarehouse } from '@/types/Interfaces'

const API_URL = 'https://api.novaposhta.ua/v2.0/json/'

const apiKey = process.env.NOVA_POST_API_KEY!

interface INovaPostRequest {
	apiKey: string
	modelName: string
	calledMethod: string
	methodProperties?: Record<string, string | number>
}

async function fetchNovaPost<T>(body: INovaPostRequest): Promise<T[]> {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	const data = await res.json()
	if (!data.success) {
		console.error('NovaPost error:', data.errors)
		return []
	}
	return data.data as T[]
}

export async function getAreas() {
	return fetchNovaPost<IArea>({
		apiKey,
		modelName: 'Address',
		calledMethod: 'getAreas',
	})
}

export async function getCities(areaRef: string) {
	return fetchNovaPost<ICity>({
		apiKey,
		modelName: 'Address',
		calledMethod: 'getCities',
		methodProperties: { AreaRef: areaRef },
	})
}

export async function getWarehouses(cityRef: string) {
	return fetchNovaPost<IWarehouse>({
		apiKey,
		modelName: 'AddressGeneral',
		calledMethod: 'getWarehouses',
		methodProperties: { CityRef: cityRef },
	})
}
