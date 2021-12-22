import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User, { UserDTO } from './user.interface';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('getUserByID')
  async getUserByID(@Args('userID') userID: number): Promise<User> {
    const res = await this.usersService.getUserByID(userID);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Mutation('createUser')
  async createUser(@Args('input') userDTO: UserDTO): Promise<User> {
    const userID = await this.usersService.createUser(userDTO);
    return { ...userDTO, userID };
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('input') userDTO: UserDTO,
    @Args('userID') userID: number,
  ): Promise<void> {
    this.usersService.updateUser({ userID, ...userDTO });
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('userID') userID: number): Promise<void> {
    this.usersService.deleteUser(userID);
  }
}
