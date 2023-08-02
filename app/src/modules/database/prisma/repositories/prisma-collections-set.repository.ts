import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { CollectionsSet } from 'src/entities/collections-set';

@Injectable()
export class PrismaCollectionsSetRepository
	implements CollectionsSetRepository
{
	constructor(private prismaService: PrismaService) {}

	async create(collectionsSet: any): Promise<CollectionsSet> {
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

		return set as unknown as CollectionsSet;
	}

	async retrieve(id: string): Promise<CollectionsSet | { message: string }> {
		const collExist = await this.prismaService.colectionsSet.findUnique({
			where: { id: id },
			include: { collections: true },
		});

		if (!collExist) {
			return { message: 'No collections set found' };
		}

		return collExist as unknown as CollectionsSet;
	}

	async retrieveAll(): Promise<CollectionsSet[]> {
		const collectionsSets = await this.prismaService.colectionsSet.findMany();

		return collectionsSets as unknown as CollectionsSet[];
	}
}
