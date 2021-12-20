import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import SearchQuery from './search-query-interface';

const setTimeoutPromise = (timeout: number) =>
  new Promise((res) => setTimeout(() => res(undefined), timeout));
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/search')
  async searchFlats(@Query() query: SearchQuery) {
    const flats = await this.appService.searchFlats(query);
    await setTimeoutPromise(200)
    return flats
  }
}
