import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { ErrorData } from '@app/shared/interfaces/error-data.interface';
import { User } from '@app/shared/interfaces/user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto } from '../../../libs/shared/src/interfaces/login-user.dto';
import { Jwt, JwtPayload } from './interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<ErrorData | boolean> {
    const user: User | null = await firstValueFrom(
      this.userService.send('find-user-by-email-or-username', {
        email: createUserDto.email,
        username: createUserDto.username,
      } as EmailAndUsernameDto),
    );
    if (user !== null) {
      return {
        statusCode: 2002,
        error: 'User already exists',
      };
    }
    const userId: string | null = await firstValueFrom(
      this.userService.send('create-user', createUserDto),
    );
    if (!userId || userId === null) {
      return {
        statusCode: 2003,
        error: 'User creation failed',
      };
    }
    return true;
  }

  async login(loginUserDto: LoginUserDto): Promise<Jwt | undefined> {
    const user = await this.validateUser(
      loginUserDto.usernameOrEmail,
      loginUserDto.password,
    );
    if (user === null) return undefined;
    const payload = { sub: user._id } satisfies JwtPayload;
    return { accessToken: this.jwtService.sign(payload) } satisfies Jwt;
  }

  private async validateUser(
    emailOrUsername: string,
    password: string,
  ): Promise<User | null> {
    const user: User | null = await firstValueFrom(
      this.userService.send('find-user-by-email-or-username', {
        email: emailOrUsername,
        username: emailOrUsername,
      } as EmailAndUsernameDto),
    );
    if (user === null) return null;
    // const isPasswordMatched = await bcrypt.compare(password, user.password);
    const isPasswordMatched = password === user.password;
    return isPasswordMatched ? user : null;
  }
}
