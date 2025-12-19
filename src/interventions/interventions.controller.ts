import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from '../dto/create-intervention.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('interventions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterventionsController {
  constructor(private interventionsService: InterventionsService) {}

  @Post()
  @Roles(UserRole.TECH)
  create(@Body() createInterventionDto: CreateInterventionDto, @Request() req) {
    return this.interventionsService.create(createInterventionDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.interventionsService.findAll();
  }
}