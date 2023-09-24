import { Field, InputType, OmitType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './login-input.dto';

@InputType()
export class SignupInput extends PickType(
  User,
  ['email', 'password', 'username'] as const,
  InputType,
) {}
