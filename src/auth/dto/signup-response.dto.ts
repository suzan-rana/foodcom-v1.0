import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SignupResponse extends PickType(User, [
  'id',
  'email',
  'username',
] as const) {}
