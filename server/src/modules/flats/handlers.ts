import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { Flat, FlatBuilder, FlatDTO } from './flat-builder';

export class Chain<T> {
  private chain: Handler<T>;
  constructor(handlers: Handler<T>[]) {
    this.createChain(handlers);
  }
  private createChain(handlers: Handler<T>[]) {
    for (let i = 0; i < handlers.length - 1; i++) {
      handlers[i].setNextHandler(handlers[i + 1]);
    }
    this.chain = handlers[0];
  }
  async handle(req: T): Promise<unknown> {
    return this.chain.handle(req);
  }
}

export abstract class Handler<T> {
  handler!: Handler<T>;
  setNextHandler(handler: Handler<T>) {
    this.handler = handler;
  }

  async handle(req: T): Promise<void> {
    if (this.handler) {
      this.handler.handle(req);
    }
  }
}

export class CheckExistHandler extends Handler<Flat> {
  private builder = new FlatBuilder();
  async handle(flat: Flat): Promise<void> {
    const oldFlat = await this.builder.getFlatByID(flat.flatID);
    if (!oldFlat) {
      throw new NotFoundException();
    }
    super.handle(flat);
  }
}

export class CheckFieldsHandler extends Handler<FlatDTO> {
  async handle(flat: FlatDTO): Promise<void> {
    if (
      flat.builtYear > new Date().getFullYear() ||
      flat.cost < 0 ||
      flat.floor < 1 ||
      flat.rooms < 0
    ) {
      throw new BadRequestException();
    }
    super.handle(flat);
  }
}

export class UpdateHandler extends Handler<Flat> {
  private pgService: PgService = PgService.getInstance();
  async handle(flat: Flat): Promise<void> {
    await this.pgService.update<Flat>({
      tableName: 'Flats',
      updates: { ...flat },
      where: [{ key: 'flatID', value: flat.flatID }],
    });
    super.handle(flat);
  }
}

export class CreateHandler extends Handler<FlatDTO> {
  private pgService: PgService = PgService.getInstance();
  async handle(flat: FlatDTO): Promise<void> {
    const res = await this.pgService.create<FlatDTO>({
      tableName: 'Flats',
      values: [flat],
      returning: 'flatID',
    });
    super.handle(flat);
    return res.rows[0].flatID;
  }
}

export class DeleteHandler extends Handler<{ flatID: number }> {
  private pgService: PgService = PgService.getInstance();
  async handle({ flatID }: { flatID: number }): Promise<void> {
    await this.pgService.delete({
      tableName: 'Flats',
      where: [{ key: 'flatID', value: flatID }],
    });
    super.handle({ flatID });
  }
}
