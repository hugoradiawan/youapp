import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { User } from '@app/shared/interfaces/user.interface';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { SharedService } from '@app/shared';

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
}
