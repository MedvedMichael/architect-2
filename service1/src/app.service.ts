import { Injectable } from '@nestjs/common';
import { PgService } from './pg/pg.service';
import SearchQuery from './search-query-interface';

@Injectable()
export class AppService {
  constructor(private pgService: PgService) {}
  async searchFlats(query: SearchQuery) {
    Object.keys(query).forEach((key) =>
      query[key] === '' ? delete query[key] : undefined,
    );
    const request =
      'SELECT * FROM "Flats"' +
      (Object.keys(query).length !== 0 ? ' WHERE ' : '');
    let addition = [];
    if (query.minPrice) {
      addition.push('"cost" > ' + query.minPrice);
    }
    if (query.maxPrice) {
      addition.push('"cost" < ' + query.maxPrice);
    }
    if (query.rooms) {
      addition.push('rooms = ' + query.rooms);
    }
    if (query.street && query.street !== '') {
      addition.push('"street" ILIKE ' + "'%" + query.street + "%'");
    }

    const res = await this.pgService.useQuery(request + addition.join(' AND '));
    const flats = res.rows;
    return flats;
  }
}
