import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CollectionService } from 'src/services/collection.service';
import { createCollectionBody } from '../dtos/create-collection.dto';
import { Collection } from 'src/entities/collection';

@Controller('collection')
export class CollectionsController {
	constructor(private createCollection: CollectionService) {}

	@Post()
	async create(@Body() body: createCollectionBody, @Res() res) {
		const { contract } = body;

		const { collection } = await this.createCollection.execute({
			contract,
		});

		if (collection.name == 'invalid') {
			return res
				.status(400)
				.json({ error: 'Collection does not exist in Reservoir' });
		}

		return res.status(201).json({
			id: collection.getID,
			contract: collection.contract,
			name: collection.name,
			floorSale: collection.floorSale,
			floorSaleChange: collection.floorSaleChange,
			description: collection.description,
			createdAt: collection.createdAt,
		});
	}

	@Get()
	async retriveData(
		@Query('startDate') startDate?: Date,
		@Query('endDate') endDate?: Date,
	): Promise<any> {
		const collectionsData = await this.createCollection.retrieveData(
			startDate,
			endDate,
		);

		return collectionsData;
	}

	@Get('all')
	async retrieveAll(): Promise<Collection[]> {
		const collections = await this.createCollection.retrieveAll();

		return collections;
	}

	@Get(':id')
	async retrive(
		@Param('id') id: string,
		@Res() res,
	): Promise<Collection | { message: string }> {
		const collection = await this.createCollection.retrieve(id);

		if (Object.keys(collection).includes('message')) {
			return res.status(400).json({
				message: 'Collection not found',
			});
		}

		return res.status(200).json(collection);
	}
}
