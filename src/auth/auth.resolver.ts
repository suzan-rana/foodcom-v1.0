import {
  Args,
  Context,
  GqlContextType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginUserInput } from './dto/login-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { writeFile } from 'fs/promises';
import { SignupResponse } from './dto/signup-response.dto';
import { SignupInput } from './dto/signup-input.dto';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  sayHello(@Context() ctx, @GetUser() user): string {
    return 'Hello World!';
  }
  @Mutation(() => SignupResponse)
  register(@Args('signupInput') signupInput: SignupInput) {
    return this.usersService.createUser(signupInput);
  }
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginInput: LoginUserInput) {
    return this.authService.login(loginInput);
  }
}
