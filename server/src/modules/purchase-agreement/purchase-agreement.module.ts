import { Module } from '@nestjs/common';
import { PurchaseAgreementService } from './purchase-agreement.service';
import { PurchaseAgreementResolver } from './purchase-agreement.resolver';
import { FlatsService } from '../flats/flats.service';
import { CacheService } from '../cache/cache.service';
import { PgService } from '../pg/pg.service';

@Module({
  providers: [
    PurchaseAgreementService,
    PurchaseAgreementResolver,
    FlatsService,
    CacheService, 
    PgService
  ],
})
export class PurchaseAgreementModule {}
