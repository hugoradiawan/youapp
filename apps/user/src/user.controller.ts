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
    console.log(extractData.data);
    const result = await this.userService.findOneByEmailOrByUsername(
      extractData.data,
    );
    if (result === null) {
      extractData.ack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('create-user')
  async createUser(@Ctx() context: RmqContext) {
    const extractData = this.sharedService.extractData<CreateUserDto>(context);
    const result = await this.userService.create(extractData.data);
    if (result === null) {
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
    const result = await this.userService.getProfileAndUser(extractData.data);
    if (result === null) {
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
    const result = this.userService.getHoroscopeZodiac(extractData.data);
    if (result === null) {
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
    const toUpdate = { ...extractData.data };
    delete toUpdate.userId;
    const result = await this.userService.updateProfile(
      extractData.data.userId,
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

  @MessagePattern('get-all-profiles')
  async getAllProfile(@Ctx() context: RmqContext) {
    const extractData = this.sharedService.extractData<string>(context);
    const result = await this.userService.findAllProfile(extractData.data);
    if (result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('get-profile-names')
  async getProfiles(
    @Ctx() context: RmqContext,
  ): Promise<{ id: string; name: string }[]> {
    const extractData = this.sharedService.extractData<string[]>(context);
    const result: { id: string; name: string }[] =
      await this.userService.getProfileNames(extractData.data);
    if (result === null) {
      extractData.ack();
      return [];
    } else {
      extractData.ack();
      return result;
    }
  }
}
