import { Injectable, NotFoundException } from '@nestjs/common'; // import mta3 Injectable w NotFoundException mta3 NestJS
import { InjectRepository } from '@nestjs/typeorm'; // import mta3 decorator bach ninjecti repository
import { Repository } from 'typeorm'; // import mta3 Repository mta3 TypeORM
import { SparePart } from '../entities/spare-part.entity'; // import mta3 entity SparePart
import { CreateSparePartDto } from '../dto/create-spare-part.dto'; // import mta3 DTO mta3 création
import { UpdateSparePartDto } from '../dto/update-spare-part.dto'; // import mta3 DTO mta3 update

@Injectable() // decorator mta3 service
export class PartsService {
  constructor(
    @InjectRepository(SparePart)
    private partsRepository: Repository<SparePart>, // injection mta3 repository mta3 SparePart
  ) {}

  // Création mta3 spare part
  async create(createSparePartDto: CreateSparePartDto): Promise<SparePart> {
    const part = this.partsRepository.create(createSparePartDto); // création object mta3 SparePart
    return this.partsRepository.save(part); // sauvegarde f database
  }

  // Récupérer kol spare parts
  async findAll(): Promise<SparePart[]> {
    return this.partsRepository.find();
  }

  // Récupérer spare part mta3 id spécifique
  async findOne(id: number): Promise<SparePart> {
    const part = await this.partsRepository.findOne({ where: { id } });
    if (!part) {
      throw new NotFoundException(`Spare part with ID ${id} not found`); // exception kan ma famach
    }
    return part;
  }

  // Update spare part
  async update(id: number, updateSparePartDto: UpdateSparePartDto): Promise<SparePart> {
    const part = await this.findOne(id); // vérifie part existe
    Object.assign(part, updateSparePartDto); // update champs mta3 part
    return this.partsRepository.save(part); // sauvegarde modifications
  }

  // Supprimer spare part
  async remove(id: number): Promise<void> {
    const part = await this.findOne(id); // vérifie part existe
    await this.partsRepository.remove(part); // remove men database
  }
}
