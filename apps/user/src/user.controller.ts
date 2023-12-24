import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { User } from '@app/shared/interfaces/user.interface';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { RabbitMQMessage } from '@app/shared/dto/rmq-event.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('find-user-by-email-or-username')
  async register(@Ctx() context: RmqContext): Promise<User | null> {
    const channel = context.getChannelRef();
    const message = context.getMessage().content.toString();
    const event = JSON.parse(message) as RabbitMQMessage<EmailAndUsernameDto>;
    console.log(event);
    const result = await this.userService.findOneByEmailOrByUsername(
      event.data,
    );
    if (!result || result === null) {
      channel.ack(context.getMessage());
      return null;
    } else {
      return result;
    }
  }

  @MessagePattern('create-user')
  async createUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage().content.toString();
    const event = JSON.parse(message) as RabbitMQMessage<CreateUserDto>;
    console.log(event);
    const result = await this.userService.create(event.data);
    if (!result || result === null) {
      channel.nack(context.getMessage());
      return null;
    } else {
      channel.ack(context.getMessage());
      return result;
    }
  }
}
