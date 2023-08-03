import { Injectable } from '@nestjs/common';
import {
	retrieveCollection,
	syncCollection,
} from 'src/api/reservoir/reservoir';
import { Collection } from 'src/entities/collection';
import { CollectionRepostory } from 'src/repositories/collection.repository';

interface SendCollectionRequest {
	contract: string;
}

interface SendCollectionResponse {
	collection: Collection;
}

@Injectable()
export class CollectionService {
	constructor(private collectionRepository: CollectionRepostory) {}
	async execute(
		request: SendCollectionRequest,
	): Promise<SendCollectionResponse> {
		const { contract } = request;

		const collInfo = await retrieveCollection(contract);

		if (collInfo.collections.length > 0) {
			const collection = new Collection({
				contract,
				name: collInfo.collections[0].name,
				floorSale: collInfo.collections[0].floorSale,
				floorSaleChange: collInfo.collections[0].floorSaleChange,
				description:
					collInfo.collections[0].description ?? collInfo.collections[0].name,
			});

			await this.collectionRepository.create(collection);

			return { collection };
		}

		const collection = new Collection({
			contract,
			name: 'invalid',
			floorSale: JSON.parse(JSON.stringify({ invalid: 'invalid' })),
			floorSaleChange: JSON.parse(JSON.stringify({ invalid: 'invalid' })),
			description: 'invalid',
		});

		return { collection };
	}

	async retrieve(id: string): Promise<Collection | { message: string }> {
		const collection = await this.collectionRepository.retrieve(id);

		return collection;
	}

	async updateCollections(id: string): Promise<void> {
		const collectionNewData = await retrieveCollection(id);

		const collectionOldData = await this.collectionRepository.retrieve(id);

		if (collectionOldData) {
			const newData = new Collection({
				contract: id,
				name: collectionNewData.collections[0].name,
				floorSale: collectionNewData.collections[0].floorSale,
				floorSaleChange: collectionNewData.collections[0].floorSaleChange,
				description:
					collectionNewData.collections[0].description ??
					collectionNewData.collections[0].name,
			});

			await this.collectionRepository.update(newData);
		}
	}

	async syncCollections(): Promise<string> {
		const collections = await this.collectionRepository.retrieveAll(null, null);

		let error: any = '';

		await Promise.all(
			collections.map(async (x) => {
				await syncCollection(x.id).catch((err) => {
					if (!err.message.includes('425')) {
						error = err.message;
					}
				});
				await this.updateCollections(x.id);
			}),
		);

		if (error.length > 1) {
			return error;
		}
		return 'All collections updated';
	}

	async retrieveData(startDate: Date, endDate: Date): Promise<any> {
		const collections = await this.collectionRepository.retrieveAll(
			startDate,
			endDate,
		);

		let low = 0;
		let high = 0;

		if (collections.length > 0) {
			const floorChange = JSON.parse(
				JSON.stringify(collections[0].floorSaleChange),
			);
			const month = floorChange['30day'];
			low = month;
		}

		const arr = collections.map((x) => {
			const floorChange = JSON.parse(JSON.stringify(x.floorSaleChange));
			const month = floorChange['30day'];

			if (month < low) {
				low = month;
			}
			if (month > high && month < 100) {
				high = month;
			}

			return month;
		});

		const sum = arr.reduce((acc, cv) => {
			if (cv < 100) {
				const percentage = (cv - 1) * 100;

				return (acc += percentage);
			}
			return acc;
		}, 0);

		const average = (sum / arr.filter((x) => x < 100).length).toFixed(2);

		return {
			minFloorSaleChange: low,
			maxFloorSaleChange: high,
			averageFloorSaleChange30Days: `${average}%`,
		};
	}

	async retrieveAll(): Promise<Collection[]> {
		const collections = await this.collectionRepository.retrieveAll(null, null);

		return collections;
	}
}
