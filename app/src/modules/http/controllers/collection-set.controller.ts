import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { CollectionsSetService } from 'src/services/collections-set.service';
import { CollectionSet } from 'src/entities/collection-set';
import { createCollectionsSetBody } from '../dtos/create-collection-set.dto';

@Controller('collection-set')
export class CollectionSetController {
	constructor(private createCollectionsSet: CollectionsSetService) {}

	@Post()
	async create(@Body() body: createCollectionsSetBody) {
		const { collections } = body;

		const { collectionSet } = await this.createCollectionsSet.execute({
			collections,
		});

		const resArr = collectionSet.collections.map((x: any) => {
			return {
				collection: {
					id: x.collection.id,
					contract: x.collection.contract,
					name: x.collection.name,
					floorSale: x.collection.floorSale,
					floorSaleChange: x.collection.floorSaleChange,
					description: x.collection.description,
					createdAt: x.collection.createdAt,
				},
			};
		});

		return { id: collectionSet.getID, collections: resArr };
	}

	@Get()
	async retriveAll(): Promise<{ collectionsSets: CollectionSet[] }> {
		const collectionsSets = await this.createCollectionsSet.retrieveAll();

		return { collectionsSets: collectionsSets };
	}

	@Get(':id')
	async retrive(
		@Res() res,
		@Param('id') id: string,
	): Promise<CollectionSet | { message: string }> {
		if (id) {
			const collection = await this.createCollectionsSet.retrieve(id);

			if (Object.keys(collection).includes('message')) {
				return res.status(400).json({
					message: 'Collections set not found',
				});
			}

			return res.status(200).json({ collectionSet: collection });
		}

		return res
			.status(400)
			.json({ error: 'Canot GET without collection set id' });
	}
}
