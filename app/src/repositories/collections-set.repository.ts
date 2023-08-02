import { CollectionSet } from 'src/entities/collection-set';

export abstract class CollectionsSetRepository {
	abstract create(collectionsSet: CollectionSet): Promise<CollectionSet>;
	abstract retrieve(id: string): Promise<CollectionSet | { message: string }>;
	abstract retrieveAll(): Promise<CollectionSet[]>;
}
