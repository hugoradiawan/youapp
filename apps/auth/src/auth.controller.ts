import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { ErrorData } from '@app/shared/interfaces/error-data.interface';
import { LoginUserDto } from '@app/shared/interfaces/login-user.dto';
import { Jwt } from './interface/jwt.interface';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern('register')
  async register(@Ctx() context: RmqContext): Promise<boolean | ErrorData> {
    const extractedData =
      this.sharedService.extractData<CreateUserDto>(context);
    const result = await this.authService.register(extractedData.data);
    extractedData.ack();
    return result;
  }

  @MessagePattern('login')
  async login(@Ctx() context: RmqContext): Promise<Jwt | null> {
    const extractedData = this.sharedService.extractData<LoginUserDto>(context);
    const result = await this.authService.login(extractedData.data);
    if (result === null) {
      extractedData.nack();
      return null;
    }
    extractedData.ack();
    return result;
  }
}
