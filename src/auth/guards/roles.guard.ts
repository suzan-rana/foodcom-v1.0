import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'src/constants';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    return request;
  }
  canActivate(ctx: ExecutionContext): boolean {
    const context = GqlExecutionContext.create(ctx);
    console.log('CONTEXT...XTX', context);
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.getContext();
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
