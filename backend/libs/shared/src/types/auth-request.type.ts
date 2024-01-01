import { JwtPayload } from 'apps/auth/src/interface/jwt.interface';
import { Request } from 'express';

export type AuthRequest = Request & { payload: JwtPayload };
