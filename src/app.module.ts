import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ReposModule } from './repos/repos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, ReposModule, UsersModule],
})
export class AppModule {}
