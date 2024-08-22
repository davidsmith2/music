import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@music/api-interfaces';

@Controller('user')
@ApiTags('User')
export class UserController {

  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: UserDto
  })
  async createUser(
    @Body() userDto: UserDto
  ): Promise<UserDto> {
    await this.userService.saveUser(userDto);
    return userDto;
  }

  @Get()
  @ApiQuery({ name: 'username', required: true, type: String, description: 'The username of the user' })
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'Successful request.',
    type: UserDto
  })
  async getUser(
    @Query() query: {username: string}
  ): Promise<UserDto> {
    const user: User = await this.userService.getUserByUsername(query.username);
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }

}