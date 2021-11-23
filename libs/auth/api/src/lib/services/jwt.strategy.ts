import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@nesty/auth/interfaces';
import { User } from '@nesty/user/interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

export const JWT_STRATEGY_NAME = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayload): User {
    // create the User from the jwt payload
    return {
      id: payload.id,
      userName: payload.userName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isActive: payload.isActive,
    };
  }
}
