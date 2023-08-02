import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/databse.module';
import { HttpModule } from './modules/http/http.module';

@Module({
	imports: [DatabaseModule, HttpModule],
})
export class AppModule {}
