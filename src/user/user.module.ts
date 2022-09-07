import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: Services.USER,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USER,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
