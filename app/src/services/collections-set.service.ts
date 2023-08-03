import { Injectable } from '@nestjs/common';
import { CollectionSet } from 'src/entities/collection-set';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { CollectionService } from './collection.service';
import { retrieveCollection } from 'src/api/reservoir/reservoir';

interface SendCollectionsSetRequest {
	collections: string[];
}

interface SendCollectionsSetResponse {
	collectionSet: CollectionSet;
}

@Injectable()
export class CollectionsSetService {
	constructor(
		private collectionSetRepository: CollectionsSetRepository,
		private createCollection: CollectionService,
	) {}
	async execute(
		request: SendCollectionsSetRequest,
	): Promise<SendCollectionsSetResponse> {
		const { collections } = request;

		const collArr = [];

		const promises = collections.map(async (x) => {
			const coll = await this.createCollection.execute({ contract: x });
			collArr.push(coll);
		});

		await Promise.all(promises);

		const filterArr = collArr.filter((x) => x.collection.name != 'invalid');

		if (promises) {
			const collectionSet = new CollectionSet({
				collections: filterArr,
			});

			await this.collectionSetRepository.create(collectionSet);

			return { collectionSet };
		}
		return;
	}

	async retrieve(id: string): Promise<CollectionSet | { message: string }> {
		const collectionSet = await this.collectionSetRepository.retrieve(id);

		return collectionSet;
	}

	async retrieveAll(): Promise<CollectionSet[]> {
		const collectionsSets = await this.collectionSetRepository.retrieveAll();

		return collectionsSets;
	}
}
