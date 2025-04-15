import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { BcryptAdapter } from 'src/config/adapters/bcypt.adapter';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: envs.auth.JWT_SECRET,
        signOptions: { expiresIn: envs.auth.JWT_EXPIRATION_TIME },
      }),
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'COMPARE',
      useValue: BcryptAdapter.compare,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
