import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Connection, Model } from 'mongoose';

export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async saveUser(userDto: any): Promise<void> {
    const user = new this.userModel({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      username: userDto.username
    });
    await user.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

}