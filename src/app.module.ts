import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './typeorm.config';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd() + 'src/schema.gql'),
      sortSchema: true,
      formatError: (error: any) => {
        Logger.log(error);
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
