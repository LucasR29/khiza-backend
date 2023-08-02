import { Body, Controller, Post, Get, Query, Res } from '@nestjs/common';
import { CollectionsSetService } from 'src/services/collections-set.service';
import { CollectionsSet } from 'src/entities/collections-set';
import { createCollectionsSetBody } from '../dtos/create-collection-set.dto';

@Controller('collections-set')
export class CollectionsSetController {
	constructor(private createCollectionsSet: CollectionsSetService) {}

	@Post()
	async create(@Body() body: createCollectionsSetBody) {
		const { collections } = body;

		const { collectionSet } = await this.createCollectionsSet.execute({
			collections,
		});

		return collectionSet;
	}

	@Get()
	async retrive(
		@Query('id') id: string,
		@Res() res,
	): Promise<CollectionsSet | { message: string }> {
		const collection = await this.createCollectionsSet.retrieve(id);

		if (Object.keys(collection).includes('message')) {
			return res.status(400).json({
				message: 'Collections set not found',
			});
		}

		return res.status(200).json({ collectionSet: collection });
	}

	@Get('all')
	async retriveAll(): Promise<{ collectionsSets: CollectionsSet[] }> {
		const collectionsSets = await this.createCollectionsSet.retrieveAll();

		return { collectionsSets: collectionsSets };
	}
}
