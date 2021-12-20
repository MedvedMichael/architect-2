import { Module } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService, PgService],
})
export class CacheModule {}
