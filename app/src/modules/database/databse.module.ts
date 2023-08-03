import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CollectionRepostory } from 'src/repositories/collection.repository';
import { PrismaCollectionRepository } from './prisma/repositories/prisma-collections.repository';
import { CollectionsSetRepository } from 'src/repositories/collections-set.repository';
import { PrismaCollectionsSetRepository } from './prisma/repositories/prisma-collections-set.repository';
import { UserRepository } from 'src/repositories/user.repositorty';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

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
		{
			provide: UserRepository,
			useClass: PrismaUserRepository,
		},
	],
	exports: [CollectionRepostory, CollectionsSetRepository, UserRepository],
})
export class DatabaseModule {}
