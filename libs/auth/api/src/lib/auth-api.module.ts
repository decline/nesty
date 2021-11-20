import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserApiModule } from '@angular-nest/user/api';
import { LocalStrategy } from './services/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UserApiModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthApiModule {}
