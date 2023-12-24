import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ServerResponse } from './dto/server-response.dto';
import { ErrorData } from '@app/shared/interfaces/error-data.interface';
import { LoginUserDto } from '@app/shared/interfaces/login-user.dto';
import { Jwt } from 'apps/auth/src/interface/jwt.interface';

@Controller('api')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  async register(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response> {
    const result: boolean | ErrorData = await firstValueFrom(
      this.authService.send('register', createUserDto),
    );
    if ((result as ErrorData).statusCode) {
      return this.buildErrorReponse(
        res,
        (result as ErrorData).statusCode,
        (result as ErrorData).error,
      );
    } else {
      return res.status(201).send();
    }
  }

  @Post('login')
  async login(
    @Res() res: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<Response> {
    const jwt = await await firstValueFrom(
      this.authService.send('login', loginUserDto),
    );
    const isJwtValid = jwt !== undefined || jwt !== null;
    return res.status(!jwt ? 401 : 200).json({
      isOk: isJwtValid,
      message: !isJwtValid ? 'Invalid username, email or password' : undefined,
      errorCode: !isJwtValid ? 2004 : undefined,
      data: !isJwtValid ? undefined : jwt,
    } satisfies ServerResponse<Jwt>);
  }

  private buildErrorReponse(
    res: Response,
    errorCode: number,
    message: string,
  ): Response {
    return res.status(500).json({
      isOk: false,
      errorCode,
      message,
    } satisfies ServerResponse<unknown>);
  }
}
