import { Collection } from 'src/entities/collection';

export abstract class CollectionRepostory {
	abstract create(collection: Collection): Promise<Collection>;
	abstract retrieve(
		contract: string,
	): Promise<Collection | { message: string }>;
	abstract retrieveAll(startDate: Date, endDate: Date): Promise<any[]>;
	abstract update(collection: Collection): Promise<void>;
}
