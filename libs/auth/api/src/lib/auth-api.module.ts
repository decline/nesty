import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
  exports: [],
})
export class AuthApiModule {}
