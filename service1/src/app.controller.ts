import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import SearchQuery from './search-query-interface';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/search')
  searchFlats(
    @Query() query: SearchQuery
  ) {
    return this.appService.searchFlats(query);
  }
}
