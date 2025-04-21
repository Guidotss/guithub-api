import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'ssh_keys' })
export class SshKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, unique: true, name: 'title' })
  title: string;

  @Column({ type: 'text', nullable: false, name: 'public_key' })
  publicKey: string;

  @Column({ default: true, name: 'active' })
  active: boolean;

  @ManyToOne(() => User, (user) => user.sshKeys, { onDelete: 'CASCADE' })
  user: User;
}
