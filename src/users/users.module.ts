import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { BcryptAdapter } from '../config/adapters/bcypt.adapter';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    {
      provide: 'HASHER',
      useValue: BcryptAdapter.hash,
    },
  ],
})
export class UsersModule {}
