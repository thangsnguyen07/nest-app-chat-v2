import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { Services } from 'src/utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
