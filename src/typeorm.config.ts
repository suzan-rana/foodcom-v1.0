import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/*
i know, should have put this infos at .env but
jyada sey jyada kya hi hoga

*/
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'suzan',
  password: 'HelloWorld123@',
  database: 'ecommerce_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
