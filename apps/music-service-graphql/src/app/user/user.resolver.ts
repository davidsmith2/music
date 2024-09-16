import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '@music/api-interfaces';
import { User } from './user.types';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser(
    @Args('username') username: string
  ): Promise<UserDto> {
    console.log(username)
    return this.userService.getUserByUsername(username);
  }
}
