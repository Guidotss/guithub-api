import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { BcryptAdapter } from 'src/config/adapters/bcypt.adapter';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'COMPARE',
      useValue: BcryptAdapter.compare,
    },
    AuthService,
  ],
})
export class AuthModule {}
