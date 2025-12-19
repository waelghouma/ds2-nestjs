import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreateSparePartDto } from '../dto/create-spare-part.dto';
import { UpdateSparePartDto } from '../dto/update-spare-part.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('parts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.partsService.create(createSparePartDto);
  }

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSparePartDto: UpdateSparePartDto) {
    return this.partsService.update(+id, updateSparePartDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.partsService.remove(+id);
  }
}