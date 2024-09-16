import { UserDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { httpsAgent } from '../app.constants';

@Injectable()
export class UserService {
  async getUserByUsername(username: string): Promise<UserDto> {
    console.log(username)
    const response = await fetch(`https://localhost:3333/api/user?username=${username}`, {agent: httpsAgent});
    console.log(response)
    const data = (await response.json()) as UserDto;
    console.log(data)
    return data;
  }
}
