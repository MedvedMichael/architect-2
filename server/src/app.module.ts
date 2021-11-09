import { Module } from '@nestjs/common';
import { FlatsModule } from './modules/flats/flats.module';
@Module({
  imports: [FlatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
