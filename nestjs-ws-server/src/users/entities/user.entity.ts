import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false, type: 'boolean' })
  online: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /* Relaciones */
  @OneToMany(() => Message, (message) => message.to)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.from)
  receivedMessages: Message[];

  /* Metodos */
  sanitize() {
    const { password, ...data } = this;
    return data;
  }
}
