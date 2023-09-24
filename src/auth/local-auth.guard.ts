import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable() // local is the passport strategy used, thus check -> local.strategy.ts
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs().loginUserInput;
    return request;
  }
}

/*
    LocalAuthGuard can be used to guard using:
     @UseGuards(LocalAuthGuard)
*/
