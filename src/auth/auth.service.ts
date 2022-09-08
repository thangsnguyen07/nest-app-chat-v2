import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/user';
import { Services } from 'src/utils/constants';
import { comparePassword } from 'src/utils/helpers';
import { UserCredential } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {}
  async validateUser(userCredential: UserCredential) {
    const user = await this.userService.findUser({
      email: userCredential.email,
    });

    if (!user)
      throw new HttpException('Invalid Creadential', HttpStatus.UNAUTHORIZED);

    return await comparePassword(userCredential.password, user.password);
  }
}
