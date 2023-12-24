import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { ErrorData } from '@app/shared/interfaces/error-data.interface';
import { RabbitMQMessage } from '@app/shared/dto/rmq-event.dto';
import { LoginUserDto } from '@app/shared/interfaces/login-user.dto';
import { Channel, Message } from 'amqplib';
import { Jwt } from './interface/jwt.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  async register(@Ctx() context: RmqContext): Promise<boolean | ErrorData> {
    const channel: Channel = context.getChannelRef();
    const message = context.getMessage().content.toString();
    const event = JSON.parse(message) as RabbitMQMessage<CreateUserDto>;
    console.log(event);
    const result = await this.authService.register(event.data);
    channel.ack(context.getMessage() as Message);
    return result;
  }

  @MessagePattern('login')
  async login(@Ctx() context: RmqContext): Promise<Jwt | null> {
    const channel: Channel = context.getChannelRef();
    const message = context.getMessage().content.toString();
    const event = JSON.parse(message) as RabbitMQMessage<LoginUserDto>;
    console.log(event);
    const result = await this.authService.login(event.data);
    if (!result === undefined || result === null) {
      channel.nack(context.getMessage() as Message);
      return null;
    }
    channel.ack(context.getMessage() as Message);
    return result;
  }
}
