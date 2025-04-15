import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ReposModule } from './repos/repos.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { SshModule } from './ssh/ssh.module';

@Module({
  imports: [DatabaseModule, AuthModule, ReposModule, UsersModule, SshModule],
})
export class AppModule {}
