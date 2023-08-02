import { randomUUID } from 'crypto';
import { CollectionProps } from './collection';

export interface CollectionSetProps {
	collections: CollectionProps[];
	createdAt?: Date;
}

export class CollectionsSet {
	private id: string;
	private props: CollectionSetProps;

	constructor(props: CollectionSetProps) {
		this.id = randomUUID();
		this.props = {
			...props,
			createdAt: props.createdAt ?? new Date(),
		};
	}

	public get getID(): string {
		return this.id;
	}

	public get collections(): CollectionProps[] {
		return this.props.collections;
	}

	public set collections(collections: CollectionProps[]) {
		this.props.collections = collections;
	}
}
