import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.database.POSTGRES_HOST,
      port: envs.database.POSTGRES_PORT,
      username: envs.database.POSTGRES_USER,
      password: envs.database.POSTGRES_PASSWORD,
      database: envs.database.POSTGRES_DB,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
