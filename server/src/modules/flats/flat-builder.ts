import { Inject } from '@nestjs/common';
import { WhereStatement } from '../pg/interfaces/query-params.interface';
import { PgService } from '../pg/pg.service';
import SearchQuery from './search-query-interface';

export interface FlatDTO {
  userID: number;
  cost: number;
  street: string;
  houseNumber: string;
  rooms: number;
  floor: number;
  square: number;
  apartmentCondition: string;
  builtYear: number;
}

export interface Flat extends FlatDTO {
  flatID: number;
}

export class FlatBuilder {
  private params: SearchQuery;
  private pgService: PgService = PgService.getInstance()

  setFlatParams(params: SearchQuery): void {
    this.params = params;
  }

  private generateWhereStatement(): WhereStatement[] {
    const whereStatement: WhereStatement[] = [];
    if (this.params.minPrice) {
      whereStatement.push({
        key: 'cost',
        value: this.params.minPrice,
        comparator: '>=',
      });
    }
    if (this.params.maxPrice) {
      whereStatement.push({
        key: 'cost',
        value: this.params.maxPrice,
        comparator: '<=',
      });
    }
    if (this.params.rooms) {
      whereStatement.push({ key: 'rooms', value: this.params.rooms });
    }
    if (this.params.street) {
      whereStatement.push({
        key: 'street',
        value: `%${this.params.street}%`,
        comparator: 'ILIKE',
      });
    }
    return whereStatement;
  }

  async getSuitableFlats(): Promise<Flat[]> {
    return await this.pgService.find<Flat>({
      tableName: 'Flats',
      where: this.generateWhereStatement(),
    });
  }

  async getFlatByID(id: number): Promise<Flat> {
    return await this.pgService.findOne<Flat>({
      tableName: 'Flats',
      where: [{ key: 'flatID', value: id }],
    });
  }
}
