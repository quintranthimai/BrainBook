import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUser } from '../common/current-user.decorator';

@Injectable()
export class OptionalJwtGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user?: JwtUser }>();
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return true;
    try {
      const token = auth.slice(7);
      const payload = await this.jwt.verifyAsync<{ sub: string; email: string }>(token, {
        secret: this.config.get<string>('JWT_SECRET') ?? 'dev-only-change-me',
      });
      req.user = { sub: payload.sub, email: payload.email };
    } catch {
      req.user = undefined;
    }
    return true;
  }
}
