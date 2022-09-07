import { IAuthService } from './auth';
import { Routes, Services } from './../utils/types';
import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
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
