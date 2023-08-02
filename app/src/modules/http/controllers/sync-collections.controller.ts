import { Controller, Post, HttpCode } from '@nestjs/common';
import { CollectionService } from 'src/services/collection.service';

@Controller('sync')
export class SyncCollectionsController {
	constructor(private collectionService: CollectionService) {}

	@Post()
	@HttpCode(200)
	async syncColl(): Promise<{ message: string }> {
		const res = await this.collectionService.syncCollections();

		return { message: res };
	}
}
