import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { DeviceGrade } from '../entities/device.entity';

export class CreateDeviceDto {
  @IsNotEmpty()
  serialNumber: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsOptional()
  @IsEnum(DeviceGrade)
  grade?: DeviceGrade;
}