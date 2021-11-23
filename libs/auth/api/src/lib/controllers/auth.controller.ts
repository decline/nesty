import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtLoginResponse } from '@nesty/auth/interfaces';
import { User } from '@nesty/user/interfaces';
import { Request } from 'express';
import { Public } from '../constants';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../services/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request): JwtLoginResponse {
    return this.authService.login(req.user as User);
  }

  @Get('info')
  getInfo(@Req() req: Request): User {
    return req.user as User;
  }
}
