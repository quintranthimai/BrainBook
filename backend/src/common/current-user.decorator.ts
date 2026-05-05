import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtUser = { sub: string; email: string };

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): JwtUser | undefined => {
  const req = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
  return req.user;
});
