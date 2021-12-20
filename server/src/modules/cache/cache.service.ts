import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import FilteredProvider from '../flats/providers/filtered-provider';
import MainProvider from '../flats/providers/main-provider';
import NonFilteredProvider from '../flats/providers/non-filtered-provider';
import { ProvidedFlat } from '../flats/providers/provider';
import { PgService } from '../pg/pg.service';

@Injectable()
export class CacheService implements OnApplicationBootstrap {
  constructor(private pgService: PgService) {}

  async onApplicationBootstrap() {
    await this.cacheAllData();
  }

  async cacheAllData() {
    // await this.pgService.useQuery(
    //   `TRUNCATE "CachedFlats"; INSERT INTO "CachedFlats" SELECT * FROM "Flats"`,
    // );
    const nonFilteredProvider = new NonFilteredProvider();
    // const filteredProvider = new FilteredProvider();
    nonFilteredProvider.getFilteredData({}, async (flats) => {
      await this.saveFlats(flats);
    });
    // const filteredFlats = await filteredProvider.getFilteredData({});
    // this.saveFlats(filteredFlats);
  }

  async saveFlats(flats: ProvidedFlat[]) {
    if (flats.length !== 0)
      return this.pgService.create({ tableName: 'CachedFlats', values: flats });
  }
}
