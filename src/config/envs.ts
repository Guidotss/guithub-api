import { Envs } from '../types/envs';

const databaseEnvs = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
] as const;

const authEnvs = ['JWT_SECRET', 'JWT_EXPIRATION_TIME'] as const;

const appEnvs = ['PORT'] as const;

const requiredEnvs = [...databaseEnvs, ...authEnvs, ...appEnvs];

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable: ${env}`);
  }
}

export const envs: Envs = {
  database: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: +process.env.POSTGRES_PORT,
  },

  auth: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: +process.env.JWT_EXPIRATION_TIME,
  },

  app: {
    PORT: +process.env.PORT,
  },
} as const;
