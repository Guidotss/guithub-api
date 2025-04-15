import { Module } from '@nestjs/common';
import { SshKeysService } from './ssh.service';
import { SshController } from './ssh.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { sshProviders } from './ssh.providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [SshController],
  providers: [SshKeysService, ...sshProviders],
})
export class SshModule {}
