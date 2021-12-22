import { Module } from '@nestjs/common';
import { FlatsService } from './flats.service';
import { FlatsController } from './flats.controller';
import { FlatsResolver } from './flats.resolver';
import { CacheService } from '../cache/cache.service';
import { PgService } from '../pg/pg.service';

@Module({
  providers: [FlatsService, FlatsResolver, CacheService, PgService],
  controllers: [FlatsController]
})
export class FlatsModule {}
