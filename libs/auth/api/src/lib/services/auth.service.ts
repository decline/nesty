import { JwtLoginResponse, JwtPayload } from '@nesty/auth/interfaces';
import { User, UserService } from '@nesty/user/api';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByUsernameAndPassword(username, pass);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  login(user: User): JwtLoginResponse {
    const payload: JwtPayload = { username: user.userName, sub: user.id as string };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
