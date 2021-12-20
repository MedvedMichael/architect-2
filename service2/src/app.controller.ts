import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/price-list')
  async getHello(
    @Query('page') page: number
  ) {
    return await this.appService.getPriceList(page);
  }

  @Get('/details/:id')
  async getDetailedFlat(
    @Param('id') id: number
  ) {
    return await this.appService.getDetailedFlat(id)
  }
}
