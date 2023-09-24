import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginResponse extends OmitType(User, ['password'] as const) {
  @Field()
  access_token: string;
}
