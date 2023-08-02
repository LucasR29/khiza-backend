import { CollectionsSet } from 'src/entities/collections-set';

export abstract class CollectionsSetRepository {
	abstract create(collectionsSet: CollectionsSet): Promise<CollectionsSet>;
	abstract retrieve(id: string): Promise<CollectionsSet | { message: string }>;
	abstract retrieveAll(): Promise<CollectionsSet[]>;
}
