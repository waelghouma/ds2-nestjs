import { Controller, Post, Body, Request } from '@nestjs/common'; // import mta3 decorators w outils mta3 NestJS
import { AuthService } from './auth.service'; // import mta3 service mta3 authentication
import { RegisterDto } from '../dto/register.dto'; // import mta3 DTO mta3 register
import { LoginDto } from '../dto/login.dto'; // import mta3 DTO mta3 login
import { UserRole } from '../entities/user.entity'; // import mta3 roles mta3 user
@Controller('auth') // had controller barcha routes mta3ha b prefix 'auth'
export class AuthController {
  constructor(private authService: AuthService) {}  // injection mta3 AuthService

  @Post('register') // route POST /auth/register
  async register(@Body() registerDto: RegisterDto, @Request() req?) {
    // idha user authenticated w 3ando role admin, n3aytou l role mta3ou
    // n3aytou l method register f AuthService b data mta3 DTO w user il mawjoud f request
    return this.authService.register(registerDto, req?.user);
  }

  @Post('login') // route POST /auth/login
  async login(@Body() loginDto: LoginDto) {
    // n3aytou l method login f AuthService b data mta3 DTO
    return this.authService.login(loginDto);
  }
}
