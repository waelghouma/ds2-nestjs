import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Device } from './device.entity';
import { SparePart } from './spare-part.entity';

@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, (user) => user.interventions, { eager: true })
  technician: User;

  @ManyToOne(() => Device, (device) => device.interventions, { eager: true })
  device: Device;

  @ManyToMany(() => SparePart, (sparePart) => sparePart.interventions, {
    eager: true,
  })
  @JoinTable({
    name: 'intervention_spare_parts',
    joinColumn: { name: 'intervention_id' },
    inverseJoinColumn: { name: 'spare_part_id' },
  })
  spareParts: SparePart[];
}