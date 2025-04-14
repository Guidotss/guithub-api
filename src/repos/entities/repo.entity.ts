import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'repositories' })
export class Repo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  path: string;

  @Column({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.repositories, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
