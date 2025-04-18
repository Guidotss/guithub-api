import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DataSource],
  },
];
