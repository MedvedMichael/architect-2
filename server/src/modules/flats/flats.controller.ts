import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Flat, FlatDTO } from './flat-builder';
import { FlatsService } from './flats.service';
import SearchQuery from './search-query-interface';

@Controller('flats')
export class FlatsController {
  constructor(private flatsService: FlatsService) {}
  @Get('/search')
  searchFlats(@Query() query: SearchQuery) {
    return this.flatsService.searchFlats(query);
  }

  @Patch('/update')
  async updateFlat(@Body() flat: Flat): Promise<void> {
    return this.flatsService.updateFlat(flat);
  }

  @Post('/new')
  async createFlat(@Body() flatDTO: FlatDTO): Promise<Flat> {
    const flatID = (await this.flatsService.createFlat(flatDTO)) as number;
    return { ...flatDTO, flatID };
  }

  @Delete('/remove')
  async deleteFlat(@Body('flatID') flatID: number): Promise<void> {
    return this.flatsService.deleteFlat(flatID);
  }
}
