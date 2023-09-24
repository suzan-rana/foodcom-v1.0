import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
