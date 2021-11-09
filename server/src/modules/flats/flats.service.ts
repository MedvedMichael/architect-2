import { Injectable } from '@nestjs/common';
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
  }

  async createFlat(flatDTO: FlatDTO) {
    const handlers = [new CheckFieldsHandler(), new CreateHandler()];
    const chain = new Chain(handlers);
    return chain.handle(flatDTO);
  }

  async deleteFlat(flatID: number) {
    const handlers = [new CheckExistHandler(), new DeleteHandler()];
    const chain = new Chain(handlers);
    chain.handle({ flatID });
  }
}
