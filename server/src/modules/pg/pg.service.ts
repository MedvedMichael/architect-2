import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import {
  DeleteParams,
  InsertParams,
  SelectParams,
  UpdateParams,
} from './interfaces/query-params.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

@Injectable()
export class PgService {
  private pool: Pool = new Pool();
  private static pgServiceInstance: PgService;

  static getInstance(): PgService {
    if (!PgService.pgServiceInstance) {
      PgService.pgServiceInstance = new PgService();
    }
    return PgService.pgServiceInstance;
  }

  async create<T>({
    tableName,
    values,
    returning,
  }: InsertParams<T>): Promise<QueryResult> {
    const columnNamesString = Object.keys(values[0])
      .map((key) => `"${key}"`)
      .join(',');

    let counter = 1;

    const requestValues = values.map((value) => Object.values(value)).flat(1);

    const request =
      'INSERT INTO "' +
      tableName +
      '" (' +
      columnNamesString +
      ') VALUES ' +
      values
        .map(
          (value) =>
            '(' +
            Object.values(value)
              .map(() => `$${counter++}`)
              .join(',') +
            ')',
        )
        .join(',') +
      (returning ? `RETURNING "${returning}"` : '');
    try {
      return await this.pool.query(request, requestValues);
    } catch (error) {
      return error as QueryResult;
    }
  }

  async find<T>(
    { query, tableName, where, orderBy }: SelectParams,
    limit?: number,
  ): Promise<T[]> {
    let counter = 1;
    const whereStatements =
      (where?.length !== 0
        ? 'WHERE ' +
          where
            .map(
              ({ key, comparator }) =>
                `"${key}" ${comparator || '='} $${counter++}`,
            )
            .join(' AND ')
        : '') + ' ';

    const orderByStatement = orderBy
      ? `ORDER BY ${orderBy.map(() => counter++)} `
      : ' ';
    const request =
      'SELECT ' +
      (query ? query.map((column) => `"${column}"`).join(',') : '*') +
      ` FROM "${tableName}" ` +
      whereStatements +
      orderByStatement +
      (limit ? `LIMIT ${limit} ` : '');
    const values = [
      ...(where ? where.map((obj) => obj.value) : []),
      ...(orderBy ?? []),
    ];
    try {
      const res = await this.pool.query(request, values);
      return res.rows as T[];
    } catch (error) {
      return error as T[];
    }
  }

  async findOne<T>(params: SelectParams): Promise<T> {
    const res = await this.find<T>(params, 1);
    return res[0];
  }

  async delete({
    tableName,
    where,
    returning,
    cascade,
  }: DeleteParams): Promise<QueryResult | undefined> {
    const request =
      `DELETE FROM "${tableName}" ` +
      (cascade ? 'CASCADE ' : '') +
      `WHERE ` +
      where.map(({ key, comparator }, index) => `"${key}" ${comparator || '='} $${index + 1}`).join(' AND ') +
      (returning ? `RETURNING "${returning}"` : '');
    try {
      return this.pool.query(
        request,
        where.map((obj) => obj.value),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async update<T>({
    tableName,
    updates,
    where,
    returning,
  }: UpdateParams<T>): Promise<QueryResult> {
    let counter = 1;
    const sets = Object.keys(updates)
      .filter((key) => updates[key] !== undefined)
      .map((key) => `"${key}"=$${counter++}`)
      .join(',');

    const whereStatements =
      where
        .map(
          ({ key, comparator }) =>
            `"${key}" ${comparator || '='} $${counter++}`,
        )
        .join(' AND ') + ' ';

    const request =
      `UPDATE "${tableName}" SET ${sets} WHERE ${whereStatements}` +
      (returning ? `Returning "${returning}"` : '');

    try {
      console.log(request);
      return this.pool.query(request, [
        ...Object.values(updates),
        ...where.map((obj) => obj.value),
      ]);
    } catch (error) {
      return error as QueryResult;
    }
  }

  useQuery(request: string, values?: unknown[]): Promise<QueryResult> {
    return this.pool.query(request, values);
  }
}
