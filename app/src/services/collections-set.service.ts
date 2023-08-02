import { Injectable } from '@nestjs/common';
import { CollectionsSet } from 'src/entities/collections-set';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { CollectionService } from './collection.service';

interface SendCollectionsSetRequest {
	collections: string[];
}

interface SendCollectionsSetResponse {
	collectionSet: CollectionsSet;
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

		const collectionSet = new CollectionsSet({
			collections: collArr,
		});

		await this.collectionSetRepository.create(collectionSet);

		return { collectionSet };
	}

	async retrieve(id: string): Promise<CollectionsSet | { message: string }> {
		const collectionSet = await this.collectionSetRepository.retrieve(id);

		return collectionSet;
	}

	async retrieveAll(): Promise<CollectionsSet[]> {
		const collectionsSets = await this.collectionSetRepository.retrieveAll();

		return collectionsSets;
	}
}
