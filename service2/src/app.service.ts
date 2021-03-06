import { Injectable, NotFoundException } from '@nestjs/common';
import { PgService } from './pg/pg.service';

@Injectable()
export class AppService {
  constructor(private pgService: PgService) {}

  async getPriceList(page: number) {
    const count = 5000
    try {
      const res = await this.pgService.useQuery(
        'SELECT "flatID", "cost", CONCAT("street", \' \', "houseNumber", \', square: \', "square") as "summary" FROM "Flats" OFFSET $1 LIMIT $2', [(page-1)*count, count]
      );
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getDetailedFlat(id: number) {
    try {
      const res = await this.pgService.useQuery(
        'SELECT * FROM "Flats" WHERE "flatID" = ' + id,
      );
      if (res.rows.length === 0) {
        throw new Error();
      }
      return res.rows[0];
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
