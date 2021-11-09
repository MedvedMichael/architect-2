import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/price-list')
  async getHello() {
    return await this.appService.getPriceList();
  }

  @Get('/details/:id')
  async getDetailedFlat(
    @Param('id') id: number
  ) {
    return await this.appService.getDetailedFlat(id)
  }
}
