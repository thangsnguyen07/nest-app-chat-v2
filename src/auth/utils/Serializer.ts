import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from 'src/user/user';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH) private readonly userService: IUserService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
