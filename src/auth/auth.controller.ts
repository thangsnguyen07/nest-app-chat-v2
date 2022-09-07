import { IAuthService } from './auth';
import { Routes, Services } from '../utils/constants';
import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/user/user';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USER) private userService: IUserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @Post('login')
  login() {}

  @Post('logout')
  logout() {}

  @Get('status')
  status() {}
}
