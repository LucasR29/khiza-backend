import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { CollectionSet } from 'src/entities/collection-set';

@Injectable()
export class PrismaCollectionsSetRepository
	implements CollectionsSetRepository
{
	constructor(private prismaService: PrismaService) {}

	async create(collectionsSet: any): Promise<CollectionSet> {
		const collsIDS = [];

		collectionsSet.collections.forEach((x) => {
			collsIDS.push({ id: x.collection.getID });
		});

		const set = await this.prismaService.colectionsSet.create({
			data: {
				id: collectionsSet.getID,
				collections: {
					connect: collsIDS,
				},
				createdAt: new Date(),
			},
		});

		return set as unknown as CollectionSet;
	}

	async retrieve(id: string): Promise<CollectionSet | { message: string }> {
		const collExist = await this.prismaService.colectionsSet.findUnique({
			where: { id: id },
			include: { collections: true },
		});

		if (!collExist) {
			return { message: 'No collections set found' };
		}

		return collExist as unknown as CollectionSet;
	}

	async retrieveAll(): Promise<CollectionSet[]> {
		const collectionsSets = await this.prismaService.colectionsSet.findMany({
			include: { collections: true },
		});

		return collectionsSets as unknown as CollectionSet[];
	}
}
