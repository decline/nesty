import { Injectable } from '@nestjs/common';
import { User, UserService } from '@angular-nest/user/api';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByUsernameAndPassword(
      username,
      pass
    );
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }
}
