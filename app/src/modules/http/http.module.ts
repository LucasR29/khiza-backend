import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/databse.module';
import { CollectionService } from 'src/services/collection.service';
import { CollectionsSetService } from 'src/services/collections-set.service';
import { CollectionsController } from './controllers/collection.controller';
import { CollectionSetController } from './controllers/collection-set.controller';
import { SyncCollectionsController } from './controllers/sync-collections.controller';
import { UserService } from 'src/services/user.service';
import { AuthService } from '../../services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';

@Module({
	imports: [
		DatabaseModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '30d' },
		}),
	],
	controllers: [
		CollectionsController,
		CollectionSetController,
		SyncCollectionsController,
		AuthController,
		UserController,
	],
	providers: [
		CollectionService,
		CollectionsSetService,
		UserService,
		AuthService,
	],
	exports: [UserService],
})
export class HttpModule {}
