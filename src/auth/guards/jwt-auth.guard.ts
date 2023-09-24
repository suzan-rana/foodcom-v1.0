import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { jwtConstants } from 'src/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractTokenFromHeader(authHeader: string) {
    const [type, token] = authHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
  // for graphql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext) {
    const request: Request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request.headers.authorization);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      GqlExecutionContext.create(context).getContext()['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
