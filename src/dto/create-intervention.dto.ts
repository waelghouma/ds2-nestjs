import { IsNotEmpty, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class CreateInterventionDto {
  @IsNotEmpty()
  description: string;

  @IsNumber()
  deviceId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  sparePartIds: number[];
}