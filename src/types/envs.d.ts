export type DatabaseConfig = {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
};

export type AuthConfig = {
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
};

export type AppConfig = {
  PORT: number;
  AUTH_KEYS_PATH: string;
  IS_DEV: boolean;
};

export type Envs = {
  database: DatabaseConfig;
  auth: AuthConfig;
  app: AppConfig;
};
