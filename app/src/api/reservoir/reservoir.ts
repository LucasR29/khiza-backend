import axios from 'axios';
import { CollectionProps } from 'src/entities/collection';

interface reservoirResponse {
	collections: CollectionProps[];
}

export const api = axios.create({
	baseURL: 'https://api.reservoir.tools/',
	timeout: 10000,
	headers: {
		'content-type': 'application/json',
		'x-api-key': '65218a87-33cd-5387-a4b6-d52a1098baa9',
	},
});

export async function retrieveCollection(
	contract: string,
): Promise<reservoirResponse> {
	const { data } = await api.get<reservoirResponse>(
		`collections/v6?id=${contract}`,
	);

	return data;
}

export async function syncCollection(contract: string): Promise<void> {
	await api.post<any>(`collections/refresh/v2`, {
		collection: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
	});
}
