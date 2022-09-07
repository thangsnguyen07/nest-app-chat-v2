import { IAuthService } from './auth';
import { Routes, Services } from '../utils/constants';
import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/user/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    this.userService.createUser(createUserDto);
  }

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login() {}

  @Post('logout')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {}

  @Get('status')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  status() {}
}
