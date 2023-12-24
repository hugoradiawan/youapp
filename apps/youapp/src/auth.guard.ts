import { AuthRequest } from '@app/shared/types/auth-request.type';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'apps/auth/src/constants';
import { JwtPayload } from 'apps/auth/src/interface/jwt.interface';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return Promise.resolve(false);
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        jwtConstants,
      );
      request.payload = payload;
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.resolve(false);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers['x-access-token'] as string | undefined;
    return token;
  }
}
