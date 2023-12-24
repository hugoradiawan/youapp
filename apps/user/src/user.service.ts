import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { User } from '@app/shared/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Profile } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string | undefined> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await bcrypt.hash(createdUser.password, 10);
    const result = await createdUser.save();
    this.createProfile(result._id.toString(), {});
    return result._id.toString();
  }

  private async createProfile(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<boolean> {
    const profile = {
      userId,
      ...createProfileDto,
    } as Profile;
    const createdProfile = new this.profileModel(profile);
    const result = await createdProfile.save();
    return result !== null;
  }

  async findOneByEmailOrByUsername(
    emailOrUsername: EmailAndUsernameDto,
  ): Promise<User | null> {
    return this.userModel
      .findOne({
        $or: [
          { email: emailOrUsername.email },
          { username: emailOrUsername.username },
        ],
      })
      .exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
