import { Injectable } from '@nestjs/common';
import { UserService } from '@angular-nest/user/api';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
}
