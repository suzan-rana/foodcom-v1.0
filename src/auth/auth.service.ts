import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-input.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const payload = {
      username: loginUserInput.email,
    };
    const user = await this.usersService.findOne(loginUserInput.email);
    delete user['password'];
    return {
      access_token: await this.jwtService.signAsync(payload), // use jwt here
      ...user,
    };
  }
  async signupUser(signupInput: SignupInput) {
    return this.usersService.createUser(signupInput);
  }
}
