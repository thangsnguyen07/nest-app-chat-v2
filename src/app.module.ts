import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppDataSource } from './utils/typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
      dataSourceFactory: async () => {
        await AppDataSource.initialize();
        return AppDataSource;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
