import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { User } from '@app/shared/interfaces/user.interface';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { SharedService } from '@app/shared';
import { ProfileAndUser } from '@app/shared/interfaces/profile-and-user';
import { HoroscopeZodiac } from '@app/shared/interfaces/horoscope-zodiac.interface';
import { UpdateProfileDto } from 'apps/youapp/src/dto/update-profile.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern('find-user-by-email-or-username')
  async register(@Ctx() context: RmqContext): Promise<User | null> {
    const extractData =
      this.sharedService.extractData<EmailAndUsernameDto>(context);
    const result = await this.userService.findOneByEmailOrByUsername(
      extractData.event.data,
    );
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('create-user')
  async createUser(@Ctx() context: RmqContext) {
    const extractData = this.sharedService.extractData<CreateUserDto>(context);
    const result = await this.userService.create(extractData.event.data);
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('get-profile-and-user')
  async getProfileAndUser(
    @Ctx() context: RmqContext,
  ): Promise<ProfileAndUser | null> {
    const extractData = this.sharedService.extractData<string>(context);
    const result = await this.userService.getProfileAndUser(
      extractData.event.data,
    );
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('get-horoscope-zodiac')
  async getHoroscopeZodiac(
    @Ctx() context: RmqContext,
  ): Promise<HoroscopeZodiac | null> {
    const extractData = this.sharedService.extractData<string>(context);
    const result = this.userService.getHoroscopeZodiac(extractData.event.data);
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('update-profile')
  async updateProfile(@Ctx() context: RmqContext) {
    const extractData = this.sharedService.extractData<
      UpdateProfileDto & HoroscopeZodiac & { userId: string }
    >(context);
    console.log('toUpdate 1', extractData.event.data);
    const toUpdate = { ...extractData.event.data };
    delete toUpdate.userId;
    console.log('toUpdate 2', toUpdate);
    const result = await this.userService.updateProfile(
      extractData.event.data.userId,
      toUpdate,
    );
    if (result === false) {
      extractData.nack();
      return false;
    } else {
      extractData.ack();
      return true;
    }
  }
}
