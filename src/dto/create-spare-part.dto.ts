import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSparePartDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;
}