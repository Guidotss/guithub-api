import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Repo } from 'src/repos/entities/repo.entity';
import { SshKey } from 'src/ssh/entities/ssh.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, nullable: false })
  username: string;

  @Column({ unique: true, length: 255, nullable: false })
  email: string;

  @Column({ length: 512, nullable: false })
  passwordHash: string;

  @OneToMany(() => SshKey, (sshKey) => sshKey.user)
  sshKeys: SshKey[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Repo, (repo) => repo.owner)
  repositories: Repo[];
}
