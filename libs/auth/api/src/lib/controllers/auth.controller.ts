import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../constants';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../services/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }
}
