import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CollectionRepostory } from 'src/repositories/collection.repository';
import { PrismaCollectionRepository } from './prisma/repositories/prisma-collections.repository';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { PrismaCollectionsSetRepository } from './prisma/repositories/prisma-collections-set.repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: CollectionRepostory,
			useClass: PrismaCollectionRepository,
		},
		{
			provide: CollectionsSetRepository,
			useClass: PrismaCollectionsSetRepository,
		},
	],
	exports: [CollectionRepostory, CollectionsSetRepository],
})
export class DatabaseModule {}
