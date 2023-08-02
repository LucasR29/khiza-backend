import { Injectable } from '@nestjs/common';
import { CollectionRepostory } from 'src/repositories/collection.repository';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Collection } from 'src/entities/collection';

@Injectable()
export class PrismaCollectionRepository implements CollectionRepostory {
	constructor(private prismaService: PrismaService) {}

	async create(collection: Collection): Promise<Collection> {
		const collExist = await this.prismaService.collection.findUnique({
			where: { id: collection.getID },
		});

		if (!collExist) {
			const coll = await this.prismaService.collection.create({
				data: {
					id: collection.getID,
					name: collection.name,
					description: collection.description,
					floorSale: collection.floorSale as unknown as Prisma.JsonValue,
					floorSaleChange:
						collection.floorSaleChange as unknown as Prisma.JsonValue,
					contract: collection.contract,
				},
			});

			return coll as unknown as Collection;
		}

		return collExist as unknown as Collection;
	}

	async retrieve(contract: string): Promise<Collection | { message: string }> {
		const collExist = await this.prismaService.collection.findUnique({
			where: { id: contract },
		});

		if (!collExist) {
			console.log('aaaaaaaaaaa');
			return { message: 'Collection not found' };
		}

		return collExist as unknown as Collection;
	}

	async update(collection: Collection): Promise<void> {
		await this.prismaService.collection.update({
			where: { id: collection.getID },
			data: {
				name: collection.name,
				description: collection.description,
				floorSale: collection.floorSale as unknown as Prisma.JsonValue,
				floorSaleChange:
					collection.floorSaleChange as unknown as Prisma.JsonValue,
				contract: collection.contract,
			},
		});
	}

	async retrieveAll(startDate: Date, endDate: Date): Promise<Collection[]> {
		const whereCondition: any = {};

		if (startDate && endDate) {
			whereCondition.createdAt = {
				gte: new Date(startDate).toISOString(),
				lte: new Date(endDate).toISOString(),
			};
		} else if (startDate) {
			whereCondition.createdAt = {
				gte: new Date(startDate).toISOString(),
			};
		} else if (endDate) {
			whereCondition.createdAt = {
				lte: new Date(endDate).toISOString(),
			};
		}

		const collections = await this.prismaService.collection.findMany({
			where: whereCondition,
		});

		return collections as unknown as Collection[];
	}
}
