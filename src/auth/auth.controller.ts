import { IAuthService } from './auth';
import { Routes, Services } from '../utils/constants';
import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/user/user';
import { instanceToPlain } from 'class-transformer';
import { UserLoginDto } from './dtos/UserLogin.dto';
import { AuthenticationGuard, LocalAuthGuard } from './utils/auth.guard';
import { Request, Response } from 'express';

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
    // console.log('success');
  }

  @Post('logout')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout() {}

  @Get('status')
  @UseGuards(AuthenticationGuard)
  status(@Req() req: Request, @Res() res: Response) {
    // console.log(req.user);
    res.send(req.user);
  }
}
