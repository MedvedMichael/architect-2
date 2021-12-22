import { Module } from '@nestjs/common';
import { FlatsModule } from './modules/flats/flats.module';
import { CacheModule } from './modules/cache/cache.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { PurchaseAgreementModule } from './modules/purchase-agreement/purchase-agreement.module';
@Module({
  imports: [FlatsModule, CacheModule, GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql']
  }), UsersModule, PurchaseAgreementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
