import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import FilteredProvider from '../flats/providers/filtered-provider';
import MainProvider from '../flats/providers/main-provider';
import NonFilteredProvider from '../flats/providers/non-filtered-provider';
import { ProvidedFlat, ProvidedFlatDTO } from '../flats/providers/provider';
import { PgService } from '../pg/pg.service';
const schedule = require('node-schedule');
let firstTime = true
@Injectable()
export class CacheService implements OnModuleInit {
  
  constructor(private pgService: PgService) {}

  async onModuleInit() {
    // if (firstTime) {
    //   firstTime = false;
    //   await this.cacheAllData();
    //   schedule.scheduleJob({ hour: 0, minute: 5 }, () => {
    //     this.cacheAllData();
    //   });
    // }
  }

  async cacheAllData() {
    await this.pgService.useQuery(
      `TRUNCATE "CachedFlats"; INSERT INTO "CachedFlats" SELECT * FROM "Flats"`,
    );
    const nonFilteredProvider = new NonFilteredProvider();
    const filteredProvider = new FilteredProvider();
    nonFilteredProvider.getFilteredData({}, async (flats) => {
      await this.saveFlats(flats);
    });
    const filteredFlats = await filteredProvider.getFilteredData({});
    this.saveFlats(filteredFlats);
  }

  async saveFlats(flats: ProvidedFlat[]) {
    if (flats.length !== 0)
      return this.pgService.create({ tableName: 'CachedFlats', values: flats });
  }

  async updateCachedFlat(providedFlat: ProvidedFlat) {
    const { provider, flatID, ...flat } = providedFlat;
    this.pgService.update({
      tableName: 'CachedFlats',
      updates: flat as unknown as Record<string, unknown>,
      where: [
        { key: 'flatID', value: flatID },
        { key: 'provider', value: provider },
      ],
    });
  }

  async deleteCachedFlat(flatID: number, provider: string) {
    this.pgService.delete({
      tableName: 'CachedFlats',
      where: [
        { key: 'flatID', value: flatID },
        { key: 'provider', value: provider },
      ],
    });
  }
}
