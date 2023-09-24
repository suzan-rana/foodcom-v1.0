import { registerEnumType } from '@nestjs/graphql';

export const SERVER_ERROR_TEXT = 'Server gone mad!';
export const ALREADY_EXITS = (name: string) => `${name} already exits`;

export enum RoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
