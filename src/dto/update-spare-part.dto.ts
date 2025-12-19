import { IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateSparePartDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}