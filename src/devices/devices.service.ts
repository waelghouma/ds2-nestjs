import { Injectable, NotFoundException } from '@nestjs/common'; // import mta3 Injectable w NotFoundException mta3 NestJS
import { InjectRepository } from '@nestjs/typeorm'; // import mta3 decorator bach ninjecti repository
import { Repository } from 'typeorm'; // import mta3 Repository mta3 TypeORM
import { Device, DeviceStatus } from '../entities/device.entity'; // import mta3 entity Device w status mta3ou
import { CreateDeviceDto } from '../dto/create-device.dto'; // import mta3 DTO mta3 création dyal device

@Injectable() // decorator mta3 service
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>, // injection mta3 repository mta3 Device
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    // création mta3 device jdida
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device); // sauvegarde f base de données
  }

  async findAll(): Promise<Device[]> {
    // recherche devices kolhom
    return this.devicesRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    // recherche device mta3 id spécifique
    const device = await this.devicesRepository.findOne({ where: { id } });
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`); // si ma famach
    }
    return device;
  }

  async updateStatus(id: number, status: DeviceStatus): Promise<Device> {
    // update status mta3 device
    const device = await this.findOne(id); // nverifyw device exist
    device.status = status; 
    return this.devicesRepository.save(device); // save l modification
  }

  async remove(id: number): Promise<void> {
    // suppression mta3 device
    const device = await this.findOne(id); // nverifyw device exist
    await this.devicesRepository.remove(device); // remove men database
  }
}
