import { Injectable, NotFoundException } from '@nestjs/common'; // import mta3 Injectable w NotFoundException mta3 NestJS
import { InjectRepository } from '@nestjs/typeorm'; // import mta3 decorator bach ninjecti repository
import { Repository } from 'typeorm'; // import mta3 Repository mta3 TypeORM
import { User } from '../entities/user.entity'; // import mta3 entity User
import * as bcrypt from 'bcrypt'; // import mta3 bcrypt bach nhashiw passwords

@Injectable() // decorator mta3 service
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // injection mta3 repository mta3 User
  ) {}

  // Création mta3 user
  async create(email: string, username: string, password: string, role?: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword, // stock hashed password
      role: role as any, // role mta3 user
    });
    return this.usersRepository.save(user); // sauvegarde user f database
  }

  // Trouver user mta3 email
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Trouver user mta3 id
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Vérifie password mta3 user
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // compare password mta3 input m3a hashed password
  }
}
