import { DataSource } from 'typeorm';
import { SshKey } from './entities/ssh.entity';

export const sshProviders = [
  {
    provide: 'SSH_KEYS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SshKey),
    inject: [DataSource],
  },
];
