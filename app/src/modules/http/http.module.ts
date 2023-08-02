import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/databse.module';
import { CollectionService } from 'src/services/collection.service';
import { CollectionsSetService } from 'src/services/collections-set.service';
import { CollectionsController } from './controllers/collection.controller';
import { CollectionsSetController } from './controllers/collections-set.controller';
import { SyncCollectionsController } from './controllers/sync-collections.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [
		CollectionsController,
		CollectionsSetController,
		SyncCollectionsController,
	],
	providers: [CollectionService, CollectionsSetService],
})
export class HttpModule {}
