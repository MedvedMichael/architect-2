import { Module } from '@nestjs/common';
import { FlatsModule } from './modules/flats/flats.module';
import { CacheModule } from './modules/cache/cache.module';
@Module({
  imports: [FlatsModule, CacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
