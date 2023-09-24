import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class LoginUserInput extends PickType(
  User,
  ['email', 'password'] as const,
  InputType,
) {}
