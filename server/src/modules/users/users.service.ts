import { BadRequestException, Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import User, { UserDTO } from './user.interface';

@Injectable()
export class UsersService {
  private pgService = PgService.getInstance();
  private tableName = 'Users';
  async createUser(userDTO: UserDTO): Promise<number> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [userDTO],
      returning: 'userID',
    });
    // console.log(res)
    if (!res.rowCount) throw new BadRequestException();
    return res.rows[0].userID;
  }

  async getUserByID(userID: number): Promise<User> {
    return this.pgService.findOne({
      tableName: this.tableName,
      where: [{ key: 'userID', value: userID }],
    });
  }

  async updateUser(user: User) {
    const { userID, ...restUser } = user;
    return this.pgService.update({
      tableName: this.tableName,
      updates: restUser as unknown as Record<string, unknown>,
      where: [{ key: 'userID', value: userID }],
    });
  }

  async deleteUser(userID: number) {
    return this.pgService.delete({
      tableName: this.tableName,
      where: [{ key: 'userID', value: userID }],
    });
  }
}
