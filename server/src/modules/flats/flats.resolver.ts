import SearchQuery from '@interfaces/search-query-interface';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlatsService } from './flats.service';
import { FlatDTO, ProvidedFlat, ProvidedFlatDTO } from './providers/provider';

@Resolver('graphql/flats')
export class FlatsResolver {
  constructor(private flatsService: FlatsService) {}

  @Query('flats')
  async getFlats(@Args('input') query: SearchQuery): Promise<ProvidedFlat[]> {
    return this.flatsService.searchFlats(query);
  }

  @Mutation('createFlat')
  async createFlat(@Args('input') flat: FlatDTO): Promise<ProvidedFlat> {
    try {
      const flatID = (await this.flatsService.createFlat(flat)) as number;
      return { ...flat, flatID, provider: 'server' };
    } catch (error) {
      return error;
    }
  }

  @Mutation('updateFlat')
  async updateFlat(
    @Args('input') providedFlat: ProvidedFlatDTO,
    @Args('flatID') flatID: number,
  ): Promise<void> {
    const { provider, ...flat } = providedFlat;
    return this.flatsService.updateFlat({ flatID, ...flat });
  }

  @Mutation('deleteFlat')
  async deleteFlat(@Args('flatID') flatID: number): Promise<void> {
    this.flatsService.deleteFlat(flatID);
  }
}
