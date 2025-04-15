import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: envs.database.POSTGRES_HOST,
        port: envs.database.POSTGRES_PORT,
        username: envs.database.POSTGRES_USER,
        password: envs.database.POSTGRES_PASSWORD,
        database: envs.database.POSTGRES_DB,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
