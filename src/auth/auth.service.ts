import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common'; // import mta3 exceptions w Injectable mta3 NestJS
import { JwtService } from '@nestjs/jwt'; // import mta3 service mta3 JWT
import { UsersService } from '../users/users.service'; // import mta3 UsersService
import { RegisterDto } from '../dto/register.dto'; // import mta3 DTO mta3 register
import { LoginDto } from '../dto/login.dto'; // import mta3 DTO mta3 login
import { UserRole } from '../entities/user.entity'; // import mta3 roles mta3 user

@Injectable() // decorator mta3 service
export class AuthService {
  constructor(
    private usersService: UsersService, // injection mta3 UsersService
    private jwtService: JwtService, // injection mta3 JwtService
  ) {}

  async register(registerDto: RegisterDto, requestingUser?: any) {
    // vérifie si l'email deja existe
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists'); // si l'email deja pris
    }

    // vérifie si user y7eb ycréé admin w idha ma3andouch droit
    if (registerDto.role === UserRole.ADMIN) {
      if (!requestingUser || requestingUser.role !== UserRole.ADMIN) {
        throw new ForbiddenException('Only admins can create admin accounts');
      }
    }

    // création mta3 user
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.username,
      registerDto.password,
      registerDto.role || UserRole.TECH, // default role TECH
    );

    const { password, ...result } = user; 
    return result;
  }

  async login(loginDto: LoginDto) {
    // cherche user mta3 email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // email ma fmech
    }

    // vérifie password
    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials'); // password ghalet
    }

    // génération mta3 token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // génération mta3 token
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}
