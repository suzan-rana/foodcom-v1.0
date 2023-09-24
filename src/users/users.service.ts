import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupInput } from 'src/auth/dto/signup-input.dto';
import { ALREADY_EXITS, SERVER_ERROR_TEXT } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  async createUser(signupInput: SignupInput) {
    const checkEmail = await this.userRepository.findOne({
      where: {
        email: signupInput.email,
      },
    });
    if (checkEmail) {
      throw new BadGatewayException(ALREADY_EXITS('User'));
    }
    try {
      // create the user
      return await this.userRepository.save({
        ...signupInput,
      });
    } catch (err) {
      throw new InternalServerErrorException(SERVER_ERROR_TEXT);
    }
  }
}
