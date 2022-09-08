import { IAuthService } from './auth';
import { Routes, Services } from '../utils/constants';
import { Controller, Post, Get, Body, Inject, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/user/user';
import { instanceToPlain } from 'class-transformer';
import { UserLoginDto } from './dtos/UserLogin.dto';
import { LocalAuthGuard } from './utils/auth.guard';

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
  @UseGuards(LocalAuthGuard)
  login(@Body() userLoginDto: UserLoginDto) {
    console.log('success');
  }

  @Post('logout')
  logout() {}

  @Get('status')
  status() {}
}
