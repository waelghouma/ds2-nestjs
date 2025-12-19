import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'; // import mta3 exceptions w Injectable mta3 NestJS
import { InjectRepository } from '@nestjs/typeorm'; // import mta3 decorator bach ninjecti repositories
import { Repository, DataSource } from 'typeorm'; // import mta3 Repository w DataSource mta3 TypeORM
import { Intervention } from '../entities/intervention.entity'; // import mta3 entity Intervention
import { SparePart } from '../entities/spare-part.entity'; // import mta3 entity SparePart
import { Device, DeviceStatus } from '../entities/device.entity'; // import mta3 entity Device w status mta3ou
import { CreateInterventionDto } from '../dto/create-intervention.dto'; // import mta3 DTO mta3 création intervention
import { UsersService } from '../users/users.service'; // import mta3 UsersService
import { UserRole } from '../entities/user.entity'; // import mta3 roles mta3 user

@Injectable() // decorator mta3 service
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>, // injection mta3 repository mta3 Intervention
    @InjectRepository(SparePart)
    private partsRepository: Repository<SparePart>, // injection mta3 repository mta3 SparePart
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>, // injection mta3 repository mta3 Device
    private usersService: UsersService, // injection mta3 UsersService
    private dataSource: DataSource, // injection mta3 DataSource bach n3mlou transactions
  ) {}

  // Create intervention jdida
  async create(
    createInterventionDto: CreateInterventionDto,
    userId: number,
  ): Promise<Intervention> {
    // vérifie user w role mta3ou
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found'); // user ma famemch
    }
    if (user.role !== UserRole.TECH) {
      throw new ForbiddenException('Only technicians can create interventions'); // ken technicians
    }

    
    const intervention = await this.dataSource.transaction(async (manager) => {
      // 1. vérifie device mta3 id
      const device = await manager.findOne(Device, {
        where: { id: createInterventionDto.deviceId },
      });
      if (!device) {
        throw new BadRequestException(
          `Device with ID ${createInterventionDto.deviceId} not found`,
        );
      }

      // 2. vérifie spare parts w no9s stock
      const spareParts: SparePart[] = [];
      for (const partId of createInterventionDto.sparePartIds || []) {
        const part = await manager.findOne(SparePart, { where: { id: partId } });
        if (!part) {
          throw new BadRequestException(`Spare part with ID ${partId} not found`);
        }
        if (part.stock < 1) {
          throw new BadRequestException(`Insufficient stock for part: ${part.name}`);
        }
        // no9s stock
        part.stock -= 1;
        await manager.save(SparePart, part);
        spareParts.push(part);
      }

      // 3. update status mta3 device l REPAIRING
      device.status = DeviceStatus.REPAIRING;
      await manager.save(Device, device);

      // 4. create intervention
      const newIntervention = manager.create(Intervention, {
        description: createInterventionDto.description,
        technician: user,
        device: device,
        spareParts: spareParts,
      });
      const savedIntervention = await manager.save(Intervention, newIntervention);

      // 5. reload intervention mta3 relations
      const loaded = await manager.findOne(Intervention, {
        where: { id: savedIntervention.id },
        relations: ['technician', 'device', 'spareParts'],
      });

      if (!loaded) {
        throw new BadRequestException(
          'Failed to load the intervention after saving',
        );
      }
      return loaded;
    });

    return intervention;
  }

  // Get kol interventions
  async findAll(): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }

  // Get intervention mta3 id spécifique
  async findOne(id: number): Promise<Intervention> {
    const intervention = await this.interventionsRepository.findOne({
      where: { id },
      relations: ['technician', 'device', 'spareParts'],
    });
    if (!intervention) {
      throw new BadRequestException(`Intervention with ID ${id} not found`);
    }
    return intervention;
  }

  // Get interventions mta3 technician
  async findByTechnician(technicianId: number): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { technician: { id: technicianId } },
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }

  // Get interventions mta3 device
  async findByDevice(deviceId: number): Promise<Intervention[]> {
    return this.interventionsRepository.find({
      where: { device: { id: deviceId } },
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }
}
