import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false, type: 'boolean' })
  online: boolean;

  sanitize() {
    const { password, ...data } = this;
    return data;
  }
}
