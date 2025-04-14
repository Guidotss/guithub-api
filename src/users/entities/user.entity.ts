import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Repo } from 'src/repos/entities/repo.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  passwordHash: string;

  @Column({ type: 'text', array: true, nullable: true })
  sshKeys: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Repo, (repo) => repo.owner)
  repositories: Repo[];
}
