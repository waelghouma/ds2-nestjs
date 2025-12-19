import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole, User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';

interface JwtRequest extends ExpressRequest {
  user: { id: number; role: UserRole };
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @Roles(UserRole.ADMIN)
  async getProfile(@Request() req: JwtRequest): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findById(req.user.id);

    // idha ma famach user, nthrowi exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user; 
    return result;
  }
}
