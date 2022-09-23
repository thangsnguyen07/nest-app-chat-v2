import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { UserModule } from './user/user.module';
import { AppDataSource } from './utils/typeorm';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConversationsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
      dataSourceFactory: async () => {
        await AppDataSource.initialize();
        return AppDataSource;
      },
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
