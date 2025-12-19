import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Intervention } from './intervention.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  TECH = 'TECH',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TECH })
  role: UserRole;

  @OneToMany(() => Intervention, (intervention) => intervention.technician)
  interventions: Intervention[];
}