import {
	Module,
	NestModule,
	MiddlewareConsumer,
	RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './modules/database/databse.module';
import { HttpModule } from './modules/http/http.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CollectionSetMiddleware } from './middlewares/collection-set.middleware';
import { CollectionMiddleware } from './middlewares/collection.middleware';

@Module({
	imports: [DatabaseModule, HttpModule, AuthModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(CollectionSetMiddleware)
			.exclude(
				{ path: 'collection-set', method: RequestMethod.GET },
				'collection-set/(.*)',
			)
			.forRoutes('collection-set');

		consumer
			.apply(CollectionMiddleware)
			.exclude({ path: 'collection', method: RequestMethod.GET })
			.forRoutes('collection');
	}
}
