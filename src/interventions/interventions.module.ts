import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from '../entities/intervention.entity';
import { SparePart } from '../entities/spare-part.entity';
import { Device } from '../entities/device.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention, SparePart, Device]), 
    UsersModule, 
  ],
  controllers: [InterventionsController],
  providers: [InterventionsService],
})
export class InterventionsModule {}
