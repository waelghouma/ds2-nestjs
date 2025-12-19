import { Injectable, UnauthorizedException } from '@nestjs/common'; // import mta3 Injectable w UnauthorizedException mta3 NestJS
import { PassportStrategy } from '@nestjs/passport'; // import mta3 PassportStrategy
import { ExtractJwt, Strategy } from 'passport-jwt'; // import mta3 JWT Strategy w extract JWT
import { UsersService } from '../users/users.service'; // import mta3 UsersService

@Injectable() // decorator mta3 strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // njib JWT men header
      ignoreExpiration: false, // ma nignorewch expiration
      secretOrKey: process.env.JWT_SECRET || 'waelwaelds02', // clé secrète mta3 JWT
    });
  }

  // validate payload mta3 JWT
  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub); // njib user mta3 id li f payload
    if (!user) {
      throw new UnauthorizedException(); // kan ma famach user
    }
    return { id: user.id, email: user.email, role: user.role }; // nreturniw info mta3 user
  }
}
