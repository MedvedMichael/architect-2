import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { Flat, FlatBuilder, FlatDTO } from './flat-builder';
import {
  Chain,
  CheckExistHandler,
  CheckFieldsHandler,
  CreateHandler,
  DeleteHandler,
  UpdateHandler,
} from './handlers';
import SearchQuery from './search-query-interface';

@Injectable()
export class FlatsService {
  private builder = new FlatBuilder();

  constructor(private cacheService: CacheService) {}
  async searchFlats(query: SearchQuery): Promise<Flat[]> {
    this.builder.setFlatParams(query);
    return await this.builder.getSuitableFlats();
  }

  async updateFlat(flat: Flat): Promise<void> {
    const handlers = [
      new CheckExistHandler(),
      new CheckFieldsHandler(),
      new UpdateHandler(),
    ];
    const chain = new Chain(handlers);
    chain.handle(flat);
    this.cacheService.updateCachedFlat({ ...flat, provider: 'server' });
  }

  async createFlat(flatDTO: FlatDTO): Promise<number> {
    const handlers = [new CheckFieldsHandler(), new CreateHandler()];
    const chain = new Chain(handlers);
    const flatID = (await chain.handle(flatDTO)) as number;
    await this.cacheService.saveFlats([
      { flatID, ...flatDTO, provider: 'server' },
    ]);
    return flatID;
  }

  async deleteFlat(flatID: number) {
    const handlers = [new CheckExistHandler(), new DeleteHandler()];
    const chain = new Chain(handlers);
    chain.handle({ flatID });
    this.cacheService.deleteCachedFlat(flatID, 'server')
  }
}
