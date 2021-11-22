import { User } from '@nesty/user/api';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../constants';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../services/local.guard';
import { Request as Req } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user as User);
  }

  @Get('info')
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
