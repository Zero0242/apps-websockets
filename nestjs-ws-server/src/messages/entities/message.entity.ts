import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* Relaciones */
  @ManyToOne(() => User, (user) => user.receivedMessages)
  from: User;

  @ManyToOne(() => User, (user) => user.sentMessages)
  to: User;
}
